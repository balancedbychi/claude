import { NextResponse } from "next/server";
import { z } from "zod";
import { readBody } from "@/lib/api.ts";
import { withMember } from "@/lib/server/auth.ts";
import { setShareWinners } from "@/lib/server/performance.ts";

const Body = z.object({ shareWinners: z.boolean() });

export const PUT = withMember(async (req, { user }) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  await setShareWinners(user.id, body.data.shareWinners);
  return NextResponse.json({ ok: true });
});
