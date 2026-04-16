import { useEffect, useState } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import SidebarNav from '../components/dashboard/SidebarNav';
import StatCard from '../components/dashboard/StatCard';
import ProfileSummaryCard from '../components/dashboard/ProfileSummaryCard';
import LessonContentTypeCard from '../components/dashboard/LessonContentTypeCard';
import LessonProgressCard from '../components/dashboard/LessonProgressCard';
import RecommendedLessonCard from '../components/dashboard/RecommendedLessonCard';
import AchievementBadge from '../components/dashboard/AchievementBadge';
import UpcomingSessionCard from '../components/dashboard/UpcomingSessionCard';
import { SectionSkeleton, SectionMessage } from '../components/dashboard/SectionState';

function DashboardPage({ goToLanding, goToOnboarding }) {
  const [section, setSection] = useState('dashboard');
  const { data, isLoading, error } = useDashboardData();

  useEffect(() => {
    document.body.className = 'fd-body';
    return () => {
      document.body.className = '';
    };
  }, []);

  function getList(value) {
    return Array.isArray(value) ? value : [];
  }

  function handleLogout() {
    goToLanding();
  }

  const user = data?.user;
  const lessons = data?.lessons;
  const progress = data?.progress;
  const achievements = data?.achievements;
  const sessions = data?.sessions;
  const settings = data?.settings;

  const weeklyGoalPercent = user?.weeklyGoalPercent ?? 0;
  const levelProgressPercent = user?.levelProgressPercent ?? 0;

  function renderOverview() {
    const currentLessons = getList(lessons?.current);
    const contentTypes = getList(lessons?.contentTypes);
    const recommended = getList(lessons?.recommended);

    return (
      <div className="fd-pro-section-stack">
        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Continue Learning</h2>
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
            <SectionMessage message="No current lessons available." />
          )}
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Quick Learning Access</h2>
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
            <SectionMessage message="No content types configured yet." />
          )}
        </section>

        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Recommended Next</h2>
          </div>
          {isLoading ? (
            <SectionSkeleton className="fd-pro-recommend-grid" count={3} />
          ) : recommended.length ? (
            <div className="fd-pro-recommend-grid">
              {recommended.map((lesson) => (
                <RecommendedLessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <SectionMessage message="No recommendations yet." />
          )}
        </section>
      </div>
    );
  }

  function renderLessons() {
    const contentTypes = getList(lessons?.contentTypes);
    const currentLessons = getList(lessons?.current);

    return (
      <div className="fd-pro-section-stack">
        <section className="fd-pro-card">
          <div className="fd-pro-card-head">
            <h2>Lessons</h2>
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
      </div>
    );
  }

  function renderAchievements() {
    const skills = getList(progress?.skills);
    const earnedBadges = getList(achievements?.earnedBadges);
    const lockedBadges = getList(achievements?.lockedBadges);
    const recentCompletedTopics = getList(achievements?.recentCompletedTopics);
    const activitySummary = getList(progress?.activitySummary);

    return (
      <section className="fd-pro-card">
        <div className="fd-pro-card-head">
          <h2>Achievements & Progress</h2>
        </div>

        <div className="fd-pro-achv-overview-grid">
          <StatCard label="Current Level" value={user?.level ?? '-'} />
          <StatCard label="Total XP" value={user?.xp ?? 0} />
          <StatCard label="Lessons Completed" value={user?.completedLessons ?? 0} />
          <StatCard label="Quizzes Completed" value={user?.quizzesCompleted ?? 0} />
          <StatCard label="Current Streak" value={`${user?.streakDays ?? 0} days`} />
          <StatCard label="Weekly Goal" value={`${weeklyGoalPercent}%`} />
        </div>

        <div className="fd-pro-achv-visual-grid">
          <article className="fd-pro-achv-visual-card">
            <h3>Language Proficiency Progress</h3>
            <div className="fd-pro-achv-circle">
              <div className="fd-pro-achv-ring" style={{ '--progress': `${levelProgressPercent}%` }}></div>
              <div className="fd-pro-achv-circle-center">
                <strong>{levelProgressPercent}%</strong>
                <small>to next level</small>
              </div>
            </div>
            <p>{user?.xpToNextLevel ?? 0} XP needed to reach the next level.</p>
          </article>

          <article className="fd-pro-achv-visual-card">
            <h3>Skill Completion</h3>
            {isLoading ? (
              <SectionSkeleton className="fd-pro-achv-skill-list" count={5} />
            ) : skills.length ? (
              <div className="fd-pro-achv-skill-list">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="fd-pro-achv-skill-head">
                      <span>{skill.label}</span>
                      <strong>{skill.completionPercent}%</strong>
                    </div>
                    <div className="fd-pro-progress-bar">
                      <span style={{ width: `${skill.completionPercent}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SectionMessage message="No skill data available." />
            )}
          </article>
        </div>

        <div className="fd-pro-achv-board-grid">
          <article className="fd-pro-achv-board">
            <h3>Badges Earned</h3>
            {isLoading ? (
              <SectionSkeleton className="fd-pro-achv-board-list" count={4} />
            ) : earnedBadges.length ? (
              <ul>
                {earnedBadges.map((badge) => (
                  <AchievementBadge key={badge.id} badge={badge} />
                ))}
              </ul>
            ) : (
              <SectionMessage message="No earned badges yet." />
            )}
          </article>

          <article className="fd-pro-achv-board">
            <h3>Locked Achievements</h3>
            {isLoading ? (
              <SectionSkeleton className="fd-pro-achv-board-list" count={3} />
            ) : lockedBadges.length ? (
              <ul>
                {lockedBadges.map((badge) => (
                  <AchievementBadge key={badge.id} badge={badge} locked />
                ))}
              </ul>
            ) : (
              <SectionMessage message="No locked achievements configured." />
            )}
          </article>
        </div>

        <div className="fd-pro-achv-history-grid">
          <article className="fd-pro-achv-history-card">
            <h3>Learning History & Growth</h3>
            {isLoading ? (
              <SectionMessage message="Loading recent lesson history..." />
            ) : recentCompletedTopics.length ? (
              <>
                <ul>
                  {recentCompletedTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <div className="fd-pro-achv-activity">
                  {activitySummary.map((item) => (
                    <div key={item.id}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <SectionMessage message="No learning history yet." />
            )}
          </article>

          <article className="fd-pro-achv-history-card">
            <h3>Strengths & Focus Areas</h3>
            <p><strong>Strengths:</strong> {getList(achievements?.strengths).join(', ') || 'Not enough data yet.'}</p>
            <p><strong>Needs Practice:</strong> {getList(achievements?.needsPractice).join(', ') || 'Not enough data yet.'}</p>
          </article>
        </div>

        <div className="fd-pro-milestone">
          <h3>{progress?.milestone?.title ?? 'Next Milestone'}</h3>
          <p>{progress?.milestone?.description ?? 'Complete more activities to unlock your next milestone.'}</p>
        </div>
      </section>
    );
  }

  function renderSettings() {
    const languages = getList(settings?.preferenceOptions?.languages);
    const goals = getList(settings?.preferenceOptions?.goals);
    const targets = getList(settings?.preferenceOptions?.targets);

    return (
      <section className="fd-pro-card">
        <div className="fd-pro-card-head">
          <h2>Settings</h2>
        </div>
        <div className="fd-pro-settings-grid">
          <form className="fd-pro-settings-card" onSubmit={(event) => event.preventDefault()}>
            <h3>Account</h3>
            <label>
              Full Name
              <input type="text" defaultValue={user?.name ?? ''} />
            </label>
            <label>
              Email
              <input type="email" defaultValue={settings?.account?.email ?? ''} />
            </label>
            <button type="submit">Save account</button>
          </form>

          <form className="fd-pro-settings-card" onSubmit={(event) => event.preventDefault()}>
            <h3>Learning Preferences</h3>
            <label>
              Target Language
              <select defaultValue={user?.language ?? ''}>
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
            <label>
              Learning Goal
              <select defaultValue={user?.goal ?? ''}>
                {goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </label>
            <label>
              Daily Study Target
              <select defaultValue={targets[1] ?? ''}>
                {targets.map((target) => (
                  <option key={target}>{target}</option>
                ))}
              </select>
            </label>
            <button type="submit">Save preferences</button>
          </form>

          <form className="fd-pro-settings-card" onSubmit={(event) => event.preventDefault()}>
            <h3>Notifications</h3>
            <label className="fd-pro-toggle">
              <input type="checkbox" defaultChecked={Boolean(settings?.notifications?.dailyReminder)} />
              <span>Daily reminder</span>
            </label>
            <label className="fd-pro-toggle">
              <input type="checkbox" defaultChecked={Boolean(settings?.notifications?.weeklySummary)} />
              <span>Weekly progress summary</span>
            </label>
            <label className="fd-pro-toggle">
              <input type="checkbox" defaultChecked={Boolean(settings?.notifications?.productUpdates)} />
              <span>Product updates</span>
            </label>
            <button type="submit">Save alerts</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="fd-site fd-account-site">
      <section className="fd-pro-shell fd-anim fd-anim-1">
        <SidebarNav
          userName={user?.name ?? 'Learner'}
          section={section}
          setSection={setSection}
          onLogout={handleLogout}
        />

        <div className="fd-pro-main-area">
          <header className="fd-pro-topbar">
            <p>{section.charAt(0).toUpperCase() + section.slice(1)}</p>
            <label className="fd-pro-search">
              <span>⌕</span>
              <input type="text" placeholder="Search lessons, topics, or skills..." />
            </label>
            <div className="fd-pro-top-actions">
              <a href="/onboarding" onClick={(event) => { event.preventDefault(); goToOnboarding(); }}>Update goals</a>
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
                  <section className="fd-pro-hero">
                    <div>
                      <p>Welcome back</p>
                      <h1>{user?.name?.split(' ')[0] ?? 'Learner'}, your {user?.language ?? 'Language'} path is active.</h1>
                      <p className="fd-pro-hero-sub">Goal focus: {user?.goal ?? '-'} • Current level: {user?.level ?? '-'}</p>
                      <div className="fd-pro-hero-cta">
                        <button type="button">{lessons?.featuredPath?.resumeLabel ?? 'Continue learning'}</button>
                        <span>Current path: {lessons?.featuredPath?.title ?? 'No active path'}</span>
                      </div>
                    </div>
                    <div className="fd-pro-hero-stats">
                      <article>
                        <p>Learning streak</p>
                        <strong>{user?.streakDays ?? 0} days</strong>
                      </article>
                      <article>
                        <p>Weekly progress</p>
                        <strong>{weeklyGoalPercent}%</strong>
                      </article>
                      <article>
                        <p>Current level</p>
                        <strong>{user?.level ?? '-'}</strong>
                      </article>
                    </div>
                  </section>

                  {section === 'dashboard' && renderOverview()}
                  {section === 'lessons' && renderLessons()}
                  {section === 'achievements' && renderAchievements()}
                  {section === 'settings' && renderSettings()}
                </>
              )}
            </main>

            <aside className="fd-pro-utility">
              <ProfileSummaryCard user={user} />

              <article className="fd-pro-upcoming">
                <h3>Upcoming Sessions & Tasks</h3>
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

              <article className="fd-pro-recent">
                <h3>Recently Completed Topics</h3>
                {isLoading ? (
                  <SectionMessage message="Loading recent topics..." />
                ) : getList(achievements?.recentCompletedTopics).length ? (
                  <ul>
                    {getList(achievements?.recentCompletedTopics).map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                ) : (
                  <SectionMessage message="No completed topics yet." />
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
