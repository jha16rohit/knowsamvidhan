import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id?: string;
  email?: string;
  role?: "USER" | "ADMIN";
};

const adminPublicRoutes = new Set([
  "/admin-xyz",
  "/admin-xyz/forgot-password",
  "/admin-xyz/verify-otp",
]);

const adminPublicApiRoutes = new Set([
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/forgot-password",
  "/api/admin/reset-password",
  "/api/admin/send-otp",
  "/api/admin/verify-otp",
]);

const adminRoutes = [
  "/activity-logs",
  "/analytics",
  "/users",
  "/settings",
  "/amendments",
  "/alerts",
  "/ad-dashboard",
  "/schedules",
  "/preamble",
  "/quizzes",
  "/clauses",
  "/parts",
  "/articles",
];

const userOnlyRoutes = [
  "/user_chat",
  "/user_preamble",
  "/user_schedules",
  "/user_amendments",
  "/user_articles",
  "/user_parts",
  "/user_quiz",
  "/logout",
];

const verifyToken = (token?: string): JwtPayload | null => {
  if (!token || !process.env.JWT_SECRET) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return typeof decoded === "object" ? (decoded as JwtPayload) : null;
  } catch {
    return null;
  }
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("token")?.value;
  const userToken = request.cookies.get("user_token")?.value;

  if (adminPublicRoutes.has(pathname) || adminPublicApiRoutes.has(pathname)) {
    return NextResponse.next();
  }

  const isAdminRoute =
    pathname.startsWith("/api/admin") ||
    adminRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isAdminRoute) {
    const session = verifyToken(adminToken);

    if (session?.role !== "ADMIN") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Admin access required" }, { status: 403 });
      }

      return NextResponse.redirect(new URL("/admin-xyz", request.url));
    }
  }

  const isUserRoute = userOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isUserRoute) {
    const session = verifyToken(userToken);

    if (!session || (session.role !== "USER" && session.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/user_login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/activity-logs/:path*",
    "/analytics/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/amendments/:path*",
    "/alerts/:path*",
    "/ad-dashboard/:path*",
    "/schedules/:path*",
    "/preamble/:path*",
    "/quizzes/:path*",
    "/clauses/:path*",
    "/parts/:path*",
    "/articles/:path*",
    "/admin-xyz/:path*",
    "/user_chat/:path*",
    "/user_preamble/:path*",
    "/user_schedules/:path*",
    "/user_amendments/:path*",
    "/user_articles/:path*",
    "/user_parts/:path*",
    "/user_quiz/:path*",
    "/logout",
  ],
};
