"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "ll-consent";
type Choice = "granted" | "denied";

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

/** Footer link that reopens the cookie choice. Hidden when there is nothing to choose. */
export const ConsentLink = () =>
  GA_ID ? (
    <button className="linkish" onClick={() => window.dispatchEvent(new Event("ll-consent-open"))}>
      Cookie settings
    </button>
  ) : null;

/**
 * Cookie choice and the analytics it gates. The site sets no cookies of its own;
 * the only optional one is Google Analytics, so the banner exists only when
 * NEXT_PUBLIC_GA_ID is set, and the analytics script loads only after "Accept".
 */
export default function Consent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const saved = read();
    setChoice(saved);
    // Wait a moment so the banner never competes with the first paint of the page.
    const t = window.setTimeout(() => setOpen(!saved), 900);
    const reopen = () => setOpen(true);
    window.addEventListener("ll-consent-open", reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("ll-consent-open", reopen);
    };
  }, []);

  if (!GA_ID) return null;

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    // Turning analytics off after it loaded: stop it now; its cookies expire on their own.
    if (c === "denied" && choice === "granted") (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    setChoice(c);
    setOpen(false);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      <section className={`consent${open ? " is-on" : ""}`} aria-label="Cookie choice" aria-hidden={!open || undefined} inert={!open || undefined}>
        <p className="consent__h">One optional cookie</p>
        <p className="consent__p">
          We&rsquo;d like to use Google Analytics to see which pages are useful. It sets cookies only if you say yes. Everything on the site works either way.
        </p>
        <div className="consent__actions">
          <button className="btn btn--outline btn--sm" onClick={() => decide("denied")}>Reject</button>
          <button className="btn btn--primary btn--sm" onClick={() => decide("granted")}>Accept</button>
        </div>
      </section>
    </>
  );
}
