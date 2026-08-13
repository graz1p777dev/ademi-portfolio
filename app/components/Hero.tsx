'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useLang } from '../context';

function Particles() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.childElementCount > 0) return;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      const size = 1.5 + Math.random() * 2;
      p.style.cssText = `position:absolute;border-radius:50%;background:#c9a96e;opacity:0;will-change:transform,opacity;left:${Math.random()*100}%;bottom:${5+Math.random()*40}%;width:${size}px;height:${size}px;animation:floatParticle ${6+Math.random()*9}s ease-in-out infinite ${Math.random()*7}s;`;
      ref.current.appendChild(p);
    }
  }, []);
  return <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Hero() {
  const { data } = useLang();
  if (!data) return null;
  const { hero } = data;
  const parts = (hero.subtitle || '').split(/\s*\|\s*/).filter(Boolean);

  return (
    <section id="hero" className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center" style={{ background: '#001e3c' }}>
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(201,169,110,0.11) 0%, transparent 65%), radial-gradient(ellipse 55% 80% at 10% 110%, rgba(0,41,79,0.9) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
      <Particles />

      {/* Corner brackets */}
      {['top-22 left-10 border-t border-l', 'top-22 right-10 border-t border-r', 'bottom-16 left-10 border-b border-l', 'bottom-16 right-10 border-b border-r'].map((cls, i) => (
        <motion.div key={i} className={`absolute w-14 h-14 border-gold/[0.18] hidden md:block ${cls}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} />
      ))}

      {/* Photo */}
      <motion.div className="relative w-48 h-48 mb-9" {...fadeUp(0.3)}>
        <div className="absolute -inset-5 rounded-full border border-gold/[0.18]" style={{ animation: 'spinCCW 14s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-gold shadow-[0_0_14px_3px_rgba(201,169,110,0.7)]" />
        </div>
        <div className="absolute -inset-[5px] rounded-full" style={{ background: 'conic-gradient(from 0deg, #c9a96e 0%, transparent 25%, rgba(201,169,110,0.05) 40%, transparent 55%, #e8d5b0 75%, #c9a96e 100%)', animation: 'spinCW 5s linear infinite' }}>
          <div className="absolute inset-[3px] rounded-full bg-navy" />
        </div>
        <Image src="/data/photo/ademi-avatar.png" alt={hero.name} width={192} height={192} className="w-48 h-48 rounded-full object-cover relative z-10" priority />
      </motion.div>

      <motion.div className="text-[10px] tracking-[0.38em] uppercase text-gold mb-2" {...fadeUp(0.5)}>{parts[0] || ''}</motion.div>
      <motion.h1 className="font-cursive text-milk leading-none" style={{ fontSize: 'clamp(54px, 13vw, 80px)', textShadow: '0 0 100px rgba(201,169,110,0.2)' }} {...fadeUp(0.65)}>{hero.name}</motion.h1>

      {parts.length > 1 && (
        <motion.div className="flex items-center gap-2.5 flex-wrap justify-center mt-3 text-[10px] tracking-[0.22em] uppercase text-white/45" {...fadeUp(0.8)}>
          {parts.slice(1).map((p, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-gold/60" />}
              {p}
            </span>
          ))}
        </motion.div>
      )}

      <motion.p className="mt-6 font-display italic text-white/80 max-w-lg leading-relaxed" style={{ fontSize: 'clamp(19px, 4.5vw, 27px)' }} {...fadeUp(0.95)}>
        {hero.tagline && `\u00AB\u202F${hero.tagline}\u202F\u00BB`}
      </motion.p>
      <motion.p className="mt-2.5 text-[11px] tracking-[0.18em] text-gold" {...fadeUp(1.05)}>{hero.slogan}</motion.p>
      <motion.div className="flex items-center gap-1.5 mt-3.5 text-[11px] tracking-[0.1em] text-white/28" {...fadeUp(1.12)}>
        <MapPin className="w-[13px] h-[13px]" /> {hero.location}
      </motion.div>

      <motion.div className="w-px h-13 mx-auto my-7" style={{ background: 'linear-gradient(180deg, transparent, #c9a96e 50%, transparent)' }} {...fadeUp(1.18)} />

      <motion.div className="flex gap-3.5 flex-wrap justify-center" {...fadeUp(1.28)}>
        <a href={hero.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium bg-gold text-navy rounded-sm hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(201,169,110,0.22)] transition-all">Telegram</a>
        <a href={hero.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">Instagram</a>
        {hero.whatsapp && (
          <a href={hero.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">WhatsApp</a>
        )}
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5" {...fadeUp(2)}>
        <span className="text-[9px] tracking-[0.32em] uppercase text-white/20">Scroll</span>
        <div className="w-px h-11" style={{ background: 'linear-gradient(180deg, #c9a96e 0%, transparent 100%)', animation: 'scrollDrop 2.2s ease infinite' }} />
      </motion.div>
    </section>
  );
}
