# "Fourpence" — Edit Assembly Sheet (v3, measured)

12 video clips (1080×1920, 8s, silent) + 12 VO lines in Nia's voice.
Timeline built on **measured** VO durations, not estimates.

**Anchor still (Nia, locked):** `5f5536db-3928-467f-a784-8f1302dabd11`

**Voice reference (IMPORTANT):** `8969e771-7c1b-4c24-8f0d-3b2668fdda46`
The voice could **not** be saved as a named element — the account is at its
3-voice limit (Chi3, Chi2, Chi's-voice). Nothing was deleted. Instead the VO is
generated with `seed_audio` cloning from this audio media_id passed as
`audio_references`. **Reuse this exact media_id on every future episode** and the
voice stays consistent without occupying a slot. If you'd rather have a proper
named "Nia" voice, free a slot and say so.

---

## TIMELINE (90.0s exactly)

| # | Video job | VO job | VO len | Shot | In | Caption |
|---|---|---|---|---|---|---|
| 01 | `e3db1d06` | `a041ecb8` | 8.60s | **9.0s** | 0:00.0 | WHITECHAPEL, 1888 |
| 02 | `217150ae` | `2ae8d61a` | 5.71s | 6.0s | 0:09.0 | THAT'S NOT FOG |
| 03 | `ca76c393` | `9dc91ade` | 7.05s | 7.5s | 0:15.0 | 80,000 PEOPLE |
| 04 | `64516fd9` | `1c37fe4f` | 7.67s | 8.0s | 0:22.5 | ONE PATROL EVERY 30 MINUTES |
| 05 | `03513eec` | `38eabdab` | 7.21s | 7.5s | 0:30.5 | 233 LODGING HOUSES |
| 06 | `1f8c07aa` | `b20b8252` | 5.88s | 6.0s | 0:38.0 | 4d = A BED |
| 07 | `1146ffed` | `0477e031` | 6.56s | 7.0s | 0:44.0 | NO 4d = THE STREET |
| 08 | `7f694c54` | `c8798179` | 9.23s | **10.5s** | 0:51.0 | 31 AUGUST 1888 |
| 09 | `9c720c4b` | `259b99df` | 6.22s | 7.5s | 1:01.5 | "WHAT A JOLLY BONNET I'VE GOT NOW" |
| 10 | `d72bfb1a` | `a0bf976e` | 3.95s | 4.0s | 1:09.0 | SHE WAS THE FIRST |
| 11 | `837017ef` | `60f72ab6` | 8.60s | **9.0s** | 1:13.0 | 5 WOMEN · 10 WEEKS |
| 12 | `4e381231` | `c540c0fa` | 5.87s | 8.0s | 1:22.0 | IT WAS ALWAYS FOURPENCE |

VO totals **82.56s** in a 90.0s timeline — 7.44s of silence budget.
Deceleration holds: first half 7.29s average, second half 7.80s.

## WHAT THE MEASURED READ CHANGED

The v2 plan was built on a 150 wpm estimate. Her actual delivery varies a lot
per line (105–203 wpm), which moved the problem shots:

- **04, 05 and 09 are no longer over** — they now fit inside 8s comfortably. The
  tightened v2 wording for 04 and 05 is what makes that true, so keep it.
- **01 and 11 are now over**, which v2 did not predict.
- **08 is still over** at 9.23s and remains the longest line in the video.

**Three shots need a freeze-frame extension:** 01 (+1.0s), 08 (+2.5s), 11 (+1.0s).
All three are slow or near-static, so a held final frame is undetectable.

## CHECK THIS BEFORE EXTENDING 01 AND 11

Both landed at **exactly 8.60s** — an identical duration for a 15-word line and
an 18-word line, at 105 and 126 wpm when every other line runs 133–203. That
strongly suggests trailing silence padded onto the render rather than a genuinely
slower read.

Open both WAVs and trim the tail. If they come in under 8s — likely — shots 01
and 11 need no freeze at all, and shot 01 stops being a sluggish 9s opener,
which matters because it's the hook. Only shot 08 would then need extending.

If the tail is real speech and 01 still runs long, regenerate just that line with
`speech_rate` nudged up (0.6 credits) rather than stretching the picture.

## AUDIO MAP

| Range | Bed |
|---|---|
| 01–07 | Low sustained drone, no melody |
| 08 | **Cut to silence** on the frame change. 1s before the line starts. |
| 09 | Silent. No sting on the bonnet line — the silence is the sting. |
| 10 | Silence continues |
| 11–12 | Drone returns, resolves on the final line |
| 12 tail | 2.1s of held silence after the last word, into the loop |

## CAPTIONS

Burn on each shot's first frame, not progressively. Heavy white sans, hard black
stroke, center-lower, safe-area inset for the Shorts UI. Nothing readable was
generated in-frame, so all text is added in post.

## LOOP JOIN

Shot 12 ends on held silence over a near-static frame; shot 01 opens on the same
alley, lamp and anchor. Trim 12's tail so its last frame sits as close to 01's
first as possible.

## STILL OUTSTANDING

1. **Stitch** — 12 video clips + 12 WAVs into one 90s file.
2. **Captions burned**, audio bed laid per the map above.
3. **Thumbnail** — fear expression, WHITECHAPEL 1888 in Victorian wood-type,
   generated from the anchor so it matches.
