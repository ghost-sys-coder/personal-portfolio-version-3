"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart, ExternalLink } from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    label: "Navigation",
    links: [
      { text: "About", href: "#about" },
      { text: "Skills", href: "#skills" },
      { text: "Projects", href: "#projects" },
      { text: "Experience", href: "#experience" },
      { text: "Testimonials", href: "#testimonials" },
      { text: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Projects",
    links: [
      { text: "Veilcode Agency", href: "https://veilcodestudio.vercel.app/", external: true },
      { text: "Resume AI Analyzer", href: "https://cvscan-seven.vercel.app/", external: true },
      { text: "Chat-2-My-PDF", href: "https://chat2mypdf.vercel.app/", external: true },
      { text: "ShopLocker Store", href: "https://shoplocker.vercel.app/", external: true },
      { text: "RealtyProp Dashboard", href: "https://admindreamhomes.vercel.app/", external: true },
    ],
  },
  {
    label: "Resources",
    links: [
      { text: "Download CV", href: "/Tamale-Frank-CV.pdf", download: true },
      { text: "GitHub Profile", href: "https://github.com/ghost-sys-coder", external: true },
      { text: "LinkedIn", href: "https://linkedin.com/in/tamalefrank", external: true },
      { text: "Send Email", href: "mailto:franktamalejr@gmail.com" },
    ],
  },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/ghost-sys-coder", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/tamalefrank", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/tamalefrank", label: "Twitter" },
  { icon: Mail, href: "mailto:franktamalejr@gmail.com", label: "Email" },
];

const TECH_BADGES = [
  "Next.js", "React Native", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL",
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative bg-[#080809] border-t border-[#1A1A1E] overflow-hidden">

      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-75] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)",
        }}
      />

      {/* ── CTA BAND ── */}
      <div className="relative z-10 border-b border-[#1A1A1E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-2">
              Open for work
            </p>
            <h3 className="font-display text-3xl lg:text-4xl text-[#F2F0EB] font-light leading-tight">
              Have a project in mind?{" "}
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F0C060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let&apos;s talk.
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="mailto:franktamalejr@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] hover:bg-[#F0C060] text-[#0A0A0B] font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#C9A84C]/20 hover:-translate-y-0.5"
            >
              <Mail size={15} />
              Send an Email
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3 border border-[#2A2A2E] hover:border-[#C9A84C]/40 bg-transparent hover:bg-[#1A1A1E] text-[#8A8880] hover:text-[#F2F0EB] font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer"
            >
              Use Contact Form
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C9A84C]/20 rounded-lg rotate-45" />
                <span className="relative font-mono text-[#C9A84C] text-sm font-bold">TF</span>
              </div>
              <div>
                <span className="font-display text-lg text-[#F2F0EB] tracking-wide leading-none block">
                  Tamale Frank
                </span>
                <span className="text-[10px] text-[#8A8880] tracking-[0.2em] uppercase font-mono">
                  Full Stack · Mobile Dev
                </span>
              </div>
            </div>

            <p className="text-[#8A8880] text-sm leading-relaxed max-w-xs mb-6">
              Full-stack web developer and cross-platform mobile engineer, crafting
              digital products that perform beautifully on every screen.
            </p>

            {/* Tech I use */}
            <div className="mb-6">
              <p className="text-[#3A3A3E] text-[10px] font-mono uppercase tracking-widest mb-3">
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_BADGES.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#111113] border border-[#2A2A2E] text-[#8A8880] text-[10px] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#8A8880] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.label}>
              <h4 className="text-[#F2F0EB] text-xs font-semibold tracking-widest uppercase mb-5 font-mono">
                {col.label}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-[#8A8880] hover:text-[#C9A84C] text-sm transition-colors duration-200"
                      >
                        {link.text}
                        <ExternalLink
                          size={10}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : link.download ? (
                      <a
                        href={link.href}
                        download
                        className="text-[#8A8880] hover:text-[#C9A84C] text-sm transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    ) : link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-[#8A8880] hover:text-[#C9A84C] text-sm transition-colors duration-200 cursor-pointer text-left"
                      >
                        {link.text}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[#8A8880] hover:text-[#C9A84C] text-sm transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-[#1A1A1E] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#3A3A3E] text-xs font-mono">
            <span>© {year} Tamale Frank.</span>
            <span className="text-[#2A2A2E]">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#3A3A3E] text-xs font-mono">
            <span>Designed & built with</span>
            <Heart size={11} className="text-red-500/70 fill-red-500/70" />
            <span>by Tamale Frank</span>
          </div>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-[#C9A84C] hover:bg-[#F0C060] text-[#0A0A0B] shadow-lg shadow-[#C9A84C]/25 transition-all duration-300 cursor-pointer ${
          showScroll
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </footer>
  );
}