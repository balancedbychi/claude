"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
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

type NavItem = { href: string; label: string; icon: LucideIcon; blurb: string };

export const CREATE: NavItem[] = [
  { href: "/builder", label: "Episode Builder", icon: Clapperboard, blurb: "Idea to storyboard: hooks, a timed script, keyframe and animation prompts, and an edit guide." },
  { href: "/ugc", label: "UGC Ad Builder", icon: ShoppingBag, blurb: "Product review storyboards with your AI creator holding, applying and loving the product." },
  { href: "/commercial", label: "Commercial Builder", icon: Megaphone, blurb: "Turn one product into a cinematic, fully directed brand commercial." },
  { href: "/transitions", label: "Try-On Transitions", icon: Shirt, blurb: "Outfit and makeup transformations, step by step, with precise timings." },
  { href: "/vault", label: "Prompt Vault", icon: BookOpen, blurb: "Proven image prompts, camera moves and looks, filled with your cast and products." },
];

export const LIBRARY: NavItem[] = [
  { href: "/cast", label: "Cast Studio", icon: Users, blurb: "Your AI influencers and recurring cast." },
  { href: "/sets", label: "Set Designer", icon: Sofa, blurb: "Luxury homes and studios, room by room." },
  { href: "/products", label: "Products", icon: Package, blurb: "Packaging and claims for every product." },
  { href: "/projects", label: "Projects", icon: Library, blurb: "Every episode and ad you've built." },
];

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark">{BRAND.mark}</span>
          <span className="brand-name">{BRAND.name}</span>
        </Link>
        <nav className="nav">
          <NavLink href="/" label="Home" icon={Home} pathname={pathname} />
          <div className="nav-label eyebrow">Create</div>
          {CREATE.map((t) => <NavLink key={t.href} {...t} pathname={pathname} />)}
          <div className="nav-label eyebrow">Library</div>
          {LIBRARY.map((t) => <NavLink key={t.href} {...t} pathname={pathname} />)}
        </nav>
        <div className="sidebar-foot faint tiny">{BRAND.tagline}</div>
      </aside>

      <div className="main">
        <div className="mobile-top">
          <Link href="/" className="brand">
            <span className="brand-mark">{BRAND.mark}</span>
            <span className="brand-name">{BRAND.name}</span>
          </Link>
        </div>
        {children}
      </div>

      <nav className="tabbar">
        {TABS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={isActive(pathname, href) ? "active" : ""}>
            <Icon size={20} strokeWidth={1.8} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
