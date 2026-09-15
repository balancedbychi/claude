# EXCLUSIVE — the series · production rules

This repo builds an AI-generated dramatic series. Read this file before writing a
prompt, generating anything, or spending a credit.

Every rule below was paid for. Most exist because something drifted, broke, or
had to be re-rendered.

---

# 🔒 THE LOCK CARD — READ THIS BEFORE EVERY SINGLE GENERATION

**Three episodes have now lost credits to voice and quality faults. Every one of them
was a value in this card being wrong. Check the card, not your memory.**

## The two voices — this is the whole answer

| Character | Voice element | UUID |
|---|---|---|
| **NIA** | `Nia-voice-v2-clear` | `12315c68-37de-41fe-8766-76ac07bcaf70` |
| **CHICHI** | `ChiChi-Canon-Voice-v1` | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |

**BOTH tags go in EVERY prompt where that woman speaks. Both. Every time.**
There are exactly two voice elements in the account and these are them. Nothing else
is a voice for these characters. `180fdb9a` is DELETED — if you see it anywhere but a
historical record, it is stale.

**Do not re-engineer which one "binds".** It was tested and it failed — 36 credits,
job `a91ed33b`. Attaching ChiChi's alone made her WORSE (183.9 Hz against her correct
160 Hz). Both attached, always. That configuration produced four approved clips.

## The parameters that are not optional

```
bitrate_mode : "high"        ← PASS IT EXPLICITLY, EVERY TIME
quality      : DO NOT PASS   ← passing it silently drops bitrate_mode to "standard"
resolution   : "1080p"
aspect_ratio : "16:9"
model        : "seedance_2_5"
```

**`bitrate_mode` dropping to `standard` is what broke Episode 3 Clip 5.** Video quality
fell 7.3x, and because ChiChi's voice is built BY the render, a degraded render gave a
degraded voice — for both women. Nothing visible flagged it: `resolution` still read
`1080p` and the cost was identical.

## MANDATORY PRE-SUBMISSION CHECK — run it, do not skip it

Before every `generate_video`, check all six and say the result out loud:

1. `bitrate_mode: "high"` is in the params — **explicitly**
2. no `quality` field is in the params
3. Nia's `12315c68` tag is in the prompt (if she speaks)
4. ChiChi's `de50f37f` tag is in the prompt (if she speaks)
5. `180fdb9a` appears NOWHERE in the prompt
6. ChiChi's block order is character → skin → age → hair → VOICE → wardrobe → ring

**Then diff against the last approved clip.** Pull its `params` with `job_display` and
compare field by field. **A parameter you do not send is one the server picks for
you, and it does not pick the same thing twice.**

A `.claude/hooks/` guard enforces items 1–5 mechanically. If it blocks a submission,
it is right and the params are wrong — fix them, never bypass it.

## When a render comes back wrong

**Check the parameters BEFORE theorising about the model.** Episode 3 lost hours to an
elaborate voice-binding theory when the actual cause was one wrong parameter. Pull the
job payload, diff it against the last approved clip, and look at `bitrate_mode` first.

---

## 1. THE SHOW

A drama with satire in it — not a comedy. It sits on the relationship problems
people actually have and are too embarrassed to say out loud: being cheated on,
being two-timed, dating apps, waiting on a text, reading a partner's social media
for evidence, staying after you know better.

Two women, ten years apart, on the phone or across a table.

**NIA — 30.** Fresh, quick, charming, and reliably wrong about men. She narrates
her own bad decisions with enough wit that she almost gets away with it. She asks
for advice she has no intention of taking. She is not stupid — she is in it.

**CHI — 40.** The source of truth. Comforting but direct. She says the accurate
thing in the fewest words and does not soften it into uselessness. Dry, unhurried,
never cruel, never shrill. She has her own ache: she wants a child and does not
have a partner, and that is the thing she is least direct about.

### The engine

Chi tells Nia the truth. Nia hears it. Nia does it anyway. That is the series.

### Tone guardrails — these are not optional

- **Laugh with them, never at them.** The comedy is recognition, not humiliation.
  If a joke requires the audience to feel superior to Nia, cut it.
- **Never moralise.** Nia makes the mistake and the show does not punish her for
  it. No lesson lands at the end of the scene. The audience supplies the wince.
- **Chi is right, but not correct about everything.** She reads other people's
  lives clearly and her own poorly. If she were simply wise the show becomes a
  lecture and Nia becomes a fool. Give her a blind spot in every arc.
- **The embarrassing thing is said plainly.** No euphemism. The value of the show
  is that someone finally says "he only makes plans with me every two weeks" out
  loud. Do not write around it.
- **No villains.** The men are not monsters; they are ordinary and unavailable,
  which is worse and more true.
- **Specific beats universal.** "Eleven days" is the title of an episode. "He's
  emotionally unavailable" is not a line, it's a diagnosis. Write the detail.

### Dialogue rules

- Chi gets fewer words than Nia, always. Her power is economy. A single "Nia." or
  "Mm." should be able to end an exchange.
- Nia talks fast when she is losing. Length is her tell.
- They interrupt each other. They have known each other for years.
- No exposition between them. They already know the backstory; the audience
  catches up.
- End scenes one beat earlier than feels comfortable.

---

## 2. HOW A SCENE GETS BUILT

**The order is fixed. Do not skip a step to save time; every skipped step has
cost a full re-render.**

1. **Ask for visual references first.** For any new character, set, or wardrobe,
   ask the user for reference images before writing a prompt. Never invent set
   design mid-build.
   **Collect them with `media_upload_widget` and nothing else.** An image dropped
   into the Claude chat CANNOT become a Higgsfield element — it is not reachable,
   it cannot be turned into a reference, and asking for one wastes the user's
   time. Episode 2 lost hours to exactly this: references were supplied in chat,
   none of it was usable, and the whole exchange had to be repeated. The widget is
   the only upload surface that works. Never inspect `/mnt/user-data/uploads`,
   never run shell to hunt for files, and never ask for a chat attachment.
   **Ask whether the user is ready first, then open the widget ONE REFERENCE AT A
   TIME** — `max_files: 1`, labelled with the exact asset it is for, and asked for
   by name ("drop the image of ChiChi's outfit"), waiting for each before asking
   for the next. A batch comes back as a list of media IDs with **nothing tying
   each ID to the thing it depicts**, so the assignment becomes a guess. Guessing
   wrong builds a wardrobe element from the wrong image, and **element
   descriptions are write-once** — the only "fix" is a second element, which is
   the competing-element failure that produced the duplicate Dorian. The user
   asked for this explicitly in Episode 3. See the `new-episode` skill.
2. **Generate a plate.** Turn the reference into a single still at the correct
   time of day. ~2 credits.
3. **Get the plate approved.** The user looks at it and says yes or corrects it.
   Iterate here, where it is cheap.
4. **Lock the plate as a reference element.** With a full description written into
   the element itself.
5. **Then shoot.** The video prompt says "this set is `<element>`, reproduce it
   exactly" and describes no furniture at all.

**A 2-credit image you fix beats a 30-credit clip you redo.** This is the single
highest-leverage rule in this file.

### Element rules

- **Lock sets from approved stills, never from prose.** Every recurring drift in
  Episode 1 — sofa length, coffee table legs, lamp shade, sky colour — traced back
  to a room described in words instead of pinned to an image.
- **Use the reference for what it shows; do not build geography around it.** A
  hallway reference arrived with the note "10 is the hallway". What got built was a
  lift lobby AND a hallway with a walk between them — a second space, a journey and
  a transition, none of it asked for. It read as nonsense on screen, it was written
  into the episode file as canon, and it survived three takes before the user
  said so. Inventing the space *between* two references is still inventing set
  design. If the action needs somewhere the references do not show, ask.
- **Never introduce a new element mid-episode.** An element created *before* any
  footage defines the set. An element created *after* footage exists, from a fresh
  description, is not a lock — it is a second, competing set. This replaced a
  working couch mid-episode and destabilised both wardrobes.
- **Write the whole spec into the element description**, including the rules
  (one wine glass, no floor lamp, sits screen right). Rules stored in the element
  travel with it; rules stored in your head do not.
- **Mark superseded elements explicitly** so a later session cannot pick up a
  stale one. Old elements are never deleted, only retired in the registry.
- **An element description is WRITE-ONCE, so put only DURABLE facts in it and leave
  anything a take might revise to the prompt.** Episode 3 has three clauses inside
  live elements that the footage overruled and that cannot be edited out: the cup
  level (written as a falling clock, rendered as a fixed level), the cup branding
  (written as never legible, renders legibly — and the element is itself the source
  of the word), and the jewellery rules (written as absolute, relaxed by the user).
  None of them can be corrected in place; each has to be **overridden in every
  prompt and recorded as superseded in the episode file.** The lesson going forward
  is about what belongs in a description at all: identity, materials, quantities and
  the rules that never move. **A level, a look or a styling choice is a take
  decision, and putting it in a write-once description guarantees a contradiction
  the first time the user changes their mind.**
- **The saved element descriptions still say "The Standard Society". Leave them.**
  The series was renamed to EXCLUSIVE after Episode 1 was shot. Every locked
  element — both rooms, both characters, both voices — carries the old name in
  its description text, and that text is part of what produced the approved
  footage. Renaming it is rewording an approved result, which section 5 forbids.
  The name on screen comes from the title card and the thumbnail, not the element.

### Stills of the characters — USE SEEDANCE, NOT AN IMAGE MODEL

**`seedance_2_5` is the only thing that reliably holds these two faces.** Need a
still of Nia or Chi — thumbnail, avatar, banner, poster, anything — generate a
short seedance clip with the usual `<<<element-id>>>` tags and pull a frame.
Cheaper still: pull the frame from footage you already have.

**Do not reach for `nano_banana_pro` or another image model for these characters.**
It was tried twice and both rounds came back as strangers. Passing the element's
plate as `medias: [{value, role: "image_references"}]` does NOT fix it — that was
tried too. The elements are correct and seedance proves it; the image model
simply does not preserve the identity. 32 credits went on discovering this.

