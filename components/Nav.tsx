"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow, Logo } from "./Icons";
import { NOTE_KEY, bookingHref, bookingReady } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/products/minute-one", label: "Minute One", match: "/products/minute-one" },
  { href: "/products/loop-os", label: "Loop OS", match: "/products/loop-os" },
  { href: "/#process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];


export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Slide away while reading down the page, come back on the first scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNote = () => {
    document.documentElement.classList.add("note-off");
    try {
      localStorage.setItem(NOTE_KEY, "1");
    } catch {}
  };

  const isCurrent = (href: string) =>
    href !== "/#process" && (path === href || (href === "/services" && path.startsWith("/services/")));

  return (
    <header className={`nav${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
      {/* Rendered on the server so it never pushes the page down; a dismissed bar is
          hidden before first paint by the inline script in app/layout.tsx. */}
      {path !== "/products/minute-one" && (
        <div className="note">
          <Link href="/products/minute-one" className="note__link">
            <span className="note__dot" aria-hidden="true" />
            Minute One is taking founding pilots with real estate developers
            <Arrow className="note__arrow" />
          </Link>
          <button className="note__x" onClick={closeNote} aria-label="Dismiss announcement">×</button>
        </div>
      )}
      <div className="wrap nav__inner">
        <Link href="/" className="brand" aria-label="Logic & Loop, home">
          <Logo />
          Logic &amp; Loop
        </Link>
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
        <nav id="nav-links" className={`nav__links${open ? " is-open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a
            className="btn btn--primary btn--sm"
            href={bookingHref}
            {...(bookingReady ? { target: "_blank", rel: "noopener" } : {})}
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
