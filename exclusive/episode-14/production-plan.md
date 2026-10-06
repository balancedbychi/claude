# Episode 14 "Nice Building": production plan and 720p cost

Status 6 Oct 2026: every clip has an approved start frame (see stills-log.md). The sheet below
is what the animation pass runs from. All video at 720p, 9:16, image-to-video from the
listed start frame, with the plate's face/look images attached where the model takes
references. Dialogue is on-screen lines from scene-tays-event.md; the text thread is
rendered on the phone in the inserts.

## 1. Cost at 720p

Clips: 65. Running time: 434 s (7.2 min). Dialogue clips: 324 s. Silent holds and inserts: 110 s.

Per-second rates measured today with get_cost (9:16, 720p, start frame attached):

| Model | Credits per second | 5 s clip | 10 s clip |
|---|---|---|---|
| Kling 3.0 Turbo (no audio) | 1.5 | 7.5 | 15 |
| Kling 3.0 (audio) | 2.0 | 10 | 20 |
| Grok Video 1.5 | 4.5 | 22.5 | 45 |
| Seedance 2.5 | 7.0 | 35 | 70 |

| Plan | Model mix | One pass | With 30% retakes |
|---|---|---|---|
| A, cheapest | Kling 3.0 Turbo for everything, dialogue dubbed in post | 651 | 846.3 |
| B, recommended | Kling 3.0 (audio, lip sync) for dialogue; Turbo for holds and inserts | 813 | 1056.9 |
| C, all Kling 3.0 | Kling 3.0 for everything | 868 | 1128.4 |
| D, Grok | Grok Video 1.5 for everything | 1953 | 2538.9 |
| E, Seedance | Seedance 2.5 omni-reference for everything | 3038 | 3949.4 |

Balance today: 1,138 credits (Ultra). Plan B at one pass is 813 credits and fits with room for retakes; plans D and E do not fit without a top-up.

Notes on the numbers: durations are the lengths each line needs at a natural pace plus a
beat; trimming any dialogue clip to the next lower second saves its per-second rate. Retake
allowance of 30% reflects today's still-generation hit rate (about one in four needed a
second pass, mostly filter rejections and hand or prop errors). Upscaling to 1080p later is a
separate pass and is not in these figures.


## 1b. Measured on 6 Oct 2026: Seedance 2.5 + Topaz route (the show's look)
The user films in Seedance 2.5 for its look; Kling is not used. Test clip C05 (6 s) was
generated at 480p and 720p and both were upscaled to 1080p with Topaz Video.

| Step | Measured | Per second |
|---|---|---|
| Seedance 2.5, 480p, 6 s | 18 credits | 3.0 |
| Seedance 2.5, 720p, 6 s | 42 credits | 7.0 |
| Topaz to 1080p from the 480p clip | 3 credits | 0.5 |
| Topaz to 1080p from the 720p clip | 5 credits | 0.83 |

Episode at 434 s, 66 clips:

| Route | Generate | Topaz | One pass | Generate retakes at 30% |
|---|---|---|---|---|
| 480p + Topaz | 1,302 | 217 | 1,519 | 1,910 |
| 720p + Topaz | 3,038 | 362 | 3,400 | 4,311 |
| Mixed: 720p for the 13 close-ups and 3 inserts (89 s), 480p for the rest | 1,658 | about 250 | about 1,910 | about 2,400 |

Test jobs: 480p ce6b3b01 → Topaz 4d96779d; 720p a271e86a → Topaz f3fabe54. One 480p
attempt (b74ea641) was filter-rejected and refunded; neutral wording passed.

## 2. Production rules for the animation pass

- One clip = one start frame = one prompt. Never chain a clip from another clip's last frame;
  always from the approved still, so faces and props reset every cut.
- The prompt for each clip is: the bible beat (hands, movement, face) + the direction column
  below + "no new people, no new objects, nothing enters or leaves frame, the camera does
  only what is stated". Camera moves are static unless the direction says push, dolly or track.
- Dialogue clips: attach the face image(s) as references where the model accepts them, give
  the exact line in quotes, and say who speaks. Off-screen lines are added in the edit, not
  generated. Keep each clip to one speaker where possible; two-speaker clips are the
  two-shots only (C29, C30, C47, C48, C52, C53, C56, C58).
- Height, sides and props carry over from the bible: Tay a head taller than Nia, Zarya half a
  head taller, the host on Nia's left, Tay on Nia's left on the main floor and roof, Tay on
  Nia's right in the vault, every glass on a surface or in a named hand.
- Phone inserts (C21b, C61b, C62): the screen stays legible; motion is the thread moving, not
  the phone. Generate at 720p and hold still enough to read.
- Reject and re-run any clip where a face drifts from the still, a hand swaps, a prop floats,
  a head turns past a quarter turn, or a person's height changes mid-clip. Same rule as stills.
