import { NextResponse } from "next/server";
import {
  clearAuthCookies,
  getRefreshTokenFromCookies,
  verifyRefreshToken,
} from "@/lib/auth";
import {
  revokeRefreshToken,
  revokeAllUserSessions,
} from "@/lib/session";

export async function POST() {
  try {
    const userRefreshToken =
      await getRefreshTokenFromCookies(false);

    const adminRefreshToken =
      await getRefreshTokenFromCookies(true);

    const token =
      userRefreshToken || adminRefreshToken;

    if (token) {
      const payload = verifyRefreshToken(token);

      await revokeRefreshToken(token);

      if (payload?.id) {
        await revokeAllUserSessions(payload.id);
      }
    }

    await clearAuthCookies(false);
    await clearAuthCookies(true);

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}