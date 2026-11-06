"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./labbar.css";

/** Development-only switcher between the live pages and the lab versions. */
const groups = [
  { t: "Home", items: [{ href: "/", label: "Current" }, { href: "/lab/zendesk", label: "Zendesk-style" }] },
  { t: "Pricing", items: [{ href: "/lab/pricing", label: "New page" }] },
  { t: "Contact", items: [{ href: "/contact", label: "Current form" }, { href: "/lab/contact", label: "Step wizard" }] },
];

export default function LabBar() {
  const path = usePathname();
  return (
    <nav className="labbar" aria-label="Compare versions">
      {groups.map((g) => (
        <div key={g.t} className="labbar__g">
          <span>{g.t}</span>
          {g.items.map((i) => (
            <Link key={i.href} href={i.href} aria-current={path === i.href ? "page" : undefined}>{i.label}</Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