The characters are settled. `Nia` `bcd528d3-9756-4190-ba80-4aaae881f2b2` and
`ChiChi-the-Influencer` `8a8e8eeb-d41e-4d91-b245-fa0caa8801b6` are correct — the
user has confirmed it. There are seven other Chi/Nia plates in the workspace;
ignore them, do not audit them, do not propose switching.

### Channel art — the sizes that actually matter

YouTube art is judged at three sizes at once and the file size is not the design
size. Build to the smallest, bleed to the largest.

| Asset | File | What you must design inside |
|---|---|---|
| Banner | 2560x1440 | **1546x423 centred** — all every phone shows |
| Avatar | 800x800 square | a **circle**, legible down to 48px |
| Thumbnail | 1280x720 | legible at ~246x138 in a feed |

**The banner trap, learned the expensive way.** Sizing the art to exactly 1546
wide and centring it keeps everything phone-safe and leaves dead flanks either
side on desktop, which shows the full 2560. Sizing the art to the full 2560
fills desktop and throws the characters out of the phone crop. Neither is right.

What works, at no generation cost: generate the art on a FLAT backdrop, then pad
that backdrop horizontally before scaling to 2560. Flat colour pads invisibly, so
the image reaches both edges while the subjects move inward. Pick the pad factor
from the art itself — locate each face by column detail energy over the upper
~55% of the frame, then solve for the smallest pad that puts both faces inside
1546x423.

**Aim for faces inside the safe box, not whole bodies.** Requiring every pixel of
hair and elbow to survive the phone crop pushes everyone back to the middle and
recreates the dead-flank problem. Let bodies bleed off; protect faces and title.

**Never generate the title into the art.** Leave the middle third empty and set
type over it afterwards. Generated lettering garbles, and composited type is free
to resize and recolour — a title change then never costs a re-render.

---

## 3. THE CONTINUITY LEDGER

Every recurring character needs all nine of these locked, in the element
description and repeated in every prompt. Anything not pinned explicitly will be
re-rolled on the next take.

| | What to lock |
|---|---|
| **Face** | Identity, apparent age, complexion, facial geometry, dental identity, head-to-body scale, natural body proportions |
| **Hair** | Colour, length, cut, texture, **part and which way it sweeps**, how the ends behave — plus the wrong cuts named and negated |
| **Wardrobe** | Garment type, fabric, neckline, sleeve, crop point, colour, fit, footwear — per episode |
| **Hands** | Rings, bracelets, nails, skin texture and apparent age of the hands, five-finger anatomy |
| **Jewellery** | Earrings, necklace or explicitly none, where it sits relative to clothing |
| **Posture** | Exact seated or standing position, which end of the furniture, where the limbs go |
| **Props** | What she holds, in which hand, its colour, where it rests when not held |
| **Gesture** | Her movement vocabulary — see below |
| **Voice** | The voice element ID, in every prompt, every time |

### Gesture and movement — characterisation, not just continuity

A character's body is written, the same as her dialogue. Keep these consistent
and they do more work than any line.

- **Chi is still.** She holds a position. Her reactions are small and precise —
  one eyebrow, a slow blink, setting a glass down, not looking away. Stillness is
  her authority. When Chi finally moves, it means something.
- **Nia is kinetic.** She paces, sits down hard, fixes an earring, pushes her hair
  back, gestures with the hand not holding the phone. Her body is always trying to
  win the argument her words are losing.
- **Stillness is not rigidity.** "ChiChi is still — she does not pace, fidget,
  step back or gesture" shipped in a prompt and produced a woman who did not
  turn to face a man walking up to greet her, which reads as a mannequin, not as
  authority. Her stillness means she does not fidget, pace or gesture to win an
  argument; it never means she skips ordinary social behaviour. **Write the
  natural movement in explicitly** — turning and angling the body toward whoever
  is approaching or speaking — then have her SETTLE and hold. Section 3's "when
  Chi finally moves, it means something" covers exactly this: one deliberate
  turn, not restlessness. The same applies to Nia, who turns a little more
  eagerly because she is pleased to see him.
- **Reacting is not commenting — and "no reaction" is the same trap as "no
  movement".** Episode 2 Clip 4 was first written to prompt hard against ChiChi
  reacting at all, which would have given five seconds of a blank face at the
  most important moment in the episode. That is the mannequin failure again, one
  level up. **A reaction in her own register is required; a comment is
  forbidden.** Reactions: a stopped movement, a slow blink, a glass set down, a
  held look. Comments: a smirk, an eye-roll, a knowing glance at camera — these
  tell the audience what to think and kill the moment. **The strongest reaction
  available for a still character is an INTERRUPTED MOVEMENT** — ChiChi's drink
  stopping halfway to her mouth reads louder than any expression, precisely
  because she is normally still.
- **EYELINE IS ITS OWN LOCK, AND "both faces visible" will destroy it if you let
  it.** Episode 2 Clip 5 shipped with the two of them talking without ever
  looking at each other — Chi delivered the whole scene facing out at the city.
  The cause was a prompt line, not the model: the attribution-safety framing
  block says *"neither woman is turned away from us"*, which points both faces at
  the LENS, and the prompt described Chi's body angle while never once stating
  where her eyes go. **Both goals are satisfiable at the same time and the answer
  is ordinary film coverage** — stage them in THREE-QUARTER, turned INWARD toward
  each other, both faces still readable by the camera. Never stage two people in
  conversation parallel to the lens.
  - **Write the eyeline beat by beat, the same as the dialogue.** Who is looking
    at whom on each line, and when that changes. Unstated eyelines default to
    front and the scene dies.
  - **Not-looking is a real choice and it must be EARNED.** The user's note:
    there are times a character intentionally does not look, and that is right —
    but it only reads as meaning when the rest of the scene had eye contact. Nia
    refusing to answer while staring at the city lands *because* they were face
    to face a second earlier. A scene where nobody ever looks up has no such
    beat available.
- **Stillness has now been over-applied THREE times, and always the same way:
  the negation got obeyed and the human behaviour underneath it was never
  written in.** Clip 2 gave a woman who would not turn to greet a man. Clip 4
  was nearly a blank face at the episode's biggest moment. Clip 5 gave a
  conversation with no eye contact. **Chi is UNDERSTATED, not inert.** She looks
  people in the eye, she holds a gaze, she can be amused — a small breath of a
  laugh, a warmth around the eyes — and she uses her hands when she means
  something. What she does not do is fidget, pace, or gesture to win an
  argument. Whenever a prompt says what she does NOT do, it must in the same
  breath say what she DOES.
- **Assign each character two or three signature gestures and reuse them.**
  Repetition across episodes is what makes a generated character read as a person.
- **Hands must have a job.** Specify what each hand is doing in every beat. Idle
  unspecified hands are where anatomy errors appear.

### ChiChi's three permanent physical facts

These are series-wide, not per-episode, and belong in every prompt she appears in.

- **Her hair sweeps to HER OWN RIGHT — her body is the reference, not the frame.**
  Deep side part on the LEFT side of her head, volume carrying across and falling
  down HER RIGHT side. **When she faces the camera her hair therefore falls toward
  SCREEN LEFT**, because a person's right is the viewer's left. That mirror is
  exactly what went wrong: takes came back with the sweep on screen-right, which
  is her left, which is backwards. Name it both ways in the prompt — "to her own
  right, which reads as screen left when she faces us" — so the model cannot
  resolve it the wrong way. Never a centre part, never swept to her left, never
  symmetrical, never pulled back or tied up. The ledger asked for "part" and that
  was never enough: **which way it sweeps, and relative to what**, has to be
  stated or it re-rolls every take.
- **She wears NO RING. Ever.** Not on any finger of either hand, and specifically
  nothing on the fourth finger of her left hand. This is not only continuity: she
  wants a child and has no partner, and that is the ache the whole character sits
  on. A wedding ring on ChiChi contradicts the show.
  **This one is a CHARACTER FACT and it does not relax.** Distinguish it from the
  rest of her jewellery, which is style and does relax — see below.
- **Her skin is CLEAR, and she does not get aged.** The user's note: *"She may be
  40 but she has beautiful skin."* Even, smooth, luminous, firm, in focus, with
  natural pore texture. **The model reaches for age markers for exactly the same
  reason it reaches for a wedding band — because the prompt tells it she is
  forty**, and it has to, since her age sits inside the pinned voice block that
  section 5a forbids rewording. So every prompt states her age and must negate
  what that invites, by name: no wrinkles, no fine lines, no crow's feet, no
  forehead lines, no nasolabial creases, no sagging, no crepey or papery texture,
  no age spots, no dullness, no sallowness, no under-eye shadows or bags, no
  hollowing. Naming the object is what beat the ring in Episode 2 Clip 4; naming
  every age marker is that same move applied to her face. **Her age reads in her
  composure, never in her skin.** Keep this alongside the approved skin block,
  which separately writes against BOTH meanings of "unclear" — blotchy and uneven
  AND soft and out of focus — because an agent who cannot see the render does not
  know which one it got.

### Jewellery is STYLE, except the ring — the user's ruling, Episode 3

**"Their style can change from day to day."** The user's words, ruling on a frame
where Nia wore a ring and ChiChi wore a necklace against prompts that forbade both.
So the standing jewellery lines are **per-episode style, not permanent facts**:

- **Nia's hands are not permanently ring-free.** She may wear rings, and does in
  Episode 3.
- **ChiChi's "NO necklace, small gold studs only" is not permanent.** She wears a
  necklace in Episode 3.
- **ChiChi's gold watch** stays her established wrist piece.

**The one thing that does NOT move is ChiChi's ring**, because it is not style — it
is the ache the character sits on. **Never read a style ruling as relaxing it.** If
the user approves a ring on ChiChi, that is a change to the character and it should
be confirmed as one, not inferred from a note about jewellery.

**And style changing BETWEEN episodes changes nothing WITHIN one.** The appearance
rule below still binds: inside one continuous conversation nothing changes at all,
so whatever jewellery lands in the first shot clip is identical in every later clip
of that episode. A ring that appears, vanishes or moves fingers mid-scene is the
same failure as hair switching sides.

### The appearance rule — treat it like a real actor on a real shoot

**A character's appearance does not change between clips unless the change is
shown, or the evidence of it is visible.** Hair, wardrobe, makeup, jewellery,
footwear, nails — anything an audience can see. Write every clip as if the same
actor walked from one set-up to the next without visiting a trailer.

