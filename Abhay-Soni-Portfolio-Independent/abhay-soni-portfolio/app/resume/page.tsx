import type { Metadata } from "next";
import Link from "next/link";
import { ResumeActions } from "../components/ResumeActions";
import { getPortfolioItems, splitTags } from "../../lib/portfolio";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Abhay Soni, Computer Science and AI student.",
};

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const [skills, certificates, education, projects] = await Promise.all([
    getPortfolioItems("skill"),
    getPortfolioItems("certificate"),
    getPortfolioItems("education"),
    getPortfolioItems("project"),
  ]);

  return (
    <main className="resume-page">
      <div className="resume-toolbar no-print">
        <Link href="/">← Portfolio</Link>
        <ResumeActions />
      </div>
      <article className="resume-sheet">
        <header className="resume-header">
          <div>
            <p>Computer Science & AI Student</p>
            <h1>Abhay Soni</h1>
            <p>
              Building modern web applications, exploring AI, and turning ideas
              into real-world projects.
            </p>
          </div>
          <address>
            <a href="mailto:abhispacesoni@gmail.com">abhispacesoni@gmail.com</a>
            <a href="https://github.com/abhi-og">github.com/abhi-og</a>
            <a href="https://www.linkedin.com/in/abhay-soni-650b13410">
              LinkedIn / Abhay Soni
            </a>
            <span>Uttar Pradesh, India</span>
          </address>
        </header>

        <section className="resume-section">
          <h2>Education</h2>
          {education.map((item) => (
            <article className="resume-entry" key={item.slug}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <small>{item.description}</small>
              </div>
              <time>{item.dateLabel}</time>
            </article>
          ))}
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          {projects.map((item) => (
            <article className="resume-entry" key={item.slug}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <small>{item.description}</small>
                <div className="resume-tags">{splitTags(item.tags).join(" · ")}</div>
              </div>
              <time>{item.dateLabel}</time>
            </article>
          ))}
        </section>

        <div className="resume-columns">
          <section className="resume-section">
            <h2>Skills</h2>
            <ul className="resume-list">
              {skills.map((item) => (
                <li key={item.slug}>
                  <strong>{item.title}</strong>
                  <span>{splitTags(item.tags).join(" · ")}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="resume-section">
            <h2>Certificates</h2>
            <ul className="resume-list">
              {certificates.map((item) => (
                <li key={item.slug}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.subtitle} · {item.dateLabel}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
