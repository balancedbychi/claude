# "Ran Into Me": production notes and prompts (FOR REVIEW)

**Status:** Segment 1 v2 (`96ccbe40…`) is filmed; you said it's "much better". Segment 2 was approved and submitted as job `98e438d4-e834-4387-aadc-86cc01d6ec28`. Segment 3 will come to you for review next.

---

## What went wrong in Segment 1 v1 (`0b4cbc8b…`), and the fix

| Problem (your notes) | Cause | Fix in v2 |
|---|---|---|
| ChiChi had a **British accent** | The prompt only pointed at her voice element. Two voice elements in one clip let Nia's British voice spread to both women. | ChiChi's voice is now also **written out in full** as American, with "NEVER British" stated three times, and the line-by-line dialogue tags every line with the speaker's accent. |
| ChiChi should be **a bit taller** than Nia | "Clearly shorter" wasn't concrete enough. | A measurable cue: **ChiChi is about 3 inches taller; the top of Nia's head is level with ChiChi's eyes.** ChiChi is not towering, just a bit taller. |
| They **split up and walked in different directions** | "Side-on tracking" left the walking path open to interpretation. | A classic **walk-and-talk**: they walk **straight toward the camera** down the middle of the sidewalk, side by side, **shoulder to shoulder, the same direction and pace, the whole clip**. The camera moves backward ahead of them. Neither of them ever turns off or walks away. |

---

## Production notes (all three segments)

- **Model:** Seedance 2.5, omni-reference, 1080p, 9:16, with audio. The suggested "IN THE DARK" preset is declined.
- **Set:** `Park-Sidewalk-Afternoon` `cdd792fc…`, your S3: a sunny afternoon, iron railing and park trees on one side, brownstones on the other.
- **Nia:** `Nia-Face` + `Nia-Body` + `Nia-Ran-Into-Me-Look`. Petite and curvy, the shortest person on screen. **British.** No rings.
- **ChiChi:** `ChiChi-Face` + `ChiChi-Body` + `ChiChi-Ran-Into-Me-Look`. Honey-blonde, full-figured, about 3 inches taller than Nia. **American.** No rings.
- **DB (Segment 3 only):** `DB-Face` + `DB-Body` + `DB-Ran-Into-Me-Look`. About 6'1", clearly taller than ChiChi. Dominican accent, from his written voice description, word for word. No rings.
- **Voices:** `Nia-Canon-Voice-v2` and `ChiChi-Canon-Voice-v1` are attached, plus the written descriptions above.
- **Staging:** they walk toward the camera, ChiChi on the **left** of frame and Nia on the **right**, side by side and staying together. Hands are empty, with no phones.
- **Camera:** a smooth steadicam moving backward ahead of them, eye level, medium shot from mid-thigh up. There are a few cuts to waist-up walking singles. No zooms, push-ins or close-ups.
- **Pacing:** replies land within 0.2 s of each other. The only beats are the ones marked, half a second each.
- **Continuity:** once Segment 1 is approved, it's attached as a **video reference** to Segments 2 and 3.
- **Cost:** about 360 credits for each 30-second segment and about 150 for Segment 3. The balance is about 1,858.

---

## SEGMENT 1 v2 — "A year and a half" (30 s) — PROMPT

**Attached:** set `cdd792fc`; Nia-Face `3497a052`, Nia-Body `9b1d610c`, Nia look `e2685e2d`; ChiChi-Face `b03240bd`, ChiChi-Body `46074b6d`, ChiChi look `4f6cbc5e`; voices `b3d2fc9b` (Nia) and `de50f37f` (ChiChi). The images for each element are passed as image references.

