# THE STANDARD SOCIETY — production rules

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
- **Never introduce a new element mid-episode.** An element created *before* any
  footage defines the set. An element created *after* footage exists, from a fresh
  description, is not a lock — it is a second, competing set. This replaced a
  working couch mid-episode and destabilised both wardrobes.
- **Write the whole spec into the element description**, including the rules
  (one wine glass, no floor lamp, sits screen right). Rules stored in the element
  travel with it; rules stored in your head do not.
- **Mark superseded elements explicitly** so a later session cannot pick up a
  stale one. Old elements are never deleted, only retired in the registry.

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
- **Every speaking character must be visible in the clip.** The model only binds a
  saved voice to a face it can see. An off-camera speaker gets a fabricated voice,
  no matter what the prompt says.
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

### Known fragility — flag this to the user if it ever matters

Because the voice is synthesized rather than stored, **a model update could change
it and there is no way to restore it.** The durable fix is to capture it as a real
voice element:

1. Generate one short clip where Chi speaks alone, using the exact two blocks
   above, so the audio is clean single-speaker.
2. Clone that audio into a new voice element with `create_voice`.
3. From then on Chi has a real, portable voice that also works in TTS and other
   models, and no longer depends on seedance re-synthesizing her.

This has not been done yet. Propose it before starting a new season, or the first
time the voice sounds different.

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
- **Preflight every cost** with `get_cost` before generating. State the number.
- **Report the credit balance** after each batch so the user can see the burn.
- **Never silently swap models, resolution or aspect ratio.** Mid-episode changes
  to any of these make the footage un-cuttable with what already exists.
- **Tell the user when a change invalidates existing shots.** Changing the time of
  day means everything already shot must be rebuilt. Say so before spending.

---

## 8. REPO CONVENTIONS

- One markdown file per episode in `the-standard-society/`, carrying the script,
  the element registry with IDs, the continuity spec, and the delivered shot list
  with job IDs.
- Update the episode file in the same session the footage is approved. Element IDs
  living only in a chat transcript are lost.
- Commit after each locked decision, not in one batch at the end.
