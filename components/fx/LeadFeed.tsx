"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useCalm from "./useCalm";

/**
 * Minute One's card: events drop in one by one, newest on top, then the feed
 * starts over. Adapted from Magic UI's Animated List (MIT, https://magicui.design).
 */
const events = [
  { k: "in", t: "New enquiry", d: "Property portal · 2BHK, Tower B", time: "11:02:04" },
  { k: "out", t: "Replied on WhatsApp", d: "38 seconds after the enquiry", time: "11:02:42" },
  { k: "out", t: "Lead qualified", d: "Budget, timeline and unit type captured", time: "11:05:10" },
  { k: "done", t: "Site visit booked", d: "Saturday, 11:00 · Sales head alerted", time: "11:06:31" },
] as const;

export default function LeadFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { margin: "0px 0px -20% 0px" });
  const reduce = useCalm();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) { setN(events.length); return; }
    if (!seen) return;
    const t = setTimeout(() => setN((v) => (v >= events.length ? 0 : v + 1)), n >= events.length ? 3200 : n === 0 ? 500 : 1400);
    return () => clearTimeout(t);
  }, [n, seen, reduce]);

  const shown = events.slice(0, n).reverse();
  return (
    <div ref={ref} className="feed" aria-hidden="true">
      <AnimatePresence initial={false}>
        {shown.map((e) => (
          <motion.div
            key={e.t}
            layout
            className={`feed__row feed__row--${e.k}`}
            initial={{ scale: 0.6, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
          >
            <span className="feed__dot" />
            <span className="feed__txt"><b>{e.t}</b><small>{e.d}</small></span>
            <time>{e.time}</time>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
