import { NextRequest, NextResponse } from "next/server";
import {
  calculateAdaptiveRisk,
  getSecurityRequestContext,
  recordSecurityAudit,
  scoreBehavioralBiometrics,
} from "@/lib/security-engine";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const context = getSecurityRequestContext(request);
    const body = await request.json().catch(() => ({}));
    const risk = await calculateAdaptiveRisk({
      email: typeof body.email === "string" ? body.email : undefined,
      userId: typeof body.userId === "string" ? body.userId : undefined,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      country: context.country,
      deviceId: context.deviceId,
    });
    const behavior = scoreBehavioralBiometrics(body.behavior || {});
    const combinedRisk = Math.min(
      100,
      Math.round(risk.riskScore * 0.75 + behavior.anomalyScore * 0.25),
    );
    const decision =
      combinedRisk > 70 ? "BLOCK" : combinedRisk >= 30 ? "OTP" : "ALLOW";

    await recordSecurityAudit({
      action: `RBA_${decision}`,
      description: `Risk-based authentication decision ${decision} with score ${combinedRisk}`,
      severity: decision === "BLOCK" ? "HIGH" : decision === "OTP" ? "MEDIUM" : "INFO",
      entityType: "RiskAuthentication",
      entityLabel: body.email || context.ipAddress,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      metadata: { risk, behavior, combinedRisk, decision },
    });

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      riskScore: combinedRisk,
      decision,
      otpRequired: decision === "OTP",
      blocked: decision === "BLOCK",
      trustScore: 100 - combinedRisk,
      deviceId: context.deviceId,
      risk,
      behavior,
    });
  } catch (error) {
    console.error("POST /api/security/risk-auth error:", error);
    return NextResponse.json(
      { error: "Failed to calculate authentication risk" },
      { status: 500 },
    );
  }
}
