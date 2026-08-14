'use client';

import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Profile() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="profile" className="py-24 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">{data.labels.profile}</motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.profile.title}</motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="font-display italic leading-relaxed text-text-main max-w-2xl" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>{data.profile.desc}</motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.4 }} className="mt-11 max-w-2xl bg-milk border border-navy/[0.06] rounded-sm p-8">
          <Gift className="w-8 h-8 text-gold/90 mb-4" />
          <div className="font-display text-lg font-medium text-navy mb-2">{data.profile.notesTitle}</div>
          <div className="text-xs text-text-muted leading-relaxed">{data.profile.notesNote}</div>
        </motion.div>
      </div>
    </section>
  );
}
