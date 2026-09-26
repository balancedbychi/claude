# Episode Builder

A members-only creator studio for faceless AI content. It has three tools that share one cast and one set of locations:

- **Cast Studio** sets the series look (name, niche, visual style, format) and locks recurring characters: look, wardrobe, age, voice. Members can type the details or fill them in from a photo. Each character gets a reference-image prompt.
- **Set Designer**: describe a recurring place ("modern luxury home in the Hollywood Hills") and Claude designs it room by room with fixed materials, colours, furniture and window views. Members review and lock the rooms, or add single rooms (also from a photo). Each room gets a reference-image prompt.
- **Episode Builder** has four steps:
  1. **Story**: a topic in, 4 episode concepts out, each with a 3-second hook.
  2. **Script**: a timed 4–5 minute script split into scenes, each placed in a locked set, with voiceover or dialogue. Members can edit it in the app.
  3. **Storyboard**: every scene is broken into shots. Each shot has a **keyframe image prompt** (character and set sheets pasted in) and an **animation prompt** (movement, camera, performance). Start and end frames are planned so the cuts join up. Shots that continue the same angle are animated from the previous clip's last frame, with no new keyframe. Clip codes (S01-SH01…) keep the files in order.
  4. **Edit & post**: a clip-by-clip edit guide, captions (.srt), a voiceover script, titles, description, hashtags and a thumbnail idea, plus the whole episode pack as one file.

The **Episodes** library saves everything as members work. Tools marked "coming soon" in the sidebar (UGC ads, commercials, try-on transitions, prompt vault) are placeholders for the roadmap.

Rename the product in `lib/brand.ts`.

### How characters and sets stay consistent

Claude never rewrites a character or room description. It only decides the composition, performance, camera and continuity for each shot. The app then pastes the saved character sheet and room description into every image prompt word-for-word (`lib/prompt-builder.ts`), so "long knotless braids, cream linen set" and "white Calacatta marble island, brass pendants" read exactly the same in shot 1 and shot 40.

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
| `app/(studio)/`, `components/` | Home, Cast Studio, Set Designer, Episode Builder and Episodes pages |
| `app/globals.css` | The whole design system: colour tokens, type, components |
| `app/api/{concepts,script,shots,package}` | One Claude call per step, with structured JSON output validated by Zod |
| `lib/prompt-builder.ts` | Character anchors and final shot-prompt assembly |
| `lib/edit-guide.ts` | Clip timeline, captions (.srt) and voiceover script |
| `lib/export.ts` | Episode pack → Markdown |
| `app/api/sets`, `app/api/describe` | Set designer, and reading a character or room from a photo |
| `lib/access.ts`, `proxy.ts`, `app/login` | Access-code gate |
| `lib/storage.ts` | Characters, sets and episodes are saved in the member's browser (v1) |

## Known limits of v1

- Member data lives in their browser. Clearing it or switching devices loses their characters and episodes. The upgrade path is swapping `lib/storage.ts` for a database such as Supabase.
- Access is shared codes, not individual accounts. You can't see who used what, and a leaked code works until you remove it. Individual logins (e.g. Clerk + Stripe) are the next step once there are paying members.
- Clips are assembled by the member in their editor. The app plans continuity and gives them the order, captions and voiceover, but doesn't stitch video files itself.
- Caption timings are spread evenly by word count within each scene. Members nudge them to the final voiceover.
- Uploaded photos are sent to Claude to be described and are not stored.
- Nothing limits how often a member can generate, so every generation is paid from your Claude API key. Watch usage in the Anthropic Console, and add per-member limits before scaling.
