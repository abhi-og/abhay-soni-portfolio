"use client";

import { useMemo, useState } from "react";

export type CollectionItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url: string;
  dateLabel: string;
};

const PAGE_SIZE = 12;

export function CollectionExplorer({
  items,
  type,
}: {
  items: CollectionItem[];
  type: "skill" | "certificate";
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(items.flatMap((item) => item.tags))).sort()],
    [items],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTag = tag === "All" || item.tags.includes(tag);
      const searchable = `${item.title} ${item.subtitle} ${item.description} ${item.tags.join(" ")}`;
      return matchesTag && (!needle || searchable.toLowerCase().includes(needle));
    });
  }, [items, query, tag]);

  const visibleItems = filtered.slice(0, visibleCount);

  function resetCount() {
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="collection-explorer">
      <div className="project-tools">
        <label>
          <span className="sr-only">Search {type}s</span>
          <input
            type="search"
            placeholder={`Search ${type}s…`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetCount();
            }}
          />
        </label>
        <label>
          <span className="sr-only">Filter {type}s by tag</span>
          <select
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
              resetCount();
            }}
          >
            {tags.map((value) => (
              <option value={value} key={value}>
                {value === "All" ? "All tags" : value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count">
        {filtered.length} {filtered.length === 1 ? type : `${type}s`}
      </p>

      <div className={type === "skill" ? "skills-grid archive-grid" : "certificate-showcase archive-grid"}>
        {visibleItems.map((item, index) =>
          type === "skill" ? (
            <article className="skill-card reveal" key={item.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item.subtitle}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div>{item.tags.join(" · ")}</div>
            </article>
          ) : (
            <article className="certificate-card reveal" key={item.slug}>
              <div className="certificate-card-top">
                <span className="certificate-seal" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <time>{item.dateLabel || "Certificate"}</time>
              </div>
              <div className="certificate-card-body">
                <p className="certificate-issuer">{item.subtitle || "Achievement"}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.tags.length ? (
                  <ul className="tag-list" aria-label={`${item.title} topics`}>
                    {item.tags.map((value) => <li key={value}>{value}</li>)}
                  </ul>
                ) : null}
              </div>
              <div className="certificate-card-footer">
                {item.url ? (
                  <a className="button button-dark" href={item.url} target="_blank" rel="noreferrer">
                    View certificate <span aria-hidden="true">↗</span>
                  </a>
                ) : <span>Link coming soon</span>}
              </div>
            </article>
          ),
        )}
      </div>

      {!filtered.length ? (
        <div className="empty-search">
          <strong>No matching {type}s.</strong>
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
            Load more {type}s
          </button>
        </div>
      ) : null}
    </section>
  );
}
