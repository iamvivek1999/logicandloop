"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type Ring = "logic" | "loop" | null;

const INK = "#0F1A2E";
const COBALT = "#2340FF";
const SIGNAL = "#FF5A1F";

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
