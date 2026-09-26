"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { BRAND } from "@/lib/brand.ts";

type Tab = "signin" | "signup";

export function LoginForm({ mode, next, initialError }: { mode: "supabase" | "dev"; next: string; initialError?: string }) {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initialError ? "That sign-in link has expired. Try again." : "");
  const [notice, setNotice] = useState("");

  const supabase = () => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const callback = () => `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      if (mode === "dev") {
        const res = await fetch("/api/auth/dev-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
        if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error || "Login failed.");
        window.location.href = next;
        return;
      }
      if (tab === "signin") {
        const { error } = await supabase().auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = next;
      } else {
        const { data, error } = await supabase().auth.signUp({ email, password, options: { emailRedirectTo: callback() } });
        if (error) throw error;
        if (data.session) window.location.href = next;
        else setNotice("Check your email to confirm your account, then come back and sign in.");
      }
    });
  };

  const magicLink = () =>
    run(async () => {
      if (!email) throw new Error("Enter your email first.");
      const { error } = await supabase().auth.signInWithOtp({ email, options: { emailRedirectTo: callback() } });
      if (error) throw error;
      setNotice("We've emailed you a sign-in link.");
    });

  return (
    <main className="login">
      <form onSubmit={submit} className="panel glow login-card">
        <img src="/brand/logo.webp" alt={BRAND.name} className="login-logo" width={210} height={225} />
        <div className="stack tight">
          <h1 className="display" style={{ fontSize: 34, textAlign: "center" }}>
            {tab === "signin" ? <>your team is <em>waiting</em></> : <>meet your <em>content team</em></>}
          </h1>
          <p className="muted small" style={{ textAlign: "center" }}>
            {mode === "dev" ? "Development sign-in: any email works. Supabase sign-in replaces this once its keys are set." : tab === "signin" ? "Sign in to your studio." : "Use the email you bought with. You'll add your access code next."}
          </p>
        </div>
        {mode === "supabase" && (
          <div className="stepper">
            <button type="button" className={tab === "signin" ? "current" : ""} onClick={() => setTab("signin")}>Sign in</button>
            <button type="button" className={tab === "signup" ? "current" : ""} onClick={() => setTab("signup")}>Create account</button>
          </div>
        )}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" autoComplete="email" required />
        {mode === "supabase" && (
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" autoComplete={tab === "signin" ? "current-password" : "new-password"} minLength={8} required />
        )}
        {error && <p className="error">{error}</p>}
        {notice && <p className="small" style={{ color: "var(--success)" }}>{notice}</p>}
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? <Loader2 size={16} className="spin" /> : null}
          {tab === "signin" ? "Sign in" : "Create account"} <ArrowRight size={16} />
        </button>
        {mode === "supabase" && tab === "signin" && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={magicLink} disabled={busy}>
            <Mail size={14} /> Email me a sign-in link instead
          </button>
        )}
      </form>
    </main>
  );
}
