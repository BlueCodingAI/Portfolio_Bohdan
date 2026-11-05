"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { marqueeTech, profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

/** Wraps v into [-50, -25): the track holds 4 identical copies, so shifting by 25% is seamless. */
function wrap(v: number) {
  const range = 25;
  return ((((v + 50) % range) + range) % range) - 50;
}

/**
 * Infinite ticker whose speed — and direction — follow the page's scroll
 * velocity: scroll fast and it races, scroll up and it reverses.
 */
function VelocityRow({ children, baseVelocity }: { children: ReactNode; baseVelocity: number }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const STAR_COLORS = ["#2ee6d6", "#3d8bff", "#9b7bff", "#ffc14d"];

export default function TechMarquee() {
  return (
    <section aria-label="Technologies" className="relative z-10 overflow-hidden py-14 sm:py-20">
      {/* row 1 — glass band of technologies */}
      <div className="relative -rotate-2 scale-[1.04] border-y border-azure/15 bg-panel/60 py-4 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/60 to-transparent" />
        <VelocityRow baseVelocity={-2.2}>
          {marqueeTech.map((tech, i) => (
            <span key={tech} className="flex items-center">
              <span className="px-6 font-display text-[clamp(1.05rem,2.2vw,1.45rem)] font-semibold tracking-tight text-snow/90">
                {tech}
              </span>
              <span className="text-sm" style={{ color: STAR_COLORS[i % STAR_COLORS.length] }}>
                ✦
              </span>
            </span>
          ))}
        </VelocityRow>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-plasma/50 to-transparent" />
      </div>

      {/* row 2 — oversized outline words, travelling the other way */}
      <div className="mt-6 rotate-1">
        <VelocityRow baseVelocity={1.6}>
          {profile.focus.map((word) => (
            <span key={word} className="group flex items-center">
              <span className="text-outline px-8 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold uppercase leading-none tracking-tight transition-colors duration-500 hover:text-azure/30">
                {word}
              </span>
              <span className="h-3 w-3 rotate-45 rounded-[3px] bg-gradient-to-br from-ice to-plasma opacity-70" />
            </span>
          ))}
        </VelocityRow>
      </div>

      {/* fade the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent sm:w-40" />
    </section>
  );
}
