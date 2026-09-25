# Episode Builder

A members-only web app that takes a creator from **"I have an idea"** to **"I have everything I need to generate this video"** for faceless AI story series on TikTok, Reels and Shorts.

1. **Characters.** Set up the series (name, niche, visual style, format) and lock recurring characters once: look, wardrobe, age, voice. Members can type the details or fill them in from a photo. Each character gets a copy-ready reference-image prompt.
2. **Sets.** Describe a recurring place ("modern luxury home in the Hollywood Hills") and Claude designs it room by room with fixed materials, colours, furniture and window views. Members review, edit and lock the rooms, or add single rooms (also from a photo). Each room gets a reference-image prompt.
3. **Story.** Enter a topic and get 4 episode concepts, each with a 3-second hook.
4. **Script.** A timed 4–5 minute script split into scenes, each assigned to a locked set, with voiceover or dialogue. Members can edit it and reassign sets in the app.
5. **Scene prompts.** Every scene is broken into shots (one generated clip each), with the start and end frame of every shot planned so the cuts join up. Shots that continue the same angle are flagged to be generated from the previous clip's last frame. Each clip gets a code (S01-SH01…) so the files sort into order.
6. **Edit & post.** A clip-by-clip edit guide (order, start time, transition, voiceover), a captions file (.srt) for CapCut, a voiceover script, and titles, description, hashtags and a thumbnail concept. Everything downloads as one episode pack.

### How characters and sets stay consistent

Claude never rewrites a character or room description. It only decides the action, camera, mood, lighting and continuity for each shot. The app then pastes the saved character sheet and room description into every prompt word-for-word (`lib/prompt-builder.ts`), so "long knotless braids, cream linen set" and "white Calacatta marble island, brass pendants" read exactly the same in shot 1 and shot 40.

The app writes prompts; it doesn't generate images or video itself. Members paste the prompts into their video tool along with the reference images.

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
| `components/` | The five steps of the builder UI |
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
