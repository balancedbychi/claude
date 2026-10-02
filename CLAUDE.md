# EXCLUSIVE with Nia and Chi: series rules

These are the user's standing rulings. **They override anything an older Higgsfield element description says.** Element descriptions in Higgsfield can't be edited after they're created, so some still carry rules the user has since overturned. When an element's text conflicts with this file, follow this file.

## Rulings (user, 1 Oct 2026)

### 1. ChiChi is NOT always on speakerphone
- The old "ChiChi is always on speakerphone, no phone ever visible" rule is **retired**. It came from `ChiChi-Series-Look` (`bc1bd310…`), which is itself retired, and must never be carried into a prompt again.
- **Default for phone calls: every character on a call holds a real phone to their ear.** This applies to ChiChi, Nia, Dorian and anyone else.
- Use speakerphone only when a script explicitly says so for that scene.

### 2. Nia's clothes never come from her character image
- Nia's identity element `Nia` (`bcd528d3-9756-4190-ba80-4aaae881f2b2`) has her in a **green sweatshirt**. The model keeps copying that sweatshirt into shots. That is always wrong.
- **Every prompt that attaches `Nia` must also attach the episode's wardrobe element and say both of these:**
  - `Nia` supplies her face, hair and body only, and any clothing in that image is never reproduced. Never a green sweatshirt, never a sweatshirt or hoodie of any kind, unless the episode's wardrobe element itself shows one.
  - Her clothes come only from the wardrobe element, and she wears one outfit, unchanged, in every shot.
- **If an episode has no wardrobe element for Nia yet, stop and ask the user for one.** Never render her without it.
- The same rule applies to every character: a face or identity element supplies the face, never the clothes.
- **Lasting fix, done 2 Oct 2026:** use `Nia-Face` (`3497a052-ed61-4fbc-babe-c9f7fc11bf77`, image `f6cb34ea-d129-47b0-b9ed-3543a76c6177`) in place of `Nia` for her face, race and hair, and `Nia-Body` (`9b1d610c-f6e6-421b-a801-89e22827e1bf`, image `1d11160f-f3a9-4bad-997b-1432bf839f7e`) for her proportions. `Nia-Body`'s sand bodysuit is never her costume. Never attach the old `Nia` element again. This is the same fix that stopped Simone's grey T-shirt (see `Simone-Face-v3`).

### 2a. Nia's body: petite but curvy, never drifting
- **Nia is PETITE and CURVY.** She's short and small-framed, clearly shorter than ChiChi and much shorter than Dorian, with an hourglass figure: a small, defined waist, a fuller bust, and full, rounded hips and thighs. Healthy and toned at thirty.
- **Never** tall, long-legged or model-proportioned. **Never** straight up and down, boxy or thick through the waist. **Never** slim-hipped, flat or boyish. **Never** heavier or larger-framed than she is.
- **Every prompt with Nia must state this body description**, because the identity image alone has let her shape drift between renders.
- Clothes always fit her real shape: the clothing adapts to her body, never the reverse.
- Height relationships stay constant: **Nia is the shortest of everyone.** Simone and ChiChi are both taller than her, and Dorian is much taller than all of them (Kel is a little shorter than Dorian). Confirmed by the user, 2 Oct 2026: Simone is taller than Nia. Older elements that say Simone and Nia are level (e.g. `Simone-Party-Look-POST-ENTRY`) are overruled.

### 3. ChiChi's hair is always honey-blonde
- Never dark brown. `ChiChi-Series-Look` (`bc1bd310…`) says dark brown and is retired; never attach it.

### 2b. Dorian's skin tone
- **Dorian has a deep, dark brown complexion.** Match his reference photo exactly and **never lighten him** (user ruling, 2 Oct 2026). Every prompt with Dorian says so, and lighting must never lift his skin tone. See `characters/dorian.md`.
- **Dorian's references (updated 2 Oct 2026, user ruling: "use the original model"):** his face and body come from the **ORIGINAL `Dorian` element** (`5deb4ada-665f-4894-8d16-2a9f34c0248f`, image `887050a4-172b-4740-a826-c4e1c7d552d8`): face, hair and body only, and any clothing in that image is never reproduced. `Dorian-Face` (`33308979…`) and `Dorian-Body` (`e7d019d8…`) drifted from the original and are **retired**; don't attach them. His clothes come from the episode's wardrobe and, once a segment is approved, from that segment as the video reference (rule 7).
- **"Say Less" (user's pick, 2 Oct 2026):** Dorian is `Dorian-Say-Less-Original` (`7fbf0688-7a7a-4b63-9c15-a0fe2e3362d3`, image `8055a9b5-1535-49f7-98fb-12fa409f3789`, the user's upload of preview G2): the original Dorian in his Segment 1 gym outfit.

