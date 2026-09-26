import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { systemFor } from "@/lib/playbook.ts";
import { BibleIn, CharacterOut } from "@/lib/schemas.ts";
import { errorResponse, readBody } from "@/lib/api.ts";

const Body = z.object({
  idea: z.string().min(2).max(600),
  bible: BibleIn,
  existing: z.array(z.string().max(80)).max(20).default([]),
});

// Drafts an original character sheet from a short idea. The member reviews
// and edits it before locking it in Cast Studio.
export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { idea, bible, existing } = body.data;

  try {
    const out = await generate({
      system: systemFor("character"),
      schema: CharacterOut,
      effort: "medium",
      prompt: `Design one original recurring character for this series.

Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"} | Visual style: ${bible.visualStyle || "photorealistic"}
Existing cast (make this character clearly distinct from them): ${existing.join(", ") || "none"}
What the creator wants: ${idea}

Return:
- name: a memorable first name that fits.
- role: their role in the stories or niche, one short phrase.
- age: an age range, e.g. "late 20s".
- look: 40-70 words of concrete, reproducible appearance: face shape, skin tone, eyes, brows, hair (length, texture, colour, style), build, one distinctive feature.
- wardrobe: 20-40 words: the signature outfit with exact colours and materials, plus one signature accessory.
- voice: how they sound, in a few words.
- personality: their want, their flaw and how they talk, in one or two sentences.`,
    });
    return NextResponse.json(out);
  } catch (err) {
    return errorResponse(err);
  }
}
