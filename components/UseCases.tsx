"use client";

import { useEffect, useRef, useState } from "react";

type Line = { k: "in" | "out" | "sys" | "log" | "wait"; t: string; at?: string };

const cases: { who: string; h: string; p: string; lines: Line[] }[] = [
  {
    who: "Real estate developers",
    h: "Answer every enquiry within a minute.",
    p: "Minute One replies on WhatsApp, answers approved property questions, qualifies the buyer and books the site visit, then alerts your sales team.",
    lines: [
      { k: "in", t: "Saw your ad. Is the 2-bedroom still available?" },
      { k: "out", t: "Yes, 2-bedroom homes start at AED 1.1 M on floors 4–12. When are you hoping to move?" },
      { k: "in", t: "Within a year. Can I visit on Saturday?" },
      { k: "sys", t: "Visit booked for Saturday 11 am · Sales head alerted" },
    ],
  },
  {
    who: "Premium clinics",
    h: "Fill the diary without a bigger front desk.",
    p: "An agent answers treatment questions from your approved price list, books consultations into your calendar and sends reminders before each one.",
    lines: [
      { k: "in", t: "How much is a consultation for laser treatment?" },
      { k: "out", t: "A consultation is ₹1,500, adjusted against your first session. Tomorrow 5 pm or Thursday 11 am?" },
      { k: "in", t: "Thursday works." },
      { k: "sys", t: "Booked for Thursday 11 am · Reminder set for Wednesday" },
    ],
  },
  {
    who: "Education & edtech",
    h: "Turn course enquiries into counselling calls.",
    p: "Questions answered from your prospectus, counselling slots booked, and every lead logged in your CRM with where it came from.",
    lines: [
      { k: "in", t: "Is the data science course weekend-only?" },
      { k: "out", t: "There are weekend and weekday-evening batches. Would a 15-minute call with a counsellor help?" },
      { k: "in", t: "Yes, please." },
      { k: "sys", t: "Counselling call booked · Lead added to CRM" },
    ],
  },
  {
    who: "Startups",
    h: "Turn demo requests into conversations.",
    p: "Minute One answers product questions from your approved knowledge base, qualifies the account and books a demo while the prospect is still engaged.",
    lines: [
      { k: "in", t: "Can I see how this works for a 20-person team?" },
      { k: "out", t: "Yes. I can arrange a product demo and answer a few questions first." },
      { k: "in", t: "Tomorrow afternoon works." },
      { k: "sys", t: "Demo booked · Sales owner alerted" },
    ],
  },
  {
    who: "Service businesses",
    h: "Turn enquiries into booked discovery calls.",
    p: "Minute One answers common questions, learns what the prospect needs and books a discovery call with the right person.",
    lines: [
      { k: "in", t: "We need help redesigning our customer portal." },
      { k: "out", t: "I can help. What is the main problem, and when would you like to start?" },
      { k: "in", t: "Can we speak this week?" },
      { k: "sys", t: "Discovery call booked · Brief added to CRM" },
    ],
  },
];

const STEP_MS = 7000;

/**
 * The "where it helps" switcher: a numbered list on the left that advances on its
 * own while it is on screen, and a panel on the right where a sample flow plays.
 * Clicking an item takes over and stops the auto-advance; so does reduced motion.
 */
export default function UseCases() {
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const running = auto && visible && !paused;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setOn((i) => (i + 1) % cases.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, on]);

  const c = cases[on];
  const chat = c.lines[0].k === "in";

  return (
    <div
      className={`uc${running ? " is-running" : ""}`}
      ref={box}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ "--step": `${STEP_MS}ms` } as React.CSSProperties}
    >
      <ol className="uc__list">
        {cases.map((x, i) => (
          <li key={x.who} className={i === on ? "is-on" : undefined}>
            <button
              className="uc__tab"
              aria-expanded={i === on}
              aria-controls="uc-panel"
              onClick={() => {
                setOn(i);
                setAuto(false);
              }}
            >
              <span className="uc__n">{String(i + 1).padStart(2, "0")}</span>
              {x.who}
            </button>
            {i === on && (
              <div className="uc__body">
                <h3 className="h3">{x.h}</h3>
                <p>{x.p}</p>
              </div>
            )}
            {i === on && <span className="uc__bar" key={`${on}-${running}`} aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="uc__panel" id="uc-panel" aria-live="polite">
        <div className={`uc__feed${chat ? "" : " uc__feed--log"}`} key={on}>
          {c.lines.map((l, i) =>
            l.k === "log" || l.k === "wait" ? (
              <p className={`uc__log${l.k === "wait" ? " is-wait" : ""}`} style={{ "--d": i } as React.CSSProperties} key={i}>
                <time>{l.at}</time>
                {l.t}
              </p>
            ) : (
              <p className={`uc__msg uc__msg--${l.k}`} style={{ "--d": i } as React.CSSProperties} key={i}>
                {l.t}
              </p>
            ),
          )}
        </div>
        <p className="uc__cap">Sample flow, fictional business.</p>
      </div>
    </div>
  );
}
