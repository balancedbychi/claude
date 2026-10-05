# "Just As Important" (Episode 11): production notes and prompts

Read `script.md` first: it has the story, the floor plan and the beat-by-beat for all six clips. This file holds what's sent to Seedance 2.5, one clip at a time. **Each clip is filmed only after your "film"** (rule 9). Each clip's prompt is written and sent for review only after the clip before it is approved, because it attaches that clip as its video reference (rule 7).

## Settings (every clip)

| Setting | Value |
|---|---|
| Model | Seedance 2.5 |
| Aspect | 9:16 |
| Resolution | **720p** for every clip (user, 5 Oct 2026: "let's do 720p"). Clip 04 alone was filmed in 1080p before this ruling; it is scaled down to 720p in the edit so the episode matches. |
| Audio | generated (on) |
| Cost | 7 credits a second (checked 5 Oct 2026: 20 s = 140 credits) |

## Elements attached (every clip)

| Tag | Element | ID |
|---|---|---|
| `[Restaurant]` | Restaurant-High-Rise-Night | `769d1d48-36ca-44ec-bba6-468bea5af8b0` |
| `[ChiChi-JAI]` | ChiChi-Face · ChiChi-Body · ChiChi-Just-As-Important-Look | `b03240bd-4562-4d2f-8b14-de32c018e346` · `46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc` · `84f791a1-178a-4e36-8791-010e116f7e1e` |
| ChiChi's voice | ChiChi-Canon-Voice-v1 | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |
| `[DB-JAI]` | DB-Face · DB-Body · DB-Just-As-Important-Look | `1023755a-b704-4c10-b0f4-bf9887d2558c` · `952f3fb0-ed54-4551-a07c-c56934939a44` · `5208aa4f-6509-4b4f-9902-293b117d2092` |
| DB's voice | Written description, word for word (`characters/db.md`) | — |
| Start image (`start_image`) | That clip's first-frame still (table below) | — |
| Video reference (`video_references`) | Clip 01: none. Clips 02–06: the approved clip before. | — |

## Risks and guards (skill step 8)

| Risk | Guard in the prompt |
|---|---|
| ChiChi sounding British | "ChiChi is AMERICAN… NEVER British" plus her saved voice. Nobody in this episode is British. |
| DB's accent drifting or turning into a caricature | His full written description, word for word, including "never a heavy stereotype". |
| Extra lines, or the server or diners talking | "Only these lines, in this order"; extras' mouths closed; no background chatter. Room sound is the low piano and soft cutlery only. |
| Dead air or invented lines at the end | Clip length matched to the action; end on the last line; "after that, silence: nobody speaks." |
| ChiChi's speech breaking up (user, Clip 02 review, 5 Oct 2026) | In every clip where she speaks: "ChiChi speaks in smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts." |
| Unnecessary pauses (user, 5 Oct 2026) | "NO silent beats": every reaction happens while someone is speaking; clips open mid-gesture with the first line already starting; DB's slowness is tone, never gaps. |
| Two of anyone | "EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB." |
| The server overlapping the leads (user, 5 Oct 2026) | Clip 05: the server stands at the FAR RIGHT edge, at least an arm's length clear of DB, never behind, in front of or between the leads; only his arm reaches in; he leaves straight out to the right. The shot is framed slightly wider for that clip. |
| Rings | NO RINGS, stated for both. |
| Swapped sides | ChiChi always frame LEFT and DB always frame RIGHT, in every shot. |
| The phone moving | Face-down by his plate; he never touches it. |
| Clothes copied from the face or body images | "Clothes come ONLY from" each look element. |
| A second candle, or text on the menu or windows | One candle; no text anywhere. |

---

## Start frames: one image per clip (5 Oct 2026)

Seedance 2.5 takes an image in the **`start_image`** role and opens the clip on exactly that frame. Each still below is the **first frame** from the beat-by-beat in `script.md`, built from the locked elements (set + ChiChi Face/Body/Look + DB Face/Body/Look). GPT Image 2.5, 9:16, high quality, 2k, about 2.75 credits each.

