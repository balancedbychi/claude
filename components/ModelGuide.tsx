"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Coins, FlaskConical, ImageIcon, Loader2, TriangleAlert, Video } from "lucide-react";
import { EXAMPLE_IMAGE, IMAGE_MODELS, OUTPUT_TIPS, PICKS, VIDEO_BEST_PRACTICES, VIDEO_MODELS, VIDEO_RESOLUTIONS, type GuideModel } from "@/lib/model-guide.ts";
import { fmtCredits, fmtWait, priceLabel } from "@/lib/pricing.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { GenerateNote } from "./Cost.tsx";

/** Which Higgsfield model to use for what, what it outputs, and what it costs. */
export function ModelGuide() {
  const [tab, setTab] = useState<"image" | "video">("image");
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Model guide</span>
        <h1 className="display">pick the right <em>model</em></h1>
        <p className="lede">
          Every model on Higgsfield is good at something different. Here&apos;s what to use for what, how many credits it takes and
          which settings give the crispest result on TikTok, Instagram and YouTube.
        </p>
      </header>

      <section className="stack">
        <h2 className="display">best output for a <em>crisp look</em></h2>
        <div className="cards">
          {OUTPUT_TIPS.map((t) => (
            <article key={t.platform} className="panel stack tight">
              <strong>{t.platform}</strong>
              <div className="row"><span className="tag accent">{t.frame}</span><span className="tag">{t.pixels}</span></div>
              <p className="small muted">{t.tip}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stack">
        <h2 className="display">what resolution <em className="lilac">looks like</em></h2>
        <p className="muted small" style={{ maxWidth: 680 }}>
          The same image at three sizes. Tap a spot on the small picture to zoom in there. At phone size they look alike; zoom in (or
          let TikTok compress it) and the lower resolutions go soft: skin texture, braids and the label text are the first to blur.
        </p>
        <ResolutionCompare />
      </section>

      <section className="stack">
        <h2 className="display">video, <em>best practice</em></h2>
        <div className="grid-2">
          <div className="panel stack tight">
            <strong>Every render, every time</strong>
            <ol className="steps-list">
              {VIDEO_BEST_PRACTICES.map((b, i) => (
                <li key={b}>{i === 0 ? <><FlaskConical size={13} /> <b>{b.split(":")[0]}:</b>{b.slice(b.indexOf(":") + 1)}</> : b}</li>
              ))}
            </ol>
          </div>
          <div className="stack tight">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Video</th><th>9:16</th><th>16:9</th><th>Use it for</th></tr></thead>
                <tbody>
                  {VIDEO_RESOLUTIONS.map((r) => (
                    <tr key={r.name}><td><b>{r.name}</b></td><td>{r.vertical}</td><td>{r.horizontal}</td><td className="small">{r.use}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <GenerateNote compact />
          </div>
        </div>
      </section>

      <section className="stack">
        <h2 className="display">i want to…</h2>
        <div className="cards">
          {PICKS.map((p) => (
            <article key={p.goal} className="panel stack tight">
              <strong>{p.goal}</strong>
              <p className="small"><ImageIcon size={13} /> {p.image}</p>
              <p className="small"><Video size={13} /> {p.video}</p>
              <p className="tiny faint">{p.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stack">
        <div className="row between">
          <h2 className="display">every <em>model</em></h2>
          <div className="chips">
            <button className={`chip ${tab === "image" ? "selected" : ""}`} onClick={() => setTab("image")}>Image ({IMAGE_MODELS.length})</button>
            <button className={`chip ${tab === "video" ? "selected" : ""}`} onClick={() => setTab("video")}>Video ({VIDEO_MODELS.length})</button>
          </div>
        </div>
        <div className="cards">
          {(tab === "image" ? IMAGE_MODELS : VIDEO_MODELS).map((m) => <ModelCard key={m.id} m={m} />)}
        </div>
        <p className="tiny faint">
          Credits from Higgsfield&apos;s own cost check (September 2026, 9:16, audio off). They change, so always confirm on the Generate
          button. Wait times are rough.
        </p>
      </section>
    </div>
  );
}

function ModelCard({ m }: { m: GuideModel }) {
  const { pricing } = useStudio();
  const rows = pricing.models.filter((p) => p.family === m.id);
  return (
    <article className="panel stack tight model-card">
      <div className="row between nowrap">
        <h3>{m.name}</h3>
        {m.top && <span className="tag accent">top</span>}
      </div>
      <p className="small muted">{m.tagline}</p>
      <ul className="small bullets">{m.bestFor.map((b) => <li key={b}>{b}</li>)}</ul>
      <div className="row">
        <span className="tag">{m.output}</span>
        {m.length && <span className="tag">{m.length}</span>}
        <span className="tag">{m.speed}</span>
      </div>
      {rows.length > 0 ? (
        <ul className="price-rows">
          {rows.map((r) => (
            <li key={r.id}>
              <span>{priceLabel(r)}</span>
              <span><Coins size={12} /> {r.type === "image" ? fmtCredits(r.credits) : `${r.credits} credits/sec`} <Clock size={12} /> {fmtWait(r.secondsToMake)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small"><Coins size={12} /> {m.cost}</p>
      )}
      {m.watchOut && <p className="tiny"><TriangleAlert size={12} /> {m.watchOut}</p>}
    </article>
  );
}

const SIZES = [
  { name: "1K", scale: 0.25, note: "drafts only" },
  { name: "2K", scale: 0.5, note: "keyframes for 1080p video" },
  { name: "4K", scale: 1, note: "hero shots, thumbnails, labels" },
];

/**
 * The example image drawn at 1K, 2K and 4K in the browser: each size is a
 * real downscale of the 4K original, then the same spot is zoomed to the
 * same on-screen size so the difference in detail is visible.
 */
function ResolutionCompare() {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [focus, setFocus] = useState({ x: 0.5, y: 0.42 });
  const img = useRef<HTMLImageElement | null>(null);
  const scaled = useRef<HTMLCanvasElement[]>([]);
  const views = useRef<(HTMLCanvasElement | null)[]>([]);

  function load() {
    setState("loading");
    const el = new Image();
    el.decoding = "async";
    el.onload = () => {
      img.current = el;
      // One real downscale per size, reused for every zoom.
      scaled.current = SIZES.map(({ scale }) => {
        const c = document.createElement("canvas");
        c.width = Math.round(el.naturalWidth * scale);
        c.height = Math.round(el.naturalHeight * scale);
        const g = c.getContext("2d")!;
        g.imageSmoothingQuality = "high";
        g.drawImage(el, 0, 0, c.width, c.height);
        return c;
      });
      setState("ready");
    };
    el.onerror = () => setState("error");
    el.src = EXAMPLE_IMAGE.url;
  }

  useEffect(() => {
    if (state !== "ready") return;
    SIZES.forEach((_, i) => {
      const src = scaled.current[i];
      const view = views.current[i];
      if (!src || !view) return;
      const box = Math.round(src.width * 0.14); // same share of the picture at every size
      const sx = Math.min(Math.max(0, focus.x * src.width - box / 2), src.width - box);
      const sy = Math.min(Math.max(0, focus.y * src.height - box / 2), src.height - box);
      const g = view.getContext("2d")!;
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "high";
      g.clearRect(0, 0, view.width, view.height);
      g.drawImage(src, sx, sy, box, box, 0, 0, view.width, view.height);
    });
  }, [state, focus]);

  if (state === "idle" || state === "loading") {
    return (
      <div className="panel stack tight">
        <p className="small">Loads the full 4K original ({EXAMPLE_IMAGE.caption.toLowerCase()}): a large file, so best on Wi-Fi.</p>
        <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }} onClick={load} disabled={state === "loading"}>
          {state === "loading" ? <><Loader2 size={14} className="spin" /> Loading 4K…</> : "Show the comparison"}
        </button>
      </div>
    );
  }
  if (state === "error") return <p className="error small">The example image couldn&apos;t load. Try again later.</p>;

  const el = img.current!;
  return (
    <div className="res-compare">
      <figure className="res-overview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={EXAMPLE_IMAGE.url}
          alt={EXAMPLE_IMAGE.caption}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setFocus({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
          }}
        />
        <i className="res-focus" style={{ left: `${focus.x * 100}%`, top: `${focus.y * 100}%` }} aria-hidden="true" />
        <figcaption className="tiny faint">tap to move the zoom</figcaption>
      </figure>
      {SIZES.map((s, i) => (
        <figure key={s.name} className="res-view">
          <canvas ref={(c) => { views.current[i] = c; }} width={480} height={480} aria-label={`${s.name} zoomed`} />
          <figcaption>
            <b>{s.name}</b> <span className="tiny faint">{Math.round(el.naturalWidth * s.scale).toLocaleString()} × {Math.round(el.naturalHeight * s.scale).toLocaleString()} px · {s.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
