"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ----------------------------------------------------------- media query --- */

/** Respects the OS "reduce motion" setting so heavy animation can be disabled. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True once the viewport is at least `px` wide. Starts false for SSR safety. */
export function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [px]);

  return matches;
}

/* -------------------------------------------------------- active section --- */

/** Tracks which section id is currently filling the viewport, for nav highlighting. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* ------------------------------------------------------------ intro gate --- */

/*
 * The preloader covers the page for ~2s. Anything with an entrance animation
 * above the fold waits for this signal, otherwise the animation would play
 * (unseen) behind the curtain.
 */
let introDone = false;
const introListeners = new Set<() => void>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((l) => l());
}

function subscribeIntro(cb: () => void) {
  introListeners.add(cb);
  return () => {
    introListeners.delete(cb);
  };
}

export function useIntroDone() {
  return useSyncExternalStore(
    subscribeIntro,
    () => introDone,
    () => false,
  );
}

/* -------------------------------------------------------------- scramble --- */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\_";

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * "Decodes" text: characters flicker through random glyphs before settling,
 * sweeping left to right. Re-runs whenever `target` changes while `active`,
 * morphing from whatever is currently displayed.
 */
export function useScramble(target: string, active = true, duration = 0.9) {
  const [text, setText] = useState(target);
  const shown = useRef(target);
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) {
      shown.current = target;
      setText(target);
      return;
    }

    // first activation decodes in from nothing; later runs morph old → new
    const from = started.current ? shown.current : "";
    started.current = true;

    const len = Math.max(from.length, target.length);
    const ms = duration * 1000;
    const plan = Array.from({ length: len }, (_, i) => {
      const start = (i / Math.max(len, 1)) * ms * 0.45 + Math.random() * ms * 0.15;
      return {
        start,
        end: start + ms * 0.2 + Math.random() * ms * 0.3,
        glyph: randomGlyph(),
      };
    });

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = now - t0;
      let out = "";
      let settled = 0;

      for (let i = 0; i < len; i++) {
        const p = plan[i];
        const to = target[i] ?? "";
        if (t >= p.end) {
          out += to;
          settled++;
        } else if (t >= p.start) {
          if (to === " ") {
            out += " ";
          } else {
            if (Math.random() < 0.28) p.glyph = randomGlyph();
            out += p.glyph;
          }
        } else {
          out += from[i] ?? "";
        }
      }

      if (settled === len) {
        shown.current = target;
        setText(target);
        return;
      }

      shown.current = out;
      setText(out);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduced, duration]);

  return text;
}
