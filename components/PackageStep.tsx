"use client";

import { useState } from "react";
import { Captions, Download, FileText, Loader2, Mic, Sparkles } from "lucide-react";
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
  const slug = (episode.script?.title || "episode").replace(/[^\w-]+/g, "-").toLowerCase();
  const pack = () => episodeToMarkdown(episode, characters, bible, locations);
  const rows = timeline(episode);
  const missingShots = (episode.script?.scenes.length ?? 0) - episode.shots.length;

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

  return (
    <section className="stack loose">
      <div className="panel">
        <div className="panel-head">
          <div className="stack tight">
            <span className="eyebrow">Edit guide</span>
            <h2 className="display">Stitch it together</h2>
          </div>
          <div className="row">
            <button className="btn btn-soft btn-sm" onClick={() => saveFile(`${slug}.srt`, captionsSrt(episode), "application/x-subrip")}>
              <Captions size={14} /> Captions (.srt)
            </button>
            <button className="btn btn-soft btn-sm" onClick={() => saveFile(`${slug}-voiceover.txt`, voiceoverScript(episode), "text/plain")}>
              <Mic size={14} /> Voiceover script
            </button>
          </div>
        </div>
        <div className="stack">
          <ol className="steps-list">
            <li>Generate each clip and save it under its code (S01-SH01…). &ldquo;From last frame&rdquo; clips start from the previous clip&apos;s final frame.</li>
            <li>In CapCut, import all clips, sort by name and drop them on the timeline. They land in order.</li>
            <li>Add the voiceover (record it or use a text-to-speech voice), then import the captions and nudge timings.</li>
          </ol>
          {missingShots > 0 && <p className="faint small">{missingShots} scene(s) aren&apos;t storyboarded yet and show as one placeholder clip.</p>}
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Clip</th><th>Starts</th><th>Length</th><th>Joins by</th><th>Voiceover</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.clip}>
                    <td className="mono">{r.clip}</td>
                    <td>{fmtClock(r.start)}</td>
                    <td>{r.duration}s</td>
                    <td>
                      <div className="row">
                        {r.transition}
                        {r.continueFromPrevious && <span className="tag outline-accent">from last frame</span>}
                      </div>
                    </td>
                    <td className="small muted">{r.voiceover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div className="stack tight">
            <span className="eyebrow">Posting package</span>
            <h2 className="display">Titles, captions &amp; thumbnail</h2>
          </div>
          <div className="row">
            {error && <span className="error">{error}</span>}
            <button className={`btn ${pkg ? "btn-soft" : "btn-primary"}`} onClick={run} disabled={busy}>
              {busy ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
              {busy ? "Packaging…" : pkg ? "Regenerate" : "Write the package"}
            </button>
          </div>
        </div>
        {pkg ? (
          <div className="grid-2">
            <div className="stack tight">
              <span className="eyebrow">Title options</span>
              {pkg.titles.map((t) => (
                <div key={t} className="row between nowrap">
                  <span>{t}</span>
                  <CopyButton text={t} variant="ghost" />
                </div>
              ))}
            </div>
            <div className="stack tight">
              <div className="row between">
                <span className="eyebrow">Description</span>
                <CopyButton text={`${pkg.description}\n\n${pkg.hashtags.join(" ")}`} label="Copy with hashtags" variant="ghost" />
              </div>
              <p className="pre">{pkg.description}</p>
              <p className="grad small" style={{ fontStyle: "normal" }}>{pkg.hashtags.join(" ")}</p>
            </div>
            <div className="stack tight span-2">
              <div className="row between">
                <span className="eyebrow">Thumbnail</span>
                <CopyButton text={pkg.thumbnail.prompt} label="Image prompt" variant="ghost" />
              </div>
              <p>{pkg.thumbnail.concept}</p>
              <p>Text overlay: <b>&ldquo;{pkg.thumbnail.textOverlay}&rdquo;</b></p>
            </div>
          </div>
        ) : (
          <p className="faint small">Five title options, a description with a follow-for-part-2 hook, hashtags and a thumbnail idea.</p>
        )}
      </div>

      <div className="panel glow row between">
        <div className="stack tight">
          <h3>Episode pack</h3>
          <span className="faint small">Script, character and set sheets, every prompt and the edit guide in one file.</span>
        </div>
        <div className="row">
          <CopyButton text={pack()} label="Copy all" />
          <button className="btn btn-primary" onClick={() => saveFile(`${slug}.md`, pack(), "text/markdown")}>
            <Download size={15} /> Download pack
          </button>
        </div>
      </div>
    </section>
  );
}
