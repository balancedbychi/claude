# "Read Receipts" (Episode 13): production notes and prompts

Read `script.md` first: it has the story, the floor plan and the beat-by-beat. This file holds what's sent to Higgsfield: first the five start-frame stills, then the five Seedance 2.5 clips. **Nothing is generated or filmed until you say so** (rule 9). Each clip is filmed only after the one before it is approved. Clip 01 attaches Episode 12's approved Clip 06 as its video reference; from Clip 02 on, each prompt attaches the approved clip before it (rule 7).

**Status (6 Oct 2026):** STILLS MADE, FOR YOUR REVIEW (13.75 credits). No clip filmed.

## CUT LIST

| # | Scene | Job ID | Length | Resolution | Credits | Status |
|---|---|---|---|---|---|---|
| 01 | Cleared | — | 10 s | 720p | 70 | Not filmed |
| 02 | No Excuse | — | 8 s | 720p | 56 | Not filmed |
| 03 | The Launch | — | 12 s | 720p | 84 | Not filmed |
| 04 | Saturday. Yes. | — | 13 s | 720p | 91 | Not filmed |
| 05 | Can I See You Saturday? | — | 8 s | 720p | 56 | Not filmed |

**Total if every clip works first time:** 51 s, **357 credits**, plus about 15 for the five stills. Episode 12 needed one re-film (Clip 04, 70 credits), so budget about **450**.

## Settings (every clip)

| Setting | Value |
|---|---|
| Model | `seedance_2_5`, `mode: omni_reference` (required with any attached media), `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612` |
| Aspect · resolution | 9:16 · **720p** |
| Audio | `generate_audio: true` |
| Start image | That clip's **locked still** (below), role `start_image` |
| Video reference | Clip 01: Episode 12's approved Clip 06 `68a8a8a6-a26c-4198-a29d-851380d1e329`. Clips 02–05: the approved clip before, role `video_references` |
| Elements | Passed in `reference_elements` **and** each element's image in `medias` as `image_references` (the API rejects element-only requests) |
| Cost | 7 credits a second |

## Elements (every clip): the same as Episode 12

| Tag | Element | ID |
|---|---|---|
| `[Kitchen]` | ChiChi-Kitchen-Day | `37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca` |
| `[ChiChi-TYOA]` | ChiChi-Face · ChiChi-Body · ChiChi-Take-Your-Own-Advice-Look | `b03240bd-4562-4d2f-8b14-de32c018e346` · `46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc` · `759bc585-b31a-4dd0-b17a-1423c7db83ff` |
| ChiChi's voice | ChiChi-Canon-Voice-v1 | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |
| `[Nia-TYOA]` | Nia-Face · Nia-Take-Your-Own-Advice-Look (no Nia-Body) | `3497a052-ed61-4fbc-babe-c9f7fc11bf77` · `9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f` |
| Nia's voice | Nia-Canon-Voice-v2 | `b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c` |

Tay, DB and Dorian are **not** attached: they're never seen or heard.

## Risks and guards

| Risk | Guard in the prompt |
|---|---|
| **The model replays Episode 12's last line** in Clip 01 (rule 9) | Nia's first line no longer echoes it ("No. You said it, so you go."). The prompt never quotes the reference's final line and names the new first line. |
| **A man's voice reads the texts** | TEXT MESSAGES block: each woman reads her own message aloud in her own voice; no male voice, voiceover or phone audio. Headcount of two. |
| **Phone screens or text on screen** | Screens always face their reader; the camera sees only the backs of the cases; phones on the marble lie face-down. No subtitles. |
| **A prop moving by itself** (Episode 12, Clip 04 v3: a flying coffee pot) | Every prompt names the ONE object that moves at each moment and locks everything else in place. "Objects move ONLY when a hand is holding them." Never two pickups at once. |
| **The phone hand-off** (Clips 03–04) | ChiChi's right hand only, across the island corner, the back of the case to camera. Physics line allows exactly that one contact. Fallback if Clip 03 fails: ChiChi lays her hand flat over the phone in Nia's hands. |
| **Fast failures on the content check** (Episode 12, Clip 04: three refunded) | No "busted"; Nia's build says "a fuller chest"; no ages as numerals in dialogue. |
| **Mispronounced words** (Episode 12: "invoit") | PRONUNCIATION block per clip, with phonetic spellings for every name and risky word. |
| **Dead air** (your no-pauses rule) | Clip lengths are matched to the speaking time; every clip ends on a line, then "after that, silence: nobody speaks." |
| **Smiling in the wrong place** (reaction rule) | Clip 05: "NO SMILING from the buzz on", with face cues for both women. |
| Counter shape, Chi's arms, Nia's build, accents, rings, sides | Carried over word for word from Episode 12's approved prompts. |

