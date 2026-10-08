# claude

Two projects live here.

- **EXCLUSIVE with Nia and Chi**, a vertical AI video series rendered with Seedance 2.5 on Higgsfield. Its rules, cast, sets and episodes are at the repo root.
- **bot + bow ai** (`bot-bow-ai/`), a members-only AI content-team app for faceless creators, built with Next.js, Supabase and the Claude API.

## Working on the series

1. Read `CLAUDE.md`. These are the user's standing rulings, and they override any older Higgsfield element description.
2. Follow `.claude/skills/episode-production/SKILL.md` for the order of work on any episode, segment or re-film.
3. Before anything is generated, two rules matter most: photos always come from the user's own upload (rule 8), and nothing is rendered or spent until the user says "film" (rule 9).

## Layout

| Path | What it holds |
|---|---|
| `CLAUDE.md` | The series rules. |
| `.claude/skills/episode-production/` | The production workflow, step by step. |
| `characters/` | One profile per character: Nia, ChiChi, Dorian, Kel, Simone, Tay and DB. |
| `sets/` | Filming locations. `nia-apartment-prompts.md` shows the method: wide still prompts, the user approves one, and the approved still becomes a Higgsfield environment element. It also records the approved elements and Nia's door geometry. |
| `episodes/<name>/` | `script.md` and `prompts.md` for each episode: the script, then the production notes and Seedance prompts, with a render log in several. Episodes 11 to 13 are `just-as-important`, `take-your-own-advice` and `read-receipts`. |
| `exclusive/episode-14/` | Episode 14, "Nice Building": continuity bible, stills log, production plan, scene and segment plans, final cut. |
| `docs/` | `connector-playbook.md`: the method from Episode 15 ("Hold On", `episodes/hold-on/`, the first episode where every render passed), written to paste into a connector's instructions, plus a ranked list of how to improve the connector. `tools/qa_render.sh` checks a finished render in one command (run it in the Higgsfield sandbox). `tools/prototypes/` is a prompt builder and linter; its `README.md` says how to run it. |
| `bot-bow-ai/` | The bot + bow ai app. It has its own `README.md`, `CLAUDE.md` and `docs/BUILD_SPEC.md`, and its commands run from inside that folder. |

## The app

The app's team has eight bots. Two cover the library side: the **casting agent** (Cast Studio, `/cast`) keeps the AI characters, and the **set designer** (Set Designer, `/sets`) designs recurring places room by room. `bot-bow-ai/README.md` covers setup, and `bot-bow-ai/.env.example` lists the environment variables.

`npm ci`, `npm test` and `npm run typecheck` run from `bot-bow-ai/` without any environment variables.
