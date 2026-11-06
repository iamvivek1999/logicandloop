import { useSyncExternalStore } from "react";

/**
 * True when the visitor asks for reduced motion. Unlike motion's
 * useReducedMotion, the server and the first client render both say false, so
 * hydration always matches; React then re-renders with the real value.
 */
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export default function useCalm() {
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}
