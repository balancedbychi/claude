"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { ConnectionStatus } from "@/lib/claude.ts";

/** Admin: send one tiny request to Claude and show whether the key works. */
export function AiStatus() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [busy, setBusy] = useState(false);

  async function test() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/ai", { method: "POST" });
      setStatus(await res.json());
    } catch {
      setStatus({ configured: false, ok: false, model: "", error: "Couldn't reach the app's server." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel stack tight">
      <p className="small muted">
        The team runs on Claude. This sends one tiny request (a fraction of a cent) to check the server&apos;s API key and model.
      </p>
      <div className="row">
        <button className="btn btn-primary btn-sm" onClick={test} disabled={busy}>
          {busy && <Loader2 size={14} className="spin" />} Test the AI connection
        </button>
        {status?.ok && (
          <span className="small">
            <CheckCircle2 size={14} className="ok-icon" /> Connected to <b>{status.servedBy ?? status.model}</b> in {((status.ms ?? 0) / 1000).toFixed(1)}s. The team is ready.
          </span>
        )}
        {status && !status.ok && (
          <span className="small error">
            <XCircle size={14} /> {status.error}
          </span>
        )}
      </div>
    </div>
  );
}
