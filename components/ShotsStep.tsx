"use client";

import { useState } from "react";
import { pool, post } from "@/lib/client-api.ts";
import type { Scene, SceneShots } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";
import type { StepProps } from "./EpisodeBuilder.tsx";

export function ShotsStep({ bible, characters, episode, updateEpisode, goTo }: StepProps) {
  const [maxClip, setMaxClip] = useState(8);
  const [pending, setPending] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<number, string>>({});
  const scenes = episode.script?.scenes ?? [];
  const byScene = new Map(episode.shots.map((s) => [s.sceneNumber, s]));
  const done = scenes.filter((s) => byScene.has(s.number)).length;

  async function runScene(scene: Scene) {
    setPending((p) => new Set(p).add(scene.number));
    setErrors(({ [scene.number]: _, ...rest }) => rest);
    try {
      const res = await post<SceneShots>("/api/shots", { scene, bible, characters, maxClipSeconds: maxClip });
      updateEpisode((prev) => ({
        shots: [...prev.shots.filter((x) => x.sceneNumber !== scene.number), res].sort((a, b) => a.sceneNumber - b.sceneNumber),
      }));
    } catch (e) {
      setErrors((prev) => ({ ...prev, [scene.number]: (e as Error).message }));
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(scene.number);
        return next;
      });
    }
  }

  async function runAll() {
    await pool(scenes.filter((s) => !byScene.has(s.number)), 3, runScene);
  }

  const nameOf = (id: string) => characters.find((c) => c.id === id)?.name ?? id;

  return (
    <section className="stack">
      <header>
        <h2>Scene prompts</h2>
        <p className="muted">
          Each shot is one clip. Paste the prompt into Higgsfield (or Kling, Veo, Runway) with your character reference image.
          The character sheet is already included.
        </p>
      </header>

      <div className="card row">
        <label className="inline">
          Max clip length
          <select value={maxClip} onChange={(e) => setMaxClip(Number(e.target.value))}>
            <option value={5}>5s</option>
            <option value={8}>8s</option>
            <option value={10}>10s</option>
            <option value={15}>15s</option>
          </select>
        </label>
        <button className="primary" onClick={runAll} disabled={pending.size > 0 || done === scenes.length}>
          {pending.size > 0 ? `Generating… ${done}/${scenes.length} scenes` : done === 0 ? "Generate all scene prompts" : `Generate remaining (${scenes.length - done})`}
        </button>
        {done === scenes.length && scenes.length > 0 && (
          <button className="secondary" onClick={() => goTo(4)}>Next: package →</button>
        )}
      </div>

      {scenes.map((scene) => {
        const result = byScene.get(scene.number);
        return (
          <div key={scene.number} className="card scene">
            <div className="row between">
              <strong>
                Scene {scene.number}: {scene.title}
              </strong>
              <button className="ghost small" onClick={() => runScene(scene)} disabled={pending.has(scene.number)}>
                {pending.has(scene.number) ? "Working…" : result ? "Regenerate" : "Generate"}
              </button>
            </div>
            {scene.lines.length > 0 && (
              <details>
                <summary className="muted small">Voiceover / dialogue for this scene</summary>
                <pre className="lines">{scene.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n")}</pre>
                <CopyButton text={scene.lines.map((l) => l.text).join(" ")} label="Copy voiceover text" />
              </details>
            )}
            {errors[scene.number] && <p className="error">{errors[scene.number]}</p>}
            {result?.shots.map((shot) => (
              <div key={shot.number} className="shot">
                <div className="row between">
                  <span className="small">
                    <strong>
                      Shot {scene.number}.{shot.number}
                    </strong>{" "}
                    · {shot.durationSeconds}s · {shot.camera}
                    {shot.characterIds.length > 0 && ` · ${shot.characterIds.map(nameOf).join(", ")}`}
                  </span>
                  <CopyButton text={shot.prompt} />
                </div>
                <pre className="prompt">{shot.prompt}</pre>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
