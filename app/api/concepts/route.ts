import { NextResponse } from "next/server";
import { z } from "zod";
import { generate, SYSTEM } from "@/lib/claude.ts";
import { BibleIn, CharacterIn, ConceptsOut } from "@/lib/schemas.ts";
import { castBlock, errorResponse, readBody } from "@/lib/api.ts";

const Body = z.object({
  topic: z.string().min(2).max(500),
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
});

export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { topic, bible, characters } = body.data;

  try {
    const out = await generate({
      system: SYSTEM,
      schema: ConceptsOut,
      effort: "medium",
      prompt: `Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"}
Setting: ${bible.setting || "open"}
Cast:
${castBlock(characters)}

Topic or idea from the creator: ${topic}

Pitch 4 distinct episode concepts for a 4-5 minute episode. For each give a title, a one-sentence logline, the exact hook for the first 3 seconds (a spoken line or on-screen moment), and one sentence on why it will hold viewers. Use the existing cast where it fits.`,
    });
    return NextResponse.json(out);
  } catch (err) {
    return errorResponse(err);
  }
}
