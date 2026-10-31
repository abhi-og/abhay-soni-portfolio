"use client";

import { useEffect } from "react";

/**
 * Site-wide motion behaviour (no visual output of its own):
 *  1. Reveals `.reveal` elements when they scroll into view (staggered per row)
 *  2. Toggles `.is-scrolled` on <html> so the sticky header can condense
 *  3. Sets --pointer-x/--pointer-y on the hero for a soft cursor glow
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    root.classList.add("motion-ready");

    // 1. Scroll reveal
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    targets.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
        : [];
      el.style.setProperty("--i", String(Math.max(0, siblings.indexOf(el)) % 6));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    // 2. Header state
    const onScroll = () => root.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3. Hero cursor glow (fine pointers only)
    const hero = document.querySelector<HTMLElement>(".hero");
    const fine = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (!hero) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--pointer-x", `${e.clientX - r.left}px`);
        hero.style.setProperty("--pointer-y", `${e.clientY - r.top}px`);
      });
    };
    if (hero && fine) hero.addEventListener("pointermove", onMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (hero && fine) hero.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      root.classList.remove("motion-ready", "is-scrolled");
    };
  }, []);

  return null;
}
