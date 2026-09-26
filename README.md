# Episode Builder

A members-only creator studio for faceless AI content. Members build a **library** once, and every **create** tool reuses it so faces, rooms and packaging never drift.

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

Rename the product in `lib/brand.ts`.

### How characters, sets and products stay consistent

Claude never rewrites a character, room or product description. It only decides the composition, performance, camera and continuity for each shot. The app then pastes the saved character sheet, room description and packaging into every image prompt word-for-word (`lib/prompt-builder.ts`), so "long knotless braids, cream linen set" and "white Calacatta marble island, brass pendants" read exactly the same in shot 1 and shot 40.

The app writes prompts; it doesn't generate images or video itself. Members paste the prompts into their image and video tools along with the reference images.

## Accounts, results and the feedback loop

- **Accounts:** members sign up with email and password (or an emailed sign-in link) through Supabase Auth, then enter the access code from their purchase to unlock the studio. Performance Pack codes unlock that too. Emails in `ADMIN_EMAILS` get full access and the Admin dashboard.
- **Data:** the library and every project are saved to Postgres per member, so work follows them across devices. Work saved in the browser by earlier versions is moved to the account on first sign-in.
- **Results:** members add each posted video (optionally linked to the studio project and the hook they used) and log its numbers weekly. Each post is scored against that member's own typical views (`lib/score.ts`).
- **Winners:** a studio post at 2× the member's typical views (and at least 1,000 views) becomes a candidate, if the member shares winners. Sharing is on by default, can be turned off on the Results page, and entries are anonymous.
- **Admin:** you review candidates. Approved hooks and openings, plus hook-style results once a style has 5+ scored posts, are added to the AI's instructions for that tool (`lib/server/insights.ts`, refreshed every 10 minutes).

## Set up

1. **Supabase:** create a project at supabase.com.
   - Under Authentication → URL Configuration, set the Site URL to your app's address and add `https://<your-domain>/auth/callback` as a redirect URL.
   - Paste `supabase/migrations/0001_studio.sql` into the SQL editor and run it.
2. **Environment:** copy `.env.example` to `.env.local` (or into Vercel's environment variables) and fill it in.
3. **Deploy:** import the repo on Vercel with the same variables.

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
