import Link from "next/link";
import HeroStage from "@/components/scenes/HeroStage";
import { Arrow } from "@/components/Icons";
import { groups, servicesIn, services } from "@/lib/services";
import { bookingHref, bookingReady, whatsappHref } from "@/lib/site";
import CtaBand from "@/components/CtaBand";

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <h1 className="display">We write the logic. Your business runs the loop.</h1>
            <div className="hero__foot">
              <p className="lead">
                A small senior engineering studio building web apps, mobile apps, AI agents and the automations that tie them together.
              </p>
              <div className="hero__cta">
                <a className="btn btn--primary" href={bookingHref} {...ext}>Book a 30-minute call</a>
                <Link className="btn btn--outline" href="/services">See all {services.length} services</Link>
              </div>
            </div>
          </div>
          <HeroStage />
        </div>
        <div className="wrap">
          <dl className="specs">
            <div><dt><b>Web &amp; mobile</b></dt><dd>React, Next.js, React Native, Flutter</dd></div>
            <div><dt><b>AI</b></dt><dd>Agents, RAG, computer vision</dd></div>
            <div><dt><b>Cloud</b></dt><dd>AWS, Supabase, Vercel</dd></div>
            <div><dt><b>Replies</b></dt><dd>Within one working day</dd></div>
          </dl>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--rule" id="services" aria-labelledby="svc-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="svc-h" className="h2">Everything a product needs, from first sketch to long after launch.</h2>
            <p className="lead">
              Pick one service or hand us the whole thing. Every engagement starts with a fixed scope and a fixed quote.
            </p>
          </div>
          <div className="svc-rows">
            {groups.map((g) => (
              <div className="svc-row" key={g.id}>
                <div className="svc-row__head">
                  <h3 className="h3">{g.name}</h3>
                  <p>{g.blurb}</p>
                </div>
                <ul className="chips">
                  {servicesIn(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link className="chip" href={`/services/${s.slug}`}>
                        {s.name}
                        <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section ink" id="products" aria-labelledby="prod-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="prod-h" className="h2">Two products of our own.</h2>
            <p className="lead">
              Built from the work we kept doing for clients, so you can switch them on in weeks instead of building from scratch.
            </p>
          </div>
          <div className="products">
            <article className="product">
              <span className="product__tag">For real estate developers</span>
              <h3>Minute One</h3>
              <p>A WhatsApp agent that answers every property lead in under a minute, day or night, qualifies the buyer and books the site visit.</p>
              <ul>
                <li>Replies in under a minute, 24/7</li>
                <li>Answers only from your approved brochure and RERA details</li>
                <li>Books site visits and sends reminders</li>
                <li>Hands hot leads to your sales team instantly</li>
              </ul>
              <div className="product__foot">
                <Link className="btn btn--light" href="/products/minute-one">See how it works</Link>
                <span className="status">Taking 3 founding pilots</span>
              </div>
            </article>
            <article className="product">
              <span className="product__tag">Licensed software for teams</span>
              <h3>Loop OS</h3>
              <p>Your own crew of AI agents, plus the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.</p>
              <ul>
                <li>Agents for research, sales briefs, content, reporting and ops</li>
                <li>Workflows encoded once, run every day</li>
                <li>Permissions, approvals and a full audit log</li>
                <li>Cloud or self-hosted licence</li>
              </ul>
              <div className="product__foot">
                <Link className="btn btn--light" href="/products/loop-os">Explore Loop OS</Link>
                <span className="status status--soon">Early access</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process" aria-labelledby="proc-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="proc-h" className="h2">Small team, short loops, real software in your hands early.</h2>
            <p className="lead">The same four stages for a two-week automation or a six-month platform.</p>
          </div>
          <ol className="steps">
            <li className="step">
              <h3 className="h3">Understand</h3>
              <p>A working session on your goals, users and the numbers that matter. You get a clear scope and a fixed quote.</p>
              <small>Week 1</small>
            </li>
            <li className="step">
              <h3 className="h3">Design</h3>
              <p>Flows and screens you can click through before a line of production code is written.</p>
              <small>Weeks 1–3</small>
            </li>
            <li className="step">
              <h3 className="h3">Build</h3>
              <p>Weekly demos on a live link. You see progress every week and can change direction early.</p>
              <small>Weekly releases</small>
            </li>
            <li className="step">
              <h3 className="h3">Launch &amp; improve</h3>
              <p>We ship, watch the numbers, and keep improving on a monthly plan, or hand over to your team with full docs.</p>
              <small>Ongoing</small>
            </li>
          </ol>
        </div>
      </section>

      {/* WHO */}
      <section className="section section--rule" aria-labelledby="who-h">
        <div className="wrap who">
          <div>
            <h2 id="who-h" className="h2">For businesses where every lead and every customer is worth a lot.</h2>
            <ul className="tags">
              <li>Real estate developers</li>
              <li>Premium clinics</li>
              <li>Education &amp; edtech</li>
              <li>Startups</li>
              <li>Service businesses</li>
            </ul>
          </div>
