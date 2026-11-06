import Link from "next/link";
import ContactWizard from "@/components/lab/ContactWizard";
import { bookingHref, site, whatsappHref } from "@/lib/site";
import "../zen.css";

/** Contact as a short step-by-step wizard (lab), to compare with /contact. */
export default function ContactLab() {
  return (
    <div className="z">
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs" aria-label="Breadcrumb"><li><Link href="/">Home</Link></li><li aria-current="page">Contact</li></ol>
          <h1 className="display">Tell us what you <span className="tone">want to build.</span></h1>
          <p className="lead">Three quick questions, then where to reply. It takes under a minute, and a person answers {site.replyPromise}.</p>
        </div>
      </header>
      <section className="z-sec">
        <div className="z-wrap zw">
          <aside className="zw-side">
            <p className="z-over z-over--dark">What happens next</p>
            <ol>
              <li>We read your answers and reply within one working day.</li>
              <li>We ask only what we need to understand the opportunity.</li>
              <li>You get a clear next step, scope and quote before any work starts.</li>
            </ol>
            <p className="z-over z-over--dark" style={{ marginTop: 18 }}>Prefer to talk?</p>
            <div className="z-cta">
              <a className="z-btn z-btn--ink" href={bookingHref}>Book a 30-minute call</a>
              <a className="z-btn z-btn--line" href={whatsappHref()} target="_blank" rel="noopener">WhatsApp us</a>
            </div>
          </aside>
          <ContactWizard />
        </div>
      </section>
    </div>
  );
}
