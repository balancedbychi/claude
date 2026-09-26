"use client";

import Link from "next/link";
import { Library, Plus, Trash2 } from "lucide-react";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";

const STAGE = ["Idea", "Scripted", "Storyboarded", "Storyboarded", "Ready to post"];

export function EpisodeLibrary() {
  const { loaded, episodes, setEpisodes } = useStudio();
  if (!loaded) return <div className="page" />;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head-row">
          <div className="stack tight">
            <span className="eyebrow">Library</span>
            <h1 className="display">Your <em>episodes</em></h1>
          </div>
          <Link href="/builder?new=1" className="btn btn-primary"><Plus size={16} /> New episode</Link>
        </div>
      </header>

      {episodes.length === 0 ? (
        <div className="panel empty">
          <span className="icon-bubble"><Library size={24} strokeWidth={1.6} /></span>
          <h3>No episodes yet</h3>
          <p className="muted small">Everything you build is saved here automatically.</p>
          <Link href="/builder?new=1" className="btn btn-soft">Start your first episode</Link>
        </div>
      ) : (
        <div className="cards">
          {episodes.map((e) => {
            const p = episodeProgress(e);
            return (
              <article key={e.id} className="episode-card">
                <div className="row between">
                  <span className={`tag ${p === 4 ? "success" : ""}`}>{STAGE[p]}</span>
                  <button
                    className="btn btn-ghost btn-sm btn-danger"
                    title="Delete episode"
                    onClick={() => confirm("Delete this episode?") && setEpisodes((list) => list.filter((x) => x.id !== e.id))}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3>
                  <Link href={`/builder?id=${e.id}`} className="stretched">{episodeTitle(e)}</Link>
                </h3>
                <p className="faint small">
                  {e.script ? `${e.script.scenes.length} scenes` : e.concept?.logline.slice(0, 90) || e.topic}
                </p>
                <div className="progress"><i style={{ width: `${(p / 4) * 100}%` }} /></div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
