import { z } from "zod";

const optionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
});

const baseQuestionFields = {
  source: z.enum(["WAEC", "JAMB", "NECO", "JOINT", "SCHOOL", "PRACTICE", "CUSTOM"]),
  year: z.number().int().optional(),
  classLevelId: z.string().min(1),
  subjectId: z.string().min(1),
  topicId: z.string().optional(),
  subtopicId: z.string().optional(),
  type: z.enum(["MCQ", "TRUE_FALSE"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
  text: z.string().min(1),
  explanation: z.string().optional(),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  options: z.array(optionSchema).min(2),
};

function validateOptions(
  data: { type?: string; options?: { isCorrect: boolean }[] },
  ctx: z.RefinementCtx
) {
  if (!data.options) return;
  const correctCount = data.options.filter((o) => o.isCorrect).length;
  if (correctCount !== 1) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Exactly one option must be marked correct", path: ["options"] });
  }
  if (data.type === "TRUE_FALSE" && data.options.length !== 2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "True/False questions must have exactly 2 options", path: ["options"] });
  }
}

export const createQuestionSchema = z.object(baseQuestionFields).superRefine(validateOptions);
export const updateQuestionSchema = z.object(baseQuestionFields).partial().superRefine(validateOptions);

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;