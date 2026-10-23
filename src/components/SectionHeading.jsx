import React from 'react';
import { Stagger, StaggerItem, EASE_OUT } from './motion/Reveal';

const TONES = {
  emerald: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
  cyan: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
};

const barVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

// Shared animated header used by every section: badge → title → growing underline → description
export default function SectionHeading({ icon: Icon, eyebrow, title, description, tone = 'emerald' }) {
  return (
    <Stagger className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
      <StaggerItem>
        <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel ${TONES[tone]} text-xs font-mono uppercase tracking-wider`}>
          <Icon className="w-3.5 h-3.5" />
          {eyebrow}
        </span>
      </StaggerItem>
      <StaggerItem as="h2" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
        {title}
      </StaggerItem>
      <StaggerItem
        as="span"
        aria-hidden="true"
        variants={barVariants}
        className="block mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
      />
      <StaggerItem as="p" className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
        {description}
      </StaggerItem>
    </Stagger>
  );
}
