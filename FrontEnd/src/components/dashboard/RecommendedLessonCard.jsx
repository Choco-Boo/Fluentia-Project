function RecommendedLessonCard({ lesson }) {
  return (
    <article className="fd-pro-recommend-card">
      <h3>{lesson?.title ?? 'Recommendation'}</h3>
      <p>{lesson?.detail ?? 'No recommendation details available.'}</p>
    </article>
  );
}

export default RecommendedLessonCard;
