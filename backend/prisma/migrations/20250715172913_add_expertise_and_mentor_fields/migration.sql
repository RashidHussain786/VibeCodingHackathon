-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expertise" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "isMentor" BOOLEAN NOT NULL DEFAULT false;
