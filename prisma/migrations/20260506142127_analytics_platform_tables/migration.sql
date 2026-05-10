-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "visitorId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "source" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyAnalytics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dau" INTEGER NOT NULL,
    "mau" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotQuery" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "question" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_visitedAt_idx" ON "PageView"("visitedAt");

-- CreateIndex
CREATE INDEX "PageView_source_idx" ON "PageView"("source");

-- CreateIndex
CREATE INDEX "DailyAnalytics_date_idx" ON "DailyAnalytics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAnalytics_date_key" ON "DailyAnalytics"("date");

-- CreateIndex
CREATE INDEX "ChatbotQuery_category_idx" ON "ChatbotQuery"("category");

-- CreateIndex
CREATE INDEX "ChatbotQuery_createdAt_idx" ON "ChatbotQuery"("createdAt");