```
30 SECONDS. SUNNY AFTERNOON. Photoreal cinematic drama, vertical 9:16. A classic walk-and-talk: two women walking TOGETHER, side by side, straight toward the camera along a park sidewalk, talking the whole time.

SET: the park sidewalk <<<cdd792fc-0e59-4b15-b24e-9864cea52044>>> exactly as the reference shows: low black iron railing and lush park trees on one side, elegant brownstones on the other, pale paving, dappled shade, warm golden afternoon light. A few distant passers-by far in the background only. No text or signage anywhere.

WALKING — READ THIS FIRST. The two women walk STRAIGHT DOWN THE MIDDLE OF THE SIDEWALK, TOWARD THE CAMERA, SIDE BY SIDE, SHOULDER TO SHOULDER, about a foot apart, in the SAME DIRECTION and at the SAME relaxed pace for the ENTIRE clip. They stay together the whole time. They NEVER split up, NEVER turn away from each other, NEVER walk in different directions, NEVER stop, NEVER cross paths, NEVER leave the frame. ChiChi is always on the LEFT of frame, Nia always on the RIGHT. They turn only their heads to look at each other as they talk. Natural walking: real weight, feet on the ground, gentle arm swing, hands empty, no phones.

CAMERA: a smooth steadicam moving BACKWARD ahead of them at their walking pace, so they stay the same size in frame. Eye level, medium shot from about mid-thigh up, both of them in frame. A few clean cuts to waist-up walking singles for key lines, from the same front-on angle. NO ZOOMS. NO PUSH-INS. NO CREEPING TOWARD A FACE. NO EXTREME CLOSE-UPS: faces never tighter than waist-up.

HEIGHT — EXACT: ChiChi is A BIT TALLER than Nia, about three inches: walking side by side, the TOP OF NIA'S HEAD is level with CHICHI'S EYES. ChiChi is not towering, just a bit taller. Nia is never the taller one, never level with ChiChi.

NIA: face, hair and skin from <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>; body proportions from <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>. Thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. HER CLOTHES COME ONLY FROM <<<e2685e2d-fd72-4ffa-b6f4-3a44de390fd7>>>: ONE outfit, unchanged in every shot; nothing from the face or body references is worn; NEVER a green sweatshirt, never any sweatshirt or hoodie unless the outfit reference shows one. PETITE AND CURVY: short and small-framed, the shorter of the two, with an hourglass figure: small defined waist, fuller bust, full rounded hips and thighs. Never tall or long-legged, never slim-hipped. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring.

CHICHI: face, hair and skin from <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>; body proportions from <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>. Forty, warm brown skin with a cheek beauty mark, HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head; never dark brown. Full-figured. Small stud earrings. HER CLOTHES COME ONLY FROM <<<4f6cbc5e-6a29-43b1-ad16-1a6ccd327761>>>: ONE outfit, unchanged in every shot. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets.

VOICES — TWO DIFFERENT ACCENTS, NEVER MIXED:
- NIA IS BRITISH. Her lines use <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>, her saved British voice: warm, low, dry and deadpan. Every one of her lines is in a British accent.
- CHICHI IS AMERICAN, NOT BRITISH. Her lines use <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, her saved voice: a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi NEVER has a British accent, NEVER uses British vowels, NEVER sounds like Nia. If in doubt: ChiChi sounds American, Nia sounds British.
The two voices never sound alike and never swap.

TIMING: one fast, natural conversation. The gap between lines NEVER exceeds two tenths of a second. The only beat is the one marked HALF-SECOND beat. No lingering looks, no dead air at the start or end.

DIALOGUE, IN ORDER (opens mid-walk, Nia already talking):
NIA (British): "So Dorian just shows up at my door. Flowers and everything."
CHICHI (American): "Okay...?"
NIA (British): "And he admits he's been seeing someone else. For a year and a half."
CHICHI (American), turning her head to Nia, stunned, still walking: "A year and a half?"
NIA (British): "Yeah. A year and a half."
CHICHI (American): "Wow. That's insane. I would hope you'd break up with him."
[HALF-SECOND BEAT: ChiChi looks at Nia; Nia looks away, ahead down the path. They keep walking together.]
CHICHI (American), firm: "Nia. What are you doing? He is literally stringing you along."
NIA (British): "No, I really feel like he actually likes me."
CHICHI (American), cutting in: "Listen. If you want to keep going with him, do whatever you want to do. But can you please at least start dating again?"
NIA (British), groaning: "I know, I know. I really need to put myself out there. See if I can have my own man."
CHICHI (American), laughing: "Don't we all?"
The clip ends on ChiChi's laugh as they keep walking together toward camera. Cut out immediately.

LINE OWNERSHIP, NEVER SWAPPED: Nia says "So Dorian just shows up...", "And he admits...", "Yeah. A year and a half.", "No, I really feel like...", "I know, I know...". ChiChi says every other line.

AUDIO: only these lines, plus soft park ambience, footsteps, distant birds. No music, no narration, no voice-over.
```

