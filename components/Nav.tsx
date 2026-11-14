"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Icons";
import { groups, services, servicesIn } from "@/lib/services";
import { industries } from "@/lib/industries";
import { bookingHref, bookingReady } from "@/lib/site";

const links = [
  { href: "/products/minute-one", label: "Minute One" },
  { href: "/products/loop-os", label: "Loop OS" },
  { href: "/about", label: "About" },
];

// What "Loop" opens: the products, and how we run the work.
const loop = [
  { href: "/products/minute-one", label: "Minute One", hint: "Every enquiry answered on WhatsApp within a minute", tag: "Product" },
  { href: "/products/loop-os", label: "Loop OS", hint: "AI agents with approvals and an audit trail", tag: "Product" },
  { href: "/#process", label: "How we work", hint: "Short loops and a demo on a live link every week", tag: "Process" },
  { href: "/pricing", label: "Pricing", hint: "Fixed scopes, fixed quotes and monthly plans", tag: "Company" },
];

const pages = [
  { label: "Minute One", hint: "WhatsApp lead response", href: "/products/minute-one", kind: "Product" },
  { label: "Loop OS", hint: "AI agent operations", href: "/products/loop-os", kind: "Product" },
  { label: "All services", hint: "Every service, by area", href: "/services", kind: "Company" },
  { label: "About", hint: "Vision and leadership", href: "/about", kind: "Company" },
  { label: "Careers", hint: "Openings and talent pool", href: "/careers", kind: "Company" },
  { label: "Pricing", hint: "How we price projects, plans and pilots", href: "/pricing", kind: "Company" },
  { label: "FAQ", hint: "Pricing, timelines, ownership", href: "/faq", kind: "Company" },
  { label: "Contact", hint: "Start a project", href: "/contact", kind: "Company" },
];
const index = [...pages, ...industries.map((i) => ({ label: i.name, hint: i.short, href: `/industries/${i.slug}`, kind: "Industry" })), ...services.map((s) => ({ label: s.name, hint: s.short, href: `/services/${s.slug}`, kind: "Service" }))];

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};
const I = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>,
  close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>,
  arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
};
const drop = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};
type Panel = "logic" | "loop" | null;

/**
 * Site navigation: three floating pills (brand · links · actions). The middle
 * pill reads as the brand line, "We write the Logic · you run the Loop": "We"
 * is the About page, "Logic" opens the services, "Loop" opens the products.
 * The bar slides away while you scroll down and returns on the first scroll
 * up; the search pill opens a search over every page.
 */
