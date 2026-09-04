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
    <svg viewBox="0 0 40 40" className={`pointer-events-none absolute w-9 h-9 ${className}`} fill="none" aria-hidden>
      <path d="M1 39V9a8 8 0 0 1 8-8h30" stroke="url(#certGold)" strokeWidth="1.2" />
      <path d="M7 39V13a6 6 0 0 1 6-6h26" stroke="url(#certGold)" strokeWidth="0.6" opacity="0.55" />
      <path d="M1 39V9a8 8 0 0 1 8-8h30" stroke="url(#certGold)" strokeWidth="4" opacity="0.08" />
      <circle cx="9" cy="9" r="2.2" fill="url(#certGold)" />
      <circle cx="9" cy="9" r="2.2" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.5" />
    </svg>
  );
}

/** Восковая печать с лавром — знак подлинности в углу карточки. */
function Seal() {
  return (
    <svg viewBox="0 0 44 44" className="pointer-events-none absolute -top-3 -right-3 w-11 h-11 z-20 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" aria-hidden>
      <circle cx="22" cy="22" r="19" fill="url(#certGold)" />
      <circle cx="22" cy="22" r="19" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.75" />
      <circle cx="22" cy="22" r="15.5" fill="none" stroke="#001e3c" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <path d="M22 13.5l2.1 4.6 5 .6-3.7 3.5.95 5-4.35-2.5-4.35 2.5.95-5-3.7-3.5 5-.6z" fill="#001e3c" fillOpacity="0.82" />
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
    <section id="certificates" className="relative py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #001e3c 0%, #00294f 100%)' }}>
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

      {/* Мягкое золотое свечение по центру секции — задаёт премиальную атмосферу */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 8%, rgba(201,169,110,0.1) 0%, transparent 65%)' }} />

      <div className="relative max-w-[1100px] mx-auto">
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

        <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.items.map((item, i) => (
            <motion.button
              key={`${item.image}-${i}`}
              type="button"
              onClick={() => setOpen(item)}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative text-left cursor-zoom-in"
            >
              {/* Печать подлинности — выступает за край рамки */}
              <motion.div variants={{ rest: { scale: 1, rotate: -8 }, hover: { scale: 1.08, rotate: 0 } }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <Seal />
              </motion.div>

              {/* Багет: внешняя золотая линия, внутренний волосок и уголки */}
              <motion.div
                variants={{
                  rest: { y: 0, boxShadow: '0 24px 50px -20px rgba(0,0,0,0.9), 0 2px 0 0 rgba(255,255,255,0.15) inset, 0 -2px 6px 0 rgba(0,0,0,0.3) inset, 0 0 0 rgba(201,169,110,0)' },
                  hover: { y: -7, boxShadow: '0 32px 60px -18px rgba(0,0,0,0.92), 0 2px 0 0 rgba(255,255,255,0.15) inset, 0 -2px 6px 0 rgba(0,0,0,0.3) inset, 0 0 32px 4px rgba(201,169,110,0.35)' },
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative p-[10px] rounded-[4px]"
                style={{ background: 'linear-gradient(155deg, #f3e4c4 0%, #d8b878 22%, #a97f3f 55%, #e8d5b0 78%, #b8955c 100%)' }}
              >
                <div className="absolute inset-[4px] rounded-[2px] border border-gold-dark/40 pointer-events-none" />
                <div className="absolute inset-[6px] rounded-[2px] border border-white/25 pointer-events-none" />
                <Corner className="top-1 left-1" />
                <Corner className="top-1 right-1 rotate-90" />
                <Corner className="bottom-1 right-1 rotate-180" />
                <Corner className="bottom-1 left-1 -rotate-90" />

                {/* Паспарту: документ лежит на кремовом поле целиком, без обрезки */}
                <div className="relative overflow-hidden rounded-[1px] bg-cream aspect-[3/4]" style={{ boxShadow: 'inset 0 0 24px rgba(0,0,0,0.16), inset 0 2px 6px rgba(0,0,0,0.12)' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-3.5 transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-4 -rotate-[22deg] scale-125 opacity-[0.22] mix-blend-multiply">
                    {Array.from({ length: 8 }).map((_, watermarkIndex) => (
                      <span key={watermarkIndex} className="flex items-center justify-center whitespace-nowrap text-[9px] font-semibold tracking-[0.18em] text-navy/70">ademi-portfolio.vercel.app</span>
                    ))}
                  </div>
                  {/* Виньетка по краям паспарту — глубина, как у настоящего стекла в раме */}
                  <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 36px 6px rgba(30,20,5,0.14)' }} />
                  {/* Блик по стеклу — идёт по диагонали при наведении */}
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-[1100ms] group-hover:left-[120%] group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
                  />
                </div>
              </motion.div>

              {/* Подпись: за что и когда */}
              <div className="pt-6 px-0.5">
                <div className="w-7 h-px mb-3 opacity-70 transition-all duration-500 group-hover:w-12" style={{ background: 'linear-gradient(90deg, #c9a96e, transparent)' }} />
                <h3 className="font-display text-milk font-normal leading-snug" style={{ fontSize: 'clamp(17px, 2.4vw, 21px)' }}>
                  {item.title}
                </h3>
                {item.issuer && (
                  <p className="mt-2 text-xs text-white/40 tracking-wide italic">{item.issuer}</p>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {certificates.note && (
          <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="mt-12 text-white/30 text-xs max-w-xl">
            {certificates.note}
          </motion.p>
        )}
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
