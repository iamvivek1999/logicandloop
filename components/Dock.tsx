"use client";

import { useEffect, useState } from "react";
import { WhatsApp } from "./Icons";
import { bookingHref, bookingReady, whatsappHref } from "@/lib/site";

/**
 * The floating action pill. It stays out of the way on the first screen, slides
 * in once the visitor starts reading, and steps aside when the footer (which
 * has the same actions) comes into view.
 */
export default function Dock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let atFoot = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.6 && !atFoot);
    const foot = document.querySelector(".footer");
    const io = new IntersectionObserver(([e]) => {
      atFoot = e.isIntersecting;
      update();
    });
    if (foot) io.observe(foot);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className={`dock${show ? " is-on" : ""}`} aria-hidden={!show || undefined} inert={!show || undefined}>
      <span className="dock__text">Got something to build?</span>
      <a className="dock__book" href={bookingHref} {...(bookingReady ? { target: "_blank", rel: "noopener" } : {})}>
        Book a call
      </a>
      <a className="dock__wa" href={whatsappHref()} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
        <WhatsApp />
      </a>
    </div>
  );
}
