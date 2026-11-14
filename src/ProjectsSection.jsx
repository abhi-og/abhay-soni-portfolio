import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, Sparkles, Activity, Pill, ShieldCheck, FileText, 
  BookOpen, Users, Layers, Clock, X, ArrowLeft, ArrowRight, Eye
} from 'lucide-react';
import { GithubIcon } from './icons';

export function ProjectsSection() {
  // selectedIndex: 0 = Prescripto, 1 = JEE Tracker
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const books = [
    {
      id: "prescripto",
      title: "Prescripto",
      subtitle: "AI CLINICAL WORKSPACE",
      fullTitle: "Prescripto — AI Clinical Workspace",
      year: "2026",
      badge: "IEEE Hackathon Project",
      subBadge: "Team Logiccoders",
      spineArt: "⚕️",
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      tagline: "Intelligent prescription digitization and real-time clinical safety.",
      desc: "An AI-powered clinical workspace built during an IEEE Hackathon. Helps digitize doctor prescriptions, detect medication contraindications, match bioequivalent generic alternatives, and reinforce dosage compliance.",
      highlights: [
        { icon: FileText, label: "Prescription Digitization (OCR)", note: "Instant extraction from handwritten doctor notes" },
        { icon: ShieldCheck, label: "Medication Interaction Safety", note: "Real-time contraindication and allergy alerts" },
        { icon: Pill, label: "Generic Medicine Price Matching", note: "Matches affordable bioequivalent formulations" },
        { icon: Activity, label: "Dosage & Adherence Guidance", note: "Personalized scheduling and regimen reminders" }
      ],
      tags: ["AI / LLM", "Full-Stack", "Healthcare Tech", "Rapid Prototyping"],
      githubUrl: "https://github.com/Logic-Coders-Prescripto/PrescriptoPlus",
      liveUrl: null,
      primaryBtnText: "View on GitHub"
    },
    {
      id: "jee-tracker",
      title: "JEE Daily Sheet",
      subtitle: "PROGRESS TRACKER",
      fullTitle: "JEE Daily Sheet — Progress Tracker",
      year: "2026",
      badge: "Web App • Study System",
      subBadge: "Dual-Role Dashboard",
      spineArt: "🎯",
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      tagline: "Dual-role accountability and syllabus tracking for competitive exams.",
      desc: "A daily preparation and accountability platform engineered for competitive engineering aspirants. Solves the mentor-student visibility gap with synchronized views for PCM chapter checklists, revision tracking, and previous-year question practice logging.",
      highlights: [
        { icon: Users, label: "Dual Interface: Student & Parent", note: "Shared real-time visibility without micro-management" },
        { icon: Layers, label: "PCM Chapter Syllabus Checklist", note: "Categorized tracking across Physics, Chem & Math" },
        { icon: Clock, label: "Daily Study Hours & PYQ Counts", note: "Quantitative accountability and pace measurement" },
        { icon: BookOpen, label: "Instant Local Caching & Sync", note: "Zero-latency persistence and fast offline loading" }
      ],
      tags: ["HTML5 / JS", "Study System", "Dark Mode UI", "PWA / Web App"],
      githubUrl: "https://github.com/abhi-og/jee-tracker",
      liveUrl: "https://abhi-og.github.io/jee-tracker/student-tracker.html",
      primaryBtnText: "Live Student Tracker"
    }
  ];

  const selectedBook = books[selectedIndex] || books[0];

  const toggleBook = () => {
    setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section id="work" className="w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#F4F3EF] border-t border-b border-[#E2E0D8] scroll-mt-20 relative overflow-hidden select-none">
      
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="border-b border-[#DDD9CE] pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5A5850] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1C2E1E]" />
            <span>Selected Projects • Bookshelf</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#141412]">
            The Project Shelf
          </h2>
        </div>

        {/* ======================================================== */}
        {/* THE 3D BOOKSHELF ROW (CLEAN 2-BOOK EDITION)               */}
        {/* ======================================================== */}
        <div className="relative py-12 flex flex-col items-center justify-center">
          
          {/* Books Row Container */}
          <div 
            className="w-full max-w-4xl h-[440px] sm:h-[480px] flex items-center justify-center relative"
            style={{ perspective: '1600px' }}
          >
            {/* Horizontal Line Shelf Base */}
            <div className="absolute bottom-6 inset-x-4 sm:inset-x-12 h-[2px] bg-[#DDD9CE]" />
            <div className="absolute bottom-[22px] inset-x-8 sm:inset-x-16 h-4 bg-gradient-to-b from-black/8 to-transparent pointer-events-none" />

            {/* Standing Books Row (Only Book 1 & Book 2) */}
            <div className="relative flex items-end justify-center gap-6 sm:gap-12 z-20 pb-6 w-full">
              {books.map((book, idx) => {
                const isSelected = selectedIndex === idx;

                return (
                  <div
                    key={book.id}
                    onClick={() => setSelectedIndex(idx)}
                    className="relative cursor-pointer transition-transform duration-300"
                    style={{ perspective: '1200px' }}
                  >
                    
                    {/* IF NOT SELECTED: Standing book spine in the shelf row */}
                    {!isSelected && (
                      <motion.div
                        whileHover={{ y: -22, rotateY: -8, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="w-[58px] sm:w-[74px] md:w-[84px] h-[310px] sm:h-[350px] md:h-[380px] rounded-t-xs rounded-b-2xs overflow-hidden shadow-xl border-l border-t border-white/20 relative"
                        style={{
                          background: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 15%), linear-gradient(to bottom, #1E1C18, #110F0D)`,
                        }}
                      >
                        {/* Spine Top Artwork Emblem */}
                        <div className="pt-4 flex flex-col items-center gap-1.5">
                          <span className="text-base sm:text-lg opacity-90">{book.spineArt}</span>
                          <div className="w-5 h-[1px] bg-white/20" />
                        </div>

                        {/* Spine Vertical Title Text */}
                        <div className="my-auto flex flex-col items-center justify-center h-[220px] sm:h-[250px]">
                          <span 
                            className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#E6E3DB] whitespace-nowrap uppercase font-serif"
                            style={{ 
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed',
                              transform: 'rotate(180deg)'
                            }}
                          >
                            {book.title}
                          </span>
                        </div>

                        {/* Spine Bottom Vintage Badge */}
                        <div className="pb-3 flex flex-col items-center space-y-1">
                          <div className="w-5 h-[1px] bg-white/20" />
                          <span className="text-[8px] font-mono tracking-widest text-neutral-400 font-bold uppercase">
                            ABHAY
                          </span>
                          <span className="text-[7.5px] font-mono tracking-widest text-white/60 border border-white/20 px-1.5 py-0.5 rounded-2xs">
                            VOL.{idx + 1}
                          </span>
                        </div>

                        {/* Subtle tactile shadow crease on left and right */}
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-black/40 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-1.5 bg-black/30 pointer-events-none" />
                      </motion.div>
                    )}

                    {/* IF SELECTED: Pulled completely forward, angled in 3D showing front cover & spine */}
                    {isSelected && (
                      <motion.div
                        layoutId="activePulledBook"
                        initial={{ scale: 0.9, y: 10 }}
                        animate={{ 
                          scale: 1.08, 
                          y: -28, 
                          rotateY: -22, 
                          rotateX: 4, 
                          z: 120 
                        }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className="relative w-[210px] sm:w-[260px] md:w-[290px] h-[330px] sm:h-[370px] md:h-[400px] shadow-2xl rounded-r-sm rounded-l-xs overflow-hidden border border-white/30 cursor-pointer"
                        style={{
                          transformStyle: 'preserve-3d',
                          boxShadow: '25px 25px 50px rgba(0,0,0,0.35), -5px 10px 25px rgba(0,0,0,0.2)'
                        }}
                        onClick={() => setIsDossierOpen(true)}
                        title="Click to open project dossier"
                      >
                        {/* 3D BOOK COVER (Front Face) */}
                        <div className="w-full h-full relative bg-[#141815] text-white flex flex-col justify-between p-5 sm:p-6 overflow-hidden">
                          
                          {/* Background Artwork Image with vintage film wash */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
                            style={{ backgroundImage: `url(${book.coverImage})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                          {/* Cover Top Header */}
                          <div className="relative z-10 space-y-1">
                            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                              AN ABHAY SONI PRODUCTION • {book.year}
                            </span>
                            <div className="w-8 h-[1px] bg-white/40" />
                          </div>

                          {/* Center Cover Art & Title */}
                          <div className="relative z-10 my-auto text-center py-4">
                            <span className="text-2xl sm:text-3xl mb-2 block">{book.spineArt}</span>
                            <h3 className="text-xl sm:text-2xl md:text-[26px] font-serif font-black tracking-tight text-white uppercase leading-tight drop-shadow-md">
                              {book.title}
                            </h3>
                            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 mt-2 inline-block font-semibold">
                              {book.subtitle}
                            </span>
                          </div>

                          {/* Cover Footer & Vintage Tape Badge */}
                          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/20">
                            <span className="text-[9px] font-mono text-neutral-300">
                              {book.badge}
                            </span>
                            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-xs border border-white/20">
                              <span className="text-[8px] font-mono font-bold tracking-widest text-white">NST</span>
                              <span className="text-[8px] font-mono text-neutral-400">VOL.{idx + 1}</span>
                            </div>
                          </div>

                          {/* Inspect Eye Action Button */}
                          <motion.div 
                            whileHover={{ scale: 1.15 }}
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl border border-neutral-300 z-20"
                          >
                            <Eye className="w-4 h-4 text-[#1C2E1E]" />
                          </motion.div>

                          {/* Left spine depth shadow */}
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                        </div>

                        {/* Top Page Edge of the Pulled Book */}
                        <div className="absolute top-0 right-0 w-full h-2 bg-[#F6F4EE] border-b border-neutral-400 opacity-90 shadow-inner" />
                      </motion.div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Left / Right Arrow Controls */}
            <button
              onClick={toggleBook}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#DDD9CE] shadow-sm flex items-center justify-center text-[#1C2E1E] transition-all cursor-pointer z-30"
              title="Toggle book"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={toggleBook}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#DDD9CE] shadow-sm flex items-center justify-center text-[#1C2E1E] transition-all cursor-pointer z-30"
              title="Toggle book"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Title & Details */}
          <div className="text-center mt-6 space-y-2">
            <h4 className="text-2xl sm:text-3xl font-serif text-[#141412] tracking-tight">
              {selectedBook.fullTitle}
            </h4>
            <div className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
              {selectedBook.badge} • {selectedBook.subBadge} • {selectedBook.year}
            </div>
            <p className="text-xs sm:text-sm text-[#5A5850] max-w-lg mx-auto leading-relaxed pt-1">
              {selectedBook.desc}
            </p>

            {/* Action buttons under book */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsDossierOpen(true)}
                className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A442D] transition-colors shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Project Dossier</span>
              </button>

              {selectedBook.liveUrl && (
                <a
                  href={selectedBook.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white border border-[#DDD9CE] text-[#141412] px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:border-black transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}

              <a
                href={selectedBook.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-white border border-[#DDD9CE] text-[#141412] px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:border-black transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* FULL PROJECT DOSSIER MODAL (OPENS WHEN BOOK IS CLICKED)   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDossierOpen && selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDossierOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* The Opened Book Spread */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-auto"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#FAFBF9] border-b border-[#E8EAE6]">
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C2E1E] hover:text-emerald-700 transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Return to Shelf</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#738273] tracking-wider uppercase">
                    {selectedBook.badge} • {selectedBook.year}
                  </span>
                  <button
                    onClick={() => setIsDossierOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-200/70 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2-Column Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-150">
                
                {/* Left Column: Cover & Summary */}
                <div className="lg:col-span-5 p-7 sm:p-9 bg-gradient-to-b from-[#FAFBF9] to-white flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#1C2E1E] text-white text-xs px-3 py-1 rounded-full font-medium">
                        {selectedBook.badge}
                      </span>
                      <span className="text-xs text-[#5A635A] font-medium border border-neutral-200 bg-white px-2.5 py-0.5 rounded-full">
                        {selectedBook.subBadge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black leading-tight">
                      {selectedBook.fullTitle}
                    </h3>

                    <p className="text-sm font-medium text-emerald-800 leading-snug">
                      "{selectedBook.tagline}"
                    </p>

                    <p className="text-sm text-[#5A635A] leading-relaxed pt-1">
                      {selectedBook.desc}
                    </p>
                  </div>

                  {/* Stack */}
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-xs font-semibold text-black uppercase tracking-wider block mb-2">
                      Technologies & Methods:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBook.tags.map(t => (
                        <span key={t} className="text-xs font-medium bg-neutral-100 text-[#4A554A] px-2.5 py-1 rounded-md border border-neutral-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Capabilities & Action Links */}
                <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6 bg-white">
                  
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-black uppercase tracking-wider block">
                      Core Architecture & Capabilities:
                    </span>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedBook.highlights.map((h, i) => {
                        const Icon = h.icon;
                        return (
                          <div 
                            key={i}
                            className="p-3.5 rounded-2xl bg-[#FAFBF9] border border-[#E8EAE6] flex items-start gap-3.5"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E4DE] flex items-center justify-center shrink-0 text-[#2D4A30] shadow-2xs mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-black leading-snug">
                                {h.label}
                              </h4>
                              <p className="text-xs text-[#5A635A] leading-relaxed mt-0.5">
                                {h.note}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-6 border-t border-neutral-150 flex flex-wrap items-center gap-3">
                    {selectedBook.liveUrl ? (
                      <>
                        <a
                          href={selectedBook.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A442D] transition-colors shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{selectedBook.primaryBtnText}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                        </a>
                        <a
                          href={selectedBook.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-white border border-[#E5E7E5] text-black px-4 py-3 rounded-full text-xs sm:text-sm font-medium hover:border-black transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>GitHub Repository</span>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href={selectedBook.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A442D] transition-colors shadow-sm"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>{selectedBook.primaryBtnText}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                        </a>
                        <span className="text-xs text-[#738273] flex items-center gap-1.5 ml-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Open-Source Project</span>
                        </span>
                      </>
                    )}
                  </div>

                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default ProjectsSection;
