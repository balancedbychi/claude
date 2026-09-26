import { BRAND } from "@/lib/brand.ts";

/** The wordmark in the logo's bubbly style: pink and lilac with an ink outline. */
export function BrandMark() {
  return (
    <span className="brand">
      <img src="/brand/icon.svg" alt="" className="brand-mark" />
      <span className="brand-name">
        bot + <b>bow</b> ai
      </span>
      <span className="sr-only">{BRAND.name}</span>
    </span>
  );
}
