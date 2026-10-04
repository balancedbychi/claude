#!/usr/bin/env bash
# Appends the "Exclusive the Series" end card to one or more video files.
#
#   bash scripts/append-endcard.sh "path/to/EP10.1 money's worth.mp4" [more.mp4 ...]
#
# Each output is written next to the input as "<name> + endcard.mp4".
# The end card is picked by orientation (vertical -> 9x16, otherwise 16x9),
# scaled to the clip's exact resolution and frame rate, and fades in over 0.7 s.
# Requires ffmpeg and ffprobe (brew install ffmpeg).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CARDS="$HERE/../endcard/out"
DUR="${ENDCARD_SECONDS:-5}"   # override with ENDCARD_SECONDS=4 bash scripts/append-endcard.sh ...

[ $# -gt 0 ] || { echo "usage: $0 video.mp4 [video2.mp4 ...]" >&2; exit 1; }

for in in "$@"; do
  [ -f "$in" ] || { echo "skip (not found): $in" >&2; continue; }
  read -r w h fps < <(ffprobe -v error -select_streams v:0 \
      -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$in" | tr ',' ' ')
  has_audio=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_type -of csv=p=0 "$in" || true)
  clip_dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")

  if [ "$h" -gt "$w" ]; then card="$CARDS/endcard-9x16.png"; else card="$CARDS/endcard-16x9.png"; fi
  out="${in%.*} + endcard.mp4"

  if [ -n "$has_audio" ]; then
    a0="[0:a]aformat=sample_rates=48000:channel_layouts=stereo[a0]"
  else
    a0="[3:a]aformat=sample_rates=48000:channel_layouts=stereo[a0]"
  fi

  echo "-> $out  (${w}x${h} @ ${fps} fps, card: $(basename "$card"))"
  ffmpeg -y -loglevel error -stats \
    -i "$in" \
    -loop 1 -framerate "$fps" -t "$DUR" -i "$card" \
    -f lavfi -t "$DUR" -i "anullsrc=channel_layout=stereo:sample_rate=48000" \
    -f lavfi -t "$clip_dur" -i "anullsrc=channel_layout=stereo:sample_rate=48000" \
    -filter_complex "
      [0:v]format=yuv420p,setsar=1[v0];
      $a0;
      [1:v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},setsar=1,
           fade=t=in:st=0:d=0.7,format=yuv420p[v1];
      [v0][a0][v1][2:a]concat=n=2:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" -shortest \
    -c:v libx264 -preset medium -crf 18 -r "$fps" -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart \
    "$out"
done
echo "done."
