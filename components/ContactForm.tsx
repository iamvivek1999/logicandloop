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
