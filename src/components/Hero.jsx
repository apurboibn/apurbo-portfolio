import React from 'react';
import {
  ArrowRight,
  Layers,
  MessageSquare,
  Phone,
  MapPin
} from 'lucide-react';
import CodeTerminal from './CodeTerminal';
import TypingText from './TypingText';
import CountUp from './CountUp';

const ROLES = [
  'WordPress Developer',
  'WooCommerce Builder',
  'Landing Page Expert',
  'AI / CV Researcher',
  'IT Ops Specialist',
];

// Faint code symbols drifting in the background. Phones only get the first one (the rest would sit on top of the text).
const GLYPHS = [
  { text: '</>', className: 'top-[12%] left-[4%] text-2xl', delay: '0s', phone: true },
  { text: '{ }', className: 'top-[30%] right-[5%] text-3xl', delay: '-5s' },
  { text: '=>', className: 'bottom-[20%] left-[8%] text-xl', delay: '-9s' },
  { text: '#', className: 'top-[62%] right-[46%] text-2xl', delay: '-3s' },
  { text: '()', className: 'bottom-[10%] right-[12%] text-xl', delay: '-7s' },
  { text: ';', className: 'top-[10%] left-[48%] text-2xl', delay: '-11s' },
];

// Staggered CSS entrance (no JS needed, so the headline paints immediately)
const enter = (ms) => ({ animationDelay: `${ms}ms` });

export default function Hero({ portfolio }) {
  const phone = portfolio?.contact?.phone || '+8801925397719';
  const location = portfolio?.contact?.location || 'Dhaka, Bangladesh';
  const projects = portfolio?.projects || [];
  const liveSites = projects.filter((p) => p.category === 'Live Client Work').length;
  const skillCount = (portfolio?.skills || []).reduce((n, cat) => n + cat.items.length, 0);

  const stats = [
    { value: liveSites, label: 'Live client sites' },
    { value: projects.length, label: 'Projects & research' },
    { value: skillCount, label: 'Skills & tools' },
    { value: 22, label: 'Vehicle classes (thesis)' },
  ];

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Ambient lighting (heavy blur — skipped on phones) */}
      <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-emerald-600/10 via-cyan-500/5 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {GLYPHS.map((g) => (
        <span
          key={g.text}
          aria-hidden="true"
          className={`${g.phone ? 'block' : 'hidden md:block'} absolute ${g.className} font-mono font-bold text-emerald-600/15 dark:text-emerald-400/15 select-none pointer-events-none animate-drift -z-10`}
          style={{ animationDelay: g.delay }}
        >
          {g.text}
        </span>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT: intro */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left min-w-0">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-mono animate-fade-up" style={enter(0)}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles & Live Web Deployments</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(1.875rem,8.5vw,3.75rem)] lg:text-5xl xl:text-6xl font-extrabold break-words tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.08] animate-fade-up" style={enter(80)}>
              Empowering Brands with{' '}
              <span className="text-gradient-emerald"><span className="whitespace-nowrap">High-Conversion</span> Web</span> &{' '}
              <span className="text-gradient-indigo"><span className="whitespace-nowrap">AI-Driven</span> Solutions</span>
            </h1>

            {/* Terminal-style rotating role */}
            <p className="flex items-center gap-2 whitespace-nowrap overflow-hidden font-mono text-[13px] sm:text-base animate-fade-up" style={enter(160)}>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">~$</span>
              <span className="text-slate-500 dark:text-slate-400">whoami</span>
              <span className="text-slate-400 dark:text-slate-500" aria-hidden="true">→</span>
              <TypingText words={ROLES} className="font-semibold text-slate-900 dark:text-white" />
            </p>

            {/* Bio / Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl leading-relaxed animate-fade-up" style={enter(240)}>
              Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">Apurba Bhowal</strong> — Junior Developer at <span className="text-emerald-600 dark:text-emerald-400 font-semibold">BizMappers Ltd.</span> and Computer Science Graduate from <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AIUB (CSE)</span>. Specializing in WordPress development, WooCommerce architectures, sales-focused landing pages, IT infrastructure operations, and published AI research.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center gap-3 sm:gap-4 pt-1 animate-fade-up" style={enter(320)}>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, '#projects')}
                className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Layers className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                <span>Explore Live Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Start a Project</span>
              </a>
            </div>

            {/* Minimal Meta Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-slate-800/60 max-w-2xl animate-fade-up" style={enter(400)}>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {location}
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                {phone}
              </a>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                BizMappers Ltd. • Permanent
              </span>
            </div>

          </div>

          {/* RIGHT: live coding animation */}
          <div className="lg:col-span-5 min-w-0 animate-scale-in" style={enter(250)}>
            <CodeTerminal liveSites={liveSites} />
          </div>
        </div>

        {/* Animated stats */}
        <dl className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-up" style={enter(500)}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col glass-panel rounded-2xl p-4 sm:p-5 border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors"
            >
              <dt className="order-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">{stat.label}</dt>
              <dd className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-gradient-emerald tabular-nums">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
