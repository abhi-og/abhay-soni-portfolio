"use client";

import { useEffect } from "react";

/**
 * Site-wide motion behaviour (no visual output of its own):
 *  1. Reveals `.reveal` elements when they scroll into view (staggered per row)
 *  2. Toggles `.is-scrolled` on <html> so the sticky header can condense
 *  3. Sets --pointer-x/--pointer-y on the hero for a soft cursor glow
 *  4. Gives primary controls a small, pointer-aware magnetic response
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    root.classList.add("motion-ready");

    // 1. Scroll reveal. An element is only hidden once it is being watched
    //    (.will-reveal), so content that arrives late (streamed from the
    //    database) can never get stuck invisible.
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
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-visible"); // already on screen: leave it alone
        } else {
          el.classList.add("will-reveal");
          io.observe(el);
        }
      });
    };
    register();
    const mo = new MutationObserver(register);
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety net: never leave anything hidden for more than a few seconds
    const rescue = window.setTimeout(() => {
      document
        .querySelectorAll(".reveal.will-reveal:not(.is-visible)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) el.classList.add("is-visible");
        });
    }, 4000);

    // 2. Header state + a very small reading-progress signal.
    const onScroll = () => {
      root.classList.toggle("is-scrolled", window.scrollY > 24);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / maxScroll)));
    };
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

    // 4. Button motion: intentionally small so controls still feel precise.
    const magnetic = Array.from(
      document.querySelectorAll<HTMLElement>(".button, .header-cta"),
    );
    const resetMagnetic = (el: HTMLElement) => {
      el.style.removeProperty("--magnet-x");
      el.style.removeProperty("--magnet-y");
    };
    const onMagnetMove = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
      el.style.setProperty("--magnet-x", `${x}px`);
      el.style.setProperty("--magnet-y", `${y}px`);
    };
    if (fine) {
      magnetic.forEach((el) => {
        el.addEventListener("pointermove", onMagnetMove);
        el.addEventListener("pointerleave", () => resetMagnetic(el));
      });
    }

    // 5. Cards gain depth while remaining completely still for keyboard and touch users.
    const tiltCards = Array.from(
      document.querySelectorAll<HTMLElement>(".project-card, .skill-card, .certificate-card"),
    );
    const resetTilt = (el: HTMLElement) => {
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.classList.remove("is-tilting");
    };
    const onTiltMove = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${x * 3.2}deg`);
      el.style.setProperty("--tilt-y", `${y * -3.2}deg`);
      el.classList.add("is-tilting");
    };
    if (fine) {
      tiltCards.forEach((el) => {
        el.addEventListener("pointermove", onTiltMove);
        el.addEventListener("pointerleave", () => resetTilt(el));
      });
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(rescue);
      window.removeEventListener("scroll", onScroll);
      if (hero && fine) hero.removeEventListener("pointermove", onMove);
      if (fine) magnetic.forEach((el) => resetMagnetic(el));
      if (fine) tiltCards.forEach((el) => resetTilt(el));
      root.style.removeProperty("--scroll-progress");
      cancelAnimationFrame(raf);
      root.classList.remove("motion-ready", "is-scrolled");
    };
  }, []);

  return null;
}
