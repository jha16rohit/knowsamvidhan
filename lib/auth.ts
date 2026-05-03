import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { setCookie, deleteCookie } from "@/lib/cookies";

export type SessionRole = "USER" | "ADMIN";

export type SessionPayload = {
  id: string;
  email: string;
  role: SessionRole;
};

const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "7d";

// ─────────────────────────────────────────────
// SECRETS
// ─────────────────────────────────────────────

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return process.env.JWT_SECRET;
};

const getRefreshSecret = () => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return process.env.JWT_REFRESH_SECRET;
};

// ─────────────────────────────────────────────
// TOKEN SIGNING
// ─────────────────────────────────────────────

export const signAccessToken = (
  payload: SessionPayload,
  expiresIn: SignOptions["expiresIn"] = ACCESS_TOKEN_EXPIRES
) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const signRefreshToken = (
  payload: SessionPayload,
  expiresIn: SignOptions["expiresIn"] = REFRESH_TOKEN_EXPIRES
) => {
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn,
  });
};

// ─────────────────────────────────────────────
// TOKEN VERIFICATION
// ─────────────────────────────────────────────

const validatePayload = (
  decoded: JwtPayload | string
): SessionPayload | null => {
  if (
    typeof decoded === "object" &&
    typeof decoded.id === "string" &&
    typeof decoded.email === "string" &&
    (decoded.role === "USER" || decoded.role === "ADMIN")
  ) {
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  }

  return null;
};

export const verifyAccessToken = (
  token?: string
): SessionPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    return validatePayload(decoded);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (
  token?: string
): SessionPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getRefreshSecret());

    return validatePayload(decoded);
  } catch {
    return null;
  }
};

// ─────────────────────────────────────────────
// COOKIE HELPERS
// ─────────────────────────────────────────────

export const getCookieValue = async (name: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};

export const getAccessTokenFromCookies = async (
  isAdmin = false
) => {
  const cookieName = isAdmin
    ? "admin_access_token"
    : "user_access_token";

  return getCookieValue(cookieName);
};

export const getRefreshTokenFromCookies = async (
  isAdmin = false
) => {
  const cookieName = isAdmin
    ? "admin_refresh_token"
    : "user_refresh_token";

  return getCookieValue(cookieName);
};

export const setAuthCookies = async ({
  accessToken,
  refreshToken,
  isAdmin = false,
}: {
  accessToken: string;
  refreshToken: string;
  isAdmin?: boolean;
}) => {
  const accessName = isAdmin
    ? "admin_access_token"
    : "user_access_token";

  const refreshName = isAdmin
    ? "admin_refresh_token"
    : "user_refresh_token";

  await setCookie({
    name: accessName,
    value: accessToken,
    maxAge: 60 * 15,
  });

  await setCookie({
    name: refreshName,
    value: refreshToken,
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookies = async (
  isAdmin = false
) => {
  const accessName = isAdmin
    ? "admin_access_token"
    : "user_access_token";

  const refreshName = isAdmin
    ? "admin_refresh_token"
    : "user_refresh_token";

  await deleteCookie(accessName);
  await deleteCookie(refreshName);
};

// ─────────────────────────────────────────────
// SESSION HELPERS
// ─────────────────────────────────────────────

export const getUserSession =
  async (): Promise<SessionPayload | null> => {
    const token = await getAccessTokenFromCookies(false);

    const payload = verifyAccessToken(token);

    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        isDeleted: true,
      },
    });

    if (
      !user ||
      user.isDeleted ||
      user.status !== "ACTIVE"
    ) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as SessionRole,
    };
  };

export const getAdminSession =
  async (): Promise<SessionPayload | null> => {
    const token = await getAccessTokenFromCookies(true);

    const payload = verifyAccessToken(token);

    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        isDeleted: true,
      },
    });

    if (
      !user ||
      user.isDeleted ||
      user.status !== "ACTIVE" ||
      user.role !== "ADMIN"
    ) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: "ADMIN",
    };
  };

// ─────────────────────────────────────────────
// TOKEN EXPIRY HELPERS
// ─────────────────────────────────────────────

export const ACCESS_TOKEN_MAX_AGE = 60 * 15;

export const REFRESH_TOKEN_MAX_AGE =
  60 * 60 * 24 * 7;

// ─────────────────────────────────────────────
// AUTH UTILITIES
// ─────────────────────────────────────────────

export const buildSessionPayload = ({
  id,
  email,
  role,
}: {
  id: string;
  email: string;
  role: SessionRole;
}): SessionPayload => {
  return {
    id,
    email,
    role,
  };
};