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

function AppContent() {
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Find the thesis project from the dataset
  const thesisProject = portfolioData.projects?.find((p) => p.category === 'Research') || portfolioData.projects?.[0];

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'it-infrastructure', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B11] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 relative transition-colors duration-300">
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
      <AppContent />
    </ThemeProvider>
  );
}
