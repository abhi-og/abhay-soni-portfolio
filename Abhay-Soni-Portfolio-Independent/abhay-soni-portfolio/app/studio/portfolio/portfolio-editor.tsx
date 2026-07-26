"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioItem } from "../../../db/schema";
import { slugify } from "../../../lib/text";

type ItemKind = PortfolioItem["kind"];
type ItemDraft = {
  id: number | null;
  kind: ItemKind;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  tags: string;
  url: string;
  dateLabel: string;
  sortOrder: number;
  featured: boolean;
};

const emptyDraft: ItemDraft = {
  id: null,
  kind: "skill",
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  tags: "",
  url: "",
  dateLabel: "",
  sortOrder: 0,
  featured: false,
};

const labels: Record<ItemKind, string> = {
  skill: "Skills",
  certificate: "Certificates",
  education: "Education",
  project: "Projects",
};

function toDraft(item: PortfolioItem): ItemDraft {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    slug: item.slug,
    subtitle: item.subtitle,
    description: item.description,
    tags: item.tags,
    url: item.url,
    dateLabel: item.dateLabel,
    sortOrder: item.sortOrder,
    featured: item.featured,
  };
}

export function PortfolioEditor({
  initialItems,
  initialKind,
  userName,
}: {
  initialItems: PortfolioItem[];
  initialKind: ItemKind;
  userName: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [kind, setKind] = useState<ItemKind>(initialKind);
  const firstItem = initialItems.find((item) => item.kind === initialKind);
  const [draft, setDraft] = useState<ItemDraft>(
    firstItem ? toDraft(firstItem) : emptyDraft,
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(firstItem));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const visibleItems = useMemo(
    () =>
      items
        .filter((item) => item.kind === kind)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [items, kind],
  );

  function chooseKind(nextKind: ItemKind) {
    setKind(nextKind);
    const first = items.find((item) => item.kind === nextKind);
    setDraft(first ? toDraft(first) : { ...emptyDraft, kind: nextKind });
    setSlugTouched(Boolean(first));
    setMessage("");
    setError("");
  }

  function chooseItem(item: PortfolioItem) {
    setDraft(toDraft(item));
    setSlugTouched(true);
    setMessage("");
    setError("");
  }

  function createNew() {
    setDraft({ ...emptyDraft, kind });
    setSlugTouched(false);
    setMessage("");
    setError("");
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(
        draft.id ? `/api/portfolio/${draft.id}` : "/api/portfolio",
        {
          method: draft.id ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const data = (await response.json()) as {
        item?: PortfolioItem;
        error?: string;
      };
      if (!response.ok || !data.item) {
        throw new Error(data.error || "The item could not be saved.");
      }
      const saved = data.item;
      setItems((current) => {
        const exists = current.some((item) => item.id === saved.id);
        return exists
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [...current, saved];
      });
      setDraft(toDraft(saved));
      setSlugTouched(true);
      setMessage(`${labels[saved.kind].slice(0, -1) || "Item"} saved.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!draft.id || !window.confirm(`Delete “${draft.title}”?`)) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/portfolio/${draft.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed.");
      setItems((current) => current.filter((item) => item.id !== draft.id));
      setDraft({ ...emptyDraft, kind });
      setSlugTouched(false);
      setMessage("Item deleted.");
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="portfolio-editor-page">
      <header className="portfolio-editor-header">
        <div>
          <Link href="/studio">← Writing studio</Link>
          <span>Signed in as {userName}</span>
        </div>
        <Link className="text-link" href="/" target="_blank">
          View portfolio ↗
        </Link>
      </header>

      <section className="portfolio-editor-layout">
        <aside className="portfolio-editor-nav">
          <p className="section-number">Portfolio editor</p>
          <h1>Manage everything you show.</h1>
          <nav aria-label="Portfolio sections">
            {(Object.keys(labels) as ItemKind[]).map((value) => (
              <button
                className={kind === value ? "active" : ""}
                key={value}
                type="button"
                onClick={() => chooseKind(value)}
              >
                <span>{labels[value]}</span>
                <small>{items.filter((item) => item.kind === value).length}</small>
              </button>
            ))}
          </nav>
          <button className="studio-new" type="button" onClick={createNew}>
            ＋ New {labels[kind].slice(0, -1)}
          </button>
          <div className="portfolio-item-list">
            {visibleItems.map((item) => (
              <button
                className={draft.id === item.id ? "active" : ""}
                key={item.id}
                type="button"
                onClick={() => chooseItem(item)}
              >
                <span>{item.title}</span>
                <small>Order {item.sortOrder}</small>
              </button>
            ))}
          </div>
        </aside>

        <form className="portfolio-item-form" onSubmit={save}>
          <div className="editor-heading">
            <div>
              <p className="section-number">
                {draft.id ? `Edit ${labels[draft.kind].slice(0, -1)}` : "New item"}
              </p>
              <h2>{draft.id ? draft.title : `Add to ${labels[kind]}`}</h2>
            </div>
            <div className="editor-actions">
              {draft.id ? (
                <button
                  className="delete-button"
                  disabled={saving}
                  type="button"
                  onClick={remove}
                >
                  Delete
                </button>
              ) : null}
              <button className="button button-dark" disabled={saving} type="submit">
                {saving ? "Saving…" : "Save item"}
              </button>
            </div>
          </div>

          {message ? <p className="editor-message success">{message}</p> : null}
          {error ? <p className="editor-message error">{error}</p> : null}

          <div className="editor-grid">
            <label className="field">
              <span>Section</span>
              <select
                value={draft.kind}
                onChange={(event) => {
                  const nextKind = event.target.value as ItemKind;
                  setKind(nextKind);
                  setDraft((current) => ({ ...current, kind: nextKind }));
                }}
              >
                <option value="skill">Skill</option>
                <option value="certificate">Certificate</option>
                <option value="education">Education</option>
                <option value="project">Project</option>
              </select>
            </label>
            <label className="field">
              <span>Display order</span>
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    sortOrder: Number(event.target.value),
                  }))
                }
              />
            </label>
            <label className="field field-wide">
              <span>Title</span>
              <input
                required
                value={draft.title}
                placeholder="Item title"
                onChange={(event) => {
                  const title = event.target.value;
                  setDraft((current) => ({
                    ...current,
                    title,
                    slug: slugTouched
                      ? current.slug
                      : slugify(`${current.kind}-${title}`),
                  }));
                }}
              />
            </label>
            <label className="field">
              <span>Slug</span>
              <input
                required
                value={draft.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setDraft((current) => ({
                    ...current,
                    slug: slugify(event.target.value),
                  }));
                }}
              />
            </label>
            <label className="field">
              <span>Organisation / subtitle</span>
              <input
                value={draft.subtitle}
                placeholder="Oracle, CBSE, project type…"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, subtitle: event.target.value }))
                }
              />
            </label>
            <label className="field field-wide">
              <span>Description</span>
              <textarea
                rows={5}
                value={draft.description}
                placeholder="What should visitors know?"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Tags</span>
              <input
                value={draft.tags}
                placeholder="React, Next.js, AI"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, tags: event.target.value }))
                }
              />
            </label>
            <label className="field">
              <span>Date / period</span>
              <input
                value={draft.dateLabel}
                placeholder="2026 or 2026 — 2030"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, dateLabel: event.target.value }))
                }
              />
            </label>
            <label className="field field-wide">
              <span>
                {draft.kind === "certificate"
                  ? "Certificate link"
                  : "External link (optional)"}
              </span>
              {draft.kind === "certificate" ? (
                <small>
                  Add a public Google Drive, Credly, verification, or certificate URL.
                </small>
              ) : null}
              <input
                value={draft.url}
                placeholder={
                  draft.kind === "certificate"
                    ? "https://drive.google.com/... or verification link"
                    : "https://..."
                }
                type="url"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, url: event.target.value }))
                }
              />
            </label>
            <label className="feature-toggle field-wide">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
              <span>
                <strong>
                  {draft.kind === "certificate"
                    ? "Feature this certificate"
                    : "Feature this item"}
                </strong>
                <small>
                  {draft.kind === "certificate"
                    ? "Mark it as one of your most important achievements."
                    : "Mark it as an important portfolio entry."}
                </small>
              </span>
            </label>
          </div>
        </form>
      </section>
    </main>
  );
}
