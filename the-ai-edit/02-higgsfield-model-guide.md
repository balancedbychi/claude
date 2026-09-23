# Higgsfield Model Guide — Which Model, When, and What It Costs

*The AI Edit · Creator Reference Library · Checked September 23, 2026*

## How this guide was built (read before teaching from it)

- **Model list and settings** were pulled directly from the live Higgsfield catalog through the connected Higgsfield account (the same tools Claude uses through the Higgsfield connector). If it's listed here, it existed on the checked date with the inputs shown.
- **Credit costs** are *preflight quotes* from Higgsfield's own cost check at each model's default settings on the checked date. No credits were spent. Costs change with duration, resolution, quality, audio on/off, and plan — **always read the number on the Generate button** before you click.
- **"Best for" recommendations** combine Higgsfield's own model descriptions and tags with the roles each model plays. Quality judgments still need to be confirmed with your own side-by-side tests before you record a lesson. Label each one *Tested* or *Under Evaluation* in the member-facing version.
- Website Unlimited/free-generation allowances **do not** automatically cover generations started from Claude, ChatGPT, or the CLI (connected-agent route). Teach members to check which balance they are spending.

---

## 1. The one-page cheat sheet

| I want to… | Start with | Upgrade to when needed | Budget option |
| --- | --- | --- | --- |
| Make a realistic person / UGC / fashion portrait | **Soul 2.0** (~1 credit) | Nano Banana Pro (2) | Soul 2.0 at 1.5k |
| Keep *my own face* or one character the same across images | **Soul ID** (train once) + Soul 2.0 / Soul Cinema | Elements + Nano Banana Pro | — |
| Put two or more consistent characters in one image | **Elements** + Nano Banana Pro | GPT Image 2 with Elements | Nano Banana 2 |
| Get a cinematic film still / key frame | **Cinema Studio Image 2.5** (2) | Soul Cinema for a trained character | Nano Banana 2 |
| Edit an existing image ("change her jacket to red") | **Nano Banana 2** or **Seedream 5.0 Lite** | GPT Image 2.5 / Seedream 5.0 Pro | Flux Kontext |
| Put words, logos, or captions *inside* the image | **GPT Image 2.5** (0.25 at low) | OpenAI Hazel | Recraft V4.1 (vector) |
| Build an empty set / location | **Soul Location** | Cinema Studio Image 2.5 | Nano Banana 2 |
| Product shot / ad still | **Marketing Studio Image** | DTC Ads (brand kit) | Nano Banana 2 |
| General video with sound, strong identity from references | **Seedance 2.5** (35 / 5 s @ 720p) | Seedance 2.5 at 1080p | Seedance 2.0 (22.5) |
| Cheap motion tests before committing | **Kling 3.0 Turbo** (7.5 / 5 s) | Kling 3.0 (10) | Minimax Hailuo (6) |
| Multi-shot sequence in one generation | **Kling 3.0** | Cinema Studio Video 2 (multi-shot) | — |
| Movie-grade hero shot | **Cinema Studio Video 3.0** (25 / 5 s silent) | Veo 3.1 (32 / 8 s) | Veo 3.1 Lite (12 / 8 s) |
| Copy a dance or movement onto my character | **Genjutsu motion transfer** | Kling 3.0 | — |
| Swap a product/outfit/object in an existing video | **Genjutsu replace object** | Kling 3.0 Omni Edit | — |
| Edit or extend a video I already have | **Seedance 2.5** (video_edit / video_extension) | Kling 3.0 Omni Edit, Gemini Omni Flash 1.1 edit | FLUX 3 Video Edit (1 credit/sec) |
| Product ad / UGC-style ad video | **Marketing Studio Video** | Seedance 2.5 with product Elements | — |
| Narration / voiceover | **Seed Audio 1.0** (~0.5 per short line) | Text to Speech V2 (ElevenLabs engine) | Seed Audio |
| Make a character's mouth match a voice track | **Sync Lipsync 3** | Lipsync Studio (website) | — |
| Change the voice in a finished clip to *my* voice | **Voice Change** | — | — |
| Translate + lip-sync to another language | **Dubbing** (18 languages) | — | — |
| Make low-res output sharper | Topaz / Bytedance Upscale | — | — |

