import React, { useEffect } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Maximize2,
  CheckCircle,
  BrainCircuit,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ThesisModal({ isOpen, onClose, thesisProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = '/docs/traffic-signal-thesis.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl glass-panel border border-slate-700/80 shadow-2xl shadow-emerald-500/10 overflow-hidden z-10 bg-[#0A0E17]">
        
        {/* Modal Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate font-['Outfit']">
                  AI-Based Dynamic Traffic Signal Control System
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
                  Thesis Paper
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                First-listed Author & Project Lead • AIUB CSE • YOLOv5 22-Class Architecture
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download="traffic-signal-thesis-apurba-bhowal.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all"
              title="Download Thesis PDF"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-medium transition-all"
              title="Open in Full Tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Full Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Body: Embedded PDF Iframe */}
        <div className="flex-1 w-full h-full bg-slate-950 relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="AI Traffic Signal Control Thesis - Apurba Bhowal"
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Footer Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Undergraduate Thesis Project • American International University-Bangladesh (AIUB)</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-emerald-400">YOLOv5 Multi-Class</span>
            <span>•</span>
            <span className="text-indigo-400">Adaptive Signal Timing</span>
            <span>•</span>
            <span className="text-cyan-400">Emergency Priority</span>
          </div>
        </div>

      </div>
    </div>
  );
}
