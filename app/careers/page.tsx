import type { Metadata } from "next";
import Link from "next/link";
import CareersExplorer from "@/components/CareersExplorer";
import Photo from "@/components/Photo";
import TextRoll from "@/components/fx/TextRoll";
import ScrollWords from "@/components/fx/ScrollWords";
import { openRoles, talentPool } from "@/lib/careers";
import { baseOpenGraph, site } from "@/lib/site";

const description =
  "Careers at Logic & Loop: engineering, AI and data, design, delivery, talent assessment, growth and early careers. See the teams we hire for and join the talent pool.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  openGraph: { ...baseOpenGraph, title: "Careers | Logic & Loop", description },
};

const reasons = [
  { h: "Ship real systems, weekly", p: "Your work goes live for businesses that run on it. Clients see it every week on a live link, so you see your impact quickly." },
  { h: "Own outcomes, not tickets", p: "We answer for the number that matters to each client, and so does everyone on the team. You get the context to make real decisions." },
  { h: "Learn across the stack", p: "Web, mobile, AI agents, data, automation and hiring technology, all under one roof, with two products of our own to work on." },
  { h: "Grow as we grow", p: "We're early. The people who join now shape how we work, who we hire next and what we build." },
];

const steps = [
  ["Apply", "Send your CV, LinkedIn or portfolio. A person reads every application."],
  ["A conversation", "A 30-minute call about what you've built and what you want to do next."],
  ["A practical exercise", "A short task close to the real work, discussed together rather than graded in silence."],
  ["Meet the founders", "A final conversation about the role, the team and the road ahead."],
  ["Offer", "A clear written offer with the role, pay and start date."],
] as const;

export default function Careers() {
  const open = openRoles().length;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${site.url}/careers` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="cx-hero" aria-labelledby="cx-h">
        <Photo name="city-window" className="cx-hero__img" sizes="100vw" priority alt="" />
        <div className="wrap cx-hero__inner">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Careers</li>
          </ol>
          <h1 id="cx-h" className="display">Build the systems businesses run on.</h1>
          <p className="lead">
            Engineers, designers, AI specialists and operators who want their work in production, not in a slide deck.
          </p>
          <div className="hero__cta">
            {open ? (
              <>
                <a className="btn btn--primary btn--lg roll-host" href="#roles"><TextRoll>{`See ${open} open ${open === 1 ? "role" : "roles"}`}</TextRoll></a>
                <a className="link-draw roll-host cx-hero__pool" href={talentPool()}><TextRoll center={false}>Join the talent pool</TextRoll></a>
              </>
            ) : (
              <a className="btn btn--primary btn--lg roll-host" href={talentPool()}><TextRoll>Join the talent pool</TextRoll></a>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Why Logic &amp; Loop</p>
              <h2 id="why-h" className="h2">Ambitious work, with the people who answer for it.</h2>
            </div>
            <p className="lead">A technology services company with products of its own, working with businesses that depend on their software every day.</p>
          </div>
          <div className="cx-mosaic">
            <Photo name="young-team-walking" className="cx-mosaic__a" sizes="(max-width: 860px) 100vw, 60vw" />
            <Photo name="pair-coding" className="cx-mosaic__b" sizes="(max-width: 860px) 100vw, 40vw" />
            <Photo name="team-laptops" className="cx-mosaic__c" sizes="(max-width: 860px) 100vw, 40vw" />
          </div>
          <div className="features cx-reasons">
            {reasons.map((r) => (
              <div className="feature" key={r.h}><h3 className="h3">{r.h}</h3><p>{r.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {open ? (
        <section className="section section--rule" id="roles" aria-labelledby="roles-h">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">Open roles</p>
                <h2 id="roles-h" className="h2">{open} open {open === 1 ? "role" : "roles"}.</h2>
              </div>
              <p className="lead">Open any role to see what the work involves and apply.</p>
            </div>
            <CareersExplorer />
          </div>
        </section>
      ) : (
        <section className="cx-none" id="roles" aria-labelledby="roles-h">
          <div className="wrap cx-none__inner">
            <span className="cx-none__dot" aria-hidden="true" />
            <h2 id="roles-h" className="h2">We&rsquo;re not hiring right now.</h2>
            <p className="lead">
              There are no open roles at the moment. We&rsquo;re always glad to meet good people, though: join the talent pool and we&rsquo;ll write to you when a role opens that fits.
            </p>
            <a className="btn btn--primary btn--lg roll-host" href={talentPool()}><TextRoll>Join the talent pool</TextRoll></a>
          </div>
        </section>
      )}

      <section className="vision dark" aria-labelledby="hire-h">
        <div className="wrap">
          <div className="vision__grid">
            <h2 id="hire-h" className="vision__label">How we hire</h2>
            <ScrollWords className="vision__text" text="Five steps, no trick questions, and a person on the other side of every one of them." />
          </div>
          <ol className="cx-steps">
            {steps.map(([h, p], i) => (
              <li key={h}>
                <span className="cx-steps__n">{i + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="early-h">
        <div className="wrap cx-early">
          <Photo name="friends-campus" className="cx-early__img" sizes="(max-width: 860px) 100vw, 40vw" />
          <div>
            <p className="kicker">Early careers</p>
            <h2 id="early-h" className="h2">Start your career on real work.</h2>
            <p className="lead">
              Six-month internships in engineering and design, with a senior mentor, code review on everything you ship, and a clear path to a full-time role.
            </p>
            <div className="hero__cta" style={{ marginTop: 28 }}>
              <a className="btn btn--primary roll-host" href={talentPool()}><TextRoll>Join the talent pool</TextRoll></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
