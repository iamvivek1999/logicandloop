/**
 * Letters roll up and a second copy rolls in from below when the parent
 * `.roll-host` is hovered or focused. Adapted from Skiper UI's "Text roll
 * navigation" (skiper58, https://skiper-ui.com) — rebuilt in CSS so it runs
 * without client JavaScript and can be triggered by a parent link or button.
 *
 * Screen readers get the plain label; the split letters are hidden from them.
 */
const STAGGER = 0.022;

export default function TextRoll({ children, center = true }: { children: string; center?: boolean }) {
  const chars = children.split("");
  const mid = (chars.length - 1) / 2;
  const row = (copy: number) =>
    chars.map((c, i) => (
      <span
        key={`${copy}-${i}`}
        style={{ ["--d" as string]: `${(center ? Math.abs(i - mid) : i) * STAGGER}s` }}
      >
        {c === " " ? " " : c}
      </span>
    ));
  return (
    <span className="roll">
      <span className="sr-only">{children}</span>
      <span className="roll__a" aria-hidden="true">{row(0)}</span>
      <span className="roll__b" aria-hidden="true">{row(1)}</span>
    </span>
  );
}
