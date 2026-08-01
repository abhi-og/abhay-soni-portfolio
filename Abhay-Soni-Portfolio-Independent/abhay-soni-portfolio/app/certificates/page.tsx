import Link from "next/link";
import type { Metadata } from "next";
import { CollectionExplorer } from "../components/CollectionExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPortfolioItems, splitTags } from "../../lib/portfolio";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Explore certifications and achievements earned by Abhay Soni.",
};

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const certificates = await getPortfolioItems("certificate");
  const items = certificates.map((item) => ({ ...item, tags: splitTags(item.tags) }));

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <Link className="text-link archive-back-link" href="/#certificates">
          ← Back to homepage
        </Link>
        <section className="projects-hero">
          <p className="eyebrow"><span className="eyebrow-line" />Certificate archive</p>
          <h1>Learning, documented and validated.</h1>
          <p>Search every certificate or filter the collection by topic.</p>
        </section>
        <CollectionExplorer items={items} type="certificate" />
        <SiteFooter />
      </div>
    </main>
  );
}
