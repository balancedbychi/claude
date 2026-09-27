import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAnimationPrompt, buildImagePrompt, characterAnchor, locationSheetPrompt, productAnchor } from "./prompt-builder.ts";
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
const serum = { id: "p1", name: "Glow Drops", brand: "Lumi", category: "face serum", packaging: "frosted glass dropper bottle, rose-gold cap, white serif label", benefits: "", usage: "" };

test("anchor includes look and wardrobe verbatim", () => {
  const a = characterAnchor(zara);
  assert.ok(a.includes(zara.look) && a.includes(zara.wardrobe));
});

test("image prompt follows the house format: format, references, identity, pose, locked set, look, avoid, closing", () => {
  const p = buildImagePrompt(shot, { characters: [zara], products: [], bible, location: kitchen, kind: "episode" });
  assert.ok(p.startsWith("Create a highly realistic vertical 9:16 cinematic film still, medium close-up, eye level."));
  assert.ok(p.includes("Scene: Zara at the island holding a whisk"));
  assert.ok(p.includes("Use the uploaded environment reference as the permanent spatial and background anchor"));
  assert.ok(p.includes(characterAnchor(zara)));
  assert.ok(p.includes("Do not beautify, reshape, age, de-age"));
  assert.ok(p.includes("Outfit: cream linen set with gold hoops. Preserve every garment"));
  assert.ok(p.includes("Environment (locked, match reference exactly): Hills House, Kitchen: white marble island, brass pendants"));
  assert.ok(p.includes("never rotate, curve, relocate, resize, recolor, or redesign"));
  assert.ok(p.includes("Framing: medium close-up, eye level"));
  assert.ok(p.includes("Look: photoreal, soft film grain"));
  assert.ok(p.includes("\nAvoid: "));
  assert.ok(p.trim().endsWith("captured in this exact Hills House kitchen, with Zara looking exactly like themselves."));
  assert.ok(!p.includes("World:"), "a locked set replaces the generic setting");
  assert.ok(!p.includes("missing"));
});

test("UGC reads as iPhone creator content, not cinematic", () => {
  const p = buildImagePrompt(shot, { characters: [zara], products: [], bible, kind: "ugc" });
  assert.ok(p.startsWith("Create a highly realistic vertical 9:16 smartphone photo"));
  assert.ok(p.includes("premium modern iPhone creator content rather than cinematic"));
  assert.ok(p.includes("film grain, cinematic color grading"), "phone look avoids film grain");
  assert.ok(!p.includes("soft film grain"), "the series film look does not leak into UGC");
  assert.ok(p.includes("World: sunlit LA apartment"));
});

test("animation prompt carries motion, preservation and continuity only", () => {
  const p = buildAnimationPrompt(shot, { characters: [zara], products: [] });
  assert.ok(p.startsWith("Start from the keyframe image."));
  assert.ok(p.includes("Camera: slow push-in"));
  assert.ok(p.includes("Ends on: Zara looks up at the door"));
  assert.ok(p.includes("keep Zara's face, skin texture, hair and outfit"));
  assert.ok(p.includes("One continuous 6s take"));
  assert.ok(p.includes("Avoid: face morphing"));
  assert.ok(!p.includes(zara.look), "appearance lives in the image, not the motion prompt");
  assert.ok(buildAnimationPrompt({ ...shot, continueFromPrevious: true }, { characters: [zara], products: [] }).startsWith("Start from the last frame of the previous clip."));
});

test("products are anchored verbatim in the image and protected in the animation", () => {
  const s = { ...shot, productIds: ["p1"] };
  const img = buildImagePrompt(s, { characters: [zara], products: [serum], bible });
  assert.ok(img.includes(`Product (match reference exactly, label legible and correct): ${productAnchor(serum)}`));
  assert.ok(img.includes("The product comes exclusively from the uploaded product reference image."));
  assert.ok(productAnchor(serum).startsWith("Lumi Glow Drops (face serum): frosted glass"));
  assert.ok(buildAnimationPrompt(s, { characters: [zara], products: [serum] }).includes("the product packaging and label"));
});

test("regeneration fixes add targeted corrections to both prompts", () => {
  const s = { ...shot, fixes: ["hands" as const, "motion" as const], fixNote: "her ring vanished" };
  const img = buildImagePrompt(s, { characters: [zara], products: [], bible });
  const anim = buildAnimationPrompt(s, { characters: [zara], products: [] });
  assert.ok(img.includes("Corrections for this regeneration") && img.includes("exactly five fingers") && img.includes("her ring vanished"));
  assert.ok(!img.includes("Slow the motion down"), "motion fixes only touch the animation");
  assert.ok(anim.includes("Slow the motion down") && anim.includes("her ring vanished"));
  assert.ok(!buildImagePrompt(shot, { characters: [zara], products: [], bible }).includes("Corrections"));
});

test("set sheet is an empty locked anchor", () => {
  const p = locationSheetPrompt(kitchen, bible);
  assert.ok(p.includes("permanent spatial anchor") && p.includes("no people"));
});
