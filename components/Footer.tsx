"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contact, navLinks, profile, resume } from "@/lib/data";
import {
  ClockIcon,
  DownloadIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons";

/** Live local time in Lutsk — rendered after mount so server and client agree. */
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 tabular-nums">
      <ClockIcon size={13} className="text-ice" />
      {now ?? "--:--:--"} in Lutsk
    </span>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // the outlined name fills with colour, left to right, as the footer scrolls in.
  // Keep explicit 0 and 1 stops: this offset runs on a native ViewTimeline, and
  // without them the browser blends back to the base style past the last stop.
  const clip = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"],
  );
  const nameY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { href: `mailto:${contact.email}`, label: "Email", icon: <MailIcon size={15} /> },
    { href: contact.linkedinLink, label: "LinkedIn", icon: <LinkedInIcon size={15} /> },
    { href: contact.telegramLink, label: "Telegram", icon: <TelegramIcon size={15} /> },
    { href: contact.whatsappLink, label: "WhatsApp", icon: <WhatsAppIcon size={15} /> },
  ];

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-white/[0.06] px-5 pt-16 sm:px-8">
      {/* horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-72 opacity-45 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center,#1d4ed8 0%,transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl">
                <span className="absolute -inset-2 animate-spin-slow bg-[conic-gradient(from_0deg,#2ee6d6,#3d8bff,#9b7bff,#ffc14d,#2ee6d6)]" />
                <span className="absolute inset-[1.5px] rounded-[10px] bg-ink" />
                <span className="relative font-display text-sm font-bold text-snow">{profile.initials}</span>
              </span>
              <div>
                <p className="font-display text-[14px] font-semibold text-snow">{profile.name}</p>
                <p className="text-[12px] text-fog">{profile.title}</p>
              </div>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-mist">{profile.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Footer">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog">Navigate</p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => go(link.id)}
                      className="group relative text-[13px] text-mist transition-colors duration-300 hover:text-snow"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-ice to-azure transition-all duration-300 group-hover:w-full" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog">Connect</p>
              <div className="mt-4 flex gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    whileHover={{ y: -4, scale: 1.1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    className="grid h-10 w-10 place-items-center rounded-full glass text-mist transition-colors duration-300 hover:text-ice"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
              <a
                href={resume.file}
                download={resume.fileName}
                className="group mt-5 inline-flex items-center gap-2 text-[13px] text-mist transition-colors hover:text-snow"
              >
                <DownloadIcon size={14} className="transition-transform group-hover:translate-y-0.5" />
                Download resume
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2.5 block break-all text-[13px] text-mist transition-colors hover:text-ice"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* giant name: an outline that fills with gradient as you reach the bottom */}
        <motion.div
          className="relative mt-16 select-none font-display text-[clamp(3.5rem,17vw,14rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ y: nameY }}
          aria-hidden="true"
        >
          <span className="text-outline block">{profile.firstName}</span>
          <motion.span
            className="absolute inset-0 block bg-gradient-to-r from-ice via-azure to-plasma bg-clip-text text-transparent"
            style={{ clipPath: clip }}
          >
            {profile.firstName}
          </motion.span>
        </motion.div>

        <div className="hairline relative mt-6" />

        <div className="relative flex flex-col items-center justify-between gap-3 py-7 text-[11.5px] text-fog sm:flex-row">
          {/* the name may end in a period — strip it so the sentence never doubles one */}
          <p>
            © {new Date().getFullYear()} {profile.name.replace(/\.$/, "")}. All rights reserved.
          </p>
          <LocalTime />
          <p>Built with Next.js · Three.js · Motion</p>
        </div>
      </div>
    </footer>
  );
}
