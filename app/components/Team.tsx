'use client';

import { motion } from 'framer-motion';
import { useLang } from '../context';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.75 } };

export default function Team() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <section id="team" className="pb-24 px-6 bg-milk relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.p {...reveal} className="font-display italic text-text-main leading-relaxed text-center max-w-2xl mx-auto" style={{ fontSize: 'clamp(17px, 3.2vw, 21px)' }}>
          {data.team.desc}
        </motion.p>
      </div>
    </section>
  );
}
