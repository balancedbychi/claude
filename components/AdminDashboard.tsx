"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ExternalLink, Loader2, RotateCcw, X } from "lucide-react";
import { TOOLS } from "@/lib/tools.ts";
import type { ToolKind } from "@/lib/types.ts";
import { AiStatus } from "./AiStatus.tsx";
import { PricingEditor } from "./PricingEditor.tsx";

interface Winner {
  id: string;
  email: string;
  kind: string;
  niche: string;
  hookStyle: string;
  hook: string;
  excerpt: string;
  score: number;
  views: number;
  status: "candidate" | "approved" | "rejected";
  adminNote: string;
  url: string;
  platform: string;
}

interface Overview {
  totals: { members: number; projects: number; posts: number; checkins: number };
  winners: Winner[];
  byTool: { kind: string; posts: number; medianScore: number | null; winners: number; hookStyles: { hookStyle: string; posts: number; medianScore: number; winRate: number }[] }[];
}

const label = (kind: string) => TOOLS[kind as ToolKind]?.label ?? "Not from the studio";

export function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [tab, setTab] = useState<Winner["status"]>("candidate");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin");
    if (res.ok) setData(await res.json());
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  if (!data) return <div className="page"><p className="faint"><Loader2 size={14} className="spin" /> Loading…</p></div>;
  const list = data.winners.filter((w) => w.status === tab);
  const counts = (s: Winner["status"]) => data.winners.filter((w) => w.status === s).length;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Admin</span>
        <h1 className="display">Tune the <em>studio</em></h1>
        <p className="lede">
          Winners are posts that did at least 2× their creator&apos;s typical views. Approve the ones worth learning from: approved
          hooks and openings are added to the AI&apos;s instructions for that tool within minutes. The hook-style results below feed in
          automatically once each style has enough posts.
        </p>
      </header>

      <div className="stats four">
        <div className="stat"><b>{data.totals.members}</b><span className="faint tiny">Members</span></div>
        <div className="stat"><b>{data.totals.projects}</b><span className="faint tiny">Projects</span></div>
        <div className="stat"><b>{data.totals.posts}</b><span className="faint tiny">Tracked posts</span></div>
        <div className="stat"><b>{data.totals.checkins}</b><span className="faint tiny">Check-ins</span></div>
      </div>

      <section className="stack">
        <h2 className="display">AI connection</h2>
        <AiStatus />
      </section>

      <section className="stack">
        <h2 className="display">Winners</h2>
        <div className="chips">
          {(["candidate", "approved", "rejected"] as const).map((s) => (
            <button key={s} className={`chip ${tab === s ? "selected" : ""}`} onClick={() => setTab(s)}>
              {s === "candidate" ? "To review" : s === "approved" ? "In the playbook" : "Rejected"} ({counts(s)})
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="faint">Nothing here.</p>
        ) : (
          list.map((w) => <WinnerCard key={w.id} w={w} onChange={load} />)
        )}
      </section>

      <section className="stack">
        <h2 className="display">By tool and hook style</h2>
        {data.byTool.length === 0 && <p className="faint">No tracked posts yet.</p>}
        {data.byTool.map((t) => (
          <div key={t.kind} className="panel stack tight">
            <div className="row between">
              <h3>{label(t.kind)}</h3>
              <span className="faint small">
                {t.posts} posts · median {t.medianScore != null ? `${t.medianScore.toFixed(2)}×` : "–"} · {t.winners} winners
              </span>
            </div>
            {t.hookStyles.length > 0 && (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Hook style</th><th>Posts</th><th>Median vs typical</th><th>Win rate</th></tr></thead>
                  <tbody>
                    {t.hookStyles.map((h) => (
                      <tr key={h.hookStyle}>
                        <td>{h.hookStyle}</td>
                        <td>{h.posts}{h.posts < 5 && <span className="faint tiny"> (too few to use)</span>}</td>
                        <td>{h.medianScore.toFixed(2)}×</td>
                        <td>{Math.round(h.winRate * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="stack">
        <h2 className="display">Higgsfield pricing</h2>
        <PricingEditor />
      </section>
    </div>
  );
}

function WinnerCard({ w, onChange }: { w: Winner; onChange: () => void }) {
  const [note, setNote] = useState(w.adminNote);
  const [busy, setBusy] = useState(false);

  async function review(status: Winner["status"]) {
    setBusy(true);
    await fetch(`/api/admin/winners/${w.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, note }) });
    setBusy(false);
    onChange();
  }

  return (
    <article className="panel stack tight">
      <div className="row between">
        <div className="row">
          <span className="tag accent">{w.score.toFixed(1)}× typical</span>
          <span className="tag">{label(w.kind)}</span>
          {w.hookStyle && <span className="tag outline-accent">{w.hookStyle}</span>}
          {w.niche && <span className="tag">{w.niche}</span>}
          <span className="faint tiny">{w.views.toLocaleString()} views · {w.email}</span>
        </div>
        <a className="btn btn-ghost btn-sm" href={w.url} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Watch</a>
      </div>
      <h3>&ldquo;{w.hook}&rdquo;</h3>
      <p className="muted small">{w.excerpt}</p>
      <div className="row nowrap">
        <input className="grow" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (why it worked, or why not)" />
        {w.status !== "approved" && (
          <button className="btn btn-primary btn-sm" disabled={busy} onClick={() => review("approved")}><Check size={14} /> Approve</button>
        )}
        {w.status !== "rejected" && (
          <button className="btn btn-soft btn-sm" disabled={busy} onClick={() => review("rejected")}><X size={14} /> Reject</button>
        )}
        {w.status !== "candidate" && (
          <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => review("candidate")}><RotateCcw size={14} /> Back to review</button>
        )}
      </div>
    </article>
  );
}
