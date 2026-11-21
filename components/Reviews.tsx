"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { clientReviews, reviewSummary, type ClientReview } from "@/lib/data";
import {
  Aurora,
  CountUp,
  EASE,
  Reveal,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  Stars,
  Twinkle,
} from "@/components/ui";
import { ArrowUpRightIcon, FreelancerIcon, QuoteIcon } from "@/components/icons";

/** Freelancer.com brand blue — the reviews' source */
const FL = "#29b2fe";
const STAT_ACCENTS = ["#ffc14d", "#2ee6d6", "#3d8bff", "#9b7bff"];

function SourceLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={reviewSummary.url}
      target="_blank"
      rel="noreferrer noopener"
      className={`group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[12.5px] font-medium text-mist transition-colors duration-300 hover:text-snow ${className}`}
    >
      <FreelancerIcon size={14} className="text-[#29b2fe]" />
      {children}
      <ArrowUpRightIcon
        size={13}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

/* ------------------------------------------------------- numbers panel --- */

function StatTiles() {
  return (
    <Stagger className="grid h-full grid-cols-2 gap-4" stagger={0.1}>
      {reviewSummary.stats.map((s, i) => {
        const accent = STAT_ACCENTS[i % STAT_ACCENTS.length];
        return (
          <StaggerItem key={s.label} className="h-full">
            <SpotlightCard accent={accent} className="flex h-full flex-col rounded-2xl p-5 sm:p-6">
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
              <p
                className="relative font-display text-[clamp(2.1rem,4.6vw,2.9rem)] font-bold leading-none tabular-nums"
                style={{ color: accent, textShadow: `0 0 28px ${accent}55` }}
              >
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              {i === 0 && <Stars size={12} className="relative mt-2.5" />}
              <p className="relative mt-auto pt-3 text-[11px] uppercase leading-snug tracking-[0.14em] text-fog">{s.label}</p>
            </SpotlightCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function RatingBars() {
  return (
    <SpotlightCard accent={FL} className="flex h-full flex-col rounded-2xl p-6 sm:p-7">
      <div className="relative flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Client ratings by category</p>
        <span className="font-mono text-[10px] text-fog">out of 5.0</span>
      </div>
      {/* the list watches the viewport, not each bar: a bar starts at scaleX(0), and a
          zero-width box clipped by its track never reliably reports as "in view" */}
      <motion.ul
        className="relative mt-6 space-y-[1.1rem]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {reviewSummary.categoryRatings.map((r, i) => (
          <li key={r.label}>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-mist">{r.label}</span>
              <span className="font-display font-semibold tabular-nums text-snow">{r.value.toFixed(1)}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: `linear-gradient(90deg, ${FL}, #2ee6d6)`, boxShadow: `0 0 12px ${FL}88` }}
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: r.value / 5,
                    transition: { duration: 1.2, delay: 0.15 + i * 0.1, ease: EASE },
                  },
                }}
              />
            </div>
          </li>
        ))}
      </motion.ul>

      <div className="relative mt-auto pt-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <p className="text-[12.5px] leading-snug text-fog">
            Verified reviews from completed client projects
          </p>
          <SourceLink>{reviewSummary.source}</SourceLink>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* -------------------------------------------------------------- reviews --- */

function FeaturedReview({ review }: { review: ClientReview }) {
  return (
    <Reveal>
      <figure
        className="beam relative overflow-hidden rounded-3xl glass-strong p-7 sm:p-10"
        style={{ "--beam-color": FL } as CSSProperties}
      >
        <span className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full blur-3xl" style={{ background: `${FL}38` }} />
        <span className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-plasma/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-end lg:gap-12">
          <div>
            <QuoteIcon size={48} className="text-[#29b2fe]/40" />
            <blockquote className="mt-5 font-display text-[clamp(1.15rem,2.2vw,1.55rem)] font-medium leading-[1.55] tracking-tight text-snow">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
          </div>
          <figcaption className="flex flex-col gap-2.5 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <Stars pop size={16} />
            <p className="font-display text-[14px] font-semibold leading-snug text-snow">{review.project}</p>
            <p className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
              <FreelancerIcon size={12} className="shrink-0 text-[#29b2fe]" />
              Verified client · {review.date}
            </p>
          </figcaption>
        </div>
      </figure>
    </Reveal>
  );
}

function ReviewCard({ review, index }: { review: ClientReview; index: number }) {
  return (
    <motion.figure
      className="mb-5 break-inside-avoid"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
    >
      <SpotlightCard accent={FL} className="rounded-2xl p-6">
        <div className="relative flex items-center justify-between gap-3">
          <Stars value={review.rating} size={13} />
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
            {review.tag}
          </span>
        </div>
        <blockquote className="relative mt-4 text-[14.5px] leading-relaxed text-snow/90">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <figcaption className="relative mt-6 border-t border-white/[0.06] pt-4">
          <span className="block text-[13px] font-semibold leading-snug text-snow">{review.project}</span>
          <span className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
            <FreelancerIcon size={12} className="shrink-0 text-[#29b2fe]" />
            Verified client · {review.date}
          </span>
        </figcaption>
      </SpotlightCard>
    </motion.figure>
  );
}

/* --------------------------------------------------------------- section --- */

export default function Reviews() {
  const featured = clientReviews.find((r) => r.featured);
  const rest = clientReviews.filter((r) => r !== featured);

  return (
    <section id="reviews" className="noise section-pad relative overflow-hidden">
      <Aurora className="left-[-12%] top-[4%] h-[34rem] w-[34rem]" color="#0369a1" opacity={0.24} />
      <Aurora className="right-[-10%] top-[40%] h-[30rem] w-[30rem]" color="#1d4ed8" delay={-9} opacity={0.18} />
      <Aurora className="bottom-[2%] left-[22%] h-[28rem] w-[28rem]" color="#6d28d9" delay={-16} opacity={0.14} />
      <Twinkle top="8%" left="84%" size={3} delay={0.6} color="#29b2fe" />
      <Twinkle top="48%" left="4%" size={2} delay={1.9} color="#ffc14d" />
      <Twinkle top="82%" left="92%" size={2} delay={1.1} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Client reviews"
          index="06"
          title="What clients"
          accent="say"
          blurb={`Feedback from independent client projects — a ${reviewSummary.rating.toFixed(1)} rating across ${reviewSummary.reviewCount} verified reviews on ${reviewSummary.source}, with every job delivered on time and on budget.`}
        />

        {/* numbers */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <StatTiles />
          <Reveal delay={0.1} className="h-full">
            <RatingBars />
          </Reveal>
        </div>

        {/* reviews */}
        {featured && (
          <div className="mt-6">
            <FeaturedReview review={featured} />
          </div>
        )}
        <div className="mt-5 columns-1 gap-5 md:columns-2 lg:columns-3">
          {rest.map((r, i) => (
            <ReviewCard key={r.project} review={r} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <SourceLink>
            Read all {reviewSummary.reviewCount} reviews on {reviewSummary.source}
          </SourceLink>
        </Reveal>
      </div>
    </section>
  );
}
