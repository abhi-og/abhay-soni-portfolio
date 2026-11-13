import React from 'react';
import { motion } from 'motion/react';
import { Milestone, GraduationCap, Trophy, Bot, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';

export function JourneySection() {
  const milestones = [
    {
      year: "2026",
      title: "CSE Student @ Newton School of Technology, RU",
      subtitle: "Studying & Building Products",
      icon: GraduationCap,
      accent: "emerald",
      desc: "Pursuing Computer Science Engineering at Newton School of Technology, Rishihood University. Actively pairing deep theoretical foundations in data structures and systems with daily shipping of real-world web and AI software.",
      tags: ["B.Tech CSE", "Full-Stack Architecture", "AI Systems", "Newton School of Tech, RU"]
    },
    {
      year: "2026",
      title: "Competitive Hackathons (IEEE Hackathon)",
      subtitle: "Team Logiccoders • High-Intensity Execution",
      icon: Trophy,
      accent: "amber",
      desc: "Collaborated under intense sprint timelines with Team Logiccoders to conceptualize, engineer, test, and pitch Prescripto — an AI clinical workspace aimed at eliminating medication errors and improving prescription accessibility.",
      tags: ["IEEE Hackathon", "Team Logiccoders", "Prescripto", "Rapid Prototyping"]
    },
    {
      year: "2026",
      title: "Robotics Club Member @ Newtonbotics",
      subtitle: "Hardware-Software Integration & Robotics",
      icon: Bot,
      accent: "blue",
      desc: "Active member of Newtonbotics, the university robotics club. Exploring sensor automation, microcontrollers, embedded hardware-software bridging, and intelligent mechanical systems.",
      tags: ["Newtonbotics", "Robotics Club", "Embedded Systems", "Hardware + Code"]
    }
  ];

  return (
    <section id="journey" className="w-full py-28 px-6 bg-white border-t border-[#E8EAE6]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1C2E1E]/5 text-[#1C2E1E] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Milestone className="w-3.5 h-3.5 text-[#2D4A30]" />
            <span>Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-black mb-4">
            The Journey &amp; Milestones
          </h2>
          <p className="text-base sm:text-lg text-[#5A635A]">
            Education, competitive hackathons, and hardware-software exploration. A timeline of continuous building.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-neutral-100 space-y-12 sm:space-y-16">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Node on vertical timeline */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-neutral-200 group-hover:border-[#1C2E1E] flex items-center justify-center text-neutral-600 group-hover:text-[#1C2E1E] transition-colors shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Milestone Content Card */}
                <div className="bg-[#FAFBF9] border border-[#EBECE8] group-hover:border-neutral-300 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D4A30] bg-[#1C2E1E]/5 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      <span>{item.year}</span>
                    </span>
                    <span className="text-xs text-[#738273] font-medium">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-black mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5A635A] leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white text-[#1C2E1E] px-3 py-1 rounded-lg border border-[#E5E7E5] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JourneySection;

