"use client";

import { useState } from "react";
import { post } from "@/lib/client-api.ts";
import { locationSheetPrompt } from "@/lib/prompt-builder.ts";
import { newId } from "@/lib/storage.ts";
import type { Location, SeriesBible } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";
import { PhotoFill } from "./PhotoFill.tsx";

type Room = Omit<Location, "id" | "setName">;

const IDEAS = [
  "Modern luxury home in the Hollywood Hills: glass, white oak, infinity pool, city views",
  "Old-money Hamptons estate with a garden and a formal dining room",
  "Minimalist Tokyo apartment above a coffee shop",
  "High-end pilates and wellness studio in Miami",
];

const EMPTY_ROOM: Location = { id: "", setName: "", name: "", details: "", lighting: "" };

export function SetsStep(props: {
  bible: SeriesBible;
  locations: Location[];
  setLocations: (fn: (prev: Location[]) => Location[]) => void;
  onDone: () => void;
}) {
  const { bible, locations, setLocations } = props;
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
    setLocations((prev) =>
      draft.id ? prev.map((l) => (l.id === draft.id ? draft : l)) : [...prev, { ...draft, id: newId("loc") }],
    );
    setDraft(EMPTY_ROOM);
  }

  const sets = [...new Set(locations.map((l) => l.setName))];

  return (
    <section className="stack">
      <header>
        <h2>Build your sets</h2>
        <p className="muted">
          Describe a place your stories keep coming back to, like a luxury home, and get it designed room by room. Each locked room
          is pasted word-for-word into every shot filmed there, so the kitchen looks the same in every episode. Optional: skip this
          if your series doesn&apos;t have recurring places.
        </p>
      </header>

      <div className="card stack">
        <textarea rows={2} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Describe the property or place" />
        <div className="chips">
          {IDEAS.map((s) => (
            <button key={s} className="chip" onClick={() => setBrief(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="row">
          <label className="inline">
            Rooms
            <select value={roomCount} onChange={(e) => setRoomCount(Number(e.target.value))}>
              {[3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button className="primary" onClick={design} disabled={busy || brief.trim().length < 3}>
            {busy ? "Designing the set…" : "Design this set"}
          </button>
          {error && <span className="error">{error}</span>}
        </div>
      </div>

      {proposal && (
        <div className="card stack selected">
          <div className="row between">
            <label className="grow">
              Set name
              <input value={proposal.setName} onChange={(e) => setProposal({ ...proposal, setName: e.target.value })} />
            </label>
          </div>
          <p className="muted small">Review and edit before locking. Remove rooms you won&apos;t use.</p>
          {proposal.rooms.map((r, i) => {
            const update = (patch: Partial<Room>) =>
              setProposal({ ...proposal, rooms: proposal.rooms.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
            return (
              <div key={i} className="room-edit">
                <div className="row between">
                  <input className="room-name" value={r.name} onChange={(e) => update({ name: e.target.value })} />
                  <button className="ghost small danger" onClick={() => setProposal({ ...proposal, rooms: proposal.rooms.filter((_, j) => j !== i) })}>
                    Remove
                  </button>
                </div>
                <textarea rows={3} value={r.details} onChange={(e) => update({ details: e.target.value })} />
                <input value={r.lighting} onChange={(e) => update({ lighting: e.target.value })} placeholder="Default lighting" />
              </div>
            );
          })}
          <div className="row">
            <button className="primary" onClick={lockProposal} disabled={proposal.rooms.length === 0}>
              Lock {proposal.rooms.length} rooms
            </button>
            <button className="ghost" onClick={() => setProposal(null)}>Discard</button>
          </div>
        </div>
      )}

      {sets.map((setName) => (
        <div key={setName} className="stack">
          <h3>{setName || "Other places"}</h3>
          <div className="char-grid">
            {locations
              .filter((l) => l.setName === setName)
              .map((l) => (
                <div key={l.id} className="card char">
                  <div className="row between">
                    <strong>{l.name}</strong>
                    <span className="muted small">{l.lighting}</span>
                  </div>
                  <p className="small">{l.details}</p>
                  <div className="row">
                    <CopyButton text={locationSheetPrompt(l, bible)} label="Copy reference-image prompt" />
                    <button className="ghost small" onClick={() => setDraft(l)}>Edit</button>
                    <button className="ghost small danger" onClick={() => setLocations((prev) => prev.filter((x) => x.id !== l.id))}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h4>{draft.id ? `Edit ${draft.name}` : "Add a single room"}</h4>
        <PhotoFill<Room>
          kind="room"
          onResult={(r) => setDraft((d) => ({ ...d, name: d.name || r.name, details: r.details, lighting: r.lighting }))}
        />
        <div className="grid2">
          <label>
            Belongs to
            <input list="set-names" value={draft.setName} onChange={(e) => setDraft({ ...draft, setName: e.target.value })} placeholder="Hollywood Hills house" />
            <datalist id="set-names">
              {sets.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
          <label>
            Room or area
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Kitchen" />
          </label>
          <label className="span2">
            Fixed details (layout, materials, colours, furniture, window view)
            <textarea rows={3} value={draft.details} onChange={(e) => setDraft({ ...draft, details: e.target.value })} placeholder="Open-plan kitchen, 4m white Calacatta marble island with three brass pendant lights, matte black cabinetry, floor-to-ceiling windows onto the pool and city skyline" />
          </label>
          <label className="span2">
            Default lighting
            <input value={draft.lighting} onChange={(e) => setDraft({ ...draft, lighting: e.target.value })} placeholder="bright late-morning sun through the windows" />
          </label>
        </div>
        <div className="row">
          <button className="secondary" onClick={saveDraft} disabled={!draft.name.trim() || !draft.details.trim()}>
            {draft.id ? "Save changes" : "Lock room"}
          </button>
          {draft.id && <button className="ghost" onClick={() => setDraft(EMPTY_ROOM)}>Cancel</button>}
        </div>
      </div>

      <div className="row end">
        <button className="primary" onClick={props.onDone}>
          {locations.length ? "Next: pick a story →" : "Skip for now →"}
        </button>
      </div>
    </section>
  );
}
