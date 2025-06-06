/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "shortDescription",
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "url" TEXT;
