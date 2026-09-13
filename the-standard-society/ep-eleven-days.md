# THE STANDARD SOCIETY
## Episode: "Eleven Days"

**Runtime:** 90 seconds · 6 shots × 15s
**Format:** Intercut phone call — Nia's apartment / ChiChi's apartment, evening
**Logline:** Nia has known a man for eleven days and has already accepted an invitation to his house party. She needs ChiChi in the room. ChiChi has already taken her shoes off.

---

### CAST

**NIA — 30.** Deep warm brown skin, waist-length jet-black water-wave curls, diamond studs, thin gold choker. Warm, low, British-accented, dry and deadpan — but fast and bright when she wants something.
*Wardrobe this episode:* olive ribbed halter crop top (high mock-halter neck, sleeveless, cropped at the natural waist) with matching army-green wide-leg pleated trousers. Barefoot.

**CHICHI — 40.** Warm brown complexion, almond dark eyes, full brows, cheek beauty mark, stud earrings, full-figured. Warm, smooth, mid-to-low General American. Calm authority, dry as a bone.

*SERIES LOOK — locked, applies to every episode from here:* rich dark brown, almost black, shoulder-length layered blowout — soft volume, bouncy outward-curled ends, deep side part, falling just below the shoulders. Not blonde. Oversized heather-oatmeal crewneck sweatshirt in heavyweight fleece, dropped shoulders, long loose sleeves, PILATES across the chest in navy collegiate block letters outlined in white; fitted chocolate-brown leggings. Barefoot. Stud earrings only, no necklace.

*Note:* hair may vary between episodes — the rest of this look is the constant. This supersedes the honey-blonde blowout and the olive-bronze maxi dress; those are retired for ChiChi.

---

### SHOT 1 — NIA'S APARTMENT (0:00–0:15)

Warm lamps. Two dresses thrown across the bed. Nia paces barefoot, phone wedged against her shoulder, fighting an earring into place.

> **NIA:** Chi. Chi. Before you say no — let me get through the whole sentence.
> **CHICHI** *(phone, filtered)*: I just took my shoes off.
> **NIA:** Put them back on.
> **CHICHI** *(phone)*: Nia.
> **NIA:** Put them back on, Chi.

---

### SHOT 2 — CHICHI'S APARTMENT (0:15–0:30)

Reveal her side. ChiChi folded into the corner of her sofa, feet tucked under her, one glass of red, one candle lit. The apartment is beautiful and very quiet.

> **CHICHI:** Who is he?
> **NIA** *(phone)*: ...Who's who?
> **CHICHI:** You only get that voice when there's a man attached to it.
> **NIA** *(phone)*: That is so unfair.
> **CHICHI:** Mm.

---

### SHOT 3 — NIA'S APARTMENT (0:30–0:45)

Caught. Nia drops onto the edge of the bed, grinning, already losing the argument she's winning.

> **NIA:** His name is Dorian. He's having people over — it's not a date, Chi, it's a house party. There's gonna be like forty people there.
> **CHICHI** *(phone)*: A house party.
> **NIA:** A grown one. He has a caterer.

---

### SHOT 4 — CHICHI'S APARTMENT (0:45–1:00)

ChiChi sets the glass down on the table. Completely deadpan.

> **CHICHI:** Baby. A caterer is a man with a slow cooker and a cousin.
> **NIA** *(phone, laughing)*: Oh my God—
> **CHICHI:** How long have you known him?
> **NIA** *(phone)*: ...A while.
> **CHICHI:** Nia.
> **NIA** *(phone)*: Eleven days.

---

### SHOT 5 — THE TURN (1:00–1:15)

ChiChi closes her eyes. A beat. She looks around the apartment — one glass, one candle, nobody. The ask lands somewhere it wasn't aimed.

> **NIA** *(phone)*: Chi. I'm not asking you to like him. I'm asking you to be in the room.

ChiChi looks at the clock. Holds. The quiet of her own apartment sits on her chest.

---

### SHOT 6 — BUTTON (1:15–1:30)

> **CHICHI:** ...What time.
> **NIA** *(phone, shrieking)*: TEN!
> **CHICHI:** I'm leaving at midnight.
> **NIA** *(phone)*: One.
> **CHICHI:** Midnight.
> **NIA** *(phone)*: I love you, I love you, I love you—

ChiChi hangs up. Sits in the silence one full beat. Then stands, and walks toward the bedroom. Cut to black.

---

### PRODUCTION NOTES

