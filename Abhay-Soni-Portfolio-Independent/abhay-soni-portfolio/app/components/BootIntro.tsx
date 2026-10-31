"use client";

import { useEffect, useState } from "react";

const bootLines = [
  "Connecting ideas to the web…",
  "Loading projects and experiments…",
  "Preparing the portfolio…",
];

export function BootIntro() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const saved = window.sessionStorage.getItem("portfolio-intro-seen");
    if (saved) {
      setVisible(false);
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 4, 100);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            window.sessionStorage.setItem("portfolio-intro-seen", "true");
            setVisible(false);
          }, 360);
        }
        return next;
      });
    }, 85);

    return () => window.clearInterval(timer);
  }, []);

  if (!visible) return null;
  const activeLine = Math.min(bootLines.length - 1, Math.floor(progress / 34));

  return (
    <section className="boot-intro" aria-label="Loading portfolio">
      <div className="boot-meta">
        <span>Abhay Soni / Portfolio</span>
        <span>{String(progress).padStart(2, "0")} / 100</span>
      </div>
      <div className="boot-center">
        <p className="boot-kicker">System readying</p>
        <h1>ABHAY<span>_</span></h1>
        <div className="boot-lines" aria-live="polite">
          {bootLines.map((line, index) => (
            <p className={index <= activeLine ? "is-active" : ""} key={line}>
              <b>[{index <= activeLine ? " OK " : " .. "}]</b> {line}
            </p>
          ))}
        </div>
      </div>
      <div className="boot-bottom">
        <div className="boot-progress"><span style={{ width: `${progress}%` }} /></div>
        <button onClick={() => setVisible(false)} type="button">Skip intro ↗</button>
      </div>
    </section>
  );
}
