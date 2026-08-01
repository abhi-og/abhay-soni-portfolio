import Link from "next/link";
import type { Metadata } from "next";
import { BlogExplorer } from "../components/BlogExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { formatPostDate, getPublishedPosts, readingTime } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: "Build notes, product thoughts, and lessons from Abhay Soni.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const articleData = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: formatPostDate(post.publishedAt),
    readingTime: readingTime(post.content),
  }));

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <Link className="text-link archive-back-link" href="/#writing">
  ← Back to homepage
</Link>
        <section className="journal-hero">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            The journal
          </p>
          <h1>Ideas, build notes, and lessons worth keeping.</h1>
          <p>
            A growing collection of what I&apos;m making, what I&apos;m
            learning, and the questions I&apos;m still figuring out.
          </p>
        </section>

        <BlogExplorer posts={articleData} />

        <SiteFooter />
      </div>
    </main>
  );
}
