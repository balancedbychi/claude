# claude
## Exclusive the Series

- `scripts/download-ep11.sh` — downloads the episode 11 ("Just As Important") clips and stills to `~/Desktop/Exclusive the Series/episode 11 just as important/`, then joins the opening card and the six clips into one 720p full-episode file if ffmpeg is installed (`brew install ffmpeg`). Keep `EP11.0 opening.mp4` next to the script.
- `opening/index.html` — the episode opening card, in the same style as the end card. Edit the episode number and title, then re-render:

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=old --hide-scrollbars --window-size=720,1280 --screenshot=opening/out/opening.png "file://$PWD/opening/index.html"
ffmpeg -y -loop 1 -framerate 24 -i opening/out/opening.png -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -t 4 -vf "fade=t=in:st=0:d=0.7,fade=t=out:st=3.4:d=0.6,format=yuv420p" -c:v libx264 -crf 18 -r 24 -c:a aac -shortest -movflags +faststart "opening/out/EP11.0 opening.mp4"
```
- `episodes/just-as-important/` — script, beat-by-beat, prompts and render log for episode 11.
