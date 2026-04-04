'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.75 } };

export default function About() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="about" className="py-24 px-6 bg-milk">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-18 items-center">
          <div>
            <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">{data.labels.about}</motion.span>
            <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.about.title}</motion.h2>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="font-display italic leading-relaxed text-text-main mb-8" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>{data.about.text}</motion.p>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.4 }} className="flex flex-wrap gap-2.5">
              {data.about.roles.map((role, i) => (
                <span key={role} className="px-4 py-2 border border-navy/14 rounded-full text-[11px] tracking-[0.06em] text-navy cursor-default hover:bg-navy hover:text-milk hover:border-navy hover:-translate-y-0.5 transition-all" style={{ animation: `chipGlow 4.5s ease-in-out infinite ${i * 0.75}s` }}>{role}</span>
              ))}
            </motion.div>
          </div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative aspect-[3/4] max-h-[480px] overflow-hidden rounded-sm before:content-[''] before:absolute before:-top-2.5 before:-right-2.5 before:w-20 before:h-20 before:border-t before:border-r before:border-gold/35 before:z-10 after:content-[''] after:absolute after:-bottom-2.5 after:-left-2.5 after:w-20 after:h-20 after:border-b after:border-l after:border-gold/35 after:z-10 group">
              <Image src="/data/photo/ademi-photo.png" alt={data.hero.name} width={420} height={560} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-800" />
            </div>
            <div className="absolute -bottom-4.5 -left-4.5 bg-navy text-gold px-5 py-4 text-center z-20" style={{ animation: 'accentPulse 4s ease-in-out infinite' }}>
              <span className="font-display text-3xl font-light block leading-none">&#8470;1</span>
              <span className="text-[9px] tracking-[0.22em] uppercase text-white/45 mt-1 block">в Кыргызстане</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
