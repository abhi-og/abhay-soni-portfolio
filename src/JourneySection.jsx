import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, Calendar, GraduationCap, Trophy, Bot 
} from 'lucide-react';

export function JourneySection() {
  const containerRef = useRef(null);

  // Track scroll progress through this pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1: 100% Solid. Scales down slightly as deck grows.
  const card1Scale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.96, 0.92]);

  // Card 2 (Right entrance):
  const card2X = useTransform(scrollYProgress, [0.18, 0.46], ["120vw", "0vw"]);
  const card2Rotate = useTransform(scrollYProgress, [0.18, 0.46], [10, 1.5]);
  const card2Scale = useTransform(scrollYProgress, [0.55, 0.82], [1, 0.96]);

  // Card 3 (Left entrance):
  const card3X = useTransform(scrollYProgress, [0.52, 0.80], ["-120vw", "0vw"]);
  const card3Rotate = useTransform(scrollYProgress, [0.52, 0.80], [-10, -1.5]);

  const cards = [
    {
      num: "01",
      total: "03",
      year: "2026",
      badgeText: "FOUNDATION & SYSTEMS",
      title: "Newton School of Technology, Rishihood University",
      subtitle: "B.Tech in Computer Science & Artificial Intelligence",
      tagline: "Studying core engineering foundations while building products daily.",
      desc: "Pursuing computer science at Newton School of Technology (Rishihood University). I believe real engineering mastery comes from hands-on building, so I spend my days pairing algorithms, systems architecture, and web technologies with shipping working software.",
      icon: GraduationCap,
      highlights: [
        { label: "Algorithms & Systems", desc: "Data structures, memory models & scalable architecture" },
        { label: "Daily Product Shipping", desc: "Full-stack web apps, state machines & AI integrations" },
        { label: "Campus & Ecosystem", desc: "Rishihood University • Sonipat, Delhi NCR" }
      ],
      tags: ["B.Tech CSE", "Full-Stack Web", "AI Systems", "Newton School of Tech", "Rishihood University"]
    },
    {
      num: "02",
      total: "03",
      year: "2026",
      badgeText: "HIGH-INTENSITY SPRINTS",
      title: "IEEE Hackathons & Team Logiccoders",
      subtitle: "Prescripto — AI Clinical Workspace",
      tagline: "Fast-paced 36-hour sprints turning raw ideas into live software.",
      desc: "Teamed up with Team Logiccoders to compete in high-stakes hackathons. Together we engineered Prescripto — an AI-powered clinical workspace built to digitize handwritten prescriptions, eliminate medication errors, and help patients access affordable generic medicines.",
      icon: Trophy,
      highlights: [
        { label: "36-Hour Rapid Delivery", desc: "From concept architecture to live product deployment" },
        { label: "Prescription OCR Pipeline", desc: "Vision models combined with drug interaction cross-checking" },
        { label: "High-Pressure Teamwork", desc: "Cross-functional execution & jury technical defense" }
      ],
      tags: ["IEEE Hackathon", "Team Logiccoders", "Prescripto AI", "Rapid Prototyping", "Pitch Defense"]
    },
    {
      num: "03",
      total: "03",
      year: "2026",
      badgeText: "HARDWARE-SOFTWARE BRIDGE",
      title: "Newtonbotics Robotics Club",
      subtitle: "Hardware-Software & Autonomous Systems",
      tagline: "Bridging the gap between software algorithms and physical machines.",
      desc: "Active member of Newtonbotics, the official robotics club at the university. Working on microcontrollers, sensor integration, and motor control loops to understand how code moves and interacts with the physical world.",
      icon: Bot,
      highlights: [
        { label: "Microcontroller Logic", desc: "Real-time task scheduling, serial telemetry & PWM control" },
        { label: "Sensor Fusion Loops", desc: "Ultrasonic, infrared & proximity obstacle avoidance" },
        { label: "NST Maker Lab", desc: "Collaborative prototyping & physical chassis fabrication" }
      ],
      tags: ["Newtonbotics", "Embedded C++", "Microcontrollers", "Autonomous Motion", "NST Club"]
    }
  ];

  return (
    <section 
      id="journey" 
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#F5F6F3] border-t border-b border-[#E2E4DE] scroll-mt-0"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 overflow-hidden select-none">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto w-full pb-3 border-b border-[#DDDED8] relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5A5850]">
            <Sparkles className="w-3.5 h-3.5 text-[#1C2E1E]" />
            <span>The Journey • Scroll Card Deck</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-black mt-1">
            Milestones in the making.
          </h2>
        </div>

        {/* ======================================================== */}
        {/* CARDS STAGE WITH ENHANCED PHYSICAL SHADOW EFFECTS        */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-3xl mx-auto h-[480px] sm:h-[500px] flex items-center justify-center my-auto z-20">
          
          {/* CARD 01: Academic Core */}
          <motion.div
            style={{
              scale: card1Scale,
              zIndex: 10
            }}
            className="absolute inset-0 bg-white border border-[#D5D8D0] rounded-[32px] p-6 sm:p-9 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18),0_12px_28px_-8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden"
          >
            {/* Top Green Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-emerald-600" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-150">
                <div className="flex items-center gap-3">
                  <span className="bg-[#1C2E1E] text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                    CARD 01 / 03
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#738273] uppercase hidden sm:inline">
                    {cards[0].badgeText}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C2E1E] bg-[#F5F6F3] border border-[#E0E3DD] px-3 py-1 rounded-full shadow-3xs">
                  <Calendar className="w-3.5 h-3.5 text-[#5A635A]" />
                  <span>{cards[0].year}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F6F3] border border-[#E4E6E1] flex items-center justify-center text-[#1C2E1E] shrink-0 shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-black leading-snug">
                    {cards[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#2D4A30] mt-0.5">
                    {cards[0].subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-[#FAFBF9] border-l-2 border-[#1C2E1E] px-4 py-2 rounded-r-xl shadow-3xs">
                <p className="text-xs sm:text-sm text-[#1C2E1E] font-medium italic">
                  "{cards[0].tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5A635A] leading-relaxed">
                {cards[0].desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-neutral-150">
              {cards[0].highlights.map((h, i) => (
                <div key={i} className="bg-[#FAFBF9] border border-[#E5E8E2] rounded-xl p-2.5 shadow-3xs">
                  <span className="text-xs font-bold text-black block">{h.label}</span>
                  <span className="text-[11px] text-[#5A635A] block leading-snug">{h.desc}</span>
                </div>
              ))}
            </div>

            <span className="absolute -bottom-8 -right-4 text-9xl font-serif font-black text-neutral-100 select-none pointer-events-none">
              01
            </span>
          </motion.div>

          {/* CARD 02: IEEE Hackathon (Slides from RIGHT, Enhanced Shadow) */}
          <motion.div
            style={{
              x: card2X,
              rotate: card2Rotate,
              scale: card2Scale,
              zIndex: 20
            }}
            className="absolute inset-0 bg-white border border-[#D5D8D0] rounded-[32px] p-6 sm:p-9 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.24),0_18px_36px_-10px_rgba(0,0,0,0.16),0_2px_4px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden"
          >
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-amber-500" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-150">
                <div className="flex items-center gap-3">
                  <span className="bg-amber-800 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                    CARD 02 / 03
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#738273] uppercase hidden sm:inline">
                    {cards[1].badgeText}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C2E1E] bg-[#F5F6F3] border border-[#E0E3DD] px-3 py-1 rounded-full shadow-3xs">
                  <Calendar className="w-3.5 h-3.5 text-[#5A635A]" />
                  <span>{cards[1].year}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F6F3] border border-[#E4E6E1] flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-black leading-snug">
                    {cards[1].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-amber-900 mt-0.5">
                    {cards[1].subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 border-l-2 border-amber-600 px-4 py-2 rounded-r-xl shadow-3xs">
                <p className="text-xs sm:text-sm text-amber-950 font-medium italic">
                  "{cards[1].tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5A635A] leading-relaxed">
                {cards[1].desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-neutral-150">
              {cards[1].highlights.map((h, i) => (
                <div key={i} className="bg-[#FAFBF9] border border-[#E5E8E2] rounded-xl p-2.5 shadow-3xs">
                  <span className="text-xs font-bold text-black block">{h.label}</span>
                  <span className="text-[11px] text-[#5A635A] block leading-snug">{h.desc}</span>
                </div>
              ))}
            </div>

            <span className="absolute -bottom-8 -right-4 text-9xl font-serif font-black text-neutral-100 select-none pointer-events-none">
              02
            </span>
          </motion.div>

          {/* CARD 03: Newtonbotics (Slides from LEFT, Deep Multilayer Shadow) */}
          <motion.div
            style={{
              x: card3X,
              rotate: card3Rotate,
              zIndex: 30
            }}
            className="absolute inset-0 bg-white border border-[#D5D8D0] rounded-[32px] p-6 sm:p-9 shadow-[0_45px_100px_-18px_rgba(0,0,0,0.3),0_24px_48px_-12px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.08)] flex flex-col justify-between overflow-hidden"
          >
            {/* Top Sky Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-sky-600" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-150">
                <div className="flex items-center gap-3">
                  <span className="bg-sky-800 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                    CARD 03 / 03
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#738273] uppercase hidden sm:inline">
                    {cards[2].badgeText}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C2E1E] bg-[#F5F6F3] border border-[#E0E3DD] px-3 py-1 rounded-full shadow-3xs">
                  <Calendar className="w-3.5 h-3.5 text-[#5A635A]" />
                  <span>{cards[2].year}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F6F3] border border-[#E4E6E1] flex items-center justify-center text-sky-700 shrink-0 shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-black leading-snug">
                    {cards[2].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-sky-900 mt-0.5">
                    {cards[2].subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-sky-50/70 border-l-2 border-sky-600 px-4 py-2 rounded-r-xl shadow-3xs">
                <p className="text-xs sm:text-sm text-sky-950 font-medium italic">
                  "{cards[2].tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5A635A] leading-relaxed">
                {cards[2].desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-neutral-150">
              {cards[2].highlights.map((h, i) => (
                <div key={i} className="bg-[#FAFBF9] border border-[#E5E8E2] rounded-xl p-2.5 shadow-3xs">
                  <span className="text-xs font-bold text-black block">{h.label}</span>
                  <span className="text-[11px] text-[#5A635A] block leading-snug">{h.desc}</span>
                </div>
              ))}
            </div>

            <span className="absolute -bottom-8 -right-4 text-9xl font-serif font-black text-neutral-100 select-none pointer-events-none">
              03
            </span>
          </motion.div>

        </div>

        {/* Footer Hint */}
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between pt-3 border-t border-[#DDDED8] text-xs font-mono text-[#738273] relative z-10">
          <span>ABHAY SONI // MILESTONES 2026</span>
          <span className="animate-pulse">↓ Scroll down to continue to Contact</span>
        </div>

      </div>
    </section>
  );
}

export default JourneySection;
