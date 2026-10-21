"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics]");
      if (!element?.dataset.analytics) return;
      trackEvent(element.dataset.analytics, element.dataset.analyticsTopic ? { topic: element.dataset.analyticsTopic } : {});
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
