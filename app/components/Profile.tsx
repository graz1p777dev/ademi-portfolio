'use client';

import { motion } from 'framer-motion';
import { Stethoscope, GraduationCap, Sparkles, Beaker, Users, MapPin } from 'lucide-react';
import { useLang } from '../context';

const ICONS: Record<string, React.ElementType> = {
  stethoscope: Stethoscope, 'graduation-cap': GraduationCap, sparkles: Sparkles, beaker: Beaker, users: Users, 'map-pin': MapPin,
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-11">
          {data.profile.cards.map((card, i) => {
            const Icon = ICONS[card.icon] || Sparkles;
            return (
              <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
                className="relative bg-milk border border-navy/[0.06] rounded-sm p-7 overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,30,60,0.1)] before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent before:scale-x-0 before:transition-transform before:duration-500 hover:before:scale-x-100"
                style={{ animation: `cardBreath 5s ease-in-out infinite ${i * 0.85}s` }}
              >
                <Icon className="w-8 h-8 text-gold/90 mb-4" />
                <div className="font-display text-lg font-medium text-navy mb-2">{card.title}</div>
                <div className="text-xs text-text-muted leading-relaxed">{card.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
