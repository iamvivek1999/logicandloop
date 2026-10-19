import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { whatsappHref } from "@/lib/site";
import { WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Minute One: WhatsApp lead agent for real estate developers",
  description:
    "Minute One replies to every property lead on WhatsApp within a minute, day or night, qualifies the buyer and books the site visit.",
};

const features = [
  { h: "Replies in under a minute, 24/7", p: "Leads from Meta ads and property portals get an answer while they're still on their phone, including nights, weekends and launch-day rushes." },
  { h: "Answers only from your documents", p: "Prices, possession dates and RERA details come from your approved brochure. If it isn't there, it says it'll check and hands off." },
  { h: "Books site visits, with reminders", p: "Buyers pick a slot in the chat. Two reminders go out before the visit to cut no-shows." },
  { h: "Hands hot leads to sales, fast", p: "Your team gets an instant alert with the full conversation, a response time limit and an escalation if nobody picks it up." },
  { h: "Works with your existing CRM", p: "No switching tools. Every conversation and booking is logged where your team already works." },
  { h: "Hindi and English from day one", p: "Replies in the language the buyer writes in, so NRI and local leads both feel at home." },
];

const faqs = [
  { q: "Will it annoy buyers like other bots?", a: "It replies like a helpful sales executive, asks one question at a time and hands over to a person the moment a buyer asks for one." },
  { q: "What if it quotes the wrong price?", a: "It can only quote from documents you approve. Anything outside them goes to your team." },
  { q: "How do we know it's working?", a: "We measure your site visits per 100 leads before we start, and send a weekly report against that baseline." },
  { q: "How long does setup take?", a: "Two to three weeks from signed pilot to live, including WhatsApp Business API approval." },
];

export default function MinuteOne() {
  return (
    <>
      <section className="p-hero">
        <div className="wrap p-hero__grid">
          <div>
            <ol className="crumbs" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li>Products</li>
              <li aria-current="page">Minute One</li>
            </ol>
            <p className="kicker" style={{ marginBottom: 18 }}>For real estate developers</p>
