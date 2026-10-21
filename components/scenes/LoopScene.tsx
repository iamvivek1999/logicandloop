"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { agents } from "./agents";

const ORBIT = 3.3;
const TILT = 0.38;
const LINE = "#7FB8AD";
const SIGNAL = "#F0AB16";

function pos(i: number, t: number) {
  const a = (i / agents.length) * Math.PI * 2 + t;
  const v = new THREE.Vector3(Math.cos(a) * ORBIT, 0, Math.sin(a) * ORBIT);
  v.applyAxisAngle(new THREE.Vector3(1, 0, 0), TILT);
  return v;
}

function Core() {
  const g = useRef<THREE.Group>(null);
  const geo = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.05, 1)), []);
  useFrame((_, dt) => {
    if (g.current) {
      g.current.rotation.y += dt * 0.25;
      g.current.rotation.x += dt * 0.1;
    }
  });
  return (
    <group ref={g}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#A9D3C8" transparent opacity={0.85} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#F0AB16" />
      </mesh>
    </group>
  );
}

type Labels = React.RefObject<(HTMLSpanElement | null)[]>;

function Crew({ reduced, onPick, labels }: { reduced: boolean; onPick: (i: number | null) => void; labels: Labels }) {
  const t = useRef(0);
  const [hover, setHover] = useState<number | null>(null);
  const nodeRefs = useRef<THREE.Group[]>([]);
  const pulseRefs = useRef<THREE.Mesh[]>([]);
  const lineRefs = useRef<any[]>([]);
  const phase = useMemo(() => agents.map((_, i) => i / agents.length), []);

  const orbitPts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 128; k++) {
      const a = (k / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ORBIT, 0, Math.sin(a) * ORBIT).applyAxisAngle(new THREE.Vector3(1, 0, 0), TILT));
    }
    return pts;
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }, dt) => {
    if (!reduced && hover === null) t.current += dt * 0.12;
    agents.forEach((_, i) => {
      const p = pos(i, t.current);
      nodeRefs.current[i]?.position.copy(p);
      const line = lineRefs.current[i];
      if (line?.geometry?.setPositions) line.geometry.setPositions([0, 0, 0, p.x, p.y, p.z]);
      // pulses travel from agent to core, then back
      phase[i] = (phase[i] + dt * (reduced ? 0 : 0.35)) % 1;
      const f = phase[i] < 0.5 ? 1 - phase[i] * 2 : (phase[i] - 0.5) * 2;
      pulseRefs.current[i]?.position.copy(p.clone().multiplyScalar(0.18 + f * 0.82));
      // project the agent's position to screen space for its HTML label
      const el = labels.current?.[i];
      const node = nodeRefs.current[i];
      if (el && node) {
        node.getWorldPosition(tmp).project(camera);
        const x = ((tmp.x + 1) / 2) * size.width;
        const y = ((1 - tmp.y) / 2) * size.height;
        el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 16}px)`;
        el.style.opacity = "1";
      }
    });
  });

  return (
    <>
      <Line points={orbitPts} color={LINE} lineWidth={1} transparent opacity={0.45} dashed dashSize={0.18} gapSize={0.12} />
      {agents.map((a, i) => (
        <group key={a.name}>
          <Line
            ref={(l: any) => { lineRefs.current[i] = l; }}
            points={[[0, 0, 0], [ORBIT, 0, 0]]}
            color={LINE}
            lineWidth={hover === i ? 2.2 : 1}
            transparent
            opacity={hover === null || hover === i ? 0.8 : 0.25}
          />
          <mesh ref={(m) => { if (m) pulseRefs.current[i] = m; }}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={SIGNAL} />
          </mesh>
          <group ref={(g) => { if (g) nodeRefs.current[i] = g; }}>
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); setHover(i); onPick(i); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { setHover(null); onPick(null); document.body.style.cursor = ""; }}
              onClick={(e) => { e.stopPropagation(); setHover(i); onPick(i); }}
            >
              <sphereGeometry args={[hover === i ? 0.3 : 0.22, 32, 32]} />
              <meshBasicMaterial color={hover === i ? "#ffffff" : "#E6ECE7"} />
            </mesh>
          </group>
        </group>
      ))}
    </>
  );
}

export default function LoopScene({
  active,
  reduced,
  coarse,
  onPick,
  labels,
}: {
  active: boolean;
  reduced: boolean;
  coarse: boolean;
  onPick: (i: number | null) => void;
  labels: Labels;
}) {
  return (
    <Canvas
      dpr={coarse ? [1, 1.25] : [1, 2]}
      camera={{ position: [0, 2.4, 11.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <group rotation={[0.1, 0, 0]}>
        <Core />
        <Crew reduced={reduced} onPick={onPick} labels={labels} />
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!coarse}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.6}
        rotateSpeed={0.6}
        enableDamping
      />
    </Canvas>
  );
}
