import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { systemFor } from "@/lib/playbook.ts";
import { BibleIn, BriefIn, CharacterIn, LocationIn, ProductIn, ScriptOut } from "@/lib/schemas.ts";
import { castBlock, errorResponse, productsBlock, readBody, setsBlock } from "@/lib/api.ts";
import { TOOLS } from "@/lib/tools.ts";

const Body = z.object({
  kind: z.enum(["ugc", "commercial", "transition"]),
  brief: BriefIn,
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  locations: z.array(LocationIn).max(30).default([]),
  products: z.array(ProductIn).max(20).default([]),
});

// The "script" for the short-form ad tools: timed beats with dialogue and
// on-screen text. The storyboard step then breaks each beat into shots.
export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { kind, brief, bible, characters, locations, products } = body.data;
  const tool = TOOLS[kind];

  const product = products.find((p) => p.id === brief.productId);
  if (tool.needsProduct && !product) {
    return NextResponse.json({ error: "Pick a product for this ad." }, { status: 400 });
  }
  const creator = characters.find((c) => c.id === brief.characterId);
  const set = locations.find((l) => l.id === brief.locationId);
  const ids = new Set(characters.map((c) => c.id));
  const locationIds = new Set(locations.map((l) => l.id));

  try {
    const script = await generate({
      system: systemFor("beats", kind),
      schema: ScriptOut,
      effort: "high",
      prompt: `${tool.beatsDirection}

Brand/series: ${bible.seriesName || "n/a"} | Niche: ${bible.niche || "general"} | Format: ${bible.aspectRatio}
${tool.angleLabel}: ${brief.angle || "your choice"}
Total length: ${brief.lengthSeconds} seconds. Durations must add up to exactly ${brief.lengthSeconds}.
${product ? `Product (id "${product.id}"):\n${productsBlock([product])}` : "No product."}
${creator ? `Creator / lead (id "${creator.id}"): ${creator.name}. Voice: ${creator.voice || "natural"}. Personality: ${creator.personality || "warm"}.` : "No fixed creator: use a narrator voiceover or hands-only shots."}
Cast available (reference only by id in characterIds):
${castBlock(characters)}
Sets available (use the id in locationId; "" for anywhere else):
${setsBlock(locations)}
${set ? `Preferred set: id "${set.id}" (${set.name}).` : ""}
${brief.items.trim() ? `Items / steps, in this order:\n${brief.items.trim()}` : ""}
${brief.message ? `Key message or offer: ${brief.message}` : ""}
${brief.cta ? `Call to action: ${brief.cta}` : ""}
${brief.notes ? `Extra notes from the member: ${brief.notes}` : ""}

Return a title, the hookStyle of the opening you wrote, altHooks (4 alternative opening lines in different hook styles, each under 12 words, for A/B testing), and the beats as scenes numbered from 1. For each: title (the beat name, e.g. "Hook", "Demo", "Earrings"), location, locationId, durationSeconds, characterIds on screen, action (exactly what the camera sees, concrete and renderable), onScreenText, and lines (dialogue by character name, or "Narrator" for voiceover; [] for silent beats).`,
    });

    script.scenes = script.scenes.map((s, i) => ({
      ...s,
      number: i + 1,
      characterIds: s.characterIds.filter((id) => ids.has(id)),
      locationId: locationIds.has(s.locationId) ? s.locationId : "",
    }));
    script.totalSeconds = script.scenes.reduce((t, s) => t + s.durationSeconds, 0);
    return NextResponse.json(script);
  } catch (err) {
    return errorResponse(err);
  }
}
