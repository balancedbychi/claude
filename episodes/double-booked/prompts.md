# EXCLUSIVE — "Double Booked" · Seedance 2.5 clip prompts

## Render settings (every clip)

| Setting | Value |
|---|---|
| Model | `seedance_2_5` |
| Mode | `omni_reference` |
| Aspect | `9:16` |
| Resolution | `1080p` (or `draft: true` at 480p first, then finalize the approved draft) |
| Audio | `generate_audio: true`. Dialogue and room sound are generated **in the same pass** as the picture. **Never** supply audio_references: in this project a supplied voice track does not lip-sync on Seedance. |
| References | Same method as the approved EXCLUSIVE episodes: every element is passed in the `reference_elements` field, and the prompt points at each one with its `<<<element-id>>>` placeholder. **Both saved voice elements are attached to every clip**, `Nia-voice-v2-clear` and `ChiChi-the-Influencer-Voice`, exactly as in "The Caterer". Dorian, Kel and Simone have no saved voice, so each one's voice comes from the written description used in their approved takes. |

**Narration is not in these renders.** The narrator is a separate voiceover track, laid in during the edit (see the end of this file). Each clip's prompt keeps her moments free of dialogue and has **no voice-over**, so the model never puts her lines in an on-screen mouth.

**Text rule for every clip:** no subtitles, no captions, no on-screen text, and no legible lettering on any surface, screen, bag or label.

### Element IDs used below

| Element | ID |
|---|---|
| Nia (identity) | `bcd528d3-9756-4190-ba80-4aaae881f2b2` |
| Nia-Double-Booked-Look | `38c8cb48-d342-4143-85f2-9eb5ba462544` |
| Simone-Face-v3 | `66ab4872-3bbf-4ce0-8e0d-267753f00c37` |
| Simone-Double-Booked-Look | `2a042d0e-64b9-477f-bc2d-2ad8cda38335` |
| Dorian (identity) | `5deb4ada-665f-4894-8d16-2a9f34c0248f` |
| Dorian-Double-Booked-Look | `f44003af-4374-4d5c-acbf-d4f2aad1f9b3` |
| ChiChi-the-Influencer (identity) | `8a8e8eeb-d41e-4d91-b245-fa0caa8801b6` |
| ChiChi-Face-Photoreal (skin) | `54b60e1c-2c1e-4258-bc4e-219bf5d0ea13` |
| ChiChi-Double-Booked-Look | `a18211bc-26e3-45d3-8ea0-66ee6cc3b13d` |
| Kel-The-Cousin (identity) | `3ad69411-e32c-44bd-b797-a93ec0d4b52c` |
| Kel-Double-Booked-Look | `0bac4ba5-b61d-411c-98a9-f26c16967200` |
| Dorian-Hallway-Night | `6acd0d74-4da4-4aa4-bad6-4505bf5f26b2` |
| Dorian-Loft-Entry-v3 | `96a02139-827d-4c0e-a003-1443137bd289` |
| Dorian-Kitchen-Night | `de2063f2-acee-4300-9669-b1f17bff850f` |
| ChiChi-Living-Room-Night-v2 | `9c43c008-b953-4dac-9ab2-9b77929580c3` |

### Voices (taken from the approved EXCLUSIVE takes)

| Character | Source |
|---|---|
| Nia | Voice element `Nia-voice-v2-clear` `12315c68-37de-41fe-8766-76ac07bcaf70` |
| ChiChi | Voice element `ChiChi-the-Influencer-Voice` `180fdb9a-7c0b-469e-be49-3f76692a3968` |
| Dorian | Written description from "The Caterer" (job `138b2a2f…`): a deep, low, calm General American baritone |
| Kel | Written description from "The Caterer" (job `8a2543d2…`): plain, dry, slightly bright, thinner mid-low |
| Simone | Written description from "The Caterer" (job `21af609d…`): warm, low-pitched, chesty, cheerful, deeper and slower than Nia |

---

## C1 — THE DOOR · 10 s

**Elements:** hallway, Nia ×2, Simone ×2

