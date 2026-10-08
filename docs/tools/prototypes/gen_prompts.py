#!/usr/bin/env python3
"""Builds the Episode 15 "Hold On" Seedance prompts from shared blocks + per-clip data and writes prompts_data.json beside this file.
Shared blocks are identical in every prompt, so the guards cannot drift between clips."""
import os, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]  # the repo root

# ---------- IDs ----------
SET = 'f4bd8e99-83bd-4904-9f98-510f71713494'
SET_IMG = '33950dd7-42a1-47fc-bdcc-7a3d229c49e6'
CF, CF_IMG = 'b03240bd-4562-4d2f-8b14-de32c018e346', '7af2905b-301b-4d9a-b114-2ff61b9f565a'
CB, CB_IMG = '46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc', '03584942-3cc7-4562-bf81-0d33e0c8d135'
CL, CL_IMG = 'fc4e50ad-000e-4c0d-98d9-a1256f2a4010', 'ed958852-09a0-47a6-8033-1bf01dd841d7'
CV = 'de50f37f-82fa-4a70-bdca-52355b2f4ca2'
DF, DF_IMG = '1023755a-b704-4c10-b0f4-bf9887d2558c', '59a6dfb3-9ee2-475c-9bec-93cd290c8524'
DBB, DBB_IMG = '952f3fb0-ed54-4551-a07c-c56934939a44', '96c7a2a8-9a0e-45b6-a8e0-a05fffc18969'
DL, DL_IMG = '1130f30a-cfff-4a89-9a1e-eece45bd1a70', '245c3cca-b933-4b23-b07a-17c426904ffe'
VOICE_REF = '1a685bed-7301-4d05-b755-4928b3202078'
PRESET = '24bae836-2c4a-48e0-89b6-49fcc0b21612'

# ---------- DB's voice, word for word from characters/db.md ----------
db_md = (ROOT / 'characters/db.md').read_text(encoding='utf-8')
m = re.search(r"^> (DB'S VOICE — HE HAS NO SAVED VOICE ELEMENT, SO BUILD IT FROM THIS DESCRIPTION EXACTLY\. .*)$", db_md, re.M)
assert m, 'DB voice paragraph not found'
DB_VOICE = m.group(1)
DB_VOICE_MATCH = DB_VOICE.replace('FROM THIS DESCRIPTION EXACTLY. A Dominican',
                                  'FROM THIS DESCRIPTION EXACTLY, AND MATCH HIS VOICE IN THE REFERENCE VIDEO. A Dominican', 1)
assert DB_VOICE_MATCH != DB_VOICE

# ---------- shared blocks ----------
def header(n):
    return (f"{n} SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, a large gallery in the Atlanta Art Museum. "
            "A couple on a Saturday afternoon date, looking at art together. Wholesome.")

def timing(beats, ending):
    return ("TIMING, READ THIS FIRST. NO DEAD AIR. NO LONG PAUSES. Every reply starts within two tenths of a second of the line before it; "
            f"{beats} Nobody stands frozen: every gap is filled with natural movement or a reaction. "
            f"The clip opens with the action already moving and {ending}")

REF_VOICES = (
    "REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. "
    "The honey-blonde woman in it is CHICHI and the tall man in it is DB. Nothing else is taken from it: not the restaurant, "
    "not the server, not anyone's clothes, not any line of dialogue. In THIS clip ChiChi's voice is EXACTLY her voice in the "
    "reference video and DB's voice is EXACTLY his voice in the reference video.")

def ref_chain(first_speaker, first_line, refrain=False):
    s = ("REFERENCE VIDEO: the attached video is the APPROVED previous clip of this same afternoon, in this same gallery. It is THE AUTHORITY "
         "for LOOKS, VOICES, PLACE, LIGHT AND CAMERA ONLY: the same woman CHICHI on the LEFT, the same man DB on the RIGHT, the same faces, "
         "hair, clothes, the same gallery and the same light, and both voices exactly as they sound in it. NO LINE OF DIALOGUE from the "
         "reference video is repeated. This clip continues from the reference video's final moment. "
         f"The FIRST line of this clip is {first_speaker}'s \"{first_line}\"")
    if refrain:
        s += (" DB's habit of saying \"Hold on\" is part of the story: where this clip's lines contain those words they are NEW lines, "
              "exactly as written below.")
    return s

