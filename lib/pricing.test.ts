import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_PRICING as book, costReport, estimateProject, estimateShot, fmtEstimate, fmtWait, modelsFor } from "./pricing.ts";

const shot = (durationSeconds: number, continueFromPrevious = false) => ({ durationSeconds, continueFromPrevious });

test("a shot costs a keyframe plus seconds of video", () => {
  const m = modelsFor(book);
  const e = estimateShot(shot(8), book, m);
  assert.equal(e.credits, 15 + 2.5 * 8);
  assert.equal(e.usd, 1.75);
  assert.equal(e.images, 1);
  assert.equal(e.clips, 1);
  assert.equal(e.seconds, 40 + 180);
});

test("continuing from the last frame skips the keyframe; short clips bill the minimum", () => {
  const m = modelsFor(book, { videoModel: "seedance2_720" });
  const e = estimateShot(shot(3, true), book, m);
  assert.equal(e.images, 0);
  assert.equal(e.credits, 4.6 * 5);
});

test("unknown model ids fall back to the defaults", () => {
  const m = modelsFor(book, { imageModel: "gone", videoModel: "gone" });
  assert.equal(m.image?.id, book.defaultImage);
  assert.equal(m.video?.id, book.defaultVideo);
});

test("project estimate and the team's report", () => {
  const p = { shots: [{ sceneNumber: 1, shots: [shot(8), shot(4, true)] }] } as never;
  const e = estimateProject(p, book, modelsFor(book));
  assert.equal(e.credits, 15 + 20 + 10);
  const r = costReport(p, book);
  assert.ok(r.includes("1 image + 2 clips ≈ 45 credits (~$2.25)"));
  assert.ok(r.includes("budget ≈ 90 credits (~$4.50) to allow 2 tries per shot"));
  assert.ok(r.includes("estimates"));
  assert.equal(costReport({ shots: [] } as never, book), "");
});

test("formatting", () => {
  assert.equal(fmtWait(40), "~40 sec");
  assert.equal(fmtWait(400), "~7 min");
  assert.equal(fmtWait(7200), "~2 hr");
  assert.equal(fmtEstimate({ credits: 35, usd: 1.75, seconds: 220, images: 1, clips: 1 }), "≈ 35 credits (~$1.75) · ~4 min");
});
