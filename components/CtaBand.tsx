import Link from "next/link";
import { WhatsApp } from "./Icons";
import { whatsappHref } from "@/lib/site";

export default function CtaBand({
  title = "Tell us what you want to build.",
  text = "A 30-minute call is enough to tell you whether we're the right team, what it would take and roughly what it would cost.",
  topic,
  whatsapp = whatsappHref(),
  stop = false,
}: {
  title?: string;
  text?: string;
  topic?: string;
  whatsapp?: string;
  /** Marks the heading as the end of the home page Spine, where the loop closes. */
  stop?: boolean;
}) {
  return (
    <section className="section dark" aria-label="Start a project">
      <div className="wrap cta-band">
        <div>
          <h2 className="h2" data-stop={stop || undefined}>{title}</h2>
          <p className="lead" style={{ marginTop: 20 }}>{text}</p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--light" href={topic ? `/contact?topic=${topic}` : "/contact"}>Start a project</Link>
          <a className="btn btn--ghost-light" href={whatsapp} target="_blank" rel="noopener">
            <WhatsApp className="ico" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
