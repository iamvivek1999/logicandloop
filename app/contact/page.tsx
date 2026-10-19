import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm, { ContactFormSkeleton } from "@/components/ContactForm";
import { Arrow, Calendar, Mail, WhatsApp } from "@/components/Icons";
import { bookingHref, bookingReady, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you want to build. We reply within one working day.",
};

export default function Contact() {
  return (
    <section className="section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
      <div className="wrap contact">
        <div>
          <ol className="crumbs" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Contact</li>
          </ol>
          <h1 className="display" style={{ fontSize: "var(--step-4)" }}>Tell us what you want to build.</h1>
          <p className="lead" style={{ marginTop: 24 }}>We reply {site.replyPromise}, usually much faster.</p>
          <ul className="ways">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener">
                <span className="ways__ico"><WhatsApp /></span>
                <span><strong>WhatsApp</strong><small>Fastest reply</small></span>
                <Arrow className="arrow" />
              </a>
            </li>
            <li>
              <a href={bookingReady ? bookingHref : "#name"} {...(bookingReady ? { target: "_blank", rel: "noopener" } : {})}>
                <span className="ways__ico"><Calendar /></span>
                <span><strong>Book a call</strong><small>30 minutes, free</small></span>
                <Arrow className="arrow" />
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
