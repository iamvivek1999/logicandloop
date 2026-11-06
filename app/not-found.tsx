import type { Metadata } from "next";
import Link from "next/link";
import TextRoll from "@/components/fx/TextRoll";

// A missing page answers with a real 404 status, stays out of search results
// and points nowhere as canonical.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="wrap nf">
      <p className="kicker">Error 404</p>
      <h1 className="display" style={{ fontSize: "var(--step-4)" }}>This page isn&apos;t in the loop.</h1>
      <p className="lead">The link may be old or mistyped. Try the services list, or tell us what you were looking for.</p>
      <div className="hero__cta">
        <Link className="btn btn--primary roll-host" href="/services"><TextRoll>Browse services</TextRoll></Link>
        <Link className="btn btn--outline roll-host" href="/"><TextRoll>Go to the home page</TextRoll></Link>
      </div>
    </section>
  );
}
