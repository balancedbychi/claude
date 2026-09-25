import type { Character, SeriesBible, Shot } from "./types.ts";

// Character consistency is the core promise of the app, so the character
// description is never left to the model to paraphrase. Claude decides the
// action, camera, mood and lighting for each shot; this module pastes the
// saved character sheet into every prompt verbatim.

export function characterAnchor(c: Character): string {
  const parts = [
    `${c.name}${c.age ? `, ${c.age}` : ""}`,
    c.look,
    c.wardrobe ? `wearing ${c.wardrobe}` : "",
  ].filter((p) => p.trim().length > 0);
  return parts.join("; ");
}

export function buildShotPrompt(
  shot: Omit<Shot, "prompt">,
  characters: Character[],
  bible: SeriesBible,
): string {
  const cast = shot.characterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is Character => Boolean(c));

  const lines = [
    shot.action.trim(),
    cast.length > 0
      ? `Characters (keep identical to reference): ${cast.map(characterAnchor).join(" | ")}`
      : "",
    `Camera: ${shot.camera}`,
    `Mood: ${shot.mood}`,
    `Lighting: ${shot.lighting}`,
    bible.setting ? `World: ${bible.setting}` : "",
    `Style: ${bible.visualStyle || "cinematic, photorealistic"}`,
    `Aspect ratio ${bible.aspectRatio}, ${shot.durationSeconds}s clip, consistent faces and outfits, no text on screen.`,
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
