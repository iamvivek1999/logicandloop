import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";
import Consent from "@/components/Consent";
import Motion from "@/components/Motion";
import Analytics from "@/components/Analytics";
import { NOTE_KEY, site } from "@/lib/site";

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
  themeColor: "#EEF0EB",
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
    // The inline script below and components/Motion.tsx add classes to <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.getItem("${NOTE_KEY}")&&document.documentElement.classList.add("note-off")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Dock />
        <Consent />
        <Analytics />
        <Motion />
      </body>
    </html>
  );
}
