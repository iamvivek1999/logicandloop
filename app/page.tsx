import Link from "next/link";
import HeroStage from "@/components/scenes/HeroStage";
import UseCases from "@/components/UseCases";
import { HoursCalc, ServiceTabs, Shift } from "@/components/HomeParts";
import { Arrow, WhatsApp } from "@/components/Icons";
import { stepArt } from "@/components/StepArt";
import { services } from "@/lib/services";
import { bookingHref, bookingReady, site, whatsappHref } from "@/lib/site";

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};
const tints = ["sun", "sage", "lilac", "peach", "sky"] as const;

// Promises the studio already makes elsewhere on the site, shown as numbers.
const pledges = [
  { n: 1, unit: "working day", p: "to reply to every enquiry, by a person." },
  { n: 1, unit: "week", p: "from the first call to a written scope and a fixed quote." },
  { n: 7, unit: "days", p: "between demos, always on a live link you can click." },
  { n: 100, unit: "%", p: "of the code, cloud accounts and domains in your name." },
];

const run = [
  { when: "Week 1", h: "Understand", p: "A working session on your goals, users and the numbers that matter. You get a clear scope and a fixed quote." },
  { when: "Weeks 1–3", h: "Design", p: "Flows and screens you can click through before a line of production code is written." },
  { when: "Weekly releases", h: "Build", p: "Weekly demos on a live link. You see progress every week and can change direction early." },
  { when: "Ongoing", h: "Launch & improve", p: "We ship, watch the numbers, and keep improving on a monthly plan, or hand over to your team with full docs." },
];

const agents = [
  {
    h: "Agents that talk",
    p: "Chat and WhatsApp agents that answer, qualify, book and follow up, in your voice, at any hour.",
    tags: ["WhatsApp replies", "Lead qualifying", "Bookings"],
    href: "/services/ai-agents-chatbots",
  },
  {
    h: "Agents that read",
    p: "Turn brochures, manuals, contracts and records into answers your team and customers can simply ask for.",
    tags: ["Document Q&A", "Extraction", "Search"],
    href: "/services/llm-rag-integration",
  },
  {
    h: "Agents that run",
    p: "Workflows that move data between your tools, draft the routine work and wait for a person on anything that matters.",
    tags: ["CRM updates", "Quotes & invoices", "Approvals"],
    href: "/services/workflow-automation",
  },
];

const compare = [
  ["Price", "Hourly rates, open-ended", "Fixed scope and fixed quote"],
  ["Who builds it", "Juniors behind an account manager", "The senior people you talk to"],
  ["Seeing progress", "A report at the end of the month", "A demo on a live link every week"],
  ["Ownership", "Code and accounts in the vendor's name", "Everything in your name from day one"],
  ["Contract", "Long lock-in", "Monthly plans"],
  ["AI", "A demo that never reaches customers", "Live agents with a person in the loop"],
];

