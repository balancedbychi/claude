# "Say Less": production notes and prompts (FOR REVIEW)

**Status:** for your review (rule 9). Your uploads are saved, and their element IDs are now filled into the prompts. **Nothing else changed.** Nothing is filmed until you say "film".

## Production notes

- **Model:** Seedance 2.5, omni-reference, 1080p, 9:16, with audio. Two 30-second segments, about 360 credits each. The balance is about 1,300.
- **Elements:**
  - Nia: `Nia-Face` + `Nia-Body`.
  - Tay: `Tay-Face` + `Tay-Body`.
  - Dorian: `Dorian-Face` + `Dorian-Body`.
  - Simone: `Simone-Face-v5` + `Simone-Body-v2`.
  - Plus four gym outfits and the gym set, all from your uploads.
  - Voice element: `Nia-Canon-Voice-v2`. Tay, Dorian and Simone use their written descriptions, word for word.
- **Accents:** Nia is British. Tay, Dorian and Simone are American.
- **Heights:** Nia < Simone < Tay < Dorian, with visual cues written into both prompts.
- **No rings** on anyone, all four of them.
- **The collision:** both of them are moving at once. Nia spins to leave just as Tay turns from the rack. Neither stands still (your note on "Ran Into Me").
- **Continuity:** Segment 2 attaches **Segment 1 as reference video 1**, which carries over the looks, outfits, location, and Nia's and Tay's voices.
- **Dorian's voice (rule 3b):** Segment 2 also attaches **"Miscommunication" Segment 1 (`f078ccbb`) as reference video 2, for his voice only.**
  - **Risk:** the model could pull in his black outfit or Nia's apartment from that clip. The prompt says, in capitals, that only his voice is taken from it.
  - If you'd rather not take the risk, I'll drop it and rely on his written voice alone.
- **No repeated lines:** each prompt names its final line and says nothing from a reference video is repeated (rule 9).
- **No dead air:** each clip cuts within half a second of its last line.

---

## SEGMENT 1 — "Say less" (30 s) — PROMPT

**Attached:** set `897f65a6-9fd6-4518-b5f2-dea720a0af88`; Nia-Face, Nia-Body, Nia look; Tay-Face, Tay-Body, Tay look; Dorian-Face, Dorian-Body, Dorian look; Simone-Face-v5, Simone-Body-v2, Simone look; voice `Nia-Canon-Voice-v2`.

