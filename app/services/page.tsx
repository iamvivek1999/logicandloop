import type { Metadata } from "next";
import Link from "next/link";
import ServicesExplorer from "@/components/ServicesExplorer";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web apps, mobile apps, websites, APIs, ERP, AI agents, RAG, dashboards, automation, WhatsApp and payments, cloud, design, audits, training and support.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Services</li>
          </ol>
          <h1 className="display">{services.length} services, one accountable team.</h1>
          <p className="lead">
            Hire us for a single piece or the full product. Each service has its own page with what you get, the stack we use and typical timelines.
          </p>
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
