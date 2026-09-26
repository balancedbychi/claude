import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { systemFor } from "@/lib/playbook.ts";
import { BibleIn, SetOut } from "@/lib/schemas.ts";
import { errorResponse, readBody } from "@/lib/api.ts";

const Body = z.object({
  brief: z.string().min(3).max(800),
  bible: BibleIn,
  roomCount: z.number().int().min(1).max(10).default(6),
});

// Designs a whole recurring set (a house, an office, a salon) room by room.
// Each room's details are later pasted verbatim into every shot filmed there.
export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { brief, bible, roomCount } = body.data;

  try {
    const out = await generate({
      system: systemFor("sets"),
      schema: SetOut,
      effort: "medium",
      prompt: `Design a recurring set for an AI video series, as a production designer would.

Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"} | Visual style: ${bible.visualStyle || "cinematic, photorealistic"}
Set brief from the creator: ${brief}

Return a short setName (e.g. "Hollywood Hills house") and ${roomCount} rooms or areas that stories would use most.
For each room:
- name: short (e.g. "Kitchen", "Primary bedroom", "Pool deck").
- details: 50-90 words of FIXED visual facts an AI video model can reproduce identically every time: layout and where the camera sees what, architecture, floor, wall and counter materials, exact colours, key furniture and decor pieces, what is visible through the windows. Concrete nouns and colours, no mood words, no people.
- lighting: the default time of day and light quality for that room.
Keep the rooms consistent with each other so they read as one property.`,
    });
    return NextResponse.json(out);
  } catch (err) {
    return errorResponse(err);
  }
}
