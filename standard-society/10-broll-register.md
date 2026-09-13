## Status — v2 (bright modern luxury)

Batch 1 v1 was re-rolled entirely: the prompts read as kitchen-sink realism, not the brand. See
"Why v1 failed" below. **v2 job IDs are the live assets.**

| # | Shot | Job ID (v2) | Use | Next |
|---|---|---|---|---|
| 1 | Notebook, matte black pen mid-line, marble counter | `f5ebe0af-3a77-4da3-91f9-1a65f7a6bd1d` | FS-2 | **animate** |
| 2 | Page torn out, folded, micro-cement | `6912a3c8-d875-4cd0-8259-adf2e750527a` | FS-8 | **animate** |
| 3 | Tea gone cold, marble sill, skyline beyond | `19973c06-e874-4c6b-a906-122a8c6a636d` | FS-3 | **animate** |
| 4 | Sheer linen curtains, draught, sunlight | `fd64ec9a-c8aa-4e85-95c0-db224144b98b` | atmosphere | **animate** |
| 5 | Plate pushed forward, upscale daytime restaurant | `f331b817-a494-4cb3-9c5b-159cabdf6afd` | TH-7 "The Soup" | **animate** |
| 6 | Two columns, right one short, marble | `857da113-c39e-4bca-bbf1-59f0d59b5a0c` | FS-6, TH-6 | still + push |
| 7 | Phone face-down, white linen, morning | `a62c7689-eb68-470d-a6f2-e712114fd777` | FS-4 | still + push |
| 8 | Phone screen 11:40, city skyline at night | `d2da3934-95dc-43f3-80c2-820565150d36` | FS-1, TH-1 | still + push |
| 9 | Sculptural chair, marble table, morning | `2816bfb2-7cf8-457f-b8e9-8bd448ac9646` | FS-10 | still + push |
| 10 | Door ajar, pale ash floor, morning light | `a08e8e72-6b60-494a-bec4-a6a3aab998eb` | FS-7 | still + push |

## Why v1 failed — worth not repeating

The compositions were right; the vocabulary was wrong. Every one of these words pulled the frame
toward kitchen-sink realism: *battered, cheap biro, pale oak, aged brass, worn wooden floor, cold
grey, bare branches, quiet domestic realism, phone photograph* — and worst of all, **"one warm lamp,
the rest falling into darkness."**

Light did most of the damage. The same objects in the same arrangement read as a magazine spread
under "abundant soft diffused daylight, soft shadows only" and as a period drama under one lamp in
the dark. Art direction is now locked in `07-asset-system.md` §2b.

**Cost of the lesson: 30 credits.** Cheap, because stills are 3 each. Had this been caught after
animating, it would have been 210.

## The split

**Five get animated** (1–5) — something genuinely moves: a pen stopping, paper folding, a draught,
a plate sliding. 4s at 9:16 ≈ 36 credits each, **180 total**.

**Five stay stills** (6–10) — nothing moves in the frame, so a slow Ken Burns push in the edit is
indistinguishable from generated video and usually steadier. Free. These are already finished assets.

**Batch 1 total: 30 spent, 180 to finish.** Against 810 for the naive all-video approach.

## Review notes

Two are worth checking closely before animating:

- **#8, the 11:40 clock.** Image models are unreliable at small numerals. If the time reads wrong or
  the lock screen has invented icons, the fix is free — regenerate a plain glowing screen and set
  the time as a text layer in the edit, where it will look sharper anyway.
- **#6, the two columns.** The whole point is that the right column is visibly shorter. If the model
  balanced them, the shot says nothing and needs a re-roll at 3 credits.

The handwriting in #1 and #6 is deliberately unreadable and out of focus. That is correct — it keeps
the viewer projecting her own list onto it, and it sidesteps text rendering entirely.

## Re-rolls

Stills are 3 credits. Generate three variants of anything borderline and keep the best; it is still
cheaper than one second of video.
