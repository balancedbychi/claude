import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm.tsx";
import { supabaseConfigured } from "@/lib/dev-session.ts";
import { getSessionUser } from "@/lib/server/auth.ts";

// Depends on who is signed in, so it's rendered per request, never at build time.
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : "/";
  if (await getSessionUser()) redirect(safeNext);
  return <LoginForm mode={supabaseConfigured() ? "supabase" : "dev"} next={safeNext} initialError={error} />;
}
