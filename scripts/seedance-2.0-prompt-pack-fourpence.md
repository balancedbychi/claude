# Seedance 2.0 Prompt Pack — "Fourpence" (90s Short, 1080p)

Production pack for `jack-the-ripper-90s-short.md`. Host = the reference photo,
recast in 1888 Victorian costume and locked across all 12 shots.

---

## GLOBAL SETTINGS

| Setting | Value | Why |
|---|---|---|
| `model` | `seedance_2_0` | Reference-driven identity consistency, 1080p, 15s ceiling |
| `resolution` | `1080p` | As requested |
| `mode` | `std` | **Required** — `fast` caps at 720p |
| `aspect_ratio` | `9:16` | 90s vertical = YouTube Shorts. Say the word for 16:9. |
| `duration` | `8` (every shot) | See below |
| `generate_audio` | **`false`** | Critical — native audio invents dialogue and wrecks a scripted VO |
| `bitrate_mode` | `high` | Fog and shadow gradients band badly at standard bitrate |
| `genre` | `drama` | Not `noir` — it pushes toward black-and-white |
| `medias` | Character still as `image_references` | Identity lock, every shot |

**Why all 12 at 8s.** The script's shots run 5–10s. Generating everything at a
flat 8s yields 96s of raw for a 90s cut, so every shot carries trim handles and
the pacing gets built in the edit — where it belongs — instead of being frozen at
generation time. Uniform cost, uniform settings, nothing to re-run because a
shot came back 2s too short.

**Cost:** 36 credits × 12 = **432 credits** (of 1,264 available).

---

## STEP 1 — BUILD THE CHARACTER ANCHOR FIRST

The host is **Nia** — a recurring character across the channel, so her likeness
must stay locked shot to shot and video to video.

Do **not** feed the athleisure studio photo straight into 12 foggy Victorian
scenes. A white-cyclorama e-comm shot and a gas-lit alley are too far apart, and
identity will drift. Generate one approved still of Nia in full Victorian
costume, then use **that still** as `image_references` on all 12 clips.

### Model choice — do not use Soul 2 for this

`soul_2` runs with `enhance_prompt: true` permanently on and does not expose a
switch to disable it. On a costume-change brief it **discards the written prompt
entirely** and substitutes an auto-caption of the reference image, so the output
is a recreation of the input photo — modern clothing, studio backdrop and all.
Confirmed the hard way: the first two anchors came back as the athleisure shot
with the prompt replaced by a description of the green quarter-zip and the
"THE PLAN" notebook.

Use **`nano_banana_pro`** instead. No prompt enhancer, strong instruction
following, reference role is `image_references` (not `image`). The prompt is
stored and executed verbatim — check `params.prompt` on the returned job to
confirm it wasn't rewritten.

### Anchor prompt

Phrase it as an explicit **keep / change** instruction rather than a description.
Naming what to preserve and what to delete, item by item, is what makes it hold:

> Using the reference photograph, keep the woman's face, bone structure, skin
> tone and identity EXACTLY as they are. Change everything else completely.
>
> Replace her clothing entirely: she now wears authentic 1888 Victorian
> working-class dress — a heavy dark charcoal wool dress buttoned high to the
> throat with long sleeves to the wrist, and a worn, slightly frayed cream
> knitted shawl wrapped around her shoulders. Remove the crossbody bag, the
> notebook, the leggings, the socks and the sneakers entirely. Her hair is
> pinned up in a period style with loose curls escaping at the temples.
>
> Replace the white studio backdrop entirely: she stands on wet cobblestones in
> a narrow Whitechapel alley at night, thin fog drifting, a cast-iron gas lamp
> glowing off to her left, soot-stained brick walls behind her.
>
> Full-length shot. Muted desaturated grey-brown palette, naturalistic film
> grain, documentary realism, unretouched skin with visible texture, no modern
> objects of any kind, no glossy makeup, no studio lighting.

**Hair:** period-pinned, approved. Worth knowing that her long curls are her
most recognizable feature after her face, so if identity ever drifts in a later
episode, reverting to hair-down is the fastest fix — swap the hair sentence for
"the same long, loose, thick black curly hair falling well past her shoulders.
Do not restyle, pin up, straighten or shorten her hair."

