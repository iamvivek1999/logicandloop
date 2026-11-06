import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { baseOpenGraph, whatsappHref } from "@/lib/site";
import Faq from "@/components/fx/Faq";
import Photo from "@/components/Photo";
import { industries } from "@/lib/industries";
import "@/app/zen.css";

const description =
  "Minute One replies to new enquiries on WhatsApp within a minute, answers routine questions, qualifies leads and books the next step for growing teams.";

export const metadata: Metadata = {
  title: "Minute One: WhatsApp lead-response agent for growing teams",
  description,
  openGraph: { ...baseOpenGraph, title: "Minute One: WhatsApp lead-response agent for growing teams", description },
};

const features = [
  { h: "Aims to reply within a minute", p: "Leads from ads, landing pages and messaging channels get an answer while they're still engaged. We measure reply time and report it every week." },
  { h: "Answers from your approved information", p: "Pricing, availability, treatment details, course information and service FAQs come from the documents you approve. If it isn't there, it says it will check and hands off." },
  { h: "Books the next useful step", p: "A site visit, consultation, counselling call, product demo or discovery call can be booked directly in the conversation, with reminders to reduce no-shows." },
  { h: "Hands hot leads to your team", p: "Your team gets an alert with the conversation, qualification details and a clear response deadline, so the right person can take over quickly." },
  { h: "Works with your existing CRM", p: "No switching tools. Every conversation and booking is logged where your team already works." },
  { h: "Configured for your sales process", p: "The questions, tone, routing and booking action change around your business, whether you sell properties, healthcare, education, software or services." },
];

const promises = [
  { n: "1", u: "minute", p: "target reply time, measured and reported every week" },
  { n: "24/7", u: "", p: "answers from your approved information, nights and weekends included" },
  { n: "60", u: "days", p: "founding pilot, after a free lead-response audit" },
  { n: "0", u: "setup fee", p: "and no monthly fee during the pilot" },
];
const flow = [
  { h: "Enquiry arrives", p: "From an ad, portal, landing page or WhatsApp, at any hour." },
  { h: "Minute One answers", p: "Within a minute, from the information you approved." },
  { h: "Qualifies the lead", p: "One useful question at a time: need, budget, timing." },
  { h: "Books the next step", p: "Visit, consultation, demo or call, and alerts your team." },
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
    <div className="z">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <section className="z-hero" aria-labelledby="m1-h">
        <div className="z-wrap">
          <div className="zx-hero zx-hero--photo">
            <Photo name="city-window" className="zx-hero__img" priority sizes="100vw" alt="" />
            <div className="zx-hero__copy">
              <ol className="crumbs" aria-label="Breadcrumb">
                <li><Link href="/">Home</Link></li>
                <li>Products</li>
                <li aria-current="page">Minute One</li>
              </ol>
              <p className="z-over">Minute One · WhatsApp lead response</p>
              <h1 id="m1-h">New enquiries answered within a minute.</h1>
              <p className="zx-hero__p">Leads go cold while they wait for a reply. Minute One answers on WhatsApp within a minute, handles routine questions, qualifies the lead and books the next step: a site visit, consultation, counselling call, product demo or discovery call.</p>
              <div className="z-cta">
                <Link className="z-btn z-btn--sun" href="/contact?topic=minute-one">Get a free lead-response audit</Link>
                <a className="z-btn z-btn--glass" href={whatsappHref("Hi, I'd like to see a Minute One demo.")} target="_blank" rel="noopener">See a live demo on WhatsApp</a>
              </div>
              <p className="zx-hero__fine">Free audit · 60-day pilot · Pay only if qualified next steps go up</p>
            </div>
            <div className="zx-hero__vis">
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
              <small>Sample conversation; the questions and next step adapt to your business.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="z-proof" aria-label="What Minute One commits to">
        <div className="z-wrap">
          <p className="z-over z-over--dark">What you can hold us to</p>
          <dl className="z-stats">
            {promises.map((x) => <div key={x.p}><dt>{x.n}{x.u && <small> {x.u}</small>}</dt><dd>{x.p}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="m1-flow">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">How it works</p>
            <h2 id="m1-flow" className="z-h2">From first message to a booked next step.</h2>
            <p className="z-sub">Everything between a lead arriving and the next useful conversation with your team.</p>
          </div>
          <ol className="zx-flow">
            {flow.map((f, n) => <li key={f.h}><span>0{n + 1}</span><b>{f.h}</b><p>{f.p}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="m1-does">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">What Minute One does</p>
            <h2 id="m1-does" className="z-h2">Fast, accurate and on your terms.</h2>
          </div>
          <div className="zx-feats">
            {features.map((f, n) => (
              <article className="zx-feat" key={f.h}><i aria-hidden="true">0{n + 1}</i><h3>{f.h}</h3><p>{f.p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="m1-for">
        <div className="z-wrap">
          <div className="z-head z-head--row">
            <div>
              <p className="z-over z-over--dark">Built for</p>
              <h2 id="m1-for" className="z-h2">Teams where every enquiry is worth a lot.</h2>
            </div>
            <Link href="/industries" className="z-link">All industries →</Link>
          </div>
          <div className="z-inds">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="z-ind">
                <Photo name={i.photo} className="z-ind__img" sizes="(max-width: 900px) 50vw, 25vw" alt="" />
                <b>{i.name}</b><span>{i.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="m1-pilot">
        <div className="z-wrap zx-offer">
          <div className="z-head" style={{ margin: 0 }}>
            <p className="z-over z-over--dark">Founding pilot</p>
            <h2 id="m1-pilot" className="z-h2">60 days, and you pay only if qualified next steps go up.</h2>
            <ol className="zx-steps">
              <li><span>01</span><div><b>Free lead-response audit</b><p>We measure your real first-response time and agree the conversion that matters: visits, consultations, calls or demos.</p></div></li>
              <li><span>02</span><div><b>60-day pilot</b><p>Minute One runs on your WhatsApp with no setup fee and no monthly fee.</p></div></li>
              <li><span>03</span><div><b>Day-60 report</b><p>Results against the baseline. If qualified next steps did not go up, you owe nothing.</p></div></li>
            </ol>
          </div>
          <article className="zp-tier is-pop">
            <span className="zp-tier__pop">Founding pilots open</span>
            <h3>Minute One pilot</h3>
            <p className="zp-for">For teams that depend on fast lead response.</p>
            <p className="zp-price">Pay on results<small>no setup fee · no monthly fee for 60 days</small></p>
            <ul>
              <li>Replies on WhatsApp within a minute</li>
              <li>Answers from your approved information</li>
              <li>Qualifies leads and books the next step</li>
              <li>Hot leads handed to your team with context</li>
              <li>Logged in your existing CRM</li>
            </ul>
            <Link className="z-btn z-btn--sun" href="/contact?topic=minute-one">Apply for a pilot slot</Link>
          </article>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="m1-faq">
        <div className="z-wrap z-faq">
          <div className="z-head">
            <p className="z-over z-over--dark">FAQ</p>
            <h2 id="m1-faq" className="z-h2">Questions teams ask.</h2>
            <Link href="/faq" className="z-link">View all FAQs →</Link>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="See what your leads are waiting for." text="Send us last month's lead export. We'll show you your real first-response time and how many prospects went cold, free." topic="minute-one" />
    </div>
  );
}
