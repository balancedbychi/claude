"use client";

import { useState } from "react";
import { post } from "@/lib/client-api.ts";
import type { Scene, Script, ScriptLine } from "@/lib/types.ts";
import type { StepProps } from "./EpisodeBuilder.tsx";

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
}

function linesToText(lines: ScriptLine[]) {
  return lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}

function textToLines(text: string): ScriptLine[] {
  return text
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const i = row.indexOf(":");
      return i > 0 ? { speaker: row.slice(0, i).trim(), text: row.slice(i + 1).trim() } : { speaker: "Narrator", text: row };
    });
}

export function ScriptStep({ bible, characters, episode, updateEpisode, goTo }: StepProps) {
  const [minutes, setMinutes] = useState(4.5);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const script = episode.script;

  async function write() {
    if (!episode.concept) return;
    if (script && !confirm("Replace the current script? Scene prompts and packaging will be cleared.")) return;
    setBusy(true);
    setError("");
    try {
      const res = await post<Script>("/api/script", { concept: episode.concept, bible, characters, targetMinutes: minutes });
      updateEpisode({ script: res, shots: [], pkg: null });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function editScene(n: number, patch: Partial<Scene>) {
    if (!script) return;
    const scenes = script.scenes.map((s) => (s.number === n ? { ...s, ...patch } : s));
    updateEpisode({
      script: { ...script, scenes, totalSeconds: scenes.reduce((t, s) => t + s.durationSeconds, 0) },
      // Edited scene's shots are stale now.
      shots: episode.shots.filter((x) => x.sceneNumber !== n),
    });
  }

  const nameOf = (id: string) => characters.find((c) => c.id === id)?.name ?? id;
  let clock = 0;

  return (
    <section className="stack">
      <header>
        <h2>Write the script</h2>
        <p className="muted">
          {episode.concept?.title}: {episode.concept?.logline}
        </p>
      </header>

      <div className="card row">
        <label className="inline">
          Length
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            <option value={1}>1 min</option>
            <option value={3}>3 min</option>
            <option value={4}>4 min</option>
            <option value={4.5}>4–5 min</option>
            <option value={5}>5 min</option>
          </select>
        </label>
        <button className="primary" onClick={write} disabled={busy}>
          {busy ? "Writing script… (about 1 min)" : script ? "Rewrite script" : "Write script"}
        </button>
        {error && <span className="error">{error}</span>}
      </div>

      {script && (
        <>
          <div className="row between">
            <h3>
              {script.title} <span className="muted">· {script.scenes.length} scenes · {fmt(script.totalSeconds)}</span>
            </h3>
            <button className="primary" onClick={() => goTo(3)}>Next: scene prompts →</button>
          </div>
          {script.scenes.map((s) => {
            const start = clock;
            clock += s.durationSeconds;
            return (
              // Keyed on content so the uncontrolled editors reset when the script is rewritten.
              <div key={`${episode.id}:${s.number}:${s.action}:${linesToText(s.lines)}`} className="card scene">
                <div className="row between">
                  <strong>
                    Scene {s.number}: {s.title}
                  </strong>
                  <span className="muted small">
                    {fmt(start)}–{fmt(clock)} · {s.location}
                    {s.characterIds.length > 0 && ` · ${s.characterIds.map(nameOf).join(", ")}`}
                  </span>
                </div>
                <label>
                  What we see
                  <textarea rows={2} defaultValue={s.action} onBlur={(e) => e.target.value !== s.action && editScene(s.number, { action: e.target.value })} />
                </label>
                <label>
                  Voiceover / dialogue <span className="muted small">(one line each, &ldquo;Speaker: text&rdquo;)</span>
                  <textarea
                    rows={Math.max(2, s.lines.length)}
                    defaultValue={linesToText(s.lines)}
                    onBlur={(e) => e.target.value !== linesToText(s.lines) && editScene(s.number, { lines: textToLines(e.target.value) })}
                  />
                </label>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
}
