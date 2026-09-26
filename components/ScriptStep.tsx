"use client";

import { useState } from "react";
import { ArrowRight, Loader2, PenLine } from "lucide-react";
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

export function ScriptStep({ tool, bible, characters, locations, products, episode, updateEpisode, goTo }: StepProps) {
  const isEpisode = tool.kind === "episode";
  const [minutes, setMinutes] = useState(4.5);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const script = episode.script;

  async function write() {
    if (isEpisode ? !episode.concept : !episode.brief) return;
    if (script && !confirm("Replace the current script? The storyboard and posting package will be cleared.")) return;
    setBusy(true);
    setError("");
    try {
      const res = isEpisode
        ? await post<Script>("/api/script", { concept: episode.concept, bible, characters, locations, targetMinutes: minutes })
        : await post<Script>("/api/beats", { kind: tool.kind, brief: episode.brief, bible, characters, locations, products });
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
      // The edited scene's storyboard is stale now.
      shots: episode.shots.filter((x) => x.sceneNumber !== n),
    });
  }

  const nameOf = (id: string) => characters.find((c) => c.id === id)?.name ?? id;
  let clock = 0;

  return (
    <section className="stack loose">
      <div className="panel stack">
        <div className="stack tight">
          <span className="eyebrow">{isEpisode ? "The idea" : "The brief"}</span>
          <p className="muted">
            {isEpisode
              ? episode.concept?.logline
              : [
                  products.find((p) => p.id === episode.brief?.productId)?.name,
                  episode.brief?.angle,
                  `${episode.brief?.lengthSeconds}s`,
                  characters.find((c) => c.id === episode.brief?.characterId)?.name,
                ]
                  .filter(Boolean)
                  .join(" · ")}
          </p>
        </div>
        <div className="row between">
          {isEpisode ? (
          <label className="inline-field">
            Length
            <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
              <option value={1}>1 min</option>
              <option value={3}>3 min</option>
              <option value={4}>4 min</option>
              <option value={4.5}>4–5 min</option>
              <option value={5}>5 min</option>
            </select>
          </label>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => goTo(0)}>Edit brief</button>
          )}
          <div className="row">
            {error && <span className="error">{error}</span>}
            <button className={`btn ${script ? "btn-soft" : "btn-primary"}`} onClick={write} disabled={busy}>
              {busy ? <Loader2 size={16} className="spin" /> : <PenLine size={16} />}
              {busy ? (isEpisode ? "Writing… about a minute" : "Writing…") : script ? "Rewrite script" : "Write the script"}
            </button>
          </div>
        </div>
      </div>

      {script && (
        <>
          <div className="row between">
            <div className="stack tight">
              <h2 className="display">{script.title}</h2>
              <span className="faint small">{script.scenes.length} scenes · {fmt(script.totalSeconds)} · click any text to edit</span>
            </div>
            <button className="btn btn-primary" onClick={() => goTo(2)}>Build the storyboard <ArrowRight size={15} /></button>
          </div>
          <div className="stack">
            {script.scenes.map((s) => {
              const start = clock;
              clock += s.durationSeconds;
              return (
                // Keyed on content so the uncontrolled editors reset when the script is rewritten.
                <article key={`${episode.id}:${s.number}:${s.action}:${s.onScreenText}:${linesToText(s.lines)}`} className="panel scene">
                  <div className="scene-num">
                    <b className="grad">{String(s.number).padStart(2, "0")}</b>
                    <span className="faint tiny">{fmt(start)}–{fmt(clock)}</span>
                  </div>
                  <div className="scene-body">
                    <div className="row between">
                      <h3>{s.title}</h3>
                      <div className="row">
                        {s.characterIds.map((id) => <span key={id} className="tag">{nameOf(id)}</span>)}
                      </div>
                    </div>
                    {locations.length > 0 ? (
                      <label className="inline-field">
                        Set
                        <select value={s.locationId} onChange={(e) => editScene(s.number, { locationId: e.target.value })}>
                          <option value="">{s.location} (not a designed set)</option>
                          {locations.map((l) => (
                            <option key={l.id} value={l.id}>{l.setName ? `${l.setName} · ` : ""}{l.name}</option>
                          ))}
                        </select>
                      </label>
                    ) : (
                      <span className="faint small">{s.location}</span>
                    )}
                    <label className="field">
                      What we see
                      <textarea rows={2} defaultValue={s.action} onBlur={(e) => e.target.value !== s.action && editScene(s.number, { action: e.target.value })} />
                    </label>
                    {(!isEpisode || s.onScreenText) && (
                      <label className="field">
                        On-screen text
                        <input defaultValue={s.onScreenText} placeholder="None" onBlur={(e) => e.target.value !== s.onScreenText && editScene(s.number, { onScreenText: e.target.value })} />
                      </label>
                    )}
                    <label className="field">
                      Voiceover &amp; dialogue <span className="hint">one line each, &ldquo;Speaker: text&rdquo;</span>
                      <textarea
                        rows={Math.max(2, s.lines.length)}
                        defaultValue={linesToText(s.lines)}
                        onBlur={(e) => e.target.value !== linesToText(s.lines) && editScene(s.number, { lines: textToLines(e.target.value) })}
                      />
                    </label>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
