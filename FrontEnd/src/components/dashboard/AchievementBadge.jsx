function AchievementBadge({ badge, locked = false }) {
  return (
    <li className={locked ? 'locked' : ''}>
      <span>{badge?.category ?? 'Achievement'}</span>
      <p>{badge?.name ?? 'Unnamed badge'}</p>
      {locked && <small>{badge?.requirement ?? 'Complete requirements to unlock.'}</small>}
    </li>
  );
}

export default AchievementBadge;
