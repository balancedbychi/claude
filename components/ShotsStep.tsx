"use client";

import { useState } from "react";
import { ArrowRight, Clapperboard, Loader2, RefreshCw } from "lucide-react";
import { artFor } from "@/lib/art.ts";
import { pool, post } from "@/lib/client-api.ts";
import { clipName, fmtClock, sceneLength } from "@/lib/edit-guide.ts";
import type { Scene, SceneShots } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";
import type { StepProps } from "./EpisodeBuilder.tsx";

export function ShotsStep({ tool, bible, characters, locations, products, episode, updateEpisode, goTo }: StepProps) {
  const [maxClip, setMaxClip] = useState(tool.kind === "episode" ? 8 : 5);
  const [pending, setPending] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<number, string>>({});
  const scenes = episode.script?.scenes ?? [];
  const byScene = new Map(episode.shots.map((s) => [s.sceneNumber, s]));
  const done = scenes.filter((s) => byScene.has(s.number)).length;

  async function runScene(scene: Scene) {
    setPending((p) => new Set(p).add(scene.number));
    setErrors(({ [scene.number]: _, ...rest }) => rest);
    try {
      const i = scenes.findIndex((s) => s.number === scene.number);
      const res = await post<SceneShots>("/api/shots", {
        scene,
        prevScene: scenes[i - 1] ?? null,
        nextScene: scenes[i + 1] ?? null,
        bible,
        characters,
        locations,
        products: products.filter((p) => p.id === episode.brief?.productId),
        kind: tool.kind,
        maxClipSeconds: maxClip,
      });
      updateEpisode((prev) => ({
        shots: [...prev.shots.filter((x) => x.sceneNumber !== scene.number), res].sort((a, b) => a.sceneNumber - b.sceneNumber),
      }));
    } catch (e) {
      setErrors((prev) => ({ ...prev, [scene.number]: (e as Error).message }));
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(scene.number);
        return next;
      });
    }
  }

  async function runAll() {
    await pool(scenes.filter((s) => !byScene.has(s.number)), 3, runScene);
  }

  const nameOf = (id: string) => characters.find((c) => c.id === id)?.name ?? id;
  const setOf = (id: string) => locations.find((l) => l.id === id);
  let clock = 0;

  return (
    <section className="stack loose">
      <div className="panel stack">
        <p className="muted">
          Every shot is one clip. Make the <b>keyframe</b> from the image prompt with your character and set references, then
          bring it to life with the <b>animation prompt</b>. Shots marked &ldquo;from last frame&rdquo; skip the keyframe and
          animate from the end of the previous clip, so the cut is seamless.
        </p>
        <div className="row between">
          <label className="inline-field">
            Max clip length
            <select value={maxClip} onChange={(e) => setMaxClip(Number(e.target.value))}>
              {[5, 8, 10, 15].map((n) => <option key={n} value={n}>{n}s</option>)}
            </select>
          </label>
          <div className="row">
            {done === scenes.length && scenes.length > 0 ? (
              <button className="btn btn-primary" onClick={() => goTo(3)}>Edit &amp; post <ArrowRight size={15} /></button>
            ) : (
              <button className="btn btn-primary" onClick={runAll} disabled={pending.size > 0}>
                {pending.size > 0 ? <Loader2 size={16} className="spin" /> : <Clapperboard size={16} />}
                {pending.size > 0 ? `Directing… ${done}/${scenes.length} scenes` : done === 0 ? "Build the storyboard" : `Build remaining ${scenes.length - done} scenes`}
              </button>
            )}
          </div>
        </div>
      </div>

      {scenes.map((scene) => {
        const result = byScene.get(scene.number);
        const start = clock;
        const len = sceneLength(episode, scene);
        clock += len;
        const set = setOf(scene.locationId);
        return (
          <section key={scene.number} className="storyboard-scene">
            <div className="storyboard-head">
              <div className="stack tight">
                <span className="eyebrow">{tool.kind === "episode" ? "Scene" : "Beat"} {String(scene.number).padStart(2, "0")} · {fmtClock(start)}–{fmtClock(start + len)}</span>
                <h3>{scene.title}</h3>
                {scene.onScreenText && <span className="small grad" style={{ fontStyle: "normal", fontWeight: 700 }}>&ldquo;{scene.onScreenText}&rdquo;</span>}
              </div>
              <div className="row">
                <span className="tag">{set ? `${set.setName ? `${set.setName} · ` : ""}${set.name}` : scene.location}</span>
                {scene.lines.length > 0 && <CopyButton text={scene.lines.map((l) => l.text).join(" ")} label="Voiceover" variant="ghost" />}
                <button className="btn btn-ghost btn-sm" onClick={() => runScene(scene)} disabled={pending.has(scene.number)}>
                  {pending.has(scene.number) ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />}
                  {result ? "Redo" : "Build"}
                </button>
              </div>
            </div>
            {errors[scene.number] && <p className="error">{errors[scene.number]}</p>}
            {!result && !pending.has(scene.number) && <p className="faint small">{scene.action}</p>}
            {result && (
              <div className="storyboard">
                {result.shots.map((shot) => {
                  const code = clipName(scene.number, shot.number);
                  return (
                    <article key={shot.number} className="shot-card">
                      <div className="frame" style={{ ["--art" as string]: artFor(`${scene.locationId || scene.location}${shot.number % 3}`) }}>
                        <div className="top">
                          <span className="code">{code}</span>
                          <span className="dur">{shot.durationSeconds}s</span>
                        </div>
                        <p className="sketch">{shot.startFrame || shot.action}</p>
                      </div>
                      <div className="shot-meta">
                        <div className="row">
                          <span className="tag">{shot.transition || "cut"}</span>
                          {shot.continueFromPrevious && <span className="tag outline-accent">from last frame</span>}
                        </div>
                        <p className="small muted">{shot.camera}{shot.cameraMove ? ` · ${shot.cameraMove}` : ""}</p>
                        {(shot.characterIds.length > 0 || shot.productIds.length > 0) && (
                          <p className="tiny faint">
                            {[...shot.characterIds.map(nameOf), ...shot.productIds.map((id) => products.find((p) => p.id === id)?.name ?? "")].filter(Boolean).join(", ")}
                          </p>
                        )}
                        <details className="prompts">
                          <summary>View prompts</summary>
                          {!shot.continueFromPrevious && (
                            <>
                              <div className="prompt-label">Image</div>
                              <pre className="prompt">{shot.imagePrompt}</pre>
                            </>
                          )}
                          <div className="prompt-label">Animation</div>
                          <pre className="prompt">{shot.animationPrompt}</pre>
                        </details>
                        <div className="copy-row">
                          {!shot.continueFromPrevious && <CopyButton text={shot.imagePrompt} label="Image" />}
                          <CopyButton text={shot.animationPrompt} label="Animation" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}
