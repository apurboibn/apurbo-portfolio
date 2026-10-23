import React, { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Building,
  Sparkles
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Reveal, Stagger, StaggerItem } from './motion/Reveal';

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export default function ExperienceTimeline({ portfolio }) {
  const experiences = portfolio?.experience || [];

  // The coloured spine "draws" itself as you scroll through the timeline
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const spineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="hidden md:block absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          icon={Sparkles}
          eyebrow="Career History"
          title={<>Professional <span className="text-gradient-emerald">Experience</span></>}
          description="Demonstrated trajectory at BizMappers Ltd. advancing from hands-on IT Operations & Web Design Intern to Permanent Junior Developer."
        />

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Spine (left edge on phones/tablets, centred from md up) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
          <m.div
            aria-hidden="true"
            style={{ scaleY: spineScale, x: '-50%' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-emerald-500 via-cyan-500 to-indigo-500"
          />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >

                  {/* Timeline Center Node */}
                  <Reveal
                    y={0}
                    scale={0.4}
                    className="absolute left-4 md:left-1/2 -ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-400 z-10 shadow-lg shadow-emerald-500/30"
                  >
                    <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </Reveal>

                  {/* Content Card (Half Width) */}
                  <Reveal
                    x={isEven ? 32 : -32}
                    y={16}
                    className={`w-full pl-12 md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pl-0 md:pr-10'}`}
                  >

                    <div className="glass-panel p-5 sm:p-7 rounded-2xl border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group">

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

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium my-2">
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-semibold">
                          <Building className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="hidden sm:inline text-slate-300 dark:text-slate-600" aria-hidden="true">•</span>
                        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                        {exp.focus && (
                          <>
                            <span className="hidden sm:inline text-slate-300 dark:text-slate-600" aria-hidden="true">•</span>
                            <span className="text-amber-600 dark:text-amber-400 font-mono">Focus: {exp.focus}</span>
                          </>
                        )}
                      </div>

                      {/* Responsibilities — tick in one by one */}
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                          Key Deliverables & Responsibilities:
                        </h4>
                        <Stagger as="ul" stagger={0.05} className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <StaggerItem as="li" key={rIdx} variants={listItemVariants} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </StaggerItem>
                          ))}
                        </Stagger>
                      </div>

                    </div>

                  </Reveal>

                  {/* Opposite side (desktop): big period label next to the spine */}
                  <Reveal
                    x={isEven ? -24 : 24}
                    delay={0.15}
                    className={`hidden md:flex md:w-1/2 pt-2 ${isEven ? 'md:pr-12 justify-end text-right' : 'md:pl-12 justify-start text-left'}`}
                  >
                    <div className="space-y-1">
                      <p className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">{exp.employmentType}</p>
                      <p className="font-['Outfit'] text-3xl lg:text-4xl font-extrabold text-gradient-emerald">
                        {exp.startDate.slice(0, 4)}
                        {' — '}
                        {exp.endDate === 'Present' ? 'Now' : exp.endDate.slice(0, 4)}
                      </p>
                    </div>
                  </Reveal>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
