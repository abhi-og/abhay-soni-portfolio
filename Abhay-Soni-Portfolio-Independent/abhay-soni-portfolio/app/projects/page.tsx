import Link from "next/link";
import type { Metadata } from "next";
import { ProjectExplorer } from "../components/ProjectExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPortfolioItems, splitTags } from "../../lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore projects built by Abhay Soni across web development, AI, and product thinking.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPortfolioItems("project");
  const projectData = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    tags: splitTags(project.tags),
  }));

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <div className="archive-back-row">
        <Link className="text-link archive-back-link" href="/#work">
          ← Back to homepage
        </Link>
          </div>
        <section className="projects-hero">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Project archive
          </p>
          <h1>Every build, experiment, and idea in one place.</h1>
          <p>
            Search the complete project archive or filter it by the tools and skills used.
          </p>
        </section>

        <ProjectExplorer projects={projectData} />
        <SiteFooter />
      </div>
    </main>
  );
}
