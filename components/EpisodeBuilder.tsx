"use client";

import { useEffect, useState } from "react";
import { newId, store, DEFAULT_BIBLE } from "@/lib/storage.ts";
import type { Character, Episode, SeriesBible } from "@/lib/types.ts";
import { CastStep } from "./CastStep.tsx";
import { StoryStep } from "./StoryStep.tsx";
import { ScriptStep } from "./ScriptStep.tsx";
import { ShotsStep } from "./ShotsStep.tsx";
import { PackageStep } from "./PackageStep.tsx";

const STEPS = ["Characters", "Story", "Script", "Scene prompts", "Package"] as const;

function blankEpisode(): Episode {
  return { id: newId("ep"), createdAt: new Date().toISOString(), topic: "", concept: null, script: null, shots: [], pkg: null };
}

export function EpisodeBuilder() {
  const [loaded, setLoaded] = useState(false);
  const [bible, setBible] = useState<SeriesBible>(DEFAULT_BIBLE);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episode, setEpisode] = useState<Episode>(blankEpisode);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setBible(store.loadBible());
    const chars = store.loadCharacters();
    setCharacters(chars);
    setEpisodes(store.loadEpisodes());
    if (chars.length > 0) setStep(1);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) store.saveBible(bible);
  }, [bible, loaded]);
  useEffect(() => {
    if (loaded) store.saveCharacters(characters);
  }, [characters, loaded]);

  function updateEpisode(patch: EpisodePatch) {
    setEpisode((prev) => ({ ...prev, ...(typeof patch === "function" ? patch(prev) : patch) }));
  }

  // Every change to the working episode is saved to the library, in place.
  useEffect(() => {
    if (!loaded || (!episode.topic && !episode.concept)) return;
    setEpisodes((list) =>
      list.some((e) => e.id === episode.id)
        ? list.map((e) => (e.id === episode.id ? episode : e))
        : [episode, ...list],
    );
  }, [episode, loaded]);
  useEffect(() => {
    if (loaded) store.saveEpisodes(episodes);
  }, [episodes, loaded]);

  function deleteEpisode(id: string) {
    setEpisodes((list) => list.filter((e) => e.id !== id));
    if (episode.id === id) setEpisode(blankEpisode());
  }

  const reachable = [
    true,
    true,
    Boolean(episode.concept),
    Boolean(episode.script),
    Boolean(episode.script),
  ];

  const common = { bible, characters, episode, updateEpisode, goTo: setStep };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">Episode Builder</div>
        <button
          className="primary full"
          onClick={() => {
            setEpisode(blankEpisode());
            setStep(characters.length > 0 ? 1 : 0);
          }}
        >
          + New episode
        </button>
        <h4>Your episodes</h4>
        {episodes.length === 0 && <p className="muted small">Episodes you build are saved here.</p>}
        <ul className="episode-list">
          {episodes.map((e) => (
            <li key={e.id} className={e.id === episode.id ? "active" : ""}>
              <button
                className="link"
                onClick={() => {
                  setEpisode(e);
                  setStep(e.pkg ? 4 : e.script ? 3 : e.concept ? 2 : 1);
                }}
              >
                {e.script?.title || e.concept?.title || e.topic || "Untitled"}
              </button>
              <button className="icon" title="Delete" onClick={() => confirm("Delete this episode?") && deleteEpisode(e.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        <nav className="steps">
          {STEPS.map((label, i) => (
            <button
              key={label}
              className={`step ${i === step ? "current" : ""}`}
              disabled={!reachable[i]}
              onClick={() => setStep(i)}
            >
              <span className="num">{i + 1}</span> {label}
            </button>
          ))}
        </nav>

        {!loaded ? null : step === 0 ? (
          <CastStep bible={bible} setBible={setBible} characters={characters} setCharacters={setCharacters} onDone={() => setStep(1)} />
        ) : step === 1 ? (
          <StoryStep {...common} />
        ) : step === 2 ? (
          <ScriptStep {...common} />
        ) : step === 3 ? (
          <ShotsStep {...common} />
        ) : (
          <PackageStep {...common} />
        )}
      </main>
    </div>
  );
}

export interface StepProps {
  bible: SeriesBible;
  characters: Character[];
  episode: Episode;
  updateEpisode: (patch: EpisodePatch) => void;
  goTo: (step: number) => void;
}

/** A partial update, or a function of the latest episode (for concurrent updates). */
export type EpisodePatch = Partial<Episode> | ((prev: Episode) => Partial<Episode>);
