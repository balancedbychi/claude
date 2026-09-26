import type { Character, Location, SeriesBible, Shot } from "./types.ts";

// Consistency is the core promise of the app, so character and set
// descriptions are never left to the model to paraphrase. Claude decides the
// composition, performance, camera and continuity for each shot; this module
// pastes the saved sheets into every prompt verbatim.
//
// Each shot gets two prompts, matching the image-first workflow: generate a
// keyframe still with the character and set references, then animate it.

export function characterAnchor(c: Character): string {
  const parts = [
    `${c.name}${c.age ? `, ${c.age}` : ""}`,
    c.look,
    c.wardrobe ? `wearing ${c.wardrobe}` : "",
  ].filter((p) => p.trim().length > 0);
  return parts.join("; ");
}

export function locationAnchor(l: Location): string {
  return `${l.setName ? `${l.setName}, ` : ""}${l.name}: ${l.details}`;
}

type ShotPlan = Omit<Shot, "imagePrompt" | "animationPrompt">;

function castOf(shot: ShotPlan, characters: Character[]): Character[] {
  return shot.characterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is Character => Boolean(c));
}

export function buildImagePrompt(shot: ShotPlan, characters: Character[], bible: SeriesBible, location?: Location): string {
  const cast = castOf(shot, characters);
  return [
    `Photorealistic still frame. ${shot.startFrame || shot.action}`,
    cast.length > 0 ? `Characters (match reference exactly): ${cast.map(characterAnchor).join(" | ")}` : "",
    location ? `Set (match reference exactly): ${locationAnchor(location)}` : bible.setting ? `World: ${bible.setting}` : "",
    `Framing: ${shot.camera}`,
    `Lighting: ${shot.lighting}`,
    `Mood: ${shot.mood}`,
    `Style: ${bible.visualStyle || "cinematic, photorealistic"}, natural skin texture, sharp focus.`,
    `Aspect ratio ${bible.aspectRatio}. No text, no watermark.`,
  ]
    .filter((l) => l.length > 0)
    .join("\n");
}

export function buildAnimationPrompt(shot: ShotPlan, characters: Character[]): string {
  const names = castOf(shot, characters).map((c) => c.name);
  return [
    shot.continueFromPrevious ? "Start from the last frame of the previous clip." : "Start from the keyframe image.",
    shot.action.trim(),
    shot.cameraMove ? `Camera: ${shot.cameraMove}` : "",
    shot.endFrame ? `Ends on: ${shot.endFrame}` : "",
    `Keep ${names.length > 0 ? `${names.join(" and ")}'s face, hair and outfit` : "every detail"} and the set identical to the start image. Natural, realistic motion, ${shot.durationSeconds}s.`,
  ]
    .filter((l) => l.length > 0)
    .join("\n");
}

export function withPrompts(
  shot: ShotPlan,
  characters: Character[],
  bible: SeriesBible,
  location?: Location,
): Shot {
  return {
    ...shot,
    imagePrompt: buildImagePrompt(shot, characters, bible, location),
    animationPrompt: buildAnimationPrompt(shot, characters),
  };
}

/** Prompt for the one-time reference image members upload to their video tool. */
export function characterSheetPrompt(c: Character, bible: SeriesBible): string {
  return [
    `Character reference sheet of ${characterAnchor(c)}.`,
    "Front view, three-quarter view and side profile, full body and close-up of the face, neutral expression, plain light-grey studio background, even soft lighting.",
    `Style: ${bible.visualStyle || "cinematic, photorealistic"}. Same face, hair and outfit in every view.`,
  ].join("\n");
}

/** Prompt for an empty establishing shot of a room, used as the set reference image. */
export function locationSheetPrompt(l: Location, bible: SeriesBible): string {
  return [
    `Wide establishing shot of an empty interior set. ${locationAnchor(l)}.`,
    `Lighting: ${l.lighting || "soft natural daylight"}.`,
    "No people. Eye-level, wide lens, whole room visible, sharp detail on materials and furniture.",
    `Style: ${bible.visualStyle || "cinematic, photorealistic"}. Aspect ratio ${bible.aspectRatio}.`,
  ].join("\n");
}