| Clip | Scene | First frame shows | Job ID | Image | Verdict |
|---|---|---|---|---|---|
| 01 | The Lawyer Story | ChiChi setting her fork down, smiling; DB lowering his wine glass | `0cc0247c-e512-4b46-a0a7-ba23c57c12c5` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001529_0cc0247c-e512-4b46-a0a7-ba23c57c12c5.png) | Awaiting your OK |
| 02 | Ten Cats | ChiChi sitting back with her wine, about to speak; DB leaning in on his forearms | `87d3c910-a897-4b3e-9e06-e75cf9f14cd4` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001529_87d3c910-a897-4b3e-9e06-e75cf9f14cd4.png) | Awaiting your OK |
| 03 | Always Wanted One | DB leaning in mid-sentence; ChiChi listening, hands together | `b9c1a03d-ad05-4583-a29d-3aa5759b203b` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001530_b9c1a03d-ad05-4583-a29d-3aa5759b203b.png) | Awaiting your OK |
| 04 | Why It Ended | ChiChi hands folded, about to ask; DB relaxed, hand by his water glass | `e53957b7-1cd0-44b8-adc1-2d327cebcab6` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001530_e53957b7-1cd0-44b8-adc1-2d327cebcab6.png) | Awaiting your OK |
| 05 | Just As Important | Server behind DB finishing the pour; ChiChi folding her hands, turning to DB | `0a57e692-a767-4c70-bb43-883040e879c2` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001531_0a57e692-a767-4c70-bb43-883040e879c2.png) | **Rejected** (user: the server overlaps ChiChi and DB) |
| 05 v2-A | Just As Important | Server at the far right edge, an arm's length clear of DB; only his arm reaches in to pour | `584e154c-bfde-48e6-bdfc-998360010a37` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001930_584e154c-bfde-48e6-bdfc-998360010a37.png) | Awaiting your pick |
| 05 v2-B | Just As Important | Same direction, second variant | `343d5250-7bb1-4c52-b3d0-9bee4734a36d` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001930_343d5250-7bb1-4c52-b3d0-9bee4734a36d.png) | Awaiting your pick |
| 06 | Three Things | DB opening the dessert menu; ChiChi sipping water, bare left hand on the cloth | `049d3a5d-6f10-40fe-bb31-30717aa175fa` | [view](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_001530_049d3a5d-6f10-40fe-bb31-30717aa175fa.png) | Awaiting your OK |

**What to check in each image:** ChiChi on the LEFT and DB on the RIGHT; honey-blonde hair parted on her left; the camel off-the-shoulder dress and the charcoal suit with a black shirt and no tie; **no rings**; **one** candle; the phone face-down by DB's plate; no text anywhere; DB clearly taller.

**How each clip uses them (Seedance 2.5):**
- **Clip 01:** `start_image` = frame 01, plus the elements in the prompt.
- **Clips 02–06:** `start_image` = that clip's frame, **plus** the approved clip before it as a `video_references` entry, which carries the voices (rule 7). If an approved clip ends somewhere different from the next start frame (a glass in the other hand, say), the approved footage wins: we either regenerate that start frame from the clip's last frame or drop the start image for that clip. That gets decided at each review.

---

## CLIP 01 · "The Lawyer Story" · 15 s · 105 credits · v1 · APPROVED (job `0afc3a1a`)

**First line:** ChiChi's "You owe me the lawyer story." **Final line:** DB's "Who is Chi?"

**Seedance 2.5 request:** `model: seedance_2_5`, `duration: 15`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`; Elements go in through their placeholders in the prompt. **As filmed: no start image.** You didn't like the frame angle (5 Oct 2026), so the `START IMAGE` line was removed and the camera follows the prompt's shot list instead.

```
15 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, an elegant top-floor restaurant high above Atlanta. A first dinner date between two grown adults. Wholesome, fully clothed.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens mid-gesture with the first line already starting, and ends on the last spoken line. Nobody sits frozen or stares.

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** At most three or four other diners far in the background in deep soft focus, eating quietly, mouths closed, never speaking, never crossing in front of the two leads.

