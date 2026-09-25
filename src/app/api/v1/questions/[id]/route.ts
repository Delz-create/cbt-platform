import { requireRole } from "@/modules/auth";
import { ok, fail } from "@/shared/api-response";
import { getQuestion, updateQuestion, deleteQuestion, updateQuestionSchema } from "@/modules/questions";
import { invalidInput } from "@/shared/errors";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { id } = await params;
    return ok(await getQuestion(id));
  } catch (e) {
    return fail(e);
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { id } = await params;
    const parsed = updateQuestionSchema.safeParse(await req.json());
    if (!parsed.success) throw invalidInput("Invalid question data", parsed.error.flatten());
    return ok(await updateQuestion(id, parsed.data));
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { id } = await params;
    await deleteQuestion(id);
    return ok({ deleted: true });
  } catch (e) {
    return fail(e);
  }
}