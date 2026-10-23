import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Check, GitBranch, Zap, Code2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// Snippets — every line is kept ≤ 32 characters so the editor fits a 320px phone
// ---------------------------------------------------------------------------
const buildSnippets = (liveSites) => [
  {
    file: 'apurba.js',
    lang: 'js',
    label: 'JavaScript',
    dot: 'bg-amber-400',
    lines: [
      'const developer = {',
      "  name: 'Apurba Bhowal',",
      "  role: 'Junior Developer',",
      "  company: 'BizMappers Ltd.',",
      "  stack: ['WordPress', 'PHP',",
      "    'WooCommerce', 'Python'],",
      `  liveSites: ${liveSites},`,
      '  openToWork: true,',
      '};',
      '',
      'deploy(developer);',
    ],
    command: 'npm run deploy',
    output: ['build passed', `${liveSites} client sites live`],
  },
  {
    file: 'traffic_ai.py',
    lang: 'py',
    label: 'Python',
    dot: 'bg-sky-400',
    lines: [
      'import yolov5',
      '',
      "model = yolov5.load('bd22.pt')",
      '',
      'for frame in camera.stream():',
      '    cars = model(frame)',
      "    if cars.has('ambulance'):",
      "        signal.priority('green')",
      '    else:',
      '        signal.adapt(cars.count)',
    ],
    command: 'python traffic_ai.py',
    output: ['22 vehicle classes loaded', 'emergency priority: on'],
  },
  {
    file: 'functions.php',
    lang: 'php',
    label: 'PHP',
    dot: 'bg-indigo-400',
    lines: [
      '<?php',
      "add_action('woocommerce_init',",
      '  function () {',
      '    speed_up_checkout();',
      '    recover_abandoned_carts();',
      '    track_conversions();',
      '  }',
      ');',
      '',
      '// faster stores, more sales',
    ],
    command: 'wp cache flush',
    output: ['store optimised', 'checkout ready'],
  },
];

const LINE_SLOTS = 11; // every snippet gets the same height, so nothing jumps when they switch

// ---------------------------------------------------------------------------
// Tiny syntax highlighter
// ---------------------------------------------------------------------------
const KEYWORDS = {
  js: ['const', 'let', 'true', 'false', 'function', 'return', 'new'],
  py: ['import', 'from', 'for', 'in', 'if', 'else', 'def', 'return', 'True', 'False'],
  php: ['function', 'return', 'true', 'false'],
};

const RE_SLASH_COMMENT = /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|(\S)/g;
const RE_HASH_COMMENT = /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|(\S)/g;

