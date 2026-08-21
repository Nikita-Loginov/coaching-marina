-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "name" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "clients" TEXT NOT NULL,
    "countAreas" INTEGER NOT NULL,
    "about" JSONB NOT NULL,
    "contacts" JSONB NOT NULL,
    "socials" JSONB NOT NULL,
    "practice" JSONB NOT NULL,
    "organization" JSONB NOT NULL,
    "management" JSONB NOT NULL,
    "education" JSONB NOT NULL,
    "materialTechnicalSupport" JSONB NOT NULL,
    "paidEducationalServices" JSONB NOT NULL,
    "financialActivity" JSONB NOT NULL,
    "vacantPlaces" JSONB NOT NULL,
    "studentSupport" JSONB NOT NULL,
    "internationalCooperation" JSONB NOT NULL,
    "documents" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
