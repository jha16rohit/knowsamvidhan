import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "SUPER_ADMIN";
  exp?: number;
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

const withSecurityHeaders = (res: NextResponse) => {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
};

const verifyToken = (token?: string): JwtPayload | null => {
  if (!token || !process.env.JWT_SECRET) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded !== "object") return null;

    return decoded as JwtPayload;
  } catch {
    return null;
  }
};

const isTokenExpired = (payload: JwtPayload | null) => {
  if (!payload?.exp) return true;

  return Date.now() >= payload.exp * 1000;
};

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set("admin_access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  response.cookies.set("user_access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminToken = request.cookies.get("admin_access_token")?.value;
  const userToken = request.cookies.get("user_access_token")?.value;

  // Allow public admin routes
  if (
    adminPublicRoutes.has(pathname) ||
    adminPublicApiRoutes.has(pathname)
  ) {
    return NextResponse.next();
  }

  // =========================
  // ADMIN ROUTE PROTECTION
  // =========================
  const isAdminRoute =
    pathname.startsWith("/api/admin") ||
    adminRoutes.some(
      (route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

  if (isAdminRoute) {
    const session = verifyToken(adminToken);

    if (!session || isTokenExpired(session)) {
      if (pathname.startsWith("/api/")) {
        const response = NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );

        return withSecurityHeaders(clearAuthCookies(response));
      }

      const response = NextResponse.redirect(
        new URL("/admin-xyz", request.url)
      );

      return withSecurityHeaders(clearAuthCookies(response));
    }

    if (
      session.role !== "ADMIN" &&
      session.role !== "SUPER_ADMIN"
    ) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        );
      }

      return NextResponse.redirect(
        new URL("/admin-xyz", request.url)
      );
    }
  }

  // =========================
  // USER ROUTE PROTECTION
  // =========================
  const isUserRoute = userOnlyRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isUserRoute) {
    const session = verifyToken(userToken);

    if (!session || isTokenExpired(session)) {
      const response = NextResponse.redirect(
        new URL("/user_login", request.url)
      );

      return withSecurityHeaders(clearAuthCookies(response));
    }

    if (
      session.role !== "USER" &&
      session.role !== "ADMIN" &&
      session.role !== "SUPER_ADMIN"
    ) {
      return withSecurityHeaders(
        NextResponse.redirect(
          new URL("/user_login", request.url)
        )
      );
    }
  }

  // =========================
  // SECURITY HEADERS
  // =========================
  const response = withSecurityHeaders(NextResponse.next());

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
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