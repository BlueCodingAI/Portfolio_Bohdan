"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { ArrowUpIcon } from "@/components/icons";

/** Floating button with a ring that fills as you read; appears once you're past the hero. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          data-cursor="Top"
          className="group fixed bottom-5 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full glass-strong sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2ee6d6" />
                <stop offset="100%" stopColor="#9b7bff" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: ring }}
            />
          </svg>
          <ArrowUpIcon size={16} className="text-snow transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
