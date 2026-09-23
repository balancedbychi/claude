# Voice + Character Playbook — Why the Voice "Doesn't Stick," and the Three Routes That Fix It

*The AI Edit · Checked September 23, 2026 against the live Higgsfield tool catalog (Claude connector)*

## The problem you ran into

You made a character, asked Claude to generate a Seedance 2.5 clip with dialogue through the Higgsfield connection, and the voice came out as a random voice instead of your character's voice.

**This is expected behavior, not a mistake on your part.** Here's why, in plain language:

1. **Faces and voices are stored as separate assets.** A Soul ID or an Element holds a *face/body/look*. A **Voice** (created with *Create Voice*) holds a *sound*. Nothing in Higgsfield links the two into one "character with a voice" object.
2. **Video models don't accept a voice ID.** In the connector, Seedance 2.5's only audio switch is `generate_audio` (on/off). When it's on, the model *invents* a voice that fits the prompt, and the invented voice can change from clip to clip. The setting that picks a saved voice (`voice_id`) exists only on the **voice tools**: Seed Audio, Text to Speech V2, Qwen TTS, and Voice Change.
3. **So the voice has to travel as audio.** To get *your* character's voice into a video, you hand the video tool an actual audio file of that voice, or you replace the voice after the video is made.

> **Teaching line for members:** "Your character is two assets: a **look** (Soul ID or Element) and a **voice** (a saved Voice). Video models only carry the look automatically. You bring the voice in yourself."

---

## Set up once: the Character Kit

| Asset | Where it's made | What it controls |
| --- | --- | --- |
| **Look — Soul ID** | Characters → train with 5–20 photos (~10 min) | Face in Soul 2.0 / Soul Cinema images |
| **Look — Element** | Elements → create from 1+ approved image | Face/body in Nano Banana, Cinema Studio, Seedance, Kling, and other models |
| **Voice** | Audio → Create Voice (record or upload a clean sample; consent required) | Timbre, accent, and pace in voice tools |
| **Voice notes** | Your character guide | Written delivery rules: age, accent, energy, pace, and words they'd never say |

Record the Element ID, Soul ID, and Voice ID in the asset manifest (Module 6). Claude can read these IDs from your project files and reuse them every time.

---

## Route A — Voice First, Then Video with an Audio Reference *(Seedance-native)*

**Best for:** dialogue scenes when you want Seedance 2.5 quality and native lip movement.

1. Write the line. Keep it short, about 3–8 seconds.
2. Generate the line with **Seed Audio** (or Text to Speech V2) using your saved **Voice** (≈0.5 credits).
3. Generate the video with **Seedance 2.5, mode `omni_reference`**:
   - image reference = your character's Element / approved still
   - **audio reference = the line from step 2**
   - prompt describes the action and says the character speaks the line in the referenced voice.
4. Review the lip sync and voice match.

Models that accept an audio reference: **Seedance 2.5, Seedance 2.0, Wan 3.0 / 3.0 Prime, Wan 2.7, Wan 2.6, MiniMax H3 / H3 Max, Grok Video 1.5.**

⚠️ *Under evaluation:* Higgsfield's Seedance guidance treats an audio reference as a **voice-identity reference**. It is not guaranteed to reproduce your exact audio track word for word. Test whether the output matches your line exactly or re-performs it before you teach Route A as the "exact script" method.

Claude prompt members can use:
> "Using my character kit in `/assets/manifest.md`: generate this line with Seed Audio using voice `<VOICE_ID>`, show me the cost first, then generate a 5-second Seedance 2.5 omni_reference clip at 720p with element `<ELEMENT_ID>` as the image reference and that audio as the audio reference. Show me the cost before generating."

---

## Route B — Video First, Then Swap the Voice *(easiest; beginner-friendly)*

**Best for:** Basic-tier members, quick social clips, and fixing a clip you already love.

1. Generate the clip in any model with native audio (Seedance 2.5, Kling 3.0, Veo 3.1…), with the dialogue in the prompt.
2. Run **Voice Change** on the finished clip with your saved Voice. It keeps the timing and visuals and replaces only the voice.
3. Review: mouth shapes were made for the *original* voice, so check that the fit looks natural.

Why beginners should start here: one extra step, no audio files to manage, and it can rescue clips that already cost credits.

---

## Route C — Silent Picture + Exact Voice + Lip Sync *(maximum control)*

**Best for:** exact scripts, UGC ads with approved copy, long narration, and multi-line scenes.

1. Generate the shot **with audio off**. It's cheaper, and you're replacing the audio anyway.
2. Generate the exact line with Seed Audio / Text to Speech V2 in your Voice.
3. Run **Sync Lipsync 3**: input video + input audio → the mouth is re-synced to your exact audio. (On the website: **Lipsync Studio**.)
4. If lengths don't match, choose how Sync handles it: loop, bounce, cut off, pad with silence, or retime.

---

## Which route when

| Situation | Route |
| --- | --- |
| First talking clip, learning the tools | **B** |
| Seedance-quality acting with a consistent voice | **A** (test it first) |
| Script must be word-for-word (ads, tutorials, compliance) | **C** |
| Two characters talking | **C** per line, or A per shot, then edit together |
| Same video in Spanish, French, etc. | Finish in English → **Dubbing** |
| Narrator over visuals (faceless) | Voice-only track with Seed Audio, no lip sync needed |

## Multi-character dialogue (Advanced tier)

- Give each character their own Element **and** Voice.
- Shoot **one speaker per shot** (over-the-shoulder or single). Current models handle one clearly lit speaking face far more reliably than two people talking in one frame.
- Keep a dialogue table in Claude's project folder: `shot | character | element_id | voice_id | line | route | cost | status`.

## Ethics and permissions (non-negotiable in both tiers)

- Clone only **your own voice** or a voice you have **written permission** to use. Higgsfield's voice cloning asks for consent. Teach members why that matters.
- Never imitate a real person or celebrity's voice, and never present a synthetic voice as a real customer's testimonial.
- Disclose AI-generated voices where platforms require it (TikTok Shop's AI policy requires disclosure for fully or significantly AI-generated content).
