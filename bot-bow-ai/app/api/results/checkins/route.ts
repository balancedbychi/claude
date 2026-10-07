import { NextResponse } from "next/server";
import { z } from "zod";
import { readBody } from "@/lib/api.ts";
import { withMember } from "@/lib/server/auth.ts";
import { addCheckin } from "@/lib/server/performance.ts";

const count = z.number().int().min(0).max(2_000_000_000);
const Body = z.object({
  postId: z.string().uuid(),
  recordedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null),
  views: count,
  likes: count.default(0),
  comments: count.default(0),
  shares: count.default(0),
  saves: count.default(0),
  follows: count.default(0),
  sales: count.default(0),
});

export const POST = withMember(async (req, { user }) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { postId, recordedOn, ...metrics } = body.data;
  const ok = await addCheckin(user.id, postId, metrics, recordedOn);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Post not found." }, { status: 404 });
});
