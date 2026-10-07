import { redirect } from "next/navigation";
import { RedeemForm } from "@/components/RedeemForm.tsx";
import { getProfile, getSessionUser } from "@/lib/server/auth.ts";

// Depends on who is signed in, so it's rendered per request, never at build time.
export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const profile = await getProfile(user);
  if (profile.isMember) redirect("/");
  return <RedeemForm email={profile.email} />;
}
