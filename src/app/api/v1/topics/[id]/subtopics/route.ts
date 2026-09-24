import { getTopicSubtopics } from "@/modules/academic";
import { ok, fail } from "@/shared/api-response";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return ok(await getTopicSubtopics(id));
  } catch (e) {
    return fail(e);
  }
}