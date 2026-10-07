import { NextResponse } from "next/server";
import { DEV_COOKIE, devCookieValue, supabaseConfigured } from "@/lib/dev-session.ts";

// Development only: sign in with just an email. Disabled in production and
// whenever Supabase is configured.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production" || supabaseConfigured()) {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }
  const { email } = (await req.json().catch(() => ({}))) as { email?: unknown };
  if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEV_COOKIE, await devCookieValue(email.toLowerCase()), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
