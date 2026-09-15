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
# ChiChi has TWO possible voice elements and which one is correct is the user's
# call, not this hook's. 180fdb9a was attached to all four approved clips and was
# then deleted from the account; de50f37f replaced it and its Chi has been
# rejected twice. The guard's job is to make sure exactly ONE is present, never
# both and never neither. See THE LOCK CARD in CLAUDE.md.
CHI_VOICE_CANON = "de50f37f-82fa-4a70-bdca-52355b2f4ca2"  # ChiChi-Canon-Voice-v1
CHI_VOICE_APPROVED = "180fdb9a-7c0b-469e-be49-3f76692a3968"  # in all 4 approved clips


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

    has_canon = CHI_VOICE_CANON in prompt
    has_approved = CHI_VOICE_APPROVED in prompt

    if has_canon and has_approved:
        problems.append(
            "  - BOTH of ChiChi's voice elements are in the prompt (%s and %s). "
            "Exactly one goes in. Two Chi voice elements is a configuration that has "
            "never been shot and is not the approved recipe."
            % (CHI_VOICE_APPROVED, CHI_VOICE_CANON)
        )

    # Only require a voice tag for a character who actually speaks. The dialogue
    # block tags every line as `CHICHI: "..."` / `NIA: "..."`.
    if re.search(r'CHICHI:\s*["“]', prompt) and not (has_canon or has_approved):
        problems.append(
            "  - ChiChi speaks in this clip but neither of her voice elements is in "
            "the prompt. Exactly one of %s (attached to all four approved clips, now "
            "deleted from the account) or %s (ChiChi-Canon-Voice-v1, rejected twice) "
            "must be present, and WHICH ONE IS THE USER'S CALL — see THE LOCK CARD."
            % (CHI_VOICE_APPROVED, CHI_VOICE_CANON)
        )

    if re.search(r'NIA:\s*["“]', prompt) and NIA_VOICE not in prompt:
        problems.append(
            "  - Nia speaks in this clip but her voice element %s is not in the "
            "prompt. Both women's voice tags go in every prompt they speak in."
            % NIA_VOICE
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
