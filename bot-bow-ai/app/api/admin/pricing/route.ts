import { NextResponse } from "next/server";
import { readBody } from "@/lib/api.ts";
import { DEFAULT_PRICING } from "@/lib/pricing.ts";
import { PricingIn } from "@/lib/schemas.ts";
import { withMember } from "@/lib/server/auth.ts";
import { getPricing, savePricing } from "@/lib/server/settings.ts";

export const GET = withMember(async () => NextResponse.json({ pricing: await getPricing(), defaults: DEFAULT_PRICING }), { admin: true });

export const PUT = withMember(
  async (req) => {
    const body = await readBody(req, PricingIn);
    if ("error" in body) return body.error;
    const book = { ...body.data, updatedAt: new Date().toISOString().slice(0, 10) };
    const ids = book.models.map((m) => m.id);
    if (new Set(ids).size !== ids.length) return NextResponse.json({ error: "Each model needs a different id." }, { status: 400 });
    const has = (id: string, type: string) => book.models.some((m) => m.id === id && m.type === type);
    if (!has(book.defaultImage, "image") || !has(book.defaultVideo, "video") || (book.testVideo && !has(book.testVideo, "video"))) {
      return NextResponse.json({ error: "Pick the default image and video models and the test-clip settings from the list." }, { status: 400 });
    }
    await savePricing(book);
    return NextResponse.json({ pricing: book });
  },
  { admin: true },
);
