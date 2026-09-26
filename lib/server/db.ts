import "server-only";
import postgres from "postgres";

// One connection pool per server process. In production DATABASE_URL is the
// Supabase pooler connection string; `prepare: false` is required by its
// transaction mode. Every query in lib/server scopes rows to a user id.

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export function db() {
  if (!globalForDb.sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");
    globalForDb.sql = postgres(url, { prepare: false, max: 5, idle_timeout: 20 });
  }
  return globalForDb.sql;
}
