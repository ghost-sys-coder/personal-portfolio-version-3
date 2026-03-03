"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Monitor, Server, Smartphone, Cloud, Database, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type CategoryId = "frontend" | "mobile" | "backend" | "database" | "devops" | "tools";

type ProficiencyLabel = "Expert" | "Advanced" | "Proficient";

interface Skill {
  name: string;
  level: number;
}

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  colorVar: string; // references a CSS custom property e.g. "--color-skill-cyan"
  skills: Skill[];
}

interface ProficiencyTag {
  label: ProficiencyLabel;
  min: number;
  colorVar: string;
}

interface SkillBarProps {
  name: string;
  level: number;
  colorVar: string;
  animate: boolean;
}

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  index: number;
  inView: boolean;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface StatItemProps {
  value: string;
  label: string;
}


const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Monitor,
    colorVar: "--color-skill-cyan",
    skills: [
      { name: "React.js",        level: 95 },
      { name: "Next.js",         level: 93 },
      { name: "TypeScript",      level: 88 },
      { name: "Tailwind CSS",    level: 92 },
      { name: "Framer Motion",   level: 80 },
      { name: "Redux / Zustand", level: 85 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    colorVar: "--color-skill-gold",
    skills: [
      { name: "React Native",        level: 92 },
      { name: "Expo",                level: 90 },
      { name: "iOS (App Store)",     level: 82 },
      { name: "Android (Play Store)",level: 82 },
      { name: "Push Notifications",  level: 85 },
      { name: "Native Modules",      level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    colorVar: "--color-skill-green",
    skills: [
      { name: "Node.js",    level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs",  level: 93 },
      { name: "GraphQL",    level: 78 },
      { name: "Python",     level: 72 },
      { name: "WebSockets", level: 80 },
    ],
  },
  {
    id: "database",
    label: "Databases",
    icon: Database,
    colorVar: "--color-skill-orange",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB",    level: 85 },
      { name: "MySQL",      level: 82 },
      { name: "Redis",      level: 75 },
      { name: "Prisma ORM", level: 87 },
      { name: "Supabase",   level: 83 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: Cloud,
    colorVar: "--color-skill-sky",
    skills: [
      { name: "Docker",          level: 80 },
      { name: "AWS (EC2, S3)",   level: 75 },
      { name: "Vercel / Netlify",level: 92 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "Linux / SSH",     level: 80 },
      { name: "Nginx",           level: 73 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Testing",
    icon: GitBranch,
    colorVar: "--color-skill-purple",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "Jest / Vitest",level: 80 },
      { name: "Figma",        level: 78 },
      { name: "Postman",      level: 90 },
      { name: "Storybook",    level: 74 },
      { name: "Turborepo",    level: 70 },
    ],
  },
];

const PROFICIENCY_TAGS: ProficiencyTag[] = [
  { label: "Expert",     min: 90, colorVar: "--color-skill-gold"   },
  { label: "Advanced",   min: 75, colorVar: "--color-skill-green"  },
  { label: "Proficient", min: 60, colorVar: "--color-skill-sky"    },
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

const panelFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: "easeOut" } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const barReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show:   { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 } },
};

const staggerGrid: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Resolve a CSS custom property string to its var() call for Tailwind's arbitrary value syntax */
function cssVar(prop: string): string {
  return `var(${prop})`;
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-skill-gold" />
      <span className="font-mono text-skill-gold text-xs tracking-[0.25em] uppercase">
        {children}
      </span>
    </div>
  );
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="rounded-xl bg-[#111113] border border-[#2A2A2E] px-5 py-4 text-center hover:border-[#C9A84C]/30 transition-colors duration-300">
      <div className="font-display text-2xl font-semibold bg-linear-to-br from-[#C9A84C] to-[#F0C060] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[#8A8880] text-xs mt-1">{label}</div>
    </div>
  );
}

// ── SKILL BAR ─────────────────────────────────────────────────────────────────

