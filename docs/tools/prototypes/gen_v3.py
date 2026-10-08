#!/usr/bin/env python3
"""Combined Clips 04+05 (17 s), with the ring fix, chained from the approved Clips 02+03."""
import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen_prompts as G
import gen_v2 as V

VOICES_0405 = (
    "VOICES, TWO DIFFERENT PEOPLE, NEVER MIXED:\n"
    f"- CHICHI IS AMERICAN: <<<{G.CV}>>>, a warm, smooth, mid-to-low Black American woman's voice with a GENERAL AMERICAN ACCENT, calm authority and dry "
    "humour; the same voice as in the reference video. ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice. She has ONE line only, "
    "\"Not continuing this.\", in shot 5; in the first half (shots 1 to 3) she says nothing at all: no words, no \"mm\", no sound of any kind. Smooth, whole words; "
    "never broken or stuttered.\n"
    "- " + G.DB_VOICE_MATCH + " In the first half DB speaks quietly, low and hushed, as a man on a phone call in a quiet gallery; it is still HIS voice, the same "
    "voice, and every line is one easy continuous run. In the second half he is warm and a little out of breath.\n"
    "DB'S PACING: his slow, deliberate quality is in his calm TONE, never in gaps. No pause inside or between his lines longer than two tenths of a second; "
    "each line is one continuous, easy run.\nThe two voices never sound alike and never swap.")

