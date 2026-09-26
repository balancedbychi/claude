import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAnimationPrompt, buildImagePrompt, characterAnchor, productAnchor } from "./prompt-builder.ts";
import type { Character, SeriesBible } from "./types.ts";

const zara: Character = {
  id: "c1", name: "Zara", role: "lead", age: "late 20s",
  look: "warm brown skin, long box braids, freckles", wardrobe: "cream linen set with gold hoops", voice: "", personality: "",
};
const bible: SeriesBible = { seriesName: "Soft Life", niche: "wellness", visualStyle: "photoreal, soft film grain", setting: "sunlit LA apartment", aspectRatio: "9:16" };
const kitchen = { id: "l1", setName: "Hills House", name: "Kitchen", details: "white marble island, brass pendants", lighting: "" };
const shot = {
  number: 1, durationSeconds: 6, characterIds: ["c1", "missing"], productIds: [] as string[],
  action: "Zara pours matcha, then looks up", camera: "medium close-up, eye level", cameraMove: "slow push-in",
  mood: "calm", lighting: "golden hour window light", transition: "cut",
  startFrame: "Zara at the island holding a whisk", endFrame: "Zara looks up at the door", continueFromPrevious: false,
};

test("anchor includes look and wardrobe verbatim", () => {
  const a = characterAnchor(zara);
  assert.ok(a.includes(zara.look) && a.includes(zara.wardrobe));
});

test("image prompt inlines character and set sheets and uses the start frame", () => {
  const p = buildImagePrompt(shot, { characters: [zara], products: [], bible, location: kitchen });
  assert.ok(p.startsWith("Photorealistic still frame. Zara at the island holding a whisk"));
  assert.ok(p.includes(characterAnchor(zara)));
  assert.ok(p.includes("Set (match reference exactly): Hills House, Kitchen: white marble island, brass pendants"));
  assert.ok(p.includes("Framing: medium close-up, eye level"));
  assert.ok(!p.includes("World:"), "a locked set replaces the generic setting");
  assert.ok(!p.includes("missing"));
});

test("animation prompt carries motion and continuity only", () => {
  const p = buildAnimationPrompt(shot, { characters: [zara], products: [] });
  assert.ok(p.startsWith("Start from the keyframe image."));
  assert.ok(p.includes("Camera: slow push-in"));
  assert.ok(p.includes("Ends on: Zara looks up at the door"));
  assert.ok(p.includes("Keep Zara's face, hair and outfit"));
  assert.ok(!p.includes(zara.look), "appearance lives in the image, not the motion prompt");
  assert.ok(buildAnimationPrompt({ ...shot, continueFromPrevious: true }, { characters: [zara], products: [] }).startsWith("Start from the last frame of the previous clip."));
});

test("products are anchored verbatim in the image and protected in the animation", () => {
  const serum = { id: "p1", name: "Glow Drops", brand: "Lumi", category: "face serum", packaging: "frosted glass dropper bottle, rose-gold cap, white serif label", benefits: "", usage: "" };
  const s = { ...shot, productIds: ["p1"] };
  const img = buildImagePrompt(s, { characters: [zara], products: [serum], bible });
  assert.ok(img.includes(`Product (match reference exactly, label legible and correct): ${productAnchor(serum)}`));
  assert.ok(productAnchor(serum).startsWith("Lumi Glow Drops (face serum): frosted glass"));
  assert.ok(buildAnimationPrompt(s, { characters: [zara], products: [serum] }).includes("the product packaging and label"));
});
