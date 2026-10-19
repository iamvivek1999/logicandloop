"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { groups, services, servicesIn } from "@/lib/services";
import { site } from "@/lib/site";
import { Check } from "./Icons";

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
    data._subject = `New enquiry: ${data.topic} from ${data.name}`;
    data._template = "table";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("failed");
    }
  }