SET: the restaurant <<<769d1d48-36ca-44ec-bba6-468bea5af8b0>>>, exactly as the reference shows: one small square two-top table with a white tablecloth beside a floor-to-ceiling window over a glittering night skyline, cream upholstered chairs, cream, warm taupe and brass interior, low brass pendant lights. On the table: ONE candle in a short glass holder in the centre, two plates of entrées half finished, a glass of red wine each, a water glass each. Warm low amber candle and practical light, deep warm shadows, clearly night; never blue-dominant. No text, logos, labels or signage anywhere.

CHICHI: face, hair and skin EXACTLY <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5", full-figured, never slimmed. HER CLOTHES COME ONLY FROM <<<84f791a1-178a-4e36-8791-010e116f7e1e>>>: a form-fitting camel-caramel rib-knit off-the-shoulder midi dress with long sleeves, identical in every shot; her small cream clutch rests on the chair beside her hip, never on the table. Nothing is worn from the face or body references. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB: face, hair, beard and skin EXACTLY <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, thick dark softly wavy hair with silver at the temples, neatly trimmed short beard. TALL, about 6'1"; seated, he sits clearly taller than ChiChi. HIS CLOTHES COME ONLY FROM <<<5208aa4f-6509-4b4f-9902-293b117d2092>>>: a tailored charcoal suit, a black dress shirt with the top button open and NO tie, a slim steel watch on his LEFT wrist, identical in every shot. Nothing is worn from the face or body references. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line. Kind, attentive, self-assured, never smug.

PROP: DB's phone, a plain black smartphone with no logo, lies FACE-DOWN on the tablecloth on the window side of his plate for the whole clip. Nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: both SEATED across the small table, facing each other. CHICHI on frame LEFT facing RIGHT; DB on frame RIGHT facing LEFT; the window and skyline behind the table. Nobody stands, changes seats or leaves. ChiChi is ALWAYS on the left of frame and DB ALWAYS on the right, in every shot and every cut.

START IMAGE: the clip opens EXACTLY on the attached start image (same people, clothes, table, candle, window and framing) and moves on from it.
FIRST FRAME: a medium-wide side-on two-shot, already in motion. ChiChi on the left, setting her fork down on her plate and smiling at him; DB on the right, lowering his wine glass from a sip, looking at her. ChiChi starts her first line immediately.

THE CLIP, SHOT BY SHOT:
1. (0-3 s) Two-shot. As she speaks, ChiChi points a playful finger at him, one eyebrow up, while DB sets his glass down, caught out, a smile spreading.
  CHICHI (American), playful: "You owe me the lawyer story. You said over dinner."
2. (3-4.5 s) Waist-up on DB over ChiChi's right shoulder. He opens his palms as he answers, no gap.
  DB (Dominican), smiling: "I did say that."
3. (4.5-6.5 s) Waist-up on ChiChi over DB's left shoulder. She leans in, chin resting on her hand.
  CHICHI (American): "So how long have you been a lawyer?"
4. (6.5-9.5 s) Waist-up on DB. He shakes his head slowly as he speaks, warm.
  DB (Dominican): "Long enough that I'd rather hear about you."
5. (9.5-10.5 s) Waist-up on ChiChi, amused, one eyebrow up.
  CHICHI (American): "Mm. Smooth."
6. (10.5-15 s) Two-shot. DB leans forward on his forearms with a small smile and answers straight away; WHILE he talks, ChiChi laughs softly, sits back and picks up her wine glass.
  DB (Dominican): "Honest. I've done all the talking. Who is Chi?"
  END on this line: ChiChi holding her glass, about to answer; DB leaning in, waiting. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "You owe me the lawyer story. You said over dinner." = CHICHI. "I did say that." = DB. "So how long have you been a lawyer?" = CHICHI. "Long enough that I'd rather hear about you." = DB. "Mm. Smooth." = CHICHI. "Honest. I've done all the talking. Who is Chi?" = DB. Only these six lines, in this order, each said once.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second.
The two voices never sound alike and never swap.

