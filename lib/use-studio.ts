"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_BIBLE, readLocalStudio, markLocalImported, upgradeEpisode } from "./storage.ts";
import { DEFAULT_PRICING, type PriceBook } from "./pricing.ts";
import type { Character, Episode, Location, Product, SeriesBible } from "./types.ts";

type Updater<T> = T | ((prev: T) => T);
type Library = { bible: SeriesBible; characters: Character[]; locations: Location[]; products: Product[] };

const SAVE_DELAY = 600;

function reportSave(ok: boolean) {
  window.dispatchEvent(new Event(ok ? "studio:saved" : "studio:save-error"));
}

async function send(url: string, method: "PUT" | "DELETE", body?: unknown): Promise<void> {
  try {
    const res = await fetch(url, {
      method,
      keepalive: JSON.stringify(body ?? "").length < 60_000, // lets small saves finish after the page closes
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) window.location.href = "/login";
    reportSave(res.ok);
  } catch {
    reportSave(false);
  }
}

/**
 * The member's studio (series look, cast, sets, products and projects),
 * loaded from the server once and saved back shortly after every change.
 * Held by <StudioProvider> in the studio layout, so it survives navigation
 * between pages and a save in flight is never overwritten by a reload.
 */
function useStudioState() {
  const [loaded, setLoaded] = useState(false);
  const [bible, setBibleState] = useState<SeriesBible>(DEFAULT_BIBLE);
  const [characters, setCharactersState] = useState<Character[]>([]);
  const [locations, setLocationsState] = useState<Location[]>([]);
  const [products, setProductsState] = useState<Product[]>([]);
  const [episodes, setEpisodesState] = useState<Episode[]>([]);
  const [pricing, setPricing] = useState<PriceBook>(DEFAULT_PRICING);

  // What the server last had, so only real changes are sent.
  const saved = useRef<{ lib: Partial<Library>; projects: Map<string, Episode> }>({ lib: {}, projects: new Map() });
  const pending = useRef(new Map<string, { timer: ReturnType<typeof setTimeout>; run: () => void }>());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/studio");
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = (await res.json()) as { bible: SeriesBible | null } & Omit<Library, "bible"> & { projects: Episode[]; pricing?: PriceBook };
      let lib: Library = { bible: data.bible ?? DEFAULT_BIBLE, characters: data.characters, locations: data.locations, products: data.products };
      let projects = data.projects.map(upgradeEpisode);

      // First sign-in on a browser that has work from before accounts existed: bring it over.
      const serverEmpty = !data.bible && !lib.characters.length && !lib.locations.length && !lib.products.length && !projects.length;
      const local = serverEmpty ? readLocalStudio() : null;
      if (local) {
        lib = { bible: local.bible, characters: local.characters, locations: local.locations, products: local.products };
        projects = local.episodes;
        await send("/api/studio", "PUT", lib);
        await Promise.all(projects.map((p) => send(`/api/projects/${encodeURIComponent(p.id)}`, "PUT", p)));
        markLocalImported();
      }

      if (cancelled) return;
      saved.current = { lib: { ...lib }, projects: new Map(projects.map((p) => [p.id, p])) };
      setBibleState(lib.bible);
      setCharactersState(lib.characters);
      setLocationsState(lib.locations);
      setProductsState(lib.products);
      setEpisodesState(projects);
      if (data.pricing) setPricing(data.pricing);
      setLoaded(true);
    })().catch(() => reportSave(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const debounce = useCallback((key: string, fn: () => void) => {
    clearTimeout(pending.current.get(key)?.timer);
    const run = () => {
      pending.current.delete(key);
      fn();
    };
    pending.current.set(key, { timer: setTimeout(run, SAVE_DELAY), run });
  }, []);

  // Leaving or reloading the page: send anything still waiting right away
  // (small saves use keepalive, so they complete after the page is gone).
  useEffect(() => {
    const flush = () => {
      for (const { timer, run } of [...pending.current.values()]) {
        clearTimeout(timer);
        run();
      }
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  // Library collections: save the ones that changed.
  useEffect(() => {
    if (!loaded) return;
    const current: Library = { bible, characters, locations, products };
    (Object.keys(current) as (keyof Library)[]).forEach((key) => {
      if (saved.current.lib[key] === current[key]) return;
      saved.current.lib = { ...saved.current.lib, [key]: current[key] };
      debounce(`lib:${key}`, () => send("/api/studio", "PUT", { [key]: current[key] }));
    });
  }, [bible, characters, locations, products, loaded, debounce]);

  // Projects: save changed ones, delete removed ones.
  useEffect(() => {
    if (!loaded) return;
    const prev = saved.current.projects;
    const next = new Map(episodes.map((e) => [e.id, e]));
    for (const [id, ep] of next) {
      if (prev.get(id) !== ep) debounce(`p:${id}`, () => send(`/api/projects/${encodeURIComponent(id)}`, "PUT", ep));
    }
    for (const id of prev.keys()) {
      if (!next.has(id)) {
        clearTimeout(pending.current.get(`p:${id}`)?.timer);
        pending.current.delete(`p:${id}`);
        send(`/api/projects/${encodeURIComponent(id)}`, "DELETE");
      }
    }
    saved.current.projects = next;
  }, [episodes, loaded, debounce]);

  return {
    loaded,
    /** Higgsfield price book for cost and time estimates (read-only; the admin edits it). */
    pricing,
    bible,
    setBible: useCallback((u: Updater<SeriesBible>) => setBibleState(u), []),
    characters,
    setCharacters: useCallback((u: Updater<Character[]>) => setCharactersState(u), []),
    locations,
    setLocations: useCallback((u: Updater<Location[]>) => setLocationsState(u), []),
    products,
    setProducts: useCallback((u: Updater<Product[]>) => setProductsState(u), []),
    episodes,
    setEpisodes: useCallback((u: Updater<Episode[]>) => setEpisodesState(u), []),
  };
}

type StudioState = ReturnType<typeof useStudioState>;
const StudioContext = createContext<StudioState | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  return createElement(StudioContext.Provider, { value: useStudioState() }, children);
}

export function useStudio(): StudioState {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside <StudioProvider>.");
  return ctx;
}

/** How far through the builder a project is, 0-4. */
export function episodeProgress(e: Episode): number {
  const scenes = e.script?.scenes.length ?? 0;
  const allShots = scenes > 0 && e.shots.length >= scenes;
  return e.pkg && allShots ? 4 : allShots ? 3 : e.script ? 2 : e.concept || e.brief ? 1 : 0;
}

export function episodeTitle(e: Episode): string {
  return e.script?.title || e.concept?.title || e.topic || (e.kind === "episode" ? "Untitled episode" : "Untitled");
}
