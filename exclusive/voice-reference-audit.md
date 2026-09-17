# VOICE REFERENCE AUDIT — candidate inspection, 16 Sep 2026

Purpose: select one audio reference per woman for the `audio_references` test
protocol. **No generations were run for this audit. Nothing was charged.**

## ⚠️ WHAT I LISTENED TO: NOTHING

I cannot play audio. Every figure below is measured off the waveform or read off
a payload. **The accent and delivery questions are not answerable here and are
left entirely to the user's ear** — §7: measurement flags, the user settles.

---

## 1. Duration and usable single-speaker timestamps

| candidate | container | duration | speech | speech % |
|---|---|---|---|---|
| **NIA `Nia-voice-v2-clear` `12315c68`** | MP3 320kbps, 44.1kHz, **mono** | **12.04s** | 8.20s | 68% |
| NIA `Nia-Canon-Voice-v2` `b3d2fc9b` | **uncompressed PCM s16le** (WAV despite `.mp3` name), 44.1kHz, stereo | 14.60s | 10.70s | 73% |
| **CHI `ChiChi-Canon-Voice-v1` `de50f37f`** | MP3 320kbps, **32kHz**, mono | **12.35s** | 5.90s | 48% |

Voiced runs of **≥1.0s** — the only ones long enough to measure (§5a: below about
a second there is no test):

| candidate | runs ≥1.0s | timestamps |
|---|---|---|
| `Nia-voice-v2-clear` | **3** | 0.50–1.70 (1.20s) · 5.10–6.30 (1.20s) · 3.60–4.65 (1.05s) |
| `Nia-Canon-Voice-v2` | **1** | 0.65–2.15 (1.50s) |
| `ChiChi-Canon-Voice-v1` | **1** | 6.50–7.65 (1.15s) |

**"Single-speaker" is NOT verified.** These are voiced runs separated by pauses.
Whether one person speaks throughout is the question §3 below could not answer.

## 2. Overlapping speech, music, clipping, background noise

**Clipping — clean, all three.** Zero clipped samples in every file. Peaks
−1.5 / −5.5 / −3.4 dBFS respectively. No candidate is disqualified on level.

**Noise floor — one real concern, and it is ChiChi's.**

| candidate | noise floor | speech | speech above floor |
|---|---|---|---|
| `Nia-voice-v2-clear` | −60.2 dBFS | −18.4 | **41.8 dB** |
| `Nia-Canon-Voice-v2` | −65.9 dBFS | −20.5 | **45.4 dB** |
| `ChiChi-Canon-Voice-v1` | **−44.4 dBFS** | −17.9 | **26.5 dB** |

ChiChi's file sits **15–19 dB worse** than either Nia file on speech-to-floor.
That is robust and reproducible. It is room tone or encode noise, not clipping.

**Overlapping speech and music — TESTED, AND THE TEST FAILED.** Reported as a
failure rather than dropped, because a silent drop reads as a clean result.

- *Second-speaker test (within-file LTAS between segments).* §7 sets the scale:
  same speaker ~0.93, cross-speaker ~0.82. Measured within-file spreads were
  **0.66–0.92 / 0.64–0.87 / 0.56–0.79** — i.e. files that are almost certainly
  one cloned speaker scored *below* the documented cross-speaker floor. The
  measure is separating **vowels, not people**, on runs this short. It does not
  support any conclusion about a second speaker, in either direction.
  This is §7's per-line cluster failure (control pair 0.621 vs 0.878, bands
  nearly overlapping) reproducing exactly.
- *Music test (spectral flatness of the non-speech gaps).* All three read
  0.0008–0.0030 against a >0.30 threshold I set for "broadband hiss". Every file
  reads the same, including ones with no reason to contain music — the reading is
  dominated by the codec's lowpass emptying the top octave after the 16kHz
  resample. **The threshold was miscalibrated; the measurement is void.**

