import React from 'react';
import { 
  Sparkles, 
  Mail, 
  ArrowRight, 
  MapPin, 
  Layers, 
  Terminal,
  Cpu,
  Globe2,
  Wrench,
  GraduationCap,
  Award,
  Languages,
  Building2
} from 'lucide-react';

const WHAT_I_DO = [
  {
    icon: Globe2,
    title: 'WordPress & WooCommerce Website Development',
    detail: 'Custom Elementor builds, WooCommerce architecture, speed optimization & dynamic themes.'
  },
  {
    icon: Layers,
    title: 'Conversion-Focused Landing Pages',
    detail: 'High-converting CartFlows / Elementor sales funnels, checkout UX & client campaign pages.'
  },
  {
    icon: Wrench,
    title: 'IT Operations & Infrastructure',
    detail: 'Office network setup, Windows/BIOS deployment, hardware maintenance & system troubleshooting.'
  },
  {
    icon: Cpu,
    title: 'AI & YOLOv5 Research Leadership',
    detail: 'Deep learning, YOLOv5 22-class vehicle detection, and adaptive traffic signal control algorithms.'
  }
];

export default function About({ portfolio }) {
  const contact = portfolio?.contact || {};
  const email = contact.email || 'apurbo01hridoy@gmail.com';
  const location = contact.location || 'Dhaka, Bangladesh';

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glow (desktop only — heavy blur) */}
      <div className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="hidden md:block absolute bottom-10 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP ROW: STRICTLY ALIGNED BIO & PROFILE PICTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT CONTAINER: Tagline, Heading, Exact Bio, Action Links */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 pt-0">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT</span>
            </div>

            {/* Main Heading & Subheading */}
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
                Apurba <span className="text-gradient-emerald">Bhowal.</span>
              </h2>
              <p className="text-lg sm:text-xl text-emerald-600 dark:text-emerald-400/90 font-medium font-['Outfit']">
                Junior Developer & AI-Assisted Digital Solutions Specialist
              </p>
            </div>

            {/* Exact Bio Text */}
            <div className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                WordPress & WooCommerce developer with hands-on experience building live client websites, e-commerce platforms, and conversion-focused landing pages. Skilled in client communication, requirement gathering, website deployment, domain and hosting management, and AI-assisted development workflows. Currently working as a Junior Developer at BizMappers Ltd., with additional experience in AI/ML research, including leading a YOLOv5-based intelligent traffic control thesis project.
              </p>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, '#projects')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Live Projects</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* RIGHT CONTAINER: Profile Picture Frame (Top Aligned) */}
          <div className="lg:col-span-5 xl:col-span-4 pt-0">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800/90 shadow-2xl group">
                
                {/* Profile Image with subtle zoom on hover */}
                <div className="relative aspect-[4/4.4] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <picture>
                    <source srcSet="/profile.webp" type="image/webp" />
                    <img
                      src="/profile.jpg"
                      alt="Apurba Bhowal"
                      width="800"
                      height="800"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-95 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </picture>
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#080B11] via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Highlight Badges over Avatar */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl glass-panel bg-slate-950/80 border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  7+ Live Projects
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 p-3 rounded-2xl glass-panel bg-slate-900/90 dark:bg-slate-950/85 border-slate-700/80 dark:border-slate-800/90 backdrop-blur-md">
                  <div>
                    <h4 className="text-white text-xs font-bold font-['Outfit']">BizMappers Ltd.</h4>
                    <p className="text-[11px] text-slate-300 dark:text-slate-400 font-mono">Junior Developer • Permanent</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                    ACTIVE
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM ROW: 2-COLUMN BALANCED GRID (Academic Information & What I Do) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4 border-t border-slate-200 dark:border-slate-800/80">
          
          {/* LEFT CONTAINER: Academic Information */}
          <div className="glass-panel p-5 sm:p-7 rounded-3xl border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Academic Information
                </h3>
                <span className="hidden sm:inline text-[11px] font-mono text-indigo-600 dark:text-indigo-400">Education & Credentials</span>
              </div>

              {/* Education Cards */}
              <div className="space-y-4">
                
                {/* AIUB Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 space-y-2 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-slate-900 dark:text-white text-sm font-bold font-['Outfit']">
                      Bachelor of Science in Computer Science and Engineering (BSc CSE)
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium shrink-0">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    American International University-Bangladesh (AIUB)
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                    <span>Major: Information Systems</span>
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>

                {/* HSC Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 space-y-2 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-slate-900 dark:text-white text-sm font-bold font-['Outfit']">
                      Higher Secondary Certificate (HSC)
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-medium shrink-0">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    President Professor Dr. Iajuddin Ahmed Residential Model School & College
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                    <span>Group: Science (2018-2020)</span>
                    <span>Munshiganj, Bangladesh</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Certifications & Languages Badges Row */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Cisco IT Essentials: PC Hardware & Software</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
                <Languages className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Bangla (Fluent) • English (Professional)</span>
              </div>
            </div>

          </div>

          {/* RIGHT CONTAINER: What I Do */}
          <div className="glass-panel p-5 sm:p-7 rounded-3xl border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-800 dark:text-slate-300 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  What I Do
                </h3>
                <span className="hidden sm:inline text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Core Capabilities</span>
              </div>

              {/* Service Cards */}
              <div className="space-y-3">
                {WHAT_I_DO.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/60 dark:border-slate-700/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-all shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Row */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open for Opportunities
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
