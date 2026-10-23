import React from 'react';
import { Terminal, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ portfolio }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#06080D] pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-10 sm:pb-12 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Brand & Bio (Left 6 Cols) */}
          <div className="sm:col-span-2 md:col-span-6 space-y-4">
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
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 [&_a]:inline-block [&_a]:py-1">
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
              <a href="mailto:apurbo01hridoy@gmail.com" className="flex items-center gap-2 py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                <span className="break-all">apurbo01hridoy@gmail.com</span>
              </a>
              <a href="tel:+8801925397719" className="flex items-center gap-2 py-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
                <span>+880 1925 397719</span>
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <p className="pt-8 text-center text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Apurba Bhowal. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
