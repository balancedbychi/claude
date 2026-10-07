import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { db } from "./db.ts";
import { DEV_COOKIE, readDevCookie, supabaseConfigured } from "../dev-session.ts";

export interface SessionUser {
  id: string;
  email: string;
}

export interface Profile {
  userId: string;
  email: string;
  isMember: boolean;
  hasPerformance: boolean;
  shareWinners: boolean;
  isAdmin: boolean;
}

export type AuthMode = "supabase" | "dev";

/**
 * Supabase Auth when its keys are set. Without them, a development-only login
 * (email only, no password) so the app can be run and tested locally; it is
 * refused in production.
 */
export function authMode(): AuthMode {
  if (supabaseConfigured()) return "supabase";
  if (process.env.NODE_ENV === "production") {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return "dev";
}

export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component: the proxy refreshes the session instead.
        }
      },
    },
  });
}

// ---- Session and membership ----

export async function getSessionUser(): Promise<SessionUser | null> {
  if (authMode() === "dev") {
    return readDevCookie((await cookies()).get(DEV_COOKIE)?.value);
  }
  const { data } = await (await supabaseServer()).auth.getClaims();
  const claims = data?.claims;
  return claims?.sub ? { id: claims.sub, email: String(claims.email ?? "") } : null;
}

function isAdminEmail(email: string): boolean {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

/** Load the member's profile, creating it on first sign-in. */
export async function getProfile(user: SessionUser): Promise<Profile> {
  const sql = db();
  const [row] = await sql<{ user_id: string; email: string; is_member: boolean; has_performance: boolean; share_winners: boolean }[]>`
    insert into profiles (user_id, email) values (${user.id}, ${user.email})
    on conflict (user_id) do update set email = excluded.email
    returning user_id, email, is_member, has_performance, share_winners`;
  const admin = isAdminEmail(row.email);
  return {
    userId: row.user_id,
    email: row.email,
    // Admins always have full access, so the owner never locks themselves out.
    isMember: row.is_member || admin,
    hasPerformance: row.has_performance || admin,
    shareWinners: row.share_winners,
    isAdmin: admin,
  };
}

export interface MemberContext {
  user: SessionUser;
  profile: Profile;
}

type Handler<P> = (req: Request, ctx: MemberContext & { params: P }) => Promise<Response>;

/**
 * Wraps an API route so only signed-in members reach it. Every AI route uses
 * this, since each call is paid for from the studio's API key.
 */
export function withMember<P = Record<string, string>>(handler: Handler<P>, opts: { admin?: boolean; performance?: boolean } = {}) {
  return async (req: Request, route: { params: Promise<P> }) => {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const profile = await getProfile(user);
    if (!profile.isMember) return NextResponse.json({ error: "Your membership isn't active. Enter your access code." }, { status: 403 });
    if (opts.admin && !profile.isAdmin) return NextResponse.json({ error: "Admins only." }, { status: 403 });
    if (opts.performance && !profile.hasPerformance) {
      return NextResponse.json({ error: "This is part of the Performance Pack." }, { status: 403 });
    }
    return handler(req, { user, profile, params: route?.params ? await route.params : ({} as P) });
  };
}
