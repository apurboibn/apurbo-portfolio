import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  MessageSquare, 
  Phone, 
  MapPin
} from 'lucide-react';

export default function Hero({ portfolio }) {
  const phone = portfolio?.contact?.phone || '+8801925397719';
  const location = portfolio?.contact?.location || 'Dhaka, Bangladesh';

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[450px] bg-gradient-to-tr from-emerald-600/10 via-cyan-500/5 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Time Roles & Live Web Deployments</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.08]">
              Empowering Brands with <br />
              <span className="text-gradient-emerald">High-Conversion Web</span> &{' '}
              <span className="text-gradient-indigo">AI-Driven Solutions</span>
            </h1>
          </div>

          {/* Bio / Value Proposition */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-3xl leading-relaxed">
            Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">Apurba Bhowal</strong> — Junior Developer at <span className="text-emerald-600 dark:text-emerald-400 font-semibold">BizMappers Ltd.</span> and Computer Science Graduate from <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AIUB (CSE)</span>. Specializing in WordPress development, WooCommerce architectures, sales-focused landing pages, IT infrastructure operations, and published AI research.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Button */}
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Layers className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              <span>Explore Live Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Button */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Start a Project</span>
            </a>
          </div>

          {/* Minimal Meta Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-slate-800/60 max-w-2xl">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {location}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {phone}
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              BizMappers Ltd. • Permanent
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
