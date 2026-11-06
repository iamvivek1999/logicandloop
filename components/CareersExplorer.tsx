"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "./Icons";
import TextRoll from "./fx/TextRoll";
import { domainName, domains, locations, openRoles, talentPool, type DomainId, type Level } from "@/lib/careers";

// Only roles that are actually hiring are listed (set `open: true` in lib/careers.ts).
const roles = openRoles();

/**
 * Roles grouped by team, with search, team, location and level filters, and a
 * detail panel that opens beside the list (a full-screen sheet on phones).
 * The open role is kept in the URL (?role=slug) so it can be shared.
 */
const levels: Level[] = ["Internship", "Early career", "Experienced", "Senior"];


function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export default function CareersExplorer() {
  const [q, setQ] = useState("");
  const [doms, setDoms] = useState<DomainId[]>([]);
  const [locs, setLocs] = useState<string[]>([]);
  const [lvls, setLvls] = useState<Level[]>([]);
  const [sel, setSel] = useState<string | null>(null);

  // Open the role named in the URL, if any.
  useEffect(() => {
    const r = new URLSearchParams(location.search).get("role");
    if (r && roles.some((x) => x.slug === r)) setSel(r);
  }, []);

  const pick = useCallback((slug: string | null) => {
    setSel(slug);
    const u = new URL(location.href);
    if (slug) u.searchParams.set("role", slug);
    else u.searchParams.delete("role");
    history.replaceState(null, "", u);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && pick(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [pick]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return roles.filter(
      (r) =>
        (!doms.length || doms.includes(r.domain)) &&
        (!locs.length || r.location.some((l) => locs.includes(l))) &&
        (!lvls.length || lvls.includes(r.level)) &&
        (!t || [r.title, r.summary, domainName(r.domain), ...r.you, ...r.bring].join(" ").toLowerCase().includes(t)),
    );
  }, [q, doms, locs, lvls]);

  const role = roles.find((r) => r.slug === sel) ?? null;
  const filtered = Boolean(q || doms.length || locs.length || lvls.length);
  const clear = () => { setQ(""); setDoms([]); setLocs([]); setLvls([]); };

  return (
    <div className={`jobs${role ? " has-role" : ""}`}>
      <div className="jobs__search">
        <label className="search">
          <span className="sr-only">Search roles</span>
          <Search />
          <input type="search" placeholder="Search roles, skills or teams" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <p className="jobs__count" aria-live="polite">
          {list.length} open {list.length === 1 ? "role" : "roles"}
        </p>
      </div>

      <aside className="jobs__filters" aria-label="Filter roles">
        <fieldset>
          <legend>Team</legend>
          {domains.filter((d) => roles.some((r) => r.domain === d.id)).map((d) => (
            <label key={d.id} className="jobs__check">
              <input type="checkbox" checked={doms.includes(d.id)} onChange={() => setDoms((v) => toggle(v, d.id))} />
              <span>{d.name}</span>
              <small>{roles.filter((r) => r.domain === d.id).length}</small>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Location</legend>
          {locations.map((l) => (
            <label key={l} className="jobs__check">
              <input type="checkbox" checked={locs.includes(l)} onChange={() => setLocs((v) => toggle(v, l))} />
              <span>{l}</span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Experience</legend>
          {levels.map((l) => (
            <label key={l} className="jobs__check">
              <input type="checkbox" checked={lvls.includes(l)} onChange={() => setLvls((v) => toggle(v, l))} />
              <span>{l}</span>
            </label>
          ))}
        </fieldset>
        {filtered ? <button className="jobs__clear" onClick={clear}>Clear filters</button> : null}
      </aside>

      <ul className="jobs__list">
        {list.map((r) => (
          <li key={r.slug}>
            <button className={`job${sel === r.slug ? " is-on" : ""}`} onClick={() => pick(r.slug)} aria-haspopup="dialog">
              <span className="job__team">{domainName(r.domain)}</span>
              <b className="job__title">{r.title}</b>
              <span className="job__meta">{r.level} · {r.location.join(" / ")}</span>
              <span className="job__status is-open">Open</span>
            </button>
          </li>
        ))}
        {!list.length ? (
          <li className="jobs__empty">
            <p>No roles match those filters.</p>
            <button className="link-draw" onClick={clear}>Clear filters</button>
          </li>
        ) : null}
      </ul>

      <AnimatePresence>
        {role ? (
          <motion.div
            key={role.slug}
            className="jobs__detail"
            role="dialog"
            aria-modal="false"
            aria-labelledby="job-title"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="jd">
              <button className="jd__close" onClick={() => pick(null)} aria-label="Close role details">×</button>
              <p className="jd__team">{domainName(role.domain)}</p>
              <h3 id="job-title" className="jd__title">{role.title}</h3>
              <p className="jd__meta">{role.type} · {role.level} · {role.location.join(" / ")}</p>
              <p className="jd__summary">{role.summary}</p>
              <h4>What you&rsquo;ll do</h4>
              <ul>{role.you.map((x) => <li key={x}>{x}</li>)}</ul>
              <h4>What you&rsquo;ll bring</h4>
              <ul>{role.bring.map((x) => <li key={x}>{x}</li>)}</ul>
              {role.bonus?.length ? (
                <>
                  <h4>Good to have</h4>
                  <ul>{role.bonus.map((x) => <li key={x}>{x}</li>)}</ul>
                </>
              ) : null}
              <div className="jd__actions">
                <a className="btn btn--primary roll-host" href={talentPool(role)}>
                  <TextRoll>Apply for this role</TextRoll>
                </a>
                <button className="link-draw" onClick={() => pick(null)}>Back to all roles</button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

