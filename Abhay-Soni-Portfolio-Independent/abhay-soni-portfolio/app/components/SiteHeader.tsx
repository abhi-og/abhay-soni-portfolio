import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { SectionLink } from "./SectionLink";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Abhay Soni home">
        <span className="brand-mark">AS</span>
        <span>Abhay Soni</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <SectionLink section="work">Work</SectionLink>
        <SectionLink section="about">About</SectionLink>
        <SectionLink section="skills">Skills</SectionLink>
        <SectionLink section="certificates">Certificates</SectionLink>
        <SectionLink section="writing">Writing</SectionLink>
        <SectionLink section="contact">Contact</SectionLink>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <Link className="header-cta" href="/resume">
          Resume <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
