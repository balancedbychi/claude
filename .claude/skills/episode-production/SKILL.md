---
name: episode-production
description: The step-by-step production workflow for every episode or segment of "EXCLUSIVE with Nia and Chi" (Seedance 2.5 on Higgsfield). Use whenever a new script, episode, segment or re-film comes in, before writing any prompt or spending any credits.
---

# Episode production workflow

The user's method, written down after "GPS Tracker" (3 Oct 2026). Segment 1 v3 and Segment 2 v1 were approved with no corrections: "the best take… perfectly done." The lesson: **direct everything.** The model only gets right what the prompt spells out, so nothing is left to it.

Follow the steps in order. `CLAUDE.md` still holds every standing rule; this skill is the order of work.

## 1. Read the whole script first
- Read every line before planning anything.
- List every person who appears, extras included, and every prop that matters to the story (the phone, a pastry, a bag).

## 2. Production notes
- Write a **cast and tags table** (rule 15). For each person: their tag, element name and ID, voice source, and whether they speak.
- **Extras either stay silent or get approved lines in English.** Raise it now if a scene would naturally make someone talk, such as a barista taking an order.
- Use **one full-length "character in costume" image per character** (rule 14).
- **Before any video, make a cheap still preview** of anything uncertain and get the user's approval.

## 3. Photos: one at a time, named, tagged
- Ask which photo is needed, then open the upload widget (rule 8). **The user uploads one image at a time.**
- **Name each upload straight away** and tie it to its element and tag (for example `[Nia-GPS]` → `Nia-GPS-v2` `709f0a07…`).
- Use the same tags in the script, the prompt and the render log, so it's always clear which image is attached to whom.
- **Check that every image fits the story:**
  - outfits match the scene;
  - hands hold only what the script says;
  - the set photo matches the floor plan, and if it doesn't, the photo wins and the map is redrawn.

## 4. Floor plan and sightlines
- Set the fixed camera side, the entrance, the counter and the furniture, using left and right from the camera.
- Mark where everyone sits or stands and which way they face (rule 13).
- **Check every "sees" moment:** the person is already facing that way, or the script says they turn.

## 5. Play-by-play, beat by beat
- For every beat, write where each person is, which way they face, how they move, and what they're doing.
- **First frame:** say exactly where everyone is.
- **Last frame:** where they end up. That becomes the next segment's first frame.
- **Nobody is idle** (rule 12). Every person, extras included, has a purposeful action in every beat, on camera or not.

## 6. Angles and screen direction
- The camera stays on one side of the action, so left and right never flip between cuts.
- **Screen sides stay consistent.** If someone comes up on a person's RIGHT, they stay on that person's right in every following shot and cut, including the two-shots and over-the-shoulders.
- **Write each person's side into the prompt** whenever they stop beside someone ("stopping beside her on her right").
- Framings are steady and eye level, waist-up at the tightest. No zooms or push-ins (rule 6). Cuts are clean and the flow is fluid: where people are, where they move, then the conversation.

## 7. Call out every segment clearly
- Give each segment a label (Segment 1 v3, Segment 2 v1), its job ID and its status in the render log.
- A segment after an approved one attaches it as the **reference video**, and the reference video is never dropped (rule 7).
- The prompt says the reference video is for looks, voices, place and camera only. **None of its dialogue is replayed**, and the first line of the new clip is named.
- **Headcount:** "exactly N main people; never two of anyone" (rule 9).

## 8. Account for every possible scenario
Before sending the prompt, go through what the model could fill in on its own:

| Risk | Guard in the prompt |
|---|---|
| Extras talking or gibberish | Extras stay silent or get approved lines. No background murmur unless the user wants it. |
| Dead air or extra lines | **Match the clip length to the action.** 20 s for about 18 s of action; don't pad to 30 s. End on a spoken line, then "after that, silence: nobody speaks." |
| Duplicate characters | Give a headcount. Characters who are already in the reference video start in frame, and nobody new arrives. |
| Repeated lines | Don't quote the reference's final line as forbidden. Name the new clip's first line. |
| Props drifting | Lock each prop: who holds it, where it rests, and that it never moves. |
| Hands | Say what each hand holds, or "hands empty". |
| Doors | State the hinge and handle sides, or prop the door open (rule 5). |
| Voices drifting | Paste each written voice word for word, with the accents (rules 3b and 10). |
| Rings | NO RINGS for everyone on screen (rule 3a). |

## 9. Take the AI's call-outs seriously
- When Claude flags a risk or a question (clip length, what someone is holding, a contradiction between an image and the script), **resolve it before filming.** Don't skip past it.
- Write each answer into the notes so it carries into the prompt.

## 10. Review, then film
- Save the production notes and the full prompt in the episode's `prompts.md` and send the file (rule 9).
- **Film only after the user's explicit "film".**
- Show each finished clip and wait for approval before writing or filming the next segment.
- Log every render: job ID, link, settings, credits and the verdict.
