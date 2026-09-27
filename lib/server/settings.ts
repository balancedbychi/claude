import "server-only";
import { db } from "./db.ts";
import { DEFAULT_PRICING, type PriceBook } from "../pricing.ts";
import { PricingIn } from "../schemas.ts";

let cache: { at: number; value: PriceBook } | null = null;

/** The admin's price book, or the built-in defaults if none is saved (or the table isn't there yet). */
export async function getPricing(): Promise<PriceBook> {
  if (cache && Date.now() - cache.at < 60_000) return cache.value;
  let value = DEFAULT_PRICING;
  try {
    const [row] = await db()<{ value: unknown }[]>`select value from app_settings where key = 'pricing'`;
    const parsed = row ? PricingIn.safeParse(row.value) : null;
    if (parsed?.success) value = parsed.data;
  } catch {
    // Migration 0002 not run yet: keep the defaults.
  }
  cache = { at: Date.now(), value };
  return value;
}

export async function savePricing(book: PriceBook): Promise<void> {
  await db()`
    insert into app_settings (key, value) values ('pricing', ${db().json(book as never)})
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
  cache = null;
}
