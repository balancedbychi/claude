# bot + bow ai: build specification

Hand this whole file to an AI coding assistant (ChatGPT, Codex or similar) as the brief. It describes the finished app exactly as it exists in this repository, so a rebuild can be checked against the original.

**How to use it with ChatGPT.** Paste the file in one go, then work through the build order (section 15) one phase at a time: "Build phase 1 from the spec, then stop and show me." Check each phase against its acceptance tests before moving on. If the assistant can read GitHub, point it at this repository first: extending working code is faster and safer than rebuilding it.

---

## 1. What the app is

A members-only web app, sold through a Stan Store product, that acts as an AI content team for faceless creators on TikTok, Instagram Reels and YouTube. The member types one plain-language request ("a 30-second honest review UGC ad for my serum starring Zara"). A team of job-named bots plans it, writes it, storyboards it shot by shot, and hands back:

- a timed script with alternative hooks,
- for every shot, an image prompt (the keyframe) and a video prompt (the animation), written for Higgsfield (Seedance 2.5, Nano Banana Pro and others),
- a credit and time estimate for generating it on Higgsfield, with a "run a cheap test clip first?" prompt,
- an edit guide (clip order, captions .srt, voiceover script), titles, caption, hashtags and a thumbnail idea.

Members keep a library (AI characters, sets/rooms, products) that is pasted word for word into every prompt so faces, rooms and labels stay consistent. Members log how their posts performed; winning hooks are approved by the admin and fed back into the AI's instructions.

The app writes prompts. It does not call Higgsfield itself (see section 14 for that future phase).

## 2. Tech stack

- **Next.js** (App Router) with TypeScript and React. Route protection in a `proxy.ts` (called middleware in older Next versions).
- **Claude API** through the official `@anthropic-ai/sdk`, model `claude-opus-5` (overridable with a `CLAUDE_MODEL` env var). Structured outputs validated with **Zod**. Adaptive thinking, `output_config.effort` per task, and server-side refusal fallbacks (`betas: ["server-side-fallback-2026-07-01"]`, `fallbacks: "default"`). All AI calls run on the server; the API key never reaches the browser.
- **Supabase Auth** (email + password, magic link) via `@supabase/ssr`.
- **Postgres** (Supabase) via the `postgres` npm driver, server-side only, every query scoped to the signed-in user. Row-level security enabled with no policies, so the public Supabase API can't read the tables.
- **Hosting:** Vercel.
- **Icons:** lucide-react. **Tests:** Node's built-in test runner for pure logic, Playwright for end-to-end.

### Environment variables

| Name | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key (server only, never `NEXT_PUBLIC_`) |
| `CLAUDE_MODEL` | optional model override |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Auth |
| `DATABASE_URL` | pooled Postgres connection string |
| `MEMBER_ACCESS_CODES` | comma-separated codes that unlock membership (put one in the Stan Store delivery email) |
| `PERFORMANCE_ACCESS_CODES` | codes that unlock the Performance Pack (and membership) |
| `ADMIN_EMAILS` | emails with full access and the Admin dashboard |
| `ACCESS_SECRET` | long random string for signing cookies |

Development convenience: when Supabase isn't configured and the app is not in production, allow a dev-only sign-in (any email, HMAC-signed cookie). Refuse it in production.

## 3. Accounts and membership

1. Sign up / sign in with Supabase (email + password or emailed link). Callback route `/auth/callback`.
2. After sign-in, a member without membership lands on `/welcome` and enters an access code. A valid `MEMBER_ACCESS_CODES` entry sets `is_member`; a `PERFORMANCE_ACCESS_CODES` entry sets both `is_member` and `has_performance`.
3. `ADMIN_EMAILS` accounts are always members, have the Performance Pack, and see Admin.
4. Every API route is wrapped in a `withMember(handler, { admin?, performance? })` guard: 401 if signed out, 403 if not a member or not an admin where required.
5. Public paths (no sign-in): `/login`, `/auth/*`, `/api/auth/*`, `/brand/*`.

## 4. Data model (Postgres)

