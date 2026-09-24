import { academicRepository } from "./repository";
import { notFound } from "@/shared/errors";

export async function getClassLevels() {
  return academicRepository.listClassLevels();
}

export async function getSubjects() {
  return academicRepository.listSubjects();
}

export async function getSubjectTopics(subjectId: string) {
  const subject = await academicRepository.getSubjectWithTopics(subjectId);
  if (!subject) throw notFound("Subject");
  return subject.topics;
}

export async function getTopicSubtopics(topicId: string) {
  const topic = await academicRepository.getTopicWithSubtopics(topicId);
  if (!topic) throw notFound("Topic");
  return topic.subtopics;
}

export async function createSubject(name: string) {
  return academicRepository.createSubject(name);
}