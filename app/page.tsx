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
