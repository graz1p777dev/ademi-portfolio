'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Contact() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="contact" className="py-24 px-6 text-center" style={{ background: '#001e3c' }}>
      <div className="max-w-[480px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center justify-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5">{data.labels.contact}</motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-milk" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.contact.title}</motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 mx-auto my-5" />
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="inline-flex items-start gap-2 text-xs text-white/28 tracking-wide leading-relaxed my-5">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {data.contact.address}
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.4 }} className="flex flex-col items-center gap-3 mt-5">
          <a href={data.contact.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-w-[260px] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium bg-gold text-navy rounded-sm hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(201,169,110,0.22)] transition-all">Telegram</a>
          <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-w-[260px] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">Instagram</a>
          {data.contact.whatsapp && (
            <a href={data.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-w-[260px] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all">WhatsApp</a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
