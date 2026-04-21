import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔐 bcrypt compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // 🔥 CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // ✅ RESPONSE + COOKIE
    const response = NextResponse.json({ message: "Login success" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}