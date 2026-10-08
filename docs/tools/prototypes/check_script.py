import re, sys, subprocess, pathlib
p = pathlib.Path(sys.argv[1]); root = pathlib.Path(sys.argv[2])
t = p.read_text()
lines = t.splitlines()

# 1. table column consistency
bad = []
block = []
def flush():
    global block
    if len(block) >= 2:
        counts = {len(re.findall(r'(?<!\\)\|', l)) for l in block}
        if len(counts) != 1:
            bad.append((block[0][:70], sorted(counts)))
    block = []
for l in lines:
    if l.strip().startswith('|'):
        block.append(l)
    else:
        flush()
flush()
print("TABLES with ragged columns:", bad if bad else "none")

# 2. durations and credits from clip headings
heads = re.findall(r'^## CLIP (\d+) · "([^"]+)" · (\d+) s · (\d+) credits', t, re.M)
tot_s = sum(int(h[2]) for h in heads); tot_c = sum(int(h[3]) for h in heads)
print("CLIPS:", [(h[0], h[2] + "s", h[3] + "cr") for h in heads])
print("TOTAL seconds:", tot_s, " credits:", tot_c, " 7cr/s check:", tot_s * 7, "->", "OK" if tot_s * 7 == tot_c else "MISMATCH")
print("each clip = secs*7:", all(int(h[2]) * 7 == int(h[3]) for h in heads))
print("30% retakes + Topaz 0.4/s:", round(tot_c * 1.3 + tot_s * 0.4, 1))

# 3. words spoken per clip vs duration (rough pace check)
secs = re.split(r'^## CLIP ', t, flags=re.M)[1:]
for s in secs:
    n = s.split(' ')[0]
    script = s.split('### Script')[1].split('### Beat-by-beat')[0]
    spoken = re.findall(r'^> \*\*[A-Z]+\*\* (?:\*\([^)]*\)\* )?(.*)$', script, re.M)
    words = sum(len(re.sub(r'[*_"]', '', x).split()) for x in spoken)
    dur = int(re.search(r'· (\d+) s ·', s.split('\n')[0]).group(1))
    print(f"clip {n}: {len(spoken)} lines, {words} words, {dur}s -> {words/dur:.2f} words/s")

# 4. IDs: every uuid or 8-hex prefix in the script must appear elsewhere in the repo (or be one I read from Higgsfield)
ids = sorted(set(re.findall(r'\b[0-9a-f]{8}(?:-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?\b', t)))
verified_via_higgsfield = {'9c43c008','3b8fc14c','759bc585','62615e58'}
for i in ids:
    short = i[:8]
    out = subprocess.run(['grep','-rIl','--exclude-dir=.git','--exclude-dir=node_modules','--exclude=script.md',short,str(root)],capture_output=True,text=True).stdout.split()
    elsewhere = [o for o in out if 'call-you-back' not in o]
    tag = ("Higgsfield-verified; " if short in verified_via_higgsfield else "") + f"{len(elsewhere)} other file(s)"
    print(f"  {i}: {tag}")