```sql
profiles  (user_id text pk, email, is_member bool, has_performance bool, share_winners bool default true, created_at)
studios   (user_id pk → profiles, bible jsonb, characters jsonb, locations jsonb, products jsonb, updated_at)
projects  (id text pk, user_id → profiles, kind text, title text, hook_style text, data jsonb, created_at, updated_at)
posts     (id uuid pk, user_id, project_id → projects null, platform in ('tiktok','instagram','youtube'), url, hook_used, posted_on date, unique(user_id,url))
checkins  (id uuid pk, post_id → posts, user_id, recorded_on date, views, likes, comments, shares, saves, follows, sales, source in ('self','api'), unique(post_id, recorded_on))
winners   (id uuid pk, post_id unique → posts, user_id, kind, niche, hook_style, hook, excerpt, score real, views int,
           status in ('candidate','approved','rejected'), admin_note, reviewed_at, created_at)
app_settings (key text pk, value jsonb, updated_at)   -- holds the Higgsfield price list under key 'pricing'
```

Enable row-level security on every table with no policies. The server connects with `DATABASE_URL` and adds `where user_id = <signed-in user>` to every query. On first sign-in, import any work saved in the browser (`localStorage`) by older versions, once.

### Core types (TypeScript)

```ts
Character { id, name, role, age, look, wardrobe, voice, personality }
Location  { id, setName, name, details, lighting }          // one room of a set, e.g. "Hills House" → "Kitchen"
Product   { id, name, brand, category, packaging, benefits, usage }
SeriesBible { seriesName, niche, visualStyle, setting, aspectRatio: "9:16"|"16:9"|"1:1", imageModel?, videoModel? }
ToolKind = "episode" | "ugc" | "commercial" | "transition"
Brief { productId, characterId, locationId, angle, lengthSeconds, items, message, cta, notes }
Concept { title, logline, hook, hookStyle, whyItWorks }
Scene { number, title, location, durationSeconds, characterIds, locationId, action, onScreenText, lines: {speaker,text}[] }
Script { title, totalSeconds, hookStyle, altHooks: string[], scenes: Scene[] }
Shot {
  number, durationSeconds, characterIds, productIds,
  action, camera, cameraMove, mood, lighting, transition,
  startFrame, endFrame, continueFromPrevious,
  performance: string[], choreography: string[], mechanics: string[], priorities: string[], wardrobe: string[],
  imagePrompt, animationPrompt,                 // assembled by the app, not by the AI (section 8)
  fixes?: FixId[], fixNote?: string              // regeneration corrections
}
SceneShots { sceneNumber, shots: Shot[] }
PackageInfo { titles[], description, hashtags[], thumbnail: { concept, textOverlay, prompt } }
Episode (a project) { id, kind, createdAt, brief|null, topic, concept|null, script|null, shots: SceneShots[], pkg|null, testChoice?: "test"|"full"|"passed" }
```

Client state: one provider holds the library and projects for the whole signed-in area and saves changes back 600 ms after the last edit (debounced per item), flushing immediately on page hide or navigation so nothing is lost.

## 5. Pages

Sidebar: **Ask the team** (home) · *do it yourself:* Episode Builder, UGC Ad Builder, Commercial Builder, Try-On Transitions, Prompt Vault · *your library:* Cast Studio, Set Designer, Products, Projects, Results, Model Guide · *owner:* Admin. Mobile: a bottom tab bar (Team, Episodes, UGC, Cast, Projects).

| Page | What it does |
|---|---|
| **Home** `/` | "one ask. a whole content team." A text box ("send to the team"), suggestion chips built from the member's library, a live team feed while it works, the team list with each bot's status, "pick up where you left off" (recent projects with "let the team finish it"), and "or do it yourself" tool cards. |
| **Builders** `/builder`, `/ugc`, `/commercial`, `/transitions` | One shared 4-step builder. Episode: Story (pitch ideas → pick one) → Script → Storyboard → Edit & post. The ad tools start with a Brief (product, character, set, format/style, length, items, message, call to action) instead of Story. Every step has "let the team finish it ✨". `?id=` opens a project, `?new=1` starts one, `&step=storyboard` jumps to the storyboard. |
| **Prompt Vault** `/vault` | ~38 proven image/animation/camera/look prompts, searchable by category, filled with the member's own cast and products, each with its credit cost. |
| **Cast Studio** `/cast` | AI characters: design one with AI from a short description, or fill the fields from an uploaded photo (with a "I have the rights to this photo" checkbox). Shows the reference-sheet prompt and its image cost. Also holds the series settings (name, niche, visual style, setting, aspect ratio). |
| **Set Designer** `/sets` | Describe a place ("a luxury Hills home") and the AI designs it room by room with fixed materials, furniture and light; or read a room from a photo. Each room has a reference-image prompt. |
| **Products** `/products` | Product shelf (name, brand, category, packaging, benefits, usage), fill from a photo, packshot prompt. |
| **Projects** `/projects` | Every project with progress and "let the team finish it". |
| **Results** `/results` | Log posted videos (platform, URL, linked project, hook used) and weekly numbers; see each post's score vs the member's typical views; toggle "share my winners" (anonymous). |
| **Model Guide** `/models` | Section 12. |
| **Admin** `/admin` | Totals; AI connection test; winners review queue (approve / reject / back to review, with a note); results by tool and hook style; the Higgsfield price list editor. |

