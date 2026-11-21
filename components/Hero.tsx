"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, profile, resume, reviewSummary, stats } from "@/lib/data";
import { useIntroDone, useScramble } from "@/lib/hooks";
import { EASE, MagneticButton, Stars, Twinkle } from "@/components/ui";
import type { MorphCommand } from "@/components/ParticleMorph";
import {
  ArrowRightIcon,
  DownloadIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons";

const ParticleMorph = dynamic(() => import("@/components/ParticleMorph"), { ssr: false });

const SHAPES = ["Neural Sphere", "Torus Knot", "Double Helix", "Spiral Galaxy"];
const ORBIT_TECH = ["Python", "FastAPI", "AI Agents", "RAG", "React", "Node.js"];
const NAME_GRADIENT = "linear-gradient(100deg, #2ee6d6 0%, #3d8bff 45%, #9b7bff 80%, #c4b5fd 100%)";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.85, ease: EASE },
  }),
};

/* ------------------------------------------------------------ name line --- */

function NameLine({
  text,
  delay,
  ready,
  gradient,
}: {
  text: string;
  delay: number;
  ready: boolean;
  gradient?: boolean;
}) {
  const letters = text.split("");
  const n = letters.length;

  return (
    <span className="block whitespace-nowrap" style={{ perspective: 900 }} aria-hidden="true">
      {letters.map((ch, i) => (
        // outer span: one-off entrance; inner span: hover bounce. Splitting them
        // keeps the entrance delay from replaying every time the hover ends.
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
          initial={{ opacity: 0, y: "55%", rotateX: -95, filter: "blur(12px)" }}
          animate={ready ? { opacity: 1, y: "0%", rotateX: 0, filter: "blur(0px)" } : undefined}
          transition={{ delay: delay + i * 0.045, duration: 0.95, ease: EASE }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ y: "-14%", scale: 1.06 }}
            transition={{ type: "spring", stiffness: 420, damping: 11 }}
            style={
              gradient
                ? {
                    // one gradient spread across all the letters, so the word
                    // reads as a single sweep instead of N tiny gradients
                    backgroundImage: NAME_GRADIENT,
                    backgroundSize: `${n * 100}% 100%`,
                    backgroundPosition: `${(i / Math.max(n - 1, 1)) * 100}% 0`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
                : undefined
            }
          >
            {ch}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- hero --- */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();

  /* rotating role, decoded through random glyphs on each change */
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 3400);
    return () => clearInterval(t);
  }, [ready]);
  const role = useScramble(profile.roles[roleIndex], ready, 0.85);

  /* particle shape — auto-cycles, or jump to one by click */
  const [shape, setShape] = useState(0);
  const [command, setCommand] = useState<MorphCommand>(null);
  const requestShape = useCallback(
    (i: number) => setCommand((c) => ({ shape: i, id: (c?.id ?? 0) + 1 })),
    [],
  );
  const shapeName = useScramble(SHAPES[shape], ready, 0.6);

  /* scroll-linked exit — every range spans 0..1: this offset is hardware-accelerated
     via a native ViewTimeline, which blends back to the base style past the last stop */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* soft light that follows the cursor across the hero */
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${mx}px ${my}px, rgba(61,139,255,0.10), transparent 70%)`;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      id="hero"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div
        className="aurora-blob left-[-14%] top-[4%] h-[38rem] w-[38rem] animate-drift opacity-35"
        style={{ background: "radial-gradient(circle,#1d4ed8,transparent 66%)" }}
      />
      <div
        className="aurora-blob right-[-12%] top-[30%] h-[34rem] w-[34rem] animate-drift opacity-25"
        style={{ background: "radial-gradient(circle,#0f766e,transparent 66%)", animationDelay: "-9s" }}
      />
      <div
        className="aurora-blob bottom-[-16%] left-[30%] h-[30rem] w-[30rem] animate-drift opacity-25"
        style={{ background: "radial-gradient(circle,#6d28d9,transparent 66%)", animationDelay: "-17s" }}
      />

      <Twinkle top="16%" left="12%" size={3} delay={0} />
      <Twinkle top="28%" left="90%" size={2} delay={1.2} color="#2ee6d6" />
      <Twinkle top="70%" left="7%" size={2} delay={2.4} color="#ffc14d" />
      <Twinkle top="82%" left="80%" size={3} delay={0.8} color="#9b7bff" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pb-16 lg:pt-24">
        {/* ------------------------------------------------------------ copy */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0.1} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-3 rounded-full glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to new opportunities
            </span>

            {/* social proof — jumps to the client reviews further down the page */}
            <button
              type="button"
              onClick={() => scrollTo("reviews")}
              aria-label={`Rated ${reviewSummary.rating.toFixed(1)} from ${reviewSummary.reviewCount} client reviews — read them`}
              className="group inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-[12px] text-mist transition-colors duration-300 hover:text-snow"
            >
              <Stars size={11} />
              <span className="font-semibold text-snow">{reviewSummary.rating.toFixed(1)}</span>
              <span>client rating</span>
              <ArrowRightIcon
                size={12}
                className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={0.25}
            className="mt-7 flex items-center gap-2 font-mono text-[13px] text-mist"
          >
            <span className="inline-block origin-[70%_70%] animate-wave text-lg">👋</span>
            Hi there, I&rsquo;m
          </motion.p>

          <h1 className="mt-3 font-display text-[clamp(2.9rem,8.4vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            <span className="sr-only">{profile.name}</span>
            <NameLine text={profile.firstName} delay={0.35} ready={ready} />
            <span className="glow-text block">
              <NameLine text={profile.lastName} delay={0.6} ready={ready} gradient />
            </span>
          </h1>

          {/* decoding role */}
          <motion.div
            variants={fadeUp}
            custom={1.05}
            className="mt-6 flex min-h-[2rem] items-center gap-3 font-mono text-[clamp(0.9rem,2.1vw,1.15rem)]"
          >
            <span className="text-ice">&gt;</span>
            <span className="text-snow" aria-live="polite">
              {role}
            </span>
            <span className="h-[1.1em] w-[0.55em] bg-ice animate-blink" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1.2}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} custom={1.35} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => scrollTo("projects")}>
              View My Work
              <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            {/* shrink-0 keeps the pair together instead of orphaning one button */}
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <MagneticButton variant="ghost" href={resume.file} download={resume.fileName}>
                <DownloadIcon size={15} />
                Resume
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => scrollTo("contact")}>
                <MailIcon size={15} />
                Get In Touch
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1.5}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-fog"
          >
            <span className="flex items-center gap-2">
              <MapPinIcon size={14} className="text-ice" />
              {profile.city}
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>
              {stats[0].value}
              {stats[0].suffix} years building production software
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-2">
              {[
                { href: contact.linkedinLink, label: "LinkedIn", icon: <LinkedInIcon size={14} /> },
                { href: contact.telegramLink, label: "Telegram", icon: <TelegramIcon size={14} /> },
                { href: contact.whatsappLink, label: "WhatsApp", icon: <WhatsAppIcon size={14} /> },
                { href: `mailto:${contact.email}`, label: "Email", icon: <MailIcon size={14} /> },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={ready ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ delay: 1.65 + i * 0.08, type: "spring", stiffness: 360, damping: 16 }}
                  whileHover={{ y: -3, scale: 1.12 }}
                  className="grid h-8 w-8 place-items-center rounded-full glass text-mist transition-colors hover:text-ice"
                >
                  {s.icon}
                </motion.a>
              ))}
            </span>
          </motion.div>
        </motion.div>

        {/* ---------------------------------------------------------- visual */}
        <motion.div
          style={{ scale: visualScale, opacity: visualOpacity, y: visualY }}
          className="relative order-first h-[clamp(19rem,64vw,30rem)] lg:order-last lg:h-[36rem]"
        >
          {/* decorative rings */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            transition={{ delay: 0.3, duration: 1.6, ease: EASE }}
          >
            <div className="absolute inset-[7%] rounded-full border border-dashed border-azure/20 animate-spin-slower" />
            <div className="absolute inset-[17%] rounded-full border border-ice/10 animate-spin-reverse">
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ice shadow-[0_0_10px_2px_rgba(46,230,214,0.8)]" />
              <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-plasma shadow-[0_0_10px_2px_rgba(155,123,255,0.8)]" />
            </div>
            <div className="absolute inset-[30%] rounded-full bg-azure/15 blur-3xl" />
          </motion.div>

          {/* particles */}
          <div
            className="absolute inset-0 animate-float cursor-pointer"
            data-cursor="Morph"
            onClick={() => requestShape((shape + 1) % SHAPES.length)}
          >
            <ParticleMorph
              className="h-full w-full"
              ready={ready}
              command={command}
              onShapeChange={setShape}
            />
          </div>

          {/* orbiting tech labels */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            {ORBIT_TECH.map((tech, i, arr) => {
              const duration = 28 + i * 4;
              // offset by a fraction of each label's own period so they start spread out
              const offset = -(duration * i) / arr.length;
              return (
                <motion.span
                  key={tech}
                  className="absolute rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mist"
                  initial={{ opacity: 0 }}
                  animate={ready ? { opacity: 1 } : undefined}
                  transition={{ delay: 1.8 + i * 0.12, duration: 0.8 }}
                  style={
                    {
                      "--orbit-r": `${222 + (i % 2) * 34}px`,
                      animation: `orbit ${duration}s linear infinite`,
                      animationDelay: `${offset}s`,
                    } as React.CSSProperties
                  }
                >
                  {tech}
                </motion.span>
              );
            })}
          </div>

          {/* shape switcher */}
          <motion.div
            className="absolute -bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full glass px-4 py-2 sm:bottom-0"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 2, duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-2">
              {SHAPES.map((name, i) => (
                <button
                  key={name}
                  onClick={() => requestShape(i)}
                  aria-label={`Morph into ${name}`}
                  aria-pressed={shape === i}
                  className="relative grid h-4 w-4 place-items-center"
                >
                  {shape === i && (
                    <motion.span
                      layoutId="shape-dot"
                      className="absolute inset-0 rounded-full border border-ice"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      shape === i ? "bg-ice" : "bg-white/25 hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="h-3 w-px bg-white/15" />
            <span className="w-[8.6rem] font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
              {shapeName}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue — outer layer fades with scroll, inner layer handles the entrance,
          so the two opacity sources never fight over one element */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.button
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2.5"
          aria-label="Scroll to About"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">Scroll</span>
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-azure/30 pt-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-ice"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
