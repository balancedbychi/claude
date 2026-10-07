import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_PRICING as book, costReport, estimateProject, estimateShot, fmtEstimate, fmtWait, hardestShot, modelsFor, testClip } from "./pricing.ts";

const shot = (durationSeconds: number, continueFromPrevious = false) => ({ durationSeconds, continueFromPrevious });

test("a shot costs a keyframe plus seconds of video, in credits", () => {
  const e = estimateShot(shot(8), modelsFor(book));
  assert.equal(e.credits, 2 + 12 * 8);
  assert.equal(e.images, 1);
  assert.equal(e.clips, 1);
  assert.equal(e.seconds, 40 + 240);
  assert.ok(!("usd" in e));
});

test("continuing from the last frame skips the keyframe; short clips bill the minimum", () => {
  const e = estimateShot(shot(3, true), modelsFor(book, { videoModel: "seedance2_1080" }));
  assert.equal(e.images, 0);
  assert.equal(e.credits, 9 * 4);
});

test("unknown model ids fall back to the defaults", () => {
  const m = modelsFor(book, { imageModel: "gone", videoModel: "gone" });
  assert.equal(m.image?.id, book.defaultImage);
  assert.equal(m.video?.id, book.defaultVideo);
});

test("project estimate and the team's report, in credits only", () => {
  const p = { shots: [{ sceneNumber: 1, shots: [shot(8), shot(4, true)] }] } as never;
  const e = estimateProject(p, modelsFor(book, { videoModel: "kling3_pro" }));
  assert.equal(e.credits, 2 + 14 + 7);
  const r = costReport(p, book, { videoModel: "kling3_pro" } as never);
  assert.ok(r.includes("1 image + 2 clips ≈ 23 credits"));
  assert.ok(r.includes("budget ≈ 46 credits to allow 2 tries per shot"));
  assert.ok(!r.includes("$"));
  assert.equal(costReport({ shots: [] } as never, book), "");
});

test("test clip: the riskiest shot, on cheap settings, short", () => {
  const shots = [
    { durationSeconds: 5, characterIds: ["a"], productIds: [] },
    { durationSeconds: 8, characterIds: ["a"], productIds: ["p"], wardrobe: ["o1", "o2"] },
  ];
  assert.equal(hardestShot(shots), shots[1]);
  const t = testClip(shots[1], book)!;
  assert.equal(t.model.id, "seedance_2_5_480");
  assert.equal(t.seconds, 5);
  assert.equal(t.estimate.credits, 15);
});

test("formatting", () => {
  assert.equal(fmtWait(40), "~40 sec");
  assert.equal(fmtWait(400), "~7 min");
  assert.equal(fmtWait(7200), "~2 hr");
  assert.equal(fmtEstimate({ credits: 35, seconds: 220, images: 1, clips: 1 }), "≈ 35 credits · ~4 min");
});
