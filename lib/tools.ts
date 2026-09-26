import type { ToolKind } from "./types.ts";

// One storyboard engine, four tools. Each tool changes the brief the member
// fills in and the direction Claude follows; the script → storyboard → edit
// pipeline, the consistency anchors and the exports are shared.

export interface ToolConfig {
  kind: ToolKind;
  label: string;
  href: string;
  eyebrow: string;
  headline: [string, string, string]; // before, emphasised, after
  steps: [string, string, string, string];
  angleLabel: string;
  angles: string[];
  lengths: number[]; // seconds
  needsProduct: boolean;
  /** What the script ("beats") step must produce. Server-side only. */
  beatsDirection: string;
  /** Visual direction for every shot. Server-side only. */
  shotDirection: string;
}

export const TOOLS: Record<ToolKind, ToolConfig> = {
  episode: {
    kind: "episode",
    label: "Episode Builder",
    href: "/builder",
    eyebrow: "Episode Builder",
    headline: ["A new ", "episode", ""],
    steps: ["Story", "Script", "Storyboard", "Edit & post"],
    angleLabel: "",
    angles: [],
    lengths: [60, 180, 240, 270, 300],
    needsProduct: false,
    beatsDirection: "",
    shotDirection:
      "Cinematic short-form drama: varied shot sizes, motivated camera moves, expressive close-ups on reactions.",
  },
  ugc: {
    kind: "ugc",
    label: "UGC Ad Builder",
    href: "/ugc",
    eyebrow: "UGC Ad Builder",
    headline: ["A new ", "UGC", " ad"],
    steps: ["Brief", "Script", "Storyboard", "Edit & post"],
    angleLabel: "Format",
    angles: [
      "Honest review",
      "Get ready with me",
      "Problem → solution",
      "Unboxing / first impressions",
      "Routine (morning / night)",
      "Before & after",
      "3 reasons why",
      "Storytime testimonial",
    ],
    lengths: [15, 30, 45, 60],
    needsProduct: true,
    beatsDirection: `Write a UGC (user-generated content) ad performed by the creator talking to camera like a real person, not an actor.
Beats in this order, adapted to the format: Hook (first 2 seconds: a bold claim, a question, or a visual pattern-interrupt) → Problem or context → Product intro (show packaging, say the name) → Demo (texture, application, using it) → Result or feeling → Call to action.
Dialogue is casual, first person, contractions, short sentences, like a voice note to a friend. No marketing clichés. Only claim benefits listed in the product details.
Give each beat onScreenText: 2-6 punchy words for the caption burned into the video (the hook beat especially).`,
    shotDirection: `Authentic smartphone UGC look: handheld front-camera framing for talking shots (creator holding the phone at arm's length or propped up), natural window light, real home setting, slight imperfection. Mix in close-ups of the product in hand, texture swatches on skin or fingertips, and application. The product label must face camera and be legible in product shots. Never glossy or studio-lit.`,
  },
  commercial: {
    kind: "commercial",
    label: "Commercial Builder",
    href: "/commercial",
    eyebrow: "Commercial Builder",
    headline: ["A new ", "commercial", ""],
    steps: ["Brief", "Script", "Storyboard", "Edit & post"],
    angleLabel: "Style",
    angles: [
      "Luxury cinematic",
      "Warm & emotional (family, love)",
      "Clean minimal",
      "Playful & colourful",
      "Bold sport / energy",
      "Editorial fashion",
    ],
    lengths: [15, 30, 45, 60],
    needsProduct: true,
    beatsDirection: `Write a professionally directed brand commercial.
Structure: an arresting opening image → a lifestyle story moment that shows the feeling the product gives → product hero moments (macro detail, texture, pour, spray, reveal) → emotional payoff → end card with the brand name and tagline.
Voiceover is sparse and elegant (one short line per beat or none); onScreenText carries the tagline and at most one short line per beat.`,
    shotDirection: `High-end commercial cinematography: controlled soft lighting, shallow depth of field, slow dolly, orbit and crane moves, macro product shots with perfect label placement, hero shots on clean surfaces with reflections, graceful slow motion. Every frame looks art-directed. The product label must be legible and correct in hero shots.`,
  },
  transition: {
    kind: "transition",
    label: "Try-On Transitions",
    href: "/transitions",
    eyebrow: "Try-On Transitions",
    headline: ["A new ", "transformation", ""],
    steps: ["Brief", "Script", "Storyboard", "Edit & post"],
    angleLabel: "Transformation",
    angles: [
      "Outfit try-on",
      "Full glam makeup",
      "Lip combo",
      "Hair transformation",
      "Accessories styling",
      "Morning-to-night look",
    ],
    lengths: [15, 20, 30],
    needsProduct: false,
    beatsDirection: `Write a step-by-step transformation storyboard with precise timings, like a try-on or makeup transition video.
Structure: a hook frame of the starting look (or the finished look as a teaser) → one beat per item or step, applied in the order given, each 1-2 seconds → a retention moment around the middle (a turn, a mirror check, a reveal of the back) → the full final look → a final pose or walk.
Each beat's action states exactly what is being added and where on the body or face. Keep everything already applied visible and unchanged in later beats (continuity). Little or no dialogue; onScreenText can name each piece.`,
    shotDirection: `Locked-off or very slow camera so every step can be match-cut: the same position, pose and framing between consecutive shots wherever possible, and continueFromPrevious true when the angle is unchanged. Close-ups for jewellery, lips, eyes and shoes; full-length for outfit reveals. Bright, even beauty lighting. Items already applied must stay identical in every later shot.`,
  },
};

export const AD_TOOLS: ToolKind[] = ["ugc", "commercial", "transition"];

export function toolFor(kind: ToolKind | undefined): ToolConfig {
  return TOOLS[kind ?? "episode"];
}
