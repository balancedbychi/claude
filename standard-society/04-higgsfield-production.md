# Higgsfield Production Notes

Everything needed to turn the scripts into assets. **Read §1 first — it's the one real blocker left.**

---

## 1. Nia's voice — the thing that isn't what it looks like

Her Element is done: `bcd528d3-9756-4190-ba80-4aaae881f2b2`.

Her **voice is a different problem, and worse than a missing asset.** All four Titanic
generations passed a single image and nothing else — no audio input, no voice element, no
`voice` parameter. Seedance 2.0 synthesised that voice on the fly from one line of prompt text:

> *"speaking with accurate lip sync, warm low British-accented young female voice, dry and warm"*

So the voice you want **does not exist as an asset anywhere.** It exists only baked into the
audio tracks of those four MP4s. Nothing in the workspace can reproduce it, and re-running the
same prompt gives a *similar* voice, not the same one — which is exactly the drift that kills a
recurring character posting daily.

### To solidify it

This has to happen on your machine — this session's network policy blocks the Higgsfield CDN,
so I can't pull the MP4s down and extract the audio here.

1. **Download the source clip.** Best candidate is the dawn recap, generation
   `0ebb7644-76dd-497b-a818-d5526b421ee5` — calmest ambient bed (gulls and a low engine thrum),
   longest continuous speech, and the driest delivery, which is the register you want locked.
   Avoid the lifeboat clip (`8ebe04a8`): hissing steam and shouted orders will poison the clone.
   Avoid the staircase clip (`66d2b6e1`) too — a string quartet is tonal and very hard to separate.
2. **Extract the audio** to WAV or MP3. QuickTime → Export As → Audio Only works; so does
   `ffmpeg -i nia.mp4 -vn -acodec pcm_s16le -ar 44100 nia_voice.wav`.
3. **Trim to speech only.** Cut the silent head and tail. Cloning wants 10s–3min of clear speech;
   the dawn clip gives roughly 15–18s, which is enough but not generous.
4. **Clone it** in the Create Voice widget (upload tab), named `Nia's-voice`.
5. **Verify before batching.** Generate one short line and listen. A clone off AI-generated audio
   with an ambient bed can come back thin or with artefacts baked in.

### Two things to check first

**Do the four clips actually sound like the same person?** Seedance rolls the voice per
generation, so they may not be identical. Play them back to back. If they match, you can
concatenate the speech from all four for ~60s of source material and get a stronger clone. If
they don't, use the dawn clip alone — blending four near-misses produces a mushy average that
sounds like none of them.

**If the clone comes back weak,** the fallback is to pick the best Seedance roll you can get from
a fresh clean-room generation — Nia in a quiet interior, prompt ending *"no ambient audio, no
music, no background noise"* — and clone from that instead. You lose the exact Titanic voice, but
you gain a locked one, and locked beats identical-once.

### Why this is worth the trouble

Once `Nia's-voice` exists, Nia moves onto the same pipeline Chi already uses, and that's a real
upgrade over what the Titanic clips did:

```
generate_audio (seed_audio + Nia's-voice element)  →  @Audio1
        ↓
generate_video (seedance + Nia Element + @Audio1, lip-sync every word)
```

Identical voice every post, delivery you can tune with `speech_rate`, and script edits that don't
require re-rolling the video. Until then, every Nia clip is a fresh roll of the dice.

---

## 1b. The muffle — diagnosed and fixed

The first clone came back muffled. It was measured, not guessed, and there were three causes.

### What the source actually is

The Titanic audio is **32 kHz AAC**. Measured against the 300–1700 Hz body band:

| Band | Source | Clear speech should be |
|---|---|---|
| Presence (2.5–5.5 kHz) | **−11.8 dB** | ≈ −7 dB |
| Air (8 kHz+) | **−20.9 dB** | ≈ −16 dB |

Air sitting 21 dB under the body **is** the muffle. There is also no silence anywhere at −34 dB,
so the gull-and-engine bed runs continuously underneath every word.

### The four clips are not all the same voice

Fundamental frequency, measured by autocorrelation:

| Clip | f0 | Verdict |
|---|---|---|
| Dawn recap | **183.9 Hz** | reference |
| Grand staircase | **181.8 Hz** | same voice (1% apart) |
| Bow at dusk | 191.2 Hz | 4% high — borderline |
| Lifeboat deck | **207.8 Hz** | **~2 semitones up — a different roll** |

