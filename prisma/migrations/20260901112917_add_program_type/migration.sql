-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('GENERAL', 'EDUCATION');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "type" "ProgramType" NOT NULL DEFAULT 'GENERAL';
