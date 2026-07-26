import { and, eq, ne } from "drizzle-orm";
import { getDb } from "../../../../db";
import { posts } from "../../../../db/schema";
import { getAdminUser } from "../../../../lib/admin";
import { slugify } from "../../../../lib/text";

type RouteProps = {
  params: Promise<{ id: string }>;
};

type PostPayload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  status?: "draft" | "published";
  featured?: boolean;
};

function parseId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isFinite(id) ? id : null;
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  const status = message.includes("UNIQUE constraint") ? 409 : 400;
  return Response.json(
    {
      error:
        status === 409
          ? "That URL slug is already used by another article."
          : message,
    },
    { status },
  );
}

export async function PATCH(request: Request, { params }: RouteProps) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId((await params).id);
  if (id === null) {
    return Response.json({ error: "Invalid article id." }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as PostPayload;
    const db = await getDb();
    const [existing] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (!existing) {
      return Response.json({ error: "Article not found." }, { status: 404 });
    }

    const title = payload.title?.trim() ?? "";
    const slug = slugify(payload.slug?.trim() || title);
    const status = payload.status === "published" ? "published" : "draft";
    if (!title || !slug) throw new Error("A title and valid slug are required.");

    const duplicate = await db
      .select({ id: posts.id })
      .from(posts)
      .where(and(eq(posts.slug, slug), ne(posts.id, id)))
      .limit(1);
    if (duplicate.length) {
      return Response.json(
        { error: "That URL slug is already used by another article." },
        { status: 409 },
      );
    }

    if (payload.featured) {
      await db.update(posts).set({ featured: false });
    }

    const [post] = await db
      .update(posts)
      .set({
        title,
        slug,
        excerpt: payload.excerpt?.trim() ?? "",
        content: payload.content?.trim() ?? "",
        category: payload.category?.trim() || "Notes",
        status,
        featured: Boolean(payload.featured),
        publishedAt:
          status === "published"
            ? existing.publishedAt || new Date().toISOString()
            : null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(posts.id, id))
      .returning();

    return Response.json({ post });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId((await params).id);
  if (id === null) {
    return Response.json({ error: "Invalid article id." }, { status: 400 });
  }

  const db = await getDb();
  await db.delete(posts).where(eq(posts.id, id));
  return Response.json({ ok: true });
}
