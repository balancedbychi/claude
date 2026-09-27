"use client";

import { Clock, Coins, TriangleAlert } from "lucide-react";
import { clipCredits, fmtCredits, fmtWait, modelsFor, priceLabel, type Estimate } from "@/lib/pricing.ts";
import type { SeriesBible } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";

/** A compact "≈ 35 credits · $1.75 · ~4 min" tag. */
export function CostTag({ e, prefix }: { e: Estimate; prefix?: string }) {
  if (e.credits === 0 && e.seconds === 0) return null;
  return (
    <span className="cost-tag" title="Estimate from the studio's Higgsfield price list. Higgsfield shows the exact credits on its Generate button.">
      {prefix && <span>{prefix}</span>}
      <Coins size={12} aria-hidden="true" /> ≈ {fmtCredits(e.credits)}
      <Clock size={12} aria-hidden="true" /> {fmtWait(e.seconds)}
    </span>
  );
}

/** The member's Higgsfield models, saved on their series settings. */
export function ModelPicker() {
  const { pricing, bible, setBible } = useStudio();
  const m = modelsFor(pricing, bible);
  const set = (key: "imageModel" | "videoModel", id: string) => setBible((b: SeriesBible) => ({ ...b, [key]: id }));
  const option = (type: "image" | "video") =>
    pricing.models
      .filter((x) => x.type === type)
      .map((x) => (
        <option key={x.id} value={x.id}>
          {priceLabel(x)} · {x.type === "image" ? `${x.credits} credits/image` : `${x.credits} credits/sec`}
        </option>
      ));
  return (
    <div className="row">
      <label className="inline-field">
        Image model
        <select value={m.image?.id} onChange={(e) => set("imageModel", e.target.value)}>{option("image")}</select>
      </label>
      <label className="inline-field">
        Video model
        <select value={m.video?.id} onChange={(e) => set("videoModel", e.target.value)}>{option("video")}</select>
      </label>
    </div>
  );
}

/** The standing reminder that generators get things wrong, and what to do about it. */
export function GenerateNote({ compact }: { compact?: boolean }) {
  return (
    <div className="note warn" role="note">
      <TriangleAlert size={15} aria-hidden="true" /> <b>AI can hallucinate.</b> Faces can drift, hands grow extra fingers, labels
      misspell and rooms rearrange. Check every image and clip against your references, and regenerate anything that&apos;s off
      {compact ? "." : <>: tap <b>Regenerate</b> on the shot, tick what went wrong, and the prompt gets targeted fixes. Budget for a retry or two.</>}
    </div>
  );
}

/** Line under a reference-image prompt: what one image costs. */
export function ImageCost({ count = 1 }: { count?: number }) {
  const { pricing, bible } = useStudio();
  const image = modelsFor(pricing, bible).image;
  if (!image) return null;
  const credits = image.credits * count;
  return (
    <span className="cost-tag" title="Estimate. Higgsfield shows the exact credits on its Generate button.">
      <Coins size={12} aria-hidden="true" /> ≈ {fmtCredits(credits)}
      <Clock size={12} aria-hidden="true" /> {fmtWait(image.secondsToMake * count)} on {priceLabel(image)}
    </span>
  );
}

/** What one clip of a given length costs on the member's video model. */
export function ClipCost({ seconds }: { seconds: number }) {
  const { pricing, bible } = useStudio();
  const video = modelsFor(pricing, bible).video;
  if (!video) return null;
  const credits = clipCredits(video, seconds);
  return (
    <span className="cost-tag" title="Estimate. Higgsfield shows the exact credits on its Generate button.">
      <Coins size={12} aria-hidden="true" /> ≈ {fmtCredits(credits)} per {seconds}s clip
      <Clock size={12} aria-hidden="true" /> {fmtWait(video.secondsToMake)} on {priceLabel(video)}
    </span>
  );
}
