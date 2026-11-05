/**
 * Every word on the site lives here. Edit this file and each section updates —
 * no component changes needed.
 */

export const profile = {
  name: "Bohdan Andriichuk",
  firstName: "Bohdan",
  lastName: "Andriichuk",
  initials: "BA",
  title: "Senior AI & Full-Stack Developer",
  focus: ["AI Products", "Web", "Mobile", "Integrations"],
  /** cycled through in the hero with a decode/scramble effect */
  roles: [
    "Senior AI & Full-Stack Developer",
    "AI Product Developer",
    "React · Next.js · Three.js",
    "Node.js · Python · Laravel",
    "Flutter Mobile Developer",
  ],
  location: "Lutsk, Volyn, Ukraine",
  city: "Lutsk, Ukraine",
  timeZone: "Europe/Kyiv",
  tagline:
    "I build AI-enabled products, responsive web apps and mobile experiences — from pixel-precise interfaces to the APIs, payments and AI services behind them.",
  /** the large paragraph that lights up word by word as you scroll */
  intro:
    "I turn product ideas into AI-enabled software people actually use — responsive web apps, mobile experiences and end-to-end features that hold together from the first pixel to the last API call.",
  /** words in `intro` that get the gradient treatment */
  introHighlights: ["AI-enabled", "responsive", "mobile", "end-to-end"],
  summary: [
    "My toolkit spans React, Next.js and Three.js on the frontend, Node.js, Python and PHP/Laravel on the backend, and Flutter for mobile — plus WordPress, Zoho and Odoo when a business already runs on them.",
    "I have shipped AI chat and AI video-generation features, third-party API integrations and payment workflows inside real products — and I stay with those products after launch, through iterative improvements and ongoing maintenance.",
  ],
};

export const contact = {
  email: "andriichukbohdan34@gmail.com",
  emailAlt: "bohdan.andriichuk@outlook.com",
  whatsapp: "+1 540 443 6640",
  whatsappLink: "https://wa.me/15404436640",
  telegram: "@blueW09",
  telegramLink: "https://t.me/blueW09",
  linkedin: "in/andriichukboh",
  linkedinLink: "https://www.linkedin.com/in/andriichukboh/",
};

export const resume = {
  /** lives in /public, so the browser downloads it straight from the CDN */
  file: "/Bohdan-Andriichuk-Resume.pdf",
  fileName: "Bohdan-Andriichuk-Resume.pdf",
};

export const stats = [
  { value: 3, suffix: "+", label: "Years shipping production software" },
  { value: 2, suffix: "", label: "AI platforms delivered" },
  { value: 13, suffix: "", label: "Technologies across the stack" },
  { value: 3, suffix: "", label: "Screen classes, one experience" },
];

export const education = {
  school: "Lutsk National Technical University",
  location: "Lutsk, Ukraine",
};

/* ------------------------------------------------------------- expertise --- */

export type ExpertiseKey = "ai" | "frontend" | "backend" | "mobile" | "platforms" | "integrations";

export type Expertise = {
  key: ExpertiseKey;
  title: string;
  blurb: string;
  tags: string[];
  accent: string;
};

export const expertise: Expertise[] = [
  {
    key: "ai",
    title: "AI Product Development",
    blurb:
      "AI chat experiences, AI video-generation integrations and AI-enabled user workflows — built into the product people use every day, not bolted on as a demo.",
    tags: ["AI Chat", "AI Video Generation", "AI Workflows"],
    accent: "#2ee6d6",
  },
  {
    key: "frontend",
    title: "Frontend Engineering",
    blurb:
      "React, Next.js and Three.js interfaces with responsive layouts, smooth animation and pixel-focused detail.",
    tags: ["React", "Next.js", "Three.js"],
    accent: "#3d8bff",
  },
  {
    key: "backend",
    title: "Backend Engineering",
    blurb:
      "Application logic and API work in Node.js, Python and PHP/Laravel that keeps features fast and dependable.",
    tags: ["Node.js", "Python", "Laravel"],
    accent: "#9b7bff",
  },
  {
    key: "mobile",
    title: "Mobile Development",
    blurb:
      "Flutter-based mobile applications that carry the same product quality from the desktop to the phone in your pocket.",
    tags: ["Flutter", "Cross-device"],
    accent: "#ffc14d",
  },
  {
    key: "platforms",
    title: "Business Platforms",
    blurb:
      "WordPress, Zoho and Odoo implementations for businesses that run on CMS and CRM platforms.",
    tags: ["WordPress", "Zoho", "Odoo"],
    accent: "#ff6b8b",
  },
  {
    key: "integrations",
    title: "Product Integrations",
    blurb:
      "Third-party APIs, payment integration and feature-to-service connectivity that turn separate systems into one coherent product.",
    tags: ["Third-party APIs", "Payments", "Service connectivity"],
    accent: "#2ee6d6",
  },
];

/* ---------------------------------------------------------------- skills --- */

export type SkillGroupKey = "frontend" | "backend" | "ai" | "mobile" | "delivery";

export type SkillGroup = {
  key: SkillGroupKey;
  name: string;
  blurb: string;
  accent: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    name: "Frontend",
    blurb: "Interfaces that feel fast, look sharp and behave on every screen.",
    accent: "#3d8bff",
    skills: ["React", "Next.js", "Three.js", "HTML5", "CSS3", "Responsive UI", "UI Animation"],
  },
  {
    key: "backend",
    name: "Backend",
    blurb: "Application logic and integrations that keep products running.",
    accent: "#9b7bff",
    skills: ["Node.js", "Python", "PHP", "Laravel", "API Integration", "App Logic"],
  },
  {
    key: "ai",
    name: "AI Features",
    blurb: "AI capabilities wired into practical, user-facing workflows.",
    accent: "#2ee6d6",
    skills: ["AI Chat", "AI Video Generation", "AI-Enabled Features", "External AI APIs"],
  },
  {
    key: "mobile",
    name: "Mobile & CMS",
    blurb: "Cross-device apps and the business platforms companies run on.",
    accent: "#ffc14d",
    skills: ["Flutter", "WordPress", "Zoho", "Odoo"],
  },
  {
    key: "delivery",
    name: "Product Delivery",
    blurb: "Everything between “it works on my machine” and a product people pay for.",
    accent: "#ff6b8b",
    skills: ["Payment Integration", "Cross-Device", "Maintenance", "Client Communication"],
  },
];

