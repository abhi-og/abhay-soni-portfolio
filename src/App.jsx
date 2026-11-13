import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import ProjectsSection from './ProjectsSection';
import JourneySection from './JourneySection';
import ContactSection from './ContactSection';

export default function App() {
  const [selectedServices, setSelectedServices] = useState(["AI Integration", "Digital"]);

  // Premium Slow, Heavy Inertia Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Slow, heavy, cinematic inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // Weighted feel
      touchMultiplier: 1.2,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#EAECE9] selection:text-[#1C2E1E]">
      {/* 1. Interactive Motion Hero Section */}
      <HeroSection
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />

      {/* 2. Intro Section (Philosophy: Learning by Building • Newton School of Technology, RU) */}
      <IntroSection />

      {/* 3. Work Section (Showcase of Projects / Prescripto IEEE Hackathon) */}
      <ProjectsSection />

      {/* 4. Journey Section (Timeline: Education @ NST RU, Hackathons, Newtonbotics) */}
      <JourneySection />

      {/* 5. Contact Section */}
      <ContactSection selectedServices={selectedServices} />

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-neutral-200 text-center text-xs text-[#738273]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Abhay Soni &bull; Newton School of Technology, Rishihood University &bull; Builder Mindset
          </p>
          <div className="flex items-center gap-4 text-[#5A635A]">
            <a href="https://github.com/abhi-og" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
            <span>&bull;</span>
            <a href="https://www.linkedin.com/in/abhay-soni-650b13410" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              LinkedIn
            </a>
            <span>&bull;</span>
            <a href="mailto:abhispacesoni@gmail.com" className="hover:text-emerald-700 transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
