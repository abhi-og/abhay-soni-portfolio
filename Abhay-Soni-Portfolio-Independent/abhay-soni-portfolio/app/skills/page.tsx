import Link from "next/link";
import type { Metadata } from "next";
import { CollectionExplorer } from "../components/CollectionExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPortfolioItems, splitTags } from "../../lib/portfolio";

export const metadata: Metadata = {
  title: "Skills",
  description: "Explore Abhay Soni's complete toolkit across web development, programming, collaboration, and AI.",
};

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await getPortfolioItems("skill");
  const items = skills.map((item) => ({ ...item, tags: splitTags(item.tags) }));

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <Link className="text-link archive-back-link" href="/#skills">
          ← Back to homepage
        </Link>
        <section className="projects-hero">
          <p className="eyebrow"><span className="eyebrow-line" />Skill archive</p>
          <h1>Tools, technologies, and capabilities.</h1>
          <p>Search the complete skill collection or filter it by topic.</p>
        </section>
        <CollectionExplorer items={items} type="skill" />
        <SiteFooter />
      </div>
    </main>
  );
}
