import { Clock, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    name: "Veilcode Digital Solutions Agency - Rebranded",
    description:
      "A full-featured digital agency website showcasing services, portfolio, and client-facing pages — built with Next.js for performance and SEO.",
    imageUrl: "/projects/veilcode-studio-live.png",
    githubUrl: "https://github.com/ghost-sys-coder/new-agency-website-veilcode",
    projectUrl: "https://veilcode.studio",
    tags: ["Next.js", "Web App", "Featured"],
    featured: true,
  },
  {
    id: 2,
    name: "ReachFlow - AI-Powered Lead Tracking CRM",
    description:"A modern, AI-powered lead tracking CRM for businesses — built with Next.js, PostgreSQL, and AI integration for intelligent lead management.",
    imageUrl: "/projects/crm-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/reachflow-crm-leading-tracking-software",
    projectUrl: "https://crm.veilcode.studio",
    tags: ["Next.js", "AI-Powered", "PostgreSQL", "Featured"],
    featured: true,
  },
  {
    id: 3,
    name: "Veilcode Digital Solutions Agency",
    description:
      "A full-featured digital agency website showcasing services, portfolio, and client-facing pages — built with Next.js for performance and SEO.",
    imageUrl: "/projects/veilcode-agency-hero.png",
    githubUrl: "https://github.com/ghost-sys-coder/veilcode-business-agency",
    projectUrl: "https://veilcodestudio.vercel.app/",
    tags: ["Next.js", "Web App", "Featured"],
    featured: true,
  },
  {
    id: 4,
    name: "Resume AI Analyzer",
    description:
      "Enterprise-grade ATS powered by AI — analyses CVs, scores candidates, and surfaces insights for recruiters using Next.js and MongoDB.",
    imageUrl: "/projects/ai-resume-analyzer-hero.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/React-with-NextJS-Enterprise-ready-applicant-tracking-system",
    projectUrl: "https://cvscan-seven.vercel.app/",
    tags: ["Next.js", "AI-Powered", "MongoDB", "Featured"],
    featured: true,
  },
  {
    id: 5,  
    name: "Chat-2-My-PDF",
    description:
      "AI SaaS app that lets users upload PDFs and have intelligent conversations with their documents — built with Next.js and LLM integration.",
    imageUrl: "/projects/chat-2-pdf.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/chat-2-my-pdf-ai-saas-project",
    projectUrl: "https://chat2mypdf.vercel.app/",
    tags: ["Next.js", "AI-Powered", "Featured"],
    featured: true,
  },
  {
    id: 6,
    name: "RealtyProp Real Estate Dashboard",
    description:
      "Full-featured admin dashboard for a real estate platform — property listings, analytics, and tenant management built with React.",
    imageUrl: "/projects/realestate-admin-hero.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/realestate-dreamhomes-admin-dashboard",
    projectUrl: "https://admindreamhomes.vercel.app/",
    tags: ["React.js", "Dashboard", "Web App", "Featured"],
    credentials: { email: "franktamalejr@gmail.com", password: "M@rgret55" },
    featured: true,
  },
   {
    id: 7,
    name: "Inspire Me Salon Website",
    description:
      "Business website for a premium salon brand — services, gallery, booking info, and brand storytelling with a polished UI.",
    imageUrl: "/projects/salon-website-template.png",
    githubUrl: "https://github.com/ghost-sys-coder/salon-website-template",
    projectUrl: "https://salon-website-template-five.vercel.app/",
      tags: ["React.js", "Next.js", "Business", "Featured"],
    featured: true
  },
  {
    id: 8,
    name: "BrightSmile Dental Clinic Website",
    description:
      "A clean, modern, responsive and accessible dental clinic website for Brightsmile Dental Clinic — built with Next.js and React for optimal performance and SEO.",
    imageUrl: "/projects/brightsmile-dental.png",
    githubUrl: "https://github.com/ghost-sys-coder/dental-clinic-website.git",
    projectUrl: "https://dental.veilcode.studio",
    tags: ["Next.js", "React.js"],
  },
   {
    id: 9,
    name: "Ecommerce Store with Sanity",
    description:
      "Headless ecommerce storefront powered by Sanity CMS — product pages, cart, checkout flow, and real-time content updates.",
    imageUrl: "/projects/vanox-ecommerce-hero.png",
    githubUrl: "https://github.com/ghost-sys-coder/ecommerce_next_sanity_store",
    projectUrl: "https://ecommerce-next-sanity-store.vercel.app/",
    tags: ["React.js", "Next.js", "Sanity CMS"],
  },
  {
    id: 10,
    name: "Brainwave Landing Page",
    description:
      "Sleek, animated AI SaaS landing page inspired by modern design trends — responsive, fast, and visually striking.",
    imageUrl: "/projects/brainwave-hero.png",
    githubUrl: "https://github.com/ghost-sys-coder/mern-brainwave-landing-page",
    projectUrl: "https://brainwave-kappa.vercel.app/",
    tags: ["React.js", "Landing Page"],
  },
  {
    id: 11,
    name: "Clickfolio",
    description:
      "A responsive, modern, and accessible web application that connects your affiliate links, campaign tracking, and content generation in one place — built with React.js and Next.js for performance and SEO.",
    imageUrl: "/projects/clickfolio-project.png",
    githubUrl:"https://github.com/ghost-sys-coder/click-folio-affiliate-project-saas.git",
    projectUrl: "https://dreamhomesug.onrender.com/",
    tags: ["JavaScript", "Fullstack"],
  },
  {
    id: 12,
    name: "Bienvenidos Apartment",
    description:
      "Property listing website for a residential apartment complex — showcasing units, amenities, and contact information.",
    imageUrl: "/projects/bienvenidos-hero.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/apartment-website/tree/main/Rinah_Website",
    projectUrl: "https://myapartmentwebsite.netlify.app/",
    tags: ["React.js", "Real Estate"],
  },
  {
    id: 13,
    name: "Prestige Properties",
    description: "A real estate listing website for Prestige Properties — featuring property listings, search functionality, and contact forms.",
    imageUrl: "/projects/prestige-properties.png",
    githubUrl: "https://github.com/ghost-sys-coder/real-estate-website-template.git",
    projectUrl: "https://prestige-template.vercel.app/",
    tags: ["React.js", "Real Estate"],
  },
  {
    id: 14,
    name: "VC Studio",
    description: "VCStudio is an AI assisted content creation and publishing platform that helps creators plan, generate, manage, and publish video content across multiple social platforms from one workspace.",
    imageUrl: "/projects/vcstudio-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/vcstudio-video-content-project.git",
    projectUrl: "https://vcstudio.veilcode.studio/",
    tags: ["React.js", "Next.js", "AI-Powered"],
  }
];

export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'franktamalejr@gmail.com',
    href: 'mailto:franktamalejr@gmail.com',
    color: 'amber-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kampala, Uganda — Remote Globally',
    href: null,
    color: 'emerald-400',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Open to new projects',
    href: null,
    color: 'cyan-400',
  },
]

export const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ghost-sys-coder',
    handle: '@ghost-sys-coder',
    color: 'zinc-100',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tamalefrank',
    handle: 'Tamale Frank',
    color: 'blue-600',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: 'https://x.com/veilcodestudio',
    handle: '@tamalefrank',
    color: 'sky-500',
  },
]

export const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'E-commerce',
  'Dashboard / Admin',
  'AI Integration',
  'Other',
] as const;

export const BUDGETS = [
  '< $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  "Let's discuss",
] as const;
