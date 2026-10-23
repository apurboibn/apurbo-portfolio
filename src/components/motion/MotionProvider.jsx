import React from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('./features.js').then((res) => res.default);

// reducedMotion="user": visitors who turned on "reduce motion" in their phone/OS get
// simple fades instead of movement.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
