# EXCLUSIVE (with Nia and Chi): standing production prompt

Paste this at the start of every filming session. It is the distilled method from episodes 12,
13 and 14 ("Nice Building"). Every rule below cost credits to learn; none is optional.

---

## 1. The gate: nothing is filmed without a storyboard

Before any video job is submitted for a scene, the scene has:

1. **A script** with every line, in order, with the speaker and accent on each line.
2. **A beat sheet** at one row per 2 to 3 seconds: time, shot, who is on frame-left and
   frame-right, what each hand is doing, what each face is doing, what object is touched and
   with which hand, and the line (if any) spoken in that window.
3. **A staging still** for any blocking that has not been filmed before (first use of a set,
   a new arrangement of extras, a new prop interaction). Stills are generated from the
   character elements (face + body + look) and the set element, cost 0.25 each, and are
   shown to the user to approve the staging. Stills are blocking guides only: they are never
   attached to a video job as a start image (that overrides the element faces and caused the
   G11/G12 failures).
4. **The user's sign-off** on the script and beat sheet, and the credit cost stated in one line,
   followed by the user's go on that exact number. "We just can't skip that step."

If any of the four is missing, the answer is "not yet", not a submission.

## 2. Identity: character elements plus written voices, every time

Characters are defined once as Higgsfield reference elements and carried by placeholder in
every prompt. Never by uploaded stills, never by description alone.

| Character | Face | Body | Episode look | Voice |
|---|---|---|---|---|
| Nia | <<<3497a052-ed61-4fbc-babe-c9f7fc11bf77>>> | <<<9b1d610c-f6e6-421b-a801-89e22827e1bf>>> | per episode | <<<b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c>>> (Nia-Canon-Voice-v2) |
| ChiChi | <<<b03240bd-4562-4d2f-8b14-de32c018e346>>> | <<<46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc>>> | per episode | <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>> (ChiChi-Canon-Voice-v1) |
| Tay | <<<288d8911-4b45-4246-aac4-0ec3a69003c2>>> | <<<fe030a7d-7a8c-4fef-9596-50a213e15201>>> | per episode | the man in reference clip 159822f7 ("Everything okay?") |
| Zarya | look element <<<37733607-b364-4fce-b281-84749863b043>>> carries face, hair, build and clothes | | | WORDS ONLY (block in continuity-bible.md) |

Rules that follow from this:
- **Clothes come only from the look element.** The prompt says "HER CLOTHES COME ONLY FROM
  <<<look>>>" and names the pieces and colours in words as well (green satin dress, brown
  shoes, brown bag). Face and body elements show no clothing and none is ever taken from them.
