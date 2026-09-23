# Higgsfield Tools & Surfaces — What Each One Is and When to Use It

*The AI Edit · Checked September 23, 2026*

Higgsfield isn't one tool. It's a building with many rooms. Members get lost when they don't know which room they're in. This page is the floor plan.

**Sources:** Tool names and capabilities were confirmed through the live Higgsfield connector catalog. Supercomputer details come from Higgsfield's Supercomputer pages and help center (see the links at the bottom). Menu names on the website can differ slightly from connector names, so confirm the current labels when you screen-record.

---

## 1. The three ways to use Higgsfield

| Surface | What it is | Who it's for | Tier |
| --- | --- | --- | --- |
| **Website / app** (higgsfield.ai) | Click-and-generate interface with every model and studio | Everyone. **Learn here first.** | Basic |
| **Supercomputer** | Higgsfield's own AI **agent**: you describe the goal ("make a 30-second ad for my candle brand") and it plans, generates, and delivers across models in one chat | Members who understand models and costs | Advanced |
| **Connector (MCP) for Claude / ChatGPT, and the CLI** | Lets Claude, Claude Code, or ChatGPT call Higgsfield's tools directly from a conversation or project folder | Members who want Claude to organize *and* generate | Advanced |

### What is Supercomputer? (plain language)

It's **not** a physical computer. It's an AI assistant built into Higgsfield that runs multi-step creative jobs for you:

- **Plans first, shows cost first.** It lays out the steps and the combined credit cost before anything renders. You approve, then it generates. Credits are charged at the same rates as normal generation.
- **Skills.** Installable, ready-made workflows from a Skills Marketplace (for example, "product brief → UGC video" or a trend-research pass).
- **Memory.** Remembers your brand voice, style preferences, and past work across projects.
- **Scheduled tasks.** Can run jobs on a schedule (daily ad variations, weekly competitor scans, monthly content calendars). Higgsfield lists up to 10 active scheduled tasks on Ultra.
- **Beyond generation.** Can pull in reference material, work with your files, and deliver to other tools.

**When to use Supercomputer vs Claude + connector:**

| Use **Supercomputer** when… | Use **Claude / Claude Code + connector** when… |
| --- | --- |
| You want everything to stay inside Higgsfield | You want your project files, briefs, and asset manifest in *your own* folder |
| You want scheduled, repeating content jobs | You want to review and version every document and prompt |
| You want pre-built Skills for ads or UGC | You're building your own repeatable system (the AI Edit method) |
| You don't want to learn a second tool | You already use Claude for planning and writing |

**Teach both, in this order:** website → cost control → Claude connector → Supercomputer. Scheduled automation spends credits while you're not watching, so it belongs *after* members can read costs.

---

## 2. The rooms inside Higgsfield

### Creating images
| Tool | What it does | Use it when |
| --- | --- | --- |
| **Image generation** | All image models (see the model guide) | Stills, start frames, sets, products |
| **Characters (Soul ID)** | Train a reusable identity from 5–20 photos | Your AI twin or a recurring influencer |
| **Elements** | Save reusable characters, locations, and props from images | Consistency across *many* models, including video |
| **Character sheets** | Guided workflow that builds turnaround / expression sheets | Module 4 reference pack |
| **Product photoshoot** | Packshots, lifestyle shots, hero banners, carousels, try-ons | Brand and UGC tracks |
| **Thumbnail generation** | YouTube/Instagram covers with text | Faceless and story tracks |
| **Brand asset creation** | Logos, brand kits, mockups, merch, social graphics | Your own community branding; brand-service members |
| **Upscale / Outpaint / Reframe / Remove background** | Finishing tools | Before posting or animating |

### Creating video
| Tool | What it does | Use it when |
| --- | --- | --- |
| **Video generation** | All video models | Every scene |
| **Cinema Studio** (image 2.5, video 2 and 3.0) | Film-look stills and video with genre, camera, speed-ramp, and multi-shot controls | Story and cinematic content |
| **Marketing Studio** | Products, avatars, brand kits, hooks ("the what"), settings ("the where"), and **Ad References** (recreate the structure of an existing ad) → finished ads | UGC and product track |
| **Ad Multiplier** | Makes many edited versions of one ad (different person, product, background) | Testing hooks and variations |
| **Genjutsu** | *Motion transfer* (copy a dance or gesture onto your character) and *object replacement* (swap a product or outfit in a video) | Dance track; product swaps |
| **Presets / Viral effects** | One-click effect templates, including motion and trending effects | Quick trend content; teach as optional |
| **Shorts Studio** | Restyles one uploaded video (4–120 s) into a set of AI short-form clips using a style preset | Repurposing your own footage |
| **Clipify** | Turns one YouTube video into subtitled vertical clips | Repurposing long-form |
| **UGC workflows** | Guided flows for review, unboxing, try-on, tutorial, product-only, and website/SaaS UGC videos | UGC track, Month 3 |
| **Faceless video workflow** | Narrated multi-scene explainer, history, kids, picture story, or myth videos with a locked style, one narrator voice, and burned subtitles | Faceless track, Month 4 |
| **Video editing (Higgsedit)** | Cuts, trims, soundtrack, text, overlays, title cards | Light assembly inside Higgsfield |
| **Subtitles** | Burns captions into the video from its own audio | Finishing |
| **Video analysis / Virality predictor** | Analyzes a video; predicts virality | Review step (treat predictions as signals, never promises) |

