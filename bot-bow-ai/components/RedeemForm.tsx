"use client";

import { useState } from "react";
import { ArrowRight, KeyRound, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand.ts";
import { SignOutButton } from "./SignOutButton.tsx";

export function RedeemForm({ email, title = "unlock your team", next = "/" }: { email: string; title?: string; next?: string }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
    if (res.ok) {
      window.location.href = next;
      return;
    }
    setError(((await res.json().catch(() => ({}))) as { error?: string }).error || "That didn't work.");
    setBusy(false);
  }

  return (
    <main className="login">
      <form onSubmit={submit} className="panel glow login-card">
        <img src="/brand/logo.webp" alt={BRAND.name} className="login-logo" width={210} height={225} />
        <div className="stack tight">
          <h1 className="display" style={{ fontSize: 34, textAlign: "center" }}>{title}</h1>
          <p className="muted small" style={{ textAlign: "center" }}>Signed in as {email}. Enter the access code from your purchase email.</p>
        </div>
        <div className="search">
          <KeyRound size={16} />
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access code" aria-label="Access code" autoFocus required />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? <Loader2 size={16} className="spin" /> : null} Unlock <ArrowRight size={16} />
        </button>
        <SignOutButton />
      </form>
    </main>
  );
}
