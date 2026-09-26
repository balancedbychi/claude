import { AppShell } from "@/components/AppShell.tsx";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
