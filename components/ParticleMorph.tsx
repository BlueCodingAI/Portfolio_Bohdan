"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Thousands of points that flow between four shapes. Every shape is baked into
 * its own attribute up front; the vertex shader blends from one to the next with
 * a per-particle delay, so each morph ripples through the cloud instead of
 * moving in lockstep. The cursor pushes particles away.
 */

export const SHAPE_COUNT = 4;
const HOLD = 3.6; // seconds a shape rests before the next morph
const MORPH = 2.4; // seconds a morph takes

/* ------------------------------------------------------------- shaders --- */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uFrom;
  uniform float uTo;
  uniform float uProgress;
  uniform float uIntro;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  uniform float uMouseStrength;

  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aScatter;
  attribute float aSeed;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  vec3 shapeAt(float i) {
    if (i < 0.5) return position;
    if (i < 1.5) return aS1;
    if (i < 2.5) return aS2;
    return aS3;
  }

  void main() {
    // staggered morph: each particle starts and lands at its own moment
    float delay = aSeed * 0.42;
    float t = clamp((uProgress - delay) / 0.58, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(shapeAt(uFrom), shapeAt(uTo), t);

    // particles swirl outward mid-flight, then settle
    float burst = sin(t * 3.14159);
    p += vec3(
      sin(uTime * 1.3 + aSeed * 40.0 + p.y * 3.0),
      cos(uTime * 1.1 + aSeed * 30.0 + p.x * 3.0),
      sin(uTime * 0.9 + aSeed * 20.0 + p.z * 3.0)
    ) * (0.018 + burst * 0.32);

    // intro: condense from a wide scattered cloud
    float it = clamp((uIntro - aSeed * 0.35) / 0.65, 0.0, 1.0);
    it = 1.0 - pow(1.0 - it, 3.0);
    p = mix(aScatter, p, it);

    // breathing
    p *= 1.0 + sin(uTime * 0.8 + aSeed * 6.2831) * 0.012;

    vec4 world = modelMatrix * vec4(p, 1.0);

    // cursor repulsion (world space, so it stays put while the cloud spins)
    vec3 d = world.xyz - uMouse;
    float dist = length(d);
    float push = smoothstep(0.95, 0.0, dist) * uMouseStrength;
    world.xyz += normalize(d + vec3(0.0001)) * push * 0.5;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    gl_PointSize = uSize * (0.55 + aSeed * 0.9) * uPixelRatio / -mv.z;

    vColor = aColor + push * vec3(0.35, 0.5, 0.6);
    vAlpha = (0.5 + 0.5 * sin(uTime * 2.0 + aSeed * 50.0)) * (0.35 + 0.65 * it);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 1.6) * (0.4 + vAlpha * 0.6);
    gl_FragColor = vec4(vColor, a * 0.85);
  }
