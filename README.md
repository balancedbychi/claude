# claude
## Exclusive the Series

- `endcard/index.html` — the closing screen (edit text, colours or the @handle here).
- `endcard/out/` — rendered end card: `endcard-9x16.png` / `.mp4` (1080x1920, vertical) and `endcard-16x9.png` / `.mp4` (1920x1080). MP4s are 5 s with a 0.7 s fade-in and a silent audio track.
- `scripts/append-endcard.sh video.mp4 ...` — appends the end card to each clip (needs ffmpeg).
- `scripts/download-ep10.sh` — downloads the episode 10 clips and stills to the Desktop.

Re-render after editing the HTML (needs Chrome/Chromium and ffmpeg):

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --hide-scrollbars --window-size=1080,1920 --screenshot=endcard/out/endcard-9x16.png "file://$PWD/endcard/index.html"
"$CH" --headless=new --hide-scrollbars --window-size=1920,1080 --screenshot=endcard/out/endcard-16x9.png "file://$PWD/endcard/index.html"
for v in 9x16 16x9; do ffmpeg -y -loop 1 -framerate 30 -i endcard/out/endcard-$v.png -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -t 5 -vf "fade=t=in:st=0:d=0.7,format=yuv420p" -c:v libx264 -crf 18 -r 30 -c:a aac -shortest -movflags +faststart endcard/out/endcard-$v.mp4; done
```
