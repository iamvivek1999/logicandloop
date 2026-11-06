"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./labbar.css";

/** Development-only switcher between the live pages and the lab versions. */
const groups = [
  { t: "Pricing (draft)", items: [{ href: "/lab/pricing", label: "Preview" }] },
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
