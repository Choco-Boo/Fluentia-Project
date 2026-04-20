function LessonContentTypeCard({ item }) {
  return (
    <article className="fd-pro-type-card">
      {item?.image ? (
        <div className="fd-pro-type-image-wrap">
          <img src={item.image} alt={item?.title ?? 'Learning mode'} className="fd-pro-type-image" />
        </div>
      ) : null}
      <span>{item?.icon ?? '📘'}</span>
      <h3>{item?.title ?? 'Untitled'}</h3>
      <p>{item?.detail ?? 'No details available.'}</p>
      <button type="button">{item?.cta ?? 'Open'}</button>
    </article>
  );
}

export default LessonContentTypeCard;
