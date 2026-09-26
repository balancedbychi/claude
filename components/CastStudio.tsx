"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, Pencil, Sparkles, Trash2, Users } from "lucide-react";
import { post } from "@/lib/client-api.ts";
import { artFor } from "@/lib/art.ts";
import { characterAnchor, characterSheetPrompt } from "@/lib/prompt-builder.ts";
import { newId } from "@/lib/storage.ts";
import type { Character, SeriesBible } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { CopyButton } from "./CopyButton.tsx";
import { PhotoFill } from "./PhotoFill.tsx";

const EMPTY: Omit<Character, "id"> = { name: "", role: "", age: "", look: "", wardrobe: "", voice: "", personality: "" };

const FIELDS: { key: keyof typeof EMPTY; label: string; placeholder: string; long?: boolean }[] = [
  { key: "name", label: "Name", placeholder: "Zara" },
  { key: "role", label: "Role", placeholder: "Lead, runs a wellness studio" },
  { key: "age", label: "Age", placeholder: "late 20s" },
  { key: "voice", label: "Voice", placeholder: "soft, warm, slightly raspy" },
  { key: "look", label: "Look: face, hair, skin, build", placeholder: "warm brown skin, long knotless braids to mid-back, light freckles, slim athletic build, hazel eyes", long: true },
  { key: "wardrobe", label: "Signature wardrobe", placeholder: "cream linen co-ord set, small gold hoop earrings, white sneakers", long: true },
  { key: "personality", label: "Personality", placeholder: "calm on the outside, secretly competitive", long: true },
];

