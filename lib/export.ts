import { characterAnchor, characterSheetPrompt } from "./prompt-builder.ts";
import type { Character, Episode, SeriesBible } from "./types.ts";

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** The full episode pack as Markdown, for download or pasting into Notion. */
export function episodeToMarkdown(ep: Episode, characters: Character[], bible: SeriesBible): string {
  const out: string[] = [];
  const title = ep.script?.title || ep.concept?.title || "Untitled episode";
  out.push(`# ${bible.seriesName ? `${bible.seriesName}: ` : ""}${title}`, "");

  if (ep.concept) {
    out.push("## Concept", "", `**Logline:** ${ep.concept.logline}`, "", `**Hook:** ${ep.concept.hook}`, "");
  }

  if (characters.length > 0) {
    out.push("## Character sheets", "");
    for (const c of characters) {
      out.push(`### ${c.name}`, "", characterAnchor(c), "");
      if (c.voice) out.push(`Voice: ${c.voice}`, "");
      out.push("Reference image prompt:", "", "```", characterSheetPrompt(c, bible), "```", "");
    }
  }

  if (ep.script) {
    out.push(`## Script (${fmt(ep.script.totalSeconds)})`, "");
    let t = 0;
    for (const s of ep.script.scenes) {
      out.push(`### Scene ${s.number}: ${s.title} [${fmt(t)}–${fmt(t + s.durationSeconds)}]`, "");
      out.push(`*${s.location}.* ${s.action}`, "");
      for (const l of s.lines) out.push(`**${l.speaker}:** ${l.text}  `);
      out.push("");
      t += s.durationSeconds;

      const shots = ep.shots.find((x) => x.sceneNumber === s.number);
      if (shots) {
        for (const shot of shots.shots) {
          out.push(`#### Shot ${s.number}.${shot.number} (${shot.durationSeconds}s)`, "", "```", shot.prompt, "```", "");
        }
      }
    }
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
