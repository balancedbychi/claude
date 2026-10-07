import { NextResponse } from "next/server";
import { DEV_COOKIE, supabaseConfigured } from "@/lib/dev-session.ts";
import { supabaseServer } from "@/lib/server/auth.ts";

export async function POST() {
  if (supabaseConfigured()) await (await supabaseServer()).auth.signOut();
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(DEV_COOKIE);
  return res;
}
