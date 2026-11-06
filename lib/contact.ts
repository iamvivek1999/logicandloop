import { services } from "@/lib/services";

/* Contact form rules, shared by the form in the browser and /api/contact. */

export const extraTopics = [
  { value: "minute-one", label: "Minute One pilot" },
  { value: "loop-os", label: "Loop OS early access" },
  { value: "call", label: "A 30-minute intro call" },
  { value: "not-sure", label: "Not sure yet" },
];

export const DEFAULT_TOPIC = "not-sure";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 120, email: 254, messageMin: 10, messageMax: 5000 };

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

// Checks the three required fields. Returns an empty object when they're fine.
export function validateContact(input: { name: string; email: string; message: string }): ContactErrors {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  const e: ContactErrors = {};
  if (!name) e.name = "Enter your name.";
  else if (name.length > limits.name) e.name = `Keep your name under ${limits.name} characters.`;
  if (!email) e.email = "Enter your email so we can reply.";
  else if (email.length > limits.email || !EMAIL_PATTERN.test(email)) e.email = "Enter an email like name@company.com.";
  if (message.length < limits.messageMin) e.message = "Tell us a little about the project, at least a sentence.";
  else if (message.length > limits.messageMax) e.message = `Keep the message under ${limits.messageMax} characters.`;
  return e;
}

export const isTopic = (value: string) =>
  services.some((s) => s.slug === value) || extraTopics.some((t) => t.value === value);

// The topic a `?topic=` link preselects, or the default when it's missing or unknown.
export const topicFromParam = (value: string | null | undefined) =>
  value && isTopic(value) ? value : DEFAULT_TOPIC;

export const topicLabel = (value: string) =>
  services.find((s) => s.slug === value)?.name ?? extraTopics.find((t) => t.value === value)?.label ?? value;
