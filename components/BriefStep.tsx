"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Brief } from "@/lib/types.ts";
import type { StepProps } from "./EpisodeBuilder.tsx";

const CTA_IDEAS = ["Tap the orange cart", "Link in bio", "Use code GLOW15 for 15% off", "Shop now"];

export function BriefStep({ tool, characters, locations, products, episode, updateEpisode, goTo }: StepProps) {
  const [brief, setBrief] = useState<Brief>(
    episode.brief ?? {
      productId: tool.needsProduct ? (products[0]?.id ?? "") : "",
      characterId: characters[0]?.id ?? "",
      locationId: "",
      angle: tool.angles[0] ?? "",
      lengthSeconds: tool.kind === "transition" ? 15 : 30,
      items: "",
      message: "",
      cta: "",
      notes: "",
    },
  );
  const set = (patch: Partial<Brief>) => setBrief((b) => ({ ...b, ...patch }));
  const isTransition = tool.kind === "transition";
  const product = products.find((p) => p.id === brief.productId);
  const ready = (!tool.needsProduct || product) && (!isTransition || brief.items.trim().length > 0);

  function next() {
    const changed = JSON.stringify(brief) !== JSON.stringify(episode.brief);
    const label = [product?.name, brief.angle].filter(Boolean).join(" · ");
    // A changed brief makes any existing script and storyboard stale.
    updateEpisode(changed ? { brief, topic: label, script: null, shots: [], pkg: null } : { brief, topic: label });
    goTo(1);
  }

  return (
    <section className="stack loose">
      <div className="panel glow stack">
        <div className="grid-2">
          <label className="field">
            <span>Product {!tool.needsProduct && <span className="hint">(optional)</span>}</span>
            <select value={brief.productId} onChange={(e) => set({ productId: e.target.value })}>
              {!tool.needsProduct && <option value="">No product</option>}
              {tool.needsProduct && products.length === 0 && <option value="">Add a product first</option>}
              {products.map((p) => <option key={p.id} value={p.id}>{[p.brand, p.name].filter(Boolean).join(" ")}</option>)}
            </select>
          </label>
          <label className="field">
            <span>{tool.kind === "commercial" ? "Lead talent" : "Creator"} <span className="hint">(from Cast Studio)</span></span>
            <select value={brief.characterId} onChange={(e) => set({ characterId: e.target.value })}>
              <option value="">{tool.kind === "commercial" ? "No one (product only)" : "Hands only / voiceover"}</option>
              {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="field">
            Set
            <select value={brief.locationId} onChange={(e) => set({ locationId: e.target.value })}>
              <option value="">Let the director choose</option>
              {locations.map((l) => <option key={l.id} value={l.id}>{l.setName ? `${l.setName} · ` : ""}{l.name}</option>)}
            </select>
          </label>
          <label className="field">
            Length
            <select value={brief.lengthSeconds} onChange={(e) => set({ lengthSeconds: Number(e.target.value) })}>
              {tool.lengths.map((n) => <option key={n} value={n}>{n} seconds</option>)}
            </select>
          </label>
        </div>

        <div className="stack tight">
          <span className="field">{tool.angleLabel}</span>
          <div className="chips">
            {tool.angles.map((a) => (
              <button key={a} className={`chip ${brief.angle === a ? "selected" : ""}`} onClick={() => set({ angle: a })}>{a}</button>
            ))}
          </div>
        </div>

        {isTransition && (
          <label className="field">
            <span>Pieces or steps, in order <span className="hint">(one per line)</span></span>
            <textarea
              rows={6}
              value={brief.items}
              onChange={(e) => set({ items: e.target.value })}
              placeholder={"Yellow off-shoulder maxi dress\nGold statement earrings\nLayered gold necklace\nGold bangles\nMint strappy heels\nMint quilted handbag"}
            />
          </label>
        )}

        {!isTransition && (
          <div className="grid-2">
            <label className="field">
              <span>Key message or offer <span className="hint">(optional)</span></span>
              <input value={brief.message} onChange={(e) => set({ message: e.target.value })} placeholder="Glass skin in one week, 20% off this weekend" />
            </label>
            <label className="field">
              <span>Call to action</span>
              <input list="cta-ideas" value={brief.cta} onChange={(e) => set({ cta: e.target.value })} placeholder="Tap the orange cart" />
              <datalist id="cta-ideas">{CTA_IDEAS.map((c) => <option key={c} value={c} />)}</datalist>
            </label>
          </div>
        )}

        <label className="field">
          <span>Anything else? <span className="hint">(optional)</span></span>
          <textarea rows={2} value={brief.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Target audience, a trend to reference, a mood, words to avoid…" />
        </label>

        <div className="row between">
          {tool.needsProduct && products.length === 0 ? (
            <Link href="/products" className="btn btn-soft">Add a product first <ArrowRight size={15} /></Link>
          ) : (
            <span className="faint small">{product ? `Only the claims saved for ${product.name} will be used.` : ""}</span>
          )}
          <button className="btn btn-primary" onClick={next} disabled={!ready}>
            Next: write the script <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