CAMERA: steady, eye level, always from the room side of the table (it never crosses to the window side). A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural seated posture and weight, five-finger hands, cutlery and glasses behave normally, the candle flame flickers gently, no physical contact between them.
AUDIO: only these six lines, plus a soft low piano in the room and the faint clink of cutlery. No background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 02 · "Ten Cats" · 14 s · 98 credits · v1 · APPROVED (job `36ee51ca`; first attempt `c7f1f25f` failed and was refunded)

**First line:** ChiChi's "Honestly? I've been single for a while." **Final line:** ChiChi's "I've done the math."

**Seedance 2.5 request:** `model: seedance_2_5`, **`mode: omni_reference`** (required whenever reference media is attached; a plain request is rejected with a 422). **Known flake:** the first submission of a clip with a reference video has twice failed about a minute in with no reason and a full refund; the identical resubmission went through both times, `duration: 14`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`; `medias`: `video_references` = `0afc3a1a-aa7f-412f-bbb9-beb56980e64d` (approved Clip 01). No start image. Declined the "IN THE DARK" preset.

> Note: the server's echo of the request listed Clip 01 under `reference_images`, not `video_references`. Check that the voices carried over from Clip 01.

```
14 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, an elegant top-floor restaurant high above Atlanta. A first dinner date between two grown adults. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, table, candle, window and skyline, and their voices exactly as they sound in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "Honestly? I've been single for a while."

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. The clip opens with ChiChi already starting her first line, and ends on the last spoken line. Nobody sits frozen or stares.

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** Both are already seated at the table in the first frame; nobody new arrives. At most three or four other diners far in the background in deep soft focus, eating quietly, mouths closed, never speaking, never crossing in front of the two leads.

SET: the restaurant <<<769d1d48-36ca-44ec-bba6-468bea5af8b0>>>, exactly as in the reference video: one small square two-top table with a white tablecloth beside a floor-to-ceiling window over a glittering night skyline, cream upholstered chairs, cream, warm taupe and brass interior. On the table: ONE candle in the centre, two plates of entrées half finished, a glass of red wine each, a water glass each. Warm low amber candle and practical light, deep warm shadows, clearly night; never blue-dominant. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. Full-figured, never slimmed. HER CLOTHES COME ONLY FROM <<<84f791a1-178a-4e36-8791-010e116f7e1e>>>: the form-fitting camel-caramel rib-knit off-the-shoulder long-sleeved dress, identical in every shot. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB, EXACTLY AS IN THE REFERENCE VIDEO: face, hair, beard and skin <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan complexion, thick dark softly wavy hair with silver at the temples, neatly trimmed short beard. TALL; seated, he sits clearly taller than ChiChi. HIS CLOTHES COME ONLY FROM <<<5208aa4f-6509-4b4f-9902-293b117d2092>>>: the tailored charcoal suit, black dress shirt open at the collar, NO tie, slim steel watch on his LEFT wrist, identical in every shot. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone, a plain black smartphone, lies FACE-DOWN by his plate for the whole clip. Nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: both SEATED across the small table, facing each other. CHICHI on frame LEFT facing RIGHT; DB on frame RIGHT facing LEFT. Nobody stands, changes seats or leaves. ChiChi is ALWAYS on the left of frame and DB ALWAYS on the right, in every shot and every cut.

FIRST FRAME: ChiChi holding her red wine glass, already setting it down on the table as she starts to speak; DB leaning forward on his forearms, attentive.

THE CLIP, SHOT BY SHOT:
1. (0-2.5 s) Waist-up on ChiChi over DB's left shoulder. She sets her wine glass down WHILE she speaks, candid.
  CHICHI (American): "Honestly? I've been single for a while."
2. (2.5-3.5 s) Waist-up on DB over ChiChi's right shoulder. He tilts his head, gentle, answering straight away.
  DB (Dominican): "By choice?"
3. (3.5-10 s) Waist-up on ChiChi. Straight in, a small shrug, then a dry, straight face for the last sentence.
  CHICHI (American): "I'd like to say yes. My standards are high. Lately I wonder if they're why I'm still single. And I refuse to be the woman with ten cats."
