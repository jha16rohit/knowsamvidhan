-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "topics" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