const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on the scope, so every engagement starts with a working session and then a written scope with a fixed quote. Audits and workshops are fixed-price; larger builds are quoted phase by phase. You know the number before any work starts.",
  },
  {
    q: "How long does it take?",
    a: "A workflow automation or WhatsApp integration usually goes live in one to four weeks. A web app's first release takes six to twelve weeks, and a mobile app eight to fourteen weeks to store launch. Each service page lists its typical timeline.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do. The repository, cloud accounts and domains are in your name from day one, so you can take the work to another team at any time.",
  },
  {
    q: "You're a new studio. Why should we trust you with this?",
    a: "Because you don't have to take our word for it. We agree on the one number that matters, like qualified next steps or hours saved, report on it every week, and work on monthly plans rather than long contracts.",
  },
  {
    q: "Will an AI agent say the wrong thing to our customers?",
    a: "Our agents answer only from information you have approved, and hand the conversation to a person when they are unsure. In Loop OS, anything sensitive waits for someone on your team to approve it.",
  },
  {
    q: "Who is Minute One for?",
    a: "Minute One is built for teams that depend on fast lead response: real estate developers, premium clinics, education and edtech companies, startups and service businesses. It adapts the questions and next step to your sales process.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  const rowA = services.slice(0, Math.ceil(services.length / 2));
  const rowB = services.slice(Math.ceil(services.length / 2));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="hero">
        <div className="hero__mesh" aria-hidden="true" />
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <h1 className="display hero__h">
              <span className="line"><span>We write the logic.</span></span>{" "}
              <span className="line"><span className="tone">Your business runs the loop.</span></span>
            </h1>
            <div className="hero__foot">
              <p className="lead">
                A small senior engineering studio building web apps, mobile apps, AI agents and the automations that tie them together.
              </p>
              <div className="hero__cta">
                <a className="btn btn--ring" href={bookingHref} data-analytics="booking_click" {...ext}>
                  Book a 30-minute call
                  <span className="btn__go"><Arrow /></span>
                </a>
                <Link className="btn btn--outline" href="/services">See all {services.length} services</Link>
              </div>
            </div>
          </div>
          <HeroStage />
        </div>
        <div className="wrap">
          <dl className="counters" data-reveal="stagger">
            {pledges.map((x) => (
              <div key={x.p}>
                <dt>
                  <span data-count={x.n}>{x.n}</span>
                  {x.unit === "%" ? "%" : <small> {x.unit}</small>}
                </dt>
                <dd>{x.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Decorative: the service tabs below link every service. */}
      <section className="rows" aria-hidden="true">
        {[rowA, rowB].map((row, r) => (
          <div className={`rows__row${r ? " rows__row--rev" : ""}`} key={r}>
            {[0, 1].map((copy) => (
              <ul className="rows__track" key={copy}>
                {row.map((s, i) => (
                  <li key={s.slug} className={`tint--${tints[(i + r * 2) % tints.length]}`}>
                    <b>{s.name}</b>
                    <span>{s.timeline}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </section>

      <section className="glow" aria-labelledby="gap-h">
        <div className="wrap">
          <div className="center-head">
            <p className="kicker">Why we exist</p>
            <h2 id="gap-h" className="h2">
              The expensive work happens between your tools. <span className="tone">We write the logic that closes the gaps.</span>
            </h2>
            <p className="lead">Flip the switch to see the same business with one senior team building the whole loop.</p>
          </div>
          <Shift />
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="svc-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Services</p>
              <h2 id="svc-h" className="h2">Everything a product needs, <span className="tone">from first sketch to long after launch.</span></h2>
            </div>
            <p className="lead">Pick one service or hand us the whole thing. Every engagement starts with a fixed scope and a fixed quote.</p>
          </div>
          <div data-reveal>
            <ServiceTabs />
          </div>
        </div>
      </section>

      <section className="section section--rule" id="use-cases" aria-labelledby="uc-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Where it helps</p>
              <h2 id="uc-h" className="h2">From the first enquiry <span className="tone">to the work that follows it.</span></h2>
            </div>
            <p className="lead">We work mostly with businesses where every lead and every customer is worth a lot. Here is what the routine part looks like once it runs itself.</p>
          </div>
          <div data-reveal>
            <UseCases />
          </div>
        </div>
      </section>

      <section className="glow" id="ai" aria-labelledby="ai-h">
        <div className="wrap">
          <div className="center-head">
            <p className="kicker">AI automation &amp; transformation</p>
            <h2 id="ai-h" className="h2">Three kinds of agents. <span className="tone">One quieter workday.</span></h2>
            <p className="lead">Most of what we automate falls into one of three jobs. Most businesses need all three, wired together.</p>
          </div>
          <div className="agents" data-reveal="stagger">
            {agents.map((a) => (
              <Link key={a.h} href={a.href} className="agent">
                <h3>{a.h}</h3>
                <p>{a.p}</p>
                <ul>
                  {a.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="agent__more">See how <Arrow /></span>
              </Link>
            ))}
          </div>
          <div className="calc-block">
            <div className="center-head">
              <h3 className="h2 h2--sm">How much repetitive work could your team <span className="tone">hand off?</span></h3>
              <p className="lead">Choose a task, describe the effort and see where automation could give your team capacity back.</p>
            </div>
            <HoursCalc />
          </div>
        </div>
      </section>

      <section className="section" id="products" aria-labelledby="prod-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Products</p>
              <h2 id="prod-h" className="h2">Products built around the work businesses repeat.</h2>
            </div>
            <p className="lead">Minute One handles the front door. Loop OS runs the work behind it. Both start from a real workflow, not a blank chat box.</p>
          </div>
          <div className="cards" data-reveal="stagger">
            <Link href="/products/minute-one" className="card">
              <div className="card__thumb tint--sage card-chat">
                <span className="product-card__status">Founding pilots open</span>
                <div className="card-chat__flow" aria-hidden="true">
                  <p className="card-chat__in">New enquiry</p>
                  <span>↓</span>
                  <p className="card-chat__out">Instant reply + qualification</p>
                  <span>↓</span>
                  <p className="card-chat__sys">Next step booked · Team alerted</p>
                </div>
              </div>
              <div className="product-card__meta"><span>Minute One</span><b>Lead response</b></div>
              <h3>Turn new enquiries into the next useful conversation.</h3>
              <p>Replies on WhatsApp within a minute, answers routine questions, qualifies the lead and books a site visit, consultation, counselling call, demo or discovery call.</p>
              <div className="product-card__tags" aria-label="Minute One audiences">
                <span>Real estate</span><span>Clinics</span><span>Education</span><span>Startups</span><span>Services</span>
              </div>
              <span className="product-card__cta">Get a free lead-response audit <Arrow /></span>
            </Link>
            <Link href="/products/loop-os" className="card">
              <div className="card__thumb tint--sun card-log">
                <span className="product-card__status">Early access</span>
                <div className="card-log__flow" aria-hidden="true">
                  <p><time>09:02</time>Agent receives a task</p>
                  <p><time>09:03</time>Checks approved information</p>
                  <p className="is-wait"><time>09:03</time>Waiting for your approval</p>
                  <p className="card-log__done"><time>09:04</time>Action logged</p>
                </div>
              </div>
              <div className="product-card__meta"><span>Loop OS</span><b>Agent operations</b></div>
              <h3>Run repeatable work with AI agents you can trust.</h3>
              <p>Your own crew of agents connected to your tools, with permissions, approvals and an audit trail for every important action.</p>
              <div className="product-card__tags" aria-label="Loop OS workflows">
                <span>Operations</span><span>Sales</span><span>Support</span><span>Reporting</span>
              </div>
              <span className="product-card__cta">Join early access <Arrow /></span>
            </Link>
          </div>
          <p className="products-bridge">Need something specific? <Link href="/services">Explore custom systems for your workflow <Arrow /></Link></p>
        </div>
      </section>

      <section className="section night" id="process" aria-labelledby="proc-h">
        <div className="wrap">
          <div className="section-head section-head--center">
            <p className="kicker">How it works</p>
            <h2 id="proc-h" className="h2">Small team, short loops, <span className="tone">real software in your hands early.</span></h2>
            <p className="lead">The same four stages for a two-week automation or a six-month platform.</p>
          </div>
          <ol className="steps" data-reveal="stagger">
            {run.map((r, i) => {
              const Art = stepArt[i];
              return (
                <li key={r.h}>
                  <span className="steps__n">Step {String(i + 1).padStart(2, "0")} · {r.when}</span>
                  <h3 className="h3">{r.h}</h3>
                  <div className="steps__art"><Art /></div>
                  <p>{r.p}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section" id="why" aria-labelledby="cmp-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Why us</p>
              <h2 id="cmp-h" className="h2">Most agencies sell hours. <span className="tone">We ship systems.</span></h2>
            </div>
            <p className="lead">We have no case studies yet, so we agree on the number that matters, like visits booked or hours saved, and report on it every week.</p>
          </div>
          <div className="cmp" role="table" aria-label="How we compare" data-reveal>
            <div className="cmp__row cmp__row--head" role="row">
              <span role="columnheader">What matters</span>
              <span role="columnheader">What you often get</span>
              <span role="columnheader">Logic &amp; Loop</span>
            </div>
            {compare.map(([k, a, b]) => (
              <div className="cmp__row" role="row" key={k}>
                <span role="rowheader">{k}</span>
                <span role="cell">{a}</span>
                <span role="cell">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--rule" id="faq" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">FAQ</p>
              <h2 id="faq-h" className="h2">Questions people ask <span className="tone">before the first call.</span></h2>
            </div>
            <p className="lead">Anything else, ask on WhatsApp or the contact form. A person replies {site.replyPromise}.</p>
          </div>
          <div className="faq" data-reveal>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing" aria-labelledby="final-h">
        <div className="wrap">
          <p className="kicker">Get started</p>
          <h2 id="final-h" className="h2">Your team is too good to spend the day <span className="tone">on busywork.</span></h2>
          <p className="lead">A 30-minute call is enough to tell you whether we&rsquo;re the right team, what it would take and roughly what it would cost.</p>
          <div className="hero__cta closing__cta">
            <a className="btn btn--ring" href={bookingHref} data-analytics="booking_click" {...ext}>
              Book a 30-minute call
              <span className="btn__go"><Arrow /></span>
            </a>
            <a className="btn btn--outline" href={whatsappHref()} target="_blank" rel="noopener" data-analytics="whatsapp_click">
              <WhatsApp className="ico" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