4. (10-12.5 s) Waist-up on DB. On her last word he BURSTS into a real, warm laugh from the chest, head tipping back, a hand to his chest, and says his line THROUGH the laugh, with no gap.
  DB (Dominican), laughing: "Ten? That is very specific."
5. (12.5-14 s) Two-shot. ChiChi, deadpan, a tiny shrug; DB still laughing softly, shaking his head, charmed.
  CHICHI (American), deadpan: "I've done the math."
  END on this line. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Honestly? I've been single for a while." = CHICHI. "By choice?" = DB. "I'd like to say yes. My standards are high. Lately I wonder if they're why I'm still single. And I refuse to be the woman with ten cats." = CHICHI. "Ten? That is very specific." = DB. "I've done the math." = CHICHI. Only these five lines, in this order, each said once.

VOICES, EXACTLY AS IN THE REFERENCE VIDEO, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the room side of the table. Waist-up over-the-shoulder singles and a medium-wide two-shot. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural seated posture, five-finger hands, glasses behave normally, the candle flame flickers gently, no physical contact between them.
AUDIO: only these five lines and DB's laugh, plus the same soft low piano and faint clink of cutlery as the reference video. No background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 03 · "Always Wanted One" · 14 s · 98 credits · v1 · APPROVED (job `fc894b33`; first attempt `685c3b89` failed and was refunded)

**First line:** DB's "If it helps, I'm in a similar boat." **Final line:** DB's "…my life is busy." **ChiChi has no lines**, so her voice element is left off and the prompt says she says nothing.

**Seedance 2.5 request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 14`, `aspect_ratio: 9:16`, `resolution: 720p`, `generate_audio: true`; `medias`: `video_references` = `36ee51ca-f51e-4d85-9682-b56eb90cc574` (approved Clip 02). Declined the "IN THE DARK" preset.

```
14 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, an elegant top-floor restaurant high above Atlanta. A first dinner date between two grown adults. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, table, candle, window and skyline, and DB's voice exactly as it sounds in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is DB's "If it helps, I'm in a similar boat."

ONLY DB SPEAKS IN THIS CLIP. CHICHI SAYS NOTHING AT ALL: no words, no "mm", no reply. Her mouth stays closed except for a soft smile and lips parting slightly in surprise. Every sound of speech in this clip is DB's voice.

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. DB speaks in one continuous, flowing run; his second sentence starts within two tenths of a second of his first. There are NO silent beats anywhere: ChiChi's reactions play on cuts to her WHILE DB keeps talking off camera. The clip opens with DB already starting his first line and ends the instant his last word is spoken. Nobody sits frozen or stares.

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** Both are already seated at the table in the first frame; nobody new arrives. At most three or four other diners far in the background in deep soft focus, eating quietly, mouths closed, never speaking, never crossing in front of the two leads.

SET: the restaurant <<<769d1d48-36ca-44ec-bba6-468bea5af8b0>>>, exactly as in the reference video: one small square two-top table with a white tablecloth beside a floor-to-ceiling window over a glittering night skyline, cream upholstered chairs, cream, warm taupe and brass interior. On the table: ONE candle in the centre, two plates of entrées half finished, a glass of red wine each, a water glass each. Warm low amber candle and practical light, deep warm shadows, clearly night; never blue-dominant. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. Full-figured, never slimmed. HER CLOTHES COME ONLY FROM <<<84f791a1-178a-4e36-8791-010e116f7e1e>>>: the form-fitting camel-caramel rib-knit off-the-shoulder long-sleeved dress, identical in every shot. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB, EXACTLY AS IN THE REFERENCE VIDEO: face, hair, beard and skin <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan complexion, thick dark softly wavy hair with silver at the temples, neatly trimmed short beard. TALL; seated, he sits clearly taller than ChiChi. HIS CLOTHES COME ONLY FROM <<<5208aa4f-6509-4b4f-9902-293b117d2092>>>: the tailored charcoal suit, black dress shirt open at the collar, NO tie, slim steel watch on his LEFT wrist, identical in every shot. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone, a plain black smartphone with no logo, lies FACE-DOWN on the tablecloth on the window side of his plate for the whole clip. Nobody touches it. It must be clearly visible in ChiChi's eyeline because she glances at it at the end.

