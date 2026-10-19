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
