"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import useCalm from "./useCalm";

/**
 * Pulls its child a few pixels toward the cursor while the pointer is over it.
 * Adapted from Motion Primitives' Magnetic (MIT, https://motion-primitives.com).
 * Mouse only: touch and reduced-motion users get a still button.
 */
export default function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useCalm();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span ref={ref} className="magnet" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
