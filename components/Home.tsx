"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/tools.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { CREATE, LIBRARY } from "./AppShell.tsx";

const ART: Record<string, string> = {
  "/builder": "radial-gradient(120% 120% at 0% 0%, #f4c3d4, transparent 55%), linear-gradient(120deg, #9b5b8a, #5b4a9b)",
  "/ugc": "radial-gradient(120% 120% at 100% 0%, #ffc9b3, transparent 55%), linear-gradient(120deg, #9b4a5b, #3a1d2a)",
  "/commercial": "radial-gradient(120% 120% at 0% 100%, #f2d9b3, transparent 55%), linear-gradient(120deg, #9b6f4a, #3a2a1d)",
  "/transitions": "radial-gradient(120% 120% at 100% 100%, #e6b3ff, transparent 55%), linear-gradient(120deg, #7a3f8f, #2a1d3a)",
  "/vault": "radial-gradient(120% 120% at 50% 0%, #cdb3ff, transparent 55%), linear-gradient(120deg, #5b4a9b, #1d1a3a)",
};

const NEXT = ["Start", "Write the script", "Storyboard", "Edit & post", "Ready to post"];

export function Home() {
  const { loaded, characters, locations, products, episodes } = useStudio();
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
            Build your cast, sets and products once, then turn any idea into a shot-by-shot storyboard: story episodes, UGC ads,
            commercials and try-on transitions.
          </p>
          <div className="row">
            <Link href="/builder?new=1" className="btn btn-primary">New episode <ArrowRight size={16} /></Link>
            <Link href="/ugc?new=1" className="btn btn-soft">New UGC ad</Link>
          </div>
        </div>

        <div className="panel continue-card">
          {loaded && latest ? (
            <>
              <div className="stack tight">
                <span className="eyebrow">Continue · {TOOLS[latest.kind].label}</span>
                <h2 className="display">{episodeTitle(latest)}</h2>
                <span className="muted small">
                  {episodeProgress(latest) === 4 ? "Ready to post" : `Next: ${NEXT[episodeProgress(latest)]}`}
                </span>
              </div>
              <div className="progress"><i style={{ width: `${(episodeProgress(latest) / 4) * 100}%` }} /></div>
              <Link href={`${TOOLS[latest.kind].href}?id=${latest.id}`} className="btn btn-soft">Open <ArrowRight size={16} /></Link>
            </>
          ) : (
            <div className="stack">
              <span className="eyebrow">How it works</span>
              <ol className="stack tight small muted" style={{ margin: 0, paddingLeft: 18 }}>
                <li>Lock your characters, sets and products</li>
                <li>Pick a tool and give it an idea or a brief</li>
                <li>Get a timed storyboard with image and animation prompts</li>
                <li>Generate, stitch with the edit guide, and post</li>
              </ol>
            </div>
          )}
          <div className="stats four">
            <Link href="/cast" className="stat"><b>{characters.length}</b><span className="faint tiny">Characters</span></Link>
            <Link href="/sets" className="stat"><b>{locations.length}</b><span className="faint tiny">Set rooms</span></Link>
            <Link href="/products" className="stat"><b>{products.length}</b><span className="faint tiny">Products</span></Link>
            <Link href="/projects" className="stat"><b>{episodes.length}</b><span className="faint tiny">Projects</span></Link>
          </div>
        </div>
      </section>

      <section className="stack">
        <h2 className="display">Create</h2>
        <div className="tool-grid">
          {CREATE.map(({ href, label, blurb, icon: Icon }) => (
            <Link key={href} href={href === "/vault" ? href : `${href}?new=1`} className="tool-card">
              <div className="tool-art" style={{ ["--art" as string]: ART[href] }}>
                <span className="icon-bubble"><Icon size={20} strokeWidth={1.8} /></span>
              </div>
              <h3>{label}</h3>
              <p className="muted small">{blurb}</p>
              <span className="go">Open <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="stack">
        <h2 className="display">Your library</h2>
        <div className="library-grid">
          {LIBRARY.map(({ href, label, blurb, icon: Icon }) => (
            <Link key={href} href={href} className="library-card">
              <span className="icon-bubble"><Icon size={18} strokeWidth={1.8} /></span>
              <div className="stack tight">
                <strong>{label}</strong>
                <span className="faint small">{blurb}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
