import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/Icons";
import { groupName, serviceBySlug, services } from "@/lib/services";
import { bookingHref, bookingReady } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return { title: s.name, description: `${s.short} ${s.intro}`.slice(0, 160) };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const i = services.findIndex((x) => x.slug === s.slug);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const related = s.related.map(serviceBySlug).filter(Boolean);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li aria-current="page">{s.name}</li>
          </ol>
          <p className="kicker" style={{ marginBottom: 18 }}>{groupName(s.group)}</p>
          <h1 className="display">{s.name}</h1>
          <p className="lead">{s.intro}</p>
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
              <li><span style={{ color: "var(--accent)", fontWeight: 700 }}>1</span><span><b>Understand.</b> A working session on goals, users and constraints. You get a written scope and a fixed quote.</span></li>
              <li><span style={{ color: "var(--accent)", fontWeight: 700 }}>2</span><span><b>Design.</b> Flows and screens, or an architecture plan, signed off before the build.</span></li>
              <li><span style={{ color: "var(--accent)", fontWeight: 700 }}>3</span><span><b>Build.</b> Weekly demos on a live link, so you can steer early.</span></li>
              <li><span style={{ color: "var(--accent)", fontWeight: 700 }}>4</span><span><b>Launch &amp; improve.</b> We ship, measure and keep improving, or hand over with full docs.</span></li>
            </ol>

            <h2 className="sub-h">Questions</h2>
            <div className="faq">
              {s.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>

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
              <Link className="btn btn--primary btn--block" href={`/contact?topic=${s.slug}`}>Get a fixed quote</Link>
              <a className="btn btn--outline btn--block" href={bookingHref} {...(bookingReady ? { target: "_blank", rel: "noopener" } : {})}>Book a 30-minute call</a>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand topic={s.slug} />
    </>
  );
}
