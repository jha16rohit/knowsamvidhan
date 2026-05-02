import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type SessionRole = "USER" | "ADMIN";

export type SessionPayload = {
  id: string;
  email: string;
  role: SessionRole;
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return process.env.JWT_SECRET;
};

export const signSessionToken = (
  payload: SessionPayload,
  expiresIn: SignOptions["expiresIn"] = "1d"
) => jwt.sign(payload, getJwtSecret(), { expiresIn });

export const verifySessionToken = (token?: string): SessionPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getJwtSecret());

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
  } catch {
    return null;
  }

  return null;
};

const readCookie = (req: Request, name: string) => {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const value = cookies
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);

  return value ? decodeURIComponent(value) : undefined;
};

export const getUserSession = (req: Request) =>
  verifySessionToken(readCookie(req, "user_token"));

export const getAdminSession = (req: Request) =>
  verifySessionToken(readCookie(req, "token"));

export async function requireAdmin(req: Request) {
  const session = getAdminSession(req);

  if (!session) {
    return {
      error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
      session: null,
    };
  }

  if (session.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Admin access required" }, { status: 403 }),
      session: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, role: true, status: true, isDeleted: true },
  });

  if (!user || user.isDeleted || user.status !== "ACTIVE" || user.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Admin access required" }, { status: 403 }),
      session: null,
    };
  }

  return { error: null, session };
}