### Voice and audio
| Tool | What it does |
| --- | --- |
| **Text to speech** (Seed Audio, TTS V2 with ElevenLabs / MiniMax / others, Qwen TTS) | Script → spoken audio in a preset or cloned voice |
| **Create Voice** | Record or upload a sample → a reusable voice (consent required) |
| **Voice Change** | Swap the voice in an existing video |
| **Lipsync Studio / Sync Lipsync 3** | Make a character's mouth match an audio track |
| **Dubbing** | Translate + re-voice + lip-sync into 18 languages |
| **Narrator workflow** | Timed narration takes, long-form narration in a locked voice, or putting a consenting person on-screen as narrator |

### Publishing and extras
| Tool | What it does | Notes |
| --- | --- | --- |
| **TikTok tools** | Connect an account, browse trending music, prepare and publish | Check the licensing of every sound for your use |
| **3D** | Image → 3D model; 3D scene builder | Optional discovery content |
| **Website builder** | Build and publish sites, apps, and browser games | Optional; could host a simple landing page |

---

## 3. The Claude ↔ Higgsfield connection (Advanced tier core workshop)

### What it is
The Higgsfield connector gives Claude direct access to Higgsfield's image, video, and voice tools, Soul characters, and Elements. Setup takes minutes: in Claude, go to **Settings → Connectors**, add Higgsfield, and sign in to your Higgsfield account. No API key or code needed. Higgsfield also documents a **CLI** route for agents like Claude Code and a ChatGPT connection.

### Why it's worth teaching
- Claude reads your **brief, character guide, and asset manifest** and uses the *same* Element IDs, Voice IDs, and settings every time. That's consistency by system, not by luck.
- Claude can **preflight the cost** of a generation before submitting it (the checks behind every cost in the model guide).
- Claude can **log** each generation (model, prompt, cost, result) into your generation log automatically.

### What it does NOT do (teach these limits up front)
1. **It doesn't attach a voice to a character.** See the Voice Playbook, routes A/B/C.
2. **Website Unlimited allowances generally don't cover connector/CLI generations.** Connected generations spend credits. Check the balance before and after.
3. **Conversational spending limits aren't hard caps.** Higgsfield says that telling the agent "don't spend more than X" isn't an enforced limit. Members should ask for a cost preflight before every paid generation.
4. **Claude can't see your screen or your Higgsfield website history** unless you give it IDs or files.

### The "Studio Folder" setup (what members build)
```
my-ai-edit-project/
├── CLAUDE.md              ← project instructions: tone, rules, "always show cost first"
├── brief.md               ← Module 0–2 outputs
├── characters/
│   └── nova.md            ← look notes, Element ID, Soul ID, Voice ID, voice notes
├── sets/
│   └── vanity-set.md      ← Element ID + reference views
├── assets/manifest.md     ← every approved asset, version, permission
├── shots/shot-list.md     ← shot | model | route | prompt | status
└── logs/generation-log.md ← date | model | settings | credits | usable? | next step
```

Starter `CLAUDE.md` rules to hand members:
```
- Before any Higgsfield generation, show me the model, settings, and credit cost, and wait for my "yes".
- Use the Element / Soul / Voice IDs in characters/*.md. Never invent a new character.
- Default to the cheapest model that answers the test question; upgrade only for final shots.
- After each generation, add a row to logs/generation-log.md.
- For dialogue, follow the voice route listed in the shot list (A, B, or C).
```
(Remind members that CLAUDE.md is guidance Claude reads, not an enforced lock. Review what actually happened.)

---

## Sources
- [Higgsfield Supercomputer](https://higgsfield.ai/supercomputer) · [How to use Supercomputer](https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-supercomputer) · [Supercomputer pricing](https://higgsfield.ai/supercomputer/pricing) · [Skills Marketplace](https://higgsfield.ai/supercomputer/marketplace/skills)
- [How to connect Higgsfield to Claude or ChatGPT](https://higgsfield.ai/creator-hub/help-center/integrations/how-do-i-connect-higgsfield-to-ai-agent) · [Higgsfield CLI](https://higgsfield.ai/cli) · [Talking avatar in Claude with Higgsfield MCP](https://higgsfield.ai/blog/talking-ai-avatar-inside-claude)
- [Lipsync, voiceover, and aspect ratios](https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-lipsync-voiceover-and-aspect-ratios) · [Voice cloning](https://higgsfield.ai/voice-cloning)
- [How credits work](https://higgsfield.ai/creator-hub/help-center/credits/how-credits-work) · [How plans work](https://higgsfield.ai/creator-hub/help-center/plans/how-do-higgsfield-plans-work)
