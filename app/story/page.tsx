'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

/* ── Story slides ── */
const STORY_SLIDES = [
  { year: '2018', title: 'Мечта', text: 'Я всегда знала, что хочу помогать людям чувствовать себя уверенно. Ещё в университете я начала изучать дерматологию глубже, чем требовала программа.', img: '/data/story/page1.1.png' },
  { year: '2019', title: 'Первые шаги', text: 'Первые консультации, первые результаты, первые благодарные отзывы. Именно тогда я поняла — это не просто профессия, это призвание.', img: '/data/story/page1.2.png' },
  { year: '2020', title: 'Пандемия и рост', text: 'Когда мир остановился, я начала вести блог. Мифы о коже, разборы средств, честные рекомендации. Люди стали доверять.', img: '/data/story/page1.3.png' },
  { year: '2021', title: 'Рождение Demi Results', text: 'Идея пришла ночью: создать место, где каждый сможет получить профессиональный уход, подобранный экспертом. Так появился Demi Results.', img: '/data/story/page1.4.png' },
  { year: '2021', title: 'Первый магазин', text: 'Маленькая точка в Бишкеке. Три полки, сто средств и огромная вера в то, что качественный уход доступен каждому.', img: '/data/story/page1.5.png' },
  { year: '2022', title: 'Обучение экспертов', text: 'Я поняла: одного меня недостаточно. Нужна команда, которая разделяет мои ценности. Начала обучать skin-экспертов лично.', img: '/data/story/page1.6.png' },
  { year: '2023', title: '№1 в Кыргызстане', text: 'Demi Results стал самым узнаваемым магазином профессионального ухода в стране. Не маркетинг — а реальные результаты клиентов.', img: '/data/story/page1.7.png' },
  { year: '2023', title: 'Ординатура', text: 'Параллельно с бизнесом я углубляла медицинские знания. Ординатура по дерматовенерологии — чтобы каждый совет был подкреплён наукой.', img: '/data/story/page1.8.png' },
  { year: '2024', title: 'Системный подход', text: 'Медицина + бизнес + образование. Три столпа, на которых стоит всё, что я делаю. Каждый день я помогаю людям понять свою кожу.', img: '/data/story/page1.9.png' },
  { year: '2025', title: 'Что дальше?', text: 'Масштабирование. Новые продукты. Онлайн-платформа обучения. Миссия не меняется — красота через знания, здоровье через науку.', img: '/data/story/page1.10.png' },
];

/* ── Demi Values ── */
const VALUES_SLIDES = [
  { title: 'Наука', text: 'Каждый совет основан на доказательной медицине, а не на трендах из TikTok.', img: '/data/story/page2.1.png' },
  { title: 'Индивидуальность', text: 'Нет универсального ухода. Есть ваш личный путь к здоровой коже.', img: '/data/story/page2.2.png' },
  { title: 'Честность', text: 'Мы не продаём мечты. Мы показываем реальные результаты и говорим правду.', img: '/data/story/page2.3.png' },
  { title: 'Профессионализм', text: 'Каждый skin-эксперт Demi Results обучен лично дерматологом.', img: '/data/story/page2.4.png' },
  { title: 'Доступность', text: 'Качественный уход не должен быть роскошью. Мы подбираем лучшее в каждом бюджете.', img: '/data/story/page2.5.png' },
  { title: 'Системность', text: 'Красивая кожа — это не один крем. Это система: питание, уход, образ жизни.', img: '/data/story/page2.6.png' },
  { title: 'Доверие', text: 'Тысячи клиентов выбирают нас не из-за рекламы, а из-за результатов.', img: '/data/story/page2.7.png' },
  { title: 'Образование', text: 'Мы не просто продаём — мы учим. Каждый клиент уходит с новыми знаниями.', img: '/data/story/page2.8.png' },
  { title: 'Миссия', text: 'Красота через знания, здоровье через науку. Это не слоган — это философия.', img: '/data/story/page2.9.png' },
];

/* ── Graph data ── */
const GRAPH_DATA = [
  { year: '2018', business: 5,  study: 70, family: 60, rest: 50 },
  { year: '2019', business: 15, study: 75, family: 55, rest: 40 },
  { year: '2020', business: 30, study: 65, family: 60, rest: 30 },
  { year: '2021', business: 55, study: 60, family: 65, rest: 20 },
  { year: '2022', business: 70, study: 55, family: 70, rest: 15 },
  { year: '2023', business: 85, study: 50, family: 75, rest: 10 },
  { year: '2024', business: 92, study: 45, family: 80, rest: 8 },
  { year: '2025', business: 98, study: 40, family: 85, rest: 5 },
];

