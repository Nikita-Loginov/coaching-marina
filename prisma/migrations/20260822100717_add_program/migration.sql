-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT[],
    "descriptionFull" TEXT[],
    "as" TEXT NOT NULL,
    "btnText" TEXT NOT NULL,
    "img" JSONB NOT NULL,
    "forWhom" JSONB NOT NULL,
    "suitableRequests" JSONB NOT NULL,
    "workflow" JSONB NOT NULL,
    "cooperationFormat" JSONB NOT NULL,
    "benefits" JSONB NOT NULL,
    "reviews" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);
