import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/server/db.ts";
import { getProfile, getSessionUser } from "@/lib/server/auth.ts";

const Body = z.object({ code: z.string().min(1).max(120) });

function codes(name: "MEMBER_ACCESS_CODES" | "PERFORMANCE_ACCESS_CODES"): string[] {
  return (process.env[name] || "").split(",").map((c) => c.trim()).filter(Boolean);
}

// Unlocks membership, or the Performance Pack, with a code from the purchase email.
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter your access code." }, { status: 400 });
  const code = parsed.data.code.trim();
  await getProfile(user); // make sure the profile row exists

  const sql = db();
  if (codes("PERFORMANCE_ACCESS_CODES").includes(code)) {
    await sql`update profiles set is_member = true, has_performance = true where user_id = ${user.id}`;
    return NextResponse.json({ ok: true, unlocked: "performance" });
  }
  if (codes("MEMBER_ACCESS_CODES").includes(code)) {
    await sql`update profiles set is_member = true where user_id = ${user.id}`;
    return NextResponse.json({ ok: true, unlocked: "member" });
  }
  // Slow down guessing.
  await new Promise((r) => setTimeout(r, 800));
  return NextResponse.json({ error: "That code isn't valid." }, { status: 400 });
}
