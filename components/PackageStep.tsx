"use client";

import { useState } from "react";
import { post } from "@/lib/client-api.ts";
import { episodeToMarkdown } from "@/lib/export.ts";
import type { PackageInfo } from "@/lib/types.ts";
import { CopyButton } from "./CopyButton.tsx";
import type { StepProps } from "./EpisodeBuilder.tsx";

export function PackageStep({ bible, characters, episode, updateEpisode }: StepProps) {
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

  function download() {
    const md = episodeToMarkdown(episode, characters, bible);
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(episode.script?.title || "episode").replace(/[^\w-]+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const missingShots = (episode.script?.scenes.length ?? 0) - episode.shots.length;

  return (
    <section className="stack">
      <header>
        <h2>Package it</h2>
        <p className="muted">Titles, description, hashtags and a thumbnail idea, then download the full episode pack.</p>
      </header>

      <div className="card row">
        <button className="primary" onClick={run} disabled={busy}>
          {busy ? "Packaging…" : pkg ? "Regenerate package" : "Generate package"}
        </button>
        <button className="secondary" onClick={download}>Download episode pack (.md)</button>
        <CopyButton text={episodeToMarkdown(episode, characters, bible)} label="Copy whole pack" />
        {error && <span className="error">{error}</span>}
      </div>
      {missingShots > 0 && <p className="muted small">{missingShots} scene(s) don&apos;t have prompts yet. The pack will include the script for those scenes only.</p>}

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