### 3a. Every character is single: no wedding rings, ever
- **Nia, ChiChi, Dorian, Simone, Kel, Tay, DB, and anyone else in the series are all single.** DB is divorced: still no ring, and no tan line.
- **No wedding ring, engagement ring or band of any kind, on anyone.** The **fourth finger of the left hand is always bare skin**, on every character, in every shot.
- Default for every character: **no rings on any finger.** Dorian's old "one silver ring" from "The Caterer" is retired.
- **Every prompt must say this for each person on screen,** for example: *"NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring."* State it explicitly for the men as well as the women.
- If any reference image shows a ring, the ring is **never** reproduced.
- Reject any take with a ring on the left ring finger.

### 3b. Dorian's voice must not drift
- Dorian has **no voice element and won't get one** (user, 2 Oct 2026: a voice can't be attached for him). His voice always comes from the written description below.
- Always paste his full description word for word: *a deep, low, calm adult male voice, an unhurried General American baritone pitched well below the women's, with relaxed chest resonance, warm rather than gravelly.*
- **Canon take (user, 2 Oct 2026):** his voice in **"Miscommunication" Segment 1** (`f078ccbb-b911-486d-85c7-43d382fdfbd2`, knocking at Nia's door with the flowers) is correct. **Attach Segment 1 as a video reference in every clip Dorian speaks in**, and say his voice matches that clip exactly.
- **Exception, "Say Less" (user, 2 Oct 2026):** Dorian's voice uses the written description only, and the "Miscommunication" clip is not attached, so his black outfit can't carry over. In future episodes, ask the user which method to use when Dorian wears a different outfit.
- Don't ask the user for a voice upload for Dorian. The written description, plus Segment 1 as a video reference, is the method.

### 4. Pacing
- No long pauses. Replies land on the end of the previous line, with no gap longer than about two tenths of a second.
- Only beats that the script calls for explicitly, kept to **half a second each**, one second at the absolute most for a door slam or a phone hang-up.
- **No super-long pauses, ever:** no lingering looks, no held reaction shots, no dead air before a line, after a line or at the end of a clip. Silences get filled the way real people fill them: someone keeps talking, moves or reacts.
- Prefer a few longer segments that cut between shots inside one render over many short clips.

### 5. Physical logic and natural movement
- **Doors are opened ONLY from the handle side.** A hand touches only the handle. The hinge edge stays fixed in the frame and pivots; only the handle edge swings, and the gap opens on the handle side first. Nobody ever opens, pushes or grips a door from its hinge side.
- **In every door prompt, write out:**
  - which side the hinges and the handle are on, from the camera's point of view;
  - which way the door opens (inward or outward);
  - which hand reaches for the handle, and where the person stands (on the handle side);
  - how the door ends up (half open, or wide against its hinge side).
- **Movements are always natural and realistic:** ordinary walking pace, real weight and momentum, feet on the floor. No snapping, gliding, sliding or teleporting, no jump cuts in the middle of an action, and no props or doors changing size, side or colour.
- Avoid on-screen door action unless the scene needs it.
- **Nia's front door:** from inside, hinges on the LEFT and handle on the RIGHT, opening inward. From the corridor, the handle is on the LEFT. See `sets/nia-apartment-prompts.md`.

### 6. Camera
- **No zooms, push-ins or creeping toward a face. No extreme close-ups.** Faces are never framed tighter than a waist-up medium shot.
- **Default coverage:** a steady, eye-level medium-wide two-shot, with a few clean cuts to waist-up over-the-shoulder singles for key lines. Every framing holds still.
- **Sequencing is simple and in order:** where people are, where they move, then the conversation. No confusing jumps.

### 7. Continuity between segments
- **Once a segment is approved, the next segment of the same scene attaches it as a VIDEO REFERENCE** (`medias` role `video_references`, value = the approved job ID). The prompt says the characters look, dress and sound exactly as in the reference video.
- This carries over the voices, Dorian's especially, and the outfits. It works better than rebuilding them from elements each time.
- If an approved segment and a wardrobe upload disagree, **the approved segment wins**, unless the user says otherwise. In "Miscommunication", Dorian wears the black outfit from Segment 1, not `Dorian-Miscommunication-Look`.

### 8. Photos always come from the user's upload
- **Whenever a photo is needed** (a casting sheet, wardrobe, set, prop, or any image that becomes an element or reference), **ask the user which photo to upload, then open the upload widget.** The user uploads it themselves.
- **Never pick for the user.** Never save an element straight from a generated job, and never default to "option 1", even if the user answers "ok". (User ruling, 2 Oct 2026.)
- The Simone and Kel elements saved on 2 Oct 2026 without an upload (`Simone-Face-v4`, `Simone-Body`, `Kel-Face`, `Kel-Body`) are **retired**, replaced by the user's uploads (`Simone-Face-v5`, `Simone-Body-v2`, `Kel-Face-v2`, `Kel-Body-v2`).

### 9. Review before filming (user ruling, 2 Oct 2026)
- **Before any video render, send the user the production notes and the full prompt(s)** for review, and wait for an explicit go-ahead ("film", "go", "approved"). Never submit a render without it, including re-films.
- Save the notes and prompts in the episode's `prompts.md` and send that file.
- **Never film the next segment until the user has seen and approved the current one.** Send each finished clip (gallery) and wait for approval first.
- **A reference video is for looks, voices, place and camera only, never dialogue.** Every prompt that attaches one says no line from the reference is repeated, and names the clip's final line. Segment 2 v1 of "Ran Into Me" repeated Segment 1's last line.

### 10. Accents
- **Only Nia has a British accent.** ChiChi, and everyone else unless their profile says otherwise, speaks with an **American** accent. Every prompt with ChiChi says in writing: *"ChiChi is AMERICAN: General American accent, NEVER British, never Nia's voice."* Saved voice elements alone have let ChiChi pick up Nia's accent.

### 10a. Saying Nia's name
- **Nia is pronounced "NEE-uh"** (rhymes with "Mia"), never "Naya", "NAY-uh" or "NIGH-uh". Dorian said "Naya" in "Say Less" Segment 2 v1. Every line that says her name gets this pronunciation note.

### 11. Walking scenes
- People walking together **walk side by side in the SAME direction, straight along the path, at the same pace, staying together** for the whole shot. They never split up, turn away from each other or head off in different directions unless the script says so.

## How to render (Seedance 2.5 through the Higgsfield tools)

- Pass elements in `reference_elements` **and** each element's image in `medias` as `image_references`. The API rejects element-only requests.
- In the prompt, point at each element with its `<<<element-id>>>` placeholder.
- **Current voice elements:**
  - Nia: `Nia-Canon-Voice-v2` `b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c`
  - ChiChi: `ChiChi-Canon-Voice-v1` `de50f37f-82fa-4a70-bdca-52355b2f4ca2`
  - The older `Nia-voice-v2-clear` and `ChiChi-the-Influencer-Voice` no longer exist.
- **Casting elements (2 Oct 2026). Attach these instead of the old identity elements; every body element's fitting clothes are never a costume:**
  - Nia: `Nia-Face` `3497a052-ed61-4fbc-babe-c9f7fc11bf77`, `Nia-Body` `9b1d610c-f6e6-421b-a801-89e22827e1bf`
  - Dorian: the ORIGINAL `Dorian` element `5deb4ada-665f-4894-8d16-2a9f34c0248f` (image `887050a4…`), per rule 2b. `Dorian-Face` and `Dorian-Body` are retired.
  - Simone: `Simone-Face-v5` `b2ab2ec6-2469-4b6b-9208-4f5b0eb02c09`, `Simone-Body-v2` `e35f19e8-bfa1-45fb-bb2d-81de7915be9c`
  - Kel: `Kel-Face-v2` `32d2d7f4-6b6f-49c9-84d7-ddf0a7873384`, `Kel-Body-v2` `195554e3-1430-4f6d-aa78-ab7fb79d101d`
  - ChiChi: `ChiChi-Face` `b03240bd-4562-4d2f-8b14-de32c018e346`, `ChiChi-Body` `46074b6d-b0b3-4d7f-9f33-ebeaadccd9dc`
  - Tay (new): `Tay-Face` `288d8911-4b45-4246-aac4-0ec3a69003c2`, `Tay-Body` `fe030a7d-7a8c-4fef-9596-50a213e15201`
  - DB (new): `DB-Face` `1023755a-b704-4c10-b0f4-bf9887d2558c`, `DB-Body` `952f3fb0-ed54-4551-a07c-c56934939a44`
  - Profiles live in `characters/`.
- Dorian, Kel, Simone, Tay and DB have no saved voice. Their voices are written descriptions, pasted **word for word** into every clip they speak in: Dorian in rule 3b, Kel and Simone in `episodes/double-booked/prompts.md`, Tay in `characters/tay.md`, DB in `characters/db.md`. Never paraphrase or shorten them. Once a take is approved, attach it as a video reference for later scenes (rule 7) to hold the voice. Use the written descriptions in `episodes/double-booked/prompts.md`.
- Decline Higgsfield's suggested preset ("IN THE DARK" `24bae836-2c4a-48e0-89b6-49fcc0b21612`).
