"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { strengths, type StrengthIcon } from "@/lib/data";
import { EASE, MagneticButton, SectionHeading, SpotlightCard } from "@/components/ui";
import { ArrowRightIcon, ChatIcon, DevicesIcon, LayersIcon, SparkIcon } from "@/components/icons";

const ICONS: Record<StrengthIcon, ReactNode> = {
  layers: <LayersIcon size={26} />,
  devices: <DevicesIcon size={26} />,
  spark: <SparkIcon size={26} />,
  chat: <ChatIcon size={26} />,
};

const ACCENTS = ["#2ee6d6", "#3d8bff", "#9b7bff", "#ffc14d"];

const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

function StrengthCard({ index, className = "" }: { index: number; className?: string }) {
  const s = strengths[index];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <SpotlightCard accent={accent} className={`flex flex-col p-8 ${className}`}>
      <div className="relative flex items-start justify-between">
        <span
          className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover/spot:rotate-[-8deg] group-hover/spot:scale-110"
          style={{ background: `${accent}18`, color: accent, boxShadow: `inset 0 0 22px ${accent}30` }}
        >
          {ICONS[s.icon]}
        </span>
        <span
          className="font-display text-[4.5rem] font-bold leading-none opacity-[0.14] transition-opacity duration-500 group-hover/spot:opacity-40"
          style={{ color: accent }}
        >
          0{index + 1}
        </span>
      </div>
      <h3 className="relative mt-auto pt-10 font-display text-[24px] font-bold leading-tight tracking-tight text-snow">
        {s.title}
      </h3>
      <p className="relative mt-4 text-[14.5px] leading-relaxed text-mist">{s.body}</p>
      <span
        className="relative mt-7 block h-[2px] w-12 rounded-full transition-all duration-700 group-hover/spot:w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </SpotlightCard>
  );
}

/* ------------------------------------------------------- desktop: pinned --- */

function PinnedTrack() {
  const target = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) distance.set(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const raw = useTransform(() => -scrollYProgress.get() * distance.get());
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <div ref={target} className="relative hidden lg:block" style={{ height: "340vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* giant drifting word behind the cards */}
        <motion.span
          aria-hidden="true"
          style={{ x: bgX }}
          className="text-outline pointer-events-none absolute top-[8%] whitespace-nowrap font-display text-[16vw] font-bold uppercase leading-none opacity-40"
        >
          How I work · How I work
        </motion.span>

        <motion.div ref={track} style={{ x }} className="relative flex w-max items-stretch gap-8 pl-[7vw] pr-[7vw]">
          {/* intro panel */}
          <div className="flex w-[30rem] shrink-0 flex-col justify-center pr-6">
            <SectionHeading
              eyebrow="Approach"
              index="07"
              title="How I"
              accent="work"
              align="left"
              blurb="Four principles that shape every feature I ship. Keep scrolling — the page moves sideways."
            />
            <motion.div
              className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fog"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll
              <ArrowRightIcon size={14} className="text-ice" />
            </motion.div>
          </div>

          {strengths.map((_, i) => (
            <StrengthCard key={i} index={i} className="h-[27rem] w-[24rem] shrink-0" />
          ))}

          {/* closing CTA panel */}
          <div className="flex w-[26rem] shrink-0 flex-col justify-center rounded-3xl border border-dashed border-azure/25 p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice">Up next</p>
            <h3 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-tight">
              Have something worth <span className="text-aurora">building?</span>
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-mist">
              Tell me about the product, the deadline and the problem. I&rsquo;ll tell you how I&rsquo;d approach it.
            </p>
            <div className="mt-8">
              <MagneticButton onClick={goContact}>
                Start a conversation
                <ArrowRightIcon size={15} />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* progress */}
        <div className="absolute bottom-10 left-[7vw] right-[7vw] flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Approach</span>
          <div className="relative h-px flex-1 bg-white/10">
            <motion.div
              className="absolute inset-0 origin-left bg-gradient-to-r from-ice via-azure to-plasma"
              style={{ scaleX: bar }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">0{strengths.length}</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- mobile: stack --- */

function StackedList() {
  return (
    <div className="section-pad relative lg:hidden">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Approach"
          index="07"
          title="How I"
          accent="work"
          blurb="Four principles that shape every feature I ship."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {strengths.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
            >
              <StrengthCard index={i} className="h-full min-h-[19rem]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  return (
    <section id="approach" className="relative">
      <PinnedTrack />
      <StackedList />
    </section>
  );
}
