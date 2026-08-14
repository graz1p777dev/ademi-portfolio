'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Team() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="team" className="pb-24 px-6 bg-milk relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Team photo */}
        <motion.div {...reveal} className="relative w-full max-w-[700px] mx-auto mb-10 aspect-[16/9] rounded-sm overflow-hidden group">
          <div className="absolute -inset-px z-10 pointer-events-none border border-gold/10 rounded-sm" />
          <div className="absolute z-10 pointer-events-none w-16 h-16 -top-1 -left-1 border-t border-l border-gold/25" />
          <div className="absolute z-10 pointer-events-none w-16 h-16 -bottom-1 -right-1 border-b border-r border-gold/25" />
          <Image src="/data/photo/my-command.png" alt={data.team.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display italic text-text-main leading-relaxed text-center max-w-2xl mx-auto" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>
          {data.team.desc}
        </motion.p>
      </div>
    </section>
  );
}
