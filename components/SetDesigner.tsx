"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, Pencil, Sofa, Trash2, Wand2, X } from "lucide-react";
import { artFor } from "@/lib/art.ts";
import { post } from "@/lib/client-api.ts";
import { locationSheetPrompt } from "@/lib/prompt-builder.ts";
import { newId } from "@/lib/storage.ts";
import type { Location } from "@/lib/types.ts";
import { useStudio } from "@/lib/use-studio.ts";
import { CopyButton } from "./CopyButton.tsx";
import { PhotoFill } from "./PhotoFill.tsx";

type Room = Omit<Location, "id" | "setName">;

const IDEAS = [
  "Modern luxury home in the Hollywood Hills: glass, white oak, infinity pool, city views",
  "Cream-and-gold luxury penthouse in Miami with a walk-in wardrobe and beauty vanity",
  "Old-money Hamptons estate with a garden and a formal dining room",
  "High-end pilates and wellness studio",
];

const EMPTY_ROOM: Location = { id: "", setName: "", name: "", details: "", lighting: "" };

export function SetDesigner() {
  const { loaded, bible, locations, setLocations } = useStudio();
  const [brief, setBrief] = useState("");
  const [roomCount, setRoomCount] = useState(6);
  const [proposal, setProposal] = useState<{ setName: string; rooms: Room[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Location>(EMPTY_ROOM);

  async function design() {
    setBusy(true);
    setError("");
    try {
      setProposal(await post<{ setName: string; rooms: Room[] }>("/api/sets", { brief, bible, roomCount }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function lockProposal() {
    if (!proposal) return;
    const rooms = proposal.rooms.map((r) => ({ ...r, id: newId("loc"), setName: proposal.setName }));
    setLocations((prev) => [...prev, ...rooms]);
    setProposal(null);
    setBrief("");
  }

  function saveDraft() {
    if (!draft.name.trim() || !draft.details.trim()) return;
    setLocations((prev) => (draft.id ? prev.map((l) => (l.id === draft.id ? draft : l)) : [...prev, { ...draft, id: newId("loc") }]));
    setDraft(EMPTY_ROOM);
  }

  function edit(l: Location) {
    setDraft(l);
    document.getElementById("room-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!loaded) return <div className="page" />;
  const sets = [...new Set(locations.map((l) => l.setName))];

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Set Designer</span>
        <h1 className="display">
          Design a <em>world</em> that never changes
        </h1>
        <p className="lede">
          Describe a place your stories return to and get it designed room by room. Every room is pasted word-for-word into each
          shot filmed there, so the kitchen looks the same in scene 1 and episode 12.
        </p>
      </header>

      <section className="panel glow stack">
        <label className="field">
          Describe the property or place
          <textarea rows={2} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="A modern luxury home in the Hollywood Hills…" />
        </label>
        <div className="chips">
          {IDEAS.map((s) => (
            <button key={s} className="chip" onClick={() => setBrief(s)}>{s}</button>
          ))}
        </div>
        <div className="row between">
          <label className="inline-field">
            Rooms
            <select value={roomCount} onChange={(e) => setRoomCount(Number(e.target.value))}>
              {[3, 4, 5, 6, 8, 10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <div className="row">
            {error && <span className="error">{error}</span>}
            <button className="btn btn-primary" onClick={design} disabled={busy || brief.trim().length < 3}>
              {busy ? <Loader2 size={16} className="spin" /> : <Wand2 size={16} />}
              {busy ? "Designing…" : "Design this set"}
            </button>
          </div>
        </div>
      </section>

      {proposal && (
        <section className="panel stack">
          <div className="panel-head" style={{ marginBottom: 0 }}>
            <label className="field grow">
              Set name
              <input value={proposal.setName} onChange={(e) => setProposal({ ...proposal, setName: e.target.value })} />
            </label>
          </div>
          <p className="faint small">Review and tweak before locking. Remove any rooms you won&apos;t use.</p>
          <div className="cards">
            {proposal.rooms.map((r, i) => {
              const update = (patch: Partial<Room>) => setProposal({ ...proposal, rooms: proposal.rooms.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
              return (
                <div key={i} className="asset-card">
                  <div className="row between nowrap">
                    <input value={r.name} onChange={(e) => update({ name: e.target.value })} style={{ fontWeight: 700 }} />
                    <button className="btn btn-ghost btn-sm" title="Remove room" onClick={() => setProposal({ ...proposal, rooms: proposal.rooms.filter((_, j) => j !== i) })}>
                      <X size={15} />
                    </button>
                  </div>
                  <textarea rows={5} value={r.details} onChange={(e) => update({ details: e.target.value })} />
                  <input value={r.lighting} onChange={(e) => update({ lighting: e.target.value })} placeholder="Default lighting" />
                </div>
              );
            })}
          </div>
          <div className="row end">
            <button className="btn btn-ghost" onClick={() => setProposal(null)}>Discard</button>
            <button className="btn btn-primary" onClick={lockProposal} disabled={proposal.rooms.length === 0}>
              <Lock size={15} /> Lock {proposal.rooms.length} rooms
            </button>
          </div>
        </section>
      )}

      {sets.length === 0 && !proposal ? (
        <div className="panel empty">
          <span className="icon-bubble"><Sofa size={24} strokeWidth={1.6} /></span>
          <h3>No sets yet</h3>
          <p className="muted small">Design one above, or skip this if your series has no recurring places.</p>
        </div>
      ) : (
        sets.map((setName) => (
          <section key={setName} className="stack">
            <div className="set-group-head">
              <h3>{setName || "Other places"}</h3>
              <span className="faint small">{locations.filter((l) => l.setName === setName).length} rooms</span>
            </div>
            <div className="cards">
              {locations
                .filter((l) => l.setName === setName)
                .map((l) => (
                  <article key={l.id} className="asset-card">
                    <div className="room-swatch" style={{ ["--art" as string]: artFor(l.id) }}>
                      <span className="tag">{l.lighting || "Default light"}</span>
                    </div>
                    <h3>{l.name}</h3>
                    <p className="desc">{l.details}</p>
                    <div className="asset-actions">
                      <CopyButton text={locationSheetPrompt(l, bible)} label="Reference prompt" />
                      <button className="btn btn-ghost btn-sm" onClick={() => edit(l)}><Pencil size={14} /> Edit</button>
                      <button className="btn btn-ghost btn-sm btn-danger" onClick={() => confirm(`Remove ${l.name}?`) && setLocations((prev) => prev.filter((x) => x.id !== l.id))}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))
      )}

      <section className="panel" id="room-editor">
        <div className="panel-head">
          <h3>{draft.id ? `Edit ${draft.name}` : "Add a single room"}</h3>
          {draft.id && <button className="btn btn-ghost btn-sm" onClick={() => setDraft(EMPTY_ROOM)}>Cancel</button>}
        </div>
        <div className="stack">
          <PhotoFill<Room> kind="room" onResult={(r) => setDraft((d) => ({ ...d, name: d.name || r.name, details: r.details, lighting: r.lighting }))} />
          <div className="grid-2">
            <label className="field">
              Belongs to
              <input list="set-names" value={draft.setName} onChange={(e) => setDraft({ ...draft, setName: e.target.value })} placeholder="Hollywood Hills house" />
              <datalist id="set-names">{sets.map((s) => <option key={s} value={s} />)}</datalist>
            </label>
            <label className="field">
              Room or area
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Kitchen" />
            </label>
            <label className="field span-2">
              Fixed details <span className="hint">(layout, materials, colours, furniture, window view)</span>
              <textarea rows={3} value={draft.details} onChange={(e) => setDraft({ ...draft, details: e.target.value })} placeholder="Open-plan kitchen, 4m white Calacatta marble island with three brass pendant lights, matte black cabinetry, floor-to-ceiling windows onto the pool and city skyline" />
            </label>
            <label className="field span-2">
              Default lighting
              <input value={draft.lighting} onChange={(e) => setDraft({ ...draft, lighting: e.target.value })} placeholder="bright late-morning sun through the windows" />
            </label>
          </div>
          <div className="row end">
            <button className="btn btn-primary" onClick={saveDraft} disabled={!draft.name.trim() || !draft.details.trim()}>
              <Lock size={15} /> {draft.id ? "Save changes" : "Lock room"}
            </button>
          </div>
        </div>
      </section>

      <div className="row end">
        <Link href="/builder?new=1" className="btn btn-soft">
          Start an episode <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
