// The Higgsfield model guide: what each model is best at, what it outputs,
// and what it costs. Credits come from Higgsfield's own cost check
// (September 2026, 9:16, audio off) and are repeated in the price book
// (lib/pricing.ts) that the admin can edit. Model names and taglines match
// Higgsfield's model picker.

export interface GuideModel {
  id: string;
  name: string;
  type: "image" | "video";
  tagline: string;
  bestFor: string[];
  watchOut?: string;
  /** e.g. "1K · 2K · 4K" or "480p · 720p · 1080p". */
  output: string;
  /** Video: clip length range. */
  length?: string;
  /** Plain-language cost, e.g. "2 credits at 2K, 4 at 4K". */
  cost: string;
  speed: "fast" | "medium" | "slow";
  top?: boolean;
}

export const IMAGE_MODELS: GuideModel[] = [
  {
    id: "nano_banana_pro", name: "Nano Banana Pro", type: "image", top: true,
    tagline: "Top quality, sharp text, follows references closely",
    bestFor: ["Keyframes built from your character, set and product references", "Product shots with a readable label", "4K hero images and thumbnails"],
    output: "1K · 2K · 4K", cost: "2 credits at 1K or 2K, 4 at 4K", speed: "medium",
  },
  {
    id: "soul_2", name: "Higgsfield Soul 2.0", type: "image", top: true,
    tagline: "Next generation ultra-realistic fashion visuals",
    bestFor: ["Your AI influencer's face, trained once as a Soul ID and reused", "Fashion, UGC and editorial portraits", "Outfit reference images for try-ons"],
    watchOut: "Tops out at 2K, and takes one reference image: upscale with Topaz for 4K.",
    output: "1.5K · 2K", cost: "about 0.1 credits (on your plan)", speed: "fast",
  },
  {
    id: "soul_cinematic", name: "Higgsfield Soul Cinema", type: "image",
    tagline: "Cinematic film-grade aesthetic",
    bestFor: ["Episode keyframes with a film look", "Moody, dramatic lighting"],
    watchOut: "Reads as film, not phone footage: skip it for UGC.",
    output: "1.5K · 2K", cost: "about 0.1 credits (on your plan)", speed: "fast",
  },
  {
    id: "gpt_image_2_5", name: "GPT Image 2.5 (Sunburst · Flare)", type: "image",
    tagline: "Sunburst: exceptional quality, precise edits. Flare: stunning everyday images, fast",
    bestFor: ["Precise edits to an image you already like (swap a top, fix a hand)", "Text in the image"],
    output: "1K · 2K · 4K", cost: "Flare 1 credit at 2K; Sunburst 2.75 at 2K (high quality)", speed: "medium",
  },
  {
    id: "gpt_image_2", name: "GPT Image 2", type: "image", top: true,
    tagline: "4K images with near-perfect text rendering",
    bestFor: ["Thumbnails and posters with words on them", "Packaging and labels that must be spelled right"],
    watchOut: "4K at high quality is the priciest image here; use 2K medium for drafts.",
    output: "1K · 2K · 4K", cost: "0.5 at 1K low, 2 at 2K medium, 11 at 4K high", speed: "slow",
  },
  {
    id: "seedream_5", name: "Seedream 5.0 (Pro · Flash)", type: "image",
    tagline: "Logically consistent images with intelligent visual reasoning",
    bestFor: ["Instruction edits (\"same room, evening light\")", "Keeping many references consistent", "Flash: cheap, fast drafts"],
    output: "1K · 1.5K · 2K", cost: "Pro 2.5 credits at 2K; Flash 0.5", speed: "fast",
  },
  {
    id: "nano_banana_2", name: "Nano Banana 2 · 2 Lite", type: "image",
    tagline: "Fast next-gen images · Lite: lightweight generation at speed",
    bestFor: ["Quick variations and drafts", "Rough composition tests before a Pro render"],
    output: "1K–4K (Lite: 1K)", cost: "1.5 at 1K, 3 at 4K; Lite 1", speed: "fast",
  },
  {
    id: "recraft_v4", name: "Recraft V4.1 · V4 Styles", type: "image",
    tagline: "Style it once, every image matches",
    bestFor: ["Brand assets, logos and icons", "A series of graphics in one locked style"],
    output: "1K · 2K", cost: "8 credits at 2K", speed: "medium",
  },
  {
    id: "grok_imagine_2", name: "Grok Imagine 2.0", type: "image",
    tagline: "High-resolution image generation by xAI",
    bestFor: ["Bold, high-contrast, expressive looks"],
    output: "1K · 2K", cost: "2.5 credits at 2K", speed: "medium",
  },
  {
    id: "flux_2", name: "FLUX.2", type: "image",
    tagline: "Speed-optimized detail",
    bestFor: ["Following long, detailed prompts literally"],
    output: "1K · 2K", cost: "1.5 credits at 2K (Pro)", speed: "fast",
  },
  {
    id: "z_image", name: "Z-Image", type: "image",
    tagline: "Instant lifelike portraits",
    bestFor: ["Near-free idea sketches and mood boards"],
    output: "1K", cost: "0.15 credits", speed: "fast",
  },
  {
    id: "topaz", name: "Topaz", type: "image",
    tagline: "High-resolution upscaler",
    bestFor: ["Taking a 2K keyframe (e.g. from Soul) to 4K", "Upscaling a finished 1080p video to 4K for YouTube"],
    output: "up to 4K", cost: "shown on the Generate button", speed: "medium",
  },
];

