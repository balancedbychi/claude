# Episode 14 — format check before any further filming (6 Oct 2026)

Approved so far: the exterior (job 77a0189c, Topaz cd25da3a) and the main-floor arrival
(job f774dbe6, Topaz 1016e508). The arrival clip ENDS on "Yo. Yo." / "Hi." Those words are
never said again.

Rejected, no Topaz: 4a952d67 (two-shot, repeated the greeting, faces off) and 9c877d2e (boys
in a line facing camera).

## 1. What the approved episodes actually did (read back from the Higgsfield job records)

Checked: every Seedance job from "Rented" (park, 4 Oct: 6bd09466, 237f27f4, 2b1095d7,
0281bda0, 890e6004, cade7ec3), "Almost Too Good" (bar 55e9dca5, 25-26 s; bedroom 10-15 s),
the restaurant chain (0afc3a1a to 8123d75b, 14-21 s) and the kitchen chain (b8403218 to
e354ea5a, 8-13 s).

| | Rented / Almost Too Good / restaurant (the format you approved) | What I did in 4a952d67 and 9c877d2e |
|---|---|---|
| Start image | NONE. No still plate at all. | A gpt-image still plate as start_image |
| Video reference | ONE clip, the same one for the whole episode: 159822f7 (the cafe clip with Nia, Tay and Dorian), named "THE AUTHORITY FOR VOICES ONLY" | 55e9dca5 (bar), named authority for faces AND voices |
| Identity | Elements only: FACE + BODY + LOOK per character, SET, VOICE. Nia-Body 9b1d610c and Tay-Body fe030a7d in every clip | Face + Look only; no Body elements |
| Lines per clip | 3 to 8 lines; about one line every 3 s; clips 8 to 26 s | 11 lines in 25 s |
| Camera | Medium-wide two-shot PLUS waist-up over-the-shoulder singles with clean cuts; no zooms; faces never tighter than chest-up | "Locked, no cuts, no push" |
| Movement | Written into the blocking: walking in, sitting down, stepping ahead; "WHAT EVERYONE IS DOING" section; extras kept clear of the leads and silent | Two people standing still trading lines; six extras in a line facing camera |
| Context | A "WHERE WE ARE" paragraph and a FIRST FRAME described in words | First frame = the still plate |

Why the faces went wrong: in the Rented format the character elements are the only face
source, so the model draws Nia and Tay from them. When a close two-shot still plate is attached
as the start image, the plate's faces (a gpt-image guess at them) win over the elements. The
wide doorway plate in f774dbe6 got away with it because the faces were tiny; the close plate I
in 4a952d67 did not.

Why the boys were cringe: plate J put six men in a row facing the lens. In the approved
episodes extras are "far in the background, never near the main two, never speaking" or, when
one speaks, he is one person in the background with the others in soft focus.

## 2. The corrected recipe for every remaining Episode 14 clip

- seedance_2_5, mode omni_reference, 720p, 9:16, generate_audio true, 10 to 20 s.
- medias: ONE video reference only: 159822f7 (voices authority for Nia and Tay). NO start image.
- Elements in the prompt: set; Nia-Face 3497a052, Nia-Body 9b1d610c, Nia-Nice-Building-Dress-v3
  62615e58, Nia-Canon-Voice-v2 b3d2fc9b; Tay-Face 288d8911, Tay-Body fe030a7d,
  Tay-Nice-Building-Look 35062476.
- Prompt order (copied from the Rented park and bar prompts): N SECONDS + genre/time/place;
  TIMING (no dead air, replies within 0.3 s); REFERENCE VIDEO (voices only); WHERE WE ARE;
  HEADCOUNT; SET; NIA; TAY; BLOCKING; THE CLIP SHOT BY SHOT with timestamps; LINE OWNERSHIP;
  VOICES (NIA IS BRITISH block); CAMERA; PHYSICS; AUDIO.
- 3 to 6 lines per clip. Every clip has a physical action running under the lines (a step, a
  turn, a hand, a look at the room). Extras never face the lens in a row.
- The still plates stay as the blocking guide for me and for the edit; they are no longer
  attached to video jobs.
- No line from an approved clip is ever repeated. Each new clip's prompt names the previous
  clip's last line and states "those words are not said again".

