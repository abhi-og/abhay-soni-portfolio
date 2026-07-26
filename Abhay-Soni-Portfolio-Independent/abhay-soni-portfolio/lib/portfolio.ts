import { and, asc, eq } from "drizzle-orm";
import { getDb } from "../db";
import {
  type PortfolioItem,
  portfolioItems,
} from "../db/schema";

const starterItems: Omit<PortfolioItem, "id">[] = [
  {
    kind: "skill",
    title: "JavaScript",
    slug: "skill-javascript",
    subtitle: "Programming",
    description: "Building interactive experiences for the modern web.",
    tags: "Web,Frontend",
    url: "",
    dateLabel: "",
    sortOrder: 10,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "skill",
    title: "React & Next.js",
    slug: "skill-react-nextjs",
    subtitle: "Frontend",
    description: "Creating responsive interfaces and full-stack web products.",
    tags: "React,Next.js",
    url: "",
    dateLabel: "",
    sortOrder: 20,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "skill",
    title: "HTML & CSS",
    slug: "skill-html-css",
    subtitle: "Web design",
    description: "Accessible structure, responsive layouts, and polished UI.",
    tags: "HTML,CSS,Responsive design",
    url: "",
    dateLabel: "",
    sortOrder: 30,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "skill",
    title: "Python & AI Tools",
    slug: "skill-python-ai",
    subtitle: "Exploration",
    description: "Exploring AI workflows and practical problem solving.",
    tags: "Python,AI",
    url: "",
    dateLabel: "",
    sortOrder: 40,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "skill",
    title: "Git & GitHub",
    slug: "skill-git-github",
    subtitle: "Developer workflow",
    description: "Version control, collaboration, and open-source workflows.",
    tags: "Git,GitHub",
    url: "https://github.com/abhi-og",
    dateLabel: "",
    sortOrder: 50,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "certificate",
    title: "Agentic AI Certified Foundations Associate",
    slug: "certificate-oracle-agentic-ai",
    subtitle: "Oracle",
    description: "Foundational certification in agentic AI concepts and applications.",
    tags: "AI,Oracle",
    url: "",
    dateLabel: "2026",
    sortOrder: 10,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "certificate",
    title: "Google Analytics Certified",
    slug: "certificate-google-analytics",
    subtitle: "Google",
    description: "Certification covering analytics measurement and reporting fundamentals.",
    tags: "Analytics,Google",
    url: "",
    dateLabel: "2026",
    sortOrder: 20,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "certificate",
    title: "Critical Thinking in the AI Era",
    slug: "certificate-hp-critical-thinking",
    subtitle: "HP LIFE",
    description: "Learning to evaluate information and make thoughtful decisions in AI-assisted work.",
    tags: "Critical thinking,AI",
    url: "",
    dateLabel: "2026",
    sortOrder: 30,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "certificate",
    title: "AI Workshop",
    slug: "certificate-ai-workshop",
    subtitle: "Headstart Bootcamp",
    description: "Practical introduction to AI tools and emerging technology.",
    tags: "AI,Workshop",
    url: "",
    dateLabel: "2026",
    sortOrder: 40,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "certificate",
    title: "Robotics Workshop",
    slug: "certificate-robotics-workshop",
    subtitle: "Headstart Bootcamp",
    description: "Hands-on introduction to robotics, hardware, and problem solving.",
    tags: "Robotics,Workshop",
    url: "",
    dateLabel: "2026",
    sortOrder: 50,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "education",
    title: "B.Tech in Computer Science & Artificial Intelligence",
    slug: "education-nst-rishihood",
    subtitle: "Newton School of Technology (NST), Rishihood University",
    description: "Undergraduate study focused on computer science, software development, and AI.",
    tags: "Computer Science,Artificial Intelligence",
    url: "",
    dateLabel: "2026 – 2030",
    sortOrder: 10,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "education",
    title: "Senior Secondary Education",
    slug: "education-cbse-xii",
    subtitle: "CBSE",
    description: "Completed Class XII with a science and mathematics foundation.",
    tags: "Science,Mathematics",
    url: "",
    dateLabel: "2025",
    sortOrder: 20,
    featured: false,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "project",
    title: "JEE Tracker",
    slug: "jee-tracker",
    subtitle: "Study progress tracker",
    description: "A study progress tracker to organise preparation, monitor performance, and stay on schedule.",
    tags: "Study planning,Progress tracking,Performance insights",
    url: "",
    dateLabel: "2026",
    sortOrder: 10,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
  {
    kind: "project",
    title: "Personal Portfolio & Blog",
    slug: "personal-portfolio-blog",
    subtitle: "Portfolio · Publishing platform",
    description: "A portfolio website showcasing my projects, skills, achievements, and technical blog posts—with a private content studio.",
    tags: "Web development,Blog management,Responsive design",
    url: "",
    dateLabel: "2026",
    sortOrder: 20,
    featured: true,
    createdAt: "2026-07-26 09:00:00",
    updatedAt: "2026-07-26 09:00:00",
  },
];

async function seedPortfolioItems() {
  const db = await getDb();
  await db
    .insert(portfolioItems)
    .values(starterItems)
    .onConflictDoNothing({ target: portfolioItems.slug });

  // Upgrade only the original seeded education entry. Once the owner edits it,
  // this condition no longer matches, so later reads will preserve their changes.
  await db
    .update(portfolioItems)
    .set({
      title: "B.Tech in Computer Science & Artificial Intelligence",
      subtitle: "Newton School of Technology (NST), Rishihood University",
      dateLabel: "2026 – 2030",
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(portfolioItems.slug, "education-nst-rishihood"),
        eq(portfolioItems.title, "Computer Science & Artificial Intelligence"),
        eq(
          portfolioItems.subtitle,
          "Newton School of Technology · Rishihood University",
        ),
      ),
    );
}

export async function getPortfolioItems(
  kind?: PortfolioItem["kind"],
): Promise<PortfolioItem[]> {
  try {
   
    const db = await getDb();
    if (kind) {
      return await db
        .select()
        .from(portfolioItems)
        .where(eq(portfolioItems.kind, kind))
        .orderBy(asc(portfolioItems.sortOrder), asc(portfolioItems.id));
    }
    return await db
      .select()
      .from(portfolioItems)
      .orderBy(asc(portfolioItems.kind), asc(portfolioItems.sortOrder));
  } catch {
    const items = kind ? starterItems.filter((item) => item.kind === kind) : starterItems;
    return items.map((item, index) => ({ id: -(index + 1), ...item }));
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<PortfolioItem | null> {
  const projects = await getPortfolioItems("project");
  return projects.find((project) => project.slug === slug) ?? null;
}

export function splitTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
