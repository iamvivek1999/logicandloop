import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/fx/Faq";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/faqs";
import { baseOpenGraph, site } from "@/lib/site";

const description =
  "Answers to what people ask before the first call with Logic & Loop: cost, timelines, ownership of code and accounts, delivery, AI agent safety and Minute One.";

export const metadata: Metadata = {
  title: "FAQ",
  description,
  openGraph: { ...baseOpenGraph, title: "FAQ | Logic & Loop", description },
};

export default function FaqPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${site.url}/faq` },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }} aria-labelledby="faq-h">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">FAQ</li>
          </ol>
          <div className="section-head">
            <div>
              <p className="kicker">FAQ</p>
              <h1 id="faq-h" className="display">Questions people ask <span className="tone">before the first call.</span></h1>
            </div>
            <p className="lead">Anything else, ask on WhatsApp or the <Link className="link-draw" href="/contact">contact form</Link>. A person replies {site.replyPromise}.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
