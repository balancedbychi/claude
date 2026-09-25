// Members-only gate. Buyers get an access code (e.g. delivered by Stan Store
// after checkout). The cookie holds an HMAC of the code, never the code itself.

export const COOKIE = "eb_access";

function codes(): string[] {
  return (process.env.MEMBER_ACCESS_CODES || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

/** With no codes configured, the app is open in development and locked in production. */
export function gateDisabled(): boolean {
  return codes().length === 0 && process.env.NODE_ENV !== "production";
}

async function hmac(value: string): Promise<string> {
  const secret = process.env.ACCESS_SECRET || "dev-only-secret";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function tokenForCode(code: string): Promise<string | null> {
  return codes().includes(code.trim()) ? hmac(code.trim()) : null;
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  for (const code of codes()) {
    if ((await hmac(code)) === token) return true;
  }
  return false;
}
