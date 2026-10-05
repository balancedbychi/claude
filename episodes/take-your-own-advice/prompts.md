# "Take Your Own Advice" (Episode 12): production notes and prompts

Read `script.md` first: it has the story, the floor plan, the locked start-frame stills and the beat-by-beat. This file holds what's sent to Seedance 2.5, one clip at a time. Each clip is filmed only after the one before it is approved (rule 9). From Clip 02 on, each prompt attaches the approved clip before it as a video reference (rule 7).

## CUT LIST

| # | Scene | Job ID | Length | Resolution | Credits | Status |
|---|---|---|---|---|---|---|
| 01 | The Morning After | `b8403218-ae10-4a40-9e69-c6edbbad68e0` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_032038_b8403218-ae10-4a40-9e69-c6edbbad68e0.mp4)) | 12 s | 720p | 84 | **Approved** (one glitch: a mug was already in front of Nia and the slid mug looked like it passed through it) |
| 02 | Penciled In | `5839271e-0198-4488-b7bc-f647e98c5338` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_032900_5839271e-0198-4488-b7bc-f647e98c5338.mp4)) | 12 s | 720p | 84 | **Approved** (one flaw: Chi said "calendar invoit" instead of "invite") |
| 03 | Rented | `303380c4-6691-487f-ac66-ddc85c2bb871` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_033519_303380c4-6691-487f-ac66-ddc85c2bb871.mp4)) | 11 s | 720p | 77 | **Approved** |
| 04 | Asking For More | `38da786f-ca7a-43d7-92ee-daf4360f2a01` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_041820_38da786f-ca7a-43d7-92ee-daf4360f2a01.mp4)) (v3; three earlier attempts failed and were refunded) | 10 s | 720p | 70 | **Rejected**: a phantom coffee pot flies across the screen. Nothing in the script moves it. |
| 04 v4 | Asking For More | `2c7c87de-97ab-4a5c-95f7-50e41ba15c56` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_042609_2c7c87de-97ab-4a5c-95f7-50e41ba15c56.mp4)) | 10 s | 720p | 70 | **Approved** |
| 05 | Take Your Own Advice | `f57c5a80-9ee7-4af7-9cf0-66f8333fd4dc` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_044040_f57c5a80-9ee7-4af7-9cf0-66f8333fd4dc.mp4)) | 13 s | 720p | 91 | **Approved** |
| 06 | Both Phones | `68a8a8a6-a26c-4198-a29d-851380d1e329` ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_044853_68a8a8a6-a26c-4198-a29d-851380d1e329.mp4)) | 9 s | 720p | 63 | Ready for review |

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
| A prop moving by itself (Clip 04 v3: a phantom flying coffee pot) | Props not in the action are "LOCKED IN PLACE… exactly where it is in the start image… NEVER moves, lifts, slides, tips, floats or flies"; "objects move ONLY when a hand is holding them"; name exactly whose object each hand holds; never two pickups at once. |
| Fast failures on the content check (Clip 04, three attempts refunded) | Avoid words a filter could misread: no "busted" (alongside the body descriptions), no ages written as numerals. Nia's build now says "a fuller chest". |
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

---

## CLIP 04 · "Asking For More" · 10 s · 70 credits · v1 (job `d1a812e6`; first try `9828303b` failed with no reason given and was resubmitted unchanged)

**First line:** ChiChi's "He's twenty-five and he's asking for more…" **Final line:** ChiChi's "Nobody asked you to compare."
**Beat check:**
- **Into Clip 04:** Clip 03 ends with Chi's arms folded and Nia's hands half up. Still 04 opens with Chi leaning in on her forearms and Nia's hands lowering to her mug.
- **Out of Clip 04 (changed in the script):** on "compare", Chi now straightens up and picks up her mug. That matches Still 05, where she's upright with her mug in her right hand. Nia's sip happens while Chi speaks.

