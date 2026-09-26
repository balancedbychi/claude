import type { Episode } from "./types.ts";

// What a winning project contributes to the community pool: its hook and the
// opening of its script, as an anonymous example for the AI to learn from.

/** The opening line the project was written with. */
export function mainHook(p: Episode): string {
  if (p.kind === "episode" && p.concept?.hook) return p.concept.hook;
  const first = p.script?.scenes[0];
  return first?.lines[0]?.text || first?.onScreenText || p.concept?.hook || "";
}

/** Every opening a member might have posted: the main hook plus the alternatives. */
export function hookOptions(p: Episode): string[] {
  return [...new Set([mainHook(p), ...(p.script?.altHooks ?? [])].filter(Boolean))];
}

/** The first beats of the script, compact enough to use as an example. */
export function scriptExcerpt(p: Episode, maxScenes = 4, maxChars = 700): string {
  const parts = (p.script?.scenes ?? []).slice(0, maxScenes).map((s) => {
    const line = s.lines[0] ? ` "${s.lines[0].text}"` : "";
    const ost = s.onScreenText ? ` [on screen: ${s.onScreenText}]` : "";
    return `${s.title} (${s.durationSeconds}s): ${s.action}${ost}${line}`;
  });
  const text = parts.join(" → ");
  return text.length > maxChars ? `${text.slice(0, maxChars - 1)}…` : text;
}
