-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('OPEN', 'ACKED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'OPEN',
    "severity" "AlertSeverity" NOT NULL DEFAULT 'MEDIUM',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceIcon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acknowledgedAt" TIMESTAMP(3),
    "dismissedAt" TIMESTAMP(3),

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,

    CONSTRAINT "AlertCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertCategoryMetric" (
    "id" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertCategoryMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertFrequencyMetric" (
    "id" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalAlerts" INTEGER NOT NULL,
    "criticalAlerts" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertFrequencyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertHistoricalMetric" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "openedCount" INTEGER NOT NULL,
    "resolvedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertHistoricalMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertHeatmapMetric" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "alertCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertHeatmapMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlertToAlertCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Alert_status_idx" ON "Alert"("status");

-- CreateIndex
CREATE INDEX "Alert_severity_idx" ON "Alert"("severity");

-- CreateIndex
CREATE INDEX "Alert_createdAt_idx" ON "Alert"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AlertCategory_name_key" ON "AlertCategory"("name");

-- CreateIndex
CREATE INDEX "AlertCategoryMetric_categoryId_idx" ON "AlertCategoryMetric"("categoryId");

-- CreateIndex
CREATE INDEX "AlertCategoryMetric_date_idx" ON "AlertCategoryMetric"("date");

-- CreateIndex
CREATE UNIQUE INDEX "AlertCategoryMetric_alertId_categoryId_date_key" ON "AlertCategoryMetric"("alertId", "categoryId", "date");

-- CreateIndex
CREATE INDEX "AlertFrequencyMetric_date_idx" ON "AlertFrequencyMetric"("date");

-- CreateIndex
CREATE UNIQUE INDEX "AlertFrequencyMetric_hour_date_key" ON "AlertFrequencyMetric"("hour", "date");

-- CreateIndex
CREATE UNIQUE INDEX "AlertHistoricalMetric_date_key" ON "AlertHistoricalMetric"("date");

-- CreateIndex
CREATE INDEX "AlertHeatmapMetric_date_idx" ON "AlertHeatmapMetric"("date");

-- CreateIndex
CREATE UNIQUE INDEX "AlertHeatmapMetric_dayOfWeek_hour_date_key" ON "AlertHeatmapMetric"("dayOfWeek", "hour", "date");

-- CreateIndex
CREATE UNIQUE INDEX "_AlertToAlertCategory_AB_unique" ON "_AlertToAlertCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AlertToAlertCategory_B_index" ON "_AlertToAlertCategory"("B");

-- AddForeignKey
ALTER TABLE "AlertCategoryMetric" ADD CONSTRAINT "AlertCategoryMetric_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertCategoryMetric" ADD CONSTRAINT "AlertCategoryMetric_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AlertCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlertToAlertCategory" ADD CONSTRAINT "_AlertToAlertCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Alert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlertToAlertCategory" ADD CONSTRAINT "_AlertToAlertCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "AlertCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
