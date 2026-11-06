import type { Metadata } from "next";
import Link from "next/link";
import { HoursCalc } from "@/components/HomeParts";
import CtaBand from "@/components/CtaBand";
import { baseOpenGraph, site } from "@/lib/site";

const description =
  "Estimate how many hours of repetitive work your team could hand off to automation and AI agents: pick a task, describe the effort, see the capacity you get back.";

export const metadata: Metadata = {
  title: "Automation hours calculator",
  description,
  openGraph: { ...baseOpenGraph, title: "Automation hours calculator | Logic & Loop", description },
};

export default function HoursCalculator() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Automation hours calculator", item: `${site.url}/hours-calculator` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Hours calculator</li>
          </ol>
          <h1 className="display">How much repetitive work could your team <span className="tone">hand off?</span></h1>
          <p className="lead">Choose a task, describe the effort and see where automation could give your team capacity back. It takes about a minute.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 56 }} aria-label="Calculator">
        <div className="wrap">
          <HoursCalc />
        </div>
      </section>
      <CtaBand title="Want the real number?" text="A one-week workflow mapping turns this estimate into a measured baseline and a fixed quote." topic="workflow-automation" />
    </>
  );
}
