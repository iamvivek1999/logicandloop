import Link from "next/link";
import Photo from "@/components/Photo";
import Faq from "@/components/fx/Faq";
import { industries } from "@/lib/industries";
import { faqs } from "@/lib/faqs";
import { bookingHref } from "@/lib/site";
import "../zen.css";

/**
 * Zendesk-inspired home (lab). Warm light canvas, a rounded photo hero led by
 * a concrete promise, our pledges as the proof band, a repeated "every loop
 * runs better" idea, four-part capability blocks, a startup programme and a
 * pricing teaser. Same real copy as the live site; no invented numbers.
 */
const pledges = [
  { n: "1", u: "working day", p: "to reply to every enquiry, by a person" },
  { n: "1", u: "week", p: "from first call to a written scope and fixed quote" },
  { n: "7", u: "days", p: "between demos on a live link" },
  { n: "100%", u: "", p: "of code, cloud accounts and domains in your name" },
];
const loop = [
  { h: "Scope", p: "One working session, one number that matters, one fixed quote." },
  { h: "Ship", p: "A demo on a live link every week. You steer while it's cheap to." },
  { h: "Measure", p: "Visits booked, hours saved, replies sent: reported every week." },
  { h: "Improve", p: "Each week's numbers decide the next change. The loop keeps running." },
];
const blocks = [
  { tag: "Software engineering", h: "Products your customers and team use every day", p: "Web apps, mobile apps, websites and the backend underneath, built by the people who scoped them and handed over with full docs.", href: "/services/web-apps-saas", link: "Explore software engineering", photo: "pair-coding" },
  { tag: "AI agents", h: "Agents that answer, read and act, with a person in the loop", p: "WhatsApp and chat agents, document Q&A and agents that work inside your tools, answering only from information you approve.", href: "/services/ai-agents-chatbots", link: "Explore AI agents", photo: "analytics-dashboard" },
  { tag: "Automation", h: "Tools that update each other on their own", p: "CRM, ERP, payments and messaging wired together, so the routine work between your systems stops landing on your team.", href: "/services/workflow-automation", link: "Explore automation", photo: "network-cables" },
  { tag: "Minute One", h: "Every enquiry answered within a minute", p: "Our lead-response product replies on WhatsApp, qualifies the lead and books the visit, demo or consultation while interest is high.", href: "/products/minute-one", link: "Explore Minute One", photo: "desk-laptop" },
] as const;

export default function ZendeskStyle() {
  return (
    <div className="z">
      <section className="z-hero" aria-labelledby="z-h">
        <div className="z-wrap">
          <div className="z-hero__card">
            <Photo name="team-meeting" className="z-hero__img" priority sizes="100vw" alt="" />
            <div className="z-hero__copy">
              <p className="z-over">Technology services for software, AI and automation</p>
              <h1 id="z-h">Answer every enquiry in a minute. Automate the work behind it.</h1>
              <p className="z-hero__p">One accountable team designs, builds and runs the systems your business depends on, with a demo every week and a fixed quote before any work starts.</p>
              <div className="z-cta">
                <a className="z-btn z-btn--sun" href={bookingHref}>Book a 30-minute call</a>
                <Link className="z-btn z-btn--glass" href="/products/minute-one">See Minute One in action</Link>
              </div>
              <p className="z-hero__fine">Free first call · Written scope in a week · No long contracts</p>
            </div>
          </div>
        </div>
      </section>

      <section className="z-proof" aria-label="What we commit to">
        <div className="z-wrap">
          <p className="z-over z-over--dark">Promises we put in writing</p>
          <dl className="z-stats">
            {pledges.map((x) => <div key={x.p}><dt>{x.n}{x.u && <small> {x.u}</small>}</dt><dd>{x.p}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="z-loop">
        <div className="z-wrap z-loop">
          <div className="z-head">
            <p className="z-over z-over--dark">How we work</p>
            <h2 id="z-loop" className="z-h2">Every loop runs better than the last.</h2>
            <p className="z-sub">Every engagement is a loop: we ship, measure the one number that matters and improve it, every week. That&rsquo;s the &ldquo;loop&rdquo; in our name.</p>
          </div>
          <ol className="z-loop__ring">
            {loop.map((s, n) => <li key={s.h}><span>0{n + 1}</span><b>{s.h}</b><p>{s.p}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="z-cap">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">What we do</p>
            <h2 id="z-cap" className="z-h2">One team for the build, the AI and the automation.</h2>
          </div>
          <div className="z-blocks">
            {blocks.map((b) => (
              <article key={b.tag} className="z-block">
                <Photo name={b.photo} className="z-block__img" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
                <div>
                  <p className="z-over z-over--dark">{b.tag}</p>
                  <h3>{b.h}</h3>
                  <p>{b.p}</p>
                  <Link href={b.href} className="z-link">{b.link} →</Link>
                </div>
              </article>
            ))}
          </div>
          <p className="z-more"><Link href="/services" className="z-link">Browse all 20+ services →</Link></p>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="z-ind">
        <div className="z-wrap">
          <div className="z-head z-head--row">
            <div>
              <p className="z-over z-over--dark">Built for</p>
              <h2 id="z-ind" className="z-h2">Businesses where every lead counts.</h2>
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

      <section className="z-startup" aria-labelledby="z-st">
        <div className="z-wrap z-startup__in">
          <div>
            <p className="z-over">Logic &amp; Loop for Startups</p>
            <h2 id="z-st" className="z-h2">Early-stage? Start with a free architecture review.</h2>
            <p>Bring your idea or your prototype. We review the plan, tell you what to build first and what to skip, and quote a fixed-price MVP if you want us to build it.</p>
          </div>
          <Link className="z-btn z-btn--sun" href="/contact?topic=mvp-for-startups">Apply for a review</Link>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="z-price">
        <div className="z-wrap z-split">
          <div className="z-head">
            <p className="z-over z-over--dark">Pricing</p>
            <h2 id="z-price" className="z-h2">Know the number before work starts.</h2>
            <p className="z-sub">Fixed-scope projects, monthly plans, a pay-on-results Minute One pilot, and per-drive or yearly talent assessment.</p>
            <div className="z-cta"><Link className="z-btn z-btn--ink" href="/lab/pricing">See how we price</Link><Link className="z-btn z-btn--line" href="/hours-calculator">Calculate hours saved</Link></div>
          </div>
          <ul className="z-models">
            <li><b>Fixed-scope project</b><span>Written scope, fixed quote, weekly demos</span></li>
            <li className="is-pop"><b>Monthly plan</b><em>Recommended</em><span>A standing team that keeps shipping, month to month</span></li>
            <li><b>Minute One pilot</b><span>60 days, and you pay only if qualified next steps go up</span></li>
          </ul>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="z-faq">
        <div className="z-wrap z-faq">
          <div className="z-head">
            <p className="z-over z-over--dark">FAQ</p>
            <h2 id="z-faq" className="z-h2">Need to know more?</h2>
            <Link href="/faq" className="z-link">View all FAQs →</Link>
          </div>
          <Faq items={faqs.slice(0, 3)} />
        </div>
      </section>

      <section className="z-final" aria-labelledby="z-final">
        <div className="z-wrap">
          <h2 id="z-final" className="z-h2">Launch your first automation this month.</h2>
          <div className="z-cta z-cta--center">
            <a className="z-btn z-btn--sun" href={bookingHref}>Book a 30-minute call</a>
            <Link className="z-btn z-btn--line-light" href="/products/minute-one">Get a free lead-response audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
