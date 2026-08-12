'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../context';
import type { CertificateItem } from '../types';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

/** Уголок золотой рамки. Четыре штуки по углам собирают «итальянский» багет. */
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none absolute w-8 h-8 ${className}`} fill="none" aria-hidden>
      <path d="M1 39V9a8 8 0 0 1 8-8h30" stroke="url(#certGold)" strokeWidth="1.2" />
      <path d="M7 39V13a6 6 0 0 1 6-6h26" stroke="url(#certGold)" strokeWidth="0.6" opacity="0.55" />
      <circle cx="9" cy="9" r="1.6" fill="#c9a96e" />
    </svg>
  );
}

export default function Certificates() {
  const { data } = useLang();
  const [open, setOpen] = useState<CertificateItem | null>(null);

  // Лайтбокс перекрывает страницу целиком — прокрутка под ним не нужна,
  // иначе фон уезжает под открытым сертификатом.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Пока сертификаты не добавлены, секции на странице нет: пустой блок
  // с заголовком выглядел бы как недоделанный сайт.
  if (!data) return null;
  const certificates = data.certificates;
  if (!certificates?.items?.length) return null;

  return (
    <section id="certificates" className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #001e3c 0%, #00294f 100%)' }}>
      {/* Общий градиент золота для всех рамок на странице */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="certGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8d5b0" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#a68740" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1100px] mx-auto">
        <motion.span {...reveal} className="inline-flex items-center gap-3 text-[10px] tracking-[0.38em] uppercase text-gold mb-3.5 before:content-[''] before:w-5 before:h-px before:bg-gold">
          {data.labels.certificates ?? 'Сертификаты'}
        </motion.span>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="font-display font-light leading-tight text-milk" style={{ fontSize: 'clamp(34px, 7vw, 56px)' }}>
          {certificates.title}
        </motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="gold-line w-12 my-5" />
        {certificates.subtitle && (
          <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.25 }} className="text-white/40 text-sm max-w-xl">
            {certificates.subtitle}
          </motion.p>
        )}

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.items.map((item, i) => (
            <motion.button
              key={`${item.image}-${i}`}
              type="button"
              onClick={() => setOpen(item)}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
              className="group relative text-left cursor-zoom-in"
            >
              {/* Багет: внешняя золотая линия, внутренний волосок и уголки */}
              <div
                className="relative p-[9px] rounded-[3px] transition-all duration-700 group-hover:-translate-y-1.5"
                style={{
                  background: 'linear-gradient(150deg, rgba(232,213,176,0.5) 0%, rgba(201,169,110,0.22) 35%, rgba(166,135,64,0.42) 100%)',
                  boxShadow: '0 18px 44px -22px rgba(0,0,0,0.85)',
                }}
              >
                <div className="absolute inset-[3px] rounded-[2px] border border-gold/35 pointer-events-none" />
                <Corner className="top-1 left-1" />
                <Corner className="top-1 right-1 rotate-90" />
                <Corner className="bottom-1 right-1 rotate-180" />
                <Corner className="bottom-1 left-1 -rotate-90" />

                {/* Паспарту: документ лежит на кремовом поле целиком, без обрезки */}
                <div className="relative overflow-hidden rounded-[1px] bg-cream aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Блик по стеклу — идёт по диагонали при наведении */}
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-[1100ms] group-hover:left-[120%] group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent)' }}
                  />
                </div>
              </div>

              {/* Подпись: за что и когда */}
              <div className="pt-5">
                <h3 className="font-display text-milk font-normal leading-snug" style={{ fontSize: 'clamp(17px, 2.4vw, 21px)' }}>
                  {item.title}
                </h3>
                {item.issuer && (
                  <p className="mt-1.5 text-xs text-white/35 tracking-wide">{item.issuer}</p>
                )}
                {item.date && (
                  <p className="mt-2.5 inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-gold/80 before:content-[''] before:w-4 before:h-px before:bg-gold/50">
                    {item.date}
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Лайтбокс: сертификат целиком, чтобы можно было прочитать */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-5 cursor-zoom-out"
            style={{ background: 'rgba(0,10,22,0.92)', backdropFilter: 'blur(10px)' }}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/80 hover:text-gold hover:border-gold/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[88dvh] p-2.5 rounded-[3px] cursor-default"
              style={{ background: 'linear-gradient(150deg, rgba(232,213,176,0.55), rgba(166,135,64,0.45))' }}
            >
              <div className="relative bg-cream rounded-[2px] p-3">
                {/* Собственный размер неизвестен заранее, поэтому обычный img:
                    он сам подберёт высоту под пропорции документа. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={open.image} alt={open.title} className="max-w-[88vw] max-h-[76dvh] w-auto h-auto object-contain" />
              </div>
              <div className="pt-3.5 pb-1 px-1 text-center">
                <p className="font-display text-milk text-lg">{open.title}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-gold/75 mt-1.5">
                  {[open.issuer, open.date].filter(Boolean).join(' · ')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
