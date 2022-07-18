/*
  Warnings:

  - A unique constraint covering the columns `[userId,documentType]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "documents_userId_documentType_key" ON "documents"("userId", "documentType");