**So: no measurement here can tell you whether a second voice or music is present.
That needs the ear too.**

## 3. Accent and delivery

**Not measurable. Not attempted as a measurement.** f0 gives pitch, and pitch is
not accent. What the pitch does say, once the sub-second runs are filtered out:

| candidate | reliable runs | f0 range | spread | median |
|---|---|---|---|---|
| **`Nia-voice-v2-clear`** | **3** | 179.8–186.0 Hz | **6.3 Hz** | **183.9 Hz** |
| `Nia-Canon-Voice-v2` | 1 | — | not assessable | 197.5 Hz |
| `ChiChi-Canon-Voice-v1` | 1 | — | not assessable | 148.1 Hz |

**`Nia-voice-v2-clear`'s 183.9 Hz matches the 183.9 Hz §5a already records for
this element** from an independent earlier measurement. That cross-check passing
is the strongest technical signal in this audit.

> **⚠️ CORRECTION to the unfiltered pass.** Including sub-second runs gave
> `Nia-Canon-Voice-v2` a "tightest 31.6 Hz spread" and `ChiChi-Canon-Voice-v1` a
> "concerning 77.5 Hz spread". **Both were artefacts of segment length.** Under
> the filter the ranking inverts: `Nia-voice-v2-clear` is tightest by a wide
> margin, and ChiChi's spread is *unassessable*, not bad. §5a already warned that
> ChiChi's short lines always read high — her own runs read 202.5 Hz at 0.50s and
> 125.5 Hz at 0.25s. Neither number means anything.

> **FLAG, not a verdict.** ChiChi's one reliable run reads **148.1 Hz**, near the
> **146.8 Hz** of the re-shoot `85d64987` the user rejected, and below approved
> Clip 2's **158.4 Hz**. But her 0.90s run at 4.90–5.80 reads **158.4 Hz exactly**,
> so the file supports either number depending on which run you pick. And §5a is
> explicit: *what an element sounds like alone tells you nothing about what it
> contributes as an input* — that conflation cost the 135-credit Clip 5 re-shoot.
> **This changes nothing and reverts nothing. It is a thing to listen for.**

## 4. Recommended reference per woman

### NIA → `Nia-voice-v2-clear` `12315c68`

1. **It produced the voice the user approved.** No other Nia element has.
2. **3 assessable runs against 1** — the only candidate with enough measurable
   speech to show consistency, and it is consistent (6.3 Hz).
3. Clean floor (41.8 dB above), zero clipping, mono — no channel ambiguity.
4. **The Lock Card already rules on the alternative.** `Nia-Canon-Voice-v2`
   `b3d2fc9b` is in no document and *"Do not put it in a prompt until the user
   says what it is for."* Keeping it out is the existing ruling, not a new call.

*Against it:* lossy MP3, and its longest clean run is 1.20s. `Nia-Canon-Voice-v2`
is the technically better file — uncompressed PCM, quietest floor, a 1.50s run.
**If the user says what `b3d2fc9b` is, that ranking is worth revisiting.**

### CHI → `ChiChi-Canon-Voice-v1` `de50f37f`

**This is not a selection — it is the only ChiChi voice element that exists.**
`180fdb9a` was deleted 15 Sep. There is nothing to compare it against.

It is also the weakest file of the three: 26.5 dB speech-above-floor, 48% speech,
32kHz, and one measurable run. **None of that is disqualifying and none of it
addresses whether it sounds like Chi** — the user has already approved it by ear
as a TTS playback and ruled *"it is literally the voice we need."*

## ✅ 5. THE USER LISTENED — 17 Sep 2026. BOTH REFERENCES CONFIRMED.

> **"Nia sounds british — `Nia-voice-v2-clear`"**
> **"Chi sounds American — `ChiChi-Canon-Voice-v1`"**

Both recommended references are confirmed correct by ear. This settles the one
question no measurement in this audit could reach, and it is the completion of
**step 1** of the test protocol in §5a.

