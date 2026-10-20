// Shared banner used by six inner pages. Each page supplies its own image,
// title, and layout classes, so its approved design stays exactly the same.
// "image" is an object of image details; other props are simple text values.
export default function PageHero({
  id,
  title,
  image,
  className,
  overlayClassName,
  titleClassName,
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={className}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className={image.className}
      />
      <div className={overlayClassName} aria-hidden="true" />
      <h1 id={titleId} className={titleClassName}>{title}</h1>
    </section>
  );
}
