# Connector playbook: how Episode 15 went right

*Written 8 Oct 2026 from the "Hold On" session (7 to 8 Oct). Every number and event below happened in that session. The standing rules stay in `CLAUDE.md`. This file is the method, the checks, and the list of what to build next.*

**The result.** "Hold On" is 54 seconds in three renders, upscaled to 1080p and stitched into one file. It was the first episode where every stage worked: the script, the beat-by-beat and direction, the production notes, the character images, a storyboard, and then filming against that storyboard. The user's words: "everything looks perfect."

## How to use this file

| Part | What it is |
|---|---|
| 1 | The method on one page. Paste-ready instructions for the connector. |
| 2 | What went right, with the proof, and how this user works. |
| 3 | Stage by stage: the artifacts, templates and tool calls. |
| 4 | The prompt template. |
| 5 | QA after every render. |
| 6 | What went wrong, and the guard for each. |
| 7 | Tool facts and quirks. |
| 8 | The ledger: time and credits. |
| 9 | **How to improve the connector.** The build list, in priority order. |
| 10 | Edits to propose for `.claude/skills/episode-production/SKILL.md`. |
| Appendices | The QA script, the stitch recipe, the prototype prompt builder, and an index of the episode's files and IDs. |

"The connector" here means everything between Claude and Higgsfield: the Higgsfield tools plus the instructions the agent follows. Each improvement in Part 9 is tagged with where it lives: **[tool]** needs a change to the tool server, **[instructions]** is a change to the text the agent follows, **[repo]** is a change in this repository. The list then works whichever of those you control.

---

## 1. The method on one page (paste-ready)

Copy from here to the next horizontal rule.

You make episodes of "EXCLUSIVE with Nia and Chi", a vertical 9:16 series rendered with Seedance 2.5 on Higgsfield. The user directs. You write, check, make stills, and render.

**Hard rules**

1. Read `CLAUDE.md` first. Its rulings beat any element description.
2. Never render a video until the user says "film" (or "go") after seeing the production notes and the full prompts. "Approved" means they accept what they were shown. A message that only names a clip is not "film". If the prompt they are replying to doesn't exist yet, write it and show it first. Image stills may be made without asking, but quote them, log them and check the charge.
3. Photos and element images come from the user's own upload, one at a time. Never save an element from a generated job. Never pick for the user.
4. Never retype a job ID. Copy it from the tool result, and check it with one lookup before relying on it.
5. After every spend, check `transactions`. Log every job ID, link, setting, credit and verdict in the episode's `prompts.md`.
6. Say what you find, even after the user has approved. Report a break in the rules plainly, with the evidence, the likely cause and a cheap test.
7. Commit and push after each stage. Put no model name in any file.

**The order of work.** Each stage ends in something the user can see and OK.

