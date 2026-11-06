"use client";

import { useId, useState } from "react";

/**
 * Questions that open smoothly to their answers, with a marigold rule marking
 * the open one. Adapted from Vengeance UI's FAQ Accordion (MIT,
 * https://github.com/Ashutoshx7/VengeanceUI): the height animates with a
 * 0fr → 1fr grid row, so it needs no measuring and no animation library.
 */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="qa">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className={on ? "is-open" : undefined}>
            <h3>
              <button
                id={`${id}-q${i}`}
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
              >
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="qa__a" id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`}>
              <div><p>{f.a}</p></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
