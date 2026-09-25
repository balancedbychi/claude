import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, gateDisabled, isValidToken } from "@/lib/access.ts";

export async function proxy(req: NextRequest) {
  if (gateDisabled() || (await isValidToken(req.cookies.get(COOKIE)?.value))) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Members only. Please log in." }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  // Everything except the login page, its API route and static assets.
  matcher: ["/((?!login|api/login|_next/static|_next/image|favicon.ico).*)"],
};
