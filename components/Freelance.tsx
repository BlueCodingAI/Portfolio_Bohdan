"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  clientReviews,
  freelanceWork,
  freelancer,
  profile,
  type ClientReview,
  type FreelanceWork,
} from "@/lib/data";
import {
  Aurora,
  CountUp,
  EASE,
  MagneticButton,
  Pill,
  Reveal,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
  Stars,
  Twinkle,
} from "@/components/ui";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  ExpandIcon,
  FreelancerIcon,
  GlobeIcon,
  ImagesIcon,
  MailIcon,
  MapPinIcon,
  QuoteIcon,
  ShieldCheckIcon,
} from "@/components/icons";

/** Freelancer.com brand blue */
const FL = "#29b2fe";
const STAT_ACCENTS = ["#ffc14d", "#2ee6d6", "#3d8bff", "#9b7bff"];

const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

function ProfileLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={freelancer.url}
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

/* ---------------------------------------------------------- profile card --- */

function ProfileCard() {
  const meta = [
    { icon: <MapPinIcon size={15} />, label: "Based in", value: freelancer.location },
    { icon: <CalendarIcon size={15} />, label: "Member since", value: freelancer.memberSince },
    { icon: <GlobeIcon size={15} />, label: "Languages", value: freelancer.languages },
    { icon: <ClockIcon size={15} />, label: "Time zone", value: freelancer.timeZone },
  ];

  return (
    <div
      className="beam relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong"
      style={{ "--beam-color": FL } as CSSProperties}
    >
      {/* banner */}
      <div className="relative h-28 shrink-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(120deg, ${FL}59, rgba(61,139,255,0.22) 50%, rgba(155,123,255,0.25))` }}
        />
        <div className="grid-bg absolute inset-0" />
        <span className="absolute -right-12 -top-20 h-52 w-52 rounded-full blur-3xl" style={{ background: `${FL}55` }} />
        <div className="relative flex items-center justify-between gap-2 px-6 pt-5 sm:px-8">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-snow backdrop-blur sm:tracking-[0.18em]">
            <FreelancerIcon size={13} className="text-[#29b2fe]" />
            Freelancer.com
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300 backdrop-blur sm:tracking-[0.18em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open for hire
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-7 sm:px-8 sm:pb-8">
        {/* avatar + rate */}
        <div className="-mt-12 flex items-end justify-between gap-4">
          <div className="relative h-24 w-24 shrink-0">
            <span className="absolute -inset-[3px] overflow-hidden rounded-full">
              <span className="absolute -inset-4 animate-spin-slow bg-[conic-gradient(from_0deg,#29b2fe,#2ee6d6,#9b7bff,#ffc14d,#29b2fe)]" />
            </span>
            <span className="absolute inset-0 rounded-full bg-ink" />
            <Image
              src={freelancer.avatar}
              alt={`${profile.name}, portrait`}
              width={192}
              height={192}
              className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 grid h-8 w-8 place-items-center rounded-full bg-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: FL }}>
                <FreelancerIcon size={12} />
              </span>
            </span>
          </div>

          <div className="pb-1 text-right">
            <p className="font-display text-[1.75rem] font-bold leading-none tracking-tight text-snow">
              {freelancer.hourlyRate}
              <span className="ml-1 text-[12px] font-medium tracking-normal text-fog">USD / hr</span>
            </p>
          </div>
        </div>

        {/* identity */}
        <div className="mt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-[22px] font-bold tracking-tight text-snow">{profile.name}</h3>
            <span className="font-mono text-[12px] text-fog">{freelancer.handle}</span>
          </div>
          <p className="mt-1.5 text-[13.5px] font-medium leading-snug" style={{ color: FL }}>
            {freelancer.headline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Stars pop size={16} />
            <span className="font-display text-[16px] font-bold text-snow">{freelancer.rating.toFixed(1)}</span>
            <span className="text-[12.5px] text-fog">({freelancer.reviewCount} reviews)</span>
          </div>
        </div>

        {/* meta */}
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06]">
          {meta.map((m) => (
            <div key={m.label} className="bg-ink/70 px-4 py-3.5">
              <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                <span className="text-ice">{m.icon}</span>
                {m.label}
              </dt>
              <dd className="mt-1.5 text-[13.5px] font-semibold text-snow">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* credentials */}
        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Credentials</p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center gap-3 text-[13px] text-mist">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <ShieldCheckIcon size={13} />
              </span>
              Email verified
            </li>
            {freelancer.qualifications.map((q) => (
              <li key={q.name} className="flex items-center gap-3 text-[13px] text-mist">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                  style={{ background: `${FL}22`, color: FL }}
                >
                  <CheckIcon size={11} />
                </span>
                <span className="min-w-0 flex-1">{q.name}</span>
                <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-snow">
                  {q.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* mt-auto pins the actions to the bottom when the card is stretched */}
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <MagneticButton href={freelancer.url} external className="px-6">
            <FreelancerIcon size={15} />
            View profile
            <ArrowUpRightIcon size={14} />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={goContact} className="px-6">
            <MailIcon size={15} />
            Contact directly
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- numbers panel --- */

function StatTiles() {
  return (
    <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
      {freelancer.stats.map((s, i) => {
        const accent = STAT_ACCENTS[i % STAT_ACCENTS.length];
        return (
          <StaggerItem key={s.label} className="h-full">
            <SpotlightCard accent={accent} className="h-full rounded-2xl p-5 sm:p-6">
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
              <p className="relative mt-3 text-[11px] uppercase leading-snug tracking-[0.14em] text-fog">{s.label}</p>
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
      <ul className="relative mt-6 space-y-[1.1rem]">
        {freelancer.categoryRatings.map((r, i) => (
          <li key={r.label}>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-mist">{r.label}</span>
              <span className="font-display font-semibold tabular-nums text-snow">{r.value.toFixed(1)}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: `linear-gradient(90deg, ${FL}, #2ee6d6)`, boxShadow: `0 0 12px ${FL}88` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: r.value / 5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: EASE }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-7">
        <div className="border-t border-white/[0.06] pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Top skills on profile</p>
          <motion.div
            className="mt-3.5 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
          >
            {freelancer.topSkills.map((s) => (
              <motion.span key={s} variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1 } }}>
                <Pill>{s}</Pill>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ------------------------------------------------------------ portfolio --- */

function WorkCard({
  work,
  index,
  onOpen,
}: {
  work: FreelanceWork;
  index: number;
  onOpen: (image: number) => void;
}) {
  const cover = work.images[0];
  const many = work.images.length > 1;

  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.12, ease: EASE }}
    >
      <SpotlightCard accent={work.accent} className="flex h-full flex-col p-3 sm:p-4">
        {/* preview, framed like a browser window */}
        <button
          type="button"
          onClick={() => onOpen(0)}
          data-cursor="View"
          aria-label={`Open ${work.title} screenshots`}
          className="group/shot relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink text-left"
        >
          <span className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </span>
            <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-fog">
              {work.category}
            </span>
            <span className="w-[34px]" />
          </span>
          <span className="relative block aspect-[16/10] overflow-hidden">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1152px) 34rem, (min-width: 768px) 46vw, 92vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-transparent opacity-70 transition-opacity duration-500 group-hover/shot:opacity-100" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-snow backdrop-blur transition-transform duration-500 group-hover/shot:-translate-y-0.5">
              {many ? <ImagesIcon size={13} /> : <ExpandIcon size={12} />}
              {many ? `${work.images.length} screens` : "Expand"}
            </span>
          </span>
        </button>

        {/* copy */}
        <div className="relative flex flex-1 flex-col px-2 pb-3 pt-6 sm:px-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px]" style={{ color: work.accent }}>
              0{index + 1}
            </span>
            <span className="h-px w-8" style={{ background: work.accent }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">Client project</span>
          </div>
          <h4 className="mt-3 font-display text-[1.4rem] font-bold leading-tight tracking-tight text-snow">
            {work.title}
          </h4>
          <p className="mt-3 text-[14px] leading-relaxed text-mist">{work.summary}</p>
          <ul className="mt-5 space-y-2.5">
            {work.points.map((p) => (
              <li key={p} className="flex gap-3 text-[13px] leading-relaxed text-snow/85">
                <span
                  className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
                  style={{ background: `${work.accent}22`, color: work.accent }}
                >
                  <CheckIcon size={10} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {work.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

/* ------------------------------------------------------------- lightbox --- */

function Lightbox({ work, start, onClose }: { work: FreelanceWork; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = work.images.length;
  const img = work.images[i];
  const ratio = img.width / img.height;
  const tall = ratio < 0.8;

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        // keep keyboard focus inside the dialog
        const nodes = dialog.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [go, onClose]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} screenshots`}
      className="fixed inset-0 z-[85] flex flex-col bg-ink/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* header */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8" onClick={stop}>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: work.accent }}>
            {work.category}
          </p>
          <p className="mt-1 truncate font-display text-[16px] font-semibold text-snow">{work.title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {n > 1 && (
            <span className="font-mono text-[11px] tabular-nums text-fog">
              {i + 1} / {n}
            </span>
          )}
          <button
            ref={closeBtn}
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full glass text-snow transition-colors hover:text-ice"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      </div>

      {/* stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={img.src}
            onClick={stop}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] ${
              tall ? "h-full w-full max-w-4xl overflow-y-auto overscroll-contain" : ""
            }`}
            style={
              tall
                ? undefined
                : {
                    // as wide as fits, but never so wide the height overflows the stage
                    width: `min(100%, 68rem, calc((100svh - 12rem) * ${ratio.toFixed(4)}))`,
                    aspectRatio: `${img.width} / ${img.height}`,
                  }
            }
          >
            {tall ? (
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="h-auto w-full"
              />
            ) : (
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1152px) 68rem, 100vw" className="object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        {tall && (
          <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-ink/80 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist backdrop-blur">
            Scroll for the full page
          </span>
        )}

        {n > 1 && (
          <>
            <button
              onClick={(e) => {
                stop(e);
                go(-1);
              }}
              aria-label="Previous screen"
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass-strong text-snow transition-colors hover:text-ice sm:left-5"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              onClick={(e) => {
                stop(e);
                go(1);
              }}
              aria-label="Next screen"
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full glass-strong text-snow transition-colors hover:text-ice sm:right-5"
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>

      {/* thumbnails */}
      <div className="flex justify-center gap-2.5 px-5 pb-6 pt-1" onClick={stop}>
        {n > 1 &&
          work.images.map((im, k) => (
            <button
              key={im.src}
              onClick={() => setI(k)}
              aria-label={`Show screen ${k + 1}`}
              aria-current={k === i}
              className={`relative h-12 w-20 overflow-hidden rounded-lg border transition-all duration-300 sm:h-14 sm:w-24 ${
                k === i ? "border-ice opacity-100" : "border-white/10 opacity-45 hover:opacity-90"
              }`}
            >
              <Image src={im.src} alt="" fill sizes="6rem" className="object-cover object-top" />
            </button>
          ))}
      </div>
    </motion.div>
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
        <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
            style={{ background: `${FL}1f`, color: FL }}
          >
            <FreelancerIcon size={15} />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold leading-snug text-snow">{review.project}</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
              Verified client · {review.date}
            </span>
          </span>
        </figcaption>
      </SpotlightCard>
    </motion.figure>
  );
}

/* --------------------------------------------------------------- shared --- */

function SubHeading({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="mt-28 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: FL }}>
          <span className="h-px w-8" style={{ background: FL }} />
          {kicker}
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-tight tracking-tight text-snow">
          {title}
        </h3>
      </Reveal>
      {children && <Reveal delay={0.1}>{children}</Reveal>}
    </div>
  );
}

/* --------------------------------------------------------------- section --- */

export default function Freelance() {
  const [gallery, setGallery] = useState<{ work: number; image: number } | null>(null);
  const close = useCallback(() => setGallery(null), []);
  // the portal target only exists in the browser — wait for mount so hydration matches
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const featured = clientReviews.find((r) => r.featured);
  const rest = clientReviews.filter((r) => r !== featured);

  return (
    <section id="freelance" className="noise section-pad relative overflow-hidden">
      <Aurora className="left-[-12%] top-[4%] h-[34rem] w-[34rem]" color="#0369a1" opacity={0.24} />
      <Aurora className="right-[-10%] top-[40%] h-[30rem] w-[30rem]" color="#1d4ed8" delay={-9} opacity={0.18} />
      <Aurora className="bottom-[2%] left-[22%] h-[28rem] w-[28rem]" color="#6d28d9" delay={-16} opacity={0.14} />
      <Twinkle top="8%" left="84%" size={3} delay={0.6} color="#29b2fe" />
      <Twinkle top="48%" left="4%" size={2} delay={1.9} color="#ffc14d" />
      <Twinkle top="82%" left="92%" size={2} delay={1.1} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Freelance"
          index="06"
          title="Trusted by clients on"
          accent="Freelancer"
          blurb="Independent AI, web and automation work for clients worldwide — a 5.0 rating across seven reviews, with jobs delivered 100% on time and on budget."
        />

        {/* profile + numbers */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="h-full">
            <ProfileCard />
          </Reveal>
          <div className="flex flex-col gap-6">
            <StatTiles />
            <Reveal delay={0.1} className="flex-1">
              <RatingBars />
            </Reveal>
          </div>
        </div>

        {/* portfolio */}
        <SubHeading kicker="Portfolio" title="Recent client builds">
          <ProfileLink>Full portfolio on Freelancer</ProfileLink>
        </SubHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {freelanceWork.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} onOpen={(image) => setGallery({ work: i, image })} />
          ))}
        </div>

        {/* reviews */}
        <SubHeading kicker="Client reviews" title="What clients say">
          <ProfileLink>
            <span className="font-semibold text-snow">{freelancer.rating.toFixed(1)}</span>
            <Stars size={12} />
            <span>· {freelancer.reviewCount} reviews</span>
          </ProfileLink>
        </SubHeading>
        {featured && (
          <div className="mt-10">
            <FeaturedReview review={featured} />
          </div>
        )}
        <div className="mt-5 columns-1 gap-5 md:columns-2 lg:columns-3">
          {rest.map((r, i) => (
            <ReviewCard key={r.project} review={r} index={i} />
          ))}
        </div>

        {/* closing call to action */}
        <Reveal className="mt-16">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-8 sm:p-10"
            style={{ background: `linear-gradient(120deg, ${FL}26, rgba(61,139,255,0.12) 45%, rgba(155,123,255,0.14))` }}
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="font-display text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold leading-tight tracking-tight text-snow">
                  Prefer to hire through <span className="text-aurora">Freelancer</span>?
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-mist">
                  Invite me to bid on your project or send an offer through my profile — or reach out directly and
                  we&rsquo;ll use whatever works best for you.
                </p>
              </div>
              <MagneticButton href={freelancer.url} external className="shrink-0">
                <FreelancerIcon size={15} />
                Hire me on Freelancer
                <ArrowUpRightIcon size={14} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>

      {/* portalled to <body> so it sits above the fixed nav, outside <main>'s stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {gallery && (
              <Lightbox
                key={gallery.work}
                work={freelanceWork[gallery.work]}
                start={gallery.image}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
