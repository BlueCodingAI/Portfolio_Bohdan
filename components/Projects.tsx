"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "@/lib/data";
import { Aurora, EASE, Pill, SectionHeading, Twinkle } from "@/components/ui";
import { ChatMock, VideoMock } from "@/components/ProjectMocks";
import { BriefcaseIcon, CheckIcon } from "@/components/icons";

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

  // the preview drifts against the scroll, the giant index number drifts with it
  const previewY = useTransform(smooth, [0, 1], [70, -70]);
  const previewRotate = useTransform(smooth, [0, 0.5, 1], [flip ? -3 : 3, 0, flip ? 2 : -2]);
  const numberY = useTransform(smooth, [0, 1], [-60, 90]);

  return (
    <div ref={ref} className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* oversized index number behind the row */}
      <motion.span
        aria-hidden="true"
        style={{ y: numberY }}
        className={`text-outline pointer-events-none absolute -top-24 select-none font-display text-[clamp(7rem,20vw,15rem)] font-bold leading-none opacity-60 ${
          flip ? "right-0 lg:-right-6" : "left-0 lg:-left-6"
        }`}
      >
        {project.index}
      </motion.span>

      {/* ------------------------------------------------------- preview */}
      <motion.div
        className={`relative ${flip ? "lg:order-2" : ""}`}
        style={{ y: previewY, rotate: previewRotate }}
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: EASE }}
        data-cursor="Preview"
      >
        <div
          className="absolute -inset-6 rounded-[2rem] opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}, transparent 70%)` }}
        />
        <div className="relative">{project.mock === "chat" ? <ChatMock /> : <VideoMock />}</div>
      </motion.div>

      {/* ------------------------------------------------------- content */}
      <div className={`relative ${flip ? "lg:order-1" : ""}`}>
        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="font-mono text-[12px]" style={{ color: project.accent }}>
            {project.index}
          </span>
          <span className="h-px w-10" style={{ background: project.accent }} />
          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
            {project.kind}
          </span>
        </motion.div>

        <div className="mt-5 overflow-hidden pb-1">
          <motion.h3
            className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-tight text-snow"
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {project.title}
          </motion.h3>
        </div>

        <motion.p
          className="mt-2 font-display text-[17px] font-medium"
          style={{ color: project.accent }}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          {project.subtitle}
        </motion.p>

        <motion.p
          className="mt-5 text-[15px] leading-relaxed text-mist"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {project.description}
        </motion.p>

        <ul className="mt-7 space-y-3.5">
          {project.highlights.map((h, i) => (
            <motion.li
              key={i}
              className="flex gap-3 text-[14px] leading-relaxed text-snow/85"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
            >
              <motion.span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                style={{ background: `${project.accent}22`, color: project.accent }}
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 + i * 0.1 }}
              >
                <CheckIcon size={11} />
              </motion.span>
              <span>{h}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-7 flex items-center gap-2.5 text-[12.5px] text-fog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <BriefcaseIcon size={14} className="text-mist" />
          My role: <span className="text-snow">{project.role}</span>
        </motion.div>

        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
        >
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1 } }}
            >
              <Pill>{tech}</Pill>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="noise section-pad relative overflow-hidden">
      <Aurora className="right-[-10%] top-[8%] h-[36rem] w-[36rem]" color="#1d4ed8" opacity={0.2} />
      <Aurora className="bottom-[10%] left-[-12%] h-[32rem] w-[32rem]" color="#0f766e" delay={-14} opacity={0.18} />
      <Twinkle top="12%" left="6%" size={3} delay={1.4} color="#ffc14d" />
      <Twinkle top="62%" left="95%" size={2} delay={0.2} color="#9b7bff" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          index="05"
          title="AI products I helped"
          accent="bring to life"
          blurb="Two AI platforms — one built around conversation, one around generative video — each delivered end to end across every screen size."
        />

        <div className="mt-24 space-y-32 lg:space-y-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <motion.p
          className="mt-24 text-center text-[12.5px] text-fog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Previews are animated illustrations of each product&rsquo;s core flow. Happy to walk through the
          architecture and implementation on a call.
        </motion.p>
      </div>
    </section>
  );
}
