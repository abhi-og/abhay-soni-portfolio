"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide motion behaviour (no visual output of its own):
 *  1. Reveals `.reveal` elements when they scroll into view (staggered per row)
 *  2. Toggles `.is-scrolled` on <html> so the sticky header can condense
 *  3. Sets --pointer-x/--pointer-y on the hero for a soft cursor glow
 *  4. Gives primary controls a small, pointer-aware magnetic response
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function MotionEffects() {
  const soundEnabledRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    root.classList.add("motion-ready");
    const syncSoundSetting = () => {
      soundEnabledRef.current = window.localStorage.getItem("abhay-portfolio-sound") !== "off";
    };
    syncSoundSetting();
    window.addEventListener("portfolio-sound-change", syncSoundSetting);

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
    // Scroll-linked depth: small enough to feel natural, while native scroll
    // remains fast and accessible on trackpads, touch devices, and keyboards.
    const depthTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-card, .skill-card, .certificate-card, .section-heading, .about-statement",
      ),
    );
    let scrollRaf = 0;
    const updateScrollDepth = () => {
      const viewportCenter = window.innerHeight / 2;
      depthTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
        const shift = Math.max(-14, Math.min(14, distance * -18));
        // Individual translate composes safely with existing card hover transforms.
        el.style.translate = `0 ${shift.toFixed(2)}px`;
      });
    };
    const onScroll = () => {
      root.classList.toggle("is-scrolled", window.scrollY > 24);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / maxScroll)));
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateScrollDepth);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

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

    // 5. Synthesized sound layer. It uses the Web Audio API, so no sound files
    // need to be uploaded. Browsers allow it only after a visitor interaction.
    let audio: AudioContext | null = null;
    const getAudio = () => {
      if (!audio) {
        const Audio = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Audio) return null;
        audio = new Audio();
      }
      if (audio.state === "suspended") void audio.resume();
      return audio;
    };
    const tone = (frequency: number, duration: number, volume: number, offset = 0) => {
      if (!soundEnabledRef.current) return;
      const context = getAudio();
      if (!context) return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + offset);
      gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + offset + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime + offset);
      oscillator.stop(context.currentTime + offset + duration + 0.02);
    };
    const onInteractivePress = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("button, a, label, input, select") : null;
      if (!target || target.hasAttribute("data-sound-toggle")) return;
      if (target.classList.contains("skip-button")) {
        tone(220, 0.13, 0.025);
        tone(330, 0.2, 0.02, 0.1);
      } else {
        tone(target.tagName === "A" ? 420 : 300, 0.075, 0.018);
      }
    };
    document.addEventListener("pointerdown", onInteractivePress, true);

    // 6. Cards gain depth while remaining completely still for keyboard and touch users.
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
      window.removeEventListener("resize", onScroll);
      if (hero && fine) hero.removeEventListener("pointermove", onMove);
      if (fine) magnetic.forEach((el) => resetMagnetic(el));
      if (fine) tiltCards.forEach((el) => resetTilt(el));
      document.removeEventListener("pointerdown", onInteractivePress, true);
      window.removeEventListener("portfolio-sound-change", syncSoundSetting);
      depthTargets.forEach((el) => { el.style.translate = ""; });
      root.style.removeProperty("--scroll-progress");
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      root.classList.remove("motion-ready", "is-scrolled");
    };
  }, []);

  return null;
}
