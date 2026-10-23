import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Types a word, pauses, deletes it, moves on to the next one
export default function TypingText({ words, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || !inView) return undefined;
    const word = words[wordIdx];
    let timer;
    if (!deleting && length < word.length) {
      timer = setTimeout(() => setLength((n) => n + 1), 55 + Math.random() * 45);
    } else if (!deleting) {
      timer = setTimeout(() => setDeleting(true), 1900);
    } else if (length > 0) {
      timer = setTimeout(() => setLength((n) => n - 1), 28);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }, 250);
    }
    return () => clearTimeout(timer);
  }, [length, deleting, wordIdx, words, reduceMotion, inView]);

  const text = reduceMotion ? words[0] : words[wordIdx].slice(0, length);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="inline-block w-[2px] h-[1.1em] -mb-[0.2em] ml-0.5 bg-emerald-500 dark:bg-emerald-400 animate-blink" />
      </span>
    </span>
  );
}