---

## SEGMENT 2 — "That's that" (30 s) — FOR REVIEW

### Continuity lock (from your frame of Segment 1 v2, `96ccbe40…`)

Segment 1 v2 is attached as a **video reference**, so the model copies the people, outfits, voices, place and light directly from the approved footage instead of rebuilding them. The prompt also writes out what's on screen, so the two can't disagree.

| | Locked from Segment 1 v2 |
|---|---|
| **Positions** | **Nia on the LEFT of frame, ChiChi on the RIGHT.** v2 swapped the planned sides, so Segment 2 keeps the sides as filmed. Flipping them now would break continuity. |
| **Nia's outfit** | Fitted black short-sleeve top, black running shorts, white sneakers, blush-pink smartwatch on her left wrist, diamond studs. Long black curls worn down. |
| **ChiChi's outfit** | Oatmeal baseball cap, oversized cream quarter-zip sweatshirt over a pale-yellow top, cream shorts, white sneakers. Honey-blonde hair under the cap. |
| **Place and light** | The same park sidewalk, iron railing on the left and brownstones on the right, the same golden afternoon sun. They keep walking in the **same direction**, toward camera. |
| **Camera** | The same front-on steadicam moving backward ahead of them, from mid-thigh up. |
| **Voices** | The same voices as in the reference: Nia British, ChiChi American. |
| **Start** | It picks up straight after Segment 1: still walking, still smiling from "Don't we all?" |

**One thing to check in your frame:** Nia and ChiChi look close in height, with ChiChi's cap making her read taller. The prompt keeps the "top of Nia's head at ChiChi's eyes" cue. If v2 shows Nia as tall as ChiChi without the cap, tell me and I'll strengthen it.

**Attached:** **video reference `96ccbe40` (Segment 1 v2)**; set `cdd792fc`; Nia-Face `3497a052`, Nia-Body `9b1d610c`, Nia look `e2685e2d`; ChiChi-Face `b03240bd`, ChiChi-Body `46074b6d`, ChiChi look `4f6cbc5e`; voices `b3d2fc9b` and `de50f37f`.

