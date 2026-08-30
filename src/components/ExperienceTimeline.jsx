import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building, 
  Sparkles, 
  Clock, 
  BadgeCheck 
} from 'lucide-react';

export default function ExperienceTimeline({ portfolio }) {
  const experiences = portfolio?.experience || [];

  return (
    <section id="experience" className="py-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Career History
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
            Professional <span className="text-gradient-emerald">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Demonstrated trajectory at BizMappers Ltd. advancing from hands-on IT Operations & Web Design Intern to Permanent Junior Developer.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Spine */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-indigo-500 to-slate-300 dark:to-slate-800" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-400 z-10 shadow-lg shadow-emerald-500/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Content Card (Half Width) */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${
                    isEven ? 'sm:pl-10' : 'sm:pr-10'
                  } w-full`}>
                    
                    <div className="glass-panel p-6 sm:p-7 rounded-2xl border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group">
                      
                      {/* Role Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                          {exp.employmentType}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{exp.startDate} → {exp.endDate}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium my-2">
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-semibold">
                          <Building className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                        {exp.focus && (
                          <>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="text-amber-600 dark:text-amber-400 font-mono">Focus: {exp.focus}</span>
                          </>
                        )}
                      </div>

                      {/* Responsibilities */}
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                          Key Deliverables & Responsibilities:
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
