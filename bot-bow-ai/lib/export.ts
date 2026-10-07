import { clipName, fmtClock, sceneLength, timeline } from "./edit-guide.ts";
import { characterAnchor, characterSheetPrompt, locationAnchor, locationSheetPrompt, productAnchor, productSheetPrompt } from "./prompt-builder.ts";
import type { Character, Episode, Location, Product, SeriesBible } from "./types.ts";

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** The full episode pack as Markdown, for download or pasting into Notion. */
export function episodeToMarkdown(
  ep: Episode,
  characters: Character[],
  bible: SeriesBible,
  locations: Location[] = [],
  products: Product[] = [],
): string {
  const out: string[] = [];
  const title = ep.script?.title || ep.concept?.title || "Untitled episode";
  out.push(`# ${bible.seriesName ? `${bible.seriesName}: ` : ""}${title}`, "");

  if (ep.concept) {
    const style = ep.concept.hookStyle ? ` (${ep.concept.hookStyle})` : "";
    out.push("## Concept", "", `**Logline:** ${ep.concept.logline}`, "", `**Hook:** ${ep.concept.hook}${style}`, "");
  }

  if (characters.length > 0) {
    out.push("## Character sheets", "");
    for (const c of characters) {
      out.push(`### ${c.name}`, "", characterAnchor(c), "");
      if (c.voice) out.push(`Voice: ${c.voice}`, "");
      out.push("Reference image prompt:", "", "```", characterSheetPrompt(c, bible), "```", "");
    }
  }

  const usedSets = locations.filter((l) => ep.script?.scenes.some((s) => s.locationId === l.id));
  if (usedSets.length > 0) {
    out.push("## Sets", "");
    for (const l of usedSets) {
      out.push(`### ${l.setName ? `${l.setName}: ` : ""}${l.name}`, "", locationAnchor(l), "");
      out.push("Reference image prompt:", "", "```", locationSheetPrompt(l, bible), "```", "");
    }
  }

  const usedProducts = products.filter(
    (p) => p.id === ep.brief?.productId || ep.shots.some((sc) => sc.shots.some((sh) => sh.productIds.includes(p.id))),
  );
  if (usedProducts.length > 0) {
    out.push("## Products", "");
    for (const p of usedProducts) {
      out.push(`### ${[p.brand, p.name].filter(Boolean).join(" ")}`, "", productAnchor(p), "");
      if (p.benefits) out.push(`Claims: ${p.benefits}`, "");
      out.push("Packshot prompt:", "", "```", productSheetPrompt(p, bible), "```", "");
    }
  }

  if (ep.script && ep.script.altHooks.length > 0) {
    out.push(`## Alternative hooks to test${ep.script.hookStyle ? ` (main hook: ${ep.script.hookStyle})` : ""}`, "");
    ep.script.altHooks.forEach((h) => out.push(`- ${h}`));
    out.push("");
  }

  if (ep.script) {
    const total = ep.script.scenes.reduce((n, s) => n + sceneLength(ep, s), 0);
    out.push(`## Script (${fmt(total)})`, "");
    let t = 0;
    for (const s of ep.script.scenes) {
      const len = sceneLength(ep, s);
      out.push(`### Scene ${s.number}: ${s.title} [${fmt(t)}–${fmt(t + len)}]`, "");
      out.push(`*${s.location}.* ${s.action}`, "");
      if (s.onScreenText) out.push(`On screen: **${s.onScreenText}**`, "");
      for (const l of s.lines) out.push(`**${l.speaker}:** ${l.text}  `);
      out.push("");
      t += len;

      const shots = ep.shots.find((x) => x.sceneNumber === s.number);
      if (shots) {
        for (const shot of shots.shots) {
          const how = shot.continueFromPrevious ? " · start from previous clip's last frame" : "";
          out.push(`#### ${clipName(s.number, shot.number)} (${shot.durationSeconds}s · ${shot.transition || "cut"}${how})`, "");
          if (!shot.continueFromPrevious && shot.imagePrompt) out.push("Image prompt:", "", "```", shot.imagePrompt, "```", "");
          out.push("Animation prompt:", "", "```", shot.animationPrompt, "```", "");
        }
      }
    }
  }

  const rows = timeline(ep);
  if (rows.length > 0) {
    out.push("## Edit guide", "", "Name each downloaded clip by its code, drop them on the timeline in this order, then import the captions file.", "");
    out.push("| Clip | Starts | Length | Transition in | On screen | Voiceover |", "|---|---|---|---|---|---|");
    for (const r of rows) {
      const how = r.continueFromPrevious ? `${r.transition} (from last frame)` : r.transition;
      out.push(`| ${r.clip} | ${fmtClock(r.start)} | ${r.duration}s | ${how} | ${r.onScreenText.replace(/\|/g, "/")} | ${r.voiceover.replace(/\|/g, "/")} |`);
    }
    out.push("");
  }

  if (ep.pkg) {
    out.push("## Posting package", "", "**Title options**", "");
    ep.pkg.titles.forEach((t, i) => out.push(`${i + 1}. ${t}`));
    out.push("", "**Description**", "", ep.pkg.description, "", "**Hashtags**", "", ep.pkg.hashtags.join(" "), "");
    out.push("**Thumbnail**", "", ep.pkg.thumbnail.concept, "", `Text overlay: "${ep.pkg.thumbnail.textOverlay}"`, "");
    out.push("```", ep.pkg.thumbnail.prompt, "```", "");
  }
  return out.join("\n");
}
