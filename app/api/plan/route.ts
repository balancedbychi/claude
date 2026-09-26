import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { errorResponse, readBody } from "@/lib/api.ts";
import { PlanOut } from "@/lib/schemas.ts";
import { withMember } from "@/lib/server/auth.ts";
import { TOOLS } from "@/lib/tools.ts";

const Item = z.object({ id: z.string().max(64), label: z.string().max(200) });
const Body = z.object({
  ask: z.string().min(3).max(1500),
  niche: z.string().max(200).default(""),
  characters: z.array(Item).max(50).default([]),
  products: z.array(Item).max(150).default([]),
  locations: z.array(Item).max(150).default([]),
});

const SYSTEM = `You are bow, the manager of an AI content team (hook scout: ideas; penny: writer; dot: director; ad bestie: UGC and ads).
A creator describes what they want in their own words. Turn it into a production plan for exactly one of the studio's tools, using items from their library by id.
Choose sensible defaults for anything they didn't say. Never invent library ids.`;

// "Make me a 30s problem-solution ad for Glow Drops with Zara" → a ready-to-run plan.
export const POST = withMember(async (req) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { ask, niche, characters, products, locations } = body.data;
  const list = (items: { id: string; label: string }[]) => items.map((i) => `- "${i.id}": ${i.label}`).join("\n") || "(none)";

  try {
    const plan = await generate({
      system: SYSTEM,
      schema: PlanOut,
      effort: "low",
      maxTokens: 4000,
      prompt: `The creator's ask: """${ask}"""
Their niche: ${niche || "not set"}

Tools:
- episode: a story episode for a faceless AI drama series. Set topic (the story idea, keeping their words) and targetMinutes (1-5, default 4.5 unless they give a length).
- ugc: a UGC ad a creator performs to camera for a product. Formats: ${TOOLS.ugc.angles.join(" | ")}. Lengths: ${TOOLS.ugc.lengths.join(", ")}s.
- commercial: a cinematic brand commercial for a product. Styles: ${TOOLS.commercial.angles.join(" | ")}. Lengths: ${TOOLS.commercial.lengths.join(", ")}s.
- transition: an outfit or makeup transformation. Types: ${TOOLS.transition.angles.join(" | ")}. Lengths: ${TOOLS.transition.lengths.join(", ")}s. Put the pieces or steps, one per line, in items (invent a tasteful list if they didn't give one).

Library characters:
${list(characters)}
Library products:
${list(products)}
Library sets:
${list(locations)}

Return: kind; topic (episode only, else ""); targetMinutes; productId, characterId, locationId (ids from the library or ""; for ads pick the product they named, else the most relevant one; pick a character for UGC and transitions when one fits); angle (exactly one option from the tool's list, "" for episodes); lengthSeconds; items; message and cta (ads, "" if none); notes (anything else from the ask worth passing on); reply (one warm, casual sentence from bow saying what the team will make, under 30 words, lowercase is fine).`,
    });

    const tool = TOOLS[plan.kind];
    const ids = (items: { id: string }[], id: string) => (items.some((i) => i.id === id) ? id : "");
    const productId = ids(products, plan.productId) || (tool.needsProduct ? products[0]?.id ?? "" : "");
    if (tool.needsProduct && !productId) {
      return NextResponse.json({ error: "That needs a product. Add it on the Products page first, then ask again." }, { status: 400 });
    }
    const closest = (n: number) => tool.lengths.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a), tool.lengths[0]);
    return NextResponse.json({
      kind: plan.kind,
      reply: plan.reply,
      topic: plan.kind === "episode" ? plan.topic || ask : "",
      targetMinutes: Math.min(5, Math.max(1, plan.targetMinutes || 4.5)),
      brief:
        plan.kind === "episode"
          ? null
          : {
              productId,
              characterId: ids(characters, plan.characterId),
              locationId: ids(locations, plan.locationId),
              angle: tool.angles.includes(plan.angle) ? plan.angle : tool.angles[0],
              lengthSeconds: closest(plan.lengthSeconds),
              items: plan.items.slice(0, 1500),
              message: plan.message.slice(0, 600),
              cta: plan.cta.slice(0, 200),
              notes: plan.notes.slice(0, 1000),
            },
    });
  } catch (err) {
    return errorResponse(err);
  }
});