---

## 2. Image models

### Character and people

| Model | Maker | What it's best for | Consistency tools it accepts | Preflight cost (default) |
| --- | --- | --- | --- | --- |
| **Higgsfield Soul 2.0** | Higgsfield | Realistic UGC, fashion editorial, lifestyle portraits. The "looks like a real phone/editorial photo" model. | Soul ID (trained character) or 1 image reference | ~1 credit at 2k |
| **Soul Cinema** | Higgsfield | Cinema-grade stills, dramatic lighting, concept art; supports 21:9 widescreen. | Soul Cinema character ID | ~1 credit at 2k |
| **Soul Cast** | Higgsfield | Inventing a new, consistent cinematic character from text only (16:9). | Text only | Budget-based |
| **Nano Banana Pro** | Google | Highest-quality all-rounder: photoreal, good text and diagrams, up to 4K, many references. | Elements, multiple reference images | 2 credits at 2k |
| **Nano Banana 2** | Google | Fast, high-quality, and budget-friendly; supports masked inpainting (edit only one area). | Elements, references, mask | 1.5 credits at 1k |
| **Nano Banana 2 Lite / Nano Banana** | Google | Cheaper drafts and iterations. | References | Lower |
| **Kling O1 Image** | Kling | Versatile photoreal, wide aspect ratios. | References | — |

**Rule of thumb:** Soul for *people who should look real*, Nano Banana Pro for *complex scenes with several references or text*, Nano Banana 2 for *fast drafts and small edits*.

### Cinematic, sets, and locations

| Model | Best for | Notes |
| --- | --- | --- |
| **Cinema Studio Image 2.5** | Film-look stills and **start frames for video**, up to 4K, 21:9 | 2 credits at 1k. Accepts Elements. |
| **Soul Location** | Empty environments, backgrounds, sets | Text only. Ideal for Module 5 "empty-set reference". |
| **Seedream 4.5** | 4K–~6K output, precise control, transformations | Good for high-resolution set plates. |

### Editing, text, design

| Model | Best for | Notes |
| --- | --- | --- |
| **GPT Image 2.5** (OpenAI) | Higgsfield's *default general model*: typography, reference-based editing, transparent backgrounds, up to 4K | 0.25 credits at low quality/1k. Quality tiers go up to "max" and cost more. |
| **GPT Image 2** | Text rendering, editing, 4K | Older sibling; still available. |
| **OpenAI Hazel** | Best text rendering, logos, infographics | Use for thumbnails with words. |
| **Seedream 5.0 Lite / Pro** | "Visual reasoning" instruction-based edits ("make it evening, keep everything else") | Lite ≈ 1 credit. Pro adds 2K, inpaint, background removal. |
| **Flux Kontext** | Context-aware edits and style transfer | — |
| **FLUX.2 (pro/flex/max)** | Precise prompt adherence | FLUX.2 Pro Outpaint extends an image beyond its borders. |
| **Recraft V4.1** | Logos, icons, vector art, clean product mockups, brand palettes | Use for community branding, not characters. |
| **Grok Image / 2.0** (xAI) | Bold, expressive, high-contrast looks | Stylized, not for realism. |
| **Z Image** | Super-fast, stylized, very cheap (0.15) | Mood-board thumbnails. |
| **Auto** | Lets Higgsfield pick | Fine for beginners; teach members to see *which* model it picked. |

### Utilities
Background remover, Outpaint, **Topaz** (upscale and face enhancement), Bytedance Image Upscale, **AutoSprite** (turns a character into a game sprite sheet).

---

## 3. Video models

### The decision in plain language

