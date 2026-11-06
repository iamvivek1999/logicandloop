type P = { className?: string };

/**
 * The Logic & Loop mark: two Ls (Logic and Loop) meeting as one square loop with
 * two open corners. "reversed" is for dark backgrounds. Strokes thicken slightly
 * at small sizes so the gaps stay open (see the brand book).
 */
/** Brand mark geometry: two Ls with an infinity loop between them (viewBox 0 0 100 100). */
export const MARK = { l1: "M18 18V75H58", l2: "M82 82V25H42", loop: "M69 50C69 51.71 68.17 53.86 67.2 55.12C66.23 56.38 64.54 57.21 63.16 57.57C61.79 57.93 60.25 57.64 58.96 57.28C57.67 56.92 56.5 56.15 55.43 55.41C54.36 54.66 53.45 53.73 52.54 52.83C51.64 51.92 50.85 50.94 50 50C49.15 49.06 48.36 48.08 47.46 47.17C46.55 46.27 45.64 45.34 44.57 44.59C43.5 43.85 42.33 43.08 41.04 42.72C39.75 42.36 38.21 42.07 36.84 42.43C35.46 42.79 33.77 43.62 32.8 44.88C31.83 46.14 31 48.29 31 50C31 51.71 31.83 53.86 32.8 55.12C33.77 56.38 35.46 57.21 36.84 57.57C38.21 57.93 39.75 57.64 41.04 57.28C42.33 56.92 43.5 56.15 44.57 55.41C45.64 54.66 46.55 53.73 47.46 52.83C48.36 51.92 49.15 50.94 50 50C50.85 49.06 51.64 48.08 52.54 47.17C53.45 46.27 54.36 45.34 55.43 44.59C56.5 43.85 57.67 43.08 58.96 42.72C60.25 42.36 61.79 42.07 63.16 42.43C64.54 42.79 66.23 43.62 67.2 44.88C68.17 46.14 69 48.29 69 50Z" };

/**
 * The Logic & Loop mark. `bare` drops the loop for very small sizes (under
 * about 24px), where it would blur; everything else uses the full mark.
 */
export const Logo = ({ className, reversed = false, small = false, bare = false }: P & { reversed?: boolean; small?: boolean; bare?: boolean }) => {
  const first = reversed ? "#EEF0EB" : "#12363A";
  const w = small ? 15 : 14;
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d={MARK.l1} fill="none" stroke={first} strokeWidth={w} strokeLinejoin="round" />
      <path d={MARK.l2} fill="none" stroke="#F0AB16" strokeWidth={w} strokeLinejoin="round" />
      {!bare && <path d={MARK.loop} fill="none" stroke={first} strokeWidth={small ? 6 : 5.5} strokeLinejoin="round" />}
    </svg>
  );
};

export const Arrow = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const Search = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const Calendar = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const WhatsApp = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z"
    />
  </svg>
);
