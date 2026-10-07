"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, RotateCcw, Trash2 } from "lucide-react";
import { estimateShot, fmtEstimate, modelsFor, priceLabel, type ModelPrice, type PriceBook } from "@/lib/pricing.ts";

const SOURCES: Record<ModelPrice["source"], string> = { account: "Higgsfield cost check", published: "published pricing", estimate: "estimate" };

/** Admin: the Higgsfield price list (credits and wait times) behind every estimate. */
export function PricingEditor() {
  const [book, setBook] = useState<PriceBook | null>(null);
  const [defaults, setDefaults] = useState<PriceBook | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved" | string>("idle");

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { pricing: PriceBook; defaults: PriceBook } | null) => {
        if (!d) return;
        setBook(d.pricing);
        setDefaults(d.defaults);
      })
      .catch(() => {});
  }, []);

  if (!book) return <p className="faint"><Loader2 size={14} className="spin" /> Loading prices…</p>;

  const change = (patch: Partial<PriceBook>) => {
    setBook({ ...book, ...patch });
    setState("idle");
  };
  const setModel = (i: number, patch: Partial<ModelPrice>) => change({ models: book.models.map((m, j) => (j === i ? { ...m, ...patch } : m)) });
  const num = (v: string) => (v === "" ? 0 : Number(v));

  async function save() {
    setState("saving");
    const res = await fetch("/api/admin/pricing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) });
    const d = await res.json().catch(() => ({}));
    if (res.ok) {
      setBook(d.pricing);
      setState("saved");
    } else setState(d.error || "Couldn't save.");
  }

  const sample = estimateShot({ durationSeconds: 8, continueFromPrevious: false }, modelsFor(book));
  const videos = book.models.filter((m) => m.type === "video");

  return (
    <div className="panel stack">
      <p className="small muted">
        Members see these credits and wait times as estimates on every shot, reference prompt and team report. To check a price, use
        Higgsfield&apos;s cost preview (or the Generate button) and update the row. Last updated {book.updatedAt || "never"}. Example:
        an 8s shot with a keyframe on the defaults is <b>{fmtEstimate(sample)}</b>.
      </p>
      <div className="row">
        <label className="inline-field">
          Tries to budget per shot
          <input type="number" step="0.5" min="1" max="10" value={book.attempts} onChange={(e) => change({ attempts: num(e.target.value) })} style={{ width: 70 }} />
        </label>
        <label className="inline-field">
          Test-clip settings
          <select value={book.testVideo} onChange={(e) => change({ testVideo: e.target.value })}>
            {videos.map((m) => <option key={m.id} value={m.id}>{priceLabel(m)}</option>)}
          </select>
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Default</th><th>Model</th><th>Type</th><th>Resolution</th><th>Credits</th><th>Min billed sec</th><th>Wait (sec)</th><th>Source</th><th /></tr>
          </thead>
          <tbody>
            {book.models.map((m, i) => {
              const isDefault = m.type === "image" ? book.defaultImage === m.id : book.defaultVideo === m.id;
              return (
                <tr key={i}>
                  <td>
                    <input type="radio" name={`default-${m.type}`} checked={isDefault} onChange={() => change(m.type === "image" ? { defaultImage: m.id } : { defaultVideo: m.id })} aria-label={`Default ${m.type} model`} />
                  </td>
                  <td>
                    <input value={m.label} onChange={(e) => setModel(i, { label: e.target.value })} aria-label="Label" />
                    <input className="tiny" value={m.id} onChange={(e) => setModel(i, { id: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })} aria-label="Id" />
                  </td>
                  <td>
                    <select value={m.type} onChange={(e) => setModel(i, { type: e.target.value as ModelPrice["type"] })}>
                      <option value="image">image</option>
                      <option value="video">video</option>
                    </select>
                  </td>
                  <td>
                    <input value={m.resolution} onChange={(e) => setModel(i, { resolution: e.target.value })} style={{ width: 70 }} aria-label="Resolution" />
                  </td>
                  <td>
                    <input type="number" step="0.05" min="0" value={m.credits} onChange={(e) => setModel(i, { credits: num(e.target.value) })} style={{ width: 80 }} aria-label="Credits" />
                    <span className="tiny faint"> {m.type === "image" ? "/ image" : "/ second"}</span>
                  </td>
                  <td>
                    {m.type === "video" ? (
                      <input type="number" min="0" value={m.minSeconds ?? 0} onChange={(e) => setModel(i, { minSeconds: num(e.target.value) })} style={{ width: 70 }} aria-label="Minimum billed seconds" />
                    ) : (
                      <span className="faint">–</span>
                    )}
                  </td>
                  <td>
                    <input type="number" min="0" value={m.secondsToMake} onChange={(e) => setModel(i, { secondsToMake: num(e.target.value) })} style={{ width: 80 }} aria-label="Seconds to generate" />
                  </td>
                  <td>
                    <select value={m.source} onChange={(e) => setModel(i, { source: e.target.value as ModelPrice["source"] })} aria-label="Where the price came from">
                      {Object.entries(SOURCES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm btn-danger" onClick={() => change({ models: book.models.filter((_, j) => j !== i) })} aria-label={`Remove ${priceLabel(m)}`}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row between">
        <div className="row">
          <button
            className="btn btn-soft btn-sm"
            onClick={() => change({ models: [...book.models, { id: `model_${book.models.length + 1}`, family: "", label: "New model", type: "image", resolution: "2K", credits: 2, secondsToMake: 40, source: "estimate" }] })}
          >
            <Plus size={14} /> Add model
          </button>
          {defaults && (
            <button className="btn btn-ghost btn-sm" onClick={() => change({ ...defaults })}>
              <RotateCcw size={14} /> Reset to defaults
            </button>
          )}
        </div>
        <div className="row">
          {state === "saved" && <span className="small">Saved ✓</span>}
          {state !== "idle" && state !== "saved" && state !== "saving" && <span className="error small">{state}</span>}
          <button className="btn btn-primary btn-sm" onClick={save} disabled={state === "saving"}>
            {state === "saving" && <Loader2 size={14} className="spin" />} Save prices
          </button>
        </div>
      </div>
    </div>
  );
}
