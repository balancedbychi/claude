"use client";

import { useState } from "react";
import { ArrowRight, Check, Clapperboard, FlaskConical, Loader2, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { tintFor } from "@/lib/art.ts";
import { pool, post } from "@/lib/client-api.ts";
import { clipName, fmtClock, sceneLength } from "@/lib/edit-guide.ts";
import { outputTip, renderSettings } from "@/lib/model-guide.ts";
import { estimateProject, estimateShot, fmtCredits, fmtEstimate, fmtWait, hardestShot, modelsFor, priceLabel, testClip, times } from "@/lib/pricing.ts";
import { FIXES, videoRefs, withPrompts } from "@/lib/prompt-builder.ts";
import type { Episode, FixId, Scene, SceneShots, SeriesBible, Shot } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { CopyButton } from "./CopyButton.tsx";
import { CostTag, GenerateNote, ModelPicker } from "./Cost.tsx";
import type { StepProps } from "./EpisodeBuilder.tsx";

export function ShotsStep({ tool, bible, characters, locations, products, episode, updateEpisode, goTo }: StepProps) {
  const [maxClip, setMaxClip] = useState(tool.kind === "episode" ? 8 : 5);
  const [pending, setPending] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<number, string>>({});
  const scenes = episode.script?.scenes ?? [];
  const byScene = new Map(episode.shots.map((s) => [s.sceneNumber, s]));
  const done = scenes.filter((s) => byScene.has(s.number)).length;
  const { pricing } = useStudio();
  const models = modelsFor(pricing, bible);
  const total = estimateProject(episode, models);
  const budget = times(total, pricing.attempts);
  const [fixing, setFixing] = useState<string | null>(null); // "scene:shot" with the regenerate panel open
  const [redoing, setRedoing] = useState<string | null>(null);
  const episodeProducts = products.filter((p) => p.id === episode.brief?.productId);

  function replaceShot(sceneNumber: number, shot: Shot) {
    updateEpisode((prev) => ({
      shots: prev.shots.map((s) => (s.sceneNumber === sceneNumber ? { ...s, shots: s.shots.map((x) => (x.number === shot.number ? shot : x)) } : s)),
    }));
  }

  /** Rebuild a shot's prompts with the corrections ticked (no AI call). */
  function applyFixes(scene: Scene, shot: Shot, fixes: FixId[], fixNote: string) {
    const { imagePrompt: _i, animationPrompt: _a, ...plan } = shot;
    replaceShot(scene.number, withPrompts({ ...plan, fixes, fixNote }, { characters, products: episodeProducts, bible, location: locations.find((l) => l.id === scene.locationId), kind: tool.kind }));
    setFixing(null);
  }

  /** Ask the director for a fresh take on one shot. */
  async function newTake(scene: Scene, shot: Shot, note: string) {
    const key = `${scene.number}:${shot.number}`;
    setRedoing(key);
    setErrors(({ [scene.number]: _, ...rest }) => rest);
    try {
      const i = scenes.findIndex((s) => s.number === scene.number);
      const res = await post<SceneShots>("/api/shots", {
        scene,
        prevScene: scenes[i - 1] ?? null,
        nextScene: scenes[i + 1] ?? null,
        bible,
        characters,
        locations,
        products: episodeProducts,
        kind: tool.kind,
        maxClipSeconds: maxClip,
        redo: { shotNumber: shot.number, note, shots: byScene.get(scene.number)?.shots ?? [] },
      });
      const fresh = res.shots[0];
      if (fresh) {
        const { imagePrompt: _i, animationPrompt: _a, ...plan } = fresh;
        // Keep the ticked corrections on the new take too.
        replaceShot(scene.number, shot.fixes?.length || shot.fixNote ? withPrompts({ ...plan, fixes: shot.fixes, fixNote: shot.fixNote }, { characters, products: episodeProducts, bible, location: locations.find((l) => l.id === scene.locationId), kind: tool.kind }) : fresh);
      }
      setFixing(null);
    } catch (e) {
      setErrors((prev) => ({ ...prev, [scene.number]: (e as Error).message }));
    } finally {
      setRedoing(null);
    }
  }

  async function runScene(scene: Scene) {
    setPending((p) => new Set(p).add(scene.number));
    setErrors(({ [scene.number]: _, ...rest }) => rest);
    try {
      const i = scenes.findIndex((s) => s.number === scene.number);
      const res = await post<SceneShots>("/api/shots", {
        scene,
        prevScene: scenes[i - 1] ?? null,
        nextScene: scenes[i + 1] ?? null,
        bible,
        characters,
        locations,
        products: products.filter((p) => p.id === episode.brief?.productId),
        kind: tool.kind,
        maxClipSeconds: maxClip,
      });
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
  const setOf = (id: string) => locations.find((l) => l.id === id);
  let clock = 0;

  return (
    <section className="stack loose">
      <div className="panel stack">
        <p className="muted">
          Every shot is one clip. Make the <b>keyframe</b> from the image prompt with your character and set references, then
          bring it to life with the <b>animation prompt</b>. Shots marked &ldquo;from last frame&rdquo; skip the keyframe and
          animate from the end of the previous clip, so the cut is seamless.
        </p>
        <div className="row between">
          <label className="inline-field">
            Max clip length
            <select value={maxClip} onChange={(e) => setMaxClip(Number(e.target.value))}>
              {[5, 8, 10, 15].map((n) => <option key={n} value={n}>{n}s</option>)}
            </select>
          </label>
          <div className="row">
            {done === scenes.length && scenes.length > 0 ? (
              <button className="btn btn-primary" onClick={() => goTo(3)}>Edit &amp; post <ArrowRight size={15} /></button>
            ) : (
              <button className="btn btn-primary" onClick={runAll} disabled={pending.size > 0}>
                {pending.size > 0 ? <Loader2 size={16} className="spin" /> : <Clapperboard size={16} />}
                {pending.size > 0 ? `Directing… ${done}/${scenes.length} scenes` : done === 0 ? "Build the storyboard" : `Build remaining ${scenes.length - done} scenes`}
              </button>
            )}
          </div>
        </div>
        <div className="cost-summary">
          <div className="stack tight">
            <span className="eyebrow">what it&apos;ll cost on Higgsfield</span>
            {total.clips > 0 ? (
              <p className="small">
                <b>{total.images} image{total.images === 1 ? "" : "s"} + {total.clips} clip{total.clips === 1 ? "" : "s"} ≈ {fmtCredits(total.credits)}</b>, about {fmtWait(total.seconds).replace("~", "")} of generating
                if you run them one after another. Budget <b>≈ {fmtCredits(budget.credits)}</b> to allow {pricing.attempts} tries per shot.
              </p>
            ) : (
              <p className="small muted">Build the storyboard and every shot gets a credit and time estimate.</p>
            )}
            <span className="tiny faint">Estimates from the studio&apos;s price list (updated {pricing.updatedAt}). Higgsfield shows the exact credits on its Generate button.</span>
            <span className="tiny"><b>Best output:</b> {outputTip(bible.aspectRatio)} <a href="/models">Model guide →</a></span>
          </div>
          <ModelPicker />
        </div>
        <GenerateNote />
      </div>

      {total.clips > 0 && <TestFirst episode={episode} bible={bible} updateEpisode={updateEpisode} />}

      {scenes.map((scene) => {
        const result = byScene.get(scene.number);
        const start = clock;
        const len = sceneLength(episode, scene);
        clock += len;
        const set = setOf(scene.locationId);
        return (
          <section key={scene.number} className="storyboard-scene">
            <div className="storyboard-head">
              <div className="stack tight">
                <span className="eyebrow">{tool.kind === "episode" ? "Scene" : "Beat"} {String(scene.number).padStart(2, "0")} · {fmtClock(start)}–{fmtClock(start + len)}</span>
                <h3>{scene.title}</h3>
                {scene.onScreenText && <span className="small grad" style={{ fontStyle: "normal", fontWeight: 700 }}>&ldquo;{scene.onScreenText}&rdquo;</span>}
              </div>
              <div className="row">
                <span className="tag">{set ? `${set.setName ? `${set.setName} · ` : ""}${set.name}` : scene.location}</span>
                {scene.lines.length > 0 && <CopyButton text={scene.lines.map((l) => l.text).join(" ")} label="Voiceover" variant="ghost" />}
                <button className="btn btn-ghost btn-sm" onClick={() => runScene(scene)} disabled={pending.has(scene.number)}>
                  {pending.has(scene.number) ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />}
                  {result ? "Redo" : "Build"}
                </button>
              </div>
            </div>
            {errors[scene.number] && <p className="error">{errors[scene.number]}</p>}
            {!result && !pending.has(scene.number) && <p className="faint small">{scene.action}</p>}
            {result && (
              <div className="storyboard">
                {result.shots.map((shot) => {
                  const code = clipName(scene.number, shot.number);
                  const key = `${scene.number}:${shot.number}`;
                  return (
                    <article key={shot.number} className="shot-card">
                      <div className="frame" style={{ ["--art-strip" as string]: tintFor(scene.locationId || scene.location) }}>
                        <div className="top">
                          <span className="code">{code}</span>
                          <span className="dur">{shot.durationSeconds}s</span>
                        </div>
                        <p className="sketch">{shot.startFrame || shot.action}</p>
                      </div>
                      <div className="shot-meta">
                        <div className="row">
                          <span className="tag">{shot.transition || "cut"}</span>
                          {shot.continueFromPrevious && <span className="tag outline-accent">from last frame</span>}
                        </div>
                        <p className="small muted">{shot.camera}{shot.cameraMove ? ` · ${shot.cameraMove}` : ""}</p>
                        <CostTag e={estimateShot(shot, models)} />
                        {(shot.characterIds.length > 0 || shot.productIds.length > 0) && (
                          <p className="tiny faint">
                            {[...shot.characterIds.map(nameOf), ...shot.productIds.map((id) => products.find((p) => p.id === id)?.name ?? "")].filter(Boolean).join(", ")}
                          </p>
                        )}
                        <details className="prompts">
                          <summary>View prompts &amp; settings</summary>
                          <div className="prompt-label">Upload for the video, in this order</div>
                          <ol className="ref-list">
                            {videoRefs(shot, { characters, products: episodeProducts, bible, location: set, kind: tool.kind }).map((r) => (
                              <li key={r.tag}><b>{r.tag}</b> {r.what}</li>
                            ))}
                          </ol>
                          {models.video && (
                            <>
                              <div className="prompt-label">Render settings</div>
                              <p className="tiny">{renderSettings({ model: models.video.label, resolution: models.video.resolution, aspectRatio: bible.aspectRatio, seconds: shot.durationSeconds })}</p>
                            </>
                          )}
                          {!shot.continueFromPrevious && (
                            <>
                              <div className="prompt-label">Image</div>
                              <pre className="prompt">{shot.imagePrompt}</pre>
                            </>
                          )}
                          <div className="prompt-label">Animation</div>
                          <pre className="prompt">{shot.animationPrompt}</pre>
                        </details>
                        <div className="copy-row">
                          {!shot.continueFromPrevious && <CopyButton text={shot.imagePrompt} label="Image" />}
                          <CopyButton text={shot.animationPrompt} label="Animation" />
                          <button className="btn btn-ghost btn-sm" onClick={() => setFixing(fixing === key ? null : key)} aria-expanded={fixing === key}>
                            <RefreshCw size={13} /> Regenerate
                          </button>
                        </div>
                        {(shot.fixes?.length || shot.fixNote) && fixing !== key ? (
                          <p className="tiny faint">prompts include fixes for: {[...FIXES.filter((f) => shot.fixes?.includes(f.id)).map((f) => f.label), shot.fixNote].filter(Boolean).join(", ")}</p>
                        ) : null}
                        {fixing === key && (
                          <FixPanel
                            shot={shot}
                            busy={redoing === key}
                            onApply={(fixes, note) => applyFixes(scene, shot, fixes, note)}
                            onNewTake={(note) => newTake(scene, shot, note)}
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}

/** What went wrong with a generation: ticks become targeted fixes in the prompt. */
function FixPanel({ shot, busy, onApply, onNewTake }: { shot: Shot; busy: boolean; onApply: (fixes: FixId[], note: string) => void; onNewTake: (note: string) => void }) {
  const [fixes, setFixes] = useState<FixId[]>(shot.fixes ?? []);
  const [note, setNote] = useState(shot.fixNote ?? "");
  const { pricing, bible } = useStudio();
  const again = estimateShot(shot, modelsFor(pricing, bible));
  const toggle = (id: FixId) => setFixes((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const reason = [...FIXES.filter((f) => fixes.includes(f.id)).map((f) => f.label), note.trim()].filter(Boolean).join("; ");
  return (
    <div className="fix-panel stack tight">
      <span className="small"><b>what was off?</b> tick everything that went wrong.</span>
      <div className="chips">
        {FIXES.filter((f) => (shot.continueFromPrevious ? f.animation : true)).map((f) => (
          <button key={f.id} type="button" className={`chip ${fixes.includes(f.id) ? "selected" : ""}`} aria-pressed={fixes.includes(f.id)} onClick={() => toggle(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="anything else? e.g. her ring disappeared" aria-label="What else was wrong" maxLength={300} />
      <div className="row">
        <button className="btn btn-soft btn-sm" onClick={() => onApply(fixes, note.trim())} disabled={busy}>
          <Wand2 size={13} /> Add fixes to the prompt
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => onNewTake(reason)} disabled={busy}>
          {busy ? <Loader2 size={13} className="spin" /> : <Sparkles size={13} />} New take from the director
        </button>
      </div>
      <CostTag e={again} prefix="each retry" />
      <span className="tiny faint">Or just press Generate again on Higgsfield: the same prompt often comes out fine on a second try.</span>
    </div>
  );
}

/** "Run a test clip first?" — asked as soon as there's a storyboard, before any credits go on full renders. */
function TestFirst({ episode, bible, updateEpisode }: { episode: Episode; bible: SeriesBible; updateEpisode: StepProps["updateEpisode"] }) {
  const { pricing } = useStudio();
  const all = episode.shots.flatMap((s) => s.shots.map((shot) => ({ ...shot, scene: s.sceneNumber })));
  const pick = hardestShot(all);
  const test = pick && testClip(pick, pricing);
  if (!pick || !test) return null;
  const full = estimateProject(episode, modelsFor(pricing, bible));
  const code = clipName(pick.scene, pick.number);
  const choice = episode.testChoice;
  if (choice === "full" || choice === "passed") {
    return (
      <p className="small faint">
        <Check size={13} /> {choice === "passed" ? `Test passed on ${code}. Render everything at full quality.` : "Going straight to full quality."}{" "}
        <button className="btn btn-ghost btn-sm" onClick={() => updateEpisode({ testChoice: undefined })}>change</button>
      </p>
    );
  }
  return (
    <section className={`panel stack tight test-first ${choice === "test" ? "on" : ""}`} aria-live="polite">
      <div className="row between">
        <span className="eyebrow"><FlaskConical size={13} /> {choice === "test" ? "your test clip" : "save credits: test first?"}</span>
        <span className="tag">{code}</span>
      </div>
      {choice !== "test" ? (
        <>
          <p className="small">
            Run the trickiest shot, <b>{code}</b>, as a quick test on <b>{priceLabel(test.model)}</b> for <b>{fmtCredits(test.estimate.credits)}</b> ({fmtWait(test.estimate.seconds)})
            before spending {fmtEstimate(full)} on the full render. If the face, hands, product and motion look right, render the rest.
          </p>
          <div className="row">
            <button className="btn btn-primary btn-sm" onClick={() => updateEpisode({ testChoice: "test" })}>Yes, test first</button>
            <button className="btn btn-soft btn-sm" onClick={() => updateEpisode({ testChoice: "full" })}>Skip, go full quality</button>
          </div>
        </>
      ) : (
        <>
          <p className="small">
            <b>Settings:</b> {renderSettings({ model: test.model.label, resolution: test.model.resolution, aspectRatio: bible.aspectRatio, seconds: test.seconds, test: true })}. Use {code}&apos;s keyframe and animation prompt (below).
          </p>
          <p className="small"><b>Check:</b> same face as the character sheet · five fingers on each hand · product label spelled right · the motion and any transition happen in the right order.</p>
          <div className="row">
            <button className="btn btn-primary btn-sm" onClick={() => updateEpisode({ testChoice: "passed" })}><Check size={14} /> Test looks good</button>
            <span className="tiny faint">Something off? Tap Regenerate on {code} and tick what went wrong, then test again.</span>
          </div>
        </>
      )}
    </section>
  );
}
