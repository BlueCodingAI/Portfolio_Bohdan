"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { experience, type Experience as ExperienceItem } from "@/lib/data";
import { Aurora, EASE, Pill, SectionHeading, TiltCard, Twinkle, hexToRgb } from "@/components/ui";
import { PlusIcon } from "@/components/icons";

const ACCENTS = ["#3d8bff", "#2ee6d6", "#9b7bff", "#ffc14d"];
const VISIBLE = 3;

function Entry({ item, index }: { item: ExperienceItem; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const left = index % 2 === 0;
  const [expanded, setExpanded] = useState(false);
  const extra = item.highlights.length - VISIBLE;

  const monogram = item.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.li
      className={`relative flex flex-col md:flex-row ${left ? "md:justify-start" : "md:justify-end"}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* node on the spine */}
      <span className="absolute left-[14px] top-8 z-10 md:left-1/2 md:-translate-x-1/2">
        <motion.span
          className="relative grid h-4 w-4 place-items-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 }}
        >
          <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: accent }} />
          <span
            className="relative h-3 w-3 rounded-full ring-4 ring-ink"
            style={{ background: accent, boxShadow: `0 0 18px ${accent}` }}
          />
        </motion.span>
      </span>

      {/* connector from spine to card */}
      <motion.span
        className={`absolute top-[38px] hidden h-px w-11 md:block ${
          left ? "right-1/2 mr-2 origin-right" : "left-1/2 ml-2 origin-left"
        }`}
        style={{
          background: left
            ? `linear-gradient(270deg, ${accent}90, transparent)`
            : `linear-gradient(90deg, ${accent}90, transparent)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      />

      <motion.div
        className={`ml-11 min-w-0 md:ml-0 md:w-[calc(50%-3.25rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}
        initial={{ opacity: 0, x: left ? -50 : 50, rotateY: left ? 10 : -10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        style={{ transformPerspective: 1200 }}
      >
        <TiltCard max={4} glow={hexToRgb(accent)} className="rounded-3xl">
          <div className="beam relative overflow-hidden rounded-3xl glass p-6 sm:p-8" style={{ "--beam-color": accent } as React.CSSProperties}>
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            <span
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: accent }}
            />

            <div className="relative flex items-start gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-base font-bold"
                style={{ background: `${accent}1a`, color: accent, boxShadow: `inset 0 0 18px ${accent}30` }}
              >
                {monogram}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ background: `${accent}18`, color: accent }}
                  >
                    {item.period}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                    {item.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[20px] font-bold leading-snug tracking-tight text-snow">
                  {item.role}
                </h3>
                <p className="mt-1 font-display text-[14px] font-medium" style={{ color: accent }}>
                  {item.company}
                </p>
              </div>
            </div>

            <ul className="relative mt-6 space-y-3">
              {item.highlights.slice(0, VISIBLE).map((h, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-[13.5px] leading-relaxed text-mist"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.5 }}
                >
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]" style={{ background: accent }} />
                  <span>{h}</span>
                </motion.li>
              ))}

              <AnimatePresence initial={false}>
                {expanded &&
                  item.highlights.slice(VISIBLE).map((h, i) => (
                    <motion.li
                      key={`x-${i}`}
                      className="flex gap-3 overflow-hidden text-[13.5px] leading-relaxed text-mist"
                      initial={{ opacity: 0, height: 0, x: -10 }}
                      animate={{ opacity: 1, height: "auto", x: 0 }}
                      exit={{ opacity: 0, height: 0, x: -10 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                    >
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]" style={{ background: accent }} />
                      <span>{h}</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>

            {extra > 0 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="relative mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fog transition-colors hover:text-snow"
                aria-expanded={expanded}
              >
                <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: accent }}>
                  <PlusIcon size={14} />
                </motion.span>
                {expanded ? "Show less" : `${extra} more highlights`}
              </button>
            )}

            <div className="relative mt-6 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <Pill key={tech}>{tech}</Pill>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </motion.li>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const cometTop = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="noise section-pad relative overflow-hidden">
      <Aurora className="right-[-8%] top-[26%] h-[32rem] w-[32rem]" color="#4c1d95" opacity={0.2} />
      <Aurora className="bottom-[4%] left-[-10%] h-[28rem] w-[28rem]" color="#1d4ed8" delay={-8} opacity={0.18} />
      <Twinkle top="9%" left="16%" size={2} delay={0.9} color="#2ee6d6" />
      <Twinkle top="55%" left="88%" size={3} delay={2.1} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          index="04"
          title="Where I have been"
          accent="shipping"
          blurb="Two companies, two AI platforms, one through-line: turning product requirements into features people actually use. Scroll the line to follow the path."
        />

        <div ref={ref} className="relative mt-20">
          {/* spine: a dim track with a glowing fill and a comet head tied to scroll */}
          <div className="absolute left-[21px] top-0 h-full w-px bg-white/[0.07] md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="h-full w-full origin-top"
              style={{
                scaleY: fill,
                background: "linear-gradient(180deg,#ffc14d,#2ee6d6 25%,#3d8bff 60%,#9b7bff)",
                boxShadow: "0 0 16px rgba(61,139,255,0.6)",
              }}
            />
            <motion.span
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ top: cometTop, boxShadow: "0 0 14px 4px rgba(46,230,214,0.85), 0 0 40px 10px rgba(61,139,255,0.45)" }}
            />
          </div>

          {/* "now" marker at the top of the line */}
          <motion.div
            className="relative mb-14 flex md:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="relative ml-11 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-snow md:ml-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Next chapter · open to opportunities
            </span>
          </motion.div>

          <ol className="space-y-16 md:space-y-10">
            {experience.map((item, i) => (
              <Entry key={item.company} item={item} index={i} />
            ))}
          </ol>

          <motion.div
            className="relative mt-16 flex md:justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="ml-11 rounded-full glass px-5 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-fog md:ml-0">
              Jun 2022 — where it started
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
