import { test } from "node:test";
import assert from "node:assert/strict";
import { episodeToMarkdown } from "./export.ts";
import type { Character, Episode, SeriesBible } from "./types.ts";

const bible: SeriesBible = { seriesName: "Soft Life", niche: "", visualStyle: "", setting: "", aspectRatio: "9:16" };
const chars: Character[] = [
  { id: "c1", name: "Zara", role: "", age: "28", look: "box braids", wardrobe: "linen set", voice: "", personality: "" },
];

test("markdown includes timestamps, shot prompts and package", () => {
  const ep: Episode = {
    id: "e1",
    createdAt: "",
    topic: "",
    concept: { title: "Ep 1", logline: "L", hook: "H", whyItWorks: "" },
    script: {
      title: "The Move",
      totalSeconds: 95,
      scenes: [
        { number: 1, title: "Open", location: "Kitchen", durationSeconds: 65, characterIds: ["c1"], action: "A", lines: [{ speaker: "Zara", text: "Hi" }] },
        { number: 2, title: "Turn", location: "Street", durationSeconds: 30, characterIds: [], action: "B", lines: [] },
      ],
    },
    shots: [{ sceneNumber: 2, shots: [{ number: 1, durationSeconds: 5, characterIds: [], action: "", camera: "", mood: "", lighting: "", prompt: "PROMPT-2-1" }] }],
    pkg: { titles: ["T1"], description: "D", hashtags: ["#a", "#b"], thumbnail: { concept: "C", textOverlay: "WOW", prompt: "TP" } },
  };
  const md = episodeToMarkdown(ep, chars, bible);
  assert.ok(md.startsWith("# Soft Life: The Move"));
  assert.ok(md.includes("Scene 2: Turn [1:05–1:35]"));
  assert.ok(md.includes("PROMPT-2-1"));
  assert.ok(md.includes("#a #b"));
  assert.ok(md.includes("Character reference sheet of Zara, 28; box braids; wearing linen set."));
});