```
Photoreal cinematic drama, vertical 9:16, late night. Set: the residential hallway outside Dorian's apartment <<<6acd0d74-4da4-4aa4-bad6-4505bf5f26b2>>>, reproduced exactly as the reference shows it, no relight.

Nia <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>>, wearing exactly the outfit in <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, with an overnight bag on her shoulder, walks down the hallway toward the apartment door. Waist-length jet-black water-wave curls, diamond stud earrings, no rings, no bracelets. She stops at the door, lifts her phone and checks her lip gloss in its dark screen, presses her lips together, and allows herself a small private smile. The screen shows nothing readable.

She reaches for the door handle. Before her fingers touch it, the door swings open from inside.

Simone stands in the doorway. Her face and hair are from <<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>>: a copper-auburn blunt shoulder-length bob, deep side part and sweep exactly as the reference shows, never mirrored. She wears exactly the outfit in <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>, with no coat. She holds one glass of red wine and looks relaxed and at home. The two women face each other across the threshold and Nia's smile drops. The clip ends on that moment.

Nia's saved voice element <<<12315c68-37de-41fe-8766-76ac07bcaf70>>> is attached to this generation.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: a smooth tracking shot behind Nia's shoulder down the hallway, settling into a profile two-shot at the door when it opens. 35mm, shallow depth.
Audio: quiet hallway hum, Nia's heels on the floor, the soft click of the latch. NO DIALOGUE in this clip. No voice-over, no music.
Skin photographed, never cartoonish or airbrushed. Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C2 — WHO ARE YOU? · 12 s

**Elements:** hallway, loft entry, Nia ×2, Simone ×2

```
Photoreal cinematic drama, vertical 9:16, late night. Continuous from the previous moment. Set: the open front door of Dorian's apartment. The hallway <<<6acd0d74-4da4-4aa4-bad6-4505bf5f26b2>>> is behind Nia, and the entry of Dorian's loft <<<96a02139-827d-4c0e-a003-1443137bd289>>> is behind Simone, each exactly as its reference shows.

Nia <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>>, wearing exactly <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, with the overnight bag on her shoulder. Simone <<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>> has her copper-auburn bob and wears exactly <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>, holding one glass of red wine.

Simone smiles, genuinely friendly, and says brightly: "Oh! Hi! Who are you?"
Nia, flat and dead still, says: "Who are you?"
Nia doesn't wait for an answer. She immediately steps straight past Simone's shoulder and into the loft without being invited. Simone turns to watch her go, still smiling and confused, and says pleasantly: "Okay — come in!"

Simone is never smug, never sneering, and never enjoys the moment; she is simply friendly and confused.

Nia's English dialogue uses <<<12315c68-37de-41fe-8766-76ac07bcaf70>>>, her saved clear British voice: warm, low, dry and deadpan. Never a substitute voice, never swapped with anyone else's. She is BRITISH and every one of her lines is spoken in a British accent.
SIMONE'S VOICE — SHE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. Warm, LOW-PITCHED, chesty and unhurried, with a relaxed pace and a soft landing on the ends of her sentences. She is clearly deeper and slower than Nia, and the two voices never sound alike. Never shrill, breathy, clipped, whispered, sing-song, or pitched up to match Nia. Her register is CHEERFUL AND PLEASANT: bright, warm, normal volume, genuinely having a nice time. No sneer, no smirk, no smugness, no drawl, no knowing look.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: an over-the-shoulder two-shot across the threshold, then a pan following Nia as she brushes past into the loft. 35mm.
Audio: the dialogue above, exactly as written, plus soft loft ambience and faint music from inside the apartment. No voice-over.
No rings or bracelets on Nia. Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C3 — THE KITCHEN · 12 s

**Elements:** loft entry, kitchen, Dorian ×2, Nia ×2, Simone ×2

