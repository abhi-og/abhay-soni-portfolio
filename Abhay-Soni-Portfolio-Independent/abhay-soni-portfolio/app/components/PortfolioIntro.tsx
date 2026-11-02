"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function PortfolioIntro() {
  const [mounted, setMounted] = useState(false);
  const [seen, setSeen] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number>(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  // Web Audio Synth for atmospheric sounds
  const initAudio = useCallback(() => {
    try {
      const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioClass && !audioCtxRef.current) {
        audioCtxRef.current = new AudioClass();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch {}
  }, []);

  const playTone = useCallback((freq: number, dur: number, type: OscillatorType = "sine", gainVal = 0.035) => {
    if (!audioCtxRef.current || !soundEnabled) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.05);
    } catch {}
  }, [soundEnabled]);

  const finishIntro = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem("abhay-intro-seen", "true");
      } catch {}
      setSeen(true);
    }, 800);
  }, []);

  // Initial check (sessionStorage & reduced motion)
  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    try {
      if (sessionStorage.getItem("abhay-intro-seen")) {
        setSeen(true);
      } else {
        setSeen(false);
      }
    } catch {
      setSeen(false);
    }
  }, []);

  // Escape key listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishIntro();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finishIntro]);

  // Pointer listener for ambient aura
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current.targetX = e.clientX / window.innerWidth;
      mousePosRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Progress Bar Timeline (0% to 100% over ~11 seconds)
  useEffect(() => {
    if (seen || isExiting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        // Key sound checkpoints
        if (soundEnabled && next === 35) {
          playTone(440, 0.4, "triangle", 0.03);
        } else if (soundEnabled && next === 70) {
          playTone(554.37, 0.4, "triangle", 0.03);
        } else if (soundEnabled && next === 95) {
          playTone(659.25, 0.5, "triangle", 0.035);
        } else if (soundEnabled && next === 100) {
          playTone(880, 0.8, "sine", 0.04);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishIntro();
          }, 600);
          return 100;
        }
        return next;
      });
    }, 105);

    return () => clearInterval(interval);
  }, [seen, isExiting, soundEnabled, finishIntro, playTone]);

  // Ambient fluid canvas
  useEffect(() => {
    if (!canvasRef.current || seen) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? "#a78bfa" : "#38bdf8",
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      const m = mousePosRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      // Soft mouse-responsive glow
      const grad = ctx.createRadialGradient(
        m.x * w,
        m.y * h,
        0,
        m.x * w,
        m.y * h,
        w * 0.45
      );
      grad.addColorStop(0, "rgba(167, 139, 250, 0.14)");
      grad.addColorStop(0.5, "rgba(56, 189, 248, 0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 90) * 0.16;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [seen]);

  if (!mounted || seen) return null;

  const currentAct = progress < 36 ? 1 : progress < 70 ? 2 : 3;

  return (
    <div
      className={`intro-overlay ${isExiting ? "is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Introduction"
    >
      <canvas ref={canvasRef} className="intro-canvas" />

      {/* Top Header */}
      <header className="intro-topbar">
        <div className="top-brand">
          <span className="live-status-dot" />
          <span className="brand-title">ABHAY SONI // PORTFOLIO</span>
        </div>
        <div className="top-actions">
          <button
            onClick={() => {
              if (!soundEnabled) initAudio();
              setSoundEnabled(!soundEnabled);
            }}
            className="sound-pill-btn"
            type="button"
          >
            {soundEnabled ? "✦ Sound: ON" : "✧ Sound: OFF"}
          </button>
          <button onClick={finishIntro} className="skip-pill-btn" type="button">
            Skip Intro ↗
          </button>
        </div>
      </header>

      {/* Center Cinematic Stage */}
      <main className="intro-stage">
        
        {/* ACT 1 (0% - 35%): THE CODE WINDOW FROM SCREENSHOT */}
        {currentAct === 1 && (
          <div className="act-content act-code-wrapper" key="act-code">
            <div className="code-editor-window">
              <div className="editor-titlebar">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="editor-filename">abhaysoni.ts</span>
                <span className="editor-status">READY</span>
              </div>
              <div className="editor-code-body">
                <div className="line-numbers">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
                <div className="code-content">
                  <p>
                    <span className="syn-keyword">class</span>{" "}
                    <span className="syn-class">AbhaySoni</span>{" "}
                    <span className="syn-keyword">extends</span>{" "}
                    <span className="syn-class">Student</span> {"{"}
                  </p>
                  <p className="indent">
                    <span className="syn-prop">major</span> ={" "}
                    <span className="syn-string">&quot;CSE&quot;</span>;
                  </p>
                  <p className="indent">
                    <span className="syn-prop">stack</span> = [
                    <span className="syn-string">&quot;DSA&quot;</span>,{" "}
                    <span className="syn-string">&quot;Web&quot;</span>,{" "}
                    <span className="syn-string">&quot;AI&quot;</span>];
                  </p>
                  <p className="indent">
                    <span className="syn-keyword">async</span>{" "}
                    <span className="syn-prop">ship</span>() {"{"}{" "}
                    <span className="syn-keyword">await</span>{" "}
                    <span className="syn-this">this</span>.
                    <span className="syn-method">build</span>(); {"}"}
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
            <p className="editor-subcaption">01 // INITIALIZING ARCHITECTURE</p>
          </div>
        )}

        {/* ACT 2 (36% - 69%): THE MANIFESTO */}
        {currentAct === 2 && (
          <div className="act-content act-manifesto" key="act-manifesto">
            <div className="act-pill">
              <span className="pill-dot" />
              <span>02 // THE MANIFESTO</span>
            </div>
            <h2 className="act-headline">
              Ideas don&apos;t just live in code.
              <br />
              <span className="gradient-highlight">They come alive on the web.</span>
            </h2>
            <div className="arsenal-badges">
              <span className="badge">NEXT.JS & REACT</span>
              <span className="sep">✦</span>
              <span className="badge highlight-cyan">AI & INTELLIGENT SYSTEMS</span>
              <span className="sep">✦</span>
              <span className="badge">TYPESCRIPT</span>
            </div>
          </div>
        )}

        {/* ACT 3 (70% - 100%): KINETIC NAME REVEAL */}
        {currentAct === 3 && (
          <div className="act-content act-name" key="act-name">
            <div className="act-pill">
              <span className="pill-dot" />
              <span>03 // THE BUILDER</span>
            </div>
            <div className="name-reveal">
              <span className="name-char">A</span>
              <span className="name-char accent">B</span>
              <span className="name-char">H</span>
              <span className="name-char">A</span>
              <span className="name-char cyan">Y</span>
              <span className="name-space">&nbsp;</span>
              <span className="name-char">S</span>
              <span className="name-char">O</span>
              <span className="name-char accent">N</span>
              <span className="name-char">I</span>
            </div>
            <p className="builder-tagline">
              Builder · Student · Storyteller
            </p>
          </div>
        )}
      </main>

      {/* Prominent Bottom Progress Dock */}
      <footer className="intro-progress-dock">
        <div className="progress-info-row">
          <div className="progress-status-label">
            <span className="status-indicator-dot" />
            <span>
              {progress < 36
                ? "COMPILING ABHAYSONI.TS..."
                : progress < 70
                ? "ASSEMBLING ARSENAL & SYSTEMS..."
                : progress < 100
                ? "SYNCHRONIZING INTERFACE..."
                : "100% BUILD SUCCESSFUL // OPENING WEBSITE"}
            </span>
          </div>
          <div className="progress-counter">
            <span className="counter-val">{String(progress).padStart(2, "0")}</span>
            <span className="counter-max">/ 100%</span>
          </div>
        </div>

        {/* The Animated Progress Track */}
        <div className="progress-track-wrapper">
          <div
            className="progress-fill-bar"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-leading-glow" />
          </div>
        </div>

        <div className="progress-footer-meta">
          <span>COORDINATES: 2026 // PROD</span>
          <span className="esc-hint">PRESS [ESC] TO SKIP</span>
        </div>
      </footer>
    </div>
  );
}
