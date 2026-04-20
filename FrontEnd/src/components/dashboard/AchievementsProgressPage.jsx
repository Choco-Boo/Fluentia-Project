import { useMemo, useState } from 'react';
import AchievementCard from './AchievementCard';

const mockAchievements = [
  { id: 'a1', icon: '📘', title: 'First Lesson', description: 'Complete your first lesson.', completed: true, nextStep: 'Done. Keep your streak going tomorrow.' },
  { id: 'a2', icon: '🔥', title: '7-Day Streak', description: 'Practice for 7 days in a row.', completed: true, nextStep: 'Done. Push for 14 days to unlock the next streak badge.' },
  { id: 'a3', icon: '🧠', title: 'Vocab Master', description: 'Learn 200 vocabulary words.', completed: true, nextStep: 'Done. Next milestone: 300 words learned.' },
  { id: 'a4', icon: '🗣️', title: 'Speak Up', description: 'Finish 10 speaking exercises.', completed: false, nextStep: 'Complete 2 more speaking exercises.' },
  { id: 'a5', icon: '⚡', title: 'Speed Run', description: 'Complete a quiz in under 3 minutes.', completed: false, nextStep: 'Attempt today’s quiz and keep the timer under 3:00.' },
  { id: 'a6', icon: '🏆', title: 'Top Score', description: 'Score 95% or higher on any quiz.', completed: true, nextStep: 'Done. Aim for a second 95%+ score this week.' },
  { id: 'a7', icon: '📅', title: 'Consistent', description: 'Hit your weekly goal for 4 weeks.', completed: false, nextStep: 'Complete this week’s goal to move to 2/4 weeks.' },
  { id: 'a8', icon: '💬', title: 'Conversationalist', description: 'Finish 5 conversation scenarios.', completed: false, nextStep: 'Finish 1 more AI conversation scenario.' },
  { id: 'a9', icon: '🎓', title: 'Graduate', description: 'Complete your active learning path.', completed: false, nextStep: 'Complete 4 lessons in your current path.' },
  { id: 'a10', icon: '🧭', title: 'Scenario Pro', description: 'Pass all role-play scenarios in one topic.', completed: false, nextStep: 'Pass 2 remaining role-play scenarios in Travel.' },
  { id: 'a11', icon: '🛡️', title: 'No Weak Spots', description: 'Reach 80%+ in every core skill.', completed: false, nextStep: 'Raise Speaking from 62% to 80%.' },
  { id: 'a12', icon: '✅', title: 'Perfect Week', description: 'Complete every planned session this week.', completed: false, nextStep: 'Complete your Friday and Sunday sessions.' },
];

function AchievementsProgressPage({ user, lessons }) {
  const [filter, setFilter] = useState('all');
  const [selectedAchievementId, setSelectedAchievementId] = useState(mockAchievements[0].id);
  const moduleTitle = lessons?.activeModule?.title ?? lessons?.featuredPath?.title ?? 'Current learning module';
  const totalModuleLessons = Number(lessons?.activeModule?.totalLessons ?? 12);
  const completedModuleLessons = Number(lessons?.activeModule?.completedLessons ?? 0);
  const lessonsLeft = Math.max(totalModuleLessons - completedModuleLessons, 0);
  const moduleProgressPercent = totalModuleLessons > 0
    ? Math.min(Math.round((completedModuleLessons / totalModuleLessons) * 100), 100)
    : 0;
  const levelProgressPercent = Math.max(Number(user?.levelProgressPercent ?? 0), 0);
  const xpToNextLevel = Math.max(Number(user?.xpToNextLevel ?? 0), 0);
  const weeklyCompletedLessons = Math.min(Number(user?.completedLessons ?? 0), totalModuleLessons);
  const weeklyTargetLessons = Math.max(totalModuleLessons, 1);
  const weeklyActivity = [42, 58, 64, 38, 72, 55, 49];
  const filteredAchievements = useMemo(() => {
    if (filter === 'completed') {
      return mockAchievements.filter((item) => item.completed);
    }
    if (filter === 'locked') {
      return mockAchievements.filter((item) => !item.completed);
    }
    return mockAchievements;
  }, [filter]);
  const selectedAchievement = mockAchievements.find((item) => item.id === selectedAchievementId) ?? mockAchievements[0];

  return (
    <section className="fd-pro-card fd-achievements-page">
      <div className="fd-pro-card-head fd-achievements-head">
        <h2>Achievements</h2>
      </div>

      <section className="fd-achievements-overview">
        <div className="fd-achievements-overview-chips">
          <span className="chip level">{user?.level ?? 'B1'}</span>
          <span className="chip xp">XP: {user?.xp ?? 0}</span>
          <span className="chip streak">🔥 {user?.streakDays ?? 0} days</span>
        </div>
        <h3>Overview</h3>
        <p>Stats for your current learning week</p>

        <div className="fd-achievements-week-strip">
          {weeklyActivity.map((height, index) => (
            <div key={`day-${index}`} className="fd-achievements-day-col">
              <span style={{ height: `${height}%` }}></span>
              <small>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</small>
            </div>
          ))}
        </div>

        <div className="fd-achievements-overview-cards">
          <article>
            <strong>{weeklyCompletedLessons}/{weeklyTargetLessons}</strong>
            <p>Lessons completed</p>
          </article>
          <article>
            <strong>{user?.xp ?? 0}</strong>
            <p>Total XP</p>
          </article>
          <article>
            <strong>{user?.streakDays ?? 0} 🔥</strong>
            <p>Day streak</p>
          </article>
        </div>
      </section>

      <div className="fd-achievements-progress-grid">
        <article className="fd-achievements-progress-card">
          <p className="fd-achievements-progress-label">Current module progress</p>
          <h3>{lessonsLeft} lessons left</h3>
          <p>{moduleTitle}</p>
          <div className="fd-achievements-progress-bar">
            <span style={{ width: `${moduleProgressPercent}%` }}></span>
          </div>
          <small>{completedModuleLessons}/{totalModuleLessons} lessons completed</small>
        </article>

        <article className="fd-achievements-progress-card">
          <p className="fd-achievements-progress-label">Level progress</p>
          <h3>{xpToNextLevel} points to next level</h3>
          <p>Current level: {user?.level ?? '-'}</p>
          <div className="fd-achievements-progress-bar">
            <span style={{ width: `${levelProgressPercent}%` }}></span>
          </div>
          <small>{levelProgressPercent}% complete</small>
        </article>
      </div>

      <div className="fd-pro-card-head fd-achievements-list-head">
        <h3>Achievements list</h3>
        <div className="fd-achievements-filters">
          {[
            { id: 'all', label: 'All' },
            { id: 'completed', label: 'Completed' },
            { id: 'locked', label: 'Locked' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? 'active' : ''}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fd-achievements-grid">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isSelected={selectedAchievementId === achievement.id}
            onSelect={(item) => setSelectedAchievementId(item.id)}
          />
        ))}
      </div>

      <article className="fd-achievements-detail">
        <p className="label">Selected achievement</p>
        <h4>{selectedAchievement.title}</h4>
        <p>{selectedAchievement.nextStep}</p>
      </article>
    </section>
  );
}

export default AchievementsProgressPage;
