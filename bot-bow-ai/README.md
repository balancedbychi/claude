# bot + bow ai

**bot + bow ai** is a members-only AI content team for faceless creators. Tell the team what you want in one sentence ("a 30-second problem-solution ad for Glow Drops with Zara"), and the **team manager** bot turns it into a plan and hands it to the team:

| Bot | Job |
|---|---|
| team manager | Reads your ask, picks the tool and the cast, product and set from your library |
| hook finder | Pitches episode ideas with scroll-stopping hooks and picks the strongest |
| script writer | Writes timed scripts, ad beats and alternative hooks to A/B test |
| storyboard director | Storyboards every shot with a keyframe image prompt and an animation prompt |
| ad maker | Turns products into UGC ads, commercials and try-on transitions |
| casting agent, set designer | Cast Studio (characters) and Set Designer (luxury homes, room by room) |
| stats tracker | Results: tracks posts and spots winning hooks |

The bots report in as they work, in a chat-style feed on Home and a floating panel on other pages. A run lives in the browser tab: members can move around the app while it works, and if the tab closes, everything finished so far is saved and "let the team finish it ✨" picks up where it stopped. Every project can also be built step by step in its tool, or handed to the team at any step (`lib/pipeline.ts`, `components/TeamProvider.tsx`, `app/api/plan`).

Members build a **library** once, and every **create** tool reuses it so faces, rooms and packaging never drift.


**Library**
- **Cast Studio**: the series look (name, niche, visual style, format) plus recurring characters: look, wardrobe, age, voice. Members can type the details, fill them in from a photo, or have AI design a character from a one-line idea.
- **Set Designer**: describe a recurring place and Claude designs it room by room with fixed materials, colours, furniture and views.
- **Products**: packaging, the claims the member may make, and how the product is used on camera. Can be filled in from a photo.
- **Projects**: everything built in any tool, saved automatically and filterable by tool.

**Create.** Four storyboard tools share one engine: script → storyboard (a keyframe image prompt plus an animation prompt per shot, with planned start and end frames) → edit guide, captions, voiceover and posting package.
- **Episode Builder**: story idea → 4 concepts with hooks → a timed 4–5 minute script → storyboard.
- **UGC Ad Builder**: brief (product, creator, format such as honest review, GRWM or problem → solution, length, CTA) → hook-to-CTA beats with on-screen text → an authentic phone-camera storyboard.
- **Commercial Builder**: brief (product, style, length, tagline) → a directed brand spot with hero and macro product shots.
- **Try-On Transitions**: the pieces or makeup steps in order → a precisely timed transformation with a locked-off camera and match cuts.
- **Prompt Vault**: 38 curated image prompts, animation prompts, camera moves and looks. Members can fill any prompt with a saved character, product or set.

**The craft playbook** (`lib/playbook.ts`) is sent with every AI request: hook rules and a fixed list of 12 hook styles, retention, storyline and series design, character design, performance-ad rules, UGC authenticity, commercial and transformation craft, and titles and captions. Every concept and script is tagged with its hook style, and ad scripts come with alternative hooks to A/B test, so performance can later be compared by hook style. `insightsFor()` is the slot where approved community winners will be added once performance tracking is live.

Each tool's direction to Claude lives in `lib/tools.ts`, so tuning a tool, or adding one, is mostly writing its brief fields and instructions there.

Rename the product in `lib/brand.ts`. Bot names live in `lib/team.ts`. Logo and the crumpled-paper background are in `public/brand/`. The whole look (colours, type, sticker outlines, animation) lives in `app/globals.css`.

### How characters, sets and products stay consistent

Claude never rewrites a character, room or product description. It only decides the composition, performance, camera and continuity for each shot. The app then pastes the saved character sheet, room description and packaging into every image prompt word-for-word (`lib/prompt-builder.ts`), so "long knotless braids, cream linen set" and "white Calacatta marble island, brass pendants" read exactly the same in shot 1 and shot 40.

Every image prompt follows one house format: format and camera first, then which uploaded reference controls what (environment, character, outfit, product). After that come identity, hair and outfit preservation ("do not beautify, reshape, age…"), then precise pose and placement, believable anatomy and framing. Next is a locked environment ("never rotate, relocate, resize, recolor, or redesign"), then lighting and how materials react to it, and consistency across regenerations. The prompt ends with the look, an avoid list and a closing sentence. UGC ads and try-ons get a "premium iPhone creator content, not cinematic" look; episodes and commercials use the series' visual style.

Video prompts use a sectioned format written for Seedance 2.5 on Higgsfield. It starts with a reference hierarchy that tags each upload (`@Image 1` = character identity master, `@Image 2` = the starting frame, then the product and each outfit) and says what each one controls. Then come identity, scene and camera (locked when static), exact wardrobe reproduction, product, performance, choreography, physics and mechanics, continuity, an absolute priority order and a final result. The storyboard director writes the parts that depend on the ask (performance cues, ordered beats, mechanics such as "the fan rotates clockwise only", outfit states and priorities), so the format adapts to what the member wants. Each shot also lists the references to upload, in order, and its render settings.

The app writes prompts; it doesn't generate images or video itself. Members paste the prompts into their image and video tools along with the reference images.

### Regenerating and cost estimates

