import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { systemFor } from "@/lib/playbook.ts";
import { BibleIn, CharacterIn, LocationIn, ProductIn, SceneOut, ShotsOut, ToolKindIn } from "@/lib/schemas.ts";
import { castBlock, errorResponse, productsBlock, readBody } from "@/lib/api.ts";
import { TOOLS } from "@/lib/tools.ts";
import { locationAnchor, withPrompts } from "@/lib/prompt-builder.ts";

const Body = z.object({
  scene: SceneOut,
  // Neighbouring scenes, so the first and last shots hand off cleanly.
  prevScene: SceneOut.nullable().default(null),
  nextScene: SceneOut.nullable().default(null),
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  locations: z.array(LocationIn).max(30).default([]),
  products: z.array(ProductIn).max(20).default([]),
  kind: ToolKindIn.default("episode"),
  maxClipSeconds: z.number().int().min(3).max(15).default(8),
});

// One call per scene keeps each response small and lets the UI fill in
// scenes as they finish instead of waiting on the whole episode.
export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { scene, prevScene, nextScene, bible, characters, locations, products, kind, maxClipSeconds } = body.data;
  const ids = new Set(characters.map((c) => c.id));
  const productIds = new Set(products.map((p) => p.id));
  const location = locations.find((l) => l.id === scene.locationId);
  const sameSetAsPrev = Boolean(prevScene && location && prevScene.locationId === location.id);

  try {
    const out = await generate({
      system: systemFor("shots", kind),
      schema: ShotsOut,
      effort: "medium",
      prompt: `Break this scene into shots for an image-first AI video workflow (Higgsfield, Kling, Veo, Runway): each shot is a keyframe still that is then animated into one clip, and the clips are cut together into one continuous video.

Direction: ${TOOLS[kind].shotDirection}
Visual style: ${bible.visualStyle || "cinematic, photorealistic"} | Aspect ratio: ${bible.aspectRatio}
Cast (use these ids in characterIds; do NOT describe their appearance, it is added automatically):
${castBlock(characters)}
Products (use these ids in productIds for every shot where the product is visible; do NOT describe the packaging, it is added automatically):
${productsBlock(products)}
Set: ${location ? `${locationAnchor(location)} Default light: ${location.lighting || "n/a"}. (Do not re-describe the set; it is added automatically. Refer to its fixed features by name so shots stay consistent.)` : scene.location}

Previous scene: ${prevScene ? `${prevScene.title}: ${prevScene.action}` : "none (this opens the episode)"}
THIS SCENE ${scene.number}: ${scene.title}
Duration: ${scene.durationSeconds}s
Action: ${scene.action}
On-screen text: ${scene.onScreenText || "(none)"}
Lines:
${scene.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n") || "(none)"}
Next scene: ${nextScene ? `${nextScene.title}: ${nextScene.action}` : "none (this ends the episode)"}

Rules:
- Shots are at most ${maxClipSeconds}s each and their durations add up to about ${scene.durationSeconds}s.
- startFrame: the keyframe composition: exactly what the first frame shows (who is where, pose, expression, props). This becomes the still image.
- action: the movement and performance during the clip (gestures, expressions, dialogue delivery), naming characters by name.
- camera: framing only, shot size and angle (e.g. "low-angle medium shot"). Vary shot sizes so the edit feels cinematic.
- cameraMove: camera movement during the clip (e.g. "slow dolly-in", "handheld follow", "static").
- mood and lighting: short and specific. Keep lighting consistent within the scene${location ? " and with the set's default light unless the story changes the time of day" : ""}.
- Continuity: endFrame describes exactly what the last frame shows. Each shot's startFrame must pick up from the previous shot's endFrame (same positions, props, eyelines, screen direction).
- continueFromPrevious: true when the shot is the same camera angle continuing the previous shot's action, so the member should generate it from the previous clip's last frame. False for a new angle.${sameSetAsPrev ? "" : " The first shot is always false."}
- transition: how this shot joins the previous clip: "hard cut", "match cut on <thing>", "continuous", "whip pan", "fade from black", etc. The first shot's transition should bridge from the previous scene.
- The last shot should end on a frame that leads naturally into the next scene.`,
    });

    const shots = out.shots.map((s, i) => {
      const shot = {
        ...s,
        number: i + 1,
        characterIds: s.characterIds.filter((id) => ids.has(id)),
        productIds: s.productIds.filter((id) => productIds.has(id)),
        continueFromPrevious: s.continueFromPrevious && (i > 0 || sameSetAsPrev),
      };
      return withPrompts(shot, { characters, products, bible, location });
    });
    return NextResponse.json({ sceneNumber: scene.number, shots });
  } catch (err) {
    return errorResponse(err);
  }
}