**Timing:** 10 s instead of 13 s. Three lines run about 8.5 s.
**Request:** `duration: 10`, 9:16, 720p, `medias: [{start_image: abec9f0f-ac77-43b4-83b2-40df2f448078} (locked Still 04), {video_references: 303380c4-6691-487f-ac66-ddc85c2bb871} (approved Clip 03)]`.

```
10 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "He's twenty-five and he's asking for more."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with ChiChi already starting her first line and ends on the last spoken line. Nia's sip happens WHILE ChiChi is speaking, never after. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "twenty-five" = TWEN-tee FIVE, the number 25, said clearly. "asking" = AS-king. "more" and "less" clearly stressed. "Dorian" = DOR-ee-un, three syllables, a man's name. "compare" = kum-PAIR. "Nobody" = NOH-bod-ee.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller bust; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: a glass French press of coffee resting on the island, and EXACTLY TWO white mugs in the whole clip: ChiChi's mug resting on the marble in front of her until she picks it up, and Nia's mug on the marble beside Nia's phone until she lifts it to sip. NO THIRD MUG ever appears. Each mug and phone is one solid object: it never duplicates, never merges with or passes through another object, a hand or the counter. Nia's smartphone in a beige-tan case lies FACE-DOWN on the marble the whole time; nobody touches it. ChiChi's smartphone in a plain cream case lies FACE-DOWN by the French press; nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi leans in on her forearms on the marble, sincere and warm, already starting her first line; Nia's hands are lowering to her mug on the island, listening, slightly guarded.

THE CLIP, SHOT BY SHOT:
1. (0-4.5 s) Waist-up on ChiChi over Nia's left shoulder. Leaning in on her forearms, sincere, in one smooth, unbroken delivery.
  CHICHI (American), sincere: "He's twenty-five and he's asking for more. Most men his age are asking for less."
2. (4.5-6.5 s) Waist-up on Nia past ChiChi's right edge. She looks sideways out of the window, deflecting, both hands around her mug on the marble, and answers straight away.
  NIA (British), deflecting: "He's not exactly Dorian."
3. (6.5-10 s) Two-shot. ChiChi straightens up and picks up her mug in her right hand, her left hand resting on the marble, one eyebrow up, AS she says it; WHILE she says it, Nia, busted, lifts her mug and hides behind a sip, eyes on ChiChi over the rim.
  CHICHI (American), one eyebrow up: "Nobody asked you to compare."
  END on this line: ChiChi upright, mug in her right hand, left hand on the marble, eyebrow still up; Nia with her mug at her lips, eyes on ChiChi over the rim. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "He's twenty-five and he's asking for more. Most men his age are asking for less." = CHICHI. "He's not exactly Dorian." = NIA. "Nobody asked you to compare." = CHICHI. Only these three lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural posture and weight, five-finger hands, ChiChi's arms full length as she straightens up, each mug lifted naturally as a single solid object, the phones stay face-down and still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these three lines, plus the same soft morning kitchen room tone as the reference video and the light clink of a mug lifted from marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

### Clip 04 v2: no start image (job `43abe300`)

**Why:** the request with Still 04 (`abec9f0f`) as `start_image` failed twice in a row. Clips 01–03 each worked with their own stills, so Still 04 is the likely cause. v2 attaches only the approved Clip 03 as the video reference. The prompt's START IMAGE paragraph is replaced with one line keeping the island rigid "exactly as in the reference video", and the FIRST FRAME now describes the pose in words. Everything else is unchanged.
**Request:** `duration: 10`, 9:16, 720p, `medias: [{video_references: 303380c4-6691-487f-ac66-ddc85c2bb871}]`.

```
10 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "He's twenty-five and he's asking for more."

