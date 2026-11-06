"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import TextRoll from "./TextRoll";

/**
 * Three panels in a row; the one you hover, focus or tap widens and shows its
 * detail. Adapted from Skiper UI's "ExpandOnHover" (skiper52, https://skiper-ui.com).
 * Every panel's detail and link is always in the HTML (so search engines and
 * keyboard users reach all three); closed panels hide theirs with CSS. On
 * narrow screens the panels stack and all stay open (see .xp in CSS).
 */
type Agent = { h: string; verb: string; p: string; tags: string[]; href: string };

export default function ExpandAgents({ agents }: { agents: Agent[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className="xp">
      {agents.map((a, i) => {
        const open = on === i;
        return (
          <motion.div
            key={a.h}
            className={`xp__panel${open ? " is-open" : ""}`}
            animate={{ flexGrow: open ? 3.2 : 1 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            onHoverStart={() => setOn(i)}
            onFocusCapture={() => setOn(i)}
          >
            <span className="xp__verb" data-verb={a.verb} aria-hidden="true" />
            <div className="xp__body">
              <h3>
                <button className="xp__toggle" aria-expanded={open} aria-controls={`xp-${i}`} onClick={() => setOn(i)}>
                  {a.h}
                </button>
              </h3>
              <div className="xp__more" id={`xp-${i}`}>
                <p>{a.p}</p>
                <ul>{a.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <Link href={a.href} className="link-draw roll-host">
                  <TextRoll center={false}>See how it works</TextRoll>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
