"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScramble } from "@/lib/hooks";
import { StarIcon } from "@/components/icons";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** "#3d8bff" -> "61, 139, 255" for rgba() strings. */
export function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/* ---------------------------------------------------------------- reveal --- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

/** Fades, lifts and de-blurs its children the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "span";
}) {
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggers a list of `<StaggerItem>` children. */
export function Stagger({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------- scramble text --- */

/** Decodes its text through random glyphs the first time it scrolls into view. */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const out = useScramble(text, inView);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* -------------------------------------------------------- section header --- */

const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 7, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.95, ease: EASE } },
};

function MaskWord({ word, accent }: { word: string; accent?: boolean }) {
  return (
    <>
      {/* the padding/negative-margin pair keeps descenders from being clipped */}
      <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
        <motion.span
          className={`inline-block ${accent ? "text-aurora" : ""}`}
          style={{ transformOrigin: "0% 100%" }}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      </span>{" "}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  blurb,
  align = "center",
}: {
  eyebrow: string;
  index?: string;
  title: string;
  accent?: string;
  blurb?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div className={`relative ${centered ? "text-center" : "text-left"}`}>
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ice animate-pulse-ring" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice" />
          </span>
          {index && <span className="text-ice">{index}</span>}
          {index && <span className="h-3 w-px bg-white/15" />}
          <ScrambleText text={eyebrow} />
        </span>
      </Reveal>

      <motion.h2
        className="mt-6 text-balance font-display text-[clamp(2rem,5.4vw,3.9rem)] font-bold leading-[1.08] tracking-tight"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
      >
        {title.split(" ").map((w, i) => (
          <MaskWord key={`t-${i}`} word={w} />
        ))}
        {accent?.split(" ").map((w, i) => (
          <MaskWord key={`a-${i}`} word={w} accent />
        ))}
      </motion.h2>

      {blurb && (
        <Reveal delay={0.2}>
          <p
            className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-mist ${
              centered ? "mx-auto" : ""
            }`}
          >
            {blurb}
          </p>
        </Reveal>
      )}

      <motion.div
        className={`hairline mt-8 w-44 ${centered ? "mx-auto origin-center" : "origin-left"}`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

/* -------------------------------------------------------- magnetic button --- */

/** Button that drifts toward the cursor while hovered, then springs back. */
export function MagneticButton({
  children,
  href,
  download,
  variant = "primary",
  className = "",
  onClick,
  type,
  strength = 0.32,
  external,
}: {
  children: ReactNode;
  href?: string;
  download?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 17, mass: 0.6 });
  const y = useSpring(0, { stiffness: 260, damping: 17, mass: 0.6 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300";

  const look = variant === "primary" ? "text-ink" : "glass text-snow hover:text-white";

  const Comp = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <Comp
      ref={ref as never}
      href={href}
      download={href ? download : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      type={href ? undefined : (type ?? "button")}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${look} ${className}`}
    >
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-[linear-gradient(110deg,var(--color-ice),var(--color-azure),var(--color-plasma),var(--color-azure),var(--color-ice))] bg-[length:250%_100%] animate-gradient" />
          {/* light sweeps across the fill on hover */}
          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
        </>
      )}
      {variant === "ghost" && (
        <span className="absolute inset-0 bg-gradient-to-r from-azure/0 via-azure/20 to-ice/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </Comp>
  );
}

/* --------------------------------------------------------------- count up --- */

export function CountUp({
  to,
  suffix = "",
  duration = 2,
  pad = 0,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  pad?: number;
  /** digits after the point, e.g. 1 for a "5.0" rating */
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const text = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value)).padStart(pad, "0");

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------- tilt card --- */

/** 3D-tilting card with a spotlight that tracks the cursor. */
export function TiltCard({
  children,
  className = "",
  max = 7,
  glow = "61, 139, 255",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const [hovered, setHovered] = useState(false);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(${glow}, 0.16), transparent 68%)`;

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set(-(py - 0.5) * max * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    // perspective must live on the PARENT of the rotating element, otherwise
    // the tilt renders as a flat skew
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      style={{ perspective: 1100 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[inherit]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
        />
        <div style={{ transform: "translateZ(22px)" }} className="relative h-full rounded-[inherit]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------- spotlight card --- */

/**
 * Glass card with a cursor-following glow and a light beam that runs around its
 * border on hover. Pointer position is written to CSS variables, so moving the
 * mouse never re-renders React.
 */
export function SpotlightCard({
  children,
  className = "",
  accent = "#3d8bff",
  beam = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  beam?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group/spot relative overflow-hidden rounded-3xl glass ${beam ? "beam" : ""} ${className}`}
      style={{ "--beam-color": accent } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(${hexToRgb(accent)}, 0.14), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ misc bits --- */

export function Pill({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className="rounded-full border border-azure/20 bg-azure/5 px-3 py-1 text-[11px] font-medium tracking-wide text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-ice/40 hover:bg-ice/10 hover:text-ice"
      style={accent ? { borderColor: `${accent}33` } : undefined}
    >
      {children}
    </span>
  );
}

/** Five-star rating row. `pop` makes the stars spring in one by one when scrolled into view. */
export function Stars({
  value = 5,
  size = 14,
  className = "",
  pop = false,
}: {
  value?: number;
  size?: number;
  className?: string;
  pop?: boolean;
}) {
  return (
    <span role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`} className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => {
        const cls = i < Math.round(value) ? "text-amber" : "text-white/15";
        return pop ? (
          <motion.span
            key={i}
            className={`inline-flex ${cls}`}
            initial={{ scale: 0, rotate: -50 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.2 + i * 0.07 }}
          >
            <StarIcon size={size} />
          </motion.span>
        ) : (
          <StarIcon key={i} size={size} className={cls} />
        );
      })}
    </span>
  );
}

/** Small decorative point of light — scattered through section backgrounds. */
export function Twinkle({
  top,
  left,
  size = 2,
  delay = 0,
  color = "#eef3ff",
}: {
  top: string;
  left: string;
  size?: number;
  delay?: number;
  color?: string;
}) {
  return (
    <span
      className="pointer-events-none absolute rounded-full animate-twinkle"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 4}px ${size}px ${color}55`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

/** Large, slow-drifting blurred colour wash for section backgrounds. */
export function Aurora({
  className,
  color,
  delay = 0,
  opacity = 0.25,
}: {
  className: string;
  color: string;
  delay?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`aurora-blob animate-drift ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 66%)`,
        animationDelay: `${delay}s`,
        opacity,
      }}
    />
  );
}