- Audio: Kling 3.0 generates dialogue audio from the line in the prompt; keep it as a guide
  track and replace with the recorded VO in the edit if the voice does not hold between clips.

## 3. Beat by beat with video direction

Type: D = dialogue (Kling 3.0 with audio), S = silent hold (Turbo), I = phone insert (Turbo).

| Clip | Start frame (job) | s | Type | Video direction |
|---|---|---|---|---|
| C01 | ce89a36f | 6 | D | Nia in the robe, hands on hips, turns her head to the phone and speaks. Camera locked. No walk. |
| C02 | c645ef6b | 6 | D | ChiChi into the phone, eyebrows up, firm line. Phone stays up in LEFT hand, glass on thigh. Micro head motion only. |
| C03 | 9c8b8b27 | 6 | D | Nia lifts the green dress off the sofa by the straps with RIGHT hand, eye roll toward the phone. Dress sways once. |
| C04 | 60e3a1f9 | 5 | D | ChiChi sips over the rim, eyes on the phone. One sip, glass back to thigh. |
| C05 | 596879a8 | 6 | D | Nia in the dress, arms folded, looks toward the phone, unsure. Breath, no step. |
| C06 | 51d6dbd0 | 5 | D | ChiChi sets the glass down and leans in with a gasp. Glass lands on the table, not in the air. |
| C07 | f0ce3ced | 8 | D | ChiChi's 'not being your friend, being honest' speech; RIGHT index finger circles once. Phone steady in LEFT hand. |
| C08 | b1820539 | 5 | S | Nia completes a slow turn on the rug, looks back over her RIGHT shoulder. Arms down. Quarter turn only. |
| C09 | 9456393b | 6 | D | ChiChi dead serious into the phone. Locked. Lips only. |
| C10 | 9124aad2 | 5 | D | Nia chin down, hands run waist to hips and stop. 'It's been two weeks, Chi.' |
| C11 | e4593231 | 6 | D | ChiChi lifts the glass beside her face like a toast. 'fourteen days.' |
| C12 | 1e401d8c | 5 | D | Nia chin up, defensive, 'Dorian texts me too.' Arms stay folded. |
| C13 | 5baba209 | 6 | D | ChiChi tilts the phone down, one eyebrow, the 'wyd' line. Glass comes down to thigh. |
| C14 | c48080b5 | 5 | S | Nia looks away to the window, jaw tight, then back to the phone. Head only. |
| C15 | 1bd86860 | 6 | D | ChiChi, open palm 'so?' gesture, plain and direct. |
| C16 | b5c8be33 | 8 | D | Nia sits on the sofa arm, hands gripping it, looks at the floor, the 'I don't know what he does' lines. |
| C17 | 03150b7d | 6 | D | ChiChi soft, no joke, steady on the phone. |
| C18 | 89316020 | 5 | D | Nia laughs behind her LEFT hand, shoulders up, eyes closing. Stays seated on the arm. |
| C19 | 7d67890d | 6 | D | ChiChi warm, brings the phone a little closer, small smile. |
| C20 | 706a5ea1 | 5 | S | Nia lifts the phone off the lamp, one breath, faint smile. Back of phone to camera. |
| C21 | a1e0e0c5 | 6 | S | Car. Nia reads, thumbs on the glass, fights a smile and loses. City light moves across the window. Phone screen tilted away. |
| C21b | 75977c1a | 5 | I | Phone insert. The Tay thread scrolls up by one message; her thumb moves once. Screen stays legible. |
| C22 | dd03451e | 6 | D | Nia turns to the window, eyes widen, lips part, then she closes her mouth. 'Okay. It's a building.' |
| C23 | 197429e1 | 5 | S | POV through the car window as the car slows at the kerb. Slight forward drift, then stop. No people in focus. |
| C24 | 3891bf20 | 8 | D | Nia out of the car, host beside the open door on Nia's LEFT. Host speaks and gestures to the doors with RIGHT hand. Nia smooths the dress once. 'Ms. Keynes?' exchange. |
| C25 | 1daf62b4 | 6 | S | Both walk up the carpet toward camera, host a step ahead on Nia's LEFT. The line turns to look. Nia chin up. Slow dolly back. |
| C26 | 6103af4c | 6 | S | Nia in the doorway facing in, eyes travel up the hall. Slow push in. Crowd in soft focus, same floor. |
| C27 | 6fbf35ba | 5 | S | Tay mid-handshake, sees her past camera; mouth opens, eyebrows up. Hold, no cut. |
| C28 | 298a8e0d | 6 | S | Tay walks straight at camera through the crowd, RIGHT hand slightly ahead, grin. Guests turn. Camera static. |
| C29 | ea4d0185 | 10 | D | Two-shot. 'Yo. Yo.' / 'Hi.' / 'That's not the safe one.' exchange. Tay's RIGHT hand half-raised, undecided. Nia fighting a smile. He is a head taller. |
| C30 | 93241774 | 10 | D | 'It's a nice building, Tay.' / 'Nice. She said nice.' Tay looks up at the ceiling. Nia looks past him, flat. |
| C31 | 6d13305e | 8 | D | From behind the couple: the boys toast and clown ('She said nice, bro'). Tay's RIGHT hand stays on the small of her back. 'Okay. We're walking now.' |
| C32 | df2f4bbc | 12 | D | Walk-and-talk, camera tracking back. Tay's LEFT hand gestures at the cages, RIGHT hand near her LEFT elbow. The 'bought it at twenty-three' exchange. A guest reaches in, two fingers, keep walking. |
| C33 | ee20880a | 8 | D | Tay pushes the vault door most of the way shut with LEFT hand. Nia takes in the records. 'There's a real thing.' exchange. |
| C34 | 78c3a0ab | 10 | D | Tay seated, feet on the rug, fingers laced, eyes on the floor. The 'deposits' speech. Nia sets the bag on the chair beside her. |
| C35 | 6db81c66 | 6 | D | Punch in on Nia from the two-shot in post. 'Two weeks. You had two weeks to say one sentence.' / 'Why?' |
| C36 | 5687f659 | 12 | D | Tay looks up, RIGHT hand on the back of his neck. 'I'm feeling you, Nia' through 'In my own vault.' Lip sync priority. |
| C37 | 6db81c66 | 6 | D | Nia one step closer, hands together, mouth opens and nothing comes out. 'Tay—' / 'You don't gotta say nothing back.' |
| C38 | d60bcb79 | 6 | D | Tay stands out of the chair and offers RIGHT hand palm up, low. 'Come watch me do the thing.' Hold on the hand. |
| C39 | 4cb89565 | 6 | D | Low angle, Tay in the cage with the mic. 'I don't like talking. I like building.' Crowd heads along the bottom. |
| C40 | bb45d9b0 | 6 | D | Tay points into the crowd, arms go up. 'Three names. Three checks. First deposit.' |
| C41 | 06863fa6 | 5 | S | Nia, LEFT hand on her collarbone, face open and lit up. Breath only. |
| C42 | edead467 | 5 | S | Tay lifts the mic half an inch toward the lens, private smile. Hold. |
| C43 | b764bb8e | 5 | S | Zarya's RIGHT hand around the back of Tay's neck pulls him down; the frame ends the instant before the kiss. His eyes open. No further contact shown. |
| C44 | a796760f | 5 | S | Zarya's thumb wipes his lip, she laughs, he does not. Hands half raised, frozen. |
| C45 | 7a2ff4d8 | 5 | S | Nia's LEFT hand drops from her collarbone. The light goes out of her face. Mouth closes. |
| C46 | aebd0642 | 6 | D | Nia at the bar, RIGHT hand flat, not steady. Zarya slides in on her RIGHT, one finger to the bartender. 'You must be Nia.' |
| C47 | 9c1abc70 | 6 | D | Zarya quarter-turns to face Nia, offers her RIGHT hand from the bar side, thumb up. Nia turns her head only. '...I'm sorry?' / 'Zarya. Tay's girlfriend.' |
| C48 | af3a3708 | 10 | D | Right hand to right hand, square on, eye contact. 'Girlfriend.' / 'Three years... space heater' lines. |
| C49 | 5900943c | 8 | D | Both back to the bar. Zarya lifts her own glass with her frame-right hand, taps Nia's glass on the counter. 'He does that.' Zarya exits frame RIGHT. |
| C50 | 71dad054 | 5 | S | Roof wide. Nia at the railing, forearms on the ledge, bag under RIGHT hand. Wind in the hair. Hold. |
| C51 | 708b7071 | 5 | D | Tay through the door fast, RIGHT hand on the handle, LEFT hand out. Slows as he sees her. 'There you are. I been looking—' |
| C52 | 119c85cc | 8 | D | Two-shot, Nia at the railing frame RIGHT, arms crossed. 'Your girlfriend introduced herself.' / 'She's not my—' / 'Don't.' |
| C53 | 6f857acc | 10 | D | Tay one step closer, RIGHT palm out, LEFT hand on his neck. 'Three years, Tay?' through 'She's moving out.' |
| C54 | 39962a8c | 10 | D | Close on Tay, hands open at chest height. 'It's complicated' through 'I know I'm not him.' |
| C55 | a12abd29 | 12 | D | Close on Nia, RIGHT hand points once at his chest and drops. The 'You texted me good morning every day' speech. Eyes wet. |
| C56 | e40fe4d9 | 8 | D | Tay within arm's reach, hands half-raised and stopped. 'Every room I been in for three years' / 'Just what.' / 'Just you.' |
| C57 | 5522c0f5 | 8 | D | Close on Nia. Wants to believe it, then puts it away. 'That's a really nice thing to say' through 'On your big night.' |
| C58 | 2d37c117 | 12 | D | Nia picks up the bag with RIGHT hand; Tay's LEFT hand stops six inches from her shoulder. 'I came here tonight trying not to like you' speech. |
| C59 | 9a0ad174 | 6 | D | Nia at the door, back to him, RIGHT hand on the handle. 'I do like you. That's the problem.' She does not turn. Door opens on the last word. |
| C60 | d0964779 | 5 | S | Tay alone at the railing, both hands on the back of his neck. Hold. City lights. |
| C61 | 5f1d290e | 5 | S | Car. Nia reads, face blank. Phone buzzes three times (sound only). Screen tilted away. |
| C61b | 3e817791 | 5 | I | Phone insert. Tay's five texts arrive one by one, bubble by bubble. Her thumb hovers, does not touch. |
| C62 | 39330e11 | 5 | I | Phone insert. The Dorian thread, 'wyd'. 'You still up?' sits in the field; thumb taps send; the bubble turns green and rises. |
| C63 | 7ef7092b | 6 | S | Phone face down under her RIGHT hand. Face to the window. The lit building shrinks in the glass behind her. Cut to black. |

