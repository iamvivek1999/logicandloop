"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { agents } from "./agents";

const ORBIT = 3.3;
const TILT = 0.38;
const LINE = "#5A72FF";
const SIGNAL = "#FF5A1F";

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
        <lineBasicMaterial color="#8C9CFF" transparent opacity={0.85} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#2340FF" />
      </mesh>
    </group>
