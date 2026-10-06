#!/usr/bin/env bash
# Downloads Exclusive the Series, episode 12 ("take your own advice") clips and stills
# to the Desktop, then (if ffmpeg is installed) joins the opening card and the six
# clips into one full-episode file at 1080x1920. The clips are the Topaz 1080p
# upscales of the approved 720p takes.
#
# Save "EP12.0 opening 1080p.mp4" in the same folder as this script (e.g. both in
# Downloads), then run:
#
#   bash ~/Downloads/download-ep12.sh
#
# Joining needs ffmpeg (brew install ffmpeg). Without it you still get every clip.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE="$HOME/Desktop/Exclusive the Series/episode 12 take your own advice"
CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9"
mkdir -p "$BASE/stills"

dl() { echo "-> $1"; curl -fL --retry 3 --progress-bar -o "$1" "$2"; }

CLIPS=(
  "EP12.1 the morning after 1080p.mp4|hf_20261006_003536_fc5fc48b-ad19-444b-8e24-75f4c9cd0206.mp4"
  "EP12.2 penciled in 1080p.mp4|hf_20261006_003538_279d9616-43c2-4cf6-b0e3-68c375ae6c03.mp4"
  "EP12.3 rented 1080p.mp4|hf_20261006_003540_10874fec-fd9a-4743-9068-1432e98a8418.mp4"
  "EP12.4 asking for more 1080p.mp4|hf_20261006_003543_11436733-02ae-4347-916e-a5adc01a21a3.mp4"
  "EP12.5 take your own advice 1080p.mp4|hf_20261006_003552_44892b91-1b6d-4076-ab83-9e121c2f620b.mp4"
  "EP12.6 both phones 1080p.mp4|hf_20261006_003600_5c442dfc-06ff-43f1-bce5-48d63a7e1a55.mp4"
)
for c in "${CLIPS[@]}"; do dl "$BASE/${c%%|*}" "$CDN/${c#*|}"; done

# Approved 720p takes, in the same order. Used only to put the dialogue back if a
# Topaz 1080p file comes back without an audio track.
ORIG720=(
  "hf_20261005_032038_b8403218-ae10-4a40-9e69-c6edbbad68e0.mp4"
  "hf_20261005_032900_5839271e-0198-4488-b7bc-f647e98c5338.mp4"
  "hf_20261005_033519_303380c4-6691-487f-ac66-ddc85c2bb871.mp4"
  "hf_20261005_042609_2c7c87de-97ab-4a5c-95f7-50e41ba15c56.mp4"
  "hf_20261005_044040_f57c5a80-9ee7-4af7-9cf0-66f8333fd4dc.mp4"
  "hf_20261005_044853_68a8a8a6-a26c-4198-a29d-851380d1e329.mp4"
)
if command -v ffprobe >/dev/null; then
  for i in "${!CLIPS[@]}"; do
    f="$BASE/${CLIPS[$i]%%|*}"
    if [ -z "$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f")" ]; then
      echo "-> $f has no sound; restoring the dialogue from the approved 720p take"
      tmp="$(mktemp -d)"; dl "$tmp/orig.mp4" "$CDN/${ORIG720[$i]}"
      ffmpeg -y -loglevel error -i "$f" -i "$tmp/orig.mp4" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest "$tmp/fixed.mp4"
      mv "$tmp/fixed.mp4" "$f"; rm -rf "$tmp"
    fi
  done
fi

STILLS=(
  "Still-01-master.png|hf_20261005_030233_6ba334b6-b6e2-4675-9e99-904c956bcd0e.png"
  "Still-02.png|hf_20261005_030603_dd31ff10-8dab-4d7b-a944-7620330e0a36.png"
  "Still-03.png|hf_20261005_031619_7ff1b264-f80f-4ba1-9d27-072f82e67067.png"
  "Still-04.png|hf_20261005_030604_abec9f0f-ac77-43b4-83b2-40df2f448078.png"
  "Still-05.png|hf_20261005_031619_e0825511-f01a-41c4-83a2-dc86c6d517b7.png"
  "Still-06.png|hf_20261005_030604_d9d558ee-8768-4a88-a0c6-293e1398f355.png"
  "Nia-Take-Your-Own-Advice-Look.png|hf_20261005_024011_568806bd-3de0-47a5-aa67-eaf556f2815b.png"
  "ChiChi-Take-Your-Own-Advice-Look.png|hf_20261005_023525_2257370f-a2a8-4d2a-8bb0-22121c8c096a.png"
)
for c in "${STILLS[@]}"; do dl "$BASE/stills/${c%%|*}" "$CDN/${c#*|}"; done

# Opening card: copy it in from next to this script (or the repo's opening/out folder).
OPENING="$BASE/EP12.0 opening 1080p.mp4"
for src in "$HERE/EP12.0 opening 1080p.mp4" "$HERE/../opening/out/EP12.0 opening 1080p.mp4"; do
  if [ ! -f "$OPENING" ] && [ -f "$src" ]; then cp "$src" "$OPENING"; echo "-> $OPENING"; fi
done
[ -f "$OPENING" ] || echo "note: EP12.0 opening 1080p.mp4 not found next to this script; the full episode will start without the opening."

if command -v ffmpeg >/dev/null; then
  OUT="$BASE/EP12 take your own advice (full episode 1080p).mp4"
  echo "-> $OUT"
  PARTS=()
  [ -f "$OPENING" ] && PARTS+=("$OPENING")
  for c in "${CLIPS[@]}"; do PARTS+=("$BASE/${c%%|*}"); done
  inputs=(); filters=""; concat=""
  for i in "${!PARTS[@]}"; do
    inputs+=(-i "${PARTS[$i]}")
    filters+="[$i:v]scale=1080:1920:flags=lanczos,setsar=1,fps=24,format=yuv420p[v$i];"
    filters+="[$i:a]aformat=sample_rates=48000:channel_layouts=stereo[a$i];"
    concat+="[v$i][a$i]"
  done
  ffmpeg -y -loglevel error -stats "${inputs[@]}" \
    -filter_complex "${filters}${concat}concat=n=${#PARTS[@]}:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k \
    -movflags +faststart "$OUT"
else
  echo; echo "ffmpeg not found: the six clips are downloaded; install ffmpeg (brew install ffmpeg) and re-run to build the full episode."
fi

echo; echo "Done:"; ls -la "$BASE" "$BASE/stills"
