-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "headerImage" TEXT[],
    "when" TIMESTAMP(3) NOT NULL,
    "where" TEXT[],
    "Price" TEXT NOT NULL,
    "instagram" TEXT,
    "tiktok" TEXT,
    "facebook" TEXT,
    "details" TEXT NOT NULL,
    "expect" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
