"use client";

import type { Character, Episode, SeriesBible } from "./types.ts";

// v1 keeps member data in their own browser. Swap these three functions for a
// database (e.g. Supabase) when members need their work on multiple devices.

const KEYS = { bible: "eb_bible", characters: "eb_characters", episodes: "eb_episodes" } as const;

export const DEFAULT_BIBLE: SeriesBible = {
  seriesName: "",
  niche: "",
  visualStyle: "cinematic, photorealistic, soft film grain, shallow depth of field",
  setting: "",
  aspectRatio: "9:16",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked (private mode). The session still works in memory.
  }
}

export const store = {
  loadBible: () => read<SeriesBible>(KEYS.bible, DEFAULT_BIBLE),
  saveBible: (b: SeriesBible) => write(KEYS.bible, b),
  loadCharacters: () => read<Character[]>(KEYS.characters, []),
  saveCharacters: (c: Character[]) => write(KEYS.characters, c),
  loadEpisodes: () => read<Episode[]>(KEYS.episodes, []),
  saveEpisodes: (e: Episode[]) => write(KEYS.episodes, e),
};

export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
