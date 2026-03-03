"use client";

import { motion, Variants } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe,
  Zap,
  MapPin,
  Calendar,
  Coffee,
  Heart,
} from "lucide-react";

const CORE_VALUES = [
  {
    icon: Code2,
    title: "Clean Architecture",
    desc: "I write code that scales — modular, maintainable, and built to last.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Thinking",
    desc: "Every pixel considered for touch, performance, and real-world usage.",
  },
  {
    icon: Globe,
    title: "Web Craft",
    desc: "From REST APIs to SSR, I build the full picture end to end.",
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    desc: "Speed is a feature. I optimize for milliseconds and lighthouse scores.",
  },
];

const PERSONAL_FACTS = [
  { icon: MapPin, text: "Based in Africa, working globally" },
  { icon: Calendar, text: "5+ years in the industry" },
  { icon: Coffee, text: "Powered by coffee & curiosity" },
  { icon: Heart, text: "Open source contributor" },
];

const JOURNEY = [
  { year: "2019", title: "Started the Journey", detail: "Wrote my first React component and never looked back." },
  { year: "2020", title: "Went Full Stack", detail: "Mastered Node.js, databases, and REST API design." },
  { year: "2021", title: "Into Mobile", detail: "Picked up React Native — shipped cross-platform apps to production." },
  { year: "2023", title: "Freelance & Consulting", detail: "Started working with international clients on complex builds." },
  { year: "2025", title: "Now", detail: "Crafting premium digital products with modern stacks." },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-amber-500/70" />
      <span className="font-mono text-amber-500 text-xs tracking-[0.25em] uppercase font-medium">
        {children}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-[#0A0A0B] py-28 md:py-32 overflow-hidden">
      {/* Background texture (very subtle grid) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 47px, #C9A84C 47px, #C9A84C 48px),
              repeating-linear-gradient(90deg, transparent, transparent 47px, #C9A84C 47px, #C9A84C 48px)
            `,
          }}
        />
      </div>

      {/* Right side soft glow */}
      <div className="absolute top-1/3 -right-40 md:-right-60 w-100 md:w-125 h-100 md:h-125 rounded-full bg-gradient-radial from-amber-500/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-2xl mb-20"
        >
          <SectionLabel>About Me</SectionLabel>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#F2F0EB]">
            The person behind
            <span className="block font-semibold bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              the code.
            </span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 xl:gap-24 mb-24">
          {/* Left column – Bio + Facts */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-10"
          >
            {/* Quote */}
            <div className="relative pl-6 border-l-2 border-amber-500/30">
              <p className="text-2xl md:text-3xl text-[#F2F0EB] leading-snug italic font-light">
                I don&apos;t just write code — I engineer experiences that work beautifully on every screen, every device, every time.
              </p>
            </div>

            {/* Bio text */}
            <div className="space-y-5 text-[#A0A0A0] leading-relaxed text-base">
              <p>
                I&apos;m <strong className="text-white font-medium">Tamale Frank</strong>, a full-stack web developer and cross-platform mobile applications engineer with over 5 years of professional experience building digital products people love to use.
              </p>
              <p>
                My work spans the full stack — relational & NoSQL databases, REST/GraphQL APIs, pixel-perfect React frontends, and production React Native apps on iOS & Android.
              </p>
              <p>
                Outside of coding, I explore new technologies, contribute to open source, and enjoy mentoring developers early in their journey.
              </p>
            </div>

            {/* Facts chips */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {PERSONAL_FACTS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111113] border border-[#252529] hover:border-amber-500/40 transition-colors"
                >
                  <Icon size={16} className="text-amber-500 shrink-0" />
                  <span className="text-[#B0B0B0] text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column – Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            <SectionLabel>My Journey</SectionLabel>

            <div className="relative mt-6 pl-10">
              {/* Vertical line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-linear-to-b from-amber-500/50 via-amber-500/20 to-transparent" />

              <div className="space-y-10">
                {JOURNEY.map((item) => (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    className="relative group flex gap-6"
                  >
                    {/* Year dot */}
                    <div className="absolute -left-10 mt-1.5">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#252529] bg-[#0A0A0B] group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="font-mono text-amber-500/60 text-xs tracking-wider">
                        {item.year}
                      </span>
                      <h4 className="mt-1 text-white font-medium group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-[#A0A0A0] text-sm leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={staggerContainer}
        >
          <div className="mb-12">
            <SectionLabel>What I Stand For</SectionLabel>
            <h3 className="text-3xl md:text-4xl text-[#F2F0EB] font-light">
              Principles I code by.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="group relative p-6 rounded-2xl bg-[#111113] border border-[#252529] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
                    <Icon size={22} className="text-amber-500" />
                  </div>

                  <h4 className="text-white font-medium mb-2.5 text-base tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}