CONTINUITY: the kitchen island is a rigid fixed object exactly as in the reference video: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with ChiChi already starting her first line and ends on the last spoken line. Nia's sip happens WHILE ChiChi is speaking, never after. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "twenty-five" = TWEN-tee FIVE, the number 25, said clearly. "asking" = AS-king. "more" and "less" clearly stressed. "Dorian" = DOR-ee-un, three syllables, a man's name. "compare" = kum-PAIR. "Nobody" = NOH-bod-ee.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the reference video in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller bust; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: a glass French press of coffee resting on the island, and EXACTLY TWO white mugs in the whole clip: ChiChi's mug resting on the marble in front of her until she picks it up, and Nia's mug on the marble beside Nia's phone until she lifts it to sip. NO THIRD MUG ever appears. Each mug and phone is one solid object: it never duplicates, never merges with or passes through another object, a hand or the counter. Nia's smartphone in a beige-tan case lies FACE-DOWN on the marble the whole time; nobody touches it. ChiChi's smartphone in a plain cream case lies FACE-DOWN by the French press; nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: a medium-wide two-shot from the dining end, the same framing as the reference video's two-shot. ChiChi leans in on her forearms on the marble, sincere and warm, already starting her first line; Nia's hands are lowering to her mug on the island, listening, slightly guarded.

THE CLIP, SHOT BY SHOT:
1. (0-4.5 s) Waist-up on ChiChi over Nia's left shoulder. Leaning in on her forearms, sincere, in one smooth, unbroken delivery.
  CHICHI (American), sincere: "He's twenty-five and he's asking for more. Most men his age are asking for less."
2. (4.5-6.5 s) Waist-up on Nia past ChiChi's right edge. She looks sideways out of the window, deflecting, both hands around her mug on the marble, and answers straight away.
  NIA (British), deflecting: "He's not exactly Dorian."
3. (6.5-10 s) Two-shot. ChiChi straightens up and picks up her mug in her right hand, her left hand resting on the marble, one eyebrow up, AS she says it; WHILE she says it, Nia, busted, lifts her mug and hides behind a sip, eyes on ChiChi over the rim.
  CHICHI (American), one eyebrow up: "Nobody asked you to compare."
  END on this line: ChiChi upright, mug in her right hand, left hand on the marble, eyebrow still up; Nia with her mug at her lips, eyes on ChiChi over the rim. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "He's twenty-five and he's asking for more. Most men his age are asking for less." = CHICHI. "He's not exactly Dorian." = NIA. "Nobody asked you to compare." = CHICHI. Only these three lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural posture and weight, five-finger hands, ChiChi's arms full length as she straightens up, each mug lifted naturally as a single solid object, the phones stay face-down and still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these three lines, plus the same soft morning kitchen room tone as the reference video and the light clink of a mug lifted from marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

### Clip 04 v3: reworded, start image back (job `38da786f`)

