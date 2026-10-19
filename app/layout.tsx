import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WhatsApp } from "@/components/Icons";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Logic & Loop | Web apps, mobile apps, AI agents and automations",
    template: "%s | Logic & Loop",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Logic & Loop | We write the logic. Your business runs the loop.",
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#EEF1F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <a className="wa-float" href={whatsappHref()} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
          <WhatsApp />
        </a>