```
30 SECONDS. SUNNY AFTERNOON. Photoreal cinematic drama, vertical 9:16. THIS CLIP CONTINUES DIRECTLY FROM THE REFERENCE VIDEO: the same two women, the same walk, the same sidewalk, a moment later.

*** THE REFERENCE VIDEO IS THE AUTHORITY FOR EVERYTHING ON SCREEN. *** Both women look, dress, move and SOUND EXACTLY as they do in the reference video. The same place, the same golden afternoon light, the same camera style. Nothing changes from the reference video: no new clothes, no colour changes, no new accessories, no different hair.

POSITIONS, EXACTLY AS IN THE REFERENCE VIDEO: NIA is on the LEFT of frame, CHICHI is on the RIGHT of frame, for the whole clip. They never swap sides.

NIA (left), exactly as in the reference video: face, hair and skin from <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>, body from <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>, outfit from <<<e2685e2d-fd72-4ffa-b6f4-3a44de390fd7>>>: a fitted black short-sleeve top, black running shorts, white sneakers, a blush-pink smartwatch on her left wrist, diamond stud earrings, long jet-black curls worn down. Never a green sweatshirt. PETITE AND CURVY: the shorter of the two, with an hourglass figure. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

CHICHI (right), exactly as in the reference video: face, hair and skin from <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body from <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>, outfit from <<<4f6cbc5e-6a29-43b1-ad16-1a6ccd327761>>>: an oatmeal baseball cap, an oversized cream quarter-zip sweatshirt over a pale-yellow top, cream shorts, white sneakers. HONEY-BLONDE hair under the cap. Full-figured. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no bracelets.

HEIGHT: ChiChi is A BIT TALLER than Nia, about three inches: the TOP OF NIA'S HEAD is level with CHICHI'S EYES. Not towering. Nia is never the taller one.

SET: the park sidewalk <<<cdd792fc-0e59-4b15-b24e-9864cea52044>>>, exactly as in the reference video: the low black iron railing and park trees on the LEFT of frame, brownstones on the RIGHT, pale paving, dappled shade, warm golden afternoon sun.

WALKING: they walk TOGETHER, side by side, straight down the sidewalk TOWARD THE CAMERA, in the SAME DIRECTION and at the SAME relaxed pace as in the reference video. They NEVER split up, never walk in different directions, never leave the frame. The ONLY change is scripted: Nia stops for a moment (below), ChiChi stops one step later and turns back to her, and then they start walking again TOGETHER, in the same direction as before.

CAMERA: exactly the reference video's camera: a smooth steadicam moving BACKWARD ahead of them at walking pace, eye level, front-on, medium shot from about mid-thigh up, with a few clean cuts to waist-up singles. NO ZOOMS. NO PUSH-INS. NO EXTREME CLOSE-UPS.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO:
- NIA IS BRITISH: <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>, warm, low, dry and deadpan. The same voice as in the reference video.
- CHICHI IS AMERICAN, NOT BRITISH: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority, dry humour. The same voice as in the reference video. ChiChi NEVER has a British accent and never sounds like Nia.

TIMING: one fast, natural conversation; gaps between lines never longer than two tenths of a second. The only beats are the two marked HALF-SECOND beats. No dead air at the start or end.

SEQUENCE AND DIALOGUE, IN ORDER (opens mid-walk, both still smiling from the last clip):
NIA (British), curious, glancing at ChiChi: "So what happened with you and Kel?"
[HALF-SECOND BEAT: ChiChi looks away, ahead down the path, still walking.]
NIA (British), with a knowing look: "You know Kel called me, right?"
CHICHI (American), turning her head to Nia, surprised, still walking: "Wait — what?"
NIA (British): "Yeah. Kel called me."
CHICHI (American), dry: "Yeah, well, Kel also should've told you when he called that he doesn't want to have children."
NIA STOPS walking. ChiChi takes ONE more step, stops, and turns back to face her. They stand facing each other on the path for these two lines, in a waist-up two-shot:
NIA (British), stunned: "He told you he didn't want kids?"
CHICHI (American), flat: "Yep. He doesn't want kids."
They START WALKING AGAIN, TOGETHER, side by side, the SAME DIRECTION AS BEFORE, toward the camera, Nia LEFT and ChiChi RIGHT:
NIA (British): "Okay. Well... I guess that's that, then."
CHICHI (American): "Yep. That's that."
NIA (British), incredulous, turning to her: "Are you serious? That's it? You're not even gonna fight for your man?"
CHICHI (American), laughing: "Well, he would've had to become my man first."
The clip ends on ChiChi's laugh as they keep walking together toward camera. Cut out immediately.

LINE OWNERSHIP, NEVER SWAPPED: Nia says "So what happened with you and Kel?", "You know Kel called me, right?", "Yeah. Kel called me.", "He told you he didn't want kids?", "Okay. Well... I guess that's that, then." and "Are you serious?...". ChiChi says every other line.

AUDIO: only these lines, plus soft park ambience, footsteps and distant birds, matching the reference video. No music, no narration.
```

---

## SEGMENT 3 — draft (finalised after Segment 2 is approved)

**"Ran into me" (12 s):** Segment 2 is attached as a video reference, plus DB's face, body and suit.
- **DB stands still near the iron railing (left of frame), facing away.** Mid-laugh, ChiChi glances at Nia and walks **shoulder-first into DB**, a light, natural bump. Because the women swapped sides in v2, the bump happens on the railing side, with ChiChi crossing slightly toward him; the exact staging will be written into the final prompt for your review.
- He turns around. He's about 6'1", clearly taller than ChiChi.
- **DB** (his written Dominican voice, word for word): "Oh — I'm so sorry." Then, smiling: "But I'm so glad you ran into me."
- It ends on a waist-up shot of Nia, deadpan: *you've got to be kidding me.* No rings on DB.
