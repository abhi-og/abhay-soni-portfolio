import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Code2, Cpu, Globe, Terminal, Sparkles } from 'lucide-react';

export function AboutSection() {
  const stackCategories = [
    {
      title: "Frontend Engineering",
      icon: Globe,
      skills: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript / ES6+", "HTML5 & Modern CSS", "Responsive UI/UX"]
    },
    {
      title: "Backend & Systems",
      icon: Terminal,
      skills: ["Node.js", "Express", "RESTful APIs", "Database Fundamentals", "Git & GitHub", "Vite & Tooling"]
    },
    {
      title: "AI & Computer Science",
      icon: Cpu,
      skills: ["CSAI Foundations", "AI System Integration", "LLM APIs & Prompting", "Problem Solving", "Algorithm Design"]
    }
  ];

  return (
    <section id="about" className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Academic Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 bg-[#1C2E1E]/5 text-[#1C2E1E] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#2D4A30]" />
              <span>Background</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-6">
              Engineering solutions with curiosity &amp; code.
            </h2>

            <div className="space-y-4 text-[#5A635A] text-base leading-relaxed">
              <p>
                I'm <strong>Abhay Soni</strong>, an undergraduate student pursuing a <strong>B.Tech in Computer Science &amp; Artificial Intelligence (CSAI)</strong>.
              </p>
              <p>
                My focus lies at the intersection of modern full-stack web engineering and pragmatic AI integration. Whether it's crafting silky-smooth, responsive user interfaces or integrating intelligent models to solve complex real-world challenges, I enjoy bringing ideas from sketch to deployment.
              </p>
              <p>
                Beyond academics, I actively participate in hackathons (such as IEEE Hackathons with Team Logiccoders) and collaborate on open-source projects.
              </p>
            </div>

            {/* Quick Education Card */}
            <div className="mt-8 p-5 bg-[#FAFBF9] border border-[#E8EAE6] rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E0E2DE] flex items-center justify-center shrink-0 text-[#1C2E1E]">
                <GraduationCap className="w-5 h-5 text-[#2D4A30]" />
              </div>
              <div>
                <h4 className="font-medium text-black text-sm">B.Tech in Computer Science &amp; Artificial Intelligence</h4>
                <p className="text-xs text-[#738273] mt-0.5">Currently Enrolled &bull; College Student</p>
                <p className="text-xs text-[#5A635A] mt-2">
                  Specializing in AI architectures, algorithm design, software engineering, and full-stack development.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Stack Grid */}
          <div id="stack" className="lg:col-span-7">
            <div className="mb-8">
              <h3 className="text-2xl font-medium tracking-tight text-black mb-2">Technical Skillset</h3>
              <p className="text-sm text-[#5A635A]">Tools and technologies I use to build robust software.</p>
            </div>

            <div className="space-y-5">
              {stackCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-[#FAFBF9] border border-[#E8EAE6] rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7E5] flex items-center justify-center text-[#2D4A30]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-medium text-black text-base">{cat.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-white text-[#1C2E1E] text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E8EAE6] shadow-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

