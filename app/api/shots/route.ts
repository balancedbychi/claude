import { withMember } from "@/lib/server/auth.ts";
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
  // Regenerate one shot: the scene's current shots, which one, and what was off.
  redo: z
    .object({
      shotNumber: z.number().int().min(1),
      note: z.string().max(600).default(""),
      // Only what the prompt needs, so storyboards saved before newer fields still work.
      shots: z
        .array(z.object({ number: z.number(), durationSeconds: z.number(), startFrame: z.string(), action: z.string(), endFrame: z.string(), camera: z.string(), cameraMove: z.string() }).passthrough())
        .max(30),
    })
    .nullable()
    .default(null),
});

// One call per scene keeps each response small and lets the UI fill in
// scenes as they finish instead of waiting on the whole episode.
export const POST = withMember(async (req) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { scene, prevScene, nextScene, bible, characters, locations, products, kind, maxClipSeconds, redo } = body.data;
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
- startFrame: the keyframe composition, written as precise pose and placement: each person's body position and orientation (standing, seated, lying on their back, facing camera or three-quarter), where they sit in the frame (left/right third, upper/lower half, head toward which edge), where they are relative to the set's named fixed objects, what each hand is doing and holding, gaze and expression, and where any product sits and which way its label faces. This becomes the still image, so leave nothing to guess.
- action: the movement and performance during the clip (gestures, expressions, dialogue delivery), naming characters by name.
- performance: 3-8 short cues for expression, energy and micro-movements that fit this brief and character (e.g. "strong direct eye contact", "knowing smirk", "slow head tilt", "light hair touch"). Empty when no one is on screen.
- choreography: the action as ordered, physically explicit beats, one per item. Spell out cause before effect ("her fingers wrap around the remote", "her thumb visibly presses the button", "ONLY THEN the fan starts"). Hands touch what they hold. 2-7 beats.
- mechanics: rules for anything besides people that moves, transforms or acts as a transition device, written so a video model can't get them wrong: direction in screen space (e.g. "clockwise: top → right, right → down, bottom → left, left → up"), fixed pivots that never move, what triggers what, and for wipes exactly what is ahead of / under / behind the wiping object. Empty when nothing else moves.
- wardrobe: when the outfit changes during this clip, every complete outfit in order (outfit 1 = the one in the start frame), each written garment by garment with colors, fabrics and accessories. Empty when the outfit doesn't change.
- priorities: 2-6 must-haves specific to this shot, most important first, in short imperative capitals style (e.g. "SHE PRESSES THE REMOTE BEFORE THE FAN MOVES."). Don't repeat identity or camera consistency; those are added automatically.
- camera: framing only, shot size and angle (e.g. "low-angle medium shot"). Vary shot sizes so the edit feels cinematic.
- cameraMove: camera movement during the clip (e.g. "slow dolly-in", "handheld follow", "static").
- mood and lighting: short and specific. Keep lighting consistent within the scene${location ? " and with the set's default light unless the story changes the time of day" : ""}.
- Continuity: endFrame describes exactly what the last frame shows. Each shot's startFrame must pick up from the previous shot's endFrame (same positions, props, eyelines, screen direction).
- continueFromPrevious: true when the shot is the same camera angle continuing the previous shot's action, so the member should generate it from the previous clip's last frame. False for a new angle.${sameSetAsPrev ? "" : " The first shot is always false."}
- transition: how this shot joins the previous clip: "hard cut", "match cut on <thing>", "continuous", "whip pan", "fade from black", etc. The first shot's transition should bridge from the previous scene.
- The last shot should end on a frame that leads naturally into the next scene.${
        redo
          ? `

REGENERATE ONE SHOT. These are the scene's current shots:
${redo.shots.map((s) => `${s.number}. [${s.durationSeconds}s] start: ${s.startFrame} | action: ${s.action} | end: ${s.endFrame} | camera: ${s.camera}, ${s.cameraMove}`).join("\n")}
Return exactly ONE shot: a fresh take on shot ${redo.shotNumber}, same duration, still picking up from shot ${redo.shotNumber - 1 || "the previous scene"}'s end frame and handing off to shot ${redo.shotNumber + 1}'s start frame. ${redo.note ? `The member says the last version had this problem, so fix it: "${redo.note}".` : "Keep the story beat but make the composition simpler and easier for the video model to render cleanly (fewer hands on props, clearer poses, less motion)."}`
          : ""
      }`,
    });

    if (redo) {
      const s = out.shots[0];
      const i = redo.shotNumber - 1;
      const shot = {
        ...s,
        number: redo.shotNumber,
        durationSeconds: redo.shots[i]?.durationSeconds ?? s.durationSeconds,
        characterIds: s.characterIds.filter((id) => ids.has(id)),
        productIds: s.productIds.filter((id) => productIds.has(id)),
        continueFromPrevious: s.continueFromPrevious && (i > 0 || sameSetAsPrev),
      };
      return NextResponse.json({ sceneNumber: scene.number, shots: [withPrompts(shot, { characters, products, bible, location, kind })] });
    }

    const shots = out.shots.map((s, i) => {
      const shot = {
        ...s,
        number: i + 1,
        characterIds: s.characterIds.filter((id) => ids.has(id)),
        productIds: s.productIds.filter((id) => productIds.has(id)),
        continueFromPrevious: s.continueFromPrevious && (i > 0 || sameSetAsPrev),
      };
      return withPrompts(shot, { characters, products, bible, location, kind });
    });
    return NextResponse.json({ sceneNumber: scene.number, shots });
  } catch (err) {
    return errorResponse(err);
  }
});
