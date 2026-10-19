/** Shimmer placeholders shown while a route's content streams in. */
export default function PageSkeleton({ variant = "detail" }: { variant?: "detail" | "grid" | "product" }) {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <header className="page-head">
        <div className="wrap">
          <span className="skeleton" style={{ width: 180, height: 14, marginBottom: 32 }} />
          <span className="skeleton" style={{ width: "min(720px, 90%)", height: "clamp(44px, 6vw, 80px)", marginBottom: 14 }} />
          <span className="skeleton" style={{ width: "min(460px, 70%)", height: "clamp(44px, 6vw, 80px)", marginBottom: 32 }} />
          <span className="skeleton" style={{ width: "min(560px, 95%)", height: 18, marginBottom: 10 }} />
          <span className="skeleton" style={{ width: "min(420px, 80%)", height: 18 }} />
        </div>
      </header>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          {variant === "grid" && (
            <div className="svc-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="svc-card" key={i}>
                  <span className="skeleton" style={{ width: 90, height: 12 }} />
                  <span className="skeleton" style={{ width: "70%", height: 26 }} />
                  <span className="skeleton" style={{ width: "95%", height: 14 }} />
                  <span className="skeleton" style={{ width: "60%", height: 14 }} />
                </div>
              ))}
            </div>
          )}
          {variant === "detail" && (
            <div className="detail">
              <div>
                <span className="skeleton" style={{ width: 200, height: 28, marginBottom: 24 }} />
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="skeleton" style={{ height: 22, marginBottom: 22, width: `${90 - i * 7}%` }} />
                ))}
              </div>
              <span className="skeleton" style={{ height: 360, borderRadius: 8 }} />
            </div>
          )}
          {variant === "product" && (
            <div className="features">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="feature" key={i}>
                  <span className="skeleton" style={{ width: "60%", height: 22, marginBottom: 12 }} />
                  <span className="skeleton" style={{ width: "95%", height: 14, marginBottom: 8 }} />
                  <span className="skeleton" style={{ width: "75%", height: 14 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
