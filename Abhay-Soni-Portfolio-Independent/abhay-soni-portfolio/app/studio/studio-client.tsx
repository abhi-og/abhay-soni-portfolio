"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "../../db/schema";
import { slugify } from "../../lib/text";

type Draft = {
  id: number | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
};

type StudioClientProps = {
  initialPosts: Post[];
  userName: string;
  signOutPath: string;
};

const emptyDraft: Draft = {
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Build Notes",
  status: "draft",
  featured: false,
};

function postToDraft(post: Post): Draft {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    status: post.status,
    featured: post.featured,
  };
}

export function StudioClient({
  initialPosts,
  userName,
  signOutPath,
}: StudioClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState<Draft>(
    initialPosts[0] ? postToDraft(initialPosts[0]) : emptyDraft,
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPosts[0]));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const stats = useMemo(
    () => ({
      published: posts.filter((post) => post.status === "published").length,
      drafts: posts.filter((post) => post.status === "draft").length,
    }),
    [posts],
  );

  function choosePost(post: Post) {
    setDraft(postToDraft(post));
    setSlugTouched(true);
    setMessage("");
    setError("");
  }

  function createNew() {
    setDraft(emptyDraft);
    setSlugTouched(false);
    setMessage("");
    setError("");
  }

  async function savePost(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        draft.id ? `/api/posts/${draft.id}` : "/api/posts",
        {
          method: draft.id ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const data = (await response.json()) as { post?: Post; error?: string };
      if (!response.ok || !data.post) {
        throw new Error(data.error || "The article could not be saved.");
      }

      const saved = data.post;
      setPosts((current) => {
        const exists = current.some((post) => post.id === saved.id);
        return exists
          ? current.map((post) => (post.id === saved.id ? saved : post))
          : [saved, ...current];
      });
      setDraft(postToDraft(saved));
      setSlugTouched(true);
      setMessage(saved.status === "published" ? "Article published." : "Draft saved.");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "The article could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deletePost() {
    if (!draft.id) return;
    if (!window.confirm(`Delete “${draft.title}”? This cannot be undone.`)) return;

    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/posts/${draft.id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Delete failed.");
      setPosts((current) => current.filter((post) => post.id !== draft.id));
      setDraft(emptyDraft);
      setSlugTouched(false);
      setMessage("Article deleted.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="studio">
      <aside className="studio-sidebar">
        <div className="studio-brand">
          <span className="brand-mark">AS</span>
          <span>
            <strong>Writing Studio</strong>
            <small>Abhay Soni</small>
          </span>
        </div>

        <button className="studio-new" type="button" onClick={createNew}>
          <span>＋</span> Write new blog
        </button>
        <Link
          className="studio-manage-link"
          href="/studio/portfolio?section=skill"
        >
          <span>◆</span>
          Edit skills
        </Link>
        <Link
          className="studio-manage-link"
          href="/studio/portfolio?section=certificate"
        >
          <span>◇</span>
          Edit certificates
        </Link>

        <div className="studio-stats">
          <span>
            <strong>{stats.published}</strong> Published
          </span>
          <span>
            <strong>{stats.drafts}</strong> Drafts
          </span>
        </div>

        <div className="studio-posts" aria-label="Your articles">
          <p>Articles</p>
          {posts.map((post) => (
            <button
              className={draft.id === post.id ? "active" : ""}
              key={post.id}
              type="button"
              onClick={() => choosePost(post)}
            >
              <span>{post.title}</span>
              <small className={post.status}>
                {post.status === "published" ? "Published" : "Draft"}
              </small>
            </button>
          ))}
        </div>

        <div className="studio-sidebar-footer">
          <Link href="/" target="_blank">
            View portfolio ↗
          </Link>
          <a href={signOutPath}>Sign out</a>
        </div>
      </aside>

      <section className="studio-workspace">
        <header className="studio-topbar">
          <div>
            <span className="status-dot" />
            Signed in as {userName}
          </div>
          <p>Your private publishing space</p>
        </header>

        <form className="editor-form" onSubmit={savePost}>
          <div className="editor-heading">
            <div>
              <p className="section-number">
                {draft.id ? "Edit blog article" : "New blog article"}
              </p>
              <h1>{draft.id ? "Shape the next version." : "Start with an idea."}</h1>
            </div>
            <div className="editor-actions">
              {draft.id ? (
                <button
                  className="delete-button"
                  disabled={saving}
                  type="button"
                  onClick={deletePost}
                >
                  Delete
                </button>
              ) : null}
              <button className="button button-dark" disabled={saving} type="submit">
                {saving
                  ? "Saving…"
                  : draft.status === "published"
                    ? "Publish article"
                    : "Save draft"}
              </button>
            </div>
          </div>

          {message ? <p className="editor-message success">{message}</p> : null}
          {error ? <p className="editor-message error">{error}</p> : null}

          <div className="editor-grid">
            <label className="field field-wide">
              <span>Article title</span>
              <input
                required
                value={draft.title}
                placeholder="A title worth opening"
                onChange={(event) => {
                  const title = event.target.value;
                  setDraft((current) => ({
                    ...current,
                    title,
                    slug: slugTouched ? current.slug : slugify(title),
                  }));
                }}
              />
            </label>

            <label className="field">
              <span>URL slug</span>
              <input
                required
                value={draft.slug}
                placeholder="your-article-url"
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
              <span>Category</span>
              <input
                required
                value={draft.category}
                placeholder="Build Notes"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              />
            </label>

            <label className="field field-wide">
              <span>Short description</span>
              <textarea
                rows={3}
                required
                value={draft.excerpt}
                placeholder="Give readers one clear reason to continue…"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    excerpt: event.target.value,
                  }))
                }
              />
            </label>

            <label className="field field-wide">
              <span>Article body</span>
              <small>
                Separate paragraphs with a blank line. Start a heading with ##.
              </small>
              <textarea
                className="content-editor"
                rows={18}
                required
                value={draft.content}
                placeholder={"Write the opening…\n\n## Add a heading\n\nContinue the story."}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    content: event.target.value,
                  }))
                }
              />
            </label>

            <label className="field">
              <span>Visibility</span>
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    status: event.target.value as "draft" | "published",
                  }))
                }
              >
                <option value="draft">Keep as draft</option>
                <option value="published">Publish now</option>
              </select>
            </label>

            <label className="feature-toggle">
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
                <strong>Feature this article</strong>
                <small>Show it as the lead story in your journal.</small>
              </span>
            </label>
          </div>
        </form>
      </section>
    </main>
  );
}
