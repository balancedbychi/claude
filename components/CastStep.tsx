"use client";

import { useState } from "react";
import { newId } from "@/lib/storage.ts";
import { characterAnchor, characterSheetPrompt } from "@/lib/prompt-builder.ts";
import type { Character, SeriesBible } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";

const EMPTY: Omit<Character, "id"> = { name: "", role: "", age: "", look: "", wardrobe: "", voice: "", personality: "" };

const FIELDS: { key: keyof typeof EMPTY; label: string; placeholder: string; long?: boolean }[] = [
  { key: "name", label: "Name", placeholder: "Zara" },
  { key: "role", label: "Role in the story", placeholder: "Lead, runs a wellness studio" },
  { key: "age", label: "Age", placeholder: "late 20s" },
  { key: "look", label: "Look (face, hair, skin, build)", placeholder: "warm brown skin, long knotless braids, light freckles, slim athletic build, hazel eyes", long: true },
  { key: "wardrobe", label: "Signature wardrobe", placeholder: "cream linen co-ord set, small gold hoop earrings, white sneakers", long: true },
  { key: "voice", label: "Voice", placeholder: "soft, warm, slightly raspy, American accent" },
  { key: "personality", label: "Personality", placeholder: "calm on the outside, secretly competitive" },
];

export function CastStep(props: {
  bible: SeriesBible;
  setBible: (b: SeriesBible) => void;
  characters: Character[];
  setCharacters: (c: Character[]) => void;
  onDone: () => void;
}) {
  const { bible, setBible, characters, setCharacters } = props;
  const [draft, setDraft] = useState<Character>({ id: "", ...EMPTY });

  function saveDraft() {
    if (!draft.name.trim() || !draft.look.trim()) return;
    if (draft.id) {
      setCharacters(characters.map((c) => (c.id === draft.id ? draft : c)));
    } else {
      setCharacters([...characters, { ...draft, id: newId("char") }]);
    }
    setDraft({ id: "", ...EMPTY });
  }

  return (
    <section className="stack">
      <header>
        <h2>Set up your series</h2>
        <p className="muted">
          Do this once. Everything here is inserted word-for-word into every scene prompt, so your characters look the same in
          every clip.
        </p>
      </header>

      <div className="card grid2">
        <label>
          Series name
          <input value={bible.seriesName} onChange={(e) => setBible({ ...bible, seriesName: e.target.value })} placeholder="Soft Life Diaries" />
        </label>
        <label>
          Niche
          <input value={bible.niche} onChange={(e) => setBible({ ...bible, niche: e.target.value })} placeholder="wellness, glow-up, relationship drama" />
        </label>
        <label className="span2">
          Visual style
          <input value={bible.visualStyle} onChange={(e) => setBible({ ...bible, visualStyle: e.target.value })} />
        </label>
        <label className="span2">
          Recurring setting
          <input value={bible.setting} onChange={(e) => setBible({ ...bible, setting: e.target.value })} placeholder="a sunlit Los Angeles apartment and a boutique pilates studio" />
        </label>
        <label>
          Format
          <select value={bible.aspectRatio} onChange={(e) => setBible({ ...bible, aspectRatio: e.target.value as SeriesBible["aspectRatio"] })}>
            <option value="9:16">9:16 vertical (TikTok, Reels, Shorts)</option>
            <option value="16:9">16:9 horizontal (YouTube)</option>
            <option value="1:1">1:1 square</option>
          </select>
        </label>
      </div>

      <h3>Characters</h3>
      {characters.length === 0 && <p className="muted">Add at least one recurring character.</p>}
      <div className="char-grid">
        {characters.map((c) => (
          <div key={c.id} className="card char">
            <div className="row between">
              <strong>{c.name}</strong>
              <span className="muted small">{c.role}</span>
            </div>
            <p className="small">{characterAnchor(c)}</p>
            <div className="row">
              <CopyButton text={characterSheetPrompt(c, bible)} label="Copy reference-image prompt" />
              <button className="ghost small" onClick={() => setDraft(c)}>Edit</button>
              <button className="ghost small danger" onClick={() => setCharacters(characters.filter((x) => x.id !== c.id))}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h4>{draft.id ? `Edit ${draft.name}` : "Add a character"}</h4>
        <div className="grid2">
          {FIELDS.map((f) => (
            <label key={f.key} className={f.long ? "span2" : ""}>
              {f.label}
              {f.long ? (
                <textarea rows={2} value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
              ) : (
                <input value={draft[f.key]} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
              )}
            </label>
          ))}
        </div>
        <p className="muted small">Be specific. &ldquo;Long knotless braids to mid-back&rdquo; stays consistent; &ldquo;nice hair&rdquo; doesn&apos;t.</p>
        <div className="row">
          <button className="secondary" onClick={saveDraft} disabled={!draft.name.trim() || !draft.look.trim()}>
            {draft.id ? "Save changes" : "Lock character"}
          </button>
          {draft.id && <button className="ghost" onClick={() => setDraft({ id: "", ...EMPTY })}>Cancel</button>}
        </div>
      </div>

      <div className="row end">
        <button className="primary" onClick={props.onDone} disabled={characters.length === 0}>
          Next: pick a story →
        </button>
      </div>
    </section>
  );
}
