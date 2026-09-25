import { NextResponse } from "next/server";
import { COOKIE, tokenForCode } from "@/lib/access.ts";

export async function POST(req: Request) {
  const { code } = (await req.json().catch(() => ({}))) as { code?: unknown };
  const token = typeof code === "string" ? await tokenForCode(code) : null;
  if (!token) {
    return NextResponse.json({ error: "That access code isn't valid." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
  return res;
}