```
Photoreal cinematic drama, vertical 9:16, late night. Set: inside Dorian's loft, at the entry <<<96a02139-827d-4c0e-a003-1443137bd289>>>, looking toward the open kitchen <<<de2063f2-acee-4300-9669-b1f17bff850f>>>, both exactly as their references show.

Dorian <<<5deb4ada-665f-4894-8d16-2a9f34c0248f>>>, wearing exactly the outfit in <<<f44003af-4374-4d5c-acbf-d4f2aad1f9b3>>>, with a dish towel over one shoulder, steps out of the kitchen wiping his hands and calls back toward the door, relaxed: "Babe, who was at the —"

He sees Nia <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>> (wearing exactly <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, overnight bag on her shoulder) standing just inside the loft. He stops short, and his hands go still on the towel. His eyes go from Nia, to Simone <<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>> (copper-auburn bob, exactly <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>, wine glass in hand) behind her at the door, then back to Nia. He realises what he's done in a second, not longer.
Dorian, quietly: "Nia."
Simone, to Dorian, still pleasant: "You know her?"

Dorian is NOT a villain: no smirk, no coldness, no menace. He is an ordinary man caught out, embarrassed and out of words.

DORIAN'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A DEEP, LOW, CALM, COMPOSED adult male voice: an unhurried General American baritone pitched well below both women, with relaxed chest resonance, warm rather than gravelly. Never rushed, never breathy, never nasal, never a light or boyish tenor, never British, and never the same voice as any woman's. Once he sees Nia it goes quiet and caught: still warm, never cold, never smug.
SIMONE'S VOICE — SHE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. Warm, LOW-PITCHED, chesty and unhurried, with a relaxed pace and a soft landing on the ends of her sentences. She is clearly deeper and slower than Nia, and the two voices never sound alike. Never shrill, breathy, clipped, whispered, sing-song, or pitched up to match Nia. Her register is CHEERFUL AND PLEASANT: bright, warm, normal volume, genuinely having a nice time. No sneer, no smirk, no smugness, no drawl, no knowing look.
Nia's saved voice element <<<12315c68-37de-41fe-8766-76ac07bcaf70>>> is attached to this generation.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: a medium shot on Dorian as he enters, then a quick push in on his face as he realises, with Nia soft in the foreground. 35mm.
Audio: the dialogue above, exactly as written, plus the kitchen ambience of a pot simmering. No voice-over.
Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C4 — SHE WALKS · 10 s

**Elements:** loft entry, Nia ×2, Dorian ×2, Simone ×2

```
Photoreal cinematic drama, vertical 9:16, late night. Set: the entry of Dorian's loft <<<96a02139-827d-4c0e-a003-1443137bd289>>>, exactly as the reference shows, with the front door open.

Close-up of Nia <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>>, wearing exactly <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, overnight bag on her shoulder, looking at Dorian. Her jaw is tight and her eyes fill with tears that she will not let fall. She says, barely above a whisper: "You told me to come."

Reverse shot of Dorian <<<5deb4ada-665f-4894-8d16-2a9f34c0248f>>>, wearing exactly <<<f44003af-4374-4d5c-acbf-d4f2aad1f9b3>>>, with the dish towel. He opens his mouth and nothing comes out. He has no defence and he knows it. He is stricken, not cruel.

Nia immediately turns and walks straight past Simone <<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>> (copper-auburn bob, exactly <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>, wine glass in hand) and out the open door. The door slams and Simone flinches. One brief beat on Dorian and Simone in the entry, then the clip ends.

Nia's English dialogue uses <<<12315c68-37de-41fe-8766-76ac07bcaf70>>>, her saved clear British voice: warm, low, dry and deadpan. Never a substitute voice, never swapped with anyone else's. She is BRITISH and every one of her lines is spoken in a British accent.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: a tight close-up of Nia, a reverse close-up of Dorian, then a wide shot of the entry for the exit.
Audio: Nia's one line, exactly as written, then her footsteps, and the door slamming hard. No other dialogue, no voice-over, no music.
No rings or bracelets on Nia. Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C5 — ACROSS TOWN · 11 s

**Elements:** living room, ChiChi ×3, Kel ×2