`;

/* -------------------------------------------------------------- shapes --- */

/** Seeded PRNG so the cloud looks identical every visit. */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(count: number) {
  const rand = mulberry32(7);
  const sphere = new Float32Array(count * 3);
  const knot = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const galaxy = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const golden = Math.PI * (3 - Math.sqrt(5));
  const ice = new THREE.Color("#2ee6d6");
  const azure = new THREE.Color("#3d8bff");
  const plasma = new THREE.Color("#9b7bff");
  const amber = new THREE.Color("#ffc14d");
  const white = new THREE.Color("#eef3ff");
  const c = new THREE.Color();

  // the galaxy is generated flat, then tilted toward the camera
  const tilt = 1.1;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    /* sphere — fibonacci lattice */
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 1.5 * (0.97 + rand() * 0.06);
    sphere[i3] = Math.cos(th) * ring * R;
    sphere[i3 + 1] = y * R;
    sphere[i3 + 2] = Math.sin(th) * ring * R;

    /* torus knot (2, 3) with a soft tube */
    const t = rand() * Math.PI * 2;
    const kr = 0.6 * (2 + Math.cos(3 * t));
    const u = rand() * Math.PI * 2;
    const v = Math.acos(2 * rand() - 1);
    const tube = 0.2 * Math.sqrt(rand());
    knot[i3] = (kr * Math.cos(2 * t) + tube * Math.sin(v) * Math.cos(u)) * 0.88;
    knot[i3 + 1] = (kr * Math.sin(2 * t) + tube * Math.sin(v) * Math.sin(u)) * 0.88;
    knot[i3 + 2] = (-0.6 * Math.sin(3 * t) + tube * Math.cos(v)) * 0.88;

    /* double helix — two strands plus base-pair rungs */
    const jitter = () => (rand() - 0.5) * 0.07;
    if (rand() < 0.72) {
      const ht = rand();
      const ang = ht * Math.PI * 4 + (i % 2) * Math.PI;
      helix[i3] = Math.cos(ang) * 0.8 + jitter();
      helix[i3 + 1] = (ht - 0.5) * 3.4 + jitter();
      helix[i3 + 2] = Math.sin(ang) * 0.8 + jitter();
    } else {
      const rung = Math.floor(rand() * 22);
      const ht = (rung + 0.5) / 22;
      const ang = ht * Math.PI * 4;
      const s = rand() * 2 - 1;
      helix[i3] = Math.cos(ang) * 0.8 * s + jitter() * 0.3;
      helix[i3 + 1] = (ht - 0.5) * 3.4 + jitter() * 0.3;
      helix[i3 + 2] = Math.sin(ang) * 0.8 * s + jitter() * 0.3;
    }

    /* spiral galaxy — three arms, denser toward the core */
    const gr = Math.pow(rand(), 0.7) * 2.0 + 0.05;
    const branch = ((i % 3) / 3) * Math.PI * 2;
    const spin = gr * 1.9;
    const off = () => Math.pow(rand(), 3) * (rand() < 0.5 ? 1 : -1) * 0.38;
    const gx = Math.cos(branch + spin) * gr + off();
    const gy = off() * 0.45;
    const gz = Math.sin(branch + spin) * gr + off();
    galaxy[i3] = gx;
    galaxy[i3 + 1] = gy * ct - gz * st;
    galaxy[i3 + 2] = gy * st + gz * ct;

    /* intro cloud */
    const sd = 3 + rand() * 4;
    const su = rand() * Math.PI * 2;
    const sv = Math.acos(2 * rand() - 1);
    scatter[i3] = Math.sin(sv) * Math.cos(su) * sd;
    scatter[i3 + 1] = Math.sin(sv) * Math.sin(su) * sd;
    scatter[i3 + 2] = Math.cos(sv) * sd - 2;

    seeds[i] = rand();

    /* colour: ice → azure → plasma by height, with rare amber and white sparks */
    const pick = rand();
    if (pick < 0.035) c.copy(amber);
    else if (pick < 0.065) c.copy(white);
    else {
      const k = (y + 1) / 2;
      if (k < 0.5) c.copy(ice).lerp(azure, k * 2);
      else c.copy(azure).lerp(plasma, (k - 0.5) * 2);
    }
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  return { sphere, knot, helix, galaxy, scatter, seeds, colors };
}

/* ----------------------------------------------------------- particles --- */

export type MorphCommand = { shape: number; id: number } | null;

function Particles({
  count,
  ready,
  reduced,
  command,
  hovering,
  onShapeChange,
}: {
  count: number;
  ready: boolean;
  reduced: boolean;
  command: MorphCommand;
  hovering: RefObject<boolean>;
  onShapeChange?: (shape: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const { gl, size, invalidate } = useThree();

  const geometry = useMemo(() => {
    const s = buildShapes(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(s.sphere, 3));
    g.setAttribute("aS1", new THREE.BufferAttribute(s.knot, 3));
    g.setAttribute("aS2", new THREE.BufferAttribute(s.helix, 3));
    g.setAttribute("aS3", new THREE.BufferAttribute(s.galaxy, 3));
    g.setAttribute("aScatter", new THREE.BufferAttribute(s.scatter, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(s.seeds, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(s.colors, 3));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  /*
   * Build the material ourselves and drive ITS uniforms. Passing a `uniforms`
   * object as a JSX prop gets copied by R3F, so later `.value` writes would
   * never reach the GPU.
   */
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uFrom: { value: 0 },
          uTo: { value: 0 },
          uProgress: { value: 1 },
          uIntro: { value: 0 },
          uSize: { value: 24 },
          uPixelRatio: { value: 1 },
          uMouse: { value: new THREE.Vector3(99, 99, 0) },
          uMouseStrength: { value: 0 },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  const uniforms = material.uniforms as {
    uTime: { value: number };
    uFrom: { value: number };
    uTo: { value: number };
    uProgress: { value: number };
    uIntro: { value: number };
    uSize: { value: number };
    uPixelRatio: { value: number };
    uMouse: { value: THREE.Vector3 };
    uMouseStrength: { value: number };
  };

  // keep point size proportional to the canvas so phones don't get a white blob
  useEffect(() => {
    uniforms.uPixelRatio.value = gl.getPixelRatio();
    uniforms.uSize.value = 26 * THREE.MathUtils.clamp(size.height / 560, 0.6, 1.15);
    invalidate();
  }, [gl, size.height, uniforms, invalidate]);

  useEffect(() => {
    if (reduced) {
      uniforms.uIntro.value = 1;
      invalidate();
    }
  }, [reduced, uniforms, invalidate]);

  const state = useRef({ from: 0, to: 0, progress: 1, phase: "hold" as "hold" | "morph", timer: 0, spin: 0 });
  const requested = useRef<number | null>(null);
  const shapeCb = useRef(onShapeChange);

  useEffect(() => {
    shapeCb.current = onShapeChange;
  }, [onShapeChange]);

  useEffect(() => {
    if (command) {
      requested.current = command.shape;
      invalidate();
    }
  }, [command, invalidate]);

  const ray = useMemo(() => new THREE.Vector3(), []);
  const mouseTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = state.current;
    const u = uniforms;

    if (!reduced) u.uTime.value += dt;
    if (ready) u.uIntro.value = Math.min(1, u.uIntro.value + dt / 2.4);

    /* shape cycle */
    if (s.phase === "hold") {
      s.timer += dt;
      let next = -1;
      if (requested.current !== null) {
        if (requested.current !== s.to) next = requested.current;
        requested.current = null;
      } else if (!reduced && ready && u.uIntro.value >= 1 && s.timer > HOLD) {
        next = (s.to + 1) % SHAPE_COUNT;
      }
      if (next >= 0) {
        s.from = s.to;
        s.to = next;
        s.progress = reduced ? 1 : 0;
        s.phase = reduced ? "hold" : "morph";
        s.timer = 0;
        shapeCb.current?.(next);
      }
    } else {
      s.progress = Math.min(1, s.progress + dt / MORPH);
      if (s.progress >= 1) {
        s.phase = "hold";
        s.timer = 0;
      }
    }
    u.uFrom.value = s.from;
    u.uTo.value = s.to;
    u.uProgress.value = s.progress;

    /* pointer → a point on the z = 0 plane */
    const { pointer, camera } = frame;
    ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const distance = -camera.position.z / ray.z;
    mouseTarget.copy(camera.position).addScaledVector(ray, distance);
    u.uMouse.value.lerp(mouseTarget, 0.2);
    const wantStrength = hovering.current ? 1 : 0;
    u.uMouseStrength.value += (wantStrength - u.uMouseStrength.value) * 0.08;

    /* slow spin, leaning toward the cursor */
    const g = group.current;
    if (g && !reduced) {
      s.spin += dt * 0.16;
      const lean = hovering.current ? 1 : 0.35;
      g.rotation.y += (s.spin + pointer.x * 0.45 * lean - g.rotation.y) * 0.07;
      g.rotation.x += (-pointer.y * 0.3 * lean + 0.15 - g.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

/* --------------------------------------------------------------- canvas --- */

export default function ParticleMorph({
  className = "",
  ready,
  command,
  onShapeChange,
}: {
  className?: string;
  ready: boolean;
  command: MorphCommand;
  onShapeChange?: (shape: number) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  // chosen once — this component is client-only, so window is available
  const [count] = useState(() => (window.innerWidth < 768 ? 4200 : 8500));

  // stop rendering entirely once the hero is scrolled out of view
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={className}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={() => {
        hovering.current = false;
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <Particles
          count={count}
          ready={ready}
          reduced={reduced}
          command={command}
          hovering={hovering}
          onShapeChange={onShapeChange}
        />
      </Canvas>
    </div>
  );
}
