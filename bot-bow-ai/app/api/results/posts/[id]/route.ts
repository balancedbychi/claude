import { NextResponse } from "next/server";
import { withMember } from "@/lib/server/auth.ts";
import { deletePost } from "@/lib/server/performance.ts";

export const DELETE = withMember<{ id: string }>(async (_req, { user, params }) => {
  if (!/^[0-9a-f-]{36}$/.test(params.id)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  await deletePost(user.id, params.id);
  return NextResponse.json({ ok: true });
});