Seedance rolls the voice per generation. Training a clone across all four blends two-plus
different women, which is itself a cause of thickness. **Only the dawn recap is usable.**

The staircase clip was tried and rejected: it carries **4.7 dB more low-mid energy** than the dawn
clip — the string quartet's cello register, sitting exactly where her voice lives. High-passing at
130, 150 and even 170 Hz (her own fundamental) only recovered 2 dB, so it cannot be separated
without damaging her. Twelve seconds of clean, internally consistent material beats twenty-four
where half is contaminated.

### The restoration chain

Run in the Higgsfield sandbox (`sandbox_exec` has ffmpeg, sox, python3 and internet access, and
reaches the CDN that this session's network policy blocks).

```bash
ffmpeg -i nia.mp4 -vn -ac 1 -ar 48000 -c:a pcm_s16le raw.wav
sox raw.wav -n trim 3.2 0.4 noiseprof nia.prof      # quietest window = 3.2s

sox raw.wav out.wav \
    highpass 85 \                      # engine rumble, safely below her 184 Hz fundamental
    noisered nia.prof 0.12 \           # light — heavy denoise DULLS, making the muffle worse
    equalizer 3400 0.7q 8.5 \          # presence: intelligibility and consonants
    equalizer 5500 1.2q 3 \            # bite
    treble 3.5 9000 \                  # air
    gain -n -1.5

sox out.wav final.wav rate -v 44100
ffmpeg -i final.wav -codec:a libmp3lame -b:a 320k -ar 44100 -ac 1 clean.mp3
```

### Result

| | Source | Restored | Target |
|---|---|---|---|
| Presence | −11.8 dB | **−7.2 dB** | −7.0 |
| Air | −20.9 dB | **−16.3 dB** | −15.5 |
| Rumble | −11.8 dB | **−16.5 dB** | lower |
| Warmth | −1.2 dB | −2.4 dB | unchanged |
| **f0** | **183.9 Hz** | **183.8 Hz** | unchanged |
| **f0 range (p10–p90)** | **167–210 Hz** | **166–210 Hz** | unchanged |

Pitch and pitch range are identical, and warmth moved 1.2 dB. **The tone is the same voice —
only the missing top was restored.** That is the whole requirement: add what was absent, touch
nothing that carries identity.

### What the re-clone actually changed — measured

Rendering the same line through both clones, at 44.1 kHz with identical settings:

| | Presence | Air | Warmth |
|---|---|---|---|
| v1 (cloned from raw audio) | −6.8 dB | −17.1 dB | −2.4 dB |
| v2 (cloned from restored audio) | −6.8 dB | −17.1 dB | −2.4 dB |

**Identical.** Both renders are spectrally healthy, and the restoration did not change the output's
frequency balance. Two conclusions follow, and neither should be softened:

**The muffle was probably never in the generated speech.** The v1 clone's *renders* already
measured fine. What almost certainly sounded muffled was the **widget preview** — a lossy MP3 of
the raw, unprocessed 32 kHz source, which measures −11.8 dB presence and −20.9 dB air. Always judge
a clone on a generated line at 44.1 kHz, never on its preview.

**seed_audio's vocoder normalises the output spectrum**, so source cleanliness moves the rendered
tone far less than expected. Restoring the source is good hygiene and fixed a real, measured defect
in the asset, but it is not a lever on output brightness. If a render genuinely sounds dull, reach
for `sample_rate: 44100` and `loudness_rate` first — those cost about two credits, against forty
for a clone.

Where v2 is still the better asset: it is trained on **one verified voice roll** (183.9 Hz) rather
than possibly-blended material. That affects identity consistency across many posts, which one
render cannot measure. It is the right asset to keep; just don't expect it to sound brighter.

### One operational warning

**Deleting a voice appears to take its generated audio with it.** The v1 render returned HTTP 200
before the voice was deleted and HTTP 403 afterwards, from the same CDN that still serves v2 fine.
Before deleting any voice element, download anything generated with it that you still need.

### Delivery — tested values for sounding 2026

Her clone carries period delivery from its source. **Pace is the correction, and it works.**
Four renders of the same 33-word line through `Nia-voice-v2-clear`:

| `speech_rate` | Duration | WPM | Register |
|---|---|---|---|
| 0 (default) | 15.38s | 129 | period / declamatory |
| +15 | 14.60s | 136 | period / declamatory |
| +15 (repeat) | 15.83s | 125 | period / declamatory |
| **+25** | **11.59s** | **171** | **modern casual** ✅ |

Modern casual British speech runs 150–190 wpm; declamatory sits 120–140. **Default settings put
her at 129 — genuinely period.** `speech_rate: 25` lands her at 171, right in the pocket. Use it as
the standing default for Nia; drop to +20 on longer scripts so the jokes still have room.

**`expression_intensity` is ignored.** All four jobs were submitted with 5, 4, 3 and 8 — the API
echoed `expression_intensity: 5` on every one. It is not a working dial through this path, so don't
plan around it. `speech_rate` is the lever you have.

**Budget ~±8% run-to-run variance.** Two renders at identical settings came back 125 and 136 wpm.
For a talking video where timing carries a joke, generate the audio twice and keep the better take
— it's about 2 credits.

### Two rules for any future clone

**Never clone from raw Seedance audio.** It is 32 kHz, air-starved, and carries whatever ambience
the prompt asked for. Always restore first.

**Always check f0 across clips before combining them.** Two clips more than ~2% apart in
fundamental are different voices, and blending them is why a clone comes back thick.

---

## 2. Asset register


| Asset | Type | ID |
|---|---|---|
| Chi — Soul | `soul_2` | `a2c197f1-3e10-4523-8b13-31e8e3bdfeca` |
| Chi — Element | character | `6df69ad5-704b-497b-b5b8-c0ae9f332ee8` ✅ **Chi-Standard-Society** |
| Chi — Voice | voice element | `b07beaa5-2b64-4f21-926d-050fd952b8a6` |
| Chi — Alt voice | voice element | `180fdb9a-7c0b-469e-be49-3f76692a3968` |
| Nia — Reference | image_job | `362ecc5e-b110-4855-9334-5717c4082e08` |
| Nia — Element | character | `bcd528d3-9756-4190-ba80-4aaae881f2b2` ✅ |
| Nia — Voice | voice element | `12315c68-37de-41fe-8766-76ac07bcaf70` ✅ **Nia-voice-v2-clear** |
| Titanic footage | 4 × `seedance_2_0` | `0ebb7644…` `66d2b6e1…` `d8600d66…` `8ebe04a8…` |

---

## 3. Model routing

| Job | Model | Why |
|---|---|---|
| Chi balcony talking-head | `seedance_2_5` + `Chi's-voice` audio | Your proven path. Don't change what works. |
| Nia selfie-vlog | `seedance_2_0` + `Nia's-voice` audio | Same pipeline as Chi, once the voice is cloned. Native Seedance voice only as a stopgap — it re-rolls every clip. |
| Two-hander | Generate each character **separately**, cut together | Soul takes one `soul_id` per generation. Never try to put both in one shot. |
| Carousel stills | `nano_banana_pro` / `seedream_v4_5` with Element placeholders | Elements support multiple refs; Soul does not. |

**Two-hander workflow.** Nia's half and Chi's half are separate generations joined in the edit. This isn't a limitation to work around — the split *is* the format. They're never in the same room, and the cut between them is what makes the point.

---

## 4. Prompt scaffold

### Chi — balcony talking head

```
@Image1 is the identity reference. Preserve this adult woman's exact face, warm brown
complexion, almond-shaped dark eyes, full brows, cheek beauty mark, glossy neutral lips,
honey-blonde shoulder-length blowout with darker roots, small stud earrings, adult age,
and realistic full-figured proportions. [Reuse your established proportion-lock wording
here verbatim.]

Wardrobe: deep navy cropped wrap blouse, matte crinkled fabric, deep V-neck, short loose
dolman sleeves, prominent centre-front knot with hanging tie tails, asymmetric
off-one-shoulder drape. No wardrobe changes or morphing.

@Audio1 is the exact Chi voice track. Lip-sync every word precisely, including the final
line "<LAST LINE>". Speech begins immediately and stays brisk and continuous. No long
pauses, dead air, or lingering silent reaction shot.

Authentic vertical iPhone talking-head on a bright high-rise balcony, softly blurred city
skyline, natural daylight from camera-right. Direct, grounded, empowering delivery — not
angry. Slight handheld micro-motion, crisp hard cuts.

0.0–4.5s   medium close-up, immediate speech, direct eye contact, open-palm emphasis
4.5–8.5s   hard cut tighter; firm expression, one decisive nod, uninterrupted
8.5–13.0s  hard cut lower medium close-up; chest-level boundary gesture
13.0–16.5s tight close-up, confident eyebrow lift, continuous speech
16.5–20.0s medium close-up, open hand toward viewer on the CTA, confident nod on the cut

Both hands entirely ring-free in every frame. She is unmarried: no wedding band,
engagement ring, rings, bracelets or hand jewellery. Stud earrings only, no necklace.
HANDS: smooth and youthful, matching the apparent age of her face exactly - even skin tone,
soft full backs of the hands, plump smooth fingers, taut skin over the knuckles, natural
short nails. NO prominent or raised veins, NO visible tendons, NO crepey wrinkled or papery
skin, NO age spots, NO bony knobbly knuckles, NO thin translucent skin.
Realistic fingers, anatomy, skin texture and fabric physics; consistent identity across
cuts. No captions, subtitles, on-screen text, watermark, music, extra people, or
background changes.
```

### Nia — selfie vlog

```
Handheld smartphone selfie-vlog footage, <LOCATION, TIME OF DAY, LIGHT>.

NIA, the exact woman from the reference image — deep warm brown skin, waist-length
jet-black water-wave curls, diamond studs, thin gold choker, <WARDROBE in camel/cream/
taupe/gold> — <ACTION with the battered yellow spiral notebook>, speaking with accurate
lip sync, warm low British-accented young female voice, dry and warm: "<SCRIPT>"

<CLOSING BEAT — a look to lens, a written line, a half-smile.>

Ambient audio: <2–3 real sounds for the location>. Photorealistic smartphone vlog look,
<LIGHTING>. Vertical 9:16. No visible on-screen text, captions, watermark or music.
```

The pieces that carry her identity are the **specific location**, the **notebook action**, and the **"dry and warm" voice direction**. Keep those three and she holds; drop them and she drifts.

---

## 5. Batch plan for week 1

`generate_video_batch` → `jobs_wait` → one `show_generation_by_ids`. Don't pull generation history to review a batch.

| Batch | Contents | Notes |
|---|---|---|
| **A** | Chi × 7 (C-1…C-7) | One audio track per script first, then video. Same balcony, same wardrobe — highest consistency, cheapest run. |
| **B** | Nia × 7 (N-1…N-7) | Audio first, then video — same two-step as Chi. **Vary location per script;** seven identical-looking Nia posts read as lazy on the grid. |
| **C** | Two-hander halves × 14 | Generate Nia halves and Chi halves, cut in post. |
| **D** | H-1 | Only the two present-day shots are new — the Titanic thirds are archive. |

Chi's audio is a separate `seed_audio` generation using her voice element, fed into the video as `@Audio1`. That's the path that produced your best existing result — keep it.

---

## 6. Consistency traps

- **Rings on Chi.** Your own prior prompts fight this explicitly. It will recur. Check every frame.
- **Chi's necklace.** She wears none. The choker belongs to Nia and is a key identity separator.
- **Nia's curl length.** Waist-length. Models shorten it. State the length every time.
- **The notebook.** *Battered*, *yellow*, *spiral*. Generic notebooks kill the visual system.
- **Nia's accent.** Re-rolls on every single generation until the voice element exists. This is the one that will quietly ruin the character — a viewer won't articulate it, she'll just stop believing Nia is a person.
- **Burned-in captions.** Every prompt says no on-screen text. Add captions in the edit so you can revise the hook without regenerating.

---

## 7. Post-production

- **9:16, 1080×1920.** Reels crop the top ~15% and bottom ~20% for UI — keep faces and text out of both.
- **Captions burned in at edit stage**, not generation. Nia's dry timing needs the text to land on her beat.
- **The cut between Nia and Chi is the joke and the point.** Hard cut, no transition, no crossfade. The tonal jolt — night to day, close to open, anxious to steady — is doing the work.
- **Covers:** hook line in brand type. Warm for Nia, cool for Chi. Alternating grid.
- **Under 3 seconds to first word.** Chi's prompts already enforce this; hold Nia to it too.

---

## 8. Roughly what week 1 costs

Balance at time of writing: **1,571 credits**, Ultra plan.

Week 1 is ~28 generations (7 Chi video + 7 Chi audio + 7 Nia + the hero's new shots + stills). Comfortably within budget, with room to re-roll the ones that drift. Budget 2–3 re-rolls per character-critical shot — identity drift is the main cost driver, not volume.
