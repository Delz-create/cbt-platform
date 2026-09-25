import { questionRepository, type QuestionFilters } from "./repository";
import { notFound } from "@/shared/errors";
import type { CreateQuestionInput, UpdateQuestionInput } from "./schema";

export async function listQuestions(filters: QuestionFilters, page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    questionRepository.findMany(filters, skip, pageSize),
    questionRepository.count(filters),
  ]);
  return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getQuestion(id: string) {
  const question = await questionRepository.findById(id);
  if (!question) throw notFound("Question");
  return question;
}

export async function createQuestion(data: CreateQuestionInput) {
  return questionRepository.create(data);
}

export async function updateQuestion(id: string, data: UpdateQuestionInput) {
  await getQuestion(id);
  return questionRepository.update(id, data);
}

export async function deleteQuestion(id: string) {
  await getQuestion(id);
  return questionRepository.delete(id);
}