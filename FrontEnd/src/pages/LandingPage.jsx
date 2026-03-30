import { useEffect } from 'react';

function LandingPage({ goToLogin, goToSignup, goToOnboarding }) {
  useEffect(() => {
    document.body.className = 'fd-body';

    return () => {
      document.body.className = '';
    };
  }, []);

  function handleAuth(event, next) {
    event.preventDefault();
    next();
  }

  return (
    <div className="fd-site">
      <header className="fd-topbar fd-anim fd-anim-1">
        <div className="fd-logo">Fluentia</div>
        <nav className="fd-nav">
          <a href="#why">Why Fluentia</a>
          <a href="#stories">Stories</a>
        </nav>
        <div className="fd-topbar-actions">
          <a href="/login" className="fd-link" onClick={(event) => handleAuth(event, goToLogin)}>Log in</a>
          <a className="fd-cta-small" href="/signup" onClick={(event) => handleAuth(event, goToSignup)}>Start Path</a>
        </div>
      </header>

      <section className="fd-hero">
        <div className="fd-hero-copy fd-anim fd-anim-2">
          <h1>
            <span className="fd-pill">Structured</span>
            <span>Language Learning</span>
            <span>For</span>
            <span className="fd-pill fd-pill-pink">Busy Adults.</span>
          </h1>
          <p>
            Learn English or Spanish through practical lesson paths, placement-based levels, and AI conversation
            practice that fits your schedule.
          </p>
          <div className="fd-hero-actions">
            <a className="fd-btn-dark" href="/onboarding" onClick={(event) => handleAuth(event, goToOnboarding)}>
              Build my plan
            </a>
            <span className="fd-scroll">Placement + onboarding in minutes</span>
          </div>
        </div>

        <div className="fd-hero-visual fd-anim fd-anim-3">
          <div className="fd-bubble fd-bubble-1">
            <span className="fd-avatar">AM</span>
            <small>English A2</small>
          </div>
          <div className="fd-bubble fd-bubble-2">
            <span className="fd-avatar">JP</span>
            <small>Spanish B1</small>
          </div>
          <div className="fd-bubble fd-bubble-3">
            <span className="fd-avatar">RS</span>
            <small>AI feedback ready</small>
          </div>
          <div className="fd-map"></div>
        </div>
      </section>

      <section className="fd-section" id="courses">
        <div className="fd-split">
          <div className="fd-gallery fd-anim fd-anim-1">
            <div className="fd-shot shot-1"></div>
            <div className="fd-shot shot-2"></div>
            <div className="fd-shot shot-3"></div>
          </div>
          <div className="fd-copy fd-anim fd-anim-2">
            <h2>Structured Lessons Built For Real Conversations</h2>
            <p>
              Each module follows a clear path: intro, concept, examples, recap, and interactive practice. No random
              lessons, no guesswork.
            </p>
            <a className="fd-btn-light" href="/signup" onClick={(event) => handleAuth(event, goToSignup)}>
              See your track
            </a>
          </div>
        </div>
      </section>

      <section className="fd-section" id="languages">
        <h2 className="fd-centered fd-anim fd-anim-1">Start With English and Spanish</h2>
        <div className="fd-language-grid">
          <article className="fd-lang-card fd-anim fd-anim-1"><span>🇺🇸</span><p>English</p></article>
          <article className="fd-lang-card fd-anim fd-anim-2"><span>🇪🇸</span><p>Spanish</p></article>
          <article className="fd-lang-card fd-anim fd-anim-3"><span>➕</span><p>More Coming</p></article>
        </div>
      </section>

      <section className="fd-section fd-why-section" id="why">
        <h2 className="fd-centered">Why Use Fluentia</h2>
        <div className="fd-why-grid">
          <article className="fd-why-card fd-anim fd-anim-1">
            <span className="fd-why-icon">01</span>
            <h3>Structured Paths</h3>
            <p>Every lesson follows a clear sequence so you always know what to study next.</p>
          </article>
          <article className="fd-why-card fd-anim fd-anim-2">
            <span className="fd-why-icon">02</span>
            <h3>Practical Conversation</h3>
            <p>Train for real scenarios like travel, work, and meetings instead of memorizing random words.</p>
          </article>
          <article className="fd-why-card fd-anim fd-anim-3">
            <span className="fd-why-icon">03</span>
            <h3>Personalized Progress</h3>
            <p>Placement-based levels and skill tracking keep your learning focused and measurable.</p>
          </article>
        </div>
      </section>

      <section className="fd-section" id="stories">
        <h2 className="fd-centered">Loved by Learners, Backed by Educators</h2>
        <div className="fd-testimonial-grid">
          <article className="fd-quote fd-anim fd-anim-1">
            <h3>Maya R.</h3>
            <p>&quot;I went from freezing in meetings to presenting in Spanish after 10 weeks on Fluentia.&quot;</p>
          </article>
          <article className="fd-quote fd-anim fd-anim-2">
            <h3>Noah T.</h3>
            <p>&quot;The AI speaking drills feel like real conversations, not textbook exercises.&quot;</p>
          </article>
          <article className="fd-quote fd-anim fd-anim-3">
            <h3>Priya K.</h3>
            <p>&quot;My students finally practice speaking at home because the lessons feel fun and clear.&quot;</p>
          </article>
        </div>
      </section>

      <section className="fd-newsletter">
        <h2>Subscribe To Fluentia Insights</h2>
        <p>Get language tips, conversation prompts, and learning science every week.</p>
        <form className="fd-newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="fd-footer">
        <div>
          <strong>Fluentia</strong>
          <p>AI-powered language learning for real conversations.</p>
        </div>
        <div className="fd-footer-links">
          <a href="#">About</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
