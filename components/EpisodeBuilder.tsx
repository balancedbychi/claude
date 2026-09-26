"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Users } from "lucide-react";
import { newId } from "@/lib/storage.ts";
import type { Character, Episode, Location, SeriesBible } from "@/lib/types.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { StoryStep } from "./StoryStep.tsx";
import { ScriptStep } from "./ScriptStep.tsx";
import { ShotsStep } from "./ShotsStep.tsx";
import { PackageStep } from "./PackageStep.tsx";

const STEPS = ["Story", "Script", "Storyboard", "Edit & post"] as const;

function blankEpisode(): Episode {
  return { id: newId("ep"), createdAt: new Date().toISOString(), topic: "", concept: null, script: null, shots: [], pkg: null };
}

export function EpisodeBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const { loaded, bible, characters, locations, episodes, setEpisodes } = useStudio();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [step, setStep] = useState(0);

  // Open the episode named in the URL, or start a fresh one.
  const wantedId = params.get("id");
  const wantsNew = params.get("new");
  useEffect(() => {
    if (!loaded) return;
    const found = wantedId ? episodes.find((e) => e.id === wantedId) : undefined;
    if (found) {
      if (episode?.id !== found.id) {
        setEpisode(found);
        setStep(Math.min(episodeProgress(found), 3));
      }
    } else if (!episode || wantsNew) {
      setEpisode(blankEpisode());
      setStep(0);
      if (wantsNew) router.replace("/builder");
    }
    // Only react to navigation, not to our own saves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, wantedId, wantsNew]);

  function updateEpisode(patch: EpisodePatch) {
    setEpisode((prev) => (prev ? { ...prev, ...(typeof patch === "function" ? patch(prev) : patch) } : prev));
  }

  // Autosave into the library once there's something worth keeping.
  useEffect(() => {
    if (!episode || (!episode.topic && !episode.concept)) return;
    setEpisodes((list) =>
      list.some((e) => e.id === episode.id) ? list.map((e) => (e.id === episode.id ? episode : e)) : [episode, ...list],
    );
    if (wantedId !== episode.id) router.replace(`/builder?id=${episode.id}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  if (!loaded || !episode) return <div className="page" />;

  const reachable = [true, Boolean(episode.concept), Boolean(episode.script), Boolean(episode.script)];
  const done = episodeProgress(episode);
  const common = { bible, characters, locations, episode, updateEpisode, goTo: setStep };

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head-row">
          <div className="stack tight">
            <span className="eyebrow">Episode Builder</span>
            <h1 className="display">{episode.concept ? episodeTitle(episode) : <>A new <em>episode</em></>}</h1>
          </div>
          <Link href="/builder?new=1" className="btn btn-ghost btn-sm">+ New episode</Link>
        </div>
      </header>

      <nav className="stepper">
        {STEPS.map((label, i) => (
          <button key={label} className={`${i === step ? "current" : ""} ${i < done ? "done" : ""}`} disabled={!reachable[i]} onClick={() => setStep(i)}>
            <span className="n">{i + 1}</span>
            {label}
          </button>
        ))}
      </nav>

      {characters.length === 0 && (
        <div className="banner">
          <Users size={18} />
          <span className="grow">Add your cast first so every shot uses the same faces.</span>
          <Link href="/cast" className="btn btn-soft btn-sm">Cast Studio <ArrowRight size={14} /></Link>
        </div>
      )}

      {step === 0 ? (
        <StoryStep {...common} />
      ) : step === 1 ? (
        <ScriptStep {...common} />
      ) : step === 2 ? (
        <ShotsStep {...common} />
      ) : (
        <PackageStep {...common} />
      )}
    </div>
  );
}

export interface StepProps {
  bible: SeriesBible;
  characters: Character[];
  locations: Location[];
  episode: Episode;
  updateEpisode: (patch: EpisodePatch) => void;
  goTo: (step: number) => void;
}

/** A partial update, or a function of the latest episode (for concurrent updates). */
export type EpisodePatch = Partial<Episode> | ((prev: Episode) => Partial<Episode>);
