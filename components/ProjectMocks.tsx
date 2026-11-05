"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";
import {
  CheckIcon,
  DesktopIcon,
  LockIcon,
  MobileIcon,
  PlayIcon,
  SendIcon,
  SparkIcon,
  TabletIcon,
} from "@/components/icons";

/*
 * Animated illustrations of each product's core flow — not screenshots. They
 * only tick while on screen.
 */

/* -------------------------------------------------------------- browser --- */

function BrowserFrame({
  title,
  right,
  children,
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink/85 shadow-[0_40px_120px_-40px_rgba(61,139,255,0.55)] backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10.5px] text-mist">
          <LockIcon size={11} className="shrink-0 text-emerald-400" />
          <span className="truncate">{title}</span>
        </span>
        <div className="ml-auto shrink-0">{right}</div>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- chat mock --- */

const DEVICES = [
  { key: "desktop", width: "100%", Icon: DesktopIcon },
  { key: "tablet", width: "70%", Icon: TabletIcon },
  { key: "mobile", width: "44%", Icon: MobileIcon },
] as const;

type Msg = { from: "user" | "ai"; text: string };
type Step = Msg | "typing";

const SCRIPT: Step[] = [
  { from: "user", text: "Plan a launch page for our AI product" },
  "typing",
  { from: "ai", text: "Here’s a layout: 3D hero, live AI demo, pricing and FAQ — responsive by default." },
  { from: "user", text: "Will it hold up on tablets?" },
  "typing",
  { from: "ai", text: "Yes — one adaptive grid across mobile, tablet and desktop." },
];

function Orb({ size = 22 }: { size?: number }) {
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(#2ee6d6,#3d8bff,#9b7bff,#ff6b8b,#2ee6d6)] animate-spin-slow blur-[1.5px]" />
      <span className="absolute inset-[3px] rounded-full bg-ink" />
      <span className="absolute inset-[6px] rounded-full bg-gradient-to-br from-ice/70 to-plasma/70 blur-[2px]" />
    </span>
  );
}

export function ChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(SCRIPT.length);
      return;
    }
    if (!inView) return;
    const atEnd = step >= SCRIPT.length;
    const prev = SCRIPT[step - 1];
    const delay = atEnd ? 3200 : step === 0 ? 700 : prev === "typing" ? 1500 : 1250;
    const t = setTimeout(() => setStep((s) => (s >= SCRIPT.length ? 0 : s + 1)), delay);
    return () => clearTimeout(t);
  }, [step, inView, reduced]);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setDevice((d) => (d + 1) % DEVICES.length), 3300);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const shown = SCRIPT.slice(0, step);
  const typing = shown[shown.length - 1] === "typing";
  const messages = shown
    .map((s, i) => ({ s, i }))
    .filter((m): m is { s: Msg; i: number } => m.s !== "typing");

  return (
    <div ref={ref}>
      <BrowserFrame
        title="Covertly AI · assistant"
        right={
          <div className="flex items-center gap-0.5 rounded-lg bg-white/[0.04] p-0.5">
            {DEVICES.map((d, i) => (
              <button
                key={d.key}
                onClick={() => setDevice(i)}
                aria-label={`Preview on ${d.key}`}
                className={`relative grid h-6 w-7 place-items-center rounded-md transition-colors ${
                  device === i ? "text-ink" : "text-fog hover:text-snow"
                }`}
              >
                {device === i && (
                  <motion.span
                    layoutId="chat-device"
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-ice to-azure"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <d.Icon size={13} className="relative" />
              </button>
            ))}
          </div>
        }
      >
        <div className="relative flex h-[22rem] justify-center bg-abyss/60 p-4 sm:h-[24rem]">
          {/* grid lives on its own layer — its radial mask would otherwise fade the app too */}
          <div className="grid-bg pointer-events-none absolute inset-0" />
          <motion.div
            className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink/90 shadow-2xl"
            animate={{ width: DEVICES[device].width }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* app header */}
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-3 py-2.5">
              <Orb />
              <div className="min-w-0">
                <p className="truncate font-display text-[12px] font-semibold text-snow">Covertly AI</p>
                <p className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  online
                </p>
              </div>
              <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.14em] text-fog sm:block">
                {DEVICES[device].key}
              </span>
            </div>

            {/* conversation */}
            <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
              <AnimatePresence initial={false}>
                {messages.map(({ s, i }) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    className={`flex items-end gap-2 ${s.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {s.from === "ai" && <Orb size={16} />}
                    <span
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
                        s.from === "user"
                          ? "rounded-br-sm bg-azure text-white"
                          : "rounded-bl-sm border border-white/10 bg-white/[0.05] text-snow"
                      }`}
                    >
                      {s.text}
                    </span>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="flex items-end gap-2"
                  >
                    <Orb size={16} />
                    <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-ice"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* composer */}
            <div className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-2.5">
              <span className="flex-1 truncate rounded-full bg-white/[0.05] px-3 py-1.5 font-mono text-[10px] text-fog">
                Ask anything…
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ice to-azure text-ink">
                <SendIcon size={12} />
              </span>
            </div>
          </motion.div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ------------------------------------------------------------ video mock --- */

const PROMPT = "A neon city at dusk, cinematic drone shot";
const CYCLE = 11.5;

/** Deterministic skyline so server and client agree. */
const BUILDINGS = Array.from({ length: 26 }, (_, i) => {
  const h = 22 + ((i * 37) % 44) + (i % 3) * 6;
  return { x: i * 17, w: 13 + (i % 4) * 2, h };
});
const BACK_BUILDINGS = Array.from({ length: 22 }, (_, i) => ({
  x: i * 21 - 6,
  w: 17,
  h: 30 + ((i * 53) % 40),
}));

function CityScene({ playhead, blur }: { playhead: number; blur: number }) {
  const near = -playhead * 70;
  const far = -playhead * 26;
  const sunY = 90 - playhead * 16;

  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      style={{ filter: blur > 0.2 ? `blur(${blur}px) saturate(${1 - blur / 30})` : undefined }}
    >
      <defs>
        <linearGradient id="vm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b0b2a" />
          <stop offset="45%" stopColor="#4c1d95" />
          <stop offset="78%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="vm-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#ff6b8b" />
        </linearGradient>
        <linearGradient id="vm-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0b3d" />
          <stop offset="100%" stopColor="#05070d" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#vm-sky)" />

      {/* stars */}
      {[18, 52, 90, 140, 196, 232, 270, 300].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={10 + ((i * 23) % 40)}
          r={0.9}
          fill="#fff"
          opacity={0.4 + 0.6 * Math.abs(Math.sin(playhead * 9 + i))}
        />
      ))}

      {/* synthwave sun with cut bands */}
      <g>
        <circle cx="160" cy={sunY} r="34" fill="url(#vm-sun)" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="120" y={sunY + 6 + i * 7} width="80" height={1.5 + i * 0.8} fill="#c0266f" opacity="0.9" />
        ))}
      </g>

      {/* far skyline */}
      <g transform={`translate(${far} 0)`}>
        {BACK_BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={128 - b.h} width={b.w} height={b.h} fill="#2a1659" opacity="0.9" />
        ))}
      </g>

      {/* near skyline with lit windows */}
      <g transform={`translate(${near} 0)`}>
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={130 - b.h} width={b.w} height={b.h} fill="#0b1026" />
            {Array.from({ length: Math.floor(b.h / 9) }).map((_, j) =>
              (i + j) % 3 === 0 ? null : (
                <rect
                  key={j}
                  x={b.x + 3 + ((j % 2) * (b.w - 8))}
                  y={130 - b.h + 4 + j * 9}
                  width="2.4"
                  height="2.4"
                  fill={(i + j) % 4 === 0 ? "#ffc14d" : "#2ee6d6"}
                  opacity={0.55 + 0.45 * Math.abs(Math.sin(playhead * 6 + i + j))}
                />
              ),
            )}
          </g>
        ))}
      </g>

      {/* neon grid floor */}
      <rect y="130" width="320" height="50" fill="url(#vm-floor)" />
      <g stroke="#ff4fd8" strokeWidth="0.6" opacity="0.6">
        {[-6, -4, -2, -1, 0, 1, 2, 4, 6].map((k) => (
          <line key={k} x1={160 + k * 6} y1="130" x2={160 + k * 60} y2="180" />
        ))}
        {[0, 1, 2, 3, 4].map((k) => {
          const y = 130 + Math.pow(((k + (playhead * 4) % 1) / 5), 2) * 50;
          return <line key={k} x1="0" y1={y} x2="320" y2={y} />;
        })}
      </g>
    </svg>
  );
}

