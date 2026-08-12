'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../context';

const NAV_ITEMS = [
  { href: '#about', key: 'about' },
  { href: '#profile', key: 'profile' },
  { href: '#team', key: 'team' },
  { href: '#activity', key: 'activity' },
  { href: '#certificates', key: 'certificates' },
  { href: '#social', key: 'social' },
  { href: '#contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { data } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const heroHeightRef = useRef(0);

  // Обновляем высоту hero
  useEffect(() => {
    const updateHeroHeight = () => {
      const hero = document.querySelector('#hero');
      if (hero) {
        heroHeightRef.current = hero.clientHeight;
      }
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    return () => window.removeEventListener('resize', updateHeroHeight);
  }, []);

  // Обновляем состояние при скролле
  useEffect(() => {
    const handleScroll = () => {
      setIsDarkBackground(window.scrollY < heroHeightRef.current - 80);
    };

    handleScroll(); // Вызываем сразу при монтировании
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColorClass = isDarkBackground ? 'text-white/50 hover:text-gold' : 'text-blue-900/60 hover:text-blue-600';
  const mobileMenuBg = isDarkBackground ? 'rgba(0,20,40,0.97)' : 'rgba(255,255,255,0.98)';
  const navbarBg = isDarkBackground ? 'rgba(0,20,40,0.9)' : 'rgba(255,255,255,0.85)';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
        isDarkBackground ? 'border-b border-gold/10' : 'border-b border-blue-200/30'
      } ${
        scrolled ? 'py-2.5 shadow-[0_4px_40px_rgba(0,0,0,0.35)]' : 'py-4'
      }`} style={{ background: navbarBg }}>
        <Image src="/data/photo/brend-logo.png" alt="Demi Results" width={120} height={32} className="h-8 w-auto object-contain" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href} className={`text-[10px] tracking-[0.22em] uppercase font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${
              isDarkBackground
                ? 'text-white/50 hover:text-gold after:bg-gold'
                : 'text-blue-900/60 hover:text-blue-600 after:bg-blue-600'
            }`}>
              {data?.nav?.[item.key] ?? item.key}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden w-9 h-9 flex items-center justify-center transition-colors ${
            isDarkBackground
              ? 'text-white/50 hover:text-gold'
              : 'text-blue-900/60 hover:text-blue-600'
          }`}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: mobileMenuBg }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className={`text-sm tracking-[0.22em] uppercase font-medium transition-colors ${
                    isDarkBackground
                      ? 'text-white/60 hover:text-gold'
                      : 'text-blue-900/70 hover:text-blue-600'
                  }`}
                >
                  {data?.nav?.[item.key] ?? item.key}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
