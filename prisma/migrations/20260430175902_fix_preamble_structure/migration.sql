/*
  Warnings:

  - You are about to drop the column `amendmentNote` on the `Preamble` table. All the data in the column will be lost.
  - You are about to drop the column `didYouKnow` on the `Preamble` table. All the data in the column will be lost.
  - You are about to drop the column `landmarkCase` on the `Preamble` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preamble" DROP COLUMN "amendmentNote",
DROP COLUMN "didYouKnow",
DROP COLUMN "landmarkCase",
ADD COLUMN     "landmarkCases" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "notes" TEXT NOT NULL DEFAULT '[]';
