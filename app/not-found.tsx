import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap nf">
      <p className="kicker">Error 404</p>
      <h1 className="display" style={{ fontSize: "var(--step-4)" }}>This page isn't in the loop.</h1>
      <p className="lead">The link may be old or mistyped. Try the services list, or tell us what you were looking for.</p>
      <div className="hero__cta">
        <Link className="btn btn--primary" href="/services">Browse services</Link>
        <Link className="btn btn--outline" href="/">Go to the home page</Link>
      </div>
    </section>
  );
}
