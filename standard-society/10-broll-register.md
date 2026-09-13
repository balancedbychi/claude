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

---

# Batch 2 — Character b-roll

Eight Element-locked stills, 9:16 at 1536×2752, **2 credits each, 16 total.**

| # | Shot | Job ID | Character | Next |
|---|---|---|---|---|
| 1 | Thumb hovering over send | `00149cc6-f09a-479a-a897-4dce374f821d` | Nia | **animate** |
| 2 | Walking away, modern street | `76bb2de8-f45a-4da8-95a8-fb65b3948f14` | Nia | **animate** |
| 3 | Parked car, looking out | `c25d5fd3-ae25-455d-8828-4135f576d4e9` | Nia | still + push |
| 4 | Hands writing in the notebook | `cd638ba2-f2d5-4f26-b160-f18192a04d8d` | Nia | **animate** |
| 5 | Mirror, mid-routine | `9d253e64-bd56-45b7-aace-e872791a47a5` | Nia | **animate** |
| 6 | Balcony, three-quarter, looking out | `17a75b5d-5088-4709-9de8-709c14b56c80` | Chi | still + push |
| 7 | Wind lifting her hair, turning to lens | `f3f82999-b7f1-4c98-848d-01965f6ce5b9` | Chi | **animate** |
| ~~8~~ | ~~Hands on the balcony railing~~ | `1415ee23-…` | Chi | **cut — bad concept** |
| 8a | Chi wide, from behind, sky above | `51eabcdd-91df-4646-beb6-215f32fa98cf` | Chi | still + push |
| 8b | Chi seated with coffee, at ease | `4d6b34ec-9cc9-4218-8632-e1135dadb02e` | Chi | still + push |

## Model notes

**Elements only work on certain models.** `seedream_v5_pro` — used for all the object b-roll — is
**not** on the Element-compatible list. Using it with a `<<<uuid>>>` placeholder would likely have
produced a generic person and burned the batch. Element-compatible and cheaper: `nano_banana_pro`
at 2 credits, `seedream_v4_5` at 1, against 3 for v5_pro.

**You may not get the model you ask for.** Submitted as `nano_banana_pro`; every job came back
running **`nano_banana_2`**. Both are Element-compatible so identity still locked, but check the
`model` field on returned jobs rather than assuming.

## Two identity risks in this batch

**Chi's Element carries no description.** `Chi2` (`ba68b031`) has `description: null`, so nothing in
the Element itself preserves her face, hair, proportions or wardrobe — every bit of that came from
prompt text. Her full identity lock therefore has to be written into **every single prompt**: warm
brown complexion, almond eyes, full brows, cheek beauty mark, honey-blonde shoulder-length blowout
with darker roots, stud earrings, full-figured proportions, navy wrap blouse, ring-free hands, no
necklace. Nia's Element does carry a description and needs less prompt scaffolding.

**Shot 8 is the ring test.** Close on Chi's hands is the single highest-risk frame in the whole
library for the ring rule, which her own prior prompts fought repeatedly. Check it at full size.

## Stale Element description

Nia's Element still reads *"Signature prop: a battered yellow spiral notebook."* The present-day
direction is a **modern matte yellow** notebook. Prompt text overrides it, so output is correct,
but the Element itself is now out of step with the bible. There is no update action on the Elements
tool — only list, get and create — so correcting it means creating a replacement Element and
re-pointing future prompts. Low priority while prompts carry the override; worth doing before the
library grows.


## Shot 8 — cut, and why

The original shot 8 was close on Chi's hands resting on the balcony railing. It was rejected, and
it deserved to be. **The concept was weak before the render ever happened.**

- **Disembodied hands are stock-photo filler.** They read as a detail shot from a property listing.
- **It said nothing.** The line it served is *"You can be the problem and still not be the villain"*
  — a statement about self-awareness. Hands on a railing carries none of that.
- **It maximised the one risk that matters.** Chi's ring-free rule is the failure her own earlier
  prompts fought hardest; a tight two-hand close-up is the worst possible frame to bet it on.

Replaced with two shots that do Chi's actual job — **she is the one on solid ground**:

