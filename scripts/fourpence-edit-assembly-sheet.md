# "Fourpence" — Edit Assembly Sheet

12 × Seedance 2.0 clips, 1080×1920, 8s each, silent. 96s raw → 90s cut.
All rendered `mode: std`, `bitrate_mode: high`, `genre: drama`,
`generate_audio: false`. Nia's anchor attached on 01, 06, 12 only.

**Anchor still (Nia, locked):** `5f5536db-3928-467f-a784-8f1302dabd11`
Reuse this exact job id as the character reference on every future episode.

---

## TIMELINE

| # | Job ID | Raw | Trim to | In | Caption | VO |
|---|---|---|---|---|---|---|
| 01 | `e3db1d06` | 8s | **5s** | 0:00 | WHITECHAPEL, 1888 | "This is Whitechapel, 1888 — and tonight, whether you live comes down to four pennies." |
| 02 | `217150ae` | 8s | **6s** | 0:05 | THAT'S NOT FOG | "I've just arrived and I genuinely can't see anything. And that's not fog — that's coal smoke." |
| 03 | `ca76c393` | 8s | **6s** | 0:11 | 80,000 PEOPLE | "Eighty thousand people live in this district. You could walk across the whole thing in twenty minutes." |
| 04 | `64516fd9` | 8s | **9s**\* | 0:17 | ONE PATROL EVERY 30 MINUTES | "The main roads have gas lamps. The courts behind them — nothing. A constable walks past the end of one maybe once every half hour." |
| 05 | `03513eec` | 8s | **8s** | 0:26 | 233 LODGING HOUSES | "And this is where most people here sleep. A common lodging house. There are two hundred and thirty-three of them in Whitechapel alone." |
| 06 | `1f8c07aa` | 8s | **7s** | 0:34 | 4d = A BED | "Fourpence gets you a bed. And you pay before you sleep. Every single night." |
| 07 | `1146ffed` | 8s | **8s** | 0:41 | NO 4d = THE STREET | "No fourpence? The deputy puts you out at midnight. And then you're outside until morning." |
| 08 | `7f694c54` | 8s | **10s**\* | 0:49 | 31 AUGUST 1888 | "On the thirty-first of August, a woman called Mary Ann Nichols was turned out of a lodging house on Thrawl Street. She was fourpence short." |
| 09 | `9c720c4b` | 8s | **9s**\* | 0:59 | "WHAT A JOLLY BONNET I'VE GOT NOW" | "She laughed about it. She said she'd soon get her doss money — look what a jolly bonnet I've got now." |
| 10 | `d72bfb1a` | 8s | **6s** | 1:08 | SHE WAS THE FIRST | "That's the last thing anyone recorded her saying. She was the first." |
| 11 | `837017ef` | 8s | **8s** | 1:14 | 5 WOMEN · 10 WEEKS | "Over ten weeks, five women were killed here. And people still ask what kind of monster does that." |
| 12 | `4e381231` | 8s | **8s** | 1:22 | IT WAS ALWAYS FOURPENCE | "Nobody asks why they were outside. It was fourpence. It was always fourpence." |

**\* Shots 04, 08 and 09 need more than their 8s of raw.** Three fixes, cheapest
first: (a) slow them to 85–90% — all three are near-static so it won't read as
slow motion; (b) hold the last frame for the extra second under the VO tail;
(c) regenerate just those three at 12s (36 credits each). Option (a) is the
right call for 08 in particular — it's the locked-off shot and slowing it makes
the stillness land harder.

## RUNNING ORDER NOTES

- **Deceleration is the structure.** 01–07 average 7.0s, 08–12 average 8.2s. Do
  not even this out.
- **Shot 08 is the only locked-off frame.** Everything else is handheld. Resist
  adding movement to it.
- **Loop join:** trim 12's tail so its last frame sits as close to 01's first as
  possible. 01 and 12 share the anchor and the same alley, so this should cut
  nearly invisibly — that match is what earns the replay.

## AUDIO MAP

| Range | Bed |
|---|---|
| 01–07 | Low sustained drone, no melody |
| 08 | **Cut to silence** on the frame change |
| 09 | Hold silent under the bonnet line — no sting |
| 10 | Silence continues |
| 11–12 | Drone returns, resolves on the final line |

## CAPTIONS

Burn on each shot's **first frame**, not progressively. Heavy white sans, hard
black stroke, center-lower, safe-area inset for the Shorts UI. Nothing readable
was generated in-frame (shot 10's headline is deliberately illegible), so all
text is added in post and nothing needs to match a generated typeface.

## STILL OUTSTANDING

1. **VO** — not recorded. ~225 words, calm and unhurried. Cut picture to voice.
2. **Stitch + captions + audio bed** — the 12 clips are separate MP4s.
3. **Thumbnail** — fear expression, WHITECHAPEL 1888 in Victorian wood-type.
   Generate from the anchor so it matches the video.
