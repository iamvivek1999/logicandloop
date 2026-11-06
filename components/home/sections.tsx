/**
 * Home page sections kept from the earlier design (industries, AI agents,
 * why us, closing), plus the delivery steps the new process section uses.
 */
import Link from "next/link";
import UseCases from "@/components/UseCases";
import { WhatsApp } from "@/components/Icons";
import TextRoll from "@/components/fx/TextRoll";
import ExpandAgents from "@/components/fx/ExpandAgents";
import ConvergeText from "@/components/fx/ConvergeText";
import Magnetic from "@/components/fx/Magnetic";
import ScrollWords from "@/components/fx/ScrollWords";
import DotField from "@/components/fx/DotField";
import { bookingHref, bookingReady, whatsappHref } from "@/lib/site";

const ext = bookingReady ? { target: "_blank", rel: "noopener" } : {};


export const run = [
  { when: "Week 1", h: "Understand", p: "A working session on your goals, users and the numbers that matter. You get a clear scope and a fixed quote." },
  { when: "Weeks 1–3", h: "Design", p: "Flows and screens you can click through before a line of production code is written." },
  { when: "Weekly releases", h: "Build", p: "Weekly demos on a live link. You see progress every week and can change direction early." },
  { when: "Ongoing", h: "Launch & improve", p: "We ship, watch the numbers, and keep improving on a monthly plan, or hand over to your team with full docs." },
];

const agents = [
  {
    h: "Agents that talk",
    verb: "Talk",
    p: "Chat and WhatsApp agents that answer, qualify, book and follow up, in your voice, at any hour.",
    tags: ["WhatsApp replies", "Lead qualifying", "Bookings"],
    href: "/services/ai-agents-chatbots",
  },
  {
    h: "Agents that read",
    verb: "Read",
    p: "Turn brochures, manuals, contracts and records into answers your team and customers can simply ask for.",
    tags: ["Document Q&A", "Extraction", "Search"],
    href: "/services/llm-rag-integration",
  },
  {
    h: "Agents that run",
    verb: "Run",
    p: "Workflows that move data between your tools, draft the routine work and wait for a person on anything that matters.",
    tags: ["CRM updates", "Quotes & invoices", "Approvals"],
    href: "/services/workflow-automation",
  },
];

const compare = [
  ["Price", "Hourly rates, open-ended", "Fixed scope and fixed quote"],
  ["Who builds it", "Juniors behind an account manager", "The engineers who scoped it"],
  ["Seeing progress", "A report at the end of the month", "A demo on a live link every week"],
  ["Ownership", "Code and accounts in the vendor's name", "Everything in your name from day one"],
  ["Contract", "Long lock-in", "Monthly plans"],
  ["AI", "A demo that never reaches customers", "Live agents with a person in the loop"],
];







export function Industries() {
  return (
    <>
      <section className="section section--rule" id="use-cases" aria-labelledby="uc-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Industries</p>
              <h2 id="uc-h" className="h2">From the first enquiry <span className="tone">to the work that follows it.</span></h2>
            </div>
            <p className="lead">We work mostly with businesses where every lead and every customer is worth a lot. Here is what the routine part looks like once it runs itself.</p>
          </div>
          <div data-reveal>
            <UseCases />
          </div>
        </div>
      </section>
    </>
  );
}

export function Agents() {
  return (
    <>
      <section className="glow" id="ai" aria-labelledby="ai-h">
        <div className="wrap">
          <div className="center-head">
            <p className="kicker">AI automation &amp; transformation</p>
            <h2 id="ai-h" className="h2">Three kinds of agents. <span className="tone">One quieter workday.</span></h2>
            <p className="lead">Most of what we automate falls into one of three jobs. Most businesses need all three, wired together.</p>
          </div>
          <ExpandAgents agents={agents} />
          <Link href="/hours-calculator" className="calc-teaser">
            <span>
              <b>How much repetitive work could your team hand off?</b>
              <small>Pick a task, describe the effort and see the hours automation could give back.</small>
            </span>
            <span className="calc-teaser__go">Open the calculator <span aria-hidden="true">→</span></span>
          </Link>
        </div>
      </section>
    </>
  );
}




export function Why() {
  return (
    <>
      <section className="section" id="why" aria-labelledby="cmp-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Why Logic &amp; Loop</p>
              <h2 id="cmp-h" className="h2">Most vendors bill effort. <span className="tone">We answer for outcomes.</span></h2>
            </div>
          </div>
          <ScrollWords className="why-words" text="Every engagement is tied to one measurable outcome, like visits booked or hours saved. We report on it every week, and every plan is monthly, so you stay because it works, not because a contract says so." />
          <div className="cmp" role="table" aria-label="How we compare" data-reveal>
            <div className="cmp__row cmp__row--head" role="row">
              <span role="columnheader">What matters</span>
              <span role="columnheader">What you often get</span>
              <span role="columnheader">Logic &amp; Loop</span>
            </div>
            {compare.map(([k, a, b]) => (
              <div className="cmp__row" role="row" key={k}>
                <span role="rowheader">{k}</span>
                <span role="cell">{a}</span>
                <span role="cell">{b}</span>
              </div>
            ))}
          </div>
          <p className="products-bridge">Questions before the first call? <Link className="link-draw" href="/faq">Read the FAQ</Link></p>
        </div>
      </section>
    </>
  );
}


export function Closing() {
  return (
    <>
      <section className="closing" aria-labelledby="final-h">
        <DotField />
        <div className="wrap">
          <p className="kicker">Get started</p>
          <ConvergeText id="final-h" lines={["Too good", "for busywork."]} />
          <p className="lead">Your team is too good to spend the day on busywork. A 30-minute call is enough to tell you whether we&rsquo;re the right team, what it would take and roughly what it would cost.</p>
          <div className="hero__cta closing__cta">
            <Magnetic>
              <a className="btn btn--primary btn--lg roll-host" href={bookingHref} data-analytics="booking_click" {...ext}>
                <TextRoll>Book a 30-minute call</TextRoll>
              </a>
            </Magnetic>
            <a className="btn btn--quiet roll-host" href={whatsappHref()} target="_blank" rel="noopener" data-analytics="whatsapp_click">
              <WhatsApp className="ico" /> <TextRoll>WhatsApp us</TextRoll>
            </a>
          </div>
        </div>
      </section>
    
    </>
  );
}
