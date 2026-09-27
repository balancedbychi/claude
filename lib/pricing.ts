import type { Episode, SeriesBible, Shot } from "./types.ts";

// What it costs, in Higgsfield credits, dollars and waiting time, to turn
// the team's prompts into images and clips. Higgsfield doesn't publish a
// price API, so these are defaults from its public pricing (September 2026)
// that the admin can correct in Admin → Pricing whenever Higgsfield changes
// them. Everything shown to members is labelled as an estimate: the real
// number is on Higgsfield's Generate button.

export interface ModelPrice {
  id: string;
  label: string;
  type: "image" | "video";
  /** Credits per image, or per second of video. */
  credits: number;
  /** Video only: shortest clip Higgsfield bills for. */
  minSeconds?: number;
  /** Typical wait for one image or one clip, in seconds. */
  secondsToMake: number;
}

export interface PriceBook {
  /** Dollars per credit (e.g. Plus: $59 for 1,200 credits ≈ $0.05). */
  creditUsd: number;
  /** Budget this many attempts per shot, because some come back distorted. */
  attempts: number;
  models: ModelPrice[];
  defaultImage: string;
  defaultVideo: string;
  updatedAt: string;
}

export const DEFAULT_PRICING: PriceBook = {
  creditUsd: 0.05,
  attempts: 2,
  models: [
    { id: "nano_banana_pro_2k", label: "Nano Banana Pro · 2K", type: "image", credits: 15, secondsToMake: 40 },
    { id: "nano_banana_pro_1k", label: "Nano Banana Pro · 1K", type: "image", credits: 12, secondsToMake: 30 },
    { id: "nano_banana_pro_4k", label: "Nano Banana Pro · 4K", type: "image", credits: 25, secondsToMake: 60 },
    { id: "kling3_720", label: "Kling 3.0 · 720p", type: "video", credits: 1.75, minSeconds: 3, secondsToMake: 150 },
    { id: "kling3_1080", label: "Kling 3.0 · 1080p", type: "video", credits: 2.5, minSeconds: 3, secondsToMake: 180 },
    { id: "seedance2_720", label: "Seedance 2.0 · 720p", type: "video", credits: 4.6, minSeconds: 5, secondsToMake: 180 },
    { id: "seedance2_1080", label: "Seedance 2.0 · 1080p", type: "video", credits: 9, minSeconds: 5, secondsToMake: 240 },
  ],
  defaultImage: "nano_banana_pro_2k",
  defaultVideo: "kling3_1080",
  updatedAt: "2026-09-26",
};

export interface Estimate {
  credits: number;
  usd: number;
  /** Generation time, if run one after another. */
  seconds: number;
  images: number;
  clips: number;
}

const ZERO: Estimate = { credits: 0, usd: 0, seconds: 0, images: 0, clips: 0 };

export function modelFor(book: PriceBook, type: "image" | "video", id?: string): ModelPrice | undefined {
  const of = book.models.filter((m) => m.type === type);
  return of.find((m) => m.id === id) ?? of.find((m) => m.id === (type === "image" ? book.defaultImage : book.defaultVideo)) ?? of[0];
}

/** The member's picks, from their series settings, falling back to the admin defaults. */
export function modelsFor(book: PriceBook, bible?: Pick<SeriesBible, "imageModel" | "videoModel">) {
  return { image: modelFor(book, "image", bible?.imageModel), video: modelFor(book, "video", bible?.videoModel) };
}

function finish(credits: number, seconds: number, images: number, clips: number, book: PriceBook): Estimate {
  const c = Math.round(credits * 10) / 10;
  return { credits: c, usd: Math.round(c * book.creditUsd * 100) / 100, seconds: Math.round(seconds), images, clips };
}

export function estimateImages(n: number, book: PriceBook, image?: ModelPrice): Estimate {
  if (!image || n <= 0) return ZERO;
  return finish(image.credits * n, image.secondsToMake * n, n, 0, book);
}

