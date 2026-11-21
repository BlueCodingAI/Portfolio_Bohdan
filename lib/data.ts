/**
 * Every word on the site lives here. Edit this file and each section updates —
 * no component changes needed.
 */

export const profile = {
  name: "Bohdan Andriichuk",
  firstName: "Bohdan",
  lastName: "Andriichuk",
  initials: "BA",
  title: "Senior AI & Software Engineer",
  /** giant outline words in the second marquee row */
  focus: ["AI Agents", "LLMs & RAG", "Backend", "Full-Stack", "Cloud"],
  /** cycled through in the hero with a decode/scramble effect */
  roles: [
    "Senior AI & Software Engineer",
    "AI Agents · LLMs · RAG",
    "Python · FastAPI · Node.js",
    "React · Next.js · TypeScript",
    "Cloud Architecture · DevOps",
  ],
  location: "Lutsk, Volyn, Ukraine",
  city: "Lutsk, Ukraine",
  timeZone: "Europe/Kyiv",
  tagline:
    "I build AI-powered applications and scalable software — LLM, agent and RAG systems on top of solid backend engineering, modern full-stack interfaces and production-ready cloud infrastructure.",
  /** the large paragraph that lights up word by word as you scroll */
  intro:
    "I build intelligent, reliable and maintainable software that solves real business challenges — AI engineering on strong software fundamentals, from architecture design to production.",
  /** words in `intro` that get the gradient treatment */
  introHighlights: ["intelligent", "reliable", "maintainable", "AI"],
  summary: [
    "I’m a Senior AI & Software Engineer specializing in AI-powered applications, full-stack development, backend engineering and scalable software architecture. I work across the whole software development lifecycle — requirements analysis and architecture design, implementation, API integration, testing, deployment and optimization.",
    "Most of my work combines LLMs, AI agents and RAG with Python, FastAPI, Node.js and TypeScript services, React and Next.js interfaces, and Docker-based cloud deployments. What I care about most is pairing AI engineering with strong software engineering fundamentals to ship applications that are practical, secure and production-ready.",
    "I’m open to remote opportunities, including Senior AI Engineer, Senior Software Engineer, AI Architect, Backend Engineer and Full-Stack Engineer roles.",
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
  /** source of the client reviews */
  freelancerLink: "https://www.freelancer.com/u/bohdan38",
};

export const resume = {
  /** lives in /public, so the browser downloads it straight from the CDN */
  file: "/Bohdan-Andriichuk-Resume.pdf",
  fileName: "Bohdan-Andriichuk-Resume.pdf",
};

export const stats = [
  { value: 10, suffix: "+", label: "Years building production software" },
  { value: 4, suffix: "", label: "Engineering teams since 2016" },
  { value: 4, suffix: "", label: "Core areas: AI, backend, full-stack, cloud" },
  { value: 7, suffix: "", label: "Five-star client reviews" },
];

export const education = {
  school: "Lutsk National Technical University",
  location: "Lutsk, Ukraine",
  period: "2012 — 2016",
};

/* ------------------------------------------------------------- expertise --- */

export type ExpertiseKey = "ai" | "agents" | "rag" | "backend" | "fullstack" | "cloud";

export type Expertise = {
  key: ExpertiseKey;
  title: string;
  blurb: string;
  tags: string[];
  accent: string;
};

/** The "Core Areas of Expertise" from the LinkedIn About section. */
export const expertise: Expertise[] = [
  {
    key: "ai",
    title: "AI Engineering & LLM Applications",
    blurb:
      "Intelligent applications built on large language models and generative AI — LLM integrations, prompt engineering and context management, plus model deployment and performance optimization for production.",
    tags: ["LLMs", "Generative AI", "Prompt Engineering", "Context Management"],
    accent: "#2ee6d6",
  },
  {
    key: "agents",
    title: "AI Agents & Automation",
    blurb:
      "AI agents and workflow orchestration that turn multi-step business processes into reliable, hands-off automation.",
    tags: ["AI Agents", "Orchestration", "Automation"],
    accent: "#9b7bff",
  },
  {
    key: "rag",
    title: "RAG & Semantic Search",
    blurb:
      "Retrieval-Augmented Generation with embeddings and semantic search, so answers come from your own data instead of guesswork.",
    tags: ["RAG", "Embeddings", "Semantic Search"],
    accent: "#ffc14d",
  },
  {
    key: "backend",
    title: "Backend & Software Engineering",
    blurb:
      "Python, FastAPI, Node.js and TypeScript services — RESTful APIs, microservices and distributed systems with asynchronous processing built in.",
    tags: ["Python", "FastAPI", "Node.js", "REST APIs"],
    accent: "#3d8bff",
  },
  {
    key: "fullstack",
    title: "Full-Stack Development",
    blurb:
      "API-driven web applications and modern interfaces in React, Next.js and TypeScript, on database designs made to scale.",
    tags: ["React", "Next.js", "TypeScript"],
    accent: "#ff6b8b",
  },
  {
    key: "cloud",
    title: "Cloud & DevOps",
    blurb:
      "Cloud-based application architecture and deployment with Docker, CI/CD workflows, infrastructure automation and monitoring — the practices that keep software reliable and maintainable in production.",
    tags: ["Docker", "CI/CD", "Infrastructure Automation", "Monitoring"],
    accent: "#2ee6d6",
  },
];

/* ---------------------------------------------------------------- skills --- */

export type SkillGroupKey = "ai" | "backend" | "fullstack" | "cloud" | "engineering";

export type SkillGroup = {
  key: SkillGroupKey;
  name: string;
  blurb: string;
  accent: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    name: "AI & LLMs",
    blurb: "Language models, agents and retrieval wired into real applications.",
    accent: "#2ee6d6",
    skills: ["LLMs", "Generative AI", "AI Agents", "RAG", "Embeddings", "Semantic Search", "Prompt Engineering", "Vector DBs"],
  },
  {
    key: "backend",
    name: "Backend",
    blurb: "Services and APIs that stay fast and dependable under real load.",
    accent: "#3d8bff",
    skills: ["Python", "FastAPI", "Node.js", "TypeScript", "REST APIs", "Microservices", "Async Processing"],
  },
  {
    key: "fullstack",
    name: "Full-Stack",
    blurb: "API-driven web apps and modern interfaces, end to end.",
    accent: "#9b7bff",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Database Design", "PostgreSQL"],
  },
  {
    key: "cloud",
    name: "Cloud & DevOps",
    blurb: "Architecture, deployment and the automation that keeps production healthy.",
    accent: "#ffc14d",
    skills: ["Cloud Architecture", "Docker", "CI/CD", "Infra Automation", "Monitoring"],
  },
  {
    key: "engineering",
    name: "Engineering Practice",
    blurb: "The fundamentals that make software secure and built to last.",
    accent: "#ff6b8b",
    skills: ["Software Architecture", "Requirements Analysis", "Testing", "Debugging", "Performance Tuning", "Distributed Systems"],
  },
];

