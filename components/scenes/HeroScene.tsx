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
