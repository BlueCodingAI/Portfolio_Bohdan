# Bohdan Andriichuk — Portfolio

An animated personal portfolio built around an "AI / neural" theme: a live neural-network
backdrop, a WebGL particle sculpture that morphs between shapes, and scroll-driven motion
in every section.

## Stack

| Layer     | Choice                                                     |
| --------- | ---------------------------------------------------------- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript            |
| Styling   | Tailwind CSS v4 (theme tokens live in `app/globals.css`)   |
| Motion    | Motion (Framer Motion v12)                                 |
| 3D        | Three.js + React Three Fiber, custom GLSL shaders          |
| Fonts     | Sora (display) · Inter (body) · JetBrains Mono, via `next/font` |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Where to edit things

**All written content lives in one file: [`lib/data.ts`](lib/data.ts).** Change the
summary, roles, jobs, projects, skills or contact details there and every section updates.

| What                                    | Where                          |
| --------------------------------------- | ------------------------------ |
| Name, roles, bio, contacts, projects    | `lib/data.ts`                  |
| Colours, glass, glow, keyframes         | `app/globals.css`              |
| Résumé PDF (download links)             | `public/Bohdan-Andriichuk-Resume.pdf` |
| Hero particle shapes + shaders          | `components/ParticleMorph.tsx` |
| Background neural network               | `components/NeuralBackground.tsx` |
| Animated project previews               | `components/ProjectMocks.tsx`  |
| Reusable bits (reveal, tilt, magnetic…) | `components/ui.tsx`            |

To replace the résumé, drop a new PDF at `public/Bohdan-Andriichuk-Resume.pdf` (or change
`resume.file` in `lib/data.ts`).

## What moves

- **Preloader** — terminal boot log, self-drawing hexagon logo, curtains that split open.
- **Neural backdrop** — drifting nodes link up, the cursor pulls them in, signals hop along links.
- **Hero** — letter-by-letter 3D name reveal, a role line that "decodes" through random glyphs,
  and ~8,500 particles morphing sphere → torus knot → double helix → galaxy. Click the
  cloud (or the dots under it) to morph on demand; particles scatter away from the cursor.
- **Marquee** — two tickers whose speed and direction follow your scroll velocity.
- **About** — the intro lights up word by word as you scroll; a code window types itself.
- **Services** — bento cards with a light beam running around the border and live mini-visuals.
- **Skills** — each group's tools orbit a glowing core.
- **Journey** — a timeline spine that fills (with a comet head) as you scroll.
- **Work** — animated product previews: an AI chat that resizes across desktop / tablet /
  mobile, and an AI video studio that types a prompt, renders and plays a clip.
- **Approach** — on desktop the section pins and scrolls sideways.
- **Contact** — copy-to-clipboard channels and a quick-message form that opens the visitor's
  mail app (nothing is stored).
- **Footer** — the giant name fills with colour as you reach the bottom; live Lutsk clock.
- Custom cursor with labels and click ripples, magnetic buttons, 3D tilt cards, a
  hide-on-scroll nav and a back-to-top button with a progress ring.

## Accessibility & performance

- Honours `prefers-reduced-motion`: canvases render a single static frame, CSS animations
  are disabled, and scramble/typing effects show their final text immediately.
- The WebGL hero stops rendering once it scrolls out of view; particle count drops on
  small screens.
- The custom cursor only activates for fine pointers — touch devices are unaffected.
- Canvas layers are loaded with `next/dynamic` (`ssr: false`) to stay off the critical path.

## Two gotchas worth knowing

- **Shader uniforms:** `ParticleMorph` builds its `ShaderMaterial` with `new` and writes to
  `material.uniforms`. Passing a `uniforms` object as a JSX prop gets copied by React Three
  Fiber, so later `.value` writes would never reach the GPU.
- **Scroll transforms:** for `useScroll` offsets that Motion hardware-accelerates (e.g.
  `["start end", "end end"]`), give every `useTransform` input range explicit `0` and `1`
  stops. Past the last stop the browser blends back to the element's base style.

## Deploy

Push to a Git host and import the repo on Vercel — no configuration needed. Any host that
runs `npm run build` + `npm start` works too.
