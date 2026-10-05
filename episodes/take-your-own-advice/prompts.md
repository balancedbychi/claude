# "Take Your Own Advice" (Episode 12): production notes and prompts

Read `script.md` first: it has the story, the floor plan, the locked start-frame stills and the beat-by-beat. This file holds what's sent to Seedance 2.5, one clip at a time. Each clip is filmed only after the one before it is approved (rule 9). From Clip 02 on, each prompt attaches the approved clip before it as a video reference (rule 7).

## CUT LIST

| # | Scene | Job ID | Length | Resolution | Credits | Status |
|---|---|---|---|---|---|---|
| 01 | The Morning After | `b8403218-ae10-4a40-9e69-c6edbbad68e0` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_032038_b8403218-ae10-4a40-9e69-c6edbbad68e0.mp4)) | 12 s | 720p | 84 | **Approved** (one glitch: a mug was already in front of Nia and the slid mug looked like it passed through it) |
| 02 | Penciled In | `5839271e-0198-4488-b7bc-f647e98c5338` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_032900_5839271e-0198-4488-b7bc-f647e98c5338.mp4)) | 12 s | 720p | 84 | **Approved** (one flaw: Chi said "calendar invoit" instead of "invite") |
| 03 | Rented | `303380c4-6691-487f-ac66-ddc85c2bb871` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_033519_303380c4-6691-487f-ac66-ddc85c2bb871.mp4)) | 11 s | 720p | 77 | Ready for review |
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
| A mug passing through another mug (user, Clip 01) | "EXACTLY TWO white mugs in the whole clip… NO THIRD MUG… never duplicates, never merges with or passes through" anything. |
| Mispronounced words (user, Clip 02: "invoit" for "invite") | From Clip 03 on, every prompt has a PRONUNCIATION block: "every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced", plus phonetic spellings for the clip's names and any risky words. |
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

---

## CLIP 02 · "Penciled In" · 12 s · 84 credits · v1 (job `5839271e`)

**First line:** Nia's "At least he was honest." **Final line:** Nia's "Fair."
**Beat check:** Clip 01 ends with Chi's mug at her lips and Nia holding hers. Still 02 opens with Chi lowering her mug and Nia holding hers in both hands, so they match. Clip 02 ends with Chi's palms on the marble and Nia's hand by her phone, which leads into Still 03 (Chi palms on the marble, Nia's finger on her phone).
**Timing change:** 12 s instead of 14 s, to avoid dead air after "Fair."
**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 12`, 9:16, 720p, audio on, `medias: [{role: start_image, value: dd31ff10-8dab-4d7b-a944-7620330e0a36} (locked Still 02), {role: video_references, value: b8403218-ae10-4a40-9e69-c6edbbad68e0} (approved Clip 01)]`.

```
12 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is Nia's "At least he was honest."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with Nia already starting her first line and ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller bust; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: a glass French press of coffee resting on the island, and EXACTLY TWO white mugs in the whole clip: ChiChi's mug, in ChiChi's hand, and Nia's mug, in Nia's hands. NO THIRD MUG ever appears. Each mug is one solid object: it never duplicates, never merges with or passes through another mug, the French press, a phone, a hand or the counter. Nia's smartphone in a beige-tan case lies FACE-DOWN by her right hand; ChiChi's smartphone in a plain cream case lies FACE-DOWN by the French press. Nobody touches either phone in this clip.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi is lowering her mug from her lips, calm and dry; Nia holds her mug in both hands on the island, looking at ChiChi with gentle sympathy, already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-2 s) Waist-up on Nia past ChiChi's right edge. Gentle, trying to find the bright side, her mug in both hands.
  NIA (British), gentle: "At least he was honest."
2. (2-4 s) Waist-up on ChiChi over Nia's left shoulder. A small nod as she answers, no gap, her mug in her hand.
  CHICHI (American), even: "He was. I asked him straight out."
3. (4-5.5 s) Waist-up on Nia. Head tilted, straight back at her.
  NIA (British): "So what's the problem?"
4. (5.5-10.5 s) Waist-up on ChiChi. She sets her mug down on the marble WHILE she speaks, calm and certain, in one smooth, unbroken delivery.
  CHICHI (American), calm and certain: "I don't want to be penciled in, Nia. I've waited too long to be a calendar invite."
  (She says the name "Nia" as "NEE-uh".)
