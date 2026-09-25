-- CreateEnum
CREATE TYPE "QuestionImportStatus" AS ENUM ('PENDING', 'VALIDATED', 'COMMITTED', 'FAILED');

-- CreateTable
CREATE TABLE "QuestionImport" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "status" "QuestionImportStatus" NOT NULL DEFAULT 'PENDING',
    "totalRows" INTEGER NOT NULL,
    "validRows" INTEGER NOT NULL DEFAULT 0,
    "errorRows" INTEGER NOT NULL DEFAULT 0,
    "rawData" JSONB NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionImportError" (
    "id" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "rowData" JSONB NOT NULL,

    CONSTRAINT "QuestionImportError_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionImport_status_idx" ON "QuestionImport"("status");

-- CreateIndex
CREATE INDEX "QuestionImportError_importId_idx" ON "QuestionImportError"("importId");

-- AddForeignKey
ALTER TABLE "QuestionImportError" ADD CONSTRAINT "QuestionImportError_importId_fkey" FOREIGN KEY ("importId") REFERENCES "QuestionImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
