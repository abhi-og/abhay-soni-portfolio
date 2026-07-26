"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
};

export function BlogExplorer({ posts }: { posts: BlogCardData[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        !needle ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <section className="blog-explorer">
      <div className="blog-tools">
        <label>
          <span className="sr-only">Search articles</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            type="search"
          />
        </label>
        <div className="category-filters" aria-label="Filter by category">
          {categories.map((value) => (
            <button
              className={category === value ? "active" : ""}
              key={value}
              type="button"
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      <div className="journal-grid" aria-label="Filtered articles">
        {filtered.map((post, index) => (
          <Link className="journal-card reveal" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="journal-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="post-meta">
              <span>{post.category}</span>
              <time>{post.date}</time>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <span className="read-time">{post.readingTime} ↗</span>
          </Link>
        ))}
      </div>

      {!filtered.length ? (
        <div className="empty-search">
          <strong>No matching articles.</strong>
          <p>Try another keyword or choose a different category.</p>
        </div>
      ) : null}
    </section>
  );
}
