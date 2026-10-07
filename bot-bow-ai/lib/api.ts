import { NextResponse } from "next/server";
import type { z } from "zod";
import { GenerationError } from "./claude.ts";

/** Parse a JSON body against a schema, or return a 400 response. */
export async function readBody<S extends z.ZodType>(
  req: Request,
  schema: S,
): Promise<{ data: z.infer<S> } | { error: NextResponse }> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return { error: NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }) };
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return {
      error: NextResponse.json(
        { error: "Invalid request.", issues: parsed.error.issues.slice(0, 5) },
        { status: 400 },
      ),
    };
  }
  return { data: parsed.data };
}

export function errorResponse(err: unknown): NextResponse {
  if (err instanceof GenerationError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error(err);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

/** Describe the cast for a prompt, including the ids the model must reference. */
export function castBlock(
  characters: { id: string; name: string; role: string; age: string; look: string; wardrobe: string; voice: string; personality: string }[],
): string {
  if (characters.length === 0) return "No recurring characters defined. Use a narrator voiceover.";
  return characters
    .map(
      (c) =>
        `- id "${c.id}": ${c.name} (${c.role || "cast"}, ${c.age || "age unspecified"}). Look: ${c.look}. Wardrobe: ${c.wardrobe}. Voice: ${c.voice || "n/a"}. Personality: ${c.personality || "n/a"}.`,
    )
    .join("\n");
}

export function setsBlock(locations: { id: string; setName: string; name: string; details: string; lighting: string }[]): string {
  if (locations.length === 0) return "No locked sets. Use locationId \"\" for every scene.";
  return locations
    .map((l) => `- id "${l.id}": ${l.setName ? `${l.setName}, ` : ""}${l.name}. ${l.details} Default light: ${l.lighting || "n/a"}.`)
    .join("\n");
}

export function productsBlock(
  products: { id: string; name: string; brand: string; category: string; packaging: string; benefits: string; usage: string }[],
): string {
  if (products.length === 0) return "No products. Use productIds [] everywhere.";
  return products
    .map(
      (p) =>
        `- id "${p.id}": ${[p.brand, p.name].filter(Boolean).join(" ")} (${p.category || "product"}). Benefits you may claim: ${p.benefits || "none listed, make no claims"}. How it is used: ${p.usage || "n/a"}.`,
    )
    .join("\n");
}
