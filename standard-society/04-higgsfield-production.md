# Higgsfield Production Notes

Everything needed to turn the scripts into assets. **Read §1 first — it's a blocker.**

---

## 1. BLOCKER — Nia has no Element

Chi is ready. Nia is not. She exists only as text inside four old Titanic prompts, which means every new Nia generation currently risks drifting into a different woman.

**Fix before producing anything:**

```
show_reference_elements
  action:   create
  name:     Nia
  category: character
  medias:   [{ id:   "362ecc5e-b110-4855-9334-5717c4082e08",
                type: "image_job",
                url:  "https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9/hf_20260828_081057_362ecc5e-b110-4855-9334-5717c4082e08.png" }]
  description: >
    Recurring character Nia. Young adult woman, deep warm brown skin, waist-length
    jet-black water-wave curls, diamond stud earrings, thin gold choker. Preserve exact
    facial identity, complexion, curl pattern and length, apparent age, and natural body
    proportions across all content. Wardrobe palette is camel, cream, taupe and gold.
    Signature prop: a battered yellow spiral notebook. Voice is warm, low, British-accented,
    dry and deadpan. Hair colour and clothing may change only on explicit request; face,
    age, complexion and identity never change.
```

Then verify with one test still before committing to a batch.

**Also worth creating:** a **Nia voice element** from the Titanic audio, so her British delivery is locked the way Chi's is. Without it, every generation re-rolls her accent and the character won't hold across posts.

---

## 2. Asset register

| Asset | Type | ID |
|---|---|---|
| Chi — Soul | `soul_2` | `a2c197f1-3e10-4523-8b13-31e8e3bdfeca` |
| Chi — Element | character | `ba68b031-4fce-48c4-81ce-5017bd6a5132` |
| Chi — Voice | voice element | `b07beaa5-2b64-4f21-926d-050fd952b8a6` |
| Chi — Alt voice | voice element | `180fdb9a-7c0b-469e-be49-3f76692a3968` |
| Nia — Reference | image_job | `362ecc5e-b110-4855-9334-5717c4082e08` |
| Nia — Element | — | ⚠️ create it |
| Nia — Voice | — | ⚠️ create it |
| Titanic footage | 4 × `seedance_2_0` | `0ebb7644…` `66d2b6e1…` `d8600d66…` `8ebe04a8…` |

---

## 3. Model routing

| Job | Model | Why |
|---|---|---|
| Chi balcony talking-head | `seedance_2_5` + `Chi's-voice` audio | Your proven path. Don't change what works. |
| Nia selfie-vlog | `seedance_2_0` | What the Titanic set was made on — matches her established look. |
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
| **B** | Nia × 7 (N-1…N-7) | **Vary location per script.** Seven identical-looking Nia posts read as lazy on the grid. |
| **C** | Two-hander halves × 14 | Generate Nia halves and Chi halves, cut in post. |
| **D** | H-1 | Only the two present-day shots are new — the Titanic thirds are archive. |

Chi's audio is a separate `seed_audio` generation using her voice element, fed into the video as `@Audio1`. That's the path that produced your best existing result — keep it.

---

## 6. Consistency traps

- **Rings on Chi.** Your own prior prompts fight this explicitly. It will recur. Check every frame.
- **Chi's necklace.** She wears none. The choker belongs to Nia and is a key identity separator.
- **Nia's curl length.** Waist-length. Models shorten it. State the length every time.
- **The notebook.** *Battered*, *yellow*, *spiral*. Generic notebooks kill the visual system.
- **Nia's accent.** Re-rolls without a locked voice element. This is the strongest argument for creating one.
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
