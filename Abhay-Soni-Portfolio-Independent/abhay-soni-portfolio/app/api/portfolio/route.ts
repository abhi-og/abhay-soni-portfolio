import { getDb } from "../../../db";
import { portfolioItems } from "../../../db/schema";
import { getAdminUser } from "../../../lib/admin";
import { getPortfolioItems } from "../../../lib/portfolio";
import { slugify } from "../../../lib/text";

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

function cleanPayload(payload: ItemPayload) {
  const title = payload.title?.trim() ?? "";
  const kind: ItemKind = ["skill", "certificate", "education", "project"].includes(
    payload.kind ?? "",
  )
    ? (payload.kind as ItemKind)
    : "skill";
  const slug = slugify(payload.slug?.trim() || `${kind}-${title}`);
  if (!title || !slug) throw new Error("A title and valid slug are required.");
  return {
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
  };
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return Response.json(
    {
      error: message.includes("UNIQUE constraint")
        ? "That slug is already used by another item."
        : message,
    },
    { status: message.includes("UNIQUE constraint") ? 409 : 400 },
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") as ItemKind | null;
  return Response.json({ items: await getPortfolioItems(kind ?? undefined) });
}

export async function POST(request: Request) {
  if (!(await getAdminUser())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const values = cleanPayload((await request.json()) as ItemPayload);
    const db = await getDb();
    const [item] = await db
      .insert(portfolioItems)
      .values({ ...values, createdAt: new Date().toISOString() })
      .returning();
    return Response.json({ item }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
