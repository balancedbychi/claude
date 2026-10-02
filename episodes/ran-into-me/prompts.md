# "Ran Into Me": production notes and prompts (FOR REVIEW)

**Status:** waiting for your go-ahead (rule 9). Nothing is filmed until you say "film".

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

## SEGMENTS 2 and 3 — drafts (finalised after Segment 1 is approved)

**Segment 2, "That's that" (30 s):** the same setup, plus **Segment 1 attached as a video reference**. "Everyone looks, dresses and sounds exactly as in the reference video." The one staging change is scripted: **Nia stops dead** at "doesn't want to have children"; ChiChi takes one step, turns back to her, and then they **resume walking together in the same direction**. The same accent block and height block are used.

**Segment 3, "Ran into me" (12 s):** Segment 1 or 2 is attached as a video reference, plus DB's face, body and suit.
- **DB stands still near the iron railing, facing away,** on ChiChi's side of the path. Mid-laugh, ChiChi glances at Nia and walks **shoulder-first into DB**, a light, natural bump.
- He turns around. He's about 6'1" and clearly taller than ChiChi.
- **DB** (his written Dominican voice, word for word): "Oh — I'm so sorry." Then, looking at her properly and smiling: "But I'm so glad you ran into me."
- It ends on a waist-up shot of Nia, deadpan: *you've got to be kidding me.* No rings on DB.
