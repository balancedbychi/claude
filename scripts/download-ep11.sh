#!/usr/bin/env bash
# Downloads Exclusive the Series, episode 11 ("just as important") clips and stills
# to the Desktop, then (if ffmpeg is installed) joins the six clips into one
# full-episode file at 720x1280. Clip 4 was rendered at 1080p and is scaled down
# so the whole episode matches.
#
#   bash scripts/download-ep11.sh
#
# Joining needs ffmpeg (brew install ffmpeg). Without it you still get every clip.
set -euo pipefail
BASE="$HOME/Desktop/Exclusive the Series/episode 11 just as important"
CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9"
mkdir -p "$BASE/stills"

dl() { echo "-> $1"; curl -fL --retry 3 --progress-bar -o "$1" "$2"; }

CLIPS=(
  "EP11.1 the lawyer story.mp4|hf_20261005_002235_0afc3a1a-aa7f-412f-bbb9-beb56980e64d.mp4"
  "EP11.2 ten cats.mp4|hf_20261005_003640_36ee51ca-f51e-4d85-9682-b56eb90cc574.mp4"
  "EP11.3 always wanted one.mp4|hf_20261005_005851_fc894b33-bdb8-4ed2-96c5-2f9d0eb7cb84.mp4"
  "EP11.4 why it ended.mp4|hf_20261005_011319_687a5c19-2aa7-45d1-85c0-ad6885f96e64.mp4"
  "EP11.5 just as important.mp4|hf_20261005_013247_1a685bed-7301-4d05-b755-4928b3202078.mp4"
  "EP11.6 three things.mp4|hf_20261005_014754_8123d75b-01ec-4f04-8ead-b36f1295bbd8.mp4"
)
for c in "${CLIPS[@]}"; do dl "$BASE/${c%%|*}" "$CDN/${c#*|}"; done

dl "$BASE/stills/Restaurant-High-Rise-Night.png"     "$CDN/hf_20261004_234730_8ce7bbec-57c7-46cb-95ba-3c15bc3edba8.png"
dl "$BASE/stills/ChiChi-Just-As-Important-Look.png"  "$CDN/hf_20261004_235145_d45375e5-6fec-4a79-bc10-46cd569db075.png"
dl "$BASE/stills/DB-Just-As-Important-Look.png"      "$CDN/hf_20261004_235144_2ed6c35f-b392-434b-8e90-0e184906d858.png"

if command -v ffmpeg >/dev/null; then
  OUT="$BASE/EP11 just as important (full episode).mp4"
  echo "-> $OUT"
  inputs=(); filters=""; concat=""
  for i in "${!CLIPS[@]}"; do
    inputs+=(-i "$BASE/${CLIPS[$i]%%|*}")
    filters+="[$i:v]scale=720:1280:flags=lanczos,setsar=1,fps=24,format=yuv420p[v$i];"
    filters+="[$i:a]aformat=sample_rates=48000:channel_layouts=stereo[a$i];"
    concat+="[v$i][a$i]"
  done
  ffmpeg -y -loglevel error -stats "${inputs[@]}" \
    -filter_complex "${filters}${concat}concat=n=${#CLIPS[@]}:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k \
    -movflags +faststart "$OUT"
else
  echo; echo "ffmpeg not found: the six clips are downloaded; install ffmpeg (brew install ffmpeg) and re-run to build the full episode."
fi

echo; echo "Done:"; ls -la "$BASE" "$BASE/stills"
