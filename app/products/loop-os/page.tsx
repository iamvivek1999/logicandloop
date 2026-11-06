import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/site";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import LoopStage from "@/components/scenes/LoopStage";
import Faq from "@/components/fx/Faq";
import "@/app/zen.css";

const description =
  "Loop OS gives your team a crew of AI agents and the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.";

export const metadata: Metadata = {
  title: "Loop OS: your own crew of AI agents, licensed",
  description,
  openGraph: { ...baseOpenGraph, title: "Loop OS: your own crew of AI agents, licensed", description },
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

const promises = [
  { n: "6", u: "agents", p: "ready-made on the Team plan: research, sales, content, reporting, ops, support" },
  { n: "3", u: "model families", p: "Claude, GPT and Gemini, switchable per agent" },
  { n: "100%", u: "", p: "of agent actions logged: who asked, what ran, what changed" },
  { n: "2", u: "ways to host", p: "in our cloud, or self-hosted on yours" },
];
const loop = [
  { h: "Triggered", p: "On a schedule, by an event in your tools, or when someone asks." },
  { h: "Works the job", p: "Reads real data through official connectors, inside its permissions." },
  { h: "Waits for approval", p: "Anything sensitive pauses for a person before it's sent or changed." },
  { h: "Logs and remembers", p: "Every action recorded; context carried into the next run." },
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
    <div className="z">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <section className="z-hero" aria-labelledby="los-h">
        <div className="z-wrap">
          <div className="zx-hero zx-hero--deep">
            <div className="zx-hero__copy">
              <ol className="crumbs" aria-label="Breadcrumb">
                <li><Link href="/">Home</Link></li>
                <li>Products</li>
                <li aria-current="page">Loop OS</li>
              </ol>
              <p className="z-over">Loop OS · Early access</p>
              <h1 id="los-h">Your own crew of AI agents, licensed.</h1>
              <p className="zx-hero__p">Loop OS gives your team agents with real jobs, plus the harness that runs them safely on your tools and data. Licensed per team, in our cloud or yours.</p>
              <div className="z-cta">
                <Link className="z-btn z-btn--sun" href="/contact?topic=loop-os">Join early access</Link>
                <a className="z-btn z-btn--glass" href="#licences">See licence options</a>
              </div>
              <p className="zx-hero__fine">Permissions and approvals · Full audit log · Your choice of model</p>
            </div>
            <div className="zx-hero__vis"><LoopStage /></div>
          </div>
        </div>
      </section>

      <section className="z-proof" aria-label="What Loop OS includes">
        <div className="z-wrap">
          <p className="z-over z-over--dark">What comes with it</p>
          <dl className="z-stats">
            {promises.map((x) => <div key={x.p}><dt>{x.n}{x.u && <small> {x.u}</small>}</dt><dd>{x.p}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="z-sec" aria-labelledby="los-loop">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">How an agent runs</p>
            <h2 id="los-loop" className="z-h2">Every run follows the same safe loop.</h2>
            <p className="z-sub">Not a blank chat box: a defined job, real connections, limits and a record of everything it does.</p>
          </div>
          <ol className="zx-flow">
            {loop.map((f, n) => <li key={f.h}><span>0{n + 1}</span><b>{f.h}</b><p>{f.p}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="los-harness">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">The harness</p>
            <h2 id="los-harness" className="z-h2">The agents are the easy part. The harness is the product.</h2>
            <p className="z-sub">Anyone can open a chat window. Loop OS is the layer that makes agents dependable at work.</p>
          </div>
          <div className="zx-feats">
            {harness.map((f, n) => (
              <article className="zx-feat" key={f.h}><i aria-hidden="true">0{n + 1}</i><h3>{f.h}</h3><p>{f.p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="z-sec" id="licences" aria-labelledby="los-lic">
        <div className="z-wrap">
          <div className="z-head">
            <p className="z-over z-over--dark">Licences</p>
            <h2 id="los-lic" className="z-h2">Three ways to license it.</h2>
            <p className="z-sub">Pricing is set per team during early access. Tell us your team size and tools and we&apos;ll send a quote.</p>
          </div>
          <div className="zp-tiers zx-tiers3">
            {plans.map((p) => (
              <article key={p.name} className={`zp-tier${p.mark ? " is-pop" : ""}`}>
                {p.mark && <span className="zp-tier__pop">Recommended</span>}
                <h3>{p.name}</h3>
                <p className="zp-for">{p.who}</p>
                <p className="zp-price">Quote per team<small>{p.name === "Self-hosted" ? "annual licence with updates" : "during early access"}</small></p>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <Link className={`z-btn ${p.mark ? "z-btn--sun" : "z-btn--line"}`} href="/contact?topic=loop-os">{p.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="z-sec z-sec--soft" aria-labelledby="los-faq">
        <div className="z-wrap z-faq">
          <div className="z-head">
            <p className="z-over z-over--dark">FAQ</p>
            <h2 id="los-faq" className="z-h2">Questions.</h2>
            <Link href="/faq" className="z-link">View all FAQs →</Link>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Put a crew of agents to work." text="Tell us the three tasks your team repeats most. We'll show you how Loop OS would run them." topic="loop-os" />
    </div>
  );
}
