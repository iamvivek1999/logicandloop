"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { groups, services, groupName, type GroupId } from "@/lib/services";
import { Arrow, Search } from "./Icons";

export default function ServicesExplorer() {
  const [group, setGroup] = useState<GroupId | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return services.filter(
      (s) =>
        (group === "all" || s.group === group) &&
        (!needle ||
          [s.name, s.short, s.intro, ...s.stack].join(" ").toLowerCase().includes(needle))
    );
  }, [group, q]);

  return (
    <div>
      <div className="explorer__bar">
        <div className="filters" role="group" aria-label="Filter by area">
          <button className="filter" aria-pressed={group === "all"} onClick={() => setGroup("all")}>
            All<span>{services.length}</span>
          </button>
          {groups.map((g) => (
            <button key={g.id} className="filter" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.name}<span>{services.filter((s) => s.group === g.id).length}</span>
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search services</span>
          <Search />
          <input type="search" placeholder="Search services or tools" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">{list.length} services shown</p>

      {list.length ? (
        <div className="svc-grid">
          {list.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card">
              <span className="svc-card__group">{groupName(s.group)}</span>
              <h3 className="h3">{s.name}</h3>
              <p>{s.short}</p>
              <span className="svc-card__more">Deliverables and timeline <Arrow /></span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No service matches "{q}". Try a broader word, or <Link href="/contact" style={{ color: "var(--accent)", textDecoration: "underline" }}>describe what you need</Link> and we'll tell you if we can build it.</p>
        </div>
      )}
    </div>
  );
}
