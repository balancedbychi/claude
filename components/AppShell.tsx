"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Clapperboard,
  Home,
  Library,
  Megaphone,
  Shirt,
  ShoppingBag,
  Sofa,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BRAND } from "@/lib/brand.ts";

export const TOOLS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/builder", label: "Episode Builder", icon: Clapperboard },
  { href: "/cast", label: "Cast Studio", icon: Users },
  { href: "/sets", label: "Set Designer", icon: Sofa },
  { href: "/episodes", label: "Episodes", icon: Library },
];

export const COMING_SOON: { label: string; icon: LucideIcon; blurb: string }[] = [
  { label: "UGC Ad Builder", icon: ShoppingBag, blurb: "Product review storyboards with your AI creator holding and using the product." },
  { label: "Commercial Builder", icon: Megaphone, blurb: "Turn one product into a cinematic, fully directed ad campaign." },
  { label: "Try-On Transitions", icon: Shirt, blurb: "Outfit and makeup transformation storyboards with precise timings." },
  { label: "Prompt Vault", icon: BookOpen, blurb: "Proven image prompts, camera moves and visual styles, ready to copy." },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
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
          {TOOLS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={isActive(pathname, href) ? "active" : ""}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </Link>
          ))}
          <div className="nav-label eyebrow">Coming soon</div>
          {COMING_SOON.map(({ label, icon: Icon }) => (
            <span key={label} className="soon-item">
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </span>
          ))}
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
        {TOOLS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={isActive(pathname, href) ? "active" : ""}>
            <Icon size={20} strokeWidth={1.8} />
            {label.replace("Episode ", "").replace(" Studio", "").replace("Set Designer", "Sets")}
          </Link>
        ))}
      </nav>
    </div>
  );
}
