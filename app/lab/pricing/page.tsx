import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/fx/Faq";
import { HoursCalc } from "@/components/HomeParts";
import { bookingHref } from "@/lib/site";
import "@/app/zen.css";

/**
 * "How we price" (lab). Engagement models instead of seat prices, since we
 * sell services. No rupee figures yet: each model says how the number is set.
 */
const tiers = [
  {
    name: "Fixed-scope project", for: "A defined build: an app, website, integration or automation.",
    price: "Fixed quote", note: "after a one-week scoping",
    items: ["Written scope and a fixed quote", "Clickable design before the build", "Demo on a live link every week", "Code and accounts in your name", "Handover docs and a recorded walkthrough"],
    cta: "Get a fixed quote", href: "/contact?topic=call",
  },
  {
    name: "Monthly plan", pop: true, for: "Products and operations that keep improving after launch.",
    price: "Monthly retainer", note: "no long lock-in",
    items: ["Everything in a project, plus:", "A standing team that ships every week", "One outcome number, reported weekly", "Priority fixes and monitoring", "Change direction month to month"],
    cta: "Plan a monthly team", href: "/contact?topic=call",
  },
  {
    name: "Minute One pilot", for: "Teams that depend on fast lead response.",
    price: "Pay on results", note: "60-day founding pilot",
    items: ["Free lead-response audit first", "WhatsApp replies within a minute", "Lead qualifying and bookings", "60 days; you pay only if qualified next steps go up"],
    cta: "Get the free audit", href: "/products/minute-one",
  },
  {
    name: "Talent assessment", for: "Employers hiring from campuses or off-campus.",
    price: "Per drive or yearly", note: "your platform or ours",
    items: ["Online assessment only, or the whole drive", "Question banks and proctoring", "Ranked shortlist after every drive", "Yearly contracts for repeat hiring"],
    cta: "Plan a drive", href: "/services/online-assessments",
  },
];
const addons = [
  { b: "Maintenance & AMC", s: "Updates, monitoring and fixes for software you already run.", href: "/services/maintenance-amc" },
  { b: "Dedicated developers", s: "Engineers who join your team for a month or more.", href: "/services/dedicated-developers" },
  { b: "AI training & workshops", s: "Hands-on sessions so your team uses AI well, safely.", href: "/services/ai-training-workshops" },
];
const qa = [
  { q: "How is pricing structured?", a: "Every engagement starts with a working session and a written scope. Builds are quoted as a fixed price per phase; ongoing work runs on a monthly plan; Minute One starts with a pay-on-results pilot; talent assessment is priced per drive or on a yearly contract." },
  { q: "Is the first call free?", a: "Yes. The 30-minute call is free, and so is the Minute One lead-response audit." },
  { q: "What happens if the scope changes?", a: "You hear about it before the invoice does. We write down the change, what it adds or removes and the new number, and you decide whether to go ahead." },
  { q: "Can we start small?", a: "Yes. Many clients start with one workflow automation or a Minute One pilot, then add more once the first loop is paying for itself." },
  { q: "Who owns the code and accounts?", a: "You do, from day one: the repository, cloud accounts and domains are in your name." },
];

export default function Pricing() {
  return (
    <div className="z">
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb"><li><Link href="/">Home</Link></li><li aria-current="page">Pricing</li></ol>
          <h1 className="display">Know the number <span className="tone">before work starts.</span></h1>
          <p className="lead">We sell outcomes, not seats. Pick the way of working that fits; every option starts with a written scope and a clear price.</p>
        </div>
      </header>

      <section className="z-sec" aria-label="Ways to work with us">
        <div className="z-wrap">
          <div className="zp-tiers">
            {tiers.map((t) => (
              <article key={t.name} className={`zp-tier${t.pop ? " is-pop" : ""}`}>
                {t.pop && <span className="zp-tier__pop">Recommended</span>}
                <h3>{t.name}</h3>
                <p className="zp-for">{t.for}</p>
                <p className="zp-price">{t.price}<small>{t.note}</small></p>
                <ul>{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <Link className={`z-btn ${t.pop ? "z-btn--sun" : "z-btn--line"}`} href={t.href}>{t.cta}</Link>
              </article>
            ))}
          </div>
          <p className="z-more" style={{ color: "var(--mute)" }}>Not sure which fits? <a className="z-link" href={bookingHref}>Book a free 30-minute call</a> and we&rsquo;ll tell you.</p>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="zp-add">
        <div className="z-wrap">
          <div className="z-head"><p className="z-over z-over--dark">Add-ons</p><h2 id="zp-add" className="z-h2">Add what you need, when you need it.</h2></div>
          <div className="zp-addons">
            {addons.map((a) => <Link key={a.b} href={a.href} className="zp-addon"><b>{a.b}</b><span>{a.s}</span><span className="z-link">Learn more →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="z-startup" aria-labelledby="zp-st">
        <div className="z-wrap z-startup__in">
          <div>
            <p className="z-over">Logic &amp; Loop for Startups</p>
            <h2 id="zp-st" className="z-h2">Early-stage? Start with a free architecture review.</h2>
            <p>We review your plan, tell you what to build first and what to skip, and quote a fixed-price MVP if you want us to build it.</p>
          </div>
          <Link className="z-btn z-btn--sun" href="/contact?topic=mvp-for-startups">Apply for a review</Link>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="zp-calc">
        <div className="z-wrap">
          <div className="z-head"><p className="z-over z-over--dark">See what you could save</p><h2 id="zp-calc" className="z-h2">How much repetitive work could your team hand off?</h2></div>
          <HoursCalc />
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="zp-faq">
        <div className="z-wrap z-faq">
          <div className="z-head"><p className="z-over z-over--dark">FAQ</p><h2 id="zp-faq" className="z-h2">Pricing questions, answered.</h2></div>
          <Faq items={qa} />
        </div>
      </section>
      <CtaBand title="Get a number for your project." text="A 30-minute call tells you which way of working fits, what it would take and roughly what it would cost." />
    </div>
  );
}
