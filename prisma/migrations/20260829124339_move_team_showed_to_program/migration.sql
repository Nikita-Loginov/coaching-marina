/*
  Warnings:

  - You are about to drop the column `teamShowed` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "teamShowed";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "teamShowed" BOOLEAN NOT NULL DEFAULT true;
