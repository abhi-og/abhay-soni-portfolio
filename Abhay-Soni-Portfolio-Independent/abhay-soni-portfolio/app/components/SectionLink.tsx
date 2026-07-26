"use client";

import type { MouseEvent, ReactNode } from "react";

export function SectionLink({
  section,
  children,
  className,
}: {
  section: string;
  children: ReactNode;
  className?: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") return;

    const target = document.getElementById(section);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${section}`);
  }

  return (
    <a className={className} href={`/#${section}`} onClick={handleClick}>
      {children}
    </a>
  );
}
