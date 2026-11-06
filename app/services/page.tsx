import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/site";
import Link from "next/link";
import Photo from "@/components/Photo";
import ServicesExplorer from "@/components/ServicesExplorer";
import CtaBand from "@/components/CtaBand";

const description =
  "Web apps, mobile apps, websites, APIs, ERP, AI agents, RAG, dashboards, automation, WhatsApp and payments, cloud, design, audits, training and support.";

export const metadata: Metadata = {
  title: "Services",
  description,
  openGraph: { ...baseOpenGraph, title: "Services | Logic & Loop", description },
};

export default function ServicesPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Services</li>
            </ol>
            <h1 className="display">20+ services, one accountable team.</h1>
            <p className="lead">
              Hire us for a single piece or the full product. Each service has its own page with what you get, the stack we use and typical timelines.
            </p>
          </div>
          <Photo name="team-whiteboard" className="page-head__img" priority sizes="(max-width: 860px) 100vw, 42vw" />
        </div>
      </header>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <ServicesExplorer />
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" text="Describe the problem instead. We'll tell you what we'd build, what we wouldn't, and what it would take." topic="not-sure" />
    </>
  );
}