| | element | accent, confirmed by the user | matches spec? |
|---|---|---|---|
| **NIA** | `Nia-voice-v2-clear` `12315c68` | **British** | ✅ |
| **CHI** | `ChiChi-Canon-Voice-v1` `de50f37f` | **American** | ✅ — §5a's pinned block asks for "mid-to-low General American" |

### What this ELIMINATES — stated no wider than it goes

**Nia's reference carries the British accent.** So *"the reference is not British"*
is ruled out as the cause of the missing accent in Episode 1 Clip 1. The accent is
present in the input and absent in the output, which puts the loss in the **render
path**, not in the source asset.

That is an elimination, not a diagnosis. It does not establish what the render does
with the accent, and it does not promote the audio-reference hypothesis — that still
needs step 2.

### And it confirms the bleed is a SPEC VIOLATION, not just an oddity

§5a's pinned ChiChi block says **"never a British accent"**. The one audio-reference
clip `51783a9e` put a British accent on her. Now that both references are confirmed
as the accents they should be, the bleed is measurable against a known-good input on
both sides: **a British reference in a generation containing Chi breaks her spec.**
That is the case for one woman per generation, and it is why step 3 isolates them.

## 5b. What to listen for — the part I cannot do

| candidate | preview |
|---|---|
| NIA `Nia-voice-v2-clear` | https://d2ol7oe51mr4n9.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/b0cc8543-49bf-48ba-8ecd-00ac69fe5ab1.mp3 |
| NIA `Nia-Canon-Voice-v2` | https://d2ol7oe51mr4n9.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/f6e87a7b-101f-4095-b5cb-f2781533f5d2.mp3 |
| CHI `ChiChi-Canon-Voice-v1` | https://d2ol7oe51mr4n9.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/57a2ed26-54a5-4cf0-a156-8590ad4dc84d.mp3 |

Three questions, in priority order:

1. **Is Nia's accent British in `12315c68`, across the whole 12s?** This is the
   whole reason for the test protocol. If the reference itself is not
   consistently British, no amount of attaching it will make the render British.
2. **Is there a second voice anywhere in any file?** My test could not answer it.
   ChiChi's file is the one to check hardest — it has the most non-speech (6.00s
   of 12.35s) and the noisiest floor.
3. **Does ChiChi's file sound like Chi in DELIVERY, not just timbre?** §5a's
   revoice failure turned on exactly this: correct voice, wrong performance.

**Originals are untouched. Nothing has been trimmed, filtered or normalised.**
Any trim will be a separate copy, made only after the user picks.

## 6. Status

- ✅ Candidates inspected and measured.
- ✅ **User listened, 17 Sep 2026. Nia British, Chi American. Both confirmed.**
- ✅ **Step 1 of the §5a protocol is COMPLETE** — a clean, correct reference per woman.
- ⏸ Step 2 (two short tests per woman, different lines) is written and costed,
  **awaiting the user's go.** Nothing is submitted.

---

## 7. THE STEP-2 TEST SET — built, costed, NOT submitted

Four prompts in `exclusive/prompts/`, one visible speaking character each,
single locked shot, **zero cuts**, 5 seconds, ~13 words:

| file | speaker | line | what it tests |
|---|---|---|---|
| `n1-voicetest-NIA-A-PROPOSED.txt` | NIA | "He **can't answer** a text **after** eleven, but he can **ask** me to stay." | 4 BATH vowels + 2 dropped R's |
| `n1-voicetest-NIA-B-PROPOSED.txt` | NIA | "I know **better**. I really do. I'm just not doing anything **about it**." | T-flapping (American "bedder" vs British crisp T) |
| `n1-voicetest-CHI-A-PROPOSED.txt` | CHICHI | "He's not confused. He's **comfortable**. There's a **difference** and you already know it." | rhotic R throughout |
| `n1-voicetest-CHI-B-PROPOSED.txt` | CHICHI | "You **asked** me the same thing **last** month. My **answer** hasn't changed." | the same BATH vowels as NIA A |

