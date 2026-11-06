"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import useCalm from "./useCalm";

/**
 * A line whose letters start scattered and tilted, and close into the word as
 * the section scrolls into place. Adapted from Skiper UI's "Text Scroll
 * animation" (skiper31, https://skiper-ui.com).
 */
function Char({ c, d, p }: { c: string; d: number; p: MotionValue<number> }) {
  const x = useTransform(p, [0, 1], [d * 34, 0]);
  const rotateX = useTransform(p, [0, 1], [d * 22, 0]);
  const opacity = useTransform(p, [0, 0.6], [0.25, 1]);
  return (
    <motion.span className="cv__c" style={{ x, rotateX, opacity }}>
      {c === " " ? " " : c}
    </motion.span>
  );
}

export default function ConvergeText({ lines, id }: { lines: string[]; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const label = lines.join(" ");
  if (reduce) return <h2 ref={ref} id={id} className="cv">{label}</h2>;
  return (
    <h2 ref={ref} id={id} className="cv" aria-label={label}>
      {lines.map((line, li) => {
        const mid = (line.length - 1) / 2;
        return (
          <span className="cv__line" key={li} aria-hidden="true">
            {line.split("").map((c, i) => (
              <Char key={i} c={c} d={i - mid} p={scrollYProgress} />
            ))}
          </span>
        );
      })}
    </h2>
  );
}
