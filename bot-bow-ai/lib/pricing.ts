import type { Episode, SeriesBible, Shot } from "./types.ts";

// What it costs, in Higgsfield credits and waiting time, to turn the team's
// prompts into images and clips. Members already have Higgsfield plans, so
// everything is in credits, never dollars. The defaults below come from
// Higgsfield's own cost check (September 2026, 9:16, audio off); the wait
// times are rough. The admin corrects both in Admin → Pricing.
// Everything shown to members is labelled as an estimate: the exact number
// is on Higgsfield's Generate button.

export interface ModelPrice {
  id: string;
  /** Model family in the model guide (lib/model-guide.ts). */
  family: string;
  label: string;
  type: "image" | "video";
  /** "2K", "1080p"… (blank if it doesn't matter). */
  resolution: string;
  /** Credits per image, or per second of video. */
  credits: number;
  /** Video only: shortest clip Higgsfield bills for. */
  minSeconds?: number;
  /** Typical wait for one image or one clip, in seconds. */
  secondsToMake: number;
  /** Where the number came from: "account" (Higgsfield's cost check), "published", or "estimate". */
  source: "account" | "published" | "estimate";
}

export interface PriceBook {
  /** Budget this many attempts per shot, because some come back distorted. */
  attempts: number;
  models: ModelPrice[];
  defaultImage: string;
  defaultVideo: string;
  /** Cheap settings for a test clip before the full-quality render. */
  testVideo: string;
  updatedAt: string;
}

