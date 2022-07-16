/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `wifis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifis" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "documentType" "DOCUMENTTYPE" NOT NULL,
    "userName" TEXT NOT NULL,
    "dateEmission" DATE NOT NULL,
    "dateExpiration" DATE NOT NULL,
    "documentNumber" INTEGER NOT NULL,
    "emiterInstitution" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wifis" ADD CONSTRAINT "wifis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