def headcount(opening, visitor_where):
    return ("*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** " + opening +
            " ONE other museum visitor, " + visitor_where + ", tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, "
            "emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never "
            "within ten feet of them.")

SET_BLOCK = (
    f"SET: the gallery <<<{SET}>>>, exactly as the reference image shows; THE REFERENCE IMAGE DECIDES THE LAYOUT, and where it disagrees with any "
    "left or right wording here, the image wins. A very large, high gallery: white barrel-vaulted ceiling with small track spotlights, polished "
    "honey-coloured wood floor. THE CAMERA stands on the room side at eye level, looking along the long white wall toward the back corner, as in the "
    "reference image. In the vertical frame the tall white wall runs down the LEFT with the large two-panel picture in a thick black frame (two "
    "figures in hats working with tools, built from small collaged pieces) and, further along, the smaller square picture (a field of tall grass); "
    "the back corner is in the middle of the frame; the bold ORANGE wall faces the camera across the back RIGHT with its row of seven small framed "
    "prints; a low white platform with a stack of three printed boxes stands mid-floor; two long grey-cushioned benches, one in the foreground at "
    "frame LEFT, one in the middle distance in front of the orange wall. The art is exactly as in the reference image: nothing added, moved, swapped "
    "or restyled. Soft, even gallery light, afternoon, no windows. Wall labels blank; no readable text anywhere except the printing on the boxes; no "
    "logos or signage. Floor reflections are soft colour only, never a second figure.")

CHICHI_BLOCK = (
    f"CHICHI: face, hair and skin EXACTLY <<<{CF}>>>, body <<<{CB}>>>: forty, warm brown complexion, her skin one even, uniform warm brown "
    "everywhere, never patchy or blotchy, with a small beauty mark on her cheek and a few subtle freckles; HONEY-BLONDE shoulder-length layered "
    "blowout with darker roots, deep side part on the LEFT side of her head, never dark brown; small stud earrings. About 5'5\", full-figured "
    "with a defined waist and full hips and thighs, never slimmed, never boxy. "
    f"HER CLOTHES COME ONLY FROM <<<{CL}>>>: the deep emerald knit midi dress with three-quarter sleeves and a soft round neckline, a slim muted "
    "tan-brown belt at the waist, the skirt falling to mid-calf, and cream leather flats, identical in every shot; nothing is worn from the face or "
    "body references. She carries nothing: no bag, no phone. CHICHI'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS, her eyes crisp in every shot; "
    "never soft, smeared or hazy. NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no "
    "engagement ring; no bracelets, no watch.")

DB_BLOCK = (
    f"DB: face, hair, beard and skin EXACTLY <<<{DF}>>>, build <<<{DBB}>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, "
    "thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1\", clearly "
    f"taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<{DL}>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, "
    "brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or "
    "body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of "
    "either hand, NO wedding ring; the fourth finger of the left hand is bare skin with no tan line.")

PHONE_COMMON = ("DB's phone is a plain black smartphone with no logo; its screen always faces him or his body, never the camera; no text, no message "
                "bubbles and no screen light is ever visible. It is the ONLY object that moves in this clip, and only while DB's hand holds it. "
                "ChiChi's hands are empty.")

CAMERA = ("CAMERA: steady, eye level, always from the room side, the vantage of the set reference. A medium-wide two-shot and waist-up singles in "
          "three-quarter view: the speaker's face is always visible, never a full back. NO ZOOMS, NO PUSH-INS, NO EXTREME CLOSE-UPS; faces never "
          "tighter than waist-up. ChiChi stays on the LEFT of the frame and DB on the RIGHT in every shot.")

PHYSICS = ("PHYSICS: natural posture and weight, feet on the polished floor, ordinary walking pace, five-finger hands, exactly two arms per person; "
           "the phone moves only while DB's hand holds it; nothing else in the gallery moves; no physical contact between them.")

