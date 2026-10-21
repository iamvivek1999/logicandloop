import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Logic & Loop handles contact enquiries, analytics and website data.",
};

export default function Privacy() {
  return (
    <section className="section legal">
      <div className="wrap prose">
        <ol className="crumbs" aria-label="Breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Privacy policy</li>
        </ol>
        <h1 className="display">Privacy policy.</h1>
        <p className="lead">Last updated October 22, 2026.</p>
        <h2 className="sub-h">What we collect</h2>
        <p>When you contact us, we collect the details you submit: your name, email address, optional phone number, company, budget and project message.</p>
        <h2 className="sub-h">Why we use it</h2>
        <p>We use enquiry details only to reply to you, understand your project and provide a quote. We do not sell your data or use it for unrelated marketing.</p>
        <h2 className="sub-h">Contact delivery</h2>
        <p>Enquiries are sent through Resend to {site.email}. Resend may retain delivery and event logs under its own privacy policy. We do not store enquiries in this website&apos;s database.</p>
        <h2 className="sub-h">Analytics</h2>
        <p>If you accept optional analytics, Google Analytics may set cookies and collect page and interaction data. You can reject or change this choice using Cookie settings in the footer.</p>
        <h2 className="sub-h">Your choices</h2>
        <p>You can ask us to correct or delete an enquiry by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <h2 className="sub-h">Changes</h2>
        <p>We may update this policy when the website or its providers change. The date above shows when it was last reviewed.</p>
      </div>
    </section>
  );
}
