import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  BrainCircuit
} from 'lucide-react';

// Phone browsers can't show a PDF inside an iframe (Android Chrome shows a blank box,
// iOS Safari only the first page), so phones get open/download buttons instead.
function canEmbedPdf() {
  if (typeof window === 'undefined') return false;
  const wideEnough = window.matchMedia('(min-width: 768px)').matches;
  return wideEnough && navigator.pdfViewerEnabled !== false;
}

export default function ThesisModal({ isOpen, onClose, thesisProject }) {
  const [embedPdf, setEmbedPdf] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      setEmbedPdf(canEmbedPdf());
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = '/docs/traffic-signal-thesis.pdf';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 dark:bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thesis-modal-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div
        className={`relative w-full flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0A0E17] shadow-2xl shadow-emerald-500/10 overflow-hidden z-10 ${
          embedPdf ? 'max-w-6xl h-[92vh] supports-[height:100dvh]:h-[92dvh]' : 'max-w-lg max-h-[92vh] supports-[height:100dvh]:max-h-[92dvh]'
        }`}
      >

        {/* Modal Toolbar Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">

          {/* Left Title & Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="thesis-modal-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate font-['Outfit']">
                  AI-Based Dynamic Traffic Signal Control System
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 shrink-0">
                  Thesis Paper
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                First-listed Author & Project Lead • AIUB CSE • YOLOv5 22-Class Architecture
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {embedPdf && (
              <>
                <a
                  href={pdfUrl}
                  download="traffic-signal-thesis-apurba-bhowal.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all"
                  title="Download Thesis PDF"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all"
                  title="Open in Full Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden sm:inline">Full Tab</span>
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-500/20 border border-slate-200 dark:border-slate-700 hover:border-rose-500/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
              aria-label="Close thesis viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Body */}
        {embedPdf ? (
          <div className="flex-1 w-full min-h-0 bg-slate-100 dark:bg-slate-950 relative">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              title="AI Traffic Signal Control Thesis - Apurba Bhowal"
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {thesisProject?.title || 'Undergraduate Thesis Paper'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PDF • about 2.3 MB • opens in your phone's PDF viewer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-transform"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Thesis PDF</span>
              </a>
              <a
                href={pdfUrl}
                download="traffic-signal-thesis-apurba-bhowal.pdf"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm active:scale-[0.98] transition-transform"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        )}

        {/* Modal Footer Banner */}
        <div className="hidden sm:flex px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800/80 flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>Undergraduate Thesis Project • American International University-Bangladesh (AIUB)</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400">YOLOv5 Multi-Class</span>
            <span>•</span>
            <span className="text-indigo-600 dark:text-indigo-400">Adaptive Signal Timing</span>
            <span>•</span>
            <span className="text-cyan-600 dark:text-cyan-400">Emergency Priority</span>
          </div>
        </div>

      </div>
    </div>
  );
}