- **Voices are written as well as referenced.** Every prompt with a Nia line carries the
  NIA IS BRITISH block (warm, low, dry London accent, non-rhotic, clipped t's, never American)
  and gives her a line long enough to carry the accent; a one-word "Hi" cannot. Tay's voice
  is anchored to the reference clip. A character with no voice element (Zarya) gets a
  words-only voice block, carried verbatim.
- **One video reference per job, for voices only.** The approved cafe/GPS clip
  159822f7-168d-411d-ab3c-f79cf945e037 is attached with the role "video" and the prompt says
  THE AUTHORITY FOR VOICES ONLY, naming who is who in it (the petite woman is Nia; the skinny
  tattooed young man who says "Everything okay?" is Tay; the tall heavily built man is Dorian
  and does not appear). Nothing else is taken from it. Seedance 2.5 accepts only one video
  reference; a second gives a 422.
- **Never attach a principal's image as an extras reference.** Extras are described in words
  and staggered naturally; never a line of people facing the lens.

## 3. The clip recipe (the "Rented" format)

- Seedance 2.5, mode omni_reference, 720p, 9:16, audio on, no start image, medias = the one
  reference clip above. Element placeholders for set, faces, bodies, looks and voices in the
  prompt text.
- **20 seconds by default, 30 where a beat needs it.** About one line per 3 seconds: 3 to 8
  lines per clip, movement under every line. One beat per clip, not one beat per character.
- Prompt order, every time: N SECONDS + genre/place; TIMING (no dead air, replies within
  0.3 s, something always moving); REFERENCE VIDEO (voices only, who is who); WHERE WE ARE
  (the previous clip's last line, quoted, "not said again", and this clip's first words);
  HEADCOUNT (exactly N people, never two of anyone); SET (element + the reference image is
  the authority); each CHARACTER (face, body, look, height, no rings); HANDS/PROPS; BLOCKING
  (own-side and frame-side for every person); THE CLIP shot by shot with timestamps, speaker
  and accent per line; LINE OWNERSHIP; VOICES; CAMERA (medium two-shot plus chest-up singles
  over the shoulder, clean cuts, no zooms or push-ins, camera stays on one side of the
  pair); PHYSICS (five-finger hands, two arms each, objects solid, nothing floats); AUDIO.
- **Continuity between clips is written, not assumed.** Name the previous clip's last line
  and forbid repeating it. Name where each person and object was when the last clip ended.
- **Topaz only after the whole episode is approved.** Then one pass, 1080p, by job id.
  Billing seen: 10 s = 5, 15 s = 6, 20 s = 8, 25 s = 9, 30 s = 11 credits. Failed Topaz jobs
  refund; retry them.
- **Preset bounces.** If the tool returns a preset recommendation ("IN THE DARK" 24bae836...
  or "DROWN IN MUSIC" f1821f84...) no job was created; resubmit with that id in
  declined_preset_id.
- **Moderation.** Do not write "wholesome", "fully clothed", "lipstick gone" or similar
  reassurances; classifiers read them as flags. A clip that comes back "nsfw" charges nothing;
  soften the wording and resubmit.

## 4. Granular direction: every action names its hand, its object and its follow-through

This is the rule that removed retakes. Write direction the way a stage manager would.

- **Hands.** Name which hand does what: "her RIGHT hand on the steel pull handle, the bag in
  her LEFT hand". Default hands rest on thighs or at sides; small natural gestures matched to
  the line; one brief head rub allowed, then the hand comes back down. A hand never parks on
  an ear, neck or head for a clip (V3 v1, R5 v1 failures).
- **Doors.** If a character reaches for a door with the right hand, it is the right-hand door
  of a pair and the right-hand handle. Describe the door itself (full-height clear glass, slim
  black frame, long vertical brushed-steel pull, warm light behind it) and the same words
  describe it in every clip that shows it, including the exit. The door Tay came through is
  the door Nia leaves through.
- **Objects persist.** A prop introduced in one clip is the same prop in the next: the beige
  phone case, the brown bag on the stone ledge, the two glasses on the bar of which only
  Zarya's leaves it. Name colour, material, size and where it is at the start and end of
  every clip. Record it in continuity-bible.md the first time it appears.
- **Roles behave like their real jobs.** A bartender pours a named drink into a named glass
  and sets it down in front of a named person; a driver drives and is never seen past the
  headrest; a host walks the guest up the carpet to the doors. Say what the drink is.
- **Touch is specified.** Tay holds Nia's hand, fingers interlaced, or his hand on her arm or
  waist; never his arm threaded through hers. A kiss names who kisses whom ("ZARYA, who is
  NOT Nia"), its length (about one second, then she backs away) and its trace (a faint dry
  smudge wiped in one pass; never wet, running or blood-like). In any two-woman shot each is
  named against the other at every mention.
- **Faces move.** A character watching something has a reaction written for every shot
  (brows, jaw, a swallow, a head shake, an exhale). "He stands there" is a statue; it was
  rejected.
- **Sides are locked per scene** in a blocking table (own-side and frame-side) and reused
  verbatim: Tay on Nia's LEFT on the floor, walk and roof (Nia frame LEFT, Tay frame RIGHT);
  Tay on Nia's RIGHT in the vault; Zarya on Nia's RIGHT at the bar; Nia on the passenger side
  at frame RIGHT in the car.
- **Phone screens are typed out.** Every bubble, in order, with case ("Tay's bubbles are
  lowercase"), colour (grey incoming left, blue outgoing right), and "no other text, no emoji,
  correctly spelled". Keep it to about nine bubbles across two inserts in 20 seconds.
- **Height and proportion** are stated in every prompt (Nia petite about 5'2", Tay a full
  head taller, Zarya half a head taller than Nia) and in the physics line.

## 5. Working rules with the user

- State the credit cost and wait for the go before ANY submission, including retakes and
  Topaz.
- Show the script and beat sheet before filming; show a staging still where staging is new.
- One clip at a time for new staging; batch only clips whose staging is already approved.
- Keep segment-plan (status log), continuity-bible (rules and props), final-cut (order and
  masters) updated and pushed after every submission and every verdict.
- Report every result plainly: rendered, rejected, blocked, refunded. Never upscale, never
  resubmit, never delete a voice or element without the user's say-so.

## 6. Per-clip prompt skeleton

```
N SECONDS. Photoreal cinematic drama, vertical 9:16, [time], [place]. [One line of what this clip is.]

TIMING, READ THIS FIRST. NO DEAD AIR. [What carries the clip.] Replies land within 0.3 s. Something is always moving. The clip ends on [last beat].

REFERENCE VIDEO: the attached video is an approved clip from an earlier episode and it is THE AUTHORITY FOR VOICES ONLY. [Who is who.] Nothing else is taken from it.

WHERE WE ARE: [previous clip's last line, quoted]. Those words are NOT said again. This clip starts [first beat]; its first words are [quote].

*** HEADCOUNT: EXACTLY N PEOPLE: [names]. NEVER TWO OF ANYONE. *** [Extras, staggered, never within X feet, never speaking.]

SET: [set element], exactly as the reference shows: [the room in words]. [Named objects with colour, material, position.] No text, logos or signage.

[CHARACTER]: face EXACTLY <<<face>>>, body <<<body>>>: [age, race, skin, hair, eyes]. CLOTHES COME ONLY FROM <<<look>>>: [pieces and colours]. [Height.] NO RINGS.
[repeat per character]

HANDS/PROPS: [which hand holds what at the start; what changes; where everything is at the end].

BLOCKING: [own-side and frame-side for each person; who moves where; what is touched with which hand].

THE CLIP, SHOT BY SHOT:
FIRST FRAME: [exact composition].
1. (0-3 s) [shot]. [Action with hands and face.] [SPEAKER (accent)]: "[line]"
2. ...
END on [last image], held.

LINE OWNERSHIP: [who says what; who is silent].

VOICES. *** NIA IS BRITISH. *** [block]. [Other voices.]

CAMERA: steady, eye level, [shots], clean cuts, NO ZOOMS, NO PUSH-INS, faces never tighter than chest-up, camera stays on the same side.
PHYSICS: five-finger hands, exactly two arms per person, [objects solid], nothing floats, [heights].
AUDIO: [the lines], [room tone], no music unless named, no narration, no subtitles or on-screen text except [phone thread].
```