- **Voices:** Nia → `Nia-voice-v2-clear` · ChiChi → `ChiChi-the-Influencer-Voice` (both saved voice elements)
- **Characters:** `Nia` + `ChiChi-the-Influencer` reference elements — the exact pairing that produced the approved Sucré footage
- **EVERY PROMPT MUST CARRY BOTH VOICE ELEMENTS.** Nia `12315c68-37de-41fe-8766-76ac07bcaf70` AND ChiChi `180fdb9a-7c0b-469e-be49-3f76692a3968`. If a character's voice element is missing from the prompt, the model invents a voice for her and the take is wasted. This was dropped in v3 and not caught until Shot 2.
- **Continuity:** ChiChi's hair is her established honey-blonde shoulder-length layered blowout with darker roots, as rendered in the approved Shot 1 v4. Do not force it dark. Both women ring-free and bracelet-free; stud earrings only. Hands smooth and youthful, matching the age of each face.
- **BOTH women hold mobile phones to their ears, visible in frame, in every shot.** It is a phone call and the phones must read on screen. No speakerphone, no earbuds, no hands-free.
- **One wine glass.** ChiChi is alone; a second glass on the table implies company that isn't there. Pin the count explicitly in every prompt — "a single glass" is not strong enough phrasing for the model.
- **Shot construction:** every clip must show BOTH women, intercut between the two apartments. seedance only binds a saved voice element to a character it can see — an off-camera speaker gets an invented voice. This is why the phone side came out wrong on the first pass.
- **Pacing:** no gap over a quarter second between lines, and cut to the other apartment ON the first syllable of the new line, never before it.
- **Sets:** Nia's bedroom is locked as element `Nia-Bedroom-Night`. ChiChi's living room is described in prompt text only — see the rule below about why it must stay that way for this episode.
- **ChiChi's coffee table:** one low RECTANGULAR marble table, thick pale white-and-grey veined top, solid marble base, directly in front of the sofa. Never round, oval, glass, wood or metal; never a second table or side table in frame.

### Hard-won rules (added after Shots 1–4)

- **ONE VARIABLE PER TAKE.** When a note comes in, change that one thing and nothing else. Bundling a second "improvement" into a fix is what broke Shot 2 — a relight request also got a new room element, which changed the couch and destabilised both wardrobes. If a second change seems needed, propose it first; never ship it inside a fix.
- **Never introduce a new reference element mid-episode.** An element created BEFORE any footage defines the set. An element created AFTER footage exists, from a fresh text description, is not a lock — it is a second, competing set. Nia's bedroom element worked because it came first. ChiChi's living-room element (`77870e42`) did not, and must not be used in this episode.
- **Never reword anything that produced an approved result.** The wardrobe text that reads as "maroon tights" on screen says `chocolate-brown leggings` in the prompt. Keep the words that worked, not words describing what you see.
- **Every visual detail must be pinned explicitly or it drifts.** Confirmed drifters: exterior light level, couch side, phone colour, coffee table shape, wardrobe between cuts. Each needed its own absolute clause with the wrong options named and negated. Anything merely implied gets re-rolled every take.
- **EPISODE 2 ONWARD: ask the user for visual references BEFORE building any new scene.** Do not invent set design mid-build. Every set detail written from scratch becomes another thing that can drift, and the fix costs a full re-render.
- **The assistant cannot see the renders.** All visual continuity notes come from the user. When locking a detail that already exists on screen, write the tightest possible description and ask the user to correct it once, rather than assuming.

---

## ELEMENT REGISTRY — locked

Every shot must reference these by ID. Do not describe a character or room from
scratch when an element exists for it.

### Characters

| Element | ID | Use |
|---|---|---|
| `Nia-Eleven-Days-Look` | `4237ef4c-0f12-425b-8789-1b702e738f0f` | Nia in this episode's olive halter + army-green trousers |
| `Nia` | `bcd528d3-9756-4190-ba80-4aaae881f2b2` | Nia's canonical face, for episodes with different wardrobe |
| `ChiChi-the-Influencer` | `8a8e8eeb-d41e-4d91-b245-fa0caa8801b6` | ChiChi — **this is the one in use**, as approved in Shot 1 v4 |

### Environments

| Element | ID | Use |
|---|---|---|
| `Nia-Bedroom-Night` | `b6a4c5be-82cb-4328-aa15-d260bc70243e` | Nia's bedroom, Shots 1/3/5 |
| `ChiChi-Living-Room-Night` | `77870e42-dff9-454b-b394-40ac0b07c1fe` | ChiChi's living room, Shots 2/4/6 |
| `Sucré-Coffee-Shop` | `59b95bad-f65a-4e6a-9381-32f5d9ad6638` | Existing series location, other episodes |

### Voices

| Element | ID |
|---|---|
| `Nia-voice-v2-clear` | `12315c68-37de-41fe-8766-76ac07bcaf70` |
| `ChiChi-the-Influencer-Voice` | `180fdb9a-7c0b-469e-be49-3f76692a3968` |

### Superseded — do NOT use

`ChiChi-Series-Look` (`bc1bd310…`, describes dark hair — not the approved look),
`Chi-Standard-Society` (`6df69ad5…`),
`ChiChi-Main-Character`, `ChiChi-the-Influencer-—-Primary-Reference`, `Chi2`, `Chi`.
All describe the retired honey-blonde blowout and will pull her hair back toward
blonde. `ChiChi-Series-Look` replaces all of them.

### Approved reference

Shot 1 v4 is the approved template for the episode — intercut construction,
pacing, staging and both locked rooms:
`9849b24f-91a3-4a3f-abd7-3dcd2ddc2acb`
