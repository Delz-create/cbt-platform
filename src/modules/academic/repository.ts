import { db } from "@/shared/db";

export const academicRepository = {
  listClassLevels: () => db.classLevel.findMany({ orderBy: { order: "asc" } }),
  listSubjects: () => db.subject.findMany({ orderBy: { name: "asc" } }),
  getSubjectWithTopics: (subjectId: string) =>
    db.subject.findUnique({ where: { id: subjectId }, include: { topics: true } }),
  getTopicWithSubtopics: (topicId: string) =>
    db.topic.findUnique({ where: { id: topicId }, include: { subtopics: true } }),
  createSubject: (name: string) => db.subject.create({ data: { name } }),
};