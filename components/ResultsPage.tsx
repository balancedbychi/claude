"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BarChart3, ExternalLink, Loader2, Plus, Trash2, Trophy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { post } from "@/lib/client-api.ts";
import { RULES } from "@/lib/score.ts";
import { TOOLS } from "@/lib/tools.ts";
import { episodeTitle, useStudio } from "@/lib/use-studio.ts";
import { hookOptions } from "@/lib/winners.ts";

type Platform = "tiktok" | "instagram" | "youtube";
const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
];
const METRICS = ["views", "likes", "comments", "shares", "saves", "follows", "sales"] as const;
type MetricKey = (typeof METRICS)[number];

interface PostRow {
  id: string;
  platform: Platform;
  url: string;
  hookUsed: string;
  postedOn: string | null;
  projectId: string | null;
  projectTitle: string | null;
  projectKind: string | null;
  hookStyle: string | null;
  lastRecordedOn: string | null;
  checkins: number;
  winnerStatus: string | null;
  scored: { score: number | null; baseline: number | null; engagement: number; winner: boolean } | null;
  views?: number; likes?: number; comments?: number; shares?: number; saves?: number; follows?: number; sales?: number;
}

const fmt = (n: number | undefined) => (n === undefined ? "–" : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : String(n));
const today = () => new Date().toISOString().slice(0, 10);
const daysSince = (d: string | null) => (d ? (Date.now() - new Date(d).getTime()) / 86_400_000 : Infinity);

export function ResultsPage() {
  const { episodes } = useStudio();
  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [share, setShare] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/results");
    if (!res.ok) return setError("Couldn't load your results.");
    const data = (await res.json()) as { posts: PostRow[]; shareWinners: boolean };
    setPosts(data.posts);
    setShare(data.shareWinners);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(() => {
    const list = posts ?? [];
    const scored = list.filter((p) => p.scored?.score != null);
    return {
      tracked: list.length,
      baseline: scored[0]?.scored?.baseline ?? null,
      best: scored.reduce((m, p) => Math.max(m, p.scored!.score!), 0),
      winners: list.filter((p) => p.scored?.winner).length,
      due: list.filter((p) => daysSince(p.lastRecordedOn) >= 7).length,
    };
  }, [posts]);

  async function toggleShare(next: boolean) {
    setShare(next);
    await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ shareWinners: next }) });
    load();
  }

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Results</span>
        <h1 className="display">
          What&apos;s <em>working</em>
        </h1>
        <p className="lede">
          Add each video you post, then log its numbers once a week. Every post is compared with your own typical views, so you
          can see which hooks and formats actually win for you.
        </p>
      </header>

      <div className="stats five">
        <div className="stat"><b>{summary.tracked}</b><span className="faint tiny">Posts tracked</span></div>
        <div className="stat"><b>{summary.baseline ? fmt(Math.round(summary.baseline)) : "–"}</b><span className="faint tiny">Your typical views</span></div>
        <div className="stat"><b>{summary.best ? `${summary.best.toFixed(1)}×` : "–"}</b><span className="faint tiny">Best post</span></div>
        <div className="stat"><b>{summary.winners}</b><span className="faint tiny">Winners</span></div>
        <div className="stat"><b>{summary.due}</b><span className="faint tiny">Check-ins due</span></div>
      </div>

      <AddPost projects={episodes} onAdded={load} />

      {error && <p className="error">{error}</p>}
      {posts === null ? (
        <p className="faint"><Loader2 size={14} className="spin" /> Loading…</p>
      ) : posts.length === 0 ? (
        <div className="panel empty">
          <span className="icon-bubble"><BarChart3 size={24} strokeWidth={1.6} /></span>
          <h3>No posts tracked yet</h3>
          <p className="muted small">Add a video above once it&apos;s live. Scores appear after {RULES.minPostsForBaseline} tracked posts.</p>
        </div>
      ) : (
        <div className="stack">
          {posts.map((p) => <PostCard key={p.id} p={p} onChange={load} />)}
        </div>
      )}

      <section className="panel stack tight">
        <label className="check">
          <input type="checkbox" checked={share} onChange={(e) => toggleShare(e.target.checked)} />
          <span>
            <b>Share my winning scripts with the community, anonymously.</b> When a studio script does at least {RULES.winMultiplier}× your
            typical views, its hook and opening are reviewed and may be used to teach the AI what works. Your name, handle and
            links are never shared. Turning this off removes your entries.
          </span>
        </label>
      </section>
    </div>
  );
}

