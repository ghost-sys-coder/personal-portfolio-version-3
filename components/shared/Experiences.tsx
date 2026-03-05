"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ExternalLink, Download } from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type ExperienceType = "Full-time" | "Freelance" | "Contract" | "Self-directed";

interface Experience {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: ExperienceType;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

interface TypeStyle {
  bg: string;
  text: string;
  border: string;
}

interface StatPillProps {
  value: string | number;
  label: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const experiences: Experience[] = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Veilcode Digital Solutions",
    companyUrl: "https://veilcodestudio.vercel.app/",
    location: "Remote — Global",
    period: "2023 — Present",
    type: "Full-time",
    current: true,
    summary:
      "Leading end-to-end development of web platforms and client-facing digital products. Architecting scalable Next.js applications, managing cloud deployments, and driving technical decisions for multiple concurrent projects.",
    highlights: [
      "Architected and shipped 10+ production Next.js applications for international clients",
      "Reduced average page load times by 40% through SSR optimization and image strategies",
      "Established a reusable component library adopted across all agency projects",
      "Mentored junior developers through code reviews and pair programming sessions",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: 2,
    role: "React Native Mobile Developer",
    company: "Freelance — Independent",
    location: "Remote — Africa & Europe",
    period: "2021 — 2023",
    type: "Freelance",
    current: false,
    summary:
      "Built and launched cross-platform mobile applications for clients across Africa and Europe. Delivered full project lifecycles — from UI design handoffs to App Store and Google Play submissions.",
    highlights: [
      "Delivered 8 React Native apps from zero to production on both iOS and Android",
      "Integrated payment gateways (Stripe, Flutterwave) into mobile checkout flows",
      "Reduced client app crash rates by 60% through error boundary implementation",
      "Collaborated with designers using Figma-to-code workflows for pixel-accurate UIs",
    ],
    stack: ["React Native", "Expo", "Redux", "Firebase", "Stripe", "Figma"],
  },
  {
    id: 3,
    role: "Full Stack Web Developer",
    company: "Contract Projects",
    location: "Remote",
    period: "2020 — 2021",
    type: "Contract",
    current: false,
    summary:
      "Worked on a series of contract engagements building full-stack MERN and Next.js applications. Gained deep expertise in RESTful APIs, database design, and deploying production-grade web services.",
    highlights: [
      "Built a real estate listings platform with advanced search and filtering",
      "Developed an admin dashboard with role-based access control for a property firm",
      "Integrated headless CMS (Sanity) into an ecommerce storefront with live preview",
      "Deployed and configured Nginx reverse proxies on Linux VPS environments",
    ],
    stack: ["React.js", "Node.js", "MongoDB", "Express.js", "Sanity", "Nginx"],
  },
  {
    id: 4,
    role: "Frontend Developer",
    company: "Self-Initiated Projects",
    location: "Kampala, Uganda",
    period: "2019 — 2020",
    type: "Self-directed",
    current: false,
    summary:
      "Intensive self-directed learning period building real-world projects to develop proficiency in modern frontend technologies. Focused on React, JavaScript fundamentals, and responsive design.",
    highlights: [
      "Built 15+ personal projects to solidify React and JavaScript fundamentals",
      "Learned version control, CI/CD basics, and professional Git workflows",
      "Studied UI/UX principles and applied them to improve project interfaces",
      "Contributed to open source repositories to learn collaborative development",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React.js", "Git", "Netlify"],
  },
];

// Centralised style map — merged from former scattered inline style objects
const TYPE_STYLES: Record<ExperienceType, TypeStyle> = {
  "Full-time":     { bg: "rgba(104,211,145,0.07)", text: "#68D391", border: "rgba(104,211,145,0.15)" },
  "Freelance":     { bg: "rgba(201,168,76,0.07)",  text: "#C9A84C", border: "rgba(201,168,76,0.15)"  },
  "Contract":      { bg: "rgba(118,228,247,0.07)", text: "#76E4F7", border: "rgba(118,228,247,0.15)" },
  "Self-directed": { bg: "rgba(183,148,244,0.07)", text: "#B794F4", border: "rgba(183,148,244,0.15)" },
};

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerList: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const expandBody: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded:  { height: "auto", opacity: 1, transition: { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1,  x: 0,  transition: { duration: 0.3 } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.25 } },
};

// Helper that returns a typed stagger-container variant
function makeStagger(stagger = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    show:   { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#C9A84C]" />
      <span className="font-mono text-[#C9A84C] text-xs tracking-[0.25em] uppercase">
        {children}
      </span>
    </div>
  );
}

function StatPill({ value, label }: StatPillProps) {
  return (
    <div className="text-center">
      {/* Gradient text — backgroundImage is a dynamic value, kept as style prop */}
      <div
        className="font-display text-3xl font-semibold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #C9A84C, #F0C060)" }}
      >
        {value}
      </div>
      <div className="text-[#8A8880] text-xs mt-1">{label}</div>
    </div>
  );
}

