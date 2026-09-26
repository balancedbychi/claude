"use client";

import Link from "next/link";
import { ArrowRight, Clapperboard, Sofa, Users } from "lucide-react";
import { artFor } from "@/lib/art.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { COMING_SOON } from "./AppShell.tsx";

const LIVE = [
  {
    href: "/builder",
    title: "Episode Builder",
    icon: Clapperboard,
    blurb: "Idea to storyboard: hooks, a timed script, keyframe and animation prompts, and an edit guide.",
    art: "radial-gradient(120% 120% at 0% 0%, #f4c3d4, transparent 55%), linear-gradient(120deg, #9b5b8a, #5b4a9b)",
  },
  {
    href: "/cast",
    title: "Cast Studio",
    icon: Users,
    blurb: "Design your AI influencer or recurring cast once and keep them identical in every shot.",
    art: "radial-gradient(120% 120% at 100% 0%, #cdb3ff, transparent 55%), linear-gradient(120deg, #5b4a9b, #2a1d3a)",
  },
  {
    href: "/sets",
    title: "Set Designer",
    icon: Sofa,
    blurb: "Build a luxury home, studio or apartment room by room with perfect architectural continuity.",
    art: "radial-gradient(120% 120% at 0% 100%, #f2d9b3, transparent 55%), linear-gradient(120deg, #9b6f4a, #3a2a1d)",
  },
];

const STEP_LABEL = ["Pick a story", "Write the script", "Storyboard", "Edit & post", "Ready to post"];

export function Home() {
  const { loaded, characters, locations, episodes } = useStudio();
  const latest = episodes[0];

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Your studio</span>
          <h1 className="display">
            What are we <em>creating</em> today?
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 520 }}>
            Build a consistent cast and world once, then turn any idea into a shot-by-shot storyboard ready for Higgsfield.
          </p>
          <div className="row">
            <Link href="/builder?new=1" className="btn btn-primary">
              New episode <ArrowRight size={16} />
            </Link>
            <Link href="/cast" className="btn btn-soft">
              {characters.length ? "Manage cast" : "Create your first character"}
            </Link>
          </div>
        </div>

        <div className="panel continue-card">
          {loaded && latest ? (
            <>
              <div className="stack tight">
                <span className="eyebrow">Continue where you left off</span>
                <h2 className="display">{episodeTitle(latest)}</h2>
                <span className="muted small">
                  {episodeProgress(latest) === 4 ? "Ready to post" : `Next: ${STEP_LABEL[episodeProgress(latest)]}`}
                </span>
              </div>
              <div className="progress">
                <i style={{ width: `${(episodeProgress(latest) / 4) * 100}%` }} />
              </div>
              <Link href={`/builder?id=${latest.id}`} className="btn btn-soft">
                Open episode <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <div className="stack">
              <span className="eyebrow">How it works</span>
              <ol className="stack tight small muted" style={{ margin: 0, paddingLeft: 18 }}>
                <li>Lock your characters in Cast Studio</li>
                <li>Design your recurring sets</li>
                <li>Turn an idea into a storyboard</li>
                <li>Generate, stitch and post</li>
              </ol>
            </div>
          )}
          <div className="stats">
            <div className="stat"><b>{characters.length}</b><span className="faint tiny">Characters</span></div>
            <div className="stat"><b>{locations.length}</b><span className="faint tiny">Set rooms</span></div>
            <div className="stat"><b>{episodes.length}</b><span className="faint tiny">Episodes</span></div>
          </div>
        </div>
      </section>

      <section className="stack">
        <div className="row between">
          <h2 className="display">Your tools</h2>
        </div>
        <div className="tool-grid">
          {LIVE.map(({ href, title, blurb, icon: Icon, art }) => (
            <Link key={href} href={href} className="tool-card">
              <div className="tool-art" style={{ ["--art" as string]: art }}>
                <span className="icon-bubble"><Icon size={20} strokeWidth={1.8} /></span>
              </div>
              <h3>{title}</h3>
              <p className="muted small">{blurb}</p>
              <span className="go">Open <ArrowRight size={14} /></span>
            </Link>
          ))}
          {COMING_SOON.map(({ label, icon: Icon, blurb }) => (
            <div key={label} className="tool-card soon">
              <span className="tag">Soon</span>
              <div className="tool-art" style={{ ["--art" as string]: artFor(label) }}>
                <span className="icon-bubble"><Icon size={20} strokeWidth={1.8} /></span>
              </div>
              <h3>{label}</h3>
              <p className="muted small">{blurb}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
