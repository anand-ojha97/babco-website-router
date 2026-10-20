// The zero-height sticky anchor preserves the banner's original position.
export function connectStickyHeader(header, viewport = window) {
  if (!header) return;
  const rootStyle = viewport.document.documentElement.style;
  const previousOffset = rootStyle.getPropertyValue("--site-header-offset");
  let pinned = false;
  let frame = null;
  let measure = true;
  let disposed = false;

  function update() {
    frame = null;
    if (disposed) return;
    const scroll = Math.max(0, viewport.scrollY);
    // Once pinned, keep navigation steady until the visitor returns to the top.
    const nextPinned = scroll > 64 || (pinned && scroll > 0);
    if (nextPinned !== pinned) measure = true;
    pinned = nextPinned;
    header.dataset.sticky = String(pinned);
    header.style.setProperty("--header-scroll-offset", `${pinned ? 0 : -scroll}px`);
    if (measure) {
      rootStyle.setProperty("--site-header-offset", `${Math.ceil(header.getBoundingClientRect().height) + 12}px`);
      measure = false;
    }
  }
  function schedule() {
    if (frame === null && !disposed) frame = viewport.requestAnimationFrame(update);
  }
  function resize() {
    measure = true;
    schedule();
  }
  viewport.addEventListener("scroll", schedule, { passive: true });
  viewport.addEventListener("resize", resize);
  viewport.addEventListener("pageshow", resize);
  const observer = viewport.ResizeObserver ? new viewport.ResizeObserver(resize) : null;
  observer?.observe(header);
  update();
  return () => {
    disposed = true;
    if (frame !== null) viewport.cancelAnimationFrame(frame);
    observer?.disconnect();
    viewport.removeEventListener("scroll", schedule);
    viewport.removeEventListener("resize", resize);
    viewport.removeEventListener("pageshow", resize);
    delete header.dataset.sticky;
    header.style.removeProperty("--header-scroll-offset");
    if (previousOffset) rootStyle.setProperty("--site-header-offset", previousOffset);
    else rootStyle.removeProperty("--site-header-offset");
  };
}
