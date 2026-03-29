import { useEffect } from 'react';

const lessonPlan = [
  {
    title: 'Week 1: Foundations',
    detail: 'Core sentence patterns + pronunciation drills',
    status: 'Completed'
  },
  {
    title: 'Week 2: Everyday Conversations',
    detail: 'Restaurant, travel, and social role-play sessions',
    status: 'In progress'
  },
  {
    title: 'Week 3: Workplace Communication',
    detail: 'Meetings, updates, and confident speaking prompts',
    status: 'Up next'
  }
];

function DashboardPage({ goToLanding, goToOnboarding }) {
  useEffect(() => {
    document.body.className = 'fd-body';

    return () => {
      document.body.className = '';
    };
  }, []);

  function handleNav(event, next) {
    event.preventDefault();
    next();
  }

  return (
    <div className="fd-site fd-account-site">
      <header className="fd-topbar fd-anim fd-anim-1">
        <div className="fd-logo">Fluentia</div>
        <nav className="fd-nav">
          <a href="#progress">Progress</a>
          <a href="#plan">Lesson Plan</a>
        </nav>
        <div className="fd-topbar-actions">
          <a href="/" className="fd-link" onClick={(event) => handleNav(event, goToLanding)}>Log out</a>
          <a className="fd-cta-small" href="/onboarding" onClick={(event) => handleNav(event, goToOnboarding)}>Update Goals</a>
        </div>
      </header>

      <section className="fd-account-hero fd-anim fd-anim-2">
        <div>
          <p className="fd-account-eyebrow">Welcome back, Alex</p>
          <h1>Your fluency path is on track.</h1>
          <p>
            You&apos;re 72% through your current module. Keep momentum with one focused lesson today.
          </p>
          <div className="fd-hero-actions">
            <button type="button" className="fd-btn-dark">Continue lesson</button>
            <button type="button" className="fd-btn-light">View full lesson plans</button>
          </div>
        </div>
        <div className="fd-account-progress" id="progress">
          <h3>Progress Snapshot</h3>
          <ul>
            <li><span>Current level</span><strong>English A2</strong></li>
            <li><span>Weekly streak</span><strong>11 days</strong></li>
            <li><span>Lessons completed</span><strong>42</strong></li>
            <li><span>Speaking confidence</span><strong>+14%</strong></li>
          </ul>
        </div>
      </section>

      <section className="fd-section" id="plan">
        <h2 className="fd-centered">Your Lesson Plan</h2>
        <div className="fd-account-plan-grid">
          {lessonPlan.map((item) => (
            <article key={item.title} className="fd-account-plan-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span>{item.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="fd-section">
        <h2 className="fd-centered">Recommended Next Steps</h2>
        <div className="fd-testimonial-grid">
          <article className="fd-quote">
            <h3>Speaking Drill</h3>
            <p>12-minute AI role-play on ordering food and asking follow-up questions.</p>
          </article>
          <article className="fd-quote">
            <h3>Vocabulary Sprint</h3>
            <p>Review 20 practical terms from your current lesson in one quick session.</p>
          </article>
          <article className="fd-quote">
            <h3>Weekly Checkpoint</h3>
            <p>Take your Friday checkpoint to unlock the next module automatically.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
