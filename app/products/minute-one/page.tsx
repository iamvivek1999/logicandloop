import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { whatsappHref } from "@/lib/site";
import { WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Minute One: WhatsApp lead agent for real estate developers",
  description:
    "Minute One replies to a property enquiry on WhatsApp within a minute, asks the buyer a few questions and books the site visit. Judged on your own results.",
};

const features = [
  { h: "Aims to reply within a minute", p: "Leads from Meta ads and property portals get an answer while they're still on their phone. We measure the reply time and report it every week." },
  { h: "Answers only from your documents", p: "Prices, possession dates and RERA details come from your approved brochure. If it isn't there, it says it'll check and hands off." },
  { h: "Books site visits, with reminders", p: "Buyers pick a slot in the chat. Two reminders go out before the visit to cut no-shows." },
  { h: "Hands hot leads to sales, fast", p: "Your team gets an instant alert with the full conversation, a response time limit and an escalation if nobody picks it up." },
  { h: "Works with your existing CRM", p: "No switching tools. Every conversation and booking is logged where your team already works." },
  { h: "English today, other languages later", p: "It replies in English only for now. Arabic is not available yet, so the pilot runs on your English-language leads." },
];

const faqs = [
  { q: "Will it annoy buyers like other bots?", a: "It replies like a helpful sales executive, asks one question at a time and hands over to a person the moment a buyer asks for one." },
  { q: "What if it quotes the wrong price?", a: "It can only quote from documents you approve. Anything outside them goes to your team." },
  { q: "How do we know it's working?", a: "We measure your site visits per 100 leads before we start, and send a weekly report against that baseline." },
  { q: "How long does setup take?", a: "Setup runs in the first weeks of the pilot and includes WhatsApp Business API approval, which depends on Meta. We confirm the dates once we have your account details." },
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
            <h1 className="display" style={{ fontSize: "var(--step-4)" }}>Property enquiries answered within a minute.</h1>
            <p className="lead" style={{ marginTop: 24 }}>
              Leads go cold while they wait for a call back. Minute One replies on WhatsApp within a minute, asks the buyer a few questions and books the site visit, then hands hot leads to your sales team.
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
                <div className="msg msg--in" style={{ "--d": 0 } as React.CSSProperties}>Hi, saw your ad. Is the 2-bedroom still available?</div>
                <div className="msg msg--out" style={{ "--d": 1 } as React.CSSProperties}>Hi Sara! Yes, 2-bedroom homes start at AED 1.1 M on floors 4–12. Are you looking to move in within a year, or later?</div>
                <div className="msg msg--in" style={{ "--d": 2 } as React.CSSProperties}>Within a year. Can I visit this weekend?</div>
                <div className="msg msg--out" style={{ "--d": 3 } as React.CSSProperties}>Of course. Saturday 11 am or Sunday 4 pm?</div>
                <div className="msg msg--in" style={{ "--d": 4 } as React.CSSProperties}>Sunday 4 pm 👍</div>
                <div className="msg msg--sys" style={{ "--d": 5 } as React.CSSProperties}>Visit booked. Sales head alerted.</div>
              </div>
            </div>
            <p className="muted" style={{ textAlign: "center", fontSize: "var(--step--1)", marginTop: 20 }}>Sample conversation with a fictional project.</p>
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
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="callout">
            <div>
              <p className="kicker" style={{ marginBottom: 12 }}>Founding pilot, after a free audit</p>
              <h2 className="h3" style={{ fontSize: "var(--step-3)", marginBottom: 14 }}>60 days, and you pay only if site visits go up.</h2>
              <p className="muted" style={{ maxWidth: "40em" }}>
                We start with a free audit of your lead response and measure your site visits per 100 leads. The 60-day pilot runs on one project with no setup fee and no monthly fee. At day 60 you get a report against that baseline, and if visits did not go up you owe nothing. We are a new studio with no published case study, so that report is how you judge us.
              </p>
            </div>
            <Link className="btn btn--primary" href="/contact?topic=minute-one">Apply for a pilot slot</Link>
          </div>

          <h2 className="sub-h" style={{ marginTop: 96 }}>Questions developers ask</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See what your leads are waiting for." text="Send us last month's lead export. We'll show you your real first-response time and how many buyers went cold, free." topic="minute-one" />
    </>
  );
}