- **8a — wide, from behind, small in frame under a lot of bright sky.** Composure through
  composition. Doubles as a carousel cover with room for a headline in the negative space.
- **8b — seated with a coffee, at ease, looking away.** Hands present but occupied and in context,
  which is far less uncanny than hands alone, and it shows her settled rather than posed.

**Lesson for the shot list: a detail shot has to carry an idea.** If the only answer to "what does
this frame say" is "hands," cut it and shoot the person instead. It cost 2 credits to learn, because
stills come first.


## Chi's hands — the second standing rule

Her hands were rendering visibly older than her face: raised veins, visible tendons, crepey skin,
bony knuckles. **This is the most common way an image model silently ages a character**, and it had
gone into every Chi frame in batch 2.

Shots 6, 7 and 8b were re-rolled with an explicit hands block. **6 credits.** The IDs in the table
above are the corrected versions; the originals are superseded.

The block now lives in the character bible and in the Chi prompt scaffold, and goes into **every**
prompt where her hands are visible:

> HANDS: smooth and youthful, matching the apparent age of her face exactly — even skin tone, soft
> full backs of the hands, plump smooth fingers, taut skin over the knuckles, natural short nails,
> five fingers per hand with correct anatomy. NO prominent or raised veins, NO visible tendons, NO
> crepey wrinkled or papery skin, NO age spots, NO bony knobbly knuckles, NO thin translucent skin.

**The phrasing matters.** It asks for hands *matching the apparent age of her face*, not simply
"young hands." The defect is the **mismatch**, not her age — she is an adult woman and should read
as one. Asking for young hands alone risks grafting a twenty-year-old's hands onto her, which looks
equally wrong and is harder to spot.

Chi now carries two hard hand rules, both of which the model will break unprompted on every single
generation: **ring-free**, and **age-matched**. Neither is in her Element, because `Chi2` has a null
description. Until that is fixed, both blocks must be typed into every prompt she appears in.

## Batch 2 animation

Five 4-second 1080×1920 silent clips from the approved character stills. **36 credits each.**

| # | Clip | Video job ID | Motion |
|---|---|---|---|
| 1 | Thumb over send | `6ac7a79a-ccbb-4518-9c06-d751fb858285` | thumb drifts closer, trembles, withdraws — she never sends it |
| 2 | Walking away | `e7c64b62-36d2-40f1-87cf-f01ddc6dab04` | steady stride, curls and coat hem swaying, no look back |
| 4 | Hands writing | `e290c76b-0a92-4c10-8758-093bf917a9b6` | writes a few words, slows, stops mid-line |
| 5 | Mirror | `9fc26e3d-e8bc-4553-803e-bcf6ae234fcc` | holds her own gaze, breathes out, looks down |
| 7 | Chi turning to lens | `6e96cd49-b70c-444b-a58e-370cedb1dd61` | wind lifts her hair, she completes the turn and settles |

### The mirror shot was blocked as NSFW

The original mirror still was set in a **bathroom**. The still generated fine; the **video model's
safety filter is stricter** and returned `status: "nsfw"` — a false positive on a fully-dressed
woman at a bathroom mirror, but a hard block all the same.

**The fix was the setting, not the prompt wording.** The beat is "looking at her own reflection,"
which never needed a bathroom. Re-shot at a full-length mirror in the entrance hall, fully dressed
in coat and sweater, adjusting her collar as if about to leave — which is a **better** beat anyway:
the pause before you go out, rather than a generic getting-ready shot.

**Rule: keep characters out of bathrooms and bedrooms in any shot destined for video.** Stills may
pass where video will not, so a still clearing the filter is no guarantee. Mirrors, getting ready
and any "morning routine" beat should be staged in a hall, dressing area or living space.

### Preset hijack, again

The replacement mirror clip was also intercepted by the **"IN THE DARK"** preset — the same one that
caught the restaurant shot. It appears to trigger on prompts containing reflective or low-key
language. `declined_preset_id` clears it. Two hijacks in two video batches: **treat this as routine
and always check `submitted_count`.**
