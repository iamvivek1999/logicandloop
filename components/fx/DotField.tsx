"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useCalm from "./useCalm";

// The vendored file is untyped; describe just the props used here.
const DotGrid = dynamic(() => import("./vendor/DotGrid"), { ssr: false }) as unknown as ComponentType<Record<string, unknown>>;

/**
 * A quiet field of dots behind the closing call to action; the dots near the
 * cursor brighten to marigold and spring away. Loads only once the section is
 * near the screen, and only for a mouse and full motion. Everyone else sees a
 * static dot pattern drawn in CSS.
 */
export default function DotField() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "200px 0px", once: true });
  const reduce = useCalm();
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(matchMedia("(pointer: fine)").matches), []);
  const live = near && fine && !reduce;
  return (
    <div ref={ref} className={`dotfield${live ? " is-live" : ""}`} aria-hidden="true">
      {live && (
        <DotGrid
          dotSize={5}
          gap={22}
          baseColor="#b4bcb3"
          activeColor="#f0ab16"
          proximity={150}
          shockRadius={260}
          shockStrength={4}
          fade={0.9}
          glow={0.4}
        />
      )}
    </div>
  );
}
