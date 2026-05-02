import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith("user_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  response.cookies.set("user_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
