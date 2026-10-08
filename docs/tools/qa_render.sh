#!/usr/bin/env bash
# qa_render.sh: one-shot QA of a rendered clip, written for the Higgsfield sandbox.
#
# Usage:  bash qa_render.sh <video_url> [workdir]
#
# Prints, in this order:
#   1. probe        duration, size, codecs, resolution, frame rate, audio format
#   2. scene cuts   the seconds where the picture cuts
#   3. sound runs   when there is sound, and the quiet gaps between runs (100 ms windows)
#   4. transcript   every word with its start time, so lines, order and extras can be checked
# Writes sheet.jpg: one frame per second, six across, for a quick look at the whole clip.
#
# Notes
# - The sandbox is wiped soon after each call and the local container cannot reach the CDN,
#   so run this as ONE command. If it may pass 120 s, run it with background:true and poll the log.
# - Word times from the transcript are loose (about 0.3 s). Use the sound runs for gap lengths.
# - A phone buzz or a footstep counts as sound. Read the runs against the transcript.
# - Hands and rings are not automatic: crop the hands from the frames you pick, for example
#     ffmpeg -ss 12.0 -i c.mp4 -frames:v 1 -vf "crop=300:300:420:560,scale=600:600:flags=lanczos" -q:v 2 hand.jpg
#   and look at the fourth finger of each hand in every shot where a hand shows.
set -e
URL="$1"
W="${2:-/home/user/qa}"
[ -n "$URL" ] || { echo "usage: qa_render.sh <video_url> [workdir]"; exit 1; }
mkdir -p "$W" && cd "$W"
curl -sS -f -o c.mp4 "$URL"

echo "== probe"
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,sample_rate,channels -of compact=p=0 c.mp4
ffmpeg -v error -y -i c.mp4 -vn -ac 1 -ar 16000 a.wav

echo "== scene cuts, seconds"
ffmpeg -hide_banner -i c.mp4 -vf "select='gt(scene,0.25)',showinfo" -an -f null - 2>&1 \
  | grep -oE 'pts_time:[0-9.]+' | sed 's/pts_time://' | tr '\n' ' '
echo

echo "== sound runs and gaps (100 ms windows; threshold = noise floor + 8 dB)"
python3 - <<'PY'
import wave
import numpy as np

w = wave.open('a.wav')
sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
n = int(0.1 * sr)
k = len(x) // n
db = np.array([20 * np.log10(np.sqrt(np.mean(x[i * n:(i + 1) * n] ** 2)) + 1e-9) for i in range(k)])
floor = float(np.percentile(db, 10))
th = floor + 8
on = db > th
runs, i = [], 0
while i < k:
    if on[i]:
        j = i
        # bridge a single quiet window inside a run (a short breath or a stop consonant)
        while j + 1 < k and (on[j + 1] or (j + 2 < k and on[j + 2])):
            j += 1
        runs.append((i / 10, (j + 1) / 10))
        i = j + 1
    else:
        i += 1
print('floor %.1f dB, threshold %.1f dB, length %.1f s' % (floor, th, k / 10))
print('sound runs (s):', ', '.join('%.1f-%.1f' % r for r in runs) or 'none')
if runs:
    print('lead-in %.1f s, tail %.1f s' % (runs[0][0], k / 10 - runs[-1][1]))
    gaps = [(runs[a][1], runs[a + 1][0]) for a in range(len(runs) - 1)]
    long = [g for g in gaps if g[1] - g[0] >= 0.4]
    print('gaps of 0.4 s or more:', ', '.join('%.1f-%.1f (%.1f s)' % (a, b, b - a) for a, b in long) or 'none')
PY

echo "== transcript (segment start-end, then each word[start])"
python3 - <<'PY'
from faster_whisper import WhisperModel

m = WhisperModel('small.en', device='cpu', compute_type='int8')
segs, _ = m.transcribe('a.wav', word_timestamps=True, vad_filter=False, beam_size=5,
                       language='en', condition_on_previous_text=False)
for s in segs:
    print('%.2f-%.2f  %s' % (s.start, s.end, s.text.strip()))
    print('    ' + ' '.join('%s[%.2f]' % (w.word.strip(), w.start) for w in (s.words or [])))
PY

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 c.mp4)
ROWS=$(python3 -c "import math,sys; print(max(1, math.ceil(float(sys.argv[1]) / 6)))" "$DUR")
ffmpeg -v error -y -i c.mp4 -vf "fps=1,scale=148:-2,tile=6x${ROWS}" -frames:v 1 -q:v 3 sheet.jpg
echo "== wrote $W/sheet.jpg (one frame a second)"
