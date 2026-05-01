/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tagDetails" TEXT NOT NULL DEFAULT '[]';

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_slug_key" ON "Schedule"("slug");
