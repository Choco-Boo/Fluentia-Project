function LessonContentTypeCard({ item }) {
  return (
    <article className="fd-pro-type-card">
      <span>{item?.icon ?? '📘'}</span>
      <h3>{item?.title ?? 'Untitled'}</h3>
      <p>{item?.detail ?? 'No details available.'}</p>
      <button type="button">{item?.cta ?? 'Open'}</button>
    </article>
  );
}

export default LessonContentTypeCard;
