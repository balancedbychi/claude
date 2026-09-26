// Soft gradient "artwork" for cards that don't have a real image yet.
// Deterministic per id, so a character or room keeps the same colours.

const PALETTES = [
  ["#f4c3d4", "#9b5b8a"],
  ["#cdb3ff", "#5b4a9b"],
  ["#f2d9b3", "#9b6f4a"],
  ["#b3e0ff", "#4a6f9b"],
  ["#ffc9b3", "#9b4a5b"],
  ["#c3f4dc", "#4a8a73"],
  ["#e6b3ff", "#7a3f8f"],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function artFor(seed: string): string {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length];
  const angle = 110 + (hash(seed + "a") % 90);
  return `radial-gradient(120% 90% at 20% 10%, ${a}cc, transparent 60%), linear-gradient(${angle}deg, ${b}, #1b141d)`;
}