```
30 SECONDS. BRIGHT DAYTIME. Photoreal cinematic drama, vertical 9:16.

SET AND GEOGRAPHY: the gym <<<897f65a6-9fd6-4518-b5f2-dea720a0af88>>>, exactly as the reference shows, bright daytime. FIXED MAP, the same in every shot: the camera is just inside the entrance, looking into the gym. The ENTRANCE is an open doorway on the LEFT edge of frame (no door is opened or closed). A DUMBBELL RACK runs along the RIGHT side, just inside the entrance. The WATER STATION and big windows are at the FAR BACK, in the centre. No text, logos, numbers or signage anywhere, including on equipment and weight plates. A few distant gym-goers far in the background only.

NIA: face, hair and skin from <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>; body from <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>; HER CLOTHES COME ONLY FROM <<<f7d303df-2f64-4a64-ae3e-761a21b865cd>>>: ONE outfit, unchanged in every shot; nothing from the face or body references is worn; never a green sweatshirt. Thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE AND CURVY: the SHORTEST person on screen (about 5'2"), with an hourglass figure: small defined waist, fuller bust, full rounded hips and thighs; never tall, never slim-hipped. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

TAY: face, eyes, hair and skin from <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>>; build and tattoos from <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>>; HIS CLOTHES COME ONLY FROM <<<261210f2-283f-4e6b-9140-d237b81f4741>>>, unchanged in every shot; the fitting-room shorts in the body reference are never worn. Twenty-six, caramel brown skin, striking LIGHT GREY eyes, low-cut fade with a sharp lineup, a pretty-boy face. SKINNY, about 5'10": next to him, the top of Nia's head is level with his chin. Tattooed from the neck down, with dense dark-ink tattoos on his neck and full sleeves on both arms wherever the outfit leaves skin bare; no face tattoos. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

DORIAN: face from <<<33308979-0153-430b-a68e-df947e3a710d>>>; build from <<<e7d019d8-f645-400e-bd66-ccb33bea41e6>>>; HIS CLOTHES COME ONLY FROM <<<98b667eb-7e9f-4a28-8859-448f15efa9d8>>>, unchanged in every shot; the grey T-shirt in the body reference is never worn. DEEP, DARK BROWN complexion, exactly as the reference: NEVER lightened, and lighting never lifts his skin tone. Short cropped hair with a crisp lineup, full short black beard, a tattoo on his left forearm. TALL AND HEAVILY BUILT, about 6'3": the tallest person on screen; next to him, Nia's head reaches his chest. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

SIMONE: face and hair from <<<b2ab2ec6-2469-4b6b-9208-4f5b0eb02c09>>>; build from <<<e35f19e8-bfa1-45fb-bb2d-81de7915be9c>>>; HER CLOTHES COME ONLY FROM <<<b80e2725-b11b-447d-acf3-f5b5a760be74>>>, unchanged. Early thirties, warm mid-brown skin, a COPPER-AUBURN shoulder-length blunt bob with a deep side part. About 5'6": taller than Nia, shorter than Dorian. Cheerful and friendly, never smug. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

VOICES:
- NIA IS BRITISH: <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>, warm, low, dry and deadpan. Every one of her lines is in a British accent.
- TAY'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A young Black American man of twenty-six with an URBAN, contemporary Black American accent and cadence. His voice is DEEP for his age: a smooth, low baritone with a relaxed chest resonance and a soft, slightly husky edge. He talks SMOOTH and LAID-BACK, like a player who knows he's charming: an unhurried, easy rhythm, words sliding into each other, relaxed consonant endings, a little melodic lift at the end of a flirty line, a low half-laugh in his throat. He speaks in natural modern slang and says it with full confidence; never forced, never a caricature. Even when he's excited about business, the voice stays low and smooth. Never high-pitched, never nasal, never squeaky or boyish, never nervous, never rushed, never shouting, never a radio announcer. Clearly younger and lighter in energy than Dorian, but just as deep.
- Tay is AMERICAN, never British. Nia and Tay never sound alike and never swap lines.
Dorian and Simone do NOT speak in this clip. They are seen at the far back only.

SEQUENCE, IN ORDER (simple and clear: where people are, how they move, then the conversation):
1. (0-4 s) Medium-wide shot from just inside the entrance. NIA walks in through the open entrance on the LEFT at a natural pace, a water bottle in one hand. TAY is at the dumbbell rack on the RIGHT, his back to the entrance, re-racking a dumbbell. Nia slows and stops. At the FAR BACK, by the water station, SIMONE is hugging DORIAN, warm and easy, clearly visible but small in frame.
2. (4-7 s) Waist-up on Nia: her jaw sets, her eyes harden, and she's about to lose it. A sharp exhale. She spins on her heel to leave, stepping back toward the entrance.
3. (7-9 s) THE COLLISION: BOTH ARE MOVING. At the SAME moment, Tay sets the dumbbell down on the rack, turns around and steps toward the entrance. They walk straight into each other mid-stride: her shoulder meets his chest, they both stop short, and he catches her lightly by the upper arms to steady her. Natural and simultaneous, at real walking speed. NEITHER of them is standing still and waiting; nobody stumbles or falls; the water bottle stays in her hand; no slow motion.
4. (9-30 s) Two-shot by the rack, from mid-thigh up, with clean cuts to waist-up singles for key lines. Nia looks up at Tay; he looks down at her.
TAY (American), a slow grin: "Wow. My, my, my. Look what God has dropped into my lap."
Nia rolls her eyes. [HALF-SECOND BEAT] She glances back over her shoulder: in the far background, Dorian and Simone are laughing together. They have NOT seen her. She turns back to Tay, decided.
NIA (British): "Can I rent you for a moment?"
TAY (American), laughing: "Rent me? I've never heard that before."
NIA (British), low and direct: "Listen. I want to make someone jealous."
TAY (American), an easy grin: "Say less."
The clip ends on "Say less." Cut out within half a second. Nobody speaks after it.

LINE OWNERSHIP, NEVER SWAPPED: Tay says "Wow. My, my, my...", "Rent me?..." and "Say less." Nia says "Can I rent you for a moment?" and "Listen. I want to make someone jealous." The final spoken line is Tay's "Say less."

CAMERA: steady, eye level. NO ZOOMS. NO PUSH-INS. NO EXTREME CLOSE-UPS: faces never tighter than waist-up. Every framing holds still apart from the opening walk-in.

TIMING: gaps between lines never longer than two tenths of a second. The only beats are the ones marked, half a second each. No dead air at the start or end.

AUDIO: only these lines, plus gym ambience (distant weights, a low hum, faint music from far speakers, very quiet under the dialogue). No narration.
```

