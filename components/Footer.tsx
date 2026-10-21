import Link from "next/link";
import { Logo } from "./Icons";
import { groups, servicesIn, services } from "@/lib/services";
import { site, whatsappHref } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="brand">
              <Logo />
              Logic &amp; Loop
            </Link>
            <p>Web apps, mobile apps, AI agents and automations, built by a small senior team.</p>
          </div>
          {groups.slice(0, 2).map((g) => (
            <div key={g.id}>
              <h4>{g.name}</h4>
              <ul>
                {servicesIn(g.id).map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
                ))}
              </ul>
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
              <li><Link href="/services">All {services.length} services</Link></li>
              <li><Link href="/#process">How we work</Link></li>
              <li><Link href="/about">About Logic &amp; Loop</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={whatsappHref()} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><Link href="/contact">Project enquiry</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>© {year} Logic &amp; Loop. All rights reserved.</span>
          <span>Based in India, working with clients everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
