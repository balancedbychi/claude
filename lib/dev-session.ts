// Development-only login: a cookie holding the email plus an HMAC signature.
// Shared by the proxy and the server; never used when Supabase is configured.

export const DEV_COOKIE = "studio_dev_user";

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.ACCESS_SECRET || "dev-only-secret"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function devCookieValue(email: string): Promise<string> {
  return `${encodeURIComponent(email)}.${await hmac(email)}`;
}

export async function readDevCookie(value: string | undefined): Promise<{ id: string; email: string } | null> {
  if (!value) return null;
  const i = value.lastIndexOf(".");
  if (i < 1) return null;
  const email = decodeURIComponent(value.slice(0, i));
  if ((await hmac(email)) !== value.slice(i + 1)) return null;
  return { id: `dev-${(await hmac(`id:${email}`)).slice(0, 24)}`, email };
}

export function supabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
