import { useEffect } from 'react';

function LoginPage({ goToSignup, goToDashboard }) {
  useEffect(() => {
    document.body.className = 'fauth-body';

    return () => {
      document.body.className = '';
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    goToDashboard();
  }

  function handleGoToSignup(event) {
    event.preventDefault();
    goToSignup();
  }

  return (
    <main className="fauth-page">
      <div className="fauth-sky fauth-sky-one" aria-hidden="true"></div>
      <div className="fauth-sky fauth-sky-two" aria-hidden="true"></div>
      <div className="fauth-cloud fauth-cloud-left" aria-hidden="true"></div>
      <div className="fauth-cloud fauth-cloud-right" aria-hidden="true"></div>
      <div className="fauth-arc fauth-arc-one" aria-hidden="true"></div>
      <div className="fauth-arc fauth-arc-two" aria-hidden="true"></div>

      <section className="fauth-card fauth-card-compact">
        <p className="fauth-card-brand">Fluentia</p>
        <h1>Welcome back</h1>
        <p className="fauth-subtitle">
          Log in to continue managing your docs, projects, and team conversations in one place.
        </p>

        <form className="fauth-form" onSubmit={handleSubmit}>
          <label className="fauth-input-row">
            <span className="fauth-input-icon" aria-hidden="true">✉</span>
            <input type="email" placeholder="Email address" required />
          </label>

          <label className="fauth-input-row">
            <span className="fauth-input-icon" aria-hidden="true">🔒</span>
            <input type="password" placeholder="Password" required />
            <span className="fauth-input-action" aria-hidden="true">◔</span>
          </label>

          <div className="fauth-form-options">
            <label className="fauth-checkbox-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="fauth-forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="fauth-submit-btn">Log In</button>
        </form>

        <div className="fauth-divider">
          <span>Or continue with</span>
        </div>

        <div className="fauth-social-row">
          <button
            type="button"
            className="fauth-social-btn fauth-social-btn-google"
            aria-label="Log in with Google"
            onClick={goToDashboard}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.9h5.42c-.24 1.25-.95 2.3-2.02 3l3.27 2.54c1.91-1.76 3.01-4.35 3.01-7.43 0-.69-.06-1.36-.18-2.01H12z"/>
              <path fill="#34A853" d="M12 22c2.7 0 4.96-.89 6.61-2.41l-3.27-2.54c-.91.61-2.08.97-3.34.97-2.57 0-4.76-1.73-5.54-4.06H3.08v2.62A9.99 9.99 0 0 0 12 22z"/>
              <path fill="#4A90E2" d="M6.46 13.96A6 6 0 0 1 6.15 12c0-.68.12-1.34.31-1.96V7.42H3.08A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.08 4.58l3.38-2.62z"/>
              <path fill="#FBBC05" d="M12 5.98c1.47 0 2.78.51 3.81 1.5l2.86-2.86C16.95 3 14.7 2 12 2A9.99 9.99 0 0 0 3.08 7.42l3.38 2.62c.78-2.33 2.97-4.06 5.54-4.06z"/>
            </svg>
          </button>
          <button
            type="button"
            className="fauth-social-btn fauth-social-btn-facebook"
            aria-label="Log in with Facebook"
            onClick={goToDashboard}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z"/>
            </svg>
          </button>
          <button
            type="button"
            className="fauth-social-btn fauth-social-btn-apple"
            aria-label="Log in with Apple"
            onClick={goToDashboard}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M17.57 12.62c-.03-2.32 1.9-3.43 1.99-3.49-1.08-1.58-2.76-1.8-3.36-1.82-1.42-.15-2.78.84-3.51.84-.74 0-1.86-.82-3.06-.79-1.57.02-3.03.91-3.84 2.33-1.64 2.84-.42 7.01 1.18 9.32.78 1.13 1.71 2.39 2.93 2.34 1.17-.05 1.62-.75 3.04-.75 1.43 0 1.83.75 3.06.73 1.27-.02 2.07-1.14 2.84-2.28.89-1.3 1.25-2.56 1.28-2.62-.03-.01-2.5-.96-2.55-3.81zm-2.3-5.96c.65-.79 1.09-1.88.97-2.98-.94.04-2.08.63-2.75 1.41-.6.7-1.13 1.81-.99 2.88 1.05.08 2.11-.54 2.77-1.31z"/>
            </svg>
          </button>
        </div>

        <p className="fauth-form-note">
          New here? <a href="/signup" onClick={handleGoToSignup}>Create an account</a>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
