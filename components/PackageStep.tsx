"use client";

import { useState } from "react";
import { post } from "@/lib/client-api.ts";
import { captionsSrt, fmtClock, timeline, voiceoverScript } from "@/lib/edit-guide.ts";
import { episodeToMarkdown } from "@/lib/export.ts";
import type { PackageInfo } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";
import type { StepProps } from "./EpisodeBuilder.tsx";

function saveFile(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function PackageStep({ bible, characters, locations, episode, updateEpisode }: StepProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pkg = episode.pkg;

  async function run() {
    if (!episode.script) return;
    setBusy(true);
    setError("");
    try {
      updateEpisode({ pkg: await post<PackageInfo>("/api/package", { script: episode.script, bible, characters }) });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const slug = (episode.script?.title || "episode").replace(/[^\w-]+/g, "-").toLowerCase();
  const pack = () => episodeToMarkdown(episode, characters, bible, locations);
  const rows = timeline(episode);

  const missingShots = (episode.script?.scenes.length ?? 0) - episode.shots.length;

  return (
    <section className="stack">
      <header>
        <h2>Edit &amp; post</h2>
        <p className="muted">
          Put the clips together with the edit guide, then post with the titles, description, hashtags and thumbnail below.
        </p>
      </header>

      <div className="card stack">
        <div className="row between">
          <h4>Edit guide</h4>
          <div className="row">
            <button className="ghost small" onClick={() => saveFile(`${slug}.srt`, captionsSrt(episode), "application/x-subrip")}>
              Download captions (.srt)
            </button>
            <button className="ghost small" onClick={() => saveFile(`${slug}-voiceover.txt`, voiceoverScript(episode), "text/plain")}>
              Download voiceover script
            </button>
          </div>
        </div>
        <ol className="muted small how">
          <li>Generate each clip and save it under its code (S01-SH01…). Where it says &ldquo;from last frame&rdquo;, start that clip from the previous clip&apos;s final frame.</li>
          <li>In CapCut, import all clips, sort by name and drop them on the timeline. They land in order.</li>
          <li>Add the voiceover (record it, or paste the script into a text-to-speech voice), then import the captions file and nudge timings to match.</li>
        </ol>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Clip</th>
                <th>Starts</th>
                <th>Length</th>
                <th>Joins previous by</th>
                <th>Voiceover</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.clip}>
                  <td className="code">{r.clip}</td>
                  <td>{fmtClock(r.start)}</td>
                  <td>{r.duration}s</td>
                  <td>
                    {r.transition}
                    {r.continueFromPrevious && <span className="badge accent">from last frame</span>}
                  </td>
                  <td className="small">{r.voiceover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card row">
        <button className="primary" onClick={run} disabled={busy}>
          {busy ? "Packaging…" : pkg ? "Regenerate package" : "Generate package"}
        </button>
        <button className="secondary" onClick={() => saveFile(`${slug}.md`, pack(), "text/markdown")}>Download episode pack (.md)</button>
        <CopyButton text={pack()} label="Copy whole pack" />
        {error && <span className="error">{error}</span>}
      </div>
      {missingShots > 0 && <p className="muted small">{missingShots} scene(s) don&apos;t have prompts yet. The edit guide shows those as a single placeholder clip.</p>}

      {pkg && (
        <div className="grid2">
          <div className="card">
            <h4>Title options</h4>
            <ol>
              {pkg.titles.map((t) => (
                <li key={t} className="row between">
                  <span>{t}</span> <CopyButton text={t} />
                </li>
              ))}
            </ol>
          </div>
          <div className="card">
            <div className="row between">
              <h4>Description</h4>
              <CopyButton text={`${pkg.description}\n\n${pkg.hashtags.join(" ")}`} label="Copy with hashtags" />
            </div>
            <p className="pre">{pkg.description}</p>
            <p className="tags">{pkg.hashtags.join(" ")}</p>
          </div>
          <div className="card span2">
            <div className="row between">
              <h4>Thumbnail</h4>
              <CopyButton text={pkg.thumbnail.prompt} label="Copy image prompt" />
            </div>
            <p>{pkg.thumbnail.concept}</p>
            <p>
              Text overlay: <strong>&ldquo;{pkg.thumbnail.textOverlay}&rdquo;</strong>
            </p>
            <pre className="prompt">{pkg.thumbnail.prompt}</pre>
          </div>
        </div>
      )}
    </section>
  );
}
