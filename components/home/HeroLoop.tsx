"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCalm from "@/components/fx/useCalm";
import HeroArt from "./HeroArt";
import TextRoll from "@/components/fx/TextRoll";
import Magnetic from "@/components/fx/Magnetic";
import { bookingHref, bookingReady } from "@/lib/site";

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};
const slides = [
  { img: "city-window", tab: "Software engineering", sub: "Web, mobile and the backend underneath", h: ["We write the logic.", "Your business runs the loop."], p: "A technology services company for software engineering, AI and automation. We design, build and run the systems your operations depend on.", href: "/services/web-apps-saas" },
  { img: "team-whiteboard", tab: "AI agents & data", sub: "Agents that answer, read and act", h: ["AI agents that work.", "With a person in the loop."], p: "Agents on WhatsApp, documents and your tools, answering only from what you approve, with an audit trail for every action.", href: "/services/ai-agents-chatbots" },
  { img: "network-cables", tab: "Automation & integration", sub: "Tools that update each other", h: ["Connect your tools.", "Let the routine run itself."], p: "CRM, ERP, payments and messaging wired together, so the work between your systems stops landing on your team.", href: "/services/workflow-automation" },
] as const;
const MS = 7000;
// Background photos rotate on their own, faster than the headline slides.
const photos = ["city-window", "team-whiteboard", "pair-coding", "network-cables", "team-laptops", "analytics-dashboard", "whiteboard-sketch", "young-team-walking"] as const;
const PHOTO_MS = 2000;

/** Home hero: deep spruce, photo slides behind a duotone wash, and the mark with a light trailing around its loop. */
export default function HeroLoop() {
  const [i, setI] = useState(0);
  const [ph, setPh] = useState(0);
  // Load each photo only when it is about to be shown, so the first view stays light.
  const [loaded, setLoaded] = useState(2);
  const [paused, setPaused] = useState(false);
  const calm = useCalm();
  const still = calm || paused;
  useEffect(() => {
    if (still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), MS);
    return () => clearTimeout(t);
  }, [i, still]);
  useEffect(() => {
    if (still) return;
    const t = setInterval(() => {
      setPh((n) => (n + 1) % photos.length);
      setLoaded((l) => Math.min(photos.length, l + 1));
    }, PHOTO_MS);
    return () => clearInterval(t);
  }, [still]);
  const s = slides[i];
  return (
    <section className={`h-hero h-hero--calm${paused ? " is-paused" : ""}`} aria-roledescription="carousel" aria-label="What we do">
      {photos.slice(0, loaded).map((x, n) => (
        <div key={x} className={`h-hero__bg${n === ph ? " is-on" : ""}`} aria-hidden="true">
          <Image src={`/images/${x}.webp`} alt="" fill priority={n === 0} sizes="100vw" />
        </div>
      ))}
      <div className="h-hero__wash" aria-hidden="true" />
      <div className="h-hero__stage h-hero__stage--art"><HeroArt /></div>
      <div className="wrap h-hero__in">
        <div className="h-hero__copy">
          <Link href="/products/loop-os" className="h-chip"><i aria-hidden="true" />Loop OS is opening early access for teams<span aria-hidden="true">→</span></Link>
          <div key={i} className="h-hero__swap" aria-live="polite">
            <h1 className="h-hero__h"><span>{s.h[0]}</span> <span className="h-sun">{s.h[1]}</span></h1>
            <p className="h-hero__p">{s.p}</p>
          </div>
          <div className="h-hero__cta">
            <Magnetic>
              <a className="h-btn h-btn--sun roll-host" href={bookingHref} data-analytics="booking_click" {...ext}><TextRoll>Book a 30-minute call</TextRoll></a>
            </Magnetic>
            <Link className="h-btn h-btn--ghost" href="/services">Browse 20+ services</Link>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="h-tabs">
          <div className="h-tabs__list" role="tablist" aria-label="Choose a slide">
          {slides.map((x, n) => (
            <button key={x.img} role="tab" aria-selected={n === i} className={`h-tab${n === i ? " is-on" : ""}${n < i ? " is-done" : ""}`} onClick={() => setI(n)}>
              <span className="h-tab__bar" aria-hidden="true"><i /></span>
              <small>0{n + 1}</small>
              <b>{x.tab}</b>
              <span className="h-tab__sub">{x.sub}</span>
            </button>
          ))}
          </div>
          <button className="h-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}>
            {paused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
