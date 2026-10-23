import React from 'react';
import { m, useScroll, useSpring } from 'framer-motion';

// Thin gradient bar under the navbar showing how far down the page you are
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute left-0 right-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
    />
  );
}