def voices(chain, chichi_speaks=True, db_note=''):
    s = "VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:\n"
    same = "; the same voice as in the reference video" if chain else ""
    if chichi_speaks:
        s += (f"- CHICHI IS AMERICAN: <<<{CV}>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority "
              f"and dry humour{same}. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. Smooth, whole words; never broken or stuttered.")
    else:
        s += ("- CHICHI SAYS NOTHING IN THIS CLIP: no voice of hers is heard at all, no words, no \"mm\", no sound of any kind. (She is AMERICAN and never "
              "British, but there is no line for her to speak.)")
    s += "\n- " + DB_VOICE_MATCH + db_note + "\n"
    s += ("DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths "
          "of a second; each line is one continuous, easy run.\nThe two voices never sound alike and never swap.")
    return s

CHICHI_SPEECH = ("CHICHI'S SPEECH: smooth, fluent, continuous sentences: whole words, no stutters, no broken or clipped words, no restarts, no hesitations.")

# ---------- per-clip data ----------
CLIPS = []

# ===== CLIP 01 =====
CLIPS.append(dict(
    n=1, title='One Second', dur=13, first=('CHICHI', 'I could stand here all afternoon.'), final=('DB', 'Give it time. I like that.'),
    video_ref=VOICE_REF, video_ref_note="Episode 11's approved Clip 05, **voices only**",
    parts=[
        header(13),
        timing("the only beat is DB's phone buzzing once, about half a second.", "ends within half a second of the last line."),
        REF_VOICES,
        ("WHERE WE ARE: Saturday afternoon in the Atlanta Art Museum. DB cleared the whole day for ChiChi and they have just arrived at the first big "
         "picture in this gallery: this is the first moment of their afternoon together, so there is no earlier dialogue. DB is warm, attentive and "
         "present. The first words spoken are ChiChi's \"I could stand here all afternoon.\""),
        headcount("Both are already standing at the picture in the first frame; nobody new arrives.",
                  "far away at the orange wall at the back"),
        SET_BLOCK, CHICHI_BLOCK, DB_BLOCK,
        ("PROP: " + PHONE_COMMON + " In this clip it is in DB's RIGHT hand, hanging at his side, until it buzzes in the middle of the clip."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. The camera never crosses to the "
         "other side of the room and the two never swap sides. They stand side by side at the foot of the big two-panel picture on the long white wall, "
         "both facing the picture, a quarter turn toward the camera so their faces stay in three-quarter view, ChiChi nearer the camera and DB on her "
         "right, one step further along the wall toward the back corner. DB's steel WATCH is on his LEFT wrist, the wrist nearest ChiChi; his phone is "
         "in his RIGHT hand, the hand away from her. When they speak to each other they turn their heads, not their whole bodies. Nobody crosses in "
         "front of anybody."),
        ("FIRST FRAME: a medium-wide two-shot from the room side, already in motion. At the foot of the big two-panel picture, ChiChi at frame LEFT, "
         "head tipped back, looking up at the picture, hands loosely clasped in front of her; DB at frame RIGHT, one step further along the wall, looking "
         "at the picture, his phone in his RIGHT hand hanging at his side. ChiChi starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-2.2 s) Two-shot. ChiChi looks up at the picture, a small contented breath, and speaks; DB glances from the picture to her, a small smile.\n"
         "  CHICHI (American), warm, looking up: \"I could stand here all afternoon.\"\n"
         "2. (2.2-4.1 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. He turns his head fully to her, warm and present, "
         "his eyes on her face, and answers at once.\n"
         "  DB (Dominican), warm: \"Tell me what you see.\"\n"
         "3. (4.1-7.8 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. Her eyes on the picture, then a small nod toward "
         "it as she explains, one finger lifting from her clasped hands to point.\n"
         "  CHICHI (American): \"Little pieces up close. You have to give it time.\"\n"
         "4. (7.8-8.3 s) Two-shot. ChiChi keeps looking at the picture. DB's phone BUZZES once in his right hand: one short soft buzz, about half a "
         "second, and his eyes drop to it.\n"
         "5. (8.3-9.5 s) Waist-up on DB. His thumb is already moving on the phone, his eyes on it; he answers at once, apologetic.\n"
         "  DB (Dominican): \"Sorry. One second.\"\n"
         "6. (9.5-10.3 s) Waist-up on ChiChi. A small gracious smile, her eyes back on the picture.\n"
         "  CHICHI (American): \"Go ahead.\"\n"
         "7. (10.3-13 s) Two-shot. ChiChi looks at the picture; DB looks up from the phone, lowers it to his side and turns his eyes to her, warmly.\n"
         "  DB (Dominican): \"Give it time. I like that.\"\n"
         "  END on this line: ChiChi's eyes on the picture, her smile a little smaller; DB looking at her, the phone still in his hand. After that, "
         "silence: nobody speaks."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"I could stand here all afternoon.\" = CHICHI. \"Tell me what you see.\" = DB. \"Little pieces up close. You have "
         "to give it time.\" = CHICHI. \"Sorry. One second.\" = DB. \"Go ahead.\" = CHICHI. \"Give it time. I like that.\" = DB. Only these six lines, "
         "in this order, each said once."),
        voices(chain=True) + "\n" + CHICHI_SPEECH,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: head tipped back looking up at the picture, a small nod at it, a finger lifting to point, a small smile, her eyes back on the picture.\n"
         "- DB: a glance from the picture to her, his head turning to her, his thumb moving on the phone, looking up again, lowering the phone to his side.\n"
         "- THE VISITOR: far back at the orange wall, slowly moving along the framed prints and looking at them, silent, never near the leads."),
        CAMERA, PHYSICS,
        ("AUDIO: only these six lines and the one short phone buzz, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No "
         "music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ]))

# ===== CLIP 02 =====
CLIPS.append(dict(
    n=2, title='Hold On', dur=11, first=('CHICHI', "This one's my favorite so far."), final=('CHICHI', 'Sure.'),
    video_ref='the approved Clip 01 of this episode', video_ref_note='the approved Clip 01 (job ID filled in after your approval)',
    parts=[
        header(11),
        timing("the only beat is DB's phone buzzing once, about half a second.", "ends within half a second of the last line."),
        ref_chain('ChiChi', "This one's my favorite so far.", refrain=True),
        ("WHERE WE ARE: this picks up a few seconds after the reference video's final line, which is NOT said again. ChiChi and DB have left the big "
         "picture and are walking along the white wall toward the smaller square picture a few steps further on. DB's phone is in his right hand and his "
         "thumb is moving on it as he walks. The first words spoken are ChiChi's \"This one's my favorite so far.\""),
        headcount("Both are already walking in the first frame; nobody new arrives.", "far away at the orange wall at the back"),
        SET_BLOCK, CHICHI_BLOCK, DB_BLOCK,
        ("PROP: " + PHONE_COMMON + " In this clip it is held up in front of him in his RIGHT hand with his thumb moving on it, from the first frame to the "
         "last. It buzzes once. He never puts it away in this clip."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut; the camera never crosses to the other "
         "side of the room and the two never swap sides. THEY WALK SIDE BY SIDE in the SAME direction at the same pace, straight along the white wall and "
         "away from the camera, ChiChi nearest the wall at frame LEFT, DB beside her on her right at frame RIGHT, a step apart; they stay together and "
         "never split up or turn away from each other. At the small square picture they stop and face it, ChiChi first, DB stopping on her right, half a "
         "step further along the wall, still looking at his phone. DB's steel WATCH is on his LEFT wrist; his phone is in his RIGHT hand."),
        ("FIRST FRAME: a medium-wide shot from the room side, already moving: ChiChi and DB mid-stride on the polished floor, walking away from the camera "
         "along the long white wall toward the smaller square picture a few steps ahead, ChiChi at frame LEFT with her hands loosely clasped in front of "
         "her, DB at frame RIGHT with his phone held up in front of him in his right hand, his thumb moving on it."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-3 s) Medium-wide. They walk side by side, same direction, same pace. On her second step ChiChi starts speaking, her face turning up and a "
         "little toward the camera to look at the picture as they arrive; they stop together at the foot of the small picture, ChiChi facing it, DB on her "
         "right, still thumbing the phone.\n"
         "  CHICHI (American), pleased, looking up at the picture: \"This one's my favorite so far.\"\n"
         "2. (3-3.7 s) Waist-up on DB, three-quarter view. His eyes stay on the phone, his thumb moving.\n"
         "  DB (Dominican), absent: \"Mm-hm.\"\n"
         "3. (3.7-9.2 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She starts the line softly, to the picture; on "
         "\"Sundays\" she turns her head toward him and sees his thumb moving on the phone; her voice drops and the line stops on the word \"imagine\". "
         "She never finishes the sentence: no word follows \"imagine\".\n"
         "  CHICHI (American), softer and sincere: \"I used to come to places like this by myself on Sundays. I'd always imagine\"\n"
         "4. (9.2-9.7 s) Two-shot. Her line has stopped. DB's phone BUZZES once in his right hand: one short soft buzz, about half a second. ChiChi's eyes "
         "go to his hand; DB looks down at the phone.\n"
         "5. (9.7-10.4 s) Waist-up on DB, his eyes on the screen, his free left hand half raised toward her, palm out, not looking up.\n"
         "  DB (Dominican): \"Hold on.\"\n"
         "6. (10.4-11 s) Waist-up on ChiChi. She turns back to the picture, level and quiet.\n"
         "  CHICHI (American): \"Sure.\"\n"
         "  END on this line: ChiChi facing the small picture, mouth closed, hands clasped. After that, silence: nobody speaks."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"This one's my favorite so far.\" = CHICHI. \"Mm-hm.\" = DB. \"I used to come to places like this by myself on "
         "Sundays. I'd always imagine\" = CHICHI, and she stops there. \"Hold on.\" = DB. \"Sure.\" = CHICHI. Only these five lines, in this order, each "
         "said once."),
        "PRONUNCIATION: DB's \"Mm-hm.\" is a closed-mouth two-note hum (MM-hm), not words.",
        voices(chain=True) + "\n" + CHICHI_SPEECH + " Her last word \"imagine\" is spoken cleanly, and then she stops.",
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: walking, speaking, stopping, looking up at the small picture, one head turn to DB, her eyes to his hand, back to the picture.\n"
         "- DB: walking with the phone held up in his right hand, his thumb moving, a glance down at the buzz, his left hand half raised.\n"
         "- THE VISITOR: far back at the orange wall, slowly moving along the framed prints, silent, never near the leads."),
        CAMERA, PHYSICS,
        ("AUDIO: only these five lines and the one short phone buzz, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No "
         "music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ]))

# ===== CLIP 03 =====
CLIPS.append(dict(
    n=3, title='I Have to Take This', dur=13, first=('CHICHI', 'Come sit. Just for a minute.'), final=('DB', 'Yeah. Go ahead.'),
    video_ref='the approved Clip 02 of this episode', video_ref_note='the approved Clip 02 (job ID filled in after your approval)',
    parts=[
        header(13),
        timing("the only beat is DB's phone starting to buzz, about half a second.", "ends within half a second of the last line."),
        ref_chain('ChiChi', 'Come sit. Just for a minute.', refrain=True),
        ("WHERE WE ARE: this picks up a little later than the reference video's final line, which is NOT said again. ChiChi has walked back to the "
         "foreground bench and sat down; DB has followed her with his phone in his right hand and is still standing beside the bench. The first words "
         "spoken are ChiChi's \"Come sit. Just for a minute.\""),
        headcount("ChiChi is already seated and DB already standing at the bench in the first frame; nobody new arrives.",
                  "far away at the orange wall at the back"),
        SET_BLOCK, CHICHI_BLOCK, DB_BLOCK,
        ("PROP: " + PHONE_COMMON + " In this clip it is in DB's RIGHT hand at the start; when he sits it rests on his right knee, screen turned down toward "
         "his knee; it buzzes and keeps buzzing, he picks it up with his right hand as he rises and puts it to his RIGHT ear as he walks away, a real phone "
         "held to his ear, never on speaker."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut; the camera never crosses to the other "
         "side of the room and the two never swap sides. The foreground bench is the long grey-cushioned double bench at the bottom LEFT of the set image, "
         "with the white wall and the big two-panel picture behind it. They sit side by side facing the room, toward the camera side, angled a little "
         "toward each other: ChiChi on the LEFT cushion (frame LEFT), DB on the RIGHT cushion (frame RIGHT). Facing the camera, ChiChi pats the empty "
         "cushion with her LEFT hand, the cushion at frame RIGHT. ChiChi sits with her knees together and her ankles crossed, the dress falling naturally "
         "to mid-calf. DB leaves along the far side of the bench, at frame RIGHT, and NEVER crosses in front of ChiChi; he walks away from the camera up the "
         "room along the white wall toward the back corner. DB's steel WATCH is on his LEFT wrist, nearest ChiChi; his phone is in his RIGHT hand."),
        ("FIRST FRAME: a medium-wide two-shot from the room side at the foreground bench: ChiChi already sitting on the LEFT cushion at frame LEFT, facing "
         "the room, her left hand resting flat on the empty cushion beside her at frame RIGHT; DB standing at frame RIGHT at the bench's right end, facing "
         "her, his phone in his RIGHT hand at his side. ChiChi starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-2.3 s) Two-shot. ChiChi pats the empty cushion beside her with her left hand and looks up at him, warm; DB, already moving, steps to the bench.\n"
         "  CHICHI (American), warm: \"Come sit. Just for a minute.\"\n"
         "2. (2.3-3.8 s) Two-shot. DB sits on the RIGHT cushion, the phone resting on his right knee, and turns toward her; ChiChi watches him settle.\n"
         "  DB (Dominican): \"Okay. I'm here.\"\n"
         "3. (3.8-7.3 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns to him, her hands settling in her lap, "
         "sincere, steady.\n"
         "  CHICHI (American): \"Can I say something that isn't about the art?\"\n"
         "4. (7.3-7.8 s) Two-shot. Her mouth closes. DB's phone starts BUZZING on his knee and keeps buzzing softly under his next line: a call, one "
         "continuous low vibration, no ringtone. He looks down at it.\n"
         "5. (7.8-10.2 s) Waist-up on DB, three-quarter view. Already rising from the bench, the phone in his right hand, his eyes on the screen.\n"
         "  DB (Dominican): \"Hold on. I have to take this.\"\n"
         "6. (10.2-11 s) Waist-up on ChiChi, her eyes following him up, level and gracious.\n"
         "  CHICHI (American), level: \"Of course.\"\n"
         "7. (11-13 s) Medium-wide. ChiChi watches him go for two steps, then turns her face back to the room. DB puts the phone to his right ear and walks "
         "away from the camera up the room along the white wall toward the back corner at an ordinary walking pace, speaking low as he goes.\n"
         "  DB (Dominican), hushed, into the phone, as he walks away: \"Yeah. Go ahead.\"\n"
         "  END on this line: ChiChi alone on the left cushion facing the room, DB walking away toward the far corner, the phone at his ear. After that, "
         "silence: nobody speaks."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"Come sit. Just for a minute.\" = CHICHI. \"Okay. I'm here.\" = DB. \"Can I say something that isn't about the "
         "art?\" = CHICHI. \"Hold on. I have to take this.\" = DB. \"Of course.\" = CHICHI. \"Yeah. Go ahead.\" = DB, into the phone. Only these six "
         "lines, in this order, each said once. The person on the phone is never heard."),
        voices(chain=True, db_note=" His last line is hushed and low, as a man on a call in a quiet gallery; it is still HIS voice.") + "\n" + CHICHI_SPEECH,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: sitting, patting the cushion, turning to him, settling her hands in her lap, watching him leave, turning back to the room.\n"
         "- DB: standing and thumbing his phone, sitting, rising, walking away with the phone at his ear, speaking low.\n"
         "- THE VISITOR: far back at the orange wall, looking at the framed prints, silent, never near the leads."),
        CAMERA, PHYSICS + " DB sits and rises naturally; the bench does not move.",
        ("AUDIO: only these six lines and the phone's low continuous vibration, soft footsteps on the wood floor and the faint hush of a large quiet "
         "gallery. No ringtone, no music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ]))

# ===== CLIP 04 =====
CLIPS.append(dict(
    n=4, title='Not Doing Anything', dur=10, first=('DB', 'No, I saw it. Send me the revised one.'), final=('DB', "No, it's fine. I'm not doing anything."),
    video_ref='the approved Clip 03 of this episode', video_ref_note='the approved Clip 03 (job ID filled in after your approval)',
    parts=[
        header(10),
        timing("there are no beats at all.", "ends within half a second of the last line."),
        ref_chain('DB', 'No, I saw it. Send me the revised one.', refrain=True),
        ("WHERE WE ARE: this picks up a few moments after the reference video's final line, which is NOT said again. DB has walked away up the gallery "
         "to take a call and is now standing far away in the back corner, the phone at his ear. ChiChi has been left alone on the foreground bench and is "
         "just rising from it. The first words spoken are DB's \"No, I saw it. Send me the revised one.\""),
        ("*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is at the bench and DB is already in the back corner "
         "in the first frame; nobody new arrives, and there is never a second DB: the small figure in the far corner IS DB. ONE other museum visitor, far "
         "away at the FAR RIGHT END of the orange wall, well away from DB's corner, tiny in the frame, dressed in muted charcoal and cream (nothing orange, "
         "rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never speaking, never crossing in front of the leads and never within "
         "ten feet of them."),
        SET_BLOCK, CHICHI_BLOCK, DB_BLOCK,
        ("PROP: " + PHONE_COMMON + " In this clip it is at DB's RIGHT ear for the whole clip, a real phone held to his ear, never on speaker. "
         "THE PERSON ON THE OTHER END IS NEVER HEARD: no voice from the phone, no muffled reply, no second voice at all."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. ChiChi starts at the foreground bench "
         "at frame LEFT and walks away from the camera to the foot of the big two-panel picture on the white wall, where she stands facing it with her hands "
         "clasped. DB is far away in the FAR BACK CORNER at frame RIGHT, where the long white wall meets the orange wall, for the whole clip: a small figure "
         "half turned away from her, the phone at his RIGHT ear, his left hand in his trouser pocket; he paces two slow steps but never comes closer and "
         "never looks toward her. ChiChi never turns toward the corner."),
        ("FIRST FRAME: a WIDE shot from the room side. ChiChi at frame LEFT, just rising from the foreground bench, her hands empty. DB far away in the back "
         "corner at frame RIGHT, tiny in the frame, half turned away, the phone at his right ear, his left hand in his trouser pocket. DB starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-3.4 s) Wide. ChiChi walks away from the camera from the bench to the big two-panel picture on the white wall at an unhurried pace, her hands "
         "loosely clasped, without looking toward him. DB, in the far corner, paces two slow steps, half turned away. His voice carries low across the quiet "
         "gallery.\n"
         "  DB (Dominican), low and hushed, into the phone: \"No, I saw it. Send me the revised one.\"\n"
         "2. (3.4-5.9 s) Waist-up on ChiChi, three-quarter view, at the foot of the big two-panel picture: she stops and looks up at the two figures at "
         "work. DB's voice is heard OFF CAMERA, far across the gallery.\n"
         "  DB (Dominican), low, off camera: \"Hold on. Let me pull it up.\"\n"
         "3. (5.9-10 s) Waist-up on ChiChi. She HEARS it: her clasped hands tighten, she lets out one slow breath through her nose, her eyes stay on the "
         "picture, her jaw sets. Her mouth stays closed; she says nothing. DB's voice is heard off camera, easy and absent.\n"
         "  DB (Dominican), off camera, easy and absent: \"No, it's fine. I'm not doing anything.\"\n"
         "  END within half a second of the last word: ChiChi facing the two-panel picture, hands tight, jaw set. After that, silence: nobody speaks."),
        ("LINE OWNERSHIP: every line in this clip is DB's, spoken into the phone. \"No, I saw it. Send me the revised one.\" = DB. \"Hold on. Let me pull "
         "it up.\" = DB. \"No, it's fine. I'm not doing anything.\" = DB. Only these three lines, in this order, each said once. ChiChi says NOTHING: no "
         "words, no \"mm\", no sound of any kind. The caller is never heard."),
        "PRONUNCIATION: \"revised\" is said rih-VIZED.",
        voices(chain=True, chichi_speaks=False, db_note=" In this clip DB speaks quietly, low and hushed, as a man on a phone call in a quiet gallery; it is still HIS voice, the same voice, and every line is one easy continuous run.") ,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: rising from the bench, walking to the picture, looking up at it, her hands tightening, one slow breath, her jaw setting.\n"
         "- DB: on the call in the far back corner, a step or two of slow pacing, half turned away from her, his left hand in his pocket.\n"
         "- THE VISITOR: far back at the far right end of the orange wall, looking at the framed prints, silent, nowhere near DB."),
        CAMERA, PHYSICS,
        ("AUDIO: only DB's three lines, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No caller voice, no music, no "
         "background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ]))

# ===== CLIP 05 =====
CLIPS.append(dict(
    n=5, title='Where Were We?', dur=7, first=('DB', "Sorry. That's done. Where were we?"), final=('CHICHI', 'Not continuing this.'),
    video_ref='the approved Clip 04 of this episode', video_ref_note='the approved Clip 04 (job ID filled in after your approval)',
    parts=[
        header(7),
        timing("the only beat is DB's reaction after ChiChi's last line, about a second and a half, and then the clip ends.",
               "ends within half a second of DB's lean settling."),
        ref_chain('DB', "Sorry. That's done. Where were we?"),
        ("WHERE WE ARE: this picks up a little later than the reference video's final line, which is NOT said again. The call is over. ChiChi is standing "
         "alone at the foot of the big two-panel picture, her hands clasped, looking up at it. DB is walking back to her from the far corner, finishing a "
         "text. The first words spoken are DB's \"Sorry. That's done. Where were we?\""),
        ("*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is at the picture and DB is already walking toward her "
         "in the first frame; nobody new arrives, and there is only ever ONE DB. ONE other museum visitor, far away at the orange wall at the back, tiny in "
         "the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never "
         "speaking, never crossing in front of the leads and never within ten feet of them."),
        SET_BLOCK, CHICHI_BLOCK, DB_BLOCK,
        ("PROP: " + PHONE_COMMON + " In this clip it is in DB's RIGHT hand, his thumb finishing a text, until he slips it into his right trouser pocket on "
         "the word \"done\"; from then on his hands are empty and the phone stays in the pocket."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. ChiChi stands at the foot of the big "
         "two-panel picture at frame LEFT, facing it. DB walks back toward her along the white wall from the far back corner, coming up on her RIGHT, the "
         "far-corner side, so he never crosses in front of her, and stops beside her on her right at frame RIGHT, one step further along the wall. When "
         "ChiChi speaks she turns her head to her right, toward him. DB's steel WATCH is on his LEFT wrist."),
        ("FIRST FRAME: a WIDE shot from the room side. ChiChi at frame LEFT at the foot of the big two-panel picture, her hands clasped in front of her, "
         "looking up at it. DB at frame RIGHT, smaller and further away, already walking toward her along the white wall from the far back corner, his "
         "thumb finishing a text on the phone in his right hand. DB starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-3.4 s) Wide. ChiChi stands still, looking up at the picture, hearing him come. DB speaks as he walks, at a natural pace; on \"done\" he "
         "slips the phone into his right trouser pocket, and he arrives beside her at frame RIGHT on the last word, warm, a little out of breath, a hopeful "
         "smile.\n"
         "  DB (Dominican), warm, a little out of breath: \"Sorry. That's done. Where were we?\"\n"
         "2. (3.4-5 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns her head to him, level and calm, her eyes "
         "clear, not raised, not softened.\n"
         "  CHICHI (American), level, calm: \"Not continuing this.\"\n"
         "3. (5-6.7 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. His smile drops. His head draws back an inch and he "
         "leans away from her, taken aback. His mouth stays closed; he says NOTHING.\n"
         "  END within half a second of the lean settling: DB leaning back, his eyes on her. ChiChi's \"Not continuing this.\" is the last line of the "
         "clip. After that, silence: nobody speaks, and nothing more is said. DB makes no sound of speech at all: no word of any kind."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"Sorry. That's done. Where were we?\" = DB. \"Not continuing this.\" = CHICHI. Only these two lines, in this "
         "order, each said once. DB says nothing after hers."),
        voices(chain=True) + "\n" + CHICHI_SPEECH,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: standing at the picture, looking up at it, then turning her head to him.\n"
         "- DB: walking, finishing the text, pocketing the phone, smiling, then drawing his head back and leaning away.\n"
         "- THE VISITOR: far back at the orange wall, looking at the framed prints, silent, never near the leads."),
        CAMERA, PHYSICS,
        ("AUDIO: only these two lines, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No music, no background chatter, no "
         "other voices, no narration. No subtitles, captions or on-screen text."),
    ]))

# ---------- assemble prompts ----------
def prompt_text(c):
    return "\n\n".join(c['parts'])

if __name__ == '__main__':
    import json
    for c in CLIPS:
        c['prompt'] = prompt_text(c)
    json.dump([{k: v for k, v in c.items() if k != 'parts'} for c in CLIPS],
              open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prompts_data.json'), 'w'), indent=1)
    print('built', len(CLIPS), 'prompts;', [len(c['prompt'].split()) for c in CLIPS], 'words')
