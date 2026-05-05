CREATE TABLE "RegistrationOTP" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationOTP_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "RegistrationOTP_email_key" ON "RegistrationOTP"("email");
CREATE INDEX "RegistrationOTP_email_idx" ON "RegistrationOTP"("email");
CREATE INDEX "RegistrationOTP_expiresAt_idx" ON "RegistrationOTP"("expiresAt");
