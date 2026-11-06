import Link from "next/link";
import { Logo } from "./Icons";
import { ConsentLink } from "./Consent";
import { groupName, groups, servicesIn } from "@/lib/services";
import { site, whatsappHref } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="brand">
              <Logo reversed />
              Logic &amp; Loop
            </Link>
            <p>Technology services for software engineering, AI and automation. One accountable team from design to run.</p>
          </div>
          {groups.slice(0, 2).map((g) => (
            <div key={g.id}>
              <h4>{g.name}</h4>
              <ul>
                {servicesIn(g.id).map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
                ))}
              </ul>
              {/* Talent assessment sits with the services, so it never reads as "we're hiring". */}
              {g.id === "ai" ? (
                <>
                  <h4 style={{ marginTop: 28 }}>{groupName("hiring")} services</h4>
                  <ul>
                    {servicesIn("hiring").map((s) => (
                      <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
          <div>
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/minute-one">Minute One</Link></li>
              <li><Link href="/products/loop-os">Loop OS</Link></li>
            </ul>
            <h4 style={{ marginTop: 28 }}>More</h4>
            <ul>
              <li><Link href="/services">All services</Link></li>
              <li><Link href="/#process">How we work</Link></li>
              <li><Link href="/about">About Logic &amp; Loop</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={whatsappHref()} target="_blank" rel="noopener" data-analytics="whatsapp_click">WhatsApp</a></li>
              <li><Link href="/contact">Project enquiry</Link></li>
            </ul>
          </div>
        </div>
        <p className="footer__mark" aria-hidden="true">Logic &amp; Loop</p>
        <div className="footer__base">
          <span>© {year} Logic &amp; Loop. All rights reserved.</span>
          <span>Based in India, working with clients everywhere.</span>
          <span className="footer__end">
            <ConsentLink />
            <a href="#main">Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
