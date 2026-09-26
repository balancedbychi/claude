import { test } from "node:test";
import assert from "node:assert/strict";
import { hookOptions, mainHook, scriptExcerpt } from "./winners.ts";
import type { Episode } from "./types.ts";

const ad: Episode = {
  id: "u1", kind: "ugc", createdAt: "", brief: null, topic: "", concept: null, pkg: null, shots: [],
  script: {
    title: "T", totalSeconds: 10, hookStyle: "Confession", altHooks: ["Alt A", "Alt B"],
    scenes: [
      { number: 1, title: "Hook", location: "", durationSeconds: 3, characterIds: [], locationId: "", action: "Leans in", onScreenText: "I was wrong", lines: [{ speaker: "Zara", text: "I owe this serum an apology." }] },
      { number: 2, title: "Demo", location: "", durationSeconds: 7, characterIds: [], locationId: "", action: "Two drops", onScreenText: "", lines: [] },
    ],
  },
};

test("main hook is the first spoken line for ads and the concept hook for episodes", () => {
  assert.equal(mainHook(ad), "I owe this serum an apology.");
  assert.equal(mainHook({ ...ad, kind: "episode", concept: { title: "", logline: "", hook: "Concept hook", hookStyle: "", whyItWorks: "" } }), "Concept hook");
  assert.deepEqual(hookOptions(ad), ["I owe this serum an apology.", "Alt A", "Alt B"]);
});

test("excerpt captures the opening beats compactly", () => {
  const e = scriptExcerpt(ad);
  assert.equal(e, 'Hook (3s): Leans in [on screen: I was wrong] "I owe this serum an apology." → Demo (7s): Two drops');
  assert.ok(scriptExcerpt(ad, 4, 20).length <= 20);
});
