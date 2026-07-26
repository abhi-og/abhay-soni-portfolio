import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ReadingProgress } from "../../components/ReadingProgress";
import {
  formatPostDate,
  getPublishedPostBySlug,
  readingTime,
} from "../../../lib/posts";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  return post
    ? { title: post.title, description: post.excerpt }
    : { title: "Article not found" };
}

function renderBlock(block: string, index: number) {
  const value = block.trim();
  if (value.startsWith("## ")) {
    return <h2 key={index}>{value.slice(3)}</h2>;
  }
  if (value.startsWith("> ")) {
    return <blockquote key={index}>{value.slice(2)}</blockquote>;
  }
  return <p key={index}>{value}</p>;
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <ReadingProgress />
      <div className="page-shell">
        <SiteHeader />
        <article className="article">
          <Link className="article-back" href="/blog">
            ← Back to journal
          </Link>
          <header className="article-header">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {post.category}
            </p>
            <h1>{post.title}</h1>
            <p className="article-deck">{post.excerpt}</p>
            <div className="article-byline">
              <span className="byline-mark">AS</span>
              <span>
                <strong>Abhay Soni</strong>
                <small>
                  {formatPostDate(post.publishedAt)} · {readingTime(post.content)}
                </small>
              </span>
            </div>
          </header>
          <div className="article-rule">
            <span>✦</span>
          </div>
          <div className="article-body">
            {post.content.split(/\n{2,}/).map(renderBlock)}
          </div>
          <footer className="article-footer">
            <p>Thanks for reading.</p>
            <Link className="button button-dark" href="/blog">
              More from the journal <span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
