-- CreateTable
CREATE TABLE "SecurityPolicy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB NOT NULL DEFAULT '{}',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "SecurityPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoIntelligence" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT,
    "city" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isp" TEXT,
    "threatScore" INTEGER NOT NULL DEFAULT 0,
    "threatTypes" TEXT NOT NULL DEFAULT '[]',
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockCount" INTEGER NOT NULL DEFAULT 0,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GeoIntelligence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskAssessmentLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "ipAddress" TEXT NOT NULL,
    "country" TEXT,
    "deviceId" TEXT,
    "riskScore" INTEGER NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "aiConfidence" INTEGER NOT NULL,
    "decision" TEXT NOT NULL,
    "signals" JSONB NOT NULL,
    "behavioral" JSONB,
    "geoAnomaly" BOOLEAN NOT NULL DEFAULT false,
    "impossibleTravel" BOOLEAN NOT NULL DEFAULT false,
    "sessionDrift" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskAssessmentLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefenseAction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "autoTriggered" BOOLEAN NOT NULL DEFAULT false,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "DefenseAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MitigationAction" (
    "id" TEXT NOT NULL,
    "threatId" TEXT,
    "threatType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userId" TEXT,
    "details" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "MitigationAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecurityPolicy_name_key" ON "SecurityPolicy"("name");

-- CreateIndex
CREATE INDEX "SecurityPolicy_category_idx" ON "SecurityPolicy"("category");

-- CreateIndex
CREATE INDEX "SecurityPolicy_enabled_idx" ON "SecurityPolicy"("enabled");

-- CreateIndex
CREATE INDEX "GeoIntelligence_ipAddress_idx" ON "GeoIntelligence"("ipAddress");

-- CreateIndex
CREATE INDEX "GeoIntelligence_country_idx" ON "GeoIntelligence"("country");

-- CreateIndex
CREATE INDEX "GeoIntelligence_threatScore_idx" ON "GeoIntelligence"("threatScore");

-- CreateIndex
CREATE INDEX "GeoIntelligence_isBlocked_idx" ON "GeoIntelligence"("isBlocked");

-- CreateIndex
CREATE INDEX "RiskAssessmentLog_userId_idx" ON "RiskAssessmentLog"("userId");

-- CreateIndex
CREATE INDEX "RiskAssessmentLog_ipAddress_idx" ON "RiskAssessmentLog"("ipAddress");

-- CreateIndex
CREATE INDEX "RiskAssessmentLog_riskScore_idx" ON "RiskAssessmentLog"("riskScore");

-- CreateIndex
CREATE INDEX "RiskAssessmentLog_createdAt_idx" ON "RiskAssessmentLog"("createdAt");

-- CreateIndex
CREATE INDEX "DefenseAction_type_idx" ON "DefenseAction"("type");

-- CreateIndex
CREATE INDEX "DefenseAction_target_idx" ON "DefenseAction"("target");

-- CreateIndex
CREATE INDEX "DefenseAction_executedAt_idx" ON "DefenseAction"("executedAt");

-- CreateIndex
CREATE INDEX "MitigationAction_threatType_idx" ON "MitigationAction"("threatType");

-- CreateIndex
CREATE INDEX "MitigationAction_status_idx" ON "MitigationAction"("status");

-- CreateIndex
CREATE INDEX "MitigationAction_createdAt_idx" ON "MitigationAction"("createdAt");
