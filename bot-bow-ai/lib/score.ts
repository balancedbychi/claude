// How performance is judged. Pure functions, shared by the Results page,
// the winners pool and the admin dashboard. Tune the numbers in RULES.
//
// Raw views favour big accounts, so every post is scored against its own
// member's typical (median) views: a score of 2 means twice as many views as
// that member usually gets.

export const RULES = {
  /** A member needs this many tracked posts before scores mean anything. */
  minPostsForBaseline: 3,
  /** A post is a winner at this many times the member's typical views... */
  winMultiplier: 2,
  /** ...and at least this many views. */
  minViews: 1000,
  /** Hook styles need this many scored posts before they're compared. */
  minPostsPerHookStyle: 5,
};

export interface PostMetrics {
  postId: string;
  userId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Weighted engagement per view: shares and saves signal more than likes. */
export function engagementRate(m: Pick<PostMetrics, "views" | "likes" | "comments" | "shares" | "saves">): number {
  if (m.views <= 0) return 0;
  return (m.likes + m.comments * 2 + m.shares * 3 + m.saves * 3) / m.views;
}

export interface Scored {
  /** Views relative to the member's typical post; null until they have enough posts. */
  score: number | null;
  baseline: number | null;
  engagement: number;
  winner: boolean;
}

/** Score each post against its own member's median views. */
export function scorePosts(posts: PostMetrics[]): Map<string, Scored> {
  const byUser = new Map<string, PostMetrics[]>();
  for (const p of posts) byUser.set(p.userId, [...(byUser.get(p.userId) ?? []), p]);

  const out = new Map<string, Scored>();
  for (const list of byUser.values()) {
    const enough = list.length >= RULES.minPostsForBaseline;
    const baseline = enough ? Math.max(1, median(list.map((p) => p.views))) : null;
    for (const p of list) {
      const score = baseline ? p.views / baseline : null;
      out.set(p.postId, {
        score,
        baseline,
        engagement: engagementRate(p),
        winner: score !== null && score >= RULES.winMultiplier && p.views >= RULES.minViews,
      });
    }
  }
  return out;
}

export interface HookStyleStat {
  hookStyle: string;
  posts: number;
  medianScore: number;
  winRate: number;
}

/** Compare hook styles by the median score of their posts, best first. */
export function hookStyleStats(rows: { hookStyle: string; score: number | null; winner: boolean }[], minPosts = RULES.minPostsPerHookStyle): HookStyleStat[] {
  const groups = new Map<string, { scores: number[]; wins: number }>();
  for (const r of rows) {
    if (!r.hookStyle || r.score === null) continue;
    const g = groups.get(r.hookStyle) ?? { scores: [], wins: 0 };
    g.scores.push(r.score);
    if (r.winner) g.wins++;
    groups.set(r.hookStyle, g);
  }
  return [...groups.entries()]
    .filter(([, g]) => g.scores.length >= minPosts)
    .map(([hookStyle, g]) => ({ hookStyle, posts: g.scores.length, medianScore: median(g.scores), winRate: g.wins / g.scores.length }))
    .sort((a, b) => b.medianScore - a.medianScore);
}
