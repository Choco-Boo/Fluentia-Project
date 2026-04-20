import { useEffect, useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import SidebarNav from '../components/dashboard/SidebarNav';
import ProfileSummaryCard from '../components/dashboard/ProfileSummaryCard';
import LessonContentTypeCard from '../components/dashboard/LessonContentTypeCard';
import LessonProgressCard from '../components/dashboard/LessonProgressCard';
import AchievementsProgressPage from '../components/dashboard/AchievementsProgressPage';
import UpcomingSessionCard from '../components/dashboard/UpcomingSessionCard';
import { SectionSkeleton, SectionMessage } from '../components/dashboard/SectionState';
import AIConversationsPage from './AIConversationsPage';
import SettingsWorkspace from '../components/dashboard/SettingsWorkspace';

function DashboardPage({ goToLanding, goToOnboarding, initialSection = 'dashboard', onSectionChange }) {
  const [section, setSection] = useState(initialSection);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLessonProgress, setActiveLessonProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const { data, isLoading, error } = useDashboardData();

  useEffect(() => {
    document.body.className = isDarkMode ? 'fd-body fd-dark' : 'fd-body';
    return () => {
      document.body.className = '';
    };
  }, [isDarkMode]);

  function getList(value) {
    return Array.isArray(value) ? value : [];
  }

  function handleLogout() {
    goToLanding();
  }

  function handleSectionChange(nextSection) {
    setSection(nextSection);
    if (onSectionChange) {
      onSectionChange(nextSection);
    }
  }

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const user = data?.user;
  const lessons = data?.lessons;
  const achievements = data?.achievements;
  const sessions = data?.sessions;
  const settings = data?.settings;

  useEffect(() => {
    const currentLessons = getList(lessons?.current);
    const firstLesson = currentLessons[0];
    const firstLessonProgress = Number(firstLesson?.progressPercent ?? 0);
    const firstLessonStep = Math.max(Math.round(firstLessonProgress / 10), 0);
    setActiveLessonProgress(firstLessonProgress);
    setRecentActivity([
      { id: 'a1', label: `Completed ${currentLessons[1]?.title ?? 'Lesson'}`, xp: '+100 XP', type: 'positive' },
      { id: 'a2', label: `Practice: ${currentLessons[2]?.title ?? 'Exercise'} (${Math.min(firstLessonStep + 2, 10)}/10)`, xp: '+40 XP', type: 'neutral' },
      { id: 'a3', label: 'AI Conversation - 5 min session', xp: '+20 XP', type: 'secondary' }
    ]);
  }, [lessons]);

  function renderOverview() {
    const currentLessons = getList(lessons?.current);
    const firstLesson = currentLessons[0];
    const firstLessonProgress = activeLessonProgress ?? Number(firstLesson?.progressPercent ?? 0);
    const firstLessonStep = Math.max(Math.round(firstLessonProgress / 10), 0);
    const levelLabel = user?.level ?? 'B1';
    const xpToNextLevel = Number(user?.xpToNextLevel ?? 0);
    const xpToNextLesson = Math.max(40 - Math.round(firstLessonProgress / 2), 0);
    const weakSpots = getList(achievements?.needsPractice);
    const shortcutTargets = {
      Lessons: 'lessons',
      'Your Topics': 'achievements',
      Vocabulary: 'ai-conversations'
    };

    function handleContinueLesson() {
      const next = Math.min(firstLessonProgress + 10, 100);
      setActiveLessonProgress(next);
      setRecentActivity((current) => ([
        {
          id: `new-${Date.now()}`,
          label: `Continued ${firstLesson?.title ?? 'current lesson'} (${Math.max(Math.round(next / 10), 1)}/10)`,
          xp: '+20 XP',
          type: 'secondary'
        },
        ...current
      ]).slice(0, 5));
    }

    return (
      <div className="fd-dash-overview">
        <section className="fd-dash-welcome-card">
          <div className="fd-dash-chip-row">
            <span className="fd-dash-chip level">{levelLabel}</span>
            <span className="fd-dash-chip xp">XP: {user?.xp ?? 0}</span>
            <span className="fd-dash-chip streak">🔥 {user?.streakDays ?? 0} days</span>
          </div>
          <h2>Welcome back, {user?.name?.split(' ')[0] ?? 'Learner'}!</h2>
          <p>Keep your {user?.language ?? 'language'} path active with focused daily practice.</p>

          <div className="fd-dash-top-grid">
            <article className="fd-dash-metric-card">
              <small>XP to next language level</small>
              <strong>{xpToNextLevel} XP</strong>
            </article>
            <article className="fd-dash-metric-card accent">
              <small>XP to next lesson</small>
              <strong>{xpToNextLesson} XP</strong>
            </article>
          </div>

          <article className="fd-dash-continue-card">
            <p>Start where you last left off</p>
            {firstLesson?.image ? (
              <div className="fd-dash-lesson-image-wrap">
                <img src={firstLesson.image} alt={firstLesson?.title ?? 'Current lesson'} className="fd-dash-lesson-image" />
              </div>
            ) : null}
            <h3>{firstLesson?.title ?? 'No active lesson yet'}</h3>
            <div className="fd-dash-progress-row">
              <div className="fd-pro-progress-bar">
                <span style={{ width: `${firstLessonProgress}%` }}></span>
              </div>
              <small>{firstLessonStep}/10</small>
            </div>
            <button type="button" onClick={handleContinueLesson}>
              {lessons?.featuredPath?.resumeLabel ?? 'Continue lesson'}
            </button>
          </article>

          <div className="fd-dash-shortcuts">
            {['Lessons', 'Your Topics', 'Vocabulary'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSectionChange(shortcutTargets[item] ?? 'dashboard')}
              >
                {item}
              </button>
            ))}
          </div>

          <article className="fd-dash-weak-spots">
            <h4>Weak spots</h4>
            <p>{weakSpots.join(', ') || 'No weak spots detected yet.'}</p>
          </article>

          <article className="fd-dash-recent">
            <h4>Recent activity</h4>
            <ul>
              {recentActivity.map((item) => (
                <li key={item.id}>
                  <span>{item.label}</span>
                  <strong className={item.type}>{item.xp}</strong>
                </li>
              ))}
            </ul>
          </article>
        </section>

      </div>
    );
  }

  function renderLessons() {
    const contentTypes = getList(lessons?.contentTypes);
    const currentLessons = getList(lessons?.current);
    const recommended = getList(lessons?.recommended);
    const totalInProgress = currentLessons.length;
    const avgProgress = totalInProgress
      ? Math.round(currentLessons.reduce((sum, lesson) => sum + Number(lesson?.progressPercent ?? 0), 0) / totalInProgress)
      : 0;

    return (
      <div className="fd-lessons-page">
        <section className="fd-lessons-hero">
          <div>
            <h2>Lessons</h2>
            <p>Pick a learning mode, continue active lessons, and keep momentum across your module.</p>
          </div>
          <div className="fd-lessons-hero-stats">
            <article>
              <small>In progress</small>
              <strong>{totalInProgress}</strong>
            </article>
            <article>
              <small>Average completion</small>
              <strong>{avgProgress}%</strong>
            </article>
          </div>
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Learning Modes</h2>
          </div>
          {isLoading ? (
            <SectionSkeleton className="fd-pro-type-grid" count={4} />
          ) : contentTypes.length ? (
            <div className="fd-pro-type-grid">
              {contentTypes.map((item) => (
                <LessonContentTypeCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <SectionMessage message="No lesson content available." />
          )}
        </section>

        <div className="fd-lessons-lower-grid">
          <section className="fd-pro-card">
            <div className="fd-pro-card-head">
              <h2>Current Lessons</h2>
            </div>
            {isLoading ? (
              <SectionSkeleton className="fd-pro-current-grid" count={3} />
            ) : currentLessons.length ? (
              <div className="fd-pro-current-grid">
                {currentLessons.map((lesson) => (
                  <LessonProgressCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            ) : (
              <SectionMessage message="No lessons in progress." />
            )}
          </section>

          <section className="fd-pro-card">
            <div className="fd-pro-card-head">
              <h2>Recommended Next</h2>
            </div>
            {isLoading ? (
              <SectionSkeleton className="fd-pro-recommend-grid" count={3} />
            ) : recommended.length ? (
              <div className="fd-pro-recommend-grid fd-lessons-recommend-list">
                {recommended.map((lesson) => (
                  <article key={lesson.id} className="fd-lessons-recommend-item">
                    {lesson?.image ? (
                      <div className="fd-lessons-recommend-image-wrap">
                        <img src={lesson.image} alt={lesson?.title ?? 'Recommended lesson'} className="fd-lessons-recommend-image" />
                      </div>
                    ) : null}
                    <h3>{lesson.title}</h3>
                    <p>{lesson.detail}</p>
                    <button type="button">Start</button>
                  </article>
                ))}
              </div>
            ) : (
              <SectionMessage message="No recommendations available." />
            )}
          </section>
        </div>
      </div>
    );
  }

  function renderAchievements() {
    return <AchievementsProgressPage user={user} lessons={lessons} />;
  }

  function renderAIConversations() {
    return <AIConversationsPage />;
  }

  function renderSettings() {
    const languages = getList(settings?.preferenceOptions?.languages);
    const goals = getList(settings?.preferenceOptions?.goals);

    return <SettingsWorkspace user={user} settings={settings} languages={languages} goals={goals} />;
  }

  const sectionLabel = {
    dashboard: 'Dashboard',
    lessons: 'Lessons',
    achievements: 'Achievements',
    'ai-conversations': 'AI Conversations',
    settings: 'Settings'
  }[section] ?? 'Dashboard';

  return (
    <div className="fd-site fd-account-site">
      <section className="fd-pro-shell fd-anim fd-anim-1">
        <SidebarNav
          userName={user?.name ?? 'Learner'}
          section={section}
          setSection={handleSectionChange}
          onLogout={handleLogout}
        />

        <div className="fd-pro-main-area">
          <header className="fd-pro-topbar">
            <p>{sectionLabel}</p>
            <label className="fd-pro-search">
              <span>⌕</span>
              <input type="text" placeholder="Search lessons, topics, or skills..." />
            </label>
            <div className="fd-pro-top-actions">
              <a href="/onboarding" onClick={(event) => { event.preventDefault(); goToOnboarding(); }}>Update goals</a>
              <button type="button" onClick={() => setIsDarkMode((value) => !value)}>
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button type="button">Notifications</button>
            </div>
          </header>

          <div className="fd-pro-content-layout">
            <main className="fd-pro-main">
              {error ? (
                <section className="fd-pro-card">
                  <SectionMessage message={error} />
                </section>
              ) : (
                <>
                  {section === 'dashboard' && renderOverview()}
                  {section === 'lessons' && renderLessons()}
                  {section === 'achievements' && renderAchievements()}
                  {section === 'ai-conversations' && renderAIConversations()}
                  {section === 'settings' && renderSettings()}
                </>
              )}
            </main>

            <aside className="fd-pro-utility">
              <ProfileSummaryCard user={user} />

              <article className="fd-pro-upcoming">
                <h3>Upcoming Lessons</h3>
                {isLoading ? (
                  <SectionSkeleton className="fd-pro-upcoming-list" count={3} />
                ) : getList(sessions?.upcoming).length ? (
                  <div className="fd-pro-upcoming-list">
                    {getList(sessions?.upcoming).map((session) => (
                      <UpcomingSessionCard key={session.id} session={session} />
                    ))}
                  </div>
                ) : (
                  <SectionMessage message="No upcoming sessions." />
                )}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
