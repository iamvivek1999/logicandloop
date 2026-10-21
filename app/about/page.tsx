import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { groups, servicesIn, services } from "@/lib/services";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Logic & Loop | A small engineering studio in India" },
  description:
    "Logic & Loop is a small engineering studio in India. We build web apps, mobile apps, AI agents and automations, and run two products of our own: Minute One and Loop OS.",
};

const principles = [
  {
    h: "A fixed scope and a fixed quote",
    p: "Every engagement starts with a written scope and a price. If the scope changes, you hear about it before the invoice does.",
  },
  {
    h: "You own what we build",
    p: "On our app builds the repository, cloud accounts and domains are in your name from day one.",
  },
  {
    h: `A reply ${site.replyPromise}`,
    p: "Send a message on WhatsApp or by email. We answer within one working day, usually much faster.",
  },
];

export default function About() {
  const founder = site.founder;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">About</li>
          </ol>
          <h1 className="display">About Logic &amp; Loop.</h1>
          <p className="lead">
            Logic &amp; Loop is a small engineering studio based in India. We build web apps, mobile apps, AI agents and the automations that connect them, and we run two products of our own.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">We write the logic. Your business runs the loop.</h2>
            <p className="lead">
              The logic is the software we write: the rules, the data and the connections between your tools. The loop is the work your business repeats every day, such as answering an enquiry, booking a visit, sending an invoice or closing the month. We take that repeating work off people&rsquo;s hands and make it run reliably.
            </p>
          </div>

          <h2 className="sub-h">What we build</h2>
          <dl className="terms">
            {groups.map((g) => (
              <div key={g.id}>
                <dt>{g.name}</dt>
                <dd>
                  {g.blurb}{" "}
                  {servicesIn(g.id).map((s, i) => (
                    <span key={s.slug}>
                      {i > 0 ? " · " : ""}
                      <Link href={`/services/${s.slug}`}>{s.name}</Link>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="muted" style={{ marginTop: 20 }}>
            <Link href="/services">See all {services.length} services</Link>
          </p>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">How we work.</h2>
            <p className="lead">Plain terms, written down before any work starts.</p>
          </div>
          <div className="features">
            {principles.map((f) => (
              <div className="feature" key={f.h}><h3 className="h3">{f.h}</h3><p>{f.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Two products of our own.</h2>
            <p className="lead">Built from work we kept doing for clients.</p>
          </div>
          <dl className="terms">
            <div>
              <dt><Link href="/products/minute-one">Minute One</Link></dt>
              <dd>A WhatsApp agent for real estate developers. It replies to a property enquiry within a minute, asks the buyer a few questions and books the site visit. It starts with a free audit and a 60-day pilot you pay for only if site visits go up.</dd>
            </div>
            <div>
              <dt><Link href="/products/loop-os">Loop OS</Link></dt>
              <dd>A crew of AI agents and the harness that runs them safely on your tools and data. In early access.</dd>
            </div>
          </dl>
        </div>
      </section>

      {founder.name ? (
        <section className="section section--rule">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Who runs it.</h2>
              <p className="lead">
                {founder.name}
                {founder.role ? `, ${founder.role}` : ""}.{" "}
                {founder.linkedin ? (
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer me">LinkedIn</a>
                ) : null}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--rule">
        <div className="wrap">
          <h2 className="sub-h">The facts</h2>
          <dl className="terms">
            <div><dt>Name</dt><dd>Logic &amp; Loop, also written LogicAndLoop</dd></div>
            <div><dt>Based in</dt><dd>India, working with clients everywhere</dd></div>
            <div><dt>What we build</dt><dd>Web apps, mobile apps, AI agents and automations</dd></div>
            <div><dt>Replies</dt><dd>{site.replyPromise.charAt(0).toUpperCase() + site.replyPromise.slice(1)}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>WhatsApp</dt><dd><a href={whatsappHref()} target="_blank" rel="noopener">Message us</a></dd></div>
            <div><dt>Website</dt><dd><a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a></dd></div>
          </dl>
        </div>
      </section>

      <CtaBand title="Want to talk about a project?" />
    </>
  );
}
