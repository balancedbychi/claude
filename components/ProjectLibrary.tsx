"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, Trash2 } from "lucide-react";
import { TOOLS } from "@/lib/tools.ts";
import type { ToolKind } from "@/lib/types.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";

const STAGE = ["Idea", "Scripted", "Storyboarded", "Storyboarded", "Ready to post"];

export function ProjectLibrary() {
  const { loaded, episodes, setEpisodes } = useStudio();
  const [filter, setFilter] = useState<ToolKind | "all">("all");
  if (!loaded) return <div className="page" />;
  const shown = episodes.filter((e) => filter === "all" || e.kind === filter);

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Library</span>
        <h1 className="display">Your <em>projects</em></h1>
        <p className="lede">Every episode, ad and transformation you build is saved here as you work.</p>
      </header>

      <div className="chips">
        <button className={`chip ${filter === "all" ? "selected" : ""}`} onClick={() => setFilter("all")}>All</button>
        {Object.values(TOOLS).map((t) => (
          <button key={t.kind} className={`chip ${filter === t.kind ? "selected" : ""}`} onClick={() => setFilter(t.kind)}>{t.label}</button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="panel empty">
          <span className="icon-bubble"><Library size={24} strokeWidth={1.6} /></span>
          <h3>Nothing here yet</h3>
          <p className="muted small">Start something from any tool and it&apos;s saved automatically.</p>
          <div className="row">
            <Link href="/builder?new=1" className="btn btn-soft">New episode</Link>
            <Link href="/ugc?new=1" className="btn btn-soft">New UGC ad</Link>
          </div>
        </div>
      ) : (
        <div className="cards">
          {shown.map((e) => {
            const p = episodeProgress(e);
            const tool = TOOLS[e.kind];
            return (
              <article key={e.id} className="episode-card">
                <div className="row between">
                  <div className="row">
                    <span className="tag">{tool.label}</span>
                    <span className={`tag ${p === 4 ? "success" : ""}`}>{STAGE[p]}</span>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm btn-danger"
                    title="Delete"
                    onClick={() => confirm("Delete this project?") && setEpisodes((list) => list.filter((x) => x.id !== e.id))}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3>
                  <Link href={`${tool.href}?id=${e.id}`} className="stretched">{episodeTitle(e)}</Link>
                </h3>
                <p className="faint small">
                  {e.script ? `${e.script.scenes.length} ${e.kind === "episode" ? "scenes" : "beats"}` : e.concept?.logline.slice(0, 90) || e.topic}
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
