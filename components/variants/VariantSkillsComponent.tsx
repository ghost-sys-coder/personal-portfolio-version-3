"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, Variants, LayoutGroup } from "framer-motion";
import { Monitor, Server, Smartphone, Cloud, Database, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type CategoryId = "frontend" | "mobile" | "backend" | "database" | "devops" | "tools";
type ProficiencyLevel = "expert" | "advanced" | "proficient";

interface Skill {
  name: string;
  level: ProficiencyLevel;
}

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  colorVar: string;
  description: string;
  skills: Skill[];
}

interface SectionLabelProps { children: React.ReactNode }
interface StatItemProps     { value: string; label: string }
interface CategoryTabProps  {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  index: number;
  inView: boolean;
}
interface SkillTagProps {
  skill: Skill;
  colorVar: string;
  index: number;
}

// ── PROFICIENCY CONFIG ────────────────────────────────────────────────────────

const PROFICIENCY: Record<ProficiencyLevel, { label: string; colorVar: string; sizeClass: string }> = {
  expert:     { label: "Expert",     colorVar: "--color-skill-gold",   sizeClass: "text-sm  px-4 py-2   font-semibold" },
  advanced:   { label: "Advanced",   colorVar: "--color-skill-green",  sizeClass: "text-xs  px-3.5 py-1.5 font-medium"  },
  proficient: { label: "Proficient", colorVar: "--color-skill-sky",    sizeClass: "text-[11px] px-3 py-1   font-normal"  },
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Monitor,
    colorVar: "--color-skill-cyan",
    description: "Crafting fast, accessible, and visually refined web interfaces.",
    skills: [
      { name: "React.js",        level: "expert"     },
      { name: "Next.js",         level: "expert"     },
      { name: "TypeScript",      level: "advanced"   },
      { name: "Tailwind CSS",    level: "expert"     },
      { name: "Framer Motion",   level: "advanced"   },
      { name: "Redux / Zustand", level: "advanced"   },
      { name: "CSS / SCSS",      level: "expert"     },
      { name: "HTML5",           level: "expert"     },
      { name: "Webpack / Vite",  level: "proficient" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    colorVar: "--color-skill-gold",
    description: "Shipping polished cross-platform apps on iOS and Android.",
    skills: [
      { name: "React Native",         level: "expert"     },
      { name: "Expo",                 level: "expert"     },
      { name: "iOS (App Store)",      level: "advanced"   },
      { name: "Android (Play Store)", level: "advanced"   },
      { name: "Push Notifications",   level: "advanced"   },
      { name: "Native Modules",       level: "proficient" },
      { name: "Deep Linking",         level: "advanced"   },
      { name: "Offline Storage",      level: "advanced"   },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    colorVar: "--color-skill-green",
    description: "Designing reliable APIs and server-side systems at scale.",
    skills: [
      { name: "Node.js",    level: "expert"     },
      { name: "Express.js", level: "expert"     },
      { name: "REST APIs",  level: "expert"     },
      { name: "GraphQL",    level: "advanced"   },
      { name: "Python",     level: "proficient" },
      { name: "WebSockets", level: "advanced"   },
      { name: "tRPC",       level: "advanced"   },
      { name: "JWT / Auth", level: "expert"     },
    ],
  },
  {
    id: "database",
    label: "Databases",
    icon: Database,
    colorVar: "--color-skill-orange",
    description: "Modelling data and optimising queries across SQL and NoSQL.",
    skills: [
      { name: "PostgreSQL", level: "advanced"   },
      { name: "MongoDB",    level: "advanced"   },
      { name: "MySQL",      level: "advanced"   },
      { name: "Redis",      level: "proficient" },
      { name: "Prisma ORM", level: "advanced"   },
      { name: "Supabase",   level: "advanced"   },
      { name: "Drizzle",    level: "proficient" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: Cloud,
    colorVar: "--color-skill-sky",
    description: "Deploying, scaling and maintaining production infrastructure.",
    skills: [
      { name: "Docker",          level: "advanced"   },
      { name: "AWS (EC2, S3)",   level: "proficient" },
      { name: "Vercel / Netlify",level: "expert"     },
      { name: "CI/CD Pipelines", level: "advanced"   },
      { name: "Linux / SSH",     level: "advanced"   },
      { name: "Nginx",           level: "proficient" },
      { name: "GitHub Actions",  level: "advanced"   },
    ],
  },
  {
    id: "tools",
    label: "Tools & Testing",
    icon: GitBranch,
    colorVar: "--color-skill-purple",
    description: "Keeping code quality high and collaboration smooth.",
    skills: [
      { name: "Git & GitHub", level: "expert"     },
      { name: "Jest / Vitest",level: "advanced"   },
      { name: "Figma",        level: "advanced"   },
      { name: "Postman",      level: "expert"     },
      { name: "Storybook",    level: "proficient" },
      { name: "Turborepo",    level: "proficient" },
      { name: "ESLint / Prettier", level: "expert" },
    ],
  },
];

const STATS: StatItemProps[] = [
  { value: "12+", label: "Web Technologies" },
  { value: "2",   label: "Mobile Platforms" },
  { value: "5+",  label: "Years Practicing" },
];

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const cloudContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  exit:   { transition: { staggerChildren: 0.02 } },
};

const tagVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8,  y: 8  },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
  exit:   { opacity: 0, scale: 0.85, y: -6, transition: { duration: 0.18 } },
};

const panelFade: Variants = {
  hidden: { opacity: 0, y: 8  },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

const staggerStats: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.45 } },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function cssVar(prop: string): string {
  return `var(${prop})`;
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

function StatItem({ value, label }: StatItemProps) {
  return (
    <motion.div
      variants={statItem}
      className="rounded-xl bg-[#111113] border border-[#2A2A2E] px-5 py-4 text-center hover:border-[#C9A84C]/30 transition-colors duration-300"
    >
      <div className="font-display text-2xl font-semibold bg-linear-to-br from-[#C9A84C] to-[#F0C060] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[#8A8880] text-xs mt-1">{label}</div>
    </motion.div>
  );
}

// ── SKILL TAG ─────────────────────────────────────────────────────────────────

function SkillTag({ skill, colorVar }: SkillTagProps) {
  const proficiency = PROFICIENCY[skill.level];
  const tagColor    = cssVar(proficiency.colorVar);
  const catColor    = cssVar(colorVar);

  return (
    <motion.span
      variants={tagVariant}
      layout
      whileHover={{ y: -3, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border cursor-default select-none",
        "transition-shadow duration-200",
        proficiency.sizeClass,
      )}
      style={{
        color:           catColor,
        backgroundColor: `color-mix(in srgb, ${catColor} 7%, transparent)`,
        borderColor:     `color-mix(in srgb, ${catColor} 18%, transparent)`,
      }}
      title={`${proficiency.label}`}
    >
      {skill.name}
      {/* Proficiency dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 opacity-70"
        style={{ backgroundColor: tagColor }}
      />
    </motion.span>
  );
}

// ── CATEGORY TAB ──────────────────────────────────────────────────────────────

function CategoryTab({ category, isActive, onClick, index, inView }: CategoryTabProps) {
  const Icon  = category.icon;
  const color = cssVar(category.colorVar);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative w-full text-left p-4 rounded-xl border overflow-hidden",
        "transition-colors duration-300 cursor-pointer",
        isActive
          ? "border-[#C9A84C]/40 bg-[#1A1A1E]"
          : "border-[#2A2A2E] bg-[#111113] hover:bg-[#161616]"
      )}
    >
      {/* Active left accent bar — springs between tabs */}
      {isActive && (
        <motion.div
          layoutId="categoryAccent"
          className="absolute left-0 top-3 bottom-3 w-0.75 rounded-full"
          style={{ backgroundColor: color }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}

      {/* Active background glow */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, color-mix(in srgb, ${color} 6%, transparent) 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="flex items-center gap-3 pl-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300"
          style={
            isActive
              ? {
                  backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                  borderColor:     `color-mix(in srgb, ${color} 28%, transparent)`,
                }
              : { backgroundColor: "#1A1A1E", borderColor: "#2A2A2E" }
          }
        >
          <Icon size={14} style={{ color: isActive ? color : "#8A8880" }} />
        </div>

        <div className="min-w-0">
          <p
            className="text-sm font-medium leading-tight transition-colors duration-200 truncate"
            style={{ color: isActive ? "#F2F0EB" : "#8A8880" }}
          >
            {category.label}
          </p>
          <p className="text-[10px] text-[#3A3A3E] font-mono mt-0.5">
            {category.skills.length} skills
          </p>
        </div>
      </div>
    </motion.button>
  );
}

// ── LEGEND ────────────────────────────────────────────────────────────────────

function ProficiencyLegend() {
  return (
    <div className="hidden sm:flex items-center gap-5">
      {(Object.entries(PROFICIENCY) as [ProficiencyLevel, (typeof PROFICIENCY)[ProficiencyLevel]][]).map(
        ([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: cssVar(cfg.colorVar) }}
            />
            <span className="text-[#8A8880] text-xs">{cfg.label}</span>
          </div>
        )
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function VariantSkillsComponent() {
  const [activeId, setActiveId] = useState<CategoryId>("frontend");

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const listInView   = useInView(listRef,   { once: true, margin: "-60px" });
  const detailInView = useInView(detailRef, { once: true, margin: "-60px" });

  const active      = CATEGORIES.find((c) => c.id === activeId)!;
  const activeColor = cssVar(active.colorVar);

  return (
    <section
      id="skills"
      className="relative bg-[#0D0D0F] py-32 overflow-hidden"
    >
      {/* SVG noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Left ambient glow */}
      <div className="absolute top-1/2 -left-60 -translate-y-1/2 w-125 h-125 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-[#F2F0EB] font-light mt-2">
              Tools of the
              <span className="block font-semibold bg-linear-to-r from-[#C9A84C] via-[#F0C060] to-[#C9A84C] bg-clip-text text-transparent">
                trade.
              </span>
            </h2>
          </div>
          <p className="text-[#8A8880] text-base leading-relaxed max-w-sm lg:text-right">
            A curated set of technologies I use to build fast, reliable, and
            scalable products — web and mobile.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] gap-6">

          {/* ── LEFT — Category tabs ── */}
          <LayoutGroup>
            <div
              ref={listRef}
              className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0"
            >
              {CATEGORIES.map((cat, i) => (
                <div key={cat.id} className="shrink-0 lg:shrink w-44 lg:w-full">
                  <CategoryTab
                    category={cat}
                    isActive={activeId === cat.id}
                    onClick={() => setActiveId(cat.id)}
                    index={i}
                    inView={listInView}
                  />
                </div>
              ))}
            </div>
          </LayoutGroup>

          {/* ── RIGHT — Tag cloud panel ── */}
          <motion.div
            ref={detailRef}
            variants={fadeUp}
            initial="hidden"
            animate={detailInView ? "show" : "hidden"}
            transition={{ delay: 0.25 }}
          >
            <div className="relative rounded-2xl border border-[#2A2A2E] bg-[#111113] overflow-hidden">

              {/* Dynamic top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                animate={{
                  background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${activeColor} 55%, transparent), transparent)`,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Panel header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#2A2A2E]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-header"}
                    variants={panelFade}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${activeColor} 8%, transparent)`,
                        borderColor:     `color-mix(in srgb, ${activeColor} 22%, transparent)`,
                      }}
                    >
                      <active.icon size={18} style={{ color: activeColor }} />
                    </div>
                    <div>
                      <h3 className="text-[#F2F0EB] font-semibold text-base">{active.label}</h3>
                      <p className="text-[#8A8880] text-xs font-mono mt-0.5">{active.description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <ProficiencyLegend />
              </div>

              {/* ── MASONRY TAG CLOUD ── */}
              <div className="p-7 min-h-55">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-cloud"}
                    variants={cloudContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex flex-wrap gap-3 items-start content-start"
                  >
                    {/* Sort: expert first → advanced → proficient for visual weight */}
                    {[...active.skills]
                      .sort((a, b) => {
                        const order: Record<ProficiencyLevel, number> = {
                          expert: 0, advanced: 1, proficient: 2,
                        };
                        return order[a.level] - order[b.level];
                      })
                      .map((skill, i) => (
                        <SkillTag
                          key={skill.name}
                          skill={skill}
                          colorVar={active.colorVar}
                          index={i}
                        />
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Panel footer — dot nav */}
              <div className="px-7 py-4 border-t border-[#2A2A2E] flex items-center justify-between">
                <span className="font-mono text-[#2A2A2E] text-[10px] tracking-widest uppercase">
                  Tamale Frank · Stack
                </span>
                <div className="flex gap-1.5 items-center">
                  {CATEGORIES.map((c) => {
                    const isActive = c.id === activeId;
                    return (
                      <motion.button
                        key={c.id}
                        onClick={() => setActiveId(c.id)}
                        animate={{
                          width:           isActive ? 20 : 6,
                          backgroundColor: isActive ? activeColor : "#2A2A2E",
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full cursor-pointer"
                        aria-label={`Switch to ${c.label}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── STAT ROW ── */}
            <motion.div
              variants={staggerStats}
              initial="hidden"
              animate={detailInView ? "show" : "hidden"}
              className="grid grid-cols-3 gap-4 mt-4"
            >
              {STATS.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}