import { NextResponse } from "next/server";
import { z } from "zod";
import { generate, SYSTEM } from "@/lib/claude.ts";
import { BibleIn, CharacterIn, SceneOut, ShotsOut } from "@/lib/schemas.ts";
import { castBlock, errorResponse, readBody } from "@/lib/api.ts";
import { buildShotPrompt } from "@/lib/prompt-builder.ts";

const Body = z.object({
  scene: SceneOut,
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  maxClipSeconds: z.number().int().min(3).max(15).default(8),
});

// One call per scene keeps each response small and lets the UI fill in
// scenes as they finish instead of waiting on the whole episode.
export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { scene, bible, characters, maxClipSeconds } = body.data;
  const ids = new Set(characters.map((c) => c.id));

  try {
    const out = await generate({
      system: SYSTEM,
      schema: ShotsOut,
      effort: "medium",
      prompt: `Break this scene into shots for an AI video generator (Higgsfield, Kling, Veo, Runway). Each shot becomes one generated clip.

Visual style: ${bible.visualStyle || "cinematic, photorealistic"} | Aspect ratio: ${bible.aspectRatio}
Cast (use these ids in characterIds; do NOT describe their appearance, it is added automatically):
${castBlock(characters)}

Scene ${scene.number}: ${scene.title}
Location: ${scene.location}
Duration: ${scene.durationSeconds}s
Action: ${scene.action}
Lines:
${scene.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n") || "(none)"}

Rules:
- Shots are at most ${maxClipSeconds}s each and their durations add up to about ${scene.durationSeconds}s.
- action: one or two sentences of visible action and expression, naming characters by name. Include the location.
- camera: shot size, angle and movement (e.g. "low-angle medium shot, slow dolly-in").
- mood and lighting: short, specific.
- Vary shot sizes so the edit feels cinematic.`,
    });

    const shots = out.shots.map((s, i) => {
      const shot = {
        ...s,
        number: i + 1,
        characterIds: s.characterIds.filter((id) => ids.has(id)),
      };
      return { ...shot, prompt: buildShotPrompt(shot, characters, bible) };
    });
    return NextResponse.json({ sceneNumber: scene.number, shots });
  } catch (err) {
    return errorResponse(err);
  }
}
