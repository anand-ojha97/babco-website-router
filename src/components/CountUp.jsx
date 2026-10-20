import { useEffect, useRef } from "react";
import { connectCounter } from "./counterAnimation.js";

export default function CountUp({ value }) {
  const element = useRef(null);
  const label = String(value);
  useEffect(() => connectCounter(element.current, label), [label]);
  return (
    <span ref={element} className="count-up" data-count-value={label}>
      <span className="sr-only">{label}</span>
      <span className="count-up-sizer" aria-hidden="true">{label}</span>
      <span className="count-up-current" data-count-current aria-hidden="true">{label}</span>
    </span>
  );
}
