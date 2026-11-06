import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/Icons";
import { groupName, serviceBySlug, servicePhoto, services } from "@/lib/services";
import Photo from "@/components/Photo";
import { baseOpenGraph, bookingHref, bookingReady, site } from "@/lib/site";
import Faq from "@/components/fx/Faq";
import TextRoll from "@/components/fx/TextRoll";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const description = `${s.short} ${s.intro}`.slice(0, 160);
  return { title: s.name, description, openGraph: { ...baseOpenGraph, title: `${s.name} | ${site.name}`, description } };
}

// The four stages most services follow; a service can set its own in lib/services.ts.
const defaultSteps: [string, string][] = [
  ["Understand", "A working session on goals, users and constraints. You get a written scope and a fixed quote."],
  ["Design", "Flows and screens, or an architecture plan, signed off before the build."],
  ["Build", "Weekly demos on a live link, so you can steer early."],
  ["Launch & improve", "We ship, measure and keep improving, or hand over with full docs."],
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const i = services.findIndex((x) => x.slug === s.slug);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const related = s.related.map(serviceBySlug).filter(Boolean);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/services/${s.slug}` },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: `${s.short} ${s.intro}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]) }} />
      <header className="page-head">
        <div className="wrap page-head__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li aria-current="page">{s.name}</li>
            </ol>
            <p className="kicker" style={{ marginBottom: 18 }}>{groupName(s.group)}</p>
            <h1 className="display">{s.name}</h1>
            <p className="lead">{s.intro}</p>
          </div>
          <Photo name={servicePhoto(s)} className="page-head__img" priority sizes="(max-width: 860px) 100vw, 42vw" />
        </div>
      </header>

      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap detail">
          <div>
            <h2 className="sub-h">What you get</h2>
            <ul className="deliver">
              {s.deliverables.map((d) => (
                <li key={d}><Check />{d}</li>
              ))}
            </ul>

            <h2 className="sub-h">How it runs</h2>
            <ol className="deliver" style={{ listStyle: "none" }}>
              {(s.steps ?? defaultSteps).map(([h, p], i) => (
                <li key={h}><span style={{ color: "var(--accent)", fontWeight: 700 }}>{i + 1}</span><span><b>{h}.</b> {p}</span></li>
              ))}
            </ol>

            <h2 className="sub-h">Questions</h2>
            <Faq items={s.faqs} />

            {related.length > 0 && (
              <>
                <h2 className="sub-h">Often paired with</h2>
                <ul className="chips">
                  {related.map((r) => (
                    <li key={r!.slug}><Link className="chip" href={`/services/${r!.slug}`}>{r!.name}</Link></li>
                  ))}
                </ul>
              </>
            )}

            <nav className="pager" aria-label="More services">
              <Link href={`/services/${prev.slug}`}><small>Previous service</small><strong>{prev.name}</strong></Link>
              <Link href={`/services/${next.slug}`}><small>Next service</small><strong>{next.name}</strong></Link>
            </nav>
          </div>

          <aside className="sheet" aria-label="Service summary">
            <dl>
              <div><dt>Typical timeline</dt><dd>{s.timeline}</dd></div>
              <div><dt>How we charge</dt><dd>{s.engagement}</dd></div>
              <div>
                <dt>Usual stack</dt>
                <dd className="sheet__stack">{s.stack.map((t) => <span key={t}>{t}</span>)}</dd>
              </div>
            </dl>
            <div className="sheet__actions">
              <Link className="btn btn--primary btn--block roll-host" href={`/contact?topic=${s.slug}`}><TextRoll>Get a fixed quote</TextRoll></Link>
              <a className="btn btn--outline btn--block roll-host" href={bookingHref} {...(bookingReady ? { target: "_blank", rel: "noopener" } : {})}><TextRoll>Book a 30-minute call</TextRoll></a>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand topic={s.slug} />
    </>
  );
}
