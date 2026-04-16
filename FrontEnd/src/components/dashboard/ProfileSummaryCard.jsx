function ProfileSummaryCard({ user }) {
  const stats = [
    { label: 'Weekly Minutes', value: user?.weeklyMinutes ?? 0 },
    { label: 'Total XP', value: user?.xp ?? 0 },
    { label: 'Completed Lessons', value: user?.completedLessons ?? 0 }
  ];

  return (
    <article className="fd-pro-profile">
      <h3>{user?.name ?? 'Learner'}</h3>
      <p>Level {user?.level ?? '-'} • {user?.language ?? '-'}</p>
      <ul>
        {stats.map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ProfileSummaryCard;
