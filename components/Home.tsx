"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { TEAM, TEAM_ORDER, type BotId } from "@/lib/team.ts";
import { TOOLS } from "@/lib/tools.ts";
import { episodeProgress, episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { CREATE, LIBRARY } from "./AppShell.tsx";
import { Bot, BotName } from "./Bot.tsx";
import { TeamFeed, useTeam } from "./TeamProvider.tsx";

export function Home() {
  const { loaded, characters, locations, products, episodes } = useStudio();
  const team = useTeam();
  const [text, setText] = useState("");
  const [due, setDue] = useState<{ tracked: number; due: number } | null>(null);

  useEffect(() => {
    fetch("/api/results")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { posts: { lastRecordedOn: string | null }[] } | null) => {
        if (!d) return;
        const week = Date.now() - 7 * 86_400_000;
        setDue({ tracked: d.posts.length, due: d.posts.filter((p) => !p.lastRecordedOn || new Date(p.lastRecordedOn).getTime() < week).length });
      })
      .catch(() => {});
  }, []);

  // Suggestions written from the member's own library.
  const ideas = useMemo(() => {
    const who = characters[0]?.name;
    const product = products[0] ? [products[0].brand, products[0].name].filter(Boolean).join(" ") : "";
    return [
      product ? `30-second honest review UGC ad for ${product}${who ? ` with ${who}` : ""}` : "30-second UGC ad for my new lip oil",
      `a revenge glow-up drama episode${who ? ` starring ${who}` : ""}, about 4 minutes`,
      "15-second outfit try-on: cream corset top, wide-leg jeans, gold hoops, strappy heels",
      product ? `luxury cinematic commercial for ${product}` : "a warm, emotional 30-second commercial for a baby lotion",
    ];
  }, [characters, products]);

  const status: Record<BotId, string> = useMemo(() => {
    const scripts = episodes.filter((e) => e.script);
    const shots = episodes.reduce((n, e) => n + e.shots.reduce((m, s) => m + s.shots.length, 0), 0);
    const eps = episodes.filter((e) => e.kind === "episode").length;
    return {
      bow: team.busy ? "running a job right now…" : "ready when you are. just tell me what you want.",
      scout: eps ? `${eps} episode${eps === 1 ? "" : "s"} pitched so far.` : "got a story idea? i'll find the hook.",
      penny: scripts[0] ? `last wrote “${scripts[0].script!.title}”.` : "i'll write your first script.",
      dot: shots ? `${shots} shots storyboarded so far.` : "every shot gets an image + animation prompt.",
      bestie: products.length ? `${products.length} product${products.length === 1 ? "" : "s"} on the shelf. ask me for an ad.` : "add a product and i'll write ads for it.",
      bella: characters.length ? `${characters.length} face${characters.length === 1 ? "" : "s"} cast and locked.` : "no cast yet. let's design your first face.",
      sage: locations.length ? `${locations.length} room${locations.length === 1 ? "" : "s"} designed.` : "want a luxury home set? i'll design it.",
      nia: !due ? "checking your numbers…" : due.due ? `${due.due} post${due.due === 1 ? "" : "s"} need${due.due === 1 ? "s" : ""} this week's numbers.` : due.tracked ? "all caught up this week ✓" : "track your first post and i'll find your winners.",
    };
  }, [episodes, products, characters, locations, due, team.busy]);

  function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim() || team.busy) return;
    team.ask(text.trim());
    setText("");
  }

  const run = team.run;
  const runProject = run?.projectId ? episodes.find((e) => e.id === run.projectId) : undefined;
  const recent = episodes.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">tell the team what you want…</span>
          <h1 className="display">
            one ask. a whole <em>content team</em>.
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560 }}>
            Describe an episode, an ad or a transformation in your own words. bow briefs the team and they take it from idea to
            a shot-by-shot storyboard, captions and all.
          </p>

          <form className="ask" onSubmit={send}>
            <textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) send(e);
              }}
              placeholder="e.g. a 30-second problem-solution ad for my serum, starring Zara"
              aria-label="What should the team make?"
              disabled={team.busy}
            />
            <div className="row between">
              <span className="faint tiny">bow picks the tool, your cast, product and set. press enter to send.</span>
              <button className="btn btn-primary" disabled={!text.trim() || team.busy}>
                {team.busy ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                {team.busy ? "team's working…" : "send to the team"}
              </button>
            </div>
          </form>
          {!run && (
            <div className="chips" style={{ marginTop: 10 }}>
              {ideas.map((i) => (
                <button key={i} className="chip" onClick={() => setText(i)}>{i}</button>
              ))}
            </div>
          )}

          {run && (
            <section className="panel dotted stack" style={{ marginTop: 10 }}>
              <div className="row between">
                <span className="eyebrow">{run.status === "done" ? "done ✨" : run.status === "error" ? "the team hit a snag" : "the team is on it"}</span>
                {!team.busy && <button className="btn btn-ghost btn-sm" onClick={team.dismiss}>clear</button>}
              </div>
              <div className="progress"><i style={{ width: `${Math.round(run.progress * 100)}%` }} /></div>
              <TeamFeed feed={run.feed} />
              {runProject && (
                <div className="row end">
                  {run.status === "error" && (
                    <button className="btn btn-soft" onClick={() => team.finish(runProject)}>try again from here</button>
                  )}
                  <Link href={`${TOOLS[runProject.kind].href}?id=${runProject.id}`} className="btn btn-primary">
                    {run.status === "done" ? "open it" : "watch it build"} <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="panel stack tight team-list">
          <div className="row between">
            <h3>your team</h3>
            <span className="faint tiny">{loaded ? "online" : "…"}</span>
          </div>
          {TEAM_ORDER.map((id) => (
            <Link key={id} href={TEAM[id].href} className="team-row">
              <Bot id={id} size={38} />
              <div className="grow">
                <div className="row between nowrap">
                  <BotName id={id} />
                  <span className="faint tiny">{TEAM[id].role}</span>
                </div>
                <p className="small muted team-status">{status[id]}</p>
              </div>
            </Link>
          ))}
        </aside>
      </section>

      {recent.length > 0 && (
        <section className="stack">
          <div className="row between">
            <h2 className="display">pick up where <em className="lilac">you left off</em></h2>
            <Link href="/projects" className="btn btn-ghost btn-sm">all projects <ArrowRight size={14} /></Link>
          </div>
          <div className="cards">
            {recent.map((e) => {
              const p = episodeProgress(e);
              return (
                <article key={e.id} className="episode-card">
                  <div className="row between">
                    <span className="tag">{TOOLS[e.kind].label}</span>
                    <span className={`tag ${p === 4 ? "success" : ""}`}>{p === 4 ? "ready to post" : `${p}/4 steps`}</span>
                  </div>
                  <h3><Link href={`${TOOLS[e.kind].href}?id=${e.id}`} className="stretched">{episodeTitle(e)}</Link></h3>
                  <div className="progress"><i style={{ width: `${(p / 4) * 100}%` }} /></div>
                  {p < 4 && !team.busy && (
                    <button className="btn btn-soft btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => team.finish(e)}>
                      let the team finish it ✨
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="stack">
        <div className="row between">
          <h2 className="display">or do it <em>yourself</em></h2>
          <span className="eyebrow">step by step, full control</span>
        </div>
        <div className="tool-grid">
          {CREATE.map(({ href, label, blurb, icon: Icon, bot }) => (
            <Link key={href} href={href === "/vault" ? href : `${href}?new=1`} className="tool-card">
              <div className="tool-art" style={{ ["--art" as string]: `linear-gradient(120deg, ${TEAM[bot].color}22, ${TEAM[bot].color}55)` }}>
                <span className="icon-bubble"><Icon size={19} strokeWidth={1.9} /></span>
                <Bot id={bot} size={46} />
              </div>
              <h3>{label}</h3>
              <p className="muted small">{blurb}</p>
              <span className="go">open <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid-2">
        <div className="library-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {LIBRARY.map(({ href, label, blurb, icon: Icon }) => (
            <Link key={href} href={href} className="library-card">
              <span className="icon-bubble"><Icon size={17} strokeWidth={1.9} /></span>
              <div className="stack tight">
                <strong>{label}</strong>
                <span className="faint small">{blurb}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="note" style={{ alignSelf: "center" }}>
          tip: the more your library knows (your cast, sets and products), the better the team&apos;s work gets. and every post you
          track teaches them what wins 💡
        </div>
      </section>
    </div>
  );
}
