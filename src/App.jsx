import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData.json';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsMatrix from './components/SkillsMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsShowcase from './components/ProjectsShowcase';
import ITInfrastructure from './components/ITInfrastructure';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ThesisModal from './components/ThesisModal';
import TechMarquee from './components/TechMarquee';
import BackToTop from './components/BackToTop';
import MotionProvider from './components/motion/MotionProvider';

function AppContent() {
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Find the thesis project from the dataset
  const thesisProject = portfolioData.projects?.find((p) => p.category === 'Research') || portfolioData.projects?.[0];

  useEffect(() => {
    // Highlight the nav link of the section in the middle of the screen.
    // IntersectionObserver is much cheaper than measuring every section on each scroll event.
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'it-infrastructure', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F8FAFC] dark:bg-[#080B11] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200 relative transition-colors duration-300">
      {/* Dynamic Background Noise / Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-20" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none -z-10" />

      {/* Sticky Header Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero 
          portfolio={portfolioData} 
          onOpenThesis={() => setIsThesisModalOpen(true)} 
        />

        <TechMarquee />
        
        <About 
          portfolio={portfolioData} 
        />
        
        <SkillsMatrix 
          portfolio={portfolioData} 
        />
        
        <ExperienceTimeline 
          portfolio={portfolioData} 
        />
        
        <ProjectsShowcase 
          portfolio={portfolioData} 
          onOpenThesis={() => setIsThesisModalOpen(true)} 
        />
        
        <ITInfrastructure />
        
        <ContactSection 
          portfolio={portfolioData} 
        />
      </main>

      {/* Footer */}
      <Footer 
        portfolio={portfolioData} 
      />

      <BackToTop />

      {/* Glassy Dynamic Thesis PDF Viewer Modal */}
      <ThesisModal
        isOpen={isThesisModalOpen}
        onClose={() => setIsThesisModalOpen(false)}
        thesisProject={thesisProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AppContent />
      </MotionProvider>
    </ThemeProvider>
  );
}
