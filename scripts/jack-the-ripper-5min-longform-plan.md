# "I time travelled to Jack the Ripper's London in 1888!" — 5-minute long-form

Compressed from the 14-minute vlog script for the faceless YouTube channel.
**16:9 (1920×1080)** — long-form on the reference account is landscape; 9:16 was
for the Short. Seedance 2.0, std, 1080p, high bitrate, silent generation.

## Budget
17 new clips × 36 = 612 cr · 7 stills (nano_banana_pro 2k) · 24 VO lines × 0.6.
Balance at plan time: 2,384.

## Reused assets
- Identity anchor (Nia, Victorian): job `5f5536db-3928-467f-a784-8f1302dabd11`
  (refs on clips 1, 8, 10, 16, 17 — the shots she appears in)
- Voice reference: media `8969e771-7c1b-4c24-8f0d-3b2668fdda46` (seed_audio clone)
- Preset "IN THE DARK" (`24bae836-…`) pre-declined on night clips.

## Shot order (24 shots, ~290s + pauses ≈ 5:00)

| S | Asset | VO line (≈dur) | Stamp |
|---|---|---|---|
| 01 | CLIP 1 · Nia selfie, night alley (ref) | midnight, 31 Aug 1888, Whitechapel (9.6s) | WHITECHAPEL 1888 |
| 02 | CLIP 2 · POV smog street | coal smoke, horses, drains (10.8s) | |
| 03 | CLIP 3 · gas lamp in drifting fog | "most famous crime scene on Earth" (10.4s) | |
| 04 | CLIP 4 · market crowd, day | 80,000 people, 20 minutes across (8.4s) | |
| 05 | CLIP 5 · dark alley, lantern receding | no lighting, one patrol per half hour (8.4s) | 1 PATROL / 30 MIN |
| 06 | CLIP 6 · rooftop view, chimney smoke | "remember that number" (4.4s) | |
| 07 | CLIP 7 · lodging house wide | 233 doss houses, 8,000 sleepers (10.0s) | 233 LODGING HOUSES |
| 08 | CLIP 8 · coins in hand (ref) | fourpence, pay before you sleep (8.4s) | 4d = A BED |
| 09 | CLIP 9 · doorway turn-away, night | four pennies from the street (7.6s) | |
| 10 | STILL 1 · market stall, worn hands | eight shillings a week (11.2s) | |
| 11 | CLIP 10 · Nia at eel stall (ref) | jellied eels vlog beat (10.0s) | |
| 12 | STILL 2 · bread/milk/tea table | adulterated food (11.2s) | |
| 13 | CLIP 11 · dawn street, clusters | Mary Ann Nichols, Buck's Row (10.8s) | 31 AUGUST 1888 |
| 14 | STILL 3 · bonnet sepia portrait | Thrawl Street, jolly bonnet (16.8s) | |
| 15 | CLIP 12 · newsboys | press arrives, maps of Whitechapel (7.2s) | |
| 16 | STILL 4 · red-ink letter | "Jack the Ripper" was likely a journalist (18.4s) | "DEAR BOSS" |
| 17 | CLIP 13 · vigilance patrol | whistles, lanterns, private reward (10.8s) | |
| 18 | STILL 5 · chalked wall, sponge | Goulston Street erased before sunrise (20.8s) | |
| 19 | CLIP 14 · constable, lantern | 2,000 interviews, house to house (8.8s) | |
| 20 | STILL 6 · detective's desk | no fingerprints till 1901; "he beat 1888" (16.4s) | FINGERPRINTS: 1901 |
| 21 | CLIP 15 · women by fire | the five, named (8.4s) | |
| 22 | STILL 7 · five portraits row | attacked while asleep, no fourpence (13.6s) | 5 WOMEN · 10 WEEKS |
| 23 | CLIP 16 · Nia under lamp (ref) | "it isn't a story about a monster" (9.6s) | |
| 24 | CLIP 17 · Nia walks into fog (ref) | comments + subscribe (8.8s) | SUBSCRIBE |

Clips render at 8s; overruns covered by tail freeze (max 3.3s, all on near-static
shots). Stills carry the long archival lines — they can hold any length under a
slow Ken Burns push. Assembly: same ffmpeg pipeline as the Short, 1920×1080,
silence-trimmed VO, stamps burned Montserrat ExtraBold. No music bed (speech-only
audio models) — drone map: under 01–12, out at 13, silent 14, back 15–24.

---

## BUILD RECORD (final render)

**Output:** `ripper-1888-5min-1920x1080.mp4` — 1920×1080, 30fps, H.264+AAC,
**277.0s (4:37)**, 196 MB, media_id `bb894c24-5406-43b9-a5c1-3ffc0188b05f`.

Generated: 17 clips + 7 stills + 24 VO lines, **zero failed jobs**. The dawn
street shot was the only preset interception this run — the pre-declined night
shots all passed, confirming `declined_preset_id` works preemptively.

**Timing came from measured VO, not the 150wpm estimate.** Her long-form read
ran much slower than the Short (down to ~90wpm on atmospheric lines), so eight
clip segments needed 3–8s more than their 8s of footage. Freeze-frames at that
length look broken on shots with people, so those eight (01, 02, 07, 11, 13,
17, 21, 24) were re-rendered with a frame-blended slow-down
(`setpts` + `framerate` interpolation, 1.18×–1.96× stretch) instead — on fog,
firelight and slow drift it reads as deliberate slow motion. Stills carried the
five longest lines (up to 19.9s) under a Ken Burns push, which is why the shot
plan put the archival beats on stills in the first place.

Runtime landed at 4:37 rather than 5:00 because pads were kept tight (0.5s)
against the slower read. To hit 5:00 exactly, widen the pads on the section
boundaries (shots 9→10, 12→13, 22→23) by ~1.5s each rather than stretching
any shot further.

Still outstanding: music/ambience bed (speech-only audio models — drone map in
the plan above), thumbnail, YouTube title/description.
