/* Small illustrations for the four "How we work" cards on the home page.
   Decorative only; the motion lives in globals.css under "How we work". */

const Understand = () => (
  <svg viewBox="0 0 320 170" aria-hidden="true">
    {[78, 60, 42, 24].map((r, i) => (
      <circle key={r} className="art-ring" cx="160" cy="170" r={r * 1.6} style={{ "--i": i } as React.CSSProperties} />
    ))}
    {[
      [70, 52, "Goals"],
      [250, 44, "Users"],
      [272, 120, "Numbers"],
    ].map(([x, y, t]) => (
      <g key={t as string} className="art-chip">
        <rect x={(x as number) - 38} y={(y as number) - 13} width="76" height="26" rx="13" />
        <text x={x as number} y={(y as number) + 4.5} textAnchor="middle">{t}</text>
      </g>
    ))}
    <circle className="art-dot" cx="160" cy="132" r="7" />
  </svg>
);

const Design = () => (
  <svg viewBox="0 0 320 170" aria-hidden="true">
    <rect className="art-frame" x="60" y="22" width="200" height="132" rx="10" />
    <rect className="art-block art-block--hi" x="76" y="40" width="88" height="10" rx="5" />
    <rect className="art-block" x="76" y="58" width="168" height="38" rx="6" />
    <rect className="art-block" x="76" y="104" width="78" height="34" rx="6" />
    <rect className="art-block" x="166" y="104" width="78" height="34" rx="6" />
    <path className="art-cursor" d="M0 0l0 16 4.5-4.5 3.4 7.4 2.6-1.2-3.3-7.3 6.3 0z" />
  </svg>
);

const Build = () => (
  <svg viewBox="0 0 320 170" aria-hidden="true">
    <line className="art-axis" x1="34" y1="96" x2="286" y2="96" />
    {["Wk 1", "Wk 2", "Wk 3", "Wk 4"].map((t, i) => (
      <g key={t} className="art-demo" style={{ "--i": i } as React.CSSProperties}>
        <circle cx={58 + i * 68} cy="96" r="7" />
        <text x={58 + i * 68} y="128" textAnchor="middle">{t}</text>
        <rect x={34 + i * 68} y="46" width="48" height="24" rx="12" />
        <text className="art-demo__t" x={58 + i * 68} y="62" textAnchor="middle">Demo</text>
      </g>
    ))}
  </svg>
);

const Launch = () => (
  <svg viewBox="0 0 320 170" aria-hidden="true">
    {[40, 75, 110].map((y) => (
      <line key={y} className="art-grid" x1="30" y1={y} x2="290" y2={y} />
    ))}
    <path className="art-area" d="M30 140 C80 132 100 122 140 112 S210 70 240 60 S280 34 290 30 L290 150 L30 150Z" />
    <path className="art-line" pathLength="100" d="M30 140 C80 132 100 122 140 112 S210 70 240 60 S280 34 290 30" />
    <circle className="art-dot" cx="290" cy="30" r="6" />
  </svg>
);

export const stepArt = [Understand, Design, Build, Launch];
