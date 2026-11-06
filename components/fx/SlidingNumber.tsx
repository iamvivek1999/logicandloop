"use client";

import { motion } from "motion/react";
import useCalm from "./useCalm";

/**
 * Each digit is a 0–9 reel that springs to its new value, so changing an input
 * visibly rolls the result. Adapted from Motion Primitives' Sliding Number
 * (MIT, https://motion-primitives.com); uses em offsets instead of measuring.
 */
function Reel({ d }: { d: number }) {
  const reduce = useCalm();
  return (
    <span className="reel">
      <motion.span
        className="reel__strip"
        initial={false}
        animate={{ y: `${-d}em` }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 22, mass: 0.4 }}
      >
        {Array.from({ length: 10 }, (_, i) => <span key={i}>{i}</span>)}
      </motion.span>
    </span>
  );
}

export default function SlidingNumber({ value, locale = "en-IN" }: { value: number; locale?: string }) {
  const text = Math.round(value).toLocaleString(locale);
  const digits = text.length;
  return (
    <span className="slide-num" aria-label={text} role="img">
      {text.split("").map((ch, i) =>
        /\d/.test(ch)
          // Key by place value from the right, so units stay units as the number grows.
          ? <Reel key={`d${digits - i}`} d={Number(ch)} />
          : <span key={`s${digits - i}`} className="slide-num__sep" aria-hidden="true">{ch}</span>,
      )}
    </span>
  );
}
