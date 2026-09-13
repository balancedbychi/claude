# Production Costs

All rates **verified from your own transaction log**, not estimated. Balance at time of
writing: **1,520.96 credits** (Ultra).

---

## 1. The rate

Three data points, all 1080p, all agreeing exactly:

| Job | Duration | Charged | Rate |
|---|---|---|---|
| Seedance 2.5 | 20s | 180 | 9.0 /sec |
| Seedance 2.5 | 15s | 135 | 9.0 /sec |
| Seedance 2.0 | 12s | 108 | 9.0 /sec |

**Video is 9 credits per second at 1080p**, and Seedance 2.0 and 2.5 cost the same.

Everything else, observed:

| Asset | Cost |
|---|---|
| Seedream 5.0 Pro — still | **3** |
| GPT Image 2.0 — still | 0.5 – 6.5 |
| Higgsfield Soul V2 — still | 0.12 |
| Seed Audio 1.0 — voice track | 1.6 – 2.1 |
| Voice element (clone) | 40 · *already spent on `Nia's-voice`* |
| Reframe | 47 – 138 |

**The ratio that should drive every decision: a 5-second clip costs 45. A still costs 3.**
Video is fifteen times the price of a still, per asset.

---

## 2. B-roll library — the build

Eighteen shots. The naive approach is to generate all eighteen as video: **810 credits**, more
than half the balance, on one batch.

Don't. **Eight of the eighteen don't move.**

### Shots that need generated motion — 10

Pen writing then stopping · page torn and folded · tea steam · curtains moving · plate pushed
forward · thumb hovering over send · walking away under streetlights · hands writing on the page ·
bathroom mirror getting ready · wind in her hair, turning to camera

### Shots that are static compositions — 8

Two columns down a page · phone face-down on a duvet · phone screen lit in the dark at 11:40 ·
empty chair at a kitchen table · a door with morning light · parked car dashboard glow · balcony
looking out · hands on the railing

**Generate these as stills and add a slow push in the edit.** CapCut does it free. On a static
composition a Ken Burns move is indistinguishable from generated video — and usually *better*,
because there's no AI motion to go strange on you, and no risk of a face drifting mid-clip.

### Cost

| Line | Qty | Unit | Total |
|---|---|---|---|
| Motion clips @ 4s | 10 | 36 | 360 |
| Static stills | 8 | 3 | 24 |
| Re-rolls — object motion | ~2 | 36 | 72 |
| Re-rolls — character motion | ~3 | 36 | 108 |
| Still variants (3 per shot, pick best) | 16 | 3 | 48 |
| | | | **≈ 612** |

**Generate at 4 seconds, not 5.** 36 credits instead of 45. These run silent under a text overlay
for about five seconds either way — nobody will notice the difference, and it saves 20% across the
whole batch.

**Against 810 for the naive approach, the split saves about 200 credits** and produces steadier
footage. Balance after the build: **roughly 900 credits.**

---

## 3. Weekly run-rate, after the library exists

The library is built once and reused, so the ongoing cost is carousels plus talking video.

| Item | Per week | Cost |
|---|---|---|
| Carousel stills — 3 carousels × 8 slides | 24 stills | 72 |
| New b-roll — topping up the library | ~2 clips @ 4s | 72 |
| Talking video — 20s @ 1080p | 1 | 180 |
| Voice track | 1 | ~2 |
| | | **≈ 326** |

**One talking video is 56% of the weekly spend, for one post out of nine.**

That's the number worth staring at. The stills-led mix isn't only creatively safer — it's the only
version of this that the budget supports. At two talking videos a week the run-rate goes to about
**506**, and roughly 70% of everything you spend goes into two posts.

**Runway:** ~900 credits after the library build ÷ ~326 a week ≈ **just under three weeks** at one
talking video per week. Budget a top-up around week three.

---

## 4. Three levers, in order of value

**1. Cut talking videos to 15 seconds.** 135 instead of 180 — saves 45 a week, 25% off the single
biggest line. Your spec is 15–20s, so this changes nothing about the plan. All three Pillar 8
talking scripts already run 17–19s; trimming one sentence puts them at 15.

**2. Generate b-roll at 4 seconds.** 36 instead of 45, across every clip you ever make.

**3. Test `generate_audio: false` on one silent clip.** *Unverified* — every generation in your
history ran with audio on, so there's no data point for it. Native audio generation may or may not
be priced in. Run one 4-second object clip with it off, check the transaction, and if it's cheaper
you get it on every b-roll clip from then on. One clip, 36 credits, to find out.

---

## 5. What's already paid for

- **Nia — Element** `bcd528d3-9756-4190-ba80-4aaae881f2b2` · free
- **Nia — Voice** `dd584c39-32f1-49b5-a526-5e30651364be` · 40, spent
- **Chi — Soul, Element, Voice** · already in the workspace
- **Titanic footage** — four clips, already rendered. The hero Reel needs only two new present-day
  shots, so it costs roughly 2 × 45 rather than a full 50-second render.