**Why:** v2 (`43abe300`) also failed within about a minute, even without the start image, so the still wasn't the cause. All three failures were refunded (balance 617.89; three 70-credit refunds). A failure that fast, with the same text every time, points to the content check on the prompt. Compared with Clip 03's prompt, the new words were "busted" (next to "fuller bust" in Nia's build) and "the number 25". v3 changes only those: "busted" becomes "caught out", Nia's build says "a fuller chest", and "the number 25, said clearly" is dropped. Still 04 is back as the start image.
**Request:** as v1: `medias: [{start_image: abec9f0f-…} (Still 04), {video_references: 303380c4-…} (Clip 03)]`.

### Clip 04 v4: French press locked, one pickup at a time (job `2c7c87de`)

**Why:** in v3 (`38da786f`) a phantom coffee pot flew across the screen (user review). The script never moves it; it was only listed as resting on the island. The likely cause was both women grabbing mugs in the same 3.5 s beside the French press. **Changes from v3:**
1. The French press is LOCKED: "exactly where it is in the start image… NEVER moves, lifts, slides, tips, floats or flies".
2. Chi picks up *her own white mug* off camera during Nia's line, so in the final two-shot only Nia's mug moves.
3. Physics: "objects move ONLY when a hand is holding them". Nothing is thrown or falls.

Everything else is as v3, including the wording that passes the content check.
**Request:** `medias: [{start_image: abec9f0f-…} (Still 04), {video_references: 303380c4-…} (Clip 03)]`, 10 s, 720p.

```
10 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "He's twenty-five and he's asking for more."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with ChiChi already starting her first line and ends on the last spoken line. Nia's sip happens WHILE ChiChi is speaking, never after. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "twenty-five" = TWEN-tee FIVE. "asking" = AS-king. "more" and "less" clearly stressed. "Dorian" = DOR-ee-un, three syllables, a man's name. "compare" = kum-PAIR. "Nobody" = NOH-bod-ee.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND, LOCKED IN PLACE: the glass French press of coffee stands on the island EXACTLY where it is in the start image, and it is a FIXED, STATIONARY object for the whole clip: NOBODY touches it, it NEVER moves, lifts, slides, tips, floats or flies, and it never leaves its spot. There are EXACTLY TWO white mugs in the whole clip and they are the ONLY objects that move: ChiChi's white mug and Nia's white mug. NO THIRD MUG, no extra pot, jug, cup or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nia's smartphone in a beige-tan case lies FACE-DOWN on the marble the whole time; nobody touches it. ChiChi's smartphone in a plain cream case lies FACE-DOWN on the marble; nobody touches it. Nothing is thrown, tossed or falls.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. The French press stands exactly where the start image shows it. ChiChi leans in on her forearms on the marble, sincere and warm, already starting her first line; Nia's hands are lowering to her mug on the island, listening, slightly guarded.

THE CLIP, SHOT BY SHOT:
1. (0-4.5 s) Waist-up on ChiChi over Nia's left shoulder. Leaning in on her forearms, sincere, in one smooth, unbroken delivery. Her hands rest on the marble; she holds nothing.
  CHICHI (American), sincere: "He's twenty-five and he's asking for more. Most men his age are asking for less."
2. (4.5-6.5 s) Waist-up on Nia past ChiChi's right edge. She looks sideways out of the window, deflecting, both hands around her own white mug on the marble, and answers straight away. (Off camera, ChiChi straightens up and picks up HER OWN WHITE MUG with her right hand.)
  NIA (British), deflecting: "He's not exactly Dorian."
3. (6.5-10 s) Two-shot. ChiChi is ALREADY standing upright holding her own white mug in her right hand, her left hand resting flat on the marble; the French press stands untouched exactly where it started. One eyebrow up, she says it; WHILE she says it, Nia, caught out, lifts her own white mug to her lips and hides behind a sip, eyes on ChiChi over the rim. Only Nia's mug moves in this shot.
  CHICHI (American), one eyebrow up: "Nobody asked you to compare."
  END on this line: ChiChi upright, white mug in her right hand, left hand on the marble, eyebrow still up; Nia with her white mug at her lips, eyes on ChiChi over the rim; the French press exactly where it started. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "He's twenty-five and he's asking for more. Most men his age are asking for less." = CHICHI. "He's not exactly Dorian." = NIA. "Nobody asked you to compare." = CHICHI. Only these three lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them. Natural posture and weight, five-finger hands, ChiChi's arms full length, each mug lifted naturally as a single solid object, the French press and both phones stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these three lines, plus the same soft morning kitchen room tone as the reference video and the light clink of a mug lifted from marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 05 · "Take Your Own Advice" · 13 s · 91 credits · v1 (job `f57c5a80`)

**First line:** Nia's "Hold on. You want me to give Tay a chance, but you won't give DB one?" **Final line:** Nia's "I'm always right. I just never listen to myself."
**Beat check:**
- **Into Clip 05:** Clip 04 v4 ends with Chi upright, mug in her right hand, and Nia's mug at her lips. Still 05 opens with Chi upright holding her mug and Nia setting hers down to point, so they match.
- **Props:** one mug moves at a time. Nia sets hers down at the start; Chi sets hers down on "I hate when you do that." Nobody picks a mug up. The French press and both phones stay exactly where they are in the start image.
- **Out of Clip 05:** both mugs are down and both phones face-down, which matches Still 06 (both smiling, phones face-down).

**Timing:** 13 s instead of 16 s.
**Pronunciation:** Tay, DB ("DEE-BEE"), different, listen (silent t).
**Request:** `duration: 13`, 9:16, 720p, `medias: [{start_image: e0825511-f01a-41c4-83a2-dc86c6d517b7} (locked Still 05), {video_references: 2c7c87de-97ab-4a5c-95f7-50e41ba15c56} (approved Clip 04 v4)]`.

```
13 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is Nia's "Hold on. You want me to give Tay a chance, but you won't give DB one?"

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with Nia already starting her first line and ends on the last spoken line. ChiChi's laugh runs straight INTO her line, never before it. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "Tay" = TAY, one syllable, rhymes with "day". "DB" = DEE-BEE, two separate letters, a man's initials. "different" = DIF-rent. "listen" = LISS-en, silent t. "myself" = my-SELF. "chance" = CHANCE.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND, LOCKED IN PLACE: the glass French press of coffee stands on the island EXACTLY where it is in the start image, and it is a FIXED, STATIONARY object for the whole clip: NOBODY touches it, it NEVER moves, lifts, slides, tips, floats or flies, and it never leaves its spot. There are EXACTLY TWO white mugs in the whole clip and they are the ONLY objects that move, ONE AT A TIME: first Nia sets HER OWN white mug down on the marble; later ChiChi sets HER OWN white mug down on the marble. Nobody picks a mug up in this clip. NO THIRD MUG, no extra pot, jug, cup or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nia's smartphone in a beige-tan case and ChiChi's smartphone in a plain cream case each lie FACE-DOWN on the marble EXACTLY where they are in the start image, the whole time; nobody touches either phone. Nothing is thrown, tossed or falls.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. The French press stands exactly where the start image shows it. ChiChi stands upright holding her own white mug in her right hand, her left hand flat on the marble, eyebrows raised in a slightly smug look; Nia is setting her own white mug down on the marble with one hand and starting to point at ChiChi with the other, already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-4.5 s) Waist-up on Nia past ChiChi's right edge. She finishes setting her mug down and points at ChiChi AS she speaks, sharp and knowing, in one smooth, unbroken delivery.
  NIA (British), turning the tables: "Hold on. You want me to give Tay a chance, but you won't give DB one?"
