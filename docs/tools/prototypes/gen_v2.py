#!/usr/bin/env python3
"""Revised prompts after Clip 01 v1 (8 Oct 2026): Clip 01 v2 (ring fix) and the combined Clips 02+03 (24 s).
Shared blocks come from gen_prompts so the guards and DB's voice cannot drift."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen_prompts as G

# ---------- DB block with the ring fix ----------
DB_BLOCK2 = (
    f"DB: face, hair, beard and skin EXACTLY <<<{G.DF}>>>, build <<<{G.DBB}>>>: forty-eight, Dominican, warm golden-tan to light-brown complexion, "
    "thick dark softly wavy hair with silver at the temples, a neatly trimmed short beard with a few silver flecks. TALL, about 6'1\", clearly "
    f"taller than ChiChi in every shot. HIS CLOTHES COME ONLY FROM <<<{G.DL}>>>: the navy fine-knit crew-neck sweater, light-grey tailored trousers, "
    "brown leather loafers, and a steel bracelet watch with a dark dial on his LEFT wrist, identical in every shot; nothing is worn from the face or "
    "body references. Kind, attentive, self-assured, never smug. DB'S FACE NEVER DRIFTS and is ALWAYS IN SHARP FOCUS. NO RINGS on any finger of "
    "either hand; the fourth finger of the left hand is bare skin with no tan line. DB'S HANDS ARE BARE: plain, bare fingers on both hands, nothing "
    "on any finger, and nothing on either wrist but the steel watch on his LEFT. His LEFT hand stays in his left trouser pocket in every shot.")

# ---------- reference paragraphs ----------
REF_VOICES2 = (
    "REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. "
    "The honey-blonde woman in it is CHICHI and the tall man in it is DB. Nothing else is taken from it: not the restaurant, "
    "not the server, not anyone's clothes, not any line of dialogue, and above all not the ring on the man's left hand: that ring is a mistake "
    "in the reference and is NEVER reproduced; in THIS clip DB's hands are completely bare. In THIS clip ChiChi's voice is EXACTLY her voice in the "
    "reference video and DB's voice is EXACTLY his voice in the reference video.")

REF_CHAIN_HANDS = " DB's hands are bare in the reference video and stay bare in this clip."
REF_CHAIN_HANDS_IF_V1 = (" The man in the reference video wears a ring on his left hand: that ring is a mistake and is NEVER reproduced; "
                         "in THIS clip DB's hands are completely bare.")

# =====================================================================
# CLIP 01 v2
# =====================================================================
C01V2 = dict(
    id='01v2', title='One Second', dur=13,
    first=('CHICHI', 'I could stand here all afternoon.'), final=('DB', 'Give it time. I like that.'),
    parts=[
        G.header(13),
        G.timing("the only beat is DB's phone buzzing once, about half a second.", "ends within half a second of the last line."),
        REF_VOICES2,
        ("WHERE WE ARE: Saturday afternoon in the Atlanta Art Museum. DB cleared the whole day for ChiChi and they have just arrived at the first big "
         "picture in this gallery: this is the first moment of their afternoon together, so there is no earlier dialogue. DB is warm, attentive and "
         "present. The first words spoken are ChiChi's \"I could stand here all afternoon.\""),
        G.headcount("Both are already standing at the picture in the first frame; nobody new arrives.", "far away at the orange wall at the back"),
        G.SET_BLOCK, G.CHICHI_BLOCK, DB_BLOCK2,
        ("PROP: " + G.PHONE_COMMON + " In this clip it is in DB's RIGHT hand, hanging at his side, until it buzzes in the middle of the clip."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. The camera never crosses to the "
         "other side of the room and the two never swap sides. They stand side by side at the foot of the big two-panel picture on the long white wall, "
         "both facing the picture, a quarter turn toward the camera so their faces stay in three-quarter view, ChiChi nearer the camera and DB on her "
         "right, one step further along the wall toward the back corner. DB's steel WATCH is on his LEFT wrist; his phone is in his RIGHT hand. "
         "DB'S LEFT HAND stays in his left trouser pocket in every shot, the fingers never seen. When they speak to each other they turn their heads, "
         "not their whole bodies. Nobody crosses in front of anybody."),
        ("FIRST FRAME: a medium-wide two-shot from the room side, already in motion. At the foot of the big two-panel picture, ChiChi at frame LEFT, "
         "head tipped back, looking up at the picture, hands loosely clasped in front of her; DB at frame RIGHT, one step further along the wall, looking "
         "at the picture, his phone in his RIGHT hand hanging at his side, his left hand in his left trouser pocket. ChiChi starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-2.2 s) Two-shot. ChiChi looks up at the picture, a small contented breath, and speaks; DB glances from the picture to her, a small smile.\n"
         "  CHICHI (American), warm, looking up: \"I could stand here all afternoon.\"\n"
         "2. (2.2-4.1 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. He turns his head fully to her, warm and present, "
         "his eyes on her face, and answers at once.\n"
         "  DB (Dominican), warm: \"Tell me what you see.\"\n"
         "3. (4.1-7.8 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She answers at once, the moment he finishes: her "
         "eyes on the picture, then a small nod toward it as she explains, one finger lifting from her clasped hands to point.\n"
         "  CHICHI (American): \"Little pieces up close. You have to give it time.\"\n"
         "4. (7.8-8.3 s) Two-shot. ChiChi keeps looking at the picture. DB's phone BUZZES once in his right hand: one short soft buzz, about half a "
         "second, and his eyes drop to it.\n"
         "5. (8.3-9.5 s) Waist-up on DB. His thumb is already moving on the phone, his eyes on it; he answers at once, apologetic.\n"
         "  DB (Dominican): \"Sorry. One second.\"\n"
         "6. (9.5-10.3 s) Waist-up on ChiChi. A small gracious smile, her eyes back on the picture; she answers at once.\n"
         "  CHICHI (American): \"Go ahead.\"\n"
         "7. (10.3-13 s) Two-shot. ChiChi looks at the picture; DB looks up from the phone, lowers it to his side and turns his eyes to her, warmly, "
         "and speaks at once, on the end of her line.\n"
         "  DB (Dominican): \"Give it time. I like that.\"\n"
         "  END on this line: ChiChi's eyes on the picture, her smile a little smaller; DB looking at her, the phone still in his hand. After that, "
         "silence: nobody speaks."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"I could stand here all afternoon.\" = CHICHI. \"Tell me what you see.\" = DB. \"Little pieces up close. You have "
         "to give it time.\" = CHICHI. \"Sorry. One second.\" = DB. \"Go ahead.\" = CHICHI. \"Give it time. I like that.\" = DB. Only these six lines, "
         "in this order, each said once."),
        G.voices(chain=True) + "\n" + G.CHICHI_SPEECH,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: head tipped back looking up at the picture, a small nod at it, a finger lifting to point, a small smile, her eyes back on the picture.\n"
         "- DB: a glance from the picture to her, his head turning to her, his thumb moving on the phone, looking up again, lowering the phone to his side; "
         "his left hand rests in his pocket the whole time.\n"
         "- THE VISITOR: far back at the orange wall, slowly moving along the framed prints and looking at them, silent, never near the leads."),
        G.CAMERA, G.PHYSICS,
        ("AUDIO: only these six lines and the one short phone buzz, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No "
         "music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ])

# =====================================================================
# CLIPS 02 + 03 combined, 24 s
# =====================================================================
C0203 = dict(
    id='0203', title='Hold On / I Have to Take This', dur=24,
    first=('CHICHI', "This one's my favorite so far."), final=('DB', 'Yeah. Go ahead.'),
    parts=[
        G.header(24),
        G.timing("the only beats are DB's phone buzzing, about half a second each time.", "ends within half a second of the last line."),
        G.ref_chain('ChiChi', "This one's my favorite so far.", refrain=True) + REF_CHAIN_HANDS,
        ("WHERE WE ARE: this picks up a few seconds after the reference video's final line, which is NOT said again. ChiChi and DB have left the big "
         "picture and are walking along the white wall toward the smaller square picture a few steps further on. DB's phone is in his right hand and his "
         "thumb is moving on it as he walks. At 11 seconds the clip jumps a few minutes ahead with a HARD CUT to the foreground bench, where ChiChi is "
         "already sitting; nobody walks to the bench on screen. The first words spoken are ChiChi's \"This one's my favorite so far.\""),
        G.headcount("Both are already walking in the first frame; nobody new arrives, and after the cut to the bench there is still ONE ChiChi and ONE DB.",
                    "far away at the orange wall at the back"),
        G.SET_BLOCK, G.CHICHI_BLOCK, DB_BLOCK2,
        ("PROP: " + G.PHONE_COMMON + " FIRST HALF (0 to 11 s): it is held up in front of him in his RIGHT hand with his thumb moving on it, from the first "
         "frame to the cut; it buzzes once, about half a second. SECOND HALF (11 to 24 s): it is in DB's RIGHT hand at his side at the start; when he sits it "
         "rests on his right knee, screen turned down toward his knee; it starts buzzing and keeps buzzing, he picks it up with his right hand as he rises and "
         "puts it to his RIGHT ear as he walks away, a real phone held to his ear, never on speaker."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut; the camera never crosses to the other "
         "side of the room and the two never swap sides. FIRST HALF, at the small picture: THEY WALK SIDE BY SIDE in the SAME direction at the same pace, "
         "straight along the white wall and away from the camera, ChiChi nearest the wall at frame LEFT, DB beside her on her right at frame RIGHT, a step "
         "apart; they stay together and never split up or turn away from each other. At the small square picture they stop and face it, ChiChi first, DB "
         "stopping on her right, half a step further along the wall, still looking at his phone. SECOND HALF, at the bench: the foreground bench is the long "
         "grey-cushioned double bench at the bottom LEFT of the set image, with the white wall and the big two-panel picture behind it. They sit side by side "
         "facing the room, toward the camera side, angled a little toward each other: ChiChi on the LEFT cushion (frame LEFT), DB on the RIGHT cushion (frame "
         "RIGHT). Facing the camera, ChiChi pats the empty cushion with her LEFT hand, the cushion at frame RIGHT. ChiChi sits with her knees together and her "
         "ankles crossed, the dress falling naturally to mid-calf. DB leaves along the far side of the bench, at frame RIGHT, and NEVER crosses in front of "
         "ChiChi; he walks away from the camera up the room along the white wall toward the back corner. DB's steel WATCH is on his LEFT wrist; his phone is "
         "in his RIGHT hand. DB'S LEFT HAND stays in his left trouser pocket in every shot of the clip, the fingers never seen."),
        ("FIRST FRAME: a medium-wide shot from the room side, already moving: ChiChi and DB mid-stride on the polished floor, walking away from the camera "
         "along the long white wall toward the smaller square picture a few steps ahead, ChiChi at frame LEFT with her hands loosely clasped in front of "
         "her, DB at frame RIGHT with his phone held up in front of him in his right hand, his thumb moving on it, his left hand in his left trouser pocket."),
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
         "5. (9.7-10.4 s) Waist-up on DB, his eyes on the screen, the phone in his right hand, a small apologetic tilt of his head, not looking up.\n"
         "  DB (Dominican): \"Hold on.\"\n"
         "6. (10.4-11 s) Waist-up on ChiChi. She turns back to the picture, level and quiet.\n"
         "  CHICHI (American): \"Sure.\"\n"
         "7. (11-13.3 s) HARD CUT, a few minutes later, to a medium-wide two-shot at the foreground bench: ChiChi is already sitting on the LEFT cushion at "
         "frame LEFT, facing the room, DB standing at frame RIGHT at the bench's right end, facing her, his phone in his RIGHT hand at his side, his left "
         "hand in his pocket. ChiChi pats the empty cushion beside her with her left hand and looks up at him, warm, and speaks at once; DB, already moving, "
         "steps to the bench.\n"
         "  CHICHI (American), warm: \"Come sit. Just for a minute.\"\n"
         "8. (13.3-14.8 s) Two-shot. DB sits on the RIGHT cushion, the phone resting on his right knee, his left hand staying in his pocket, and turns "
         "toward her; ChiChi watches him settle.\n"
         "  DB (Dominican): \"Okay. I'm here.\"\n"
         "9. (14.8-18.3 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns to him, her hands settling in her lap, "
         "sincere, steady.\n"
         "  CHICHI (American): \"Can I say something that isn't about the art?\"\n"
         "10. (18.3-18.8 s) Two-shot. Her mouth closes. DB's phone starts BUZZING on his knee and keeps buzzing softly under his next line: a call, one "
         "continuous low vibration, no ringtone. He looks down at it.\n"
         "11. (18.8-21.2 s) Waist-up on DB, three-quarter view. Already rising from the bench, the phone in his right hand, his eyes on the screen, his left "
         "hand still in his pocket.\n"
         "  DB (Dominican): \"Hold on. I have to take this.\"\n"
         "12. (21.2-22 s) Waist-up on ChiChi, her eyes following him up, level and gracious.\n"
         "  CHICHI (American), level: \"Of course.\"\n"
         "13. (22-24 s) Medium-wide. ChiChi watches him go for two steps, then turns her face back to the room. DB puts the phone to his right ear and walks "
         "away from the camera up the room along the white wall toward the back corner at an ordinary walking pace, speaking low as he goes.\n"
         "  DB (Dominican), hushed, into the phone, as he walks away: \"Yeah. Go ahead.\"\n"
         "  END on this line: ChiChi alone on the left cushion facing the room, DB walking away toward the far corner, the phone at his ear. After that, "
         "silence: nobody speaks."),
        ("LINE OWNERSHIP, NEVER SWAPPED: \"This one's my favorite so far.\" = CHICHI. \"Mm-hm.\" = DB. \"I used to come to places like this by myself on "
         "Sundays. I'd always imagine\" = CHICHI, and she stops there. \"Hold on.\" = DB. \"Sure.\" = CHICHI. \"Come sit. Just for a minute.\" = CHICHI. "
         "\"Okay. I'm here.\" = DB. \"Can I say something that isn't about the art?\" = CHICHI. \"Hold on. I have to take this.\" = DB. \"Of course.\" = CHICHI. "
         "\"Yeah. Go ahead.\" = DB, into the phone. Only these eleven lines, in this order, each said once. The person on the phone is never heard."),
        "PRONUNCIATION: DB's \"Mm-hm.\" is a closed-mouth two-note hum (MM-hm), not words.",
        G.voices(chain=True, db_note=" His last line is hushed and low, as a man on a call in a quiet gallery; it is still HIS voice.") + "\n" + G.CHICHI_SPEECH
        + " In shot 3 her last word \"imagine\" is spoken cleanly, and then she stops.",
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: walking, speaking, stopping, looking up at the small picture, one head turn to DB, her eyes to his hand, back to the picture; then sitting, "
         "patting the cushion, turning to him, settling her hands in her lap, watching him leave, turning back to the room.\n"
         "- DB: walking with the phone held up in his right hand, his thumb moving, a glance down at the buzz, a small apologetic head tilt; then standing and "
         "thumbing his phone, sitting, rising, walking away with the phone at his ear, speaking low; his left hand rests in his pocket the whole time.\n"
         "- THE VISITOR: far back at the orange wall, slowly moving along the framed prints, silent, never near the leads."),
        G.CAMERA, G.PHYSICS + " DB sits and rises naturally; the bench does not move.",
        ("AUDIO: only these eleven lines, the phone's one short buzz and then its low continuous vibration, soft footsteps on the wood floor and the faint "
         "hush of a large quiet gallery. No ringtone, no music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ])

for c in (C01V2, C0203):
    c['prompt'] = "\n\n".join(c['parts'])

if __name__ == '__main__':
    import json
    json.dump([{k: v for k, v in c.items() if k != 'parts'} for c in (C01V2, C0203)],
              open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prompts_v2.json'), 'w'), indent=1)
    for c in (C01V2, C0203):
        print(c['id'], len(c['prompt'].split()), 'words', len(c['prompt']), 'chars')
