import { NextResponse } from "next/server";
import { z } from "zod";
import { readBody } from "@/lib/api.ts";
import { withMember } from "@/lib/server/auth.ts";
import { reviewWinner } from "@/lib/server/admin.ts";
import { clearInsightsCache } from "@/lib/server/insights.ts";

const Body = z.object({ status: z.enum(["approved", "rejected", "candidate"]), note: z.string().max(500).default("") });

export const POST = withMember<{ id: string }>(
  async (req, { params }) => {
    const body = await readBody(req, Body);
    if ("error" in body) return body.error;
    if (!/^[0-9a-f-]{36}$/.test(params.id)) return NextResponse.json({ error: "Not found." }, { status: 404 });
    const ok = await reviewWinner(params.id, body.data.status, body.data.note);
    if (ok) clearInsightsCache();
    return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  },
  { admin: true },
);
