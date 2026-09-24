import { requireAuth } from "@/modules/auth";
import { ok, fail } from "@/shared/api-response";
import { db } from "@/shared/db";

export async function GET() {
  try {
    const user = await requireAuth();
    const profile = await db.studentProfile.findUnique({
      where: { userId: user.id },
      include: { classLevel: true, school: true },
    });
    return ok({ user: { id: user.id, name: user.name, email: user.email }, profile });
  } catch (e) {
    return fail(e);
  }
}