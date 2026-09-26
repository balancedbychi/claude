"use client";

import { pool, post } from "./client-api.ts";
import { newId } from "./storage.ts";
import type { BotId } from "./team.ts";
import { TOOLS } from "./tools.ts";
import type { Brief, Character, Concept, Episode, Location, PackageInfo, Product, SceneShots, Script, SeriesBible, ToolKind } from "./types.ts";

// The team's pipeline: everything the step-by-step builder does, run in one
// go. Each bot reports in as it works. It resumes from wherever a project
// already is, so a member can hand over at any step (or retry after an error).

export interface TeamMessage {
  id: string;
  bot: BotId | "you";
  text: string;
  state: "working" | "done" | "error";
  at: number;
}

export interface Library {
  bible: SeriesBible;
  characters: Character[];
  locations: Location[];
  products: Product[];
}

type Say = (bot: TeamMessage["bot"], text: string, state?: TeamMessage["state"]) => string;
type Resay = (id: string, text: string, state?: TeamMessage["state"]) => void;

export function newProject(kind: ToolKind, init: Partial<Episode> = {}): Episode {
  return {
    id: newId(kind === "episode" ? "ep" : kind),
    kind,
    createdAt: new Date().toISOString(),
    brief: null,
    topic: "",
    concept: null,
    script: null,
    shots: [],
    pkg: null,
    ...init,
  };
}

const mins = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/** Steps left for a project, used for the progress bar. */
export function stepsLeft(p: Episode): number {
  const scenes = p.script?.scenes.length ?? (p.kind === "episode" ? 10 : 5);
  const shotsLeft = scenes - p.shots.length;
  return (p.kind === "episode" && !p.concept ? 1 : 0) + (p.script ? 0 : 2) + Math.max(0, shotsLeft) + (p.pkg ? 0 : 1);
}

export async function runPipeline(opts: {
  project: Episode;
  lib: Library;
  targetMinutes?: number;
  update: (id: string, patch: Partial<Episode>) => void;
  say: Say;
  resay: Resay;
  onProgress: (done: number, total: number) => void;
}): Promise<Episode> {
  const { lib, update, say, resay } = opts;
  let p = opts.project;
  const tool = TOOLS[p.kind];
  const total = stepsLeft(p);
  let done = 0;
  const tick = (n = 1) => opts.onProgress((done += n), Math.max(total, done));
  const apply = (patch: Partial<Episode>) => {
    p = { ...p, ...patch };
    update(p.id, patch);
  };

  // 1. Ideas (episodes only)
  if (p.kind === "episode" && !p.concept) {
    const m = say("scout", "reading your idea and pitching hooks…", "working");
    const { concepts } = await post<{ concepts: Concept[] }>("/api/concepts", { topic: p.topic, bible: lib.bible, characters: lib.characters });
    const pick = concepts[0];
    apply({ concept: pick });
    resay(m, `pitched ${concepts.length} ideas and picked “${pick.title}”. opening line: “${pick.hook}”${pick.hookStyle ? ` (${pick.hookStyle.toLowerCase()} hook)` : ""}`, "done");
    tick();
  }

  // 2. Script or ad beats
  if (!p.script) {
    let script: Script;
    if (p.kind === "episode") {
      const m = say("penny", `writing a ${opts.targetMinutes ? `${opts.targetMinutes}-minute` : "4½-minute"} script…`, "working");
      script = await post<Script>("/api/script", { concept: p.concept, bible: lib.bible, characters: lib.characters, locations: lib.locations, targetMinutes: opts.targetMinutes ?? 4.5 });
      resay(m, `“${script.title}”: ${script.scenes.length} scenes, ${mins(script.totalSeconds)}, ending on a cliffhanger.`, "done");
    } else {
      const product = lib.products.find((x) => x.id === p.brief?.productId);
      say("bestie", `brief's in: ${[product?.name, p.brief?.angle, `${p.brief?.lengthSeconds}s`].filter(Boolean).join(" · ")}. passing it to penny.`, "done");
      const m = say("penny", "writing the beats and a few extra hooks to test…", "working");
      script = await post<Script>("/api/beats", { kind: p.kind, brief: p.brief, bible: lib.bible, characters: lib.characters, locations: lib.locations, products: lib.products });
      resay(m, `${script.scenes.length} beats in ${script.totalSeconds}s, plus ${script.altHooks.length} alternative hooks to A/B test.`, "done");
    }
    apply({ script, shots: [], pkg: null });
    tick(2);
  }

  // 3. Storyboard, three scenes at a time
  const scenes = p.script!.scenes;
  const todo = scenes.filter((s) => !p.shots.some((x) => x.sceneNumber === s.number));
  if (todo.length > 0) {
    const m = say("dot", `storyboarding ${todo.length} ${p.kind === "episode" ? "scenes" : "beats"}…`, "working");
    let finished = scenes.length - todo.length;
    const product = lib.products.filter((x) => x.id === p.brief?.productId);
    await pool(todo, 3, async (scene) => {
      const i = scenes.findIndex((s) => s.number === scene.number);
      const res = await post<SceneShots>("/api/shots", {
        scene,
        prevScene: scenes[i - 1] ?? null,
        nextScene: scenes[i + 1] ?? null,
        bible: lib.bible,
        characters: lib.characters,
        locations: lib.locations,
        products: product,
        kind: p.kind,
        maxClipSeconds: p.kind === "episode" ? 8 : 5,
      });
      apply({ shots: [...p.shots.filter((x) => x.sceneNumber !== res.sceneNumber), res].sort((a, b) => a.sceneNumber - b.sceneNumber) });
      finished++;
      resay(m, `storyboarding… ${finished}/${scenes.length} ${p.kind === "episode" ? "scenes" : "beats"} done`, "working");
      tick();
    });
    const shots = p.shots.flatMap((s) => s.shots);
    const chained = shots.filter((s) => s.continueFromPrevious).length;
    resay(m, `${shots.length} shots, each with an image and an animation prompt.${chained ? ` ${chained} roll straight on from the last frame, so the cuts join up.` : ""}`, "done");
  }

  // 4. Posting package
  if (!p.pkg) {
    const bot: BotId = p.kind === "episode" ? "scout" : "bestie";
    const m = say(bot, "writing titles, the caption and a thumbnail idea…", "working");
    const pkg = await post<PackageInfo>("/api/package", { script: p.script, bible: lib.bible, characters: lib.characters, kind: p.kind });
    apply({ pkg });
    resay(m, `${pkg.titles.length} title option${pkg.titles.length === 1 ? "" : "s"}, a caption with hashtags, and a thumbnail: “${pkg.thumbnail.textOverlay}”.`, "done");
    tick();
  }

  say("bow", `all done ✨ your ${tool.label.replace(" Builder", "").toLowerCase()} is ready to generate. open it to copy prompts or tweak anything.`, "done");
  return p;
}

/** What bow sends for planning: library items as short labels. */
export function libraryLabels(lib: Library) {
  return {
    niche: lib.bible.niche,
    characters: lib.characters.map((c) => ({ id: c.id, label: `${c.name}${c.role ? ` (${c.role})` : ""}` })),
    products: lib.products.map((x) => ({ id: x.id, label: [x.brand, x.name, x.category && `(${x.category})`].filter(Boolean).join(" ") })),
    locations: lib.locations.map((l) => ({ id: l.id, label: `${l.setName ? `${l.setName}: ` : ""}${l.name}` })),
  };
}

export interface Plan {
  kind: ToolKind;
  reply: string;
  topic: string;
  targetMinutes: number;
  brief: Brief | null;
}
