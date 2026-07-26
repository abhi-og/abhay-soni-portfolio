import { and, eq, ne } from "drizzle-orm";
import { getDb } from "../../../../db";
import { portfolioItems } from "../../../../db/schema";
import { getAdminUser } from "../../../../lib/admin";
import { slugify } from "../../../../lib/text";

type RouteProps = { params: Promise<{ id: string }> };
type ItemKind = "skill" | "certificate" | "education" | "project";

type ItemPayload = {
  kind?: ItemKind;
  title?: string;
  slug?: string;
  subtitle?: string;
  description?: string;
  tags?: string;
  url?: string;
  dateLabel?: string;
  sortOrder?: number;
  featured?: boolean;
};

function parseId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isFinite(id) ? id : null;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (id === null) return Response.json({ error: "Invalid item id." }, { status: 400 });

  try {
    const payload = (await request.json()) as ItemPayload;
    const title = payload.title?.trim() ?? "";
    const kind: ItemKind = ["skill", "certificate", "education", "project"].includes(
      payload.kind ?? "",
    )
      ? (payload.kind as ItemKind)
      : "skill";
    const slug = slugify(payload.slug?.trim() || `${kind}-${title}`);
    if (!title || !slug) throw new Error("A title and valid slug are required.");

    const db = await getDb();
    const duplicate = await db
      .select({ id: portfolioItems.id })
      .from(portfolioItems)
      .where(and(eq(portfolioItems.slug, slug), ne(portfolioItems.id, id)))
      .limit(1);
    if (duplicate.length) {
      return Response.json(
        { error: "That slug is already used by another item." },
        { status: 409 },
      );
    }

    const [item] = await db
      .update(portfolioItems)
      .set({
        kind,
        title,
        slug,
        subtitle: payload.subtitle?.trim() ?? "",
        description: payload.description?.trim() ?? "",
        tags: payload.tags?.trim() ?? "",
        url: payload.url?.trim() ?? "",
        dateLabel: payload.dateLabel?.trim() ?? "",
        sortOrder: Number.isFinite(payload.sortOrder) ? Number(payload.sortOrder) : 0,
        featured: Boolean(payload.featured),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(portfolioItems.id, id))
      .returning();
    if (!item) return Response.json({ error: "Item not found." }, { status: 404 });
    return Response.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (id === null) return Response.json({ error: "Invalid item id." }, { status: 400 });
  const db = await getDb();
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  return Response.json({ ok: true });
}
