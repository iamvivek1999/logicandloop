"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Icons";
import { bookingHref, bookingReady } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/products/minute-one", label: "Minute One", match: "/products/minute-one" },
  { href: "/products/loop-os", label: "Loop OS", match: "/products/loop-os" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isCurrent = (href: string) =>
    href !== "/#process" && (path === href || (href === "/services" && path.startsWith("/services/")));

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link href="/" className="brand" aria-label="Logic & Loop, home">
          <Logo />
          Logic &amp; Loop
        </Link>
        <button
          className="nav__toggle"
          aria-expanded={open}
