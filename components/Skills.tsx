"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { skillGroups, type SkillGroupKey } from "@/lib/data";
import { Aurora, EASE, SectionHeading, Twinkle } from "@/components/ui";
import { CloudIcon, CodeIcon, LayersIcon, ServerIcon, SparkIcon } from "@/components/icons";

const ICONS: Record<SkillGroupKey, (size: number) => ReactNode> = {
  ai: (s) => <SparkIcon size={s} />,
  backend: (s) => <ServerIcon size={s} />,
  fullstack: (s) => <CodeIcon size={s} />,
  cloud: (s) => <CloudIcon size={s} />,
  engineering: (s) => <LayersIcon size={s} />,
};

/* ---------------------------------------------------------------- orbit --- */

/**
 * Skills circling a glowing core. Each ring spins; each label counter-spins at
 * the same rate so the text stays upright. Remounted per group, so both
 * animations always start in sync.
 */
function Orbit({ skills, accent, icon }: { skills: string[]; accent: string; icon: ReactNode }) {
  // up to five fit on one ring; beyond that alternate between two rings
  const split = skills.length > 5;
  const outer = split ? skills.filter((_, i) => i % 2 === 0) : skills;
  const inner = split ? skills.filter((_, i) => i % 2 === 1) : [];

  const ring = (items: string[], radius: number, duration: number, reverse: boolean, offset: number) => (
    <div
      className="absolute inset-0"
      style={{ animation: `${reverse ? "turn-back" : "turn"} ${duration}s linear infinite` }}
    >
      {items.map((skill, i) => {
        const angle = (i / items.length) * Math.PI * 2 + offset;
        return (
          <div
            key={skill}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
            }}
          >
            <div style={{ animation: `${reverse ? "turn" : "turn-back"} ${duration}s linear infinite` }}>
              <motion.span
                className="block whitespace-nowrap rounded-full border bg-ink/80 px-3 py-1.5 font-mono text-[11px] text-snow backdrop-blur-md"
                style={{ borderColor: `${accent}55`, boxShadow: `0 0 18px -6px ${accent}` }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.07 + (reverse ? 0.2 : 0), type: "spring", stiffness: 260, damping: 18 }}
              >
                {skill}
              </motion.span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[25rem]" aria-hidden="true">
      {/* rings */}
      <div className="absolute inset-[6%] rounded-full border border-dashed" style={{ borderColor: `${accent}30` }} />
      {split && <div className="absolute inset-[24%] rounded-full border" style={{ borderColor: `${accent}22` }} />}
      <motion.div
        className="absolute inset-[38%] rounded-full blur-2xl"
        style={{ background: accent }}
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* core */}
      <motion.div
        className="absolute inset-[39%] grid place-items-center rounded-full border bg-ink/70 backdrop-blur"
        style={{ borderColor: `${accent}66`, color: accent, boxShadow: `0 0 40px -6px ${accent}` }}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      >
        {icon}
      </motion.div>

      {ring(outer, 41, 60, false, -Math.PI / 2)}
      {inner.length > 0 && ring(inner, 26, 42, true, Math.PI / 6)}
    </div>
  );
}

/* --------------------------------------------------------------- section --- */

export default function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="skills" className="noise section-pad relative overflow-hidden">
      <Aurora className="left-[-12%] top-[14%] h-[34rem] w-[34rem]" color="#1e40af" opacity={0.22} />
      <Twinkle top="22%" left="90%" size={3} delay={1.1} color="#2ee6d6" />
      <Twinkle top="74%" left="6%" size={2} delay={0.3} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolkit"
          index="03"
          title="A stack that spans"
          accent="prompts to production"
          blurb="Pick a constellation to see what orbits it — the tools I reach for across AI, backend, full-stack, cloud and everyday engineering practice."
        />

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* ------------------------------------------------------ selector */}
          <div
            className="-mx-2 flex gap-3 overflow-x-auto px-2 py-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0"
            role="tablist"
          >
            {skillGroups.map((g, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={g.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                  className={`group relative min-w-[13.5rem] shrink-0 overflow-hidden rounded-2xl p-4 text-left transition-colors duration-500 lg:min-w-0 lg:p-5 ${
                    isActive ? "glass-strong" : "glass hover:bg-white/[0.04]"
                  }`}
                  style={isActive ? { boxShadow: `0 0 0 1px ${g.accent}45, 0 0 36px -12px ${g.accent}` } : undefined}
                >
                  {isActive && (
                    // alpha baked into the colour: motion writes an inline opacity
                    // for layoutId elements, which would beat an opacity class
                    <motion.span
                      layoutId="skill-active-bg"
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(100deg, ${g.accent}1f, transparent 70%)` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <span className="relative flex items-center gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      style={{
                        background: `${g.accent}18`,
                        color: g.accent,
                        boxShadow: isActive ? `0 0 20px -4px ${g.accent}` : undefined,
                      }}
                    >
                      {ICONS[g.key](20)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-display text-[15px] font-semibold transition-colors duration-300 ${
                          isActive ? "text-snow" : "text-mist group-hover:text-snow"
                        }`}
                      >
                        {g.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                        {g.skills.length} tools
                      </span>
                    </span>
                    <motion.span
                      className="ml-auto hidden shrink-0 lg:block"
                      animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" stroke={g.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                  </span>

                  {/* progress-style underline for the active tab */}
                  {isActive && (
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                      style={{ background: `linear-gradient(90deg, ${g.accent}, transparent)` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ---------------------------------------------------------- panel */}
          <motion.div
            className="relative overflow-hidden rounded-3xl glass p-6 sm:p-9"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <motion.span
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
              animate={{ backgroundColor: group.accent, opacity: 0.18 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-3xl"
              animate={{ backgroundColor: group.accent, opacity: 0.1 }}
              transition={{ duration: 0.6 }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={group.key}
                className="relative"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: group.accent }}>
                      0{active + 1} / 0{skillGroups.length}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-snow">{group.name}</h3>
                  </div>
                  <p className="max-w-xs text-[13px] leading-relaxed text-mist sm:text-right">{group.blurb}</p>
                </div>

                <div className="hairline my-6" />

                <div className="hidden sm:block">
                  <Orbit skills={group.skills} accent={group.accent} icon={ICONS[group.key](26)} />
                </div>

                <div className="mt-2 flex flex-wrap gap-2.5 sm:mt-6 sm:justify-center">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                      whileHover={{ y: -3 }}
                      className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium text-snow"
                      style={{ borderColor: `${group.accent}40`, background: `${group.accent}10` }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
