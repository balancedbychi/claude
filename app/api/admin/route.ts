import { NextResponse } from "next/server";
import { withMember } from "@/lib/server/auth.ts";
import { adminOverview } from "@/lib/server/admin.ts";

export const GET = withMember(async () => NextResponse.json(await adminOverview()), { admin: true });
