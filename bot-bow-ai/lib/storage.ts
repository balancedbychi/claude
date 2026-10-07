"use client";

import type { Character, Episode, Location, Product, SeriesBible, Shot } from "./types.ts";

// Member data lives on the server (lib/use-studio.ts). This module keeps the
// defaults, id helper and upgrades for older saves, and reads work saved in
// the browser by versions before accounts, so it can be moved to the server
// once on first sign-in.

const KEYS = { bible: "eb_bible", characters: "eb_characters", locations: "eb_locations", products: "eb_products", episodes: "eb_episodes" } as const;
const IMPORTED = "eb_imported_to_account";

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

/** Work saved in this browser before accounts existed, if any and not already imported. */
export function readLocalStudio() {
  try {
    if (localStorage.getItem(IMPORTED)) return null;
  } catch {
    return null;
  }
  const local = {
    bible: read<SeriesBible>(KEYS.bible, DEFAULT_BIBLE),
    characters: read<Character[]>(KEYS.characters, []),
    locations: read<Location[]>(KEYS.locations, []),
    products: read<Product[]>(KEYS.products, []),
    episodes: read<Episode[]>(KEYS.episodes, []).map(upgradeEpisode),
  };
  const hasWork = local.characters.length || local.locations.length || local.products.length || local.episodes.length;
  return hasWork ? local : null;
}

export function markLocalImported(): void {
  try {
    localStorage.setItem(IMPORTED, new Date().toISOString());
  } catch {
    // Blocked storage: the import simply offers itself again next time.
  }
}

export function newId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Fill fields added after v1 so older saved episodes keep working. */
export function upgradeEpisode(ep: Episode): Episode {
  return {
    ...ep,
    kind: ep.kind ?? "episode",
    brief: ep.brief ?? null,
    concept: ep.concept && { ...ep.concept, hookStyle: ep.concept.hookStyle ?? "" },
    script: ep.script && {
      ...ep.script,
      hookStyle: ep.script.hookStyle ?? "",
      altHooks: ep.script.altHooks ?? [],
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
