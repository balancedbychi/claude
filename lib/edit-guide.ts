import type { Episode, Scene } from "./types.ts";

// Everything a member needs to assemble their clips into one video in CapCut
// (or any editor): a clip-by-clip timeline, a captions file and a voiceover script.

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

export function clipName(sceneNumber: number, shotNumber?: number): string {
  return shotNumber === undefined ? `S${pad(sceneNumber)}` : `S${pad(sceneNumber)}-SH${pad(shotNumber)}`;
}

export function fmtClock(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${pad(Math.round(seconds % 60))}`;
}

/** Real scene length: the shots' total once they exist, otherwise the script's estimate. */
export function sceneLength(ep: Episode, scene: Scene): number {
  const shots = ep.shots.find((s) => s.sceneNumber === scene.number)?.shots;
  return shots && shots.length > 0 ? shots.reduce((t, s) => t + s.durationSeconds, 0) : scene.durationSeconds;
}

export interface TimelineRow {
  clip: string;
  sceneNumber: number;
  start: number;
  duration: number;
  transition: string;
  continueFromPrevious: boolean;
  voiceover: string; // the scene's lines, shown on its first clip
}

export function timeline(ep: Episode): TimelineRow[] {
  const rows: TimelineRow[] = [];
  let t = 0;
  for (const scene of ep.script?.scenes ?? []) {
    const voiceover = scene.lines.map((l) => `${l.speaker}: ${l.text}`).join(" / ");
    const shots = ep.shots.find((s) => s.sceneNumber === scene.number)?.shots ?? [];
    if (shots.length === 0) {
      rows.push({ clip: clipName(scene.number), sceneNumber: scene.number, start: t, duration: scene.durationSeconds, transition: "cut", continueFromPrevious: false, voiceover });
      t += scene.durationSeconds;
      continue;
    }
    shots.forEach((shot, i) => {
      rows.push({
        clip: clipName(scene.number, shot.number),
        sceneNumber: scene.number,
        start: t,
        duration: shot.durationSeconds,
        transition: shot.transition || "cut",
        continueFromPrevious: shot.continueFromPrevious,
        voiceover: i === 0 ? voiceover : "",
      });
      t += shot.durationSeconds;
    });
  }
  return rows;
}

function srtTime(seconds: number): string {
  const ms = Math.round(seconds * 1000);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
}

/**
 * Captions as .srt. Each scene's lines are spread across that scene's time in
 * proportion to their word count, in short chunks that suit vertical video.
 * Timings are a starting point; members nudge them to the final voiceover.
 */
export function captionsSrt(ep: Episode, maxWords = 7): string {
  const cues: string[] = [];
  let sceneStart = 0;
  for (const scene of ep.script?.scenes ?? []) {
    const length = sceneLength(ep, scene);
    const chunks = scene.lines.flatMap((l) => {
      const words = l.text.split(/\s+/).filter(Boolean);
      const out: string[][] = [];
      for (let i = 0; i < words.length; i += maxWords) out.push(words.slice(i, i + maxWords));
      return out;
    });
    const total = chunks.reduce((n, c) => n + c.length, 0);
    let t = sceneStart;
    for (const chunk of chunks) {
      const d = (chunk.length / total) * length;
      cues.push(`${cues.length + 1}\n${srtTime(t)} --> ${srtTime(t + d)}\n${chunk.join(" ")}\n`);
      t += d;
    }
    sceneStart += length;
  }
  return cues.join("\n");
}

/** Plain voiceover script, for a text-to-speech tool or recording yourself. */
export function voiceoverScript(ep: Episode): string {
  const out: string[] = [];
  let t = 0;
  for (const scene of ep.script?.scenes ?? []) {
    const length = sceneLength(ep, scene);
    out.push(`[Scene ${scene.number} · ${fmtClock(t)}–${fmtClock(t + length)}]`);
    for (const l of scene.lines) out.push(`${l.speaker}: ${l.text}`);
    out.push("");
    t += length;
  }
  return out.join("\n");
}
