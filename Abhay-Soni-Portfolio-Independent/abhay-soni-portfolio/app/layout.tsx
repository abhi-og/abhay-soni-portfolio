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
          .boot-intro--cinematic {
            overflow: hidden;
            animation: boot-intro-leave .85s cubic-bezier(.76,0,.24,1) 6.1s forwards;
          }
          .boot-intro--cinematic::after {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(115deg, transparent 20%, rgba(167,139,250,.13) 50%, transparent 80%);
            transform: translateX(-110%); animation: boot-sweep 2.8s ease .55s infinite;
          }
          .boot-intro--cinematic .boot-meta,
          .boot-intro--cinematic .boot-bottom { animation: boot-fade-up .7s ease .2s both; }
          .boot-cinematic-center { position: relative; z-index: 1; align-self: center; width: min(100%, 980px); min-height: min(44vw, 460px); }
          .boot-stage { position: absolute; inset: 0; display: grid; align-content: center; opacity: 0; transform: translateY(26px); }
          .boot-stage p { margin: 0 0 16px; color: #a78bfa; font: 500 clamp(.66rem,1.1vw,.8rem)/1.3 var(--mono); letter-spacing: .16em; text-transform: uppercase; }
          .boot-stage h1 { max-width: 900px; margin: 0; color: #f6f5fb; font: 600 clamp(3.5rem,10vw,9rem)/.88 var(--sans); letter-spacing: -.075em; }
          .boot-stage h1 em { color: #a78bfa; font-style: normal; }
          .boot-stage--one { animation: boot-stage-a 1.45s cubic-bezier(.16,1,.3,1) .35s both; }
          .boot-stage--two { animation: boot-stage-a 1.65s cubic-bezier(.16,1,.3,1) 1.55s both; }
          .boot-stage--three { animation: boot-stage-a 2.35s cubic-bezier(.16,1,.3,1) 3.1s both; }
          .boot-stage--three h1 { font-size: clamp(3rem,8vw,7.2rem); }
          .boot-intro--cinematic .boot-progress span { width: 0; animation: boot-progress-fill 5.45s cubic-bezier(.22,1,.36,1) .25s forwards; }
          .boot-intro--cinematic .boot-bottom span:last-child { color: #a78bfa; }
          @keyframes boot-stage-a {
            0% { opacity: 0; transform: translateY(28px); filter: blur(8px); }
            16%, 72% { opacity: 1; transform: translateY(0); filter: blur(0); }
            100% { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
          }
          @keyframes boot-progress-fill { to { width: 100%; } }
          @keyframes boot-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes boot-sweep { to { transform: translateX(110%); } }
          @keyframes boot-intro-leave { to { opacity: 0; visibility: hidden; pointer-events: none; } }
          @media (prefers-reduced-motion: reduce) { .boot-intro--cinematic { display: none; } }
        `}</style>
      </head>
      <body>
        <section className="boot-intro boot-intro--cinematic" aria-label="Opening portfolio">
          <div className="boot-meta">
            <span>Abhay Soni / Portfolio 2026</span>
            <span>Loading narrative</span>
          </div>
          <div className="boot-cinematic-center">
            <div className="boot-stage boot-stage--one">
              <p>01 / A thought begins</p>
              <h1>Every project<br />starts with an <em>idea.</em></h1>
            </div>
            <div className="boot-stage boot-stage--two">
              <p>02 / Make it useful</p>
              <h1>Ideas become better<br />when they are <em>shared.</em></h1>
            </div>
            <div className="boot-stage boot-stage--three">
              <p>03 / Welcome in</p>
              <h1>Good ideas get better<br />through <em>conversation.</em></h1>
            </div>
          </div>
          <div className="boot-bottom">
            <div className="boot-progress"><span /></div>
            <span>Enter portfolio ↗</span>
          </div>
        </section>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
