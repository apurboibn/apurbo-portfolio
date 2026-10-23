import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ScrollProgress from './ScrollProgress';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'IT Ops', href: '#it-infrastructure' },
  { name: 'Contact', href: '#contact' },
];

// Sun/moon swap with a little spin
function ThemeIcon({ isDark, size }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25 }}
        className="flex"
      >
        {isDark ? <Sun className={`${size} text-amber-400`} /> : <Moon className={`${size} text-indigo-500`} />}
      </m.span>
    </AnimatePresence>
  );
}

const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu with Escape, or when the screen grows to the desktop layout
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener?.('change', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener?.('change', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'py-3 bg-white/85 dark:bg-[#080B11]/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-2.5 shrink-0 text-slate-900 dark:text-slate-100 transition-transform active:scale-95"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors">
            <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-sm -z-10 group-hover:bg-emerald-500/20 transition-colors" />
          </div>
          <div className="font-bold text-lg tracking-tight font-['Outfit'] text-slate-900 dark:text-white">
            Apurbo<span className="text-emerald-500 dark:text-emerald-400">.</span>
          </div>
        </a>

        {/* Desktop Navigation (lg+; tablets use the menu button — 6 links don't fit at 768px) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2 xl:px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3 xl:px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {/* Highlight that slides from link to link as you scroll */}
                {isActive && (
                  <m.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Group (Theme Switcher + Status + CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all active:scale-90 hover:rotate-12"
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            <ThemeIcon isDark={isDark} size="w-4 h-4" />
          </button>

          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Hire
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Phone & Tablet Actions (Theme Toggle + Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <ThemeIcon isDark={isDark} size="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="lg:hidden mt-3 mx-4 sm:mx-6 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-1 origin-top max-h-[calc(100vh-6rem)] supports-[height:100dvh]:max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <m.a
                  key={link.name}
                  variants={menuItemVariants}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />}
                </m.a>
              );
            })}
            <m.div variants={menuItemVariants} className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-semibold text-sm shadow-lg"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>

      {/* Reading progress (hidden while the mobile menu is open, or it would sit below the menu) */}
      {!mobileMenuOpen && <ScrollProgress />}
    </header>
  );
}
