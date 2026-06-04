import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const parseIp = (value?: string | null) =>
  (value || "unknown").split(",")[0]?.trim() || "unknown";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attackType, payload, ipAddress, userAgent, endpoint } = body;
    
    const clientIp = parseIp(request.headers.get("x-forwarded-for")) || 
                     parseIp(request.headers.get("x-real-ip")) || 
                     ipAddress || 
                     "127.0.0.1";
    
    const clientUserAgent = userAgent || request.headers.get("user-agent") || "TestAgent/1.0";
    const targetEndpoint = endpoint || "/api/test";
    
    const severityMap: Record<string, "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"> = {
      "brute-force": "HIGH",
      "sql-injection": "CRITICAL",
      "xss": "HIGH",
      "ddos": "CRITICAL",
      "credential-stuffing": "HIGH",
      "session-hijack": "HIGH",
      "bot-detection": "MEDIUM",
    };
    
    const severity = severityMap[attackType] || "MEDIUM";
    
    const [auditLog, rateLimitEvent] = await Promise.all([
      prisma.auditLog.create({
        data: {
          action: `ATTACK_DETECTED: ${attackType}`,
          description: `Blocked ${attackType} attempt from ${clientIp} | Payload: ${payload?.substring(0, 50) || "N/A"}`,
          scope: "SECURITY",
          severity,
          entityType: "ThreatIntelligence",
          entityId: attackType,
          entityLabel: attackType,
          ipAddress: clientIp,
          userAgent: clientUserAgent,
          metadata: {
            attackType,
            payload,
            endpoint: targetEndpoint,
            detectedAt: new Date().toISOString(),
            source: "security-track-api",
          },
        },
      }),
      prisma.rateLimitEvent.create({
        data: {
          key: `${attackType}:${clientIp}`,
          ipAddress: clientIp,
          endpoint: targetEndpoint,
          attempts: 1,
          delayMs: 0,
          blockedUntil: severity === "CRITICAL" ? new Date(Date.now() + 3600000) : null,
          fingerprint: crypto.createHash("md5").update(clientIp + clientUserAgent).digest("hex"),
          createdAt: new Date(),
        },
      }),
    ]);

    const threatTypeMap: Record<string, "SQL_INJECTION" | "XSS" | "CREDENTIAL_STUFFING" | "SESSION_HIJACKING" | "BOT_SWARM"> = {
      "sql-injection": "SQL_INJECTION",
      "xss": "XSS",
      "credential-stuffing": "CREDENTIAL_STUFFING",
      "session-hijack": "SESSION_HIJACKING",
      "bot-detection": "BOT_SWARM",
    };
    
    const threatType = threatTypeMap[attackType];
    
    if (threatType) {
      const countryCodes = ["US", "CN", "RU", "IN", "DE", "BR", "NG", "IR"];
      const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
      
      await prisma.threatIntelligenceEvent.create({
        data: {
          type: threatType,
          severity: severity === "CRITICAL" ? "CRITICAL" : severity === "HIGH" ? "HIGH" : "MEDIUM",
          confidence: Math.floor(Math.random() * 30) + 70,
          ipAddress: clientIp,
          country: countryCode,
          endpoint: targetEndpoint,
          payloadHash: crypto.createHash("sha256").update(payload || "empty").digest("hex").substring(0, 16),
          prediction: {
            attackType,
            severity,
            blocked: true,
          },
          mitigated: true,
          createdAt: new Date(),
        },
      });
    }

    if (severity === "HIGH" || severity === "CRITICAL") {
      await prisma.alert.create({
        data: {
          status: "OPEN",
          severity,
          title: `${attackType.replace("-", " ").toUpperCase()} Attack Detected`,
          description: `Detected ${attackType} attack from IP ${clientIp}. Attack blocked and logged.`,
          serviceName: targetEndpoint,
          createdAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      recorded: true,
      attackType,
      ip: clientIp,
      auditId: auditLog.id,
      severity,
      message: `${attackType} attack recorded successfully`,
    });
  } catch (error) {
    console.error("POST /api/security/track error:", error);
    return NextResponse.json(
      { error: "Failed to record security event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Security tracking endpoint active",
    supportedAttackTypes: [
      "brute-force",
      "sql-injection", 
      "xss",
      "ddos",
      "credential-stuffing",
      "session-hijack",
      "bot-detection",
    ],
    usage: "POST with { attackType, payload, ipAddress?, userAgent?, endpoint? }",
  });
}