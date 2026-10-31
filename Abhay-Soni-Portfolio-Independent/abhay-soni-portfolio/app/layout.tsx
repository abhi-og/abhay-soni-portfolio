import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import { MotionEffects } from "./components/MotionEffects";

const gridCells = Array.from({ length: 60 });

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
          .intro-skip-toggle { position: fixed; opacity: 0; pointer-events: none; }
          .signature-intro { overflow: hidden; background: #0d0c13; animation: intro-leave .9s cubic-bezier(.76,0,.24,1) 16.1s forwards; }
          .intro-skip-toggle:checked + .signature-intro { animation: none; opacity: 0; visibility: hidden; pointer-events: none; }
          .signature-intro::before { opacity: .2; background-image: radial-gradient(circle at 50% 45%, rgba(167,139,250,.21), transparent 34rem), linear-gradient(rgba(255,255,255,.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.024) 1px, transparent 1px); background-size: auto, 44px 44px, 44px 44px; }
          .signature-intro .boot-meta, .signature-intro .boot-bottom { animation: intro-fade .7s ease .25s both; }
          .intro-scene { position: absolute; z-index: 1; inset: 92px 7vw 94px; display: grid; place-items: center; opacity: 0; pointer-events: none; }
          .intro-scene p { margin: 0; color: #a78bfa; font: 500 clamp(.62rem,1vw,.76rem)/1.4 var(--mono); letter-spacing: .16em; text-transform: uppercase; }
          .intro-scene h1 { margin: 16px 0 0; color: #f6f5fb; font: 600 clamp(2.8rem,7.5vw,7rem)/.9 var(--sans); letter-spacing: -.075em; text-align: center; }
          .intro-scene h1 em { color: #a78bfa; font-style: normal; }
          .scene-grid { animation: scene-in-out 4s cubic-bezier(.16,1,.3,1) .45s both; }
          .scene-network { animation: scene-in-out 4.3s cubic-bezier(.16,1,.3,1) 4.15s both; }
          .scene-orbit { animation: scene-in-out 4.1s cubic-bezier(.16,1,.3,1) 8.1s both; }
          .scene-name { animation: scene-final 4.8s cubic-bezier(.16,1,.3,1) 11.8s both; }
          .scene-grid-box { width: min(82vw, 850px); margin-top: 26px; }
          .intro-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px; position: relative; }
          .intro-grid span { aspect-ratio: 1; border: 1px solid rgba(167,139,250,.17); background: rgba(167,139,250,.04); animation: grid-awake 1.2s ease both; }
          .intro-grid span:nth-child(11n+1), .intro-grid span:nth-child(11n+4), .intro-grid span:nth-child(11n+7) { animation-delay: .2s; }
          .intro-grid span:nth-child(12), .intro-grid span:nth-child(13), .intro-grid span:nth-child(14), .intro-grid span:nth-child(24), .intro-grid span:nth-child(34), .intro-grid span:nth-child(44), .intro-grid span:nth-child(45), .intro-grid span:nth-child(46), .intro-grid span:nth-child(47), .intro-grid span:nth-child(57) { background: #a78bfa; box-shadow: 0 0 22px rgba(167,139,250,.7); border-color: #d8cbff; }
          .grid-orb { position: absolute; width: 14px; height: 14px; border-radius: 50%; background: #f6f5fb; box-shadow: 0 0 0 7px rgba(167,139,250,.18), 0 0 26px #a78bfa; animation: grid-travel 3.3s cubic-bezier(.4,0,.2,1) .55s both; }
          .network-wrap { width: min(82vw, 900px); margin-top: 24px; position: relative; }
          .network-wrap svg { width: 100%; overflow: visible; }
          .network-wrap line { stroke: rgba(198,190,228,.38); stroke-width: 1.2; stroke-dasharray: 180; stroke-dashoffset: 180; animation: draw-line 1.2s ease forwards; }
          .network-wrap line:nth-child(2n) { animation-delay: .4s; } .network-wrap line:nth-child(3n) { animation-delay: .8s; }
          .network-wrap circle { fill: #f6f5fb; stroke: #a78bfa; stroke-width: 2; transform-box: fill-box; transform-origin: center; animation: node-pop .55s cubic-bezier(.16,1,.3,1) both; }
          .network-wrap circle:nth-of-type(2n) { animation-delay: .5s; } .network-wrap circle:nth-of-type(3n) { animation-delay: .9s; }
          .network-pulse { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 24px #a78bfa; animation: network-pulse 2.5s ease-in-out 1s infinite; }
          .orbit-space { width: min(80vw, 850px); height: min(38vw, 310px); margin-top: 22px; position: relative; border-top: 1px solid rgba(167,139,250,.3); border-bottom: 1px solid rgba(167,139,250,.3); }
          .orbit-track { position: absolute; left: 8%; right: 8%; top: 50%; height: 1px; background: rgba(246,245,251,.28); }
          .orbit-track::before, .orbit-track::after { content: ""; position: absolute; top: -4px; width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 15px #a78bfa; }
          .orbit-track::before { left: 14%; } .orbit-track::after { right: 12%; }
          .abhay-craft { position: absolute; top: calc(50% - 35px); left: 3%; width: 104px; height: 64px; animation: craft-fly 3.35s cubic-bezier(.28,.8,.36,1) .35s both; }
          .craft-dome { position: absolute; left: 31px; top: 2px; width: 42px; height: 27px; border: 2px solid #d8cbff; border-radius: 50% 50% 38% 38%; background: linear-gradient(145deg, rgba(246,245,251,.9), rgba(167,139,250,.15)); }
          .craft-body { position: absolute; left: 4px; bottom: 8px; width: 96px; height: 28px; border: 2px solid #d8cbff; border-radius: 50%; background: linear-gradient(180deg, #31284e, #171320); box-shadow: 0 12px 30px rgba(167,139,250,.38); }
          .craft-light { position: absolute; bottom: 0; left: 38px; width: 30px; height: 10px; border-radius: 50%; background: #a78bfa; filter: blur(1px); box-shadow: 0 0 25px 9px rgba(167,139,250,.65); animation: craft-light 1s ease infinite alternate; }
          .craft-label { position: absolute; top: 78px; left: -7px; white-space: nowrap; color: #a78bfa; font: 500 .6rem var(--mono); letter-spacing: .12em; }
          .name-mark { display: flex; justify-content: center; overflow: hidden; }
          .name-mark span { display: inline-block; color: #f6f5fb; font: 700 clamp(4.8rem,16vw,14rem)/.82 var(--sans); letter-spacing: -.1em; transform: translateY(120%); animation: letter-rise .8s cubic-bezier(.16,1,.3,1) forwards; }
          .name-mark span:nth-child(2), .name-mark span:nth-child(4) { color: #a78bfa; } .name-mark span:nth-child(1) { animation-delay: .1s; } .name-mark span:nth-child(2) { animation-delay: .18s; } .name-mark span:nth-child(3) { animation-delay: .26s; } .name-mark span:nth-child(4) { animation-delay: .34s; } .name-mark span:nth-child(5) { animation-delay: .42s; }
          .name-subtitle { margin-top: 26px !important; color: #c7c1d4 !important; animation: intro-fade .6s ease .7s both; }
          .signature-intro .boot-progress span { width: 0; animation: progress-fill 15.1s cubic-bezier(.22,1,.36,1) .3s forwards; }
          .intro-skip-button { border: 1px solid rgba(246,245,251,.36); padding: 10px 13px; color: #f6f5fb; font: 500 .65rem/1 var(--mono); letter-spacing: .09em; text-transform: uppercase; cursor: pointer; transition: background .2s ease, color .2s ease; }
          .intro-skip-button:hover { background: #f6f5fb; color: #111016; }
          .intro-wipe { position: absolute; z-index: 4; inset: 0; background: #a78bfa; transform: scaleY(0); transform-origin: bottom; animation: intro-wipe 1.2s cubic-bezier(.76,0,.24,1) 15.2s both; pointer-events: none; }
          @keyframes scene-in-out { 0% { opacity: 0; transform: translateY(32px); filter: blur(8px); } 14%,76% { opacity: 1; transform: translateY(0); filter: blur(0); } 100% { opacity: 0; transform: translateY(-24px); filter: blur(5px); } }
          @keyframes scene-final { 0% { opacity: 0; transform: scale(.96); } 22%,90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.04); } }
          @keyframes grid-awake { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
          @keyframes grid-travel { 0% { left: 2%; top: 72%; } 33% { left: 30%; top: 72%; } 62% { left: 30%; top: 33%; } 100% { left: 82%; top: 33%; } }
          @keyframes draw-line { to { stroke-dashoffset: 0; } } @keyframes node-pop { from { transform: scale(0); } to { transform: scale(1); } }
          @keyframes network-pulse { 0%,100% { left: 20%; top: 73%; } 50% { left: 70%; top: 24%; } }
          @keyframes craft-fly { 0% { left: -14%; transform: rotate(-7deg); } 48% { top: calc(50% - 66px); } 100% { left: 93%; transform: rotate(7deg); } }
          @keyframes craft-light { to { opacity: .42; transform: scaleX(1.35); } } @keyframes letter-rise { to { transform: translateY(0); } }
          @keyframes progress-fill { to { width: 100%; } } @keyframes intro-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes intro-wipe { 0% { transform: scaleY(0); transform-origin: bottom; } 50% { transform: scaleY(1); transform-origin: bottom; } 51% { transform: scaleY(1); transform-origin: top; } 100% { transform: scaleY(0); transform-origin: top; } }
          @keyframes intro-leave { to { opacity: 0; visibility: hidden; pointer-events: none; } }
          @media (max-width: 560px) { .intro-scene { inset: 78px 7vw 90px; } .scene-grid-box, .network-wrap { width: 100%; } .orbit-space { width: 100%; height: 180px; } .boot-meta { font-size: .54rem !important; } }
          @media (prefers-reduced-motion: reduce) { .signature-intro { display: none; } }
        `}</style>
      </head>
      <body>
        <input id="skip-signature-intro" className="intro-skip-toggle" type="checkbox" />
        <section className="boot-intro signature-intro" aria-label="Opening portfolio">
          <div className="boot-meta"><span>Abhay Soni / Portfolio</span><span>16 seconds of curiosity</span></div>
          <div className="intro-scene scene-grid">
            <div className="scene-grid-box"><p>01 / Route the spark</p><h1>Find a path for a<br /><em>good idea.</em></h1><div className="intro-grid">{gridCells.map((_, index) => <span key={index} />)}<i className="grid-orb" /></div></div>
          </div>
          <div className="intro-scene scene-network">
            <div className="network-wrap"><p>02 / Connect the signals</p><h1>Curiosity grows<br />in <em>conversation.</em></h1><svg viewBox="0 0 800 280" aria-hidden="true"><line x1="90" y1="190" x2="280" y2="60"/><line x1="90" y1="190" x2="280" y2="150"/><line x1="90" y1="190" x2="280" y2="235"/><line x1="280" y1="60" x2="510" y2="85"/><line x1="280" y1="60" x2="510" y2="200"/><line x1="280" y1="150" x2="510" y2="85"/><line x1="280" y1="150" x2="510" y2="200"/><line x1="280" y1="235" x2="510" y2="200"/><line x1="510" y1="85" x2="710" y2="145"/><line x1="510" y1="200" x2="710" y2="145"/><circle cx="90" cy="190" r="12"/><circle cx="280" cy="60" r="12"/><circle cx="280" cy="150" r="12"/><circle cx="280" cy="235" r="12"/><circle cx="510" cy="85" r="12"/><circle cx="510" cy="200" r="12"/><circle cx="710" cy="145" r="14"/></svg><i className="network-pulse" /></div>
          </div>
          <div className="intro-scene scene-orbit">
            <div><p>03 / Explore beyond the obvious</p><h1>An idea needs a little<br /><em>orbit.</em></h1><div className="orbit-space"><div className="orbit-track"/><div className="abhay-craft"><i className="craft-dome"/><i className="craft-body"/><i className="craft-light"/><span className="craft-label">ABHAY-01 / EXPLORING</span></div></div></div>
          </div>
          <div className="intro-scene scene-name">
            <div><p>04 / Welcome in</p><div className="name-mark" aria-label="Abhay"><span>A</span><span>B</span><span>H</span><span>A</span><span>Y</span></div><p className="name-subtitle">Good ideas get better through conversation.</p></div>
          </div>
          <div className="boot-bottom"><div className="boot-progress"><span /></div><label className="intro-skip-button" htmlFor="skip-signature-intro">Skip intro ↗</label></div>
          <div className="intro-wipe" />
        </section>
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
