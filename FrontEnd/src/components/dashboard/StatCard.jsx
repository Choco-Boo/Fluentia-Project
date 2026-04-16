function StatCard({ label, value }) {
  return (
    <article className="fd-pro-stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
}

export default StatCard;
