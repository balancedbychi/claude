import { NextResponse } from "next/server";
import { z } from "zod";
import { readBody } from "@/lib/api.ts";
import { BibleIn, CharacterIn, LocationIn, ProductIn } from "@/lib/schemas.ts";
import { withMember } from "@/lib/server/auth.ts";
import { getPricing } from "@/lib/server/settings.ts";
import { loadStudio, saveStudio } from "@/lib/server/studio.ts";

export const GET = withMember(async (_req, { user }) => {
  const [studio, pricing] = await Promise.all([loadStudio(user.id), getPricing()]);
  return NextResponse.json({ ...studio, pricing });
});

const Body = z.object({
  bible: BibleIn.optional(),
  characters: z.array(CharacterIn).max(50).optional(),
  locations: z.array(LocationIn).max(150).optional(),
  products: z.array(ProductIn).max(150).optional(),
});

export const PUT = withMember(async (req, { user }) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  await saveStudio(user.id, body.data);
  return NextResponse.json({ ok: true });
});
