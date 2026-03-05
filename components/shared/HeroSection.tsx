"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { Download, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface Stat {
  value: string;
  label: string;
}

interface DotParticle {
  x: number;
  y: number;
  alpha: number;
  speed: number;
  offset: number;
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const ROLES: string[] = [
  "Full Stack Developer",
  "Mobile App Engineer",
  "React Native Expert",
  "Next.js Specialist",
  "API Architect",
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github,   href: "https://github.com/ghost-sys-coder",    label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com/in/tamalefrank",   label: "LinkedIn" },
  { icon: Twitter,  href: "https://twitter.com/tamalefrank",       label: "Twitter"  },
];

const STATS: Stat[] = [
  { value: "5+",  label: "Years Experience"   },
  { value: "40+", label: "Projects Shipped"   },
  { value: "15+", label: "Happy Clients"      },
  { value: "2",   label: "Platforms Mastered" },
];

const TECH_BADGES: string[] = ["Next.js", "React Native", "Node.js", "TypeScript"];

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 } },
};

const scrollIndicator: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { delay: 1.2, duration: 0.6 } },
};

const typewriterCursor: Variants = {
  blink: {
    opacity: [1, 0, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: "linear" },
  },
};

const pingVariants: Variants = {
  ping: {
    scale: [1, 1.8, 1],
    opacity: [0.75, 0, 0.75],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const scrollLineVariants: Variants = {
  pulse: {
    opacity: [0.4, 1, 0.4],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ── CANVAS PARTICLE GRID ──────────────────────────────────────────────────────

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = (): void => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const SPACING = 48;
    const cols = Math.ceil(window.innerWidth  / SPACING);
    const rows = Math.ceil(window.innerHeight / SPACING);

    const dots: DotParticle[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x:      i * SPACING + SPACING / 2,
          y:      j * SPACING + SPACING / 2,
          alpha:  Math.random() * 0.25 + 0.02,
          speed:  Math.random() * 0.003 + 0.001,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }

    let frame = 0;
    let animId: number;

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const dot of dots) {
        const pulse = Math.sin(frame * dot.speed + dot.offset);
        const alpha = Math.max(0, dot.alpha + pulse * 0.08);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

// ── TYPEWRITER HOOK ───────────────────────────────────────────────────────────

function useTypewriter(roles: string[]): string {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);

    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 100); // small delay prevents sync cascade

    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return displayText;
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function AvailableBadge() {
  return (
    <motion.div
      variants={itemVariants}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#111113] mb-8"
    >
      <span className="relative flex h-2 w-2">
        <motion.span
          variants={pingVariants}
          animate="ping"
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="text-xs text-[#8A8880] font-mono tracking-widest uppercase">
        Available for new projects
      </span>
    </motion.div>
  );
}

function StatCard({ value, label }: Stat) {
  return (
    <div className="bg-[#0A0A0B] rounded-xl p-4 text-center border border-[#1A1A1E] hover:border-[#C9A84C]/20 transition-colors duration-300">
      <div className="font-display text-3xl font-semibold bg-linear-to-br from-[#C9A84C] to-[#F0C060] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[#8A8880] text-xs mt-1 leading-tight">{label}</div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayText = useTypewriter(ROLES);

  useParticleCanvas(canvasRef);

  const scrollTo = useCallback((id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0B]"
    >
      {/* Animated dot grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Radial glow — top left */}
      <div className="absolute -top-40 -left-40 w-175 h-175 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_65%)]" />

      {/* Radial glow — bottom right */}
      <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_65%)]" />

      {/* Diagonal accent line — expressed as a skewed gradient bar */}
      <div className="absolute top-0 right-[20%] w-px h-full pointer-events-none opacity-10 -skew-x-6 bg-linear-to-b from-transparent via-[#C9A84C] to-transparent" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">

          {/* ── LEFT — Text column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AvailableBadge />

            {/* Name */}
            <motion.h1 variants={itemVariants}>
              <span className="block font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#F2F0EB] font-light">
                Tamale
              </span>
              <span className="block font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight font-semibold bg-linear-to-r from-[#C9A84C] via-[#F0C060] to-[#C9A84C] bg-clip-text text-transparent">
                Frank.
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mt-6 mb-6"
            >
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="font-mono text-[#C9A84C] text-sm tracking-wider uppercase">
                {displayText}
                <motion.span
                  variants={typewriterCursor}
                  animate="blink"
                  className="inline-block w-0.5 h-4 bg-[#C9A84C] ml-0.5 align-middle"
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#8A8880] text-lg leading-relaxed max-w-xl"
            >
              I craft high-performance web applications and cross-platform mobile
              experiences — turning complex problems into elegant, scalable digital
              products that users love.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-10"
            >
              <motion.button
                onClick={() => scrollTo("projects")}
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] text-[#0A0A0B] font-semibold rounded-lg cursor-pointer"
                whileHover={{
                  backgroundColor: "#F0C060",
                  y: -2,
                  boxShadow: "0 16px 32px rgba(201,168,76,0.22)",
                }}
                whileTap={{ y: 0, boxShadow: "none" }}
                transition={{ duration: 0.2 }}
              >
                View My Work
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>

              <motion.a
                href="/assets/CV_TAMALEFRANK.pdf"
                download
                className="flex items-center gap-2 px-7 py-3.5 border border-[#2A2A2E] text-[#F2F0EB] font-medium rounded-lg bg-[#111113]"
                whileHover={{
                  borderColor: "rgba(201,168,76,0.5)",
                  color: "#C9A84C",
                  backgroundColor: "#1A1A1E",
                  y: -2,
                }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <motion.button
                onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 text-[#8A8880] font-medium underline underline-offset-4 decoration-[#2A2A2E] cursor-pointer"
                whileHover={{ color: "#F2F0EB", textDecorationColor: "#C9A84C" }}
                transition={{ duration: 0.2 }}
              >
                Let&apos;s Talk
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mt-10"
            >
              <span className="text-xs text-[#2A2A2E] font-mono tracking-widest uppercase">
                Find me on
              </span>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#8A8880]"
                    whileHover={{
                      color: "#C9A84C",
                      borderColor: "rgba(201,168,76,0.5)",
                      backgroundColor: "rgba(201,168,76,0.05)",
                      y: -2,
                    }}
                    whileTap={{ y: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Profile card ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Card ambient glow */}
              <div className="absolute -inset-4 rounded-2xl pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

              <div className="relative border border-[#2A2A2E] rounded-2xl bg-[#111113] p-8 overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

                {/* Avatar ring — conic gradient achieved via a gradient border wrapper */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                  {/*
                    Conic gradient border: outer div acts as the coloured ring,
                    inner div clips to a circle providing the background.
                    Cannot be expressed as a single Tailwind class.
                  */}
                  <div
                    className="absolute inset-0 rounded-full p-0.5"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #C9A84C, #F0C060, #C9A84C, #8A6A20, #C9A84C)",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#1A1A1E] flex items-center justify-center">
                      <span className="font-display text-3xl text-[#C9A84C] font-semibold">
                        TF
                      </span>
                    </div>
                  </div>

                  {/* Online status dot */}
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#111113]" />
                </div>

                {/* Name block */}
                <div className="text-center mb-8">
                  <h3 className="font-display text-xl text-[#F2F0EB] font-medium">
                    Tamale Frank
                  </h3>
                  <p className="text-[#8A8880] text-sm mt-1 font-mono">
                    Full Stack · Mobile Dev
                  </p>
                </div>

                <div className="h-px bg-[#2A2A2E] mb-8" />

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                  ))}
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {TECH_BADGES.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#1A1A1E] text-[#8A8880] text-xs font-mono border border-[#2A2A2E]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          variants={scrollIndicator}
          initial="hidden"
          animate="show"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#2A2A2E] text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            variants={scrollLineVariants}
            animate="pulse"
            className="w-px h-12 bg-linear-to-b from-[#C9A84C]/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}