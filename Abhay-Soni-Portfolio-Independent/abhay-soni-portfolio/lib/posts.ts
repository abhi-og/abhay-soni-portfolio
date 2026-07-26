import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { type Post, posts } from "../db/schema";

export const samplePosts: Post[] = [
  {
    id: -1,
    title: "Building BEATHIRE: from a real problem to a clear direction",
    slug: "building-beathire-from-problem-to-direction",
    excerpt:
      "How our team shaped a simple idea into a trusted, hyper-local rental platform for speakers and DJ equipment.",
    content:
      "The best project ideas usually begin with an ordinary frustration. For BEATHIRE, that frustration was simple: people hosting an event often need a powerful speaker quickly, but buying one is impractical and traditional rentals can be slow or expensive.\n\n## Starting with the problem\n\nBefore thinking about screens or features, our team focused on the people involved. Hosts need fast and affordable access. Speaker owners have useful equipment sitting idle. Both sides need trust, clear expectations, and a safe transaction.\n\n## Turning research into a direction\n\nWe explored different approaches, studied existing rental products, and kept returning to one idea: make the experience hyper-local. Verified users, secure deposits, and nearby listings became the foundation of the product.\n\n## What I learned\n\nA strong product direction is not the idea with the most features. It is the one that explains the problem clearly and makes the next decision easier. BEATHIRE taught me to research first, communicate with the team, and let the user problem guide the build.",
    category: "Build Notes",
    status: "published",
    featured: true,
    publishedAt: "2026-07-24 09:00:00",
    createdAt: "2026-07-24 09:00:00",
    updatedAt: "2026-07-24 09:00:00",
  },
  {
    id: -2,
    title: "Why I am designing a college life tracker",
    slug: "designing-a-college-life-tracker",
    excerpt:
      "A personal system for remembering the days, tracking the work, and seeing progress without turning life into a spreadsheet.",
    content:
      "Starting college brings classes, assignments, habits, expenses, ideas, and small memories that are easy to lose. I wanted one calm place that could hold all of them.\n\n## The useful parts\n\nThe tracker combines a daily journal, subject-wise study time, attendance, deadlines, habits, and a simple monthly budget. The goal is not to collect data for its own sake. Each part should answer a useful question: What did I learn? What needs attention? Where did my time go?\n\n## Designing for real use\n\nThe biggest challenge is keeping the app easy enough to open every day. That means quick entries, clear summaries, and fewer unnecessary choices. A good personal tool should reduce mental load, not add to it.\n\nThis project is teaching me that thoughtful defaults and simple interactions often matter more than a long feature list.",
    category: "Product Thinking",
    status: "published",
    featured: false,
    publishedAt: "2026-07-18 09:00:00",
    createdAt: "2026-07-18 09:00:00",
    updatedAt: "2026-07-18 09:00:00",
  },
  {
    id: -3,
    title: "Learning in public, one small build at a time",
    slug: "learning-in-public-one-build-at-a-time",
    excerpt:
      "A note on sharing unfinished work, listening to feedback, and becoming more confident through consistency.",
    content:
      "It is easy to wait until a project feels perfect before sharing it. I have learned more by showing the work while it is still becoming.\n\n## Progress creates clarity\n\nPosting a build update forces me to explain what changed and why it matters. That explanation often reveals the next task more clearly than another hour of silent planning.\n\n## Feedback is part of the work\n\nNot every suggestion needs to become a feature, but every thoughtful response teaches something about how another person sees the product. Sharing early creates a useful loop: build, explain, listen, improve.\n\nI am still developing my skills, and that is exactly why documenting the journey matters. Small projects become evidence of growth when the lessons are written down.",
    category: "Journal",
    status: "published",
    featured: false,
    publishedAt: "2026-07-12 09:00:00",
    createdAt: "2026-07-12 09:00:00",
    updatedAt: "2026-07-12 09:00:00",
  },
];

async function seedStarterPosts() {
  const values = samplePosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    status: post.status,
    featured: post.featured,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
  const db = await getDb();
  await db
    .insert(posts)
    .values(values)
    .onConflictDoNothing({ target: posts.slug });
}

export async function getPublishedPosts(limit = 24): Promise<Post[]> {
  try {
    await seedStarterPosts();
    const db = await getDb();
    return await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(
        desc(posts.featured),
        desc(posts.publishedAt),
        desc(posts.createdAt),
      )
      .limit(limit);
  } catch {
    return samplePosts.slice(0, limit);
  }
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  try {
    await seedStarterPosts();
    const db = await getDb();
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
      .limit(1);
    return post ?? null;
  } catch {
    return samplePosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    await seedStarterPosts();
    const db = await getDb();
    return await db
      .select()
      .from(posts)
      .orderBy(desc(posts.updatedAt), desc(posts.id));
  } catch {
    return samplePosts;
  }
}

export function formatPostDate(value: string | null): string {
  if (!value) return "Draft";
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 210))} min read`;
}
