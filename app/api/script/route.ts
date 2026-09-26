import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { systemFor } from "@/lib/playbook.ts";
import { BibleIn, CharacterIn, ConceptIn, LocationIn, ScriptOut } from "@/lib/schemas.ts";
import { castBlock, errorResponse, readBody, setsBlock } from "@/lib/api.ts";

const Body = z.object({
  concept: ConceptIn,
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  locations: z.array(LocationIn).max(30).default([]),
  targetMinutes: z.number().min(1).max(10).default(4.5),
});

export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { concept, bible, characters, locations, targetMinutes } = body.data;
  const ids = new Set(characters.map((c) => c.id));
  const locationIds = new Set(locations.map((l) => l.id));

  try {
    const script = await generate({
      system: systemFor("script"),
      schema: ScriptOut,
      effort: "high",
      prompt: `Write the full script for this episode.

Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"}
Setting: ${bible.setting || "open"}
Cast (reference characters ONLY by these ids in characterIds):
${castBlock(characters)}
Locked sets (put the matching id in locationId; use "" only for a place not listed):
${setsBlock(locations)}

Episode: ${concept.title}
Logline: ${concept.logline}
Opening hook: ${concept.hook}${concept.hookStyle ? ` (${concept.hookStyle})` : ""}

Requirements:
- Total runtime about ${targetMinutes} minutes (${Math.round(targetMinutes * 60)} seconds). Set totalSeconds to the sum of scene durations.
- 8 to 14 scenes, numbered from 1. Scene 1 opens on the hook.
- For each scene: a short title, location, locationId, onScreenText ("" unless an on-screen caption helps, e.g. "3 weeks later"), durationSeconds, characterIds on screen, the visual action (what the camera sees, concrete and renderable by an AI video model), and the lines (voiceover as speaker "Narrator", or dialogue by character name).
- Prefer the locked sets so the world stays consistent. Keep continuity of time of day, props and outfits from scene to scene.
- hookStyle: the style of the opening you wrote. altHooks: 3 alternative opening lines in different hook styles, for testing.
- Paced for short-form: a turn or reveal every 20-30 seconds, and end on a cliffhanger that sets up the next episode.`,
    });

    // Drop any ids the model invented so downstream prompts stay consistent.
    script.scenes = script.scenes.map((s) => ({
      ...s,
      characterIds: s.characterIds.filter((id) => ids.has(id)),
      locationId: locationIds.has(s.locationId) ? s.locationId : "",
      onScreenText: s.onScreenText ?? "",
    }));
    script.totalSeconds = script.scenes.reduce((t, s) => t + s.durationSeconds, 0);
    return NextResponse.json(script);
  } catch (err) {
    return errorResponse(err);
  }
}
