import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { whatsappHref } from "@/lib/site";
import { WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Minute One: WhatsApp lead agent for real estate developers",
  description:
    "Minute One replies to every property lead on WhatsApp within a minute, day or night, qualifies the buyer and books the site visit.",
};

const features = [
  { h: "Replies in under a minute, 24/7", p: "Leads from Meta ads and property portals get an answer while they're still on their phone, including nights, weekends and launch-day rushes." },
  { h: "Answers only from your documents", p: "Prices, possession dates and RERA details come from your approved brochure. If it isn't there, it says it'll check and hands off." },
  { h: "Books site visits, with reminders", p: "Buyers pick a slot in the chat. Two reminders go out before the visit to cut no-shows." },
  { h: "Hands hot leads to sales, fast", p: "Your team gets an instant alert with the full conversation, a response time limit and an escalation if nobody picks it up." },
  { h: "Works with your existing CRM", p: "No switching tools. Every conversation and booking is logged where your team already works." },
  { h: "Hindi and English from day one", p: "Replies in the language the buyer writes in, so NRI and local leads both feel at home." },
];

const faqs = [
  { q: "Will it annoy buyers like other bots?", a: "It replies like a helpful sales executive, asks one question at a time and hands over to a person the moment a buyer asks for one." },
  { q: "What if it quotes the wrong price?", a: "It can only quote from documents you approve. Anything outside them goes to your team." },
  { q: "How do we know it's working?", a: "We measure your site visits per 100 leads before we start, and send a weekly report against that baseline." },
  { q: "How long does setup take?", a: "Two to three weeks from signed pilot to live, including WhatsApp Business API approval." },
];

export default function MinuteOne() {
  return (
    <>
      <section className="p-hero">
        <div className="wrap p-hero__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li>Products</li>
              <li aria-current="page">Minute One</li>
            </ol>
            <p className="kicker" style={{ marginBottom: 18 }}>For real estate developers</p>
            <h1 className="display" style={{ fontSize: "var(--step-4)" }}>Every property lead answered in under a minute.</h1>
            <p className="lead" style={{ marginTop: 24 }}>
              Leads go cold while they wait for a call back. Minute One replies on WhatsApp within a minute, qualifies the buyer and books the site visit, then hands hot leads straight to your sales team.
            </p>
            <div className="hero__cta" style={{ marginTop: 32 }}>
              <Link className="btn btn--primary" href="/contact?topic=minute-one">Get a free lead-response audit</Link>
              <a className="btn btn--outline" href={whatsappHref("Hi, I'd like to see a Minute One demo.")} target="_blank" rel="noopener">
                <WhatsApp className="ico" /> See a live demo
              </a>
            </div>
          </div>
          <div>
            <div className="phone" aria-label="Example conversation with Minute One">
              <div className="phone__bar">
                <div className="phone__av">M1</div>
                <div><strong>Skyline Residences</strong><small>Minute One, online</small></div>
              </div>
              <div className="chat">
                <div className="msg msg--in" style={{ "--d": 0 } as React.CSSProperties}>Hi, saw your ad. Is the 2BHK still available?</div>
                <div className="msg msg--out" style={{ "--d": 1 } as React.CSSProperties}>Hi Priya! Yes, 2BHK homes start at ₹78 L on floors 4–12. Are you looking to move in within a year, or later?</div>
                <div className="msg msg--in" style={{ "--d": 2 } as React.CSSProperties}>Within a year. Can I visit this weekend?</div>
                <div className="msg msg--out" style={{ "--d": 3 } as React.CSSProperties}>Of course. Saturday 11 am or Sunday 4 pm?</div>
                <div className="msg msg--in" style={{ "--d": 4 } as React.CSSProperties}>Sunday 4 pm 👍</div>
                <div className="msg msg--sys" style={{ "--d": 5 } as React.CSSProperties}>Visit booked. Sales head alerted.</div>
              </div>
            </div>
            <p className="muted" style={{ textAlign: "center", fontSize: "var(--step--1)", marginTop: 20 }}>Illustrative demo with a fictional project.</p>
          </div>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">What Minute One does.</h2>
            <p className="lead">Everything between a lead arriving and a buyer standing in your sample flat.</p>
          </div>
          <div className="features">
            {features.map((f) => (
              <div className="feature" key={f.h}><h3 className="h3">{f.h}</h3><p>{f.p}</p></div>
