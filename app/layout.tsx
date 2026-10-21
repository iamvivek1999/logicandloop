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
  // Each page points at its own address as the canonical one.
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  // Set these two in Vercel (Settings, Environment Variables) with the codes
  // Google Search Console and Bing Webmaster Tools give you.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
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

// Tells search engines this site is one organisation called Logic & Loop.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.alternateNames,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      email: site.email,
      ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: site.alternateNames,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <a className="wa-float" href={whatsappHref()} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
          <WhatsApp />
        </a>
      </body>
    </html>
  );
}
