'use client';

import { motion } from 'framer-motion';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Mission() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="mission" className="py-24 px-6 bg-milk text-center">
      <div className="max-w-[680px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center justify-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5">{data.labels.mission}</motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.mission.title}</motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 mx-auto my-5" />
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="relative font-display italic leading-relaxed text-navy mb-13 px-2 before:content-['\201C'] before:absolute before:-top-14 before:-left-3.5 before:text-[150px] before:text-navy/[0.038] before:font-display before:leading-none before:pointer-events-none" style={{ fontSize: 'clamp(19px, 4.2vw, 26px)' }}>{data.mission.text}</motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {data.mission.values.map((v, i) => (
            <motion.div key={v} {...reveal} transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
              className="flex items-center gap-3 px-6 py-5 bg-cream rounded-sm text-left border-l-2 border-gold text-[13px] font-normal text-navy tracking-wide transition-all hover:bg-navy hover:text-milk hover:translate-x-1.5 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-gold/70 before:shrink-0"
              style={{ animation: `valueBorder 4s ease-in-out infinite ${i}s` }}
            >{v}</motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
