"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { serviceBySlug } from "@/lib/services";
import { isTopic, topicLabel, validateContact, type ContactErrors } from "@/lib/contact";
import { site, whatsappHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Check } from "./Icons";

/**
 * The enquiry form as three one-tap questions, then where to reply.
 * A `?topic=` link (from a service, product or industry page) answers the
 * first question for the visitor. Sends to /api/contact like before.
 */
const needs = [
  { v: "Build software", s: "Web, mobile, MVP or an internal tool", group: "build" },
  { v: "AI agents", s: "WhatsApp, chat or document agents", group: "ai" },
  { v: "Automate work", s: "Connect tools, cut manual steps", group: "automate" },
  { v: "Minute One", s: "Answer every lead within a minute", group: "" },
  { v: "Talent assessment", s: "Online assessments or hiring drives", group: "hiring" },
  { v: "Not sure yet", s: "Tell us the problem instead", group: "advise" },
] as const;
const sizes = ["Just me", "2–10 people", "11–50 people", "51–200 people", "200+ people"];
const whens = ["As soon as possible", "In 1–3 months", "Later this year", "Just exploring"];
const budgets = ["Under ₹2 lakh", "₹2–5 lakh", "₹5–15 lakh", "₹15 lakh +", "Not sure yet"];

// Which first answer a ?topic= value implies.
function needFor(topic: string) {
  if (topic === "minute-one") return needs[3];
  if (topic === "loop-os") return needs[1];
  const g = serviceBySlug(topic)?.group;
  return needs.find((n) => n.group && n.group === g) ?? null;
}

type State = "idle" | "sending" | "sent" | "failed";

export default function ContactWizard() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<(typeof needs)[number] | null>(null);
  const [topic, setTopic] = useState("");
  const [size, setSize] = useState("");
  const [when, setWhen] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<State>("idle");
  const heading = useRef<HTMLParagraphElement>(null);

  // A topic link skips the first question.
  useEffect(() => {
    const t = params.get("topic");
    if (!t || !isTopic(t)) return;
    setTopic(t);
    const n = needFor(t);
    if (n) { setNeed(n); setStep(1); }
  }, [params]);

  // Move focus to each new question so keyboard and screen-reader users follow along.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    heading.current?.focus();
  }, [step]);

  const answer = (fn: () => void) => { fn(); setStep((s) => s + 1); };

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get("_honey")) return;
    const note = String(fd.get("note") ?? "").trim();
    const message = [`Need: ${need?.v ?? "Not sure yet"}`, `Team: ${size}`, `Timing: ${when}`, note && `Notes: ${note}`].filter(Boolean).join("\n");
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const e = validateContact({ name, email, message });
    setErrors(e);
    if (Object.keys(e).length) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setState("sending");
    const topicText = topic ? topicLabel(topic) : need?.v ?? "Not sure yet";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email, message, topic: topicText,
          phone: String(fd.get("phone") ?? ""),
          company: String(fd.get("company") ?? ""),
          budget: String(fd.get("budget") ?? ""),
          _honey: "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      trackEvent("contact_submit", { topic: topicText });
    } catch {
      setState("failed");
      trackEvent("contact_submit_failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="z zw-root">
        <div className="zw-card zw-done" role="status">
          <Check />
          <p className="zw-q">Thanks, it&rsquo;s with us.</p>
          <p className="zw-muted">We&rsquo;ll reply {site.replyPromise}. If it&rsquo;s urgent, WhatsApp is the fastest way to reach us.</p>
          <a className="z-btn z-btn--line" href={whatsappHref()} target="_blank" rel="noopener">Message us on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className="z zw-root">
      <div className="zw-card">
        <div className="zw-prog" aria-hidden="true">{[0, 1, 2, 3].map((n) => <i key={n} className={n <= step ? "is-on" : ""} />)}</div>
        <p className="zw-step">Step {step + 1} of 4</p>

        {step === 0 && (
          <div role="group" aria-labelledby="zw-q0">
            <p className="zw-q" id="zw-q0" ref={heading} tabIndex={-1}>What do you need help with?</p>
            <div className="zw-opts">
              {needs.map((n) => (
                <button key={n.v} type="button" className="zw-opt" aria-pressed={need?.v === n.v} onClick={() => answer(() => { setNeed(n); setTopic(""); })}>
                  {n.v}<small>{n.s}</small>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div role="group" aria-labelledby="zw-q1">
            <p className="zw-q" id="zw-q1" ref={heading} tabIndex={-1}>How big is your team?</p>
            {need && <p className="zw-muted">For: <b>{topic ? topicLabel(topic) : need.v}</b> · <button type="button" className="zw-back" onClick={() => { setTopic(""); setStep(0); }}>change</button></p>}
            <div className="zw-opts">
              {sizes.map((s) => <button key={s} type="button" className="zw-opt" aria-pressed={size === s} onClick={() => answer(() => setSize(s))}>{s}</button>)}
            </div>
          </div>
        )}
        {step === 2 && (
          <div role="group" aria-labelledby="zw-q2">
            <p className="zw-q" id="zw-q2" ref={heading} tabIndex={-1}>When would you like to start?</p>
            <div className="zw-opts">
              {whens.map((w) => <button key={w} type="button" className="zw-opt" aria-pressed={when === w} onClick={() => answer(() => setWhen(w))}>{w}</button>)}
            </div>
          </div>
        )}
        {step === 3 && (
          <form onSubmit={submit} noValidate>
            <p className="zw-q" ref={heading} tabIndex={-1}>Where should we reply?</p>
            <div className="zw-sum"><span><b>{topic ? topicLabel(topic) : need?.v}</b> · {size} · {when}</span></div>
            <div className="zw-fields">
              <label>Your name<input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "zw-e-name" : undefined} />{errors.name && <span className="zw-err" id="zw-e-name">{errors.name}</span>}</label>
              <label>Work email<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "zw-e-email" : undefined} />{errors.email && <span className="zw-err" id="zw-e-email">{errors.email}</span>}</label>
              <div className="zw-two">
                <label><span>Phone or WhatsApp <small>(optional)</small></span><input name="phone" autoComplete="tel" /></label>
                <label><span>Company <small>(optional)</small></span><input name="company" autoComplete="organization" /></label>
              </div>
              <label><span>Budget <small>(optional)</small></span>
                <select name="budget" defaultValue=""><option value="">Choose a range</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
              </label>
              <label><span>Anything else we should know? <small>(optional)</small></span><textarea name="note" rows={3} /></label>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="zw-honey" />
            </div>
            {state === "failed" && <p className="zw-err" role="alert" style={{ marginTop: 14 }}>That didn&rsquo;t send. Please try again, or <a href={whatsappHref()} target="_blank" rel="noopener">message us on WhatsApp</a>.</p>}
            <div className="zw-nav">
              <button type="button" className="zw-back" onClick={() => setStep(2)}>← Back</button>
              <button className="z-btn z-btn--sun" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send"}</button>
            </div>
            <p className="zw-fine">We reply {site.replyPromise}. Your details are only used to answer this enquiry.</p>
          </form>
        )}
        {step > 0 && step < 3 && (
          <div className="zw-nav"><button type="button" className="zw-back" onClick={() => setStep((s) => s - 1)}>← Back</button><span /></div>
        )}
      </div>
    </div>
  );
}

export function ContactWizardSkeleton() {
  return <div className="z zw-root"><div className="zw-card" style={{ minHeight: 420 }} aria-hidden="true" /></div>;
}
