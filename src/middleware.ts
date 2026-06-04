import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin");

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
    return;
  }

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Basic admin protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.auth?.user?.role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
