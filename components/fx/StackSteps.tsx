"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { stepArt } from "@/components/StepArt";
import useCalm from "./useCalm";

/**
 * The four stages as cards that pin and stack while you scroll, each one
 * shrinking a little as the next lands on top. Adapted from Skiper UI's
 * "Card stack scroll" (skiper16, https://skiper-ui.com).
 */
type Step = { when: string; h: string; p: string };

function Card({ step, i, total, progress }: { step: Step; i: number; total: number; progress: MotionValue<number> }) {
  const target = 1 - (total - i - 1) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const Art = stepArt[i];
  return (
    <li className="stack__slot" style={{ top: `calc(110px + ${i * 26}px)` }}>
      <motion.article className="stack__card" style={{ scale }}>
        <div className="stack__text">
          <span className="stack__n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{step.h}</h3>
          <p className="stack__when">{step.when}</p>
          <p>{step.p}</p>
        </div>
        <div className="stack__art"><Art /></div>
      </motion.article>
    </li>
  );
}

export default function StackSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <ol ref={ref} className={`stack${reduce ? " stack--still" : ""}`}>
      {steps.map((s, i) => (
        <Card key={s.h} step={s} i={i} total={steps.length} progress={scrollYProgress} />
      ))}
    </ol>
  );
}