/** fed to the scrolling ticker under the hero */
export const marqueeTech = [
  "Python",
  "FastAPI",
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "LLMs",
  "AI Agents",
  "RAG",
  "Embeddings",
  "Semantic Search",
  "Microservices",
  "REST APIs",
  "Docker",
  "CI/CD",
  "Cloud Architecture",
];

/* ------------------------------------------------------------ experience --- */

export type Experience = {
  company: string;
  /** letters in the company badge on the timeline */
  monogram: string;
  role: string;
  period: string;
  duration: string;
  highlights: string[];
  stack: string[];
};

/** Work history exactly as listed on LinkedIn (titles, companies, dates). */
export const experience: Experience[] = [
  {
    company: "AutomateBoring",
    monogram: "AB",
    role: "Senior AI & Software Engineer",
    period: "Nov 2023 — Sep 2026",
    duration: "2 yrs 11 mos",
    highlights: [
      "Designed and built AI-powered applications on large language models — LLM integrations, prompt engineering and context management for production use.",
      "Developed AI agents and orchestrated multi-step workflows that automate business processes end to end.",
      "Implemented Retrieval-Augmented Generation pipelines with embeddings and semantic search to ground answers in company data.",
      "Built backend services and RESTful APIs in Python, FastAPI and Node.js, with asynchronous processing for long-running AI tasks.",
      "Shipped React and Next.js interfaces for AI features, connected to the services behind them through clean, typed APIs.",
      "Deployed and monitored applications in the cloud with Docker and CI/CD, and optimized model and system performance in production.",
    ],
    stack: ["Python", "FastAPI", "LLMs", "AI Agents", "RAG", "Docker"],
  },
  {
    company: "OneMind Technologies",
    monogram: "OM",
    role: "Full Stack Software Engineer",
    period: "Mar 2020 — Oct 2023",
    duration: "3 yrs 8 mos",
    highlights: [
      "Developed full-stack web applications with React, Next.js, Node.js and TypeScript, from database design to the user interface.",
      "Designed RESTful APIs and backend services and integrated third-party platforms, keeping systems reliable as usage grew.",
      "Split larger features into microservices and asynchronous jobs to improve scalability and performance.",
      "Worked across the full lifecycle — requirements analysis, architecture design, implementation, testing and deployment.",
      "Containerized services with Docker and set up CI/CD workflows for faster, more predictable releases.",
    ],
    stack: ["React", "Next.js", "Node.js", "TypeScript", "REST APIs", "Docker"],
  },
  {
    company: "Empat",
    monogram: "E",
    role: "Full Stack Engineer",
    period: "Nov 2017 — Mar 2020",
    duration: "2 yrs 5 mos",
    highlights: [
      "Built web applications for client products across the frontend and backend with JavaScript, React, Node.js and Python.",
      "Implemented API-driven features and integrations, turning product requirements into working, tested software.",
      "Designed database schemas and application logic for scalable, maintainable products.",
      "Collaborated with designers, product managers and QA to ship features on schedule.",
    ],
    stack: ["JavaScript", "React", "Node.js", "Python", "REST APIs", "SQL"],
  },
  {
    company: "GOTOMA Software House",
    monogram: "G",
    role: "Software Engineer",
    period: "Aug 2016 — Nov 2017",
    duration: "1 yr 4 mos",
    highlights: [
      "Built and maintained features for client web applications across the stack.",
      "Wrote backend logic and APIs in Python and JavaScript, and tracked down and fixed bugs in production code.",
      "Built the habits that still shape my work — debugging, testing and writing clean, maintainable code.",
    ],
    stack: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Git"],
  },
];

