"use client";

import { motion } from "motion/react";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import useCalm from "./useCalm";

/**
 * Loop OS's card: your tools on the left, the agent crew in the middle, a
 * person approving on the right, with light running along the wires.
 * Adapted from Magic UI's Animated Beam (MIT, https://magicui.design).
 */
function Beam({ box, from, to, curve = 0, delay = 0, reverse = false }: {
  box: RefObject<HTMLDivElement | null>; from: RefObject<HTMLElement | null>; to: RefObject<HTMLElement | null>;
  curve?: number; delay?: number; reverse?: boolean;
}) {
  const id = "beam" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useCalm();
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      if (!box.current || !from.current || !to.current) return;
      const c = box.current.getBoundingClientRect();
      const a = from.current.getBoundingClientRect();
      const b = to.current.getBoundingClientRect();
      const sx = a.left - c.left + a.width / 2, sy = a.top - c.top + a.height / 2;
      const ex = b.left - c.left + b.width / 2, ey = b.top - c.top + b.height / 2;
      setSize({ w: c.width, h: c.height });
      setD(`M ${sx},${sy} Q ${(sx + ex) / 2},${sy - curve} ${ex},${ey}`);
    };
    const ro = new ResizeObserver(update);
    if (box.current) ro.observe(box.current);
    update();
    return () => ro.disconnect();
  }, [box, from, to, curve]);

  const x = reverse ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] } : { x1: ["10%", "110%"], x2: ["0%", "100%"] };
  return (
    <svg className="hub__beam" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
      <path d={d} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
      {!reduce && (
        <>
          <path d={d} stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{ ...x, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
              transition={{ delay, duration: 3.2, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0.6 }}
            >
              <stop stopColor="#F0AB16" stopOpacity="0" />
              <stop stopColor="#F0AB16" />
              <stop offset="32.5%" stopColor="#1B5650" />
              <stop offset="100%" stopColor="#1B5650" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}

const tools = ["WhatsApp", "CRM", "Sheets"];

export default function BeamHub() {
  const box = useRef<HTMLDivElement>(null);
  const t0 = useRef<HTMLSpanElement>(null);
  const t1 = useRef<HTMLSpanElement>(null);
  const t2 = useRef<HTMLSpanElement>(null);
  const core = useRef<HTMLSpanElement>(null);
  const you = useRef<HTMLSpanElement>(null);
  const refs = [t0, t1, t2];
  return (
    <div ref={box} className="hub" aria-hidden="true">
      <div className="hub__col">
        {tools.map((t, i) => <span key={t} ref={refs[i]} className="hub__node">{t}</span>)}
      </div>
      <span ref={core} className="hub__core">Loop OS<small>3 agents</small></span>
      <span ref={you} className="hub__node hub__node--you">You approve</span>
      <Beam box={box} from={t0} to={core} curve={-30} />
      <Beam box={box} from={t1} to={core} delay={0.4} />
      <Beam box={box} from={t2} to={core} curve={30} delay={0.8} />
      <Beam box={box} from={core} to={you} delay={1.4} />
    </div>
  );
}