function AddPost({ projects, onAdded }: { projects: ReturnType<typeof useStudio>["episodes"]; onAdded: () => void }) {
  const [projectId, setProjectId] = useState(useSearchParams().get("project") ?? "");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [url, setUrl] = useState("");
  const [hook, setHook] = useState("");
  const [customHook, setCustomHook] = useState("");
  const [postedOn, setPostedOn] = useState(today());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const project = projects.find((p) => p.id === projectId);
  const options = project ? hookOptions(project) : [];

  async function submit() {
    setBusy(true);
    setError("");
    try {
      await post("/api/results/posts", {
        projectId: projectId || null,
        platform,
        url: url.trim(),
        hookUsed: !project || hook === "__custom" ? customHook : hook || options[0] || "",
        postedOn,
      });
      setUrl("");
      setCustomHook("");
      onAdded();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel glow stack">
      <h3>Add a post</h3>
      <div className="grid-3">
        <label className="field">
          From the studio
          <select value={projectId} onChange={(e) => { setProjectId(e.target.value); setHook(""); }}>
            <option value="">Not made in the studio</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{TOOLS[p.kind].label}: {episodeTitle(p)}</option>)}
          </select>
        </label>
        <label className="field">
          Platform
          <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
            {PLATFORMS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </label>
        <label className="field">
          Posted on
          <input type="date" value={postedOn} max={today()} onChange={(e) => setPostedOn(e.target.value)} />
        </label>
        <label className="field span-2">
          Link to the post
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.tiktok.com/@you/video/…" />
        </label>
        {project ? (
          <label className="field">
            Opening hook used
            <select value={hook} onChange={(e) => setHook(e.target.value)}>
              {options.map((h) => <option key={h} value={h}>{h}</option>)}
              <option value="__custom">Something else…</option>
            </select>
          </label>
        ) : (
          <label className="field">
            <span>Opening hook <span className="hint">(optional)</span></span>
            <input value={customHook} onChange={(e) => setCustomHook(e.target.value)} placeholder="The first line of the video" />
          </label>
        )}
        {project && hook === "__custom" && (
          <label className="field span-2">
            Hook you posted
            <input value={customHook} onChange={(e) => setCustomHook(e.target.value)} placeholder="The first line of the video" />
          </label>
        )}
      </div>
      <div className="row end">
        {error && <span className="error">{error}</span>}
        <button className="btn btn-primary" onClick={submit} disabled={busy || !url.trim()}>
          {busy ? <Loader2 size={15} className="spin" /> : <Plus size={15} />} Track this post
        </button>
      </div>
    </section>
  );
}

function PostCard({ p, onChange }: { p: PostRow; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<MetricKey, string>>(
    Object.fromEntries(METRICS.map((k) => [k, p[k] !== undefined ? String(p[k]) : ""])) as Record<MetricKey, string>,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const due = daysSince(p.lastRecordedOn) >= 7;
  const score = p.scored?.score;

  async function save() {
    setBusy(true);
    setError("");
    try {
      await post("/api/results/checkins", {
        postId: p.id,
        recordedOn: today(),
        ...Object.fromEntries(METRICS.map((k) => [k, Number(values[k] || 0)])),
      });
      setOpen(false);
      onChange();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="panel stack tight post-card">
      <div className="row between">
        <div className="row">
          <span className="tag">{PLATFORMS.find((x) => x.id === p.platform)?.label}</span>
          {p.projectKind && <span className="tag">{TOOLS[p.projectKind as keyof typeof TOOLS]?.label}</span>}
          {p.hookStyle && <span className="tag outline-accent">{p.hookStyle}</span>}
          {p.scored?.winner && (
            <span className="tag accent"><Trophy size={12} /> Winner{p.winnerStatus === "approved" ? " · in the playbook" : p.winnerStatus === "candidate" ? " · in review" : ""}</span>
          )}
          {due && <span className="tag success">Check-in due</span>}
        </div>
        <div className="row">
          <a className="btn btn-ghost btn-sm" href={p.url} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Open</a>
          <button className="btn btn-ghost btn-sm btn-danger" title="Stop tracking" onClick={async () => { if (confirm("Stop tracking this post?")) { await fetch(`/api/results/posts/${p.id}`, { method: "DELETE" }); onChange(); } }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <h3>{p.projectTitle || "Not made in the studio"}</h3>
      {p.hookUsed && <p className="muted small">&ldquo;{p.hookUsed}&rdquo;</p>}
      <div className="metric-row">
        {METRICS.map((k) => (
          <div key={k}><b>{fmt(p[k])}</b><span className="faint tiny">{k}</span></div>
        ))}
        <div>
          <b className={score && score >= RULES.winMultiplier ? "grad" : ""}>{score != null ? `${score.toFixed(1)}×` : "–"}</b>
          <span className="faint tiny">vs your typical</span>
        </div>
      </div>
      <div className="row between">
        <span className="faint tiny">
          {p.lastRecordedOn ? `Last updated ${p.lastRecordedOn} · ${p.checkins} check-in${p.checkins === 1 ? "" : "s"}` : "No numbers yet"}
          {p.postedOn ? ` · posted ${p.postedOn}` : ""}
        </span>
        <button className={`btn btn-sm ${due ? "btn-primary" : "btn-soft"}`} onClick={() => setOpen((o) => !o)}>
          {open ? "Cancel" : "Log this week's numbers"}
        </button>
      </div>
      {open && (
        <div className="stack tight">
          <div className="metric-inputs">
            {METRICS.map((k) => (
              <label key={k} className="field">
                {k}
                <input inputMode="numeric" value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value.replace(/[^\d]/g, "") })} placeholder="0" />
              </label>
            ))}
          </div>
          <div className="row end">
            {error && <span className="error">{error}</span>}
            <button className="btn btn-primary btn-sm" onClick={save} disabled={busy || !values.views}>
              {busy ? <Loader2 size={14} className="spin" /> : null} Save check-in
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
