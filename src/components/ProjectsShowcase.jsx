import React, { useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Cpu, 
  CheckCircle,
  ArrowUpRight,
  Lock
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Reveal, EASE_OUT } from './motion/Reveal';

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// Soft light that follows the mouse across a card (only on devices with a mouse)
const trackSpotlight = (e) => {
  if (e.pointerType !== 'mouse') return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const FILTER_TABS = [
  { id: 'All', label: 'All Projects' },
  { id: 'Live Client Work', label: 'Live Client Work' },
  { id: 'Research', label: 'AI & Research' },
  { id: 'Academic / ML', label: 'Academic / ML' }
];

export default function ProjectsShowcase({ portfolio, onOpenThesis }) {
  const projects = portfolio?.projects || [];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glows (desktop only — heavy blur, and the 600px blob used to push the page wider than phone screens) */}
      <div className="hidden md:block absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          icon={Sparkles}
          eyebrow="Portfolio Highlights"
          title={<>Featured <span className="text-gradient-emerald">Projects</span> & Research</>}
          description="Explore live production client websites, high-converting e-commerce funnels, and published AI research."
        />

        {/* Filter Navigation Tabs */}
        <Reveal className="flex flex-nowrap sm:flex-wrap items-center sm:justify-center gap-2 mb-8 sm:mb-10 py-1 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isSelected = activeFilter === tab.id;
            const count = tab.id === 'All' 
              ? projects.length 
              : projects.filter(p => p.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={isSelected}
                className={`relative shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  isSelected
                    ? 'text-slate-950 font-bold border border-transparent'
                    : 'glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Green highlight glides to the chosen tab */}
                {isSelected && (
                  <m.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                <span className={`relative px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Projects Grid — cards fade in on scroll and re-flow smoothly when the filter changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isResearch = project.category === 'Research';
            const isLiveClient = project.category === 'Live Client Work';
            const isSalesLanding = project.type?.toLowerCase().includes('landing');
            const hasPdfLink = project.links?.some(l => l.isPdf);
            const liveLink = project.links?.find(l => !l.isPdf);

            return (
              <m.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: (idx % 3) * 0.08, layout: { duration: 0.35, ease: EASE_OUT } }}
                onPointerMove={trackSpotlight}
                className={`relative flex flex-col justify-between rounded-2xl glass-panel p-5 sm:p-7 hover:border-emerald-500/40 transition-[border-color,box-shadow] duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden ${
                  isResearch
                    ? 'border-indigo-300 dark:border-indigo-500/40 bg-gradient-to-b from-indigo-50/40 to-white/90 dark:from-indigo-950/20 dark:to-slate-950/60'
                    : 'border-slate-200 dark:border-slate-800/90'
                }`}
              >
                {/* Mouse spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0%),rgba(16,185,129,0.12),transparent_45%)]"
                />
                
                {/* Top Card Info */}
                <div className="relative space-y-4">

                  {/* Mini browser bar with the real domain (live sites) */}
                  {isLiveClient && liveLink && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex gap-1 shrink-0" aria-hidden="true">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <Lock className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="truncate">{hostOf(liveLink.url)}</span>
                    </div>
                  )}
                  
                  {/* Category & Status Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isResearch 
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400'
                        : isSalesLanding
                        ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {project.type}
                    </span>

                    {/* Live Status Pill */}
                    {isLiveClient && (
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Site
                      </span>
                    )}

                    {isResearch && (
                      <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-[11px] font-mono text-indigo-600 dark:text-indigo-300">
                        <Cpu className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        Thesis Lead
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] leading-snug break-words group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Role Tag for Research */}
                  {project.role && (
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                      Role: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{project.role}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Action Area */}
                <div className="relative pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  
                  {/* PDF Thesis Modal Trigger */}
                  {hasPdfLink && (
                    <button
                      onClick={onOpenThesis}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Read Full Thesis Paper (PDF)</span>
                    </button>
                  )}

                  {/* Live Client Website / Landing Page Link */}
                  {liveLink && (
                    <a
                      href={liveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{liveLink.label}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {/* Academic / ML with no direct link */}
                  {!hasPdfLink && !liveLink && (
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 w-full justify-center py-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Completed Academic Project</span>
                    </div>
                  )}

                </div>

              </m.div>
            );
          })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
