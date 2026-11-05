"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { education, profile, stats } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";
import {
  Aurora,
  CountUp,
  Reveal,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  Twinkle,
} from "@/components/ui";
import { CapIcon, MapPinIcon } from "@/components/icons";

/* ------------------------------------------------------ scroll highlight --- */

function HighlightWord({
  word,
  progress,
  range,
  accent,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <>
      <motion.span style={{ opacity, y }} className={`inline-block ${accent ? "text-aurora" : ""}`}>
        {word}
      </motion.span>{" "}
    </>
  );
}

/** A paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollHighlight({ text, highlights }: { text: string; highlights: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-[1.4] tracking-tight text-snow"
    >
      {words.map((w, i) => {
        const start = i / words.length;
        const clean = w.replace(/[^\w-]/g, "");
        return (
          <HighlightWord
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[start, start + 1 / words.length]}
            accent={highlights.includes(clean)}
          />
        );
      })}
    </p>
  );
}

/* ----------------------------------------------------------- code window --- */

type Token = { text: string; cls: string };

const SOURCE = [
  "const bohdan = {",
  '  role: "Senior AI & Full-Stack Developer",',
  '  based: "Lutsk, Ukraine",',
  '  focus: ["AI products", "Web", "Mobile"],',
  '  frontend: ["React", "Next.js", "Three.js"],',
  '  backend: ["Node.js", "Python", "Laravel"],',
  '  mobile: "Flutter",',
  "  openToWork: true,",
  "};",
];

/** Tiny highlighter — just enough grammar for the snippet above. */
function tokenize(line: string): Token[] {
  const out: Token[] = [];
  const re = /("[^"]*")|\b(const|true|false)\b|^(\s+)(\w+)(?=:)|([{}[\],:;=])|(\w+)|(\s+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m[1]) out.push({ text: m[1], cls: "text-amber" });
    else if (m[2]) out.push({ text: m[2], cls: m[2] === "const" ? "text-plasma" : "text-coral" });
    else if (m[4]) {
      out.push({ text: m[3], cls: "" });
      out.push({ text: m[4], cls: "text-ice" });
    } else if (m[5]) out.push({ text: m[5], cls: "text-fog" });
    else if (m[6]) out.push({ text: m[6], cls: "text-azure" });
    else if (m[7]) out.push({ text: m[7], cls: "" });
  }
  return out;
}

function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const lines = useMemo(() => SOURCE.map(tokenize), []);
  const total = useMemo(() => SOURCE.reduce((n, l) => n + l.length, 0), []);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(total);
      return;
    }
    const id = setInterval(() => {
      setTyped((t) => {
        if (t >= total) {
          clearInterval(id);
          return t;
        }
        return Math.min(total, t + 3);
      });
    }, 28);
    return () => clearInterval(id);
  }, [inView, reduced, total]);

  // walk the tokens, spending the typed-character budget as we go
  let budget = typed;
  let cursorLine = 0;
  let cursorCol = 0;
  const done = typed >= total;

  const rendered = lines.map((tokens, li) => {
    const lineLen = SOURCE[li].length;
    if (budget <= 0) return null;
    const visible = Math.min(budget, lineLen);
    if (budget > 0) {
      cursorLine = li;
      cursorCol = visible;
    }
    budget -= lineLen;

    let left = visible;
    return tokens.map((tok, ti) => {
      if (left <= 0) return null;
      const slice = tok.text.slice(0, left);
      left -= tok.text.length;
      return (
        <span key={ti} className={tok.cls}>
          {slice}
        </span>
      );
    });
  });

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl glass-strong">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-mist">
          bohdan.js
        </span>
        <span className="ml-auto font-mono text-[10px] text-fog">
          {done ? "saved" : "editing…"}
        </span>
      </div>

      {/* scanning light */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-azure/0 via-azure/[0.06] to-azure/0 animate-scan" />

      <div className="flex overflow-x-auto px-4 py-4 font-mono text-[12px] leading-[1.85]">
        <div className="select-none pr-4 text-right text-fog/50">
          {SOURCE.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="min-w-0 flex-1 whitespace-pre text-snow">
          {rendered.map((line, i) => (
            <div key={i} className="min-h-[1.85em]">
              {line}
              {i === cursorLine && (
                <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-ice animate-blink" />
              )}
            </div>
          ))}
        </pre>
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 font-mono text-[10px] text-fog">
        <span className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            animate={{ backgroundColor: done ? "#34d399" : "#ffc14d" }}
          />
          {done ? "✓ compiled — ready to collaborate" : "compiling…"}
        </span>
        <span className="hidden sm:inline">
          Ln {cursorLine + 1}, Col {cursorCol + 1} · JavaScript
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- section --- */

export default function About() {
  return (
    <section id="about" className="noise section-pad relative overflow-hidden">
      <Aurora className="left-[-10%] top-[18%] h-[30rem] w-[30rem]" color="#1d4ed8" opacity={0.22} />
      <Aurora className="bottom-[0%] right-[-8%] h-[26rem] w-[26rem]" color="#0f766e" delay={-10} opacity={0.18} />
      <Twinkle top="12%" left="74%" size={2} delay={0.5} color="#2ee6d6" />
      <Twinkle top="86%" left="20%" size={2} delay={1.8} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About me"
          index="01"
          title="Building products where"
          accent="AI meets craft"
          blurb="Senior AI & full-stack developer — equally at home polishing an animation curve and wiring up the API, payment or AI service behind it."
        />

        <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* ---------------------------------------------------- narrative */}
          <div>
            <ScrollHighlight text={profile.intro} highlights={profile.introHighlights} />

            <div className="mt-10 space-y-5">
              {profile.summary.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[15px] leading-[1.85] text-mist">{para}</p>
                </Reveal>
              ))}
            </div>

            <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StaggerItem>
                <SpotlightCard accent="#9b7bff" className="h-full rounded-2xl p-5">
                  <div className="relative flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plasma/15 text-plasma transition-transform duration-500 group-hover/spot:-rotate-12 group-hover/spot:scale-110">
                      <CapIcon size={20} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Education</p>
                      <p className="mt-1.5 font-display text-[14px] font-semibold leading-snug text-snow">
                        {education.school}
                      </p>
                      <p className="mt-1 text-[12px] text-mist">{education.location}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
              <StaggerItem>
                <SpotlightCard accent="#ffc14d" className="h-full rounded-2xl p-5">
                  <div className="relative flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber transition-transform duration-500 group-hover/spot:rotate-12 group-hover/spot:scale-110">
                      <MapPinIcon size={20} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Based in</p>
                      <p className="mt-1.5 font-display text-[14px] font-semibold leading-snug text-snow">
                        {profile.location}
                      </p>
                      <p className="mt-1 text-[12px] text-mist">Working with teams worldwide</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            </Stagger>
          </div>

          {/* ------------------------------------------------ code + stats */}
          <div>
            <Reveal>
              <CodeWindow />
            </Reveal>

            <Stagger className="mt-6 grid grid-cols-2 gap-4" stagger={0.1}>
              {stats.map((stat, i) => (
                <StaggerItem key={stat.label}>
                  <SpotlightCard
                    accent={["#2ee6d6", "#3d8bff", "#9b7bff", "#ffc14d"][i]}
                    className="h-full rounded-2xl p-5"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" />
                    <p className="relative font-display text-[clamp(2rem,4.6vw,2.7rem)] font-bold leading-none tabular-nums text-aurora">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="relative mt-3 text-[11px] uppercase leading-snug tracking-[0.14em] text-fog">
                      {stat.label}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
