import type { Character, FixId, Location, Product, SeriesBible, Shot, ToolKind } from "./types.ts";

// Consistency is the core promise of the app, so character, set and product
// descriptions are never left to the model to paraphrase. Claude decides the
// composition, performance, camera and continuity for each shot; this module
// pastes the saved sheets into every prompt verbatim and wraps them in the
// house prompt format: format and camera, which reference controls what,
// identity / hair / outfit / product preservation, pose, anatomy, framing,
// a locked environment, lighting, consistency, look, an avoid list and a
// closing sentence.
//
// Each shot gets two prompts, matching the image-first workflow: generate a
// keyframe still with the character and set references, then animate it.

export function characterAnchor(c: Character): string {
  const parts = [
    `${c.name}${c.age ? `, ${c.age}` : ""}`,
    c.look,
    c.wardrobe ? `wearing ${c.wardrobe}` : "",
  ].filter((p) => p.trim().length > 0);
  return parts.join("; ");
}

export function locationAnchor(l: Location): string {
  return `${l.setName ? `${l.setName}, ` : ""}${l.name}: ${l.details}`;
}

export function productAnchor(p: Product): string {
  return `${[p.brand, p.name].filter(Boolean).join(" ")}${p.category ? ` (${p.category})` : ""}: ${p.packaging}`;
}

type ShotPlan = Omit<Shot, "imagePrompt" | "animationPrompt">;

/** Everything a shot prompt can reference. */
export interface PromptContext {
  characters: Character[];
  products: Product[];
  bible: SeriesBible;
  location?: Location;
  /** UGC and try-ons read as phone footage; episodes and commercials as film. */
  kind?: ToolKind;
}

/** What went wrong in a generation, and the extra instruction that fixes it. */
export const FIXES: { id: FixId; label: string; image: string; animation: string }[] = [
  {
    id: "face",
    label: "face or identity changed",
    image: "The face must be an exact match to the character reference: same bone structure, eye shape, nose, lips, skin tone and hairline. Do not blend in features from any other person.",
    animation: "The face must stay identical to the start image in every frame: no morphing, no drift toward a different person.",
  },
  {
    id: "hands",
    label: "hands or fingers distorted",
    image: "Hands are fully visible or cleanly cropped, with exactly five fingers each, natural knuckles and nails, and a believable grip on anything they hold.",
    animation: "Hands keep five fingers with natural joints throughout; no fused, extra or melting fingers.",
  },
  {
    id: "body",
    label: "body or pose looks wrong",
    image: "Recheck anatomy: natural limb length, joints bending the right way, weight resting believably on the floor or furniture, garment fitting the body naturally.",
    animation: "Movement follows real body mechanics: no stretching limbs, sliding feet or rubbery joints.",
  },
  {
    id: "outfit",
    label: "outfit changed",
    image: "Reproduce the outfit reference garment for garment: same colours, fabrics, fit, prints and accessories. Nothing added, nothing swapped for a similar piece.",
    animation: "The outfit, jewellery and accessories stay exactly as in the start image; nothing appears, disappears or changes colour.",
  },
  {
    id: "product",
    label: "product or label wrong",
    image: "The product must match its reference exactly: same shape, proportions, colours and cap. Label text is sharp, correctly spelled, and follows the curve of the packaging without warping.",
    animation: "The product keeps its exact shape and label in every frame; the text never warps, blurs or rewrites itself.",
  },
  {
    id: "room",
    label: "room or props changed",
    image: "The environment reference is fixed: every object stays in the same place, size, colour and orientation. Remove anything that is not in the reference.",
    animation: "The room stays locked: furniture and props never move, morph, multiply or vanish.",
  },
  {
    id: "look",
    label: "looks fake or plastic",
    image: "Push realism: visible skin pores and fine texture, natural highlights, individual hair strands, real fabric weave. No airbrushing, no waxy or glossy skin, no oversharpening.",
    animation: "Keep real-camera texture in motion: no smoothing, no flicker, no shimmering surfaces.",
  },
  {
    id: "motion",
    label: "motion is glitchy",
    image: "",
    animation: "Slow the motion down and keep it simple: one clear action, steady camera, real-time speed, no sudden jumps or teleporting objects.",
  },
];

