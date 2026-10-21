"use client";

import dynamic from "next/dynamic";
import { useSceneEnv } from "./useSceneEnv";
import SceneSkeleton from "./SceneSkeleton";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

export default function HeroStage() {
  const { ref, inView, reduced, coarse } = useSceneEnv<HTMLDivElement>();

  return (
    <div className="hero__stage" ref={ref}>
      <div className="stage">
        <HeroScene active={inView} reduced={reduced} coarse={coarse} />
      </div>
    </div>
  );
}
