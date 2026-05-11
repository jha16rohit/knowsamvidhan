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

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const securityContext = getSecurityRequestContext(req);
    const ip = securityContext.ipAddress;

    const limiter = rateLimit({
      key: `admin-login:${ip}`,
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

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email.trim(),
          mode: "insensitive",
        },
      },
    });

    if (!user || user.isDeleted) {
      await recordSecurityAudit({
        action: "ADMIN_LOGIN_FAILED",
        description: `Invalid admin login attempt for ${email}`,
        severity: "MEDIUM",
        entityType: "AdminLogin",
        entityLabel: email,
        ipAddress: ip,
        userAgent: securityContext.userAgent,
      });

      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Account inactive" },
        { status: 403 }
      );
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      await recordSecurityAudit({
        action: "ADMIN_LOGIN_FAILED",
        description: `Invalid admin password for ${user.email}`,
        severity: "HIGH",
        entityType: "AdminLogin",
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
        action: "ADMIN_LOGIN_BLOCKED_RBA",
        description: `Risk engine blocked admin login with score ${risk.riskScore}`,
        severity: "CRITICAL",
        entityType: "AdminLogin",
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
        action: "ADMIN_LOGIN_STEP_UP_OTP",
        description: `Risk engine requested admin OTP with score ${risk.riskScore}`,
        severity: "HIGH",
        entityType: "AdminLogin",
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

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });

    const payload = buildSessionPayload({
      id: user.id,
      email: user.email,
      role: "ADMIN",
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

    await setAuthCookies({
      accessToken,
      refreshToken,
      isAdmin: true,
    });

    await recordSecurityAudit({
      action: "ADMIN_LOGIN_ALLOWED_RBA",
      description: `Risk engine allowed admin login with score ${risk.riskScore}`,
      severity: "INFO",
      entityType: "AdminLogin",
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
        avatar: user.avatar ?? null,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
