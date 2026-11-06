"use client";

import { useEffect, useState } from "react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { site, whatsappHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Check } from "./Icons";

/**
 * "Book a call" while no booking calendar is connected: pick a day and a
 * time, leave a name and email, and we confirm the slot. Sends to
 * /api/contact. Once site.bookingUrl is set, every "Book a call" button
 * opens the real calendar instead and this page is no longer linked.
 */
const times = ["10:00", "11:30", "14:00", "15:30", "17:00"];

function nextWorkdays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) out.push(new Date(d));
  }
  return out;
}
const dayLabel = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

type State = "idle" | "sending" | "sent" | "failed";

export default function BookCall() {
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<ContactErrors & { slot?: string }>({});
  const [state, setState] = useState<State>("idle");

  // Dates depend on today, so they're worked out in the browser after load.
  useEffect(() => { setDays(nextWorkdays(6)); }, []);

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get("_honey")) return;
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const note = String(fd.get("note") ?? "").trim();
    const message = [`Requested call: ${day || "?"} at ${time || "?"} IST`, note && `To discuss: ${note}`].filter(Boolean).join("\n");
    const e: ContactErrors & { slot?: string } = validateContact({ name, email, message });
    if (!day || !time) e.slot = "Pick a day and a time.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, topic: "A 30-minute intro call", phone: String(fd.get("phone") ?? ""), company: String(fd.get("company") ?? ""), _honey: "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      trackEvent("call_request", { slot: `${day} ${time}` });
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="z zw-root">
        <div className="zw-card zw-done" role="status">
          <Check />
          <p className="zw-q">Request sent for {day}, {time} IST.</p>
          <p className="zw-muted">We&rsquo;ll confirm the slot by email {site.replyPromise}, with a video-call link.</p>
          <a className="z-btn z-btn--line" href={whatsappHref("Hi, I just requested a call.")} target="_blank" rel="noopener">Confirm faster on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className="z zw-root">
      <form className="zw-card" onSubmit={submit} noValidate>
        <p className="zw-q">Pick a time that suits you</p>
        <p className="zw-muted">30 minutes on a video call. Times are in India time (IST, UTC+5:30); we confirm by email.</p>

        <p className="bk-h" id="bk-day">Day</p>
        <div className="bk-days" role="group" aria-labelledby="bk-day">
          {days.length === 0 && <span className="zw-muted">Loading dates…</span>}
          {days.map((d) => {
            const l = dayLabel(d);
            return <button key={l} type="button" className="zw-opt bk-opt" aria-pressed={day === l} onClick={() => setDay(l)}>{l}</button>;
          })}
        </div>
        <p className="bk-h" id="bk-time">Time</p>
        <div className="bk-times" role="group" aria-labelledby="bk-time">
          {times.map((t) => <button key={t} type="button" className="zw-opt bk-opt" aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>)}
        </div>
        {errors.slot && <p className="zw-err" role="alert">{errors.slot}</p>}

        <div className="zw-fields">
          <div className="zw-two">
            <label>Your name<input name="name" autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <span className="zw-err">{errors.name}</span>}</label>
            <label>Work email<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />{errors.email && <span className="zw-err">{errors.email}</span>}</label>
          </div>
          <div className="zw-two">
            <label><span>Phone or WhatsApp <small>(optional)</small></span><input name="phone" autoComplete="tel" /></label>
            <label><span>Company <small>(optional)</small></span><input name="company" autoComplete="organization" /></label>
          </div>
          <label><span>What would you like to discuss? <small>(optional)</small></span><textarea name="note" rows={3} /></label>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="zw-honey" />
        </div>
        {state === "failed" && <p className="zw-err" role="alert" style={{ marginTop: 14 }}>That didn&rsquo;t send. Please try again, or <a href={whatsappHref("Hi, I'd like to book a 30-minute call.")} target="_blank" rel="noopener">book on WhatsApp</a>.</p>}
        <div className="zw-nav">
          <span className="zw-fine" style={{ margin: 0 }}>Free · no preparation needed</span>
          <button className="z-btn z-btn--sun" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Request this slot"}</button>
        </div>
      </form>
    </div>
  );
}