/* ── Progress bar ── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-20">
      <motion.div
        className="h-full"
        style={{ background: 'linear-gradient(90deg, #c9a96e, #e8d5b0)' }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

/* ── Slide wrapper ── */
function Slide({ children, bg = 'navy' }: { children: React.ReactNode; bg?: string }) {
  const bgStyle = bg === 'navy' ? '#001e3c' : bg === 'cream' ? '#faf8f4' : bg;
  return (
    <div className="story-slide relative flex flex-col items-center justify-center px-8 md:px-16 overflow-hidden" style={{ background: bgStyle }}>
      {children}
    </div>
  );
}

/* ── Photo with decorative frame ── */
function SlidePhoto({ src, alt, variant = 'right' }: { src: string; alt: string; variant?: 'right' | 'left' | 'center' | 'bg' }) {
  if (variant === 'bg') {
    return (
      <div className="absolute inset-0 z-0">
        <Image src={src} alt={alt} fill className="object-cover opacity-[0.07]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,30,60,0.6) 0%, rgba(0,30,60,0.95) 100%)' }} />
      </div>
    );
  }

  if (variant === 'center') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 mx-auto border border-gold/20 shadow-[0_0_40px_rgba(201,169,110,0.15)]"
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    );
  }

  const isLeft = variant === 'left';
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className={`relative w-full max-w-[200px] md:max-w-[260px] aspect-[3/4] rounded-sm overflow-hidden shrink-0 ${isLeft ? 'order-first' : 'order-last'}`}
    >
      <div className="absolute -inset-px z-10 pointer-events-none border border-gold/15 rounded-sm" />
      <div className={`absolute z-10 pointer-events-none w-12 h-12 border-gold/25 ${isLeft ? '-top-1 -left-1 border-t border-l' : '-bottom-1 -right-1 border-b border-r'}`} />
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
    </motion.div>
  );
}

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 1 + STORY_SLIDES.length + 1 + 1 + VALUES_SLIDES.length + 1; // intro + stories + graph + values-header + values + cta

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollLeft / container.clientWidth);
      setCurrentSlide(idx);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (dir: 'next' | 'prev') => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.clientWidth;
    container.scrollTo({ left: container.scrollLeft + (dir === 'next' ? w : -w), behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scrollTo('next');
      if (e.key === 'ArrowLeft') scrollTo('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden">
      <ProgressBar current={currentSlide} total={totalSlides} />

      {/* Nav buttons */}
      <button onClick={() => scrollTo('prev')} className="fixed left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button onClick={() => scrollTo('next')} className="fixed right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-gold hover:bg-white/10 transition-all">
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Back button */}
      <Link href="/" className="fixed top-5 left-5 z-30 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-gold transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Назад
      </Link>

      {/* Slide counter */}
      <div className="fixed top-5 right-5 z-30 text-[10px] tracking-[0.2em] text-white/20">
        {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </div>

      <div ref={containerRef} className="story-container h-full">

        {/* ═══ Intro slide ═══ */}
        <Slide>
          <SlidePhoto src="/data/story/page1.0.png" alt="Intro" variant="bg" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative z-10 text-center max-w-lg">
            <span className="text-[10px] tracking-[0.38em] uppercase text-gold block mb-4">Demi Results</span>
            <h1 className="font-display font-light text-milk leading-tight mb-6" style={{ fontSize: 'clamp(38px, 9vw, 64px)' }}>
              Как всё<br />начиналось
            </h1>
            <div className="gold-line w-16 mx-auto mb-6" />
            <p className="font-display italic text-white/50 text-lg">Листайте вправо, чтобы узнать историю</p>
            <motion.div className="mt-8 text-gold/40" animate={{ x: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="w-6 h-6 mx-auto" />
            </motion.div>
          </motion.div>
        </Slide>

        {/* ═══ Story slides ═══ */}
        {STORY_SLIDES.map((slide, i) => {
          const photoSide = i % 2 === 0 ? 'right' : 'left';
          return (
            <Slide key={`story-${i}`} bg={i % 2 === 0 ? 'navy' : '#00294f'}>
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-4xl w-full ${photoSide === 'left' ? 'md:flex-row-reverse' : ''}`}>
                {/* Text side */}
                <div className="flex-1 text-center md:text-left">
                  <motion.span
                    className="font-display text-[60px] md:text-[90px] font-light leading-none block mb-1"
                    style={{ color: 'rgba(201,169,110,0.1)' }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    {slide.year}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  >
                    <h2 className="font-display text-2xl md:text-4xl font-light text-milk mb-3">{slide.title}</h2>
                    <div className="gold-line w-10 mb-4 mx-auto md:mx-0" />
                    <p className="font-display italic text-white/55 leading-relaxed text-base md:text-lg">{slide.text}</p>
                  </motion.div>
                  {/* Dots */}
                  <div className="mt-6 flex gap-1.5 justify-center md:justify-start">
                    {STORY_SLIDES.map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full transition-colors ${j === i ? 'bg-gold' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
                {/* Photo side */}
                <SlidePhoto src={slide.img} alt={slide.title} variant={photoSide} />
              </div>
            </Slide>
          );
        })}

        {/* ═══ Graph slide ═══ */}
        <Slide bg="#00294f">
          <SlidePhoto src="/data/story/graph.png" alt="Graph" variant="bg" />
          <div className="w-full max-w-3xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8">
              <span className="text-[10px] tracking-[0.38em] uppercase text-gold block mb-3">Аналитика</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-milk">Мой путь в цифрах</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="w-full h-[300px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={GRAPH_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: '#001e3c', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 4, fontSize: 12 }}
                    labelStyle={{ color: '#c9a96e' }}
                    itemStyle={{ color: '#faf8f4' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }} />
                  <Line type="monotone" dataKey="business" name="Бизнес" stroke="#c9a96e" strokeWidth={2.5} dot={{ r: 3, fill: '#c9a96e' }} animationDuration={2000} />
                  <Line type="monotone" dataKey="study" name="Учёба" stroke="#229ED9" strokeWidth={2} dot={{ r: 2.5, fill: '#229ED9' }} animationDuration={2200} />
                  <Line type="monotone" dataKey="family" name="Семья" stroke="#E1306C" strokeWidth={2} dot={{ r: 2.5, fill: '#E1306C' }} animationDuration={2400} />
                  <Line type="monotone" dataKey="rest" name="Отдых" stroke="#25D366" strokeWidth={1.5} dot={{ r: 2, fill: '#25D366' }} strokeDasharray="5 5" animationDuration={2600} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </Slide>

        {/* ═══ Values header slide ═══ */}
        <Slide>
          <SlidePhoto src="/data/story/page2.0.png" alt="Values" variant="bg" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative z-10 text-center max-w-lg">
            <SlidePhoto src="/data/photo/demi-results.logo.png" alt="Demi Results" variant="center" />
            <h2 className="font-display font-light text-milk leading-tight mb-4" style={{ fontSize: 'clamp(34px, 8vw, 56px)' }}>
              Demi Values
            </h2>
            <div className="gold-line w-12 mx-auto mb-5" />
            <p className="font-display italic text-white/45 text-lg">9 принципов, на которых стоит Demi Results</p>
          </motion.div>
        </Slide>

        {/* ═══ Values slides ═══ */}
        {VALUES_SLIDES.map((val, i) => {
          const photoSide = i % 2 === 0 ? 'left' : 'right';
          return (
            <Slide key={`val-${i}`} bg={i % 2 === 0 ? '#00294f' : 'navy'}>
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-4xl w-full ${photoSide === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Text side */}
                <div className="flex-1 text-center md:text-left">
                  <motion.span
                    className="font-display text-[80px] md:text-[120px] font-light leading-none block mb-1"
                    style={{ color: 'rgba(201,169,110,0.06)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  >
                    <h3 className="font-display text-2xl md:text-4xl font-light text-gold mb-3">{val.title}</h3>
                    <div className="w-8 h-px bg-gold/30 mb-4 mx-auto md:mx-0" />
                    <p className="font-display italic text-white/55 leading-relaxed text-base md:text-lg">{val.text}</p>
                  </motion.div>
                  {/* Dots */}
                  <div className="mt-6 flex gap-1.5 justify-center md:justify-start">
                    {VALUES_SLIDES.map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full transition-colors ${j === i ? 'bg-gold' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
                {/* Photo side */}
                <SlidePhoto src={val.img} alt={val.title} variant={photoSide} />
              </div>
            </Slide>
          );
        })}

        {/* ═══ CTA slide ═══ */}
        <Slide>
          <SlidePhoto src="/data/story/cta.png" alt="Contact" variant="bg" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative z-10 text-center max-w-lg">
            <span className="font-cursive text-5xl text-gold/30 block mb-4">Адеми</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-milk mb-4">
              Готовы начать свой путь к здоровой коже?
            </h2>
            <div className="gold-line w-12 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://t.me/ademi_doctor" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium bg-gold text-navy rounded-sm hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(201,169,110,0.22)] transition-all">
                Telegram
              </a>
              <a href="https://instagram.com/doctor_ademi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-gold hover:text-gold transition-all">
                Instagram
              </a>
              <a href="https://wa.me/996706007125" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium border border-white/18 text-milk rounded-sm hover:border-[#25D366] hover:text-[#25D366] transition-all">
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 mt-10 text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-gold transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Вернуться на главную
            </Link>
          </motion.div>
        </Slide>
      </div>
    </div>
  );
}
