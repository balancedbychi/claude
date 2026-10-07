"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label = "Copy", variant = "soft" }: { text: string; label?: string; variant?: "soft" | "ghost" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={`btn btn-sm btn-${variant}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          window.prompt("Copy this:", text);
        }
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label}
    </button>
  );
}