Approve the anchor before spending anything on video. It is the cheapest place
to catch a wardrobe or identity problem, and every one of the 12 clips inherits
whatever it gets wrong.

## STEP 2 — THE 12 SHOT PROMPTS

Every prompt assumes the anchor still is attached as `image_references`.
Each opens by re-asserting identity — Seedance holds the lock better when the
prompt reinforces the reference rather than relying on it silently.

---

**01 · HOOK** — `CAPTION: WHITECHAPEL, 1888`
> Selfie POV vlog. The woman from the reference image, identical face and Victorian
> costume, holds the camera at arm's length with her arm visible in the bottom of
> frame. She stands in a fog-choked cobbled London alley at night, a single
> cast-iron gas lamp burning behind her, thick yellow-green coal smog reducing
> visibility. She glances back over her shoulder, unnerved, then returns her eyes
> to the lens. Subtle handheld shake, shallow depth of field, lamp bloom in the
> haze, cinematic documentary realism, 1888, no modern objects.

**02** — `CAPTION: THAT'S NOT FOG`
> Handheld POV moving slowly forward through dense yellow-brown coal smog in a
> narrow Victorian London street at night. A gas lamp haloed in thick smoke. A
> dark figure in a long coat crosses the frame and vanishes into the murk.
> Visibility under ten feet. Eerie, still, cinematic, heavy atmosphere, 1888.

**03** — `CAPTION: 80,000 PEOPLE`
> Handheld camera pushing through a crowded Victorian East End London market street
> in daylight, 1888. Costermonger barrows piled with goods, ragged children,
> laundry strung on lines overhead, thick mud underfoot, bodies pressing past the
> lens and jostling the camera. Desaturated grey-brown haze, soot on every surface,
> documentary realism, no modern objects.

**04** — `CAPTION: ONE PATROL EVERY 30 MINUTES`
> POV walking from a dimly gas-lit Victorian street into a pitch-black narrow
> courtyard, brick walls closing in tight on both sides, no lighting at all. Far in
> the distance the small swinging light of a policeman's bullseye lantern recedes
> and disappears. Extreme contrast, deep crushed shadow, ominous, 1888, cinematic.

**05** — `CAPTION: 233 LODGING HOUSES`
> Slow wide handheld shot inside a Victorian common lodging house, 1888. Rows of
> narrow iron beds packed close together under a low smoke-stained ceiling. Thirty
> poor men and women settling for the night. Firelight and a single oil lamp,
> heavy shadow, damp air. Gritty documentary realism, no modern objects.

**06** — `CAPTION: 4d = A BED`
> Extreme close-up of the reference woman's hand, dirt under the fingernails,
> holding four Victorian copper penny coins in her open palm. Firelight flickers
> across the tarnished metal. Lodging house interior blurred behind. Very shallow
> depth of field, warm low light, macro detail, 1888.

**07** — `CAPTION: NO 4d = THE STREET`
> Victorian lodging house doorway at night, 1888. A hard-faced deputy stands
> blocking the door holding a lamp. A woman in a shawl is turned away and steps
> down onto the dark rain-slick cobbled street, seen from behind, receding.
> The door closes. Cold blue night light against warm interior spill. Cinematic,
> restrained, no violence, no confrontation.

**08 · THE TURN** — `CAPTION: 31 AUGUST 1888` *(hold static — the only locked-off shot)*
> Locked-off static shot. An empty Victorian London street at night, 1888. Wet
> cobbles gleaming under a single gas lamp, thin fog drifting slowly through the
> frame. A closed lodging house door at the edge of shot. Completely empty of
> people. Still, quiet, melancholy. Almost no camera movement. Cinematic.

**09** — `CAPTION: "WHAT A JOLLY BONNET I'VE GOT NOW"`
> Slow gentle push in on a period photographic portrait of a working-class
> Victorian woman in her early forties wearing a simple black straw bonnet, 1888.
> Sepia photographic plate, soft even light, dignified and direct gaze. Respectful
> documentary portrait, subtle film grain, aged paper texture.

