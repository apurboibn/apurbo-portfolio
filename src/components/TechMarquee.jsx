import React from 'react';

const ITEMS = [
  'WordPress',
  'WooCommerce',
  'Elementor',
  'CartFlows',
  'PHP',
  'JavaScript',
  'HTML & CSS',
  'AJAX',
  'Python',
  'SQL',
  'YOLOv5',
  'Computer Vision',
  'Deep Learning',
  'Data Analysis',
  'Domain & Hosting',
  'Office Networks',
];

// Endless sideways ticker of technologies (pure CSS transform — cheap on phones)
export default function TechMarquee() {
  return (
    <div className="relative py-4 sm:py-5 border-y border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/40 overflow-hidden group">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#F8FAFC] dark:from-[#080B11] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#F8FAFC] dark:from-[#080B11] to-transparent z-10" />
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 ? 'true' : undefined} aria-label={copy === 0 ? 'Technologies' : undefined}>
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 px-4 sm:px-6 font-mono text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap"
              >
                <span className="text-emerald-500 dark:text-emerald-400" aria-hidden="true">{'</>'}</span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
