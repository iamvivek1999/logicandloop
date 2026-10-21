import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { whatsappHref } from "@/lib/site";
import { WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Minute One: WhatsApp lead-response agent for growing teams",
  description:
    "Minute One replies to new enquiries on WhatsApp within a minute, answers routine questions, qualifies leads and books the next step for growing teams.",
};

const features = [
  { h: "Aims to reply within a minute", p: "Leads from ads, landing pages and messaging channels get an answer while they're still engaged. We measure reply time and report it every week." },
  { h: "Answers from your approved information", p: "Pricing, availability, treatment details, course information and service FAQs come from the documents you approve. If it isn't there, it says it will check and hands off." },
  { h: "Books the next useful step", p: "A site visit, consultation, counselling call, product demo or discovery call can be booked directly in the conversation, with reminders to reduce no-shows." },
  { h: "Hands hot leads to your team", p: "Your team gets an alert with the conversation, qualification details and a clear response deadline, so the right person can take over quickly." },
  { h: "Works with your existing CRM", p: "No switching tools. Every conversation and booking is logged where your team already works." },
  { h: "Configured for your sales process", p: "The questions, tone, routing and booking action change around your business, whether you sell properties, healthcare, education, software or services." },
];

const faqs = [
  { q: "Will it annoy prospects like other bots?", a: "It asks one useful question at a time, answers from your approved information and hands over to a person the moment a prospect asks for one." },
  { q: "What if it gives the wrong answer?", a: "It can only answer from information you approve. Anything missing, uncertain or sensitive goes to your team instead of being guessed." },
  { q: "How do we know it's working?", a: "We agree on the next-step metric before starting — such as consultations, counselling calls, demos, site visits or discovery calls — and report against that baseline every week." },
  { q: "How long does setup take?", a: "Setup covers your approved information, qualification questions, routing and calendar or CRM connection. Timing depends on your accounts and the WhatsApp Business API approval process." },
];

export default function MinuteOne() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Minute One",
    applicationCategory: "BusinessApplication",
    description: "A WhatsApp lead-response agent for real estate developers, premium clinics, education and edtech companies, startups and service businesses.",
    creator: { "@type": "Organization", name: "Logic & Loop" },
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <section className="p-hero">
        <div className="wrap p-hero__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li>Products</li>
              <li aria-current="page">Minute One</li>
            </ol>
            <p className="kicker" style={{ marginBottom: 18 }}>For teams that depend on fast lead response</p>
            <h1 className="display" style={{ fontSize: "var(--step-4)" }}>New enquiries answered within a minute.</h1>
            <p className="lead" style={{ marginTop: 24 }}>
              Leads go cold while they wait for a reply. Minute One answers on WhatsApp within a minute, handles routine questions, qualifies the lead and books the next step — a site visit, consultation, counselling call, product demo or discovery call.
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
              <div className="phone__status" aria-hidden="true">
                <span>11:15</span>
                <span className="status__icons"><i className="status__alarm" /><i className="status__signal" /><i className="status__wifi" /><b>85%</b></span>
              </div>
              <div className="phone__bar">
                <span className="phone__back" aria-hidden="true">‹</span>
                <div className="phone__av">M1</div>
                <div className="phone__identity"><strong>Logic &amp; Loop</strong><small>online</small></div>
                <div className="phone__tools" aria-hidden="true"><span className="phone__call" /><span className="phone__clip" /><span className="phone__menu"><i /><i /><i /></span></div>
              </div>
              <div className="chat">
                <div className="chat__date">TODAY</div>
                <div className="msg msg--in" style={{ "--d": 0 } as React.CSSProperties}>Hi! 👋<span className="msg__meta">5:09 pm</span></div>
                <div className="msg msg--in" style={{ "--d": 1 } as React.CSSProperties}>I saw your message and need some help.<span className="msg__meta">5:09 pm</span></div>
                <div className="msg msg--in" style={{ "--d": 2 } as React.CSSProperties}>Can someone answer a few questions?<span className="msg__meta">5:10 pm</span></div>
                <div className="msg msg--out" style={{ "--d": 3 } as React.CSSProperties}>Of course! What are you looking for today?<span className="msg__meta">5:10 pm <b className="msg__ticks">✓✓</b></span></div>
                <div className="msg msg--in" style={{ "--d": 4 } as React.CSSProperties}>I would like to book a consultation.<span className="msg__meta">5:15 pm</span></div>
                <div className="msg msg--out" style={{ "--d": 5 } as React.CSSProperties}>Happy to help. Thursday at 4 pm or Friday at 11 am?<span className="msg__meta">5:15 pm <b className="msg__ticks">✓✓</b></span></div>
                <div className="msg msg--in" style={{ "--d": 6 } as React.CSSProperties}>Thursday works.<span className="msg__meta">5:16 pm</span></div>
                <div className="msg msg--out" style={{ "--d": 7 } as React.CSSProperties}>Great, I have reserved that slot for you.<span className="msg__meta">5:16 pm <b className="msg__ticks">✓✓</b></span></div>
                <div className="msg msg--in" style={{ "--d": 8 } as React.CSSProperties}>Thank you!<span className="msg__meta">5:17 pm</span></div>
                <div className="msg msg--sys" style={{ "--d": 9 } as React.CSSProperties}>Consultation booked · Team alerted</div>
              </div>
              <div className="phone__composer" aria-hidden="true"><span className="composer__smile">☺</span><span className="composer__placeholder">Type a message</span><span className="composer__clip" /><span className="composer__camera" /><span className="composer__mic">●</span></div>
              <div className="phone__nav" aria-hidden="true"><span className="nav__back" /><span className="nav__home" /><span className="nav__recent" /></div>
            </div>
            <p className="muted" style={{ textAlign: "center", fontSize: "var(--step--1)", marginTop: 20 }}>Sample conversation; the questions and next step adapt to your business.</p>
          </div>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">What Minute One does.</h2>
            <p className="lead">Everything between a lead arriving and the next useful conversation with your team.</p>
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
              <h2 className="h3" style={{ fontSize: "var(--step-3)", marginBottom: 14 }}>60 days, and you pay only if qualified next steps go up.</h2>
              <p className="muted" style={{ maxWidth: "40em" }}>
                We start with a free audit of your lead response and agree on the conversion that matters to your business: a site visit, consultation, counselling call, product demo or discovery call. The 60-day pilot runs with no setup fee and no monthly fee. At day 60 you get a report against that baseline, and if qualified next steps did not go up you owe nothing.
              </p>
            </div>
            <Link className="btn btn--primary" href="/contact?topic=minute-one">Apply for a pilot slot</Link>
          </div>

          <h2 className="sub-h" style={{ marginTop: 96 }}>Questions teams ask</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See what your leads are waiting for." text="Send us last month's lead export. We'll show you your real first-response time and how many prospects went cold, free." topic="minute-one" />
    </>
  );
}
