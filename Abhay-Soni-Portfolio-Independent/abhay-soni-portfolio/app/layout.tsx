import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import { MotionEffects } from "./components/MotionEffects";

export const metadata: Metadata = {
  title: {
    default: "Abhay Soni — Portfolio & Journal",
    template: "%s — Abhay Soni",
  },
  description:
    "Abhay Soni is a Computer Science student building modern web applications, exploring AI, and turning ideas into real-world projects.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <style>{`
          .boot-intro--auto { animation: boot-intro-leave .55s ease 2.05s forwards; }
          .boot-intro--auto .boot-progress span { width: 0; animation: boot-progress-fill 1.7s linear .12s forwards; }
          @keyframes boot-progress-fill { to { width: 100%; } }
          @keyframes boot-intro-leave { to { opacity: 0; visibility: hidden; pointer-events: none; } }
          @media (prefers-reduced-motion: reduce) { .boot-intro--auto { display: none; } }
        `}</style>
      </head>
      <body>
        <section className="boot-intro boot-intro--auto" aria-label="Loading portfolio">
          <div className="boot-meta">
            <span>Abhay Soni / Portfolio</span>
            <span>00 / 100</span>
          </div>
          <div className="boot-center">
            <p className="boot-kicker">System readying</p>
            <h1>ABHAY<span>_</span></h1>
            <div className="boot-lines">
              <p className="is-active"><b>[ OK ]</b> Loading selected work</p>
              <p className="is-active"><b>[ OK ]</b> Connecting ideas</p>
              <p className="is-active"><b>[ OK ]</b> Preparing the portfolio</p>
            </div>
          </div>
          <div className="boot-bottom">
            <div className="boot-progress"><span /></div>
            <span>Enter ↗</span>
          </div>
        </section>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
