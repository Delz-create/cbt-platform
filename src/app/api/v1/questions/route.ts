import { NextRequest } from "next/server";
import { requireRole } from "@/modules/auth";
import { ok, fail } from "@/shared/api-response";
import { listQuestions, createQuestion, createQuestionSchema } from "@/modules/questions";
import { invalidInput } from "@/shared/errors";

export async function GET(req: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN");
    const params = req.nextUrl.searchParams;
    const page = Number(params.get("page")) || 1;
    const pageSize = Math.min(Number(params.get("pageSize")) || 20, 100);
    const filters = {
      source: params.get("source") ?? undefined,
      year: params.get("year") ? Number(params.get("year")) : undefined,
      subjectId: params.get("subjectId") ?? undefined,
      classLevelId: params.get("classLevelId") ?? undefined,
      topicId: params.get("topicId") ?? undefined,
      difficulty: params.get("difficulty") ?? undefined,
      status: params.get("status") ?? undefined,
      type: params.get("type") ?? undefined,
    };
    return ok(await listQuestions(filters, page, pageSize));
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    await requireRole("SUPER_ADMIN");
    const parsed = createQuestionSchema.safeParse(await req.json());
    if (!parsed.success) throw invalidInput("Invalid question data", parsed.error.flatten());
    return ok(await createQuestion(parsed.data), 201);
  } catch (e) {
    return fail(e);
  }
}