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

## C1 — THE DOOR · 20 s · one continuous take

**Replaces the old C1 and C2.** Elements: hallway, loft entry, Nia, Nia's look, Simone, Simone's look, plus both voice elements.

```
ONE CONTINUOUS UNBROKEN TAKE, 20 seconds, NO CUTS. Photoreal cinematic drama, vertical 9:16, late night. Because there are no cuts, every person's clothing is identical from the first frame to the last.

SET: the residential hallway outside Dorian's apartment <<<6acd0d74-4da4-4aa4-bad6-4505bf5f26b2>>>, exactly as the reference shows, no relight. Through the door when it opens: the entry of Dorian's loft <<<96a02139-827d-4c0e-a003-1443137bd289>>>, exactly as its reference shows.

<<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>> is NIA, thirty years old. Preserve her exact facial identity, deep warm brown complexion, facial geometry and waist-length jet-black water-wave curls.
NIA'S CLOTHES COME ONLY FROM <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, which supplies clothing, footwear and accessories ONLY. <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>> supplies her FACE, HAIR AND BODY ONLY: any clothing visible in that reference is NEVER reproduced. She wears ONE outfit, exactly the outfit in <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, from the first frame to the last. It NEVER changes, never swaps for a different top, dress or trousers, never changes colour, and never gains or loses a layer. The overnight bag stays on her shoulder throughout. Diamond stud earrings. No rings, no bracelets.

<<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>> is SIMONE, early thirties: FACE AND HAIR ONLY. A COPPER-AUBURN shoulder-length blunt bob, straight and glossy, deep side part and sweep EXACTLY as the reference shows, never mirrored. Her clothes come ONLY from <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>: ONE outfit, unchanged from first frame to last, with NO coat or jacket over it. She holds one glass of red wine.

THE ACTION, in order:
0–7 s: the camera tracks behind Nia's shoulder as she walks down the hallway to the apartment door. No dialogue. She stops, lifts her phone and checks her lip gloss in its dark screen (nothing readable on it), and allows herself a small private smile.
7–9 s: she reaches for the handle. Before she touches it, the door swings open from inside, and Simone is standing in the doorway, barefoot and relaxed, wine glass in hand.
9–20 s: the dialogue runs tight, with NO gap longer than a fraction of a second between lines:
LINE 1 — SIMONE, brightly and genuinely friendly: "Oh! Hi! Who are you?" Nia's mouth stays closed.
LINE 2 — NIA, flat and dead still: "Who are you?" Simone's mouth stays closed.
Nia does NOT wait for an answer. She steps straight past Simone's shoulder into the loft, and the camera follows her across the threshold in the same move.
LINE 3 — SIMONE, turning to watch her go, still smiling and confused, pleasantly: "Okay — come in!" Nia's mouth stays closed.

Nia's English dialogue uses <<<12315c68-37de-41fe-8766-76ac07bcaf70>>>, her saved clear British voice: warm, low, dry and deadpan. Never a substitute voice, never swapped with anyone else's. She is BRITISH and every one of her lines is in a British accent.
SIMONE'S VOICE — SHE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. Warm, LOW-PITCHED, chesty and unhurried, with a relaxed pace and a soft landing on the ends of her sentences. She is clearly deeper and slower than Nia, and the two voices never sound alike. Never shrill, breathy, clipped, whispered, sing-song, or pitched up to match Nia. Her register is CHEERFUL AND PLEASANT: bright, warm, normal volume, genuinely having a nice time. No sneer, no smirk, no smugness, no drawl, no knowing look.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

AUDIO: only the three lines above, in this order, each in the correct voice and never swapped, plus hallway hum, footsteps, the latch, and faint music from inside the apartment. No voice-over, no narration, no score.
Skin photographed, never cartoonish, waxy or airbrushed. Correct five-finger hands. No subtitles, no captions, no title cards, no on-screen text, no legible lettering anywhere.
```

---

## C2 — SHE WALKS · 22 s · one continuous take

