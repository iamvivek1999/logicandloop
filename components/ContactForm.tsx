"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { groups, services, servicesIn } from "@/lib/services";
import { site } from "@/lib/site";
import { Check } from "./Icons";
import { trackEvent } from "@/lib/analytics";

const extraTopics = [
  { value: "minute-one", label: "Minute One pilot" },
  { value: "loop-os", label: "Loop OS early access" },
  { value: "call", label: "A 30-minute intro call" },
  { value: "not-sure", label: "Not sure yet" },
];

const budgets = ["Under ₹2 lakh", "₹2–5 lakh", "₹5–15 lakh", "₹15 lakh +", "Not sure yet"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type State = "idle" | "sending" | "sent" | "failed";

const labelFor = (v: string) =>
  services.find((s) => s.slug === v)?.name ?? extraTopics.find((t) => t.value === v)?.label ?? v;

export default function ContactForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [topic, setTopic] = useState("not-sure");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const t = params.get("topic");
    if (t && (services.some((s) => s.slug === t) || extraTopics.some((x) => x.value === t))) setTopic(t);
  }, [params]);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name) e.name = "Enter your name.";
    if (!email) e.email = "Enter your email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Enter an email like name@company.com.";
    if (message.length < 10) e.message = "Tell us a little about the project, at least a sentence.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return; // bot
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setState("sending");
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { if (k !== "_honey") data[k] = String(v); });
    data.topic = labelFor(data.topic);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _honey: fd.get("_honey") }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || String(res.status));
      setState("sent");
      trackEvent("contact_submit", { topic: data.topic });
      form.reset();
    } catch {
      setState("failed");
      trackEvent("contact_submit_failed");
    }
  }

  const clear = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));

  if (state === "sent") {
    return (
      <div className="form" role="status">
        <div className="done">
          <Check />
          <h2 className="h3">Message sent.</h2>
          <p className="muted">
            Thanks. It's in our inbox and we'll reply {site.replyPromise}. If it's urgent, WhatsApp is the fastest way to reach us.
          </p>
          <div><button className="btn btn--outline" onClick={() => setState("idle")}>Send another message</button></div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-label="Project enquiry">
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} onInput={() => clear("name")} />
        {errors.name && <span id="name-err" className="field__err">{errors.name}</span>}
      </div>
      <div className="row-2">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} onInput={() => clear("email")} />
          {errors.email && <span id="email-err" className="field__err">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone or WhatsApp <span className="opt">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div className="row-2">
        <div className="field">
          <label htmlFor="company">Company <span className="opt">(optional)</span></label>
          <input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="budget">Budget <span className="opt">(optional)</span></label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">Choose a range</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="topic">What do you need?</label>
        <select id="topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {groups.map((g) => (
            <optgroup key={g.id} label={g.name}>
              {servicesIn(g.id).map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </optgroup>
          ))}
          <optgroup label="Products and other">
            {extraTopics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </optgroup>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about the project</label>
        <textarea id="message" name="message" rows={5} placeholder="What are you building, who is it for, and when do you need it?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} onInput={() => clear("message")} />
        {errors.message && <span id="message-err" className="field__err">{errors.message}</span>}
      </div>
      <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === "failed" && (
        <p className="form__status form__status--err" role="alert">
          The message didn't go through. Try again, or email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <button className="btn btn--primary btn--block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? (<><span className="spinner" aria-hidden="true" /> Sending</>) : "Send message"}
      </button>
      <p className="form__note">We reply {site.replyPromise}. Your details are only used to answer this enquiry.</p>
    </form>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="form" aria-busy="true" aria-label="Loading form">
      {[0, 1, 2, 3].map((i) => (
        <div className="field" key={i}>
          <span className="skeleton" style={{ width: 120, height: 14 }} />
          <span className="skeleton" style={{ height: 46 }} />
        </div>
      ))}
      <span className="skeleton" style={{ height: 130 }} />
      <span className="skeleton" style={{ height: 48 }} />
    </div>
  );
}