export const VIDEO_MODELS: GuideModel[] = [
  {
    id: "seedance_2_5", name: "Seedance 2.5", type: "video", top: true,
    tagline: "Create cinematic videos up to 30 seconds",
    bestFor: ["Long single takes and try-on transitions (one continuous shot)", "Tagging several references: character, scene, outfits, product", "The house video prompt format is written for it"],
    output: "480p · 720p · 1080p", length: "4–30 s",
    cost: "3 credits/sec at 480p, 7 at 720p, 12 at 1080p (a 15 s 1080p clip is 180)", speed: "slow",
  },
  {
    id: "kling_3", name: "Kling 3.0 · Turbo", type: "video",
    tagline: "Cinematic videos with audio",
    bestFor: ["Dialogue and lip-sync with native audio", "Multi-shot scenes", "Cheapest good-looking motion"],
    output: "Standard (720p) · Pro (1080p) · 4K", length: "3–15 s",
    cost: "1.5 credits/sec standard, 1.75 pro, 6 at 4K; Turbo 2/sec at 1080p", speed: "medium",
  },
  {
    id: "genjutsu", name: "Higgsfield Genjutsu", type: "video",
    tagline: "Transfer motion or swap objects from a reference video",
    bestFor: ["Copying a trending dance or gesture onto your character", "Swapping the product or outfit in an existing clip"],
    output: "480p · 720p · 1080p", length: "follows the source video", cost: "shown on the Generate button", speed: "medium",
  },
  {
    id: "kling_motion_control", name: "Kling Motion Control", type: "video",
    tagline: "Transfer motion from video to image",
    bestFor: ["Animating a still keyframe with a real person's movement"],
    output: "720p · 1080p", length: "follows the source video", cost: "shown on the Generate button", speed: "medium",
  },
  {
    id: "gemini_omni", name: "Gemini Omni Flash 1.1", type: "video",
    tagline: "Generate and edit video from any input",
    bestFor: ["Editing a clip you already have", "Short clips with native audio"],
    output: "360p · 720p · 1080p · 4K", length: "3–10 s", cost: "4.5 credits/sec at 1080p, 9 at 4K", speed: "medium",
  },
  {
    id: "seedance_2_0", name: "Seedance 2.0", type: "video",
    tagline: "Reference-driven video, consistent identity",
    bestFor: ["Product videos with several SKUs", "Native 4K when you need it"],
    output: "480p · 720p · 1080p · 4K", length: "4–15 s", cost: "9 credits/sec at 1080p, 22 at 4K", speed: "slow",
  },
  {
    id: "cinema_studio_3", name: "Cinema Studio 3.0", type: "video",
    tagline: "Cinematic video with an AI director",
    bestFor: ["Commercials and dramatic episode moments", "Genre looks (noir, drama, epic)"],
    output: "480p · 720p · 1080p · 4K", length: "4–15 s", cost: "10 credits/sec at 1080p", speed: "slow",
  },
  {
    id: "veo_3_1", name: "Google Veo 3.1", type: "video",
    tagline: "Ultra-realistic, top-tier cinematic quality",
    bestFor: ["The most realistic people and physics", "Short hero shots with sound"],
    output: "basic · high · ultra", length: "4, 6 or 8 s", cost: "about 10 credits/sec (high)", speed: "slow",
  },
  {
    id: "flux_3_video", name: "FLUX.3 Video", type: "video",
    tagline: "Text, image and video generation with synchronized audio",
    bestFor: ["Continuing a clip you already made", "Storyboard-style multi-frame animation"],
    output: "720p · 1080p", length: "5–20 s", cost: "9 credits/sec at 1080p", speed: "medium",
  },
  {
    id: "minimax_h3", name: "MiniMax H3", type: "video",
    tagline: "Create 2K videos from text, keyframes or multimodal references",
    bestFor: ["Start-and-end keyframe clips at 2K for very little"],
    output: "2K", length: "4–15 s", cost: "2 credits/sec", speed: "medium",
  },
  {
    id: "wan_3", name: "Wan 3.0", type: "video",
    tagline: "Create videos from text, keyframes or multimodal references",
    bestFor: ["First-frame / last-frame clips up to 30 s on a budget"],
    output: "480p · 720p · 1080p", length: "2–30 s", cost: "3.5 credits/sec at 1080p", speed: "medium",
  },
  {
    id: "grok_imagine_1_5", name: "Grok Imagine 1.5", type: "video",
    tagline: "Video from text, a start image or audio references",
    bestFor: ["Syncing motion to an audio reference"],
    output: "480p · 720p · 1080p", length: "2–15 s", cost: "8 credits/sec at 1080p", speed: "medium",
  },
];