**Replaces the old C3 and C4.** Elements: loft entry, kitchen, Nia, Nia's look, Simone, Simone's look, Dorian, Dorian's look, plus both voice elements.

```
ONE CONTINUOUS UNBROKEN TAKE, 22 seconds, NO CUTS. The camera may pan and push in, but it never cuts. Photoreal cinematic drama, vertical 9:16, late night. Because there are no cuts, every person's clothing is identical from the first frame to the last.

SET: inside Dorian's loft at the entry <<<96a02139-827d-4c0e-a003-1443137bd289>>>, looking toward the open kitchen <<<de2063f2-acee-4300-9669-b1f17bff850f>>>, both exactly as their references show. The front door behind Nia is open.

<<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>> is NIA, thirty years old. Preserve her exact facial identity, deep warm brown complexion, facial geometry and waist-length jet-black water-wave curls.
NIA'S CLOTHES COME ONLY FROM <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, which supplies clothing, footwear and accessories ONLY. <<<bcd528d3-9756-4190-ba80-4aaae881f2b2>>> supplies her FACE, HAIR AND BODY ONLY: any clothing visible in that reference is NEVER reproduced. She wears ONE outfit, exactly the outfit in <<<38c8cb48-d342-4143-85f2-9eb5ba462544>>>, from the first frame to the last. It NEVER changes, never swaps for a different top, dress or trousers, never changes colour, and never gains or loses a layer. The overnight bag stays on her shoulder throughout. Diamond stud earrings. No rings, no bracelets.

<<<66ab4872-3bbf-4ce0-8e0d-267753f00c37>>> is SIMONE, early thirties: FACE AND HAIR ONLY. A COPPER-AUBURN shoulder-length blunt bob, straight and glossy, deep side part and sweep EXACTLY as the reference shows, never mirrored. Her clothes come ONLY from <<<2a042d0e-64b9-477f-bc2d-2ad8cda38335>>>: ONE outfit, unchanged from first frame to last, with NO coat or jacket over it. She holds one glass of red wine.

<<<5deb4ada-665f-4894-8d16-2a9f34c0248f>>> is DORIAN: FACE, HAIR AND BODY ONLY. Preserve his exact facial identity, warm deep-brown complexion, short cropped hair with a clean lineup, and full short black beard. HIS CLOTHES COME ONLY FROM <<<f44003af-4374-4d5c-acbf-d4f2aad1f9b3>>>: any clothing visible in his identity reference is NEVER reproduced, and his all-black outfit from the party episode is NOT worn. ONE outfit, unchanged throughout. A dish towel over one shoulder.

THE ACTION, in order. The dialogue runs tight, with NO gap longer than a fraction of a second between lines:
Opening: Nia stands just inside the entry, her bag on her shoulder. Simone stands behind her by the open door. Dorian steps out of the kitchen wiping his hands, relaxed.
LINE 1 — DORIAN, calling toward the door: "Babe, who was at the —" He cuts himself off as he sees Nia. Both women's mouths stay closed.
He stops short. His eyes go from Nia, to Simone, and back to Nia in about one second. He understands.
LINE 2 — DORIAN, quietly: "Nia." Both women's mouths stay closed.
LINE 3 — SIMONE, to Dorian, still pleasant: "You know her?" Nia's and Dorian's mouths stay closed.
Push in on Nia. Her jaw tightens and her eyes fill with tears that she will not let fall.
LINE 4 — NIA, barely above a whisper: "You told me to come." Dorian's and Simone's mouths stay closed.
Dorian opens his mouth, and nothing comes out. He is stricken, not cruel: no smirk, no coldness, no menace.
Nia immediately turns and walks straight past Simone and out the open door, and the door SLAMS. Simone flinches. The take ends after one brief beat on Dorian and Simone standing apart in the entry.

Nia's English dialogue uses <<<12315c68-37de-41fe-8766-76ac07bcaf70>>>, her saved clear British voice: warm, low, dry and deadpan. Never a substitute voice, never swapped with anyone else's. She is BRITISH and every one of her lines is in a British accent.
SIMONE'S VOICE — SHE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. Warm, LOW-PITCHED, chesty and unhurried, with a relaxed pace and a soft landing on the ends of her sentences. She is clearly deeper and slower than Nia, and the two voices never sound alike. Never shrill, breathy, clipped, whispered, sing-song, or pitched up to match Nia. Her register is CHEERFUL AND PLEASANT: bright, warm, normal volume, genuinely having a nice time. No sneer, no smirk, no smugness, no drawl, no knowing look.
DORIAN'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A DEEP, LOW, CALM, COMPOSED adult male voice: an unhurried General American baritone pitched well below both women, with relaxed chest resonance, warm rather than gravelly. Never rushed, never breathy, never nasal, never a light or boyish tenor, never British, and never the same voice as any woman's. Once he sees Nia it goes quiet and caught: still warm, never cold, never smug.
ChiChi's saved voice element <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>> is attached to this generation, but CHICHI IS NOT IN THIS SCENE: she never appears and speaks no lines.

AUDIO: only the four lines above, in this order, each in the correct voice and never swapped: line 1 and line 2 are DORIAN, line 3 is SIMONE, line 4 is NIA. Plus soft loft ambience, faint music from elsewhere in the apartment, Nia's footsteps, and the hard door slam. No voice-over, no narration, no score.
Skin photographed, never cartoonish, waxy or airbrushed. Correct five-finger hands. No subtitles, no captions, no title cards, no on-screen text, no legible lettering anywhere.
```

