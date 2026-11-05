"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type Ripple = { id: number; x: number; y: number };

/**
 * A precise dot plus a lagging ring. The ring swells over anything clickable,
 * shows a label for elements with `data-cursor="…"`, and every click sends out
 * a ripple. Fine pointers only — touch devices keep their native behaviour.
 */
export default function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 170, damping: 19, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 19, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as Element | null)?.closest?.(
        "a, button, input, textarea, select, label, [data-cursor]",
      ) as HTMLElement | null;
      setHot(Boolean(el));
      setLabel(el?.dataset?.cursor ?? null);
    };

    const onDown = (e: PointerEvent) => {
      const id = performance.now() + Math.random();
      setRipples((r) => [...r.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 700);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = label ? 86 : hot ? 54 : 34;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-snow mix-blend-difference"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hot ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />

      <motion.div
        className="fixed left-0 top-0 grid place-items-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(61,139,255,0.6)",
          boxShadow: "0 0 22px rgba(61,139,255,0.3), inset 0 0 16px rgba(46,230,214,0.18)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (hot ? 1 : 0.7) : 0,
          backgroundColor: label ? "rgba(61,139,255,0.18)" : "rgba(61,139,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              className="whitespace-nowrap font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-snow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="fixed rounded-full border border-ice"
            style={{ left: r.x - 30, top: r.y - 30, width: 60, height: 60 }}
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
