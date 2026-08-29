# "Fourpence" — Edit Assembly Sheet (v2, timing-corrected)

12 × Seedance 2.0 clips, 1080×1920, **8s each, silent**. 96s raw → 90s cut.
Rendered `mode: std`, `bitrate_mode: high`, `genre: drama`,
`generate_audio: false`. Nia's anchor attached on 01, 06, 12 only.

**Anchor still (Nia, locked):** `5f5536db-3928-467f-a784-8f1302dabd11`
Reuse this exact job id as the character reference on every future episode.

> **v2 changes.** Every VO line was measured at 150 wpm against its shot.
> Four shots — 04, 05, 08, 09 — needed more than the 8s of footage that exists
> (v1 named only three and missed 05). Shots 01–05 were all over their planned
> trims while 06, 07, 10, 11, 12 sat on 8.2s of unused slack. Lines 04 and 05
> are tightened below; the rest is redistributed. Total VO 86.0s in a 90.0s
> timeline, leaving 4s for the silence beats.

---

## TIMELINE (sums to exactly 90.0s)

| # | Job ID | In | Dur | VO | Caption | Line |
|---|---|---|---|---|---|---|
| 01 | `e3db1d06` | 0:00.0 | 6.5s | 6.0s | WHITECHAPEL, 1888 | "This is Whitechapel, 1888 — and tonight, whether you live comes down to four pennies." |
| 02 | `217150ae` | 0:06.5 | 7.0s | 6.8s | THAT'S NOT FOG | "I've just arrived and I genuinely can't see anything. And that's not fog — that's coal smoke." |
| 03 | `ca76c393` | 0:13.5 | 7.0s | 6.8s | 80,000 PEOPLE | "Eighty thousand people live in this district. You could walk across the whole thing in twenty minutes." |
| 04 | `64516fd9` | 0:20.5 | 8.0s | 7.6s | ONE PATROL EVERY 30 MINUTES | **(tightened)** "The main roads have gas lamps. The courts behind them, nothing. A constable passes maybe once every half hour." |
| 05 | `03513eec` | 0:28.5 | 8.0s | 7.6s | 233 LODGING HOUSES | **(tightened)** "This is where most people sleep. A common lodging house. Two hundred and thirty-three of them in Whitechapel alone." |
| 06 | `1f8c07aa` | 0:36.5 | 6.0s | 5.6s | 4d = A BED | "Fourpence gets you a bed. And you pay before you sleep. Every single night." |
| 07 | `1146ffed` | 0:42.5 | 6.5s | 6.0s | NO 4d = THE STREET | "No fourpence? The deputy puts you out at midnight. And then you're outside until morning." |
| 08 | `7f694c54` | 0:49.0 | **11.0s** | 10.0s | 31 AUGUST 1888 | "On the thirty-first of August, a woman called Mary Ann Nichols was turned out of a lodging house on Thrawl Street. She was fourpence short." |
| 09 | `9c720c4b` | 1:00.0 | **9.0s** | 8.4s | "WHAT A JOLLY BONNET I'VE GOT NOW" | "She laughed about it. She said she'd soon get her doss money — look what a jolly bonnet I've got now." |
| 10 | `d72bfb1a` | 1:09.0 | 5.5s | 4.8s | SHE WAS THE FIRST | "That's the last thing anyone recorded her saying. She was the first." |
| 11 | `837017ef` | 1:14.5 | 7.5s | 7.2s | 5 WOMEN · 10 WEEKS | "Over ten weeks, five women were killed here. And people still ask what kind of monster does that." |
| 12 | `4e381231` | 1:22.0 | 8.0s | 5.2s | IT WAS ALWAYS FOURPENCE | "Nobody asks why they were outside. It was fourpence. It was always fourpence." |

Deceleration preserved: shots 01–07 average **7.0s**, shots 08–12 average
**8.2s**. Do not even this out — it is the emotional structure.

## THE TWO SHOTS THAT EXCEED THEIR FOOTAGE

**08 → 11.0s from 8s of raw.** Freeze the final frame for 3s. This is the only
locked-off static shot in the video — a held frame is literally undetectable
here, and the stillness under the Nichols line is the point. Do not slow it;
slowing drifting fog reads as slow motion, a freeze does not.

**09 → 9.0s from 8s.** Hold the last frame 1s. It is a slow push-in on a static
photograph, so the same trick applies.

Shots 04 and 05 are solved in the writing instead — the tightened lines above
fit inside 8s with no manipulation. Use those, not the v1 wording.

## AUDIO MAP

| Range | Bed |
|---|---|
| 01–07 | Low sustained drone, no melody |
| 08 | **Cut to silence** on the frame change. 1s of silence before the line starts. |
| 09 | Silent. No sting on the bonnet line — the silence is the sting. |
| 10 | Silence continues |
| 11–12 | Drone returns, resolves on the final line |
| 12 tail | 2.8s of held silence after the last word, into the loop |

## CAPTIONS

Burn on each shot's **first frame**, not progressively. Heavy white sans, hard
black stroke, center-lower, safe-area inset for the Shorts UI. Nothing readable
was generated in-frame (shot 10's headline is deliberately illegible), so all
text is added in post.

## LOOP JOIN

Shot 12 ends on 2.8s of silence under a near-static frame; shot 01 opens on the
same alley, same lamp, same anchor. Trim 12's tail so its last frame sits as
close to 01's first as possible — that match is what earns the replay.

## STILL OUTSTANDING

1. **Voice** — the "Nia" clone did not complete; the account still holds only
   Chi3, Chi2 and Chi's-voice. Needs ~30s of clean speech uploaded through the
   Create Voice widget. The source MP4 (260 MB) is over the 50 MB URL-import cap
   and that CDN is unreachable from this sandbox, so the trim has to happen
   client-side.
2. **VO generation** — 12 separate lines, one per shot, so any single line can be
   re-read without redoing the picture edit.
3. **Stitch, captions, audio bed.**
4. **Thumbnail** — fear expression, WHITECHAPEL 1888 in Victorian wood-type,
   generated from the anchor so it matches the video.
