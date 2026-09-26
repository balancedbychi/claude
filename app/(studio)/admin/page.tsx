import { notFound } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard.tsx";
import { getProfile, getSessionUser } from "@/lib/server/auth.ts";

export default async function Page() {
  const user = await getSessionUser();
  if (!user || !(await getProfile(user)).isAdmin) notFound();
  return <AdminDashboard />;
}
