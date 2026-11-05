"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { expertise, type Expertise as ExpertiseItem, type ExpertiseKey } from "@/lib/data";
import { Aurora, EASE, Pill, SectionHeading, SpotlightCard, Twinkle } from "@/components/ui";
import { CodeIcon, LayersIcon, MobileIcon, PlugIcon, ServerIcon, SparkIcon } from "@/components/icons";

const ICONS: Record<ExpertiseKey, ReactNode> = {
  ai: <SparkIcon size={22} />,
  frontend: <CodeIcon size={22} />,
  backend: <ServerIcon size={22} />,
  mobile: <MobileIcon size={22} />,
  platforms: <LayersIcon size={22} />,
  integrations: <PlugIcon size={22} />,
};

/* ------------------------------------------------------------- visuals --- */

/** A little AI conversation with a "thinking" equaliser — idles forever. */
function AIVisual() {
  return (
    <div className="relative flex w-full max-w-[17rem] flex-col gap-2.5 font-mono text-[11px]">
      <div className="ml-auto rounded-2xl rounded-br-sm bg-azure px-3.5 py-2 text-white shadow-[0_8px_24px_-8px_rgba(61,139,255,0.7)] animate-bob">
        Generate a product video
      </div>
      <div className="flex w-fit items-center gap-2.5 rounded-2xl rounded-bl-sm glass px-3.5 py-2.5">
        <span className="relative grid h-5 w-5 place-items-center">
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(#2ee6d6,#3d8bff,#9b7bff,#2ee6d6)] animate-spin-slow blur-[1px]" />
          <span className="absolute inset-[3px] rounded-full bg-ink" />
        </span>
        <span className="flex h-5 items-center gap-[3px]">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="h-full w-[3px] origin-center rounded-full bg-gradient-to-t from-ice to-plasma animate-eq"
              style={{ animationDelay: `${(i % 7) * -0.13 - (i > 6 ? 0.4 : 0)}s` }}
            />
          ))}
        </span>
      </div>
      <div
        className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-sm glass px-3.5 py-2 text-ice animate-bob"
        style={{ animationDelay: "-1.4s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Video ready · 00:12
      </div>
    </div>
  );
}

function FlowNode({ label, color, sub }: { label: string; color: string; sub?: string }) {
  return (
    <div
      className="relative shrink-0 rounded-xl border bg-ink/70 px-4 py-2.5 text-center"
      style={{ borderColor: `${color}55`, boxShadow: `0 0 24px -10px ${color}` }}
    >
      <p className="font-mono text-[11px] font-medium text-snow">{label}</p>
      {sub && <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-fog">{sub}</p>}
    </div>
  );
}

function FlowLink({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative hidden min-w-8 flex-1 sm:block">
      <div className="flow-line w-full opacity-60" />
      <span
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(46,230,214,0.8)] animate-packet"
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  );
}

const FLOW_TARGETS = [
  { label: "Payments", color: "#ffc14d" },
  { label: "AI Services", color: "#2ee6d6" },
  { label: "CRM / CMS", color: "#9b7bff" },
];

/** Data packets flowing from the product through an API layer to the services behind it. */
function IntegrationVisual() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-0">
      <FlowNode label="Product UI" sub="web · mobile" color="#3d8bff" />
      <FlowLink />
      <FlowNode label="API Layer" sub="logic · auth" color="#2ee6d6" />
      <FlowLink delay={0.9} />
      <div className="flex shrink-0 flex-wrap justify-center gap-2 sm:flex-col">
        {FLOW_TARGETS.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
          >
            <FlowNode label={t.label} color={t.color} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- card --- */

function Card({ item, index, className = "" }: { item: ExpertiseItem; index: number; className?: string }) {
  const wide = item.key === "ai" || item.key === "integrations";

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, rotateX: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE }}
      style={{ transformPerspective: 1000 }}
    >
      <SpotlightCard accent={item.accent} className="h-full p-6 sm:p-7">
        <div
          className={`relative flex h-full flex-col gap-8 ${
            item.key === "ai" ? "md:flex-row md:items-center" : ""
          } ${item.key === "integrations" ? "lg:flex-row lg:items-center" : ""}`}
        >
          <div className={`flex flex-col ${wide ? "lg:max-w-md" : ""} ${item.key === "ai" ? "md:flex-1" : ""}`}>
            <div className="flex items-center justify-between">
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 group-hover/spot:-rotate-6 group-hover/spot:scale-110"
                style={{
                  background: `${item.accent}18`,
                  color: item.accent,
                  boxShadow: `inset 0 0 18px ${item.accent}26`,
                }}
              >
                {ICONS[item.key]}
              </span>
              <span className="font-mono text-[11px] text-fog transition-colors duration-300 group-hover/spot:text-snow">
                0{index + 1}
              </span>
            </div>

            <h3 className="mt-6 font-display text-[19px] font-bold tracking-tight text-snow">{item.title}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{item.blurb}</p>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {item.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </div>

          {item.key === "ai" && (
            <div className="flex flex-1 justify-center md:justify-end">
              <AIVisual />
            </div>
          )}
          {item.key === "integrations" && (
            <div className="flex flex-1 items-center justify-center lg:pl-6">
              <IntegrationVisual />
            </div>
          )}
        </div>

        {/* accent line that sweeps in along the bottom edge on hover */}
        <span
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover/spot:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
        />
      </SpotlightCard>
    </motion.div>
  );
}

/* --------------------------------------------------------------- section --- */

const SPANS: Record<ExpertiseKey, string> = {
  ai: "md:col-span-2",
  frontend: "",
  backend: "",
  mobile: "",
  platforms: "",
  integrations: "md:col-span-2 lg:col-span-3",
};

export default function Expertise() {
  return (
    <section id="expertise" className="noise section-pad relative overflow-hidden">
      <Aurora className="right-[-10%] top-[10%] h-[34rem] w-[34rem]" color="#0e7490" opacity={0.22} />
      <Aurora className="bottom-[5%] left-[-10%] h-[28rem] w-[28rem]" color="#5b21b6" delay={-12} opacity={0.18} />
      <Twinkle top="18%" left="8%" size={3} delay={1.1} color="#9b7bff" />
      <Twinkle top="72%" left="93%" size={2} delay={0.3} color="#ffc14d" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What I do"
          index="02"
          title="Six ways I"
          accent="move a product forward"
          blurb="From the AI feature at the heart of the product to the payment flow at the edge of it — one developer, the whole path."
        />

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, i) => (
            <Card key={item.key} item={item} index={i} className={SPANS[item.key]} />
          ))}
        </div>
      </div>
    </section>
  );
}