**10** — `CAPTION: SHE WAS THE FIRST`
> A Victorian newspaper lying on wet cobblestones in the rain, 1888. Headline type
> present but blurred and illegible. Gas lamp reflection shimmering in the puddle
> beside it. Rain dimpling the water. Moody, low light, shallow focus, cinematic.

**11** — `CAPTION: 5 WOMEN · 10 WEEKS`
> Five simple sepia period portraits of working-class Victorian women, arranged in
> a slow vertical scroll on a dark ground. Soft vignette at the edges. Respectful
> memorial framing, aged photographic texture, no text, no captions. Very slow
> upward drift.

**12 · PAYOFF + LOOP** — `CAPTION: IT WAS ALWAYS FOURPENCE`
> Selfie POV vlog, matching the opening shot exactly in framing and lens. The woman
> from the reference image, identical face and Victorian costume, stands under the
> same cast-iron gas lamp in the same fog-choked alley, arm extended holding the
> camera. She looks directly into the lens, quiet and level, no longer afraid.
> Minimal movement. Cinematic, documentary realism, 1888.

---

## STEP 3 — POST

Seedance returns 12 silent clips. Everything else is assembly:

1. **Trim to the script's beats** — 5, 6, 6, 9, 8, 7, 8, 10, 9, 6, 8, 8 = 90s.
   Shots 01–07 stay brisk; 08–12 breathe. Don't even out the pacing.
2. **VO** — one voice, calm, unhurried. Record or generate to the script, then
   cut picture to voice, not the other way round.
3. **Captions burned in** on each shot's first frame — heavy white sans, hard
   black stroke, center-lower. The `subtitles` workflow can burn these if you want
   Whisper-timed word-level captions instead of the fixed cards.
4. **Audio bed** — low sustained drone under 01–07, cut to silence on 08, hold
   silent through 09, drone returns under 11 and resolves on 12. No sting on the
   bonnet line; the silence is the sting.
5. **Loop join** — trim 12 so its last frame sits as close to 01's first frame as
   possible. This is what earns the replay.

## KNOWN RISKS

- **Identity drift** on shots 01 and 12 — they're the two that must match each
  other exactly. Generate both, compare, re-run whichever wanders.
- **Modern contamination** — Seedance occasionally slips a modern face, hairstyle,
  or clean garment into period crowds. Check 03 and 05 closely; they have the most
  extras.
- **Shot 09 and 11** are archival-style portraits, not the host. If the model
  keeps inserting her face, generate them as stills and animate with a slow Ken
  Burns move in the edit instead — cheaper and more controllable.
- **Text in frame** — never ask Seedance for legible signage or headlines. Shot 10
  specifies blurred type deliberately. All readable text is added in post.

---

## BATCH SUBMISSION GOTCHAS (learned in production)

**1. Preset interception.** Six of the twelve — every night exterior — came back
`submission_failed` with *"Preset \"IN THE DARK\" was recommended instead of
submitting a job."* No job is created and nothing is charged; the server offers
a styled preset instead. Accepting it would impose the preset's own look and
break continuity with the shots that submitted normally. Decline and resubmit
with `declined_preset_id` set to the offered preset id. The decline applies to
that one retry only, so it goes on every affected request in the resubmission.

**2. Attach the character reference only where the character appears.**
Passing Nia's anchor on all twelve would contaminate the shots she isn't in —
09 and 11 are archival portraits of *other* women, 02–05 are POV with her behind
the camera. Reference goes on **01, 06, 12** only. The rest hold the look through
prompt language (`desaturated grey-brown`, `soot`, `1888`, `no modern objects`).

**3. `generate_audio: false` is not optional.** Seedance's native audio invents
dialogue. On a scripted-VO piece that is unusable, and you pay for it either way.

**4. Nano Banana Pro reports as `nano_banana_2`** in job status responses. That
is the same model, not a silent downgrade.

**5. Verify the stored prompt.** After submitting, check `params.prompt` on the
returned job. If it does not match what you wrote, an enhancer rewrote it — kill
the batch before it renders rather than paying to find out.
