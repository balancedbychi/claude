"use client";

import type { Character, Episode, Location, Product, SeriesBible, Shot } from "./types.ts";

// v1 keeps member data in their own browser. Swap these functions for a
// database (e.g. Supabase) when members need their work on multiple devices.

const KEYS = { bible: "eb_bible", characters: "eb_characters", locations: "eb_locations", products: "eb_products", episodes: "eb_episodes" } as const;

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
  loadLocations: () => read<Location[]>(KEYS.locations, []),
  saveLocations: (l: Location[]) => write(KEYS.locations, l),
  loadProducts: () => read<Product[]>(KEYS.products, []),
  saveProducts: (p: Product[]) => write(KEYS.products, p),
  loadEpisodes: () => read<Episode[]>(KEYS.episodes, []).map(upgradeEpisode),
  saveEpisodes: (e: Episode[]) => write(KEYS.episodes, e),
};

export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Fill fields added after v1 so older saved episodes keep working. */
function upgradeEpisode(ep: Episode): Episode {
  return {
    ...ep,
    kind: ep.kind ?? "episode",
    brief: ep.brief ?? null,
    script: ep.script && {
      ...ep.script,
      scenes: ep.script.scenes.map((s) => ({ ...s, locationId: s.locationId ?? "", onScreenText: s.onScreenText ?? "" })),
    },
    shots: ep.shots.map((sc) => ({
      ...sc,
      shots: sc.shots.map((sh: Shot & { prompt?: string }) => ({
        ...sh,
        productIds: sh.productIds ?? [],
        cameraMove: sh.cameraMove ?? "",
        imagePrompt: sh.imagePrompt ?? "",
        animationPrompt: sh.animationPrompt ?? sh.prompt ?? "",
        transition: sh.transition ?? "cut",
        startFrame: sh.startFrame ?? "",
        endFrame: sh.endFrame ?? "",
        continueFromPrevious: sh.continueFromPrevious ?? false,
      })),
    })),
  };
}