**NIA A and CHI B share `ask`/`asked` and `answer` deliberately.** §5a: *"get both
samples reading the same text — content and delivery cancel out and the difference
that remains is identity."* The user hears the identical vowel from both women.

**Every character block is byte-identical to delivered clip `2a5a6765`.** §7 records
that shortening a prompt broke both voices because the *neighbourhood* around the
voice line changed, not the pinned text. Only the other woman's blocks and the
intercut machinery were removed. ChiChi keeps character → skin → age → hair → VOICE
→ wardrobe → ring → figure, and her left hand stays out of frame.

**All four pass `.claude/hooks/check-higgsfield-params.py`** — the guard already
requires a voice tag only for whoever actually speaks, so single-woman prompts are
clean.

### Params — diffed field by field against delivered `2a5a6765`

Identical on every field (`aspect_ratio` 16:9, `resolution` 1080p, `genre` auto,
`generate_audio` true, `multi_shots` false, `speedramp` auto, `prompt_language` en,
`model` default, `bitrate_mode` **high**, no `quality` field) except:

| field | delivered C1 | these tests |
|---|---|---|
| `duration` | 18 | **5** |
| `medias` | **`[]` — no audio reference** | `[{value, role: "audio_references"}]` |
| prompt | the intercut two-hander | one woman, one line |

**C1 carried no audio reference at all** — consistent with the accent being lost there.

### Audio reference media, imported 17 Sep 2026 (free, no generation)

| woman | element | media_id | type |
|---|---|---|---|
| **NIA** | `Nia-voice-v2-clear` `12315c68` | `10c50bd1-017a-4d2e-8d90-53e0391ecbb7` | audio/mpeg ✅ |
| **CHI** | `ChiChi-Canon-Voice-v1` `de50f37f` | `701615f7-c251-4c44-a64f-33b4aa1903cf` | audio/mpeg ✅ |

The server typed both as `audio`, not as images. Note §5a's caveat: the returned
payload coerced the role `audio_references` into `reference_images` on `51783a9e` —
check the payload, do not assume the role name survives as sent.

### Cost — preflighted

**45 credits per clip** (`get_cost`, 5s at 1080p). **180 credits for all four.**

### ⚠️ ONE OPEN DESIGN QUESTION — ChiChi's element tags

As written, each test carries **only the speaking woman's** voice element. For Nia
that changes nothing — `12315c68` sorts first and binds in every approved clip
anyway. **For ChiChi it reproduces the element configuration of job `a91ed33b`**,
which §5a records as a 36-credit failure: Chi's element attached alone measured
**183.9 Hz, the highest she has ever read in a render**, 24 Hz above approved Clip 2.

That test had **no audio reference**, which is the new variable here — so this is not
a repeat of it. But it is the same element configuration, and §5a says do not
revisit the binding lever. Flagged for the user, not decided by an agent.

---

## 8. THE ALT-VOICE A/B — job `94afd8b5`, 45 credits, 17 Sep 2026

**User request: *"could we use the other voice saved for Nia and see what happens?"***
That is the ruling the Lock Card was waiting for on `Nia-Canon-Voice-v2` `b3d2fc9b`.

**Exactly one variable.** Delivered clip `2a5a6765`'s NIA-A prompt with ONE character
sequence changed — `12315c68` → `b3d2fc9b`. Verified by diff: one line, one token,
every other block byte-identical. No audio reference attached (matching C1's
`medias: []`), so this isolates the ELEMENT swap.

| | value |
|---|---|
| words | **14 of 14, verbatim and in order** |
| transcript | "He can't answer a text after 11 but he can ask me to stay" |
| duration | 5.04s · 1920x1080 · 6.49 Mbps · `bitrate_mode: high` confirmed in payload |
| speech | 3.66s of 5.04s (27% silent — fine for a test) |
| f0 | **median 173.9 Hz** · p25 164.9 · p75 195.1 · p90 216.2 |
| sharpness | **20.0**, range 18.7–20.7 — FLAT, which rules out motion blur |

