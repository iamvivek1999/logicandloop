"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type Ring = "logic" | "loop" | null;

const INK = "#1B1E22";
const COBALT = "#1B5650";
const SIGNAL = "#F0AB16";

/** A 3D lemniscate (∞). The z lift separates the two strands where they cross. */
class Infinity3D extends THREE.Curve<THREE.Vector3> {
  a: number;
  lift: number;
  constructor(a = 2.8, lift = 0.75) {
    super();
    this.a = a;
    this.lift = lift;
  }
  getPoint(u: number, target = new THREE.Vector3()) {
    const t = u * Math.PI * 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const d = 1 + s * s;
    return target.set((this.a * c) / d, (this.a * s * c) / d, this.lift * s);
  }
}

const TUBE_R = 0.46;
const SEG = 220; // segments along the loop
const RAD = 14; // segments around the tube

/** Blueprint-style tube: lengthwise lines plus cross-section rings, split into the Logic (left) and Loop (right) halves. */
function buildTube(curve: Infinity3D) {
  const frames = curve.computeFrenetFrames(SEG, true);
  const pts: THREE.Vector3[][] = [];
  for (let i = 0; i <= SEG; i++) {
    const p = curve.getPointAt((i % SEG) / SEG);
    const N = frames.normals[i % SEG];
    const B = frames.binormals[i % SEG];
    const ring: THREE.Vector3[] = [];
    for (let j = 0; j < RAD; j++) {
      const v = (j / RAD) * Math.PI * 2;
      ring.push(p.clone().addScaledVector(N, Math.cos(v) * TUBE_R).addScaledVector(B, Math.sin(v) * TUBE_R));
    }
    pts.push(ring);
  }
  const left: number[] = [];
  const right: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) => {
    const arr = (a.x + b.x) / 2 < 0 ? left : right;
    arr.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };
  for (let i = 0; i < SEG; i++) {
    for (let j = 0; j < RAD; j++) {
      push(pts[i][j], pts[i + 1][j]);
      if (i % 4 === 0) push(pts[i][j], pts[i][(j + 1) % RAD]);
    }
  }
  const geo = (arr: number[]) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    return g;
  };
  return { left: geo(left), right: geo(right) };
}

function Nodes({ curve, hovered, reduced }: { curve: Infinity3D; hovered: Ring; reduced: boolean }) {
  const COUNT = 9;
  const refs = useRef<THREE.Mesh[]>([]);
  const u = useRef(Array.from({ length: COUNT }, (_, i) => i / COUNT));
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    u.current.forEach((val, i) => {
      if (!reduced) u.current[i] = (val + dt * (hovered ? 0.12 : 0.045)) % 1;
      const m = refs.current[i];
      if (!m) return;
      curve.getPointAt(u.current[i], tmp);
      m.position.copy(tmp);
      const side = tmp.x < 0 ? "logic" : "loop";
      const s = hovered === side ? 1.35 : 1;
      m.scale.setScalar(m.scale.x + (s - m.scale.x) * 0.15);
    });
  });
  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} ref={(m) => { if (m) refs.current[i] = m; }}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshBasicMaterial color={SIGNAL} />
        </mesh>
      ))}
    </>
  );
}

function InfinityLoop({ hovered, setHovered, reduced }: { hovered: Ring; setHovered: (r: Ring) => void; reduced: boolean }) {
  const curve = useMemo(() => new Infinity3D(), []);
  const { left, right } = useMemo(() => buildTube(curve), [curve]);
  const hit = useMemo(() => new THREE.TubeGeometry(curve, 160, TUBE_R * 1.15, 8, true), [curve]);
  const centre = useMemo(() => curve.getSpacedPoints(300).map((p) => [p.x, p.y, p.z] as [number, number, number]), [curve]);

  const matL = useRef<THREE.LineBasicMaterial>(null);
  const matR = useRef<THREE.LineBasicMaterial>(null);
  const dash = useRef<any>(null);

  useFrame((_, dt) => {
    const ease = (m: THREE.LineBasicMaterial | null, side: "logic" | "loop", base: number) => {
      if (!m) return;
      const target = hovered === side ? 1 : hovered ? 0.16 : base;
      m.opacity += (target - m.opacity) * 0.12;
    };
    ease(matL.current, "logic", 0.5);
    ease(matR.current, "loop", 0.7);
    // the dashed centre line flows around the loop
    if (dash.current?.material && !reduced) dash.current.material.dashOffset -= dt * (hovered ? 1.6 : 0.6);
  });

  const local = useRef(new THREE.Vector3());
  const pick = (e: ThreeEvent<PointerEvent | MouseEvent>) => {
    e.stopPropagation();
    e.object.worldToLocal(local.current.copy(e.point));
    const side = local.current.x < 0 ? "logic" : "loop";
    if (side !== hovered) setHovered(side);
  };

  return (
    <group>
      <lineSegments geometry={left}>
        <lineBasicMaterial ref={matL} color={INK} transparent opacity={0.5} />
      </lineSegments>
      <lineSegments geometry={right}>
        <lineBasicMaterial ref={matR} color={COBALT} transparent opacity={0.7} />
      </lineSegments>
      <Line ref={dash} points={centre} color={COBALT} lineWidth={1.6} dashed dashSize={0.35} gapSize={0.25} transparent opacity={0.9} />
      <mesh
        geometry={hit}
        onPointerMove={(e) => { pick(e); document.body.style.cursor = "grab"; }}
        onPointerOut={() => { setHovered(null); document.body.style.cursor = ""; }}
        onClick={pick}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Nodes curve={curve} hovered={hovered} reduced={reduced} />
    </group>
  );
}

/** Gentle idle sway plus pointer parallax. The sway never turns the loop edge-on. */
function Rig({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const g = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame(({ pointer }, dt) => {
    if (!g.current || reduced) return;
    t.current += dt;
    const swayY = Math.sin(t.current * 0.35) * 0.55;
    const swayX = 0.42 + Math.sin(t.current * 0.23) * 0.12;
    g.current.rotation.y += (swayY + pointer.x * 0.25 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (swayX - pointer.y * 0.15 - g.current.rotation.x) * 0.05;
  });
  return <group ref={g} rotation={[0.42, -0.3, 0]}>{children}</group>;
}

export default function HeroScene({
  active,
  reduced,
  coarse,
  onHover,
}: {
  active: boolean;
  reduced: boolean;
  coarse: boolean;
  onHover: (r: Ring) => void;
}) {
  const [hovered, setHoveredState] = useState<Ring>(null);
  const setHovered = (r: Ring) => {
    setHoveredState(r);
    onHover(r);
  };

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 12.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      aria-hidden="true"
    >
      <Rig reduced={reduced}>
        <InfinityLoop hovered={hovered} setHovered={setHovered} reduced={reduced} />
      </Rig>
      <gridHelper args={[18, 36, "#BCC4BB", "#D2D8D0"]} position={[0, -2.9, 0]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!coarse}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.56}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        rotateSpeed={0.6}
        enableDamping
      />
    </Canvas>
  );
}
