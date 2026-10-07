import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/fredoka";
import "@fontsource/patrick-hand";
import "./globals.css";
import { BRAND } from "@/lib/brand.ts";

export const metadata: Metadata = {
  title: BRAND.name,
  icons: { icon: "/brand/icon.svg" },
  description: "Turn an idea into a ready-to-generate AI video episode: story, consistent characters and sets, storyboard prompts and an edit guide.",
};

export const viewport: Viewport = { themeColor: "#f7f5f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
