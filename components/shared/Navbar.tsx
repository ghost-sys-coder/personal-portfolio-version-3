"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-[#2A2A2E]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C9A84C]/20 rounded-lg rotate-45 group-hover:rotate-55 transition-transform duration-300" />
                <span className="relative font-mono text-[#C9A84C] text-sm font-bold">TF</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-lg text-[#F2F0EB] tracking-wide leading-none block">
                  Tamale Frank
                </span>
                <span className="text-[10px] text-[#8A8880] tracking-[0.2em] uppercase font-mono">
                  Full Stack · Mobile
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#C9A84C]"
                        : "text-[#8A8880] hover:text-[#F2F0EB]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/Tamale-Frank-CV.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] hover:bg-[#F0C060] text-[#0A0A0B] text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#C9A84C]/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download size={14} strokeWidth={2.5} />
                Download CV
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-[#8A8880] hover:text-[#F2F0EB] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#111113] border-l border-[#2A2A2E] flex flex-col pt-24 pb-8 px-8 transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-4 text-[#8A8880] hover:text-[#F2F0EB] hover:bg-[#1A1A1E] rounded-lg transition-all duration-200 text-base font-medium tracking-wide cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-[#C9A84C]/60 font-mono text-xs mr-3">0{i + 1}</span>
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="/assets/CV_TAMALEFRANK.pdf"
            download
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] hover:bg-[#F0C060] text-[#0A0A0B] text-sm font-semibold rounded-lg transition-colors duration-200 mt-4"
          >
            <Download size={14} strokeWidth={2.5} />
            Download CV
          </a>

          <p className="text-center text-[#2A2A2E] text-xs font-mono mt-6 tracking-widest">
            TAMALE FRANK © 2025
          </p>
        </div>
      </div>
    </>
  );
}