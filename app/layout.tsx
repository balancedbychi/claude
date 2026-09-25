import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Episode Builder",
  description: "Turn an idea into a ready-to-generate AI video episode: story, consistent characters, script, scene prompts and packaging.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
