---
name: new-episode
description: Start a new episode of EXCLUSIVE. Use when the user says to build, start, plan or write a new episode, names an episode to make, or says "episode 3" / "next episode". Runs the fixed kickoff order - read what is already locked, present the cast and asset manifest, ask if they are ready, then open the Higgsfield upload widget so reference images land as real elements instead of unusable chat attachments.
---

# Starting an episode of EXCLUSIVE

Read `CLAUDE.md` first — it governs everything below and this skill never overrides
it. This file only fixes the ORDER of the kickoff, because getting that order wrong
cost hours on Episode 2.

**The failure this exists to prevent.** The user was asked for reference images,
supplied them by dropping them into the Claude chat, and none of it could be used —
**an image pasted into chat cannot become a Higgsfield element.** Hours went into
going back and forth. `media_upload_widget` is the only upload surface that works.

---

## 1. Read what is already locked. Ask for nothing you already have.

Read every file in `exclusive/` before saying a word to the user. Prior episodes
carry the locked element IDs, the retired elements, the series looks, the voice
situation and the conventions. **The user has already discussed the season — do not
make them re-explain it, and never ask for a reference that is already an element.**

## 2. Present the episode brief and the ASSET MANIFEST

One message. The episode — logline, clip count, runtime, locations, time of day —
then the clip list, one line each. Then the manifest, which is the point of this
step. Every character, wardrobe, set, prop and voice the episode needs, each marked
with exactly one state:

| state | meaning | who acts |
|---|---|---|
| ✅ **LOCKED** | already an element, ID in an episode registry | nobody — just reuse it |
| ⚠️ **NEEDS A REFERENCE** | a new character, set or outfit | **the user uploads an image** |
| 🔵 **NEEDS A PLATE** | a set that can be generated from an existing reference | Claude generates, ~2 credits, user approves |

**Voices need their own row and their own rule.** The voice-element slots are full
at three and none is disposable (CLAUDE.md 5a). Any new speaker gets a **prose
recipe, not a clone** — so what is needed from the user is a **reference audio
sample to measure against**, never a cloning slot. Say so in the manifest rather
than proposing a deletion.

State the full episode cost estimate here too, per clip and in total, at each
resolution tier (CLAUDE.md 7) — before anything is spent.

## 3. Ask if they are ready. Do not open the widget cold.

End the brief with a direct question: **"Ready to upload?"** Wait for the answer.

## 4. On yes — open the upload widget, as the ONLY tool in that turn

Call `media_upload_widget`. In the same message, list exactly what to drop, numbered
to match the manifest, so the user knows what they are dropping and how many.

**Never do any of these:**
- ask the user to paste or attach images in the chat — **they will not work**
- inspect `/mnt/user-data/uploads`, run shell, or hunt for files on disk
- ask them to describe a set in words instead (CLAUDE.md 2: lock sets from approved
  stills, never from prose)
- open the widget before asking, or ask without then opening it

## 5. Turn every upload into an element immediately

`show_reference_elements` with `action: create`. Write the **whole spec into the
description** — including the rules that travel with it (CLAUDE.md 2). Then write
every ID into the episode file's registry table **in the same turn**: an element is
not locked until its ID is in that table, and Episode 2 lost its hallway element
exactly this way.

## 6. Plates for any set that still needs one

~2 credits. Generate, show the user, iterate where it is cheap, lock the approved
still as the element. **A 2-credit image you fix beats a 30-credit clip you redo.**

## 7. Before ANY video is generated, write these into the episode file

None of them cost anything and all three were learned the expensive way:

1. **The technical spec** — model, resolution, aspect ratio, bitrate. Locked for the
   whole episode. Pick the resolution now; it is the only free moment (CLAUDE.md 7).
   Check the model's real duration range rather than assuming one.
2. **The seam map** — every join, exit state and entry state (CLAUDE.md 4a).
3. **A location fact sheet for every space** — surfaces by material, fixed objects,
   what is left and right of what, screen direction, and the set-up each space is
   first shot from (CLAUDE.md 4b). **Arrivals and their matching departures are
   written here as a pair, before either is shot.**

## 8. Then shoot, one clip at a time

Full prompt to the user for approval before each clip. State the preflighted cost.
Never spend in the same turn as flagging a risk. Verify what came back with the
sandbox before reporting anything, and remember that whose mouth moves is a visual
fact only the user can settle.
