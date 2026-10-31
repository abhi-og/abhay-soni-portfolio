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
          .boot-skip-toggle { position: fixed; opacity: 0; pointer-events: none; }
          .boot-intro--extended {
            overflow: hidden;
            animation: boot-intro-leave .9s cubic-bezier(.76,0,.24,1) 10.15s forwards;
          }
          .boot-skip-toggle:checked + .boot-intro--extended { animation: none; opacity: 0; visibility: hidden; pointer-events: none; }
          .boot-intro--extended::after {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(115deg, transparent 20%, rgba(167,139,250,.13) 50%, transparent 80%);
            transform: translateX(-110%); animation: boot-sweep 3s ease .55s infinite;
          }
          .boot-intro--extended .boot-meta,
          .boot-intro--extended .boot-bottom { animation: boot-fade-up .7s ease .2s both; }
          .boot-cinematic-center { position: relative; z-index: 1; align-self: center; width: min(100%, 980px); min-height: min(44vw, 460px); }
          .boot-stage { position: absolute; inset: 0; display: grid; align-content: center; opacity: 0; transform: translateY(26px); }
          .boot-stage p { margin: 0 0 16px; color: #a78bfa; font: 500 clamp(.66rem,1.1vw,.8rem)/1.3 var(--mono); letter-spacing: .16em; text-transform: uppercase; }
          .boot-stage h1 { max-width: 930px; margin: 0; color: #f6f5fb; font: 600 clamp(3.5rem,10vw,9rem)/.88 var(--sans); letter-spacing: -.075em; }
          .boot-stage h1 em { color: #a78bfa; font-style: normal; }
          .boot-stage--one { animation: boot-stage-a 2.05s cubic-bezier(.16,1,.3,1) .35s both; }
          .boot-stage--two { animation: boot-stage-a 2.2s cubic-bezier(.16,1,.3,1) 2.25s both; }
          .boot-stage--three { animation: boot-stage-a 2.25s cubic-bezier(.16,1,.3,1) 4.35s both; }
          .boot-stage--four { animation: boot-stage-a 2.9s cubic-bezier(.16,1,.3,1) 6.6s both; }
          .boot-stage--three h1 { font-size: clamp(3rem,8vw,7.2rem); }
          .boot-stage--four h1 { font-size: clamp(3.2rem,8.5vw,7.7rem); }
          .boot-signal-row { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
          .boot-signal-row span { border: 1px solid rgba(246,245,251,.24); padding: 7px 9px; color: #c6c2d2; font: 500 .62rem/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; }
          .boot-signal-row span:first-child { border-color: #a78bfa; color: #a78bfa; }
          .boot-intro--extended .boot-progress span { width: 0; animation: boot-progress-fill 9.45s cubic-bezier(.22,1,.36,1) .25s forwards; }
          .boot-skip-button { border: 1px solid rgba(246,245,251,.36); padding: 10px 13px; color: #f6f5fb; font: 500 .65rem/1 var(--mono); letter-spacing: .09em; text-transform: uppercase; cursor: pointer; transition: background .2s ease, color .2s ease; }
          .boot-skip-button:hover { background: #f6f5fb; color: #111016; }
          @keyframes boot-stage-a {
            0% { opacity: 0; transform: translateY(28px); filter: blur(8px); }
            16%, 72% { opacity: 1; transform: translateY(0); filter: blur(0); }
            100% { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
          }
          @keyframes boot-progress-fill { to { width: 100%; } }
          @keyframes boot-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes boot-sweep { to { transform: translateX(110%); } }
          @keyframes boot-intro-leave { to { opacity: 0; visibility: hidden; pointer-events: none; } }
          @media (max-width: 560px) { .boot-cinematic-center { min-height: 330px; } .boot-signal-row { margin-top: 20px; } }
          @media (prefers-reduced-motion: reduce) { .boot-intro--extended { display: none; } }
        `}</style>
      </head>
      <body>
        <input id="skip-intro" className="boot-skip-toggle" type="checkbox" />
        <section className="boot-intro boot-intro--extended" aria-label="Opening portfolio">
          <div className="boot-meta">
            <span>Abhay Soni / Portfolio 2026</span>
            <span>Session 01 — Ideas in motion</span>
          </div>
          <div className="boot-cinematic-center">
            <div className="boot-stage boot-stage--one">
              <p>01 / A thought begins</p>
              <h1>Every project<br />starts with an <em>idea.</em></h1>
            </div>
            <div className="boot-stage boot-stage--two">
              <p>02 / Build in public</p>
              <h1>Curiosity turns<br />ideas into <em>momentum.</em></h1>
            </div>
            <div className="boot-stage boot-stage--three">
              <p>03 / Make it useful</p>
              <h1>Ideas become better<br />when they are <em>shared.</em></h1>
            </div>
            <div className="boot-stage boot-stage--four">
              <p>04 / Welcome in</p>
              <h1>Good ideas get better<br />through <em>conversation.</em></h1>
              <div className="boot-signal-row" aria-hidden="true">
                <span>Build</span><span>Learn</span><span>Explore</span><span>Connect</span>
              </div>
            </div>
          </div>
          <div className="boot-bottom">
            <div className="boot-progress"><span /></div>
            <label className="boot-skip-button" htmlFor="skip-intro">Skip intro ↗</label>
          </div>
        </section>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
