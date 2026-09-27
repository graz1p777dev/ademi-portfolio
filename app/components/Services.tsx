'use client';

import { motion } from 'framer-motion';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Services() {
  const { data } = useLang();
  if (!data?.services) return null;

  return (
    <section id="services" aria-labelledby="services-title" className="py-24 px-6 bg-milk">
      <div className="max-w-[1100px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">
          {data.labels.services ?? 'Направления работы'}
        </motion.span>
        <motion.h2 id="services-title" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>
          {data.services.title}
        </motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="font-display italic leading-relaxed text-text-main max-w-3xl" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>
          {data.services.intro}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
          {data.services.items.map((item, i) => (
            <motion.article key={item.name} {...reveal} transition={{ ...reveal.transition, delay: 0.08 * (i + 1) }} className="bg-cream border border-navy/[0.06] rounded-sm p-6">
              <div className="w-7 h-px bg-gold mb-5" />
              <h3 className="font-display text-xl text-navy leading-snug mb-2">{item.name}</h3>
              <p className="text-sm leading-relaxed text-text-main">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
