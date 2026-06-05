import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const path = req.nextUrl.pathname;

  const isAuthRoute = path.startsWith("/auth");
  const isDashboardRoute = path.startsWith("/dashboard");
  const isAdminRoute = path.startsWith("/admin");
  const isProtectedRoute = 
    isDashboardRoute || 
    isAdminRoute ||
    path.startsWith("/start") ||
    path.startsWith("/start-app");

  // Handle Authentication Routes (Login/Signup)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Send Admins to CRM, Users to Dashboard
      return Response.redirect(new URL(isAdmin ? "/admin" : "/dashboard", req.nextUrl));
    }
    return;
  }

  // Handle Unauthenticated access to Protected Routes
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(path);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.nextUrl));
  }

  // Strict Admin Routing Enforcement
  if (isLoggedIn) {
    if (isAdmin) {
      // Admins are FORBIDDEN from accessing the User Dashboard to prevent role confusion
      if (isDashboardRoute || path.startsWith("/start")) {
        return Response.redirect(new URL("/admin", req.nextUrl));
      }
    } else {
      // Standard Users are FORBIDDEN from accessing the Admin CRM
      if (isAdminRoute) {
        return Response.redirect(new URL("/dashboard", req.nextUrl));
      }
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
