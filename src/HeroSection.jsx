import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useTypewriter } from './useTypewriter';

export function HeroSection({ selectedServices, setSelectedServices }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef(null);

  // Scroll listener to activate frosted-glass navbar when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceOptions = ["AI Integration", "Digital", "Full-Stack Dev", "Other"];
  const navLinks = [
    { name: "Intro", href: "#intro" },
    { name: "Work", href: "#work" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" }
  ];

  const { displayed, done } = useTypewriter("building modern\nweb & AI software.", 35, 400);

  // Desktop Mouse Head Tracking Hook: Directly follows the cursor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let isSeeking = false;
    let pendingTime = null;

    const performSeek = () => {
      if (!video || !video.duration) return;
      if (isSeeking) {
        pendingTime = targetTime;
        return;
      }

      const diff = targetTime - video.currentTime;
      // Seek when moved by at least ~0.015s (rapid, fine-grain frame tracking)
      if (Math.abs(diff) > 0.015) {
        isSeeking = true;
        const clamped = Math.max(0, Math.min(video.duration, targetTime));
        if ('fastSeek' in video) {
          video.fastSeek(clamped);
        } else {
          video.currentTime = clamped;
        }
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const next = pendingTime;
        pendingTime = null;
        targetTime = next;
        performSeek();
      }
    };

    video.addEventListener('seeked', onSeeked);

    const onLoadedMetadata = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        // Start facing forward/center
        video.currentTime = video.duration / 2;
        targetTime = video.duration / 2;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    if (video.duration && !Number.isNaN(video.duration)) {
      video.currentTime = video.duration / 2;
      targetTime = video.duration / 2;
    }

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      // Cursor ratio across screen: 0.0 (left) to 1.0 (right)
      const ratio = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      
      // Direct cursor following:
      // When cursor is at left (ratio ~0) -> video at 0 (head looks left)
      // When cursor is at right (ratio ~1) -> video at duration (head looks right)
      targetTime = ratio * video.duration;

      performSeek();
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  // Mobile Autoplay Hook (< 1024px)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaybackMode = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    handlePlaybackMode();
    window.addEventListener('resize', handlePlaybackMode);

    return () => {
      window.removeEventListener('resize', handlePlaybackMode);
    };
  }, []);

  const toggleService = (option) => {
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* 4. Interactive Navbar with scroll-aware frosted glass background */}
      <header
        className={`fixed top-0 inset-x-0 z-50 px-5 sm:px-8 transition-all duration-300 flex flex-row justify-between items-center ${
          isScrolled
            ? 'py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
            : 'py-5 bg-white/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b border-transparent'
        }`}
      >
        {/* Logo (Left side) */}
        <a href="#" className="flex flex-row items-center gap-2 group">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-semibold select-none group-hover:opacity-75 transition-opacity">
            Abhay Soni
          </span>
          <span className="text-[22px] sm:text-[26px] text-[#2D4A30] select-none tracking-[-0.02em] font-medium leading-none mb-0.5 animate-pulse">
            &#10033;
          </span>
        </a>

        {/* Desktop Nav Links (Center) */}
        <nav className="hidden md:flex flex-row items-center text-[20px] text-black font-normal">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.name}>
              <a
                href={link.href}
                className="hover:text-[#2D4A30] hover:opacity-70 transition-all"
              >
                {link.name}
              </a>
              {idx < navLinks.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (Right) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 text-neutral-600">
            <a
              href="https://github.com/abhi-og"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-black hover:bg-neutral-100 rounded-full transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhay-soni-650b13410"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:text-blue-600 hover:bg-neutral-100 rounded-full transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>

          <a
            href="#contact"
            className="text-[20px] text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-medium"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none z-40 cursor-pointer p-1 rounded-lg hover:bg-neutral-100"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Full Screen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-white/95 backdrop-blur-md md:hidden flex flex-col justify-center items-center px-6 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-2xl text-black font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#2D4A30] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 text-2xl text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Get in touch
          </a>

          <div className="flex items-center gap-5 mt-6 pt-6 border-t border-neutral-200">
            <a
              href="https://github.com/abhi-og"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            >
              <GithubIcon className="w-6 h-6 text-neutral-800" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhay-soni-650b13410"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            >
              <LinkedinIcon className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="mailto:abhispacesoni@gmail.com"
              className="p-3 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            >
              <Mail className="w-6 h-6 text-emerald-800" />
            </a>
          </div>
        </nav>
      </div>

      {/* 3. Background Video Component (with Native Cursor Head Scrubbing) */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 5. Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center pt-28 sm:pt-36 lg:pt-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 self-start bg-[#1C2E1E]/5 text-[#1C2E1E] px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#1C2E1E]/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2D4A30]" />
            <span>CSE @ Newton School of Technology, RU &bull; Learning by Building</span>
          </motion.div>

          {/* 6. Typewriter Hook and Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-6 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* 7. Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-10 max-w-2xl">
              CSE student at Newton School of Technology, Rishihood University. Building ideas for the web with an active builder mindset &mdash; learning from building.
            </p>
          </motion.div>

          {/* 8. Interactive Multi-Select Service Pills */}
          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-black">What sort of service?</h2>
            <p className="opacity-85 text-[#738273] mb-6 text-sm">Select all that apply</p>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {serviceOptions.map((option) => {
                const isSelected = selectedServices.includes(option);
                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggleService(option)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/10 transform'
                        : 'bg-white text-[#1C2E1E] border border-[#E5E7E5] hover:bg-[#F1F3F1]/70'
                    }`}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 22 }}
                          className="flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span>{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <AnimatePresence mode="wait">
              {selectedServices.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="opacity-50 italic text-xs text-[#5A635A]"
                >
                  Please click to select services above.
                </motion.p>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#FAFBF9] border border-[#E8EAE6] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <span className="text-sm sm:text-base text-[#1C2E1E] font-medium">
                      Ready to inquire about: {selectedServices.join(", ")}
                    </span>
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-bold tracking-wider hover:opacity-80 transition-opacity self-start sm:self-auto cursor-pointer"
                    >
                      <span>Let's Go</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HeroSection;
