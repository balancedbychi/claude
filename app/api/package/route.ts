import { NextResponse } from "next/server";
import { z } from "zod";
import { generate, SYSTEM } from "@/lib/claude.ts";
import { BibleIn, CharacterIn, PackageOut, ScriptOut, ToolKindIn } from "@/lib/schemas.ts";
import { errorResponse, readBody } from "@/lib/api.ts";
import { characterAnchor } from "@/lib/prompt-builder.ts";

const Body = z.object({
  script: ScriptOut,
  bible: BibleIn,
  characters: z.array(CharacterIn).max(8),
  kind: ToolKindIn.default("episode"),
});

export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { script, bible, characters, kind } = body.data;
  const isAd = kind === "ugc" || kind === "commercial";

  try {
    const out = await generate({
      system: SYSTEM,
      schema: PackageOut,
      effort: "medium",
      prompt: `Package this ${isAd ? "ad" : kind === "transition" ? "transformation video" : "episode"} for posting on TikTok, Reels and YouTube Shorts.

Series: ${bible.seriesName || "untitled"} | Niche: ${bible.niche || "general"}
Episode: ${script.title}
Scene summary:
${script.scenes.map((s) => `${s.number}. ${s.title}: ${s.action}`).join("\n")}

Return:
- titles: 5 title options, curiosity-driven, under 70 characters.
- description: ${isAd ? 'a 2-3 line caption that sells without sounding like an ad, ending with the call to action. End with "Made with AI." and add "#ad" to the hashtags, since it promotes a product.' : 'a 2-3 short lines with a hook and a "follow for part 2" call to action. Include "Made with AI." at the end.'}
- hashtags: 8-12 hashtags mixing broad and niche tags, each starting with #.
- thumbnail: the concept (which moment, framing, expression), a 2-5 word text overlay, and an image-generation prompt for it. Describe characters by name only.`,
    });

    // Same guarantee as the scene prompts: the thumbnail uses the saved sheets.
    const cast = characters.filter((c) => out.thumbnail.prompt.includes(c.name));
    if (cast.length > 0) {
      out.thumbnail.prompt += `\nCharacters (keep identical to reference): ${cast.map(characterAnchor).join(" | ")}\nStyle: ${bible.visualStyle || "cinematic, photorealistic"}`;
    }
    return NextResponse.json(out);
  } catch (err) {
    return errorResponse(err);
  }
}
