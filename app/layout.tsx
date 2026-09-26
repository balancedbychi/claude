import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { BRAND } from "@/lib/brand.ts";

export const metadata: Metadata = {
  title: BRAND.name,
  description: "Turn an idea into a ready-to-generate AI video episode: story, consistent characters and sets, storyboard prompts and an edit guide.",
};

export const viewport: Viewport = { themeColor: "#0e0a0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
