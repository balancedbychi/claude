// The AI team. Each bot is named after its job, owns part of the work and
// reports in while it runs, so the studio feels like a team working for you.

export type BotId = "manager" | "hooks" | "writer" | "director" | "ads" | "casting" | "sets" | "stats";

export interface Teammate {
  id: BotId;
  name: string; // what the member sees: the job, in plain words
  role: string; // a few words on what they handle
  emoji: string;
  color: string; // accent for their name and halo
  href: string; // where their work lives
}

export const TEAM: Record<BotId, Teammate> = {
  manager: { id: "manager", name: "team manager", role: "plans every ask", emoji: "🎀", color: "#e0648f", href: "/" },
  hooks: { id: "hooks", name: "hook finder", role: "ideas & hooks", emoji: "🔎", color: "#3b9b90", href: "/builder" },
  writer: { id: "writer", name: "script writer", role: "scripts & ad copy", emoji: "✍️", color: "#d64f4a", href: "/builder" },
  director: { id: "director", name: "storyboard director", role: "shots & prompts", emoji: "🎬", color: "#8a6fd3", href: "/builder" },
  ads: { id: "ads", name: "ad maker", role: "UGC, ads & commercials", emoji: "🛍️", color: "#e07a3f", href: "/ugc" },
  casting: { id: "casting", name: "casting agent", role: "your AI characters", emoji: "💄", color: "#e0648f", href: "/cast" },
  sets: { id: "sets", name: "set designer", role: "homes & locations", emoji: "🛋️", color: "#b8862f", href: "/sets" },
  stats: { id: "stats", name: "stats tracker", role: "results & winners", emoji: "📊", color: "#3f73c9", href: "/results" },
};

export const TEAM_ORDER: BotId[] = ["manager", "hooks", "writer", "director", "ads", "casting", "sets", "stats"];