ChiChi's hair swept one way and then switched sides between takes, which reads as
a different person rather than a different shot. That is the failure this rule
exists to stop.

- **Inside continuous action, nothing changes at all.** Two clips minutes apart
  in the same evening share an identical hair sweep, identical wardrobe, identical
  everything. There is no ellipsis to hide a change in.
- **Across a real gap in time, a change is allowed — if a person would plausibly
  make it.** Heels come off at a long party. A jacket comes off. A collar loosens.
  These are fine because they are motivated by the evening itself.
- **When the change happens off-screen, the EVIDENCE of it must be on-screen.**
  Nia does not simply appear barefoot; she carries her heels in her hand. The prop
  is the explanation, and it does the work a shown transition would have done.
- **Changes are ONE-DIRECTIONAL and never revert.** Once the heels are off they
  stay off. Once the jacket is off it stays off. A detail that oscillates between
  clips is the clearest possible signal that the footage was generated rather than
  filmed.
- **Anything not motivated by the evening simply cannot change.** Hair does not
  restyle itself, makeup does not redo itself, a garment does not become a
  different garment. If a clip needs one of those, the change plays on camera or
  it does not happen.

### The movement rule

**If a character changes position, the change plays ON CAMERA as one continuous
visible action.** A different pose revealed by a cut is a continuity break, and it
is the most common one. Cross-legged in one shot and one-leg-down in the next
reads as two different scenes.

State the locked posture, then either hold it for the whole clip or show the
transition in full. Never let a cut do the work.

---

## 4. THE SHOT SPEC

Every video prompt carries these blocks, in this order. Keep the wording
byte-identical between shots — only the scene beats change.

1. **Timing** — first, because it is the most ignored instruction
2. **Camera** — lens, height, movement, number of cuts
3. **Time of day** — stated as identical across all locations in the scene
4. **Sets** — by element ID, "reproduce exactly, change nothing"
5. **Characters** — element ID + voice element ID + the continuity ledger
6. **Blocking** — position, posture, what each hand holds
7. **Scene** — the beats and the exact dialogue
8. **Audio** — which voice speaks which line, ambience, and the negations

### Non-negotiables inside that spec

- **Every voice element appears in every prompt.** If a character's voice element
  is missing, the model invents a voice for her. This shipped unnoticed for three
  shots in Episode 1.
- **Chi's voice is PINNED. See section 5a. Do not reword her voice line, ever.**
- **A line goes to the face the camera is ON.** Sharper than the rule above, and it
  outranks anything the text says. In a single continuous framing the model hands
  every line to the face it is holding, whoever the prompt names. Clip 1 of Episode
  2 lost the same line to the wrong woman in four takes across three prompt
  strategies, and scene detection then showed the clip had **no cut in it at all** —
  the camera never went to the other woman, so the line never could either. If two
  people alternate lines, the shot must cut to each speaker. Verify the cuts landed
  (`select='gt(scene,0.12)'` plus a frame-difference pass); asking for a cut does
  not mean you got one.
- **Every speaking character must be visible in the clip.** The model only binds a
  saved voice to a face it can see. An off-camera speaker gets a fabricated voice,
  no matter what the prompt says.
- **Tag every line with its speaker AND close the other mouth.** A speaker list at
  the top of the dialogue is not enough — the model will hand a line to the wrong
  woman, and a backlit or partly turned face makes it likelier. Write each line as
  its own instruction naming who speaks, and state that the other woman's mouth
  stays completely closed and still through it. Then name the specific wrong
  answer, as section 5 requires: "NEVER give ChiChi the line *You said midnight* —
  it is Nia's." Adjacent lines that share a word are where this breaks.
- **Time of day is stated as a shared fact**: "both women look out on the same sky
  at the same moment; do not change the light between cuts." Left unstated, each
  location invents its own hour.
- **Cut continuity**: a shot opens on whoever did not close the previous one.

---

## 4a. THE SEAM BETWEEN CLIPS — CLIPS ARE CUT TOGETHER, SO WRITE THE JOINS

Every other rule in this file governs consistency INSIDE a clip. None of them
governs what happens at the cut, and that is a real hole: each clip gets built as
a self-contained unit and the joins are left to chance. The result reads as a
series of disconnected fragments rather than one night. In Episode 2 the user put
it plainly — ChiChi is pulled through a door at the end of Clip 1 and is standing
in the middle of the floor at the start of Clip 2, with no arrival in between.

**The last frame of clip N is the opening condition of clip N+1.** Before writing
any prompt, write down two things:

1. **EXIT STATE** — where every character physically is when the previous clip
   ends, which way they face, what is in each hand, and what just happened to
   them.
2. **ENTRY STATE** — what this clip inherits from that, stated in the prompt as
   fact, not left to the model.

### The rules that follow from it

- **Show the arrival, do not find them arranged.** If a character moved between
  clips, let them ENTER THE FRAME rather than open already positioned. Opening on
  people pre-arranged in a new spot is the single thing that makes cuts feel
  abrupt.
- **Inherit position, not just place.** "Int. loft" is not an entry state. "Just
  inside the front door, Nia's hand still on ChiChi's wrist from the pull" is.
- **A door seen from both sides is TWO set descriptions of ONE object, and they
  must match.** Episode 2's apartment door is solid, in a solid wall, in the
  hallway plate. Clip 2 then opened "just inside the front door" and the model
  invented a GLASS door in that wall — so the same doorway ChiChi knocked on in
  Clip 1 is a different object seconds later. Anything that appears in two clips
  from two angles (a door, a window, a staircase, a counter) needs its material,
  colour and surround stated in BOTH prompts, not just the one where it is the
  subject. The locked plate only covers the side it was shot from.
- **FEED THE LAST FRAME IN AS THE FIRST FRAME. Prose cannot carry a seam.** This is
  the rule Episode 3 Clip 3 was spent proving. That prompt said "each on a clear
  acrylic chair", "the same gold ring on the same hand and the same finger" and
  "identical in the last frame to the first" — and got a woman on a BENCH, rings
  that changed mid-shot and cups refilled to the top. **Every one of those
  sentences describes a picture the model has never seen.** It has no access to the
  previous clip; it fills the gap from its own priors, and it will keep doing that
  however hard the wording gets. Three passes of escalating language produced that
  take.
  `seedance_2_5` accepts a **`start_image`** media role. Pull the final frame of
  clip N with `ffmpeg -sseof -0.15 -i clipN.mp4 -frames:v 1`, put it through
  `media_upload` -> PUT -> `media_confirm`, and pass it as
  `medias: [{value, role: "start_image"}]` with `mode: "omni_reference"`. Seating,
  cup level, jewellery, wardrobe fit, hair and posture stop being paragraphs and
  become pixels.

  **`mode: "omni_reference"` IS MANDATORY WITH A START IMAGE — the backend enforces
  it.** Dropping it returns a 422: *"mode 't2v' does not accept reference media;
  start_image and end_image are only allowed for mode 'omni_reference'."* Nothing is
  charged, but do not try it. An agent briefly concluded the opposite from the stored
  job payloads — approved Clips 3 and 4 echo `medias: [{role: "start_image"}]` with no
  `mode` key, while Clips 5 and 6 echo `reference_images[]` with `mode` set — and
  wrote a rule and a hook check against passing it. **That reading was wrong**: the
  API refuses the shape it called "approved", so the echo difference is a storage or
  display change, not something a caller controls. **`bitrate_mode` remains the ONE
  confirmed parameter difference between the approved clips and the rejected ones.**
  The lesson: a difference visible in two stored payloads is a hypothesis, not a
  cause — the cheapest test is to submit and read the validation error, which costs
  nothing. **This is section 2's oldest rule — lock from an approved still,
  never from prose — applied to the SEAM instead of the set**, and it was the one
  place nobody had applied it.
- **Better still, do not create the seam. One generation holds continuity for
  free.** `seedance_2_5` runs to **30 seconds** and bills linearly per second, so
  two 14s clips and one 28s clip cost exactly the same. Every seam is an
  independent re-roll of seating, wardrobe, props and jewellery; a seam that does
  not exist cannot fail. **Before splitting a scene into clips, ask what the split
  is buying** — if the answer is only "that is how the episode was planned", merge
  them. The user's note in Episode 3: *"creating these separate clips is costing
  more work."*
- **Read the entry state off the ACTUAL LAST FRAME, never off a memory of it.**
  Episode 3 Clip 3 locked the cups at "a little under half full" because that
  matched an earlier note about how Clip 2 looked. Clip 2 in fact ENDS with them
  nearly empty. A sentence about a clip is not the clip; extract the frame and
  look at what is in it, or pass it in as the start_image and stop describing it.
- **Props are the cheapest continuity there is, and the most convincing.** A plate
  of food carried out of the kitchen scene into the next one does more to make an
  episode read as one evening than any line of dialogue. Track every prop across
  the seam: the clutch, the glass, the plate, the phone.
- **Decide state changes BEFORE the clip that needs them.** Nia is barefoot with
  her heels in her hand in Episode 2 Clip 6. That has to already be true in Clip 5,
  or the change has to play on camera somewhere. Working it out at Clip 6 is too
  late — Clip 5 will already be shot.
- **Section 4's cut-continuity rule extends across clips**: a clip opens on
  whoever did NOT close the previous one. Clip 2 ends on Nia's face, so Clip 3
  opens on Kel, not ChiChi.
- **Elapsed time is either legible or absent.** If time passed, something must show
  it — a drink further down, a room thinned out. If no time passed, the join has to
  be continuous. An unsignalled jump reads as an error rather than an ellipsis.
- **Screen direction carries.** Exit frame right, enter the next shot from frame
  left. Reversing it makes two adjacent shots read as two different nights.

**Write the seam map for the whole episode before shooting any of it**, and keep
it in the episode file next to the script. It costs nothing and it is the
difference between seven clips and an episode.

---

## 4b. A PLACE DOES NOT CHANGE BETWEEN VISITS — HOW WE START IS HOW WE END

