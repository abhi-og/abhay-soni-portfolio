import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, Code2, Compass } from 'lucide-react';

export function IntroSection() {
  return (
    <section id="intro" className="w-full py-24 sm:py-32 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Subtle pill tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C2E1E]/5 text-[#1C2E1E] text-xs font-semibold uppercase tracking-wider self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D4A30]" />
              <span>Core Philosophy</span>
            </motion.div>

            {/* Editorial Statement (NO underline) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.2]"
            >
              I am a CSE student at <span className="font-medium text-black">Newton School of Technology, Rishihood University</span>. I build ideas for the web, engineering responsive applications with intelligent AI integrations.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#5A635A] leading-relaxed font-normal"
            >
              My defining approach is <strong className="text-black font-semibold">learning by building</strong>. Rather than keeping theory on paper, I believe real mastery comes from architecting systems from scratch, iterating through challenges, and shipping software that creates tangible value.
            </motion.p>

            {/* Builder Mindset Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#FAFBF9] border border-[#E8EAE6] rounded-2xl p-5 flex items-start gap-4 max-w-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7E5] flex items-center justify-center shrink-0 text-emerald-800 shadow-xs">
                <Flame className="w-5 h-5 text-[#2D4A30]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C2E1E] mb-1">
                  The Builder Mindset
                </h4>
                <p className="text-xs sm:text-sm text-[#5A635A] leading-relaxed">
                  Transforming complex concepts into production-grade interfaces, backend services, and hackathon prototypes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Picture */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Floating Animation Wrapper */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative group cursor-pointer"
              >
                {/* Decorative background glow & accent rings */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-100/60 via-neutral-100/40 to-transparent rounded-[36px] blur-xl -z-10 group-hover:scale-105 transition-transform duration-500" />

                {/* Picture Frame */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-black/8 bg-neutral-100 max-w-[320px] sm:max-w-[360px]">
                  <img
                    src="/abhay-photo.jpg"
                    alt="Abhay Soni — Learning from building"
                    className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 sm:p-5 text-white flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold tracking-tight">Abhay Soni</p>
                      <p className="text-[11px] text-white/80">Builder &bull; CSE @ NST RU</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-white border border-white/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Building
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default IntroSection;
