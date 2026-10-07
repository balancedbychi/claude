import { NextResponse } from "next/server";
import { z } from "zod";
import { readBody } from "@/lib/api.ts";
import { withMember } from "@/lib/server/auth.ts";
import { addPost } from "@/lib/server/performance.ts";

const HOSTS: Record<string, RegExp> = {
  tiktok: /(^|\.)tiktok\.com$/,
  instagram: /(^|\.)instagram\.com$/,
  youtube: /(^|\.)(youtube\.com|youtu\.be)$/,
};

const Body = z.object({
  projectId: z.string().max(64).nullable().default(null),
  platform: z.enum(["tiktok", "instagram", "youtube"]),
  url: z.string().url().max(500),
  hookUsed: z.string().max(300).default(""),
  postedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null),
});

export const POST = withMember(async (req, { user }) => {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { platform, url } = body.data;
  if (!HOSTS[platform].test(new URL(url).hostname)) {
    return NextResponse.json({ error: `That doesn't look like a ${platform} link.` }, { status: 400 });
  }
  const out = await addPost(user.id, body.data);
  return "error" in out ? NextResponse.json(out, { status: 400 }) : NextResponse.json(out);
});