**The user's note at the end of Episode 2, and it is the most important note in
this file.** ChiChi comes out of the lift, there is a BRICK wall, she turns to
SCREEN RIGHT toward the door marked 10B, and Nia opens it. That is the
established geography of the whole episode. When Nia sends her off at the end, we
should be standing in **that same place, looking at it the same way**. And when
Dorian crossed the room in Clip 2, the wall that is solid in the hallway plate
came back as GLASS.

**The element plate proves what a room LOOKS like. The first take proves what the
room IS.** A plate is one angle of one corner. Everything an audience learns about
a space — which side the door is on, what the wall is made of, what is behind the
camera, which way you turn to get anywhere — is established by the first clip shot
there, and every later clip owes that establishment.

### Write a LOCATION FACT SHEET the first time a space is shot

Keep it in the episode file and paste it into every prompt that returns there. It
costs nothing and it lists only what an audience can see.

| | |
|---|---|
| **Surfaces** | what every wall, floor and ceiling is MADE OF — brick, plaster, glass, timber — named by material |
| **Fixed objects** | the door, window, lift, counter: where each sits and what it is made of |
| **Relative position** | what is LEFT of what, what is RIGHT of what, what is opposite, what is behind camera |
| **Screen direction** | which way a character turns to reach each thing, stated as screen left/right AND as her own left/right |
| **The set-up** | the lens, height and angle the space was first shot from |

### The rules

- **A surface has a material and the material never changes.** Brick stays brick.
  A solid wall stays solid. Glass exists only where glass was established. **"Wall"
  is not a specification** — Episode 2 asked for a wall and got a glass one,
  because an unnamed surface gets filled with whatever the composition wants.
- **Returning to a location means returning to the SAME SET-UP**, not the same
  room from a fresh angle. Same lens, same height, same side of the space. A place
  the audience has seen once is recognised by its FRAMING as much as its contents,
  so a new angle on a known room reads as a new room.
- **HOW WE START IS HOW WE END.** When a character arrives somewhere at the start
  and leaves from it at the end, those two shots are a MATCHED PAIR. Build them as
  one decision and write them at the same time, before either is shot — not as two
  separate clips that happen to share a set.
- **A left/right fact is meaningless without the thing it is relative to.** This
  cost a take on ChiChi's hair (her right, not the frame's) and nearly cost one on
  the door: the Episode 2 slugline said "Int. entry", and shot from inside the
  apartment every part of that door mirrors — hinges pinned LEFT become RIGHT, the
  handle swaps with them, and the doorway she knocked on becomes a different
  object. **State every left/right TWICE — relative to the frame AND relative to
  the body or the room — then state which side the camera is on.**
- **Check the slugline against the geography before writing a word.** "Int. entry"
  and "Int. hallway" are the same doorway from opposite sides and produce mirrored
  prompts. **The scene heading is not authority; the location fact sheet is.**
- **Do not invent the space between two references.** Section 2 says it and it
  belongs here too. A lift and a door in one corridor is ONE place. A lobby, a
  transition and a second hallway built between them is set design nobody asked
  for, and it survived three takes before the user caught it.

---

## 5a. CHI'S VOICE — PINNED, DO NOT CHANGE

> ### ⚠️ READ THIS FIRST — THE EPISODE 3 VOICE FAILURE WAS A SILENT PARAMETER CHANGE
>
> **`bitrate_mode` went from `high` to `standard` between Clip 4 and Clip 5, and that
> is the ONLY input that changed.** Every clip the user approved was `high`. The one
> clip where she said *"both voices are wrong"* was `standard`.
>
> | Clip | `bitrate_mode` | `quality` passed | verdict |
> |---|---|---|---|
> | 1 `faeb10ca` | **high** | unset | approved |
> | 2 `fc416b16` | **high** | unset | approved |
> | 3 `1d04f4bd` | **high** | unset | approved |
> | 4 `dd63298f` | **high** | unset | approved |
> | 5 `f8a62247` | **standard** | `"1080p"` | **both voices wrong** |
> | 6 `8551d8a1` | **standard** | `"1080p"` | unjudged |
>
> **An agent caused it** by passing `quality: "1080p"` in the `generate_video` params
> where the four approved clips passed no `quality` at all. That displaced the server
> default and dropped `bitrate_mode` to `standard` — video bitrate fell from
> **11.35 Mbps to 1.55 Mbps, 7.3x.** Nobody noticed, because `resolution` still read
> `1080p` in both and the cost was identical.
>
> **THE VOICES ARE NOT A SEPARATE PROBLEM FROM THE PICTURE.** Chi's voice is
> synthesized by the render (see below). Degrade the render and you degrade the voice
> it synthesizes. The user's own words: *"This has not been an issue before until now."*
> She was right and the elaborate element-binding theory below was chasing the wrong
> thing.
>
> **ALWAYS PASS `bitrate_mode: "high"` EXPLICITLY.** Never rely on the default, and
> never pass `quality` alongside `resolution` — the four approved clips did not.

Chi's voice is **canon for the whole series**. It is not her cloned voice element.
It is a voice the video model synthesizes, which the user heard, accepted, and
locked in Episode 1.

That means it exists only as a **recipe**, not as a saved asset. It survives only
as long as the inputs that produce it stay byte-identical.

### The two lines that produce it

Paste both into every prompt Chi speaks in, character-for-character. Do not
rewrite, tighten, reorder, or "improve" either one.

```
<<<8a8e8eeb-d41e-4d91-b245-fa0caa8801b6>>> is CHICHI, forty years old. Preserve
her exact adult facial identity, warm brown complexion, almond dark eyes, full
brows, cheek beauty mark and realistic full-figured proportions. Her hair is her
established honey-blonde shoulder-length layered blowout with darker roots,
falling just below her shoulders with soft volume and outward-curled ends —
never a bob, lob or cropped cut.
```

```
ChiChi's English dialogue uses <<<de50f37f-82fa-4a70-bdca-52355b2f4ca2>>>, her
saved warm, smooth, mid-to-low General American voice with calm authority and dry
humour — never a substitute voice, never a British accent, never swapped with
Nia's.
```

### THE VOICE ID CHANGED — 15 Sep 2026, the user's decision

**`ChiChi-Canon-Voice-v1` `de50f37f` is Chi's voice element now, always.** The user
heard it, approved it, and **deleted `ChiChi-the-Influencer-Voice` `180fdb9a` from the
account.** Confirmed gone via `list_voices`: only `de50f37f` and Nia's `12315c68`
remain.

**This is the one reword of a pinned block this file permits, and only because the old
text can no longer work.** `<<<180fdb9a-7c0b-469e-be49-3f76692a3968>>>` now points at
nothing. Section 5 still forbids rewording what produced an approved result, and that
holds for every other word here: **exactly ONE variable changed — the UUID.** Every
other character of both pinned blocks is untouched, and so is their position in the
block order (character → skin → age → hair → VOICE → wardrobe → ring).

**Every DELIVERED prompt in `exclusive/prompts/` still carries the dead
`<<<180fdb9a>>>` tag. Leave them.** Section 8: a DELIVERED file is a record of what was
shot, not a draft. They document the conditions that produced the footage, dead pointer
and all. Only new prompts carry `de50f37f`.

### Why the reference stays in, even though it is still not what you hear

The model binds only ONE voice element per generation and Nia's still wins — see the
sort below — so Chi's voice is STILL synthesized from the prose around the tag rather
than loaded from it. The tag stays because it was present in every approved take and is
part of the recipe.

**What changed is what the tag points AT.** It used to point at a 219 Hz stranger; it
now points at a voice measured within 7 Hz of approved Chi. If the binding ever does
land on her element — deliberately or by accident — it now lands on the right voice
instead of a disaster.

### WHY Nia's wins — the elements are sorted by UUID, and hers sorts first

Confirmed on the returned payload of four separate jobs (Ep3 clips 2, 3, 4 and 5).
The server returns `reference_elements` in **strict UUID-ascending order, identical
every time, regardless of where the tags sit in the prompt text**:

```
12315c68  voice      Nia-voice-v2-clear        <- first, and still first
3108ef3f  character  Nia-Available-Look
59b95bad  environment  Sucré-Coffee-Shop
8a8e8eeb  character  ChiChi-the-Influencer
bcd528d3  character  Nia
d1b9280f  prop       Sucre-Coffee-Cups
de50f37f  voice      ChiChi-Canon-Voice-v1     <- Chi's voice, sorts after Nia's
e48b0e88  character  ChiChi-Available-Look
```

`12315c68` sorts before `de50f37f`, so Nia's voice element is still the first voice in
the list and still the one that binds. **That is the whole reason Nia's voice is right
in every clip and ChiChi's is not.** Nia's voice is a real asset the model loads.
ChiChi's is re-synthesized from prose on every single generation.

**But do NOT read that as "ChiChi always drifts" — she does not.** The prose recipe
produced a voice the user approved in FOUR consecutive clips. It is reproducible when
the inputs are held constant; the Clip 2 block order is what holds them. What broke
Episode 3 was not the recipe failing, it was an input changing (`bitrate_mode`, see
the banner at the top of this section). **Because her voice is a render product, ANY
parameter that degrades the render degrades her voice — resolution, bitrate, duration,
anything.** That is the real exposure, and it is much more actionable than the binding.

**The binding lever was then tested and it FAILED — see below.** Do not revisit it.
Both voice elements stay attached in every prompt.

### `180fdb9a` WAS NOT CHICHI — measured 15 Sep 2026, 2 credits, and it is why it was deleted

The element pasted into every prompt she has ever spoken in was finally listened to.
Both Chi elements were run through `seed_audio` TTS on the SAME 29 words of her own
dialogue — 1 credit each, and `generate_audio` DOES have `get_cost`:

| | median f0 | p25 | p75 |
|---|---|---|---|
| **`de50f37f` ChiChi-Canon-v1** | **166.7 Hz** | 148.1 | 186.0 |
| **`180fdb9a` ChiChi-the-Influencer-Voice** | **219.2 Hz** | 181.8 | 242.4 |
| **target — ChiChi in APPROVED Clip 2** | **160.0 Hz** | 146.8 | 170.2 |

**`180fdb9a` reads 59 Hz above approved ChiChi — higher even than Nia (205.1).** It is
not her voice and it never was. It is only harmless because seedance has never once
honoured it; if it ever bound, it would be a disaster. `de50f37f` lands within 7 Hz of
approved Chi.

