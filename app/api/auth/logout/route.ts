import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    // Get token from cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("user_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // 🔥 Suspend user on logout
    await prisma.user.update({
      where: { id: decoded.id },
      data: { status: "SUSPENDED" },
    });

    // Clear cookie
    const response = NextResponse.json({
      message: "Logged out and user suspended",
    });

    response.cookies.set("user_token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}