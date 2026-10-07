import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DEV_COOKIE, readDevCookie, supabaseConfigured } from "@/lib/dev-session.ts";

// Runs before every page and API request: refreshes the Supabase session and
// sends signed-out visitors to /login. Membership (paid access) is checked
// by the studio layout and by every API route.

const PUBLIC = ["/login", "/auth/", "/api/auth/", "/brand/"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let response = NextResponse.next({ request });
  let signedIn = false;

  if (supabaseConfigured()) {
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list, headers) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
        },
      },
    });
    const { data } = await supabase.auth.getClaims();
    signedIn = Boolean(data?.claims?.sub);
  } else if (process.env.NODE_ENV !== "production") {
    signedIn = Boolean(await readDevCookie(request.cookies.get(DEV_COOKIE)?.value));
  }

  if (signedIn || PUBLIC.some((p) => path.startsWith(p))) return response;
  if (path.startsWith("/api/")) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const login = new URL("/login", request.url);
  if (path !== "/") login.searchParams.set("next", path + request.nextUrl.search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
