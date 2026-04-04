'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Crown, Heart, Headphones } from 'lucide-react';
import { useLang } from '../context';

const ICONS = [Crown, Heart, Headphones];

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Team() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="team" className="py-24 px-6 bg-milk relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">
          {data.labels.team}
        </motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>
          {data.team.title}
        </motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />

        {/* Team photo */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.25 }} className="relative w-full max-w-[700px] mx-auto mb-14 aspect-[16/9] rounded-sm overflow-hidden group">
          <div className="absolute -inset-px z-10 pointer-events-none border border-gold/10 rounded-sm" />
          <div className="absolute z-10 pointer-events-none w-16 h-16 -top-1 -left-1 border-t border-l border-gold/25" />
          <div className="absolute z-10 pointer-events-none w-16 h-16 -bottom-1 -right-1 border-b border-r border-gold/25" />
          <Image src="/data/photo/my-command.png" alt={data.team.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="font-display italic text-text-main leading-relaxed text-center max-w-2xl mx-auto mb-14" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>
          {data.team.desc}
        </motion.p>

        {/* Members grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.team.members.map((member, i) => {
            const Icon = ICONS[i] || Heart;
            return (
              <motion.div
                key={i}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 * (i + 1) }}
                className="relative bg-white border border-navy/[0.06] rounded-sm p-8 text-center overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,30,60,0.08)] before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent before:scale-x-0 before:transition-transform before:duration-500 hover:before:scale-x-100"
                style={{ animation: `cardBreath 5s ease-in-out infinite ${i * 0.85}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-gold/80" />
                </div>
                <div className="font-display text-lg font-medium text-navy mb-1">{member.name}</div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-gold mb-3">{member.role}</div>
                <div className="text-xs text-text-muted leading-relaxed">{member.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