export default function Nav() {
  const path = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [find, setFind] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => { setPanel(null); setSheet(false); setFind(false); }, [path]);

  // A panel closes on a click anywhere outside the bar.
  useEffect(() => {
    if (!panel) return;
    const away = (e: PointerEvent) => { if (!bar.current?.contains(e.target as Node)) setPanel(null); };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [panel]);
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 6) return;
      const down = y > last && y > 160;
      setHidden(down);
      if (down) setPanel(null);
      last = y;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setFind((f) => !f); }
      if (e.key === "Escape") { setFind(false); setPanel(null); setSheet(false); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  const current = (href: string) => path === href || (href === "/services" && path.startsWith("/services"));
  const toggle = (p: Exclude<Panel, null>) => setPanel((x) => (x === p ? null : p));
  const closeOnLink = (e: React.MouseEvent) => { if ((e.target as HTMLElement).closest("a")) setPanel(null); };
  const word = (p: Exclude<Panel, null>, label: string, on: boolean) => (
    <button className={`snav__l snav__w${panel === p ? " is-open" : ""}`} aria-expanded={panel === p} aria-controls={`snav-${p}`} aria-current={on ? "page" : undefined} onClick={() => toggle(p)}>
      {label} <span className="snav__caret" aria-hidden="true" />
    </button>
  );

  return (
    <>
      <header ref={bar} className={`snav${hidden && !sheet && !find ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <Link href="/" className="snav__pill snav__brand" aria-label="Logic & Loop, home">
          <Logo small /> <span>Logic &amp; Loop</span>
        </Link>
        <nav className="snav__pill snav__links snav__line" aria-label="Main">
          <Link href="/about" className="snav__l snav__w" aria-current={current("/about") ? "page" : undefined}>We</Link>
          <i>write the</i>
          {word("logic", "Logic", path.startsWith("/services"))}
          <i>· you run the</i>
          {word("loop", "Loop", path.startsWith("/products"))}
        </nav>
        <div className="snav__pill snav__end">
          <button className="snav__search snav__search--icon" onClick={() => setFind(true)} aria-label="Search the site">{I.search}</button>
          <a className="snav__cta snav__cta--go" href={bookingHref} data-analytics="booking_click" {...ext}>Let&rsquo;s talk <span aria-hidden="true">{I.arrow}</span></a>
          <button className="snav__menu" aria-label={sheet ? "Close menu" : "Open menu"} aria-expanded={sheet} aria-controls="snav-sheet" onClick={() => setSheet((s) => !s)}>{sheet ? I.close : I.menu}</button>
        </div>
        <AnimatePresence>
          {panel === "logic" && (
            <motion.div key="logic" id="snav-logic" className="snav__mega" onClick={closeOnLink} {...drop}>
              <p className="snav__lede">The <em>logic</em> we write: software, AI and automation, organised the way you buy it.</p>
              {groups.map((g) => (
                <div key={g.id} className="snav__col">
                  <p className="snav__colh">{g.name}</p>
                  {servicesIn(g.id).map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}
                </div>
              ))}
              <div className="snav__inds">
                <Link href="/industries" className="snav__colh">Industries</Link>
                {industries.map((i) => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}</Link>)}
              </div>
              <Link href="/services" className="snav__all">Browse all services {I.arrow}</Link>
            </motion.div>
          )}
          {panel === "loop" && (
            <motion.div key="loop" id="snav-loop" className="snav__mega snav__mega--loop" onClick={closeOnLink} {...drop}>
              <p className="snav__lede">The <em>loop</em> you run: products for the work you repeat, and how we ship it.</p>
              <ul className="snav__rows">
                {loop.map((l, n) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={path === l.href ? "page" : undefined}>
                      <small>0{n + 1}</small>
                      <span><b>{l.label}</b><em>{l.hint}</em></span>
                      <i>{l.tag}</i>
                      {I.arrow}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        {sheet && (
          <nav id="snav-sheet" className="snav__sheet" aria-label="Menu" data-lenis-prevent>
            {[{ href: "/services", label: "Services" }, { href: "/industries", label: "Industries" }, ...links, { href: "/pricing", label: "Pricing" }, { href: "/faq", label: "FAQ" }].map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>{l.label}</Link>
            ))}
            <a className="snav__cta snav__cta--wide" href={bookingHref} data-analytics="booking_click" {...ext}>Book a 30-minute call</a>
          </nav>
        )}
      </header>
      <AnimatePresence>{find && <Find onClose={() => setFind(false)} />}</AnimatePresence>
    </>
  );
}

function Find({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [at, setAt] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (t ? index.filter((x) => `${x.label} ${x.hint} ${x.kind}`.toLowerCase().includes(t)) : index).slice(0, 8);
  }, [q]);
  useEffect(() => { input.current?.focus(); }, []);
  return (
    <motion.div className="sfind" role="dialog" aria-modal="true" aria-label="Search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className="sfind__box" initial={{ y: 16, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
        <label className="sfind__in">
          {I.search}
          <input ref={input} value={q} placeholder="Search services, products and pages" aria-label="Search" aria-controls="sfind-list"
            onChange={(e) => { setQ(e.target.value); setAt(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setAt((a) => Math.min(a + 1, list.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setAt((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter" && list[at]) location.href = list[at].href;
            }} />
          <button className="sfind__x" onClick={onClose} aria-label="Close search">{I.close}</button>
        </label>
        <ul id="sfind-list" className="sfind__list" role="listbox" aria-label="Results" data-lenis-prevent>
          {list.length === 0 && <li className="sfind__none">Nothing matches &ldquo;{q}&rdquo;. Try &ldquo;AI&rdquo;, &ldquo;app&rdquo; or &ldquo;automation&rdquo;.</li>}
          {list.map((x, n) => (
            <li key={x.href} role="option" aria-selected={n === at}>
              <Link href={x.href} className={n === at ? "is-on" : ""} onMouseEnter={() => setAt(n)} onClick={onClose}>
                <span><b>{x.label}</b><small>{x.hint}</small></span><em>{x.kind}</em>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
