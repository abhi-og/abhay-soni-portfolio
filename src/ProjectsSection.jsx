import React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, Sparkles, Activity, Pill, ShieldCheck, FileText, 
  BookOpen, Users, Layers, Clock, ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from './icons';

export function ProjectsSection() {
  const projects = [
    {
      id: "prescripto",
      title: "Prescripto — AI Clinical Workspace",
      badge: "IEEE Hackathon Project",
      subBadge: "Team Logiccoders",
      accent: "from-emerald-500/10 via-transparent to-transparent",
      badgeColor: "bg-[#1C2E1E] text-white",
      desc: "An AI-powered clinical workspace built for an IEEE Hackathon. Helps digitise doctor prescriptions, mitigate medication errors, compare affordable generic alternatives, and support patient dosage adherence.",
      highlights: [
        { icon: FileText, label: "Prescription Digitization (OCR)" },
        { icon: ShieldCheck, label: "Medication Interaction Safety" },
        { icon: Pill, label: "Generic Medicine Price Matching" },
        { icon: Activity, label: "Dosage & Adherence Guidance" }
      ],
      tags: ["AI / LLM", "Full-Stack", "Healthcare Tech", "Rapid Prototyping"],
      githubUrl: "https://github.com/Logic-Coders-Prescripto/PrescriptoPlus",
      liveUrl: null,
      primaryBtnText: "View on GitHub"
    },
    {
      id: "jee-tracker",
      title: "JEE Daily Sheet — Progress Tracker",
      badge: "Web App • Study System",
      subBadge: "Dual-Role Dashboard",
      accent: "from-blue-500/10 via-transparent to-transparent",
      badgeColor: "bg-[#1A2E35] text-white",
      desc: "A daily preparation and accountability dashboard engineered for competitive exam aspirants. Solves the mentor-student visibility gap through synchronized interfaces for syllabus completion and revision logs.",
      highlights: [
        { icon: Users, label: "Dual Interface: Student & Parent" },
        { icon: Layers, label: "PCM Chapter Syllabus Checklist" },
        { icon: Clock, label: "Daily Study Hours & PYQ Counts" },
        { icon: BookOpen, label: "Instant Local Caching & Sync" }
      ],
      tags: ["HTML5 / JS", "Study System", "Dark Mode UI", "PWA / Web App"],
      githubUrl: "https://github.com/abhi-og/jee-tracker",
      liveUrl: "https://abhi-og.github.io/jee-tracker/student-tracker.html",
      primaryBtnText: "Live Student Tracker"
    }
  ];

  return (
    <section id="work" className="w-full py-24 sm:py-32 px-6 bg-[#FAFBF9] border-t border-b border-[#E8EAE6] scroll-mt-20">
      <div id="projects" className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#1C2E1E]/5 text-[#1C2E1E] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2D4A30]" />
            <span>Selected Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-black mb-3"
          >
            Engineering for real-world impact.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#5A635A]"
          >
            Clinical software and study systems built to solve everyday challenges.
          </motion.p>
        </div>

        {/* 2-Column Side-by-Side Grid (Both projects visible together) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-[#E5E7E5] hover:border-neutral-300 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Corner Ambient Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${project.accent} rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500`} />

              <div className="relative z-10 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`${project.badgeColor} text-xs px-3 py-1 rounded-full font-medium shadow-2xs`}>
                    {project.badge}
                  </span>
                  <span className="text-xs text-[#5A635A] font-medium border border-neutral-200 bg-neutral-50/60 px-2.5 py-0.5 rounded-full">
                    {project.subBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-[26px] font-medium tracking-tight text-black leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#5A635A] text-sm sm:text-base leading-relaxed">
                  {project.desc}
                </p>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {project.highlights.map((h, hIdx) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFBF9] border border-[#ECEEEA] text-xs font-medium text-[#1C2E1E]"
                      >
                        <div className="w-6 h-6 rounded-lg bg-white border border-[#E5E7E5] flex items-center justify-center shrink-0 text-[#2D4A30] shadow-3xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-tight">{h.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium bg-[#F5F6F4] text-[#4A554A] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-8 mt-6 border-t border-neutral-100">
                {project.liveUrl ? (
                  <>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A442D] transition-colors shadow-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{project.primaryBtnText}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white border border-[#E5E7E5] text-black px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:border-black transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1C2E1E] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#2A442D] transition-colors shadow-sm"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>{project.primaryBtnText}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                    </a>
                    <span className="text-xs text-[#738273] flex items-center gap-1.5 ml-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Open Source Repo</span>
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;
