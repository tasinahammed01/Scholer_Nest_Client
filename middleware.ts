import { NextResponse } from "next/server";
import type { Role } from "./types/globals";

const isPublicRoute = createRouteMatcher([
  "/",
  "/ai-chat",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/seed",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role as Role | undefined;

  // If no user and not on public routes, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  // Handle role-based access control
  if (userId) {
    // Admin routes protection
    if (isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Teacher routes protection
    if (isTeacherRoute(req) && role !== "teacher") {
      return NextResponse.redirect(new URL("/teacher", req.url));
    }

    // Student routes protection
    if (isStudentRoute(req) && role !== "student") {
      return NextResponse.redirect(new URL("/student", req.url));
    }

    // Only redirect to dashboard if explicitly on the root URL
    if (req.nextUrl.pathname === "/dashboard" && !req.nextUrl.search) {
      const dashboardMap: Record<Role, string> = {
        admin: "/admin/dashboard",
        teacher: "/teacher/dashboard",
        student: "/student/dashboard"
      };

      const redirectPath = role ? dashboardMap[role] : "/";
      if (redirectPath !== "/") {
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
