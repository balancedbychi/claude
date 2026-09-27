"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { post } from "@/lib/client-api.ts";
import { libraryLabels, newProject, runPipeline, stepsLeft, type Plan, type TeamMessage } from "@/lib/pipeline.ts";
import { TOOLS } from "@/lib/tools.ts";
import type { Episode } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { Bot, BotName } from "./Bot.tsx";

export interface Run {
  ask: string;
  projectId: string | null;
  status: "planning" | "running" | "done" | "error";
  feed: TeamMessage[];
  progress: number; // 0..1
}

interface TeamApi {
  run: Run | null;
  busy: boolean;
  /** Plan from a plain-language ask, create the project and make it end to end. */
  ask: (text: string) => Promise<void>;
  /** Hand an existing project to the team to finish from wherever it is. */
  finish: (project: Episode, targetMinutes?: number) => Promise<void>;
  dismiss: () => void;
}

const TeamContext = createContext<TeamApi | null>(null);

export function useTeam(): TeamApi {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used inside <TeamProvider>.");
  return ctx;
}

let seq = 0;

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const studio = useStudio();
  const [run, setRun] = useState<Run | null>(null);
  const libRef = useRef(studio);
  libRef.current = studio;

  const say = useCallback((bot: TeamMessage["bot"], text: string, state: TeamMessage["state"] = "done") => {
    const id = `m${++seq}`;
    setRun((r) => (r ? { ...r, feed: [...r.feed, { id, bot, text, state, at: Date.now() }] } : r));
    return id;
  }, []);
  const resay = useCallback((id: string, text: string, state: TeamMessage["state"] = "done") => {
    setRun((r) => (r ? { ...r, feed: r.feed.map((m) => (m.id === id ? { ...m, text, state } : m)) } : r));
  }, []);

  const update = useCallback((id: string, patch: Partial<Episode>) => {
    libRef.current.setEpisodes((list) => list.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const go = useCallback(
    async (project: Episode, targetMinutes?: number) => {
      const { bible, characters, locations, products, pricing } = libRef.current;
      setRun((r) => (r ? { ...r, projectId: project.id, status: "running", progress: 0.02 } : r));
      try {
        await runPipeline({
          project,
          lib: { bible, characters, locations, products, pricing },
          targetMinutes,
          update,
          say,
          resay,
          onProgress: (done, total) => setRun((r) => (r ? { ...r, progress: Math.min(1, done / total) } : r)),
        });
        setRun((r) => (r ? { ...r, status: "done", progress: 1 } : r));
      } catch (e) {
        // Mark whoever was mid-task as stuck; everything finished so far is kept.
        setRun((r) =>
          r ? { ...r, status: "error", feed: r.feed.map((m) => (m.state === "working" ? { ...m, state: "error", text: `${m.text.replace(/…$/, "")}: hit a snag. ${(e as Error).message}` } : m)) } : r,
        );
      }
    },
    [update, say, resay],
  );

  const ask = useCallback(
    async (text: string) => {
      setRun({ ask: text, projectId: null, status: "planning", feed: [{ id: `m${++seq}`, bot: "you", text, state: "done", at: Date.now() }], progress: 0 });
      const m = say("manager", "reading your ask and briefing the team…", "working");
      let plan: Plan;
      try {
        const { bible, characters, locations, products } = libRef.current;
        plan = await post<Plan>("/api/plan", { ask: text, ...libraryLabels({ bible, characters, locations, products }) });
      } catch (e) {
        resay(m, (e as Error).message, "error");
        setRun((r) => (r ? { ...r, status: "error" } : r));
        return;
      }
      resay(m, plan.reply || `on it: a new ${TOOLS[plan.kind].label}.`, "done");
      const project = newProject(plan.kind, {
        topic: plan.kind === "episode" ? plan.topic : [libRef.current.products.find((p) => p.id === plan.brief?.productId)?.name, plan.brief?.angle].filter(Boolean).join(" · "),
        brief: plan.brief,
      });
      libRef.current.setEpisodes((list) => [project, ...list]);
      await go(project, plan.targetMinutes);
    },
    [go, say, resay],
  );

  const finish = useCallback(
    async (project: Episode, targetMinutes?: number) => {
      // Make sure the project is in the library, so the team's updates land on it.
      libRef.current.setEpisodes((list) => (list.some((e) => e.id === project.id) ? list.map((e) => (e.id === project.id ? project : e)) : [project, ...list]));
      setRun({ ask: "", projectId: project.id, status: "running", feed: [], progress: 0 });
      say("manager", stepsLeft(project) > 0 ? "got it, the team will take it from here." : "this one's already finished!", "done");
      await go(project, targetMinutes);
    },
    [go, say],
  );

  const dismiss = useCallback(() => setRun(null), []);
  const busy = run?.status === "planning" || run?.status === "running";

  return (
    <TeamContext.Provider value={{ run, busy, ask, finish, dismiss }}>
      {children}
      <Dock />
    </TeamContext.Provider>
  );
}

export function TeamFeed({ feed, limit }: { feed: TeamMessage[]; limit?: number }) {
  const shown = limit ? feed.slice(-limit) : feed;
  return (
    <div className="feed">
      {shown.map((m) => (
        <div key={m.id} className={`msg ${m.state}`}>
          {m.bot === "you" ? <span className="you-dot" aria-hidden="true">you</span> : <Bot id={m.bot} size={40} />}
          <div className="msg-body">
            <div className="who">
              {m.bot === "you" ? <span className="bot-name">you</span> : <BotName id={m.bot} />}
              <span className="when">
                {new Date(m.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                {m.state === "working" && " · working"}
              </span>
            </div>
            <p className={m.state === "error" ? "error" : ""}>{m.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Floating progress on every page except Home (which shows the full feed). */
function Dock() {
  const { run, dismiss } = useTeam();
  const pathname = usePathname();
  const { episodes } = useStudio();
  if (!run || pathname === "/") return null;
  const project = episodes.find((e) => e.id === run.projectId);
  const href = project ? `${TOOLS[project.kind].href}?id=${project.id}` : "/";
  return (
    <aside className="dock" aria-live="polite">
      <div className="row between nowrap">
        <strong className={`small ${run.status === "done" ? "celebrate" : ""}`}>{run.status === "done" ? "the team is done ✨" : run.status === "error" ? "the team got stuck" : "the team is working…"}</strong>
        {!(run.status === "planning" || run.status === "running") && (
          <button className="btn btn-ghost btn-sm" onClick={dismiss} aria-label="Close"><X size={14} /></button>
        )}
      </div>
      <div className={`progress ${run.status === "running" || run.status === "planning" ? "running" : ""}`}><i style={{ width: `${Math.round(run.progress * 100)}%` }} /></div>
      <TeamFeed feed={run.feed} limit={2} />
      {project && (
        <Link href={href} className="btn btn-soft btn-sm">Open project <ArrowRight size={14} /></Link>
      )}
    </aside>
  );
}
