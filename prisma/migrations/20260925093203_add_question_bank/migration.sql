-- CreateEnum
CREATE TYPE "QuestionSource" AS ENUM ('WAEC', 'JAMB', 'NECO', 'JOINT', 'SCHOOL', 'PRACTICE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'TRUE_FALSE');

-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "source" "QuestionSource" NOT NULL,
    "year" INTEGER,
    "classLevelId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "topicId" TEXT,
    "subtopicId" TEXT,
    "type" "QuestionType" NOT NULL,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'MEDIUM',
    "text" TEXT NOT NULL,
    "explanation" TEXT,
    "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTag" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "QuestionTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_subjectId_idx" ON "Question"("subjectId");

-- CreateIndex
CREATE INDEX "Question_topicId_idx" ON "Question"("topicId");

-- CreateIndex
CREATE INDEX "Question_classLevelId_idx" ON "Question"("classLevelId");

-- CreateIndex
CREATE INDEX "Question_source_idx" ON "Question"("source");

-- CreateIndex
CREATE INDEX "Question_status_idx" ON "Question"("status");

-- CreateIndex
CREATE INDEX "QuestionOption_questionId_idx" ON "QuestionOption"("questionId");

-- CreateIndex
CREATE INDEX "QuestionTag_questionId_idx" ON "QuestionTag"("questionId");

-- CreateIndex
CREATE INDEX "QuestionTag_tag_idx" ON "QuestionTag"("tag");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_classLevelId_fkey" FOREIGN KEY ("classLevelId") REFERENCES "ClassLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTag" ADD CONSTRAINT "QuestionTag_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
