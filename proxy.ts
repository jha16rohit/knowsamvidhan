import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow login page always
  if (pathname === "/admin-xyz") {
    return NextResponse.next();
  }

  // Protect dashboard
  if (pathname.startsWith("/ad-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin-xyz", request.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if ((decoded as any).role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin-xyz", request.url));
      }

    } catch (error) {
      return NextResponse.redirect(new URL("/admin-xyz", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ad-dashboard/:path*", "/admin-xyz"],
};