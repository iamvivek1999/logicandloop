import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Logic & Loop website.",
};

export default function Terms() {
  return (
    <section className="section legal">
      <div className="wrap prose">
        <ol className="crumbs" aria-label="Breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">Terms</li>
        </ol>
        <h1 className="display">Terms.</h1>
        <p className="lead">Last updated October 22, 2026.</p>
        <h2 className="sub-h">Website use</h2>
        <p>This website provides general information about Logic &amp; Loop and its services. It is not a contract, quote or guarantee of a particular result.</p>
        <h2 className="sub-h">Project work</h2>
        <p>Any project scope, price, timeline, ownership and support terms are agreed in a separate written proposal or agreement before work begins.</p>
        <h2 className="sub-h">Accuracy</h2>
        <p>We aim to keep the information current, but product availability, examples and timelines may change. Please confirm details with us before relying on them.</p>
        <h2 className="sub-h">External links</h2>
        <p>Links to WhatsApp, booking services and other providers are subject to those providers&apos; own terms and privacy policies.</p>
        <h2 className="sub-h">Contact</h2>
        <p>Questions about these terms can be sent through the <Link href="/contact">contact page</Link>.</p>
      </div>
    </section>
  );
}