function tokenize(line, lang) {
  if (lang === 'php' && line.startsWith('<?php')) return [{ type: 'kw', text: line }];
  const re = lang === 'py' ? RE_HASH_COMMENT : RE_SLASH_COMMENT;
  const tokens = [];
  for (const match of line.matchAll(re)) {
    const [text, comment, str, num, ident, space] = match;
    let type = 'punc';
    if (comment) type = 'com';
    else if (str) type = 'str';
    else if (num) type = 'num';
    else if (ident) {
      const rest = line.slice(match.index + text.length);
      if (KEYWORDS[lang].includes(ident)) type = 'kw';
      else if (/^\s*\(/.test(rest)) type = 'fn';
      else if (lang === 'js' && /^\s*:/.test(rest)) type = 'prop';
      else type = 'plain';
    } else if (space) type = 'plain';
    tokens.push({ type, text });
  }
  return tokens;
}

const TOKEN_CLASS = {
  kw: 'text-fuchsia-600 dark:text-fuchsia-400',
  str: 'text-emerald-700 dark:text-emerald-300',
  num: 'text-amber-600 dark:text-amber-300',
  fn: 'text-sky-600 dark:text-sky-300',
  prop: 'text-indigo-600 dark:text-indigo-300',
  com: 'text-slate-400 dark:text-slate-500 italic',
  punc: 'text-slate-500 dark:text-slate-400',
  plain: 'text-slate-800 dark:text-slate-200',
};

// ---------------------------------------------------------------------------

function usePageVisible() {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || document.visibilityState !== 'hidden');
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

export default function CodeTerminal({ liveSites = 7 }) {
  const snippets = useMemo(() => {
    return buildSnippets(liveSites).map((s) => ({
      ...s,
      text: s.lines.join('\n'),
      tokenLines: s.lines.map((line) => tokenize(line, s.lang)),
    }));
  }, [liveSites]);

  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const pageVisible = usePageVisible();
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0); // 0 = typing, 1 = command shown, 2-3 = output lines shown

  const snippet = snippets[index];
  const total = snippet.text.length;
  const running = inView && pageVisible && !reduceMotion;

  // Reduced motion: show the finished file straight away
  useEffect(() => {
    if (reduceMotion) {
      setTyped(total);
      setStep(3);
    }
  }, [reduceMotion, total, index]);

  // The typing loop — one short timer at a time, paused while off-screen or in a background tab
  useEffect(() => {
    if (!running) return undefined;
    let timer;
    if (typed < total) {
      const { text } = snippet;
      let next = typed + 1;
      // Indentation appears in one go instead of space by space
      if (text[typed] === ' ' && (typed === 0 || text[typed - 1] === '\n')) {
        while (text[next] === ' ') next += 1;
      }
      const ch = text[typed];
      const delay = ch === '\n' ? 170 : /[,;{}()]/.test(ch) ? 70 : 24 + Math.random() * 40;
      timer = setTimeout(() => setTyped(next), delay);
    } else if (step < 3) {
      timer = setTimeout(() => setStep((s) => s + 1), step === 0 ? 450 : 420);
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % snippets.length);
        setTyped(0);
        setStep(0);
      }, 3800);
    }
    return () => clearTimeout(timer);
  }, [running, typed, total, step, snippet, snippets.length]);

  // On narrow screens the tab row scrolls sideways — keep the active file visible
  const tabsRef = useRef(null);
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.children[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft - 8;
    list.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [index, reduceMotion]);

  const openSnippet = (i) => {
    setIndex(i);
    setTyped(reduceMotion ? snippets[i].text.length : 0);
    setStep(reduceMotion ? 3 : 0);
  };

  // Where the cursor sits (for drawing it and for the "Ln, Col" status bar)
  let offset = 0;
  let cursorLine = 0;
  let cursorCol = 0;
  const visibleCounts = snippet.lines.map((line, i) => {
    const count = Math.max(0, Math.min(line.length, typed - offset));
    if (typed >= offset && typed <= offset + line.length) {
      cursorLine = i;
      cursorCol = typed - offset;
    }
    offset += line.length + 1;
    return count;
  });

  const progress = total ? typed / total : 0;
  const done = typed >= total;

  return (
    <div ref={rootRef} className="relative" role="group" aria-label="Animated code editor">
      {/* Soft glow behind the window (desktop only — blur is expensive on phones) */}
      <div className="hidden lg:block absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-indigo-500/20 blur-2xl -z-10" />

      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1020] shadow-2xl shadow-slate-900/10 dark:shadow-emerald-500/10 overflow-hidden">
        {/* Title bar + file tabs */}
        <div className="flex items-center gap-3 px-3 sm:px-4 pt-2.5 bg-slate-100 dark:bg-[#080C16] border-b border-slate-200 dark:border-slate-800">
          <div className="hidden sm:flex items-center gap-1.5 pb-2.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div ref={tabsRef} className="flex items-end gap-1 overflow-x-auto no-scrollbar -mb-px" role="tablist" aria-label="Code samples">
            {snippets.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.file}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => openSnippet(i)}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-t-lg border border-b-0 font-mono text-[11px] sm:text-xs transition-colors ${
                    active
                      ? 'bg-white dark:bg-[#0B1020] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                      : 'border-transparent text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
                  {s.file}
                </button>
              );
            })}
          </div>
        </div>

        {/* Typing progress */}
        <div className="h-0.5 bg-slate-100 dark:bg-slate-900" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 origin-left transition-transform duration-150 ease-linear"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {/* Code */}
        <div className="px-2 sm:px-4 py-3 sm:py-4 font-mono text-[11.5px] sm:text-[13px] leading-[1.75] overflow-hidden" aria-hidden="true">
          {Array.from({ length: LINE_SLOTS }).map((_, lineIdx) => {
            const tokens = snippet.tokenLines[lineIdx] || [];
            let remaining = visibleCounts[lineIdx] || 0;
            const showCursor = lineIdx === cursorLine;
            return (
              <div key={lineIdx} className="flex whitespace-pre min-h-[1.75em]">
                <span className="w-6 sm:w-8 shrink-0 pr-2 sm:pr-3 text-right text-slate-300 dark:text-slate-600 select-none">
                  {lineIdx + 1}
                </span>
                <span>
                  {tokens.map((tok, tIdx) => {
                    if (remaining <= 0) return null;
                    const text = tok.text.slice(0, remaining);
                    remaining -= text.length;
                    return (
                      <span key={tIdx} className={TOKEN_CLASS[tok.type]}>
                        {text}
                      </span>
                    );
                  })}
                  {showCursor && (
                    <span className={`inline-block w-[0.55em] h-[1.15em] -mb-[0.2em] ml-px bg-emerald-500 dark:bg-emerald-400 ${done ? 'animate-blink' : ''}`} />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Terminal output */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070A12] px-3 sm:px-4 py-2.5 font-mono text-[11px] sm:text-xs leading-relaxed min-h-[4.9rem]" aria-live="off">
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-emerald-600 dark:text-emerald-400">$</span>
            <span className="text-slate-700 dark:text-slate-300 truncate">{snippet.command}</span>
          </div>
          {snippet.output.map((line, i) => (
            <div
              key={line}
              className={`flex items-center gap-2 transition-all duration-300 ${step >= i + 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            >
              <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="text-slate-600 dark:text-slate-400 truncate">{line}</span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-1 bg-emerald-600 dark:bg-emerald-700 text-white/90 font-mono text-[10px] sm:text-[11px]">
          <span className="flex items-center gap-1.5">
            <GitBranch className="w-3 h-3" />
            main
          </span>
          <span className="flex items-center gap-3">
            <span>
              Ln {cursorLine + 1}, Col {cursorCol + 1}
            </span>
            <span className="hidden min-[400px]:inline">UTF-8</span>
            <span>{snippet.label}</span>
          </span>
        </div>
      </div>

      {/* Floating chips on the window corners (large screens only) */}
      <div className="hidden xl:flex absolute -left-6 -bottom-5 items-center gap-2 px-3 py-2 rounded-xl glass-panel text-xs font-mono text-slate-700 dark:text-slate-200 shadow-xl animate-float">
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        {liveSites} live sites
      </div>
      <div className="hidden xl:flex absolute -right-4 -top-4 items-center gap-2 px-3 py-2 rounded-xl glass-panel text-xs font-mono text-slate-700 dark:text-slate-200 shadow-xl animate-float [animation-delay:-3s]">
        <Code2 className="w-3.5 h-3.5 text-indigo-500" />
        Web Development Expert
      </div>
    </div>
  );
}
