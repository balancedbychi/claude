import "server-only";
import { db } from "./db.ts";
import { latestStats } from "./performance.ts";
import { hookStyleStats, scorePosts } from "../score.ts";
import type { PlaybookTask } from "../playbook.ts";
import type { ToolKind } from "../types.ts";

// Community insights for the AI: approved winning hooks and scripts, and how
// hook styles are performing, for the tool being used. Refreshed every 10
// minutes so the system prompt stays stable in between (cheaper, and it keeps
// prompt caching effective).

const TTL_MS = 10 * 60 * 1000;
const TASKS: PlaybookTask[] = ["concepts", "script", "beats", "package"];
const cache = new Map<string, { at: number; text: string }>();

export async function insightsFor(task: PlaybookTask, kind: ToolKind): Promise<string> {
  if (!TASKS.includes(task)) return "";
  const key = `${task}:${kind}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.text;
  let text = "";
  try {
    text = await buildInsights(task, kind);
  } catch (err) {
    // Insights are a bonus: never fail a generation because of them.
    console.error("insights unavailable", err);
  }
  cache.set(key, { at: Date.now(), text });
  return text;
}

async function buildInsights(task: PlaybookTask, kind: ToolKind): Promise<string> {
  const sql = db();
  const winners = await sql<{ hook_style: string; hook: string; excerpt: string; score: number; niche: string }[]>`
    select hook_style, hook, excerpt, score, niche from winners
    where status = 'approved' and kind = ${kind}
    order by score desc limit 5`;

  const stats = await latestStats();
  const scored = scorePosts(stats.map((s) => ({ postId: s.post_id, userId: s.user_id, views: s.views, likes: s.likes, comments: s.comments, shares: s.shares, saves: s.saves })));
  const styles = hookStyleStats(
    stats.filter((s) => s.kind === kind).map((s) => ({ hookStyle: s.hook_style ?? "", score: scored.get(s.post_id)?.score ?? null, winner: scored.get(s.post_id)?.winner ?? false })),
  );

  if (winners.length === 0 && styles.length === 0) return "";
  const out = ["WHAT'S WORKING NOW (real results from members' posts; learn the patterns, never copy the words)"];
  if (styles.length > 0) {
    const fmt = (s: (typeof styles)[number]) => `${s.hookStyle} ${s.medianScore.toFixed(1)}x typical views (${s.posts} posts)`;
    out.push(`Hook styles, best first: ${styles.slice(0, 4).map(fmt).join("; ")}.`);
    if (styles.length > 4) out.push(`Weakest lately: ${styles.slice(-2).map(fmt).join("; ")}.`);
    if (task === "concepts" || task === "beats") out.push("Lean towards the stronger styles, but keep variety so new patterns can still be discovered.");
  }
  if (winners.length > 0) {
    out.push("Winning examples:");
    for (const w of winners) {
      out.push(`- [${w.hook_style || "hook"} · ${w.score.toFixed(1)}x${w.niche ? ` · ${w.niche}` : ""}] Hook: "${w.hook}"${task === "package" ? "" : ` | Opening: ${w.excerpt}`}`);
    }
  }
  return out.join("\n");
}

/** Called when an admin reviews a winner, so the change reaches the AI right away. */
export function clearInsightsCache(): void {
  cache.clear();
}
