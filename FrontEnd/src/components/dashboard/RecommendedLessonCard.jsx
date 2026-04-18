function RecommendedLessonCard({ lesson }) {
  return (
    <article className="fd-pro-recommend-card">
      {lesson?.image ? (
        <div className="fd-pro-recommend-image-wrap">
          <img src={lesson.image} alt={lesson?.title ?? 'Recommendation'} className="fd-pro-recommend-image" />
        </div>
      ) : null}
      <h3>{lesson?.title ?? 'Recommendation'}</h3>
      <p>{lesson?.detail ?? 'No recommendation details available.'}</p>
    </article>
  );
}

export default RecommendedLessonCard;
