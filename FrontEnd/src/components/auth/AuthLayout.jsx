function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  sideTitle,
  sideText,
  sidePoints
}) {
  return (
    <main className="auth-shell">
      <section className="auth-card-wrap">
        <div className="auth-panel auth-panel-form">
          <div className="auth-header">
            <span className="auth-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
          {footer ? <div className="auth-footer">{footer}</div> : null}
        </div>

        <aside className="auth-panel auth-panel-side" aria-hidden="true">
          <div className="brand-chip">Fluentia</div>
          <h2>{sideTitle}</h2>
          <p>{sideText}</p>
          <ul>
            {sidePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}

export default AuthLayout;
