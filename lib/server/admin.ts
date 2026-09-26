import "server-only";
import { db } from "./db.ts";
import { latestStats } from "./performance.ts";
import { hookStyleStats, median, scorePosts } from "../score.ts";

export interface WinnerRow {
  id: string;
  email: string;
  kind: string;
  niche: string;
  hookStyle: string;
  hook: string;
  excerpt: string;
  score: number;
  views: number;
  status: "candidate" | "approved" | "rejected";
  adminNote: string;
  url: string;
  platform: string;
  createdAt: string;
}

export async function adminOverview() {
  const sql = db();
  const [totals] = await sql<{ members: number; projects: number; posts: number; checkins: number }[]>`
    select (select count(*)::int from profiles where is_member) as members,
           (select count(*)::int from projects) as projects,
           (select count(*)::int from posts) as posts,
           (select count(*)::int from checkins) as checkins`;

  const winners = await sql<(Omit<WinnerRow, "hookStyle" | "adminNote" | "createdAt"> & { hook_style: string; admin_note: string; created_at: string })[]>`
    select w.id, pr.email, w.kind, w.niche, w.hook_style, w.hook, w.excerpt, w.score, w.views, w.status, w.admin_note,
           p.url, p.platform, w.created_at::text
    from winners w
    join profiles pr on pr.user_id = w.user_id
    join posts p on p.id = w.post_id
    order by (w.status = 'candidate') desc, w.score desc
    limit 200`;

  const stats = await latestStats();
  const scored = scorePosts(stats.map((s) => ({ postId: s.post_id, userId: s.user_id, views: s.views, likes: s.likes, comments: s.comments, shares: s.shares, saves: s.saves })));
  const kinds = [...new Set(stats.map((s) => s.kind ?? "other"))];
  const byTool = kinds.map((kind) => {
    const rows = stats.filter((s) => (s.kind ?? "other") === kind);
    const scores = rows.map((s) => scored.get(s.post_id)?.score).filter((x): x is number => x !== null && x !== undefined);
    return {
      kind,
      posts: rows.length,
      medianScore: scores.length ? median(scores) : null,
      winners: rows.filter((s) => scored.get(s.post_id)?.winner).length,
      hookStyles: hookStyleStats(
        rows.map((s) => ({ hookStyle: s.hook_style ?? "", score: scored.get(s.post_id)?.score ?? null, winner: scored.get(s.post_id)?.winner ?? false })),
        1,
      ),
    };
  });

  return {
    totals,
    winners: winners.map((w) => ({ ...w, hookStyle: w.hook_style, adminNote: w.admin_note, createdAt: w.created_at })) as WinnerRow[],
    byTool,
  };
}

export async function reviewWinner(id: string, status: "approved" | "rejected" | "candidate", note: string): Promise<boolean> {
  const rows = await db()`
    update winners set status = ${status}, admin_note = ${note}, reviewed_at = now()
    where id = ${id} returning id`;
  return rows.length === 1;
}
