import { NextResponse } from "next/server";
import { z } from "zod";
import { ToolKindIn } from "@/lib/schemas.ts";
import { withMember } from "@/lib/server/auth.ts";
import { deleteProject, saveProject } from "@/lib/server/studio.ts";
import type { Episode } from "@/lib/types.ts";

const MAX_BYTES = 1_500_000;

// Projects are stored whole; the shape is checked loosely because it evolves
// and older saves are upgraded in the browser (lib/storage.ts).
const Project = z
  .object({ id: z.string().min(1).max(64), kind: ToolKindIn, createdAt: z.string(), shots: z.array(z.unknown()) })
  .passthrough();

export const PUT = withMember<{ id: string }>(async (req, { user, params }) => {
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "Project is too large." }, { status: 413 });
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = Project.safeParse(json);
  if (!parsed.success || parsed.data.id !== params.id) return NextResponse.json({ error: "Invalid project." }, { status: 400 });
  const ok = await saveProject(user.id, parsed.data as unknown as Episode);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not your project." }, { status: 409 });
});

export const DELETE = withMember<{ id: string }>(async (_req, { user, params }) => {
  await deleteProject(user.id, params.id);
  return NextResponse.json({ ok: true });
});
