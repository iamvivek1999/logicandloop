"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useSceneEnv } from "./useSceneEnv";
import SceneSkeleton from "./SceneSkeleton";
import { agents } from "./agents";

const LoopScene = dynamic(() => import("./LoopScene"), {
  ssr: false,
  loading: () => <SceneSkeleton dark />,
});

export default function LoopStage() {
  const { ref, inView, reduced, coarse } = useSceneEnv<HTMLDivElement>();
  const [pick, setPick] = useState<number | null>(null);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  return (
    <div className="p-hero__stage" ref={ref}>
      <div className="stage">
        <LoopScene active={inView} reduced={reduced} coarse={coarse} onPick={setPick} labels={labels} />
        <div className="agent-labels" aria-hidden="true">
          {agents.map((a, i) => (
            <span key={a.name} ref={(el) => { labels.current[i] = el; }} className={`agent-label${pick === i ? " is-on" : ""}`}>
              {a.name}
            </span>
          ))}
        </div>
      </div>
      <p className="loop-caption" aria-live="polite">
        {pick === null ? (
          <>Fig. 2. Six agents around one harness. Point at an agent to see its job.</>
        ) : (
          <><b>{agents[pick].name}</b>: {agents[pick].job}</>
        )}
      </p>
    </div>
  );
}