/* -------------------------------------------------------------- projects --- */

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  /** short category chip shown above the title */
  kind: string;
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
    kind: "AI chat · Web app",
    role: "Full-stack & AI engineering",
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
    kind: "Generative AI · Platform",
    role: "Full-stack & AI integration",
    description:
      "A multi-page AI creative platform where generative video and AI chat are the product — wrapped in responsive, pixel-focused pages and a complete payment flow.",
    highlights: [
      "Multi-page AI-focused web product with a full-stack application behind it.",
      "AI chat and AI video generation integrated as core product features.",
      "Responsive, pixel-focused pages plus payment functionality for end-user workflows.",
    ],
    stack: ["Laravel", "PHP", "HTML", "CSS", "AI Video", "Payments"],
    accent: "#2ee6d6",
    mock: "video",
  },
];

/* --------------------------------------------------------------- reviews --- */

/** Client feedback from completed Freelancer.com projects — figures as shown on the profile. */
export const reviewSummary = {
  source: "Freelancer.com",
  url: contact.freelancerLink,
  rating: 5.0,
  reviewCount: 7,
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
};

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

export type StrengthIcon = "layers" | "server" | "spark" | "shield";

export const strengths: { title: string; body: string; icon: StrengthIcon }[] = [
  {
    title: "End-to-end ownership",
    body: "Requirements analysis, architecture design, implementation, testing, deployment and optimization — I own the whole lifecycle, so nothing gets lost in hand-offs.",
    icon: "layers",
  },
  {
    title: "Built to scale",
    body: "Microservices, asynchronous processing and cloud deployments designed so systems stay fast and reliable as usage grows.",
    icon: "server",
  },
  {
    title: "AI that actually ships",
    body: "LLMs, agents and RAG built into practical, user-facing workflows — production features, not standalone demos.",
    icon: "spark",
  },
  {
    title: "Secure & production-ready",
    body: "Testing, debugging, monitoring and engineering best practices that keep software secure and maintainable long after launch.",
    icon: "shield",
  },
];

/* ------------------------------------------------------------------- nav --- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];
