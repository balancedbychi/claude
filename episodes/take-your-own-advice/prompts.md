# "Take Your Own Advice" (Episode 12): production notes and prompts

Read `script.md` first: it has the story, the floor plan, the locked start-frame stills and the beat-by-beat. This file holds what's sent to Seedance 2.5, one clip at a time. Each clip is filmed only after the one before it is approved (rule 9). From Clip 02 on, each prompt attaches the approved clip before it as a video reference (rule 7).

## CUT LIST

| # | Scene | Job ID | Length | Resolution | Credits | Status |
|---|---|---|---|---|---|---|
| 01 | The Morning After | `b8403218-ae10-4a40-9e69-c6edbbad68e0` | 12 s | 720p | 84 | Rendering |
| 02 | Penciled In | — | 14 s | 720p | ~98 | — |
| 03 | Rented | — | 15 s | 720p | ~105 | — |
| 04 | Asking For More | — | 13 s | 720p | ~91 | — |
| 05 | Take Your Own Advice | — | 16 s | 720p | ~112 | — |
| 06 | Both Phones | — | 10 s | 720p | ~70 | — |

## Settings (every clip)

| Setting | Value |
|---|---|
| Model | `seedance_2_5`, `mode: omni_reference` (required with any attached media), `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612` |
| Aspect · resolution | 9:16 · **720p** |
| Audio | `generate_audio: true` |
| Start image | That clip's **locked still** (`script.md`, start-frame stills), role `start_image` |
| Video reference | Clip 01: none. Clips 02–06: the approved clip before, role `video_references` |
| Cost | 7 credits a second |

## Elements (every clip)

| Tag | Element | ID |
|---|---|---|
| `[Kitchen]` | ChiChi-Kitchen-Day | `37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca` |
| `[ChiChi-TYOA]` | ChiChi-Face · ChiChi-Body · ChiChi-Take-Your-Own-Advice-Look | `b03240bd-4562-4d2f-8b14-de32c018e346` · `46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc` · `759bc585-b31a-4dd0-b17a-1423c7db83ff` |
| ChiChi's voice | ChiChi-Canon-Voice-v1 | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |
| `[Nia-TYOA]` | Nia-Face · Nia-Take-Your-Own-Advice-Look (no Nia-Body) | `3497a052-ed61-4fbc-babe-c9f7fc11bf77` · `9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f` |
| Nia's voice | Nia-Canon-Voice-v2 | `b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c` |

## Risks and guards

| Risk | Guard in the prompt |
|---|---|
| The counter changing shape (user, stills review) | Start image = the locked still; "the island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot." |
| Chi's body drifting, short arms (user, stills review) | "the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct." |
| Nia's build | Slim-thick written out in full; no Nia-Body image (it pushes her heavier). |
| Nia sounding American / ChiChi sounding British | Both saved voices, plus "NIA IS BRITISH… never American" and "ChiChi is AMERICAN… NEVER British". |
| Pauses (user, Ep11) | "NO PAUSES. NO DEAD AIR"; reactions happen while someone speaks; end on the last line. |
| Broken speech (user, Ep11) | "smooth, fluent, continuous sentences… no stutters". |
| Swapped sides | ChiChi always frame LEFT standing; Nia always frame RIGHT seated. |
| Rings, phone screens, text | Stated in every prompt. |

---

## CLIP 01 · "The Morning After" · 12 s · 84 credits · v1 (job `b8403218`)

**First line:** Nia's "So? How was the lawyer?" **Final line:** Nia's "Oh."
**Timing change from the script:** 12 s instead of 14 s. Five short lines run about 9–10 s, and at 14 s the end would have sat in silence after "Oh." (your no-pauses rule).
**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 12`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `medias: [{role: start_image, value: 6ba334b6-b6e2-4675-9e99-904c956bcd0e}]` (Still 01, the master plate). Note: Higgsfield echoed the still back as a reference image; check that the clip opens on it.

```
12 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, catch up over coffee the morning after a date. Wholesome, fully clothed.

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with Nia already starting her first line and ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as the start image shows: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller bust; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: a glass French press of coffee, two white mugs, Nia's smartphone in a beige-tan case lying FACE-DOWN by her right hand, ChiChi's smartphone in a plain cream case lying FACE-DOWN by the French press. Nobody touches either phone in this clip.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi is pouring coffee from the French press into the second mug; Nia sits with her chin on her hand, eager, already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-2 s) Two-shot. ChiChi finishes pouring and sets the French press down WHILE Nia asks, chin on her hand, eager.
  NIA (British), eager: "So? How was the lawyer?"
2. (2-3.5 s) Waist-up on ChiChi over Nia's left shoulder. She slides the full mug across the marble toward Nia AS she answers, no gap.
  CHICHI (American), easy: "He wants a child."
3. (3.5-5 s) Waist-up on Nia past ChiChi's right edge. She sits bolt upright, delighted, both hands up, and speaks immediately.
  NIA (British), thrilled: "Chi! That's brilliant—"
4. (5-9.5 s) Waist-up on ChiChi. She cuts straight in over the end of Nia's line, dry, lifting her own mug.
  CHICHI (American), dry: "And work is just as important as love. His words."
5. (9.5-12 s) Two-shot. ChiChi sips her coffee, eyebrows up; AS she sips, Nia's hands drop and she deflates on the stool, wrapping both hands around her mug, and says it straight away.
  NIA (British), deflating: "Oh."
  END on this line: ChiChi with her mug at her lips, Nia slumped slightly holding her mug. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "So? How was the lawyer?" = NIA. "He wants a child." = CHICHI. "Chi! That's brilliant—" = NIA. "And work is just as important as love. His words." = CHICHI. "Oh." = NIA. Only these five lines, in this order, each said once.

VOICES, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural posture and weight, five-finger hands, coffee pours and the mug slides naturally across the marble, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these five lines, plus soft morning kitchen room tone, the pour of coffee and the light clink of a mug on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```
