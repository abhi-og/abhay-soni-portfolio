"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ProjectCardData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

const PAGE_SIZE = 9;

export function ProjectExplorer({ projects }: { projects: ProjectCardData[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags))).sort()],
    [projects],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesTag = tag === "All" || project.tags.includes(tag);
      const matchesQuery =
        !needle ||
        `${project.title} ${project.subtitle} ${project.description} ${project.tags.join(" ")}`
          .toLowerCase()
          .includes(needle);
      return matchesTag && matchesQuery;
    });
  }, [projects, query, tag]);

  const visibleProjects = filtered.slice(0, visibleCount);

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  function updateTag(value: string) {
    setTag(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="project-explorer">
      <div className="project-tools">
        <label>
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Search projects…"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter projects by tag</span>
          <select value={tag} onChange={(event) => updateTag(event.target.value)}>
            {tags.map((value) => (
              <option value={value} key={value}>
                {value === "All" ? "All tags" : value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      <div className="project-archive-grid" aria-label="Filtered projects">
        {visibleProjects.map((project, index) => (
          <article className="project-archive-card" key={project.slug}>
            <div className={`project-archive-visual ${index % 2 ? "sage" : "clay"}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{project.title.slice(0, 2)}</strong>
            </div>
            <div className="project-archive-copy">
              <p className="project-type">{project.subtitle}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <ul className="tag-list" aria-label={`${project.title} skills`}>
                {project.tags.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
              <Link className="text-link" href={`/projects/${project.slug}`}>
                View case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!filtered.length ? (
        <div className="empty-search">
          <strong>No matching projects.</strong>
          <p>Try another keyword or choose a different tag.</p>
        </div>
      ) : null}

      {visibleCount < filtered.length ? (
        <div className="load-more-wrap">
          <button
            className="button button-dark"
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load more projects
          </button>
        </div>
      ) : null}
    </section>
  );
}