// ── EXPERIENCE CARD ───────────────────────────────────────────────────────────

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState<boolean>(index === 0);
  const typeStyle = TYPE_STYLES[exp.type];
  const isLast = index === experiences.length - 1;

  // Dynamic border colours — cannot be expressed as static Tailwind classes
  const cardBorderNormal  = exp.current ? "rgba(201,168,76,0.30)" : "#2A2A2E";
  const cardBorderHovered = exp.current ? "rgba(201,168,76,0.55)" : "#3A3A3E";

  return (
    <motion.div variants={cardVariant} className="group relative">
      <div className="flex gap-6 lg:gap-10">

        {/* ── Timeline node + vertical connector ── */}
        <div className="hidden sm:flex flex-col items-center shrink-0 pt-1">
          {exp.current ? (
            <motion.div
              className="relative w-4 h-4 rounded-full z-10 bg-[#C9A84C] border-2 border-[#C9A84C]"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(201,168,76,0.35)",
                  "0 0 22px rgba(201,168,76,0.65)",
                  "0 0 10px rgba(201,168,76,0.35)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Expanding ping ring */}
              <motion.span
                className="absolute inset-0 rounded-full bg-[#C9A84C]"
                animate={{ scale: [1, 2, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="relative w-4 h-4 rounded-full z-10 bg-[#0A0A0B] border-2 border-[#2A2A2E]"
              whileHover={{ borderColor: "#C9A84C", scale: 1.25 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {!isLast && (
            <div className="w-px flex-1 mt-3 min-h-10 bg-linear-to-b from-[#2A2A2E] to-transparent" />
          )}
        </div>

        {/* ── Card ── */}
        <motion.div
          className="flex-1 mb-6 rounded-2xl overflow-hidden bg-[#111113]"
          style={{ border: `1px solid ${cardBorderNormal}` }}
          whileHover={{ borderColor: cardBorderHovered }}
          transition={{ duration: 0.25 }}
        >
          {/* Gold top accent — current role only */}
          {exp.current && (
            <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/70 to-transparent" />
          )}

          {/* ── Clickable header ── */}
          <motion.button
            onClick={() => setExpanded((prev) => !prev)}
            className="w-full text-left p-6 cursor-pointer"
            whileTap={{ scale: 0.998 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

              {/* Left — icon + role meta */}
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                  style={
                    exp.current
                      ? { background: "rgba(201,168,76,0.1)", borderColor: "rgba(201,168,76,0.25)" }
                      : { background: "#1A1A1E", borderColor: "#2A2A2E" }
                  }
                >
                  <Briefcase size={18} color={exp.current ? "#C9A84C" : "#8A8880"} />
                </div>

                <div>
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h3 className="text-[#F2F0EB] font-semibold text-base leading-snug">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border"
                        style={{
                          background: "rgba(104,211,145,0.1)",
                          color: "#68D391",
                          borderColor: "rgba(104,211,145,0.25)",
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[#C9A84C] font-medium text-sm">{exp.company}</span>
                    {exp.companyUrl && (
                      <motion.a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="text-[#8A8880]"
                        whileHover={{ color: "#C9A84C", scale: 1.2 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ExternalLink size={11} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right — period / location / type badge */}
              <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1.5 shrink-0">
                <div className="flex items-center gap-1.5 text-[#8A8880] text-xs">
                  <Calendar size={11} />
                  <span className="font-mono">{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#8A8880] text-xs">
                  <MapPin size={11} />
                  <span>{exp.location}</span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border"
                  style={{
                    backgroundColor: typeStyle.bg,
                    color: typeStyle.text,
                    borderColor: typeStyle.border,
                  }}
                >
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-[#8A8880] text-sm leading-relaxed mt-4">{exp.summary}</p>

            {/* Expand / collapse cue */}
            <div className="flex items-center gap-2 mt-4 text-[#C9A84C]/60 text-xs font-mono">
              <span>{expanded ? "Hide details" : "Show details"}</span>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </div>
          </motion.button>

          {/* ── Expandable body ── */}
          <motion.div
            variants={expandBody}
            initial="collapsed"
            animate={expanded ? "expanded" : "collapsed"}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#1A1A1E] pt-5 space-y-5">

              {/* Key Highlights */}
              <div>
                <h4 className="text-[#8A8880] text-[11px] font-mono uppercase tracking-widest mb-3">
                  Key Highlights
                </h4>
                <motion.ul
                  className="space-y-2"
                  variants={makeStagger(0.07)}
                  initial="hidden"
                  animate={expanded ? "show" : "hidden"}
                >
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      variants={slideInLeft}
                      className="flex items-start gap-3 text-sm text-[#8A8880]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60 shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="text-[#8A8880] text-[11px] font-mono uppercase tracking-widest mb-3">
                  Tech Used
                </h4>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={makeStagger(0.05)}
                  initial="hidden"
                  animate={expanded ? "show" : "hidden"}
                >
                  {exp.stack.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={popIn}
                      whileHover={{ borderColor: "rgba(201,168,76,0.4)", color: "#C9A84C", y: -1 }}
                      transition={{ duration: 0.15 }}
                      className="px-3 py-1 rounded-full bg-[#1A1A1E] border border-[#2A2A2E] text-[#8A8880] text-xs font-mono cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const listInView   = useInView(listRef,   { once: true, margin: "-60px" });
  const ctaInView    = useInView(ctaRef,    { once: true, margin: "-60px" });

  const stats: Array<{ value: string | number; label: string }> = [
    { value: "5+",              label: "Years Experience" },
    { value: experiences.length, label: "Roles Held"      },
    { value: "40+",             label: "Projects Shipped" },
  ];

  return (
    <section
      id="experience"
      className="relative bg-[#0D0D0F] py-32 overflow-hidden"
    >
      {/* Ambient glow — top right */}
      <div
        className="absolute top-0 right-0 w-150 h-150 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-[#F2F0EB] font-light mt-2">
              Years of
              <span
                className="block font-semibold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #F0C060 60%, #C9A84C 100%)" }}
              >
                building things.
              </span>
            </h2>
          </div>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-6"
            variants={makeStagger(0.1, 0.2)}
            initial="hidden"
            animate={headerInView ? "show" : "hidden"}
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
              >
                <StatPill value={value} label={label} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── TIMELINE ── */}
        <motion.div
          ref={listRef}
          variants={staggerList}
          initial="hidden"
          animate={listInView ? "show" : "hidden"}
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#2A2A2E] bg-[#111113]"
        >
          <p className="text-[#8A8880] text-sm text-center sm:text-left">
            Want the full picture?{" "}
            <span className="text-[#F2F0EB]">Download my CV</span> for a complete work history.
          </p>
          <motion.a
            href="/assets/CV_TAMALEFRANK.pdf"
            download
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0A0B] font-semibold text-sm rounded-xl"
            whileHover={{
              backgroundColor: "#F0C060",
              y: -2,
              boxShadow: "0 8px 24px rgba(201,168,76,0.28)",
            }}
            whileTap={{ y: 0, boxShadow: "none" }}
            transition={{ duration: 0.2 }}
          >
            <Download size={15} />
            Download Full CV
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}