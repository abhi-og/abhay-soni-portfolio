import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import { MotionEffects } from "./components/MotionEffects";

export const metadata: Metadata = {
  title: { default: "Abhay Soni — Portfolio & Journal", template: "%s — Abhay Soni" },
  description: "Abhay Soni is a Computer Science student building modern web applications, exploring AI, and turning ideas into real-world projects.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
        <style>{`
          .intro-skip { position: fixed; opacity: 0; pointer-events: none; }
          .code-signal-intro { overflow: hidden; background: #0d0c13; animation: intro-out .9s cubic-bezier(.76,0,.24,1) 11.1s forwards; }
          .intro-skip:checked + .code-signal-intro { animation: none; opacity: 0; visibility: hidden; pointer-events: none; }
          .code-signal-intro::before { opacity: .22; background-image: radial-gradient(circle at 50% 48%, rgba(167,139,250,.18), transparent 34rem), linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px); background-size: auto, 42px 42px, 42px 42px; }
          .code-signal-intro .boot-meta, .code-signal-intro .boot-bottom { animation: fade-up .65s ease .2s both; }
          .intro-scene { position: absolute; z-index: 1; inset: 92px 8vw 94px; display: grid; place-items: center; opacity: 0; pointer-events: none; }
          .intro-label { margin: 0 0 18px; color: #a78bfa; font: 500 clamp(.62rem,1vw,.76rem)/1.3 var(--mono); letter-spacing: .17em; text-transform: uppercase; }
          .scene-code { animation: scene 3.15s cubic-bezier(.16,1,.3,1) .35s both; }
          .code-window { width: min(760px, 84vw); padding: clamp(18px,3vw,34px); border: 1px solid rgba(167,139,250,.42); background: rgba(20,17,29,.76); box-shadow: 0 34px 90px rgba(0,0,0,.32); }
          .window-top { display: flex; gap: 7px; margin-bottom: clamp(34px,5vw,62px); }
          .window-top i { width: 8px; height: 8px; border-radius: 50%; background: rgba(246,245,251,.35); } .window-top i:last-child { background: #a78bfa; box-shadow: 0 0 16px #a78bfa; }
          .code-line { overflow: hidden; width: 0; white-space: nowrap; color: #f6f5fb; font: 500 clamp(1.35rem,4vw,3.5rem)/1.2 var(--mono); letter-spacing: -.07em; border-right: 2px solid #a78bfa; animation: type-code 1.5s steps(23,end) .8s forwards, blink .62s steps(2,end) infinite; }
          .code-line b { color: #a78bfa; font-weight: 500; } .code-line em { color: #d8cbff; font-style: normal; }
          .code-result { margin: 18px 0 0; opacity: 0; color: #a78bfa; font: 500 clamp(.62rem,1.1vw,.78rem)/1.3 var(--mono); letter-spacing: .11em; animation: fade-up .5s ease 2.2s forwards; }
          .scene-signal { animation: scene 3.7s cubic-bezier(.16,1,.3,1) 3.08s both; }
          .signal-box { width: min(900px, 86vw); } .signal-box h2 { margin: 0; color: #f6f5fb; font: 600 clamp(2.5rem,7vw,6.4rem)/.9 var(--sans); letter-spacing: -.075em; } .signal-box h2 em { color: #a78bfa; font-style: normal; }
          .signal-path { position: relative; height: clamp(126px,16vw,180px); margin-top: 30px; border-block: 1px solid rgba(167,139,250,.28); }
          .signal-path svg { width: 100%; height: 100%; overflow: visible; } .signal-path path { fill: none; stroke: rgba(216,203,255,.32); stroke-width: 1.3; stroke-dasharray: 950; stroke-dashoffset: 950; animation: draw 1.6s ease .35s forwards; }
          .signal-path circle { fill: #a78bfa; filter: drop-shadow(0 0 9px #a78bfa); } .signal-orb { position: absolute; top: calc(50% - 7px); left: 0; width: 14px; height: 14px; border-radius: 50%; background: #f6f5fb; box-shadow: 0 0 0 6px rgba(167,139,250,.2), 0 0 28px #a78bfa; animation: travel 2.25s cubic-bezier(.45,0,.2,1) .42s forwards; }
          .scene-name { animation: final-scene 3.35s cubic-bezier(.16,1,.3,1) 6.62s both; }
          .name-wrap { text-align: center; } .name-wrap p { margin: 0 0 18px; color: #a78bfa; font: 500 clamp(.62rem,1vw,.76rem)/1.3 var(--mono); letter-spacing: .17em; text-transform: uppercase; }
          .name { display: flex; justify-content: center; overflow: hidden; } .name span { display: inline-block; transform: translateY(115%); color: #f6f5fb; font: 700 clamp(5rem,17vw,14.5rem)/.77 var(--sans); letter-spacing: -.105em; animation: letter .72s cubic-bezier(.16,1,.3,1) forwards; } .name span:nth-child(2), .name span:nth-child(4) { color: #a78bfa; } .name span:nth-child(1) { animation-delay: .08s; } .name span:nth-child(2) { animation-delay: .17s; } .name span:nth-child(3) { animation-delay: .26s; } .name span:nth-child(4) { animation-delay: .35s; } .name span:nth-child(5) { animation-delay: .44s; }
          .name-sub { margin-top: 26px !important; color: #cac4d9 !important; letter-spacing: .04em !important; text-transform: none !important; animation: fade-up .55s ease .8s both; }
          .code-signal-intro .boot-progress span { width: 0; animation: progress 10.25s cubic-bezier(.22,1,.36,1) .3s forwards; }
          .skip-button { border: 1px solid rgba(246,245,251,.36); padding: 10px 13px; color: #f6f5fb; font: 500 .65rem/1 var(--mono); letter-spacing: .09em; text-transform: uppercase; cursor: pointer; transition: background .2s ease, color .2s ease; } .skip-button:hover { background: #f6f5fb; color: #111016; }
          .reveal-wipe { position: absolute; z-index: 4; inset: 0; pointer-events: none; background: #a78bfa; transform: scaleY(0); transform-origin: bottom; animation: wipe 1.2s cubic-bezier(.76,0,.24,1) 10.2s both; }
          @keyframes scene { 0% { opacity: 0; transform: translateY(24px); filter: blur(7px); } 14%,76% { opacity: 1; transform: none; filter: none; } 100% { opacity: 0; transform: translateY(-18px); filter: blur(5px); } }
          @keyframes final-scene { 0% { opacity: 0; transform: scale(.96); } 18%,90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.035); } }
          @keyframes type-code { to { width: 23ch; } } @keyframes blink { 50% { border-color: transparent; } } @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
          @keyframes draw { to { stroke-dashoffset: 0; } } @keyframes travel { 0% { left: 3%; top: 70%; } 46% { top: 25%; } 100% { left: calc(100% - 14px); top: 48%; } } @keyframes letter { to { transform: translateY(0); } } @keyframes progress { to { width: 100%; } }
          @keyframes wipe { 0% { transform: scaleY(0); transform-origin: bottom; } 48% { transform: scaleY(1); transform-origin: bottom; } 52% { transform: scaleY(1); transform-origin: top; } 100% { transform: scaleY(0); transform-origin: top; } } @keyframes intro-out { to { opacity: 0; visibility: hidden; pointer-events: none; } }
          @media (max-width: 560px) { .intro-scene { inset: 78px 7vw 94px; } .code-window { padding: 18px; } .boot-meta { font-size: .54rem !important; } }
          @media (prefers-reduced-motion: reduce) { .code-signal-intro { display: none; } }
        `}</style>
      </head>
      <body>
        <input id="skip-code-intro" className="intro-skip" type="checkbox" />
        <section className="boot-intro code-signal-intro" aria-label="Opening portfolio">
          <div className="boot-meta"><span>Abhay Soni / Portfolio</span><span>Opening sequence / 01</span></div>
          <div className="intro-scene scene-code"><div className="code-window"><div className="window-top"><i/><i/><i/></div><div className="code-line"><b>helloworld</b><em>("print")</em></div><p className="code-result">// a small line can start a big idea</p></div></div>
          <div className="intro-scene scene-signal"><div className="signal-box"><p className="intro-label">02 / Turn thought into direction</p><h2>Let curiosity<br />find the <em>signal.</em></h2><div className="signal-path"><svg viewBox="0 0 1000 170" preserveAspectRatio="none" aria-hidden="true"><path d="M0 118 C130 118 145 42 260 42 S396 138 500 108 S640 24 744 70 S865 112 1000 66"/><circle cx="260" cy="42" r="5"/><circle cx="500" cy="108" r="5"/><circle cx="744" cy="70" r="5"/></svg><i className="signal-orb" /></div></div></div>
          <div className="intro-scene scene-name"><div className="name-wrap"><p>03 / Built through curiosity</p><div className="name" aria-label="Abhay"><span>A</span><span>B</span><span>H</span><span>A</span><span>Y</span></div><p className="name-sub">Good ideas get better through conversation.</p></div></div>
          <div className="boot-bottom"><div className="boot-progress"><span /></div><label className="skip-button" htmlFor="skip-code-intro">Skip intro ↗</label></div><div className="reveal-wipe" />
        </section>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
