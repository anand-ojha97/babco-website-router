export function parseCounterValue(value) {
  const label = String(value);
  const match = label.match(/^([+-]?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?([+%]?)$/);
  if (!match) return null;
  const decimals = match[3]?.length - 1 || 0;
  const target = Number(`${match[1]}${match[2].replaceAll(",", "")}${match[3] || ""}`);
  const formatter = new Intl.NumberFormat("en-US", {
    useGrouping: match[2].includes(","),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return {
    label,
    target,
    format: (number) => `${formatter.format(decimals ? number : Math.trunc(number))}${match[4]}`,
  };
}

// Animate only the visual copy; assistive technology receives the final value.
export function connectCounter(element, value, viewport = window) {
  const current = element?.querySelector("[data-count-current]");
  const counter = parseCounterValue(value);
  if (!current || !counter) return;
  const preference = viewport.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = null;
  let observer;
  let milestoneObserver;
  let started = false;
  let disposed = false;
  let visible = false;
  const milestone = element.closest("[data-milestone]");

  function finish() {
    if (frame !== null) viewport.cancelAnimationFrame(frame);
    frame = null;
    current.textContent = counter.label;
    observer?.disconnect();
    milestoneObserver?.disconnect();
  }

  function start() {
    if (disposed || started || !visible || milestone?.dataset.reached === "false") return;
    started = true;
    observer?.disconnect();
    milestoneObserver?.disconnect();
    let began = null;
    const duration = 1350;
    function tick(time) {
      if (disposed || preference.matches) return;
      if (began === null) began = time + 180;
      const progress = Math.min(1, Math.max(0, (time - began) / duration));
      const next = counter.format(counter.target * (1 - (1 - progress) ** 3));
      if (current.textContent !== next) current.textContent = next;
      if (progress < 1) frame = viewport.requestAnimationFrame(tick);
      else finish();
    }
    frame = viewport.requestAnimationFrame(tick);
  }

  function onPreferenceChange() {
    if (preference.matches) {
      started = true;
      finish();
    }
  }

  if (preference.matches || !viewport.IntersectionObserver || !viewport.requestAnimationFrame) {
    finish();
    return;
  }
  current.textContent = counter.format(0);
  observer = new viewport.IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    start();
  }, { threshold: 0.2, rootMargin: "0px 0px -45px 0px" });
  observer.observe(element);
  if (milestone && viewport.MutationObserver) {
    milestoneObserver = new viewport.MutationObserver(start);
    milestoneObserver.observe(milestone, { attributes: true, attributeFilter: ["data-reached"] });
  }
  preference.addEventListener("change", onPreferenceChange);

  return () => {
    disposed = true;
    finish();
    preference.removeEventListener("change", onPreferenceChange);
  };
}