BLOCKING, IDENTICAL IN EVERY SHOT: both SEATED across the small table, facing each other. CHICHI on frame LEFT facing RIGHT; DB on frame RIGHT facing LEFT. Nobody stands, changes seats or leaves. ChiChi is ALWAYS on the left of frame and DB ALWAYS on the right, in every shot and every cut.

FIRST FRAME: a medium-wide two-shot. DB leaning in on his forearms, warm, already starting to speak; ChiChi with a soft smile, her hands loosely together on the tablecloth, still glowing from the laugh they just shared.

THE CLIP, SHOT BY SHOT:
1. (0-4 s) Waist-up on DB over ChiChi's right shoulder. Sincere and warm, one hand gesturing gently.
  DB (Dominican): "If it helps, I'm in a similar boat. No children. And I have always wanted one."
2. (4-5.5 s) Cut to waist-up on ChiChi over DB's left shoulder, a REACTION WHILE DB KEEPS TALKING off camera: her brows lift a fraction and her lips part slightly; she's touched and hopeful. She does not speak.
  DB (Dominican), heard off camera, a small rueful shrug in his voice, continuing with no gap: "But work always got in the way...
3. (5.5-11.5 s) Waist-up on DB, continuing the same sentence without a break, a small rueful shrug:
  DB (Dominican): "...of my relationships. I want someone who understands my life is busy."
4. (11.5-14 s) Cut to waist-up on ChiChi WHILE DB finishes "...my life is busy" off camera: her pleasant smile holds, then adjusts very slightly; her eyes flick ONCE down to his face-down phone on the table and straight back up to him. She does not speak.
  END the instant DB's last word ("busy") is spoken. After that, silence: nobody speaks.

LINE OWNERSHIP: every line in this clip is DB's. "If it helps, I'm in a similar boat. No children. And I have always wanted one." = DB. "But work always got in the way of my relationships. I want someone who understands my life is busy." = DB. Only these lines, in this order, each said once. ChiChi says nothing.

VOICE, EXACTLY AS IN THE REFERENCE VIDEO:
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his sentences longer than two tenths of a second. Smooth, whole words; never broken or stuttered.

CAMERA: the same camera as the reference video: steady, eye level, always from the room side of the table. Waist-up over-the-shoulder singles; the clip opens on a medium-wide two-shot. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural seated posture, five-finger hands, glasses behave normally, the candle flame flickers gently, no physical contact between them.
AUDIO: only DB's lines, plus the same soft low piano and faint clink of cutlery as the reference video. No background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

## CLIP 04 · "Why It Ended" · 16 s · 192 credits · v1 · RENDERED IN 1080p, AWAITING REVIEW (job `687a5c19`)

**First line:** ChiChi's "Can I ask you something?" **Final line:** DB's "It's helped. More than I expected."

**Seedance 2.5 request:** `model: seedance_2_5`, `mode: omni_reference`, `duration: 16`, `aspect_ratio: 9:16`, **`resolution: 1080p`** (your call, 5 Oct 2026; Clips 01–03 are 720p), `generate_audio: true`; `medias`: `video_references` = `fc894b33-bdb8-4ed2-96c5-2f9d0eb7cb84` (approved Clip 03). Smooth-speech guard for ChiChi included. Declined the "IN THE DARK" preset.

