"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Logo } from "@/components/Icons";
import { groups, servicesIn } from "@/lib/services";

/* Interactive pieces of the home page (app/page.tsx). Styles: "Home page blocks" in globals.css. */

const shift = {
  without: [
    "Enquiries wait overnight for a reply",
    "The same data typed into three tools",
    "Monday mornings lost to reports",
    "Five vendors, nobody owns the whole thing",
    "AI pilots that never reach a customer",
  ],
  with: [
    "Every enquiry answered within a minute",
    "Tools that update each other",
    "Reports that build themselves",
    "One senior team, from design to support",
    "Agents live, answering from approved information",
  ],
};

/** "Without / With Logic & Loop": one switch flips the whole diagram. */
export function Shift() {
  const [on, setOn] = useState(true);
  const side = on ? shift.with : shift.without;
  return (
    <div className={`shift${on ? " is-on" : ""}`}>
      <div className="shift__switch">
        <span aria-hidden="true">Without us</span>
        <button role="switch" aria-checked={on} aria-label="Show the business with Logic & Loop" onClick={() => setOn((v) => !v)}>
          <span />
        </button>
        <span aria-hidden="true">With Logic &amp; Loop</span>
      </div>
      <div className="shift__map">
        <ul className="shift__in">
          {["Web & mobile apps", "AI agents", "Automations"].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {/* Each wire is drawn twice: a faint base line, and a bright pulse that only runs "with" us. */}
        <svg className="shift__wires" viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true">
          {[
            ...[50, 120, 190].map((y) => `M70 ${y} C 180 ${y}, 190 120, 262 120`),
            ...[24, 72, 120, 168, 216].map((y) => `M338 120 C 400 120, 400 ${y}, 470 ${y}`),
          ].map((d, i) => (
            <g key={d} style={{ "--i": i } as React.CSSProperties}>
              <path className="shift__wire" d={d} />
              <path className="shift__wire shift__wire--flow" pathLength="100" d={d} />
            </g>
          ))}
        </svg>
        <div className="shift__core">
          <Logo />
        </div>
        <ul className="shift__out" aria-live="polite">
          {side.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Service groups as pill tabs, each opening its list of services. */
export function ServiceTabs() {
  const [on, setOn] = useState(groups[0].id);
  const id = useId();
  const g = groups.find((x) => x.id === on)!;
  return (
    <div className="tabs">
      <div className="tabs__bar" role="tablist" aria-label="Service groups">
        {groups.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`${id}-${x.id}`}
            aria-selected={x.id === on}
            aria-controls={`${id}-panel`}
            onClick={() => setOn(x.id)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${on}`} key={on}>
        <div className="tabs__lead">
          <h3>{g.blurb}</h3>
          <p>{servicesIn(g.id).length} services, each with a fixed scope and a fixed quote.</p>
        </div>
        <ul className="tabs__list">
          {servicesIn(g.id).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>
                <b>{s.name}</b>
                <span>{s.short}</span>
                <small>{s.timeline}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Rough "hours back" estimate. Deliberately shows hours, not money. */
export function HoursCalc() {
  const [people, setPeople] = useState(6);
  const [hours, setHours] = useState(10);
  const monthly = Math.round(people * hours * 4.33 * 0.5);
  const fte = monthly / 160;
  const row = (label: string, value: number, set: (n: number) => void, min: number, max: number, unit: string) => (
    <label className="calc__row">
      <span className="calc__label">
        {label}
        <b>
          {value}
          {unit}
        </b>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} style={{ "--p": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties} />
    </label>
  );
  return (
    <div className="calc">
      <div className="calc__inputs">
        <p className="calc__eyebrow">Your team, roughly</p>
        {row("People doing repetitive work", people, setPeople, 1, 50, "")}
        {row("Hours each spends on it per week", hours, setHours, 1, 35, " h")}
      </div>
      <div className="calc__out" aria-live="polite">
        <p className="calc__eyebrow">Hours you could get back</p>
        <p className="calc__big">{monthly.toLocaleString("en-IN")}</p>
        <p>hours a month, about {fte < 1 ? "part of one person's" : `${fte.toFixed(1)} people's`} working time.</p>
        <p className="calc__note">
          Illustrative only, assuming about half of that work can be automated. The real number comes out of a one-week mapping, and you get a fixed quote before anything is built.
        </p>
      </div>
    </div>
  );
}
