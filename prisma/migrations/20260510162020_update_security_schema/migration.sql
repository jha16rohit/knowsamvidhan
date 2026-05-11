-- CreateEnum
CREATE TYPE "SecurityDecision" AS ENUM ('ALLOW', 'OTP', 'BLOCK');

-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('RBA', 'BEHAVIORAL_BIOMETRICS', 'JWT_REVOCATION', 'PII_VAULT', 'RATE_LIMIT', 'TARPIT', 'SOC_ALERT', 'THREAT_INTEL');

-- CreateEnum
CREATE TYPE "ThreatType" AS ENUM ('SQL_INJECTION', 'XSS', 'CREDENTIAL_STUFFING', 'SESSION_HIJACKING', 'OTP_ABUSE', 'API_SCRAPING', 'BOT_SWARM', 'GEO_ANOMALY', 'DEVICE_MISMATCH');

-- CreateTable
CREATE TABLE "SecurityRiskAssessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "emailHash" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "deviceId" TEXT,
    "userAgent" TEXT,
    "riskScore" INTEGER NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "decision" "SecurityDecision" NOT NULL,
    "signals" JSONB NOT NULL,
    "behaviorScore" INTEGER NOT NULL DEFAULT 0,
    "modelVersion" TEXT NOT NULL DEFAULT 'cyberguard-v4.2',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityRiskAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehavioralProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "baseline" JSONB NOT NULL,
    "sampleCount" INTEGER NOT NULL DEFAULT 0,
    "anomalyScore" INTEGER NOT NULL DEFAULT 0,
    "classification" TEXT NOT NULL DEFAULT 'human',
    "lastObservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BehavioralProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JwtRevocation" (
    "id" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "deviceId" TEXT,
    "reason" TEXT NOT NULL,
    "revokedById" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JwtRevocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceTrust" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "trustScore" INTEGER NOT NULL DEFAULT 50,
    "userAgentHash" TEXT,
    "ipPrefix" TEXT,
    "country" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trustedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceTrust_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PiiVaultRecord" (
    "id" TEXT NOT NULL,
    "ownerType" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "encryptedValue" TEXT NOT NULL,
    "maskedValue" TEXT NOT NULL,
    "keyVersion" TEXT NOT NULL,
    "lastAccessedBy" TEXT,
    "lastAccessedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PiiVaultRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitEvent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userId" TEXT,
    "endpoint" TEXT,
    "attempts" INTEGER NOT NULL,
    "delayMs" INTEGER NOT NULL DEFAULT 0,
    "blockedUntil" TIMESTAMP(3),
    "fingerprint" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimitEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreatIntelligenceEvent" (
    "id" TEXT NOT NULL,
    "type" "ThreatType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "confidence" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "country" TEXT,
    "endpoint" TEXT,
    "payloadHash" TEXT,
    "prediction" JSONB,
    "mitigated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreatIntelligenceEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityIncident" (
    "id" TEXT NOT NULL,
    "incidentNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Investigating',
    "rootCause" JSONB,
    "timeline" JSONB NOT NULL DEFAULT '[]',
    "recoveryPercent" INTEGER NOT NULL DEFAULT 0,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityIncident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SecurityRiskAssessment_userId_idx" ON "SecurityRiskAssessment"("userId");

-- CreateIndex
CREATE INDEX "SecurityRiskAssessment_ipAddress_idx" ON "SecurityRiskAssessment"("ipAddress");

-- CreateIndex
CREATE INDEX "SecurityRiskAssessment_decision_idx" ON "SecurityRiskAssessment"("decision");

-- CreateIndex
CREATE INDEX "SecurityRiskAssessment_createdAt_idx" ON "SecurityRiskAssessment"("createdAt");

-- CreateIndex
CREATE INDEX "BehavioralProfile_anomalyScore_idx" ON "BehavioralProfile"("anomalyScore");

-- CreateIndex
CREATE INDEX "BehavioralProfile_lastObservedAt_idx" ON "BehavioralProfile"("lastObservedAt");

-- CreateIndex
CREATE UNIQUE INDEX "BehavioralProfile_userId_deviceId_key" ON "BehavioralProfile"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "JwtRevocation_jti_key" ON "JwtRevocation"("jti");

-- CreateIndex
CREATE INDEX "JwtRevocation_userId_idx" ON "JwtRevocation"("userId");

-- CreateIndex
CREATE INDEX "JwtRevocation_sessionId_idx" ON "JwtRevocation"("sessionId");

-- CreateIndex
CREATE INDEX "JwtRevocation_expiresAt_idx" ON "JwtRevocation"("expiresAt");

-- CreateIndex
CREATE INDEX "DeviceTrust_trustScore_idx" ON "DeviceTrust"("trustScore");

-- CreateIndex
CREATE INDEX "DeviceTrust_lastSeenAt_idx" ON "DeviceTrust"("lastSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceTrust_userId_deviceId_key" ON "DeviceTrust"("userId", "deviceId");

-- CreateIndex
CREATE INDEX "PiiVaultRecord_maskedValue_idx" ON "PiiVaultRecord"("maskedValue");

-- CreateIndex
CREATE INDEX "PiiVaultRecord_lastAccessedAt_idx" ON "PiiVaultRecord"("lastAccessedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PiiVaultRecord_ownerType_ownerId_fieldName_key" ON "PiiVaultRecord"("ownerType", "ownerId", "fieldName");

-- CreateIndex
CREATE INDEX "RateLimitEvent_key_idx" ON "RateLimitEvent"("key");

-- CreateIndex
CREATE INDEX "RateLimitEvent_ipAddress_idx" ON "RateLimitEvent"("ipAddress");

-- CreateIndex
CREATE INDEX "RateLimitEvent_blockedUntil_idx" ON "RateLimitEvent"("blockedUntil");

-- CreateIndex
CREATE INDEX "RateLimitEvent_createdAt_idx" ON "RateLimitEvent"("createdAt");

-- CreateIndex
CREATE INDEX "ThreatIntelligenceEvent_type_idx" ON "ThreatIntelligenceEvent"("type");

-- CreateIndex
CREATE INDEX "ThreatIntelligenceEvent_severity_idx" ON "ThreatIntelligenceEvent"("severity");

-- CreateIndex
CREATE INDEX "ThreatIntelligenceEvent_ipAddress_idx" ON "ThreatIntelligenceEvent"("ipAddress");

-- CreateIndex
CREATE INDEX "ThreatIntelligenceEvent_createdAt_idx" ON "ThreatIntelligenceEvent"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityIncident_incidentNumber_key" ON "SecurityIncident"("incidentNumber");

-- CreateIndex
CREATE INDEX "SecurityIncident_severity_idx" ON "SecurityIncident"("severity");

-- CreateIndex
CREATE INDEX "SecurityIncident_status_idx" ON "SecurityIncident"("status");

-- CreateIndex
CREATE INDEX "SecurityIncident_openedAt_idx" ON "SecurityIncident"("openedAt");
