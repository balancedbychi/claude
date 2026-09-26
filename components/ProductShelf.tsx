"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Package, Pencil, Trash2 } from "lucide-react";
import { artFor } from "@/lib/art.ts";
import { productAnchor, productSheetPrompt } from "@/lib/prompt-builder.ts";
import { newId } from "@/lib/storage.ts";
import type { Product } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { CopyButton } from "./CopyButton.tsx";
import { PhotoFill } from "./PhotoFill.tsx";

const EMPTY: Product = { id: "", name: "", brand: "", category: "", packaging: "", benefits: "", usage: "" };

const FIELDS: { key: Exclude<keyof Product, "id">; label: string; placeholder: string; long?: boolean; hint?: string }[] = [
  { key: "name", label: "Product name", placeholder: "Glow Drops" },
  { key: "brand", label: "Brand", placeholder: "Lumi Skin" },
  { key: "category", label: "What it is", placeholder: "hydrating face serum" },
  { key: "usage", label: "How it's used on camera", placeholder: "2-3 drops pressed into cheeks with fingertips" },
  { key: "packaging", label: "Packaging", hint: "shape, material, colours, label layout and text", placeholder: "30ml frosted glass dropper bottle, rose-gold dropper cap, white label with 'LUMI' in thin black serif caps and 'Glow Drops' in script underneath", long: true },
  { key: "benefits", label: "Claims you're allowed to make", hint: "only what the brand says is true", placeholder: "hydrates for 24 hours, lightweight, fragrance-free, dewy finish", long: true },
];

export function ProductShelf() {
  const { loaded, bible, products, setProducts } = useStudio();
  const [draft, setDraft] = useState<Product>(EMPTY);

  function save() {
    if (!draft.name.trim() || !draft.packaging.trim()) return;
    setProducts((prev) => (draft.id ? prev.map((p) => (p.id === draft.id ? draft : p)) : [...prev, { ...draft, id: newId("prod") }]));
    setDraft(EMPTY);
  }

  function edit(p: Product) {
    setDraft(p);
    document.getElementById("product-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!loaded) return <div className="page" />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Products</span>
        <h1 className="display">
          Your product <em>shelf</em>
        </h1>
        <p className="lede">
          Save each product you create ads for. The packaging description is pasted into every shot the product appears in, so
          the bottle, label and colours never drift. Claude only makes the claims you list here.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="panel empty">
          <span className="icon-bubble"><Package size={24} strokeWidth={1.6} /></span>
          <h3>No products yet</h3>
          <p className="muted small">Add one below. A clear front-facing photo of the packaging works best.</p>
        </div>
      ) : (
        <div className="cards">
          {products.map((p) => (
            <article key={p.id} className="asset-card">
              <div className="asset-head">
                <span className="avatar" style={{ ["--art" as string]: artFor(p.id) }}><Package size={22} strokeWidth={1.6} /></span>
                <div className="stack tight grow">
                  <h3>{p.name}</h3>
                  <span className="faint small">{[p.brand, p.category].filter(Boolean).join(" · ")}</span>
                </div>
              </div>
              <p className="desc">{productAnchor(p)}</p>
              <div className="asset-actions">
                <CopyButton text={productSheetPrompt(p, bible)} label="Packshot prompt" />
                <button className="btn btn-ghost btn-sm" onClick={() => edit(p)}><Pencil size={14} /> Edit</button>
                <button className="btn btn-ghost btn-sm btn-danger" onClick={() => confirm(`Remove ${p.name}?`) && setProducts((prev) => prev.filter((x) => x.id !== p.id))}>
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="panel glow" id="product-editor">
        <div className="panel-head">
          <h3>{draft.id ? `Edit ${draft.name}` : "Add a product"}</h3>
          {draft.id && <button className="btn btn-ghost btn-sm" onClick={() => setDraft(EMPTY)}>Cancel</button>}
        </div>
        <div className="stack">
          <PhotoFill<{ name: string; brand: string; category: string; packaging: string }>
            kind="product"
            onResult={(r) => setDraft((d) => ({ ...d, name: d.name || r.name, brand: d.brand || r.brand, category: d.category || r.category, packaging: r.packaging }))}
          />
          <div className="grid-2">
            {FIELDS.map((f) => (
              <label key={f.key} className={`field ${f.long ? "span-2" : ""}`}>
                <span>{f.label} {f.hint && <span className="hint">({f.hint})</span>}</span>
                {f.long ? (
                  <textarea rows={3} value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                ) : (
                  <input value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <div className="row between">
            <span className="faint small">Only make ads for products you sell, own, or that a brand has hired you to promote.</span>
            <button className="btn btn-primary" onClick={save} disabled={!draft.name.trim() || !draft.packaging.trim()}>
              <Lock size={15} /> {draft.id ? "Save changes" : "Save product"}
            </button>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <div className="row end">
          <Link href="/ugc?new=1" className="btn btn-soft">Make a UGC ad <ArrowRight size={15} /></Link>
          <Link href="/commercial?new=1" className="btn btn-soft">Make a commercial <ArrowRight size={15} /></Link>
        </div>
      )}
    </div>
  );
}
