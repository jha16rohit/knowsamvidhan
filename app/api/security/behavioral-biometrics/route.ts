import { NextRequest, NextResponse } from "next/server";
import {
  getSecurityRequestContext,
  recordSecurityAudit,
  scoreBehavioralBiometrics,
} from "@/lib/security-engine";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const context = getSecurityRequestContext(request);
    const body = await request.json().catch(() => ({}));
    const behavior = scoreBehavioralBiometrics(body);

    await recordSecurityAudit({
      action: `BEHAVIOR_${behavior.classification.toUpperCase()}`,
      description: `Behavioral biometrics classified interaction as ${behavior.classification}`,
      severity:
        behavior.classification === "bot"
          ? "HIGH"
          : behavior.classification === "review"
            ? "MEDIUM"
            : "INFO",
      entityType: "BehavioralBiometrics",
      entityLabel: context.deviceId.slice(0, 12),
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      metadata: behavior,
    });

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      ...behavior,
    });
  } catch (error) {
    console.error("POST /api/security/behavioral-biometrics error:", error);
    return NextResponse.json(
      { error: "Failed to score behavioral biometrics" },
      { status: 500 },
    );
  }
}
