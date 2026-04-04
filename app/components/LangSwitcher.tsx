'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context';
import type { Lang } from '../types';

const LANGS: { key: Lang; label: string }[] = [
  { key: 'ru', label: 'RU' },
  { key: 'en', label: 'EN' },
  { key: 'kg', label: 'KG' },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, height: 0 });

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector(`[data-lang="${lang}"]`) as HTMLElement;
    if (activeBtn && containerRef.current) {
      const cr = containerRef.current.getBoundingClientRect();
      const br = activeBtn.getBoundingClientRect();
      setPill({ left: br.left - cr.left, width: br.width, height: br.height });
    }
  }, [lang]);

  return (
    <div ref={containerRef} className="relative flex items-center rounded-full border border-gold/20 bg-white/5 p-[3px]">
      <motion.div
        className="absolute top-[3px] rounded-full z-0"
        style={{ background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)', boxShadow: '0 2px 14px rgba(201,169,110,0.35)' }}
        animate={{ left: pill.left, width: pill.width, height: pill.height }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
      {LANGS.map(l => (
        <button
          key={l.key}
          data-lang={l.key}
          onClick={() => setLang(l.key)}
          className={`relative z-10 px-3.5 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium rounded-full transition-colors select-none ${
            lang === l.key ? 'text-navy font-semibold' : 'text-white/35 hover:text-white/65'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
