import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

export function ContactSection({ selectedServices }) {
  const [copied, setCopied] = useState(false);
  const email = "abhispacesoni@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subject = selectedServices.length > 0 
    ? encodeURIComponent(`Portfolio Inquiry: ${selectedServices.join(', ')}`)
    : encodeURIComponent("Portfolio Inquiry / Collaboration");

  const body = selectedServices.length > 0
    ? encodeURIComponent(`Hi Abhay,\n\nI was browsing your portfolio and would love to connect regarding: ${selectedServices.join(', ')}.\n\nLooking forward to speaking soon!`)
    : encodeURIComponent("Hi Abhay,\n\nI came across your portfolio and would love to get in touch!\n\nBest regards,");

  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="w-full py-24 px-6 bg-[#FAFBF9] border-t border-[#E8EAE6]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1C2E1E]/5 text-[#1C2E1E] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-[#2D4A30]" />
          <span>Get In Touch</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-black mb-6">
          Let’s build something impactful together.
        </h2>

        <p className="text-base sm:text-lg text-[#5A635A] max-w-xl mx-auto mb-10">
          Whether you have an inquiry, a project collaboration in mind, or just want to connect with a passionate CSAI student developer &mdash; my inbox is always open.
        </p>

        {/* Dynamic Service Selection Notice */}
        {selectedServices.length > 0 && (
          <div className="mb-8 inline-block bg-white border border-[#E0E2DE] px-4 py-2.5 rounded-2xl shadow-xs text-xs sm:text-sm text-[#1C2E1E]">
            <span className="font-medium text-[#2D4A30]">Selected Inquiry Topics:</span>{" "}
            <span className="font-semibold">{selectedServices.join(", ")}</span>
          </div>
        )}

        {/* Email & Action Card */}
        <div className="bg-white border border-[#E5E7E5] rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase font-semibold text-[#738273] tracking-wider mb-2">Direct Email</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <span className="text-xl sm:text-2xl font-medium text-black select-all">
              {email}
            </span>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#F1F3F1] hover:bg-[#E5E8E5] text-[#1C2E1E] transition-colors cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={mailtoUrl}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1C2E1E] text-white font-medium text-sm hover:bg-[#2B462E] transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email Message</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Social Links Cards */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/abhi-og"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#E5E7E5] text-sm font-medium text-black hover:border-black transition-colors shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub (@abhi-og)</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
          </a>

          <a
            href="https://www.linkedin.com/in/abhay-soni-650b13410"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#E5E7E5] text-sm font-medium text-black hover:border-blue-600 hover:text-blue-600 transition-colors shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-600" />
            <span>LinkedIn (Abhay Soni)</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
