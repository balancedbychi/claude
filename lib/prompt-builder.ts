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

/** Face and body only: the outfit has its own line (and may change). */
export function identityAnchor(c: Character): string {
  return [`${c.name}${c.age ? `, ${c.age}` : ""}`, c.look].filter((p) => p.trim().length > 0).join("; ");
}

/** End a clause with a full stop unless it already has one. */
const stop = (t: string) => (t = t.trim()) && (/[.!?…"”)]$/.test(t) ? t : `${t}.`);

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

/** One uploaded reference image, and what it controls. */
export interface RefSlot {
  tag: string; // "@Image 1"
  what: string; // what to upload
  role: string; // "CHARACTER IDENTITY MASTER"
  controls: string; // what it has authority over
}

function slots(list: Omit<RefSlot, "tag">[]): RefSlot[] {
  return list.map((r, i) => ({ ...r, tag: `@Image ${i + 1}` }));
}

/** References to upload with the keyframe prompt, in the order the prompt tags them. */
export function imageRefs(shot: ShotPlan, ctx: PromptContext): RefSlot[] {
  const cast = pick(shot.characterIds, ctx.characters);
  const products = pick(shot.productIds ?? [], ctx.products);
  const outfit = shot.wardrobe?.[0];
  return slots([
    ...cast.map((c) => ({ what: `${c.name}'s character sheet`, role: `CHARACTER IDENTITY MASTER (${c.name})`, controls: `WHO ${c.name.toUpperCase()} IS` })),
    ...(ctx.location ? [{ what: `${ctx.location.name} set reference`, role: "ENVIRONMENT MASTER", controls: "WHERE THE SCENE IS: room, layout, fixed objects" }] : []),
    ...products.map((p) => ({ what: `${p.name} packshot`, role: `EXACT PRODUCT (${p.name})`, controls: "the product's shape, colors and label" })),
    ...(outfit ? [{ what: "outfit 1 reference", role: "EXACT COMPLETE OUTFIT", controls: "the exact wardrobe" }] : []),
  ]);
}

/** References to upload with the video prompt, in the order the prompt tags them. */
export function videoRefs(shot: ShotPlan, ctx: PromptContext): RefSlot[] {
  const cast = pick(shot.characterIds, ctx.characters);
  const products = pick(shot.productIds ?? [], ctx.products);
  const outfits = shot.wardrobe ?? [];
  return slots([
    ...cast.map((c) => ({ what: `${c.name}'s character sheet`, role: `CHARACTER IDENTITY MASTER (${c.name})`, controls: `WHO ${c.name.toUpperCase()} IS` })),
    {
      what: shot.continueFromPrevious ? "the last frame of the previous clip" : "this shot's approved keyframe",
      role: "MASTER STARTING FRAME / SCENE REFERENCE",
      controls: "WHERE THE SCENE IS + COMPOSITION + LIGHTING",
    },
    ...products.map((p) => ({ what: `${p.name} packshot`, role: `EXACT PRODUCT (${p.name})`, controls: "the product's shape, colors and label" })),
    ...(outfits.length > 1 ? outfits.map((_, i) => ({ what: `outfit ${i + 1} reference`, role: `EXACT COMPLETE OUTFIT ${i + 1}`, controls: `wardrobe state ${i + 1}` })) : []),
  ]);
}

const tagOf = (refs: RefSlot[], role: string) => refs.find((r) => r.role.startsWith(role))?.tag ?? "";

function section(title: string, lines: (string | false | undefined)[]): string {
  const body = lines.filter((l): l is string => Boolean(l && l.trim()));
  if (body.length === 0) return "";
  const bar = "==================================================";
  return [bar, title, bar, ...body].join("\n");
}

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
  const refs = imageRefs(shot, ctx);
  const envTag = tagOf(refs, "ENVIRONMENT");
  const outfitTag = tagOf(refs, "EXACT COMPLETE OUTFIT");

  const lines = [
    `Create a highly realistic ${formatWords(bible.aspectRatio)} ${phone ? "smartphone photo" : "cinematic film still"}, ${shot.camera}.`,
    `Scene: ${stop(shot.startFrame || shot.action)}`,

    // Which reference controls what.
    refs.length > 0 ? `References: ${refs.map((r) => `${r.tag} = ${r.role}`).join("; ")}. Do not allow one reference to override another.` : "",
    location
      ? `Use the uploaded environment reference ${envTag} as the permanent spatial and background anchor. Reproduce that environment consistently without redesigning, replacing, rearranging, or restyling its elements.`
      : "",
    cast.length > 0
      ? `The identity of ${names} comes exclusively from ${cast.map((c) => tagOf(refs, `CHARACTER IDENTITY MASTER (${c.name})`)).join(" and ")}; the wardrobe comes exclusively from ${outfitTag || "the character and outfit references"}. Ignore any studio background or pose in the character sheet.`
      : "",
    products.length > 0 ? `The product comes exclusively from the uploaded product reference image ${tagOf(refs, "EXACT PRODUCT")}.` : "",

    // Identity, hair and outfit, per character.
    ...cast.flatMap((c) => [
      `Recreate ${c.name} from the uploaded character reference image (${identityAnchor(c)}). Preserve their facial structure, skin tone and undertones, eye color, eyebrow shape, nose structure, lips, facial proportions, distinguishing features, hairline, and overall identity accurately. Preserve realistic human skin with visible pores, subtle tonal variation, fine texture, natural highlights, and small imperfections. Do not beautify, reshape, age, de-age, or otherwise reinterpret their appearance.`,
      `Hair: keep ${c.name}'s hair exactly as in the reference: same length, color, texture, parting, volume and styling, with natural flyaways and individual strands.`,
      shot.wardrobe?.[0]
        ? `Outfit: ${stop(shot.wardrobe[0])} Reproduce the outfit reference ${outfitTag} literally: every garment, color, fabric, fit, print, and accessory. Do not carry wardrobe details from any previous generation. Do not invent additional accessories or substitute visually similar pieces.`
        : c.wardrobe
        ? `Outfit: ${c.wardrobe}. Preserve every garment, color, fabric, fit, print, and accessory exactly as shown in the outfit reference. Do not carry wardrobe details from any previous generation. Do not invent additional accessories or substitute visually similar pieces.`
        : `Outfit: preserve every garment and accessory exactly as shown in the outfit reference. Do not carry wardrobe details from any previous generation or invent additional accessories.`,
    ]),

    ...products.map(
      (p) =>
        `Product (match reference exactly, label legible and correct): ${productAnchor(p)}. Reproduce its shape, proportions, colors, materials, cap and label layout exactly. Keep every word on the label sharp, correctly spelled and unwarped. Do not invent, rearrange, or restyle any branding.`,
    ),

    `Pose and placement: ${stop(shot.startFrame || shot.action)} Keep every person and object exactly where described relative to the frame edges and the room.`,
    cast.length > 0 && shot.performance?.length ? `Expression and energy: ${shot.performance.join(", ")}.` : "",
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

/** Is the camera meant to stay still? */
function lockedCamera(move: string): boolean {
  return !move.trim() || /\b(static|locked|lock-off|locked-off|tripod|still|no movement|stationary)\b/i.test(move);
}

/**
 * The video prompt, in the sectioned house format written for Seedance 2.5 on
 * Higgsfield (it works in Kling and Veo too): which tagged reference controls
 * what, identity, scene and camera, exact wardrobe, product, performance,
 * choreography, physical mechanics, continuity, an absolute priority order
 * and a final-result summary. The shot's own performance, choreography,
 * mechanics and priorities come from the storyboard director, so the format
 * adapts to whatever the member asked for; the anchors are pasted verbatim.
 */
export function buildAnimationPrompt(shot: ShotPlan, ctx: Pick<PromptContext, "characters" | "products"> & Partial<PromptContext>): string {
  const cast = pick(shot.characterIds, ctx.characters);
  const products = pick(shot.productIds ?? [], ctx.products);
  const full: PromptContext = { characters: ctx.characters, products: ctx.products, bible: ctx.bible ?? { seriesName: "", niche: "", visualStyle: "", setting: "", aspectRatio: "9:16" }, location: ctx.location, kind: ctx.kind };
  const refs = videoRefs(shot, full);
  const start = tagOf(refs, "MASTER STARTING FRAME");
  const outfits = (shot.wardrobe ?? []).length > 1 ? shot.wardrobe! : [];
  const outfitTags = outfits.map((_, i) => tagOf(refs, `EXACT COMPLETE OUTFIT ${i + 1}`));
  const idTag = (name: string) => tagOf(refs, `CHARACTER IDENTITY MASTER (${name})`);
  const names = listNames(cast.map((c) => c.name));
  const locked = lockedCamera(shot.cameraMove);
  const phone = phoneLook(full.kind);
  const beats = shot.choreography?.length ? shot.choreography : [shot.action.trim()];

  const sections = [
    section("REFERENCE HIERARCHY", [
      ...refs.map((r) => `${r.tag} = ${r.role}.`),
      "REFERENCE AUTHORITY:",
      ...refs.map((r) => `${r.tag} controls ${r.controls}.`),
      "Do not allow one reference category to override another.",
    ]),
    ...cast.map((c) =>
      section(cast.length > 1 ? `IDENTITY — ${c.name.toUpperCase()}` : "IDENTITY", [
        `${idTag(c.name)} is the sole identity authority for ${c.name} (${identityAnchor(c)}).`,
        `${c.name} must remain the exact same recognizable person from ${idTag(c.name)} throughout every frame: same face, same facial structure, same skin tone, same eyes, same nose, same lips, same jawline, same hair, same body proportions, same overall identity.`,
        "Use all views in the character sheet together to preserve identity from this camera angle.",
        `IGNORE the studio background and poses in ${idTag(c.name)}: they are not scene references.${outfits.length ? " Its outfit is NOT a wardrobe reference." : ""}`,
        outfits.length ? "Changing outfits must NEVER change the face or body." : "",
      ]),
    ),

    section("SCENE + CAMERA", [
      shot.continueFromPrevious ? `Start from ${start}, the last frame of the previous clip.` : `Start from ${start}, the keyframe image.`,
      `${start} is the master scene reference. Preserve its exact composition: the same room, layout, furniture, props, sunlight and shadows, and the same general placement of every person and object.`,
      full.location ? `Fixed set (never rotate, relocate, resize, recolor or redesign): ${full.location.details}.` : "",
      `Framing: ${shot.camera}. One continuous shot.`,
      locked ? "Camera completely locked. NO camera movement. NO zoom. NO reframing. NO cuts. NO angle changes." : `Camera: ${shot.cameraMove}, smooth and motivated. No cuts. No other reframing.`,
    ]),

    outfits.length
      ? section("EXACT WARDROBE REPRODUCTION — CRITICAL", [
          `${outfitTags.join(", ")} are LITERAL VISUAL WARDROBE BLUEPRINTS, not fashion inspiration. Reproduce the actual visible outfit from each reference.`,
          "Preserve the visible garment type, construction, silhouette, fit, length, layering, color, pattern, material, texture, neckline, sleeves, waist, leg shape, footwear, bags, headwear, eyewear, jewelry and accessories.",
          "DO NOT redesign, simplify, substitute, recolor or omit anything. DO NOT invent garments. DO NOT mix pieces from different outfit references. DO NOT carry accessories from one look into the next.",
          "Each reference is ONE COMPLETE, CLOSED WARDROBE STATE.",
          ...outfits.map((o, i) => `OUTFIT ${i + 1} — ${outfitTags[i]}: ${stop(o)} Reproduce literally.`),
        ])
      : cast.length
        ? section("WARDROBE", [`Every garment and accessory stays exactly as in ${start} for the whole clip. Nothing is added, removed, recolored or swapped.`])
        : "",

    products.length
      ? section("PRODUCT", products.map((p) => `${tagOf(refs, `EXACT PRODUCT (${p.name})`)} is the exact product: ${productAnchor(p)}. Same shape, proportions, colors, cap and label layout in every frame. The label stays sharp, correctly spelled and never warps, melts or rewrites itself.`))
      : "",

    cast.length
      ? section("PERFORMANCE", [
          ...(shot.performance?.length ? shot.performance : [shot.mood ? `Energy: ${shot.mood}.` : ""]),
          "Every movement looks intentional and natural. NEVER stiff. NEVER mannequin-like. The body never freezes while waiting for the next beat.",
          "LOCK THE LOCATION, NOT THE PERFORMANCE: keep everyone spatially anchored to their marks while they keep moving naturally.",
        ])
      : "",

    section("CHOREOGRAPHY", [...beats.map((b, i) => (beats.length > 1 ? `${i + 1}. ${stop(b)}` : stop(b))), shot.endFrame ? `Ends on: ${stop(shot.endFrame)}` : ""]),

    shot.mechanics?.length ? section("PHYSICS + MECHANICS — CRITICAL", shot.mechanics.map(stop)) : "",

    section("CONTINUITY", [
      cast.length ? `IDENTITY: always the exact ${cast.length > 1 ? "people" : "person"} from ${cast.map((c) => idTag(c.name)).join(" and ")}.` : "",
      `SCENE: always the exact environment and composition from ${start}.`,
      outfits.length ? "WARDROBE: always a literal reproduction of the active outfit reference." : cast.length ? `WARDROBE: always exactly as in ${start}.` : "",
      products.length ? "PRODUCT: always the exact product and label." : "",
      `CAMERA: ${locked ? "always stationary" : shot.cameraMove}. LIGHTING: ${shot.lighting || "as in the starting frame"}, consistent.`,
      `Motion is physically plausible at real-time speed; fabric and hair respond to movement; hands keep five fingers and hold objects convincingly.`,
    ]),

    section("AVOID", [`Face morphing or identity drift, flicker, warping or melting text, extra limbs or fingers, objects appearing or vanishing, sliding feet, rubbery motion, sudden lighting changes${phone ? ", cinematic color grading, film grain" : ""}.`]),

    section("ABSOLUTE PRIORITY ORDER", [
      ...[
        cast.length ? `EXACT SAME ${cast.length > 1 ? "PEOPLE" : "PERSON"} FROM ${cast.map((c) => idTag(c.name)).join(" + ")}.` : "",
        ...(shot.priorities ?? []),
        outfits.length ? `${outfitTags[0]}–${outfitTags[outfitTags.length - 1]} ARE LITERAL WARDROBE BLUEPRINTS, NOT INSPIRATION.` : "",
        products.length ? "THE PRODUCT AND LABEL NEVER CHANGE." : "",
        "CAMERA + ROOM + LIGHTING REMAIN CONSISTENT.",
      ]
        .filter(Boolean)
        .map((l, i) => `${i + 1}. ${l}`),
    ]),

    ...fixLines(shot, "animation"),

    section("FINAL RESULT", [
      `Create one seamless ${shot.durationSeconds}-second ${formatWords(full.bible.aspectRatio)} ${phone ? "creator-style" : "cinematic"} shot. ${shot.startFrame ? `It opens on: ${stop(shot.startFrame)}` : ""} ${beats.map(stop).join(" ")} ${shot.endFrame ? `It ends on: ${stop(shot.endFrame)}` : ""} Throughout, ${cast.length ? `${names} remain${cast.length > 1 ? "" : "s"} exactly recognizable and ` : ""}the camera, room and lighting stay perfectly consistent.`.replace(/\s+/g, " ").trim(),
    ]),
  ];
  return sections.filter((l) => l.length > 0).join("\n");
}

export function withPrompts(shot: ShotPlan, ctx: PromptContext): Shot {
  // Old storyboards have none of the director's extra fields; the builder copes either way.
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
