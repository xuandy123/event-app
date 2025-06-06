/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Events` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Events_slug_key" ON "Events"("slug");
