# EXCLUSIVE — the series · production rules

This repo builds an AI-generated dramatic series. Read this file before writing a
prompt, generating anything, or spending a credit.

Every rule below was paid for. Most exist because something drifted, broke, or
had to be re-rendered.

---

# 🔒 THE LOCK CARD — READ THIS BEFORE EVERY SINGLE GENERATION

**Three episodes have now lost credits to voice and quality faults. Every one of them
was a value in this card being wrong. Check the card, not your memory.**

## The two voices — SETTLED BY THE USER, 15 Sep 2026

| Character | Voice element | UUID |
|---|---|---|
| **NIA** | `Nia-voice-v2-clear` | `12315c68-37de-41fe-8766-76ac07bcaf70` |
| **CHICHI** | `ChiChi-Canon-Voice-v1` | `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |

The user's words: *"The voice for Chi is literally ChiChi Canon voice V1. It is
literally the voice we need."* That is the ruling. `180fdb9a` is deleted, it is not
coming back, and **it is not an agent's business to relitigate either fact.**

## 🎙️ THE CHARACTER SPEECH RECORD — CHECK THESE THREE THINGS SEPARATELY, EVERY TIME

**The user's ruling, 17 Sep 2026. Language, accent and voice identity are THREE
DIFFERENT CONTROLS and every prompt in this project has only ever specified the third.**

> *"British and American English are the same language with different accents.
> Selecting 'English' alone won't secure Nia's British accent."*

| | **NIA** | **CHICHI** |
|---|---|---|
| **Language** | English | English |
| **Accent** | **BRITISH** | **GENERAL AMERICAN** |
| **Voice identity** | `Nia-voice-v2-clear` `12315c68-37de-41fe-8766-76ac07bcaf70` | `ChiChi-Canon-Voice-v1` `de50f37f-82fa-4a70-bdca-52355b2f4ca2` |
| **Approved example** | element preview, **confirmed British by ear 17 Sep 2026** | element preview, **confirmed American by ear 17 Sep 2026** |
| **Audio-reference media id** | `10c50bd1-017a-4d2e-8d90-53e0391ecbb7` | `701615f7-c251-4c44-a64f-33b4aa1903cf` |

**They share a language and differ on accent, so language is not the lever — and
naming the accent in prose is not a lever either.** Three episodes of prompts have
carried "British-accented" in Nia's block and she still rendered flat. **Adding the
words again is the music-swell failure on a third axis.**

### ✅ VERIFIED 17 Sep 2026: THERE IS NO LANGUAGE SELECTOR ON THIS CONNECTION

The user flagged that Higgsfield documents language selection in Seed Speech but that
availability through this connection needed checking. It was checked with
`models_explore`, and the parameter is **not exposed**:

| model | every parameter actually available |
|---|---|
| `seed_audio` | `format` · `sample_rate` · `speech_rate` · `loudness_rate` · `pitch_rate` · `voice_type` · `voice_id` |
| `text2speech_v2` (including `variant: "seed_speech"`) | `variant` · `voice_type` · `voice_id` |

**Neither carries a language or accent field.** So both properties can only arrive
through **the voice element** and **the text itself** — there is nothing to set.
**Do not tell the user a language can be selected here, and do not go looking for the
parameter again.** `seed_audio` does accept an `audio_references` media role, which is
the only steering input that exists.

### THE VERIFICATION, AND IT RUNS BEFORE EVERY SUBMISSION

Name all three out loud for every character who speaks — not "her voice tag is in":

1. **Language** — the line is written in the language it is meant to be spoken in.
2. **Accent** — which accent this character's approved example carries.
3. **Voice identity** — the exact element ID above, checked against this table and
   against `list_voices`, never against memory.

**Check the ACTUAL inputs, not the intent.** §5a's whole history is prompts that
said the right thing while the inputs said something else.

> ### ⛔ THE THIRD ELEMENT WAS TESTED, 17 Sep 2026. IT IS NOT THE FIX. DO NOT REVISIT IT.
>
> **`Nia-Canon-Voice-v2` `b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c`** sorts BEFORE both —
> `b3d2fc9b` < `12315c68` < `de50f37f` — so attaching it DISPLACES Nia's `12315c68`
> and binds instead. The user authorised a test; it cost 207 credits and the answer
> is clean.
>
> | clip | Nia's element | shape | British? |
> |---|---|---|---|
> | `2a5a6765` C1 | `12315c68` | 18s, two-hander, 9 cuts | ❌ |
> | `903a4d2b` C1 v2 | **`b3d2fc9b`** | 18s, two-hander, 9 cuts | ❌ |
> | `94afd8b5` | **`b3d2fc9b`** | **5s, SOLO, 0 cuts** | ✅ |
> | `51783a9e` | `12315c68` **+ AUDIO REFERENCE** | 18s, two-hander | ✅ (bled onto Chi) |
>
> **Two independent one-variable comparisons, not one clip.** Swap the element with the
> shape held → fails both ways, so **the element is not the cause**. Hold the element and
> change the shape → the accent flips, so **length/staging is**. The user's words:
> *"British accent missing on the longer clips."*
>
> **NIA'S VOICE ELEMENT REMAINS `12315c68`. The Lock Card does not change.** `b3d2fc9b`
> is a tested dead end for the accent — like the binding lever in §5a, do not spend on it
> again.
>
> **And row four is the one that matters.** An 18s two-hander DID hold her accent, with
> `12315c68` plus an **audio reference**. So length is not an absolute barrier — the audio
> reference is the lever, and §5a's one-woman-per-generation protocol is now supported by
> the whole table rather than by a single clip.

> **And a note on how this card got re-opened.** On 16 Sep an agent — this one —
> asked the user whether to delete `180fdb9a`, not knowing it was already gone, and
> wrote a section arguing to retain it. That is exactly the relitigating this card
> forbids, and it happened because the agent was on a stale branch and trusted the
> repo over `list_voices`. **Check the account, not the file, for what exists.**

## ⚠️ ATTACHING CHI'S VOICE ELEMENT HAS NEVER ONCE PLAYED IT. THE REVOICE IS WHAT USES IT.

**This is the single most important mechanical fact in this file and three episodes
were built without it being understood.**

`seedance_2_5` binds **exactly ONE** voice element per generation and takes the
lowest-sorting UUID. `12315c68` sorts before `de50f37f`, so **Nia's element is loaded
and ChiChi's is ignored — in every clip of every episode.** Her voice has been
re-improvised by the renderer on every single take. That is the whole reason Nia's
voice is stable and ChiChi's drifts, and no amount of prompt wording changes it.

**So swapping WHICH Chi element sits in the prompt cannot fix her voice, because
neither one is ever used.** That swap was tried anyway and cost the Clip 5 re-shoot
`85d64987`, 135 credits — see §5a.

**`voice_change` runs AFTER the render, so the one-element limit does not apply. It is
the only way to put a saved voice on ChiChi.** 2 credits, 67x cheaper than a re-shoot,
and it cannot re-roll a single frame of approved picture. **When ChiChi's voice is
wrong, REVOICE — never re-shoot.** The recipe, with measured results, is in §5a.

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
5. `180fdb9a` appears NOWHERE in the prompt — it is deleted and points at nothing
6. ChiChi's block order is character → skin → age → hair → VOICE → wardrobe → ring
7. **LANGUAGE, ACCENT and VOICE IDENTITY named separately for every speaker** — see
   THE CHARACTER SPEECH RECORD above. "Her voice tag is present" covers only the third.
8. **If the accent matters in this clip, is there an APPROVED RECORDING to anchor it?**
   0.5 credits of TTS beats discovering the accent is gone in a 162-credit render.

**And if the clip is being shot to fix CHICHI'S VOICE, stop — it is the wrong tool.
Revoice the footage you have. See the banner above.**

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
- **⛔ AND THE RULE ABOVE WAS BROKEN FOR A SCENE THAT ALREADY HAD AN APPROVED LOCKED
  SET. 18 Sep 2026, 117 credits.** N1 C4 was shot in `Dorian-Loft-Entry-v2` `e1997bea`,
  an environment element created that same day to fix a door that had read as a corridor.
  But `Dorian-Loft-Night` `1a162d9b` calls itself **"THE APPROVED LOCKED SET"** in its own
  first line and ends *"ChiChi watches Clip 4 from three steps up this staircase."* **The
  scene already had a set and nobody looked.** The user's verdict on the render: *"it
  doesn't look like the apartment that we showed… we're just doing too much at this
  point."*
  **The damage was done by the new element's WRITE-ONCE TEXT, and three of her four notes
  are clauses in it.** It says *"NO COAT HOOKS OR COAT RACK ON ANY WALL"* — and the master
  geography `d2ab7a6f` had always described that zone as *"the front door, its shoe wall
  and IRON HOOKS."* It says the floor *"starts COMPLETELY BARE"* — so the room rendered
  empty. It describes concrete and a door and nothing else — so the gallery wall, green
  sofa, squiggle table and globe pendant that make the apartment recognisable were never
  attached.
  **This is the phantom-sofa failure running in REVERSE.** That one put four objects into
  a description that its plate never had; this one used a description to DELETE objects
  the room already had. Both are permanent, neither can be edited, and both look equally
  authoritative to the next session.
  **So, two rules. A SCENE IS SHOT IN THE ELEMENT ALREADY APPROVED FOR THAT SCENE —
  check for one before writing a description, because an element's own text will tell you
  which clips it owns.** And **A NEW ENVIRONMENT ELEMENT IS CREATED ONLY WHEN THE USER
  ASKS FOR ONE OR SUPPLIES A REFERENCE FOR IT, NEVER TO SOLVE A PROBLEM IN PROSE.** One
  room in this series now carries five zone elements, a master wide, three door plates and
  a retired entry — more elements than the episode has clips — and every one was created
  to close a question an earlier element left open.
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
- **⛔ A WRITE-ONCE DESCRIPTION CAN CONTAIN AN OBJECT THAT IS NOT IN ITS OWN IMAGE, AND
  THAT PHANTOM IS PERMANENT. CONFIRMED 18 Sep 2026.**
  `Dorian-Kitchen-Night` `de2063f2` describes *"a black leather sofa in the foreground
  right with a black metal coffee table carrying a small potted aloe, on a faded
  patterned rug."* The user checked the plate the description was written from and the
  delivered C3 footage shot in it: **"no black sofa in the plate either."** Four props,
  none of them ever there.
  **This is one step worse than the rule above about re-describing an image.** That
  failure creates a second, weaker spec that can DISAGREE with the picture. This one
  **invents contents the picture never had** — and descriptions cannot be edited, so the
  phantom stays, looking exactly as authoritative as the true clauses beside it.
  **AND IT PROPAGATES INTO RULINGS.** The phantom sofa passed from `de2063f2` into
  `Dorian-Loft-Wide-Night`'s *"EXACTLY THREE SOFAS"*, into the episode file, into
  `locations.md`, and was finally written down as **the user's own ruling of 17 Sep
  2026** — because an agent asked her to choose between three descriptions without ever
  checking one of them against its plate. **She answered the question she was asked; the
  question was built on something that did not exist.** A ruling is only as good as the
  options put to the user, and constructing those options is the agent's job.
  **So: AUDIT EVERY LOCKED DESCRIPTION AGAINST ITS OWN PLATE, and do it before quoting
  the description in a prompt or building a question out of it.** It is free —
  `sandbox_exec` fetches any plate and builds a contact sheet, `media_upload` puts it in
  the user's library, and her eye settles it in one glance. Nothing in this series has
  ever had that check run on it.

- **⛔ AN ELEMENT'S OWN PLATE CANNOT CONFIRM ITS OWN DESCRIPTION. 18 Sep 2026.**
  The user re-uploaded the loft wide with the words *"this is the apartment"*, and an
  agent — this one — wrote that it *"confirms the mezzanine"* and that *"four locked
  elements agree with one photograph."* **Both claims were circular and the second was
  simply false.** The file was `451425a1`, already the media inside
  `Dorian-Loft-Wide-Night` `d2ab7a6f` — a plate GENERATED FROM those four descriptions,
  including a mezzanine the agent had invented to make them agree. A render cannot
  corroborate the prose that produced it; it inherited it.
  **Two habits come out of it.** **Check whether a supplied image is already in the
  workspace before reasoning from it** — the filename carries the media UUID, and one
  `show_reference_elements` call settles it. Building a second element from it would
  have been the competing-element failure below, two elements holding the identical
  image with two descriptions.
  **And the sharper version, which is what actually cost something here: THREE PROSE
  SOURCES AGREEING IS NOT EVIDENCE WHEN NONE OF THEM WAS CHECKED AGAINST THE PICTURE.**
  The three-sofa ruling was reached exactly that way, by reconciling three locked
  descriptions with each other. The user looked at the plate and said **there are two.**
  Reconciling descriptions tells you they are consistent; only the image tells you they
  are true.
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

## 2b. THE APPEARANCE LOCK — WHY THEY READ AS THE SAME TWO REAL PEOPLE

**Source: the user's "Appearance Lock" reference, measured on delivered Episode 3
footage.** Those figures were not re-measured here — Episode 3 is not in this
repo — so they are recorded with their provenance. **None of this is achieved by
asking for "realistic."**

### The render path decides most of it

Sharpness measured as **variance of Laplacian over 10 frames, normalised to
1920x1080 greyscale**:

| render path | sharpness |
|---|---|
| **text-to-video, no start frame** | **50 – 67** |
| seeded from the previous clip's last frame | 24 – 29 |

**More than double the fine detail purely from not seeding**, on the same prompt,
same elements, same faces. Approved Episode 2 Clip 2 benchmarks at **47.5**. Below
about **30** an audience reads mush and faces stop holding up on a television.

**A seeded chain compounds** — every generation inherits the losses of the one
before it, and nobody catches it by eye until it is several generations deep.
Write the entry state into PROSE (section 4a) instead of feeding the last frame.

### The parameters, passed explicitly every time

| parameter | value | why |
|---|---|---|
| `bitrate_mode` | `"high"` | pass it explicitly, never rely on the default |
| `quality` | **DO NOT SEND IT** | it displaces the default and **silently drops the bitrate** |
| `resolution` | `"1080p"` | no wording recovers a missing pixel count |
| `start_image` | none | see the table above |

**Measure sharpness after every clip and say the number out loud, the same as a
credit cost.**

### The block order is part of the recipe and does not move

`character -> skin -> age -> hair -> VOICE -> wardrobe -> jewellery`

**Identity lives in the element, never in the description.** Never write a face
description INSTEAD of the tag — write it ALONGSIDE the tag, in that order.

### Stating her age is what invites the age markers, so negate them BY NAME

This is section 5's "name the exact wrong answer" applied to the thing an audience
judges first. **NO** wrinkles · **NO** fine lines · **NO** crow's feet · **NO**
forehead lines · **NO** nasolabial creases · **NO** sagging · **NO** crepey or
papery texture · **NO** age spots · **NO** dullness · **NO** sallowness · **NO**
under-eye shadows · **NO** hollowing.

**Her age reads in her composure, never in her skin.**

### Photograph the moment, do not describe a person

Reverse-engineered from the Episode 2 drink frame. Five things, none of which is
the word "photorealistic":

1. **Movement** — she is MID-ACTION, caught, not posed. An interrupted movement is
   the strongest beat available to a still character and to a still image alike.
2. **Hands** — both have a job. Idle unspecified hands are where anatomy errors
   appear.
3. **Light** — a named DIRECTION and a FALLOFF. "Well lit" produces flat
   television; "warm key from one side, the wall going down into shadow behind
   her" produces a photograph.
4. **Materials** — named one by one. Leather with sheen and creases at the elbow,
   glitter on the clutch, amber liquid refracting through heavy glass. **A
   material named is a material rendered.**
5. **Depth** — shallow, and STATED. If it is not written it does not happen.

### Audit the prose against approved frames

**Prose written blind drifts**, and a description that disagrees with approved
footage pulls the next take away from the look already won. The prompt said
ChiChi wears "a FINE GOLD CHAIN, delicate and simple"; the approved footage shows
a **BOLD CHUNKY GOLD LINK CHAIN**, and nobody caught it until a frame was
supplied. **Every time a frame is approved, read the prompt back against it and
correct what does not match** — wardrobe, jewellery, cup levels, props on the
table.

### There is a character ceiling and prompts here run close to it

**19,554 characters is the proven ceiling. At 19,940 a two-word line stopped
rendering altogether.** Episode 2 shipped Clip 5 at 19,079 and Clip 6 at 19,064 —
inside the limit with under 500 characters of headroom, and with nobody aware a
limit existed. **Appearance blocks are the easiest place to bloat: when something
must be added, DELETE something else rather than growing past it.** Put the
dialogue block at the very top.

### BEFORE YOU SUBMIT — run this list and say each result out loud

| # | check | why |
|---|---|---|
| 1 | `bitrate_mode: "high"` **is in the params** | explicitly; never rely on the default |
| 2 | **no `quality` field is present** | it displaces the default and drops the bitrate silently |
| 3 | **no `start_image`** | unless the shot genuinely cannot carry its entry state in prose |
| 4 | **both voice tags present for whoever speaks** | Nia `12315c68` · ChiChi `de50f37f` |
| 5 | **ChiChi's block order intact** | character → skin → age → hair → VOICE → wardrobe → jewellery |
| 6 | **prompt is at or under 19,554 characters** | dialogue block at the very top |
| 7 | **prose checked against the last approved frame** | wardrobe, jewellery, cup levels, props on the table |
| 8 | **whole prompt read start to finish** | grep every number and every negation you changed |

> **ITEM 4 WAS SETTLED BY THE USER ON 16 SEP 2026: use `de50f37f`.** It had been
> `180fdb9a` for Episodes 1 and 2, and section 5a previously forbade the swap. The
> ruling supersedes that; 5a now carries the reasoning and the history. **The prose
> around the tag is unchanged and still must not be reworded.**

---

## 3. THE CONTINUITY LEDGER

Every recurring character needs all ten of these locked, in the element
description and repeated in every prompt. Anything not pinned explicitly will be
re-rolled on the next take.

| | What to lock |
|---|---|
| **Face** | Identity, apparent age, complexion, facial geometry, dental identity, head-to-body scale |
| **Figure** | Bust, waist AND hips stated SPECIFICALLY, per character, plus the wrong builds negated — **never "natural body proportions"**, which is a generic that re-rolls every take. Both women are hourglasses; only the fullness differs |
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

### ChiChi's hair is HONEY-BLONDE — ruled by the user, 16 Sep 2026

**Honey-blonde shoulder-length layered blowout with darker roots**, as §5a's pinned
block says and has always said. That block stays byte-identical.

**A competing element exists and must NEVER be used: `ChiChi-Series-Look`
`bc1bd310-582b-4694-abde-1fb72f0de1f8`** describes a rich-dark-brown, almost-black
look and claims **in its own description text** to be her "current locked series
look" which "supersedes the older honey-blonde ChiChi elements." **It does not and
never did.** Element descriptions cannot be edited or deleted from the workspace, so
that text will keep looking authoritative to any session that lists elements. This
is section 2's competing-element failure except this one argues for itself.

**Her face and hair come from `ChiChi-the-Influencer` `8a8e8eeb` and the pinned
block. Nothing else, whatever another element's description claims about itself.**

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
  nothing on the fourth finger of her left hand.

  > ### ⛔ THE RING HAS NOW BEATEN THE STRONGEST NEGATION IN THIS FILE. STOP ESCALATING WORDS.
  >
  > **Episode 2 and the N1 8-second test `c9976b46` both put a wedding ring on her
  > while carrying section 5's named-object wording in full** — "NO wedding ring, NO
  > engagement ring, NO band of any kind on any finger of either hand, and
  > specifically NOTHING ON THE FOURTH FINGER OF HER LEFT HAND — that finger is bare
  > skin," plus every material named and negated. **That is the maximum this file has.
  > It failed.** Writing it harder is not a plan; this is the music-swell lesson in
  > section 6 repeating on a different axis.
  >
  > **The remaining hypothesis is that the ring is IN A REFERENCE IMAGE, and an image
  > beats text every time.** Element descriptions are not the variable — `ChiChi-
  > Caterer-Look` carries "NO rings" and Episode 2 still produced one, while
  > `ChiChi-Ep1-Look` `f2c3a3c5` carries no jewellery rule at all and produced one
  > too. Same outcome with and without the rule, which points away from the text.
  >
  > **Check the plates before writing another prompt.** The two that supply her hands:
  > `ChiChi-the-Influencer` `8a8e8eeb` (face/identity) and whichever wardrobe element
  > the episode uses. If either shows a hand wearing a ring, **no wording will ever
  > remove it** and the fix is a corrected plate, not a stronger sentence.
  >
  > **Until it is diagnosed, the cheap mitigation is framing:** give her left hand a
  > job that conceals the fourth finger, or keep that hand out of frame. Section 3
  > already says hands must have a job — this is that rule paying for itself.
  >
  > **AND THE RING CAN BE ERASED AFTER THE FACT — `hf_mult_replace_object`
  > (Genjutsu), 81 CREDITS, preflighted 16 Sep 2026.** It routes through
  > `generate_video` and runs on a FINISHED clip, so like `voice_change` it cannot
  > re-roll picture, wardrobe, faces or voices — the thing that makes a re-shoot
  > so expensive. Two mechanics worth knowing before you call it: `get_cost`
  > **requires a source clip** (`medias: [{value: <job_id>, role: "video"}]`) and
  > returns 422 without one, and the role auto-coerces to `video_references`.
  > **It priced an 8s and an 18s request identically at 81**, so it bills off the
  > SOURCE clip's own length, not the `duration` parameter — 81 is the figure for
  > an ~8s source and a longer clip cannot be preflighted until it exists.
  > **Untested on this series.** Framing costs nothing and should be used wherever
  > the staging allows it; keep the 81 for a shot that genuinely needs her hand in
  > frame. This is not only continuity: she
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

### ⛔ DORIAN NEVER HOLDS A CUP — ruled by the user, 18 Sep 2026

> *"If Dorian is again in any images, the cup in Dorian's hand has to be removed."*

**Both his hands are EMPTY in every shot, in every episode, from now on.** NO cup, NO
mug, NO glass, NO tumbler, NO whiskey glass, NO wine glass, NO bottle, NO can, NO paper
cup, NO travel cup. Negate them by name per §5 — "unhurried, drink in hand" is the exact
kind of generic that a strong prior fills in for you.

**This overrules the scripts and the element text, both of which give him one.** N1 C2's
slugline says *"Dorian across the room, tumbler, unhurried"*; "The Caterer" says *"Dorian
crosses to meet them, unhurried, whiskey in hand."* Those are now SUPERSEDED. Delivered
prompts keep their wording as a record of what was shot (§8), but **no new prompt gives
him anything to hold.**

**And §3's hands rule still applies, so give him a job instead of a prop.** "Hands must
have a job" was written because idle unspecified hands are where anatomy errors appear —
removing the glass does not mean leaving his hands unwritten. A hand in a pocket, a hand
on the back of a chair, a sleeve being pushed up. Never a drink.

**If a cup appears in a reference image, that image is the cause and no wording will fix
it** — §2b's ring lesson. `hf_mult_replace_object` (Genjutsu) removes an object from a
FINISHED clip for ~81 credits on an ~8s source; use that rather than re-shooting, and
prefer framing the hand out in the first place.

### THE TWO FIGURES — BOTH HOURGLASSES — ruled by the user, 16 Sep 2026

Three notes in one day, off the N1 8-second test `c9976b46`:

> **"Nia is a bit more slimmer at the waist with a slightly fuller chest."**
> **"Nia does have wider hips."**
> **"ChiChi is full figured but hourglass too."**

**Both women are hourglasses. The difference between them is SCALE, never SHAPE.**
Each has a full bust, a waist that clearly comes in and wide full hips; ChiChi is
simply fuller than Nia at every point. Write the same shape for both and change
only the fullness.

| | |
|---|---|
| **NIA** | slim narrow waist · slightly fuller chest · wide full hips · healthy and toned at thirty |
| **CHICHI** | full-figured AND an hourglass · fuller than Nia at bust, waist and hips alike |

**Negate BOTH directions, and for both women.** Never straight up and down, never
boxy or rectangular through the middle, never a thick or undefined waist, never
apple-shaped, never all one width from shoulder to hip — and equally never narrow,
flat, straight or boyish through the hips. For Nia also: never gaunt, skeletal,
flat-chested or cartoonish.

**⚠️ "never full-figured" is NOT a safe negation and was removed from Nia's block.**
It was in the first draft, reaching for her waist — and it is wrong twice over.
*Full-figured* is a WHOLE-BODY term, so it pulls against the hips in the same breath
as asking for them; and it is **ChiChi's own word**, so negating it on one woman
attacks the other's spec. **A negation aimed at one part of a body lands on all of
it, and a negation aimed at one character can land on the other.** State the
contrast as a contrast: *both are hourglasses, ChiChi is the fuller of the two.*

**"Full-figured" and "hourglass" are not alternatives** — that was the error in the
first version of this section, which set them against each other. ChiChi is both.
Reading full-figured as "straight through the middle" is exactly the render fault
this block exists to stop.

**The two women must never converge.** A prompt that describes one figure and not
the other lets the model average them — and now that they share a shape, the only
thing keeping them apart is that each one's fullness is written down. Nia is never
rendered at ChiChi's fullness.

**Why this re-rolled for three episodes: Nia never had a figure spec and ChiChi
half had one.** ChiChi's element carries "realistic full-figured proportions" —
scale but not shape — and every prompt of hers carries "the clothing adapts to her
body, her body never shrinks to fit the clothing." Nia's element carries
**"natural body proportions"**, which is section 5's generic negation failure
wearing a positive coat. *Natural* is not a specification; it is whatever the model
already believes, so it re-rolls every take.

**Element descriptions are write-once, so neither `bcd528d3` nor `8a8e8eeb` can be
corrected — the figure spec lives in the PROMPT and in the episode file.** Nia's
sits in her identity block alongside her tag. **ChiChi's goes AFTER her ring block**,
so that section 5a's pinned order — character → skin → age → hair → VOICE →
wardrobe → ring — keeps every one of its seven blocks in place and untouched.
Mirror ChiChi's clothing sentence for both: the garment adapts to the figure, never
the figure to the garment.

**The white dress element `91da557d` is confirmed correct** in the same note —
"the white dress read right" — so the wardrobe wording is approved and, per
section 5, is not to be reworded.

### THE THREE HEIGHTS — ruled by the user, 18 Sep 2026

> **"Chi is taller than Nia by 2 inches."**

| | height |
|---|---|
| **CHICHI** | **two inches taller than Nia** — the tallest of the three women |
| **NIA** | the reference height |
| **SIMONE** | **the same height as Nia** barefoot; a few centimetres taller in heels |

**State it as a COMPARISON, never as a number in centimetres.** A model cannot render
"168 cm"; it can render "her head reaches the other woman's eyebrows." Pin every height to
another body or to a named object in frame — the sofa back at the hip, the pendant clearly
above the head — which is what finally fixed Simone reading as tall as a door.

**⚠️ THIS WAS MISSING ENTIRELY AND THAT IS WHY IT DRIFTED.** N1 C5 pinned Simone to Nia
and said NOTHING about ChiChi's height, so there was no spec to hold — §3's whole point
about "natural body proportions" applied to stature instead of shape. **Any prompt with
two or more women in frame states their heights relative to each other.**

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
- **⚠️ THE START_IMAGE CHAIN DEGRADES THE PICTURE, GENERATION BY GENERATION, AND IT
  COMPOUNDS. MEASURED ON EPISODE 3, 15 Sep 2026.** Seeding clip N+1 with a still cut
  from clip N's output means every clip inherits the losses of every clip before it.
  Sharpness is variance-of-Laplacian on 10 frames, normalised to 1920x1080 gray:

  | Clip | seeded by | seed sharpness | clip Mbps | clip sharpness |
  |---|---|---|---|---|
  | 1 `faeb10ca` ✅ | none — t2v | — | 12.74 | 37.0 |
  | 2 `fc416b16` ✅ | none — t2v | — | 11.08 | **47.5** |
  | 3 `1d04f4bd` ✅ | JPEG of Clip 2's last frame | 45 | 9.11 | 36.0 |
  | 4 `dd63298f` ✅ | JPEG of Clip 3's last frame | 31 | 8.76 | 29.0 |
  | 5v2 `85d64987` ❌ | JPEG of Clip 4's last frame | 23 | 7.69 | **24.1** |

  **Clip 5 has HALF the fine detail of Clip 2**, and the user asked "why does the
  picture look blurry" only at Clip 5 — three clips after the slide began. The two
  clips in the middle were approved while it was happening. **Nobody will catch this
  by eye until it is already several generations deep, so MEASURE IT after every
  seeded clip.**

  **Two corrections to the bitrate story in §5a and §7 follow from this.** The fall
  from 11.08 to 7.69 Mbps across Clips 2→5 is **a SYMPTOM, not a cause**: the encoder
  spends fewer bits because there is less detail left to encode. `bitrate_mode: high`
  was working the whole time. Clip 5 v1's collapse to **1.55 Mbps** was a genuinely
  different event — that one was the `quality` parameter, and 7.3x is a different
  order of magnitude from this drift. **Do not read a modest bitrate fall as a
  parameter fault; check the sharpness first.**

  Where the loss actually happens: the RENDER is the bigger term, not the JPEG.
  Clip 2 renders at 47.5 and its seed JPEG reads 45 (−5%), then Clip 3 renders at 36
  (−20% against its own seed). **The JPEG costs about a fifth of the loss and the
  re-generation costs the rest**, so a lossless seed helps but does not fix it.

  **✅ PROVEN FIX, 15 Sep 2026: DROPPING THE START_IMAGE RESTORES THE PICTURE COMPLETELY.**
  Episode 3 Clip 5 was re-shot as pure t2v, job `fba2cfc5`, 135 credits — same prompt,
  same elements, same `bitrate_mode: high`, the ONLY change being that no `start_image`
  was passed and the entry state was written into the prose instead.

  | | Mbps | sharpness |
  |---|---|---|
  | approved Clip 2 (t2v) | 11.08 | 47.5 |
  | Clip 5 seeded from a JPEG | 7.69 | **24.1** |
  | **Clip 5 re-shot as t2v** | 9.39 | **49.5** |

  **49.5 is the sharpest clip in the episode — above Clip 2 — and slightly more than
  DOUBLE the seeded version.** The bands do not overlap (48–52 against 23–25). That is
  the whole hypothesis confirmed in one generation: the chain was the entire cause, and
  there is no residual "1080p that is not 1080p" once it is broken.

  **What it costs, and it is the real trade.** The start_image was silently carrying
  continuity the prose never stated. Episode 3's delivered prompts all say Nia is
  "ring-free" and ChiChi wears "NO necklace" — and the approved footage has a ring and
  a necklace, because the seed frame was overruling the text. Going t2v makes the PROSE
  the only authority, so **anything the seed was carrying has to be written in or it
  disappears**: seating and which chair, who sits screen left, cup levels, jewellery,
  props on the table. Audit the last approved frame's contents against the prompt before
  dropping the seed, and expect to add ~1,000 characters of entry state.

  What to do, in order:
  1. **SHOOT IT t2v — no `start_image` at all — whenever the shot can carry its own
     entry state in prose.** Proven above. A locked two-shot of seated people is the
     easy case: nobody moves, so there is almost nothing for a seed to carry that a
     paragraph cannot.
  2. **DO NOT CHAIN. This is the real fix and §4a already argued for it on a
     different ground.** `seedance_2_5` runs to 30 seconds and bills linearly, so
     merging clips costs nothing extra AND removes a link from the chain. Episode 3's
     Clips 3–6 are 12+15+15+15 = 57s — two generations instead of four, and the chain
     goes from four links to one.
  3. **When you must seed, seed as PNG, never JPEG.** `ffmpeg -sseof -0.15 -i clipN.mp4
     -frames:v 1 frame.png`. The JPEGs used in Episode 3 were ffmpeg's default mjpeg
     quality — 167–216 KB at 1080p — and that is a lossy step taken for free.
  4. **Seed from the SHARPEST available source, not the most recent one.** A still from
     Clip 2 is 47.5; a still from Clip 4 is 23. If the action allows it, reach back.
  5. **Measure every seeded clip against the first clip of the episode** and say the
     number out loud, the same as a credit cost.

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

### THE VOICE ID CHANGED — 15 Sep 2026 — AND THE CHANGE BROKE HER. SEE THE LOCK CARD.

**`ChiChi-Canon-Voice-v1` `de50f37f` was adopted as Chi's voice element on the
strength of a 1-credit TTS render the user approved, and `ChiChi-the-Influencer-Voice`
`180fdb9a` was deleted from the account.** Confirmed gone via `list_voices`: only
`de50f37f` and Nia's `12315c68` remain, one slot free.

> **⛔ THE SWAP IS THE CAUSE OF THE CLIP 5 RE-SHOOT FAILURE, `85d64987`, 135 credits.**
> An agent — this one — told the user the swap was "exactly ONE variable" and therefore
> safe. **That variable was the only difference between the re-shoot and every clip
> whose Chi the user approved**, and the re-shoot's Chi was rejected. A field-by-field
> audit of all seven delivered prompts shows everything else matched approved Clips 3
> and 4: same opener, same block order, ChiChi's voice line at the same 38% depth, no
> camera block, `bitrate_mode: high`, same length band, same element list otherwise.
>
> **A voice element attached to a render is NOT inert just because a different element
> "binds".** Swapping `180fdb9a` for `de50f37f` moved BOTH women down — Chi 160.0 →
> 148.1 Hz, Nia 205.1 → 178.8 Hz, gap 45.1 → 30.6 Hz. The pool colours the render.
>
> **Approving an element by TTS does NOT approve it for a render.** The user approved
> what `de50f37f` sounds like when it is PLAYED BACK on its own. In a seedance
> two-hander it is never played back — it is an input, and as an input it produces a
> different Chi. Those are two different questions and this file conflated them, which
> is the same conflation §5a already records for `voice_change`.

**The reword itself was still the one this file permits** — exactly one variable, the
UUID, every other character of both pinned blocks untouched and in the same position
in the block order (character → skin → age → hair → VOICE → wardrobe → ring). **The
lesson is not about the wording. It is that "one variable" is not a synonym for
"safe" when that variable is present in every approved result.** Section 7's
"one variable per take" tells you how to CHANGE something; it never said the change
was free. Flag a swap away from an approved input as the risk it is, and let the
user decide before the render, not after.

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
Chi's voice.** ⛔ **THAT RECOMMENDATION WAS WRONG AND IT COST THE CLIP 5 RE-SHOOT.**
The numbers above are accurate — `180fdb9a` really does sound like a 219 Hz stranger
when you play it back. But it was never played back in a render, and the four clips
whose Chi the user approved all had it attached. **What an element sounds like alone
tells you nothing about what it contributes as an input.** See the Lock Card.

**The method is worth keeping for ONE question only: what does this element sound like
on its own?** Two TTS renders of the same words, 1 credit each, against a known-good
line from approved footage. **It does NOT answer "should this element be in the
prompt", and it must never be used to justify removing one.** `180fdb9a` had been in
every prompt of three episodes and nobody had ever listened to it on its own — and it
turned out that not sounding like her was not a reason to take it out.

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

**What it is for.** Since the ruling of 16 Sep 2026 it is also **the tag in her
pinned prompt block**. Beyond that: TTS, any non-seedance model, and the restore
point if the synthesized voice ever drifts. Chi is portable now.

**SUPERSEDED 15 Sep 2026.** This paragraph used to call `de50f37f` a post-production
asset that must never go into a seedance prompt. `180fdb9a` has been deleted, so
`de50f37f` became the tag in the one new prompt that was shot after the swap, and
**that clip's Chi was rejected — see the Lock Card. Which Chi element goes in a
prompt is now an open question for the user, not a settled fact.** **The mechanism
survives, the instruction does not:** seedance still binds ONE voice element per generation and
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

### ✅ THERE IS A SECOND VOICE POOL AND THIS FILE HAD NEVER LOOKED AT IT — 18 Sep 2026

**`list_voices` returns `voice_type: "element"` AND `voice_type: "preset"`.** Every
voice argument in three episodes of this project has been an element, and the slot-limit
section below — *"you cannot just clone another character"* — was answering a question
that has a free answer.

| | elements | presets |
|---|---|---|
| how many | **3, and the cap is 3** | **dozens**, paginated, costing no slot |
| `<<<tagged>>>` in a seedance prompt | yes | **NO — they are not reference elements** |
| enters the lowest-UUID binding sort | yes | **no** |
| free `preview_url` | yes | **yes** |
| `generate_audio` TTS · `voice_change` | yes | **yes** |

**That a preset CANNOT go in a prompt is what makes it safe, not what makes it
useless.** It is an audio-layer asset by construction — which is exactly where the
corrected workflow puts voice repair. Adding a new character a voice this way **cannot
displace Nia's `12315c68` in the binding sort**, so it cannot cost Nia or ChiChi theirs.
That is the whole reason the three-slot cap was frightening, and it does not apply here.

**Use it for NEW characters — Simone, Kel, Dorian.** §5a already reasoned that a cloned
male element *"will almost certainly be ignored the same way unless its UUID happens to
sort below hers"*, and concluded the men need the prose-recipe treatment. **A preset is
the better answer**: a real asset, no slot, no sort, free to audition.

⛔ **This does NOT reopen Nia or ChiChi.** The Lock Card settles both, a preset cannot be
attached to a render at all, and §5a's whole history is agents relitigating settled
voices. Do not propose swapping either woman onto a preset.

**And the rule that governs it is the one already written: LISTEN BEFORE YOU BUILD.**
Three episodes of prompts were built around a voice element nobody had ever played. The
previews are free and the user's ear is the only instrument — audition, let her choose,
write the id down in the episode file.

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
voice. `de50f37f` was approved by ear as a TTS PLAYBACK; as a render input it has
produced a Chi the user rejected twice. Neither element is disposable and neither is
currently proven — see the Lock Card.

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

**⛔ NOT RESOLVED — REOPENED 15 Sep 2026 after the Clip 5 re-shoot.** This section
once read "RESOLVED: `de50f37f` is approved and is now Chi's element", on the grounds
that the condition it set — "unproven until the user has approved something made from
it" — was met by a 1-credit TTS render the user listened to and adopted. **That was
too weak a test and the section's own condition was the right one.** A TTS playback is
not "something made from it" in the sense that matters: the only artefact that counts
is a SEEDANCE RENDER with the element attached, and the two that exist (`85d64987`
and `a91ed33b`) were both rejected. **Read the
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

### ✅ THE REVOICE THAT WORKED — Ep3 Clip 5, 2 credits, job `16a6563f`

**This is the procedure. It is cheap, it is repeatable, and it is the only thing that
has ever put ChiChi's saved element onto ChiChi.**

The user rejected the 135-credit re-shoot `85d64987` for Chi's voice and then ruled:
*"The voice for Chi is literally ChiChi Canon voice V1."* One `voice_change` pass
delivered exactly that:

| | median f0 | vs approved Clip 2 |
|---|---|---|
| **ChiChi — approved Clip 2 `fc416b16`** | **158.4 Hz** | — |
| ChiChi — re-shoot `85d64987`, rejected | 146.8 Hz | 11.6 Hz low |
| **ChiChi — revoiced with `de50f37f`** | **158.4 Hz** | **exact** |

**Timing survives**: 15.042s against the original 15.050s, 8ms, so the original line
timestamps still locate every splice point. All seven lines intact in the transcript.

#### The recipe

1. **Revoice ONE speaker only if only one is wrong.** Nia was right in this take, so
   she was left completely untouched — one variable, per §7. `voice_change` with
   `video_id` = the completed job, `voice_id` = `de50f37f`, `voice_type` = `"element"`.
2. **Transcribe the ORIGINAL with word timestamps** and list the wrong speaker's
   segments. Chi's in Clip 5: 1.72–1.96, 11.30–11.48, 11.86–12.26, 13.10–14.76.
3. **Put every splice boundary inside a silent gap**, and merge adjacent segments of
   the same speaker into ONE region rather than splicing each line. Clip 5 became two
   regions: 1.43→2.15 and 11.27→14.85.
4. **STOP THE LAST REGION BEFORE THE TAIL.** The revoice strips the room, so ending at
   14.85 rather than 15.05 lets the ORIGINAL's ambience carry the final hold. A
   revoiced tail sounds dead.
5. **Level-match on the revoiced speaker's own speech, not on the whole file.** Measure
   RMS over her segments in both and apply the ratio to the revoice before splicing.
   Clip 5 needed **+4.65 dB** (x1.708). §5a's "6.3 dB down" is a ballpark — measure it.
6. **30ms equal-power crossfade at each edge**, then mux onto the original video with
   `-c:v copy`. Zero credits, and not one frame of picture is touched.

**A 60ms gap is spliceable.** Nia's "…Chi—" ends at 11.24 and Chi's "No." starts at
11.30; the boundary went at 11.27 with a 30ms fade and holds.

**`media_upload` -> PUT -> `media_confirm` puts the result in the user's library** so
she can play it. Chain the `curl -X PUT` into the SAME `sandbox_exec` call that builds
the file — the sandbox is discarded seconds after the command exits.

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

### 🧪 AUDIO REFERENCES — ONE RESULT, NOT A WORKFLOW. 16 Sep 2026, job `51783a9e`

**`seedance_2_5` declares an `audio_references` media role that three episodes had
never used.** Nia's saved voice was fed in as audio, on the exact prompt that produced
the clip the user called best.

**What happened, stated no wider than the evidence:** the user reported *"Nia has her
correct voice"* and *"Chi's voice is the same but British"* — Nia came out right, and
ChiChi kept her own voice while picking up Nia's accent. **One clip. One pair of
outcomes.**

**What that licenses:** a hypothesis worth testing — that a voice input is not bound
to a character, so it improves the voice it is given and bleeds onto everyone else in
the generation, and that **separating each woman's dialogue into her own generation**
may therefore hold both voices.

**What it does NOT establish**, and an earlier version of this section claimed all
four:
- ❌ not that voices will be consistent — one success is one success
- ❌ not that clip length is unrestricted
- ❌ not that the cost is the same — separate shots change the number of generations,
  retries and editing steps, and none of that has been measured
- ❌ not that it "dissolves" the attribution, identity-swap or drift failures

**The user's correction, and it is the standard for this section: one good Nia clip
confirms that one clip worked. Repeated successes for BOTH women establish a usable
workflow.** Nothing here gets promoted from hypothesis to method without that.

### 🔑 AUDIO-FIRST — APPROVE THE SPEECH, THEN BUILD THE VIDEO AROUND IT

**The user's ruling, 17 Sep 2026, and it reverses the order this project has always
worked in.** Every episode so far has generated picture-and-sound together and then
judged the voice afterwards. That is why three episodes of accent failures cost
hundreds of credits each to discover.

> *"Nia's approved British audio is the anchor. Repeatedly adding 'British accent' to
> a long two-person prompt gives you less control than preserving speech you have
> already approved."*

**`seed_audio` TTS with her element costs 0.5 CREDITS** — preflighted 17 Sep 2026,
`voice_type: "element"`, `voice_id: 12315c68`. **That is 324x cheaper than the 162-credit
18s render that answers the same question.** Hear the line before you shoot it.

1. **Generate the line as TTS with that character's element.** 0.5 credits.
2. **The user listens and approves it.** Accent, identity, pacing. No render yet.
3. **Keep the approved file.** It is the dialogue track for the episode, not a test.
4. **Build the video around it**, one woman per generation, her reference attached.
5. **If the render alters the voice, RESTORE THE APPROVED RECORDING** over the picture
   and handle lip-sync as its own step. Do not re-shoot to chase a voice.

### ✅ PROVEN 17 Sep 2026 — TTS PRODUCES A BRITISH NIA. 0.5 CREDITS. job `91cb6ab8`

**The first time in this project that a named accent has been produced on demand and
approved by the user.** `seed_audio`, `voice_type: "element"`, `voice_id: 12315c68`, on
REAL episode dialogue — C1 line 5, *"Good. Because Kel asked if you were coming."*,
chosen because *asked* is the BATH vowel and the clearest British/American split in
her lines. The user's verdict: **"So, it was in a British accent."**

| path | element | British? |
|---|---|---|
| **TTS `seed_audio`** | `12315c68` | **✅** |
| element preview, played back | `12315c68` | ✅ |
| seedance 18s two-hander | `12315c68` | ❌ |
| seedance 18s two-hander | `b3d2fc9b` | ❌ |
| seedance 18s two-hander **+ audio reference** | `12315c68` | ✅ |

**PLAYED, her element is British. RE-PERFORMED by a seedance two-hander, the accent
dies.** §5a already recorded that "her element binds, but the render re-performs it" —
this is the confirmation that **the re-performance is where the accent is lost**, not
the element, not the prompt wording, and not the length in itself.

**File: 4.80s, 24kHz stereo PCM, peak −4.2 dBFS, zero clipped samples.**
Library media id `0b85af96-e401-4b71-be8e-d8f448b9de01`.

### ⚠️ TWO THINGS THE APPROVAL DOES NOT COVER, BOTH MEASURED ON THAT FILE

**1. TTS RUNS AT HALF THE PACE OF A RENDER, AND THAT RESIZES EVERY CLIP.**
8 words in 4.78s = **1.7 words/second**, against §6's measured **3.4 w/s** in renders.
If an approved TTS track becomes the dialogue master, the CLIP gets sized to the AUDIO
— §6's own "fix pacing with the container" — and the container roughly doubles:

| | words | at render pace 3.4 w/s | at TTS pace 1.7 w/s |
|---|---|---|---|
| C1's full script | 41 | ~12s speech → shot at 18s, **162 cr** | ~24s speech + boundaries ≈ **28s, ~252 cr** |

**`seed_audio` has a `speech_rate` parameter, −50 to +100, default 0.**
**✅ TESTED 17 Sep 2026, job `445011d0`, 0.3 credits: `speech_rate: 50` lands TTS on
render pace almost exactly.** Same element, same line, only the rate changed:

| | rate 0 | **rate +50** |
|---|---|---|
| duration | 4.80s | **2.66s** |
| words/second | 1.67 | **3.48** — against 3.42 measured in renders |
| peak / clipping | −4.2 dBFS / 0 | −5.1 dBFS / **0** |
| f0 median | 192.8 Hz | 186.0 Hz (her element reads 183.9) |
| transcript | "good because **Cal** asked…" | "Good. Because **Kel** asked…" |

**So the container does NOT have to grow.** At +50 an approved TTS track fits the clip
lengths already planned — C1 stays ~18s and ~162 credits rather than ~28s and ~252.
No clipping, and the pitch moved slightly TOWARD her element rather than away.

**`generate_audio` BILLS BY OUTPUT LENGTH, NOT PER REQUEST** — the same line preflighted
at 0.5 credits at rate 0 and **0.3 at +50**, because the file is shorter. Preflight each
rate rather than assuming one figure.

**Settle the rate BEFORE recording an episode's dialogue**, because every clip length and
every credit estimate downstream depends on it. Do not discover it after the track is
approved.

**2. "KEL" TRANSCRIBED AS "CAL" AT RATE 0 — AND AS "KEL" AT +50.** §7's rule cuts both
ways here: writing a DIFFERENT word carries real signal, but writing the RIGHT word
proves nothing. So the +50 transcript **softens the flag without resolving it**, and it
is still the user's ear that settles whether his name reads. If it does not, phonetic
spelling goes in every prompt, exactly as "jollof" did.

**⚠️ AN AUDIO REFERENCE IS NOT A GUARANTEE.** The user's words: it "should not be
treated as a guarantee that the output preserves the recording exactly." `51783a9e`
is the proof in both directions — it fixed Nia and it bled her accent onto ChiChi.
**Attaching a recording steers the render; it does not play the recording.**

### ⛔ THIS SUPERSEDES "AN ACCENT FAULT IS A RENDER FAULT. ONLY A RE-SHOOT FIXES IT."

That line is above, under `voice_change`, and **the mechanism it describes is still
true**: a revoice rides on the render's own articulation, so it can swap timbre and
never pronunciation. **The conclusion drawn from it was too narrow.** A re-shoot is
not the only fix — it was only the only fix *within* the revoice framing. **Replacing
the whole dialogue track with an approved recording is not a revoice**, inherits no
articulation from the bad render, and costs no re-roll of picture, wardrobe or faces.

**So when an accent is wrong: restore the approved audio. Never re-shoot.** That is
the same move §5a already makes for ChiChi's voice, one level up — and the C1 v2
result is what proves a re-shoot does not recover it.

### THE TEST PROTOCOL — run this before rebuilding any episode

The user's workflow, 16 Sep 2026, now sitting UNDER the audio-first rule above. Do not
skip to step 4.

1. **Build a clean reference for each woman.** Only her voice, the intended accent,
   natural delivery. No music, no second speaker, no room tone from a scene.
   ### ✅ STEP 1 IS DONE — the user listened, 17 Sep 2026
   > **"Nia sounds british"** · **"Chi sounds American"**

   | | element | accent, confirmed BY EAR | matches spec? |
   |---|---|---|---|
   | **NIA** | `Nia-voice-v2-clear` `12315c68` | **British** | ✅ |
   | **CHI** | `ChiChi-Canon-Voice-v1` `de50f37f` | **American** | ✅ — the pinned block asks for "mid-to-low General American" |

   **These are the two references. Do not substitute either one.** The full
   inspection — durations, usable timestamps, noise floors, what could and could
   not be measured — is in `exclusive/voice-reference-audit.md`.

   **What it eliminates, and nothing more: Nia's reference IS British.** So "the
   reference is not British" is ruled out as the cause of the missing accent in
   Episode 1 Clip 1 — the accent is present in the input and absent in the output,
   which puts the loss in the RENDER PATH, not the source asset. That is an
   elimination, not a diagnosis, and it does not promote the audio-reference
   hypothesis. Step 2 still has to be run.

   **And the bleed is now a SPEC VIOLATION, not just an oddity.** The pinned ChiChi
   block says *"never a British accent"*, and clip `51783a9e` put one on her. With
   both references confirmed correct, that is a known-good input breaking a written
   character rule — which is the case for one woman per generation.

   **A note on how this was settled, because it is the pattern to repeat.**
   `list_voices` gives every element a `preview_url` for FREE. Three episodes of
   prompts were built around voice elements nobody had ever listened to. The entire
   accent question — unanswerable by f0, LTAS, noise floor or duration — took one
   free tool call and the user's ear. **Listen to an element before you build on it.**
2. **Two short tests per woman, on DIFFERENT lines.** Hold the seedance version, every
   setting and her reference constant across all four. **Include a line where the
   accent difference is easy to hear.**
3. **One visible speaking character per test, with only her audio reference attached.**
   Check four things, not one: voice identity, accent, pacing, lip-sync.
4. **Only if both women hold across those tests**, build dialogue scenes from
   individual shots, reaction shots and cuts between speakers.
5. **Keep the approved audio files.** If a later visual revision changes a voice,
   restore the approved dialogue track rather than re-rolling the voice, and use a
   separate lip-sync step where one is needed.

**For scenes where both women must speak on screen together**, the controlled approach
is the same: create and approve each woman's dialogue separately, then assemble the
scene around those recordings.

**One mechanical note for whoever runs this:** the server coerced the role
`audio_references` into `reference_images` in the returned payload. The audio clearly
reached the render, but do not assume the role name is honoured as sent — check the
payload.

### What it cost to get here, and the process lesson

Episode 1 Clip 1 was shot at 18s for 162 credits and came back with Nia's accent gone.
Three explanations were offered in sequence — clip length, then number of cuts, then a
side-by-side staging idea — **each stated with more confidence than the evidence
supported, and the first two were wrong.** The user's own data (a fine 24-second clip)
refuted the first; the user's ear refuted the rest. Then the audio-reference result was
written up as a settled mechanism and a costed method **off a single clip**, and the
user had to correct that too.

**Two rules come out of it.**

**Inspect the inputs before theorising about the outputs.** Diffing the two job
payloads field by field took one call, proved the inputs were identical except
duration, and surfaced the unused `audio_references` role. That is what found it — not
any of the three theories.

**And count the evidence before naming a finding.** One clip is an observation. A
repeated result across both characters and different lines is a finding. **Write the
smaller claim.**

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
- **CAPITALISED STAGE DIRECTION NEXT TO A DIALOGUE LINE CAN BE SPOKEN ALOUD.**
  C1 v2 `903a4d2b` came back with the transcript *"Caught, warm, that was a very
  long mm."* The prompt line above that beat is
  `*** HER FACE CHANGES — CAUGHT, WARM, PLEASED AND TRYING NOT TO SHOW IT. ***`
  — **the model read `CAUGHT, WARM` as dialogue**, and ChiChi's `"...Mm."` was
  absorbed into the same segment instead of being delivered. 42 words against 41
  scripted, and two lines lost.
  **The caps and the `***` markers do not mark text as non-spoken — they make it
  look like emphasis on a line.** This is the same shape as the Sucré lesson above:
  putting a string in the prompt is what makes the string available to be rendered.
  The delivered C1 got this right on byte-identical text, so it is **re-roll
  variance rather than a structural fault** — but the exposure is real.
  **Write beat direction in lower-case prose, or move it away from the dialogue
  line. Never add "do not say this", which supplies the words again.**
- **Spell unusual words phonetically, and negate the wrong readings.** "Jollof"
  came back mispronounced because the prompt only ever spelled it. Write the
  sound: *"pronounced 'JO-loft' said quickly, stress on the first syllable, the
  final T completely SILENT so it ends on a soft f — never 'jaw-left', never
  'joll-OFF' with the stress on the second syllable, never with an audible T."*
  Same for any character name, place or dish the model has no strong prior for.
- **"CARTOONISH" WAS MISSING FROM EVERY NEGATION SET IN THIS FILE UNTIL 17 SEP 2026,
  AND THE USER HAD TO SAY IT.** Her note on N1 C3: *"I want Chi's face to not be as
  cartoonish."* The skin block below has always written against **blotchy, mottled,
  patchy, waxy, plastic, muddy, grainy, over-smoothed and out of focus** — and every
  one of those is a *photographic* failure. **None of them names the failure where the
  render stops being a photograph at all.** That is a different prior and §5's own rule
  applies: a generic negation loses, so name the exact wrong answer. Going in every
  prompt, for every face, alongside the existing block: **NEVER cartoonish, NEVER
  doll-like, NEVER stylised, NEVER illustrated, NEVER animated, NEVER CGI or
  3D-rendered, NEVER a video-game face, NEVER airbrushed, NEVER beauty-filtered,
  NEVER enlarged or widened eyes, NEVER a shrunken nose or chin, NEVER exaggerated or
  perfectly symmetrical features. SHE IS PHOTOGRAPHED, NOT DRAWN.**
  **The general lesson is worth more than the word.** A negation set can be long,
  well-tested and still have a whole AXIS missing from it, because every entry on it
  was written the last time something went wrong in the same direction. **When a new
  fault arrives, ask which axis it sits on before adding another synonym to an
  existing line.**

- **TWO OBJECTS OF THE SAME DESCRIPTION ON ONE SURFACE, AND THE PROMPT NAMES NEITHER —
  THAT IS HOW A FORK ENDS UP IN A RAG.** N1 C3 `ff7fd07c`: the user watched ChiChi
  pick up a fork and push it into a kitchen cloth, which then read as a plate after the
  cut. **Nothing in the prompt was random.** The locked SET element puts *"a wooden
  spoon resting on a folded paper towel"* on the island beside *"a tall stack of white
  paper plates"*; the prompt then put a DISH TOWEL on Kel's shoulder and referred to
  the food only as **"a plate"**. Three cloth-or-paper objects, two of them white and
  flat, on one steel top — and not one sentence saying which one held the food.
  **Count the objects an element description puts in the scene before writing the
  action.** A locked set is not just walls and light; its description ships PROPS, and
  those props compete with yours. Name the one the action uses — *a WHITE PAPER PLATE
  with the food visibly on it* — negate the rest by name, and park the set's own props
  at the far end of the surface.
  **And the cut is the other half of it.** That fork-and-bite action was split across
  a cut anchored to her first bite, which is precisely where an object is free to
  change identity. §3's movement rule — *a change revealed by a cut is a continuity
  break* — applies to PROPS and not only to bodies. **Any single continuous piece of
  business with an object in it belongs inside ONE shot. Anchor the cut to something
  else, and say in the prompt that the camera does not cut during that action.**

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
  edge it hangs on, and where the gap appears: "hinges on the LEFT edge, handle on
  the RIGHT edge, never the same side — it SWINGS INWARD ON ITS HINGES from the left,
  so the gap opens on the right." The same applies to anything with a working part —
  drawers, lids, latches, windows, a phone cord.

  > ### ⛔ THE WORD `PIVOTING` WAS IN THIS RULE AND IT RENDERED A REVOLVING DOOR. 18 Sep 2026, 117 credits.
  >
  > The sentence above used to read *"it opens inward **pivoting** on the left."* It was
  > copied verbatim into `Dorian-Loft-Entry-v2` `e1997bea`'s write-once description, out
  > of there into N1 C4 v3's prompt, and the user's verdict on the render was:
  > **"Simone came through the door and it revolved. Like, I don't understand that."**
  >
  > **A door that PIVOTS is a pivot door** — a real product that rotates about an axis
  > instead of hanging on hinges — and a rotating door renders as a revolving one. This is
  > §5's `high mock-halter neckline` trapdoor exactly: a word that means something specific
  > in the trade, used loosely, requesting the wrong object every time it shipped. **The
  > difference is that this one was in the rulebook**, so it was not one agent's slip — it
  > was the house style.
  >
  > **`pivot` and `pivoting` are retired from this project. A hinged door SWINGS ON ITS
  > HINGES.** And the negation set was missing a whole axis, per §5's own warning: every
  > wrong answer it named was a door TYPE by material or use — steel slab, fire door,
  > service door, sliding door — and **not one of them named a wrong MECHANISM.** Any
  > future prompt with a door in frame negates by name: **NO revolving door, NO rotating
  > door, NO pivot door, NO carousel door, NO door that spins, NO double doors.**
  >
  > **And check your own style guide for trade words before blaming the model.** One grep
  > for `pivot` found the source in under a minute, after the render.

- **⛔ DO NOT DESCRIBE A FIXTURE INTO A LOCKED SET THAT DOES NOT CONTAIN ONE — THE MODEL
  BUILDS ARCHITECTURE TO RESOLVE IT. 18 Sep 2026, same 117 credits.**
  The same clip put a front door into `Dorian-Loft-Night` `1a162d9b`, the approved locked
  set, which is the STAIRCASE END and has no front door in its plate or its description.
  The prompt also placed guests "behind" Nia. The model reconciled a wall that must hold a
  door with a party that must be somewhere by **inventing a second opening**, and the user
  watched **"Nia came out of the room next to the door. That was AI slop."**
  **A locked set is an inventory, not a suggestion.** Adding one fixture it does not have
  is the same act as §2's "do not invent the space between two references", one object
  smaller — and it is how a second room gets built.
  **The fix is free and it is ordinary film coverage: PUT THE FIXTURE OFF-CAMERA.** A
  character can walk into frame from a door the audience never sees, and then no door can
  be wrong. **When a scene needs something the locked set does not have, first ask whether
  the shot actually needs to SEE it** — before asking the user for a plate, and long before
  building an element.

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

### 🔑 THE FIVE PRODUCTION DIRECTIVES — the user's own, 18 Sep 2026

**Given after N1 C4 was rejected in full for 162 credits. Four restate rules this file
already had and were not being followed; one is a correction; one contains a factual
claim that was checked and does not hold on this connection.**

**1. BREAK THE SEEDING CHAIN.** *"Every image-to-video pass loses roughly 20% of fine
detail, and seeding the next clip from an already-degraded frame compounds it… Seed
from the sharpest available frame rather than the most recent one, and break the chain
back to text-to-video every couple of clips."*
§4a has the measurement and it matches her figure exactly — Clip 2 renders 47.5, Clip 3
renders 36 from it, **−20% against its own seed.** ✅ **NEW HERE: the CADENCE.** §4a said
"do not chain" and "seed from the sharpest source"; it never said how often to reset.
**Every couple of clips, come back to pure t2v.** A chain with a reset in it cannot
compound past two links.

**2. CUT THE PROMPT LENGTH HARD, AND FRONT-LOAD MORE THAN THE DIALOGUE.** *"At around
20,000 characters, instructions toward the end carry little weight… dialogue and
critical constraints need to sit near the front rather than at depth."*
§2b's ceiling is 19,554 and §7's table shows adherence collapsing above it. ✅ **NEW
HERE: "critical constraints", not just the script.** The file only ever said to lift the
DIALOGUE to the top. **Anything that must not be re-rolled — the attribution guards, the
ring rule, the no-cup rule, the cut anchors — belongs near the front too, not at 70%
depth where the script used to sit.**

> **⚠️ AND IT WAS NOT WHAT BROKE N1 C4 — checked 18 Sep 2026.** Both rejected takes hit
> their word counts EXACTLY (6/6 and 12/12) at 12,937 and 12,397 characters, while the
> APPROVED C3 v2 is the longest of the three at 17,697. C4 broke on faces, wardrobe and
> set. **A rule that is right in general is not automatically the diagnosis for the take
> in front of you** — §7 already says to check the parameters before theorising about the
> model, and this is that habit applied to a rule instead of a parameter. Confirm the
> named cause is present in THIS take's evidence before spending work on it.

**3. THE START FRAME OVERRULES THE TEXT.** *"Your prompts specified ring-free and no
necklace while the seed image carried both, and the image won… anything you need
excluded has to be absent from the frame."*
§4a records this exact failure. ✅ **NEW HERE: the general rule, stated as an
instruction rather than a post-mortem.** **On image-to-video, a negation only works if
the thing is ABSENT FROM THE REFERENCE. Writing "no ring" over a frame containing a ring
is not a fix, it is a wish.** This is §2b's ring hypothesis and §3's no-cup rule and the
Sucré lettering lesson, all the same mechanism: **an image beats text every time.**

**4. GENERATE VOICE SEPARATELY — and here is what was checked.**
*"Voice Cloning with Voice Binding locks a voice to a character across scenes, rather
than relying on native multi-character audio to assign them correctly each time."*

> ### ⚠️ VERIFIED 18 Sep 2026: THERE IS NO VOICE BINDING ON THIS CONNECTION.
> `models_explore` on `seedance_2_5` returns its complete parameter set — **`mode` ·
> `duration` · `resolution` · `generate_audio` · `bitrate_mode` · `extension_mode`** —
> and media roles `start_image` · `end_image` · `image_references` ·
> `video_references` · `audio_references`. **Nothing assigns a voice to a character.**
> `list_voices` returns `voice_id` · `voice_type` · `name` · `gender` · `preview_url`
> and **no character field.** Soul characters (`show_characters`) DO bind identity, but
> only to `soul_2` and `soul_cinematic` — image models — and **one soul per
> generation**, so Soul is not a video path at all.
> **Do not go looking for this parameter again.** Same standing as the language
> selector in the Lock Card: checked, absent, recorded.

> ### ⛔ AND THE AGENT'S FIRST ANSWER TO THIS WAS WRONG. THE USER OVERRULED IT, 18 Sep 2026.
>
> The agent read *"generate voice separately"* and concluded **ONE SPEAKER PER
> GENERATION** — shoot each woman alone and cut the scene together. **The user's reply:
> *"no I don't like that method. I want multispeaker."*** She is right, on two counts.
>
> **It throws out the show.** §1 is two women across a table who interrupt each other.
> A scene assembled from solo shots is not that scene.
>
> **And the evidence never supported it.** Multispeaker attribution has worked in every
> clip where the ASSETS were right:
>
> | clip | speakers | result |
> |---|---|---|
> | C1 `2a5a6765` | 2 | **41/41 words verbatim, in order** |
> | C2 `68a321ad` | 2 | **21/21 words, 8 of 9 lines clean** |
> | C3 v2 `b3437148` | 2 | **26 words exact, BOTH collision lines to the right mouth** |
> | C4a / C4b | 2–3 | **6/6 and 12/12 — the words and the mouths were fine** |
>
> **C4 failed on an unverified character element and an invented set, not on having two
> people in the shot.** "Generate voice separately" means generate the AUDIO separately.
> It never meant stage the scene separately, and turning one into the other was the
> agent's inference, not the instruction.

**✅ SO: SHOOT MULTISPEAKER. FIX THE VOICES IN THE AUDIO LAYER, NOT THE STAGING.** That
is what "removes the mismatch at its source" actually means here — the source is the
DIALOGUE TRACK, not the blocking. Every piece of this is already proven:

- **`generate_audio` TTS per character** with her own element, `speech_rate: 50` —
  0.3–0.5 credits, and the ONLY path that has ever produced a British Nia on demand.
  Approve the speech before the render exists.
- **Shoot the scene multispeaker**, with the guards that C2 and C3 both proved: exact
  word count at the very top, every line tagged with its speaker, the other mouth
  explicitly closed, the specific wrong answer named, and **cuts anchored to ACTION
  rather than to a spoken word.**
- **If a voice comes back wrong, RESTORE THE APPROVED RECORDING over the picture.**
  §5a's audio-first rule already supersedes "an accent fault is a render fault" — a
  replaced dialogue track inherits nothing from the bad render and re-rolls no picture.
- **Or `voice_change` on ONE speaker plus a splice**, per §5a's proven Ep3 C5 recipe —
  2 credits, and it does not touch a frame.

**Never re-shoot a clip whose picture is right to chase a voice.** That is the whole
point, and it works with two people in frame.

**5. TEST AT 480p, DELIVER AT 1080p.** *"Confirm the motion, framing and dialogue land,
then render the final version at 1080p."* ✅ **THIS CORRECTS THIS FILE** — §7 below used
to say hold one resolution for the whole episode. See the superseded rule there.

> ### ⛔ BLOCKED 18 Sep 2026: SUB-1080p RENDERS WITH PEOPLE IN THEM RETURN `nsfw`.
>
> **SIX consecutive `seedance_2_5` submissions at `resolution: "480p"` came back
> `status: "nsfw"`, `type: "image"`.** The content was eliminated one variable at a time
> and none of it was the cause:
>
> | # | what was removed or changed | result |
> |---|---|---|
> | 1 | the full C4 v2 test as written | ❌ nsfw |
> | 2 | wardrobe sentence restored VERBATIM from C4a, which passed at 1080p | ❌ nsfw |
> | 3 | wardrobe element dropped, figure block deleted, both women in full buttoned overcoats | ❌ nsfw |
> | 4 | new set element swapped for the old `9ced01df` | ❌ nsfw |
> | 5 | **Simone removed entirely — NIA ALONE, modest dress, locked set** | ❌ nsfw |
> | 6 | duration 5s → 8s | ❌ nsfw |
>
> **Test 5 is the one that settles it.** One woman, alone, in a knee-length dress with
> sleeves, in an approved set, saying three words — the most innocuous frame this series
> could produce — and it was refused. `bcd528d3` is in every approved clip of the episode
> at 1080p. **This is not a judgement about the content.**
>
> ### ⛔ AND THE FIRST CONCLUSION DRAWN FROM THAT TABLE WAS WRONG. 720p FAILS TOO.
>
> This section originally read *"the only value common to all six is 480p"* and named the
> tier as the cause. **Test 7 falsified it within the hour:** the same prompt at
> **`resolution: "720p"` also came back `nsfw`.** That was the THIRD wrong diagnosis of
> this one fault — after the coat wording and the body text — and it had already been
> written into this file as settled.
>
> **The rule §7 already carries applies to an agent's own conclusions, not just to
> measurements: a finding is what survives a test, and one that has not been tested is a
> hypothesis.** "The only common value" is only ever true across the cases you actually
> ran. Six failures at one tier does not establish the tier; it establishes that you never
> varied it.
>
> ### ✅ TEST 8 IS THE ONE THAT CARRIES INFORMATION: NO PEOPLE, 720p — IT RENDERED.
>
> Same set element, same tier, same `bitrate_mode`, same `generate_audio` — and the ONLY
> change being **an empty room with no human figures and no dialogue**. It passed the
> filter and rendered.
>
> | | people | tier | result |
> |---|---|---|---|
> | tests 1–6 | yes | 480p | ❌ nsfw |
> | test 7 | yes | 720p | ❌ nsfw |
> | **test 8** | **NO** | 720p | **✅ rendered** |
> | C4a `d2d25be2`, C4b `93e87a3a` | yes | 1080p | ✅ rendered |
>
> **THE STANDING HYPOTHESIS, AND IT IS A HYPOTHESIS: a human figure below 1080p trips the
> filter, and the same figure at 1080p does not.** It fits every case above and it is
> consistent with the clothing being irrelevant — test 5 was one woman alone in a
> knee-length dress with sleeves.
>
> **THE ONE TEST THAT WOULD CONFIRM IT** is the identical people-prompt at 1080p, 5s, 90
> credits. Until that runs, do not write this up as the cause.
>
> **⚠️ WHAT IT MEANS FOR DIRECTIVE 5 IF IT HOLDS: there is no cheap iteration tier for
> THIS SHOW**, because every clip in it has people in it. The directive's reasoning stays
> correct — resolution has nothing to do with whether the right face shows up — but the
> saving is not available. Empty-set plates and geography checks CAN still be shot at 720p
> for a third of the price, and that is worth keeping.
>
> Re-test occasionally: this may be a server-side filter setting rather than a permanent
> property. **480p has demonstrably worked on this account before** — the voice-capture
> clip `572d535a` was 480p, and §7 records an approved 480p clip being re-shot at 1080p.
>
> ### ✅ AND AN `nsfw` REJECTION COSTS NOTHING — BUT THE BALANCE LIES WHILE IT SETTLES
>
> `transactions` shows each one as a **−15 spend followed by a +15 refund within seconds**.
> Six rejections, six matched pairs, balance returned to exactly where it started.
> **An agent reading `balance` in the gap between the two will see credits missing that
> are not missing** — that happened here and was reported to the user as a real charge
> before `transactions` corrected it. **Never call a spend from a balance delta alone;
> read `transactions`, which names the action.**

---

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
    - **Sharpness is measurable too, and it is the one visual fact that does not
      need the user's eyes.** Variance of Laplacian over 10 frames, normalised to
      1920x1080 greyscale. Section 2b has the scale: **50-67 for text-to-video,
      24-29 for a seeded clip, 47.5 on approved Episode 2 Clip 2, mush below 30.**
      Run it on every delivered clip and quote the number.
    - **SHARPNESS IS ROOM-DEPENDENT, SO ONE NUMBER FOR A WHOLE CLIP CAN HIDE HALF
      OF IT. Measure PER SHOT, split on the cuts.** The N1 test `fc39a8ab` reads
      **29.8 overall** — right on section 2b's mush threshold, and a number that
      says nothing useful. Split on its three measured cuts it is two clean bands:
      **Nia's two shots 16.7 and 18.5, ChiChi's two 46.7 and 45.9.** Same clip,
      same encode, same `bitrate_mode: high`, 10.2 Mbps, one submission. Each
      band is FLAT across its own shot (Nia 14.9–19.2), which rules out motion
      blur — a kinetic subject gives a spread, not a line.
      **But the rooms are not comparable, and that is the caveat.** Variance of
      Laplacian measures scene detail, not focus alone: Nia's bedroom is linen,
      plaster and soft light, ChiChi's is marble, glass and a city skyline. A
      64-pixel tile analysis narrows it without settling it — Nia's MEDIAN tile
      reads 7.3 against ChiChi's ~21, and her single SHARPEST tile 370 against
      466–686 — so even her most detailed patch resolves less, which a bare
      content difference does not fully explain.
      **This is section 7's own rule about LTAS, one axis over: the room is the
      dominant term.** Compare a shot to the SAME ROOM in another take, never to
      a different set, and never quote a clip average across two locations.
      Whether Nia's shots are genuinely soft is the user's eyes, not the number.
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
- **✅ ROOM ANCHORING WORKS — job `c52c4a30`, 72 credits, and the user's words were
  "THIS WAS THE BEST CLIP!"** The N1 8s test swapped the two women, so the next take
  named the room at every cut ("CUT TO CHICHI — WE ARE NOW IN HER LIVING ROOM, ON HER
  SECTIONAL, and NIA IS NOT IN THIS SHOT") plus a rule above the beats binding each
  woman to one location. **Anchor every beat to its room in any intercut. It is in
  C1.**

  > ### ⛔ AND THE MEASUREMENTS CALLED IT A REGRESSION ON EVERY SINGLE AXIS.
  >
  > | | `fc39a8ab` | `c52c4a30` — **the best clip** |
  > |---|---|---|
  > | L3 Nia's line | 173.9 Hz | 170.2 Hz |
  > | L4 Chi's line | 207.8 Hz | 213.3 Hz |
  > | voice spread | 65 Hz | **43 Hz** |
  > | sharp pair of shots | 46.7 / 45.9 | **33.5 / 30.5** |
  > | soft pair of shots | 16.7 / 18.5 | **14.0 / 15.4** |
  >
  > Sharpness down on all four shots. Voices converged, which §5a names as the
  > signature of "both voices are wrong". Pitch still reading L3 and L4 as swapped.
  > **An agent — this one — wrote it up as a failure, reverted the anchoring out of C1,
  > and would have thrown the best clip of the episode away.** The user's eye caught it.
  >
  > **Both measurements were used in exactly the ways this file already forbids.** The
  > pitch bands came from Ep2 Clip 2 — a different clip, a different room, a different
  > encode — and §5a says the room dominates and cross-clip comparison is unreliable.
  > The sharpness figures compared two DIFFERENT ROOMS across two DIFFERENT CLIPS, and
  > the rule against exactly that was written into §7 *earlier in the same session*.
  > **Knowing a rule is not the same as applying it to your own number.**
  >
  > ### THE STANDING RULE, AND IT IS ABSOLUTE
  >
  > **A measurement may FLAG. It may never REVERT.** Nothing gets rolled back, no take
  > gets called a failure, and no direction gets abandoned on the strength of f0, LTAS,
  > variance-of-Laplacian or a bitrate — those numbers raise a question for the user and
  > nothing more. §7 already said "measurement flags a suspicion, the user's eyes settle
  > it"; what was missing is that the agent must then WAIT. Show the numbers, say what
  > they might mean, and **ask before undoing anything.**
  >
  > **And the scale is not calibrated for this series.** §2b's "mush below 30" comes
  > from Episode 3 in one room; the best clip here reads 14–33 and the user likes it.
  > Sharpness is a tripwire for a sudden fall inside ONE room across otherwise identical
  > takes. **It is not a quality score, and it does not rank two clips.**

  **What stays true from the write-up:** the anchoring cost ~700 characters and every
  render number moved down while the clip got better. So the numbers are not measuring
  what the audience sees. **Do not add text to beat a behaviour** is still right as a
  default — the ring and the music swell prove it — but it is a default, not a law, and
  this is the counter-example: **naming the room is not escalation, it is information
  the model did not otherwise have.** Escalation repeats a negation louder. Anchoring
  supplies a second, independent handle. Those are different moves and only one of them
  has failed here.

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
- **⛔ SUPERSEDED 18 Sep 2026 — ITERATE AT 480p, DELIVER AT 1080p.** This rule used to
  say pick one resolution and *hold it for the whole episode*. **The user has overruled
  that and she is right.** Resolution has nothing to do with whether the right face,
  the right room, the right blocking or the right dialogue shows up — so paying 1080p
  prices to discover a staging fault is pure waste. **Test at 480p. Confirm motion,
  framing, identity and dialogue land. THEN render the final at 1080p.**
  **The numbers make the case on their own:** a 5s test is **15 credits at 480p against
  90 at 1080p**, and a 16s clip is **144 at 1080p**. N1 C4 was rejected in full at 162
  credits; the 480p test that found the actual cause cost 15. **Six 480p iterations are
  cheaper than one wrong 1080p take.**
  What survives from the old rule: once you are shooting the FINAL, hold 1080p across
  the whole episode so delivered clips match — and never read a 480p test as a verdict
  on picture quality, because it is not one.
- **Pick the FINAL resolution before the first clip of an episode, not after.** "Blurry"
  is usually not a prompt problem — 480p looks fine in a chat preview and soft on
  a television, and no amount of sharpness wording fixes the pixel count. Quote
  all three tiers per clip and per episode up front and let the user choose. Seedance on a 15s clip: **480p 37.5**, **720p
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
