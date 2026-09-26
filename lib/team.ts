// The AI team. Each bot owns part of the work and "reports in" while it runs,
// so the studio feels like a team working for you rather than a form.

export type BotId = "bow" | "scout" | "penny" | "dot" | "bella" | "sage" | "bestie" | "nia";

export interface Teammate {
  id: BotId;
  name: string;
  role: string;
  emoji: string;
  color: string; // accent for their name and halo
  href: string; // where their work lives
  does: string;
}

export const TEAM: Record<BotId, Teammate> = {
  bow: { id: "bow", name: "bow", role: "manager", emoji: "🎀", color: "#e0648f", href: "/", does: "Turns your ask into a plan and hands it to the right bots." },
  scout: { id: "scout", name: "hook scout", role: "ideas & hooks", emoji: "🔎", color: "#3b9b90", href: "/builder", does: "Pitches episode ideas with scroll-stopping first lines." },
  penny: { id: "penny", name: "penny", role: "writer", emoji: "✍️", color: "#d64f4a", href: "/builder", does: "Writes timed scripts, ad beats and alternative hooks." },
  dot: { id: "dot", name: "dot", role: "director", emoji: "🎬", color: "#8a6fd3", href: "/builder", does: "Storyboards every shot with image and animation prompts." },
  bella: { id: "bella", name: "bella", role: "casting", emoji: "💄", color: "#e0648f", href: "/cast", does: "Designs your AI influencers and keeps their faces identical." },
  sage: { id: "sage", name: "sage", role: "set stylist", emoji: "🛋️", color: "#b8862f", href: "/sets", does: "Designs luxury homes and studios, room by room." },
  bestie: { id: "bestie", name: "ad bestie", role: "UGC & ads", emoji: "🛍️", color: "#e07a3f", href: "/ugc", does: "Turns a product into UGC ads, commercials and try-ons." },
  nia: { id: "nia", name: "nia", role: "numbers", emoji: "📊", color: "#3f73c9", href: "/results", does: "Tracks your posts and spots which hooks win." },
};

export const TEAM_ORDER: BotId[] = ["bow", "scout", "penny", "dot", "bestie", "bella", "sage", "nia"];
