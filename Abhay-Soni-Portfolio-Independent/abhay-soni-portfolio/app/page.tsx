import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { formatPostDate, getPublishedPosts, readingTime } from "../lib/posts";
import { getPortfolioItems, splitTags } from "../lib/portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [latestPosts, projects, skills, certificates, education] = await Promise.all([
    getPublishedPosts(3),
    getPortfolioItems("project"),
    getPortfolioItems("skill"),
    getPortfolioItems("certificate"),
    getPortfolioItems("education"),
  ]);

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Builder · Student · Storyteller
            </p>
            <h1>
              Hi, I&apos;m Abhay Soni—
              <span className="hero-emphasis">I build ideas for the web.</span>
            </h1>
            <p className="hero-intro">
              Hi, I&apos;m Abhay Soni—a Computer Science student passionate
              about building modern web applications, exploring AI, and turning
              ideas into real-world projects.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/#work">
                Explore my work <span aria-hidden="true">↓</span>
              </Link>
              <Link className="text-link" href="/resume">
                View résumé <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/blog">
                Read the journal <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <aside className="hero-note" aria-label="Current focus">
            <div className="note-tape" />
            <p className="note-label">Currently</p>
            <p className="note-title">Learning by building.</p>
            <p>
              Building modern web applications, exploring AI, and turning ideas
              into real-world projects.
            </p>
            <div className="note-meta">
              <span className="status-dot" />
              Open to conversations
            </div>
            <span className="note-signature" aria-hidden="true">
              A.
            </span>
          </aside>
        </section>

        <div className="marquee" aria-hidden="true">
          <span>Code. Create. Contribute.</span>
          <span className="marquee-mark">✦</span>
          <span>Designing with purpose.</span>
          <span className="marquee-mark">✦</span>
          <span>Learning out loud.</span>
        </div>

        <section className="section" id="work">
          <div className="section-heading">
            <div>
              <p className="section-number">01 / Selected work</p>
              <h2>Projects with a reason to exist.</h2>
            </div>
            <p>
              A few things I&apos;ve explored—each starting with a problem,
              shaped through curiosity, collaboration, and iteration.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card reveal" key={project.slug}>
                <div className={`project-visual ${index % 2 ? "sage" : "clay"}`}>
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-monogram">
                    {project.title.slice(0, 2)}
                  </span>
                  <span className="project-orbit" />
                </div>
                <div className="project-content">
                  <p className="project-type">{project.subtitle}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} skills`}>
                    {splitTags(project.tags).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <Link className="text-link project-link" href={`/projects/${project.slug}`}>
                    View case study <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-statement">
            <p className="section-number">02 / About me</p>
            <blockquote>
              “Turning <em>ideas</em> into real-world projects.”
            </blockquote>
          </div>
          <div className="about-copy">
            <p>
              Hi, I&apos;m Abhay Soni—a Computer Science student passionate
              about building modern web applications, exploring AI, and turning
              ideas into real-world projects.
            </p>
            <p>
              I&apos;m always open to collaborating on exciting projects,
              hackathons, and open-source contributions.
            </p>
            <div className="facts-grid">
              <div>
                <span>Based in</span>
                <strong>Uttar Pradesh, India</strong>
              </div>
              <div>
                <span>Studying</span>
                <strong>Computer Science</strong>
              </div>
              <div>
                <span>Focused on</span>
                <strong>Modern Web Applications</strong>
              </div>
              <div>
                <span>Exploring</span>
                <strong>Artificial Intelligence</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <div>
              <p className="section-number">03 / Skills & technologies</p>
              <h2>Tools I use to turn ideas into products.</h2>
            </div>
            <p>
              A growing toolkit across frontend development, programming,
              collaboration, and AI exploration.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article className="skill-card reveal" key={skill.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{skill.subtitle}</p>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div>{splitTags(skill.tags).join(" · ")}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section credentials-section" id="certificates">
          <div className="section-heading">
            <div>
              <p className="section-number">04 / Certificates & achievements</p>
              <h2>Learning, validated.</h2>
            </div>
            <p>
              Certifications and workshops that reflect my interest in
              technology, analytics, critical thinking, and AI.
            </p>
          </div>
          <div className="certificate-showcase">
            {certificates.map((certificate, index) => (
              <article className="certificate-card reveal" key={certificate.slug}>
                <div className="certificate-card-top">
                  <span className="certificate-seal" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <time>{certificate.dateLabel || "Certificate"}</time>
                </div>
                <div className="certificate-card-body">
                  <p className="certificate-issuer">
                    {certificate.subtitle || "Achievement"}
                  </p>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.description}</p>
                  {splitTags(certificate.tags).length ? (
                    <ul className="tag-list" aria-label={`${certificate.title} topics`}>
                      {splitTags(certificate.tags).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="certificate-card-footer">
                  {certificate.url ? (
                    <a
                      className="button button-dark"
                      href={certificate.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View certificate <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span>Link coming soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="education-heading">
            <p className="section-number">05 / Education timeline</p>
            <h2>Learning is the long project.</h2>
          </div>
          <div className="education-timeline">
            {education.map((item) => (
              <article className="education-item reveal" key={item.slug}>
                <span className="timeline-dot" />
                <time>{item.dateLabel}</time>
                <p>{item.subtitle}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <Link className="button button-light" href="/resume">
            Open full résumé <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <section className="section writing-section" id="writing">
          <div className="section-heading">
            <div>
              <p className="section-number">06 / From the journal</p>
              <h2>Notes from the workbench.</h2>
            </div>
            <Link className="text-link" href="/blog">
              Browse all writing <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="post-list">
            {latestPosts.map((post) => (
              <Link
                className="post-row"
                href={`/blog/${post.slug}`}
                key={post.slug}
              >
                <div className="post-meta">
                  <span>{post.category}</span>
                  <time>{formatPostDate(post.publishedAt)}</time>
                </div>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="read-time">{readingTime(post.content)} ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="contact-card" id="contact">
          <p className="section-number">07 / Say hello</p>
          <h2>Good ideas get better through conversation.</h2>
          <p>
            I&apos;m always open to collaborating on exciting projects,
            hackathons, and open-source contributions. Feel free to reach out!
          </p>
          <div className="contact-details">
            <a href="mailto:abhispacesoni@gmail.com">
              <span>Email</span>
              abhispacesoni@gmail.com ↗
            </a>
            <a href="https://github.com/abhi-og" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              github.com/abhi-og ↗
            </a>
            <a
              href="https://www.linkedin.com/in/abhay-soni-650b13410"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              Connect with me ↗
            </a>
            <div>
              <span>Location</span>
              Uttar Pradesh, India
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
