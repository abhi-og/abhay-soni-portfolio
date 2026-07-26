import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { posts } from "../../../db/schema";
import { getAdminUser } from "../../../lib/admin";
import { getPublishedPosts } from "../../../lib/posts";
import { slugify } from "../../../lib/text";

type PostPayload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  status?: "draft" | "published";
  featured?: boolean;
};

function cleanPayload(payload: PostPayload) {
  const title = payload.title?.trim() ?? "";
  const slug = slugify(payload.slug?.trim() || title);
  const status = payload.status === "published" ? "published" : "draft";

  if (!title) throw new Error("A title is required.");
  if (!slug) throw new Error("A valid slug is required.");

  return {
    title,
    slug,
    excerpt: payload.excerpt?.trim() ?? "",
    content: payload.content?.trim() ?? "",
    category: payload.category?.trim() || "Notes",
    status,
    featured: Boolean(payload.featured),
    publishedAt:
      status === "published" ? new Date().toISOString() : (null as string | null),
    updatedAt: new Date().toISOString(),
  };
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("all") !== "1") {
    return Response.json({ posts: await getPublishedPosts() });
  }

  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const rows = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.updatedAt), desc(posts.id));
  return Response.json({ posts: rows });
}

export async function POST(request: Request) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const values = cleanPayload((await request.json()) as PostPayload);
    const db = await getDb();
    const [post] = await db
      .insert(posts)
      .values({ ...values, createdAt: new Date().toISOString() })
      .returning();

    if (post.featured) {
      await db
        .update(posts)
        .set({ featured: false })
        .where(eq(posts.status, "published"));
      await db
        .update(posts)
        .set({ featured: true })
        .where(eq(posts.id, post.id));
    }

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
