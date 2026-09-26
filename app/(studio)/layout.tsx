import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell.tsx";
import { getProfile, getSessionUser } from "@/lib/server/auth.ts";

// Depends on who is signed in, so it's rendered per request, never at build time.
export const dynamic = "force-dynamic";

// Every studio page requires a signed-in member.
export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const profile = await getProfile(user);
  if (!profile.isMember) redirect("/welcome");
  return (
    <AppShell account={{ email: profile.email, isAdmin: profile.isAdmin, hasPerformance: profile.hasPerformance }}>
      {children}
    </AppShell>
  );
}
