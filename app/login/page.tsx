"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand.ts";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      setError(((await res.json().catch(() => ({}))) as { error?: string }).error || "Login failed.");
      setBusy(false);
    }
  }

  return (
    <main className="login">
      <form onSubmit={submit} className="panel glow">
        <div className="brand" style={{ padding: 0 }}>
          <span className="brand-mark">{BRAND.mark}</span>
          <span className="brand-name">{BRAND.name}</span>
        </div>
        <div className="stack tight">
          <h1 className="display" style={{ fontSize: 40 }}>Welcome <em>back</em></h1>
          <p className="muted small">Enter the access code from your purchase email.</p>
        </div>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access code" aria-label="Access code" autoFocus required />
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? <Loader2 size={16} className="spin" /> : null}
          {busy ? "Checking…" : <>Enter the studio <ArrowRight size={16} /></>}
        </button>
      </form>
    </main>
  );
}
