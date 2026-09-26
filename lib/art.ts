// Soft pastel "artwork" for cards that don't have a real image yet.
// Deterministic per id, so a character or room keeps the same colours.

const PALETTES = [
  ["#fde6ef", "#f6a9c5"],
  ["#efe8fb", "#cbb8ee"],
  ["#fff1b8", "#f6d27a"],
  ["#dff3ef", "#9fd8cc"],
  ["#ffe4d6", "#f5b594"],
  ["#e5eefc", "#a9c3f0"],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function artFor(seed: string): string {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length];
  return `linear-gradient(${120 + (hash(seed + "a") % 60)}deg, ${a}, ${b})`;
}

/** A single pastel colour, for thin accents like storyboard frame strips. */
export function tintFor(seed: string): string {
  return PALETTES[hash(seed) % PALETTES.length][1];
}