---

## SEGMENT 2 — "This could be fun" (30 s) — PROMPT

This is filmed only after you approve Segment 1.

**Attached:** **reference video 1 = Segment 1 (approved job)**; **reference video 2 = "Miscommunication" Segment 1 `f078ccbb` (Dorian's voice only)**; plus the same elements as Segment 1.

```
30 SECONDS. BRIGHT DAYTIME. Photoreal cinematic drama, vertical 9:16. THIS CLIP CONTINUES DIRECTLY FROM THE FIRST REFERENCE VIDEO (Segment 1): the same gym, the same people, moments later.

*** THE FIRST REFERENCE VIDEO IS THE AUTHORITY FOR LOOKS, OUTFITS, PLACE, CAMERA AND THE VOICES OF NIA AND TAY. *** Nia, Tay, Dorian and Simone look and dress EXACTLY as in it. Nothing changes. THE SECOND REFERENCE VIDEO is used ONLY for DORIAN'S VOICE; nothing else is taken from it: not his clothes, not the room, not anyone else in it. Reference videos are NEVER used for dialogue: nobody repeats any line from either reference video, and "Say less" is NEVER said in this clip.

SET AND GEOGRAPHY: the gym <<<897f65a6-9fd6-4518-b5f2-dea720a0af88>>>, exactly as the reference shows, bright daytime. FIXED MAP, the same in every shot: the camera is just inside the entrance, looking into the gym. The ENTRANCE is an open doorway on the LEFT edge of frame (no door is opened or closed). A DUMBBELL RACK runs along the RIGHT side, just inside the entrance. The WATER STATION and big windows are at the FAR BACK, in the centre. No text, logos, numbers or signage anywhere, including on equipment and weight plates. A few distant gym-goers far in the background only.

NIA: face, hair and skin from <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>; body from <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>; HER CLOTHES COME ONLY FROM <<<f7d303df-2f64-4a64-ae3e-761a21b865cd>>>: ONE outfit, unchanged in every shot; nothing from the face or body references is worn; never a green sweatshirt. Thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. PETITE AND CURVY: the SHORTEST person on screen (about 5'2"), with an hourglass figure: small defined waist, fuller bust, full rounded hips and thighs; never tall, never slim-hipped. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

TAY: face, eyes, hair and skin from <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>>; build and tattoos from <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>>; HIS CLOTHES COME ONLY FROM <<<261210f2-283f-4e6b-9140-d237b81f4741>>>, unchanged in every shot; the fitting-room shorts in the body reference are never worn. Twenty-six, caramel brown skin, striking LIGHT GREY eyes, low-cut fade with a sharp lineup, a pretty-boy face. SKINNY, about 5'10": next to him, the top of Nia's head is level with his chin. Tattooed from the neck down, with dense dark-ink tattoos on his neck and full sleeves on both arms wherever the outfit leaves skin bare; no face tattoos. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

DORIAN: face from <<<33308979-0153-430b-a68e-df947e3a710d>>>; build from <<<e7d019d8-f645-400e-bd66-ccb33bea41e6>>>; HIS CLOTHES COME ONLY FROM <<<98b667eb-7e9f-4a28-8859-448f15efa9d8>>>, unchanged in every shot; the grey T-shirt in the body reference is never worn. DEEP, DARK BROWN complexion, exactly as the reference: NEVER lightened, and lighting never lifts his skin tone. Short cropped hair with a crisp lineup, full short black beard, a tattoo on his left forearm. TALL AND HEAVILY BUILT, about 6'3": the tallest person on screen; next to him, Nia's head reaches his chest. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

SIMONE: face and hair from <<<b2ab2ec6-2469-4b6b-9208-4f5b0eb02c09>>>; build from <<<e35f19e8-bfa1-45fb-bb2d-81de7915be9c>>>; HER CLOTHES COME ONLY FROM <<<b80e2725-b11b-447d-acf3-f5b5a760be74>>>, unchanged. Early thirties, warm mid-brown skin, a COPPER-AUBURN shoulder-length blunt bob with a deep side part. About 5'6": taller than Nia, shorter than Dorian. Cheerful and friendly, never smug. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin.

VOICES:
- NIA IS BRITISH: <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>, warm, low, dry and deadpan. Every one of her lines is in a British accent.
- TAY'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A young Black American man of twenty-six with an URBAN, contemporary Black American accent and cadence. His voice is DEEP for his age: a smooth, low baritone with a relaxed chest resonance and a soft, slightly husky edge. He talks SMOOTH and LAID-BACK, like a player who knows he's charming: an unhurried, easy rhythm, words sliding into each other, relaxed consonant endings, a little melodic lift at the end of a flirty line, a low half-laugh in his throat. He speaks in natural modern slang and says it with full confidence; never forced, never a caricature. Even when he's excited about business, the voice stays low and smooth. Never high-pitched, never nasal, never squeaky or boyish, never nervous, never rushed, never shouting, never a radio announcer. Clearly younger and lighter in energy than Dorian, but just as deep.
- Tay is AMERICAN, never British. Nia and Tay never sound alike and never swap lines.
- DORIAN'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY: a deep, low, calm adult male voice, an unhurried General American baritone pitched well below the women's, with relaxed chest resonance, warm rather than gravelly. His voice matches the SECOND reference video (his canon voice) exactly. Never British, never a light or boyish tenor.
- Simone does not speak in this clip.

SEQUENCE, IN ORDER:
1. (0-5 s) Nia and Tay stand by the dumbbell rack on the RIGHT, facing each other, exactly where Segment 1 ended. At the far back, DORIAN notices them, says a quiet word to Simone, and walks across the gym toward them at a natural pace. SIMONE stays by the water station, pleasantly watching. Dorian stops a comfortable step from Nia.
2. Three-shot from mid-thigh up, Dorian towering over Nia, with clean waist-up cuts for key lines:
DORIAN (American): "Hey, Nia. How are you?"
NIA (British), cool: "Just working out."
Tay slides his arm around Nia's shoulders, relaxed and possessive.
TAY (American), smooth: "She taken care of."
[HALF-SECOND BEAT: Dorian looks from Tay to Nia, confused. Nia looks a little uncomfortable, because she wasn't expecting the arm, but there's a flicker of satisfaction too.]
DORIAN (American), hands raised slightly, easy: "Hey, I was just saying hello."
DORIAN (American), quieter, to Nia: "Are we good?"
NIA (British): "We're good."
[HALF-SECOND BEAT: Dorian stands there, opens his mouth as if to say something more, and doesn't.] He turns and walks back across the gym toward Simone at a natural pace.
3. Waist-up two-shot of Nia and Tay: Nia exhales in relief, then shrugs Tay's arm off her shoulders.
TAY (American), a low laugh: "This could be fun."
The clip ends on "This could be fun." Cut out within half a second. Nobody speaks after it.

LINE OWNERSHIP, NEVER SWAPPED: Dorian says "Hey, Nia. How are you?", "Hey, I was just saying hello." and "Are we good?" Nia says "Just working out." and "We're good." Tay says "She taken care of." and "This could be fun." The final spoken line is Tay's "This could be fun."

CAMERA: steady, eye level, following Dorian's walk smoothly, otherwise holding still. NO ZOOMS. NO PUSH-INS. NO EXTREME CLOSE-UPS: faces never tighter than waist-up.

TIMING: gaps between lines never longer than two tenths of a second. The only beats are the two marked, half a second each. No dead air at the start or end.

AUDIO: only these lines, plus quiet gym ambience. No narration.
```