## 6. The team (bots)

Each bot has a job name, a colour and a simple black bot avatar with a bow. Plain job names, never cute names:

| id | Name | Handles |
|---|---|---|
| manager | team manager | plans every ask |
| hooks | hook finder | ideas & hooks |
| writer | script writer | scripts & ad copy |
| director | storyboard director | shots & prompts |
| ads | ad maker | UGC, ads & commercials |
| casting | casting agent | your AI characters |
| sets | set designer | homes & locations |
| stats | stats tracker | results & winners |

### The one-ask pipeline (runs in the browser, calls the API step by step)

1. **Plan** (`/api/plan`): the manager reads the ask plus short labels of the library and returns `{ kind, reply, topic, targetMinutes, brief|null }`, picking the tool, cast, product and set. It creates the project.
2. **Ideas** (episodes only, `/api/concepts`): pitch several concepts, strongest first; take the first.
3. **Script** (`/api/script` for episodes, `/api/beats` for ads): the full timed script or ad beats, with alternative hooks.
4. **Rough cost:** before storyboarding, the director posts an upper-bound estimate ("about 6 clips, ≈ 372 credits · ~28 min").
5. **Storyboard** (`/api/shots`, one call per scene, 3 at a time): shots with image and video prompts. Progress updates in the feed.
6. **Package** (`/api/package`): titles, caption with hashtags (always #ad for ads, and disclose AI), thumbnail.
7. **Report:** "all done ✨", then a credit and time report, the best-output tip for the aspect ratio, a hallucination warning, and the question *"want to run a test clip first to save credits?"* with **yes, test first** / **skip, go full quality** buttons.

Each step reports in the feed as "working…" then "done". Everything finished so far is saved as it goes; on an error the feed marks who got stuck and offers "try again from here", which resumes from the first missing step. A run survives moving between pages (a floating dock shows progress on every page except Home) but not a full reload.

## 7. Claude calls

One helper: `generate({ system, prompt, image?, schema, effort, maxTokens })` → validated object. It fails early with a clear message if the key is missing, maps SDK errors (rate limit, auth, API) to friendly messages, and treats `stop_reason` `refusal` and `max_tokens` as errors.

System prompt = `BASE` + the playbook sections for the task and tool + community insights (section 10):

| Task | Sections |
|---|---|
| concepts | HOOKS, STORY, CHARACTERS |
| script | HOOKS, RETENTION, STORY |
| beats | HOOKS, RETENTION + tool craft |
| shots | RETENTION (+ tool craft for ads) |
| package | HOOKS, PACKAGING |
| sets | (base only) |
| character | CHARACTERS |

Tool craft: UGC → ADS + UGC; commercial → ADS + COMMERCIAL; transition → TRANSITIONS; episode → STORY.

**Playbook content (copy these rules into the prompts):**
- BASE: "You are the creative team behind a studio for faceless AI content on TikTok, Instagram Reels and YouTube Shorts: a head writer, a performance-ad strategist and a director in one. Everything you write will be performed by AI-generated characters and rendered by AI image and video models, so every moment must be concretely visual and physically plausible. Never imitate real, identifiable people, existing copyrighted characters or real brands the member hasn't supplied. Keep content platform-safe."
- HOOKS: lead with the most interesting thing, no greetings; visual + spoken line + on-screen text hit together; under 12 spoken words; specific beats generic; open a loop; never promise what the video doesn't pay off. Fixed hook-style taxonomy (the AI must tag each script with one): Curiosity gap, Bold claim, Contrarian, Result first, Callout, Question, In the action, Confession, POV / stakes, Number list, Visual interrupt, Relatable pain.
- RETENTION: something changes every 2–3 s in shorts (a turn every 20–30 s in long videos); open the next loop before closing the current; cut dead air; end on a loop, cliffhanger or call to action.
- STORY: each series has an engine; one dramatic question in the first 3 s; escalate with a reversal mid-way; characters want something and have a flaw; plant a comment-bait moment; end on a cliffhanger; drama that performs (betrayal, secret identity, revenge glow-up, class contrast, hidden wealth, family secrets).
- CHARACTERS: recognisable from a thumbnail (silhouette, signature item, palette); concrete, reproducible appearance details; a want, a flaw, a way of speaking; relatable and aspirational.
- ADS: product within 3 s; show before tell; talk about the viewer's problem; handle one objection; only claims supplied with the product (no medical, weight-loss, income or guaranteed claims, no fake reviews); one clear call to action; several hook variants.
- UGC: feels phone-filmed by a real person; casual first person with one honest caveat; phone-style visual variety.
- COMMERCIAL: one idea, one feeling; product as hero with satisfying macro moments; sparse copy; end card with brand and tagline.
- TRANSITIONS: the payoff is first-frame vs last-frame contrast; match cuts need identical position and framing; change one thing at a time; retention moment mid-way; confident final pose; for one-take transitions (fan, door, hand swipe, spin) the moving object is a physical mask: old look ahead of it, change hidden under it, new look behind it; the character keeps performing the whole time.
- PACKAGING: titles are hooks under 70 characters; the caption's first line is a second hook; 1–2 broad hashtags, the rest niche; always disclose #ad and AI generation.

**Tools config** (per kind): label, steps, angle options, lengths, whether a product is required, direction for the beats and for the shots:
- UGC formats: Honest review, Get ready with me, Problem → solution, Unboxing / first impressions, Routine, Before & after, 3 reasons why, Storytime testimonial. Lengths 15/30/45/60 s. Beats: Hook → Problem → Product intro → Demo → Result → Call to action; casual voice-note dialogue; 2–6 word on-screen text per beat. Shots: handheld front-camera look, window light, real home, product label facing camera.
- Commercial styles: Luxury cinematic, Warm & emotional, Clean minimal, Playful & colourful, Bold sport / energy, Editorial fashion. Structure: arresting image → lifestyle moment → product hero moments → payoff → end card. Shots: controlled soft light, shallow focus, slow dolly/orbit/crane, macro product shots.
- Try-on transformations: Outfit try-on, Full glam makeup, Lip combo, Hair transformation, Accessories styling, Morning-to-night look. Lengths 15/20/30 s. One beat per item, 1–2 s each, continuity of everything already applied. Shots: locked-off camera for match cuts; `continueFromPrevious` true when the angle doesn't change.
- Episodes: 1–5 minute scripts (default 4½), 8 s max clips.

**Storyboard rules** sent with every `/api/shots` call: shots ≤ max clip length and adding up to the scene length; `startFrame` = the keyframe written as precise pose and placement (body position, where in the frame, relative to named set objects, what each hand holds, gaze, product label direction); `action`; `camera` (framing only); `cameraMove`; `mood`, `lighting`; `endFrame`, with each shot's start picking up the previous end; `continueFromPrevious`; `transition`; plus the fields that make the prompt format adapt to the ask:
- `performance`: 3–8 cues for expression and micro-movement ("strong direct eye contact", "knowing smirk").
- `choreography`: 2–7 ordered, physically explicit beats, cause before effect ("her thumb visibly presses the button", "ONLY THEN the fan starts").
- `mechanics`: rules for anything else that moves: screen-space direction ("clockwise: top → right, right → down…"), fixed pivots, triggers, and for wipes what's ahead of / under / behind the wiping object. Empty if nothing else moves.
- `wardrobe`: every complete outfit in order when it changes during the clip, garment by garment. Empty otherwise.
- `priorities`: 2–6 shot-specific must-haves in capitals.

The AI never describes a character's look, a room or a product: it refers to ids, and the app pastes the saved descriptions in (section 8). Invalid ids are dropped server-side.

## 8. Prompt formats (the app assembles these; they are the heart of the product)

### Image prompt (keyframe), in this order

1. "Create a highly realistic {vertical 9:16 | horizontal 16:9 | square 1:1} {smartphone photo (UGC and try-ons) | cinematic film still (episodes and commercials)}, {camera}."
2. "Scene: {startFrame}."
3. **References:** "@Image 1 = CHARACTER IDENTITY MASTER (Zara); @Image 2 = ENVIRONMENT MASTER; @Image 3 = EXACT PRODUCT (Glow Drops); @Image 4 = EXACT COMPLETE OUTFIT. Do not allow one reference to override another." Order: characters, set, products, first outfit.
4. The environment reference is the permanent spatial and background anchor, reproduced without redesigning, replacing, rearranging or restyling.
5. Per character: "Recreate {name} from the uploaded character reference image ({name}, {age}; {look}). Preserve their facial structure, skin tone and undertones, eye color, eyebrow shape, nose structure, lips, facial proportions, distinguishing features, hairline, and overall identity accurately. Preserve realistic human skin with visible pores, subtle tonal variation, fine texture, natural highlights, and small imperfections. Do not beautify, reshape, age, de-age, or otherwise reinterpret their appearance." Then a hair line, then an outfit line: "Preserve every garment, color, fabric, fit, print, and accessory exactly… Do not carry wardrobe details from any previous generation. Do not invent additional accessories or substitute visually similar pieces."
6. Per product: its saved packaging verbatim; exact shape, colours, cap and label layout; every word sharp, spelled right and unwarped.
7. "Pose and placement: {startFrame}. Keep every person and object exactly where described relative to the frame edges and the room." Then "Expression and energy: {performance}".
8. Anatomy: believable anatomy; avoid exaggerated curves, elongated limbs, distorted hands or feet, impossible garment fit, artificial smoothing.
9. Framing, filling the frame edge to edge.
10. "Environment (locked, match reference exactly): {set}, {room}: {details}. … never rotate, curve, relocate, resize, recolor, or redesign any of them, and do not add furniture, decor or props that are not in the reference." (Or "World: {setting}" when there's no saved set.)
11. Lighting from real sources interacting with materials, with contact shadows. Mood.
12. Consistency across repeated generations.
13. Look: UGC/try-on → "premium modern iPhone creator content rather than cinematic. Crisp, true-to-life color…"; otherwise the series visual style.
14. "Avoid: …" (film grain and cinematic grading for the phone look, plus beauty filters, artificial HDR, waxy skin, oversharpening, distorted anatomy, malformed fingers, duplicated accessories, warped clothing, misspelled labels, floating objects, inconsistent shadows, altered geometry, text overlays, watermarks, obvious AI artifacts).
15. Correction lines from Regenerate, if any.
16. Closing: "The finished image should feel like a real {iPhone photo | frame from a professionally shot film} captured in this exact {room}, with {names} looking exactly like themselves."

### Video prompt (animation), sectioned, written for Seedance 2.5 on Higgsfield

Each section is headed with a line of `=` signs, its title in capitals, and another line of `=` signs.

- **REFERENCE HIERARCHY:** `@Image N = CHARACTER IDENTITY MASTER ({name})` for each character, then `MASTER STARTING FRAME / SCENE REFERENCE` (the approved keyframe, or the previous clip's last frame), then `EXACT PRODUCT`, then `EXACT COMPLETE OUTFIT k` for each outfit when outfits change. Then "REFERENCE AUTHORITY:" with what each controls ("@Image 1 controls WHO ZARA IS", "@Image 2 controls WHERE THE SCENE IS + COMPOSITION + LIGHTING"), and "Do not allow one reference category to override another."
- **IDENTITY** (one per character): sole identity authority; same face, facial structure, skin tone, eyes, nose, lips, jawline, hair, body proportions in every frame; use all views of the sheet; ignore the sheet's studio background, poses (and outfit, when outfits change); "Changing outfits must NEVER change the face or body."
- **SCENE + CAMERA:** start from the starting frame; preserve its exact composition; the set's fixed features with "never rotate, relocate, resize, recolor or redesign"; framing; one continuous shot. Static camera → "Camera completely locked. NO camera movement. NO zoom. NO reframing. NO cuts. NO angle changes." Otherwise "Camera: {move}, smooth and motivated. No cuts."
- **EXACT WARDROBE REPRODUCTION — CRITICAL** (only when outfits change): outfit references are literal blueprints, not inspiration; list of garment attributes to preserve; DO NOT redesign, simplify, substitute, recolor, omit, invent or mix; each reference is one complete, closed wardrobe state; then "OUTFIT k — @Image n: {description}. Reproduce literally." Otherwise a short **WARDROBE** section: stays exactly as in the starting frame.
- **PRODUCT:** exact product with saved packaging; label never warps, melts or rewrites itself.
- **PERFORMANCE:** the shot's performance cues, then "NEVER stiff. NEVER mannequin-like…" and "LOCK THE LOCATION, NOT THE PERFORMANCE."
- **CHOREOGRAPHY:** numbered beats, then "Ends on: {endFrame}."
- **PHYSICS + MECHANICS — CRITICAL** (only if the shot has mechanics).
- **CONTINUITY:** identity, scene, wardrobe, product, camera and lighting lines; physically plausible motion, fabric and hair respond, five fingers.
- **AVOID:** face morphing, identity drift, flicker, warping text, extra limbs, objects appearing or vanishing, sliding feet, rubbery motion, sudden lighting changes (+ cinematic grading and grain for phone looks).
- **ABSOLUTE PRIORITY ORDER:** numbered, starting "EXACT SAME PERSON FROM @Image 1", then the shot's priorities, the wardrobe blueprint rule, the product rule, "CAMERA + ROOM + LIGHTING REMAIN CONSISTENT".
- Correction lines from Regenerate, if any.
- **FINAL RESULT:** "Create one seamless {n}-second {format} {creator-style | cinematic} shot. It opens on … {beats} … It ends on … Throughout, {names} remain exactly recognizable and the camera, room and lighting stay perfectly consistent."

Each shot card also shows **"Upload for the video, in this order"** (the @Image list with what to upload) and **Render settings** ("Seedance 2.5 · 9:16 · 1080p · 8s · audio off · high bitrate · start frame = keyframe").

### Reference-sheet prompts (library)

- Character sheet: front, three-quarter, profile, full body and face close-up of the same person on light grey, identity-preservation wording, the outfit identical in every view, neutral pose, avoid list, closing sentence.
- Set: an empty, wide, eye-level establishing photo of the room with every fixed element visible, real light sources, contact shadows, "permanent spatial anchor", no people.
- Product packshot: front-facing, seamless background, label legible and spelled right, the brand's own photo feel.

## 9. Regenerate and hallucination warnings

- A taped note on the storyboard and Edit & post pages: "AI can hallucinate. Faces can drift, hands grow extra fingers, labels misspell and rooms rearrange. Check every image and clip against your references, and regenerate anything that's off."
- Every shot has **Regenerate**: tick what was off (face or identity changed, hands or fingers distorted, body or pose looks wrong, outfit changed, product or label wrong, room or props changed, looks fake or plastic, motion is glitchy) plus a free-text note.
  - **Add fixes to the prompt** (no AI call): rebuild the shot's prompts with a "Corrections for this regeneration (the last attempt got these wrong): …" line. Each fix has an image sentence and an animation sentence; motion only affects the video prompt.
  - **New take from the director:** calls `/api/shots` with `redo: { shotNumber, note, shots }`. The AI returns one replacement shot that still joins the shots either side and keeps the same duration; ticked fixes carry over.
  - Shows the credit cost of a retry.
- Each scene also has **Redo** (whole scene), and the script and package steps can be regenerated.

## 10. Results, winners and the feedback loop

- Members log posts and weekly check-ins. Score = views ÷ the member's median views (needs 3+ posts). Engagement = (likes + 2·comments + 3·shares + 3·saves) ÷ views.
- A studio-linked post at **≥ 2× typical views and ≥ 1,000 views** becomes a winner **candidate** (only if the member shares winners). The winner row snapshots the hook, hook style, niche, tool and the opening beats.
- The admin approves or rejects. **Insights** (cached 10 minutes, cleared on approval) are appended to the system prompt for concepts, script, beats and package: approved hooks and openings for that tool, plus hook-style results once a style has 5+ scored posts ("Relatable pain wins 3× more often than Question for UGC").

## 11. Credits and time (no dollars)

Members all have Higgsfield plans, so everything is shown in **Higgsfield credits and minutes**, always labelled as an estimate ("Higgsfield shows the exact credits on its Generate button").

Price list (stored in `app_settings`, editable in Admin; defaults from Higgsfield's own cost check, September 2026, 9:16, audio off):

| Model | Resolution | Credits |
|---|---|---|
| Nano Banana Pro | 1K / 2K / 4K | 2 / 2 / 4 per image |
| Soul 2.0, Soul Cinema | 2K | ~0.12 per image |
| GPT Image 2 | 2K medium / 4K high | 2 / 11 per image |
| GPT Image 2.5 Sunburst (high) / Flare | 2K | 2.75 / 1 per image |
| Seedream 5.0 Pro / Flash | 2K | 2.5 / 0.5 per image |
| Nano Banana 2 / 2 Lite | 1K–4K / 1K | 1.5–3 / 1 per image |
| Recraft V4.1 | 2K | 8 per image |
| Grok Imagine 2.0 | 2K | 2.5 per image |
| FLUX.2 Pro | 2K | 1.5 per image |
| Z-Image | 1K | 0.15 per image |
| **Seedance 2.5** | 480p / 720p / 1080p | **3 / 7 / 12 per second** (min 4 s) |
| Kling 3.0 Standard / Pro / 4K; Turbo 1080p | | 1.5 / 1.75 / 6; 2 per second |
| Seedance 2.0 | 1080p / 4K | 9 / 22 per second |
| Gemini Omni Flash 1.1 | 1080p / 4K | 4.5 / 9 per second |
| Cinema Studio 3.0 | 1080p | 10 per second |
| Veo 3.1 (high) | | ~10 per second |
| FLUX.3 Video | 1080p | 9 per second |
| MiniMax H3 | 2K | 2 per second |
| Wan 3.0 | 1080p | 3.5 per second |
| Grok Imagine 1.5 | 1080p | 8 per second |

Each row also has a typical wait time and a source (Higgsfield cost check, published, or estimate). Defaults: image Nano Banana Pro 2K, video Seedance 2.5 1080p, test clip Seedance 2.5 480p; budget 2 tries per shot.

Maths: a shot = one keyframe image (skipped when it continues from the last frame) + video credits/sec × max(min seconds, duration). Project = sum of shots. Budget = project × tries. Rough pre-storyboard estimate = each scene split into clips of the max clip length, each with a keyframe.

Shown on: every shot card, the storyboard summary (with the member's image/video model pickers), Edit & post, character/set/product reference prompts, Vault prompts, and the team's messages.

### Test first

As soon as a storyboard exists, ask **"save credits: test first?"** (in the team feed and at the top of the storyboard). Pick the riskiest shot (most people, products, mechanics and outfit changes, then longest) and offer it on the test settings: 480p, 5 s, audio off (~15 credits on Seedance 2.5), against the full render estimate. On yes, show the test settings and a checklist (same face as the sheet, five fingers, label spelled right, motion and transitions in the right order) and a **Test looks good** button. Store the choice on the project.

## 12. Model Guide page

- **Best output for a crisp look:** TikTok / Reels / Shorts → 9:16 at 1080 × 1920 (1080p); 4K costs more and looks the same on phones; keyframes at 2K. YouTube → 16:9, 1080p minimum; upscale the finished edit to 4K with Topaz for the best quality. Thumbnails ≥ 1280 × 720, generated at 2K–4K.
- **What resolution looks like:** one 4K example image shown at 1K, 2K and 4K. The browser downscales the 4K original to each size, then zooms the same spot to the same on-screen size so the loss of detail is visible; tap the small picture to choose the spot. Load the 4K file only when the member taps "Show the comparison".
- **Video best practice:** test first at 480p; always image-to-video from an approved keyframe; tag references in the prompt's order and reuse them within a scene; match the aspect ratio to the platform; one clear action per clip; audio off unless someone speaks; finals at 1080p high bitrate, export at 30 fps without re-compressing. A table of 480p / 720p / 1080p / 4K pixel sizes in 9:16 and 16:9 and what each is for.
- **I want to…** picks: UGC ad with my AI creator; outfit try-on transition; cinematic episode scene; luxury product commercial; copy a trending move; cheap test before the real thing (image model + video model + why).
- **Every model:** cards for the image and video models above with tagline, best for, output sizes, clip length, speed, the price-list rows for that model, and any caveat.

## 13. Design

- Crumpled white paper background texture across the app; modern and clean on top.
- Type: Plus Jakarta Sans for headings and body, Fredoka for the wordmark, Patrick Hand for handwritten notes. Lowercase, friendly microcopy ("one ask. a whole content team.").
- Colours: ink `#16131b`, pink `#f6a9c5` / deep `#e0648f` / soft `#fde6ef`, lilac `#cbb8ee` / deep `#8a6fd3` / soft `#efe8fb`, white cards.
- Sticker style: 1.5 px ink outlines with offset hard shadows (`3px 3px 0` ink or pink) on buttons and key panels; pill buttons; taped paper notes slightly rotated.
- The member's logo (bot with a bow) in the sidebar and login; black bot avatars for each team member.
- Gentle motion (cards rise in, pop on select, a floating bot, striped progress bar while working, a sparkle on "done"), all turned off under `prefers-reduced-motion`.
- Works at phone width with no horizontal scroll.

## 14. ChatGPT and Higgsfield: what's possible

- **Writing Higgsfield prompts:** yes. Any strong model can write prompts in these formats. The value of this app is that it does it consistently, with the library pasted in word for word and the formats enforced by code rather than left to the model.
- **Generating scenes inside the app:** only by calling Higgsfield's API from the server with a Higgsfield API key, then storing the results (for example in Supabase Storage) and charging for the credits used. That is a separate build: per-member credit handling, job polling, storage, and failure/refund handling.
- **Generating from inside ChatGPT:** only if ChatGPT is connected to Higgsfield through a connector (MCP) that ChatGPT supports. Without a connector, ChatGPT writes prompts and the member pastes them into Higgsfield.

## 15. Build order and acceptance tests

Build and test in this order. Don't move on until each phase passes.

1. **Skeleton and design system:** Next.js app, layout, sidebar and tab bar, the paper background, fonts, buttons, cards, notes. *Test:* every page loads with no horizontal scroll at 390 px wide.
2. **Auth and membership:** Supabase sign-in, `/welcome` code redemption, admin emails, `withMember` guard, public paths. *Test:* signed-out users are sent to `/login`; a non-member gets 403 from any API route; a valid code unlocks the app; member A can't read member B's projects.
3. **Database and saving:** the schema with RLS; the studio provider with debounced, flush-on-leave saving. *Test:* edit a character and reload within half a second; the edit is still there.
4. **Library pages:** Cast Studio, Set Designer, Products, with AI design and photo fill. *Test:* each item shows its reference prompt with the library text word for word.
5. **Prompt builder** as pure functions with unit tests. *Test:* the image prompt starts with "Create a highly realistic vertical 9:16…", includes the tagged references, the character's look verbatim, "never rotate, curve, relocate, resize, recolor, or redesign" when a set exists, and ends with the closing sentence. The video prompt has every section heading, the locked-camera lines for a static camera, the wardrobe blueprint section only when outfits change, and "1. EXACT SAME PERSON FROM @Image 1".
6. **Claude helper and step routes:** plan, concepts, script, beats, shots (incl. redo), package, sets, describe, character. *Test:* with the API key unset, every route returns a clear "the AI isn't configured" message rather than crashing; with it set, each returns schema-valid JSON.
7. **Builders:** the 4-step builder for all four tools, storyboard with prompts, copy buttons, Regenerate panel, Edit & post (timeline, .srt, voiceover, Markdown export). *Test:* build a 30 s UGC ad by hand end to end; every shot's `startFrame` picks up the previous `endFrame`.
8. **Team:** Home ask box, pipeline, feed, dock, resume after error, test-first buttons. *Test:* one ask produces a finished project; navigating away mid-run keeps it running; forcing an error then "try again" finishes from where it stopped.
9. **Credits:** price list, estimates everywhere, admin editor, test-first card. *Test:* an 8 s shot on Nano Banana Pro 2K + Seedance 2.5 1080p shows ≈ 98 credits; no "$" appears anywhere in the app.
10. **Results, winners, insights, Admin.** *Test:* a post at 2× typical views and 1,000+ views appears in the admin queue; approving it adds its hook to the next script request's system prompt.
11. **Model Guide.** *Test:* the 1K/2K/4K comparison renders and the zoom follows a tap.
12. **Deploy:** Vercel with all environment variables; run Admin → Test the AI connection.

Always: the Claude key stays on the server; never commit `.env.local`; every AI output is validated before use; content rules (no real people, no unsupplied brands, no unsupported claims, #ad and AI disclosure) are in the prompts.
