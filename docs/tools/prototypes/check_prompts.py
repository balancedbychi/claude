import json, os, pathlib, re, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import gen_prompts as G
d=json.load(open(HERE / 'prompts_data.json'))
script=(G.ROOT / 'episodes/hold-on/script.md').read_text(encoding='utf-8')
banned=['fully clothed','bust','nude','babyfaced','doll','busted','mature','adult','nsfw','sexy','busty']
ids={'set':G.SET,'chichi face':G.CF,'chichi body':G.CB,'chichi look':G.CL,'chichi voice':G.CV,'db face':G.DF,'db body':G.DBB,'db look':G.DL}
ok=True
for c in d:
    t=c['prompt']; n=c['n']; dur=c['dur']
    low=t.replace(G.DB_VOICE_MATCH,'').lower()  # DB's locked voice text legitimately says "mature"; scan everything else
    bad=[w for w in banned if re.search(r'\b'+re.escape(w)+r'\b',low)]
    miss=[k for k,v in ids.items() if f'<<<{v}>>>' not in t and not (n==4 and k=='chichi voice')]
    voice_ok=G.DB_VOICE_MATCH in t
    rings=t.count('NO RINGS')
    # timeline
    sec=t[t.index('THE CLIP, SHOT BY SHOT:'):t.index('LINE OWNERSHIP')]
    shots=re.findall(r'^(\d+)\. \(([\d.]+)-([\d.]+) s\)(.*?)(?=^\d+\. \(|\Z|^  END)',sec,re.S|re.M)
    prev_end=0; problems=[]; rates=[]
    for num,a,b,body in shots:
        a=float(a); b=float(b)
        if abs(a-prev_end)>0.31: problems.append(f'gap before shot {num}: {prev_end}->{a}')
        prev_end=b
        for sp,line in re.findall(r'^  ([A-Z]+) \([^)]*\)[^:]*: "(.*)"\s*$',body,re.M):
            w=len(re.sub(r'[—"]','',line).split())
            rates.append((num,sp,w,round(b-a,1),round(w/(b-a),2)))
    if abs(prev_end-dur)>0.31: problems.append(f'timeline ends {prev_end} but duration {dur}')
    # lines present in script
    lines=re.findall(r'^  [A-Z]+ \([^)]*\)[^:]*: "(.*)"\s*$',sec,re.M)
    norm=lambda s: re.sub(r'[—\-]+$','',s.replace('—','')).strip()
    notinscript=[l for l in lines if norm(l).rstrip('.?!—-') not in script.replace('—','')]
    print(f'CLIP {n}: {len(t.split())} words, {len(t)} chars | banned={bad} missing_ids={miss} dbvoice={voice_ok} rings={rings} | problems={problems}')
    print('   rates (shot, who, words, secs, w/s):', rates)
    if notinscript: print('   LINES NOT FOUND IN SCRIPT:', notinscript)
    if bad or miss or not voice_ok or rings<2 or problems: ok=False
print('ALL OK' if ok else 'ISSUES FOUND')
