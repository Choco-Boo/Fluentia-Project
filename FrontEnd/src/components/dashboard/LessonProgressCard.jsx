function LessonProgressCard({ lesson }) {
  const progress = lesson?.progressPercent ?? 0;

  return (
    <article className="fd-pro-current-card">
      {lesson?.image ? (
        <div className="fd-pro-card-image-wrap">
          <img src={lesson.image} alt={lesson?.title ?? 'Lesson thumbnail'} className="fd-pro-card-image" />
        </div>
      ) : null}
      <p>{lesson?.type ?? 'Lesson'}</p>
      <h3>{lesson?.title ?? 'Untitled lesson'}</h3>
      <div className="fd-pro-progress-bar">
        <span style={{ width: `${progress}%` }}></span>
      </div>
    </article>
  );
}

export default LessonProgressCard;
