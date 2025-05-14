-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "venue" TEXT;
