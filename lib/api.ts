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