1. **Is this a test?** Use Kling 3.0 Turbo or Minimax Hailuo at the shortest duration. Don't test on your most expensive model.
2. **Does the character need to look like the approved reference?** Use a model that accepts **Elements / reference images**: Seedance 2.0 / 2.5, Kling 3.0, Cinema Studio Video 2 / 3.0, Wan 3.0, MiniMax H3.
3. **Does it need dialogue in a specific voice?** See the Voice Playbook (file 03). Short answer: pick a model that accepts **audio references**, or add the voice afterward with Voice Change or Lipsync.
4. **Is it a hero shot for the final cut?** Then consider Cinema Studio Video 3.0, Veo 3.1, or Seedance 2.5 at 1080p.

### Full video table

| Model | Maker | Best for | Inputs it accepts | Length | Preflight cost (default) |
| --- | --- | --- | --- | --- | --- |
| **Seedance 2.5** | Bytedance | Higgsfield's *default general video model*. Text-to-video, **omni-reference** (images + video + audio), **video edit**, **video extension**, native audio | start/end frame, image refs, video refs, **audio refs** | 4–30 s | **35** (5 s, 720p, audio on) · **120** (10 s, 1080p) |
| **Seedance 2.0** | Bytedance | Reference-driven identity, products/multi-SKU, up to 4K | start/end, image/video/**audio** refs | 4–15 s | 22.5 (5 s, 720p) |
| **Seedance 1.5 Pro** | Bytedance | Reliable motion from a start/end frame | start/end | 4/8/12 s | — |
| **Kling 3.0** | Kling | **Multi-shot**, audio sync, motion transfer; std / pro / 4K modes | start/end | 3–15 s | **10** (5 s std) · 12.5 (pro) |
| **Kling 3.0 Turbo** | Kling | Fast, cheap tests; single start frame | start frame | 3–15 s | **7.5** (5 s) |
| **Kling 3.0 Omni Edit** | Kling | Edit an existing video with text + reference images | video + image refs | — | — |
| **Kling 2.6** | Kling | Cinematic motion, physics (older) | start frame | 5/10 s | — |
| **Cinema Studio Video 3.0** | Higgsfield | Most advanced cinema-grade model; genre control; up to 4K | image, start/end | 4–15 s | **25** (5 s, 720p, silent) |
| **Cinema Studio Video (v2)** | Higgsfield | Genre, speed-ramps, **multi-shot with per-shot prompts** | image, start/end | 3–12 s | — |
| **Veo 3.1** | Google | Ultra-realistic, top-tier cinematic quality with audio | start frame | 4/6/8 s | **32** (8 s, fast/basic) |
| **Veo 3.1 Lite** | Google | Budget batch clips | start/end | 4/6/8 s | **12** (8 s, silent) |
| **Veo 3** | Google | Reliable cinematic range | start frame | — | — |
| **Wan 3.0 / 3.0 Prime** | Wan | Text/first-last-frame/multi-reference with native audio; optional "thinking" for better prompt-following; "smart duration" | start/end, image/video/**audio** refs | 2–30 s | **8.75** (5 s) |
| **Wan 2.7** | Wan | Character-consistent video synced to an audio track | start/end, **audio** ref | 2–15 s | — |
| **Wan 2.6** | Wan | Stylized, experimental, artistic | image/video/audio refs | 5/10/15 s | — |
| **MiniMax H3** | MiniMax | 2K keyframes and mixed references | start/end, image/video/**audio** refs | 4–15 s | **10** (5 s, 2K) |
| **MiniMax H3 Max** | MiniMax | Fast version, up to 4 per batch | same | 5–15 s | — |
| **Minimax Hailuo 2.3** | Hailuo | Natural physics and **facial emotion**; cheap | start/end | 6/10 s | **6** (6 s) |
| **Gemini Omni Flash 1.1** | Google | Text, keyframe, reference, and **edit** modes with native audio, up to 4K | start/end, image/video refs | 3–10 s | 24 (8 s, 720p) |
| **Grok Video 1.5** | xAI | Multimodal from text, start image, **image + audio references** | start, image refs, **audio refs** | 2–15 s | 22.5 (5 s) |
| **FLUX 3 Video** | Black Forest Labs | Storyboard-style multi-frame, continuation, synced audio | start/end, image/video refs | 5–20 s | — |
| **FLUX 3 Video Edit** | Black Forest Labs | Text-prompted edit of a clip (first 15 s) | video | — | 1 credit / second |
| **Happy Horse Video** | Happy Horse | Text or single-frame animation | start frame | 3–15 s | — |
| **Marketing Studio Video** | Higgsfield | One-click product ads, TikTok/Reels ready, hooks, settings, avatars, "recreate this ad" | avatars, products, images | 12–15 s | Varies by mode |
| **Ad Multiplier** | Higgsfield (Seedance 2.5) | Many edited versions of one 4–30 s ad | video + refs | 4–30 s | — |
| **Genjutsu — motion transfer** | Higgsfield | Copy motion/dance/gestures from a driving video onto your character image | image refs + 1 video | — | Needs the video to quote |
| **Genjutsu — replace object** | Higgsfield | Swap a product, garment, or character inside a video | image refs + 1 video | — | — |
| **Clipify** | Higgsfield | Turn one YouTube video into subtitled short clips | YouTube URL | — | — |

**Finishing utilities:** Sync Lipsync 3 (talking), Video Upscale / Topaz / Bytedance Upscale, Video Deflicker, Video Background Remover.

### What the numbers teach members

- Seedance 2.5 at 1080p/10 s (120 credits) costs **16×** a Kling 3.0 Turbo 5 s test (7.5). *Test cheap, finish expensive.*
- Audio on or off changes price. Turn native audio **off** when you'll replace it with a voice track anyway.
- Resolution and duration are the biggest cost levers. Build 5-second shots and edit them together rather than asking for 30 seconds at once.

---

## 4. Voice and audio models

| Model | What it does | Takes your cloned voice? | Preflight cost |
| --- | --- | --- | --- |
| **Seed Audio 1.0** (ByteDance) | Default text-to-speech; speed, loudness, pitch controls; can clone from an audio reference | ✅ (voice element or audio reference) | ~0.5 per short line |
| **Text to Speech V2** | Same job, but you choose the engine: **ElevenLabs, MiniMax, Seed Speech, Vibe Voice, Cozy Voice** | ✅ | — |
| **Qwen Audio 3.0 TTS Flash** | Expressive delivery via plain-language instructions ("whispered, excited, Southern accent"), 13 languages, up to 4 variations | ✅ | — |
| **Create Voice** | Record or upload a sample → a reusable voice in your workspace | *Creates it* | — |
| **Voice Change** | Replaces the voice in a video, keeping timing and visuals | ✅ | — |
| **Dubbing** | Translate, re-voice, and lip-sync into 18 languages | Uses the translated voice | — |
| **Sync Lipsync 3** | Makes a video's mouth match a supplied audio file | Uses any audio you give it | — |

**Not available for general use:** music and sound-effect generation (those models exist only inside Higgsfield's game pipeline). Teach members to source music from a licensed library or the platform's sound library (e.g., TikTok trending sounds through Higgsfield's TikTok tools).

---

## 5. Consistency tools: Soul ID vs Elements

This is the single most important concept for the character modules.

| | **Soul ID (trained character)** | **Elements (reference elements)** |
| --- | --- | --- |
| What you give it | 5–20 photos of **one** person | 1+ image of a character, place, or prop |
| Setup time | ~10 minutes of training | Instant |
| Works with | Soul 2.0 and Soul Cinema **only** | Nano Banana Pro / 2, GPT Image 2, Seedream 4.5 / 5 Lite, Cinema Studio Image 2.5, Cinema Studio Video 2 / 3.0, Seedance 2.0, Kling 3.0 (confirm newer models such as Seedance 2.5 in the app) |
| Characters per shot | One | Several (e.g., "A hands coffee to B") |
| Carries a voice? | **No** | **No** |
| Best for | Your AI twin; a single recurring influencer | Casts, sets, props, products, and **video** |

**Teach it like this:** Soul ID = the photo studio for one face. Elements = the asset library you carry into every other model, including video. Neither one carries a voice. The voice is its own asset (see file 03).
