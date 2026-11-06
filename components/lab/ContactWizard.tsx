"use client";

import { useState } from "react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { site, whatsappHref } from "@/lib/site";

/**
 * Step-by-step enquiry (lab). Three taps to qualify, then name and email.
 * Sends to the same /api/contact route as the live form.
 */
const needs = [
  { v: "Build software", s: "Web, mobile, MVP or internal tool", topic: "web-apps-saas" },
  { v: "AI agents", s: "WhatsApp, chat or document agents", topic: "ai-agents-chatbots" },
  { v: "Automate work", s: "Connect tools, cut manual steps", topic: "workflow-automation" },
  { v: "Minute One", s: "Answer every lead within a minute", topic: "minute-one" },
  { v: "Talent assessment", s: "Online assessments or hiring drives", topic: "online-assessments" },
  { v: "Not sure yet", s: "Tell us the problem instead", topic: "not-sure" },
];
const sizes = ["Just me", "2–10 people", "11–50 people", "51–200 people", "200+ people"];
const whens = ["As soon as possible", "In 1–3 months", "Later this year", "Just exploring"];

export default function ContactWizard() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<(typeof needs)[number] | null>(null);
  const [size, setSize] = useState("");
  const [when, setWhen] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const pick = (fn: () => void) => { fn(); setStep((s) => s + 1); };

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get("_honey")) return;
    const note = String(fd.get("note") ?? "").trim();
    const message = [`Need: ${need?.v}`, `Team: ${size}`, `Timing: ${when}`, note && `Notes: ${note}`].filter(Boolean).join("\n");
    const name = String(fd.get("name") ?? ""), email = String(fd.get("email") ?? "");
    const e = validateContact({ name, email, message });
    setErrors(e);
    if (Object.keys(e).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: String(fd.get("phone") ?? ""), company: String(fd.get("company") ?? ""), topic: need?.v ?? "Not sure yet", message, _honey: "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="zw-card zw-done" role="status">
        <p className="zw-q">Thanks, it&rsquo;s with us.</p>
        <p style={{ color: "var(--mute)" }}>We&rsquo;ll reply {site.replyPromise}. If it&rsquo;s urgent, WhatsApp is fastest.</p>
      </div>
    );
  }

  return (
    <div className="zw-card">
      <div className="zw-prog" aria-hidden="true">{[0, 1, 2, 3].map((n) => <i key={n} className={n <= step ? "is-on" : ""} />)}</div>
      <p className="zw-step">Step {step + 1} of 4</p>

      {step === 0 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="zw-q">What do you need help with?</legend>
          <div className="zw-opts">
            {needs.map((n) => (
              <button key={n.v} type="button" className="zw-opt" aria-pressed={need?.v === n.v} onClick={() => pick(() => setNeed(n))}>
                {n.v}<small>{n.s}</small>
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {step === 1 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="zw-q">How big is your team?</legend>
          <div className="zw-opts">
            {sizes.map((s) => <button key={s} type="button" className="zw-opt" aria-pressed={size === s} onClick={() => pick(() => setSize(s))}>{s}</button>)}
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="zw-q">When would you like to start?</legend>
          <div className="zw-opts">
            {whens.map((w) => <button key={w} type="button" className="zw-opt" aria-pressed={when === w} onClick={() => pick(() => setWhen(w))}>{w}</button>)}
          </div>
        </fieldset>
      )}
      {step === 3 && (
        <form onSubmit={submit} noValidate>
          <p className="zw-q">Where should we reply?</p>
          <div className="zw-sum"><span><b>{need?.v}</b> · {size} · {when}</span></div>
          <div className="zw-fields">
            <label>Your name<input name="name" autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <span className="zw-err">{errors.name}</span>}</label>
            <label>Work email<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />{errors.email && <span className="zw-err">{errors.email}</span>}</label>
            <label>Phone or WhatsApp (optional)<input name="phone" autoComplete="tel" /></label>
            <label>Company (optional)<input name="company" autoComplete="organization" /></label>
            <label>Anything else we should know? (optional)<textarea name="note" rows={3} /></label>
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
          </div>
          {state === "failed" && <p className="zw-err" role="alert" style={{ marginTop: 14 }}>That didn&rsquo;t send. Please try again, or <a href={whatsappHref()} target="_blank" rel="noopener">message us on WhatsApp</a>.</p>}
          <div className="zw-nav">
            <button type="button" className="zw-back" onClick={() => setStep(2)}>← Back</button>
            <button className="z-btn z-btn--sun" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send"}</button>
          </div>
        </form>
      )}
      {step > 0 && step < 3 && (
        <div className="zw-nav"><button type="button" className="zw-back" onClick={() => setStep((s) => s - 1)}>← Back</button><span /></div>
      )}
    </div>
  );
}
