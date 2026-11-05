"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { contact, freelancer, resume } from "@/lib/data";
import { Aurora, EASE, MagneticButton, Reveal, SectionHeading, Twinkle } from "@/components/ui";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FreelancerIcon,
  LinkedInIcon,
  MailIcon,
  SendIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons";

/* -------------------------------------------------------------- channels --- */

type Channel = {
  label: string;
  value: string;
  href: string;
  copy?: string;
  icon: ReactNode;
  accent: string;
  /** short proof chip beside the label */
  badge?: string;
};

const CHANNELS: Channel[] = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copy: contact.email,
    icon: <MailIcon size={19} />,
    accent: "#2ee6d6",
  },
  {
    label: "Email · Outlook",
    value: contact.emailAlt,
    href: `mailto:${contact.emailAlt}`,
    copy: contact.emailAlt,
    icon: <MailIcon size={19} />,
    accent: "#3d8bff",
  },
  {
    label: "WhatsApp",
    value: contact.whatsapp,
    href: contact.whatsappLink,
    copy: contact.whatsapp,
    icon: <WhatsAppIcon size={19} />,
    accent: "#34d399",
  },
  {
    label: "Telegram",
    value: contact.telegram,
    href: contact.telegramLink,
    copy: contact.telegram,
    icon: <TelegramIcon size={19} />,
    accent: "#9b7bff",
  },
  {
    label: "LinkedIn",
    value: contact.linkedin,
    href: contact.linkedinLink,
    icon: <LinkedInIcon size={19} />,
    accent: "#ffc14d",
  },
  {
    label: "Freelancer",
    value: contact.freelancer,
    href: contact.freelancerLink,
    copy: contact.freelancerLink,
    icon: <FreelancerIcon size={19} />,
    accent: "#29b2fe",
    badge: `★ ${freelancer.rating.toFixed(1)}`,
  },
];

function ChannelRow({ channel, index }: { channel: Channel; index: number }) {
  const [copied, setCopied] = useState(false);
  const external = !channel.href.startsWith("mailto:");

  const copy = async () => {
    if (!channel.copy) return;
    try {
      await navigator.clipboard.writeText(channel.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked (insecure context / permissions) — the link still works
    }
  };

  return (
    <motion.div
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-colors duration-300 hover:bg-white/[0.04]"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={{ x: 6 }}
    >
      {/* accent bar that grows on hover */}
      <span
        className="absolute inset-y-3 left-0 w-[3px] origin-center scale-y-0 rounded-full transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: channel.accent }}
      />
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: channel.accent }}
      />

      <span
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
        style={{ background: `${channel.accent}18`, color: channel.accent, boxShadow: `inset 0 0 18px ${channel.accent}22` }}
      >
        {channel.icon}
      </span>

      <a
        href={channel.href}
        target={external ? "_blank" : undefined}
        rel="noreferrer noopener"
        className="min-w-0 flex-1 after:absolute after:inset-0 after:rounded-2xl"
      >
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          {channel.label}
          {channel.badge && (
            <span className="whitespace-nowrap rounded-full bg-amber/10 px-2 py-px normal-case tracking-normal text-amber">
              {channel.badge}
            </span>
          )}
        </span>
        <span className="mt-1 block truncate font-display text-[14px] font-semibold text-snow">{channel.value}</span>
      </a>

      {channel.copy && (
        <button
          onClick={copy}
          className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-fog transition-colors duration-300 hover:border-white/25 hover:text-snow"
          aria-label={`Copy ${channel.label}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "ok" : "copy"}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              className={copied ? "text-emerald-400" : ""}
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            </motion.span>
          </AnimatePresence>
        </button>
      )}

      <ArrowUpRightIcon
        size={16}
        className="pointer-events-none relative shrink-0 text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-snow"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ form --- */

const TOPICS = ["New project", "Full-time role", "Contract work", "Just saying hi"];

function Field({
  id,
  label,
  value,
  onChange,
  textarea,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "peer w-full rounded-xl border border-white/10 bg-ink/50 px-4 pb-2.5 pt-6 text-[14px] text-snow outline-none transition-colors duration-300 placeholder:text-transparent focus:border-azure/50 focus:bg-ink/70";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={label}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          placeholder={label}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      {/* floating label: sits in the field when empty, rises on focus or input */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:font-mono peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-ice"
      >
        {label}
      </label>
      <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-ice via-azure to-plasma transition-transform duration-500 peer-focus:scale-x-100" />
    </div>
  );
}

function QuickMessage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `${topic} — from ${name.trim() || "your portfolio"}`;
    const body = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={submit} className="relative h-full overflow-hidden rounded-3xl glass-strong p-6 sm:p-9">
      <span className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-azure/25 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-plasma/20 blur-3xl" />

      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice">Quick message</p>
        <h3 className="mt-3 font-display text-[1.65rem] font-bold leading-tight tracking-tight">
          Tell me what you&rsquo;re <span className="text-aurora">building</span>
        </h3>

        <div className="mt-7 flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
          {TOPICS.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setTopic(t)}
                className={`relative rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors duration-300 ${
                  on ? "text-ink" : "border border-white/10 text-mist hover:text-snow"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="topic-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-ice to-azure"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4">
          <Field id="cf-name" label="Your name" value={name} onChange={setName} required />
          <Field id="cf-message" label="A few words about the project" value={message} onChange={setMessage} textarea required />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <MagneticButton type="submit">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={sent ? "sent" : "send"}
                className="flex items-center gap-2.5"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {sent ? (
                  <>
                    Opening your mail app
                    <CheckIcon size={15} />
                  </>
                ) : (
                  <>
                    Send message
                    <SendIcon size={15} />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </MagneticButton>
          <p className="text-[11.5px] leading-snug text-fog">
            Opens your email app with the message ready.
            <br className="hidden sm:block" /> Nothing is stored on this site.
          </p>
        </div>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- section --- */

export default function Contact() {
  return (
    <section id="contact" className="noise section-pad relative overflow-hidden">
      <Aurora className="left-1/2 top-[4%] h-[40rem] w-[40rem] -translate-x-1/2" color="#1d4ed8" opacity={0.26} />
      <Twinkle top="14%" left="10%" size={3} delay={0.4} color="#2ee6d6" />
      <Twinkle top="32%" left="91%" size={2} delay={1.6} color="#ffc14d" />
      <Twinkle top="78%" left="18%" size={2} delay={2.3} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          index="08"
          title="Let’s build something"
          accent="intelligent together"
          blurb="Freelance, contract or full-time — if you have an AI product, a web app or a mobile experience in mind, reach out on any channel below or hire me through Freelancer."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <QuickMessage />
          </Reveal>

          <div className="flex flex-col gap-3">
            {CHANNELS.map((c, i) => (
              <ChannelRow key={c.label} channel={c} index={i} />
            ))}

            <motion.a
              href={resume.file}
              download={resume.fileName}
              className="group relative mt-1 flex items-center justify-between overflow-hidden rounded-2xl border border-dashed border-azure/30 p-4 transition-colors duration-300 hover:border-ice/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              <span className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-snow transition-transform duration-300 group-hover:translate-y-0.5">
                  <DownloadIcon size={19} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">Resume · PDF</span>
                  <span className="mt-1 block font-display text-[14px] font-semibold text-snow">
                    Download full résumé
                  </span>
                </span>
              </span>
              <span className="font-mono text-[11px] text-ice opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                .pdf ↓
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
