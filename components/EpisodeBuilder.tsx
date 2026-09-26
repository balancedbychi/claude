"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Package, Users } from "lucide-react";
import { TeamFeed, useTeam } from "./TeamProvider.tsx";
import { newId } from "@/lib/storage.ts";
import { TOOLS, type ToolConfig } from "@/lib/tools.ts";
import type { Character, Episode, Location, Product, SeriesBible, ToolKind } from "@/lib/types.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { BriefStep } from "./BriefStep.tsx";
import { StoryStep } from "./StoryStep.tsx";
import { ScriptStep } from "./ScriptStep.tsx";
import { ShotsStep } from "./ShotsStep.tsx";
import { PackageStep } from "./PackageStep.tsx";

function blankEpisode(kind: ToolKind): Episode {
  return { id: newId(kind === "episode" ? "ep" : kind), kind, createdAt: new Date().toISOString(), brief: null, topic: "", concept: null, script: null, shots: [], pkg: null };
}

/**
 * The storyboard builder behind every tool. The Episode Builder starts from a
 * story idea; the ad tools start from a brief. Everything after is shared.
 */
export function EpisodeBuilder({ tool: kind }: { tool: ToolKind }) {
  const router = useRouter();
  const params = useSearchParams();
  const { loaded, bible, characters, locations, products, episodes, setEpisodes } = useStudio();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [step, setStep] = useState(0);
  const tool = TOOLS[kind];
  const team = useTeam();
  const teamOnThis = Boolean(episode && team.run?.projectId === episode.id);
  const teamWorking = teamOnThis && team.busy;

  // Open the project named in the URL, or start a fresh one.
  const wantedId = params.get("id");
  const wantsNew = params.get("new");
  useEffect(() => {
    if (!loaded) return;
    const found = wantedId ? episodes.find((e) => e.id === wantedId) : undefined;
    if (found && found.kind !== kind) {
      router.replace(`${TOOLS[found.kind].href}?id=${found.id}`);
    } else if (found) {
      if (episode?.id !== found.id) {
        setEpisode(found);
        setStep(Math.min(episodeProgress(found), 3));
      }
    } else if (!episode || wantsNew) {
      setEpisode(blankEpisode(kind));
      setStep(0);
      if (wantsNew) router.replace(tool.href);
    }
    // Only react to navigation, not to our own saves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, wantedId, wantsNew]);

  // While the team works on this project, follow their updates from the library.
  const fromLibrary = episode ? episodes.find((e) => e.id === episode.id) : undefined;
  useEffect(() => {
    if (teamOnThis && fromLibrary && fromLibrary !== episode) setEpisode(fromLibrary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamOnThis, fromLibrary]);
  useEffect(() => {
    if (teamOnThis && team.run?.status === "done") setStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamOnThis, team.run?.status]);

  function updateEpisode(patch: EpisodePatch) {
    setEpisode((prev) => (prev ? { ...prev, ...(typeof patch === "function" ? patch(prev) : patch) } : prev));
  }

  // Autosave into the library once there's something worth keeping.
  useEffect(() => {
    if (!episode || (!episode.topic && !episode.concept && !episode.brief)) return;
    setEpisodes((list) =>
      list.some((e) => e.id === episode.id) ? list.map((e) => (e.id === episode.id ? episode : e)) : [episode, ...list],
    );
    if (wantedId !== episode.id) router.replace(`${tool.href}?id=${episode.id}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  if (!loaded || !episode || episode.kind !== kind) return <div className="page" />;

  const started = Boolean(episode.concept || episode.brief);
  const reachable = [true, started, Boolean(episode.script), Boolean(episode.script)];
  const done = episodeProgress(episode);
  const common: StepProps = { tool, bible, characters, locations, products, episode, updateEpisode, goTo: setStep, handOff: (p) => team.finish(p) };
  const [before, em, after] = tool.headline;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head-row">
          <div className="stack tight">
            <span className="eyebrow">{tool.eyebrow}</span>
            <h1 className="display">{started ? episodeTitle(episode) : <>{before}<em>{em}</em>{after}</>}</h1>
          </div>
          <div className="row">
            {started && done < 4 && !team.busy && (
              <button className="btn btn-primary btn-sm" onClick={() => team.finish(episode)}>let the team finish it ✨</button>
            )}
            <Link href={`${tool.href}?new=1`} className="btn btn-ghost btn-sm">+ New</Link>
          </div>
        </div>
      </header>

      <nav className="stepper">
        {tool.steps.map((label, i) => (
          <button key={label} className={`${i === step ? "current" : ""} ${i < done ? "done" : ""}`} disabled={!reachable[i]} onClick={() => setStep(i)}>
            <span className="n">{i + 1}</span>
            {label}
          </button>
        ))}
      </nav>

      {tool.needsProduct && products.length === 0 ? (
        <div className="banner">
          <Package size={18} />
          <span className="grow">Add the product you&apos;re advertising first, so its packaging stays identical in every shot.</span>
          <Link href="/products" className="btn btn-soft btn-sm">Products <ArrowRight size={14} /></Link>
        </div>
      ) : characters.length === 0 ? (
        <div className="banner">
          <Users size={18} />
          <span className="grow">Add your cast first so every shot uses the same faces.</span>
          <Link href="/cast" className="btn btn-soft btn-sm">Cast Studio <ArrowRight size={14} /></Link>
        </div>
      ) : null}

      {teamOnThis && team.run && (team.busy || team.run.status === "error") ? (
        <section className="panel dotted stack">
          <div className="row between">
            <span className="eyebrow">{teamWorking ? "the team is on it. browse around, just keep this tab open" : "the team hit a snag"}</span>
            {!teamWorking && <button className="btn btn-soft btn-sm" onClick={() => team.finish(episode)}>try again from here</button>}
          </div>
          <div className="progress"><i style={{ width: `${Math.round(team.run.progress * 100)}%` }} /></div>
          <TeamFeed feed={team.run.feed} />
        </section>
      ) : step === 0 ? (
        kind === "episode" ? <StoryStep {...common} /> : <BriefStep {...common} />
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
  tool: ToolConfig;
  bible: SeriesBible;
  characters: Character[];
  locations: Location[];
  products: Product[];
  episode: Episode;
  updateEpisode: (patch: EpisodePatch) => void;
  goTo: (step: number) => void;
  /** Hand the project to the team to finish end to end. */
  handOff: (project: Episode) => void;
}

/** A partial update, or a function of the latest episode (for concurrent updates). */
export type EpisodePatch = Partial<Episode> | ((prev: Episode) => Partial<Episode>);
