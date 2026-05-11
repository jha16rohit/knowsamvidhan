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
import {
  calculateAdaptiveRisk,
  getSecurityRequestContext,
  recordSecurityAudit,
} from "@/lib/security-engine";

export async function POST(req: Request) {
  try {
    const securityContext = getSecurityRequestContext(req);
    const ip = securityContext.ipAddress;

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
      await recordSecurityAudit({
        action: "LOGIN_FAILED",
        description: `Invalid user login attempt for ${email}`,
        severity: "LOW",
        entityType: "Login",
        entityLabel: email,
        ipAddress: ip,
        userAgent: securityContext.userAgent,
      });

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
      await recordSecurityAudit({
        action: "LOGIN_FAILED",
        description: `Invalid password for ${user.email}`,
        severity: "MEDIUM",
        entityType: "Login",
        entityId: user.id,
        entityLabel: user.email,
        ipAddress: ip,
        userAgent: securityContext.userAgent,
      });

      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const risk = await calculateAdaptiveRisk({
      email: user.email,
      userId: user.id,
      ipAddress: ip,
      userAgent: securityContext.userAgent,
      country: securityContext.country,
      deviceId: securityContext.deviceId,
    });

    if (risk.decision === "BLOCK") {
      await recordSecurityAudit({
        action: "LOGIN_BLOCKED_RBA",
        description: `Risk engine blocked login with score ${risk.riskScore}`,
        severity: "HIGH",
        entityType: "Login",
        entityId: user.id,
        entityLabel: user.email,
        ipAddress: ip,
        userAgent: securityContext.userAgent,
        metadata: risk,
      });

      return NextResponse.json(
        { error: "Login blocked by security policy", risk },
        { status: 403 },
      );
    }

    if (risk.decision === "OTP") {
      await recordSecurityAudit({
        action: "LOGIN_STEP_UP_OTP",
        description: `Risk engine requested OTP with score ${risk.riskScore}`,
        severity: "MEDIUM",
        entityType: "Login",
        entityId: user.id,
        entityLabel: user.email,
        ipAddress: ip,
        userAgent: securityContext.userAgent,
        metadata: risk,
      });

      return NextResponse.json(
        { requiresOtp: true, risk },
        { status: 202 },
      );
    }

    const payload = buildSessionPayload({
      id: user.id,
      email: user.email,
      role: user.role as "USER" | "ADMIN",
      deviceId: securityContext.deviceId,
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

    await recordSecurityAudit({
      action: "LOGIN_ALLOWED_RBA",
      description: `Risk engine allowed login with score ${risk.riskScore}`,
      severity: "INFO",
      entityType: "Login",
      entityId: user.id,
      entityLabel: user.email,
      ipAddress: ip,
      userAgent: securityContext.userAgent,
      metadata: risk,
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
