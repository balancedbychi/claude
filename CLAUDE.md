# EXCLUSIVE — the series · production rules

This repo builds an AI-generated dramatic series. Read this file before writing a
prompt, generating anything, or spending a credit.

Every rule below was paid for. Most exist because something drifted, broke, or
had to be re-rendered.

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
| **Hair** | Colour, length, cut, texture, part, how the ends behave — plus the wrong cuts named and negated |
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
- **Assign each character two or three signature gestures and reuse them.**
  Repetition across episodes is what makes a generated character read as a person.
- **Hands must have a job.** Specify what each hand is doing in every beat. Idle
  unspecified hands are where anatomy errors appear.

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

## 5a. CHI'S VOICE — PINNED, DO NOT CHANGE

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
ChiChi's English dialogue uses <<<180fdb9a-7c0b-469e-be49-3f76692a3968>>>, her
saved warm, smooth, mid-to-low General American voice with calm authority and dry
humour — never a substitute voice, never a British accent, never swapped with
Nia's.
```

### Why the element reference stays in, even though it is not what you hear

`180fdb9a` is her cloned voice element. The model does **not** honour it — it
binds only one voice element per generation, and Nia's wins. The voice you hear
is synthesized from the surrounding description instead.

Leave the reference in anyway. It was present in every approved take, so it is
part of the recipe. Removing it changes the inputs, and changed inputs are how
this voice gets lost.

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

**What it does NOT change.** seedance still binds only ONE voice element per
generation and Nia's still wins. Every seedance shot Chi speaks in still uses the
two pinned blocks above, unchanged, with `180fdb9a` still in the text. Do not
swap `de50f37f` into a seedance prompt expecting it to be honoured — it will not
be, and swapping it changes the recipe.

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

### Nia's voice is different

Nia's cloned element `12315c68-37de-41fe-8766-76ac07bcaf70` **is** honoured and
does produce her real voice. Hers is a genuine asset; Chi's is a recipe. Do not
treat them the same way.

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
- **Never reword anything that produced an approved result.** The text that reads
  as "maroon tights" on screen says `chocolate-brown leggings` in the prompt. Keep
  the words that worked, not the words that describe what you see.
- **Quantities are absolute or they drift.** "A single glass" is not strong enough.
  "Exactly ONE glass exists, never two, never a spare or empty glass on any
  surface in any shot" is.
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
- 5 lines ≈ 25 words ≈ a 12-second clip. At 15s the model spends the surplus on
  reaction beats and the scene drags.
- Replies land within 0.2s. Two lines per scene should start a fraction early and
  overlap.
- Cuts fall **on the first syllable** of the incoming line, never before it.
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
      control pair you know differs (canon Chi vs element `180fdb9a` scores 0.8621)
      so the numbers have a scale. Same voice lands ~0.98.
    - **Get reference samples free** from `list_voices` — every voice element
      carries a `preview_url`. No TTS spend needed to hear what an element is.
    - **Verify the ATTRIBUTION, not just the words.** A transcript proves the
      lines were spoken. It does not prove who spoke them. A clip shipped with
      ChiChi delivering Nia's line and the verification passed it, because the
      pitch was bucketed by who was *scripted* to speak — which makes a swap
      invisible by construction. **Measure every line separately, then cluster
      the lines and see which speaker each one lands on.** Never average lines
      together on the assumption the script was obeyed.
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
- **Never silently swap models, resolution or aspect ratio.** Mid-episode changes
  to any of these make the footage un-cuttable with what already exists.
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
- Commit after each locked decision, not in one batch at the end.