2. (4.5-6 s) Waist-up on ChiChi over Nia's left shoulder. Straight back, too fast, still holding her mug.
  CHICHI (American), too quick: "That's different."
3. (6-7 s) Waist-up on Nia. One eyebrow up, deadpan, her hands now resting on the marble.
  NIA (British), deadpan: "Is it?"
4. (7-9.5 s) Waist-up on ChiChi. Caught. A laugh breaks out of her despite herself and runs straight into her line; shaking her head, she sets her own white mug down on the marble AS she says it.
  CHICHI (American), laughing: "I hate when you do that."
5. (9.5-13 s) Two-shot. ChiChi, still smiling, shakes her head, both hands now resting on the marble; Nia, dry and smug on the first sentence, then softer and rueful on the second, says it straight away.
  NIA (British), smug then soft: "I'm always right. I just never listen to myself."
  END on this line: ChiChi smiling warmly at her friend; Nia with a small, rueful smile; both mugs resting on the marble, both phones face-down, the French press exactly where it started. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Hold on. You want me to give Tay a chance, but you won't give DB one?" = NIA. "That's different." = CHICHI. "Is it?" = NIA. "I hate when you do that." = CHICHI. "I'm always right. I just never listen to myself." = NIA. Only these five lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them. Natural posture and weight, five-finger hands, ChiChi's arms full length, each mug set down naturally as a single solid object, the French press and both phones stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these five lines and ChiChi's short natural laugh, plus the same soft morning kitchen room tone as the reference video and the light clink of mugs set on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 06 · "Both Phones" · 9 s · 63 credits · v1 (job `68a8a8a6`)

