"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { Github, ExternalLink, Lock, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface Credentials {
  email: string;
  password: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  projectUrl: string;
  tags: string[];
  featured?: boolean;
  credentials?: Credentials;
}

type FilterValue = "All" | "Next.js" | "React.js" | "AI-Powered" | "JavaScript" | "Dashboard";

type TagKey =
  | "Next.js" | "React.js" | "AI-Powered" | "JavaScript"
  | "MongoDB" | "Sanity CMS" | "Dashboard" | "Fullstack"
  | "Landing Page" | "Business" | "Real Estate" | "Web App";

interface SectionLabelProps { children: React.ReactNode }
interface StatItemProps { value: string | number; label: string }
interface CredentialsBadgeProps { credentials: Credentials }
interface ProjectCardProps { project: Project; index: number }

// ── DATA ──────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    name: "Veilcode Digital Solutions Agency",
    description:
      "A full-featured digital agency website showcasing services, portfolio, and client-facing pages — built with Next.js for performance and SEO.",
    imageUrl: "/projects/brainwave-landing-page-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/veilcode-business-agency",
    projectUrl: "https://veilcodestudio.vercel.app/",
    tags: ["Next.js", "Web App"],
    featured: true,
  },
  {
    id: 6,
    name: "Resume AI Analyzer",
    description:
      "Enterprise-grade ATS powered by AI — analyses CVs, scores candidates, and surfaces insights for recruiters using Next.js and MongoDB.",
    imageUrl: "/projects/ai-resume-analyzer-web-app.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/React-with-NextJS-Enterprise-ready-applicant-tracking-system",
    projectUrl: "https://cvscan-seven.vercel.app/",
    tags: ["Next.js", "AI-Powered", "MongoDB"],
    featured: true,
  },
  {
    id: 10,
    name: "Chat-2-My-PDF",
    description:
      "AI SaaS app that lets users upload PDFs and have intelligent conversations with their documents — built with Next.js and LLM integration.",
    imageUrl: "/projects/nextjs-blog-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/chat-2-my-pdf-ai-saas-project",
    projectUrl: "https://chat2mypdf.vercel.app/",
    tags: ["Next.js", "AI-Powered"],
    featured: true,
  },
  {
    id: 3,
    name: "RealtyProp Real Estate Dashboard",
    description:
      "Full-featured admin dashboard for a real estate platform — property listings, analytics, and tenant management built with React.",
    imageUrl: "/projects/realestate-admin.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/realestate-dreamhomes-admin-dashboard",
    projectUrl: "https://admindreamhomes.vercel.app/",
    tags: ["React.js", "Dashboard", "Web App"],
    credentials: { email: "franktamalejr@gmail.com", password: "M@rgret55" },
  },
  {
    id: 4,
    name: "Ecommerce Store with Sanity",
    description:
      "Headless ecommerce storefront powered by Sanity CMS — product pages, cart, checkout flow, and real-time content updates.",
    imageUrl: "/projects/sanity-ecommerce-store.png",
    githubUrl: "https://github.com/ghost-sys-coder/ecommerce_next_sanity_store",
    projectUrl: "https://ecommerce-next-sanity-store.vercel.app/",
    tags: ["React.js", "Next.js", "Sanity CMS"],
  },
  {
    id: 11,
    name: "ShopLocker Ecommerce",
    description:
      "A clean, modern ecommerce experience built with Next.js — product browsing, cart management, and a seamless checkout experience.",
    imageUrl: "/projects/NextJS-Store-shoplocker.vercel.app.png",
    githubUrl: "https://github.com/ghost-sys-coder/my-ecommerce-shop",
    projectUrl: "https://shoplocker.vercel.app/",
    tags: ["Next.js", "React.js"],
  },
  {
    id: 5,
    name: "Inspire Me Salon Website",
    description:
      "Business website for a premium salon brand — services, gallery, booking info, and brand storytelling with a polished UI.",
    imageUrl: "/projects/salon-website-template.png",
    githubUrl: "https://github.com/ghost-sys-coder/salon-website-template",
    projectUrl: "https://salon-website-template-five.vercel.app/",
    tags: ["React.js", "Next.js", "Business"],
  },
  {
    id: 2,
    name: "Brainwave Landing Page",
    description:
      "Sleek, animated AI SaaS landing page inspired by modern design trends — responsive, fast, and visually striking.",
    imageUrl: "/projects/brainwave-landing-page-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/mern-brainwave-landing-page",
    projectUrl: "https://brainwave-kappa.vercel.app/",
    tags: ["React.js", "Landing Page"],
  },
  {
    id: 7,
    name: "Bienvenidos Apartment",
    description:
      "Property listing website for a residential apartment complex — showcasing units, amenities, and contact information.",
    imageUrl: "/projects/bienvenidos.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/apartment-website/tree/main/Rinah_Website",
    projectUrl: "https://myapartmentwebsite.netlify.app/",
    tags: ["React.js", "Real Estate"],
  },
  {
    id: 8,
    name: "DreamHomes Real Estate",
    description:
      "Fullstack vanilla JavaScript real estate web app — property search, listings, and contact forms without any framework.",
    imageUrl: "/projects/javascript-realestate-webapp.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/fullstack-vanilla-javascript-realestate-web-app",
    projectUrl: "https://dreamhomesug.onrender.com/",
    tags: ["JavaScript", "Fullstack"],
  },
  {
    id: 9,
    name: "Personal Portfolio V1",
    description:
      "First iteration of my personal portfolio — built with vanilla JavaScript to showcase projects and skills.",
    imageUrl: "/projects/portfolio-project.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/personal-portfolio-website-V1",
    projectUrl: "https://personal-portfolio-version1.netlify.app/",
    tags: ["JavaScript", "Web App"],
  },
];

