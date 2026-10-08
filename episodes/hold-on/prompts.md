# "Hold On" (Episode 15): production notes and prompts

Read `script.md` first: it has the story, the cast and tags, the floor plan and the beat-by-beat for all five clips. This file holds what is sent to Seedance 2.5, one clip at a time. **Nothing is filmed until you say "film"** (rule 9), and a clip is filmed only after you have seen and approved the one before it. All five prompts are written now so you can read the whole episode in one go. After each approved clip I check the next prompt's first frame against what really happened, and tell you about any change before I ask for your go.

**Status (8 Oct 2026): prompts for your review. No video has been made.** The set and both looks are saved from your uploads (script.md, THE LOOKS).

## WHAT YOU ARE APPROVING

- **Five clips, 54 seconds, 378 credits at 720p** (7 credits a second). Balance today: **724.27**. A 30% retake allowance brings it to about 491, which fits.
- **Who and what is attached to every clip:** the set `Atlanta-Art-Museum-Gallery`; ChiChi (`ChiChi-Face`, `ChiChi-Body`, `ChiChi-Museum-Look`, her voice element); DB (`DB-Face`, `DB-Body`, `DB-Museum-Look`, and his voice from his written description, word for word).
- **The chain (rule 7, which you approved):** Clip 01 attaches Episode 11's approved Clip 05 for voices only; each later clip attaches the approved clip before it as its video reference.
- **The lines and the ending** are exactly the ones you approved in the script. The ending is DB leaning back, taken aback, and a cut within half a second.

## MY DEFAULTS (say so if you want any changed)

| # | Item | My default | Why |
|---|---|---|---|
| 1 | Resolution | **720p, standard bitrate**, 7 credits a second: 378 credits (about 491 with retakes). | Your "let's do 720p" (Episode 11) and the balance. Episode 13's soft faces were fixed by **1080p at high bitrate** (12 credits a second). If Clip 01's faces come out soft I'll tell you and re-film it that way. All five at 1080p high would be 648 credits (about 842 with retakes), more than the balance. |
| 2 | Start images | **None.** The set, the elements and one video reference carry the clip. | The recipe Episode 14 finished on: when a still plate was attached, its guessed faces overrode the elements' faces. |
| 3 | Voices for Clip 01 | Episode 11's approved Clip 05 (`1a685bed…`), **voices only**: both ChiChi and DB speak in it. | DB has no voice element, so an approved clip is the best anchor (rules 3b and 7). The prompt says nothing else is taken from it: not the restaurant, the clothes or any line. |
| 4 | Visitors | **One** silent visitor, far back, in muted charcoal and cream, never within ten feet of the leads. | The script said one or two; fewer extras means fewer surprises. Say "none" for an empty gallery. |
| 5 | The bench (Clip 03) | They sit side by side **facing the room, toward the camera**, with the white wall and the two-panel picture behind them. | It keeps both faces visible for the key line. The foreground bench in your plate faces the camera that way. |
| 6 | Clip lengths | As scripted: 13, 11, 13, 10 and 7 seconds. | The slowest delivery is DB's last line in Clip 04 (7 words in 4.1 seconds, an absent drawl). If it comes out with gaps I'll shorten that clip by a second. |
| 7 | Sides | **ChiChi frame LEFT, DB frame RIGHT** in every shot and every cut. | As in the script's floor plan and Episode 11. |

## WHAT I CHECKED (skill step 9: the call-outs, and how each is answered in the prompts)

