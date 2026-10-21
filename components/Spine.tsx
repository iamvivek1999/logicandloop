"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The marigold line down the left margin of the home page. Every element marked
 * `data-stop` gets a stop on it; the last one is drawn as the ring where the loop
 * closes. The line draws itself once on load, then follows the scroll position.
 */
export default function Spine({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [tops, setTops] = useState<number[]>([]);
  const [lit, setLit] = useState(0);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let centers: number[] = [];
    let frame = 0;

    const measure = () => {
      const base = el.getBoundingClientRect().top;
      centers = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]")).map((s) => {
        const style = getComputedStyle(s);
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
        return s.getBoundingClientRect().top - base + lineHeight / 2;
      });
      el.style.setProperty("--end", `${centers[centers.length - 1] ?? 0}px`);
      setTops(centers);
      update();
    };

    const update = () => {
      frame = 0;
      const end = centers[centers.length - 1];
      if (!end) return;
      const y = window.innerHeight * 0.6 - el.getBoundingClientRect().top;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, y / end))));
      setLit(centers.filter((c) => c <= y).length);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    const introTimer = window.setTimeout(() => setIntro(false), 1700);

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(introTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="spined" ref={box}>
      <div className={`spine${intro ? " spine--intro" : ""}`} aria-hidden="true">
        <div className="spine__rail">
          <div className="spine__track" />
          <div className="spine__fill" />
          {tops.map((top, i) => (
            <span
              key={i}
              className={`spine__stop${i < lit ? " is-on" : ""}${i === tops.length - 1 ? " spine__stop--end" : ""}`}
              style={{ top }}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
