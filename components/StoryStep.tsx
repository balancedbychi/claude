"use client";

import { useState } from "react";
import { post } from "@/lib/client-api.ts";
import type { Concept } from "@/lib/types.ts";
import type { StepProps } from "./EpisodeBuilder.tsx";

const SUGGESTIONS = [
  "She quits her corporate job to open a wellness studio, and her ex shows up as the first client",
  "A 30-day glow-up challenge that goes wrong on day 1",
  "Best friends move into a luxury apartment that seems too good to be true",
  "A nanny discovers the family's secret",
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
    goTo(3);
  }

  return (
    <section className="stack">
      <header>
        <h2>Pick the story</h2>
        <p className="muted">Give a topic or rough idea. You&apos;ll get four episode ideas, each with a hook for the first 3 seconds.</p>
      </header>

      <div className="card stack">
        <textarea rows={3} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What's this episode about?" />
        <div className="chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chip" onClick={() => setTopic(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="row">
          <button className="primary" onClick={pitch} disabled={busy || topic.trim().length < 2}>
            {busy ? "Writing ideas…" : concepts.length ? "Get new ideas" : "Get episode ideas"}
          </button>
          {error && <span className="error">{error}</span>}
        </div>
      </div>

      {episode.concept && concepts.length === 0 && (
        <div className="card selected">
          <span className="muted small">Current concept</span>
          <h3>{episode.concept.title}</h3>
          <p>{episode.concept.logline}</p>
          <p><strong>Hook:</strong> {episode.concept.hook}</p>
          <button className="primary" onClick={() => goTo(3)}>Continue to script →</button>
        </div>
      )}

      <div className="concept-grid">
        {concepts.map((c) => (
          <div key={c.title} className="card concept">
            <h3>{c.title}</h3>
            <p>{c.logline}</p>
            <p className="hook"><strong>Hook:</strong> {c.hook}</p>
            <p className="muted small">{c.whyItWorks}</p>
            <button className="secondary" onClick={() => choose(c)}>Use this one →</button>
          </div>
        ))}
      </div>
    </section>
  );
}
