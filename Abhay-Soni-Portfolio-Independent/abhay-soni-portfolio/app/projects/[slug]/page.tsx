import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getProjectBySlug, splitTags } from "../../../lib/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  return project
    ? { title: project.title, description: project.description }
    : { title: "Project not found" };
}

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const tags = splitTags(project.tags);

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <article className="project-detail">
          <Link className="article-back" href="/#work">
            ← Back to selected work
          </Link>
          <header className="project-detail-hero">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {project.subtitle}
            </p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="project-detail-actions">
              {project.url ? (
                <a
                  className="button button-dark"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              <span>{project.dateLabel || "Ongoing project"}</span>
            </div>
          </header>

          <div className="project-detail-grid">
            <section>
              <p className="section-number">01 / The purpose</p>
              <h2>Built around a clear, practical problem.</h2>
              <p>{project.description}</p>
            </section>
            <aside>
              <p className="section-number">Tools & focus</p>
              <ul>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="project-process">
            <p className="section-number">02 / My process</p>
            <div>
              <article>
                <span>01</span>
                <h3>Understand</h3>
                <p>Define the real problem and the person the project should help.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Build</h3>
                <p>Turn the core idea into a focused, usable digital experience.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Improve</h3>
                <p>Learn from feedback, refine the details, and keep shipping.</p>
              </article>
            </div>
          </section>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
