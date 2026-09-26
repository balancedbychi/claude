"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ShieldCheck,
  Clapperboard,
  Home,
  Library,
  Megaphone,
  Package,
  Shirt,
  ShoppingBag,
  Sofa,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BRAND } from "@/lib/brand.ts";
import type { BotId } from "@/lib/team.ts";
import { BrandMark } from "./BrandMark.tsx";
import { TeamProvider } from "./TeamProvider.tsx";
import { SignOutButton } from "./SignOutButton.tsx";
import { SaveStatus } from "./SaveStatus.tsx";
import { StudioProvider } from "@/lib/use-studio.ts";

type NavItem = { href: string; label: string; icon: LucideIcon; blurb: string; bot: BotId };

export const CREATE: NavItem[] = [
  { href: "/builder", label: "Episode Builder", icon: Clapperboard, blurb: "Idea to storyboard: hooks, a timed script, keyframe and animation prompts, and an edit guide.", bot: "hooks" },
  { href: "/ugc", label: "UGC Ad Builder", icon: ShoppingBag, blurb: "Product review storyboards with your AI creator holding, applying and loving the product.", bot: "ads" },
  { href: "/commercial", label: "Commercial Builder", icon: Megaphone, blurb: "Turn one product into a cinematic, fully directed brand commercial.", bot: "ads" },
  { href: "/transitions", label: "Try-On Transitions", icon: Shirt, blurb: "Outfit and makeup transformations, step by step, with precise timings.", bot: "casting" },
  { href: "/vault", label: "Prompt Vault", icon: BookOpen, blurb: "Proven image prompts, camera moves and looks, filled with your cast and products.", bot: "director" },
];

export const LIBRARY: NavItem[] = [
  { href: "/cast", label: "Cast Studio", icon: Users, blurb: "Your AI influencers and recurring cast.", bot: "casting" },
  { href: "/sets", label: "Set Designer", icon: Sofa, blurb: "Luxury homes and studios, room by room.", bot: "sets" },
  { href: "/products", label: "Products", icon: Package, blurb: "Packaging and claims for every product.", bot: "ads" },
  { href: "/projects", label: "Projects", icon: Library, blurb: "Every episode and ad you've built.", bot: "manager" },
  { href: "/results", label: "Results", icon: BarChart3, blurb: "Track how your posts perform, week by week.", bot: "stats" },
];

export interface Account {
  email: string;
  isAdmin: boolean;
  hasPerformance: boolean;
}

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Team", icon: Home },
  { href: "/builder", label: "Episodes", icon: Clapperboard },
  { href: "/ugc", label: "UGC", icon: ShoppingBag },
  { href: "/cast", label: "Cast", icon: Users },
  { href: "/projects", label: "Projects", icon: Library },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ href, label, icon: Icon, pathname }: { href: string; label: string; icon: LucideIcon; pathname: string }) {
  return (
    <Link href={href} className={isActive(pathname, href) ? "active" : ""}>
      <Icon size={18} strokeWidth={1.8} />
      {label}
    </Link>
  );
}

export function AppShell({ children, account }: { children: React.ReactNode; account: Account }) {
  const pathname = usePathname();
  return (
    <StudioProvider>
    <TeamProvider>
    <div className="app">
      <aside className="sidebar">
        <Link href="/" aria-label={`${BRAND.name} home`}>
          <BrandMark />
        </Link>
        <nav className="nav">
          <NavLink href="/" label="Ask the team" icon={Home} pathname={pathname} />
          <div className="nav-label eyebrow">do it yourself</div>
          {CREATE.map((t) => <NavLink key={t.href} {...t} pathname={pathname} />)}
          <div className="nav-label eyebrow">your library</div>
          {LIBRARY.map((t) => <NavLink key={t.href} {...t} pathname={pathname} />)}
          {account.isAdmin && (
            <>
              <div className="nav-label eyebrow">owner</div>
              <NavLink href="/admin" label="Admin" icon={ShieldCheck} pathname={pathname} />
            </>
          )}
        </nav>
        <div className="sidebar-foot stack tight">
          <span className="faint tiny" title={account.email} style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{account.email}</span>
          <SignOutButton />
        </div>
      </aside>

      <div className="main">
        <div className="mobile-top">
          <Link href="/" aria-label={`${BRAND.name} home`}>
            <BrandMark />
          </Link>
        </div>
        {children}
      </div>
      <SaveStatus />

      <nav className="tabbar">
        {TABS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={isActive(pathname, href) ? "active" : ""}>
            <Icon size={20} strokeWidth={1.8} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
    </TeamProvider>
    </StudioProvider>
  );
}
