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
- **Lasting fix (needs the user):** upload a face-only crop of Nia with no clothing visible. Save it as a new element, e.g. `Nia-Face`, and use it in place of `Nia`. This is the same fix that stopped Simone's grey T-shirt (see `Simone-Face-v3`).

### 3. ChiChi's hair is always honey-blonde
- Never dark brown. `ChiChi-Series-Look` (`bc1bd310…`) says dark brown and is retired; never attach it.

### 3a. Every character is single: no wedding rings, ever
- **Nia, ChiChi, Dorian, Simone, Kel, and anyone else in the series are all single.**
- **No wedding ring, engagement ring or band of any kind, on anyone.** The **fourth finger of the left hand is always bare skin**, on every character, in every shot.
- Default for every character: **no rings on any finger.** Dorian's old "one silver ring" from "The Caterer" is retired.
- **Every prompt must say this for each person on screen,** for example: *"NO RINGS on any finger of either hand; the fourth finger of the left hand is bare skin; no wedding band, no engagement ring."* State it explicitly for the men as well as the women.
- If any reference image shows a ring, the ring is **never** reproduced.
- Reject any take with a ring on the left ring finger.

### 3b. Dorian's voice must not drift
- Dorian has no saved voice element, so his voice is rebuilt from a written description each time and can drift between renders.
- Always paste his full description word for word: *a deep, low, calm adult male voice, an unhurried General American baritone pitched well below the women's, with relaxed chest resonance, warm rather than gravelly.*
- **Lasting fix (needs the user's pick):** once the user approves a take where Dorian sounds right, save his voice from it as a voice element, e.g. `Dorian-Canon-Voice-v1`, and attach that element from then on.

### 4. Pacing
- No long pauses. Replies land on the end of the previous line, with no gap longer than about two tenths of a second.
- Only beats that the script calls for explicitly, kept to about one second each.
- Prefer a few longer segments that cut between shots inside one render over many short clips.

### 5. Physical logic
- Doors open from the handle side and swing on their hinges.
- Avoid on-screen door action unless the scene needs it, and describe which side the hinges and handle are on when it does.

## How to render (Seedance 2.5 through the Higgsfield tools)

- Pass elements in `reference_elements` **and** each element's image in `medias` as `image_references`. The API rejects element-only requests.
- In the prompt, point at each element with its `<<<element-id>>>` placeholder.
- **Current voice elements:**
  - Nia: `Nia-Canon-Voice-v2` `b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c`
  - ChiChi: `ChiChi-Canon-Voice-v1` `de50f37f-82fa-4a70-bdca-52355b2f4ca2`
  - The older `Nia-voice-v2-clear` and `ChiChi-the-Influencer-Voice` no longer exist.
- Dorian, Kel and Simone have no saved voice. Use the written descriptions in `episodes/double-booked/prompts.md`.
- Decline Higgsfield's suggested preset ("IN THE DARK" `24bae836-2c4a-48e0-89b6-49fcc0b21612`).
