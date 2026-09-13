## Animated clips — batch 1 complete

Five 4-second 1080×1920 silent clips, image-to-video from the approved stills via `seedance_2_0`.
**36 credits each, 180 total.**

| # | Clip | Video job ID | Motion |
|---|---|---|---|
| 1 | Notebook | `80542832-4108-46c3-a7b9-799b7c056514` | draught lifts the page corner, dust in the light |
| 2 | Torn page | `f6cefc79-c095-4d27-875e-3a25d942895e` | shadow edge creeps as a cloud passes |
| 3 | Cold tea | `94ad4e3d-1def-4535-aa4d-8c22b08d34ee` | faint ripple crosses the surface and settles |
| 4 | Curtains | `977a3729-5ecc-4ef5-8718-7e9f9df54589` | linen breathes in and falls back |
| 5 | Plate | `607c9e15-c75b-4941-acce-8eb1a4949c20` | a hand pushes the plate forward and withdraws |

**Batch 1 total: 210 credits** — 30 stills + 180 animation. Against 810 for the naive all-video
approach, and 240 counting the v1 stills that were re-rolled.

### Direction notes that mattered

**Micro-motion, not motion.** Every prompt specifies a locked camera and one small movement.
Large AI movement is what reads as generated; a page corner lifting and settling reads as a film
crew left a camera running. "No camera shake" and "no camera movement" go in every prompt — the
model will otherwise invent a drift that makes the shot feel cheap.

**No hands on object b-roll, with one exception.** Hands are the main artifact risk after faces.
Only #5 has one, because the whole meaning of that shot is the plate going back — ambience alone
would have said nothing. It is specified as deep warm brown skin, short neutral nails, no rings, so
it is consistent with Nia's world without needing her Element. **Check this clip's hand closely.**
Any other shot needing hands belongs in the character b-roll batch, under her Element.

**Watch for a preset hijack.** Submitting #5 initially returned `submission_failed` with a preset
recommendation ("IN THE DARK") instead of a job — wrong for a bright restaurant. Pass
`declined_preset_id` with the offered id and resubmit. It costs nothing but will silently stall a
batch item if unnoticed: **always check `submitted_count` against what you sent.**

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
