import { Clock, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    name: "Veilcode Digital Solutions Agency",
    description:
      "A full-featured digital agency website showcasing services, portfolio, and client-facing pages — built with Next.js for performance and SEO.",
    imageUrl: "/projects/veilcode-agency.png",
    githubUrl: "https://github.com/ghost-sys-coder/veilcode-business-agency",
    projectUrl: "https://veilcodestudio.vercel.app/",
    tags: ["Next.js", "Web App"],
    featured: true,
  },
  {
    id: 2,
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
    id: 3,
    name: "Chat-2-My-PDF",
    description:
      "AI SaaS app that lets users upload PDFs and have intelligent conversations with their documents — built with Next.js and LLM integration.",
    imageUrl: "/projects/chat-2-pdf.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/chat-2-my-pdf-ai-saas-project",
    projectUrl: "https://chat2mypdf.vercel.app/",
    tags: ["Next.js", "AI-Powered"],
    featured: true,
  },
  {
    id: 4,
    name: "RealtyProp Real Estate Dashboard",
    description:
      "Full-featured admin dashboard for a real estate platform — property listings, analytics, and tenant management built with React.",
    imageUrl: "/projects/realestate-admin.png",
    githubUrl:
      "https://github.com/ghost-sys-coder/realestate-dreamhomes-admin-dashboard",
    projectUrl: "https://admindreamhomes.vercel.app/",
    tags: ["React.js", "Dashboard", "Web App"],
    credentials: { email: "franktamalejr@gmail.com", password: "M@rgret55" },
    featured: true,
  },
  {
    id: 5,
    name: "Ecommerce Store with Sanity",
    description:
      "Headless ecommerce storefront powered by Sanity CMS — product pages, cart, checkout flow, and real-time content updates.",
    imageUrl: "/projects/sanity-ecommerce-store.png",
    githubUrl: "https://github.com/ghost-sys-coder/ecommerce_next_sanity_store",
    projectUrl: "https://ecommerce-next-sanity-store.vercel.app/",
    tags: ["React.js", "Next.js", "Sanity CMS"],
  },
  {
    id: 6,
    name: "ShopLocker Ecommerce",
    description:
      "A clean, modern ecommerce experience built with Next.js — product browsing, cart management, and a seamless checkout experience.",
    imageUrl: "/projects/NextJS-Store-shoplocker.vercel.app.png",
    githubUrl: "https://github.com/ghost-sys-coder/my-ecommerce-shop",
    projectUrl: "https://shoplocker.vercel.app/",
    tags: ["Next.js", "React.js"],
  },
  {
    id: 7,
    name: "Inspire Me Salon Website",
    description:
      "Business website for a premium salon brand — services, gallery, booking info, and brand storytelling with a polished UI.",
    imageUrl: "/projects/salon-website-template.png",
    githubUrl: "https://github.com/ghost-sys-coder/salon-website-template",
    projectUrl: "https://salon-website-template-five.vercel.app/",
      tags: ["React.js", "Next.js", "Business"],
    featured: true
  },
  {
    id: 8,
    name: "Brainwave Landing Page",
    description:
      "Sleek, animated AI SaaS landing page inspired by modern design trends — responsive, fast, and visually striking.",
    imageUrl: "/projects/brainwave-landing-page-project.png",
    githubUrl: "https://github.com/ghost-sys-coder/mern-brainwave-landing-page",
    projectUrl: "https://brainwave-kappa.vercel.app/",
    tags: ["React.js", "Landing Page"],
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
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
    href: 'https://twitter.com/tamalefrank',
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