Totals: 434 s. Plan B cost per clip = seconds × 2.0 (D) or × 1.5 (S, I).

## 4. Scene 14.1 animation pass, submitted 6 Oct 2026 (mixed route)
720p for ChiChi's close plate (C09, C11, C13, C15, C17, C19) and Nia's waist-up plate (C12,
C14); 480p for the rest; all to go through Topaz to 1080p after approval. C05 = the 720p
test clip a271e86a (Topaz f3fabe54).
| Clip | Res | Job |
|---|---|---|
| C01 | 480 | 47c49e5a-68fc-4293-96de-1780ee75281f |
| C05 retake (test clip a271e86a had an extra arm, retired) | 480 | b02f4ccd-aa81-434d-8650-d7446168b116 |
| C02 | 480 | 10e10d32-fb29-42c2-8d3f-a855978b6793 |
| C03 | 480 | 3385c8ce-3525-42b7-8eaa-b03f0a03e1c0 |
| C04 | 480 | f3a9b534-d857-4ea8-8dbd-5737dd817c78 |
| C06 | 480 | daacf9d4-c453-4dd5-8a0c-cbf9bd7de2c9 |
| C07 | 480 | 85a4d30f-6fa5-4b14-a614-930419552e95 |
| C08 | 480 | f63b448f-b643-42f8-ae5d-b5f3129dee15 |
| C09 | 720 | 7d3f3601-1177-4ede-bf88-b6371af58756 |
| C10 | 480 | 00407b2e-6f2b-4a42-b824-4879d1bb0eac |
| C11 | 720 | 24dc22c4-47a1-471b-abb8-44c98c281051 |
| C12 | 720 | fce1b87e-6b6d-4495-a336-27e37d130c6a |
| C13 | 720 | 11f88a77-9a8f-42ea-a4fb-43323fb1f428 |
| C14 | 720 | 3038b00c-f4d0-435f-a00e-de55d50c8c4e |
| C15 | 720 | c2663747-7d9d-425b-9a96-36f8b43035b8 |
| C16 | 480 | 3994a7a3-39cb-4a82-bf6d-bb12da7dbb5a |
| C17 | 720 | 8f339464-df7e-4292-8476-92664d93f2da |
| C18 | 480 | 1e215ae7-e9f7-493a-935b-7786d841517f |
| C19 | 720 | 6ff6be88-955a-49d1-9a1e-49ad02c5f635 |
| C20 | 480 | 1f70642d-24e9-4f11-9732-301df85065ee |
Filter retakes (neutral wording): C01 → 51ef7dd4-f2e8-497d-ab09-2d17b4111bc3; C08 → 3dc1f7da-164a-4ec5-b5e6-936238987d03; C10 → a6256036-1dd8-4f99-8638-308d8e6179f7; C20 → 998f2ff6-775d-4f8f-8221-703240ab97f9.
C16 → 116 (see next line).
Rejected and refunded: 47c49e5a, f63b448f, 00407b2e, 1f70642d, 3994a7a3.
Second-round retakes: C01 → 9a9e8015-fcf0-41c2-8d70-a969071cbc51 (51ef7dd4 also filter-rejected);
C16 → 7dc28f7d-62e8-43ed-880e-5d03971d8b93; C20 → ebb87595-7ffc-4592-9d53-dac02a617ed8 (998f2ff6 failed).
