import { db } from "@/shared/db";
import type { CreateQuestionInput, UpdateQuestionInput } from "./schema";

export interface QuestionFilters {
  source?: string;
  year?: number;
  subjectId?: string;
  classLevelId?: string;
  topicId?: string;
  difficulty?: string;
  status?: string;
  type?: string;
}

function buildWhere(filters: QuestionFilters) {
  return {
    ...(filters.source && { source: filters.source as any }),
    ...(filters.year && { year: filters.year }),
    ...(filters.subjectId && { subjectId: filters.subjectId }),
    ...(filters.classLevelId && { classLevelId: filters.classLevelId }),
    ...(filters.topicId && { topicId: filters.topicId }),
    ...(filters.difficulty && { difficulty: filters.difficulty as any }),
    ...(filters.status && { status: filters.status as any }),
    ...(filters.type && { type: filters.type as any }),
  };
}

export const questionRepository = {
  findMany: (filters: QuestionFilters, skip: number, take: number) =>
    db.question.findMany({
      where: buildWhere(filters),
      include: { options: true, subject: true, topic: true, classLevel: true },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),

  count: (filters: QuestionFilters) => db.question.count({ where: buildWhere(filters) }),

  findById: (id: string) =>
    db.question.findUnique({ where: { id }, include: { options: true, tags: true } }),

  create: (data: CreateQuestionInput) => {
    const { options, ...questionData } = data;
    return db.question.create({
      data: { ...questionData, options: { create: options.map((o, i) => ({ ...o, order: i })) } },
      include: { options: true },
    });
  },

  update: (id: string, data: UpdateQuestionInput) => {
    const { options, ...questionData } = data;
    if (!options) {
      return db.question.update({ where: { id }, data: questionData, include: { options: true } });
    }
    return db.$transaction(async (tx) => {
      await tx.questionOption.deleteMany({ where: { questionId: id } });
      await tx.question.update({
        where: { id },
        data: { ...questionData, options: { create: options.map((o, i) => ({ ...o, order: i })) } },
      });
      return tx.question.findUniqueOrThrow({ where: { id }, include: { options: true } });
    });
  },

  delete: (id: string) => db.question.delete({ where: { id } }),
};