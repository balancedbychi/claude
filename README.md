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

## Run it locally

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

Checks: `npm run typecheck`, `npm test`, `npm run build`.

## Deploy (Vercel)

1. Import this repo at vercel.com/new.
2. Add the environment variables from `.env.example`. `MEMBER_ACCESS_CODES` and `ACCESS_SECRET` are required in production. Without codes the app stays locked.
3. Deploy, then put the URL and an access code in your Stan Store product's delivery message.

To revoke access, remove a code from `MEMBER_ACCESS_CODES` and redeploy. Anyone logged in with that code is signed out.

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
| `lib/access.ts`, `proxy.ts`, `app/login` | Access-code gate |
| `lib/storage.ts` | Characters, sets, products and projects are saved in the member's browser (v1) |

## Known limits of v1

- Member data lives in their browser. Clearing it or switching devices loses their characters and episodes. The upgrade path is swapping `lib/storage.ts` for a database such as Supabase.
- Access is shared codes, not individual accounts. You can't see who used what, and a leaked code works until you remove it. Individual logins (e.g. Clerk + Stripe) are the next step once there are paying members.
- Clips are assembled by the member in their editor. The app plans continuity and gives them the order, captions and voiceover, but doesn't stitch video files itself.
- Caption timings are spread evenly by word count within each scene. Members nudge them to the final voiceover.
- Uploaded photos are sent to Claude to be described and are not stored.
- Nothing limits how often a member can generate, so every generation is paid from your Claude API key. Watch usage in the Anthropic Console, and add per-member limits before scaling.
