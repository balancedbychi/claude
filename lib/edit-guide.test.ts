import { test } from "node:test";
import assert from "node:assert/strict";
import { captionsSrt, timeline } from "./edit-guide.ts";
import type { Episode, Shot } from "./types.ts";

const shot = (n: number, d: number, extra: Partial<Shot> = {}): Shot => ({
  number: n, durationSeconds: d, characterIds: [], productIds: [], action: "", camera: "", cameraMove: "", mood: "", lighting: "",
  transition: "cut", startFrame: "", endFrame: "", continueFromPrevious: false, imagePrompt: "", animationPrompt: "", ...extra,
});

const ep: Episode = {
  id: "e", kind: "episode", brief: null, createdAt: "", topic: "", concept: null, pkg: null,
  script: {
    title: "T", totalSeconds: 30, hookStyle: "", altHooks: [],
    scenes: [
      { number: 1, title: "", location: "", durationSeconds: 10, characterIds: [], locationId: "", action: "", onScreenText: "WAIT FOR IT", lines: [{ speaker: "Narrator", text: "one two three four five six seven eight nine ten" }] },
      { number: 2, title: "", location: "", durationSeconds: 20, characterIds: [], locationId: "", action: "", onScreenText: "", lines: [{ speaker: "Zara", text: "hello there" }] },
    ],
  },
  shots: [{ sceneNumber: 1, shots: [shot(1, 5), shot(2, 7, { continueFromPrevious: true, transition: "match cut" })] }],
};

test("timeline uses real shot lengths and falls back to the scene for missing shots", () => {
  const rows = timeline(ep);
  assert.deepEqual(rows.map((r) => [r.clip, r.start, r.duration]), [["S01-SH01", 0, 5], ["S01-SH02", 5, 7], ["S02", 12, 20]]);
  assert.equal(rows[1].continueFromPrevious, true);
  assert.equal(rows[1].voiceover, "");
  assert.ok(rows[0].voiceover.startsWith("Narrator:"));
  assert.equal(rows[0].onScreenText, "WAIT FOR IT");
  assert.equal(rows[1].onScreenText, "", "on-screen text is listed once, on the beat's first clip");
});

test("captions are chunked, proportional and start each scene at its real offset", () => {
  const srt = captionsSrt(ep);
  const cues = srt.trim().split("\n\n");
  assert.equal(cues.length, 3);
  // Scene 1 is 12s of shots: 7 of 10 words -> 8.4s.
  assert.ok(cues[0].includes("00:00:00,000 --> 00:00:08,400"));
  assert.ok(cues[1].includes("00:00:08,400 --> 00:00:12,000"));
  assert.ok(cues[2].includes("00:00:12,000 --> 00:00:32,000\nhello there"));
});
