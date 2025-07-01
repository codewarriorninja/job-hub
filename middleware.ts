import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (isLoggedIn && nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // If user is not logged in and trying to access protected pages, redirect to sign-in
  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};