### ⚠️ WHAT THESE NUMBERS DO NOT TELL YOU: WHETHER SHE IS BRITISH

**Accent is not measurable.** f0 is pitch, and §5a's `voice_change` finding is
exactly this distinction — a revoice matched approved Chi to within 4 Hz and the
user still said it was not her voice, because **pitch matching is not identity and
it is certainly not accent.** The same holds here. The user's ear is the instrument.

For context only, and **not as a verdict** — §7's standing rule is that a
measurement may FLAG and may never REVERT:

| | f0 |
|---|---|
| element `12315c68` (her established voice) | 183.9 Hz |
| element `b3d2fc9b` (this one, its single reliable run) | 197.5 Hz |
| **this render with `b3d2fc9b`** | **173.9 Hz** |
| N1 test `fc39a8ab`, Nia's L3 | 173.9 Hz |
| best clip `c52c4a30`, Nia's L3 | 170.2 Hz |

The render lands in the same band as recent Nia renders and ~24 Hz below the element
it was given, which is the ordinary "the render re-performs the element" effect §5a
already records for both women. **It is not evidence about the accent.**

Sharpness 20.0 against C1's Nia-bedroom band of 15–16 is the SAME ROOM, which is the
only sharpness comparison §7 permits — but §7 also says the scale is not calibrated
for this series and does not rank clips. Quoted, not interpreted.

### Three free failures on the way in, all worth keeping

1. **`params.model: "default"` is a STORAGE ECHO, not an input.** Copying it from
   the stored payload returns `unknown model "default"`. §4a's rule again: a value
   visible in a stored payload is a hypothesis, not a caller-controllable field.
2. **The echo-only keys fail validation as a group** — `width`, `height`, `genre`,
   `multi_shots`, `multi_shot_mode`, `speedramp`, `prompt_language`. **The accepted
   set is `prompt`, `model`, `aspect_ratio`, `duration`, `resolution`,
   `generate_audio`, `bitrate_mode`, plus `declined_preset_id`.**
3. **The "IN THE DARK" preset gate fired again** and was declined literally.
   `declined_preset_id` only works alongside the accepted key set — which is why
   passing it up front failed the first time. Two round trips, nothing charged.

**Prompt: `exclusive/prompts/n1-voicetest-NIA-ALTVOICE-DELIVERED-94afd8b5.txt`.**

### ✅ THE USER'S VERDICT, 17 Sep 2026: **"The voice is british"**

**This is the first render this session in which Nia's accent is present.**

### ⚠️ IT IS ONE CLIP AND THREE VARIABLES MOVED. DO NOT PROMOTE IT YET.

| | C1 `2a5a6765` — accent GONE | this `94afd8b5` — accent PRESENT |
|---|---|---|
| voice element | `12315c68` | **`b3d2fc9b`** |
| length / cuts | 18s, 9 cuts | **5s, 0 cuts** |
| staging | two women, intercut | **one woman, alone** |

**Any of the three could be responsible.** And there is a counter-data-point already
in this file: `51783a9e` is an **18s TWO-HANDER** in which the user said *"Nia has her
correct voice"* — with `12315c68` bound and an audio reference attached. So "short and
solo" has as strong a claim on this result as the element swap does.

**⛔ THE LOCK CARD DOES NOT CHANGE ON THIS.** Adopting an element off a single
approving artefact is exactly what cost the 135-credit Clip 5 re-shoot: `de50f37f` was
approved by ear on a 1-credit TTS render, adopted as Chi's element, and the next render
made with it was rejected. **One clip is an observation. Nia's voice element remains
`12315c68` until a controlled test says otherwise.**

### THE CONTROL THAT SETTLES IT — 45 credits, ONE variable

