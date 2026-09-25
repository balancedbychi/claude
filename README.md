# Episode Builder

A members-only web app that takes a creator from **"I have an idea"** to **"I have everything I need to generate this video"** for faceless AI story series on TikTok, Reels and Shorts.

1. **Characters.** Set up the series (name, niche, visual style, setting, format) and lock recurring characters once: look, wardrobe, age, voice. Each character gets a copy-ready reference-image prompt.
2. **Story.** Enter a topic and get 4 episode concepts, each with a 3-second hook.
3. **Script.** A timed 4–5 minute script split into scenes, with voiceover or dialogue for each scene. Members can edit it in the app.
4. **Scene prompts.** Every scene is broken into shots (one generated clip each). Each shot prompt is ready to paste into Higgsfield, Kling, Veo or Runway, with camera, mood and lighting.
5. **Package.** Title options, description, hashtags and a thumbnail concept, plus a download of the whole episode pack as Markdown.

### How characters stay consistent

Claude never rewrites a character description. It only decides the action, camera, mood and lighting for each shot. The app then pastes the saved character sheet into every prompt word-for-word (`lib/prompt-builder.ts`), so "long knotless braids, cream linen set" reads exactly the same in shot 1 and shot 40.

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
| `lib/export.ts` | Episode pack → Markdown |
| `lib/access.ts`, `proxy.ts`, `app/login` | Access-code gate |
| `lib/storage.ts` | Characters and episodes are saved in the member's browser (v1) |

## Known limits of v1

- Member data lives in their browser. Clearing it or switching devices loses their characters and episodes. The upgrade path is swapping `lib/storage.ts` for a database such as Supabase.
- Access is shared codes, not individual accounts. You can't see who used what, and a leaked code works until you remove it. Individual logins (e.g. Clerk + Stripe) are the next step once there are paying members.
- Nothing limits how often a member can generate, so every generation is paid from your Claude API key. Watch usage in the Anthropic Console, and add per-member limits before scaling.
