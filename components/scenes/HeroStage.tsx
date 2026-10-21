"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useSceneEnv } from "./useSceneEnv";
import type { Ring } from "./HeroScene";
import SceneSkeleton from "./SceneSkeleton";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

const captions: Record<"default" | "logic" | "loop", React.ReactNode> = {
  default: <>Fig. 1. Logic and Loop, one continuous system. Drag to turn it.</>,
  logic: <><b>Logic</b>, left: the apps, data and agents we design and build.</>,
  loop: <><b>Loop</b>, right: the automations that keep them running.</>,
};

export default function HeroStage() {
  const { ref, inView, reduced, coarse } = useSceneEnv<HTMLDivElement>();
  const [ring, setRing] = useState<Ring>(null);

  return (
    <>
      <div className="hero__stage" ref={ref}>
        <div className="stage">
          <HeroScene active={inView} reduced={reduced} coarse={coarse} onHover={setRing} />
        </div>
      </div>
      <p className="hero__caption" aria-live="polite">
        {ring ? captions[ring] : coarse ? <>Fig. 1. Logic and Loop, one continuous system. Tap either side.</> : captions.default}
      </p>
    </>
  );
}
