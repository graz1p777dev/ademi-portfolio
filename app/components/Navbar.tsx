'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../context';

const NAV_ITEMS = [
  { href: '#about', key: 'about' },
  { href: '#profile', key: 'profile' },
  { href: '#certificates', key: 'certificates' },
  { href: '#social', key: 'social' },
  { href: '#contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { data } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 border-b border-gold/10 ${
        scrolled ? 'py-2.5 shadow-[0_4px_40px_rgba(0,0,0,0.35)]' : 'py-4'
      }`} style={{ background: 'rgba(0,20,40,0.9)' }}>
        <Image src="/data/photo/brend-logo.png" alt="Demi Results" width={120} height={32} className="h-8 w-auto object-contain" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href} className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-medium hover:text-gold transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full">
              {data?.nav?.[item.key] ?? item.key}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center text-white/50 hover:text-gold transition-colors">
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
            style={{ background: 'rgba(0,20,40,0.97)' }}
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
                  className="text-sm tracking-[0.22em] uppercase text-white/60 font-medium hover:text-gold transition-colors"
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