- **"Hold on" is DB's refrain** and appears in Clips 02, 03 and 04. The rule against repeating the reference clip's dialogue could make the model avoid it, so Clips 02 to 04 carry one sentence saying those words are new lines, exactly as written.
- **Left and right on the bench.** ChiChi faces the camera there, so she pats the empty cushion with her **left** hand (the cushion at frame RIGHT).
- **DB's phone is always in his right hand** (the hand away from ChiChi) and his watch on his left wrist (nearest her), in every clip.
- **Clip 02's walk:** side by side, same direction, same pace, along the wall; at the small picture DB stops on her right, half a step further along. ChiChi's line stops on the word "imagine" and the prompt says no word follows it.
- **Clips 04 and 05, DB small and far away:** the prompts say the small figure in the corner IS DB and that there is only ever one DB. The caller is never heard.
- **Clip 05's silent reaction** is about a second and a half. The prompt says DB makes no sound of speech and quotes none of the words the model might reach for (the "Say Less" lesson).
- **ChiChi seated** (Clip 03): knees together, ankles crossed, the dress falling to mid-calf.
- **Time jumps:** DB's walk to the far corner (between Clips 03 and 04) and his walk back (into Clip 05) are not shown; each prompt's WHERE WE ARE says when the clip picks up.
- **Timings:** the shot windows follow the script's beats, with the 0.1 to 0.2 second gaps closed and Clip 02's windows re-spaced, so no line is faster than about 2.9 words a second (your Episode 11 clips ran faster and ChiChi's speech came out slightly broken). The clip lengths are unchanged.
- **Clip 04: ChiChi's voice element is left off** and the prompt says she says nothing, as in Episode 11's silent clip, so the model has no reason to give her a sound.
- **Wording:** no "fully clothed" and no body words beyond "full-figured with a defined waist" (Episode 14's Clip X1 v1 was blocked by the content check, and that wording was one of the likely triggers). The one banned-list word in the prompts, "mature", is inside DB's locked voice description, which stays word for word.

## SETTINGS (every clip)

| Setting | Value |
|---|---|
| Model | `seedance_2_5`, `mode: omni_reference` (required with any attached media), `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612` ("IN THE DARK") |
| Aspect · resolution | 9:16 · **720p** |
| Audio | `generate_audio: true` |
| Start image | None |
| Video reference | Clip 01: Episode 11's approved Clip 05 `1a685bed-7301-4d05-b755-4928b3202078` (voices only). Clips 02 to 05: the approved clip before it, role `video_references` |
| Elements | In `reference_elements` **and** each element's image in `medias` as `image_references` (the API rejects element-only requests), each pointed at in the prompt by its `<<<id>>>` placeholder |
| Cost | 7 credits a second |

## ELEMENTS ATTACHED (every clip)

| Tag | Element | ID | Image (media) |
|---|---|---|---|
| `[Gallery]` | Atlanta-Art-Museum-Gallery | `f4bd8e99-83bd-4904-9f98-510f71713494` | `33950dd7-42a1-47fc-bdcc-7a3d229c49e6` |
| `[ChiChi-Mus]` | ChiChi-Face | `b03240bd-4562-4d2f-8b14-de32c018e346` | `7af2905b-301b-4d9a-b114-2ff61b9f565a` |
| | ChiChi-Body | `46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc` | `03584942-3cc7-4562-bf81-0d33e0c8d135` |
| | ChiChi-Museum-Look | `fc4e50ad-000e-4c0d-98d9-a1256f2a4010` | `ed958852-09a0-47a6-8033-1bf01dd841d7` |
| ChiChi's voice | ChiChi-Canon-Voice-v1 | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` | the voice element (left off in Clip 04, where she is silent) |
| `[DB-Mus]` | DB-Face | `1023755a-b704-4c10-b0f4-bf9887d2558c` | `59a6dfb3-9ee2-475c-9bec-93cd290c8524` |
| | DB-Body | `952f3fb0-ed54-4551-a07c-c56934939a44` | `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969` |
| | DB-Museum-Look | `1130f30a-cfff-4a89-9a1e-eece45bd1a70` | `245c3cca-b933-4b23-b07a-17c426904ffe` |
| DB's voice | Written description, word for word (`characters/db.md`) | none | none |
| `[DB-Phone]`, `[Visitors]` | None: described in words | none | none |

## RISKS AND GUARDS (skill step 8)

| Risk | Guard in the prompt |
|---|---|
| ChiChi sounding British | Her voice element plus "ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice" (rule 10). |
| DB's voice drifting or turning into a caricature | His full written description, word for word, including "never a heavy stereotype"; the approved voice clip as the authority (Clip 01), then the previous clip (rule 7). |
| Extra lines, or the visitor talking | "Only these lines, in this order, each said once"; LINE OWNERSHIP in every prompt; the visitor's mouth is closed; AUDIO bans other voices and music. |
| Replaying the previous clip's lines (rule 9) | Each prompt names its own first line and refers to the reference's last line only as "the reference video's final line, which is NOT said again". DB's refrain gets one explicit sentence. |
| Two of anyone, above all a second DB (Clips 04 and 05, when he is small and far away) | HEADCOUNT in every prompt; "the small figure in the far corner IS DB"; he is already in place in the first frame; "only ever ONE DB". |
| Dead air, or an invented line at the end (Clip 05 is the riskiest: a silent reaction) | Every clip ends on a spoken line or within half a second of the action; "after that, silence: nobody speaks"; Clip 05 says DB makes no sound of speech and quotes none of the words the model might reach for. |
| The phone | One object moves; the screen never faces the camera; no text or bubbles; it is in DB's right hand every time; the buzz is a half-second sound, never a ringtone; a real phone at his ear, never on speaker (rule 1). |
| ChiChi's shape drifting slimmer (it did in the first look stills) | Fixed in the look image itself (the C2 dress follows her shape); every prompt says "full-figured with a defined waist and full hips and thighs, never slimmed, never boxy"; her body element is attached. |
| Soft or blurry faces (Episode 13) | "FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS" for both; waist-up singles in three-quarter view. If Clip 01 is soft: re-film at 1080p high bitrate. |
| Patchy skin | ChiChi's skin is "one even, uniform warm brown everywhere, never patchy or blotchy". |
| Swapped sides | ChiChi LEFT and DB RIGHT "in every shot and every cut"; the camera never crosses to the other side of the room; every head turn is written. |
| Walking (Clip 02) | Side by side, same direction, same pace, staying together (rule 11). DB leaves (Clip 03) and returns (Clip 05) along the far side, so he never crosses in front of ChiChi. |
| The art changing, or new text | "Exactly as in the reference image: nothing added, moved, swapped or restyled"; labels blank; no readable text except the printing on the boxes; the set image decides the layout. |
| The visitor too close, or in the wrong clothes | Muted charcoal and cream, nothing orange, rust, red, emerald or navy; far back; in Clip 04 at the far right end of the orange wall, away from DB's corner. |
| Orange or rust on the leads | Neither lead wears any; ChiChi's belt is "muted tan-brown". |
| Clothes copied from the face or body images | "Clothes come ONLY from" each look element; "nothing is worn from the face or body references" (rule 2). |
| Rings | NO RINGS, stated for both in every prompt (rule 3a). |
| Floor reflections turning into a second person | "Reflections are soft colour only, never a second figure." |
| Content-check blocks (Episodes 12 to 14) | Neutral, wholesome wording: no "fully clothed", no body words beyond "full-figured with a defined waist". |
| The first submission failing with a reference video (Episode 11: twice, both refunded) | If it happens I resubmit the identical request. |

## BEAT CHECK ACROSS THE CLIPS

| Clip | Opens with | Ends with | DB's phone | Reference video |
|---|---|---|---|---|
| 01 | ChiChi and DB at the foot of the two-panel picture | ChiChi's eyes on the picture; DB looking at her, the phone lowered but still in his hand | right hand, hanging | Episode 11 Clip 05, voices only |
| 02 | Mid-walk along the white wall toward the small picture | ChiChi facing the small picture, mouth closed; DB beside her, phone in hand | right hand, held up | Clip 01 |
| 03 | ChiChi seated on the left cushion of the foreground bench; DB standing at its right end | ChiChi alone on the left cushion; DB walking away up the room, phone at his right ear | at his ear | Clip 02 |
| 04 | ChiChi rising from the bench; DB far away in the back corner, phone at his ear | ChiChi at the two-panel picture, hands tight, jaw set; DB still in the corner, heard only | at his ear | Clip 03 |
| 05 | ChiChi at the two-panel picture; DB walking back from the corner, finishing a text | DB leaning back, taken aback; the phone in his right trouser pocket | into his pocket | Clip 04 |

Sightline checks are in `script.md`; every look, turn and exit they list is written into the shots below.

---

# THE FIVE PROMPTS

## CLIP 01 · "One Second" · 13 s · 91 credits · v1 · AWAITING YOUR "FILM"

**First line:** ChiChi's "I could stand here all afternoon." **Final line:** DB's "Give it time. I like that."

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 13`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`; `medias`: `video_references` = `1a685bed-7301-4d05-b755-4928b3202078` (Episode 11's approved Clip 05, **voices only**), plus the seven element images as `image_references` (`33950dd7-42a1-47fc-bdcc-7a3d229c49e6`, `7af2905b-301b-4d9a-b114-2ff61b9f565a`, `03584942-3cc7-4562-bf81-0d33e0c8d135`, `ed958852-09a0-47a6-8033-1bf01dd841d7`, `59a6dfb3-9ee2-475c-9bec-93cd290c8524`, `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969`, `245c3cca-b933-4b23-b07a-17c426904ffe`); the eight elements in `reference_elements`. No start image.

```
13 SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. A couple on a Saturday afternoon date, looking at art together. Wholesome.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; the only beat is DB's phone buzzing once, about half a second. Nobody stands frozen: every gap is filled with natural movement or a reaction. The clip opens with the action already moving and ends within half a second of the last line.

REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. The honey-blonde woman in it is CHICHI and the tall man in it is DB. Nothing else is taken from it: not the restaurant, not the server, not anyone's clothes, not any line of dialogue. In THIS clip ChiChi's voice is EXACTLY her voice in the reference video and DB's voice is EXACTLY his voice in the reference video.

WHERE WE ARE: Saturday afternoon in the Atlanta Art Museum. DB cleared the whole day for ChiChi and they have just arrived at the first big picture in this gallery: this is the first moment of their afternoon together, so there is no earlier dialogue. DB is warm, attentive and present. The first words spoken are ChiChi's "I could stand here all afternoon."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** Both are already standing at the picture in the first frame; nobody new arrives. ONE other museum visitor, far away at the orange wall at the back, tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within ten feet of them.

SET: the gallery <<<f4bd8e99-83bd-4904-9f98-510f71713494>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no logos or signage. Floor reflections are soft colour only, never a second figure.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, her skin one even, uniform warm brown everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured with a defined waist and full hips and thighs, never slimmed, never boxy. HER CLOTHES COME ONLY FROM <<<fc4e50ad-000e-4c0d-98d9-a1256f2a4010>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1", clearly taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<1130f30a-cfff-4a89-9a1e-eece45bd1a70>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. ChiChi's hands are empty. In this clip it is in DB's RIGHT hand, hanging at his side, until it buzzes in the middle of the clip.

BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. The camera never crosses to the other side of the room and the two never swap sides. They stand side by side at the foot of the big two-panel picture on the long white wall, both facing the picture, a quarter turn toward the camera so their faces stay in three-quarter view, ChiChi nearer the camera and DB on her right, one step further along the wall toward the back corner. DB's steel WATCH is on his LEFT wrist, the wrist nearest ChiChi; his phone is in his RIGHT hand, the hand away from her. When they speak to each other they turn their heads, not their whole bodies. Nobody crosses in front of anybody.

FIRST FRAME: a medium-wide two-shot from the room side, already in motion. At the foot of the big two-panel picture, ChiChi at frame LEFT, head tipped back, looking up at the picture, hands loosely clasped in front of her; DB at frame RIGHT, one step further along the wall, looking at the picture, his phone in his RIGHT hand hanging at his side. ChiChi starts speaking at once.

THE CLIP, SHOT BY SHOT:
1. (0-2.2 s) Two-shot. ChiChi looks up at the picture, a small contented breath, and speaks; DB glances from the picture to her, a small smile.
  CHICHI (American), warm, looking up: "I could stand here all afternoon."
2. (2.2-4.1 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. He turns his head fully to her, warm and present, his eyes on her face, and answers at once.
  DB (Dominican), warm: "Tell me what you see."
3. (4.1-7.8 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. Her eyes on the picture, then a small nod toward it as she explains, one finger lifting from her clasped hands to point.
  CHICHI (American): "Little pieces up close. You have to give it time."
4. (7.8-8.3 s) Two-shot. ChiChi keeps looking at the picture. DB's phone BUZZES once in his right hand: one short soft buzz, about half a second, and his eyes drop to it.
5. (8.3-9.5 s) Waist-up on DB. His thumb is already moving on the phone, his eyes on it; he answers at once, apologetic.
  DB (Dominican): "Sorry. One second."
6. (9.5-10.3 s) Waist-up on ChiChi. A small gracious smile, her eyes back on the picture.
  CHICHI (American): "Go ahead."
7. (10.3-13 s) Two-shot. ChiChi looks at the picture; DB looks up from the phone, lowers it to his side and turns his eyes to her, warmly.
  DB (Dominican): "Give it time. I like that."
  END on this line: ChiChi's eyes on the picture, her smile a little smaller; DB looking at her, the phone still in his hand. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "I could stand here all afternoon." = CHICHI. "Tell me what you see." = DB. "Little pieces up close. You have to give it time." = CHICHI. "Sorry. One second." = DB. "Go ahead." = CHICHI. "Give it time. I like that." = DB. Only these six lines, in this order, each said once.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. Smooth, whole words; never broken or stuttered.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; each line is one continuous, easy run.
The two voices never sound alike and never swap.
CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):
- CHICHI: head tipped back looking up at the picture, a small nod at it, a finger lifting to point, a small smile, her eyes back on the picture.
- DB: a glance from the picture to her, his head turning to her, his thumb moving on the phone, looking up again, lowering the phone to his side.
- THE VISITOR: far back at the orange wall, slowly moving along the framed prints and looking at them, silent, never near the leads.

CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.

PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them.

AUDIO: only these six lines and the one short phone buzz, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 02 · "Hold On" · 11 s · 77 credits · v1 · AWAITING YOUR "FILM"

**First line:** ChiChi's "This one's my favorite so far." **Final line:** ChiChi's "Sure."

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 11`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`; `medias`: `video_references` = the approved Clip 01 (job ID filled in after your approval), plus the seven element images as `image_references` (`33950dd7-42a1-47fc-bdcc-7a3d229c49e6`, `7af2905b-301b-4d9a-b114-2ff61b9f565a`, `03584942-3cc7-4562-bf81-0d33e0c8d135`, `ed958852-09a0-47a6-8033-1bf01dd841d7`, `59a6dfb3-9ee2-475c-9bec-93cd290c8524`, `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969`, `245c3cca-b933-4b23-b07a-17c426904ffe`); the eight elements in `reference_elements`. No start image.

```
11 SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. A couple on a Saturday afternoon date, looking at art together. Wholesome.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; the only beat is DB's phone buzzing once, about half a second. Nobody stands frozen: every gap is filled with natural movement or a reaction. The clip opens with the action already moving and ends within half a second of the last line.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same afternoon, in this same gallery. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, the same gallery and the same light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated. This clip continues from the reference video's final moment. The FIRST line of this clip is ChiChi's "This one's my favorite so far." DB's habit of saying "Hold on" is part of the story: where this clip's lines contain those words they are NEW lines, exactly as written below.

WHERE WE ARE: this picks up a few seconds after the reference video's final line, which is NOT said again. ChiChi and DB have left the big picture and are walking along the white wall toward the smaller square picture a few steps further on. DB's phone is in his right hand and his thumb is moving on it as he walks. The first words spoken are ChiChi's "This one's my favorite so far."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** Both are already walking in the first frame; nobody new arrives. ONE other museum visitor, far away at the orange wall at the back, tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within ten feet of them.

SET: the gallery <<<f4bd8e99-83bd-4904-9f98-510f71713494>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no logos or signage. Floor reflections are soft colour only, never a second figure.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, her skin one even, uniform warm brown everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured with a defined waist and full hips and thighs, never slimmed, never boxy. HER CLOTHES COME ONLY FROM <<<fc4e50ad-000e-4c0d-98d9-a1256f2a4010>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1", clearly taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<1130f30a-cfff-4a89-9a1e-eece45bd1a70>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. ChiChi's hands are empty. In this clip it is held up in front of him in his RIGHT hand with his thumb moving on it, from the first frame to the last. It buzzes once. He never puts it away in this clip.

BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut; the camera never crosses to the other side of the room and the two never swap sides. THEY WALK SIDE BY SIDE in the SAME direction at the same pace, straight along the white wall and away from the camera, ChiChi nearest the wall at frame LEFT, DB beside her on her right at frame RIGHT, a step apart; they stay together and never split up or turn away from each other. At the small square picture they stop and face it, ChiChi first, DB stopping on her right, half a step further along the wall, still looking at his phone. DB's steel WATCH is on his LEFT wrist; his phone is in his RIGHT hand.

FIRST FRAME: a medium-wide shot from the room side, already moving: ChiChi and DB mid-stride on the polished floor, walking away from the camera along the long white wall toward the smaller square picture a few steps ahead, ChiChi at frame LEFT with her hands loosely clasped in front of her, DB at frame RIGHT with his phone held up in front of him in his right hand, his thumb moving on it.

THE CLIP, SHOT BY SHOT:
1. (0-3 s) Medium-wide. They walk side by side, same direction, same pace. On her second step ChiChi starts speaking, her face turning up and a little toward the camera to look at the picture as they arrive; they stop together at the foot of the small picture, ChiChi facing it, DB on her right, still thumbing the phone.
  CHICHI (American), pleased, looking up at the picture: "This one's my favorite so far."
2. (3-3.7 s) Waist-up on DB, three-quarter view. His eyes stay on the phone, his thumb moving.
  DB (Dominican), absent: "Mm-hm."
3. (3.7-9.2 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She starts the line softly, to the picture; on "Sundays" she turns her head toward him and sees his thumb moving on the phone; her voice drops and the line stops on the word "imagine". She never finishes the sentence: no word follows "imagine".
  CHICHI (American), softer and sincere: "I used to come to places like this by myself on Sundays. I'd always imagine"
4. (9.2-9.7 s) Two-shot. Her line has stopped. DB's phone BUZZES once in his right hand: one short soft buzz, about half a second. ChiChi's eyes go to his hand; DB looks down at the phone.
5. (9.7-10.4 s) Waist-up on DB, his eyes on the screen, his free left hand half raised toward her, palm out, not looking up.
  DB (Dominican): "Hold on."
6. (10.4-11 s) Waist-up on ChiChi. She turns back to the picture, level and quiet.
  CHICHI (American): "Sure."
  END on this line: ChiChi facing the small picture, mouth closed, hands clasped. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "This one's my favorite so far." = CHICHI. "Mm-hm." = DB. "I used to come to places like this by myself on Sundays. I'd always imagine" = CHICHI, and she stops there. "Hold on." = DB. "Sure." = CHICHI. Only these five lines, in this order, each said once.

PRONUNCIATION: DB's "Mm-hm." is a closed-mouth two-note hum (MM-hm), not words.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. Smooth, whole words; never broken or stuttered.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; each line is one continuous, easy run.
The two voices never sound alike and never swap.
CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations. Her last word "imagine" is spoken cleanly, and then she stops.

WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):
- CHICHI: walking, speaking, stopping, looking up at the small picture, one head turn to DB, her eyes to his hand, back to the picture.
- DB: walking with the phone held up in his right hand, his thumb moving, a glance down at the buzz, his left hand half raised.
- THE VISITOR: far back at the orange wall, slowly moving along the framed prints, silent, never near the leads.

CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.

PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them.

AUDIO: only these five lines and the one short phone buzz, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 03 · "I Have to Take This" · 13 s · 91 credits · v1 · AWAITING YOUR "FILM"

**First line:** ChiChi's "Come sit. Just for a minute." **Final line:** DB's "Yeah. Go ahead."

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 13`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`; `medias`: `video_references` = the approved Clip 02 (job ID filled in after your approval), plus the seven element images as `image_references` (`33950dd7-42a1-47fc-bdcc-7a3d229c49e6`, `7af2905b-301b-4d9a-b114-2ff61b9f565a`, `03584942-3cc7-4562-bf81-0d33e0c8d135`, `ed958852-09a0-47a6-8033-1bf01dd841d7`, `59a6dfb3-9ee2-475c-9bec-93cd290c8524`, `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969`, `245c3cca-b933-4b23-b07a-17c426904ffe`); the eight elements in `reference_elements`. No start image.

```
13 SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. A couple on a Saturday afternoon date, looking at art together. Wholesome.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; the only beat is DB's phone starting to buzz, about half a second. Nobody stands frozen: every gap is filled with natural movement or a reaction. The clip opens with the action already moving and ends within half a second of the last line.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same afternoon, in this same gallery. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, the same gallery and the same light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated. This clip continues from the reference video's final moment. The FIRST line of this clip is ChiChi's "Come sit. Just for a minute." DB's habit of saying "Hold on" is part of the story: where this clip's lines contain those words they are NEW lines, exactly as written below.

WHERE WE ARE: this picks up a little later than the reference video's final line, which is NOT said again. ChiChi has walked back to the foreground bench and sat down; DB has followed her with his phone in his right hand and is still standing beside the bench. The first words spoken are ChiChi's "Come sit. Just for a minute."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is already seated and DB already standing at the bench in the first frame; nobody new arrives. ONE other museum visitor, far away at the orange wall at the back, tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within ten feet of them.

SET: the gallery <<<f4bd8e99-83bd-4904-9f98-510f71713494>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no logos or signage. Floor reflections are soft colour only, never a second figure.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, her skin one even, uniform warm brown everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured with a defined waist and full hips and thighs, never slimmed, never boxy. HER CLOTHES COME ONLY FROM <<<fc4e50ad-000e-4c0d-98d9-a1256f2a4010>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1", clearly taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<1130f30a-cfff-4a89-9a1e-eece45bd1a70>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. ChiChi's hands are empty. In this clip it is in DB's RIGHT hand at the start; when he sits it rests on his right knee, screen turned down toward his knee; it buzzes and keeps buzzing, he picks it up with his right hand as he rises and puts it to his RIGHT ear as he walks away, a real phone held to his ear, never on speaker.

BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut; the camera never crosses to the other side of the room and the two never swap sides. The foreground bench is the long grey-cushioned double bench at the bottom LEFT of the set image, with the white wall and the big two-panel picture behind it. They sit side by side facing the room, toward the camera side, angled a little toward each other: ChiChi on the LEFT cushion (frame LEFT), DB on the RIGHT cushion (frame RIGHT). Facing the camera, ChiChi pats the empty cushion with her LEFT hand, the cushion at frame RIGHT. ChiChi sits with her knees together and her ankles crossed, the dress falling naturally to mid-calf. DB leaves along the far side of the bench, at frame RIGHT, and NEVER crosses in front of ChiChi; he walks away from the camera up the room along the white wall toward the back corner. DB's steel WATCH is on his LEFT wrist, nearest ChiChi; his phone is in his RIGHT hand.

FIRST FRAME: a medium-wide two-shot from the room side at the foreground bench: ChiChi already sitting on the LEFT cushion at frame LEFT, facing the room, her left hand resting flat on the empty cushion beside her at frame RIGHT; DB standing at frame RIGHT at the bench's right end, facing her, his phone in his RIGHT hand at his side. ChiChi starts speaking at once.

THE CLIP, SHOT BY SHOT:
1. (0-2.3 s) Two-shot. ChiChi pats the empty cushion beside her with her left hand and looks up at him, warm; DB, already moving, steps to the bench.
  CHICHI (American), warm: "Come sit. Just for a minute."
2. (2.3-3.8 s) Two-shot. DB sits on the RIGHT cushion, the phone resting on his right knee, and turns toward her; ChiChi watches him settle.
  DB (Dominican): "Okay. I'm here."
3. (3.8-7.3 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns to him, her hands settling in her lap, sincere, steady.
  CHICHI (American): "Can I say something that isn't about the art?"
4. (7.3-7.8 s) Two-shot. Her mouth closes. DB's phone starts BUZZING on his knee and keeps buzzing softly under his next line: a call, one continuous low vibration, no ringtone. He looks down at it.
5. (7.8-10.2 s) Waist-up on DB, three-quarter view. Already rising from the bench, the phone in his right hand, his eyes on the screen.
  DB (Dominican): "Hold on. I have to take this."
6. (10.2-11 s) Waist-up on ChiChi, her eyes following him up, level and gracious.
  CHICHI (American), level: "Of course."
7. (11-13 s) Medium-wide. ChiChi watches him go for two steps, then turns her face back to the room. DB puts the phone to his right ear and walks away from the camera up the room along the white wall toward the back corner at an ordinary walking pace, speaking low as he goes.
  DB (Dominican), hushed, into the phone, as he walks away: "Yeah. Go ahead."
  END on this line: ChiChi alone on the left cushion facing the room, DB walking away toward the far corner, the phone at his ear. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Come sit. Just for a minute." = CHICHI. "Okay. I'm here." = DB. "Can I say something that isn't about the art?" = CHICHI. "Hold on. I have to take this." = DB. "Of course." = CHICHI. "Yeah. Go ahead." = DB, into the phone. Only these six lines, in this order, each said once. The person on the phone is never heard.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. Smooth, whole words; never broken or stuttered.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on. His last line is hushed and low, as a man on a call in a quiet gallery; it is still HIS voice.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; each line is one continuous, easy run.
The two voices never sound alike and never swap.
CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):
- CHICHI: sitting, patting the cushion, turning to him, settling her hands in her lap, watching him leave, turning back to the room.
- DB: standing and thumbing his phone, sitting, rising, walking away with the phone at his ear, speaking low.
- THE VISITOR: far back at the orange wall, looking at the framed prints, silent, never near the leads.

CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.

PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them. DB sits and rises naturally; the bench does not move.

AUDIO: only these six lines and the phone's low continuous vibration, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No ringtone, no music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 04 · "Not Doing Anything" · 10 s · 70 credits · v1 · AWAITING YOUR "FILM"

**First line:** DB's "No, I saw it. Send me the revised one." **Final line:** DB's "No, it's fine. I'm not doing anything."

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 10`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`; `medias`: `video_references` = the approved Clip 03 (job ID filled in after your approval), plus the seven element images as `image_references` (`33950dd7-42a1-47fc-bdcc-7a3d229c49e6`, `7af2905b-301b-4d9a-b114-2ff61b9f565a`, `03584942-3cc7-4562-bf81-0d33e0c8d135`, `ed958852-09a0-47a6-8033-1bf01dd841d7`, `59a6dfb3-9ee2-475c-9bec-93cd290c8524`, `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969`, `245c3cca-b933-4b23-b07a-17c426904ffe`); the seven elements in `reference_elements` (ChiChi's voice element left off: she says nothing). No start image.

```
10 SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. A couple on a Saturday afternoon date, looking at art together. Wholesome.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; there are no beats at all. Nobody stands frozen: every gap is filled with natural movement or a reaction. The clip opens with the action already moving and ends within half a second of the last line.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same afternoon, in this same gallery. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, the same gallery and the same light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated. This clip continues from the reference video's final moment. The FIRST line of this clip is DB's "No, I saw it. Send me the revised one." DB's habit of saying "Hold on" is part of the story: where this clip's lines contain those words they are NEW lines, exactly as written below.

WHERE WE ARE: this picks up a few moments after the reference video's final line, which is NOT said again. DB has walked away up the gallery to take a call and is now standing far away in the back corner, the phone at his ear. ChiChi has been left alone on the foreground bench and is just rising from it. The first words spoken are DB's "No, I saw it. Send me the revised one."

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is at the bench and DB is already in the back corner in the first frame; nobody new arrives, and there is never a second DB: the small figure in the far corner IS DB. ONE other museum visitor, far away at the FAR RIGHT END of the orange wall, well away from DB's corner, tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within ten feet of them.

SET: the gallery <<<f4bd8e99-83bd-4904-9f98-510f71713494>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no logos or signage. Floor reflections are soft colour only, never a second figure.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, her skin one even, uniform warm brown everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured with a defined waist and full hips and thighs, never slimmed, never boxy. HER CLOTHES COME ONLY FROM <<<fc4e50ad-000e-4c0d-98d9-a1256f2a4010>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1", clearly taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<1130f30a-cfff-4a89-9a1e-eece45bd1a70>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. ChiChi's hands are empty. In this clip it is at DB's RIGHT ear for the whole clip, a real phone held to his ear, never on speaker. THE PERSON ON THE OTHER END IS NEVER HEARD: no voice from the phone, no muffled reply, no second voice at all.

BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. ChiChi starts at the foreground bench at frame LEFT and walks away from the camera to the foot of the big two-panel picture on the white wall, where she stands facing it with her hands clasped. DB is far away in the FAR BACK CORNER at frame RIGHT, where the long white wall meets the orange wall, for the whole clip: a small figure half turned away from her, the phone at his RIGHT ear, his left hand in his trouser pocket; he paces two slow steps but never comes closer and never looks toward her. ChiChi never turns toward the corner.

FIRST FRAME: a WIDE shot from the room side. ChiChi at frame LEFT, just rising from the foreground bench, her hands empty. DB far away in the back corner at frame RIGHT, tiny in the frame, half turned away, the phone at his right ear, his left hand in his trouser pocket. DB starts speaking at once.

THE CLIP, SHOT BY SHOT:
1. (0-3.4 s) Wide. ChiChi walks away from the camera from the bench to the big two-panel picture on the white wall at an unhurried pace, her hands loosely clasped, without looking toward him. DB, in the far corner, paces two slow steps, half turned away. His voice carries low across the quiet gallery.
  DB (Dominican), low and hushed, into the phone: "No, I saw it. Send me the revised one."
2. (3.4-5.9 s) Waist-up on ChiChi, three-quarter view, at the foot of the big two-panel picture: she stops and looks up at the two figures at work. DB's voice is heard OFF CAMERA, far across the gallery.
  DB (Dominican), low, off camera: "Hold on. Let me pull it up."
3. (5.9-10 s) Waist-up on ChiChi. She HEARS it: her clasped hands tighten, she lets out one slow breath through her nose, her eyes stay on the picture, her jaw sets. Her mouth stays closed; she says nothing. DB's voice is heard off camera, easy and absent.
  DB (Dominican), off camera, easy and absent: "No, it's fine. I'm not doing anything."
  END within half a second of the last word: ChiChi facing the two-panel picture, hands tight, jaw set. After that, silence: nobody speaks.

LINE OWNERSHIP: every line in this clip is DB's, spoken into the phone. "No, I saw it. Send me the revised one." = DB. "Hold on. Let me pull it up." = DB. "No, it's fine. I'm not doing anything." = DB. Only these three lines, in this order, each said once. ChiChi says NOTHING: no words, no "mm", no sound of any kind. The caller is never heard.

PRONUNCIATION: "revised" is said rih-VIZED.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI SAYS NOTHING IN THIS CLIP: no voice of hers is heard at all, no words, no "mm", no sound of any kind. (She is AMERICAN and never British, but there is no line for her to speak.)
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on. In this clip DB speaks quietly, low and hushed, as a man on a phone call in a quiet gallery; it is still HIS voice, the same voice, and every line is one easy continuous run.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; each line is one continuous, easy run.
The two voices never sound alike and never swap.

WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):
- CHICHI: rising from the bench, walking to the picture, looking up at it, her hands tightening, one slow breath, her jaw setting.
- DB: on the call in the far back corner, a step or two of slow pacing, half turned away from her, his left hand in his pocket.
- THE VISITOR: far back at the far right end of the orange wall, looking at the framed prints, silent, nowhere near DB.

CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.

PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them.

AUDIO: only DB's three lines, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No caller voice, no music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 05 · "Where Were We?" · 7 s · 49 credits · v1 · AWAITING YOUR "FILM"

**First line:** DB's "Sorry. That's done. Where were we?" **Final line:** ChiChi's "Not continuing this." The clip ends within half a second of DB's lean settling; DB says nothing.

**Request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 7`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`, `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`; `medias`: `video_references` = the approved Clip 04 (job ID filled in after your approval), plus the seven element images as `image_references` (`33950dd7-42a1-47fc-bdcc-7a3d229c49e6`, `7af2905b-301b-4d9a-b114-2ff61b9f565a`, `03584942-3cc7-4562-bf81-0d33e0c8d135`, `ed958852-09a0-47a6-8033-1bf01dd841d7`, `59a6dfb3-9ee2-475c-9bec-93cd290c8524`, `96c7a2a8-9a0e-45b6-a8e0-a05fffc18969`, `245c3cca-b933-4b23-b07a-17c426904ffe`); the eight elements in `reference_elements`. No start image.

```
7 SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. A couple on a Saturday afternoon date, looking at art together. Wholesome.

TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; the only beat is DB's reaction after ChiChi's last line, about a second and a half, and then the clip ends. Nobody stands frozen: every gap is filled with natural movement or a reaction. The clip opens with the action already moving and ends within half a second of DB's lean settling.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same afternoon, in this same gallery. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, the same gallery and the same light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated. This clip continues from the reference video's final moment. The FIRST line of this clip is DB's "Sorry. That's done. Where were we?"

WHERE WE ARE: this picks up a little later than the reference video's final line, which is NOT said again. The call is over. ChiChi is standing alone at the foot of the big two-panel picture, her hands clasped, looking up at it. DB is walking back to her from the far corner, finishing a text. The first words spoken are DB's "Sorry. That's done. Where were we?"

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is at the picture and DB is already walking toward her in the first frame; nobody new arrives, and there is only ever ONE DB. ONE other museum visitor, far away at the orange wall at the back, tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within ten feet of them.

SET: the gallery <<<f4bd8e99-83bd-4904-9f98-510f71713494>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no logos or signage. Floor reflections are soft colour only, never a second figure.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, her skin one even, uniform warm brown everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured with a defined waist and full hips and thighs, never slimmed, never boxy. HER CLOTHES COME ONLY FROM <<<fc4e50ad-000e-4c0d-98d9-a1256f2a4010>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1", clearly taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<1130f30a-cfff-4a89-9a1e-eece45bd1a70>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. ChiChi's hands are empty. In this clip it is in DB's RIGHT hand, his thumb finishing a text, until he slips it into his right trouser pocket on the word "done"; from then on his hands are empty and the phone stays in the pocket.

BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. ChiChi stands at the foot of the big two-panel picture at frame LEFT, facing it. DB walks back toward her along the white wall from the far back corner, coming up on her RIGHT, the far-corner side, so he never crosses in front of her, and stops beside her on her right at frame RIGHT, one step further along the wall. When ChiChi speaks she turns her head to her right, toward him. DB's steel WATCH is on his LEFT wrist.

FIRST FRAME: a WIDE shot from the room side. ChiChi at frame LEFT at the foot of the big two-panel picture, her hands clasped in front of her, looking up at it. DB at frame RIGHT, smaller and further away, already walking toward her along the white wall from the far back corner, his thumb finishing a text on the phone in his right hand. DB starts speaking at once.

THE CLIP, SHOT BY SHOT:
1. (0-3.4 s) Wide. ChiChi stands still, looking up at the picture, hearing him come. DB speaks as he walks, at a natural pace; on "done" he slips the phone into his right trouser pocket, and he arrives beside her at frame RIGHT on the last word, warm, a little out of breath, a hopeful smile.
  DB (Dominican), warm, a little out of breath: "Sorry. That's done. Where were we?"
2. (3.4-5 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns her head to him, level and calm, her eyes clear, not raised, not softened.
  CHICHI (American), level, calm: "Not continuing this."
3. (5-6.7 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. His smile drops. His head draws back an inch and he leans away from her, taken aback. His mouth stays closed; he says NOTHING.
  END within half a second of the lean settling: DB leaning back, his eyes on her. ChiChi's "Not continuing this." is the last line of the clip. After that, silence: nobody speaks, and nothing more is said. DB makes no sound of speech at all: no word of any kind.

LINE OWNERSHIP, NEVER SWAPPED: "Sorry. That's done. Where were we?" = DB. "Not continuing this." = CHICHI. Only these two lines, in this order, each said once. DB says nothing after hers.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. Smooth, whole words; never broken or stuttered.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; each line is one continuous, easy run.
The two voices never sound alike and never swap.
CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):
- CHICHI: standing at the picture, looking up at it, then turning her head to him.
- DB: walking, finishing the text, pocketing the phone, smiling, then drawing his head back and leaning away.
- THE VISITOR: far back at the orange wall, looking at the framed prints, silent, never near the leads.

CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.

PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them.

AUDIO: only these two lines, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## RENDER LOG

| Clip | Version | Job ID | Duration | Resolution | Credits | Verdict |
|---|---|---|---|---|---|---|
| 01 | v1 | not filmed | 13 s | 720p | 91 | Awaiting your "film" |
| 02 | v1 | not filmed | 11 s | 720p | 77 | Awaiting your "film" |
| 03 | v1 | not filmed | 13 s | 720p | 91 | Awaiting your "film" |
| 04 | v1 | not filmed | 10 s | 720p | 70 | Awaiting your "film" |
| 05 | v1 | not filmed | 7 s | 720p | 49 | Awaiting your "film" |