```
16 SECONDS. Photoreal cinematic drama, vertical 9:16, NIGHT, an elegant top-floor restaurant high above Atlanta. A first dinner date between two grown adults. Wholesome, fully clothed.

REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same scene. It is THE AUTHORITY for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, hair, clothes, table, candle, window and skyline, and DB's voice exactly as it sounds in it. NO LINE OF DIALOGUE from the reference video is repeated; none of its words are said again. This clip continues straight on from the reference video's final line. The FIRST line of this clip is ChiChi's "Can I ask you something?"

TIMING, READ THIS FIRST. NO PAUSES. NO DEAD AIR. Every line starts within two tenths of a second of the line before it. There are NO silent beats anywhere in this clip: every gesture and reaction happens WHILE someone is speaking. DB answers "Yes" IMMEDIATELY after her question; his smile fades and his eyes drop WHILE he answers, never before. The clip opens with ChiChi already starting her first line and ends on the last spoken line. Nobody sits frozen or stares.

CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.

*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** Both are already seated at the table in the first frame; nobody new arrives. At most three or four other diners far in the background in deep soft focus, eating quietly, mouths closed, never speaking, never crossing in front of the two leads.

SET: the restaurant <<<769d1d48-36ca-44ec-bba6-468bea5af8b0>>>, exactly as in the reference video: one small square two-top table with a white tablecloth beside a floor-to-ceiling window over a glittering night skyline, cream upholstered chairs, cream, warm taupe and brass interior. On the table: ONE candle in a short glass holder in the centre, two plates of entrées half finished, a glass of red wine each, a water glass each. Warm low amber candle and practical light, deep warm shadows, clearly night; never blue-dominant. No text, logos, labels or signage anywhere.

CHICHI, EXACTLY AS IN THE REFERENCE VIDEO: face, hair and skin <<<b03240bd-4562-4d2f-8b14-de32c018e346>>>, body <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>>: forty, warm brown complexion, cheek beauty mark, freckles; HONEY-BLONDE shoulder-length layered blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. Full-figured, never slimmed. HER CLOTHES COME ONLY FROM <<<84f791a1-178a-4e36-8791-010e116f7e1e>>>: the form-fitting camel-caramel rib-knit off-the-shoulder long-sleeved dress, identical in every shot. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring; no bracelets, no watch.

DB, EXACTLY AS IN THE REFERENCE VIDEO: face, hair, beard and skin <<<1023755a-b704-4c10-b0f4-bf9887d2558c>>>, build <<<952f3fb0-ed54-4551-a07c-c56934939a44>>>: forty-eight, Dominican, warm golden-tan complexion, thick dark softly wavy hair with silver at the temples, neatly trimmed short beard. TALL; seated, he sits clearly taller than ChiChi. HIS CLOTHES COME ONLY FROM <<<5208aa4f-6509-4b4f-9902-293b117d2092>>>: the tailored charcoal suit, black dress shirt open at the collar, NO tie, slim steel watch on his LEFT wrist, identical in every shot. NO RINGS on any finger of either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.

PROP: DB's phone, a plain black smartphone with no logo, lies FACE-DOWN on the tablecloth on the window side of his plate for the whole clip. Nobody touches it.

BLOCKING, IDENTICAL IN EVERY SHOT: both SEATED across the small table, facing each other. CHICHI on frame LEFT facing RIGHT; DB on frame RIGHT facing LEFT. Nobody stands, changes seats or leaves. ChiChi is ALWAYS on the left of frame and DB ALWAYS on the right, in every shot and every cut.

FIRST FRAME: a medium-wide two-shot. ChiChi with her hands folded on the tablecloth, leaning in slightly, already starting to speak, gently curious; DB sitting relaxed, a little back in his chair, looking at her openly, one hand by the stem of his water glass.

THE CLIP, SHOT BY SHOT:
1. (0-2 s) Two-shot. ChiChi asks gently; DB opens one hand and answers straight away.
  CHICHI (American): "Can I ask you something?"
  DB (Dominican): "Anything."
2. (2-3.5 s) Waist-up on ChiChi over DB's left shoulder. Direct but kind.
  CHICHI (American): "Is that why your marriage ended?"
3. (3.5-8.5 s) Waist-up on DB over ChiChi's right shoulder. He answers IMMEDIATELY; his smile fades as he speaks, not defensive, just honest, and his eyes drop to the candle WHILE he talks. His fingers turn the stem of his water glass.
  DB (Dominican), quiet: "Yes. She wanted a lot of time. I couldn't give it."
4. (8.5-12 s) Waist-up on DB. His eyes come back up to her AS he keeps talking, steady and open.
  DB (Dominican): "I've been working on that. I'm in therapy."
5. (12-13 s) Waist-up on ChiChi. Brows up, surprised and a little impressed.
  CHICHI (American): "Therapy."
6. (13-16 s) Two-shot. DB gives a modest half smile and a slight shrug as he answers; WHILE he talks, ChiChi gives a small, respectful nod, warm, reassessing him.
  DB (Dominican): "It's helped. More than I expected."
  END on this line. After that, silence: nobody speaks.

LINE OWNERSHIP, NEVER SWAPPED: "Can I ask you something?" = CHICHI. "Anything." = DB. "Is that why your marriage ended?" = CHICHI. "Yes. She wanted a lot of time. I couldn't give it." = DB. "I've been working on that. I'm in therapy." = DB. "Therapy." = CHICHI. "It's helped. More than I expected." = DB. Only these lines, in this order, each said once.

VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:
- CHICHI IS AMERICAN: <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry humour. ChiChi is AMERICAN: General American accent, NEVER British. Smooth, whole words; never broken or stuttered.
- DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican man of forty-eight speaking fluent English with a NATURAL HISPANIC ACCENT: a warm Caribbean Spanish flair in the vowels, lightly tapped r's, softened word endings, and the occasional Spanish rhythm in a phrase. His voice is LOW, WARM and CALMING: a soft-spoken, slightly husky baritone, mature and composed, with a gentle gravel at the bottom and a quiet intimacy, as if he never needs to raise his voice to be heard. He speaks SLOWLY and DELIBERATELY, with thoughtful pauses inside a sentence (never between lines), a reassuring tone, and a faint, knowing warmth, like a smile you can hear. A lawyer's clear, precise diction under the accent. Never loud, never fast, never slick or salesy, never cartoonish or exaggerated, never a heavy stereotype; the accent is real and natural, never put on.
DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second.
The two voices never sound alike and never swap.

CAMERA: the same camera as the reference video: steady, eye level, always from the room side of the table. A medium-wide two-shot plus waist-up over-the-shoulder singles. NO ZOOMS, NO PUSH-INS; faces never tighter than waist-up.
PHYSICS: natural seated posture, five-finger hands, glasses behave normally, the candle flame flickers gently, no physical contact between them.
AUDIO: only these seven lines, plus the same soft low piano and faint clink of cutlery as the reference video. No background chatter, no other voices, no narration. No subtitles, captions or on-screen text.
```

