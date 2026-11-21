import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { contact, education, profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Portfolio of Bohdan Andriichuk — Senior AI & Software Engineer building AI-powered applications with LLMs, AI agents and RAG, scalable backends in Python, FastAPI and Node.js, React and Next.js frontends, and cloud architecture.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Bohdan Andriichuk",
    "Senior AI Engineer",
    "Senior Software Engineer",
    "AI Architect",
    "Backend Engineer",
    "Full-Stack Engineer",
    "AI Agents",
    "LLM",
    "RAG",
    "Python",
    "FastAPI",
    "Node.js",
    "React",
    "Next.js",
    "TypeScript",
    "Cloud Architecture",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

/** schema.org Person — lets search engines tie this site to the public profiles */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description,
  email: `mailto:${contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lutsk", addressCountry: "UA" },
  sameAs: [contact.linkedinLink],
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "AI Agents",
    "Retrieval-Augmented Generation",
    "Python",
    "FastAPI",
    "Node.js",
    "React",
    "Next.js",
    "Cloud Architecture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
