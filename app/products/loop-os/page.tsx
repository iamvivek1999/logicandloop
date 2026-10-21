import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import LoopStage from "@/components/scenes/LoopStage";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Loop OS: your own crew of AI agents, licensed",
  description:
    "Loop OS gives your team a crew of AI agents and the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.",
};

const harness = [
  { h: "Agents with defined jobs", p: "Research, sales briefs, content, reporting, ops and support. Each has a clear role, tools and limits, not a blank chat box." },
  { h: "Workflows, encoded once", p: "The routines your team repeats, like a pre-call brief or a weekly client news digest, written down once and run on schedule or on demand." },
  { h: "Connected to your tools", p: "Email, calendar, Drive, Sheets, CRM, Slack and WhatsApp through official connectors, so agents work on real data." },
  { h: "Permissions and approvals", p: "Decide what each agent may read, write or send. Anything sensitive waits for a person to approve it." },
  { h: "Memory and audit log", p: "Agents remember your context across runs, and every action is logged with who asked, what ran and what changed." },
  { h: "Your choice of model", p: "Works with Claude, GPT and Gemini. Switch models per agent as prices and quality change." },
];

const plans = [
  {
    name: "Team",
    who: "For teams of 5–25 who want to start fast.",
    items: ["Hosted in our cloud", "Six ready-made agents", "Standard connectors", "Email support"],
    cta: "Join early access",
  },
  {
    name: "Business",
    who: "For companies that want agents built around their own process.",
    items: ["Everything in Team", "Custom workflows built by us", "Custom connectors to your systems", "Onboarding and training", "Priority support"],
    cta: "Talk to us",
    mark: true,
  },
  {
    name: "Self-hosted",
    who: "For teams whose data can't leave their own infrastructure.",
    items: ["Licence to run the harness on your cloud or servers", "Your own model keys", "Deployment and hardening support", "Annual licence with updates"],
    cta: "Request details",
  },
];

const faqs = [
  { q: "Is this a chatbot?", a: "No. A chatbot waits for questions. Loop OS agents run defined jobs on your tools, on a schedule or when triggered, and report back." },
  { q: "Is our data used to train AI models?", a: "No. Loop OS uses API terms where your data isn't used for training, and the self-hosted licence keeps everything on your infrastructure." },
  { q: "When can we start?", a: "Loop OS is in early access. We're onboarding a small number of teams and building the first workflows alongside them." },
];

export default function LoopOS() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Loop OS",
    applicationCategory: "BusinessApplication",
    description: "A crew of AI agents and a harness that runs them safely on company tools and data.",
    creator: { "@type": "Organization", name: "Logic & Loop" },
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <section className="p-hero dark">
        <div className="wrap p-hero__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li>Products</li>
              <li aria-current="page">Loop OS</li>
            </ol>
            <p className="status status--soon" style={{ marginBottom: 18 }}>Early access</p>
            <h1 className="display" style={{ fontSize: "var(--step-4)" }}>Your own crew of AI agents, licensed.</h1>
            <p className="lead" style={{ marginTop: 24 }}>
              Loop OS gives your team agents with real jobs, plus the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.
            </p>
            <div className="hero__cta" style={{ marginTop: 32 }}>
              <Link className="btn btn--light" href="/contact?topic=loop-os">Join early access</Link>
              <a className="btn btn--ghost-light" href="#licences">See licence options</a>
            </div>
          </div>
          <LoopStage />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">The agents are the easy part. The harness is the product.</h2>
            <p className="lead">
              Anyone can open a chat window. Loop OS is the layer that makes agents dependable at work: defined jobs, real connections, limits and a record of everything they do.
            </p>
          </div>
          <div className="features">
            {harness.map((f) => (
              <div className="feature" key={f.h}><h3 className="h3">{f.h}</h3><p>{f.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--rule" id="licences">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Three ways to license it.</h2>
            <p className="lead">Pricing is set per team during early access. Tell us your team size and tools and we&apos;ll send a quote.</p>
          </div>
          <div className="plans">
            {plans.map((p) => (
              <div className={`plan${p.mark ? " plan--mark" : ""}`} key={p.name}>
                <h3 className="h3">{p.name}</h3>
                <p>{p.who}</p>
                <ul>
                  {p.items.map((i) => <li key={i}><Check />{i}</li>)}
                </ul>
                <Link className={`btn ${p.mark ? "btn--primary" : "btn--outline"}`} href="/contact?topic=loop-os">{p.cta}</Link>
              </div>
            ))}
          </div>

          <h2 className="sub-h" style={{ marginTop: 96 }}>Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Put a crew of agents to work." text="Tell us the three tasks your team repeats most. We'll show you how Loop OS would run them." topic="loop-os" />
    </>
  );
}