/** "I want to…" → which models to reach for. */
export const PICKS: { goal: string; image: string; video: string; why: string }[] = [
  { goal: "UGC ad with my AI creator", image: "Nano Banana Pro 2K (keyframe from your references)", video: "Seedance 2.5 1080p · Kling 3.0 Pro if she talks", why: "Nano Banana Pro keeps the face and label from your references; Kling 3.0 does lip-sync with audio." },
  { goal: "Outfit try-on transition", image: "Soul 2.0 or Nano Banana Pro 2K (each outfit as its own reference)", video: "Seedance 2.5 1080p, one continuous take", why: "Seedance 2.5 takes several outfit references in one prompt and holds a 15–30 s single shot." },
  { goal: "Cinematic episode scene", image: "Soul Cinema or Nano Banana Pro 2K", video: "Seedance 2.5 · Cinema Studio 3.0 for hero moments", why: "Film look in the still, then a model that keeps it moving." },
  { goal: "Luxury product commercial", image: "GPT Image 2 or Nano Banana Pro 4K (label close-ups)", video: "Seedance 2.0 or Cinema Studio 3.0", why: "Best text rendering for the label, then smooth, controlled camera moves." },
  { goal: "Copy a trending move", image: "your existing keyframe", video: "Genjutsu or Kling Motion Control", why: "Transfers the motion from the reference video instead of guessing it." },
  { goal: "Cheap test before the real thing", image: "Nano Banana 2 Lite or Seedream 5.0 Flash", video: "Seedance 2.5 at 480p, 5 s, audio off (15 credits)", why: "Catches face, hand and motion problems for a fraction of a 1080p render." },
];

