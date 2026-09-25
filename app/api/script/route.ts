import { NextResponse } from "next/server";
import { z } from "zod";
import { generate, SYSTEM } from "@/lib/claude.ts";
import { BibleIn, CharacterIn, ConceptIn, ScriptOut } from "@/lib/schemas.ts";
import { castBlock, errorResponse, readBody } from "@/lib/api.ts";

const Body = z.object({
  concept: ConceptIn,
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  targetMinutes: z.number().min(1).max(10).default(4.5),
});

export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { concept, bible, characters, targetMinutes } = body.data;
  const ids = new Set(characters.map((c) => c.id));

  try {
    const script = await generate({
      system: SYSTEM,
      schema: ScriptOut,
      effort: "high",
      prompt: `Write the full script for this episode.

Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"}
Setting: ${bible.setting || "open"}
Cast (reference characters ONLY by these ids in characterIds):
${castBlock(characters)}

Episode: ${concept.title}
Logline: ${concept.logline}
Opening hook: ${concept.hook}

Requirements:
- Total runtime about ${targetMinutes} minutes (${Math.round(targetMinutes * 60)} seconds). Set totalSeconds to the sum of scene durations.
- 8 to 14 scenes, numbered from 1. Scene 1 opens on the hook.
- For each scene: a short title, location, durationSeconds, characterIds on screen, the visual action (what the camera sees, concrete and renderable by an AI video model), and the lines (voiceover as speaker "Narrator", or dialogue by character name).
- Paced for short-form: a turn or reveal every 20-30 seconds, and end on a cliffhanger that sets up the next episode.`,
    });

    // Drop any ids the model invented so downstream prompts stay consistent.
    script.scenes = script.scenes.map((s) => ({
      ...s,
      characterIds: s.characterIds.filter((id) => ids.has(id)),
    }));
    script.totalSeconds = script.scenes.reduce((t, s) => t + s.durationSeconds, 0);
    return NextResponse.json(script);
  } catch (err) {
    return errorResponse(err);
  }
}
