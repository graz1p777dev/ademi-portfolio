'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StoryCTA() {
  return (
    <section className="py-20 px-6 text-center bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Link
          href="/story"
          className="relative inline-flex items-center gap-3 px-12 py-5 text-sm tracking-[0.15em] uppercase font-medium text-navy rounded-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(201,169,110,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #c9a96e 0%, #e8d5b0 40%, #c9a96e 100%)',
            boxShadow: '0 0 30px rgba(201,169,110,0.25), 0 8px 32px rgba(0,30,60,0.15)',
          }}
        >
          <span className="relative z-10">Как всё начиналось</span>
          <span className="relative z-10 text-lg">&rarr;</span>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Link>
      </motion.div>
    </section>
  );
}