export function VideoMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduced) {
      setT(7.5);
      return;
    }
    if (!inView) return;
    const start = performance.now() - t * 1000;
    const id = setInterval(() => {
      setT(((performance.now() - start) / 1000) % CYCLE);
    }, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resume from the current time, don't restart on every tick
  }, [inView, reduced]);

  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const typed = Math.floor(clamp((t - 0.2) / 2) * PROMPT.length);
  const pressed = t > 2.4 && t < 2.8;
  const render = clamp((t - 2.8) / 2.6);
  const rendering = t >= 2.8 && t < 5.4;
  const playing = t >= 5.4;
  const playhead = clamp((t - 5.4) / 5.6);
  const frame = Math.min(5, Math.floor(playhead * 6));

  return (
    <div ref={ref}>
      <BrowserFrame
        title="Cre8tor AI · studio"
        right={
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[9.5px] text-emerald-400">
            <CheckIcon size={10} />
            Pro · paid
          </span>
        }
      >
        <div className="space-y-3 bg-abyss/60 p-4">
          {/* prompt */}
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-ink/80 px-3 py-2.5">
              <SparkIcon size={13} className="shrink-0 text-plasma" />
              <span className="truncate font-mono text-[11px] text-snow">
                {PROMPT.slice(0, typed)}
                {t < 2.6 && <span className="ml-px inline-block h-3 w-[2px] translate-y-0.5 bg-ice animate-blink" />}
                {typed === 0 && <span className="text-fog">Describe your video…</span>}
              </span>
            </div>
            <motion.span
              animate={{ scale: pressed ? 0.9 : 1 }}
              className="relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-plasma to-azure px-3.5 py-2.5 font-mono text-[11px] font-semibold text-white"
            >
              {rendering ? "Rendering…" : "Generate"}
              {pressed && (
                <motion.span
                  className="absolute inset-0 rounded-xl bg-white"
                  initial={{ opacity: 0.6, scale: 0.3 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.span>
          </div>

          {/* preview */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-ink">
            <AnimatePresence mode="wait">
              {t < 2.8 ? (
                <motion.div
                  key="empty"
                  className="absolute inset-0 grid place-items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-3 rounded-lg border border-dashed border-white/10" />
                  <div className="flex flex-col items-center gap-2 text-fog">
                    <SparkIcon size={22} className="text-plasma animate-bob" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Your video appears here</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="scene"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CityScene playhead={playhead} blur={rendering ? (1 - render) * 14 : 0} />

                  {rendering && (
                    <div className="absolute inset-0 grid place-items-center bg-ink/30">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-ice/25 to-transparent animate-scan" />
                      <div className="flex flex-col items-center gap-2">
                        <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
                          <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
                          <circle
                            cx="22"
                            cy="22"
                            r="18"
                            stroke="#2ee6d6"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={113}
                            strokeDashoffset={113 * (1 - render)}
                          />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-snow">
                          Rendering {Math.round(render * 100)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {playing && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <PlayIcon size={12} className="text-white" />
                      <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ice to-plasma"
                          style={{ width: `${playhead * 100}%` }}
                        />
                      </span>
                      <span className="font-mono text-[9.5px] tabular-nums text-white/80">
                        00:0{Math.min(5, Math.floor(playhead * 6))} / 00:05
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* filmstrip */}
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => {
              const lit = playing ? i === frame : rendering ? render > i / 6 : false;
              const done = playing || (rendering && render > (i + 1) / 6);
              return (
                <div
                  key={i}
                  className="relative h-7 overflow-hidden rounded-md border transition-all duration-300"
                  style={{
                    borderColor: lit ? "#2ee6d6" : "rgba(255,255,255,0.08)",
                    boxShadow: lit ? "0 0 12px -2px #2ee6d6" : undefined,
                    background: done
                      ? `linear-gradient(180deg, #4c1d95, #db2777 ${60 + i * 5}%, #0b1026 ${78 + i * 2}%)`
                      : "rgba(255,255,255,0.03)",
                    opacity: done ? 1 : 0.6,
                  }}
                />
              );
            })}
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