**The user deleted it on the strength of this measurement, and adopted `de50f37f` as
Chi's voice.** Both facts are settled and neither is an agent's to revisit.

**The method is the part worth keeping.** Two TTS renders of the SAME words, one per
element, 1 credit each, measured against a known-good line from approved footage. That
is how you find out what a saved element actually is — before it costs a render, and
before anyone builds a recipe on top of it. `180fdb9a` had been in every prompt of
three episodes and nobody had ever listened to it on its own.

### The separation is the signature, not either voice's pitch

Approved Clip 2 vs rejected Clip 5, same method, pooled frames per speaker:

| | Nia | ChiChi | apart |
|---|---|---|---|
| **Clip 2 — approved** | 205.1 Hz | 160.0 Hz | **45.1 Hz** |
| **Clip 5 — both rejected by ear** | 192.8 Hz | 163.3 Hz | **29.5 Hz** |

ChiChi's MEDIAN barely moved (3.3 Hz) and the user still says it is wrong, so median
pitch is useless on its own. What moved is the SHAPE: her p90 went 179.8 → 213.1 while
Nia's median fell 12 Hz. **The two women are 35% closer together in the rejected take.**
Convergence, not absolute pitch, is what "both voices are wrong" measures as. Check the
gap against Clip 2's 45 Hz, not either voice against a target.

**Nia is not simply played back either — correcting an earlier claim in this file.**
Approved Clip 2's Nia measures 205.1 Hz against her element's 183.9. The take the user
APPROVED is 21 Hz further from her element than the take she rejected (192.8). Her
element binds, but the render re-performs it, so "her element is loaded" does not mean
"her voice is safe." Both women's voices are render products; only the degree differs.

### THE BINDING LEVER WAS TESTED AND IT FAILED — 36 credits, job `a91ed33b`

**Do not try this again.** A 4-second clip was shot with ChiChi's `de50f37f` as the
ONLY voice element attached — Nia's `12315c68` tag removed entirely. Confirmed in the
returned payload: the `reference_elements` list contains no Nia voice. `bitrate_mode`
was `high`, so the render was not degraded.

| | ChiChi's median f0 |
|---|---|
| APPROVED Clip 2 (both voices attached, Nia's binds) | **160.0 Hz** |
| rejected Clip 5 (same config, bitrate broken) | 163.3 Hz |
| **this test — Chi's saved voice attached ALONE** | **183.9 Hz** |

**183.9 Hz is the highest ChiChi has ever measured in a render** — 24 Hz above the
approved take and sitting in Nia's own band. p25 173.0, p75 214.8, p90 225.4: the whole
distribution shifted up, not just the median. Attaching her saved voice by itself gave
a WORSE Chi than leaving it unbound.

**One honest caveat:** the test also removed Nia's voice SENTENCE from her character
block, so the prompt neighbourhood changed too and this is not a perfectly isolated
variable. The result is so far off, in the wrong direction, that refining it is not
worth another 36 credits.

**The conclusion that matters: the configuration that works is the one already in the
approved clips** — BOTH voice elements attached, Nia's binding, ChiChi synthesized from
the prose around her tag. That produced a 160 Hz Chi four times running. Do not
re-engineer the voice binding. **When ChiChi sounds wrong, look at the render
parameters, not the elements** — see the banner at the top of this section.

**Measurement cannot referee this.** LTAS across Ep3 clips 2–5, same room and same
encode throughout, put a definitely-different-speaker pair at **0.9664** and ChiChi in
Clip 5 against ChiChi in approved Clip 2 at **0.9406** — the bands overlap in the wrong
direction, because the room dominates the signature. And f0 does not separate them on
short lines: ChiChi reads **158.4 Hz on a 1.84s line, 183.9 Hz on a 0.90s one**, the
latter identical to Nia in the same clip. **ChiChi's short lines always read high**,
which is what emphasis does and also what an unstable voice does. Below about a second
there is no test. The user's ear is the only instrument.

### The durable capture — DONE, 13 Sep 2026

Because the voice is synthesized rather than stored, a model update could have
changed it with no way to restore it. It has now been captured as a real voice
element:

| | |
|---|---|
| **`ChiChi-Canon-Voice-v1`** | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |

Cloned from a 14-second solo-Chi clip (job `572d535a-7689-4315-98e9-09e005c506a8`),
trimmed to 12.4s of clean single-speaker audio, mono 32kHz. Cost 75 credits all
in — 35 for the clip, 40 for the clone. `create_voice_from_confirmed_audio` has
no `get_cost`, so the clone half cannot be preflighted; quote it as unknown.

**What it is for.** TTS, any non-seedance model, and as the restore point if the
synthesized voice ever drifts. Chi is portable now.

**SUPERSEDED 15 Sep 2026.** This paragraph used to call `de50f37f` a post-production
asset that must never go into a seedance prompt. `180fdb9a` has been deleted, so
`de50f37f` IS the tag in every new prompt now. **The mechanism survives, the
instruction does not:** seedance still binds ONE voice element per generation and
Nia's `12315c68` still sorts first, so Chi's tag still will not be honoured in a
two-hander and her voice still comes from the prose around it. Putting `de50f37f` in
the prompt is no longer a change to the recipe — it is the only Chi element that
exists.

**It was verified before cloning, not assumed.** Measured against approved Shot 6.
Long-term-average-spectrum cosine: **0.9819** against canon Chi, 0.8942 against
element `180fdb9a`, 0.8280 against Nia. Canon Chi scores only 0.8621 against
`180fdb9a` — which confirms the two really are different voices, and that the
measurement can tell them apart. Pitch: canon Chi 146.8Hz, capture 160.0Hz,
element 181.8Hz. The capture sits on canon's range (its p25 is 148.1Hz, canon's
median is 146.8Hz); the gap is delivery, not identity — Shot 6 is Chi at her
flattest. The same delivery effect shows in Nia, whose element reads 183.9Hz but
who measures 248.1Hz shouting "TEN!" in the same shot.

**One thing to know about how the capture was shot.** The prompt gave Nia a short
opening line so that her element would absorb the binding exactly as in the
approved takes. The model never rendered her line — Chi starts at 1.72s and the
clip is Chi alone. Her voice still came out canon, with Nia's element attached to
the generation but unspoken. So the binding appears to be set by the attached
elements, not by who actually speaks. Useful, but a single data point; keep Nia
attached and on camera when capturing Chi again.

### If the capture ever has to be redone

1. Reproduce the approved binding conditions: both women on camera, BOTH voice
   elements attached, the two pinned blocks byte-identical.
2. Give Chi one continuous run of dialogue and Nia a single short opener.
3. Verify before cloning. Do not trust it by ear alone and do not skip this —
   see "Verifying audio you cannot hear" in section 7.

### The voice-element slot limit — you cannot just clone another character

The account caps voice elements at three. **As of 15 Sep 2026 TWO are used and ONE
SLOT IS FREE:** `Nia-voice-v2-clear` `12315c68` and `ChiChi-Canon-Voice-v1`
`de50f37f`. The user deleted `ChiChi-the-Influencer-Voice` `180fdb9a` after it
measured 59 Hz off Chi.

When the cap IS full, `create_voice_from_confirmed_audio` refuses with "Voice limit
reached — delete a voice to add a new one" and charges nothing. There is no
delete-voice tool in the MCP surface; it has to be done in the Higgsfield web UI, and
it is the user's call, never an agent's — as it was here.

**Neither remaining element is disposable.** Nia's is honoured and produces her real
voice. `de50f37f` is Chi, approved by ear, and is now the tag in every new prompt.

**Before cloning into the free slot, ask whether the new element would even be used.**
seedance binds ONE voice element per generation and the lowest-sorting one wins.
Chi's tag has been attached in every prompt of three episodes and has never once been
honoured — that is the whole reason her voice is a prose recipe. A newly cloned male
element, with Nia's `12315c68` also attached, will almost certainly be ignored the
same way unless its UUID happens to sort below hers. **The men are far more likely to
need the prose-recipe treatment than a clone**, and a clone that is never honoured is
worth having only as a measurement target, not as a voice.

**And measure any new element on its own before building on it** — two 1-credit TTS
renders of the same words is all it takes. Three episodes of prompts were built around
a Chi element nobody had ever listened to in isolation, and it turned out not to be
her.

**A reference sample is still worth having without cloning it.** Measure it and
write the prompt toward those numbers, then measure what comes back. Dorian's
supplied sample (ElevenLabs "Lamin", 23.0s, mono 44.1kHz) reads **~102Hz true
fundamental, warmth 73, General American, deep and unhurried** — that is the
target to hit and the yardstick to check against.

**Beware the octave error when quoting a male pitch.** A naive autocorrelation put
that same sample at 170Hz median with a 1.95x quartile spread. The histogram
showed two clusters — 46% of frames at 101.6Hz and 54% at 197.5Hz, a ratio of
**1.94**. That is octave doubling, not a vocal range. **A quartile spread much
above ~1.4x means the reading is unsafe: histogram it and take the lower mode.**
For scale, a clean reading looks like Brooks at 98.2Hz with a 1.25x spread.

### Kel's reference, and why the two men need timbre to separate them

Kel's supplied sample (ElevenLabs "Bobby — Black American Male Voice", 26.5s,
mono 44.1kHz) reads **106.7Hz true fundamental, warmth 38**. Dorian's reads
**101.3Hz, warmth 73**.

**The two men are 5.4Hz apart — pitch will not tell them apart.** What separates
them is timbre and the gap is wide: Dorian is round, warm and chesty; Kel is
brighter, drier and thinner. Both reference samples happen to read the SAME
SCRIPT through the same chain, so that warmth difference is the voice itself and
not delivery — the cleanest voice comparison available in this project.

**So write Kel against Dorian, not just against the women.** Describing Kel as
"deep" would collapse him onto Dorian, who is already deep. Name the contrast
explicitly: less bass body, more edge, no velvet, never as warm or resonant as
Dorian, the two must not sound like the same person. They never share a scene —
Kel is Clip 3 with ChiChi, Dorian is Clips 2 and 4 — so the risk is not confusion
within a clip but the audience failing to register two different men across the
episode.

**A useful trick when comparing two reference voices:** get both samples reading
the same text. Content and delivery then cancel out and the difference that
remains is identity.

