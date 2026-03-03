"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

// ── TYPES ─────────────────────────────────────────────────────────────────────

type AvatarSize = "sm" | "md" | "lg";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  avatarColorVar: string; // references a CSS custom property
  rating: number;
  text: string;
  project: string;
  linkedin: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface StarRatingProps {
  count?: number;
}

interface AvatarProps {
  initials: string;
  colorVar: string;
  size?: AvatarSize;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  direction: number; // -1 = left, 1 = right
}

interface SidebarItemProps {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
}

interface RatingBarProps {
  star: number;
  count: number;
  pct: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    company: "BrightPath Ventures",
    location: "London, UK",
    avatar: "SM",
    avatarColorVar: "--color-avatar-1",
    rating: 5,
    text: "Tamale completely transformed our digital presence. He delivered a Next.js platform that not only looks stunning but performs exceptionally — our bounce rate dropped by 35% within the first month. His communication throughout the project was impeccable.",
    project: "Company Website Redesign",
    linkedin: "#",
  },
  {
    id: 2,
    name: "David Okonkwo",
    role: "Product Manager",
    company: "FinEdge Africa",
    location: "Lagos, Nigeria",
    avatar: "DO",
    avatarColorVar: "--color-avatar-2",
    rating: 5,
    text: "We hired Tamale to build our cross-platform mobile app, and I can honestly say it was the best technical decision we made. The app shipped on both iOS and Android on time, with zero critical bugs at launch. He's the real deal.",
    project: "FinEdge Mobile App",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Amelia Thornton",
    role: "Operations Director",
    company: "RealtyProp Ltd",
    location: "Toronto, Canada",
    avatar: "AT",
    avatarColorVar: "--color-avatar-3",
    rating: 5,
    text: "The admin dashboard Tamale built for us handles thousands of property listings without breaking a sweat. His database design is solid, the UI is clean and intuitive, and he went above and beyond to implement features we hadn't even asked for.",
    project: "Real Estate Admin Dashboard",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Marcus Fernandez",
    role: "CTO",
    company: "SwiftCart Technologies",
    location: "Madrid, Spain",
    avatar: "MF",
    avatarColorVar: "--color-avatar-4",
    rating: 5,
    text: "Tamale architected our entire ecommerce backend and React frontend in under 8 weeks. The code quality is excellent — well-structured, thoroughly tested, and easy for our internal team to maintain. Highly recommend for any serious build.",
    project: "Ecommerce Platform",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Head of Product",
    company: "DocuSmart AI",
    location: "Bangalore, India",
    avatar: "PN",
    avatarColorVar: "--color-avatar-5",
    rating: 5,
    text: "Tamale built our AI-powered document analysis tool from scratch. His understanding of both the frontend UX and the backend AI integrations is impressive. The product launched ahead of schedule and users love it.",
    project: "AI Document Platform",
    linkedin: "#",
  },
  {
    id: 6,
    name: "James Kowalski",
    role: "Creative Director",
    company: "Nova Studio Agency",
    location: "Warsaw, Poland",
    avatar: "JK",
    avatarColorVar: "--color-avatar-6",
    rating: 5,
    text: "I've worked with many developers over the years, but Tamale stands out for his attention to design detail. He doesn't just implement what you ask for — he improves it. Every pixel, every animation, every interaction feels intentional.",
    project: "Agency Website",
    linkedin: "#",
  },
];

const AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// Direction-aware slide variants — built dynamically per slide
function makeSlideVariants(direction: number): Variants {
  return {
    enter:  { x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 },
    center: { x: 0, opacity: 1, scale: 1,  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    exit:   { x: direction > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96,
              transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  };
}

const sidebarItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  show:   { opacity: 1,  x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggerSidebar: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Resolve a CSS custom property name to its var() call */
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

function StarRating({ count = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-skill-gold fill-skill-gold" />
      ))}
    </div>
  );
}

function Avatar({ initials, colorVar, size = "md" }: AvatarProps) {
  const color = cssVar(colorVar);
  return (
    <div
      className={cn(
        AVATAR_SIZES[size],
        "rounded-full flex items-center justify-center font-semibold font-mono shrink-0 border-2"
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderColor:      `color-mix(in srgb, ${color} 20%, transparent)`,
        color,
      }}
    >
      {initials}
    </div>
  );
}

function RatingBar({ star, count, pct }: RatingBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#8A8880] text-xs font-mono w-3">{star}</span>
      <Star size={10} className="text-skill-gold fill-skill-gold" />
      <div className="w-24 h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-skill-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        />
      </div>
      <span className="text-[#8A8880] text-[10px] font-mono">{count}</span>
    </div>
  );
}

