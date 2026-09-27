import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAnimationPrompt, buildImagePrompt, characterAnchor, identityAnchor, locationSheetPrompt, productAnchor, videoRefs } from "./prompt-builder.ts";
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

test("image prompt follows the house format: format, tagged references, identity, pose, locked set, look, avoid, closing", () => {
  const p = buildImagePrompt(shot, { characters: [zara], products: [], bible, location: kitchen, kind: "episode" });
  assert.ok(p.startsWith("Create a highly realistic vertical 9:16 cinematic film still, medium close-up, eye level."));
  assert.ok(p.includes("Scene: Zara at the island holding a whisk."));
  assert.ok(p.includes("References: @Image 1 = CHARACTER IDENTITY MASTER (Zara); @Image 2 = ENVIRONMENT MASTER."));
  assert.ok(p.includes("Use the uploaded environment reference @Image 2 as the permanent spatial and background anchor"));
  assert.ok(p.includes(identityAnchor(zara)));
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

test("video prompt uses the sectioned format with tagged references", () => {
  const p = buildAnimationPrompt(shot, { characters: [zara], products: [], bible, location: kitchen, kind: "episode" });
  for (const h of ["REFERENCE HIERARCHY", "IDENTITY", "SCENE + CAMERA", "WARDROBE", "PERFORMANCE", "CHOREOGRAPHY", "CONTINUITY", "AVOID", "ABSOLUTE PRIORITY ORDER", "FINAL RESULT"]) {
    assert.ok(p.includes(`\n${h}\n`), h);
  }
  assert.ok(p.includes("@Image 1 = CHARACTER IDENTITY MASTER (Zara)."));
  assert.ok(p.includes("@Image 2 = MASTER STARTING FRAME / SCENE REFERENCE."));
  assert.ok(p.includes("Start from @Image 2, the keyframe image."));
  assert.ok(p.includes("Camera: slow push-in, smooth and motivated."));
  assert.ok(p.includes("Ends on: Zara looks up at the door."));
  assert.ok(p.includes("Fixed set (never rotate, relocate, resize, recolor or redesign): white marble island, brass pendants."));
  assert.ok(p.includes("1. EXACT SAME PERSON FROM @Image 1."));
  assert.ok(p.includes("Create one seamless 6-second vertical 9:16 cinematic shot."));
  assert.ok(!p.includes(zara.wardrobe), "the outfit comes from the start frame, not the sheet");
  assert.ok(!p.includes("PHYSICS + MECHANICS"), "no mechanics section when nothing else moves");
  assert.ok(buildAnimationPrompt({ ...shot, continueFromPrevious: true }, { characters: [zara], products: [] }).includes("the last frame of the previous clip"));
});

test("a static camera is locked; director fields and outfit changes shape the prompt", () => {
  const s = {
    ...shot, cameraMove: "static", durationSeconds: 15, productIds: ["p1"],
    performance: ["strong direct eye contact", "knowing smirk"],
    choreography: ["she picks up the remote", "her thumb visibly presses the button", "ONLY THEN the fan starts"],
    mechanics: ["The fan rotates clockwise only"],
    priorities: ["She presses the remote BEFORE the fan moves."],
    wardrobe: ["cream corset top, wide-leg jeans", "red slip dress"],
  };
  const p = buildAnimationPrompt(s, { characters: [zara], products: [serum], bible, kind: "transition" });
  assert.ok(p.includes("Camera completely locked. NO camera movement. NO zoom."));
  assert.ok(p.includes("@Image 3 = EXACT PRODUCT (Glow Drops)."));
  assert.ok(p.includes("@Image 4 = EXACT COMPLETE OUTFIT 1.") && p.includes("@Image 5 = EXACT COMPLETE OUTFIT 2."));
  assert.ok(p.includes("OUTFIT 2 — @Image 5: red slip dress. Reproduce literally."));
  assert.ok(p.includes("Changing outfits must NEVER change the face or body."));
  assert.ok(p.includes("strong direct eye contact") && p.includes("2. Her thumb visibly presses the button.".replace("Her", "her")));
  assert.ok(p.includes("PHYSICS + MECHANICS — CRITICAL\n==================================================\nThe fan rotates clockwise only."));
  assert.ok(p.includes("2. She presses the remote BEFORE the fan moves."));
  assert.ok(p.includes("@Image 4–@Image 5 ARE LITERAL WARDROBE BLUEPRINTS"));
  assert.ok(p.includes("creator-style shot"), "try-ons read as creator content");
  const refs = videoRefs(s, { characters: [zara], products: [serum], bible });
  assert.deepEqual(refs.map((r) => r.tag), ["@Image 1", "@Image 2", "@Image 3", "@Image 4", "@Image 5"]);
  const img = buildImagePrompt(s, { characters: [zara], products: [serum], bible, kind: "transition" });
  assert.ok(img.includes("Outfit: cream corset top, wide-leg jeans. Reproduce the outfit reference @Image 3 literally"), "the keyframe shows the first outfit");
  assert.ok(img.includes("Expression and energy: strong direct eye contact, knowing smirk."));
});

test("products are anchored verbatim in the image and protected in the animation", () => {
  const s = { ...shot, productIds: ["p1"] };
  const img = buildImagePrompt(s, { characters: [zara], products: [serum], bible });
  assert.ok(img.includes(`Product (match reference exactly, label legible and correct): ${productAnchor(serum)}`));
  assert.ok(img.includes("The product comes exclusively from the uploaded product reference image @Image 2."));
  assert.ok(productAnchor(serum).startsWith("Lumi Glow Drops (face serum): frosted glass"));
  assert.ok(buildAnimationPrompt(s, { characters: [zara], products: [serum] }).includes(`@Image 3 is the exact product: ${productAnchor(serum)}.`));
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
