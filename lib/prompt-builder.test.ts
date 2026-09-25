import { test } from "node:test";
import assert from "node:assert/strict";
import { buildShotPrompt, characterAnchor } from "./prompt-builder.ts";
import type { Character, SeriesBible } from "./types.ts";

const zara: Character = {
  id: "c1",
  name: "Zara",
  role: "lead",
  age: "late 20s",
  look: "warm brown skin, long box braids, freckles",
  wardrobe: "cream linen set with gold hoops",
  voice: "",
  personality: "",
};
const bible: SeriesBible = {
  seriesName: "Soft Life",
  niche: "wellness",
  visualStyle: "photoreal, soft film grain",
  setting: "sunlit LA apartment",
  aspectRatio: "9:16",
};

test("anchor includes look and wardrobe verbatim", () => {
  const a = characterAnchor(zara);
  assert.ok(a.includes(zara.look));
  assert.ok(a.includes(zara.wardrobe));
});

test("shot prompt inlines the character sheet and ignores unknown ids", () => {
  const p = buildShotPrompt(
    {
      number: 1,
      durationSeconds: 6,
      characterIds: ["c1", "missing"],
      action: "Zara pours matcha at the counter",
      camera: "medium close-up, slow push-in",
      mood: "calm",
      lighting: "golden hour window light",
      transition: "cut",
      startFrame: "",
      endFrame: "Zara looks up at the door",
      continueFromPrevious: true,
    },
    [zara],
    bible,
    { id: "l1", setName: "Hills House", name: "Kitchen", details: "white marble island, brass pendants", lighting: "" },
  );
  assert.ok(p.includes(characterAnchor(zara)));
  assert.ok(p.includes("Aspect ratio 9:16, 6s clip"));
  assert.ok(!p.includes("missing"));
  assert.ok(p.includes("Set (keep identical to reference): Hills House, Kitchen: white marble island, brass pendants"));
  assert.ok(p.startsWith("Continue seamlessly from the previous clip's last frame."));
  assert.ok(p.includes("Ends on: Zara looks up at the door"));
  assert.ok(!p.includes("World:"), "a locked set replaces the generic setting");
});