```
Photoreal cinematic drama, vertical 9:16, night. Set: ChiChi's living room at night <<<9c43c008-b953-4dac-9ab2-9b77929580c3>>>, exactly as the reference shows: a large cream-greige L-shaped sectional, a round white-marble coffee table on a dark drum base, ONE warm table lamp on the media console, the TV off, and a lit city skyline through floor-to-ceiling corner windows. There is NO floor lamp of any kind.

ChiChi <<<8a8e8eeb-d41e-4d91-b245-fa0caa8801b6>>>, with skin rendered as in <<<54b60e1c-2c1e-4258-bc4e-219bf5d0ea13>>>, wearing exactly the outfit in <<<a18211bc-26e3-45d3-8ea0-66ee6cc3b13d>>>. HONEY-BLONDE shoulder-length layered hair with darker roots and outward-curled ends, with the deep side part on the left side of her head so the volume falls to screen left. Never dark brown. No rings on any finger, no bracelets.
Kel <<<3ad69411-e32c-44bd-b797-a93ec0d4b52c>>>, 53, bald, with a close-cropped silver-grey beard, wearing exactly the outfit in <<<0bac4ba5-b61d-411c-98a9-f26c16967200>>>.
They sit close together at the right end of the sectional, each holding a glass of red wine. Exactly two glasses exist.

The scene opens mid-laugh: ChiChi is laughing, a real, unguarded laugh, for the first three seconds with room sound only. Then Kel picks the conversation straight back up.
Kel, grinning: "— and the pot was fine. I watched that pot all night."
ChiChi laughs again, settles back and looks at him, then asks, calmly: "Kel. Do you want children?"


ChiChi's English dialogue uses <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>>, her saved warm, smooth, mid-to-low General American voice with calm authority and dry humour. Never a substitute voice, never a British accent, never swapped with Nia's.
KEL'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A Black American man in his fifties with a General American accent. His voice is PLAIN, DRY and slightly BRIGHT: a mid-low male voice with a THINNER, less resonant quality, less bass body, more edge and no velvet. Never smooth, never suave, never rich or round or chesty, never a radio announcer. Unhurried, completely at ease, entirely sincere. He says everything plainly, as fact.
Nia's saved voice element <<<12315c68-37de-41fe-8766-76ac07bcaf70>>> is attached to this generation, but NIA IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: a warm, intimate two-shot at sofa height, then a gentle push in on ChiChi for her question. 35mm.
Audio: the dialogue above, exactly as written, plus soft room tone and faint distant city sound. No voice-over, no music.
Skin photographed, never cartoonish. Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C6 — THE QUESTION · 12 s

**Elements:** living room, ChiChi ×3, Kel ×2

```
Photoreal cinematic drama, vertical 9:16, night. Continuous. Set: ChiChi's living room at night <<<9c43c008-b953-4dac-9ab2-9b77929580c3>>>, exactly as the reference shows, with one warm table lamp, no floor lamp and the TV off.

ChiChi <<<8a8e8eeb-d41e-4d91-b245-fa0caa8801b6>>>, skin as in <<<54b60e1c-2c1e-4258-bc4e-219bf5d0ea13>>>, in exactly <<<a18211bc-26e3-45d3-8ea0-66ee6cc3b13d>>>. Honey-blonde hair, side part on the left side of her head, no rings, no bracelets. Kel <<<3ad69411-e32c-44bd-b797-a93ec0d4b52c>>> in exactly <<<0bac4ba5-b61d-411c-98a9-f26c16967200>>>. They sit together on the sectional with two glasses of wine, lower than before.

Kel smiles gently, as if she might be joking: "You do know I'm fifty-three, right?"
ChiChi, evenly, not smiling: "That wasn't my question. Do you want children?"
Kel sets his wine glass down on the round marble coffee table and leans in, sincere and kind: "Look, I really like where this is going. I do. But don't you think we're a little too old for that?"


KEL'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A Black American man in his fifties with a General American accent. His voice is PLAIN, DRY and slightly BRIGHT: a mid-low male voice with a THINNER, less resonant quality, less bass body, more edge and no velvet. Never smooth, never suave, never rich or round or chesty, never a radio announcer. Unhurried, completely at ease, entirely sincere. He says everything plainly, as fact.
ChiChi's English dialogue uses <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>>, her saved warm, smooth, mid-to-low General American voice with calm authority and dry humour. Never a substitute voice, never a British accent, never swapped with Nia's.
Nia's saved voice element <<<12315c68-37de-41fe-8766-76ac07bcaf70>>> is attached to this generation, but NIA IS NOT IN THIS SCENE: she never appears and speaks no lines.

Camera: shot-reverse-shot in close singles, with Kel in a soft three-quarter view and ChiChi framed straight on. 35mm.
Audio: the dialogue above, exactly as written, plus soft room tone. No voice-over, no music.
Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## C7 — TAG · 9 s

**Elements:** living room, ChiChi ×3, Kel ×2

