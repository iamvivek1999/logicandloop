"use client";

import useCalm from "@/components/fx/useCalm";
import { MARK } from "@/components/Icons";

/** Home hero art. */
export default function HeroArt() {
  const calm = useCalm();
  return <LogoLoop calm={calm} />;
}

/**
 * The mark itself: the two Ls draw on, the infinity loop between them fades
 * in, then a marigold light trails endlessly around the loop.
 */
function LogoLoop({ calm }: { calm: boolean }) {
  return (
    <svg className={`h-art h-art--logo${calm ? " is-calm" : ""}`} viewBox="-10 -10 120 120" aria-hidden="true">
      <defs>
        <filter id="h-glow-l" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="h-art__float">
        <path d={MARK.l1} pathLength={100} className="h-art__l h-art__l--a" />
        <path d={MARK.l2} pathLength={100} className="h-art__l h-art__l--b" />
        <path d={MARK.loop} className="h-art__ring" />
        {[0, 1, 2, 3].map((n) => (
          <path key={n} d={MARK.loop} pathLength={1000} className={`h-art__lt h-art__lt--${n}`} filter={n === 0 ? "url(#h-glow-l)" : undefined} />
        ))}
      </g>
    </svg>
  );
}