const ALL_FILTERS: FilterValue[] = [
  "All", "Next.js", "React.js", "AI-Powered", "JavaScript", "Dashboard",
];


const TAG_COLOR_VAR: Record<TagKey, string> = {
  "Next.js": "--color-tag-nextjs",
  "React.js": "--color-tag-react",
  "AI-Powered": "--color-tag-ai",
  "JavaScript": "--color-tag-js",
  "MongoDB": "--color-tag-mongo",
  "Sanity CMS": "--color-tag-sanity",
  "Dashboard": "--color-tag-dashboard",
  "Fullstack": "--color-tag-fullstack",
  "Landing Page": "--color-tag-landing",
  "Business": "--color-tag-business",
  "Real Estate": "--color-tag-realestate",
  "Web App": "--color-tag-webapp",
};

function getTagVar(tag: string): string {
  return TAG_COLOR_VAR[tag as TagKey] ?? "--color-tag-webapp";
}

const VISIBLE_COUNT = 6;

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

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

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-semibold bg-linear-to-br from-[#C9A84C] to-[#F0C060] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[#8A8880] text-xs mt-1">{label}</div>
    </div>
  );
}

// ── TAG CHIP ──────────────────────────────────────────────────────────────────

function TagChip({ tag }: { tag: string }) {
  const color = `var(${getTagVar(tag)})`;
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 18%, transparent)`,
      }}
    >
      {tag}
    </span>
  );
}

// ── CREDENTIALS BADGE ─────────────────────────────────────────────────────────

function CredentialsBadge({ credentials }: CredentialsBadgeProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0C060]/10 border border-[#F0C060]/30 text-[#F0C060] text-[10px] font-mono hover:bg-[#F0C060]/20 transition-colors cursor-pointer"
      >
        <Lock size={10} />
        Demo Credentials
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 z-20 w-56 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] p-4 shadow-2xl shadow-black/60"
          >
            {/* Arrow caret */}
            <div className="absolute bottom-0 left-5 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#2A2A2E]" />
            <p className="text-[#8A8880] text-[10px] font-mono mb-3 uppercase tracking-widest">
              Login Details
            </p>
            <div className="space-y-2">
              <div>
                <span className="text-skill-gold text-[10px] font-mono">EMAIL</span>
                <p className="text-[#F2F0EB] text-xs mt-0.5 break-all">{credentials.email}</p>
              </div>
              <div>
                <span className="text-skill-gold text-[10px] font-mono">PASSWORD</span>
                <p className="text-[#F2F0EB] text-xs mt-0.5">{credentials.password}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const featured = project.featured ?? false;

  return (
    <motion.div
      variants={cardVariant}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.6)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-[#111113] overflow-hidden",
        featured
          ? "border-[#C9A84C]/30 hover:border-[#C9A84C]/60"
          : "border-[#2A2A2E] hover:border-[#3A3A3E]",
      )}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-skill-gold text-[#0A0A0B] text-[10px] font-bold tracking-wide">
          <Sparkles size={9} />
          Featured
        </div>
      )}

      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden bg-[#0A0A0B]">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0A0A0B]/70 flex items-center justify-center gap-4"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 bg-skill-gold text-[#0A0A0B] text-xs font-bold rounded-lg"
            whileHover={{ backgroundColor: "#F0C060", scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <ExternalLink size={12} />
            Live Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1E] text-[#F2F0EB] text-xs font-medium rounded-lg border border-[#3A3A3E]"
            whileHover={{ backgroundColor: "#2A2A2E", scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Github size={12} />
            Code
          </motion.a>
        </motion.div>

        {/* Bottom image fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#111113] to-transparent" />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <h3 className="text-[#F2F0EB] font-semibold text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors duration-200">
          {project.name}
        </h3>

        <p className="text-[#8A8880] text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1A1A1E]">
          <div>
            {project.credentials && (
              <CredentialsBadge credentials={project.credentials} />
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#8A8880]"
              whileHover={{ color: "#F2F0EB", borderColor: "#3A3A3E" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
            >
              <Github size={14} />
            </motion.a>
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live project"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#8A8880]"
              whileHover={{ color: "#C9A84C", borderColor: "rgba(201,168,76,0.4)" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
            >
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const filterInView = useInView(filterRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
        p.tags.some((t) =>
          t.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );

  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT);


  const countFor = (filter: string): number =>
    projects.filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
    ).length;

  return (
    <section
      id="projects"
      className="relative bg-[#0A0A0B] py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 pointer-events-none bg-[radial-gradient(ellipse,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            <SectionLabel>Projects</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-[#F2F0EB] font-light mt-2">
              Work I&apos;m
              <span className="block font-semibold bg-linear-to-r from-skill-gold via-[#F0C060] to-skill-gold bg-clip-text text-transparent">
                proud of.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <StatItem value={`${projects.length}+`} label="Projects Built" />
            <div className="w-px h-10 bg-[#2A2A2E]" />
            <StatItem value="3" label="AI-Powered Apps" />
            <div className="w-px h-10 bg-[#2A2A2E]" />
            <StatItem value="100%" label="Live on Web" />
          </div>
        </motion.div>

        {/* ── FILTER BAR ── */}
        <motion.div
          ref={filterRef}
          variants={fadeUp}
          initial="hidden"
          animate={filterInView ? "show" : "hidden"}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer",
                  isActive
                    ? "bg-skill-gold border-skill-gold text-[#0A0A0B] shadow-lg shadow-skill-gold/20"
                    : "bg-[#111113] border-[#2A2A2E] text-[#8A8880] hover:text-[#F2F0EB] hover:border-[#3A3A3E]"
                )}
              >
                {filter}
                {filter !== "All" && (
                  <span
                    className={cn(
                      "ml-2 text-[10px] font-mono",
                      isActive ? "text-[#0A0A0B]/70" : "text-[#3A3A3E]"
                    )}
                  >
                    {countFor(filter)}
                  </span>
                )}
              </motion.button>
            );
          })}

          <div className="ml-auto flex items-center">
            <span className="text-[#8A8880] text-xs font-mono">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        {/* ── GRID ── */}
        <motion.div
          ref={gridRef}
          variants={staggerGrid}
          initial="hidden"
          animate={gridInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="font-display text-2xl text-[#2A2A2E]">No projects found.</p>
              <p className="text-[#8A8880] text-sm mt-2">Try a different filter.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SHOW MORE / LESS ── */}
        {filtered.length > VISIBLE_COUNT && (
          <div className="flex justify-center mt-12">
            <motion.button
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{
                borderColor: "rgba(201,168,76,0.5)",
                color: "#C9A84C",
                backgroundColor: "#1A1A1E",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 px-8 py-3.5 border border-[#2A2A2E] bg-[#111113] text-[#8A8880] font-medium rounded-xl cursor-pointer"
            >
              {showAll
                ? "Show Less"
                : `Show ${filtered.length - VISIBLE_COUNT} More Projects`}
              <motion.div
                animate={{ rotate: showAll ? -90 : 90 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={16} />
              </motion.div>
            </motion.button>
          </div>
        )}

        {/* ── GITHUB CTA ── */}
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
          className="mt-16 rounded-2xl border border-[#2A2A2E] bg-[#111113] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center shrink-0">
              <Github size={22} className="text-[#8A8880]" />
            </div>
            <div>
              <h4 className="text-[#F2F0EB] font-semibold">Want to see more?</h4>
              <p className="text-[#8A8880] text-sm mt-0.5">
                Browse all my repositories and contributions on GitHub.
              </p>
            </div>
          </div>

          <motion.a
            href="https://github.com/ghost-sys-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#1A1A1E] border border-[#2A2A2E] text-[#F2F0EB] font-medium rounded-xl"
            whileHover={{
              backgroundColor: "#C9A84C",
              borderColor: "#C9A84C",
              color: "#0A0A0B",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <Github size={16} />
            @ghost-sys-coder
            <ChevronRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}