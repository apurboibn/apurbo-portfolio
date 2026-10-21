import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  ShoppingCart, 
  Globe2, 
  Database, 
  BrainCircuit, 
  Bot, 
  Wrench, 
  SlidersHorizontal, 
  Users2,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';

const CATEGORY_ICONS = {
  'Web Development': Code2,
  'E-commerce & Conversion': ShoppingCart,
  'Website Operations': Globe2,
  'Programming & Databases': Database,
  'AI, Machine Learning & Computer Vision': BrainCircuit,
  'AI & Modern Workflow Tools': Bot,
  'IT Operations & Technical Support': Wrench,
  'Technical & Productivity Tools': SlidersHorizontal,
  'Professional Skills': Users2,
};

const CATEGORY_COLORS = {
  'Web Development': 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'E-commerce & Conversion': 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'Website Operations': 'from-blue-500/20 to-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
  'Programming & Databases': 'from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  'AI, Machine Learning & Computer Vision': 'from-violet-500/20 to-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30',
  'AI & Modern Workflow Tools': 'from-emerald-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30',
  'IT Operations & Technical Support': 'from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
  'Technical & Productivity Tools': 'from-sky-500/20 to-indigo-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30',
  'Professional Skills': 'from-green-500/20 to-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
};

export default function SkillsMatrix({ portfolio }) {
  const skillCategories = portfolio?.skills || [];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return skillCategories
      .map((cat) => {
        // Category filter
        if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
          return null;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchedItems = cat.items.filter(
            (item) =>
              item.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q)
          );
          if (matchedItems.length === 0) return null;
          return { ...cat, items: matchedItems };
        }
        return cat;
      })
      .filter(Boolean);
  }, [skillCategories, selectedCategory, searchQuery]);

  const allCategoriesList = useMemo(() => {
    return ['All', ...skillCategories.map((c) => c.category)];
  }, [skillCategories]);

  return (
    <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="hidden md:block absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Skills & Technical Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
            Interactive <span className="text-gradient-emerald">Skills Matrix</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            From modern WordPress & WooCommerce architectures to AI/Computer Vision models and hands-on IT infrastructure operations.
          </p>
        </div>

        {/* Filter Controls: Search & Category Chips */}
        <div className="mb-8 sm:mb-10 space-y-4">
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              aria-label="Search skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g., WordPress, YOLOv5, Python, BIOS, CartFlows)..."
              className="w-full pl-11 pr-16 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base sm:text-sm text-slate-900 [&::-webkit-search-cancel-button]:hidden dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none backdrop-blur-md transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips — one swipeable row on phones, wrapped on bigger screens */}
          <div className="flex flex-nowrap sm:flex-wrap items-center sm:justify-center gap-2 pt-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible no-scrollbar">
            {allCategoriesList.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-2 sm:py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 sm:scale-105'
                      : 'bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => {
              const Icon = CATEGORY_ICONS[cat.category] || Layers;
              const colorStyle = CATEGORY_COLORS[cat.category] || 'from-slate-500/20 to-slate-600/20 text-emerald-600 dark:text-emerald-400 border-slate-300 dark:border-slate-700';

              return (
                <div
                  key={cat.category}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Category Title & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${colorStyle} border transition-transform group-hover:scale-110`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                          {cat.category}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                        {cat.items.length}
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cat.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs transition-all hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-base">No skills found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs text-emerald-600 dark:text-emerald-400 hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
