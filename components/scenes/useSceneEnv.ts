"use client";

import { useEffect, useRef, useState } from "react";

/** Tracks whether the canvas is on screen, whether the user prefers reduced motion,
 *  and whether the main pointer is touch (so drag-to-rotate doesn't fight page scroll). */
export function useSceneEnv<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cp = window.matchMedia("(pointer: coarse)");
    setReduced(rm.matches);
    setCoarse(cp.matches);
    const a = () => setReduced(rm.matches);
    const b = () => setCoarse(cp.matches);
    rm.addEventListener("change", a);
    cp.addEventListener("change", b);
    return () => {
      rm.removeEventListener("change", a);
      cp.removeEventListener("change", b);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView, reduced, coarse };
}
