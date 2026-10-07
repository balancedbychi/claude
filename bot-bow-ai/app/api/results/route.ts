import { NextResponse } from "next/server";
import { withMember } from "@/lib/server/auth.ts";
import { listPosts } from "@/lib/server/performance.ts";

export const GET = withMember(async (_req, { user, profile }) =>
  NextResponse.json({ posts: await listPosts(user.id), shareWinners: profile.shareWinners, hasPerformance: profile.hasPerformance }),
);
