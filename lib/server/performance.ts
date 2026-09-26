import "server-only";
import { db } from "./db.ts";
import { scorePosts, type Scored } from "../score.ts";
import { hookOptions, mainHook, scriptExcerpt } from "../winners.ts";
import type { Episode, SeriesBible } from "../types.ts";

export type Platform = "tiktok" | "instagram" | "youtube";

export interface Metrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  follows: number;
  sales: number;
}

export interface PostRow extends Partial<Metrics> {
  id: string;
  platform: Platform;
  url: string;
  hookUsed: string;
  postedOn: string | null;
  projectId: string | null;
  projectTitle: string | null;
  projectKind: string | null;
  hookStyle: string | null;
  lastRecordedOn: string | null;
  checkins: number;
  winnerStatus: string | null;
  scored: Scored | null;
}

/** Latest snapshot per post, for one member or for everyone. */
export async function latestStats(userId?: string) {
  const sql = db();
  return sql<
    (Metrics & { post_id: string; user_id: string; project_id: string | null; hook_used: string; kind: string | null; hook_style: string | null })[]
  >`
    select p.id as post_id, p.user_id, p.project_id, p.hook_used, pr.kind, pr.hook_style,
           c.views, c.likes, c.comments, c.shares, c.saves, c.follows, c.sales
    from posts p
    join lateral (
      select * from checkins c where c.post_id = p.id order by recorded_on desc limit 1
    ) c on true
    left join projects pr on pr.id = p.project_id
    ${userId ? sql`where p.user_id = ${userId}` : sql``}`;
}

export async function listPosts(userId: string): Promise<PostRow[]> {
  const sql = db();
  const rows = await sql<
    (Partial<Metrics> & {
      id: string; platform: Platform; url: string; hook_used: string; posted_on: string | null; project_id: string | null;
      title: string | null; kind: string | null; hook_style: string | null; last_recorded_on: string | null; checkins: number; winner_status: string | null;
    })[]
  >`
    select p.id, p.platform, p.url, p.hook_used, p.posted_on::text, p.project_id,
           pr.title, pr.kind, pr.hook_style,
           c.views, c.likes, c.comments, c.shares, c.saves, c.follows, c.sales,
           c.recorded_on::text as last_recorded_on,
           (select count(*)::int from checkins x where x.post_id = p.id) as checkins,
           w.status as winner_status
    from posts p
    left join lateral (select * from checkins c where c.post_id = p.id order by recorded_on desc limit 1) c on true
    left join projects pr on pr.id = p.project_id
    left join winners w on w.post_id = p.id
    where p.user_id = ${userId}
    order by coalesce(p.posted_on, p.created_at::date) desc, p.created_at desc`;

  const scored = scorePosts(
    rows.filter((r) => r.views !== null && r.views !== undefined).map((r) => ({
      postId: r.id, userId, views: r.views!, likes: r.likes ?? 0, comments: r.comments ?? 0, shares: r.shares ?? 0, saves: r.saves ?? 0,
    })),
  );
  return rows.map((r) => ({
    id: r.id, platform: r.platform, url: r.url, hookUsed: r.hook_used, postedOn: r.posted_on, projectId: r.project_id,
    projectTitle: r.title, projectKind: r.kind, hookStyle: r.hook_style, lastRecordedOn: r.last_recorded_on, checkins: r.checkins,
    winnerStatus: r.winner_status, scored: scored.get(r.id) ?? null,
    views: r.views ?? undefined, likes: r.likes ?? undefined, comments: r.comments ?? undefined, shares: r.shares ?? undefined,
    saves: r.saves ?? undefined, follows: r.follows ?? undefined, sales: r.sales ?? undefined,
  }));
}