/** fed to the scrolling ticker under the hero */
export const marqueeTech = [
  "React",
  "Next.js",
  "Three.js",
  "Node.js",
  "Python",
  "PHP",
  "Laravel",
  "Flutter",
  "WordPress",
  "Zoho",
  "Odoo",
  "HTML5",
  "CSS3",
  "AI Chat",
  "AI Video Generation",
  "Payment Integration",
];

/* ------------------------------------------------------------ experience --- */

export type Experience = {
  company: string;
  role: string;
  period: string;
  duration: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Ephorsec",
    role: "Full-Stack Developer",
    period: "May 2023 — Jan 2026",
    duration: "2 yrs 9 mos",
    highlights: [
      "Developed and enhanced full-stack web experiences with React, Next.js, Three.js and Node.js across frontend and backend feature work.",
      "Contributed to the Covertly AI website with a strong focus on responsive behaviour across mobile, tablet and desktop.",
      "Implemented AI chat functionality and connected product interfaces with external APIs and supporting services.",
      "Built interactive animations and visually engaging frontend experiences, including Three.js-based web elements.",
      "Turned product requirements into functional, user-facing features while keeping them consistent across devices.",
      "Supported ongoing maintenance and iterative improvements with attention to quality, communication and reliable delivery.",
    ],
    stack: ["React", "Next.js", "Three.js", "Node.js", "AI Chat", "External APIs"],
  },
  {
    company: "Quantum Alchemy Group",
    role: "Full-Stack Developer · AI Developer",
    period: "Jun 2022 — Mar 2023",
    duration: "10 mos",
    highlights: [
      "Built the Cre8tor AI website with HTML, CSS and Laravel, contributing to both the product interface and the full-stack application.",
      "Created multiple responsive pages with close attention to visual consistency, cross-device behaviour and pixel-focused implementation.",
      "Implemented AI chat capabilities within the application to support AI-driven user interactions.",
      "Integrated AI video-generation functionality, connecting generative features with the surrounding web workflow.",
      "Implemented payment integration and supporting user flows for a production-ready product experience.",
      "Delivered rapid feature implementation across UI, application logic and external integrations.",
    ],
    stack: ["Laravel", "PHP", "HTML", "CSS", "AI Video", "Payments"],
  },
];

/* -------------------------------------------------------------- projects --- */

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  org: string;
  period: string;
  role: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string;
  mock: "chat" | "video";
};

export const projects: Project[] = [
  {
    id: "covertly",
    index: "01",
    title: "Covertly AI",
    subtitle: "AI-Enabled Web Experience",
    org: "Ephorsec",
    period: "2023 — 2026",
    role: "Full-Stack Developer",
    description:
      "An AI product website built to feel equally at home on a phone, a tablet and a widescreen — with AI chat and API-connected workflows at its core and Three.js-driven motion on top.",
    highlights: [
      "Responsive web experiences engineered to behave consistently across mobile, tablet and desktop.",
      "AI chat functionality and API-connected capabilities powering interactive product workflows.",
      "Frontend animation and interactive 3D built in the React / Next.js / Three.js ecosystem.",
    ],
    stack: ["React", "Next.js", "Three.js", "Node.js", "AI Chat", "External APIs"],
    accent: "#3d8bff",
    mock: "chat",
  },
  {
    id: "cre8tor",
    index: "02",
    title: "Cre8tor AI",
    subtitle: "AI Creative Platform",
    org: "Quantum Alchemy Group",
    period: "2022 — 2023",
    role: "Full-Stack · AI Developer",
    description:
      "A multi-page AI creative platform where generative video and AI chat are the product — wrapped in responsive, pixel-focused pages and a complete payment flow.",
    highlights: [
      "Multi-page AI-focused web product built with HTML, CSS and Laravel.",
      "AI chat and AI video generation integrated as core product features.",
      "Responsive, pixel-focused pages plus payment functionality for end-user workflows.",
    ],
    stack: ["Laravel", "PHP", "HTML", "CSS", "AI Video", "Payments"],
    accent: "#2ee6d6",
    mock: "video",
  },
];

/* ------------------------------------------------------------- strengths --- */

export type StrengthIcon = "layers" | "devices" | "spark" | "chat";

export const strengths: { title: string; body: string; icon: StrengthIcon }[] = [
  {
    title: "End-to-end ownership",
    body: "Interface, backend logic, AI features and external integrations — I carry a feature from the first sketch to production without details getting lost in hand-offs.",
    icon: "layers",
  },
  {
    title: "Responsive by default",
    body: "Mobile, tablet and desktop are designed and tested together, so the experience stays consistent wherever people open it.",
    icon: "devices",
  },
  {
    title: "AI that actually ships",
    body: "I integrate AI capabilities into practical, user-facing workflows rather than treating AI as a standalone demo.",
    icon: "spark",
  },
  {
    title: "Craft & communication",
    body: "Clean implementation, visual detail, delivery speed and clear communication — the things that keep a product maintainable long after launch.",
    icon: "chat",
  },
];

/* ------------------------------------------------------------------- nav --- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];
