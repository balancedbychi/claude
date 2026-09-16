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

## 5. What to listen for — the part I cannot do

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
- ⏸ **Awaiting the user's ear on the two recommended references.**
- ⛔ No paid generations until then — the 5-step protocol starts after selection.