function pick<T extends { id: string }>(ids: string[], items: T[]): T[] {
  return ids.map((id) => items.find((x) => x.id === id)).filter((x): x is T => Boolean(x));
}

function listNames(names: string[]): string {
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** "vertical 9:16", "horizontal 16:9", "square 1:1". */
function formatWords(aspectRatio: string): string {
  const [w, h] = aspectRatio.split(":").map(Number);
  const shape = !w || !h ? "" : w === h ? "square" : w < h ? "vertical" : "horizontal";
  return [shape, aspectRatio].filter(Boolean).join(" ");
}

const phoneLook = (kind?: ToolKind) => kind === "ugc" || kind === "transition";

const AVOID_COMMON = [
  "beauty filters",
  "artificial HDR",
  "waxy or plastic skin",
  "oversharpening",
  "distorted anatomy",
  "malformed or extra fingers",
  "duplicated accessories",
  "warped clothing",
  "inaccurate logos or misspelled label text",
  "floating objects",
  "inconsistent shadows",
  "altered environmental geometry",
  "text overlays or watermarks",
  "obvious AI artifacts",
];

function fixLines(shot: ShotPlan, which: "image" | "animation"): string[] {
  const chosen = FIXES.filter((f) => shot.fixes?.includes(f.id) && f[which]);
  if (chosen.length === 0 && !shot.fixNote) return [];
  return [
    `Corrections for this regeneration (the last attempt got these wrong): ${[...chosen.map((f) => f[which]), shot.fixNote?.trim() ?? ""].filter(Boolean).join(" ")}`,
  ];
}

export function buildImagePrompt(shot: ShotPlan, ctx: PromptContext): string {
  const { bible, location, kind } = ctx;
  const cast = pick(shot.characterIds, ctx.characters);
  const products = pick(shot.productIds ?? [], ctx.products);
  const phone = phoneLook(kind);
  const names = listNames(cast.map((c) => c.name));
  const place = location ? `${location.setName ? `${location.setName} ` : ""}${location.name.toLowerCase()}` : bible.setting || "this setting";

  const lines = [
    `Create a highly realistic ${formatWords(bible.aspectRatio)} ${phone ? "smartphone photo" : "cinematic film still"}, ${shot.camera}.`,
    `Scene: ${shot.startFrame || shot.action}`,

    // Which reference controls what.
    location
      ? "Use the uploaded environment reference as the permanent spatial and background anchor. Reproduce that environment consistently without redesigning, replacing, rearranging, or restyling its elements."
      : "",
    cast.length > 0
      ? `The identity and wardrobe of ${names} come exclusively from the character and outfit reference images uploaded with this prompt.`
      : "",
    products.length > 0 ? "The product comes exclusively from the uploaded product reference image." : "",

    // Identity, hair and outfit, per character.
    ...cast.flatMap((c) => [
      `Recreate ${c.name} from the uploaded character reference image (${characterAnchor(c)}). Preserve their facial structure, skin tone and undertones, eye color, eyebrow shape, nose structure, lips, facial proportions, distinguishing features, hairline, and overall identity accurately. Preserve realistic human skin with visible pores, subtle tonal variation, fine texture, natural highlights, and small imperfections. Do not beautify, reshape, age, de-age, or otherwise reinterpret their appearance.`,
      `Hair: keep ${c.name}'s hair exactly as in the reference: same length, color, texture, parting, volume and styling, with natural flyaways and individual strands.`,
      c.wardrobe
        ? `Outfit: ${c.wardrobe}. Preserve every garment, color, fabric, fit, print, and accessory exactly as shown in the outfit reference. Do not carry wardrobe details from any previous generation. Do not invent additional accessories or substitute visually similar pieces.`
        : `Outfit: preserve every garment and accessory exactly as shown in the outfit reference. Do not carry wardrobe details from any previous generation or invent additional accessories.`,
    ]),

    ...products.map(
      (p) =>
        `Product (match reference exactly, label legible and correct): ${productAnchor(p)}. Reproduce its shape, proportions, colors, materials, cap and label layout exactly. Keep every word on the label sharp, correctly spelled and unwarped. Do not invent, rearrange, or restyle any branding.`,
    ),

    `Pose and placement: ${shot.startFrame || shot.action} Keep every person and object exactly where described relative to the frame edges and the room.`,
    cast.length > 0
      ? "Anatomy: believable human anatomy and natural proportions, with weight resting realistically on the floor or furniture. Avoid exaggerated curves, elongated limbs, distorted hands or feet, impossible garment fit, and artificial body smoothing."
      : "",
    `Framing: ${shot.camera}. Fill the ${bible.aspectRatio} frame edge to edge with no borders.`,

    location
      ? `Environment (locked, match reference exactly): ${locationAnchor(location)}. Every fixed element keeps its exact position, scale, color, material and orientation: never rotate, curve, relocate, resize, recolor, or redesign any of them, and do not add furniture, decor or props that are not in the reference.`
      : bible.setting
        ? `World: ${bible.setting}.`
        : "",

    `Lighting: ${shot.lighting || location?.lighting || "soft natural light"}. Light comes from sources that exist in the scene and interacts realistically with the materials: soft falloff on skin, true reflections on glass and metal, fabric texture in the highlights, and grounded contact shadows under people, hands and objects.`,
    shot.mood ? `Mood: ${shot.mood}.` : "",
    "Consistency across repeated generations: the references are fixed. Every regeneration of this frame shows the same person, outfit, product and room; only the pose, expression and camera described here may change.",

    phone
      ? "Look: premium modern iPhone creator content rather than cinematic. Crisp, true-to-life color, natural exposure, deep focus; preserve skin pores, hair strands and fabric texture."
      : `Look: ${bible.visualStyle || "cinematic, photorealistic"}. Real lens optics, natural color, controlled depth of field; preserve skin pores, hair strands and fabric texture.`,
    `Avoid: ${[...(phone ? ["film grain", "cinematic color grading", "excessive background blur"] : []), ...AVOID_COMMON].join(", ")}.`,
    ...fixLines(shot, "image"),
    `The finished image should feel like a real ${phone ? "iPhone photo" : "frame from a professionally shot film"} captured in this exact ${place}${cast.length > 0 ? `, with ${names} looking exactly like themselves` : ""}.`,
  ];
  return lines.filter((l) => l.length > 0).join("\n");
}

export function buildAnimationPrompt(shot: ShotPlan, ctx: Pick<PromptContext, "characters" | "products">): string {
  const names = pick(shot.characterIds, ctx.characters).map((c) => c.name);
  const hasProduct = pick(shot.productIds ?? [], ctx.products).length > 0;
  return [
    shot.continueFromPrevious ? "Start from the last frame of the previous clip." : "Start from the keyframe image.",
    `Action: ${shot.action.trim()}`,
    shot.cameraMove ? `Camera: ${shot.cameraMove}` : "",
    shot.endFrame ? `Ends on: ${shot.endFrame}` : "",
    `Preserve: keep ${names.length > 0 ? `${listNames(names)}'s face, skin texture, hair and outfit` : "every detail"}${hasProduct ? ", the product packaging and label (legible and unwarped)" : ""} and the set identical to the start image in every frame. Nothing in the room moves, morphs, rotates or changes color unless the action says so.`,
    `Motion: natural, physically plausible, real-time speed; weight shifts, fabric and hair respond to movement; hands keep five fingers and hold objects convincingly; lighting and shadows stay consistent. One continuous ${shot.durationSeconds}s take, no cuts.`,
    "Avoid: face morphing or identity drift, flicker, warping or melting text, extra limbs or fingers, objects appearing or vanishing, sliding feet, rubbery motion, sudden lighting changes.",
    ...fixLines(shot, "animation"),
  ]
    .filter((l) => l.length > 0)
    .join("\n");
}

export function withPrompts(shot: ShotPlan, ctx: PromptContext): Shot {
  return { ...shot, imagePrompt: buildImagePrompt(shot, ctx), animationPrompt: buildAnimationPrompt(shot, ctx) };
}

const SHEET_AVOID =
  "Avoid: beauty filters, waxy or plastic skin, oversharpening, distorted anatomy, malformed fingers, warped clothing, inaccurate logos, text overlays, watermarks, obvious AI artifacts.";

/** Prompt for the one-time reference image members upload to their video tool. */
export function characterSheetPrompt(c: Character, bible: SeriesBible): string {
  return [
    `Create a highly realistic character reference sheet of ${characterAnchor(c)}.`,
    "Show a front view, three-quarter view and side profile, a full-body view and a close-up of the face, all of the same person, on a plain light-grey studio background with even soft lighting.",
    "If a photo of the person is uploaded, recreate them from it: preserve their facial structure, skin tone and undertones, eye color, eyebrow shape, nose structure, lips, facial proportions, distinguishing features and hairline accurately. Do not beautify, reshape, age, de-age, or otherwise reinterpret their appearance.",
    "Preserve realistic human skin with visible pores, subtle tonal variation, fine texture and small imperfections. Hair keeps the same length, color, texture and parting in every view.",
    `Outfit: ${c.wardrobe || "the outfit described"}, identical in every view; do not invent accessories or substitute similar pieces.`,
    "Pose: neutral expression, relaxed arms, standing straight, feet visible in the full-body view. Believable human anatomy and natural proportions.",
    `Look: ${bible.visualStyle || "photorealistic"}, crisp and true-to-life.`,
    SHEET_AVOID,
    "The finished sheet should read as one real person photographed from several angles in one studio session, clear enough to reuse as the identity anchor for every scene.",
  ].join("\n");
}

/** Prompt for an empty establishing shot of a room, used as the set reference image. */
export function locationSheetPrompt(l: Location, bible: SeriesBible): string {
  return [
    `Create a highly realistic ${formatWords(bible.aspectRatio)} wide establishing photograph of an empty interior set: ${locationAnchor(l)}.`,
    "This image becomes the permanent spatial anchor for every scene filmed here, so every piece of furniture, decor and fixture must be fully visible, clearly placed and unambiguous in material and color.",
    "Eye-level, wide lens, the whole room in frame, straight verticals, no people.",
    `Lighting: ${l.lighting || "soft natural daylight"} from sources that exist in the room, interacting realistically with the materials, with grounded contact shadows under furniture.`,
    `Look: ${bible.visualStyle || "cinematic, photorealistic"}; sharp detail on materials, fabrics and surfaces.`,
    "Avoid: people, clutter that is not described, floating objects, inconsistent shadows, warped or curved architecture, duplicated furniture, text, watermarks, obvious AI artifacts.",
    `The finished image should feel like a real architectural photo of this exact ${l.name.toLowerCase()}.`,
  ].join("\n");
}

/** Packshot reference image for a product, used to keep the label consistent. */
export function productSheetPrompt(p: Product, bible: SeriesBible): string {
  return [
    `Create a highly realistic square 1:1 studio packshot of ${productAnchor(p)}.`,
    "If a photo of the product is uploaded, reproduce it exactly: same shape, proportions, colors, materials, cap and label layout.",
    "Front-facing, centred on a seamless soft neutral background, soft even lighting with a gentle reflection and a grounded contact shadow.",
    "Every word on the label is sharp, correctly spelled and follows the curve of the packaging without warping. Do not invent, rearrange, or restyle any branding.",
    `Look: ${bible.visualStyle || "photorealistic"}, premium product photography.`,
    "Avoid: misspelled or warped text, extra or missing label elements, melted edges, floating objects, inconsistent reflections, watermarks, obvious AI artifacts.",
    "The finished image should feel like the brand's own official product photo.",
  ].join("\n");
}
