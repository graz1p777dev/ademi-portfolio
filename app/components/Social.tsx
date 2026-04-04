'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Store as StoreIcon } from 'lucide-react';
import { useLang } from '../context';

function InstagramIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ icon, size = 26 }: { icon: string; size?: number }) {
  const s = { width: size, height: size };
  if (icon === 'telegram') return <Send className="text-gold" style={s} />;
  if (icon === 'instagram') return <InstagramIcon size={size} />;
  if (icon === 'whatsapp') return <Phone className="text-gold" style={s} />;
  return <StoreIcon className="text-gold" style={s} />;
}

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Social() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="social" className="py-24 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">{data.labels.social}</motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-navy" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>{data.labels.socialTitle}</motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-11">
          {data.social.map((s, i) => (
            <SocialCard key={s.platform} s={s} i={i} openLabel={data.labels.openLink} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialCard({ s, i, openLabel }: { s: { platform: string; handle: string; url: string; icon: string }; i: number; openLabel: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      {...reveal} transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
      href={s.url} target="_blank" rel="noopener noreferrer"
      className="relative flex flex-col items-center gap-3.5 px-6 py-10 bg-milk border border-navy/[0.07] rounded-sm overflow-hidden transition-shadow"
      style={{ animation: `socialBreath 5.5s ease-in-out infinite ${i * 1.85}s` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-navy z-0" style={{ clipPath: hovered ? 'ellipse(160% 160% at 44% 100%)' : 'ellipse(72% 0% at 44% 112%)', transition: 'clip-path 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)', willChange: 'clip-path' }} />
      <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-colors ${hovered ? 'bg-white/8' : 'bg-cream'}`}>
        <SocialIcon icon={s.icon} />
      </div>
      <div className={`relative z-10 text-[9px] tracking-[0.34em] uppercase transition-colors ${hovered ? 'text-gold-light' : 'text-gold'}`}>{s.platform}</div>
      <div className={`relative z-10 font-display text-xl text-center leading-tight transition-colors ${hovered ? 'text-milk' : 'text-navy'}`}>{s.handle}</div>
      <div className={`relative z-10 text-[10px] tracking-[0.18em] uppercase transition-colors ${hovered ? 'text-gold' : 'text-text-muted'}`}>{openLabel}</div>
    </motion.a>
  );
}
