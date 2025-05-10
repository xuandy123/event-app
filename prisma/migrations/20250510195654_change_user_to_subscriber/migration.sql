/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "UserMetadata" DROP CONSTRAINT "UserMetadata_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserMetadata";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriberMetadata" (
    "id" TEXT NOT NULL,
    "age" INTEGER,
    "preferences" JSONB,
    "neighbourhood" TEXT,
    "feedback" TEXT,
    "referral" "Sources",
    "subscriberId" TEXT NOT NULL,

    CONSTRAINT "SubscriberMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_phone_key" ON "Subscriber"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriberMetadata_subscriberId_key" ON "SubscriberMetadata"("subscriberId");

-- AddForeignKey
ALTER TABLE "SubscriberMetadata" ADD CONSTRAINT "SubscriberMetadata_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