Re-run `n1-voicetest-NIA-ALTVOICE-DELIVERED-94afd8b5.txt` with `12315c68` back in
place of `b3d2fc9b`. Everything else identical — same 5s, same solo staging, same
locked set, same line, same params.

| outcome | what it means |
|---|---|
| **still British** | the ELEMENT is not the cause. Short + solo staging is. The Lock Card is unchanged and the fix is a staging fix — which is also §5a's one-woman-per-generation hypothesis, arriving by a different road. |
| **flat / not British** | **`b3d2fc9b` really is the better Nia element.** That is a change to a settled fact and should be ruled on by the user explicitly, per the Lock Card. |

Either answer is worth having, and it is the cheapest decisive test available.

---

## 9. C1 v2 — THE CONTROLLED RE-SHOOT, job `903a4d2b`, 162 credits, 17 Sep 2026

**The user's call, and it was the better experiment:** re-run C1 itself with
`b3d2fc9b` instead of the 5s control. Length, cut count and staging all held at
C1's values, **one token changed**. Against C1's accent-gone result that is a true
one-variable comparison, and it yields a usable clip if it lands.

| | C1 `2a5a6765` | **C1 v2 `903a4d2b`** |
|---|---|---|
| voice element | `12315c68` | **`b3d2fc9b`** |
| cuts | 9 / 9 | **9 / 9 ✅** |
| words | 41 / 41 verbatim | **42 — see below ❌** |
| bitrate | 9.41 Mbps | 10.05 Mbps |
| sharpness | 15–16 / 23–26 by room | 20.0, range 13.0–29.2 (same two-room banding) |
| duration | 18.04s | 18.04s |

### ❌ NEW FAILURE MODE: STAGE DIRECTION WAS SPOKEN ALOUD

The transcript reads **"Caught, warm, that was a very long mm."**

The prompt line above that beat is:
`*** HER FACE CHANGES — CAUGHT, WARM, PLEASED AND TRYING NOT TO SHOW IT. ***`

**The model read `CAUGHT, WARM` as dialogue**, and ChiChi's `"...Mm."` was absorbed
into the same segment instead of being delivered as its own line. That is the 42nd
word and the two merged lines.

**This is §5's "you cannot negate a string by quoting it" in a new place.**
CAPITALISED STAGE DIRECTION SITTING IMMEDIATELY BEFORE A DIALOGUE LINE CAN BE READ
AS DIALOGUE. The caps and the `***` markers do not mark it as non-spoken — they make
it look like emphasis on a line. C1 got this right with the identical text, so it is
a **re-roll variance, not a structural fault** — but the exposure is real and it is
now known. **The fix is to describe the beat in lower-case prose, or move the
direction away from the dialogue line, never to add "do not say this".**

### PITCH — FLAGGED, NOT A VERDICT

Measured per line, never bucketed by who was *scripted* to speak (§7):

| line | dur | f0 | trust |
|---|---|---|---|
| "He said it, he said the word." | 1.58 | **222.2 Hz** | OK |
| "Exclusive, out loud with his mouth." | 2.00 | **170.2 Hz** | OK |
| "Okay, I'm happy for you." | 1.48 | **210.5 Hz** | OK |
| "Good, because Kel asked…" | 1.96 | 175.8 Hz | OK |
| "Caught, warm, that was a very long mm" | 2.68 | 179.8 Hz | OK |
| the four one-word lines | 0.36–0.62 | 161–235 Hz | **TOO SHORT — ignore** |

**The two Nia lines disagree with each other (222.2 vs 170.2) and ChiChi's one
reliable line reads 210.5 Hz**, which is high for her and above one of Nia's. Under
§5a that pattern is what "voices converged/swapped" looks like — **and under §7's
absolute rule it FLAGS and nothing more.** Cross-clip pitch bands are unreliable,
short lines are unreliable, and whose mouth moves is a visual fact. **The user's ear
and eye settle it. Nothing is reverted on these numbers.**