## 3. The next three clips, in full, for your sign-off (nothing submitted yet)

Cost at 720p: A 15 s = 105 cr, B 14 s = 98 cr, C 10 s = 70 cr; total 273 cr, plus Topaz
about 32 cr for the three. Balance now about 4,318.

### Clip A — "The safe one" (15 s)

15 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, the main floor of a restored 1920s banking hall that is now a high-end club, on its launch night. Wholesome, fully clothed.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within three tenths of a second of the line before it; the only beat is Nia's half-second of fighting a smile. Nobody stands frozen; every gap is filled with natural movement and reactions. The clip ends within half a second of the last line.

REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. The petite woman in it is NIA. The skinny tattooed young man who says "Everything okay?" is TAY. The tall heavily built man is DORIAN, who does NOT appear in this clip. Nothing else is taken from it: not the cafe, not anyone's clothes, not any line of dialogue.

WHERE WE ARE: Tay has just crossed his own club to meet Nia at the entrance and said hello; she said "Hi." Those words are NOT said again. This clip starts a half-second later, with the two of them face to face a foot apart just inside the entrance, and the first words spoken are Tay's "That's not the safe one."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE NIA, ONE TAY. NEVER TWO OF ANYONE. *** A crowd of stylish guests in deep soft focus behind them, nobody near them, nobody speaking, nobody looking at the camera.

SET: the main floor of The Ledger <<<02fe15f7-d8a5-45fd-8a54-1956abfc770d>>>, exactly as the reference shows: white marble floor with black veining, tall fluted columns uplit amber, one enormous brass ring chandelier, the brass teller cages along the LEFT as a long bar, a brass DJ cage at the far end, cream velvet banquettes on the RIGHT, haze, warm amber light. The entrance is at the camera end of the hall. No text, logos or signage.

NIA: face, hair and skin EXACTLY <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>, body <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls worn down, diamond stud earrings. HER CLOTHES COME ONLY FROM <<<62615e58-aba0-49ff-8fd7-a70089fee959>>>: the green satin evening dress, brown heeled shoes, the small brown bag in her RIGHT hand, identical in every shot. PETITE, about 5'2", the shortest person on screen. NO RINGS, no bracelets, no watch.

TAY: face, eyes, hair and skin EXACTLY <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>>, body <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>>: twenty-five, Black American, caramel brown skin, striking light grey eyes, low-cut fade with a sharp lineup, tattoos on his neck. HIS CLOTHES COME ONLY FROM <<<35062476-f6a3-4467-bf93-1547537854ef>>>: black leather overshirt worn open over a fitted black tee, black tailored trousers, black leather sneakers, a diamond iced-out Cuban link chain, identical in every shot; never a suit. SKINNY, about 5'10", a full head taller than Nia: the top of her head is at his shoulder. NO RINGS, no watch. Hands empty.

BLOCKING: they stand face to face just inside the entrance, Tay on NIA'S OWN LEFT. The camera is inside the hall looking back toward the entrance, so NIA is on frame LEFT and TAY on frame RIGHT, and they never swap. Her guard pose: bag in her right hand, left hand holding her right elbow. His right hand half-raised toward her, undecided, then dropping.

THE CLIP, SHOT BY SHOT:
FIRST FRAME: medium two-shot, the two of them a foot apart, Tay already looking her up and down.
1. (0-5 s) Two-shot. Tay's eyes go dress, face, dress; he takes a half step back to see the whole dress and shakes his head once, grinning.
  TAY (American), low, delighted: "That's not the safe one."
  NIA (British), chin up, dry, no gap: "How would you even know which one was the safe one?"
2. (5-8 s) Waist-up on Tay over Nia's right shoulder. Simply, like it's obvious:
  TAY (American): "'Cause that's not it."
3. (8-11 s) Waist-up on Nia over Tay's left shoulder. She fights a smile and loses it, half a second; then she looks past him into the room, a quarter turn of the head, taking in the hall, and takes two slow steps forward into the room past his right side; he turns with her, staying on her left.
4. (11-15 s) Two-shot, both now facing into the hall, side by side, her at frame LEFT, him at frame RIGHT, the chandelier above them.
  NIA (British), looking at the room, not at him: "So this is it."
  TAY (American), proud, watching her face instead of the room: "This is it."
  END on his face watching her.

