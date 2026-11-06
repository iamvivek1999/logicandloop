import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./lab.css";

/**
 * DEVELOPMENT ONLY. Zendesk-inspired versions to compare with the live pages
 * at localhost:3000/lab. Never built for production (404), never indexed, and
 * left out of the sitemap. Delete app/lab and components/lab once decided.
 */
export const metadata: Metadata = {
  title: "Design lab",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return <div className="lab">{children}</div>;
}
