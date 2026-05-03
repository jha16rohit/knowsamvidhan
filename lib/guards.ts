import { NextResponse } from "next/server";
import { getAdminSession, getUserSession } from "@/lib/auth";

export const requireUser = async () => {
  const session = await getUserSession();

  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      ),
      session: null,
    };
  }

  return {
    error: null,
    session,
  };
};


export const requireAdminGuard = async () => {
  const session = await getAdminSession();

  if (!session || session.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      ),
      session: null,
    };
  }

  return {
    error: null,
    session,
  };
};