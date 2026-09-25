import type { Character, Location, SeriesBible, Shot } from "./types.ts";

// Consistency is the core promise of the app, so character and set
// descriptions are never left to the model to paraphrase. Claude decides the
// action, camera, mood, lighting and continuity for each shot; this module
// pastes the saved sheets into every prompt verbatim.

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

export function buildShotPrompt(
  shot: Omit<Shot, "prompt">,
  characters: Character[],
  bible: SeriesBible,
  location?: Location,
): string {
  const cast = shot.characterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is Character => Boolean(c));

  const lines = [
    shot.continueFromPrevious ? "Continue seamlessly from the previous clip's last frame." : "",
    shot.startFrame ? `Opening frame: ${shot.startFrame}` : "",
    shot.action.trim(),
    cast.length > 0
      ? `Characters (keep identical to reference): ${cast.map(characterAnchor).join(" | ")}`
      : "",
    location
      ? `Set (keep identical to reference): ${locationAnchor(location)}`
      : bible.setting
        ? `World: ${bible.setting}`
        : "",
    `Camera: ${shot.camera}`,
    `Mood: ${shot.mood}`,
    `Lighting: ${shot.lighting}`,
    shot.endFrame ? `Ends on: ${shot.endFrame}` : "",
    `Style: ${bible.visualStyle || "cinematic, photorealistic"}`,
    `Aspect ratio ${bible.aspectRatio}, ${shot.durationSeconds}s clip, consistent faces, outfits and set, no text on screen.`,
  ];
  return lines.filter((l) => l.length > 0).join("\n");
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