/** Best-practice export settings for a crisp look on each platform. */
export const OUTPUT_TIPS: { platform: string; frame: string; pixels: string; tip: string }[] = [
  { platform: "TikTok · Instagram Reels · YouTube Shorts", frame: "9:16 vertical", pixels: "1080 × 1920 (1080p)", tip: "Render the final at 1080p. These apps play vertical video at 1080p at most, so a 4K render costs more credits and looks the same on a phone. Keyframes at 2K keep faces and labels crisp after the app compresses them." },
  { platform: "YouTube (long-form)", frame: "16:9 horizontal", pixels: "1920 × 1080, or 3840 × 2160 (4K)", tip: "1080p is the minimum. For the crispest result, upscale the finished 1080p edit to 4K with Topaz before uploading: YouTube streams 4K uploads at a higher quality, even to people watching in 1080p." },
  { platform: "Thumbnails & covers", frame: "16:9 (YouTube) or 9:16 (cover)", pixels: "1280 × 720 minimum", tip: "Generate at 2K–4K with GPT Image 2 or Nano Banana Pro so the text stays sharp." },
];

export const VIDEO_RESOLUTIONS: { name: string; vertical: string; horizontal: string; use: string }[] = [
  { name: "480p", vertical: "480 × 854", horizontal: "854 × 480", use: "Tests only. Cheapest way to check face, hands and motion." },
  { name: "720p", vertical: "720 × 1280", horizontal: "1280 × 720", use: "Drafts. Looks soft once TikTok or Instagram compress it." },
  { name: "1080p", vertical: "1080 × 1920", horizontal: "1920 × 1080", use: "Finals for TikTok, Reels, Shorts and YouTube." },
  { name: "4K", vertical: "2160 × 3840", horizontal: "3840 × 2160", use: "YouTube and big screens only. Or render 1080p and upscale with Topaz." },
];

/** Best practices every video render follows. */
export const VIDEO_BEST_PRACTICES = [
  "Test first: run the hardest shot at 480p, 5 seconds, audio off. Check the face, hands, product label and the motion before spending credits on 1080p.",
  "Build every clip from a keyframe image you've already approved (image-to-video), never text alone.",
  "Tag your references in the order the prompt lists them (@Image 1, @Image 2…), and keep the same references for every clip in a scene.",
  "Match the aspect ratio to the platform before you render: 9:16 for TikTok, Reels and Shorts; 16:9 for YouTube.",
  "Keep each clip to one clear action. Split anything complicated into two clips and join them from the last frame.",
  "Turn audio off unless someone speaks: add voiceover and music in the edit instead.",
  "Render finals at 1080p with high bitrate. Export from your editor at the same resolution, 30 fps, without re-compressing.",
];

/** One line on the settings that give the crispest result for this aspect ratio. */
export function outputTip(aspectRatio: string): string {
  if (aspectRatio === "16:9") return "for a crisp YouTube look: keyframes at 2K, render at 1080p (1920 × 1080) with high bitrate, then upscale the finished edit to 4K with Topaz.";
  if (aspectRatio === "1:1") return "for a crisp square post: keyframes at 2K, render at 1080p (1080 × 1080) with high bitrate.";
  return "for a crisp TikTok / Reels / Shorts look: keyframes at 2K, render at 1080p (1080 × 1920) with high bitrate. 4K costs more and looks the same on a phone.";
}

/** The exact settings to pick on Higgsfield for one clip. */
export function renderSettings(o: { model: string; resolution: string; aspectRatio: string; seconds: number; test?: boolean }): string {
  return [o.model, o.aspectRatio, o.resolution, `${o.seconds}s`, "audio off", o.test ? "standard bitrate" : "high bitrate", "start frame = keyframe"].filter(Boolean).join(" · ");
}

/**
 * One 4K image (Nano Banana Pro, generated on Higgsfield for this guide) that
 * the guide shows at 1K, 2K and 4K. Replace with any 4K image URL.
 */
export const EXAMPLE_IMAGE = {
  url: "https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20260927_001523_1af257e3-b16c-47c6-b7e5-c932252ecf6e.png",
  caption: "Skincare review keyframe, generated at 4K on Nano Banana Pro",
};