LINE OWNERSHIP, NEVER SWAPPED: "That's not the safe one." = TAY. "How would you even know which one was the safe one?" = NIA. "'Cause that's not it." = TAY. "So this is it." = NIA. "This is it." = TAY. Only these five lines, in this order.

VOICES. *** NIA IS BRITISH. EVERY WORD SHE SAYS IS IN A BRITISH ACCENT. *** Her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>> and matches her voice in the reference video EXACTLY: warm, low, dry London accent, British vowels, crisp consonants, no hard R; never American, never drifting mid-line. TAY'S VOICE matches his voice in the reference video EXACTLY: a smooth, deep, laid-back young Black American baritone, urban contemporary cadence, dropping his g's; never high, nasal, boyish or British. The two voices never sound alike.

CAMERA: steady, eye level, always from inside the hall. Medium two-shot with clean cuts to waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS, faces never tighter than chest-up. Both stand on the same floor; Tay a full head taller in every shot.
PHYSICS: natural steps in heels, five-finger hands, exactly two arms per person, the bag stays in her right hand.
AUDIO: only these five lines, a low warm club beat under everything, the murmur of a crowd far off. No other voices, no narration. No subtitles, captions or on-screen text.

### Clip B — "Nice building" (14 s)

14 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, the main floor of a restored 1920s banking hall that is now a high-end club, on its launch night. Wholesome, fully clothed.

TIMING, READ THIS FIRST. NO DEAD AIR. Every reply starts within three tenths of a second of the line before it; the only beat is one flat second before Nia's "It's nice." Nobody stands frozen. The clip ends within half a second of the last line.

REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. The petite woman in it is NIA. The skinny tattooed young man who says "Everything okay?" is TAY. Nothing else is taken from it: not the cafe, not anyone's clothes, not any line of dialogue.

WHERE WE ARE: Nia has just stepped into Tay's club with him at her side and said "So this is it," and he said "This is it." Those words are NOT said again. This clip starts a half-second later, the two of them standing side by side a few steps inside the hall looking at the room, and the first words spoken are Nia's "It's nice."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE NIA, ONE TAY. NEVER TWO OF ANYONE. *** Plus, in the background at frame LEFT, a loose group of five or six of Tay's friends leaning on the bar, in soft focus, facing each other and their drinks, never facing the camera, never in a row. ONE of them, the nearest, speaks one line. A crowd of other guests in deep soft focus elsewhere, nobody near the leads, nobody else speaking.

SET: the main floor of The Ledger <<<02fe15f7-d8a5-45fd-8a54-1956abfc770d>>>, exactly as the reference shows: white marble floor with black veining, tall fluted columns uplit amber, one enormous brass ring chandelier overhead, the brass teller cages along the LEFT as a long bar with LED-lit onyx counters, cream velvet banquettes on the RIGHT, haze, warm amber light. No text, logos or signage.

NIA: face, hair and skin EXACTLY <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>, body <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls worn down, diamond stud earrings. HER CLOTHES COME ONLY FROM <<<62615e58-aba0-49ff-8fd7-a70089fee959>>>: the green satin evening dress, brown heeled shoes, the small brown bag in her RIGHT hand, identical in every shot. PETITE, about 5'2", the shortest person on screen. NO RINGS.

TAY: face, eyes, hair and skin EXACTLY <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>>, body <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>>: twenty-five, Black American, caramel brown skin, striking light grey eyes, low-cut fade with a sharp lineup, neck tattoos. HIS CLOTHES COME ONLY FROM <<<35062476-f6a3-4467-bf93-1547537854ef>>>: black leather overshirt worn open over a fitted black tee, black tailored trousers, black leather sneakers, a diamond iced-out Cuban link chain, identical in every shot; never a suit. SKINNY, about 5'10", a full head taller than Nia. NO RINGS. Hands empty.

THE FRIENDS: five or six Black American men in their mid twenties, different faces and builds, dressed up in different ways, none resembling Tay, none in a leather overshirt, none with a diamond chain. Whole bodies, feet on the floor, each glass in a hand or on the counter.

