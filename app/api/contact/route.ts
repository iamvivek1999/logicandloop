import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  budget?: unknown;
  topic?: unknown;
  message?: unknown;
  _honey?: unknown;
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function allowed(key: string) {
  const now = Date.now();
  const current = requests.get(key);
  if (!current || current.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Contact delivery is not configured." }, { status: 503 });
  }

  const key = clientKey(request);
  if (!allowed(key)) {
    return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (text(payload._honey)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const message = text(payload.message);
  if (!name || name.length > 120 || !email || email.length > 254 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Please check your name, email and message." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const topic = text(payload.topic) || "Not specified";
  const fields = [
    ["Name", name],
    ["Email", email],
    ["Phone or WhatsApp", text(payload.phone) || "Not provided"],
    ["Company", text(payload.company) || "Not provided"],
    ["Budget", text(payload.budget) || "Not provided"],
    ["Topic", topic],
    ["Message", message],
  ];
  const html = `<h2>New enquiry from ${escapeHtml(name)}</h2><table>${fields
    .map(([label, value]) => `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Logic & Loop website <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `New enquiry: ${topic} from ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Contact delivery failed", response.status);
    return NextResponse.json({ error: "We could not send your enquiry. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character] || character));
}
