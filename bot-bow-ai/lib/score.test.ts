import { test } from "node:test";
import assert from "node:assert/strict";
import { RULES, engagementRate, hookStyleStats, median, scorePosts } from "./score.ts";

const m = (postId: string, userId: string, views: number) => ({ postId, userId, views, likes: 0, comments: 0, shares: 0, saves: 0 });

test("median", () => {
  assert.equal(median([]), 0);
  assert.equal(median([5, 1, 3]), 3);
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test("posts are scored against their own member's typical views", () => {
  const scored = scorePosts([
    // Small account: typical 1,000 views; 3,000 is a win.
    m("a1", "small", 900), m("a2", "small", 1000), m("a3", "small", 3000),
    // Big account: typical 100k; 150k is not a win despite far more views.
    m("b1", "big", 90_000), m("b2", "big", 100_000), m("b3", "big", 150_000),
  ]);
  assert.equal(scored.get("a3")!.score, 3);
  assert.equal(scored.get("a3")!.winner, true);
  assert.equal(scored.get("b3")!.score, 1.5);
  assert.equal(scored.get("b3")!.winner, false);
});

test("no scores until a member has enough posts, and tiny view counts never win", () => {
  const few = scorePosts([m("x1", "new", 10), m("x2", "new", 50_000)]);
  assert.equal(few.get("x2")!.score, null);
  assert.equal(few.get("x2")!.winner, false);
  const tiny = scorePosts([m("t1", "u", 10), m("t2", "u", 10), m("t3", "u", RULES.minViews - 1)]);
  assert.ok(tiny.get("t3")!.score! >= RULES.winMultiplier);
  assert.equal(tiny.get("t3")!.winner, false);
});

test("engagement weights shares and saves above likes", () => {
  assert.equal(engagementRate({ views: 100, likes: 10, comments: 0, shares: 0, saves: 0 }), 0.1);
  assert.equal(engagementRate({ views: 100, likes: 0, comments: 0, shares: 10, saves: 0 }), 0.3);
  assert.equal(engagementRate({ views: 0, likes: 5, comments: 0, shares: 0, saves: 0 }), 0);
});

test("hook styles are compared only with enough posts, best first", () => {
  const rows = [
    ...Array.from({ length: 5 }, (_, i) => ({ hookStyle: "Confession", score: 2 + i * 0.1, winner: true })),
    ...Array.from({ length: 5 }, () => ({ hookStyle: "Question", score: 0.8, winner: false })),
    { hookStyle: "Contrarian", score: 9, winner: true },
    { hookStyle: "", score: 5, winner: true },
  ];
  const stats = hookStyleStats(rows);
  assert.deepEqual(stats.map((s) => s.hookStyle), ["Confession", "Question"]);
  assert.equal(stats[0].winRate, 1);
});
