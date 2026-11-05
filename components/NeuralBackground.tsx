"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Full-page neural network: drifting nodes link up when close, the cursor pulls
 * nearby nodes toward it, and bright "signals" hop node-to-node along the links.
 * Plain 2D canvas — cheaper than WebGL for a few hundred lines.
 */

const COLORS = ["61,139,255", "46,230,214", "155,123,255"];
const LINK = 150;
const MOUSE_LINK = 190;

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
type Pulse = { a: number; b: number; t: number; speed: number; hops: number; c: string };

export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = performance.now();
    let spawnClock = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(105, Math.max(34, Math.round((w * h) / 15500)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.8 + Math.random() * 1.5,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      pulses = [];
    };

    const neighbours = (i: number, exclude = -1) => {
      const a = nodes[i];
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i || j === exclude) continue;
        const dx = nodes[j].x - a.x;
        const dy = nodes[j].y - a.y;
        if (dx * dx + dy * dy < LINK * LINK) out.push(j);
      }
      return out;
    };

    const spawnPulse = () => {
      if (pulses.length > 14 || !nodes.length) return;
      const a = Math.floor(Math.random() * nodes.length);
      const n = neighbours(a);
      if (!n.length) return;
      pulses.push({
        a,
        b: n[Math.floor(Math.random() * n.length)],
        t: 0,
        speed: 0.014 + Math.random() * 0.014,
        hops: 2 + Math.floor(Math.random() * 4),
        c: nodes[a].c,
      });
    };

    const draw = (dt: number, animateIt: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (animateIt) {
        for (const n of nodes) {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -30) n.x = w + 30;
          else if (n.x > w + 30) n.x = -30;
          if (n.y < -30) n.y = h + 30;
          else if (n.y > h + 30) n.y = -30;

          // gentle pull toward the cursor, stopping short so nodes never pile up
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 240 && d > 70) {
              n.x += (dx / d) * 0.22 * dt;
              n.y += (dy / d) * 0.22 * dt;
            }
          }
        }
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.2;
          ctx.strokeStyle = `rgba(${a.c},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // cursor links
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d > MOUSE_LINK) continue;
          ctx.strokeStyle = `rgba(46,230,214,${(1 - d / MOUSE_LINK) * 0.42})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.c},0.14)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${n.c},0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!animateIt) return;

      // signals travelling along links
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        const a = nodes[p.a];
        const b = nodes[p.b];
        p.t += p.speed * dt;

        if (p.t >= 1) {
          p.hops--;
          const next = neighbours(p.b, p.a);
          if (p.hops <= 0 || !next.length) {
            pulses.splice(k, 1);
            continue;
          }
          p.a = p.b;
          p.b = next[Math.floor(Math.random() * next.length)];
          p.t = 0;
          continue;
        }

        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;

        // lit trail behind the signal
        ctx.strokeStyle = `rgba(${p.c},0.55)`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(0.3, `rgba(${p.c},0.8)`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50) / 16.67;
      last = now;
      spawnClock += dt;
      if (spawnClock > 20) {
        spawnClock = 0;
        spawnPulse();
      }
      draw(dt, true);
      raf = requestAnimationFrame(frame);
    };

    build();

    if (reduced) {
      draw(0, false);
    } else {
      raf = requestAnimationFrame(frame);
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduced) draw(0, false);
      }, 150);
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = e.pointerType === "mouse";
    };
    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="backdrop-layer" aria-hidden="true">
      <canvas ref={ref} className="h-full w-full opacity-80" />
      {/* vignette keeps the edges calm and the content readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,13,0.75)_100%)]" />
    </div>
  );
}
