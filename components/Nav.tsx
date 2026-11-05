"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { contact, navLinks, profile, resume } from "@/lib/data";
import { useActiveSection, useIntroDone } from "@/lib/hooks";
import {
  DownloadIcon,
  FreelancerIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { EASE } from "@/components/ui";

// "hero" is tracked too, so nothing is highlighted while you are at the top
const SECTION_IDS = ["hero", ...navLinks.map((l) => l.id)];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection(SECTION_IDS);
  const ready = useIntroDone();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // tuck the bar away while reading downward, bring it back on any upward scroll
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    if (v > prev + 4 && v > 380) setHidden(true);
    else if (v < prev - 4 || v < 380) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* reading-progress meter pinned to the very top */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-ice via-azure to-plasma"
        style={{ scaleX: progress }}
      />

      <motion.header
        className={`fixed inset-x-0 top-0 z-[70] transition-[padding] duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        initial={{ y: -110, opacity: 0 }}
        animate={
          ready
            ? { y: hidden && !open ? -110 : 0, opacity: 1 }
            : { y: -110, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl">
              {/* conic ring that spins faster on hover */}
              <span className="absolute -inset-2 animate-spin-slow bg-[conic-gradient(from_0deg,#2ee6d6,#3d8bff,#9b7bff,#ffc14d,#2ee6d6)] transition-[animation-duration] group-hover:[animation-duration:2s]" />
              <span className="absolute inset-[1.5px] rounded-[10px] bg-ink" />
              <span className="relative font-display text-sm font-bold tracking-tight text-snow">
                {profile.initials}
              </span>
            </span>
            {/* name hides at md–lg, where the seven-link pill needs the room */}
            <span className="hidden flex-col items-start leading-tight sm:flex md:hidden xl:flex">
              <span className="font-display text-sm font-semibold tracking-wide text-snow">
                {profile.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                AI · Full-Stack
              </span>
            </span>
          </button>

          {/* desktop pill */}
          <div
            className={`hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 md:flex ${
              scrolled ? "glass-strong glow" : "glass"
            }`}
            onPointerLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  onPointerEnter={() => setHovered(link.id)}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 lg:px-4 ${
                    isActive ? "text-ink" : "text-mist hover:text-snow"
                  }`}
                >
                  {hovered === link.id && !isActive && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-ice to-azure"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={resume.file}
              download={resume.fileName}
              className="group hidden items-center gap-2 rounded-full glass px-4 py-2.5 text-[13px] font-medium text-mist transition-colors duration-300 hover:text-snow lg:inline-flex"
            >
              <DownloadIcon
                size={14}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              Resume
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="group relative hidden overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-semibold text-ink md:inline-flex"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber via-[#ffd884] to-ice" />
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span className="relative">Let&rsquo;s Talk</span>
            </a>

            {/* mobile trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-[75] grid h-11 w-11 place-items-center rounded-full glass md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full bg-snow"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 top-[6px] block h-[1.5px] w-full bg-snow"
                  animate={open ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full bg-snow"
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay — must stay BELOW the header's z-[70] so the close button stays on top */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            <nav className="relative flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => go(link.id)}
                  initial={{ opacity: 0, y: 30, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: EASE }}
                  className="group flex items-baseline gap-3 py-1.5"
                >
                  <span className="font-mono text-[11px] text-ice">0{i + 1}</span>
                  <span
                    className={`font-display text-[2rem] font-bold tracking-tight transition-colors ${
                      active === link.id ? "text-aurora" : "text-mist group-hover:text-snow"
                    }`}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.a
              href={resume.file}
              download={resume.fileName}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative mt-8 inline-flex items-center gap-2.5 rounded-full glass px-6 py-3 text-sm font-semibold text-snow"
            >
              <DownloadIcon size={16} />
              Download Resume
            </motion.a>

            <motion.div
              className="relative mt-8 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { href: `mailto:${contact.email}`, label: "Email", icon: <MailIcon size={17} /> },
                { href: contact.freelancerLink, label: "Freelancer", icon: <FreelancerIcon size={17} /> },
                { href: contact.linkedinLink, label: "LinkedIn", icon: <LinkedInIcon size={17} /> },
                { href: contact.telegramLink, label: "Telegram", icon: <TelegramIcon size={17} /> },
                { href: contact.whatsappLink, label: "WhatsApp", icon: <WhatsAppIcon size={17} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full glass text-mist"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>

            <motion.p
              className="relative mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-fog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {profile.city}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