export const DEFAULT_PRICING: PriceBook = {
  attempts: 2,
  models: [
    { id: "nano_banana_pro_2k", family: "nano_banana_pro", label: "Nano Banana Pro", type: "image", resolution: "2K", credits: 2, secondsToMake: 40, source: "account" },
    { id: "nano_banana_pro_4k", family: "nano_banana_pro", label: "Nano Banana Pro", type: "image", resolution: "4K", credits: 4, secondsToMake: 60, source: "account" },
    { id: "nano_banana_pro_1k", family: "nano_banana_pro", label: "Nano Banana Pro", type: "image", resolution: "1K", credits: 2, secondsToMake: 30, source: "account" },
    { id: "soul_2_2k", family: "soul_2", label: "Soul 2.0", type: "image", resolution: "2K", credits: 0.12, secondsToMake: 20, source: "account" },
    { id: "soul_cinema_2k", family: "soul_cinematic", label: "Soul Cinema", type: "image", resolution: "2K", credits: 0.12, secondsToMake: 20, source: "account" },
    { id: "gpt_image_2_2k", family: "gpt_image_2", label: "GPT Image 2 (medium)", type: "image", resolution: "2K", credits: 2, secondsToMake: 60, source: "account" },
    { id: "gpt_image_2_4k", family: "gpt_image_2", label: "GPT Image 2 (high)", type: "image", resolution: "4K", credits: 11, secondsToMake: 90, source: "account" },
    { id: "gpt_image_2_5_sunburst_2k", family: "gpt_image_2_5", label: "GPT Image 2.5 Sunburst (high)", type: "image", resolution: "2K", credits: 2.75, secondsToMake: 60, source: "account" },
    { id: "gpt_image_2_5_flare_2k", family: "gpt_image_2_5", label: "GPT Image 2.5 Flare", type: "image", resolution: "2K", credits: 1, secondsToMake: 30, source: "account" },
    { id: "seedream_5_pro_2k", family: "seedream_5", label: "Seedream 5.0 Pro", type: "image", resolution: "2K", credits: 2.5, secondsToMake: 30, source: "account" },
    { id: "seedream_5_flash_2k", family: "seedream_5", label: "Seedream 5.0 Flash", type: "image", resolution: "2K", credits: 0.5, secondsToMake: 15, source: "account" },
    { id: "nano_banana_2_1k", family: "nano_banana_2", label: "Nano Banana 2", type: "image", resolution: "1K", credits: 1.5, secondsToMake: 20, source: "account" },
    { id: "nano_banana_2_4k", family: "nano_banana_2", label: "Nano Banana 2", type: "image", resolution: "4K", credits: 3, secondsToMake: 40, source: "account" },
    { id: "nano_banana_2_lite", family: "nano_banana_2", label: "Nano Banana 2 Lite", type: "image", resolution: "1K", credits: 1, secondsToMake: 15, source: "account" },
    { id: "recraft_v4_1_2k", family: "recraft_v4", label: "Recraft V4.1", type: "image", resolution: "2K", credits: 8, secondsToMake: 40, source: "account" },
    { id: "grok_imagine_2_2k", family: "grok_imagine_2", label: "Grok Imagine 2.0", type: "image", resolution: "2K", credits: 2.5, secondsToMake: 30, source: "account" },
    { id: "flux_2_pro_2k", family: "flux_2", label: "FLUX.2 Pro", type: "image", resolution: "2K", credits: 1.5, secondsToMake: 20, source: "account" },
    { id: "z_image", family: "z_image", label: "Z-Image", type: "image", resolution: "1K", credits: 0.15, secondsToMake: 10, source: "account" },
    { id: "seedance_2_5_1080", family: "seedance_2_5", label: "Seedance 2.5", type: "video", resolution: "1080p", credits: 12, minSeconds: 4, secondsToMake: 240, source: "account" },
    { id: "seedance_2_5_720", family: "seedance_2_5", label: "Seedance 2.5", type: "video", resolution: "720p", credits: 7, minSeconds: 4, secondsToMake: 180, source: "account" },
    { id: "seedance_2_5_480", family: "seedance_2_5", label: "Seedance 2.5", type: "video", resolution: "480p", credits: 3, minSeconds: 4, secondsToMake: 120, source: "account" },
    { id: "kling3_pro", family: "kling_3", label: "Kling 3.0 Pro", type: "video", resolution: "1080p", credits: 1.75, minSeconds: 3, secondsToMake: 180, source: "account" },
    { id: "kling3_std", family: "kling_3", label: "Kling 3.0 Standard", type: "video", resolution: "720p", credits: 1.5, minSeconds: 3, secondsToMake: 150, source: "account" },
    { id: "kling3_4k", family: "kling_3", label: "Kling 3.0", type: "video", resolution: "4K", credits: 6, minSeconds: 3, secondsToMake: 300, source: "account" },
    { id: "kling3_turbo_1080", family: "kling_3", label: "Kling 3.0 Turbo", type: "video", resolution: "1080p", credits: 2, minSeconds: 3, secondsToMake: 90, source: "account" },
    { id: "seedance2_1080", family: "seedance_2_0", label: "Seedance 2.0", type: "video", resolution: "1080p", credits: 9, minSeconds: 4, secondsToMake: 240, source: "account" },
    { id: "seedance2_4k", family: "seedance_2_0", label: "Seedance 2.0", type: "video", resolution: "4K", credits: 22, minSeconds: 4, secondsToMake: 360, source: "account" },
    { id: "gemini_omni_1080", family: "gemini_omni", label: "Gemini Omni Flash 1.1", type: "video", resolution: "1080p", credits: 4.5, minSeconds: 3, secondsToMake: 120, source: "account" },
    { id: "gemini_omni_4k", family: "gemini_omni", label: "Gemini Omni Flash 1.1", type: "video", resolution: "4K", credits: 9, minSeconds: 3, secondsToMake: 180, source: "account" },
    { id: "cinema_studio_3_1080", family: "cinema_studio_3", label: "Cinema Studio 3.0", type: "video", resolution: "1080p", credits: 10, minSeconds: 4, secondsToMake: 300, source: "account" },
    { id: "veo3_1_high", family: "veo_3_1", label: "Veo 3.1 (high)", type: "video", resolution: "", credits: 10, minSeconds: 4, secondsToMake: 240, source: "account" },
    { id: "flux_3_video_1080", family: "flux_3_video", label: "FLUX.3 Video", type: "video", resolution: "1080p", credits: 9, minSeconds: 5, secondsToMake: 180, source: "account" },
    { id: "minimax_h3_2k", family: "minimax_h3", label: "MiniMax H3", type: "video", resolution: "2K", credits: 2, minSeconds: 4, secondsToMake: 180, source: "account" },
    { id: "wan_3_1080", family: "wan_3", label: "Wan 3.0", type: "video", resolution: "1080p", credits: 3.5, minSeconds: 2, secondsToMake: 180, source: "account" },
    { id: "grok_imagine_1_5_1080", family: "grok_imagine_1_5", label: "Grok Imagine 1.5", type: "video", resolution: "1080p", credits: 8, minSeconds: 2, secondsToMake: 150, source: "account" },
  ],
  defaultImage: "nano_banana_pro_2k",
  defaultVideo: "seedance_2_5_1080",
  testVideo: "seedance_2_5_480",
  updatedAt: "2026-09-27",
};

export interface Estimate {
  credits: number;
  /** Generation time, if run one after another. */
  seconds: number;
  images: number;
  clips: number;
}

const ZERO: Estimate = { credits: 0, seconds: 0, images: 0, clips: 0 };

export const priceLabel = (m: ModelPrice) => [m.label, m.resolution].filter(Boolean).join(" · ");

export function modelFor(book: PriceBook, type: "image" | "video", id?: string): ModelPrice | undefined {
  const of = book.models.filter((m) => m.type === type);
  return of.find((m) => m.id === id) ?? of.find((m) => m.id === (type === "image" ? book.defaultImage : book.defaultVideo)) ?? of[0];
}

/** The member's picks, from their series settings, falling back to the admin defaults. */
export function modelsFor(book: PriceBook, bible?: Pick<SeriesBible, "imageModel" | "videoModel">) {
  return { image: modelFor(book, "image", bible?.imageModel), video: modelFor(book, "video", bible?.videoModel) };
}

/** The cheap test settings: the admin's test row, else the cheapest video row. */
export function testModel(book: PriceBook): ModelPrice | undefined {
  return book.models.find((m) => m.id === book.testVideo && m.type === "video") ?? [...book.models].filter((m) => m.type === "video").sort((a, b) => a.credits - b.credits)[0];
}

function finish(credits: number, seconds: number, images: number, clips: number): Estimate {
  return { credits: Math.round(credits * 10) / 10, seconds: Math.round(seconds), images, clips };
}