---

## START-FRAME STILLS · GPT Image 2.5 · about 3 credits each

**Request (each still):** `model: gpt_image_2_5`, `aspect_ratio: 9:16`, `quality: high`, `resolution: 2k`, `medias: [{role: image_references, value: 6ba334b6-b6e2-4675-9e99-904c956bcd0e}]` (Episode 12's master plate, Still 01) plus the element images for `ChiChi-Face`, `ChiChi-Body`, `ChiChi-Take-Your-Own-Advice-Look`, `Nia-Face`, `Nia-Take-Your-Own-Advice-Look` and `ChiChi-Kitchen-Day`.

**Shared prompt (every still), with the pose line swapped in:**

```
Edit of the attached master plate. Keep EXACTLY the same camera position and framing (a medium-wide two-shot from the dining end), the same kitchen and every set detail, the same marble island with exactly the same shape, length, edge and position, the same bright warm morning sunlight from the windows on the right, and both women's faces, hair, bodies and clothes IDENTICAL to the master plate. Change ONLY poses, hands, what the hands hold, and expressions, as described below.

CHICHI stays on the LEFT, standing behind the island, facing RIGHT toward Nia: honey-blonde shoulder-length blowout with a deep side part on the left, warm brown skin, cheek beauty mark, full-figured, arms full length and anatomically correct, black ribbed short-sleeved top and wide-leg trousers, barefoot. NIA stays on the RIGHT, seated on the right-hand cream boucle stool, turned to face LEFT toward ChiChi: jet-black waist-length water-wave curls, diamond studs, thin gold choker, petite and slim-thick, clearly smaller than ChiChi, cream ribbed bodysuit and camel wide-leg trousers. Nothing green, no sweatshirt.

On the island: the glass French press, exactly two white mugs, the bowl of lemons and the white flowers, as in the master plate unless the pose line says a mug is held. Nia's phone is in a beige-tan case; ChiChi's is in a plain cream case. Phone screens always face their owner or the marble; the camera sees only the backs of the cases.

NO RINGS on any finger of either woman's hands; the fourth finger of the left hand is bare skin; no bracelets, no watch. Exactly two people; nobody else, no reflections of people. Five-finger hands. No text, no captions, no screens visible, no logos. Photoreal, natural skin texture.

POSE: <pose line>
```

| Still | Pose line | Job ID | Verdict |
|---|---|---|---|
| 01 | Both women hold their own phones in their hands, screens toward themselves (the camera sees only the backs of the cases), thumbs on them, smiling at each other. Both white mugs and the French press stand on the marble as in the master plate. | `183d5936-8441-4404-8b71-5607281a72b3` ([view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261006_005209_183d5936-8441-4404-8b71-5607281a72b3.png)) | **For your review** |
| 02 | ChiChi rests both hands flat on the marble either side of her cream-case phone, which lies face-down beside the French press; she looks slightly unsettled. Nia's right hand rests on her beige-tan phone, face-down on the marble; one eyebrow up, mid-word. | `d05693a5-7191-4cde-8bd9-6b82cd589b63` ([view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261006_005209_d05693a5-7191-4cde-8bd9-6b82cd589b63.png)) | **For your review** |
| 03 | ChiChi holds her white mug in her right hand at chest height, nodding at Nia's phone. Nia is lifting her beige-tan phone, screen toward herself, looking down at it, lips just parting. ChiChi's phone lies face-down beside the French press; Nia's mug stands on the marble. | `f377b43c-cb9d-420b-abe1-e204f8e23949` ([view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261006_005210_f377b43c-cb9d-420b-abe1-e204f8e23949.png)) | **For your review** |
| 04 | ChiChi holds Nia's beige-tan phone up in her right hand, screen toward herself, eyebrows up; her own mug stands on the marble. Nia's hands are lowering from an outraged gesture, mouth closing. ChiChi's cream-case phone lies face-down beside the French press. | `773c21c0-3022-4524-9837-b7c1863afa6d` ([view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261006_005209_773c21c0-3022-4524-9837-b7c1863afa6d.png)) | **For your review** |
| 05 | Both phones lie face-down on the marble (Nia's by her right hand, ChiChi's beside the French press). Both women's hands rest empty on the marble; both have small, pleased smiles. | `3d7e0a93-4012-4926-b4d0-be5cd84f3025` ([view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261006_005210_3d7e0a93-4012-4926-b4d0-be5cd84f3025.png)) | **For your review** |

**Check each still** against Episode 12's eight-point list (sides, both faces, clothes, no rings, exactly two people, same kitchen in daylight, no text or screens, five fingers). A still that fails is remade before its clip is filmed.

---

## CLIP 01 · "Cleared" · 10 s · 70 credits · v1 (not filmed)

**First line:** Nia's "No. You said it, so you go." **Final line:** Nia's "So much for penciled in."
**Beat check:**
- **Into Clip 01:** Episode 12 Clip 06 ends with both women holding their own phones, screens toward themselves, thumbs on them, smiling; mugs and French press where they started. Still 01 opens on the same.
- **Props:** Nia lowers her phone first (0–2 s); ChiChi lays hers down later (6–7.5 s). Mugs and French press locked.
- **Out of Clip 01:** ChiChi's hands flat either side of her face-down phone; Nia's right hand resting on her face-down phone. Still 02 opens on the same.
- **Reference line:** Episode 12's last line is never quoted in this prompt (rule 9). Nia's first line was changed so it doesn't echo it.

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 10`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`, `medias: [{role: start_image, value: 183d5936-8441-4404-8b71-5607281a72b3}, {role: video_references, value: `68a8a8a6-a26c-4198-a29d-851380d1e329` (Episode 12, approved Clip 06)}, + element images as image_references]`.

```
10 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED final clip of the previous episode: this same scene, in this same kitchen, a few seconds earlier. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is Nia's "No. You said it, so you go."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. Nia's first line starts within half a second; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "Saturday" = SAT-ur-day. "completely" = kum-PLEET-lee. "cleared" = KLEERD, one syllable. "penciled" = PEN-sild. "whole" = HOLE.

TEXT MESSAGES: when a woman reads a message, SHE says it out loud in HER OWN voice, looking at her own screen. No man is ever seen or heard: no male voice, no voiceover, no phone audio. Nobody else is on a call.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

PROPS ON THE ISLAND: the glass French press and BOTH white mugs stand on the island EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: NOBODY touches them, they NEVER move, lift, slide, tip, float or fly. The ONLY objects that move are the two phones, ONE AT A TIME, each only by its owner: first Nia lowers HER OWN smartphone in a beige-tan case onto the marble, FACE-DOWN, under her right hand; later ChiChi lays HER OWN smartphone in a plain cream case FACE-DOWN on the marble beside the French press. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: whoever holds a phone holds it with the screen facing HERSELF; the camera only ever sees the BACK of each phone case, and a phone lying on the marble lies FACE-DOWN. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. Both women hold their own phones, screens toward themselves, thumbs on them, smiling at each other; both mugs and the French press stand on the marble exactly as the start image shows. Nia is already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-2 s) Two-shot. ChiChi looks up at Nia, caught. AS Nia speaks, she lowers her own phone to the marble with her right hand, face-down, and nods at ChiChi's phone.
  NIA (British), insisting, amused: "No. You said it, so you go."
2. (2-5 s) Waist-up on ChiChi over Nia's left shoulder. ChiChi looks down at her own screen and reads the message out, eyebrows rising, straight away.
  CHICHI (American), reading, surprised: "Saturday is completely cleared for you."
3. (5-6 s) Waist-up on Nia past ChiChi's right edge. She sits bolt upright, delighted, and speaks immediately.
  NIA (British), thrilled: "Cleared!"
4. (6-7.5 s) Waist-up on ChiChi. She lays her phone face-down on the marble beside the French press AS she says it.
  CHICHI (American), a little unsettled: "The whole day."
5. (7.5-10 s) Two-shot. ChiChi rests both hands flat on the marble either side of her phone, unsettled; Nia, her right hand resting on her own face-down phone, one eyebrow up, says it straight away.
  NIA (British), dry: "So much for penciled in."
  END on this line: ChiChi's hands flat on the marble either side of her face-down phone, Nia's right hand on her face-down phone, eyebrow up. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "No. You said it, so you go." = NIA. "Saturday is completely cleared for you." = CHICHI. "Cleared!" = NIA. "The whole day." = CHICHI. "So much for penciled in." = NIA. Only these five lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them. Natural posture and weight, five-finger hands, ChiChi's arms full length, ONE object moves at a time, the French press and any mug nobody is holding stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these five lines, plus the same soft morning kitchen room tone as the reference video and the light tap of each phone set down on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 02 · "No Excuse" · 8 s · 56 credits · v1 (not filmed)

**First line:** Nia's "Why do you look worried?" **Final line:** ChiChi's "Your turn. Read it."
**Beat check:**
- **Into Clip 02:** Clip 01 ends with ChiChi's hands flat either side of her phone and Nia's hand on hers. Still 02 opens on the same.
- **Props:** only ChiChi's mug moves (5.5–8 s).
- **Out of Clip 02:** ChiChi holding her mug in her right hand; Nia looking down at her phone. Still 03 opens with Nia lifting it.

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 8`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`, `medias: [{role: start_image, value: d05693a5-7191-4cde-8bd9-6b82cd589b63}, {role: video_references, value: approved Clip 01}, + element images as image_references]`.

```
8 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is Nia's "Why do you look worried?"

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. Nia's first line starts within half a second; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "worried" = WUR-eed. "excuse" = ek-SKYOOS. "turn" = TURN.

TEXT MESSAGES: when a woman reads a message, SHE says it out loud in HER OWN voice, looking at her own screen. No man is ever seen or heard: no male voice, no voiceover, no phone audio. Nobody else is on a call.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

PROPS ON THE ISLAND: the glass French press, NIA'S white mug and BOTH phones (Nia's beige-tan phone FACE-DOWN under her right hand, ChiChi's cream-case phone FACE-DOWN beside the French press) stay EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: they NEVER move, lift, slide, tip, float or fly. The ONLY object that moves is CHICHI'S OWN white mug, picked up once by ChiChi in her right hand near the end. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: whoever holds a phone holds it with the screen facing HERSELF; the camera only ever sees the BACK of each phone case, and a phone lying on the marble lies FACE-DOWN. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi rests both hands flat on the marble either side of her face-down phone; Nia's right hand rests on her face-down phone, and she is already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-1.5 s) Waist-up on Nia past ChiChi's right edge. Head tilted, reading her friend's face.
  NIA (British), curious: "Why do you look worried?"
2. (1.5-4 s) Waist-up on ChiChi over Nia's left shoulder. A short, honest laugh at herself AS she answers, no gap.
  CHICHI (American), honest: "Because now I've got no excuse."
3. (4-5.5 s) Waist-up on Nia. Flat and certain, straight away.
  NIA (British), firm: "Good. Say yes."
4. (5.5-8 s) Two-shot. ChiChi picks up her own white mug in her right hand and points it at Nia's phone AS she says it; WHILE she speaks, Nia glances down at her phone, caught.
  CHICHI (American), turning the tables: "Your turn. Read it."
  END on this line: ChiChi holding her mug in her right hand, nodding at Nia's phone; Nia looking down at the phone under her right hand. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Why do you look worried?" = NIA. "Because now I've got no excuse." = CHICHI. "Good. Say yes." = NIA. "Your turn. Read it." = CHICHI. Only these four lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them. Natural posture and weight, five-finger hands, ChiChi's arms full length, ONE object moves at a time, the French press and any mug nobody is holding stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: only these four lines, plus the same soft morning kitchen room tone as the reference video. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 03 · "The Launch" · 12 s · 84 credits · v1 (not filmed)

**First line:** Nia's "I want you next to me at my business launch this Saturday." **Final line:** ChiChi's "Absolutely not."
**Beat check:**
- **Into Clip 03:** Clip 02 ends with ChiChi's mug in her right hand and Nia looking down at her phone. Still 03 opens with Nia lifting it, screen toward herself.
- **Props:** ChiChi's mug goes down (4–6.5 s) before Nia's phone changes hands (9–12 s). Only one object moves at a time.
- **The take:** ChiChi's right hand slides the phone out of Nia's hands; the screen stays away from the camera the whole time. This is the riskiest moment in the episode. If it fails, the fallback is ChiChi laying her hand flat over the phone in Nia's hands.
- **Out of Clip 03:** ChiChi holding Nia's phone in her right hand; Nia's hands open. Still 04 opens on the same.

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 12`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`, `medias: [{role: start_image, value: f377b43c-cb9d-420b-abe1-e204f8e23949}, {role: video_references, value: approved Clip 02}, + element images as image_references]`.

```
12 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is Nia's, read from her phone, beginning "I want you next to me".

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. Nia starts reading within half a second; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "business" = BIZ-ness. "launch" = LAWNCH. "Saturday" = SAT-ur-day. "crowd" = KROWD. "snacks" = SNAKS. "Absolutely" = AB-suh-LOOT-lee.

TEXT MESSAGES: when a woman reads a message, SHE says it out loud in HER OWN voice, looking at her own screen. No man is ever seen or heard: no male voice, no voiceover, no phone audio. Nobody else is on a call.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

PROPS ON THE ISLAND: the glass French press, NIA'S white mug and CHICHI'S cream-case phone (FACE-DOWN beside the French press) stay EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: they NEVER move, lift, slide, tip, float or fly. Only TWO objects move, ONE AT A TIME: first ChiChi sets HER OWN white mug down on the marble; only after that, ChiChi takes NIA'S beige-tan phone out of Nia's hands with her right hand. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: whoever holds a phone holds it with the screen facing HERSELF; the camera only ever sees the BACK of each phone case, and a phone lying on the marble lies FACE-DOWN. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi holds her white mug in her right hand; Nia is lifting her own beige-tan phone, screen toward herself, already starting to read it out.

THE CLIP, SHOT BY SHOT:
1. (0-4 s) Waist-up on Nia past ChiChi's right edge. She reads the message off her own screen, deadpan, hiding that she is pleased.
  NIA (British), reading, deadpan: "I want you next to me at my business launch this Saturday."
2. (4-6.5 s) Waist-up on ChiChi over Nia's left shoulder. She sets her mug down on the marble AS she answers, warm and pointed, no gap.
  CHICHI (American), meaningful: "Next to him. Not in the crowd."
3. (6.5-9 s) Waist-up on Nia. Both thumbs already typing on her phone, not looking up, straight away.
  NIA (British), dry: "I'm sending 'Will there be snacks?'"
4. (9-12 s) Two-shot. ChiChi reaches across the island corner with her RIGHT hand and slides the phone out of Nia's hands, the back of the case to the camera, AS she says it; Nia's hands are left open where the phone was, mouth open, outraged.
  CHICHI (American), firm, amused: "Absolutely not."
  END on this line: ChiChi holding Nia's phone in her right hand, screen toward herself; Nia's hands still open above the island. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "I want you next to me at my business launch this Saturday." = NIA. "Next to him. Not in the crowd." = CHICHI. "I'm sending 'Will there be snacks?'" = NIA. "Absolutely not." = CHICHI. Only these four lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them (the one hand-to-hand moment: ChiChi's right hand takes the phone from Nia's hands; no other contact). Natural posture and weight, five-finger hands, ChiChi's arms full length, ONE object moves at a time, the French press and any mug nobody is holding stay perfectly still, steam rises gently from the mugs, no other physical contact between them.
AUDIO: only these four lines, plus the same soft morning kitchen room tone as the reference video, soft thumb taps on a phone screen, and the light clink of a mug set on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 04 · "Saturday. Yes." · 13 s · 91 credits · v1 (not filmed)

**First line:** ChiChi's "That's not a man who wants to rent." **Final line:** ChiChi's "'Saturday.' Sent."
**Beat check:**
- **Into Clip 04:** Clip 03 ends with ChiChi holding Nia's phone and Nia's hands open. Still 04 opens on the same, Nia's hands lowering.
- **Props:** Nia's phone goes back to her (3.5–6.5 s), she types and lays it face-down (6.5–9.5 s); only then does ChiChi pick up her own phone (9.5–13 s).
- **Out of Clip 04:** both phones face-down, both women's hands empty, small smiles. Still 05 opens on the same.

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 13`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`, `medias: [{role: start_image, value: 773c21c0-3022-4524-9837-b7c1863afa6d}, {role: video_references, value: approved Clip 03}, + element images as image_references]`.

```
13 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "That's not a man who wants to rent."

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. ChiChi's first line starts within half a second; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "rent" = RENT. "grown" = GROHN. "Nia" = NEE-uh, never "Naya". "Saturday" = SAT-ur-day. "Sent" = SENT.

TEXT MESSAGES: when a woman reads a message, SHE says it out loud in HER OWN voice, looking at her own screen. No man is ever seen or heard: no male voice, no voiceover, no phone audio. Nobody else is on a call.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

PROPS ON THE ISLAND: the glass French press and BOTH white mugs stand on the island EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: NOBODY touches them, they NEVER move, lift, slide, tip, float or fly. Only the two phones move, ONE AT A TIME: first NIA'S beige-tan phone, which ChiChi holds at the start, hands it back to Nia, and Nia lays FACE-DOWN by her right hand after typing; only after that, ChiChi picks up HER OWN cream-case phone from beside the French press, types, and lays it FACE-DOWN again in the same place. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: whoever holds a phone holds it with the screen facing HERSELF; the camera only ever sees the BACK of each phone case, and a phone lying on the marble lies FACE-DOWN. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. ChiChi holds Nia's beige-tan phone in her right hand, screen toward herself; Nia's hands are lowering from an outraged gesture. ChiChi is already starting her first line.

THE CLIP, SHOT BY SHOT:
1. (0-2.5 s) Waist-up on ChiChi over Nia's left shoulder. She holds the phone up between them, screen toward herself, eyebrows up.
  CHICHI (American), knowing: "That's not a man who wants to rent."
2. (2.5-3.5 s) Waist-up on Nia past ChiChi's right edge. She folds her arms, guarded, straight away.
  NIA (British), a warning: "Don't."
3. (3.5-6.5 s) Waist-up on ChiChi. She hands the phone back across the island corner with her right hand AS she says it, gently.
  CHICHI (American), gentle: "Then say yes, Nia. Like a grown woman."
4. (6.5-9.5 s) Waist-up on Nia. She unfolds her arms, takes the phone in her right hand, types with her thumb, deadpan, then reads her reply as she types it; then she lays the phone face-down by her right hand.
  NIA (British), deadpan: "Fine." then, reading as she types: "Yes."
5. (9.5-13 s) Two-shot. ChiChi picks up her own phone from beside the French press, types, and lays it face-down again AS she says it; WHILE she speaks, Nia watches her with a small smile, hands empty on the marble.
  CHICHI (American), proud of them both: "'Saturday.' Sent."
  END on this line: both phones face-down, both women's hands empty on the marble, ChiChi with a small proud smile, Nia smiling back. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "That's not a man who wants to rent." = CHICHI. "Don't." = NIA. "Then say yes, Nia. Like a grown woman." = CHICHI. "Fine." and "Yes." = NIA. "'Saturday.' Sent." = CHICHI. Only these lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them (the one hand-to-hand moment: ChiChi hands Nia's phone back into Nia's right hand; no other contact). Natural posture and weight, five-finger hands, ChiChi's arms full length, ONE object moves at a time, the French press and any mug nobody is holding stay perfectly still, steam rises gently from the mugs, no other physical contact between them.
AUDIO: only these lines, plus the same soft morning kitchen room tone as the reference video, soft thumb taps on phone screens, and the light tap of each phone set down on marble. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## CLIP 05 · "Can I See You Saturday?" · 8 s · 56 credits · v1 (not filmed)

**First line:** Nia's "Can I see you Saturday?" **Final line:** Nia's "Dorian."
**Beat check:**
- **Into Clip 05:** Clip 04 ends with both phones face-down and both women's hands empty, smiling. Still 05 opens on the same.
- **Props:** only Nia's phone moves. It buzzes in place without sliding, then she picks it up.
- **Expression:** from the buzz on, no smiling for either woman (reaction rule).

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 8`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`, `medias: [{role: start_image, value: 3d7e0a93-4012-4926-b4d0-be5cd84f3025}, {role: video_references, value: approved Clip 04}, + element images as image_references]`.

```
8 SECONDS. Photoreal cinematic comedy-drama, vertical 9:16, BRIGHT MORNING, a sunny modern kitchen. Two best friends, both grown women, talk over coffee the morning after a date. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI standing on the LEFT, the same woman NIA seated on the RIGHT, the same faces, bodies, hair, clothes, island, set and light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. This clip opens with NIA'S PHONE BUZZING; the FIRST line of this clip is Nia's, read from her phone, beginning "Can I see you".

START IMAGE: the clip opens EXACTLY on the attached start image: same two women, same faces, same bodies, same clothes, same kitchen island with the same shape and edge, same set, same light and same framing. It moves on from that frame. The island is a rigid fixed object: its marble top never changes shape, length or overhang in any shot.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. Nia's phone buzzes in the very first second and her first line starts by 1.5 seconds; the clip ends on the last spoken line. Nobody sits frozen or stares.

SPEECH: both women speak in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

PRONUNCIATION, EVERY WORD SAID CORRECTLY: every word is the ordinary, standard English word, said clearly and correctly, never blended, invented or mispronounced. Key words: "Saturday" = SAT-ur-day. "Dorian" = DOR-ee-un, three syllables, a man's first name.

TEXT MESSAGES: when a woman reads a message, SHE says it out loud in HER OWN voice, looking at her own screen. No man is ever seen or heard: no male voice, no voiceover, no phone audio. Nobody else is on a call.

*** HEADCOUNT: EXACTLY TWO PEOPLE: ONE CHICHI, ONE NIA. NEVER TWO OF ANYONE. NOBODY ELSE APPEARS, not in the room, not in the windows, not in reflections. ***

SET: ChiChi's kitchen <<<37c64826-c6b8-4ea5-a4ca-6e7a2ed086ca>>>, exactly as in the start image and the reference video: cream shaker cabinets, a brass range hood, open oak shelves, a long white marble island with a bowl of lemons and a vase of white flowers, cream boucle bar stools, floor-to-ceiling windows on the RIGHT side of the frame with a city skyline. Bright, warm morning sun pours in from the windows on the right; clearly daytime, never night. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, the same body shape and proportions as in the start image in every shot, never slimmed; arms full length and anatomically correct. HER CLOTHES COME ONLY FROM <<<759bc585-b31a-4dd0-b17a-1423c7db83ff>>>: a form-fitting black ribbed short-sleeved top and black ribbed wide-leg lounge trousers, barefoot, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

NIA, EXACTLY AS IN THE START IMAGE AND THE REFERENCE VIDEO: face, hair and skin <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE, about 5'2", SLIM-THICK: a small snatched waist, a flat toned stomach, slim toned arms and shoulders, full rounded hips and thighs, a fuller chest; a defined hourglass on a slim, fit frame; never heavy, never thick through the waist or arms. She is clearly smaller than ChiChi. HER CLOTHES COME ONLY FROM <<<9a7d7c6c-1ab8-4c4c-ae35-73ed09bb939f>>>: a fitted cream ribbed long-sleeved scoop-neck bodysuit tucked into high-waisted camel wide-leg trousers, a thin gold choker, tan slides, identical in every shot. NEVER a sweatshirt, nothing green. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

PROPS ON THE ISLAND: the glass French press, BOTH white mugs and CHICHI'S cream-case phone (FACE-DOWN beside the French press) stay EXACTLY where they are in the start image and are FIXED, STATIONARY objects for the whole clip: NOBODY touches them, they NEVER move, lift, slide, tip, float or fly. The ONLY object that moves is NIA'S OWN beige-tan phone: it buzzes once in place, then Nia picks it up and turns it over, screen toward herself. NO extra phone, mug, pot or object ever appears or moves through the frame. Each object is one solid thing: it never duplicates, never merges with or passes through another object, a hand or the counter. Nothing is thrown, tossed or falls.

PHONE SCREENS ARE NEVER SEEN: whoever holds a phone holds it with the screen facing HERSELF; the camera only ever sees the BACK of each phone case, and a phone lying on the marble lies FACE-DOWN. No screen, no glow, no text, no names, no messages, no notifications are ever visible to the camera.

BLOCKING, IDENTICAL IN EVERY SHOT: CHICHI on frame LEFT, STANDING behind the island on the kitchen side, facing RIGHT toward Nia. NIA on frame RIGHT, SEATED on the right-hand cream boucle stool on the camera side of the island, turned three-quarters to face LEFT toward ChiChi, the bright windows behind her. Nobody walks away from the island, sits, stands up or swaps places. ChiChi is ALWAYS on the left of frame and Nia ALWAYS on the right, in every shot and every cut.

FIRST FRAME: the start image. A medium-wide two-shot from the dining end. Both phones lie face-down; both women's hands rest empty on the marble; both are smiling.

THE CLIP, SHOT BY SHOT:
1. (0-1.5 s) Two-shot. Nia's phone buzzes once: one short soft buzz and a small visible vibration on the marble, without sliding. Nia picks it up and turns it over, screen toward herself, the back of the case to the camera. ChiChi's smile fades as she looks at the phone.
2. (1.5-4 s) Waist-up on Nia past ChiChi's right edge. She reads it out, and her smile drops AS she says it: eyes down, lips pressed after the line.
  NIA (British), reading, the smile going: "Can I see you Saturday?"
3. (4-5.5 s) Waist-up on ChiChi over Nia's left shoulder. Watching Nia's face, no smile, brows together, straight away.
  CHICHI (American), quiet, already knowing: "Who is it?"
4. (5.5-8 s) Two-shot. ChiChi completely still, eyes on Nia, hands on the marble; Nia, eyes still on her screen, answers quietly, not looking up.
  NIA (British), quiet: "Dorian."
  END on this line: Nia holding her phone in both hands, screen toward herself, eyes down; ChiChi watching her, hands on the marble. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Can I see you Saturday?" = NIA. "Who is it?" = CHICHI. "Dorian." = NIA. Only these three lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT WOMEN, NEVER MIXED:
- NIA IS BRITISH: her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>: warm, low, dry London accent, British vowels, no hard R, deadpan wit; never American. Her name is said "NEE-uh".
- CHICHI IS AMERICAN: her voice is <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the dining (camera) side of the island; it never crosses behind the island. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: real-world physics only; objects move ONLY when a hand is holding them (the only exception: Nia's phone vibrates in place for its one buzz, without sliding). Natural posture and weight, five-finger hands, ChiChi's arms full length, ONE object moves at a time, the French press and any mug nobody is holding stay perfectly still, steam rises gently from the mugs, no physical contact between them.
AUDIO: one short soft phone buzz at the start, then only these three lines, plus the same soft morning kitchen room tone as the reference video. NO SMILING from the buzz on: Nia's face falls, ChiChi's brows pull together. No music swell, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

---

## RENDER LOG

| Date | Item | Job ID | Settings | Credits | Verdict |
|---|---|---|---|---|---|
| 6 Oct 2026 | Stills 01–05 | `183d5936…` `d05693a5…` `f377b43c…` `773c21c0…` `3d7e0a93…` | gpt_image_2_5, 9:16, high, 2k, master plate `6ba334b6…` as image reference | 5 × 2.75 = 13.75 | For your review |
