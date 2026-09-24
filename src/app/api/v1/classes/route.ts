import { getClassLevels } from "@/modules/academic";
import { ok, fail } from "@/shared/api-response";

export async function GET() {
  try {
    return ok(await getClassLevels());
  } catch (e) {
    return fail(e);
  }
}