"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile, stats } from "@/lib/data";
import { markIntroDone, useReducedMotion } from "@/lib/hooks";

/** Fake boot log — each line lands as the progress counter passes its share. */
const BOOT = [
  { cmd: "init portfolio --owner bohdan", status: "" },
  { cmd: "loading neural modules", status: "ok" },
  { cmd: `compiling ${stats[0].value}${stats[0].suffix} years of experience`, status: "ok" },
  { cmd: "wiring llms · agents · rag", status: "ok" },
  { cmd: "rendering interface", status: "ready" },
];

const CURTAIN = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    // ease toward 100 with a touch of lag so it reads like real loading
    const total = reduced ? 500 : 2100;
    let raf = 0;
    let current = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const tick = (now: number) => {
      const target = Math.min(100, ((now - start) / total) * 100);
      current += (target - current) * 0.14;
      setProgress(current);

      if (current >= 99.4) {
        setProgress(100);
        timer = setTimeout(() => {
          setPhase("exit");
          markIntroDone();
        }, 320);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = phase === "loading" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const lines = Math.min(BOOT.length, Math.floor(progress / (100 / BOOT.length)) + 1);

  return (
    <div
      className={`fixed inset-0 z-[100] ${exiting ? "pointer-events-none" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* two curtains that split apart to reveal the site */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
        animate={exiting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.95, ease: CURTAIN }}
        onAnimationComplete={() => {
          if (exiting) setPhase("done");
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        animate={exiting ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 0.95, ease: CURTAIN }}
      />

      {/* the seam: a light line that grows with progress, then flashes open */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-ice to-transparent"
        style={{ boxShadow: "0 0 24px 2px rgba(46,230,214,0.55)" }}
        animate={
          exiting
            ? { scaleX: 1.4, opacity: 0, transition: { duration: 0.6 } }
            : { scaleX: progress / 100, opacity: 0.9 }
        }
        transition={{ duration: 0.1 }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        animate={exiting ? { opacity: 0, scale: 0.94, filter: "blur(10px)" } : {}}
        transition={{ duration: 0.45, ease: "easeIn" }}
      >
        {/* faint wash behind the logo */}
        <div
          className="aurora-blob h-[30rem] w-[30rem] opacity-30"
          style={{ background: "radial-gradient(circle,#2563eb,transparent 68%)" }}
        />

        <div className="relative w-[min(86vw,25rem)]">
          {/* logo: hexagon draws itself, monogram fades up inside */}
          <div className="relative mx-auto h-24 w-24">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2ee6d6" />
                  <stop offset="50%" stopColor="#3d8bff" />
                  <stop offset="100%" stopColor="#9b7bff" />
                </linearGradient>
              </defs>
              <motion.path
                d="M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z"
                fill="none"
                stroke="url(#pl-grad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M50 18 L78 34 L78 66 L50 82 L22 66 L22 34 Z"
                fill="rgba(61,139,255,0.08)"
                stroke="rgba(61,139,255,0.35)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
            <span className="absolute inset-0 animate-spin-slow">
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ice shadow-[0_0_12px_3px_rgba(46,230,214,0.7)]" />
            </span>
            <motion.span
              className="absolute inset-0 grid place-items-center font-display text-2xl font-bold tracking-tight text-aurora"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {profile.initials}
            </motion.span>
          </div>

          {/* boot log */}
          <div className="mt-10 min-h-[8.5rem] font-mono text-[11.5px] leading-[1.9] text-fog">
            {BOOT.slice(0, lines).map((line, i) => (
              <motion.div
                key={line.cmd}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-ice">{i === 0 ? "$" : ">"}</span>
                <span className={i === 0 ? "text-snow" : ""}>{line.cmd}</span>
                {line.status && (
                  <>
                    <span className="flex-1 overflow-hidden whitespace-nowrap text-white/10">
                      ................................................
                    </span>
                    <span className={line.status === "ready" ? "text-amber" : "text-ice"}>
                      {line.status}
                    </span>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-end justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              {profile.firstName} · Portfolio
            </span>
            <span className="font-display text-3xl font-bold tabular-nums text-aurora">
              {String(Math.round(progress)).padStart(3, "0")}
              <span className="text-sm text-fog">%</span>
            </span>
          </div>

          <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ice via-azure to-plasma"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
