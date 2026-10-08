# Prompt builder and linter prototypes (Episode 15, "Hold On")

Scratch tools from the episode where every render passed. They are working prototypes, not a product. They prove one idea: **build each Seedance prompt from locked shared blocks, then lint it with a script**, so the guards (no rings, DB's voice, camera, physics, line ownership) are identical in every prompt and can't be mistyped or paraphrased.

Nothing here submits a render, calls Higgsfield or spends a credit.

The full method, and what to build next, is in [`docs/connector-playbook.md`](../../connector-playbook.md) (Part 4, Part 9 item 6, Appendix C).

## Run them

From the repo root (the scripts find their own paths, so any folder works):

```
python3 docs/tools/prototypes/gen_prompts.py     # five separate v1 prompts -> prompts_data.json
python3 docs/tools/prototypes/gen_v2.py          # Clip 01 v2 and Clips 02+03 -> prompts_v2.json
python3 docs/tools/prototypes/gen_v3.py          # Clips 04+05 -> prompts_v3.json
python3 docs/tools/prototypes/check_v2.py prompts_v2.json
python3 docs/tools/prototypes/check_v2.py prompts_v3.json
python3 docs/tools/prototypes/check_prompts.py   # linter for the v1 prompts
python3 docs/tools/prototypes/check_script.py episodes/hold-on/script.md .
```

Each prompt checker ends with `ALL OK` or `ISSUES FOUND`. The JSON files are written beside the scripts and ignored by git.

The three filmed prompts (`01v2`, `0203`, `0405`) come out word for word as they appear in `episodes/hold-on/prompts.md`. That was checked on 8 Oct 2026. If you change a shared block, those prompts change too, so re-check before reusing them.

## Files

| File | What it does |
|---|---|
| `gen_prompts.py` | The locked blocks (set, ChiChi, DB, phone, camera, physics, voices) and the five separate v1 prompts. It reads DB's voice text from `characters/db.md`. |
| `gen_v2.py` | The ring-fix blocks (DB's "bare hands" wording, the left hand in his pocket, the reference-video paragraph that names the ring), Clip 01 v2, and the combined Clips 02+03 (24 s). |
| `gen_v3.py` | The combined Clips 04+05 (17 s), chained from the approved Clips 02+03. |
| `check_prompts.py` | Linter for the v1 prompts. |
| `check_v2.py` | Linter for the ring-fix prompts. Takes the JSON file name. |
| `check_script.py` | Script review: ragged tables, seconds and credits per clip (7 credits a second at 720p), words per second, and whether each ID in the script appears in another file. `0 other file(s)` means the ID is cited only in the script, so check it against Higgsfield by hand. |

## What the prompt linters check

- The timeline is contiguous and ends at the render length (within 0.3 s).
- Every quoted line appears in the script.
- Every element ID is present, and DB's locked voice text is verbatim.
- The ring sentence (`NO RINGS`) appears for each person. DB's text has the "bare hands" sentence and no "wedding".
- The line-ownership list has one entry per spoken line.
- No banned wording. DB's locked voice description is cut out before this scan, because it legitimately contains "mature" and was filmed and approved as written.
- Speaking rate per line, printed for review. Nothing fails on it yet. The filmed prompts ran from about 1.4 to 2.9 words a second.

## Limits

- The checkers read the Episode 15 prompt layout (section headings such as `THE CLIP, SHOT BY SHOT:` and `LINE OWNERSHIP`). A different layout needs the patterns changed.
- Character and element IDs are constants at the top of `gen_prompts.py`. For another episode, move them into a data file per episode (cast, set, clips, shots, lines) and keep only the locked blocks in code.
- A clean lint does not replace the QA of the finished render. Run `docs/tools/qa_render.sh` on every take.
