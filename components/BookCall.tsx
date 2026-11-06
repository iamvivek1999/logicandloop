"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { validateContact, type ContactErrors } from "@/lib/contact";
import { site, whatsappHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Check } from "./Icons";

/**
 * "Book a call" while no booking calendar is connected: an interactive month
 * calendar, time slots that animate in for the chosen day (shown in the
 * visitor's own time zone), then name and email. Sends the request to
 * /api/contact and we confirm the slot. Once site.bookingUrl is set, every
 * "Book a call" button opens the real calendar instead.
 */

// Our working hours, in India time: 10:00 to 17:30, every 30 minutes.
const IST_OFFSET_MIN = 330;
const SLOTS_IST = Array.from({ length: 16 }, (_, i) => ({ h: 10 + Math.floor(i / 2), m: (i % 2) * 30 }));
const BOOK_AHEAD_DAYS = 45;
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ease = [0.22, 1, 0.36, 1] as const;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
// The real moment of an India-time slot on a given calendar day.
const slotInstant = (day: Date, h: number, m: number) =>
  new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), h, m) - IST_OFFSET_MIN * 60000);

type State = "idle" | "sending" | "sent" | "failed";

export default function BookCall() {
  const calm = useReducedMotion();
  const [today, setToday] = useState<Date | null>(null);
  const [tz, setTz] = useState("");
  const [nowMs, setNowMs] = useState(0);
  const [month, setMonth] = useState<Date | null>(null);
  const [dir, setDir] = useState(1);
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState<Date | null>(null);
  const [step, setStep] = useState<"pick" | "details">("pick");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<State>("idle");

  // Dates depend on the visitor's clock and time zone, so they're set in the browser.
  useEffect(() => {
    const n = new Date();
    const t = startOfDay(n);
    setNowMs(n.getTime());
    setToday(t);
    setMonth(new Date(t.getFullYear(), t.getMonth(), 1));
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " "));
  }, []);

  const bookable = (d: Date) => {
    if (!today) return false;
    const w = d.getDay();
    const diff = (startOfDay(d).getTime() - today.getTime()) / 86400000;
    return w !== 0 && w !== 6 && diff >= 1 && diff <= BOOK_AHEAD_DAYS;
  };

  const cells = useMemo(() => {
    if (!month) return [];
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7; // weeks start on Monday
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array<null>(lead).fill(null), ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  }, [month]);

  const slots = useMemo(() => {
    if (!day) return [];
    const earliest = nowMs + 12 * 3600000; // at least half a day's notice
    return SLOTS_IST.map(({ h, m }) => slotInstant(day, h, m)).filter((t) => t.getTime() > earliest);
  }, [day, nowMs]);

  const canPrev = !!(month && today && (month.getFullYear() > today.getFullYear() || month.getMonth() > today.getMonth()));
  const lastBookable = today ? new Date(today.getTime() + BOOK_AHEAD_DAYS * 86400000) : null;
  const canNext = !!(month && lastBookable && new Date(month.getFullYear(), month.getMonth() + 1, 1) <= lastBookable);
  const shift = (n: number) => { setDir(n); setMonth((m) => (m ? new Date(m.getFullYear(), m.getMonth() + n, 1) : m)); };

  const fmtTime = (t: Date) => t.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const fmtDay = (d: Date) => d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  const istLabel = (t: Date) => t.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get("_honey") || !slot) return;
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const note = String(fd.get("note") ?? "").trim();
    const message = [
      `Requested call: ${istLabel(slot)} IST`,
      `Visitor's time: ${fmtDay(slot)}, ${fmtTime(slot)} (${tz})`,
      note && `To discuss: ${note}`,
    ].filter(Boolean).join("\n");
    const e = validateContact({ name, email, message });
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
      trackEvent("call_request", { slot: istLabel(slot) });
    } catch {
      setState("failed");
    }
  }

  if (state === "sent" && slot) {
    return (
      <div className="z zw-root">
        <motion.div className="zw-card zw-done" role="status" initial={calm ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}>
          <Check />
          <p className="zw-q">Requested: {fmtDay(slot)}, {fmtTime(slot)}.</p>
          <p className="zw-muted">We&rsquo;ll confirm by email {site.replyPromise}, with a video-call link.</p>
          <a className="z-btn z-btn--line" href={whatsappHref("Hi, I just requested a call.")} target="_blank" rel="noopener">Confirm faster on WhatsApp</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="z zw-root">
      <div className="zw-card bk">
        <AnimatePresence mode="wait" initial={false}>
          {step === "pick" ? (
            <motion.div key="pick" className="bk-pick" initial={calm ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={calm ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.3, ease }}>
              <div className="bk-cal">
                <div className="bk-cal__head">
                  <p className="bk-cal__m" aria-live="polite">{month?.toLocaleDateString(undefined, { month: "long", year: "numeric" }) ?? " "}</p>
                  <div className="bk-cal__nav">
                    <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month">‹</button>
                    <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label="Next month">›</button>
                  </div>
                </div>
                <div className="bk-cal__week" aria-hidden="true">{WEEK.map((w) => <span key={w}>{w}</span>)}</div>
                <div className="bk-cal__viewport">
                  <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                    <motion.div
                      key={month ? key(month) : "none"}
                      className="bk-cal__grid"
                      role="group"
                      aria-label="Choose a day"
                      custom={dir}
                      initial={calm ? false : { opacity: 0, x: dir * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={calm ? undefined : { opacity: 0, x: dir * -40 }}
                      transition={{ duration: 0.28, ease }}
                    >
                      {cells.map((d, i) =>
                        d ? (
                          <button
                            key={key(d)}
                            type="button"
                            className={`bk-day${today && sameDay(d, today) ? " is-today" : ""}`}
                            disabled={!bookable(d)}
                            aria-pressed={!!day && sameDay(d, day)}
                            aria-label={fmtDay(d)}
                            onClick={() => { setDay(d); setSlot(null); }}
                          >
                            {day && sameDay(d, day) && <motion.span layoutId="bk-sel" className="bk-day__sel" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                            <span className="bk-day__n">{d.getDate()}</span>
                          </button>
                        ) : <span key={`e${i}`} />,
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="bk-tz">Times shown in your time zone{tz && <>: <b>{tz}</b></>}</p>
              </div>

              <div className="bk-times" data-lenis-prevent>
                <AnimatePresence mode="wait" initial={false}>
                  {!day ? (
                    <motion.div key="empty" className="bk-times__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="bk-times__icon" aria-hidden="true" />
                      <p>Pick a day to see open times.</p>
                    </motion.div>
                  ) : (
                    <motion.div key={key(day)} initial={calm ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={calm ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.22, ease }}>
                      <p className="bk-times__day">{day.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}</p>
                      {slots.length === 0 && <p className="zw-muted">No times left on this day. Try the next one.</p>}
                      <ul className="bk-slots" aria-label="Open times">
                        {slots.map((t, i) => {
                          const on = !!slot && t.getTime() === slot.getTime();
                          return (
                            <motion.li
                              key={t.getTime()}
                              layout={!calm}
                              initial={calm ? false : { opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: calm ? 0 : i * 0.03, duration: 0.3, ease }}
                              className={on ? "is-on" : ""}
                            >
                              <motion.button layout={!calm} type="button" className="bk-slot" aria-pressed={on} onClick={() => setSlot(t)}>
                                {fmtTime(t)}
                              </motion.button>
                              <AnimatePresence>
                                {on && (
                                  <motion.button
                                    type="button"
                                    className="bk-next"
                                    initial={calm ? false : { opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.25, ease }}
                                    onClick={() => setStep("details")}
                                  >
                                    Next
                                  </motion.button>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.form key="details" onSubmit={submit} noValidate initial={calm ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={calm ? undefined : { opacity: 0, x: 24 }} transition={{ duration: 0.3, ease }}>
              <button type="button" className="zw-back" onClick={() => setStep("pick")}>← Change time</button>
              <p className="zw-q" style={{ marginTop: 8 }}>Your details</p>
              {slot && (
                <div className="zw-sum bk-sum">
                  <span><b>{fmtDay(slot)}, {fmtTime(slot)}</b> · 30-minute video call</span>
                  <span>{istLabel(slot)} India time</span>
                </div>
              )}
              <div className="zw-fields">
                <div className="zw-two">
                  <label>Your name<input name="name" autoComplete="name" aria-invalid={!!errors.name} autoFocus />{errors.name && <span className="zw-err">{errors.name}</span>}</label>
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
                <button className="z-btn z-btn--sun" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Request this time"}</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