/** One attempt at a shot: a keyframe (unless it continues the last clip) plus the clip. */
export function estimateShot(shot: Pick<Shot, "durationSeconds" | "continueFromPrevious">, book: PriceBook, m: ReturnType<typeof modelsFor>): Estimate {
  const img = !shot.continueFromPrevious && m.image ? m.image : undefined;
  const vid = m.video;
  const billed = vid ? Math.max(vid.minSeconds ?? 0, shot.durationSeconds) : 0;
  return finish(
    (img?.credits ?? 0) + (vid ? vid.credits * billed : 0),
    (img?.secondsToMake ?? 0) + (vid?.secondsToMake ?? 0),
    img ? 1 : 0,
    vid ? 1 : 0,
    book,
  );
}

export function sum(list: Estimate[], book: PriceBook): Estimate {
  const t = list.reduce<Estimate>((a, e) => ({ ...a, credits: a.credits + e.credits, seconds: a.seconds + e.seconds, images: a.images + e.images, clips: a.clips + e.clips }), { ...ZERO });
  return finish(t.credits, t.seconds, t.images, t.clips, book);
}

export function times(e: Estimate, n: number, book: PriceBook): Estimate {
  return finish(e.credits * n, e.seconds * n, e.images * n, e.clips * n, book);
}

/** Every storyboarded shot in a project, one attempt each. */
export function estimateProject(p: Pick<Episode, "shots">, book: PriceBook, m: ReturnType<typeof modelsFor>): Estimate {
  return sum(p.shots.flatMap((s) => s.shots.map((shot) => estimateShot(shot, book, m))), book);
}

export function fmtCredits(n: number): string {
  return `${n % 1 === 0 ? n.toLocaleString("en-US") : n.toFixed(1)} credit${n === 1 ? "" : "s"}`;
}

export function fmtUsd(n: number): string {
  return n < 10 ? `$${n.toFixed(2)}` : `$${Math.round(n).toLocaleString("en-US")}`;
}

export function fmtWait(seconds: number): string {
  if (seconds < 90) return `~${Math.max(10, Math.round(seconds / 10) * 10)} sec`;
  const m = Math.round(seconds / 60);
  if (m < 90) return `~${m} min`;
  const h = Math.floor(m / 60);
  return `~${h} hr ${m % 60 ? `${m % 60} min` : ""}`.trim();
}

/** "≈ 45 credits (~$2.25) · ~4 min" */
export function fmtEstimate(e: Estimate): string {
  return `≈ ${fmtCredits(e.credits)} (~${fmtUsd(e.usd)}) · ${fmtWait(e.seconds)}`;
}

/** The team's cost report for a finished storyboard: first pass and with regenerations. */
export function costReport(p: Pick<Episode, "shots">, book: PriceBook, bible?: SeriesBible): string {
  const m = modelsFor(book, bible);
  const once = estimateProject(p, book, m);
  if (once.clips === 0) return "";
  const buffered = times(once, book.attempts, book);
  return [
    `to generate it on Higgsfield (${[m.image?.label, m.video?.label].filter(Boolean).join(" + ")}):`,
    `${once.images} image${once.images === 1 ? "" : "s"} + ${once.clips} clip${once.clips === 1 ? "" : "s"} ≈ ${fmtCredits(once.credits)} (~${fmtUsd(once.usd)}), about ${fmtWait(once.seconds).replace("~", "")} of generating.`,
    `budget ≈ ${fmtCredits(buffered.credits)} (~${fmtUsd(buffered.usd)}) to allow ${book.attempts} tries per shot, since AI sometimes distorts faces, hands or labels and you'll want to regenerate those.`,
    "these are estimates: Higgsfield shows the exact price on its Generate button.",
  ].join(" ");
}

/** Before the storyboard exists: split each scene into clips of at most maxClip seconds, each with a keyframe (an upper bound). */
export function estimateScenes(scenes: { durationSeconds: number }[], maxClip: number, book: PriceBook, m: ReturnType<typeof modelsFor>): Estimate {
  return sum(
    scenes.flatMap((s) => {
      const n = Math.max(1, Math.ceil(s.durationSeconds / maxClip));
      return Array.from({ length: n }, () => estimateShot({ durationSeconds: s.durationSeconds / n, continueFromPrevious: false }, book, m));
    }),
    book,
  );
}
