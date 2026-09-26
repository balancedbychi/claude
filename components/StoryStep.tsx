"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { post } from "@/lib/client-api.ts";
import type { Concept } from "@/lib/types.ts";
import type { StepProps } from "./EpisodeBuilder.tsx";

const SUGGESTIONS = [
  "She quits her corporate job to open a wellness studio, and her ex shows up as the first client",
  "A fake funeral: she watches her own memorial from across the street",
  "Best friends move into a luxury apartment that seems too good to be true",
  "A 30-day glow-up challenge that goes wrong on day 1",
];

export function StoryStep({ bible, characters, episode, updateEpisode, goTo }: StepProps) {
  const [topic, setTopic] = useState(episode.topic);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pitch() {
    setBusy(true);
    setError("");
    try {
      const res = await post<{ concepts: Concept[] }>("/api/concepts", { topic, bible, characters });
      setConcepts(res.concepts);
      updateEpisode({ topic });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function choose(c: Concept) {
    // A new concept invalidates everything generated after it.
    updateEpisode({ topic, concept: c, script: null, shots: [], pkg: null });
    goTo(1);
  }

  return (
    <section className="stack loose">
      <div className="panel glow stack">
        <label className="field">
          What&apos;s this episode about?
          <textarea rows={3} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="A topic, a rough idea, or a single dramatic moment…" />
        </label>
        <div className="chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chip" onClick={() => setTopic(s)}>{s}</button>
          ))}
        </div>
        <div className="row end">
          {error && <span className="error">{error}</span>}
          <button className="btn btn-primary" onClick={pitch} disabled={busy || topic.trim().length < 2}>
            {busy ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
            {busy ? "Writing ideas…" : concepts.length ? "Get new ideas" : "Get 4 episode ideas"}
          </button>
        </div>
      </div>

      {episode.concept && concepts.length === 0 && (
        <div className="panel stack">
          <span className="eyebrow">Current concept</span>
          <h2 className="display">{episode.concept.title}</h2>
          <p className="muted">{episode.concept.logline}</p>
          <div className="hook"><b>Hook ·</b> {episode.concept.hook}</div>
          <div className="row end">
            <button className="btn btn-soft" onClick={() => goTo(1)}>Continue to script <ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {concepts.length > 0 && (
        <div className="concept-grid">
          {concepts.map((c) => (
            <article key={c.title} className="panel concept">
              {c.hookStyle && <span className="tag outline-accent" style={{ alignSelf: "flex-start" }}>{c.hookStyle} hook</span>}
              <h3>{c.title}</h3>
              <p className="muted small">{c.logline}</p>
              <div className="hook"><b>Hook ·</b> {c.hook}</div>
              <p className="faint small">{c.whyItWorks}</p>
              <button className="btn btn-soft" onClick={() => choose(c)}>Use this idea <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