### WHAT THIS CLIP CAN AND CANNOT DECIDE

It is the clean element test: if Nia is British here and was not in C1, **the element
is the cause** and `b3d2fc9b` becomes a real candidate to replace `12315c68` — a Lock
Card change, to be ruled on explicitly by the user, never inferred.

If she is not British here, then `94afd8b5`'s British Nia came from **short + solo
staging**, not the element, and that is the more valuable answer: it costs no Lock
Card change and it is §5a's one-woman-per-generation hypothesis arriving by a
different road.

**Awaiting the user's ear.**

---

## 10. THE FULL C1 DIALOGUE AS TTS — 10 lines, **1.8 credits**, 17 Sep 2026

All ten C1 lines at `speech_rate: 50`, each woman on her own element.
**Confirmed from `transactions`, not estimated: 0.1–0.3 per line, 1.8 total.**
Against **162 credits** for one 18s render — **90x cheaper for the whole scene.**

Assembled scene track, 0.2s between lines per §6: **14.42s** (12.62s speech + 1.8s
gaps), **3.25 w/s**. Library media `a7b9ca02-5879-484e-94eb-363074fc4fa3`.
**It fits INSIDE C1's 18s container with headroom** — so +50 does not merely match
render pace, it leaves room for the wordless beats.

| # | who | job | result |
|---|---|---|---|
| 1 | NIA | `dbeb9abb` | ✅ verbatim |
| **2** | CHI | `c5f029cb` | ❌ "What word?" → **"What we're"**, 0.40s |
| 3 | NIA | `1f428322` | ✅ verbatim |
| **4** | CHI | `407d8ee9` | ❌ **dropped "Okay."** |
| 5 | NIA | `1fd529ff` | ⚠️ **"Cal"** again |
| **6** | CHI | `bc52a6fc` | ❌ "...Mm." → **"Hmm." at −24.1 dBFS**, 0.22s |
| **7** | NIA | `26dd2dd0` | ❌ **invented "I think"** |
| 8 | CHI | `0c1b14de` | ✅ verbatim |
| 9 | NIA | `5afec74f` | ✅ but 0.25s |
| 10 | CHI | `7f7b5685` | ⚠️ peaks **−1.2 dBFS** vs −6 to −10 elsewhere |

### 🔑 EVERY FAILURE IS A SHORT LINE. THE LONG ONES ALL CAME BACK VERBATIM.

Lines 1, 3, 5 and 8 — the four longest — transcribed exactly. **The two-word,
one-word and non-verbal beats are where `speech_rate: 50` breaks**, because it is
compressing lines that have no slack to give. **Do not apply one rate to a whole
script.** Long lines take +50; short lines need 0, or a re-roll, or they come from
the render.

### ⛔ CORRECTION: THE "KEL"/"CAL" FLAG IS BACK ON

§5a recorded that the +50 transcript read "Kel" and therefore "softened" the flag.
**A second +50 render of the SAME LINE at the SAME RATE reads "Cal".** Same config,
different result — so that was **re-roll variance, not a fix**, and the earlier
softening was wrong. Under §7, a transcript flipping between the right word and a
different word across identical runs is itself the signal. **Kel's name needs
phonetic spelling in every prompt, exactly as "jollof" did.**

### Two things that block this becoming a dialogue master

1. **Levels are inconsistent** — peaks span **−1.2 to −24.1 dBFS**. Per-line level
   matching is required before assembly, measured on each line's own speech (the
   §5a revoice recipe already has the method). No normalisation was applied here:
   the only processing was a conservative head/tail trim at −45 dBFS.
2. **The held "...Mm." does not survive TTS.** It is a non-verbal beat, and it came
   back as a 0.22s "Hmm" 14 dB below everything else. **Non-verbal beats — a held
   sound, a laugh, a breath — belong to the RENDER, not the TTS track.** The
   audio-first workflow covers dialogue; it does not cover vocalisations.
