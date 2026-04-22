function SectionSkeleton({ className, count = 1 }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="fd-pro-skeleton-card">Loading...</div>
      ))}
    </div>
  );
}

function SectionMessage({ message }) {
  return <p className="fd-pro-state-msg">{message}</p>;
}

export { SectionSkeleton, SectionMessage };
