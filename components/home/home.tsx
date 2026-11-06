import Link from "next/link";
import { Shift } from "@/components/HomeParts";
import StackSteps from "@/components/fx/StackSteps";
import LeadFeed from "@/components/fx/LeadFeed";
import BeamHub from "@/components/fx/BeamHub";
import Photo, { type PhotoName } from "@/components/Photo";
import { Logo } from "@/components/Icons";
import { groups, servicesIn } from "@/lib/services";
import { run } from "./sections";

/**
 * Home page sections in the new design. Sections kept from the previous home
 * page (industries, agents, why us, closing) still come from ./sections.
 */

const marquee = ["Web apps", "Mobile apps", "AI agents", "Workflow automation", "Integrations", "Data & dashboards", "LLM & RAG", "Cloud & DevOps", "Product design", "Custom ERP & CRM"];
const pledges = [
  { n: "1", unit: "working day", p: "to reply to every enquiry, by a person" },
  { n: "1", unit: "week", p: "from first call to a written scope and a fixed quote" },
  { n: "7", unit: "days", p: "between demos, always on a live link" },
  { n: "100%", unit: "", p: "of the code, cloud accounts and domains in your name" },
];

/** Graphite-style marquee and statement, then the before/after switch. */
export function Proof() {
  return (
    <>
      <div className="h-marquee" aria-hidden="true">
        <div className="h-marquee__track">
          {[...marquee, ...marquee].map((w, n) => <span key={n}>{w}<Logo small reversed /></span>)}
        </div>
      </div>
      <section className="h-intro" aria-labelledby="h-intro">
        <div className="wrap h-intro__grid">
          <p className="h-kicker">Who we are</p>
          <h2 id="h-intro" className="h-statement">
            A technology services company for teams that need software <em>shipped</em>, not slides. We design, build and run it, and <em>answer</em> for every line.
          </h2>
          <dl className="h-stats">
            {pledges.map((x) => <div key={x.p}><dt>{x.n}{x.unit && <small>{x.unit}</small>}</dt><dd>{x.p}</dd></div>)}
          </dl>
        </div>
      </section>
      <section className="glow" aria-labelledby="gap-h">
        <div className="wrap">
          <div className="center-head">
            <p className="kicker">Why we exist</p>
            <h2 id="gap-h" className="h2">
              The expensive work happens between your tools. <span className="tone">We write the logic that closes the gaps.</span>
            </h2>
            <p className="lead">Flip the switch to see the same business with one accountable team running the whole loop.</p>
          </div>
          <Shift />
        </div>
      </section>
    </>
  );
}

const groupPhoto: Partial<Record<string, PhotoName>> = { build: "team-laptops", ai: "analytics-dashboard", automate: "network-cables", advise: "team-whiteboard" };

/** Daylight-style photo cards, one per practice (talent assessment lives on its own pages). */
export function Services() {
  const cards = groups.filter((g) => g.id !== "hiring");
  return (
    <section className="h-sec" id="services" aria-labelledby="h-svc">
      <div className="wrap">
        <div className="h-head">
          <p className="h-eyebrow">Capabilities</p>
          <h2 id="h-svc" className="h-h2">20+ services, organised the way you buy them.</h2>
          <Link href="/services" className="h-link">Browse all services <Arrow /></Link>
        </div>
        <div className="h-cards">
          {cards.map((g) => {
            const items = servicesIn(g.id);
            return (
              <Link key={g.id} href={`/services/${items[0].slug}`} className="h-card">
                <Photo name={groupPhoto[g.id] ?? "team-laptops"} className="h-card__img" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
                <div className="h-card__body">
                  <p className="h-card__top">{g.name}</p>
                  <h3>{g.blurb}</h3>
                  <p className="h-card__tags">{items.slice(0, 4).map((s) => <span key={s.slug}>{s.name}</span>)}</p>
                </div>
                <span className="h-card__go" aria-hidden="true"><ArrowUR /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Daylight rows with the current site's live visuals and copy. */
export function Products() {
  return (
    <section className="h-sec h-mist" id="products" aria-labelledby="prod-h">
      <div className="wrap">
        <div className="h-head">
          <p className="h-eyebrow">Products</p>
          <h2 id="prod-h" className="h-h2">Products built around the work businesses repeat.</h2>
          <p className="h-sub">Minute One handles the front door. Loop OS runs the work behind it. Both start from a real workflow, not a blank chat box.</p>
        </div>
        <div className="h-prods">
          <Link href="/products/minute-one" className="h-prod">
            <div className="h-prod__copy">
              <p className="h-prod__tag">Minute One · Lead response <em>Founding pilots open</em></p>
              <h3>Turn new enquiries into the next useful conversation.</h3>
              <p>Replies on WhatsApp within a minute, answers routine questions, qualifies the lead and books a site visit, consultation, counselling call, demo or discovery call.</p>
              <p className="h-prod__chips"><span>Real estate</span><span>Clinics</span><span>Education</span><span>Startups</span><span>Services</span></p>
              <span className="h-link">Get a free lead-response audit <Arrow /></span>
            </div>
            <div className="card__thumb card__thumb--feed h-prod__art"><LeadFeed /></div>
          </Link>
          <Link href="/products/loop-os" className="h-prod">
            <div className="h-prod__copy">
              <p className="h-prod__tag">Loop OS · Agent operations <em>Early access</em></p>
              <h3>Run repeatable work with AI agents you can trust.</h3>
              <p>Your own crew of agents connected to your tools, with permissions, approvals and an audit trail for every important action.</p>
              <p className="h-prod__chips"><span>Operations</span><span>Sales</span><span>Support</span><span>Reporting</span></p>
              <span className="h-link">Join early access <Arrow /></span>
            </div>
            <div className="card__thumb card__thumb--hub h-prod__art"><BeamHub /></div>
          </Link>
        </div>
        <p className="products-bridge">Need something specific? <Link className="link-draw" href="/services">Explore custom systems for your workflow</Link></p>
      </div>
    </section>
  );
}

/** The stacking steps, restyled in the midnight palette. */
export function Process() {
  return (
    <section className="section night h-night" id="process" aria-labelledby="proc-h">
      <div className="h-night__sky" aria-hidden="true" />
      <div className="wrap">
        <div className="section-head section-head--center">
          <p className="h-chip h-chip--still"><i aria-hidden="true" />Delivery model</p>
          <h2 id="proc-h" className="h2">Short loops, <span className="h-sun">working software early.</span></h2>
          <p className="lead">The same four stages for a two-week automation or a six-month platform.</p>
        </div>
        <StackSteps steps={run} />
      </div>
    </section>
  );
}

/** Photo band, global rather than local. */
export function Global() {
  return (
    <section className="india" aria-labelledby="global-h">
      <Photo name="glass-atrium" className="india__img" sizes="100vw" />
      <div className="wrap india__inner">
        <h2 id="global-h" className="india__h">One team. Every time zone.<br />Systems that never clock out.</h2>
        <p className="india__p">Software, AI and automation for businesses that run on their systems every day, wherever their customers are.</p>
      </div>
    </section>
  );
}

const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const ArrowUR = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