**First line:** Nia's "It's Tay." (after the phones buzz). **Final line:** ChiChi's "You first."
**Beat check:**
- **Into Clip 06:** Clip 05 ends with both women smiling, both mugs down and both phones face-down. Still 06 opens on the same.
- **Props:** the phones are picked up one at a time, each by its owner (Nia, then Chi). The mugs and the French press are locked. The phones vibrate in place on the buzz without sliding.
- **Screens:** the screens face the women. The camera only sees the backs of the cases, so no text is ever shown.

**Timing:** 9 s instead of 10.
**Request:** `duration: 9`, 9:16, 720p, `medias: [{start_image: d9d558ee-8768-4a88-a0c6-293e1398f355} (locked Still 06), {video_references: f57c5a80-9ee7-4af7-9cf0-66f8333fd4dc} (approved Clip 05)]`.

```
9 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. This clip opens with BOTH PHONES BUZZING; the FIRST line of this clip is Nia's "It's Tay."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The phones buzz in the very first second and Nia's first line starts by 1.5 seconds; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "Tay" = TAY, one syllable, rhymes with "day". "DB" = DEE-BEE, two separate letters, a man's initials. "dare" = DAIR. "first" = FURST.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

PROPS ON THE ISLAND: the glass French press and BOTH white mugs stand on the island EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: NOBODY touches them, they NEVER move, lift, slide, tip, float or fly. The ONLY objects that move are the two phones, ONE AT A TIME, each picked up only by its owner: first Nia picks up HER OWN smartphone in a beige-tan case; then ChiChi picks up HER OWN smartphone in a plain cream case. Before that, both phones lie FACE-DOWN on the marble exactly where they are in the start image. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: each woman holds her phone with the screen facing HERSELF; the camera only ever sees the BACK of each phone case. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi smiles warmly at Nia; Nia has a small, rueful smile; both mugs and both face-down phones rest on the marble exactly as the start image shows, the French press exactly where it stands.

THE CLIP, SHOT BY SHOT:
1. (0-1.5 s) Two-shot. BOTH phones buzz at the same moment: one short soft buzz each and a small visible vibration on the marble. Both women glance down at their own phones at once. No words.
2. (1.5-3.5 s) Two-shot. Nia picks up HER OWN beige-tan phone and tilts the screen toward herself, the back of the case to the camera, and reads it AS she says:
  NIA (British), reading: "It's Tay."
3. (3.5-5 s) Waist-up on ChiChi over Nia's left shoulder. ChiChi picks up HER OWN cream-case phone, screen toward herself, the back of the case to the camera, and reads it straight away.
  CHICHI (American), reading: "DB."
4. (5-7 s) Two-shot. Both look up from their phones at each other; Nia, phone still in hand, warns her AS she looks up.
  NIA (British), warning: "Don't you dare."
5. (7-9 s) Two-shot. ChiChi, already smiling, her thumb moving to her screen, answers straight away; WHILE she says it, Nia gives a guilty half smile and her thumb moves to her own screen.
  CHICHI (American), already smiling: "You first."
  END on this line: both women holding their own phones, screens toward themselves, thumbs on them, smiling at each other; mugs and French press exactly where they started. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "It's Tay." = NIA. "DB." = CHICHI. "Don't you dare." = NIA. "You first." = CHICHI. Only these four lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them (the only exception: each phone vibrates in place for its one buzz, without sliding). Natural posture and weight, five-finger hands, ChiChi's arms full length, each phone picked up naturally by its owner as a single solid object, the French press and both mugs stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: two short soft phone buzzes at the start, then only these four lines, plus the same soft morning kitchen room tone as the reference video. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```
