"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_BIBLE, store } from "./storage.ts";
import type { Character, Episode, Location, SeriesBible } from "./types.ts";

type Updater<T> = T | ((prev: T) => T);

/**
 * The member's saved studio: series look, cast, sets and episodes. Loaded from
 * browser storage on mount and written back on every change.
 */
export function useStudio() {
  const [loaded, setLoaded] = useState(false);
  const [bible, setBibleState] = useState<SeriesBible>(DEFAULT_BIBLE);
  const [characters, setCharactersState] = useState<Character[]>([]);
  const [locations, setLocationsState] = useState<Location[]>([]);
  const [episodes, setEpisodesState] = useState<Episode[]>([]);

  useEffect(() => {
    setBibleState(store.loadBible());
    setCharactersState(store.loadCharacters());
    setLocationsState(store.loadLocations());
    setEpisodesState(store.loadEpisodes());
    setLoaded(true);
  }, []);

  useEffect(() => { if (loaded) store.saveBible(bible); }, [bible, loaded]);
  useEffect(() => { if (loaded) store.saveCharacters(characters); }, [characters, loaded]);
  useEffect(() => { if (loaded) store.saveLocations(locations); }, [locations, loaded]);
  useEffect(() => { if (loaded) store.saveEpisodes(episodes); }, [episodes, loaded]);

  return {
    loaded,
    bible,
    setBible: useCallback((u: Updater<SeriesBible>) => setBibleState(u), []),
    characters,
    setCharacters: useCallback((u: Updater<Character[]>) => setCharactersState(u), []),
    locations,
    setLocations: useCallback((u: Updater<Location[]>) => setLocationsState(u), []),
    episodes,
    setEpisodes: useCallback((u: Updater<Episode[]>) => setEpisodesState(u), []),
  };
}

/** How far through the builder an episode is, 0-4. */
export function episodeProgress(e: Episode): number {
  const scenes = e.script?.scenes.length ?? 0;
  const allShots = scenes > 0 && e.shots.length >= scenes;
  return e.pkg && allShots ? 4 : allShots ? 3 : e.script ? 2 : e.concept ? 1 : 0;
}

export function episodeTitle(e: Episode): string {
  return e.script?.title || e.concept?.title || e.topic || "Untitled episode";
}
