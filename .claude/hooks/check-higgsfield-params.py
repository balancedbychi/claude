#!/usr/bin/env python3
"""
PreToolUse guard for EXCLUSIVE.

Blocks a Higgsfield generate_video submission whose parameters would repeat a
failure this series has already paid for. See THE LOCK CARD at the top of
CLAUDE.md.

Exit 0 = allow. Prints a deny decision as JSON when a check fails.
Preflights (get_cost: true) are free and are never blocked.
"""
import json
import re
import sys

NIA_VOICE = "12315c68-37de-41fe-8766-76ac07bcaf70"
# Nia-Canon-Voice-v2. THE LOCK CARD held this out of every prompt "until the user
# says what it is for". The user authorised a deliberate A/B on 17 Sep 2026: "could
# we use the other voice saved for Nia and see what happens?" So the guard now
# accepts EITHER Nia element. It is not interchangeable with 12315c68 — b3d2fc9b
# sorts FIRST, so attaching it DISPLACES her established voice rather than adding
# to it, and nobody has yet listened to it in isolation. It is permitted for a
# test, not blessed for production.
ALT_NIA_VOICE = "b3d2fc9b-513a-4ea0-9a5b-c7ef95b2b18c"
# Settled by the user, 15 Sep 2026: "The voice for Chi is literally ChiChi Canon
# voice V1." 180fdb9a is deleted and is not coming back. Note that seedance never
# actually PLAYS Chi's element — Nia's UUID sorts first and wins the single
# binding — so a wrong-sounding Chi is fixed by voice_change, not by a re-shoot.
# See THE LOCK CARD in CLAUDE.md.
CHI_VOICE = "de50f37f-82fa-4a70-bdca-52355b2f4ca2"  # ChiChi-Canon-Voice-v1
DEAD_VOICE = "180fdb9a"  # deleted from the account 15 Sep 2026
CHI_FACE = "8a8e8eeb-d41e-4d91-b245-fa0caa8801b6"  # ChiChi-the-Influencer


def fail(reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception:
        sys.exit(0)  # never block on a parse problem

    if payload.get("tool_name") != "mcp__Higgsfield__generate_video":
        sys.exit(0)

    params = (payload.get("tool_input") or {}).get("params")
    if isinstance(params, str):
        try:
            params = json.loads(params)
        except Exception:
            sys.exit(0)
    if not isinstance(params, dict):
        sys.exit(0)

    # A cost preflight charges nothing. Let it through.
    if params.get("get_cost"):
        sys.exit(0)

    problems = []

    if params.get("bitrate_mode") != "high":
        problems.append(
            '  - bitrate_mode is %r, must be "high". Passing it explicitly is what '
            "keeps render quality at the level of the four approved clips. Leaving it "
            "out drops it to \"standard\" and the video bitrate falls ~7x."
            % (params.get("bitrate_mode"),)
        )

    if "quality" in params:
        problems.append(
            "  - `quality` is present and must be REMOVED. The four approved clips "
            "passed no quality field; passing it displaces the default and silently "
            "drops bitrate_mode to \"standard\". This is what broke Episode 3 Clip 5."
        )

    prompt = params.get("prompt") or ""

    if DEAD_VOICE in prompt:
        problems.append(
            "  - the prompt contains voice element 180fdb9a, which was DELETED from "
            "the account. That tag points at nothing. ChiChi's voice is %s."
            % CHI_VOICE
        )

    # Only require a voice tag for a character who actually speaks. The dialogue
    # block tags every line as `CHICHI: "..."` / `NIA: "..."`.
    if re.search(r'CHICHI:\s*["“]', prompt) and CHI_VOICE not in prompt:
        problems.append(
            "  - ChiChi speaks in this clip but her voice element %s is not in the "
            "prompt. Both women's voice tags go in every prompt they speak in."
            % CHI_VOICE
        )

    if (re.search(r'NIA:\s*["“]', prompt)
            and NIA_VOICE not in prompt and ALT_NIA_VOICE not in prompt):
        problems.append(
            "  - Nia speaks in this clip but neither of her voice elements (%s, or "
            "the alternate %s) is in the prompt. Both women's voice tags go in "
            "every prompt they speak in."
            % (NIA_VOICE, ALT_NIA_VOICE)
        )

    # --- CHI'S RING -------------------------------------------------------
    # The ring has beaten the strongest negation this project has, twice, in
    # prompts that carried section 5's named-object wording in full. It is not
    # in any reference image — the user confirmed that on 16 Sep 2026 — so it is
    # a model prior and MORE WORDS WILL NOT REMOVE IT. See CLAUDE.md section 3.
    #
    # What has not failed is keeping the finger off camera. This check does not
    # ask for another negation; it requires the prompt to say, in some form,
    # that her left hand is concealed or out of frame. Text that instructs the
    # CAMERA is obeyed far more reliably than text that forbids an object.
    chi_present = CHI_FACE in prompt or re.search(r"\bCHICHI\b", prompt)
    if chi_present:
        hand_handled = re.search(
            r"(left hand[^.]{0,120}(out of frame|not visible|concealed|hidden|"
            r"below frame|off camera|obscured))"
            r"|((out of frame|not visible|concealed|hidden|below frame|"
            r"off camera|obscured)[^.]{0,120}left hand)"
            r"|(fourth finger[^.]{0,120}(out of frame|not visible|concealed|"
            r"hidden|below frame|off camera|obscured))",
            prompt, re.I)
        if not hand_handled:
            problems.append(
                "  - ChiChi is in this clip and the prompt does not keep her LEFT "
                "HAND concealed or out of frame. The ring prior has beaten the "
                "strongest negation in CLAUDE.md twice (Episode 2, and the N1 test "
                "c9976b46) in prompts that already said NO wedding ring, NO band of "
                "any kind, nothing on the fourth finger. It is not in any reference "
                "image. Adding more negation words is not a fix.\n"
                "    Write an instruction to the CAMERA instead, e.g.: \"ChiChi's "
                "LEFT HAND stays out of frame for the entire clip\" or \"her left "
                "hand rests under the clutch so the fourth finger is concealed\".\n"
                "    If a shot genuinely needs that hand visible, the post fix is "
                "hf_mult_replace_object (Genjutsu), which runs after the render."
            )

    if problems:
        fail(
            "BLOCKED by the EXCLUSIVE parameter guard — this submission would repeat "
            "a paid-for mistake.\n\n" + "\n".join(problems) +
            "\n\nFix the params and resubmit. See THE LOCK CARD at the top of "
            "CLAUDE.md. Do not bypass this guard."
        )

    sys.exit(0)


if __name__ == "__main__":
    main()
