/*
  Warnings:

  - Changed the type of `expect` on the `Events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "expect",
ADD COLUMN     "expect" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE BIGINT;
