import React from 'react';
import { m } from 'framer-motion';

export const EASE_OUT = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' };

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Fades/slides an element in the first time it scrolls into view
export function Reveal({ as = 'div', children, delay = 0, y = 24, x = 0, scale = 1, className, ...rest }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Parent that reveals its <StaggerItem> children one after another
export function Stagger({ as = 'div', children, className, stagger = 0.08, delay = 0, ...rest }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = 'div', children, className, variants = fadeUpVariants, ...rest }) {
  const Component = m[as];
  return (
    <Component className={className} variants={variants} {...rest}>
      {children}
    </Component>
  );
}
