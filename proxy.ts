import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // protect admin routes
  if (pathname.startsWith("/ad-dashboard") || pathname.startsWith("/admin")) {

    if (!token) {
      return NextResponse.redirect(new URL("/admin-xyz", request.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // optional role check
      if ((decoded as any).role !== "admin") {
        return NextResponse.redirect(new URL("/admin-xyz", request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/admin-xyz", request.url));
    }
  }

  return NextResponse.next();
}