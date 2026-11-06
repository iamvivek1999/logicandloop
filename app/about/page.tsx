import type { Metadata } from "next";
import Link from "next/link";
import ScrollWords from "@/components/fx/ScrollWords";
import Leaders from "@/components/Leaders";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { groups, servicesIn } from "@/lib/services";
import { baseOpenGraph, site, whatsappHref } from "@/lib/site";

const description =
  "Logic & Loop is a technology services company based in India, delivering software engineering, AI and automation services, with two products of its own: Minute One and Loop OS.";

export const metadata: Metadata = {
  title: { absolute: "About Logic & Loop | Technology services company, India" },
  description,
  openGraph: { ...baseOpenGraph, title: "About Logic & Loop | Technology services company, India", description },
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
            Logic &amp; Loop is a technology services company based in India. We deliver software engineering, AI and automation services to businesses that run on their software, and we build two products of our own.
          </p>
        </div>
      </header>

      <div className="wrap band-photo">
        <Photo name="team-meeting" className="band-photo__img" sizes="(max-width: 1280px) 100vw, 1280px" />
      </div>

      <section className="vision dark" aria-labelledby="vision-h">
        <div className="wrap">
          <div className="vision__grid">
            <h2 id="vision-h" className="vision__label">Our vision</h2>
            <ScrollWords className="vision__text" text="A business should spend its people on judgement, not repetition. We're building toward companies where every repeating process, from the first enquiry to the month-end report, runs on its own, reliably, and people get their time back for the work only people can do." />
          </div>
          <div className="vision__grid vision__grid--mission">
            <h2 className="vision__label">Our mission</h2>
            <p className="vision__mission">Engineer the software, AI and automation that run a business&rsquo;s repeating work, and answer for the outcome, not the hours.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="lead-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Leadership</p>
              <h2 id="lead-h" className="h2">The people who answer for the work.</h2>
            </div>
            <p className="lead">Every engagement is led by a founder, from the first call to the weekly numbers.</p>
          </div>
          <Leaders />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">We write the logic. Your business runs the loop.</h2>
          </div>
          <ScrollWords className="why-words" text="The logic is the software we write: the rules, the data and the connections between your tools. The loop is the work your business repeats every day, like answering an enquiry, booking a visit or closing the month. We take that work off people's hands and make it run reliably." />

          <h2 className="sub-h">Capabilities</h2>
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
            <Link href="/services">See all services</Link>
          </p>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">How we engage.</h2>
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
              <dd>A WhatsApp lead-response agent for real estate developers, premium clinics, education and edtech companies, startups and service businesses. It replies within a minute, answers routine questions, qualifies the lead and books the next step.</dd>
            </div>
            <div>
              <dt><Link href="/products/loop-os">Loop OS</Link></dt>
              <dd>A crew of AI agents and the harness that runs them safely on your tools and data. In early access.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <h2 className="sub-h">The facts</h2>
          <dl className="terms">
            <div><dt>Name</dt><dd>Logic &amp; Loop, also written LogicAndLoop</dd></div>
            <div><dt>Leadership</dt><dd>{site.leaders.map((l) => `${l.name} (${l.role})`).join(", ")}</dd></div>
            <div><dt>Based in</dt><dd>India, working with clients everywhere</dd></div>
            <div><dt>What we do</dt><dd>Technology services: software engineering, AI, automation, and hiring assessments</dd></div>
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
