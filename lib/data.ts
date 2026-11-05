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
  freelancer: "freelancer.com/u/bohdan38",
  freelancerLink: "https://www.freelancer.com/u/bohdan38",
};

export const resume = {
  /** lives in /public, so the browser downloads it straight from the CDN */
  file: "/Bohdan-Andriichuk-Resume.pdf",
  fileName: "Bohdan-Andriichuk-Resume.pdf",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years shipping production software" },
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
  /** small proof chip next to the dates, e.g. a rating */
  badge?: string;
  /** external profile or company page */
  link?: { href: string; label: string };
};

export const experience: Experience[] = [
  {
    company: "Freelancer.com",
    role: "Independent AI & Full-Stack Developer",
    period: "Feb 2026 — Present",
    duration: "Freelance",
    badge: "★ 5.0 · 7 reviews",
    link: { href: contact.freelancerLink, label: "Freelancer profile" },
    highlights: [
      "Delivering AI, web and automation projects for international clients — rated 5.0 across seven client reviews, 100% on time and on budget.",
      "Built custom RAG chatbots that answer from a client's own PDFs, docs and website content instead of generic model knowledge.",
      "Rebuilt static HTML designs as a production Next.js site with a custom CMS, deployed on Railway with custom-domain DNS.",
      "Automated business workflows with Twilio, Zapier and HubSpot — from Elementor-form SMS alerts to landing-page integrations.",
      "Shipped WordPress conversions and site migrations, and fixed Shopify Google Ads conversion tracking.",
      "Implemented Unreal Engine C++ features, custom 2D/3D software and AI-generated music and social video content.",
    ],
    stack: ["Next.js", "RAG · LLMs", "WordPress", "Zapier", "Twilio", "Unreal C++"],
  },
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
  {
    company: "Stafflancer",
    role: "Frontend Developer",
    period: "Apr 2021 — May 2023",
    duration: "2 yrs 2 mos",
    highlights: [
      "Built several web applications as a frontend developer, delivering custom software and e-commerce services for clients.",
      "Translated client requirements into responsive, user-facing interfaces for e-commerce and custom software products.",
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "E-commerce"],
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

/* ------------------------------------------------------------ freelancer --- */

/** Public Freelancer.com profile — figures as shown on the profile page. */
export const freelancer = {
  url: contact.freelancerLink,
  handle: "@bohdan38",
  avatar: "/freelancer/bohdan.webp",
  headline: "AI & Full-Stack Developer | LLMs, RAG & Chatbots",
  rating: 5.0,
  reviewCount: 7,
  hourlyRate: "$35",
  memberSince: "Feb 2026",
  location: "Lutsk, Ukraine",
  languages: "English",
  timeZone: "Europe / Kyiv",
  stats: [
    { value: 5, decimals: 1, suffix: "", label: "Overall rating" },
    { value: 100, decimals: 0, suffix: "%", label: "Jobs on time" },
    { value: 100, decimals: 0, suffix: "%", label: "Jobs on budget" },
    { value: 7, decimals: 0, suffix: "", label: "Five-star reviews" },
  ],
  categoryRatings: [
    { label: "Quality of work", value: 5.0 },
    { label: "Communication", value: 5.0 },
    { label: "Expertise", value: 5.0 },
    { label: "Professionalism", value: 5.0 },
    { label: "Would hire again", value: 5.0 },
  ],
  qualifications: [
    { name: "Freelancer Orientation Exam", score: "85%" },
    { name: "Preferred Freelancer Program SLA Exam", score: "80%" },
  ],
  /** a short pick from the skills listed on the profile */
  topSkills: [
    "LLMs",
    "RAG",
    "AI Agents",
    "LangChain",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "n8n",
    "Supabase",
  ],
};

export type WorkImage = { src: string; width: number; height: number; alt: string };

export type FreelanceWork = {
  id: string;
  title: string;
  category: string;
  summary: string;
  points: string[];
  stack: string[];
  accent: string;
  images: WorkImage[];
};

/** Portfolio items from the Freelancer profile (screenshots live in /public/freelancer). */
export const freelanceWork: FreelanceWork[] = [
  {
    id: "nextjs-cms",
    title: "Custom Next.js Website with CMS",
    category: "Next.js · Custom CMS",
    summary:
      "Turned a smart-home studio's static HTML designs into a fully responsive, production-ready Next.js site — then gave the team a CMS so they never need a developer to update it.",
    points: [
      "Static designs rebuilt on a clean, scalable Next.js architecture with optimized performance.",
      "Custom CMS dashboard for products, logos, descriptions, images and design sections.",
      "Production deployment on Railway, with the GoDaddy domain and DNS configured end to end.",
    ],
    stack: ["Next.js", "React", "Custom CMS", "Railway", "DNS"],
    accent: "#c9a27a",
    images: [
      { src: "/freelancer/cms-hero.webp", width: 1600, height: 801, alt: "Smart-home website hero: “Intelligence Designed.” with a living-room scene and control panel" },
      { src: "/freelancer/cms-ecosystem.webp", width: 1600, height: 799, alt: "“Seamless Integration” product grid: lighting, thermostat, security, audio, garage, shades, locks and Wi-Fi" },
      { src: "/freelancer/cms-environments.webp", width: 1600, height: 803, alt: "“Spaces tailored to your rhythm” section with residential, commercial and hospitality cards" },
    ],
  },
  {
    id: "grabfood",
    title: "GrabFood E-Commerce Redesign",
    category: "Next.js · E-commerce",
    summary:
      "Full-stack developer on a Next.js redesign of the GrabFood food-delivery storefront — built to get hungry visitors from a location search to a restaurant in seconds.",
    points: [
      "Location-first hero with delivery search, promo carousels and a cuisine grid for fast browsing.",
      "Content sections, FAQ, app-download prompts and a full footer directory, responsive across devices.",
      "Clear communication and strategic input that kept the project smooth from redesign to delivery.",
    ],
    stack: ["Next.js", "React", "Full-stack", "E-commerce"],
    accent: "#00b14f",
    images: [
      { src: "/freelancer/grabfood-hero.webp", width: 1600, height: 918, alt: "GrabFood home page with a delivery-location search and promotions in Singapore" },
      { src: "/freelancer/grabfood-full.webp", width: 1200, height: 2778, alt: "Full GrabFood landing page: promos, cuisine categories, FAQ, app download and footer" },
    ],
  },
  {
    id: "rag-chatbot",
    title: "Custom AI Chatbot with RAG",
    category: "AI · Retrieval-Augmented Generation",
    summary:
      "AI assistants grounded in a business's own PDFs, docs and website, so customers get context-aware answers instead of robotic, made-up ones.",
    points: [
      "Retrieval-Augmented Generation pipeline that answers from your own content.",
      "Responses stay tied to source material, which keeps hallucinations down.",
      "Built for support and lead generation — answering questions while qualifying visitors.",
    ],
    stack: ["RAG", "LLMs", "LangChain", "Vector DB", "OpenAI · Claude"],
    accent: "#2ee6d6",
    images: [
      { src: "/freelancer/rag-chatbot.webp", width: 1000, height: 750, alt: "Custom AI chatbot and lead generation, RAG-based" },
    ],
  },
  {
    id: "wordpress-migration",
    title: "Full Website Migration to WordPress",
    category: "WordPress · Migration",
    summary:
      "Moving businesses from Wix, Squarespace or Shopify to WordPress without losing the organic traffic they've built — and modernizing the stack on the way.",
    points: [
      "Migrations from Wix, Squarespace and Shopify into a maintainable WordPress build.",
      "SEO and organic traffic protected throughout the move.",
      "Infrastructure upgraded during the migration, not just copied across.",
    ],
    stack: ["WordPress", "SEO", "Migration", "Hosting"],
    accent: "#3d8bff",
    images: [
      { src: "/freelancer/wordpress-migration.webp", width: 1000, height: 749, alt: "Migrate your website to WordPress" },
    ],
  },
];

export type ClientReview = {
  project: string;
  quote: string;
  date: string;
  tag: string;
  rating: number;
  featured?: boolean;
};

/** Client reviews from completed Freelancer jobs, quoted as written. */
export const clientReviews: ClientReview[] = [
  {
    project: "WordPress Site Conversion from AI-HTML Prototype",
    quote:
      "Bohdan took the time to read the scope, create a plan, and execute. This is the kind of freelancer that will do well in this business and leave a string of happy clients trailing behind. I will be working with Bohdan for the next phase of this project and many more to come.",
    date: "Apr 2026",
    tag: "WordPress",
    rating: 5,
    featured: true,
  },
  {
    project: "AI-Generated Realistic Music & Social Media Videos",
    quote: "Recommended content creator. Professional tenecious and a man with patience. Thank you Bohdan!",
    date: "Oct 2026",
    tag: "AI Video",
    rating: 5,
  },
  {
    project: "Unreal Engine C++ Feature Implementations",
    quote: "Excellent and patient collaborator on a complex project. Appreciated his taskwork!",
    date: "Oct 2026",
    tag: "Unreal · C++",
    rating: 5,
  },
  {
    project: "Custom 2D/3D Software",
    quote:
      "Excellent freelancer! Worked quick and efficiently. Provided answers to all questions and implemented feedback as needed. I definitely recommend him and will hire again.",
    date: "May 2026",
    tag: "2D/3D Software",
    rating: 5,
  },
  {
    project: "HubSpot Landing Page & Integration",
    quote: "This guy is really good. Im hiring him for other projects today",
    date: "May 2026",
    tag: "HubSpot",
    rating: 5,
  },
  {
    project: "Fix Shopify Google Ads Tracking",
    quote: "Very good and very quick! carried out the work as promised.",
    date: "Apr 2026",
    tag: "Shopify",
    rating: 5,
  },
  {
    project: "Twilio + Zapier SMS Notifications for an Elementor Form",
    quote:
      "Working with Bohdan was excellent experience, he quickly set up reliable SMS notification workflow using Twilio and Zap and everything worked perfectly with my Elementor Form. Communication was clear, deliver is really fast. I would work with him again.",
    date: "Apr 2026",
    tag: "Automation",
    rating: 5,
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
  { id: "freelance", label: "Freelance" },
  { id: "contact", label: "Contact" },
];
