'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { PortfolioData, Lang } from './types';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  data: PortfolioData | null;
}

const LangContext = createContext<LangContextType>({ lang: 'ru', setLang: () => {}, data: null });

const FILES: Record<Lang, string> = {
  ru: '/data/text/data.json',
  en: '/data/text/english-data.json',
  kg: '/data/text/kg-data.json',
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');
  const [cache, setCache] = useState<Record<string, PortfolioData>>({});
  const data = cache[lang] ?? null;

  useEffect(() => {
    if (cache[lang]) return;
    fetch(FILES[lang])
      .then(r => r.json())
      .then(d => setCache(prev => ({ ...prev, [lang]: d })));
  }, [lang, cache]);

  // Preload all languages
  useEffect(() => {
    Object.entries(FILES).forEach(([key, url]) => {
      if (!cache[key]) {
        fetch(url).then(r => r.json()).then(d => setCache(prev => ({ ...prev, [key]: d })));
      }
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, data }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
