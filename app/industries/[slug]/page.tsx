import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import Faq from "@/components/fx/Faq";
import { Check } from "@/components/Icons";
import { industries, industryBySlug } from "@/lib/industries";
import { serviceBySlug } from "@/lib/services";
import { baseOpenGraph, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ind = industryBySlug((await params).slug);
  if (!ind) return {};
  const description = `${ind.short} ${ind.intro}`.slice(0, 160);
  return { title: `For ${ind.name.toLowerCase()}`, description, openGraph: { ...baseOpenGraph, title: `${ind.name} | ${site.name}`, description } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const ind = industryBySlug((await params).slug);
  if (!ind) notFound();
  const related = ind.services.map(serviceBySlug).filter((s) => s !== undefined);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${site.url}/industries` },
        { "@type": "ListItem", position: 3, name: ind.name, item: `${site.url}/industries/${ind.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ind.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-head">
        <div className="wrap page-head__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li aria-current="page">{ind.name}</li>
            </ol>
            <p className="kicker">{ind.name}</p>
            <h1 className="display" style={{ marginTop: 18 }}>{ind.h1}</h1>
            <p className="lead">{ind.intro}</p>
          </div>
          <Photo name={ind.photo} className="page-head__img" priority sizes="(max-width: 860px) 100vw, 42vw" alt="" />
        </div>
      </header>

      <section className="section" aria-labelledby="pain-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Where time goes</p>
              <h2 id="pain-h" className="h2">The routine work that costs you the most.</h2>
            </div>
          </div>
          <ol className="ind-pains">
            {ind.pains.map((p, n) => (
              <li key={p.h}><span>0{n + 1}</span><h3>{p.h}</h3><p>{p.p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section ind-flow-band" aria-labelledby="flow-h">
        <div className="wrap ind-flow">
          <div>
            <p className="kicker">How it runs with Minute One</p>
            <h2 id="flow-h" className="h2">From first message to a booked next step.</h2>
            <ul className="deliver">
              {ind.wins.map((w) => <li key={w}><Check />{w}</li>)}
            </ul>
            <Link className="btn btn--primary" href="/products/minute-one">See Minute One</Link>
          </div>
          <div className="ind-chat" aria-label="Sample conversation">
            <p className="ind-chat__head"><b>Sample conversation</b><small>Fictional business</small></p>
            {ind.flow.map((l, n) => <p key={n} className={`ind-chat__m ind-chat__m--${l.k}`}>{l.t}</p>)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What usually follows</p>
              <h2 id="svc-h" className="h2">Services teams like yours add next.</h2>
            </div>
          </div>
          <div className="ind-svcs">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="ind-svc">
                <b>{s.name}</b><span>{s.short}</span><small>{s.timeline}</small>
              </Link>
            ))}
          </div>
          <h2 className="sub-h" style={{ marginTop: 56 }}>Questions</h2>
          <Faq items={ind.faqs} />
        </div>
      </section>

      <CtaBand title={`Let's look at your ${ind.slug === "startups" ? "roadmap" : "enquiries"}.`} text="A 30-minute call tells you what we'd automate or build first, what it would take and roughly what it would cost." />
    </>
  );
}
