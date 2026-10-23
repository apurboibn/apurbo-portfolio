import React, { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Counts from 0 up to `value` the first time it scrolls into view.
// Writes straight to the DOM so the page doesn't re-render every frame.
export default function CountUp({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduceMotion) {
      el.textContent = `${value}${suffix}`;
      return undefined;
    }
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(value * eased)}${suffix}`;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, suffix, duration, reduceMotion]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{`0${suffix}`}</span>
      <span className="sr-only">{`${value}${suffix}`}</span>
    </>
  );
}
