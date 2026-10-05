#!/usr/bin/env bash
# Downloads Exclusive the Series, episode 10 ("rented") clips, stills and cover to the Desktop.
# Clips are the Topaz 1080p (1080x1920) upscales of the approved 720p takes.
set -e
BASE="$HOME/Desktop/Exclusive the Series/episode 10 rented"
CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3I1nwPWIW4SJzgP8MbxsbNW0or9"
mkdir -p "$BASE/stills" "$BASE/cover" "$BASE/720p originals"

dl() { echo "-> $1"; curl -fL --retry 3 --progress-bar -o "$1" "$2"; }

# 1080p clips
dl "$BASE/EP10.0 opening.mp4"              "$CDN/hf_20261005_223940_6070c1f7-1e61-4296-8bd4-cc9f07f83f75.mp4"
dl "$BASE/EP10.1 money's worth.mp4"        "$CDN/hf_20261005_224949_38c4e89b-2354-46f7-9402-0b64a0c9fd11.mp4"
dl "$BASE/EP10.2 we finally exclusive.mp4" "$CDN/hf_20261005_224951_30f0b364-8c67-4763-a8b7-17ddf3fb044e.mp4"
dl "$BASE/EP10.3 rented.mp4"               "$CDN/hf_20261005_224953_e0aca0ee-579e-45b1-a24a-c9598037aac9.mp4"
dl "$BASE/EP10.4 thought so.mp4"           "$CDN/hf_20261005_224955_3f672f3c-c7d9-40c7-9085-a5162374138a.mp4"
dl "$BASE/EP10.5 u up.mp4"                 "$CDN/hf_20261005_224957_4d656d7b-2f45-4314-996f-4e0b7a801ac6.mp4"

# 720p originals, kept for reference
dl "$BASE/720p originals/EP10.0 opening.mp4"              "$CDN/hf_20261004_225032_cade7ec3-b52f-4260-8bdb-83203d5c9a2c.mp4"
dl "$BASE/720p originals/EP10.1 money's worth.mp4"        "$CDN/hf_20261004_175237_6bd09466-573e-4c68-a696-9c2f10f8c514.mp4"
dl "$BASE/720p originals/EP10.2 we finally exclusive.mp4" "$CDN/hf_20261004_182622_237f27f4-f635-49d1-b878-268ce7568238.mp4"
dl "$BASE/720p originals/EP10.3 rented.mp4"               "$CDN/hf_20261004_184558_2b1095d7-a137-47a0-a9a6-0fc7c7e6a5dd.mp4"
dl "$BASE/720p originals/EP10.4 thought so.mp4"           "$CDN/hf_20261004_190326_0281bda0-927d-4a8c-93fc-4710c44a655d.mp4"
dl "$BASE/720p originals/EP10.5 u up.mp4"                 "$CDN/hf_20261004_191131_890e6004-02c2-4cff-96f7-32d59b03719d.mp4"

# Stills
dl "$BASE/stills/Nia-Rented-Look.png"       "$CDN/hf_20261004_170140_17652b18-1096-4d25-809f-34cf31ae1cb9.png"
dl "$BASE/stills/Tay-Rented-Look.png"       "$CDN/hf_20261004_170139_27b3fd85-d1d3-4798-9c13-afcd5da32e29.png"
dl "$BASE/stills/Park-Pond-Golden-Hour.png" "$CDN/hf_20261004_170138_78c608a4-9a55-40bf-83a9-22e0adb0b2d0.png"

# Cover
dl "$BASE/cover/EP10 Rented cover.png" "$CDN/hf_20261004_204346_049a799d-c9b8-47ea-bd10-7cb91a96dd61.png"

echo; echo "Done:"; ls -la "$BASE" "$BASE/720p originals" "$BASE/stills" "$BASE/cover"