### Render log

| Clip | Version | Job ID | Duration | Credits | Verdict |
|---|---|---|---|---|---|
| 01 | v1 | `0afc3a1a-aa7f-412f-bbb9-beb56980e64d` | 15 s | 105 | **APPROVED** ("looks good", 5 Oct 2026). No start image. |
| 02 | v1 | `c7f1f25f-6716-4df5-8677-755514e6580e` | 14 s | 98 → refunded | **FAILED** about a minute after submission; no reason given by Higgsfield; 98 credits refunded. |
| 02 | v1 retry | `36ee51ca-f51e-4d85-9682-b56eb90cc574` | 14 s | 98 | **APPROVED** (5 Oct 2026). Note: "Chi's speech was a little broken, but nothing too noticeable." → smooth-speech guard added for her speaking clips (04, 05). |
| 03 | v1 | `685c3b89-1682-4f4f-8ad0-8b4c987bc193` | 14 s | 98 → refunded | **FAILED** about a minute in; no reason given; refunded (same pattern as Clip 02's first attempt). |
| 03 | v1 retry | `fc894b33-bdb8-4ed2-96c5-2f9d0eb7cb84` | 14 s | 98 | **APPROVED** (5 Oct 2026). |
| 04 | v1 | `687a5c19-2aa7-45d1-85c0-ad6885f96e64` | 16 s | 192 | **Rendered** 5 Oct 2026 in 1080p ([video](https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20261005_011319_687a5c19-2aa7-45d1-85c0-ad6885f96e64.mp4)). Worked first time. Awaiting your review. |
