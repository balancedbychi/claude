#!/usr/bin/env python3
"""Pre-submission checks for a seedance prompt file.

Free, mechanical, and it catches the three faults that have actually shipped:

  1. CHARACTER COUNT over 19,554 - CLAUDE.md 2b. At 19,940 a two-word line
     stopped rendering altogether.
  2. WORD/LINE COUNT drifting from what the script block claims at the top.
  3. THE SEQUENCE CONTRADICTION that cost N1 C5 225 credits and dropped line 8:
     the numbered script said "IN THIS ORDER" and the blocking played 9 before
     8. Reading each block on its own never surfaces it - only a diff does.

Usage:  python3 exclusive/check-prompt.py exclusive/prompts/<file>.txt
"""
import re, sys

CEILING = 19554

def sections(s):
    """Return (shot-list text, blocking text) - the two places that fix running order."""
    cam = re.search(r'^CAMERA$(.*?)^(SIMONE|NIA|CHICHI|SET)$', s, re.M | re.S)
    blk = re.search(r'^BLOCKING.*?$(.*?)^(AUDIO|IMAGE QUALITY)$', s, re.M | re.S)
    return (cam.group(1) if cam else ''), (blk.group(1) if blk else '')

def order_in(text):
    """Line numbers in the order this text plays them, de-duplicated."""
    out = []
    for m in re.finditer(r'\bLINES?\s+([0-9]+(?:\s*(?:,|AND|TO)\s*[0-9]+)*)', text, re.I):
        toks = [int(t) for t in re.findall(r'\d+', m.group(1))]
        if re.search(r'\bTO\b', m.group(1), re.I) and len(toks) == 2:
            toks = list(range(toks[0], toks[1] + 1))
        out += toks
    seen = []
    for x in out:
        if x not in seen:
            seen.append(x)
    return seen

def main(path):
    s = open(path).read()
    fail = []
    n = len(s)
    print('FILE      %s' % path)
    print('CHARS     %d  (ceiling %d, headroom %d)' % (n, CEILING, CEILING - n))
    if n > CEILING:
        fail.append('over the %d character ceiling by %d' % (CEILING, n - CEILING))

    lines = re.findall(r'^\s*(\d+)\.\s+([A-Z]+) speaks: "([^"]+)"', s, re.M)
    words = sum(len(t.split()) for _, _, t in lines)
    print('SCRIPT    %d lines, %d words' % (len(lines), words))
    claim = re.search(r'EXACTLY (\d+) WORDS OF DIALOGUE, ([A-Z]+) LINES', s)
    if claim and int(claim.group(1)) != words:
        fail.append('header claims %s words, the lines add up to %d' % (claim.group(1), words))

    script = [int(x) for x, _, _ in lines]
    cam, blk = sections(s)
    for name, text in (('shot list', cam), ('blocking', blk)):
        got = order_in(text)
        ok = got == script
        print('SEQUENCE  %-9s %s  %s' % (name, got, 'MATCH' if ok else '*** MISMATCH ***'))
        if not ok:
            fail.append('%s plays %s, the numbered script is %s' % (name, got, script))

    els = sorted(set(re.findall(r'<<<([0-9a-f]{8})[0-9a-f-]*>>>', s)))
    print('ELEMENTS  %d: %s' % (len(els), ', '.join(els)))
    if not re.search(r'left hand[^.]{0,120}out of frame', s, re.I):
        fail.append("ChiChi's left hand is not put out of frame (see the params hook)")

    print()
    if fail:
        print('*** %d PROBLEM(S) ***' % len(fail))
        for f in fail:
            print('  - ' + f)
        return 1
    print('ALL CHECKS PASS')
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
