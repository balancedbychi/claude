"use client";

import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
      }}
    >
      <LogOut size={14} /> Sign out
    </button>
  );
}
