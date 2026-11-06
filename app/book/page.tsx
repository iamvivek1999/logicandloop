import type { Metadata } from "next";
import Link from "next/link";
import BookCall from "@/components/BookCall";
import { baseOpenGraph, site, whatsappHref } from "@/lib/site";
import "@/app/zen.css";

const description = "Book a free 30-minute call with Logic & Loop: whether we're the right team, what it would take and roughly what it would cost.";

export const metadata: Metadata = {
  title: "Book a call",
  description,
  openGraph: { ...baseOpenGraph, title: "Book a call | Logic & Loop", description },
};

export default function Book() {
  return (
    <section className="section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
      <div className="wrap contact">
        <div>
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Book a call</li>
          </ol>
          <h1 className="display" style={{ fontSize: "var(--step-4)" }}>Book a 30-minute call.</h1>
          <p className="lead" style={{ marginTop: 24 }}>Free, and with the people who would build it. You&rsquo;ll leave knowing whether we&rsquo;re the right team, what it would take and roughly what it would cost.</p>
          <div className="contact__expectations">
            <h2 className="h3">What we&rsquo;ll cover</h2>
            <ol>
              <li>What you want to build or fix, and the number that matters.</li>
              <li>What we&rsquo;d do first, and what we&rsquo;d skip.</li>
              <li>Timeline, the way we&rsquo;d work together and a rough cost.</li>
            </ol>
          </div>
          <p className="muted" style={{ marginTop: 28 }}>Rather write it down? <Link className="link-draw" href="/contact">Send us a brief</Link> or <a className="link-draw" href={whatsappHref("Hi, I'd like to book a 30-minute call.")} target="_blank" rel="noopener">message us on WhatsApp</a>. You can also email {site.email}.</p>
        </div>
        <BookCall />
      </div>
    </section>
  );
}
