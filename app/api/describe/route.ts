import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/claude.ts";
import { CharacterFromPhotoOut, ProductFromPhotoOut, RoomFromPhotoOut } from "@/lib/schemas.ts";
import { errorResponse, readBody } from "@/lib/api.ts";

const Body = z.object({
  kind: z.enum(["character", "room", "product"]),
  image: z.object({
    mediaType: z.enum(["image/jpeg", "image/png", "image/webp"]),
    // Base64 of an image the browser has already shrunk to ~1024px.
    data: z.string().min(100).max(4_000_000),
  }),
  // Members confirm they have the right to use the image before uploading.
  rightsConfirmed: z.literal(true),
});

const SYSTEM = `You write visual reference descriptions for AI video generation, so a character or set can be reproduced identically across many clips.
Describe only what is visible: physical appearance, clothing, materials, colours, layout. Use precise, concrete wording (e.g. "shoulder-length copper curls" not "nice hair").
Never identify who a person is, guess their name, or say they resemble anyone; treat them as an original fictional character. Do not infer sensitive traits such as ethnicity, religion or health; describe visible skin tone and features instead.`;

export async function POST(req: Request) {
  const body = await readBody(req, Body);
  if ("error" in body) return body.error;
  const { kind, image } = body.data;

  try {
    const out =
      kind === "product"
        ? await generate({
            system: SYSTEM,
            image,
            schema: ProductFromPhotoOut,
            effort: "low",
            prompt: `Describe this product as a packshot reference for AI image generation.
- name and brand: as printed on the label ("" if not visible).
- category: what it is, e.g. "hydrating face serum".
- packaging: 40-80 words of fixed visual facts: container type and shape, material and finish, cap or pump, exact colours, label layout, fonts and key label text, size relative to a hand.`,
          })
        : kind === "character"
        ? await generate({
            system: SYSTEM,
            image,
            schema: CharacterFromPhotoOut,
            effort: "low",
            prompt: `Describe the person in this image as a character reference.
- age: an apparent age range, e.g. "late 20s".
- look: 30-60 words on face shape, skin tone, eyes, brows, hair (length, texture, colour, style), build and any distinctive features.
- wardrobe: 15-40 words on the outfit, shoes and accessories, with colours and materials.`,
          })
        : await generate({
            system: SYSTEM,
            image,
            schema: RoomFromPhotoOut,
            effort: "low",
            prompt: `Describe this space as a set reference.
- name: a short room name, e.g. "Kitchen".
- details: 50-90 words of fixed visual facts: layout, architecture, floor, wall and counter materials, exact colours, key furniture and decor, what is visible through windows. No people, no mood words.
- lighting: the time of day and light quality shown.`,
          });
    return NextResponse.json(out);
  } catch (err) {
    return errorResponse(err);
  }
}