C0405 = dict(
    id='0405', title='Not Doing Anything / Where Were We?', dur=17,
    first=('DB', 'No, I saw it. Send me the revised one.'), final=('CHICHI', 'Not continuing this.'),
    parts=[
        G.header(17),
        G.timing("there are no beats except DB's reaction after ChiChi's last line, about a second and a half, and then the clip ends.",
                 "ends within half a second of DB's lean settling."),
        G.ref_chain('DB', 'No, I saw it. Send me the revised one.', refrain=True) + V.REF_CHAIN_HANDS,
        ("WHERE WE ARE: this picks up a few moments after the reference video's final line, which is NOT said again. DB has walked away up the gallery to "
         "take a call and is now standing far away in the back corner, the phone at his ear. ChiChi has been left alone on the foreground bench and is just "
         "rising from it. At 10 seconds the call is over and the clip cuts to a wide shot a moment later: ChiChi is standing at the foot of the big two-panel "
         "picture and DB is walking back to her from the far corner, finishing a text. The first words spoken are DB's \"No, I saw it. Send me the revised one.\""),
        ("*** HEADCOUNT: EXACTLY TWO MAIN PEOPLE: ONE CHICHI, ONE DB. NEVER TWO OF ANYONE. *** ChiChi is at the bench and DB is already in the back corner in "
         "the first frame; nobody new arrives, and there is never a second DB: the small figure in the far corner IS DB, and after the cut at 10 seconds the man "
         "walking back from that corner is the same DB. ONE other museum visitor, far away at the FAR RIGHT END of the orange wall, well away from DB's corner, "
         "tiny in the frame, dressed in muted charcoal and cream (nothing orange, rust, red, emerald or navy), looking at the framed prints, MOUTH CLOSED, never "
         "speaking, never crossing in front of the leads and never within ten feet of them."),
        G.SET_BLOCK, G.CHICHI_BLOCK, V.DB_BLOCK2,
        ("PROP: " + G.PHONE_COMMON + " FIRST HALF (0 to 10 s): it is at DB's RIGHT ear for the whole time, a real phone held to his ear, never on speaker. "
         "THE PERSON ON THE OTHER END IS NEVER HEARD: no voice from the phone, no muffled reply, no second voice at all. SECOND HALF (10 to 17 s): it is in DB's "
         "RIGHT hand, his thumb finishing a text, until he slips it into his right trouser pocket on the word \"done\"; from then on his right hand is empty and the "
         "phone stays in the pocket."),
        ("BLOCKING: ChiChi is ALWAYS on the LEFT of the frame and DB ALWAYS on the RIGHT, in every shot and every cut. FIRST HALF: ChiChi starts at the foreground "
         "bench at frame LEFT and walks away from the camera to the foot of the big two-panel picture on the white wall, where she stands facing it with her hands "
         "clasped. DB is far away in the FAR BACK CORNER at frame RIGHT, where the long white wall meets the orange wall: a small figure half turned away from her, "
         "the phone at his RIGHT ear, his left hand in his trouser pocket; he paces two slow steps but never comes closer and never looks toward her. ChiChi never "
         "turns toward the corner. SECOND HALF: ChiChi stands at the foot of the big two-panel picture at frame LEFT, facing it. DB walks back toward her along the "
         "white wall from the far back corner, coming up on her RIGHT, the far-corner side, so he never crosses in front of her, and stops beside her on her right at "
         "frame RIGHT, one step further along the wall. When ChiChi speaks she turns her head to her right, toward him. DB's steel WATCH is on his LEFT wrist; his "
         "phone is in his RIGHT hand. DB'S LEFT HAND stays in his left trouser pocket in every shot of the clip, the fingers never seen."),
        ("FIRST FRAME: a WIDE shot from the room side. ChiChi at frame LEFT, just rising from the foreground bench, her hands empty. DB far away in the back corner "
         "at frame RIGHT, tiny in the frame, half turned away, the phone at his right ear, his left hand in his trouser pocket. DB starts speaking at once."),
        ("THE CLIP, SHOT BY SHOT:\n"
         "1. (0-3.4 s) Wide. ChiChi walks away from the camera from the bench to the big two-panel picture on the white wall at an unhurried pace, her hands "
         "loosely clasped, without looking toward him. DB, in the far corner, paces two slow steps, half turned away. His voice carries low across the quiet gallery.\n"
         "  DB (Dominican), low and hushed, into the phone: \"No, I saw it. Send me the revised one.\"\n"
         "2. (3.4-5.9 s) Waist-up on ChiChi, three-quarter view, at the foot of the big two-panel picture: she stops and looks up at the two figures at work. DB's "
         "voice is heard OFF CAMERA, far across the gallery.\n"
         "  DB (Dominican), low, off camera: \"Hold on. Let me pull it up.\"\n"
         "3. (5.9-10 s) Waist-up on ChiChi. She HEARS it: her clasped hands tighten, she lets out one slow breath through her nose, her eyes stay on the picture, "
         "her jaw sets. Her mouth stays closed; she says nothing. DB's voice is heard off camera, easy and absent.\n"
         "  DB (Dominican), off camera, easy and absent: \"No, it's fine. I'm not doing anything.\"\n"
         "4. (10-13.4 s) HARD CUT to a WIDE shot a moment later: ChiChi stands still at the foot of the big two-panel picture, looking up at it, hearing him come. "
         "DB, now off the call, speaks as he walks back along the white wall at a natural pace; on \"done\" he slips the phone into his right trouser pocket, and he "
         "arrives beside her at frame RIGHT on the last word, warm, a little out of breath, a hopeful smile.\n"
         "  DB (Dominican), warm, a little out of breath: \"Sorry. That's done. Where were we?\"\n"
         "5. (13.4-15 s) Waist-up on ChiChi, three-quarter view, DB's shoulder at the frame-right edge. She turns her head to him, level and calm, her eyes clear, "
         "not raised, not softened.\n"
         "  CHICHI (American), level, calm: \"Not continuing this.\"\n"
         "6. (15-16.7 s) Waist-up on DB, three-quarter view, ChiChi's shoulder at the frame-left edge. His smile drops. His head draws back an inch and he leans "
         "away from her, taken aback. His mouth stays closed; he says NOTHING.\n"
         "  END within half a second of the lean settling: DB leaning back, his eyes on her. ChiChi's \"Not continuing this.\" is the last line of the clip. After "
         "that, silence: nobody speaks, and nothing more is said. DB makes no sound of speech at all: no word of any kind."),
        ("LINE OWNERSHIP, NEVER SWAPPED: the first three lines are DB's, spoken into the phone: \"No, I saw it. Send me the revised one.\" = DB. \"Hold on. Let me "
         "pull it up.\" = DB. \"No, it's fine. I'm not doing anything.\" = DB. Then: \"Sorry. That's done. Where were we?\" = DB. \"Not continuing this.\" = CHICHI. "
         "Only these five lines, in this order, each said once. ChiChi says NOTHING until shot 5: no words, no \"mm\", no sound of any kind. The caller is never "
         "heard. DB says nothing after her line."),
        "PRONUNCIATION: \"revised\" is said rih-VIZED.",
        VOICES_0405 + "\n" + G.CHICHI_SPEECH,
        ("WHAT EVERYONE IS DOING (nobody ever stands frozen like a prop, on or off camera):\n"
         "- CHICHI: rising from the bench, walking to the picture, looking up at it, her hands tightening, one slow breath, her jaw setting; then standing at the "
         "picture, looking up at it, turning her head to him.\n"
         "- DB: on the call in the far back corner, a step or two of slow pacing, half turned away from her; then walking back, finishing the text, pocketing the "
         "phone, smiling, then drawing his head back and leaning away; his left hand rests in his pocket the whole time.\n"
         "- THE VISITOR: far back at the far right end of the orange wall, looking at the framed prints, silent, nowhere near DB."),
        G.CAMERA, G.PHYSICS,
        ("AUDIO: only DB's four lines and ChiChi's one line, soft footsteps on the wood floor and the faint hush of a large quiet gallery. No caller voice, no "
         "music, no background chatter, no other voices, no narration. No subtitles, captions or on-screen text."),
    ])

C0405['prompt'] = "\n\n".join(C0405['parts'])

if __name__ == '__main__':
    json.dump([{k: v for k, v in C0405.items() if k != 'parts'}],
              open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prompts_v3.json'), 'w'), indent=1)
    print('0405', len(C0405['prompt'].split()), 'words', len(C0405['prompt']), 'chars')