BLOCKING: Nia and Tay stand side by side facing into the hall, Tay on NIA'S OWN LEFT; the camera is ahead of them inside the hall looking back at them, so NIA is at frame LEFT and TAY at frame RIGHT, and they never swap. The bar with his friends is behind them and to the side at frame LEFT, several steps away. Her guard pose held: bag in her right hand, left hand on her right elbow. Tay's hands at his sides.

THE CLIP, SHOT BY SHOT:
FIRST FRAME: medium-wide two-shot, the two of them looking at the room, the friends soft at the bar behind at frame left.
1. (0-3 s) Nia's eyes travel the room one more time; she gives it one flat second, then:
  NIA (British), flat, giving him nothing: "It's nice."
2. (3-5 s) Waist-up on Tay over Nia's right shoulder: stung, eyebrows up, head tilting.
  TAY (American): "Nice?"
3. (5-8 s) Waist-up on Nia over Tay's left shoulder: she turns her head a quarter turn to him, deadpan, the smile hiding in the corner of her mouth.
  NIA (British): "It's a nice building, Tay."
4. (8-11 s) Two-shot. Tay looks straight up at the chandelier and speaks to the ceiling, half laughing, both hands lifting a little from his sides and dropping.
  TAY (American), to the ceiling: "Nice. She said nice."
5. (11-14 s) Same two-shot. From the bar behind them at frame left, the nearest friend leans back off the counter and calls across, grinning; the others crack up; Tay closes his eyes for a second and does not turn round.
  FRIEND (American), loud, delighted, from the background: "She said nice, bro."
  TAY (American), eyes still shut, dry: "I heard her."
  END on Nia glancing toward the bar, amused despite herself.

LINE OWNERSHIP, NEVER SWAPPED: "It's nice." = NIA. "Nice?" = TAY. "It's a nice building, Tay." = NIA. "Nice. She said nice." = TAY. "She said nice, bro." = THE FRIEND at the bar. "I heard her." = TAY. Only these six lines, in this order.

VOICES. *** NIA IS BRITISH. EVERY WORD SHE SAYS IS IN A BRITISH ACCENT. *** Her voice is <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>> and matches her voice in the reference video EXACTLY: warm, low, dry London accent, British vowels, crisp consonants, no hard R; never American. TAY'S VOICE matches his voice in the reference video EXACTLY: a smooth, deep, laid-back young Black American baritone, urban contemporary cadence; never high, nasal or British. THE FRIEND: a brighter, louder young Black American man's voice, clearly different from Tay's, heard from a few steps away. The voices never sound alike.

CAMERA: steady, eye level, always from inside the hall ahead of them. Medium-wide two-shot with clean cuts to waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS, faces never tighter than chest-up. Everyone on the same floor; Tay a full head taller in every shot.
PHYSICS: five-finger hands, exactly two arms per person, the bag stays in her right hand, every glass in a hand or on the counter.
AUDIO: only these six lines plus the friends' laughter, a low warm club beat, crowd murmur far off. No narration. No subtitles, captions or on-screen text.

### Clip C — "We're walking now" (10 s)

10 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, the main floor of a restored 1920s banking hall that is now a high-end club, on its launch night. Wholesome, fully clothed.

TIMING, READ THIS FIRST. NO DEAD AIR. Every reply starts within three tenths of a second of the line before it. Nobody stands frozen; the two leads are walking by the halfway point. The clip ends as they walk out of frame.

REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. The petite woman in it is NIA. The skinny tattooed young man who says "Everything okay?" is TAY. Nothing else is taken from it: not the cafe, not anyone's clothes, not any line of dialogue.

WHERE WE ARE: Nia has just called Tay's club "a nice building" and his friends at the bar heard it; one of them called "She said nice, bro" and Tay said "I heard her." Those words are NOT said again. This clip starts a half-second later and the first words are a second friend's "Two years. Space heater. Nice."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE NIA, ONE TAY. NEVER TWO OF ANYONE. *** Plus the same loose group of five or six friends at the bar in the background at frame LEFT, soft focus, facing each other, never in a row, never facing the lens; ONE of them (not the one who spoke before) says one line. Other guests in deep soft focus, nobody near the leads.