1. **Script.** Story in 30 seconds. A numbered decisions table. A cast-and-tags table (extras included, each silent or with approved lines). A floor plan with the camera side and sightline checks. The lines. A beat-by-beat table per clip (time, shot, each person's action, first and last frame). "What everyone is doing". Carry-forward rules. A cost estimate. Write each answer into the table the moment it arrives, with the date.
2. **The set.** The user's photo, then three empty-room plates, then the user picks and uploads one, then you save the element. Names stop at 32 characters and descriptions can't be edited, so show the description for an OK first. The photo wins over the floor plan: redraw the map.
3. **Looks.** One full-length costume still per character, made from their face and body elements on a plain ground. Three options. Review each against the face and body sheets and say honestly what is off. Re-run what is off. The user picks and uploads. Save with descriptions shown for OK first.
4. **Storyboard.** One still per shot, from the saved elements. Label each with shot, time window, line and job ID. Make contact sheets and a log. It is a blocking guide only: never attach a storyboard frame to a video job. Send the contact sheets and wait for the user's OK before the first render.
5. **Prompts.** Build them from locked shared blocks and run the linter: timeline contiguous, every line in the script, every element ID present, locked texts word for word, no filter words, the ring sentence for each person, a headcount, the reference exclusion paragraph. Check that no line runs faster than about 3 words a second (the linter prints each rate). Send `prompts.md`. Wait for "film".
6. **Render one at a time**, with exactly the reviewed text. Show the result in the gallery. Check it with measurements (Part 5). Report. The user approves. The approved render becomes the next render's video reference.
7. **Combine.** When the chain is stable, join neighbouring clips into one render of up to 30 seconds. The price per second doesn't change. Write the join as a hard cut. Better still, ask at script time whether to combine, so the combined prompts exist at review.
8. **Finish**, only after the user approves the whole episode: Topaz to 1080p on every render, verify, stitch by stream copy, upload to the library, log, commit, push.

---

## 2. What went right, and how this user works

### The proof

| Practice | Why it mattered | Proof in this episode |
|---|---|---|
| The user directed the story and the script was redrafted against their answers | Lines were approved before any spend | Five drafts, 7 Oct 17:40 to 8 Oct 00:28 UTC. The first story ("Call You Back") was replaced by the user's own version, "Hold On", at 20:59. A decisions table carried the dated answers |
| A cast-and-tags table and one full-length look per character | Faces, clothes and builds held across every render | The same outfits in all three renders. ChiChi's shape held after the round-2 fix |
| A floor plan and sightline checks before any prompt | Screen sides never flipped | ChiChi LEFT and DB RIGHT in every shot of all three renders (checked frame by frame) |
| Looks reviewed against the face and body sheets | Caught ChiChi's round-1 looks coming out slimmer than her body sheet, and fixed it in the image, not the prompt | Looks A, B, C became A2, B2, C2, and the user chose C2 |
| Every upload compared with the job it came from, pixel for pixel | Caught a wrong file uploaded through the wrong widget | The "plate" upload was pixel-identical to look A2 and was not used |
| A storyboard before any video credit | Staging, sides and props were fixed in stills first, cheaply | 36 stills (26 shots, 10 retakes) for 72 credits, against 91 credits for one 13-second clip. The first render matched its staging. **One gap:** the user said "ok, film clip 1" at 04:01 and the boards reached them at 04:06, after Clip 01 had started rendering at 04:03. Next time send the boards and wait |
| Prompts built from locked blocks by a generator and linted by script | DB's voice and the ring wording are identical in every prompt, with no typos | The prototype in `docs/tools/prototypes/` regenerates all three filmed prompts byte for byte (checked 8 Oct) |
| The review gate: notes, full prompts, then "film" | No surprise spend | Every render followed a "film" |
| Measured QA after every render | Found what the eye missed: a ring the user had approved before it was pointed out, and the dead air | The evidence sheet, then the re-film |
| The reference chain: approved render, then next render's video reference | Voices and looks carried across renders | Spectrum match 0.96 to 0.99 between renders (a rough check) |
| Combining clips | Fewer approval rounds at the same price per second | Five clips became three renders: 13, 24 and 17 seconds |
| 1080p only after approval | Spend only on keepers | 21 credits for three Topaz passes |

### How this user works (observed)

- Replies are a few words, often sent mid-turn: "film clip 1", "Clips 02+03", "approved, film clips 4+5". Treat "film" and "go" as the only spend triggers.
- Wants plain English, the decision first, and evidence for a defect: an image sheet beats a paragraph.
- Looks at the gallery and approves on feel. Small details (a ring, a hand out of a pocket, a 2-second silence) get through, so the agent has to measure them.
- Likes longer renders: asked on their own whether clips could be combined into one longer render ("Also, can we combine the next couple of clips?").
- Keeps every note in the repo and reads files sent to them. Work that isn't committed and sent doesn't exist for them.

---

## 3. Stage by stage

### Stage 1: Script

- **Input:** the user's story direction. Here: an afternoon at the museum, DB keeps checking his phone and saying "Hold on", and it ends on "Where were we?" and "Not continuing this."
- **Artifact:** `episodes/<name>/script.md`, in this order:
  1. Status line, then "The story in 30 seconds", then how it ties to other episodes.
  2. **Decisions table:** number, item, proposal, status. Statuses used: Your direction, Needs your OK, Approved (date), Saved (with the ID).
  3. **Cast and tags** (rule 15): tag, who, elements with IDs, voice, speaks or not. Extras and props included.
  4. **The set:** an uploads, plates and credits log; what the photo shows; the draft element description.
  5. **The looks:** options, jobs, review against the sheets, draft descriptions.
  6. **Floor plan and sightlines** (rule 13): an ASCII map, the shot types, a sightline table with a check mark per "sees" moment.
  7. **The clips:** for each, the script, a beat-by-beat table (time, shot, each person), the first and last frame, "what everyone is doing".
  8. **Carry-forward rules** that apply to every clip (rings, hair, voices, light, art, phone, visitors, clothes, movement, headcount, the last clip).
  9. **Ledger:** what each character knows at the end, and the open threads.
- **Gate:** the user answers the decisions table. Lines in quotes stay proposals until approved.
- **Check:** `docs/tools/prototypes/check_script.py` checks table columns, per-clip seconds and credits (7 per second), words per second, and that every ID appears elsewhere in the repo.

### Stage 2: The set

- The user uploads their own photo (here `artmuse3.jpg`) with the upload widget.
- Make three empty-room plates from it at 4K. Here that was 4.25 credits each and 12.75 in all, charged per image. Review each at full size for drift: plate 2's lettering had warped from "Brillo" to "Billo".
- The user picks one, downloads it and uploads it. **Compare the upload with the job pixel for pixel.**
- Save the element. The first name was 36 characters and the limit is 32. The description is write-once, so show the draft first. Keep people, props and clothes out of it.
- If the plate disagrees with the floor plan, the plate wins and the map is redrawn.

### Stage 3: Looks

- Make each still from the character's face and body elements, on a plain light-grey ground, 2K, 9:16, 2 credits each. DB had three options. ChiChi had three, then three more.
- Review table: option, job, the look, how it compares with the body sheet. In round 1 ChiChi's wide-leg trousers and boxy knits hid her waist and hips. Round 2 named her shape in words and cut every garment to follow it, and C2, a midi dress, matched.
- Set colours matter: the wall was orange, so nothing orange or rust, and belts and loafers "muted caramel brown, never orange".
- The user uploads their pick (once it was the wrong file, which the pixel check caught). Save with drafted descriptions.

### Stage 4: Storyboard

- One still per shot, made from the saved set, face and look elements. 26 shots needed 36 stills (10 retakes), 72 credits.
- The first pass drifted: a different painting, a skylight that isn't in the room, a pale ChiChi, DB's face and trousers changing. Fixes that worked: tighter identity descriptions, a description of the collage painting, "NO skylight", "LIGHT-grey", fewer references on single-person frames, then retake.
- Label every frame with shot number, time window, line and the first 8 characters of its job ID. Make contact sheets (here four) and a log, `storyboard.md`: the kept frames with full job IDs, the retaken ones, and "where the stills differ from the prompts".
- **Never attach a storyboard frame to a video job.** In Episode 14 a still's guessed faces overrode the elements' faces.
- The user asked for the boards at 03:41. Their "ok, film clip 1" came at 04:01, while the last boards were still being built, and the boards were delivered at 04:06, three minutes after Clip 01 started rendering. So the boards guided the prompts and the checks, and the user reviewed them against a render already in progress. The rule for next time: send the contact sheets, wait for the OK, then film.

### Stage 5: Production notes and prompts

- `prompts.md` holds, in order: what the user is approving; my defaults (resolution, start images, voices, visitors, bench, clip lengths, sides); what I checked (the call-outs and how each was answered); settings; the elements table; risks and guards; a beat check; the full prompts; the render log.
- Build the prompts from locked blocks (set, each character, voices, camera, physics) plus per-clip data. Run the linter (Part 4). Send the file.
- Settings: `seedance_2_5`, `mode: omni_reference`, 9:16, 720p, `generate_audio: true`, `declined_preset_id` for the "IN THE DARK" preset, no start image. Elements are pointed at in the prompt with `<<<id>>>` and their images go in `medias` as `image_references`. A video reference goes in as `video_references`.
- Price: 7 credits a second at 720p.

### Stage 6: Render, check, approve

1. `generate_video` with exactly the reviewed text. Copy the job ID from the result.
2. `jobs_wait` until done. It waits at most 15 seconds a call, and a render takes roughly 5 to 8 minutes here.
3. `show_generation_by_ids` so the user sees it.
4. `balance` and `transactions`: one charge, the right size.
5. Check it (Part 5).
6. Message the user: what is right, what isn't, the numbers, an evidence image for any defect, and the decision they need to make.
7. On approval, log it and attach it as the next render's video reference.

### Stage 7: Combine

- Join the shot lists with the times re-based. Write the join as a hard cut: "HARD CUT, a few minutes later, to…" or "a moment later". Repeat the headcount for the second half. List every line with its owner.
- Keep the total at 30 seconds or less. Preflight the price: 24 s was 168 credits and 17 s was 119, which is 7 a second.
- The trade-off: if the second half goes wrong, the whole render is re-rolled, and the user can't approve the halves separately.

### Stage 8: Finish

- **Topaz:** `upscale_video` with provider `topaz`, resolution `1080p`, aspect ratio `9:16`, once per render. There is no preflight. Billed here: 13 s = 6, 24 s = 9, 17 s = 6 credits.
- **Stitch:** Appendix B. Check frames on both sides of each join, audio continuity and durations.
- Record the media ID and URL in the cut list.

---

## 4. The prompt template

Every section below was in every prompt. The order matters less than having all of them.

| # | Section | Its job, and what mattered |
|---|---|---|
| 1 | Header | "N SECONDS. Photoreal cinematic drama, vertical 9:16, AFTERNOON, … Wholesome." |
| 2 | TIMING, READ THIS FIRST | No dead air, replies within 0.2 s, the only beats named, nobody frozen, opens already moving, ends within half a second of the last line. **It did not control the gaps** (Part 6). |
| 3 | REFERENCE VIDEO | First clip: voices only, with an exclusion list: the restaurant, the server, clothes, **rings**, dialogue. Later clips: the approved previous clip is the authority for looks, voices, place, light and camera; no line is repeated; the first line of this clip is named; a sentence says the hands are bare in the reference and stay bare. |
| 4 | WHERE WE ARE | When this picks up, and the first words spoken. |
| 5 | HEADCOUNT | "Exactly N main people, never two of anyone", where each is in the first frame, and the extras: one visitor far back, mouth closed. |
| 6 | SET | The reference image decides the layout. The room in words. No readable text. |
| 7 | One block per character | Element placeholders; face, hair, skin, height; clothes come ONLY from the look element; face never drifts and is in sharp focus; the ring sentence. For DB: "bare hands" in positive words and the left hand in his pocket. |
| 8 | PROP | One object moves, who holds it, the screen never faces the camera. |
| 9 | BLOCKING | Sides, walking, exits that never cross in front of anyone, where the watch is. |
| 10 | FIRST FRAME | Exactly who is where. |
| 11 | THE CLIP, SHOT BY SHOT | Numbered, with time windows and shot types. Each line as `NAME (accent), delivery: "line"`. End on the last line, then "After that, silence: nobody speaks." |
| 12 | LINE OWNERSHIP, NEVER SWAPPED | Every line with its speaker. "Only these N lines, in this order, each said once." |
| 13 | PRONUNCIATION | Only when needed (a name, "revised", a hum). |
| 14 | VOICES | ChiChi: her voice element plus "ChiChi is AMERICAN…". DB: his written description word for word plus "match his voice in the reference". |
| 15 | WHAT EVERYONE IS DOING | An action for every person and extra. |
| 16 | CAMERA | Steady, eye level, no zooms, never tighter than waist-up, the sides. |
| 17 | PHYSICS | Weight, five-finger hands, two arms, the phone moves only in a hand. |
| 18 | AUDIO | Only these lines and sounds. No music, chatter, narration or subtitles. |

**The linter's checks** (`docs/tools/prototypes/check_prompts.py` and `check_v2.py`):

- the timeline is contiguous and ends at the render length (within 0.3 s);
- every quoted line appears in the script;
- the speaking rate of every line is printed for review (the filmed prompts ran 1.4 to 2.9 words a second; the linter does not fail on it yet, and it should);
- every element ID is present, and DB's locked voice text is verbatim;
- the ring sentence appears for each person, and DB's text has the "bare hands" sentence and no "wedding";
- the ownership list has one entry per line;
- no banned words (moderation-risk wording such as "nude", "sexy", "doll"). DB's locked voice description is cut out before this scan, because it legitimately says "mature" and was filmed and approved as written.

**Wording lessons**

- Avoid "fully clothed", body words beyond "full-figured with a defined waist", and other words that tripped the content check in Episodes 12 to 14.
- Naming a forbidden thing can bring it in (the "Say Less" lesson, and why DB's text no longer says "wedding ring").
- Leave a silent character's voice element off.
- Refer to a reference clip's last line without quoting it.
- End on a spoken line, or within half a second of the last action.

**Prompt size.** 12.3, 16.6 and 15.0 thousand characters were all accepted.

---

## 5. QA after every render

Run `docs/tools/qa_render.sh <video_url>` in the Higgsfield sandbox as one command (Appendix A). It prints the probe, the cuts, the sound runs and gaps, and a word-timed transcript, and writes a one-frame-a-second contact sheet.

| # | Check | How | Pass |
|---|---|---|---|
| 1 | Format | `ffprobe` | Length as asked, 720p, audio present |
| 2 | Lines | Transcript | Every line, in order, each once, nothing added, extras silent, nothing after the last line |
| 3 | Who speaks | Pitch per line (autocorrelation): ChiChi's lines ran about 160 to 260 Hz and DB's about 85 to 125 Hz in these clips | No swapped lines. A buzz or room tone can pull a line to about 150 Hz: check those against the lips |
| 4 | Voices against the last approved render | Long-term spectrum match, same speaker 0.96 to 0.99 here | Rough only. It cannot separate the two speakers well (0.92 to 0.96 across), so use pitch for ownership. **Accent and tone are for the user's ears** |
| 5 | Pacing (rule 4) | Sound runs and gaps | Lead-in, each gap of 0.4 s or more, the tail. Report them against the 0.2 s rule |
| 6 | Cuts | Scene detection | Match them to the shot windows |
| 7 | Picture | The contact sheet | Sides, outfits, headcount, set, extras, props, sharp faces |
| 8 | **Hands and rings** | Crop both hands at 3 to 6 times zoom, in every shot where a hand shows | The fourth finger of each hand is bare. Left hand where the prompt put it |
| 9 | Joins | The next prompt's first frame against this render's real last frame | Same places, same props |
| 10 | Credits | `transactions` | One charge, the right size |

**Report to the user** as a table: Lines, Who speaks, Rings, Picture, Staging, Pacing, Cuts, Credits. Then one plain sentence on what they must decide. For a defect, send an evidence image (`qa/clip01-ring-evidence.jpg` is the model: Clip 01, the voice reference, and DB's own element images, side by side).

---

## 6. What went wrong, and the guard

| What happened | Cost | The guard now |
|---|---|---|
| **A ring on DB's left hand in Clip 01 v1**, though the prompt said no rings. The voice-reference clip from Episode 11 shows the same band. The user approved the clip before the ring was pointed out | One re-film (91 credits) and a round trip | Name the ring in the reference paragraph. Say "bare hands" in positive words. Keep his left hand in his pocket. Check the hands of any clip before attaching it as a reference |
| The fix held in v2 and in Clips 02+03, but in Clips 04+05 his left hand swung free in the walk back | No ring seen, one blurred moment | Check the left hand in every shot, not only the wide ones |
| The pocket instruction was ignored once, and a buzz and a reaction ran long: a 0.5 s buzz ran about 1 s with 0.7 s of quiet each side, a listening reaction left about 2.8 s of silence, one clip opened with 1.7 s of quiet | The user approved anyway | Give a reaction shot a window barely longer than its line. Measure every take |
| "Answers at once" in the prompt did not close the 0.4 to 1 s gaps | None | Don't trust the wording. Measure and report |
| Two 36-character IDs retyped wrongly: one render ID (`9f78` for `9b98`) and one storyboard frame's ID, both returned `lookup_failed` | A call and a recovery each time (the IDs were recovered from the transcript) | Copy IDs from results. Verify with one lookup |
| A look uploaded through the plate widget | Caught by the pixel check | Compare every upload with its job |
| The storyboard first pass drifted | 10 retakes, 20 credits | Tighter descriptions, fewer references on single-person frames |
| ChiChi's round-1 looks came out slimmer than her sheet | 6 extra stills, 12 credits | Review against the sheet. Name the shape in words. Fix it in the image |
| An element name of 36 characters, and write-once descriptions | One call | Names stop at 32. Show descriptions for OK first |
| Terse messages that named a clip without a go-ahead the rule accepts: "Clips 02+03" (the prompt had been sent, but the message didn't say "film") and "approved, film clips 4+5" (sent before the 04+05 prompt existed) | One round trip each: 10 minutes for 02+03, 9 for 04+05 | Show the prompt first when it doesn't exist. Hold until "film" or "go" follows the prompt. Ask at script time whether to combine, so combined prompts exist at review |
| The storyboard reached the user three minutes after Clip 01 started rendering, because "ok, film clip 1" arrived while the boards were being built | None this time | Send the contact sheets and wait for the OK before the first render, or say plainly that filming starts first |
| The sandbox is wiped soon after each call, and the local container can't reach the CDN | 5 to 10 sandbox calls per check (10, 5, 7 and 6 for the four renders) | One-command script. Background it and poll |
| Tool outputs that echo whole prompts and element lists | Context | Compact modes (Part 9) |
| A quoted per-image price read as a total | None, but close | Multiply the quote by the count. Check `transactions` |

---

## 7. Tool facts and quirks

| Tool | What to know |
|---|---|
| `media_upload_widget` | Must be the only tool in its message. The user uploads. Compare each upload with the job it came from. |
| `media_upload`, then a PUT from the sandbox, then `media_confirm` | For files made in the sandbox. The presigned URL signs `content-type`, `host` and `if-none-match`, so send `Content-Type` and `If-None-Match: *`. Expect HTTP 200. Confirm only after that. |
| `manage_reference_elements` / `show_reference_elements` | Names stop at 32 characters. Descriptions are write-once. `create` returns the whole element list: 46 to 47 KB each time. |
| `generate_image_batch` | 1 to 12 items. `<<<id>>>` placeholders inject element references. No `get_cost`. |
| `generate_image` with `get_cost` | The quote is per image. Nano Banana Pro was 2 credits at 1K or 2K, and 4.25 at 4K. |
| `generate_video` | Seedance 2.5, `omni_reference`, duration 4 to 30, 9:16, 720p, `generate_audio`, `declined_preset_id`. 7 credits a second at 720p (12 at 1080p high bitrate). Elements come from the `<<<id>>>` placeholders in the prompt. The echo lists the video reference under `reference_images`. |
| `jobs_wait` | At most 15 seconds a call. `lookup_failed` means a wrong ID. |
| `show_generation_by_ids` | How the user sees a render. Echoes the full prompt and every element description: 25 to 30 KB for one render job, 36 KB for nine stills. |
| `show_generations` | Very large (not measured in this episode). |
| `balance`, `transactions` | The ledger. Check after every spend. |
| `upscale_video` | `topaz`: `video_id`, `resolution`, `aspect_ratio`. No preflight. |
| `sandbox_exec` | Remote Linux with ffmpeg, ImageMagick, PIL and faster-whisper. Wiped soon after each call, so chain work in one command. 120 s foreground limit, 16,000-character command limit, `background:true` with polling for longer. Images come back natively: at most 4 a call and 512 KiB in all. |
| Local container | Cannot fetch the CloudFront hosts. All media work goes through the sandbox. |
| Delivering files | The user follows the session in the app and can open only files inside the working directory. Send files with `SendUserFile`. |
| MCP connection | Every MCP server, Higgsfield included, was announced as disconnected four times (7 Oct 17:27 and 23:31, 8 Oct 02:55 and 03:08), each time as the user's first message after a quiet spell arrived, and as available again within a few minutes. Deferred tools had to be loaded again with `ToolSearch` before the next call. Running jobs were not affected. |

---

## 8. The ledger

**Time (UTC).** Script drafts 7 Oct 17:40 to 8 Oct 00:28. Plates 7 Oct 23:47. Looks made 8 Oct 00:18 to 00:29, and the user's uploads 02:55 to 03:19. `prompts.md` first sent 03:36. Storyboard stills 03:44 to 04:00, delivered 04:06.

| Render | Submitted | Finished |
|---|---|---|
| Clip 01 v1 (rejected) | 04:03 | 04:10 |
| Clip 01 v2 | 04:32 | 04:39 |
| Clips 02+03 | 04:51 | 04:59 |
| Clips 04+05 | 05:11 | 05:18 |

A render took 6.7 to 7.4 minutes. Topaz 05:26 to 05:28. Stitched file uploaded 05:32 to 05:34. From the first render submitted to the final file: about 1 hour 30 minutes, including a re-film, five checks, 1080p and the stitch.

**Credits.**

| Item | Credits |
|---|---|
| Three plates (4.25 each) | 12.75 |
| Nine look stills (2 each) | 18 |
| Storyboard, 36 stills (2 each), 10 of them retakes | 72 |
| Renders: Clip 01 v1 (rejected) 91, v2 91, Clips 02+03 168, Clips 04+05 119 | 469 |
| Topaz 1080p: 6 + 9 + 6 | 21 |
| **Total** | **592.75** |

The balance went from 755.02 before the plates to 162.27. The final cut cost 501.75 of that. The rest was the rejected Clip 01 v1 (91).

---

## 9. How to improve the connector

Each item says what was seen, what to build, and how you'll know it's done. Tags: **[tool]** server change, **[instructions]** the agent's text, **[repo]** this repository.

### If you only do three things

1. **Item 1**, the one-call render check.
2. **Item 5**, references that can't leak.
3. **Items 2 and 3**, handles and compact outputs.

### P0: build first

**1. A one-call render check [tool]**
- *Seen:* every check took 5 to 10 sandbox calls, because the sandbox is wiped soon after each call and the local container can't reach the CDN. The ring was found only because someone cropped the hands by hand.
- *Build:* `render_qa(job_id, times?, boxes?)` returning the probe, a word-timed transcript, sound runs and gaps, cut times, a one-frame-a-second contact sheet, the first and last frame, and optional crops at given times and boxes. Add a hand check: both hands at N frames, magnified.
- *Done when:* one call returns all of it in under two minutes, in about 10 KB of text and two images. `docs/tools/qa_render.sh` is the working prototype of everything except the hand crops.

**2. Handles instead of 36-character IDs [tool]**
- *Seen:* two lookups failed because an ID was retyped with a wrong character.
- *Build:* every submit returns a short handle such as `c01v2`. `jobs_wait`, `show_generation_by_ids`, `upscale_video` and media references accept a handle, or any unambiguous 8-character prefix. `jobs_wait` with no list waits for every pending job.
- *Done when:* no call in an episode needs a full ID typed by hand.

**3. Compact outputs [tool]**
- *Seen:* `show_generation_by_ids` returned the full prompt and every element description for each job: 25 to 30 KB for one render. `show_reference_elements create` returned the whole element list, 46 to 47 KB, three times in a few minutes.
- *Build:* `compact: true` as the default, returning id, status, model, URL, size and credits. `verbose: true` for the full echo.
- *Done when:* showing a render costs under 1 KB of context, and a `create` returns only the new element.

**4. Costs you can see before you spend [tool]**
- *Seen:* no preflight for `generate_image_batch` or Topaz. A per-image quote was read as a total. Topaz cost showed only afterwards.
- *Build:* `get_cost` on every tool that spends, with unit price, count and total. A Topaz estimate by duration. A session ledger listing every spend with the running balance.
- *Done when:* the agent can state the total for any plan before the first call, and the ledger matches `transactions`.

**5. References that can't leak [tool and instructions]**
- *Seen:* a clip attached "for voices only" carried a ring onto DB's hand. The prompt listed what not to take and the model obeyed the list. The ring wasn't on it.
- *Build:* a reference scope (`voice_only`, `look`, `look_and_voice`), or an audio-only reference made from an approved clip's audio track. Until then, the prompt builder always writes the full exclusion list: the restaurant, the server, clothes, jewellery and rings, hands, dialogue.
- *Done when:* a voices-only reference never changes a character's hands or clothes.

**6. A prompt builder and linter [repo or tool]**
- *Seen:* all eight prompts came from locked blocks and scripts, so DB's voice and the ring wording were identical every time, and the linter caught timeline gaps and fast lines. The scripts lived in a temporary folder.
- *Build:* keep them. `docs/tools/prototypes/` has working copies that regenerate the three filmed prompts byte for byte. Turn them into: a data file per episode (cast, set, clips, shots, lines) in, prompts and a lint report out.
- *Done when:* a new episode's prompts come from a data file plus the locked blocks, and the linter runs before every review.

### P1: next

**7. Element management [tool]**
- *Seen:* descriptions are write-once and names stop at 32 characters, so every change meant a new element and a retired one.
- *Build:* edit a description, or save a new version with lineage. A compact list: ID, name, image ID.
- *Done when:* a wording fix doesn't need a new element.

**8. A storyboard generator [tool or repo]**
- *Seen:* 36 stills made by hand-written prompts, with a drift problem that needed 10 retakes.
- *Build:* from the beat table, one still per shot with the element placeholders and the standing guards ("no skylight", the collage description, light grey). Labels, contact sheets, the log. A quote first.
- *Done when:* the storyboard for a new episode is one call plus a review.

**9. A storyboard-against-film check [tool]**
- *Seen:* in Clips 02+03 the first shot stops in the middle of the room facing the camera, not at the small picture, and nothing flagged it.
- *Build:* sample each render at its shot windows and compare who is on which side, the headcount and the set with the storyboard frame. Flag the differences.
- *Done when:* the check lists staging differences before the user watches.

**10. A state per clip, and an automatic log [tool or repo]**
- *Seen:* the render log and cut list were patched by hand five times and could have drifted from reality.
- *Build:* each clip moves through script OK, prompt reviewed, filmed, checked, approved, upscaled, stitched. The log and cut list are written from tool results: job IDs, links, credits from `transactions`.
- *Done when:* the log can't disagree with the ledger.

**11. Pacing [instructions, and tool if the model allows]**
- *Seen:* gaps of 0.4 to 1 s between lines whatever the prompt said, and reaction shots that ran far longer than written.
- *Build:* a maximum-gap parameter if the model offers one. If not: shot windows barely longer than their lines, no reaction-only shot, and the gap measurement run on every take, with a note on which retake would fix which gap.
- *Done when:* the report lists every gap over 0.4 s, and a re-film is offered only when a gap breaks the rule.

**12. A long wait [tool]**
- *Seen:* `jobs_wait` stops at 15 seconds, so the four renders took 10, 21, 20 and 17 waiting calls (68 in all), each render lasting about 7 minutes.
- *Build:* a wait of up to ten minutes, or a notification when a job finishes.
- *Done when:* one call per render.

**13. Verify uploads automatically [tool]**
- *Seen:* a wrong file was uploaded once and caught by hand.
- *Build:* when the user uploads a still, compare it with the generating job and say "same as job X" or "not from any job".
- *Done when:* the agent states what every upload is before it is used.

**14. Frames and crops on demand [tool]**
- *Seen:* the local container can't reach the CDN, so every frame came through the sandbox, four images a call.
- *Build:* `get_frame(job, time, box?)` returning an image.
- *Done when:* a hand check at eight times is two calls, not eight.

### P2: later

**15. Face drift [tool]:** compare each shot's faces with the face elements.

**16. One-call stitch [tool]:** concatenate, upload and confirm, with join checks. It took four calls and a signed URL.

**17. A combine planner [instructions]:** given the clip list and the 30-second cap, propose pairings, price them, flag the joins, and ask at script time.

**18. A rules lint [repo]:** read `CLAUDE.md` and refuse to submit a prompt that breaks a mechanical rule (the ring sentence, "ChiChi is AMERICAN", headcount, locked voices).

**19. Approval vocabulary [instructions]:** write down which words mean "film", which mean "approved", and what to do with a message that only names a clip. This episode handled it by showing the prompt first. It cost one round trip and no one minded.

**20. Survive reconnects [tool]:** the MCP servers were announced as disconnected four times, and the loaded tool list had to be rebuilt each time. Keep the schemas across a reconnect, and add a call that lists every job this session submitted, with its status, so nothing depends on an ID held only in the conversation.

**21. A storyboard gate [instructions]:** send the storyboard contact sheets and hold the first render until the user says OK. This time "ok, film clip 1" arrived before the boards were delivered (Part 3, stage 4).

---

## 10. Edits to propose for the episode-production skill

These are not applied. Say the word and I'll add them to `.claude/skills/episode-production/SKILL.md`.

**After step 3 (photos), add "3a. Looks":**

> One full-length costume still per character, made from their face and body elements on a plain ground, three options. Review each against the face and body sheets, in words: shape, hair, skin, hands, rings, colours against the set. Re-run what is off, naming the shape in words. The user picks and uploads. Compare the upload with its job. Show each element description for OK before saving: names stop at 32 characters and descriptions can't be edited.

**After step 5 (play-by-play), add "5a. Storyboard":**

> One still per shot from the saved elements. Label each with shot, time window, line and job ID. Make contact sheets and a log. It is a blocking guide only: never attach a storyboard frame to a video. The user reviews it before any video credit.

**After step 10 (review, then film), add:**

> **11. Check every render with measurements.** Lines and order by transcript. Ownership by pitch. Voices against the last approved render. Sound runs and gaps. Cuts. A contact sheet. **Both hands at magnification in every shot where a hand shows.** Credits in `transactions`. Report in a table with an evidence image for any defect, and say what the user must decide.
>
> **12. Combine.** Once the chain is stable, join neighbouring clips into one render of up to 30 seconds. The price per second doesn't change. Write the join as a hard cut. Ask at script time so the combined prompts exist at review.
>
> **13. Finish.** After the user approves the whole episode: Topaz to 1080p on every render, stitch by stream copy, upload, log the media ID and URL.
>
> **14. Keep the record.** Log every job ID, link and credit. Commit and push after each stage.

**In step 7 (call out every segment), add to the reference paragraph rule:**

> The reference paragraph lists everything not to take from the reference: the restaurant, the server, clothes, jewellery and rings, hands and dialogue. Check the hands of any clip before attaching it.

---

## Appendix A: the QA script

`docs/tools/qa_render.sh`, tested on Clip 01 v2 on 8 Oct. Its output matched the hand analysis: the same sound runs, a 1.1 s gap before "Little pieces up close.", and the same transcript. In the sandbox:

```
bash qa_render.sh '<video url>' /home/user/qa
```

Run it as one command, or with `background:true` and poll the log. It took about 45 seconds for a 13-second clip, most of it the transcript. For hands, crop the frames you choose:

```
ffmpeg -ss 12.0 -i c.mp4 -frames:v 1 -vf "crop=300:300:420:560,scale=600:600:flags=lanczos" -q:v 2 hand.jpg
```

## Appendix B: the stitch recipe

Used on 8 Oct for the final file. The three masters must share codec, size, frame rate and audio format. These did: HEVC Main 1080 x 1920, 24 fps, yuv420p; AAC LC 32 kHz stereo.

```
# 1. Ask for an upload slot. The filename decides the type.
media_upload  filename="EXCLUSIVE_Ep15_Hold_On_1080p.mp4"  content_type="video/mp4"
#    returns upload_url, media_id and url

# 2. One sandbox_exec command (the sandbox is wiped soon after):
curl -sS -f -o 1.mp4 <master 1 url>      # then 2.mp4 and 3.mp4
for f in 1 2 3; do ffprobe -v error -show_entries stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,sample_rate,channels -of compact=p=0 $f.mp4; done   # must match
printf "file '1.mp4'\nfile '2.mp4'\nfile '3.mp4'\n" > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -c copy -movflags +faststart EPISODE.mp4
curl -sS -o put.out -w '%{http_code}' -X PUT -H 'Content-Type: video/mp4' -H 'If-None-Match: *' --upload-file EPISODE.mp4 '<upload_url>'     # expect 200

# 3. Only after 200:
media_confirm  type="video"  media_id=<media_id>
```

Then check frames on both sides of each join and the audio level across it. The result here: 54.2 s, 61.5 MB, about 9.1 Mbit/s, the metadata at the front.

## Appendix C: the prototype prompt builder and linter

In `docs/tools/prototypes/`. They are working prototypes from this episode, not a product.

| File | What it does |
|---|---|
| `gen_prompts.py` | The locked blocks (set, ChiChi, DB, phone, camera, physics, voices) and the five separate v1 prompts |
| `gen_v2.py` | The ring-fix blocks, Clip 01 v2 and the combined Clips 02+03 |
| `gen_v3.py` | The combined Clips 04+05 |
| `check_prompts.py` | The linter for the v1 prompts |
| `check_v2.py` | The linter for the ring-fix prompts. Takes a JSON file name |
| `check_script.py` | Table columns, seconds and credits, words per second, IDs |

To run them, from the repo root (they find their own paths, so any folder works): `python3 docs/tools/prototypes/gen_prompts.py`, `gen_v2.py`, `gen_v3.py`, then `python3 docs/tools/prototypes/check_v2.py prompts_v2.json`, `check_v2.py prompts_v3.json` and `check_prompts.py`. Each prints `ALL OK` or `ISSUES FOUND`. The JSON files they write sit beside the scripts and are ignored by git. On 8 Oct their output was identical to the text that was filmed (each prompt appears word for word in `episodes/hold-on/prompts.md`). Nothing here submits a render or spends a credit. `docs/tools/prototypes/README.md` has the details.

## Appendix D: Episode 15 index

| What | Where or ID |
|---|---|
| Script, notes and prompts, storyboard | `episodes/hold-on/script.md`, `prompts.md`, `storyboard.md`, `storyboard/` |
| Evidence images | `episodes/hold-on/qa/clip01-ring-evidence.jpg`, `clip01v2-hands.jpg` |
| Set element | `Atlanta-Art-Museum-Gallery` `f4bd8e99-83bd-4904-9f98-510f71713494` |
| ChiChi | face `b03240bd…`, body `46074b6d…`, look `fc4e50ad…`, voice `de50f37f…` |
| DB | face `1023755a…`, body `952f3fb0…`, look `1130f30a…` |
| Renders (720p) | v1 `9f01f419…` (rejected), v2 `704a4b8b…`, Clips 02+03 `eabbe640…`, Clips 04+05 `777680d8…` |
| Topaz 1080p | `902a7932…`, `21105c20…`, `0a81a12c…` |
| Stitched episode | library media `b1d60163-ba79-4b81-b09f-181f9ba8f163`, `EXCLUSIVE_Ep15_Hold_On_1080p.mp4` |
| Full IDs and links | the cut list and render log in `episodes/hold-on/prompts.md` |