function SkillBar({ name, level, colorVar, animate }: SkillBarProps) {
  const tag = PROFICIENCY_TAGS.find((t) => level >= t.min) ?? PROFICIENCY_TAGS[2];
  const color = cssVar(colorVar);
  const tagColor = cssVar(tag.colorVar);

  return (
    <div className="group space-y-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-[#F2F0EB] text-sm font-medium group-hover:text-skill-gold transition-colors duration-200">
          {name}
        </span>
        <div className="flex items-center gap-2">
          {/* Proficiency badge — border/bg colours use CSS vars via arbitrary values */}
          <span
            className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded-full border",
              "border-[color-mix(in_srgb,var(--badge-color)_20%,transparent)]",
              "bg-[color-mix(in_srgb,var(--badge-color)_10%,transparent)]",
              "text-(--badge-color)"
            )}
            style={{ "--badge-color": tagColor } as React.CSSProperties}
          >
            {tag.label}
          </span>
          <span className="text-[#8A8880] text-xs font-mono">{level}%</span>
        </div>
      </div>

      {/* Progress track */}
      <div className="h-1.5 bg-[#1A1A1E] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full origin-left"
          variants={barReveal}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, color-mix(in srgb, ${color} 50%, transparent), ${color})`,
            boxShadow: animate ? `0 0 8px color-mix(in srgb, ${color} 25%, transparent)` : "none",
          }}
        />
      </div>
    </div>
  );
}

// ── CATEGORY CARD ─────────────────────────────────────────────────────────────

function CategoryCard({ category, isActive, onClick, index, inView }: CategoryCardProps) {
  const Icon = category.icon;
  const color = cssVar(category.colorVar);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full text-left p-5 rounded-2xl border overflow-hidden",
        "transition-colors duration-300 cursor-pointer",
        isActive
          ? "border-[#C9A84C]/50 bg-[#1A1A1E]"
          : "border-[#2A2A2E] bg-[#111113] hover:bg-[#161616]"
      )}
    >
      {/* Active radial glow — rendered as a pseudo-layer */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 50%, color-mix(in srgb, ${color} 8%, transparent) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Active left-border pill */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
          style={{ backgroundColor: color }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-3">
        {/* Icon tile */}
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300",
            isActive ? "bg-white/5" : "bg-[#1A1A1E] border-[#2A2A2E]"
          )}
          style={
            isActive
              ? {
                  backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
                }
              : undefined
          }
        >
          <Icon
            size={16}
            style={{ color: isActive ? color : "#8A8880" }}
          />
        </div>

        {/* Label */}
        <div>
          <p
            className="text-sm font-medium transition-colors duration-200"
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

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeId, setActiveId] = useState<CategoryId>("frontend");
  const [animateBar, setAnimateBar] = useState<boolean>(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const listInView   = useInView(listRef,   { once: true, margin: "-60px" });
  const detailInView = useInView(detailRef, { once: true, margin: "-60px" });

  const active = CATEGORIES.find((c) => c.id === activeId)!;
  const activeColor = cssVar(active.colorVar);

  const handleCategoryClick = (id: CategoryId): void => {
    if (id === activeId) return;
    setAnimateBar(false);
    setTimeout(() => {
      setActiveId(id);
      setAnimateBar(true);
    }, 150);
  };

  return (
    <section
      id="skills"
      className="relative bg-[#0D0D0F] py-32 overflow-hidden"
    >
      {/* SVG noise texture */}
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
              <span className="block font-semibold bg-linear-to-r from-skill-gold via-[#F0C060] to-skill-gold bg-clip-text text-transparent">
                trade.
              </span>
            </h2>
          </div>

          <p className="text-[#8A8880] text-base leading-relaxed max-w-sm lg:text-right">
            A curated set of technologies I use to build fast, reliable, and
            scalable products — web and mobile.
          </p>
        </motion.div>

        {/* ── MAIN LAYOUT ── */}
        <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6">

          {/* ── LEFT — Category list ── */}
          <div
            ref={listRef}
            className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {CATEGORIES.map((cat, i) => (
              <div key={cat.id} className="shrink-0 lg:shrink w-48 lg:w-full">
                <CategoryCard
                  category={cat}
                  isActive={activeId === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  index={i}
                  inView={listInView}
                />
              </div>
            ))}
          </div>

          {/* ── RIGHT — Detail panel ── */}
          <motion.div
            ref={detailRef}
            variants={fadeUp}
            initial="hidden"
            animate={detailInView ? "show" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="relative rounded-2xl border border-[#2A2A2E] bg-[#111113] overflow-hidden">

              {/* Dynamic top accent — colour follows active category */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                animate={{
                  background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${activeColor} 60%, transparent), transparent)`,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Panel header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#2A2A2E]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    variants={panelFade}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${activeColor} 8%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${activeColor} 20%, transparent)`,
                      }}
                    >
                      <active.icon size={18} style={{ color: activeColor }} />
                    </div>
                    <div>
                      <h3 className="text-[#F2F0EB] font-semibold text-lg">{active.label}</h3>
                      <p className="text-[#8A8880] text-xs font-mono">
                        {active.skills.length} technologies
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Proficiency legend */}
                <div className="hidden sm:flex items-center gap-4">
                  {PROFICIENCY_TAGS.map((tag) => (
                    <div key={tag.label} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cssVar(tag.colorVar) }}
                      />
                      <span className="text-[#8A8880] text-xs">{tag.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill bars grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  variants={staggerGrid}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="p-8 grid sm:grid-cols-2 gap-x-10 gap-y-6"
                >
                  {active.skills.map((skill) => (
                    <motion.div key={skill.name} variants={cardIn}>
                      <SkillBar
                        name={skill.name}
                        level={skill.level}
                        colorVar={active.colorVar}
                        animate={animateBar}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Panel footer — dot nav */}
              <div className="px-8 py-4 border-t border-[#2A2A2E] flex items-center justify-between">
                <span className="font-mono text-[#2A2A2E] text-[10px] tracking-widest uppercase">
                  Tamale Frank · Stack
                </span>
                <div className="flex gap-1.5 items-center">
                  {CATEGORIES.map((c) => {
                    const isActive = c.id === activeId;
                    return (
                      <motion.button
                        key={c.id}
                        onClick={() => handleCategoryClick(c.id)}
                        animate={{
                          width: isActive ? 20 : 6,
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

            {/* Stat row */}
            <motion.div
              variants={staggerGrid}
              initial="hidden"
              animate={detailInView ? "show" : "hidden"}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 mt-4"
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={cardIn}>
                  <StatItem {...stat} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}