### `voice_change` — TESTED, 2 CREDITS, AND IT CANNOT FIX A VOICE. READ THIS FIRST.

**Episode 3 Clip 3 proved it does NOT solve "the voices are wrong", and the user's
ear overruled every measurement that said it had.** Two passes were run, spliced and
level-matched; the numbers all landed on target; the user listened and said *"her
voice isn't British and that's not Chi's voice."* Both fixes had failed:

- **It swaps TIMBRE, not PRONUNCIATION.** Accent lives in how the render articulated
  the words, and a revoice rides on top of that articulation. Nia rendered without
  her British accent and no revoice could put it back — confirmed by building a
  version with her ORIGINAL render audio untouched, where she is still not British.
  **An accent fault is a RENDER fault. Only a re-shoot fixes it.**
- **A REVOICE built on `de50f37f` did not reproduce canon Chi.** Revoicing her lines
  with it moved the pitch to 161.3 Hz, within 4 Hz of approved Clip 2 — and the user
  still said it is not her voice. **Pitch matching is not identity.** Read this as a
  fact about `voice_change`, NOT about the element: a revoice inherits the original
  render's articulation, so a correct voice laid over a bad performance still sounds
  wrong. The user later approved `de50f37f` by ear and adopted it as ChiChi's voice.

**So the 0.9819 LTAS cosine in "It was verified before cloning" is NOT proof the
clone is usable.** That measurement, and the pitch figures beside it, passed an
asset the user rejected by ear at the time. Section 7 already says measurement raises
the question and the user settles it; this is that rule costing 75 credits for the
clone plus four for the failed revoice.

**RESOLVED 15 Sep 2026: `de50f37f` is approved and is now Chi's element.** The
condition this section set — "unproven until the user has approved something made from
it" — was met by a 1-credit TTS render the user listened to and adopted. **Read the
failure above narrowly: what failed was `voice_change`, riding on a bad render's
articulation, NOT the element.** A voice can be right and a revoice built on it still
be wrong, because the revoice inherits the original's pronunciation. Those are two
different questions and this section conflated them.

**What voice_change is still good for:** nothing yet demonstrated on this series.
Keep it in mind for a single-speaker shot where the voice is merely the wrong
person rather than the wrong performance, and verify with the user before building
anything on it.

**The one thing that has ever produced both correct voices is a seedance render with
the approved block order.** Clip 2 is the proof. When voices are wrong, re-shoot on
Clip 2's structure — see section 7's rule on the dialogue/voice tension.

### The two-pass splice mechanic — kept, because it works even though the fix did not

`voice_change` takes `video_id`, `voice_id`, `voice_type` and applies ONE voice to
the WHOLE clip; there is no per-speaker parameter. For a two-hander:

1. `voice_change` with speaker A's element → whole clip in A's voice. 2 credits.
2. `voice_change` with speaker B's element → whole clip in B's voice. 2 credits.
3. In the sandbox, for zero credits, take each speaker's lines from her own render
   and crossfade them together, then mux onto the original video track. Put the
   boundaries INSIDE the silent gaps, ~40ms equal-power crossfade at each edge.

**Timing survives** — 12.042s against the original 12.050s.

**It also strips the room.** The revoiced audio came back 6.3 dB down on BOTH speech
and ambience, and the decay after each line fell from 12.4 dB above the floor to
8.9 dB, so the voices stop dead instead of ringing. That is what "superimposed"
sounds like. Restoring the level is exact and free; **restoring the decay
synthetically was attempted and failed** — several reverb lengths and wet levels
all smeared the dialogue before reaching the original's 12.4 dB.

### `voice_change` — the original note, superseded above

`voice_change` replaces the spoken voice in a finished video while keeping the
original timing and visuals, taking a completed job_id and a voice_id of either
type. It runs AFTER the render, so it sidesteps the one-element-per-generation
limit entirely.

**It costs 2 CREDITS.** There is no `get_cost` on it, so it cannot be preflighted —
but the figure is now measured, from `transactions`, twice. Against **108 credits to
re-shoot a 12s clip at 1080p, that is 54x cheaper**, and unlike a re-shoot it cannot
re-roll the picture. Episode 3 Clip 3 had correct dialogue and staging with wrong
voices, and re-generating would have thrown away everything that was right — the
same mistake as the Episode 2 jacket.

**WHEN ONLY THE VOICES ARE WRONG, NEVER RE-SHOOT. REVOICE.** The user asked "why is
it 108 credits, I want to use the same clip" and was completely right.

**It applies ONE voice to the WHOLE clip** — there is no per-speaker parameter, only
`video_id`, `voice_id`, `voice_type`. That does not rule out a two-hander; it just
means two passes and a splice:

1. `voice_change` with speaker A's element → whole clip in A's voice. 2 credits.
2. `voice_change` with speaker B's element → whole clip in B's voice. 2 credits.
3. In the sandbox, for **zero credits**, take each speaker's lines from her own
   render and crossfade them together, then mux onto the original video track.
   Put the splice boundaries INSIDE the silent gaps between lines, with a ~40ms
   equal-power crossfade at each edge, and the joins are inaudible.

**Timing survives.** The two revoiced renders came back at 12.042s against the
original 12.050s — 8ms, so the original line timestamps still locate the splice
points. Verify anyway before cutting.

**Measured result on Episode 3 Clip 3:**

| | Before | After revoice | Target (approved Clip 2) |
|---|---|---|---|
| ChiChi | 188.1 Hz | **161.3 Hz** | 165.2 Hz |
| Nia | 170.2 Hz | **186.0 Hz** | 207.8 Hz / element reads 183.9 |

Before the fix the two women were 17.9 Hz apart and **inverted** — ChiChi reading
higher than Nia, which is backwards for her. After, they are 24.7 Hz apart with
ChiChi correctly the lower voice.

**SUPERSEDED.** The last line of this paragraph used to read "it is still never put
into a seedance prompt — it is a POST-PRODUCTION asset." That is now FALSE.
`180fdb9a` was deleted on 15 Sep 2026 and `de50f37f` is ChiChi's tag in every prompt.
See the Lock Card at the top of this file.

### How the two voices actually reach the screen — and why it changes nothing you DO

Nia's `12315c68` is the element the model loads. ChiChi's `de50f37f` is attached but
the model builds her voice from the prose around the tag instead. **That is a fact
about the mechanism, not an instruction.** Both tags go in every prompt regardless —
see the Lock Card. The difference is only in where the exposure lies:

- **Nia's voice** is re-performed by the render but anchored to a real asset.
- **ChiChi's voice** is entirely a render product, so **anything that degrades the
  render degrades her** — bitrate above all.

Neither is "safe" and neither needs re-engineering. Hold the parameters and the block
order constant and both come back right; that is what the four approved clips prove.

---

## 5. PROMPT LANGUAGE THAT ACTUALLY HOLDS

- **Positive description plus named negations.** "Arc floor lamp" implies a shade;
  "a bare brass rod that stops in mid-air, with no bowl, dome, shade, globe or
  bulb" does not. List the specific wrong answers by name.
- **Watch your own vocabulary for trapdoors.** `high mock-halter neckline` shipped
  in every Episode 1 prompt — *mock neck* is the term for a turtleneck collar, so
  it was requesting the wrong garment the entire time. One shot obeyed it and had
  to be rebuilt. Reread wardrobe lines for words that mean something else in
  garment terminology.
- **When the USER'S OWN WORDS for a garment are ambiguous, do not translate them
  into jargon — keep their words and make the image authoritative.** Episode 3's
  reference came described as an "oversized neck sweater halter top", which pulls
  two ways: a halter bares the shoulders and fastens behind the neck, a sweater neck
  implies a collar at the throat. The tempting move is to work out which garment it
  really is and write that. **That is exactly how Episode 1 lost a shot** — an agent
  wrote `high mock-halter neckline` and was requesting a turtleneck the whole time.
  The element instead used the user's phrase verbatim, said REPRODUCE EXACTLY AS
  SHOWN IN THIS REFERENCE IMAGE, and forbade the neckline changing IN EITHER
  DIRECTION — never raised, never lowered, never swapped. **Jargon that is never
  written cannot be wrong.** Write conditional rules the same way, so they hold
  whichever the garment turns out to be: Nia's choker is worn only if the reference
  leaves her throat bare, and is never added on top of fabric.
- **The image is the lock, so do not re-describe what it already shows.** A
  reference image carries colour, fabric, cut, collar and proportion. Restating
  those in the element description creates a SECOND, weaker specification that can
  disagree with the picture, and when they disagree there is no way to tell which
  one a bad take obeyed. Spend the description on what an image CANNOT carry: the
  rules, the quantities, the negations, the things that must never change.
- **Never reword anything that produced an approved result.** The text that reads
  as "maroon tights" on screen says `chocolate-brown leggings` in the prompt. Keep
  the words that worked, not the words that describe what you see.
- **Quantities are absolute or they drift.** "A single glass" is not strong enough.
  "Exactly ONE glass exists, never two, never a spare or empty glass on any
  surface in any shot" is.
