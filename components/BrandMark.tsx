import { BRAND } from "@/lib/brand.ts";

/** The logo, cut out of its background so it sits on the paper. */
export function BrandMark() {
  return <img src="/brand/logo-sm.webp" alt={BRAND.name} className="brand-logo" width={132} height={142} />;
}
