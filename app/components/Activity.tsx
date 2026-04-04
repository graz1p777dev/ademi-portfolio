'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Activity() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="activity" className="py-24 px-6" style={{ background: '#001e3c' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">{data.labels.activity}</motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-milk" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.activity.title}</motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
        <div className="mt-11">
          {data.activity.items.map((item, i) => (
            <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.07 }}
              className="group relative grid grid-cols-[52px_1fr_28px] items-center gap-5 py-6 px-4 -mx-4 border-b border-white/[0.06] first:border-t rounded-sm cursor-default"
              style={{ transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.6s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(16px)'; e.currentTarget.style.background = 'rgba(201,169,110,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="font-display text-[13px] text-gold/60 font-light tracking-wide" style={{ animation: `numGlow 3.8s ease-in-out infinite ${i * 0.63}s` }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="font-display text-milk font-normal mb-1" style={{ fontSize: 'clamp(18px, 3vw, 22px)' }}>{item.title}</div>
                <div className="text-xs text-white/32 tracking-wide">{item.desc}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gold transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 -translate-x-3 group-hover:opacity-70 group-hover:translate-x-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