- **A generic negation loses to a strong prior. Name the object.** "Both women
  keep both hands entirely RING-FREE and BRACELET-FREE" shipped in every Episode
  2 prompt and ChiChi wore a wedding ring anyway — the model sees a woman of
  forty and reaches for a band. Generic category words ("ring-free", "no
  jewellery") do not survive a prior that strong. Name the exact thing and the
  exact place: "**NO wedding ring, NO engagement ring, NO band of any kind on any
  finger, and specifically NOTHING on the fourth finger of her left hand — that
  finger is bare skin.**" Same pattern for anything the model expects to see and
  the scene forbids.
- **You cannot negate a specific string by QUOTING it — quoting it is what supplies
  it.** The Episode 3 set-up plate asked for "NO LEGIBLE LETTERING ANYWHERE" and the
  lettering came back perfectly legible. The prompt had also said "the Sucré
  printing on the cups", the cup element's description says "the plastic Sucré
  coffee cup" and "the Sucré printing... NEVER rendered as legible lettering", and
  the set element's description says "preserve the exterior SUCRÉ sign". The word was
  handed to the model five or six times, attached to a surface, next to a soft
  instruction not to render it clearly. **Naming the text is what put the text
  there.** The fix is never a harder negation — it is to describe the surface as
  BLANK and never write the word at all: "the surface is COMPLETELY BLANK — no words,
  no letters, no numerals, no logo, no printed brand mark, no sticker, no label."
  Reference the element by UUID, which carries no renderable text. This is the same
  shape as "never generate the title into the art" in section 2, and it generalises:
  **for anything you do NOT want rendered, describe its absence, never its
  identity.** Contrast this with the ring and the wedding band, where naming the
  object is exactly right — the difference is that a ring is a SHAPE the model
  supplies from its own prior, while text is a STRING the model can only get from
  your prompt.
- **Spell unusual words phonetically, and negate the wrong readings.** "Jollof"
  came back mispronounced because the prompt only ever spelled it. Write the
  sound: *"pronounced 'JO-loft' said quickly, stress on the first syllable, the
  final T completely SILENT so it ends on a soft f — never 'jaw-left', never
  'joll-OFF' with the stress on the second syllable, never with an audible T."*
  Same for any character name, place or dish the model has no strong prior for.
- **Skin needs its own block, and cover both failure modes.** "ChiChi's skin
  looks unclear" can mean soft and out of focus OR blotchy and uneven, and an
  agent who cannot see the render does not know which. Write against both at
  once: clear, even, luminous, sharply in focus, natural visible pore texture,
  and then negate blotchy, mottled, patchy, waxy, plastic, muddy, grainy,
  over-smoothed into a flat mask, and soft or out of focus. Guessing one and
  missing costs a whole take.
- **Mechanisms need their geometry pinned, not just their name.** A door was asked
  for and a door arrived — hinged on the left, knob on the right, and opening from
  the left with the knob still on the right. The model draws the parts; it does not
  reason about how they work together. Name which edge each part lives on, which
  edge it pivots on, and where the gap appears: "hinges on the LEFT edge, handle on
  the RIGHT edge, never the same side — it opens inward pivoting on the left, so the
  gap opens on the right." The same applies to anything with a working part —
  drawers, lids, latches, windows, a phone cord.

---

## 6. PACING

**Fix pacing with the container, not the wording.** Repeating "no dead air" does
nothing. Shortening the clip does, because the slack disappears.

- Target density: **~2.1 words of dialogue per second of clip.**
- **That 2.1 is a CLIP figure, not a speaking rate, and confusing the two
  over-provisions every container.** Measured on Episode 2 Clip 5: 46 words in
  **13.44s of actual articulation = 3.42 words/second.** The model talks 63%
  faster than the planning figure and then spends everything left over on
  silence — that clip came back 47% silent. **Size a clip as
  `words / 3.4` for speech, PLUS the wordless action you actually want, PLUS
  about 0.45s per line boundary.** Use 2.1 only as the sanity check on the
  finished total.
- 5 lines ≈ 25 words ≈ a 12-second clip. At 15s the model spends the surplus on
  reaction beats and the scene drags.
- Replies land within 0.2s. Two lines per scene should start a fraction early and
  overlap.
- Cuts fall **on the first syllable** of the incoming line, never before it.
- **The ambience formula that worked in Episode 1** — reuse the sentence shape,
  swap only what sits inside it. Every approved Episode 1 shot carried:
  *"Underneath, quiet apartment ambience only: faint city traffic, the brush of
  bare feet on the floor, fabric movement, the small click of an earring. No
  music."* The load-bearing words are **Underneath**, **quiet**, **only** and
  **faint** — they put the ambience behind the dialogue instead of beside it.
  When a scene needs something Episode 1 forbade (Episode 2's party has source
  music playing), keep the shape and name the new thing as faint and underneath,
  rather than writing a fresh paragraph. Also negate **intelligible lyrics** —
  sung words compete with dialogue exactly as spoken ones do.
- **The music swell under a final hold does NOT respond to negation — fix it in
  post.** Two clips, two failures, and escalating the wording made it worse:
  Episode 2 Clip 4 swelled **+3.4 dB** under its hold against a plain negation,
  and Clip 5 swelled **+7.78 dB** against a much harder one that named every
  instrument, pinned the music 20 dB under the voices and told the sound to drop.
  A hold has no dialogue in it, so the tail can be ducked with ffmpeg in the
  sandbox for **zero credits** without touching a frame of approved picture.
  Budget for that rather than for another take.
- **A per-line time budget BACKFIRES — the container rule works on the clip, not
  on a line inside it.** Episode 2 Clip 5's closing line was the payload of the
  clip, so the prompt gave it an explicit budget: "about seven and a half seconds,
  do not rush it." It came back at 5.76s including a 1.5s internal pause — roughly
  4.3s of actual words, 3.8 w/s, **the fastest delivery in the clip.** The model
  rushed the one line that was protected and banked the time as silence elsewhere.
  Size the CLIP and let the lines fall where they fall.
- **The model does not render an overlapping interruption.** Asked for explicitly
  in Episode 2 Clip 6 — one line beginning before the other finishes, with the
  overlap described and the reason given — and what came back was a clean handoff
  with a **0.08s gap.** Perfectly good, but not an overlap. Section 1 wants these
  two women interrupting each other; expect to get fast adjacency instead and
  write lines that still work that way.
- **Silence must be declared.** A held wordless beat is legitimate — it carried the
  turn in Episode 1 — but the prompt has to say "this clip is the exception, the
  silence is the point, do not fill it." Otherwise it gets filled.

---

## 7. WORKING RULES

- **One variable per take.** When a note comes in, change that one thing and
  nothing else. Bundling a second improvement into a fix is what broke the most
  expensive shot of Episode 1. If a second change seems needed, propose it first.
- **Claude cannot see the renders.** All visual feedback comes from the user.
  Ask for a frame rather than guessing — one screenshot corrected three details
  that had survived multiple text-only passes.
- **Verifying audio you cannot hear.** Visuals need the user, but audio and timing
  do not. `sandbox_exec` is a Higgsfield cloud box with ffmpeg, ffprobe, sox and
  faster-whisper, and it can reach the CDN that this environment's proxy blocks.
  Use it before spending on anything downstream of a render:
    - **Transcribe with timestamps** to check the model actually said the scripted
      lines, and where the gaps fell. This is how the dead air in a clip gets
      measured instead of argued about — and how it was caught that Nia's opening
      line in the capture clip never rendered at all.
    - **Fingerprint a voice** when the question is "is this the right voice." Pull
      f0 median and quartiles on voiced frames, plus a long-term-average-spectrum
      cosine against a known-good sample from approved footage. Always include a
      control pair you know differs so the numbers have a scale; same voice lands
      ~0.98. **The old control — canon Chi vs element `180fdb9a` at 0.8621 — can no
      longer be reproduced, because that element was deleted.** Use a cross-speaker
      pair from inside one clip instead (~0.82), which section 7 prefers anyway.
    - **Get reference samples free** from `list_voices` — every voice element
      carries a `preview_url`. No TTS spend needed to hear what an element is.
    - **Audio measurement flags a suspicion; the user's eyes settle it.** Whose
      mouth moves is a VISUAL fact and cannot be read off a spectrum. The per-line
      cluster test correctly flagged a misattributed line in Episode 2 Clip 1 —
      and then kept flagging it for three more takes after a staging change had
      plausibly already fixed it, because on one-second lines it cannot tell the
      two speakers apart: the definitely-different control scored 0.621 and the
      definitely-same control 0.878, bands that nearly overlap. Roughly 110
      credits went on chasing a number. Use the measure to raise the question,
      then ASK FOR THE USER'S EYES before spending on another take.
    - **Scene detection gives false negatives on cuts; frame-differencing does
      not.** Episode 2 Clip 2 had an unmistakable hard cut that
      `select='gt(scene,0.12)'` reported as zero cuts, while per-frame absolute
      difference put it at **19.7x the mean**, eight times larger than anything
      else in the clip. Always run the frame-difference pass: sample at 8fps and
      160x90, take the mean absolute difference between consecutive frames, and
      look for ONE isolated spike. A real cut stands far above its neighbours; a
      smooth cluster of moderately high values is just fast motion. Never
      conclude "no cut" from the scene filter alone.
    - **A transcript CANNOT verify pronunciation.** Whisper maps sound to
      SPELLING, so it writes the dictionary word for anything in the
      neighbourhood — a near-miss and a correct reading produce identical text.
      Episode 2 Clip 3 was reported as pronouncing "jollof" correctly on that
      basis and the user's ear said otherwise. Two transcriptions disagreeing
      (the small model heard "jaw-left", the medium heard "Jollof") means the
      word is UNUSUAL, not that the larger model is right. **Any word outside
      everyday English — a dish, a name, a place — needs its pronunciation
      spelled phonetically in the prompt and then checked by the user, never by
      a transcript.**
    - **Verify the ATTRIBUTION, not just the words.** A transcript proves the
      lines were spoken. It does not prove who spoke them. A clip shipped with
      ChiChi delivering Nia's line and the verification passed it, because the
      pitch was bucketed by who was *scripted* to speak — which makes a swap
      invisible by construction. **Measure every line separately, then cluster
      the lines and see which speaker each one lands on.** Never average lines
      together on the assumption the script was obeyed.
    - **A measurement window that spans a quiet passage AND a transient reports
      neither.** Episode 2 Clip 6's tail was nearly written up as a third music
      swell: averaging 21.5-24.0s as one window caught the door slam inside it and
      printed "+8.02 dB, SWELLED." It had not swelled — the tail sat at -39 to -42
      dBFS, quieter than the walk that preceded it, and the loud thing was the
      door. **Profile a tail per-100ms before calling anything a swell, then take
      the spectral centroid of the loud event**: the slam read 708 Hz over ~0.4s
      against 1569 Hz for the quiet tail. **Low and short is an object. Higher and
      sustained is music.**
    - **Whisper writing a DIFFERENT word is informative, even though writing the
      RIGHT word proves nothing.** The rule above says a transcript cannot confirm
      a pronunciation — "jollof" came back spelled correctly and was still wrong.
      But the reverse case carries real signal: Episode 2 Clip 6 scripted "Chi"
      (CHEE) and the transcript says **"Gee."** When the nearest match to the sound
      is not the intended word at all, something is off. It still needs the user's
      ear to settle; it is a reason to ask, not a verdict.
    - **Within one clip, LTAS is valid; across clips it is not.** The room is the
      dominant term in a spectral signature, so comparing a line to a sample from
      another set is unreliable. Comparing the four lines of a single clip to each
      other is clean — identical acoustics, identical encode. Use a same-speaker
      pair from inside the clip as the control (two ChiChi lines score ~0.93) and
      a known cross-speaker pair as the floor (~0.82). **Lines under about a
      second are too short to trust** — they score low against everything.
  Measure first, then confirm with the user. It does not replace their ear; it
  stops a wrong assumption reaching a paid step.
- **Preflight every cost** with `get_cost` before generating. State the number.
  Not everything has one — `create_voice_from_confirmed_audio` does not, and the
  clone came in at 40 credits against a 20–25 estimate for the whole job. When a
  step cannot be preflighted, say so and quote it as unknown instead of folding a
  guess into a firm number.
- **`get_cost` quotes ONE generation, not the batch.** It returns the same number
  whether you ask for `count: 1` or `count: 4`, and then bills you per image —
  four Nano Banana variants preflighted at "2 credits" cost 8, as eight separate
  2-credit lines in `transactions`. Multiply the quote by `count` before you say
  a number out loud, and check `transactions` afterwards rather than trusting the
  preflight.
- **Report the credit balance** after each batch so the user can see the burn.
- **"Make it higher resolution" means UPSCALE, never re-generate.** `upscale_video`
  exists (providers `topaz` and `bytedance`; it takes a completed job_id directly
  and has NO cost preflight, so quote it as unknown). Re-running an approved
  prompt at a higher resolution is not a resolution change — it is a **brand new
  take that re-rolls everything**, wardrobe included. An approved 480p clip was
  re-shot byte-identical at 1080p for 135 credits and came back with ChiChi's
  leather jacket missing, despite the prompt saying "the jacket stays ON for the
  whole clip". **Once a take is approved, never generate from that prompt again.**
  Upscale the approved footage.
- **A free 1080p is always available: upscale in the sandbox with ffmpeg.** Zero
  credits, and it cannot re-roll anything because it resamples the frames that
  already exist. `ffmpeg -i src.mp4 -vf "scale=1920:1080:flags=lanczos" -c:v
  libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a copy -movflags +faststart`,
  then `media_upload` -> PUT -> `media_confirm` to put the file in the user's
  library. It adds no invented detail, so a paid AI upscaler may still look
  better — but it delivers the approved footage in a true 1080p container for
  nothing, and it is the right first answer to "make it higher resolution".
  **Prove it afterwards**: sample both files at the same fps and size and compare
  per-pixel. Under ~1.0/255 mean difference is resampling noise, i.e. the same
  footage. Episode 2 Clip 1 measured 0.172 mean, 0.299 worst.
- **Flagging a risk is not permission to take it.** The re-roll risk above was
  stated out loud and then the 135 credits were spent in the same turn without
  waiting for an answer. A warning followed immediately by the charge is not
  consent. When a step is both irreversible in cost and risky to an approved
  result, say so and STOP until the user answers.
- **A LONG PROMPT LOSES THE DIALOGUE. PUT THE SCRIPT AT THE TOP AND KEEP THE WHOLE
  THING SHORT.** This is the most expensive lesson in Episode 3 and the evidence is
  a clean monotonic line:

  | Prompt | Length | Lines spoken as scripted |
  |---|---|---|
  | Ep3 Clip 1 ✅ | 14,846 | all |
  | Ep3 Clip 2 ✅ | 16,743 | all |
  | Ep3 Clip 3 v1 ❌ | 19,875 | 3 of 6 |
  | Ep3 Take A ❌ | 20,611 | **0 of 8 — a whole new scene invented** |
  | Ep3 Clip 3 v3 ✅ | **8,775** | **all 47 words, verbatim** |

  The failing takes obeyed everything at the TOP of the prompt perfectly — pacing,
  framing, cut count, hold length all landed to spec — and improvised everything at
  the bottom. **The dialogue was sitting about 70% of the way down.** The model is
  not refusing to follow a script; it is losing it.

  The fix is structural, not a harder negation. **Lead with the numbered lines and
  their speaker tags, before any set, camera, wardrobe or continuity block**, and cut
  the prompt to roughly half. Everything the start_image and the elements already
  carry — seating, cup level, jewellery, wardrobe fit, framing — is one sentence
  pointing at the frame, not a paragraph. Attribution warnings compress to a line
  each without losing force.

  **Escalating the wording is what caused this.** Every fix across three passes added
  text, and each addition pushed the script further down. When adherence drops, DELETE
  rather than add.
- **THE DIALOGUE FIX AND THE VOICE RECIPE PULL AGAINST EACH OTHER. Satisfy both by
  moving the script UP, never by deleting the blocks around ChiChi's voice line.**
  Shortening Episode 3 Clip 3's prompt from 20,611 to 8,775 chars got every word of
  the script back — and broke both voices, because section 5a's recipe is not the two
  pinned blocks alone, it is **the blocks that surround them**. The cut moved her
  voice line four positions earlier and deleted both wardrobe blocks that sit either
  side of it in the approved takes. The pinned text was still byte-identical; the
  neighbourhood was not.
  The working shape is **approved Clip 2's block order exactly, with the dialogue
  block lifted to the very top** — script at 1.9% in rather than 70%, everything else
  untouched, ~16,500 chars. That keeps the one change that fixed the words and
  restores the one thing that carried the voices. **ChiChi's order is
  character → skin → age → hair → VOICE → wardrobe → ring, and it does not move.**
- **Read the WHOLE prompt start to finish before submitting it.** Prompts here
  are rewritten in place across many edits and contradictions survive. A final
  read of Episode 2 Clip 5 caught two stale "three seconds" left over from a
  silence trim, in the framing block and the music block, while the timing block
  said two and a half — **three different durations for the same beat in one
  prompt.** Free to catch, 234 credits to discover afterwards. Grep the prompt for
  every number and every negation you changed.
- **Check the model's own constraints instead of inheriting an assumption.**
  Episode 2's spec said "15s clips" for four clips because nobody asked the model.
  `seedance_2_5` accepts **4 to 30 seconds**. A container you cannot size is a
  container you cannot use, and section 6's whole pacing method depends on sizing
  it. Call `models_explore` with `action: get` before locking an episode spec.
- **A submitted generation can come back as a PRESET RECOMMENDATION instead of a
  job, and the recommendation can be badly wrong.** Episode 3 Clip 1 was submitted
  and the server answered with the preset **"IN THE DARK"** — for a bright
  mid-morning coffee shop. Nothing was charged and no job existed. Two things
  follow. **Check whether a job id actually came back before reporting a clip as
  shooting**, because a recommendation looks like a normal response. And **decline
  it and retry literally** (`declined_preset_id`) rather than accepting: a preset
  carries its own look and would override the locked set, the locked grade and the
  staging that fixes attribution. A preset is never the right answer for a clip
  built on approved elements.
- **NEVER SILENTLY SWAP ANY GENERATION PARAMETER — AND DIFF THE WHOLE SET AGAINST THE
  LAST APPROVED CLIP BEFORE EVERY SUBMISSION.** Models, resolution and aspect ratio
  were the named three; **`bitrate_mode` was not, and it is what broke Episode 3.**
  It silently fell from `high` to `standard` between Clip 4 and Clip 5 because an agent
  started passing `quality: "1080p"` where the approved clips passed no `quality` at
  all. Video bitrate dropped **7.3x, 11.35 Mbps to 1.55**, the user said both voices
  were wrong, and roughly two hours went into an element-binding theory that was
  chasing the wrong variable.
  **Nothing visible flagged it**: `resolution` still read `1080p`, the cost was
  identical, `get_cost` matched, and the returned job looked normal. The only place it
  showed was `params.bitrate_mode` in the job payload and the file size.
  So: **pull the last approved clip's `params` with `job_display`, diff it field by
  field against what you are about to send, and pass every value explicitly rather
  than trusting a default.** A parameter you do not send is a parameter the server
  chooses for you, and it will not choose the same thing twice.
  **And when a render regresses in a way the prompt cannot explain, check the
  parameters BEFORE theorising about the model.**
- **Pick the resolution before the first clip of an episode, not after.** "Blurry"
  is usually not a prompt problem — 480p looks fine in a chat preview and soft on
  a television, and no amount of sharpness wording fixes the pixel count. Quote
  all three tiers per clip and per episode up front and let the user choose, then
  hold it for the whole episode. Seedance on a 15s clip: **480p 37.5**, **720p
  97.5**, **1080p 135** credits. The only free moment to change it is while the
  episode's one existing clip is already being replaced.
- **Ask for sharpness in the prompt too, but expect little from it.** An IMAGE
  QUALITY block — "maximum sharpness and clarity throughout, crisp focus on faces
  and fabric, no softness, haze or smearing, not a soft upscale" — is worth its
  zero cost. The resolution tier is what actually moves it.
- **Tell the user when a change invalidates existing shots.** Changing the time of
  day means everything already shot must be rebuilt. Say so before spending.

---

## 8. REPO CONVENTIONS

- One markdown file per episode in `exclusive/`, carrying the script,
  the element registry with IDs, the continuity spec, and the delivered shot list
  with job IDs.
- Update the episode file in the same session the footage is approved. Element IDs
  living only in a chat transcript are lost.
- **An element is not locked until its ID is in the episode's registry table.**
  Episode 2's hallway element — the one set in the episode that HAS the apartment
  door — was described in the file as "required" and its ID was never written
  down. It had to be recovered from the workspace two clips later. Prose saying an
  element exists is not a record of it; the table is.
- **Every prompt is saved to `exclusive/prompts/` as a file.** Section 5 says never
  reword what produced an approved result, and that is unenforceable if the words
  only ever existed in a chat transcript. Name them
  `ep<N>-clip<NN>-DELIVERED-<job-prefix>` once shot, `-PROPOSED` before, and
  `-ABANDONED-<job-prefix>` when rejected. **A DELIVERED file is a record, not a
  draft** — to change a shot, copy it to a new PROPOSED file and edit that.
- Commit after each locked decision, not in one batch at the end.
