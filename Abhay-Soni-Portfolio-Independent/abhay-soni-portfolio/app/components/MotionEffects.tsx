"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    root.classList.add("motion-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const seen = new WeakSet<Element>();
    const register = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const row = el.parentElement
          ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
          : [];
        el.style.setProperty("--i", String(Math.max(0, row.indexOf(el)) % 6));
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-visible");
        } else {
          el.classList.add("will-reveal");
          io.observe(el);
        }
      });
    };
    register();
    const mo = new MutationObserver(register);
    mo.observe(document.body, { childList: true, subtree: true });
    const rescue = window.setTimeout(() => {
      document.querySelectorAll(".reveal.will-reveal:not(.is-visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 4000);

    const hero = document.querySelector<HTMLElement>(".hero");
    const fine = window.matchMedia("(pointer: fine)").matches;
    let pointerRaf = 0;
    let scrollRaf = 0;

    // The reference has scroll-linked depth. This creates the same sense of
    // momentum with a light, original effect and does not replace native scrolling.
    const depthTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-card, .skill-card, .certificate-card, .section-heading, .about-statement",
      ),
    );
    const updateScrollMotion = () => {
      const viewportCenter = window.innerHeight / 2;
      depthTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
        const shift = Math.max(-14, Math.min(14, distance * -18));
        // The individual translate property composes safely with existing hover transforms.
        el.style.translate = `0 ${shift.toFixed(2)}px`;
      });
    };
    const onScroll = () => {
      root.classList.toggle("is-scrolled", window.scrollY > 24);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / maxScroll)));
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateScrollMotion);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onMove = (event: PointerEvent) => {
      if (!hero) return;
      cancelAnimationFrame(pointerRaf);
      pointerRaf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      });
    };
    if (hero && fine) hero.addEventListener("pointermove", onMove);

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".button, .header-cta"));
    const resetMagnetic = (el: HTMLElement) => {
      el.style.removeProperty("--magnet-x");
      el.style.removeProperty("--magnet-y");
    };
    const onMagnetMove = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--magnet-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 5}px`);
      el.style.setProperty("--magnet-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 5}px`);
    };
    if (fine) magnetic.forEach((el) => {
      el.addEventListener("pointermove", onMagnetMove);
      el.addEventListener("pointerleave", () => resetMagnetic(el));
    });

    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".project-card, .skill-card, .certificate-card"));
    const resetTilt = (el: HTMLElement) => {
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.classList.remove("is-tilting");
    };
    const onTiltMove = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--tilt-x", `${(((event.clientX - rect.left) / rect.width) - 0.5) * 3.2}deg`);
      el.style.setProperty("--tilt-y", `${(((event.clientY - rect.top) / rect.height) - 0.5) * -3.2}deg`);
      el.classList.add("is-tilting");
    };
    if (fine) tiltCards.forEach((el) => {
      el.addEventListener("pointermove", onTiltMove);
      el.addEventListener("pointerleave", () => resetTilt(el));
    });

    return () => {
      io.disconnect(); mo.disconnect(); window.clearTimeout(rescue);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (hero && fine) hero.removeEventListener("pointermove", onMove);
      if (fine) magnetic.forEach(resetMagnetic);
      if (fine) tiltCards.forEach(resetTilt);
      depthTargets.forEach((el) => { el.style.translate = ""; });
      root.style.removeProperty("--scroll-progress");
      cancelAnimationFrame(pointerRaf); cancelAnimationFrame(scrollRaf);
      root.classList.remove("motion-ready", "is-scrolled");
    };
  }, []);
  return null;
}