---

## C3 — ACROSS TOWN · 11 s

**Elements:** living room, ChiChi ×3, Kel ×2, plus both voice elements

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

## C4 — THE QUESTION · 12 s

**Elements:** living room, ChiChi ×3, Kel ×2, plus both voice elements

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

## C5 — TAG · 9 s

**Elements:** living room, ChiChi ×3, Kel ×2, plus both voice elements

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
| N2 | C3, 0:00–0:03, over ChiChi's laugh (the first three seconds have no dialogue) | "Meanwhile, ChiChi was having the best night she'd had in a year." |
| N3 | C5, from Kel's smile fading through the pull back to the end | "One woman found out there was someone else. The other found out there wasn't going to be." |

**End card:** *EXCLUSIVE with Nia and Chi*. Add it as a title in the edit, not in a render.

## Continuity checks before approving a take

- **Wine levels:** Simone's single glass (C1–C2), and ChiChi's and Kel's two glasses (C3–C5), only ever go down. Never a third glass.
- **ChiChi:** honey-blonde, with the part on the left side of her head. Reject any take with dark hair or a ring.
- **Nia:** one outfit from the first frame of C1 to the last frame of C2, with the overnight bag on her shoulder throughout. Reject any take where her clothes change.
- **Simone:** never wears a coat. Her bob's part is never mirrored.
- **Living room:** no floor lamp, and the TV stays dark.
- **Lip-sync:** reject any take where the mouth movement doesn't match the words.

## Render log

**1 Oct 2026, first pass (old 7-clip numbering; old C5–C7 are now C3–C5):** submitted at 1080p without saved voice elements. Old C1–C4 were rejected because Nia's outfit changed between clips. Higgsfield's suggested presets were declined ("IN THE DARK" `24bae836…` for C1–C4, "EXIT THE DREAM" `3c00b5c4…` for C5–C7).

| Clip | Job ID |
|---|---|
| C1 | `76e1e104-643d-4e6e-9b64-fbb075a3ebc1` |
| C2 | `241e50f3-31ed-41b6-a9ec-835ca9e46485` |
| C3 | `975a60ac-e5f1-45fc-a6d4-5fa492528ff6` |
| C4 | `74107601-72ce-4be8-b73a-1a6b9b831bbb` |
| C5 | `2c53a4a1-9dfc-4e0a-aa5f-6bd6db72064a` |
| C6 | `f6c8be77-df23-45d6-9792-8b75ea79360c` |
| C7 | `9f1f91bc-794e-47fe-bbdb-cc720e468560` |
