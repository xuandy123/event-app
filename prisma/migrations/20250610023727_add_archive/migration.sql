-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "live" BOOLEAN NOT NULL DEFAULT false;