export async function addPost(
  userId: string,
  input: { projectId: string | null; platform: Platform; url: string; hookUsed: string; postedOn: string | null },
): Promise<{ id: string } | { error: string }> {
  const sql = db();
  let hookUsed = input.hookUsed;
  if (input.projectId) {
    const [project] = await sql<{ data: Episode }[]>`select data from projects where id = ${input.projectId} and user_id = ${userId}`;
    if (!project) return { error: "That project wasn't found." };
    if (!hookUsed) hookUsed = mainHook(project.data);
  }
  const rows = await sql<{ id: string }[]>`
    insert into posts (user_id, project_id, platform, url, hook_used, posted_on)
    values (${userId}, ${input.projectId}, ${input.platform}, ${input.url}, ${hookUsed}, ${input.postedOn})
    on conflict (user_id, url) do nothing
    returning id`;
  return rows[0] ?? { error: "You're already tracking that post." };
}

export async function deletePost(userId: string, id: string): Promise<void> {
  await db()`delete from posts where id = ${id} and user_id = ${userId}`;
  await evaluateWinners(userId);
}

export async function addCheckin(userId: string, postId: string, m: Metrics, recordedOn: string | null): Promise<boolean> {
  const sql = db();
  const [post] = await sql`select id from posts where id = ${postId} and user_id = ${userId}`;
  if (!post) return false;
  await sql`
    insert into checkins (post_id, user_id, recorded_on, views, likes, comments, shares, saves, follows, sales)
    values (${postId}, ${userId}, ${recordedOn ?? sql`current_date`}, ${m.views}, ${m.likes}, ${m.comments}, ${m.shares}, ${m.saves}, ${m.follows}, ${m.sales})
    on conflict (post_id, recorded_on) do update set
      views = excluded.views, likes = excluded.likes, comments = excluded.comments, shares = excluded.shares,
      saves = excluded.saves, follows = excluded.follows, sales = excluded.sales`;
  await evaluateWinners(userId);
  return true;
}

/**
 * Re-score a member's posts and keep their entries in the winners pool up to
 * date. Only studio projects from members who share winners are added, as
 * candidates for the admin to review. Reviewed entries keep their status.
 */
export async function evaluateWinners(userId: string): Promise<void> {
  const sql = db();
  const [profile] = await sql<{ share_winners: boolean }[]>`select share_winners from profiles where user_id = ${userId}`;
  const stats = await latestStats(userId);
  const scored = scorePosts(stats.map((s) => ({ postId: s.post_id, userId, views: s.views, likes: s.likes, comments: s.comments, shares: s.shares, saves: s.saves })));
  const [studio] = await sql<{ bible: SeriesBible | null }[]>`select bible from studios where user_id = ${userId}`;

  const keep: string[] = [];
  for (const s of stats) {
    const result = scored.get(s.post_id);
    if (!profile?.share_winners || !s.project_id || !result?.winner || result.score === null) continue;
    const [project] = await sql<{ data: Episode }[]>`select data from projects where id = ${s.project_id} and user_id = ${userId}`;
    if (!project) continue;
    const p = project.data;
    keep.push(s.post_id);
    await sql`
      insert into winners (post_id, user_id, kind, niche, hook_style, hook, excerpt, score, views)
      values (${s.post_id}, ${userId}, ${p.kind}, ${studio?.bible?.niche ?? ""}, ${s.hook_style ?? ""},
              ${s.hook_used || hookOptions(p)[0] || ""}, ${scriptExcerpt(p)}, ${result.score}, ${s.views})
      on conflict (post_id) do update set score = excluded.score, views = excluded.views`;
  }
  // Candidates that no longer qualify drop out; reviewed ones stay for the admin's record.
  await sql`
    delete from winners where user_id = ${userId} and status = 'candidate'
    ${keep.length ? sql`and post_id not in ${sql(keep)}` : sql``}`;
}

/** Opting out removes the member's entries from the pool entirely. */
export async function setShareWinners(userId: string, share: boolean): Promise<void> {
  const sql = db();
  await sql`update profiles set share_winners = ${share} where user_id = ${userId}`;
  if (!share) await sql`delete from winners where user_id = ${userId}`;
  else await evaluateWinners(userId);
}
