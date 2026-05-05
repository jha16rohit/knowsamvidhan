import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────
// TOKEN GENERATION
// ─────────────────────────────────────────────

export const generateSessionToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// ─────────────────────────────────────────────
// SESSION (device tracking)
// ─────────────────────────────────────────────

export const createSession = async ({
  userId,
  userAgent,
  ipAddress,
  expiresAt,
}: {
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
}) => {
  return prisma.session.create({
    data: {
      userId,
      userAgent,
      ipAddress,
      expiresAt,
    },
  });
};

export const deactivateSession = async (sessionId: string) => {
  return prisma.session.update({
    where: { id: sessionId },
    data: { isActive: false },
  });
};

export const deactivateAllUserSessions = async (userId: string) => {
  return prisma.session.updateMany({
    where: { userId },
    data: { isActive: false },
  });
};

export const removeExpiredSessions = async () => {
  return prisma.session.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
};

// ─────────────────────────────────────────────
// REFRESH TOKEN (token storage + revocation)
// ─────────────────────────────────────────────

export const createRefreshToken = async ({
  userId,
  sessionId,
  token,
  expiresAt,
}: {
  userId: string;
  sessionId: string;
  token: string;
  expiresAt: Date;
}) => {
  return prisma.refreshToken.create({
    data: {
      userId,
      sessionId,
      token,
      expiresAt,
    },
  });
};

export const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findFirst({
    where: {
      token,
      revoked: false,
      expiresAt: { gt: new Date() },
    },
  });
};

export const revokeRefreshToken = async (token: string) => {
  return prisma.refreshToken.updateMany({
    where: { token },
    data: { revoked: true },
  });
};

export const revokeAllUserRefreshTokens = async (userId: string) => {
  return prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};

// ─────────────────────────────────────────────
// COMBINED LOGOUT (revoke tokens + deactivate session)
// ─────────────────────────────────────────────

export const revokeAllUserSessions = async (userId: string) => {
  await revokeAllUserRefreshTokens(userId);
  await deactivateAllUserSessions(userId);
};