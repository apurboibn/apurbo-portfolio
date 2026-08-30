import React from 'react';
import { ArrowUp, Terminal, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ portfolio }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#06080D] pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Brand & Bio (Left 6 Cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30">
                <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit']">
                Apurba <span className="text-emerald-500 dark:text-emerald-400">Bhowal</span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Junior Developer & AI-Assisted Digital Solutions Specialist. Building fast, scalable, and sales-focused digital experiences with WordPress, WooCommerce, and AI research models.
            </p>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About & Education</a></li>
              <li><a href="#skills" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Skills Matrix</a></li>
              <li><a href="#experience" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Experience Timeline</a></li>
              <li><a href="#projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Projects & Research</a></li>
              <li><a href="#it-infrastructure" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">IT & Infrastructure</a></li>
              <li><a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Apurba</a></li>
            </ul>
          </div>

          {/* Contact Summary (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
              Direct Reach
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>apurbo01hridoy@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>+880 1925 397719</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Apurba Bhowal. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-400">
              Engineered with React • Tailwind • Framer Motion
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
