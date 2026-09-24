import { getSubjects, createSubject, createSubjectSchema } from "@/modules/academic";
import { requireRole } from "@/modules/auth";
import { ok, fail } from "@/shared/api-response";
import { invalidInput } from "@/shared/errors";

export async function GET() {
  try {
    return ok(await getSubjects());
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    await requireRole("SUPER_ADMIN");
    const parsed = createSubjectSchema.safeParse(await req.json());
    if (!parsed.success) throw invalidInput("Invalid subject data", parsed.error.flatten());
    return ok(await createSubject(parsed.data.name), 201);
  } catch (e) {
    return fail(e);
  }
}