SET: the main floor of The Ledger <<<02fe15f7-d8a5-45fd-8a54-1956abfc770d>>>, exactly as the reference shows: white marble floor with black veining, fluted columns uplit amber, the brass ring chandelier, the brass teller-cage bar along the LEFT with LED-lit onyx counters, cream banquettes on the RIGHT, haze, warm amber light. No text, logos or signage.

NIA: face, hair and skin EXACTLY <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>>, body <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>>: thirty, Black British, deep warm brown skin, jet-black waist-length water-wave curls, diamond stud earrings. HER CLOTHES COME ONLY FROM <<<62615e58-aba0-49ff-8fd7-a70089fee959>>>: the green satin evening dress, brown heeled shoes, the small brown bag in her RIGHT hand. PETITE, about 5'2", the shortest person on screen. NO RINGS.

TAY: face, eyes, hair and skin EXACTLY <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>>, body <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>>: twenty-five, Black American, caramel brown skin, light grey eyes, low-cut fade, neck tattoos. HIS CLOTHES COME ONLY FROM <<<35062476-f6a3-4467-bf93-1547537854ef>>>: black leather overshirt open over a fitted black tee, black tailored trousers, black leather sneakers, a diamond iced-out Cuban link chain; never a suit. SKINNY, about 5'10", a full head taller than Nia. NO RINGS.

THE FRIENDS: as before; whole bodies, feet on the floor, each glass in a hand or on the counter.

BLOCKING: Nia and Tay side by side facing into the hall, Tay on NIA'S OWN LEFT; camera ahead of them inside the hall looking back, so NIA at frame LEFT and TAY at frame RIGHT. The bar with the friends is behind them at frame LEFT. On his line Tay puts his RIGHT hand flat on the small of her back and walks her forward past the camera's right side, deeper into the hall, the two of them side by side, her head at his shoulder.

THE CLIP, SHOT BY SHOT:
FIRST FRAME: medium-wide two-shot, the friends soft at the bar behind at frame left, one of them leaning forward off the counter to call across.
1. (0-4 s) Two-shot. The second friend counts it off on his fingers, loud; the rest of the group falls about laughing; Nia's eyebrows go up and she looks at Tay.
  FRIEND 2 (American), relishing it, from the background: "Two years. Space heater. Nice."
2. (4-7 s) Waist-up two-shot. Tay does not look at the bar. He puts his right hand on the small of Nia's back and starts her walking.
  TAY (American), to Nia, half laughing: "Okay. We're walking now."
3. (7-10 s) Same framing; they walk forward and pass out of frame at the camera's right, Nia letting herself be steered, finally smiling, the bag in her right hand; the friends still laughing at the bar behind. END as they clear the frame.

LINE OWNERSHIP, NEVER SWAPPED: "Two years. Space heater. Nice." = FRIEND 2. "Okay. We're walking now." = TAY. Nia says nothing. Only these two lines.

VOICES. NIA (<<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>>) is British and silent in this clip. TAY'S VOICE matches his voice in the reference video EXACTLY: a smooth, deep, laid-back young Black American baritone, urban contemporary cadence; never high, nasal or British. FRIEND 2: a deeper, slower Black American man's voice, clearly different from Tay's, heard from a few steps away.

CAMERA: steady, eye level, inside the hall ahead of them; medium-wide two-shot and one waist-up two-shot; the camera does not follow them out. NO ZOOMS, NO PUSH-INS. Everyone on the same floor; Tay a full head taller.
PHYSICS: natural walking in heels, five-finger hands, exactly two arms per person, his hand stays flat on her lower back as they walk, every glass in a hand or on the counter.
AUDIO: only these two lines plus the friends' laughter, a low warm club beat, crowd murmur. No narration. No subtitles, captions or on-screen text.

## 4. After these three

The walk-and-talk (scene 14.5), the vault, the announcement and the roof get the same
treatment: no plates attached, 159822f7 as the voice authority, body elements in, 3 to 6
lines per clip, movement under every line. Zarya's first clip will need her voice chosen
before it is written. Scene 14.1 (FaceTime) stays on hold until you pick Option A or B.
