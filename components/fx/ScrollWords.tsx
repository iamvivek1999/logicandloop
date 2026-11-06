"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import useCalm from "./useCalm";

/**
 * A statement whose words fill in from faint to solid as it scrolls up the
 * screen, so it is read at the pace of the scroll. Adapted from Magic UI's
 * Text Reveal (MIT, https://magicui.design), without the 200vh sticky track.
 */
function Word({ w, p, r }: { w: string; p: MotionValue<number>; r: [number, number] }) {
  const opacity = useTransform(p, r, [0.16, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  if (reduce) return <p ref={ref} className={`words ${className}`}>{text}</p>;
  const words = text.split(" ");
  return (
    <p ref={ref} className={`words ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} w={w} p={scrollYProgress} r={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}
