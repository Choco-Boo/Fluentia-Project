function UpcomingSessionCard({ session }) {
  return (
    <div>
      <p>{session?.title ?? 'Upcoming item'}</p>
      <small>{session?.detail ?? 'No schedule provided.'}</small>
      <button type="button">{session?.cta ?? 'Open'}</button>
    </div>
  );
}

export default UpcomingSessionCard;