export function clipCredits(video: ModelPrice, seconds: number): number {
  return video.credits * Math.max(video.minSeconds ?? 0, seconds);
}

/** One attempt at a shot: a keyframe (unless it continues the last clip) plus the clip. */
export function estimateShot(shot: Pick<Shot, "durationSeconds" | "continueFromPrevious">, m: ReturnType<typeof modelsFor>): Estimate {
  const img = !shot.continueFromPrevious && m.image ? m.image : undefined;
  const vid = m.video;
  return finish((img?.credits ?? 0) + (vid ? clipCredits(vid, shot.durationSeconds) : 0), (img?.secondsToMake ?? 0) + (vid?.secondsToMake ?? 0), img ? 1 : 0, vid ? 1 : 0);
}

export function sum(list: Estimate[]): Estimate {
  const t = list.reduce<Estimate>((a, e) => ({ credits: a.credits + e.credits, seconds: a.seconds + e.seconds, images: a.images + e.images, clips: a.clips + e.clips }), { ...ZERO });
  return finish(t.credits, t.seconds, t.images, t.clips);
}

export function times(e: Estimate, n: number): Estimate {
  return finish(e.credits * n, e.seconds * n, e.images * n, e.clips * n);
}

/** Every storyboarded shot in a project, one attempt each. */
export function estimateProject(p: Pick<Episode, "shots">, m: ReturnType<typeof modelsFor>): Estimate {
  return sum(p.shots.flatMap((s) => s.shots.map((shot) => estimateShot(shot, m))));
}

/** Before the storyboard exists: split each scene into clips of at most maxClip seconds, each with a keyframe (an upper bound). */
export function estimateScenes(scenes: { durationSeconds: number }[], maxClip: number, m: ReturnType<typeof modelsFor>): Estimate {
  return sum(
    scenes.flatMap((s) => {
      const n = Math.max(1, Math.ceil(s.durationSeconds / maxClip));
      return Array.from({ length: n }, () => estimateShot({ durationSeconds: s.durationSeconds / n, continueFromPrevious: false }, m));
    }),
  );
}

/** The shot most likely to go wrong, so it's the one worth testing: most moving parts, then longest. */
export function hardestShot<T extends Pick<Shot, "durationSeconds" | "characterIds" | "productIds"> & { mechanics?: string[]; wardrobe?: string[] }>(shots: T[]): T | undefined {
  const risk = (s: T) => s.characterIds.length * 2 + s.productIds.length * 2 + (s.mechanics?.length ?? 0) * 2 + Math.max(0, (s.wardrobe?.length ?? 0) - 1) * 3 + s.durationSeconds / 5;
  return [...shots].sort((a, b) => risk(b) - risk(a))[0];
}

/** A test clip: the hardest shot on the test settings, at its shortest billable length. */
export function testClip(shot: Pick<Shot, "durationSeconds">, book: PriceBook): { model: ModelPrice; seconds: number; estimate: Estimate } | null {
  const model = testModel(book);
  if (!model) return null;
  const seconds = Math.min(shot.durationSeconds, Math.max(model.minSeconds ?? 0, 5));
  return { model, seconds, estimate: finish(clipCredits(model, seconds), model.secondsToMake, 0, 1) };
}

export function fmtCredits(n: number): string {
  return `${n % 1 === 0 ? n.toLocaleString("en-US") : n.toFixed(1)} credit${n === 1 ? "" : "s"}`;
}

export function fmtWait(seconds: number): string {
  if (seconds < 90) return `~${Math.max(10, Math.round(seconds / 10) * 10)} sec`;
  const m = Math.round(seconds / 60);
  if (m < 90) return `~${m} min`;
  const h = Math.floor(m / 60);
  return `~${h} hr ${m % 60 ? `${m % 60} min` : ""}`.trim();
}

/** "≈ 45 credits · ~4 min" */
export function fmtEstimate(e: Estimate): string {
  return `≈ ${fmtCredits(e.credits)} · ${fmtWait(e.seconds)}`;
}

/** The team's cost report for a finished storyboard: first pass and with regenerations. */
export function costReport(p: Pick<Episode, "shots">, book: PriceBook, bible?: SeriesBible): string {
  const m = modelsFor(book, bible);
  const once = estimateProject(p, m);
  if (once.clips === 0) return "";
  const buffered = times(once, book.attempts);
  return [
    `to generate it on Higgsfield (${[m.image && priceLabel(m.image), m.video && priceLabel(m.video)].filter(Boolean).join(" + ")}):`,
    `${once.images} image${once.images === 1 ? "" : "s"} + ${once.clips} clip${once.clips === 1 ? "" : "s"} ≈ ${fmtCredits(once.credits)}, about ${fmtWait(once.seconds).replace("~", "")} of generating.`,
    `budget ≈ ${fmtCredits(buffered.credits)} to allow ${book.attempts} tries per shot, since AI sometimes distorts faces, hands or labels and you'll want to regenerate those.`,
    "these are estimates: Higgsfield shows the exact credits on its Generate button.",
  ].join(" ");
}
