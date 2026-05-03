import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  buildSessionPayload,
  signAccessToken,
  signRefreshToken,
  setAuthCookies,
} from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import {
  createSession,
  createRefreshToken,
} from "@/lib/session";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") || "unknown";

    const limiter = rateLimit({
      key: `login:${ip}`,
      limit: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many login attempts" },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user || user.isDeleted) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Account inactive" },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const payload = buildSessionPayload({
      id: user.id,
      email: user.email,
      role: user.role as "USER" | "ADMIN",
    });

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const session = await createSession({
      userId: user.id,
      userAgent: req.headers.get("user-agent") || "",
      ipAddress: ip,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    await createRefreshToken({
      userId: user.id,
      sessionId: session.id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });

    await setAuthCookies({
      accessToken,
      refreshToken,
      isAdmin: user.role === "ADMIN",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}