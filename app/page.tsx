"use client";

import dynamic from "next/dynamic";
import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Strengths from "@/components/Strengths";
import TechMarquee from "@/components/TechMarquee";

// canvas layers and the custom cursor are browser-only — keep them out of the server render
const NeuralBackground = dynamic(() => import("@/components/NeuralBackground"), { ssr: false });
const CursorFX = dynamic(() => import("@/components/CursorFX"), { ssr: false });

export default function Page() {
  return (
    <>
      <Preloader />
      <NeuralBackground />
      <CursorFX />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Expertise />
        <Skills />
        <Experience />
        <Projects />
        <Strengths />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
