"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { post } from "@/lib/client-api.ts";

const MAX_SIDE = 1024;

/** Shrink to at most 1024px and re-encode as JPEG, so uploads are small and fast. */
async function toJpegBase64(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
}

export function PhotoFill<T>(props: { kind: "character" | "room" | "product"; onResult: (data: T) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [rights, setRights] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = await toJpegBase64(file);
      setPreview(`data:image/jpeg;base64,${data}`);
      props.onResult(
        await post<T>("/api/describe", { kind: props.kind, image: { mediaType: "image/jpeg", data }, rightsConfirmed: true }),
      );
    } catch (e) {
      setError((e as Error).message || "Couldn't read that image.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className="upload-zone">
      {preview ? (
        <img src={preview} alt="Uploaded reference" className="thumb" />
      ) : (
        <span className="placeholder"><ImagePlus size={22} strokeWidth={1.6} /></span>
      )}
      <div className="stack tight grow">
        <strong className="small">Start from a photo</strong>
        <label className="check">
          <input type="checkbox" checked={rights} onChange={(e) => setRights(e.target.checked)} />
          {props.kind === "character"
            ? "This is an AI-generated or licensed image, or a real person who agreed to be used."
            : "I have the right to use this image."}
        </label>
        <div className="row">
          <button type="button" className="btn btn-soft btn-sm" disabled={!rights || busy} onClick={() => input.current?.click()}>
            {busy ? <Loader2 size={14} className="spin" /> : <ImagePlus size={14} />}
            {busy ? "Reading photo…" : "Upload photo"}
          </button>
          {error && <span className="error small">{error}</span>}
        </div>
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
    </div>
  );
}
