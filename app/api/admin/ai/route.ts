import { NextResponse } from "next/server";
import { checkConnection } from "@/lib/claude.ts";
import { withMember } from "@/lib/server/auth.ts";

// Admin-only: runs one tiny real request to confirm the key and model.
export const POST = withMember(async () => NextResponse.json(await checkConnection()), { admin: true });