```
Photoreal cinematic drama, vertical 9:16, night. Continuous. Set: ChiChi's living room at night <<<9c43c008-b953-4dac-9ab2-9b77929580c3>>>, exactly as the reference shows, with one warm table lamp, no floor lamp and the TV off.

Close-up of ChiChi <<<8a8e8eeb-d41e-4d91-b245-fa0caa8801b6>>>, skin as in <<<54b60e1c-2c1e-4258-bc4e-219bf5d0ea13>>>, in exactly <<<a18211bc-26e3-45d3-8ea0-66ee6cc3b13d>>>, honey-blonde hair with the side part on the left side of her head, no rings, no bracelets. She looks at Kel with no anger, only clarity, and a quiet disappointment she doesn't hide.
ChiChi, quietly: "Wow. I don't know if this is gonna work."

Cut to Kel <<<3ad69411-e32c-44bd-b797-a93ec0d4b52c>>> in exactly <<<0bac4ba5-b61d-411c-98a9-f26c16967200>>>. His warm smile fades as he understands.
The camera pulls back to a wide shot: two people on one long sofa, a space now open between them, the city glittering behind. Room tone only to the end.

ChiChi's English dialogue uses <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>>, her saved warm, smooth, mid-to-low General American voice with calm authority and dry humour. Never a substitute voice, never a British accent, never swapped with Nia's.
Nia's saved voice element <<<12315c68-37de-41fe-8766-76ac07bcaf70>>> is attached to this generation, but NIA IS NOT IN THIS SCENE: she never appears and speaks no lines.

Audio: ChiChi's line, exactly as written, then room tone. No other dialogue, no voice-over, no music.
Correct five-finger hands. No subtitles, no captions, no on-screen text.
```

---

## Narrator track (separate audio, laid in during the edit)

Generate as text-to-speech (`text2speech_v2` or `seed_audio`) using one preset voice. Pick it by listening to the previews: Maeve, Helena or another low, warm female preset. Use the same voice for all three lines.

**Delivery:** a rich, warm, low woman's voice. Wry and intimate, like a friend telling you the story over a drink. Measured pace, never theatrical.

| Cue | Lands over | Line |
|---|---|---|
| N1 | C1, 0:01–0:07, under Nia walking (C1 has no dialogue) | "He said come over. He said stay the night. He just didn't say it to *only* her." |
| N2 | C5, 0:00–0:03, over ChiChi's laugh (the first three seconds have no dialogue) | "Meanwhile, ChiChi was having the best night she'd had in a year." |
| N3 | C7, from Kel's smile fading through the pull back to the end | "One woman found out there was someone else. The other found out there wasn't going to be." |

**End card:** *EXCLUSIVE with Nia and Chi*. Add it as a title in the edit, not in a render.

## Continuity checks before approving a take

- **Wine levels:** Simone's single glass, and ChiChi's and Kel's two glasses, only ever go down. Never a third glass.
- **ChiChi:** honey-blonde, with the part on the left side of her head. Reject any take with dark hair or a ring.
- **Nia:** the overnight bag stays on her shoulder in C1–C4.
- **Simone:** never wears a coat. Her bob's part is never mirrored.
- **Living room:** no floor lamp, and the TV stays dark.
- **Lip-sync:** reject any take where the mouth movement doesn't match the words.

## Render log

**1 Oct 2026:** first 1080p pass submitted. Higgsfield's suggested presets were declined ("IN THE DARK" `24bae836…` for C1–C4, "EXIT THE DREAM" `3c00b5c4…` for C5–C7).

| Clip | Job ID |
|---|---|
| C1 | `76e1e104-643d-4e6e-9b64-fbb075a3ebc1` |
| C2 | `241e50f3-31ed-41b6-a9ec-835ca9e46485` |
| C3 | `975a60ac-e5f1-45fc-a6d4-5fa492528ff6` |
| C4 | `74107601-72ce-4be8-b73a-1a6b9b831bbb` |
| C5 | `2c53a4a1-9dfc-4e0a-aa5f-6bd6db72064a` |
| C6 | `f6c8be77-df23-45d6-9792-8b75ea79360c` |
| C7 | `9f1f91bc-794e-47fe-bbdb-cc720e468560` |
