import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import { industries } from "@/lib/industries";
import { baseOpenGraph } from "@/lib/site";

const description = "How Logic & Loop helps real estate developers, premium clinics, education companies and startups answer every enquiry and automate the routine work behind it.";

export const metadata: Metadata = {
  title: "Industries",
  description,
  openGraph: { ...baseOpenGraph, title: "Industries | Logic & Loop", description },
};

export default function Industries() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Industries</li>
          </ol>
          <h1 className="display">Built for businesses where <span className="tone">every lead counts.</span></h1>
          <p className="lead">We work mostly with teams whose enquiries are worth a lot: here is what we automate and build for each.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 56 }} aria-label="Industries">
        <div className="wrap ind-grid">
          {industries.map((i, n) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="ind-card">
              <Photo name={i.photo} className="ind-card__img" sizes="(max-width: 760px) 100vw, 50vw" alt="" priority={n < 2} />
              <div className="ind-card__body"><b>{i.name}</b><span>{i.short}</span></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
