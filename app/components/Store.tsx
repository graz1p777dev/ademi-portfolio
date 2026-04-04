'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Store() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="store" className="relative py-20 px-6 overflow-hidden" style={{ background: '#001e3c' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)' }} />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-18 items-center">
          <motion.div {...reveal} className="hidden lg:flex flex-col items-center gap-5">
            <div className="w-56 h-56 rounded-full overflow-hidden border border-gold/18">
              <Image src="/data/photo/demi-results.logo.png" alt="Demi Results" width={224} height={224} className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl text-white/35 font-light">{data.brand.name}</span>
          </motion.div>
          <div>
            <motion.div {...reveal} className="inline-block px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase font-semibold rounded-sm mb-5 text-navy" style={{ background: 'linear-gradient(90deg, #c9a96e 30%, #e8d5b0 50%, #c9a96e 70%)', backgroundSize: '300px 100%', animation: 'badgeSweep 4s ease-in-out infinite' }}>{data.store.badge}</motion.div>
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display italic text-milk leading-relaxed mb-4" style={{ fontSize: 'clamp(18px, 3.8vw, 25px)' }}>{data.store.desc}</motion.p>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="flex items-start gap-2 text-xs text-white/30 tracking-wide mb-9 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {data.store.address}
            </motion.div>
            <motion.a {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} href={data.contact.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium bg-gold text-navy rounded-sm hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(201,169,110,0.22)] transition-all">
              {data.store.cta} →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