// ── TESTIMONIAL CARD ──────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, direction }: TestimonialCardProps) {
  const variants = makeSlideVariants(direction);
  const glowColor = cssVar(testimonial.avatarColorVar);

  return (
    <motion.div
      key={testimonial.id}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 flex flex-col"
    >
      <div className="relative h-full flex flex-col rounded-2xl border border-[#2A2A2E] bg-[#111113] p-8 lg:p-10 overflow-hidden">

        {/* Top gold accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-skill-gold/50 to-transparent" />

        {/* Per-reviewer ambient glow — uses color-mix so no raw hex needed */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, ${glowColor} 4%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* Quote icon */}
        <div className="w-12 h-12 rounded-xl bg-skill-gold/10 border border-skill-gold/20 flex items-center justify-center mb-6 shrink-0">
          <Quote size={20} className="text-skill-gold" />
        </div>

        <StarRating count={testimonial.rating} />

        <blockquote className="font-display text-xl lg:text-2xl text-[#F2F0EB] leading-snug italic font-light mt-5 flex-1">
          {testimonial.text}
        </blockquote>

        {/* Project label */}
        <div className="mt-6 mb-6">
          <span className="text-[10px] font-mono text-[#8A8880] uppercase tracking-widest">
            Project
          </span>
          <p className="text-skill-gold text-sm font-medium mt-0.5">
            {testimonial.project}
          </p>
        </div>

        <div className="h-px bg-[#2A2A2E] mb-6" />

        {/* Author row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              initials={testimonial.avatar}
              colorVar={testimonial.avatarColorVar}
              size="md"
            />
            <div>
              <p className="text-[#F2F0EB] font-semibold text-sm">{testimonial.name}</p>
              <p className="text-[#8A8880] text-xs mt-0.5">
                {testimonial.role} · {testimonial.company}
              </p>
              <p className="text-[#3A3A3E] text-[10px] font-mono mt-0.5">
                {testimonial.location}
              </p>
            </div>
          </div>

          <motion.a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#8A8880]"
            whileHover={{ color: "#0A66C2", borderColor: "rgba(10,102,194,0.4)", scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <Linkedin size={14} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ── SIDEBAR ITEM ──────────────────────────────────────────────────────────────

function SidebarItem({ testimonial, isActive, onClick }: SidebarItemProps) {
  return (
    <motion.button
      variants={sidebarItem}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border",
        "transition-colors duration-300 text-left w-full cursor-pointer",
        isActive
          ? "border-skill-gold/40 bg-[#1A1A1E]"
          : "border-[#2A2A2E] bg-[#111113] hover:border-[#3A3A3E] hover:bg-[#161616]"
      )}
    >
      {/* Active indicator bar */}
      <motion.div
        animate={{ backgroundColor: isActive ? "#C9A84C" : "#2A2A2E" }}
        transition={{ duration: 0.3 }}
        className="w-0.5 h-8 rounded-full shrink-0"
      />

      <Avatar
        initials={testimonial.avatar}
        colorVar={testimonial.avatarColorVar}
        size="sm"
      />

      <div className="min-w-0">
        <p className={cn(
          "text-sm font-medium truncate transition-colors duration-200",
          isActive ? "text-[#F2F0EB]" : "text-[#8A8880]"
        )}>
          {testimonial.name}
        </p>
        <p className="text-[#3A3A3E] text-xs truncate font-mono">
          {testimonial.company}
        </p>
      </div>

      {isActive && (
        <motion.div
          layoutId="sidebarActiveDot"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Testimonials() {
  const [current, setCurrent]   = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const sliderInView = useInView(sliderRef, { once: true, margin: "-60px" });

  const total = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + total) % total);
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 6000);
    },
    [total]
  );

  const jumpTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setAutoPlay(false);
    },
    [current]
  );

  // Autoplay ticker
  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, total]);

  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / total
  ).toFixed(1);

  return (
    <section
      id="testimonials"
      className="relative bg-[#0A0A0B] py-32 overflow-hidden"
    >
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[repeating-linear-gradient(45deg,#C9A84C_0px,#C9A84C_1px,transparent_1px,transparent_60px)]" />

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-225 h-100 pointer-events-none bg-[radial-gradient(ellipse,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

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
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-[#F2F0EB] font-light mt-2">
              What clients
              <span className="block font-semibold bg-linear-to-r from-skill-gold via-[#F0C060] to-skill-gold bg-clip-text text-transparent">
                are saying.
              </span>
            </h2>
          </div>

          {/* Rating summary panel */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-display text-4xl font-semibold bg-linear-to-br from-skill-gold to-[#F0C060] bg-clip-text text-transparent">
                {avgRating}
              </div>
              <StarRating />
              <div className="text-[#8A8880] text-xs mt-1 font-mono">{total} reviews</div>
            </div>

            <div className="w-px h-14 bg-[#2A2A2E]" />

            <div className="space-y-1.5">
              {[5, 4, 3].map((star) => {
                const count = testimonials.filter((t) => t.rating === star).length;
                const pct   = (count / total) * 100;
                return (
                  <RatingBar key={star} star={star} count={count} pct={pct} />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── SLIDER ── */}
        <motion.div
          ref={sliderRef}
          variants={fadeUp}
          initial="hidden"
          animate={sliderInView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* Main animated card */}
            <div className="relative" style={{ minHeight: 480 }}>
              <AnimatePresence mode="popLayout" custom={direction}>
                <TestimonialCard
                  key={testimonials[current].id}
                  testimonial={testimonials[current]}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Sidebar reviewer list */}
            <motion.div
              variants={staggerSidebar}
              initial="hidden"
              animate={sliderInView ? "show" : "hidden"}
              className="hidden lg:flex flex-col gap-3"
            >
              {testimonials.map((t, i) => (
                <SidebarItem
                  key={t.id}
                  testimonial={t}
                  isActive={i === current}
                  onClick={() => jumpTo(i)}
                />
              ))}
            </motion.div>
          </div>

          {/* ── CONTROLS ── */}
          <div className="flex items-center justify-between mt-8">

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => jumpTo(i)}
                  animate={{
                    width:           i === current ? 24 : 8,
                    backgroundColor: i === current ? "#C9A84C" : "#2A2A2E",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full cursor-pointer"
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter + prev/next */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[#8A8880] text-xs">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <motion.button
                onClick={() => go(-1)}
                whileHover={{ borderColor: "rgba(201,168,76,0.4)", color: "#F2F0EB" }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.15 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2A2A2E] text-[#8A8880] cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </motion.button>

              <motion.button
                onClick={() => go(1)}
                whileHover={{ borderColor: "rgba(201,168,76,0.4)", color: "#F2F0EB" }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.15 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2A2A2E] text-[#8A8880] cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}