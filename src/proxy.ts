import { NextRequest, NextResponse } from "next/server";

import { readSessionToken, SESSION_COOKIE } from "@/shared/lib/session";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isSignIn = pathname === "/sign-in" || pathname.startsWith("/sign-in/");

  if (isAdmin && !session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.search = "";

    return NextResponse.redirect(url);
  }

  if (isSignIn && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin(.*)", "/api/admin(.*)", "/sign-in(.*)"],
};