export function CastStudio() {
  const { loaded, bible, setBible, characters, setCharacters } = useStudio();
  const [draft, setDraft] = useState<Character>({ id: "", ...EMPTY });
  const [idea, setIdea] = useState("");
  const [designing, setDesigning] = useState(false);
  const [designError, setDesignError] = useState("");

  async function designWithAI() {
    setDesigning(true);
    setDesignError("");
    try {
      const out = await post<Omit<Character, "id">>("/api/character", { idea, bible, existing: characters.map((c) => c.name) });
      setDraft((d) => ({ ...out, id: d.id }));
    } catch (e) {
      setDesignError((e as Error).message);
    } finally {
      setDesigning(false);
    }
  }

  function save() {
    if (!draft.name.trim() || !draft.look.trim()) return;
    setCharacters((prev) => (draft.id ? prev.map((c) => (c.id === draft.id ? draft : c)) : [...prev, { ...draft, id: newId("char") }]));
    setDraft({ id: "", ...EMPTY });
  }

  function edit(c: Character) {
    setDraft(c);
    document.getElementById("character-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!loaded) return <div className="page" />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Cast Studio</span>
        <h1 className="display">
          Create the <em>faces</em> of your brand
        </h1>
        <p className="lede">
          Design each character once. Their description is pasted word-for-word into every image prompt, so it&apos;s the same
          person in every shot, outfit and episode.
        </p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h3>Series look</h3>
          <span className="faint small">Applies to every character, set and shot</span>
        </div>
        <div className="grid-2">
          <label className="field">
            Series name
            <input value={bible.seriesName} onChange={(e) => setBible((b: SeriesBible) => ({ ...b, seriesName: e.target.value }))} placeholder="Soft Life Diaries" />
          </label>
          <label className="field">
            Niche
            <input value={bible.niche} onChange={(e) => setBible((b: SeriesBible) => ({ ...b, niche: e.target.value }))} placeholder="wellness, luxury lifestyle, relationship drama" />
          </label>
          <label className="field span-2">
            Visual style
            <input value={bible.visualStyle} onChange={(e) => setBible((b: SeriesBible) => ({ ...b, visualStyle: e.target.value }))} />
          </label>
          <label className="field">
            General setting <span className="hint">(used when a scene isn&apos;t in a designed set)</span>
            <input value={bible.setting} onChange={(e) => setBible((b: SeriesBible) => ({ ...b, setting: e.target.value }))} placeholder="Los Angeles, present day" />
          </label>
          <label className="field">
            Format
            <select value={bible.aspectRatio} onChange={(e) => setBible((b: SeriesBible) => ({ ...b, aspectRatio: e.target.value as SeriesBible["aspectRatio"] }))}>
              <option value="9:16">9:16 vertical (TikTok, Reels, Shorts)</option>
              <option value="16:9">16:9 horizontal (YouTube)</option>
              <option value="1:1">1:1 square</option>
            </select>
          </label>
        </div>
      </section>

      <section className="stack">
        <div className="row between">
          <h2 className="display">Your cast</h2>
          {characters.length > 0 && (
            <Link href="/sets" className="btn btn-ghost btn-sm">
              Next: design your sets <ArrowRight size={14} />
            </Link>
          )}
        </div>
        {characters.length === 0 ? (
          <div className="panel empty">
            <span className="icon-bubble"><Users size={24} strokeWidth={1.6} /></span>
            <h3>No characters yet</h3>
            <p className="muted small">Add your first character below, or start from a photo.</p>
          </div>
        ) : (
          <div className="cards">
            {characters.map((c) => (
              <article key={c.id} className="asset-card">
                <div className="asset-head">
                  <span className="avatar" style={{ ["--art" as string]: artFor(c.id) }}>{c.name.slice(0, 1)}</span>
                  <div className="stack tight grow">
                    <h3>{c.name}</h3>
                    <span className="faint small">{[c.role, c.age].filter(Boolean).join(" · ")}</span>
                  </div>
                </div>
                <p className="desc">{characterAnchor(c)}</p>
                <div className="asset-actions">
                  <CopyButton text={characterSheetPrompt(c, bible)} label="Reference prompt" />
                  <button className="btn btn-ghost btn-sm" onClick={() => edit(c)}><Pencil size={14} /> Edit</button>
                  <button className="btn btn-ghost btn-sm btn-danger" onClick={() => confirm(`Remove ${c.name}?`) && setCharacters((prev) => prev.filter((x) => x.id !== c.id))}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel glow" id="character-editor">
        <div className="panel-head">
          <h3>{draft.id ? `Edit ${draft.name}` : "Add a character"}</h3>
          {draft.id && <button className="btn btn-ghost btn-sm" onClick={() => setDraft({ id: "", ...EMPTY })}>Cancel</button>}
        </div>
        <div className="stack">
          <div className="upload-zone">
            <span className="placeholder"><Sparkles size={22} strokeWidth={1.6} /></span>
            <div className="stack tight grow">
              <strong className="small">Design with AI</strong>
              <div className="row nowrap">
                <input className="grow" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="e.g. a confident Nigerian-British skincare girl who left her corporate job" />
                <button type="button" className="btn btn-soft btn-sm" onClick={designWithAI} disabled={designing || idea.trim().length < 2}>
                  {designing ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />}
                  {designing ? "Designing…" : "Design"}
                </button>
              </div>
              {designError && <span className="error small">{designError}</span>}
            </div>
          </div>
          <PhotoFill<{ age: string; look: string; wardrobe: string }>
            kind="character"
            onResult={(r) => setDraft((d) => ({ ...d, age: d.age || r.age, look: r.look, wardrobe: r.wardrobe }))}
          />
          <div className="grid-2">
            {FIELDS.map((f) => (
              <label key={f.key} className={`field ${f.long ? "span-2" : ""}`}>
                {f.label}
                {f.long ? (
                  <textarea rows={2} value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                ) : (
                  <input value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <div className="row between">
            <span className="faint small">Be specific: &ldquo;long knotless braids to mid-back&rdquo; stays consistent; &ldquo;nice hair&rdquo; doesn&apos;t.</span>
            <button className="btn btn-primary" onClick={save} disabled={!draft.name.trim() || !draft.look.trim()}>
              <Lock size={15} /> {draft.id ? "Save changes" : "Lock character"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
