import { useEffect, useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import SidebarNav from '../components/dashboard/SidebarNav';
import ProfileSummaryCard from '../components/dashboard/ProfileSummaryCard';
import LessonContentTypeCard from '../components/dashboard/LessonContentTypeCard';
import AchievementsProgressPage from '../components/dashboard/AchievementsProgressPage';
import UpcomingSessionCard from '../components/dashboard/UpcomingSessionCard';
import { SectionSkeleton, SectionMessage } from '../components/dashboard/SectionState';
import AIConversationsPage from './AIConversationsPage';
import SettingsWorkspace from '../components/dashboard/SettingsWorkspace';

const LEARNING_MODULE_BASE_URL = 'http://127.0.0.1:5501/index.html';

function DashboardPage({ goToLanding, goToOnboarding, initialSection = 'dashboard', onSectionChange }) {
  const [section, setSection] = useState(initialSection);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [learningQuery, setLearningQuery] = useState('');
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

  function matchesLearningQuery(text) {
    if (!learningQuery.trim()) return true;
    return String(text ?? '').toLowerCase().includes(learningQuery.trim().toLowerCase());
  }

  function getModuleKey(courseModule) {
    if (courseModule?.moduleKey) return courseModule.moduleKey;

    return String(courseModule?.title ?? '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function handleOpenCourseModule(courseModule) {
    const moduleKey = getModuleKey(courseModule);
    const targetUrl = `${LEARNING_MODULE_BASE_URL}?module=${encodeURIComponent(moduleKey)}`;
    window.location.href = targetUrl;
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
    const contentTypes = getList(lessons?.contentTypes).filter((item) =>
      matchesLearningQuery(`${item?.title ?? ''} ${item?.detail ?? ''}`)
    );

    function handleLearningModeOpen(modeId) {
      if (modeId === 'practice') {
        handleSectionChange('practice');
        return;
      }

      if (modeId === 'courses') {
        handleSectionChange('courses');
      }
    }

    return (
      <div className="fd-lessons-page">
        <section className="fd-lessons-hero">
          <div>
            <h2>Lessons</h2>
          </div>
          <div className="fd-lessons-hero-stats">
            <article>
              <small>Learning modes</small>
              <strong>2</strong>
            </article>
            <article>
              <small>Path flow</small>
              <strong>Lessons → Mode</strong>
            </article>
          </div>
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Learning Modes</h2>
          </div>
          {isLoading ? (
            <SectionSkeleton className="fd-pro-type-grid" count={2} />
          ) : contentTypes.length ? (
            <div className="fd-pro-type-grid">
              {contentTypes.map((item) => (
                <LessonContentTypeCard key={item.id} item={item} onAction={() => handleLearningModeOpen(item.id)} />
              ))}
            </div>
          ) : (
            <SectionMessage message="No lesson content available." />
          )}
        </section>
      </div>
    );
  }

  function renderPractice() {
    const practiceTracks = getList(lessons?.practiceTracks).filter((track) =>
      matchesLearningQuery(`${track?.title ?? ''} ${track?.detail ?? ''}`)
    );

    return (
      <div className="fd-lessons-page fd-learning-subpage">
        <section className="fd-lessons-hero">
          <div>
            <h2>Practice</h2>
            <p>Choose a skill and jump into targeted practice for vocabulary, speaking, and reading.</p>
          </div>
          <button type="button" className="fd-learning-back-btn" onClick={() => handleSectionChange('lessons')}>
            Back to Learning Modes
          </button>
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Practice Areas</h2>
          </div>
          {practiceTracks.length ? (
            <div className="fd-pro-current-grid">
              {practiceTracks.map((track) => (
                <article key={track.id} className="fd-pro-current-card">
                  {track?.image ? (
                    <div className="fd-pro-card-image-wrap">
                      <img src={track.image} alt={track?.title ?? 'Practice area'} className="fd-pro-card-image" />
                    </div>
                  ) : null}
                  <h3>{track.title}</h3>
                  <p>{track.detail}</p>
                  <button type="button">{track.cta ?? 'Start'}</button>
                </article>
              ))}
            </div>
          ) : (
            <SectionMessage message="No practice areas available." />
          )}
        </section>
      </div>
    );
  }

  function renderCourses() {
    const courseModules = getList(lessons?.courseModules).filter((module) =>
      matchesLearningQuery(`${module?.title ?? ''}`)
    );

    return (
      <div className="fd-lessons-page fd-learning-subpage">
        <section className="fd-lessons-hero">
          <div>
            <h2>Courses</h2>
            <p>Browse your modules and continue each lecture path.</p>
          </div>
          <button type="button" className="fd-learning-back-btn" onClick={() => handleSectionChange('lessons')}>
            Back to Learning Modes
          </button>
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Course Modules</h2>
          </div>
          {courseModules.length ? (
            <div className="fd-pro-current-grid">
              {courseModules.map((module) => (
                <article key={module.id} className="fd-pro-current-card">
                  {module?.image ? (
                    <div className="fd-pro-card-image-wrap">
                      <img src={module.image} alt={module?.title ?? 'Course module'} className="fd-pro-card-image" />
                    </div>
                  ) : null}
                  <h3>{module.title}</h3>
                  <p>{module.lectures ?? 6} lectures</p>
                  <div className="fd-pro-progress-row">
                    <div className="fd-pro-progress-bar">
                      <span style={{ width: `${module?.progressPercent ?? 0}%` }}></span>
                    </div>
                    <small>{module?.progressPercent ?? 0}%</small>
                  </div>
                  <button type="button" onClick={() => handleOpenCourseModule(module)}>
                    Open Module
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <SectionMessage message="No course modules available." />
          )}
        </section>
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
    practice: 'Practice',
    courses: 'Courses',
    achievements: 'Achievements',
    'ai-conversations': 'AI Conversations',
    settings: 'Settings'
  }[section] ?? 'Dashboard';

  const isLearningSection = section === 'lessons' || section === 'practice' || section === 'courses';
  const sidebarSection = section === 'practice' || section === 'courses' ? 'lessons' : section;

  return (
    <div className="fd-site fd-account-site">
      <section className="fd-pro-shell fd-anim fd-anim-1">
        <SidebarNav
          userName={user?.name ?? 'Learner'}
          section={sidebarSection}
          setSection={handleSectionChange}
          onLogout={handleLogout}
        />

        <div className="fd-pro-main-area">
          <header className="fd-pro-topbar">
            <p>{sectionLabel}</p>
            <label className="fd-pro-search">
              <span>⌕</span>
              <input
                type="text"
                value={learningQuery}
                onChange={(event) => setLearningQuery(event.target.value)}
                placeholder={
                  isLearningSection
                    ? 'Search learning modes, practice tracks, or modules...'
                    : 'Search is active in Lessons, Practice, and Courses...'
                }
              />
            </label>
            <div className="fd-pro-top-actions">
              <a href="/onboarding" onClick={(event) => { event.preventDefault(); goToOnboarding(); }}>Update goals</a>
              <button type="button" onClick={() => setIsDarkMode((value) => !value)}>
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </button>
              {isLearningSection && learningQuery.trim() ? (
                <button type="button" onClick={() => setLearningQuery('')}>Clear search</button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSectionChange(
                    section === 'lessons'
                      ? 'practice'
                      : section === 'practice'
                        ? 'courses'
                        : 'lessons'
                  )}
                >
                  {section === 'lessons' ? 'Open Practice' : section === 'practice' ? 'Open Courses' : 'Back to Lessons'}
                </button>
              )}
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
                  {section === 'practice' && renderPractice()}
                  {section === 'courses' && renderCourses()}
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