- **Regenerate:** AI generators hallucinate, so the storyboard, Edit & post page and the team all remind members to check results against their references. Each shot has a **Regenerate** panel. The member ticks what went wrong (face, hands, outfit, label, room, motion…) and adds targeted corrections to that shot's prompts, or asks the director for a fresh take on just that shot.
- **Test first:** as soon as a storyboard exists, the team and the storyboard ask whether to run a test clip. It picks the trickiest shot and renders it at 480p for 5 seconds with audio off (about 15 credits on Seedance 2.5), and lists what to check before the full render.
- **Model Guide** (`/models`): which Higgsfield model to use for what, and credits per model and resolution. It covers the crispest output settings for TikTok/Reels/Shorts (9:16, 1080p) and YouTube (16:9, 1080p upscaled to 4K), plus video best practice. One 4K example image is shown at 1K, 2K and 4K, and the viewer can pick which spot to zoom.
- **Cost and time:** every shot, reference prompt and Vault prompt shows an estimate in Higgsfield credits and waiting time (members have Higgsfield plans, so no dollars). The storyboard and Edit & post page show project totals plus a budget for retries. The team gives a rough cost before storyboarding and exact totals when it finishes. Members pick their image and video models on the storyboard. Default credits come from Higgsfield's own cost check. The price list (`lib/pricing.ts` defaults) is editable in **Admin → Higgsfield pricing**, because Higgsfield changes prices and has no price API. All figures are labelled as estimates.

## Accounts, results and the feedback loop

- **Accounts:** members sign up with email and password (or an emailed sign-in link) through Supabase Auth, then enter the access code from their purchase to unlock the studio. Performance Pack codes unlock that too. Emails in `ADMIN_EMAILS` get full access and the Admin dashboard.
- **Data:** the library and every project are saved to Postgres per member, so work follows them across devices. Work saved in the browser by earlier versions is moved to the account on first sign-in.
- **Results:** members add each posted video (optionally linked to the studio project and the hook they used) and log its numbers weekly. Each post is scored against that member's own typical views (`lib/score.ts`).
- **Winners:** a studio post at 2× the member's typical views (and at least 1,000 views) becomes a candidate, if the member shares winners. Sharing is on by default, can be turned off on the Results page, and entries are anonymous.
- **Admin:** you review candidates. Approved hooks and openings, plus hook-style results once a style has 5+ scored posts, are added to the AI's instructions for that tool (`lib/server/insights.ts`, refreshed every 10 minutes).

## Set up

1. **Supabase:** create a project at supabase.com.
   - Under Authentication → URL Configuration, set the Site URL to your app's address and add `https://<your-domain>/auth/callback` as a redirect URL.
   - Paste `supabase/migrations/0001_studio.sql`, then `0002_settings.sql`, into the SQL editor and run them.
2. **Claude API key:** in the Claude Console (platform.claude.com), create an API key under Settings → API keys, add credit under Billing, and set a monthly spend limit under Limits. The key goes in `ANTHROPIC_API_KEY`. It is only ever read on the server; never give it a `NEXT_PUBLIC_` prefix. After deploying, open **Admin → AI connection → Test the AI connection** to confirm it works.
3. **Environment:** copy `.env.example` to `.env.local` (or into Vercel's environment variables) and fill it in.
4. **Deploy:** import the repo on Vercel with the same variables.

### Run it locally

```bash
npm install
npm run dev
```

Without the Supabase keys, `npm run dev` uses a development-only sign-in (any email, no password) so the app can be tried against any Postgres in `DATABASE_URL`. This is refused in production. Checks: `npm run typecheck`, `npm test`, `npm run build`.

## Where things live

| Path | What it does |
|---|---|
| `app/(studio)/`, `components/` | All pages. `EpisodeBuilder` runs every storyboard tool; `BriefStep` starts the ad tools |
| `lib/playbook.ts` | The craft playbook, hook styles, and the slot for community insights |
| `lib/tools.ts` | Per-tool steps, brief options and direction for Claude |
| `lib/vault.ts` | Prompt Vault content |
| `app/globals.css` | The whole design system: colour tokens, type, components |
| `app/api/{concepts,script,shots,package}` | One Claude call per step, with structured JSON output validated by Zod |
| `lib/prompt-builder.ts` | Character anchors and final shot-prompt assembly |
| `lib/pricing.ts`, `components/Cost.tsx`, `components/PricingEditor.tsx` | Higgsfield credit and time estimates, test clips, and the admin price list |
| `lib/model-guide.ts`, `components/ModelGuide.tsx` | The Model Guide: models, picks, output settings, resolution comparison |
| `lib/edit-guide.ts` | Clip timeline, captions (.srt) and voiceover script |
| `lib/export.ts` | Episode pack → Markdown |
| `app/api/beats` | Timed beats for the ad tools |
| `app/api/sets`, `app/api/describe` | Set designer, and reading a character, room or product from a photo |
| `proxy.ts`, `lib/server/auth.ts`, `app/login`, `app/welcome` | Sign-in, membership codes, per-route member checks |
| `lib/server/*.ts`, `supabase/migrations` | Database access and schema |
| `lib/score.ts`, `lib/winners.ts` | Performance scoring and winner snapshots |
| `components/ResultsPage.tsx`, `components/AdminDashboard.tsx` | Results tracking and the admin review queue |
| `lib/use-studio.ts` | Loads and saves the member's library and projects |

## Known limits

- Access codes are shared, not per person: a leaked code works until you remove it from the environment. Stripe checkout with per-member subscriptions is the next step.
- Results are entered by members. Connected TikTok, Instagram and YouTube accounts (the Performance Pack) will fill them in automatically and are weighted as verified.
- Nothing yet limits how often a member can generate, so watch usage in the Anthropic Console before scaling and add per-member limits.
