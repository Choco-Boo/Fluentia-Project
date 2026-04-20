function AchievementCard({ achievement, isSelected = false, onSelect }) {
  const isCompleted = Boolean(achievement?.completed);
  const isLocked = !isCompleted;

  return (
    <button
      type="button"
      className={`fd-achievement-card ${isCompleted ? 'is-completed' : ''} ${isLocked ? 'is-locked' : ''} ${isSelected ? 'is-selected' : ''}`}
      aria-label={`${achievement?.title ?? 'Achievement'} ${isCompleted ? 'completed' : 'locked'}`}
      onClick={() => onSelect?.(achievement)}
    >
      <div className="fd-achievement-card-top">
        <span className="fd-achievement-icon" aria-hidden="true">
          {achievement?.icon ?? '🏅'}
        </span>
        <span className={`fd-achievement-state ${isCompleted ? 'is-completed' : 'is-locked'}`}>
          {isCompleted ? '✓ Completed' : 'Locked'}
        </span>
      </div>

      <h3>{achievement?.title ?? 'Untitled Achievement'}</h3>
      <p>{achievement?.description ?? 'Complete learning activities to unlock this achievement.'}</p>
    </button>
  );
}

export default AchievementCard;
