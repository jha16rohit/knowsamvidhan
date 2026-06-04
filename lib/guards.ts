import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, getUserSession, getAccessTokenFromCookies } from "@/lib/auth";
import { recordSecurityAudit } from "@/lib/security-engine";
import { validateSessionToken } from "@/lib/security";

const parseIp = (value?: string | null) =>
  (value || "unknown").split(",")[0]?.trim() || "unknown";

export const requireUser = async (request?: NextRequest) => {
  const token = await getAccessTokenFromCookies(false);
  
  if (request) {
    const ipAddress = parseIp(request.headers.get("x-forwarded-for")) ||
                     parseIp(request.headers.get("x-real-ip")) ||
                     "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    
    const tokenValidation = validateSessionToken(token, request);
    if (!tokenValidation.valid) {
      await recordSecurityAudit({
        action: "SESSION_HIJACK_ATTEMPT",
        description: `Session hijacking detected: ${tokenValidation.reason}`,
        severity: "HIGH",
        entityType: "Security",
        entityId: ipAddress,
        entityLabel: "SESSION_HIJACK",
        ipAddress,
        userAgent,
        metadata: { reason: tokenValidation.reason },
      });
      
      return {
        error: NextResponse.json(
          { error: "Invalid session", code: "SESSION_INVALID" },
          { status: 401 }
        ),
        session: null,
      };
    }
  }

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


export const requireAdminGuard = async (request?: NextRequest) => {
  const token = await getAccessTokenFromCookies(true);
  
  if (request) {
    const ipAddress = parseIp(request.headers.get("x-forwarded-for")) ||
                     parseIp(request.headers.get("x-real-ip")) ||
                     "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    
    const tokenValidation = validateSessionToken(token, request);
    if (!tokenValidation.valid) {
      await recordSecurityAudit({
        action: "SESSION_HIJACK_ATTEMPT",
        description: `Admin session hijacking detected: ${tokenValidation.reason}`,
        severity: "HIGH",
        entityType: "Security",
        entityId: ipAddress,
        entityLabel: "SESSION_HIJACK",
        ipAddress,
        userAgent,
        metadata: { reason: tokenValidation.reason },
      });
      
      return {
        error: NextResponse.json(
          { error: "Invalid session", code: "SESSION_INVALID" },
          { status: 401 }
        ),
        session: null,
      };
    }
  }

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