5. (10.5-12 s) Two-shot. ChiChi rests both palms flat on the marble, leaning slightly; AS she does, Nia gives a sympathetic wince and a nod and sets her mug down on the island beside her phone, saying it straight away.
  NIA (British), sympathetic: "Fair."
  END on this line: ChiChi with her palms on the marble, leaning slightly; Nia's mug on the island, her right hand resting near her face-down phone. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "At least he was honest." = NIA. "He was. I asked him straight out." = CHICHI. "So what's the problem?" = NIA. "I don't want to be penciled in, Nia. I've waited too long to be a calendar invite." = CHICHI. "Fair." = NIA. Only these five lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural posture and weight, five-finger hands, mugs are set down naturally as single solid objects, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these five lines, plus the same soft morning kitchen room tone as the reference video and the light clink of mugs on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 03 · "Rented" · 11 s · 77 credits · v1 (job `303380c4`)

**First line:** ChiChi's "Your turn. You haven't put that phone down since you walked in." **Final line:** Nia's "As a joke!"
**Beat check:**
- **Into Clip 03:** Clip 02 ends with Chi's palms on the marble and Nia's hand by her phone. Still 03 opens with Chi's palms on the marble and Nia's finger on her phone, so they match.
- **Fixed in the script:** it said Nia "turns the phone face-down", but it has been face-down since Clip 01. She now slides it away with one finger instead.
- **Out of Clip 03:** it ends with Chi's arms folded and Nia's hands half up. Still 04 opens with Chi leaning in and Nia's hands lowering to her mug.

**New:** a PRONUNCIATION block, prompted by your Clip 02 note ("invoit").
**Request:** `duration: 11`, 9:16, 720p, `medias: [{start_image: 7ff1b264-f80f-4ba1-9d27-072f82e67067} (locked Still 03), {video_references: 5839271e-0198-4488-b7bc-f647e98c5338} (approved Clip 02)]`.

```
11 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "Your turn. You haven't put that phone down since you walked in."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with ChiChi already starting her first line and ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "Tay" = TAY, one syllable, rhymes with "day". "rented" = REN-tid. "Rented?" = REN-tid, rising. "Nia" = NEE-uh, rhymes with "Mia", never "Naya" or "Nye-uh". "phone" = FOHN. "joke" = JOHK. "walked" = WAWKT.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller bust; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: a glass French press of coffee resting on the island, and EXACTLY TWO white mugs in the whole clip, both resting on the marble: ChiChi's in front of her and Nia's beside Nia's phone. NO THIRD MUG ever appears. Each mug and phone is one solid object: it never duplicates, never merges with or passes through another object, a hand or the counter. Nia's smartphone in a beige-tan case lies FACE-DOWN on the marble by her right hand the whole time; it is never turned over and its screen is never seen. ChiChi's smartphone in a plain cream case lies FACE-DOWN by the French press; nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi stands with both palms flat on the marble, leaning slightly, nodding toward Nia's phone with a knowing, teasing look; Nia glances down at her face-down phone, one finger resting on it, caught. ChiChi is already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-3 s) Waist-up on ChiChi over Nia's left shoulder. Palms on the marble, she nods at the phone, knowing and teasing.
  CHICHI (American), teasing: "Your turn. You haven't put that phone down since you walked in."
2. (3-5.5 s) Waist-up on Nia past ChiChi's right edge. With one finger she slides her face-down phone a few inches away from herself across the marble, as if to prove a point, AS she answers. It stays face-down.
  NIA (British), a little too casual: "Tay says he doesn't want to be rented."
3. (5.5-6.5 s) Waist-up on ChiChi. A surprised laugh runs straight INTO the word.
  CHICHI (American), amused: "Rented?"
4. (6.5-8.5 s) Waist-up on Nia. A sideways look, sheepish, lips pressed in a guilty half smile.
  NIA (British), sheepish: "I might have said it first."
5. (8.5-9.5 s) Waist-up on ChiChi. Flat, the big-sister look, eyebrows up.
  CHICHI (American), flat: "Nia."  (said "NEE-uh")
6. (9.5-11 s) Two-shot. ChiChi folds her arms, not buying it; AS she does, Nia throws both hands up, protesting, and says it straight away.
  NIA (British), protesting: "As a joke!"
  END on this line: ChiChi with her arms folded; Nia with her hands still half up. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Your turn. You haven't put that phone down since you walked in." = CHICHI. "Tay says he doesn't want to be rented." = NIA. "Rented?" = CHICHI. "I might have said it first." = NIA. "Nia." = CHICHI. "As a joke!" = NIA. Only these six lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural posture and weight, five-finger hands, the phone slides naturally across the marble and stays face-down, mugs stay put as single solid objects, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these six lines, plus the same soft morning kitchen room tone as the reference video and the soft slide of the phone on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```
