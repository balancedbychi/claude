"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useStudio } from "@/lib/use-studio.ts";
import { VAULT, VAULT_CATEGORIES, fillPrompt } from "@/lib/vault.ts";
import { CopyButton } from "./CopyButton.tsx";

export function PromptVault() {
  const { loaded, characters, products, locations } = useStudio();
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [productId, setProductId] = useState("");
  const [locationId, setLocationId] = useState("");

  // "Name (description)" reads naturally mid-sentence in any template.
  const c = characters.find((x) => x.id === characterId);
  const p = products.find((x) => x.id === productId);
  const l = locations.find((x) => x.id === locationId);
  const fill = {
    character: c && `${c.name} (${[c.age, c.look, c.wardrobe && `wearing ${c.wardrobe}`].filter(Boolean).join("; ")})`,
    product: p && `${[p.brand, p.name].filter(Boolean).join(" ")} (${p.packaging})`,
    set: l && `the ${l.name.toLowerCase()} (${l.details})`,
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VAULT.filter(
      (v) => (category === "All" || v.category === category) && (!q || `${v.title} ${v.prompt} ${v.category}`.toLowerCase().includes(q)),
    );
  }, [category, query]);

  if (!loaded) return <div className="page" />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Prompt Vault</span>
        <h1 className="display">
          Proven prompts, <em>ready</em> to copy
        </h1>
        <p className="lede">
          Image prompts, animation prompts, camera moves and looks. Pick a character, product or set from your library and it&apos;s
          written into every prompt for you.
        </p>
      </header>

      <section className="panel stack">
        <div className="grid-3">
          <label className="field">
            Character
            <select value={characterId} onChange={(e) => setCharacterId(e.target.value)}>
              <option value="">Generic</option>
              {characters.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="field">
            Product
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">Generic</option>
              {products.map((p) => <option key={p.id} value={p.id}>{[p.brand, p.name].filter(Boolean).join(" ")}</option>)}
            </select>
          </label>
          <label className="field">
            Set
            <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
              <option value="">Generic</option>
              {locations.map((l) => <option key={l.id} value={l.id}>{l.setName ? `${l.setName} · ` : ""}{l.name}</option>)}
            </select>
          </label>
        </div>
        <div className="search">
          <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search prompts: pool, lipstick, whip pan…" />
        </div>
        <div className="chips">
          {["All", ...VAULT_CATEGORIES].map((c) => (
            <button key={c} className={`chip ${category === c ? "selected" : ""}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </section>

      {shown.length === 0 ? (
        <p className="faint">No prompts match that search.</p>
      ) : (
        <div className="vault-grid">
          {shown.map((v) => {
            const text = fillPrompt(v.prompt, fill);
            return (
              <article key={v.id} className="asset-card">
                <div className="row between nowrap">
                  <h3>{v.title}</h3>
                  <span className={`tag ${v.type === "Image" ? "outline-accent" : ""}`}>{v.type}</span>
                </div>
                <span className="faint tiny">{v.category}</span>
                <pre className="prompt">{text}</pre>
                <div className="asset-actions">
                  <CopyButton text={text} label="Copy prompt" />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
