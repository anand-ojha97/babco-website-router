import { useEffect, useRef, useState } from "react";

export default function ProductMedia({
  image,
  inactiveImage,
  video,
  alt,
  active,
}) {
  const player = useRef(null);
  const [failed, setFailed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const previouslyActive = useRef(active);

  useEffect(() => {
    // Fade a still frame into the label when a pack leaves the centre.
    // Its video is stopped immediately; this exit layer is an image.
    const justLeft = previouslyActive.current && !active;
    previouslyActive.current = active;
    setLeaving(justLeft);
    if (!justLeft) return;
    const timer = setTimeout(() => setLeaving(false), 500);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const videoElement = player.current;
    if (!videoElement) return;

    // Inactive slides never play or download a video.
    if (!active) {
      videoElement.pause();
      videoElement.load();
      return;
    }

    let cancelled = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rectangle = videoElement.getBoundingClientRect();
    let inView = rectangle.bottom > 0 && rectangle.top < window.innerHeight;

    function updatePlayback() {
      if (cancelled) return;
      const shouldPlay = inView && !document.hidden && !preference.matches;

      if (shouldPlay) {
        videoElement.muted = true;
        videoElement
          .play()
          .catch(() => {
            if (!cancelled && inView && !document.hidden) setFailed(true);
          });
      } else {
        videoElement.pause();
      }
    }

    // Pause the video when it leaves the screen or the browser tab is hidden.
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        updatePlayback();
      },
      { threshold: 0.2 },
    );
    observer.observe(videoElement);
    document.addEventListener("visibilitychange", updatePlayback);
    preference.addEventListener("change", updatePlayback);
    updatePlayback();

    // Cleanup runs when the slide changes or this component is removed.
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      preference.removeEventListener("change", updatePlayback);
      videoElement.pause();
    };
  }, [active, video]);

  // Active: show video. Inactive: show image. A failed video also uses its image.
  const showImage = !active || failed;

  return (
    <div
      className={`relative h-[29.86cqw] min-h-[325px] w-full shrink-0 select-none max-[1000px]:min-h-[300px] max-[640px]:h-[285px] max-[640px]:min-h-0 ${active ? "product-hover" : "grayscale"}`}
      data-media-state={showImage ? "image" : "video"}
    >
      <img
        className="absolute inset-0 h-full w-full object-contain"
        src={!active && inactiveImage ? inactiveImage : image}
        alt={alt}
        hidden={!showImage}
        aria-hidden={!showImage}
        loading="eager"
        draggable={false}
      />
      {leaving && !active && (
        <img
          className="pointer-events-none absolute inset-0 h-full w-full animate-[inactive-media-fade_0.5s_ease_both] object-contain motion-reduce:hidden"
          src={image}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      )}
      <video
        ref={player}
        className={`absolute inset-0 h-full w-full object-contain ${active ? "animate-[active-media-reveal_0.7s_ease_both]" : ""}`}
        src={active ? video : undefined}
        poster={image}
        hidden={showImage}
        aria-hidden={showImage}
        aria-label={alt}
        muted
        loop
        playsInline
        preload={active ? "metadata" : "none"}
        onError={() => setFailed(true)}
      />

    </div>
  );
}
