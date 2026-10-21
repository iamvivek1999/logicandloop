import Link from "next/link";
import Spine from "@/components/Spine";
import CtaBand from "@/components/CtaBand";
import SampleLog from "@/components/SampleLog";
import { groups, servicesIn, services } from "@/lib/services";
import { bookingHref, bookingReady, site, whatsappHref } from "@/lib/site";

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};

const run = [
  { when: "Week 1", h: "Understand", p: "A working session on your goals, users and the numbers that matter. You get a clear scope and a fixed quote." },
  { when: "Weeks 1–3", h: "Design", p: "Flows and screens you can click through before a line of production code is written." },
  { when: "Weekly releases", h: "Build", p: "Weekly demos on a live link. You see progress every week and can change direction early." },
  { when: "Ongoing", h: "Launch & improve", p: "We ship, watch the numbers, and keep improving on a monthly plan, or hand over to your team with full docs." },
];

const terms = [
  { t: "New studio", d: "We have no case studies yet, so we agree on the number that matters, like visits booked or hours saved, and report on it every week." },
  { t: "Fixed scope and quote", d: "Every engagement starts with a written scope and a price. If the scope changes, you hear about it before the invoice does." },
  { t: "Senior hands", d: "You work directly with the people building your product. No account-manager relay." },
  { t: "You own it", d: "Code, cloud accounts and domains are in your name from day one." },
  { t: "No lock-in", d: "Monthly plans, not long contracts. Stay because it works." },
  { t: "Safe AI", d: "Agents answer only from approved information and hand off to a person when unsure." },
];

export default function Home() {
  return (
    <Spine>
      <section className="hero">
        <div className="wrap">
          <h1 className="display" data-stop>We write the logic. Your business runs the loop.</h1>
          <div className="hero__foot">
            <p className="lead">
              A small senior engineering studio building web apps, mobile apps, AI agents and the automations that tie them together.
            </p>
            <div className="hero__cta">
              <a className="btn btn--primary" href={bookingHref} {...ext}>Book a 30-minute call</a>
              <Link className="btn btn--outline" href="/services">See all {services.length} services</Link>
            </div>
          </div>
          <ul className="facts">
            <li>Fixed quotes</li>
            <li>Replies {site.replyPromise}</li>
            <li>Code and accounts in your name</li>
          </ul>
        </div>
      </section>

      <section className="section section--rule" id="services" aria-labelledby="svc-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="svc-h" className="h2" data-stop>Everything a product needs, from first sketch to long after launch.</h2>
            <p className="lead">Pick one service or hand us the whole thing. Every engagement starts with a fixed scope and a fixed quote.</p>
          </div>
          <div className="index">
            {groups.map((g) => (
              <div className="index__group" key={g.id}>
                <div className="index__head">
                  <h3 className="h3">{g.name}</h3>
                  <p>{g.blurb}</p>
                </div>
                <ul className="index__list">
                  {servicesIn(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link className="index__row" href={`/services/${s.slug}`}>
                        <span className="index__name">{s.name}</span>
                        <span className="index__short">{s.short}</span>
                        <span className="index__time">{s.timeline}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="products" aria-labelledby="prod-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="prod-h" className="h2" data-stop>Two products of our own.</h2>
            <p className="lead">
              Built from the work we kept doing for clients, so you can switch them on in weeks instead of building from scratch.
            </p>
          </div>
          <div className="prods">
            <article className="prod prod--fill">
              <p className="prod__for">For real estate developers</p>
              <h3>Minute One</h3>
              <p>
                Replies to a property enquiry on WhatsApp within a minute, asks the buyer a few questions and books the site visit. It only says what is in your brochure, and we measure the reply time in every report.
              </p>
              <div className="sample" role="img" aria-label="Sample conversation between a buyer and Minute One">
                <p className="sample__in">Hi, saw your ad. Is the 2-bedroom still available?</p>
                <p className="sample__out">Hi Sara! Yes, 2-bedroom homes start at AED 1.1 M on floors 4–12. Are you looking to move in within a year?</p>
                <p className="sample__in">Within a year. Can I visit this weekend?</p>
                <p className="sample__out">Of course. Saturday 11 am or Sunday 4 pm?</p>
                <p className="sample__sys">Visit booked. Sales head alerted.</p>
              </div>
              <p className="sample__cap">Sample conversation, fictional project.</p>
              <div className="prod__foot">
                <Link className="btn btn--light" href="/products/minute-one">See how it works</Link>
                <span className="status">Taking founding pilots</span>
              </div>
            </article>

            <article className="prod prod--line">
              <p className="prod__for">Licensed software for teams</p>
              <h3>Loop OS</h3>
              <p>
                Your own crew of AI agents, plus the harness that runs them on your tools and data. Anything sensitive waits for a person to approve it.
              </p>
              <SampleLog />
              <div className="prod__foot">
                <Link className="btn btn--light" href="/products/loop-os">Explore Loop OS</Link>
                <span className="status status--soon">Early access</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="process" aria-labelledby="proc-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="proc-h" className="h2" data-stop>Small team, short loops, real software in your hands early.</h2>
            <p className="lead">The same four stages for a two-week automation or a six-month platform.</p>
          </div>
          <ol className="run">
            {run.map((r) => (
              <li key={r.h}>
                <span className="run__when">{r.when}</span>
                <h3 className="h3">{r.h}</h3>
                <p>{r.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="who-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="who-h" className="h2" data-stop>For businesses where every lead and every customer is worth a lot.</h2>
            <p className="lead">
              We work mostly with real estate developers, premium clinics, education and edtech companies, startups and service businesses. This is how we work with them.
            </p>
          </div>
          <dl className="terms">
            {terms.map((x) => (
              <div key={x.t}><dt>{x.t}</dt><dd>{x.d}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand whatsapp={whatsappHref()} stop />
    </Spine>
  );
}
