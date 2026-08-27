'use client';

import Image from 'next/image';
import { useLang } from '../context';

export default function Footer() {
  const { data } = useLang();
  if (!data) return null;

  return (
    <footer className="py-13 px-6 text-center" style={{ background: '#060d16' }}>
      <Image src="/data/photo/brend-logo.png" alt="Demi Results" width={120} height={34} className="h-8 w-auto mx-auto mb-5 opacity-25 object-contain" />
      <div className="w-9 h-px bg-gold/18 mx-auto mb-5" />
      <p className="font-display text-[17px] text-white/30 mb-1.5">{data.footer.name}</p>
      <p className="text-[10px] tracking-[0.22em] uppercase text-white/13 mb-6">{data.footer.brand} &middot; {data.footer.location}</p>
      <div className="flex gap-6 justify-center flex-wrap mb-6">
        <a href={data.contact.telegram} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.18em] uppercase text-white/22 hover:text-gold transition-colors">Telegram</a>
        <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.18em] uppercase text-white/22 hover:text-gold transition-colors">Instagram</a>
        {data.contact.whatsapp && <a href={data.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.18em] uppercase text-white/22 hover:text-gold transition-colors">WhatsApp</a>}
        <a href="https://instagram.com/demi.results" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.18em] uppercase text-white/22 hover:text-gold transition-colors">Demi Results</a>
      </div>
      <p className="text-[10px] text-white/10 leading-relaxed tracking-wide">&copy; {new Date().getFullYear()} {data.footer.name} &middot; {data.footer.brand} &middot; {data.footer.location}</p>
      <div className="mt-4 text-[11px] text-white/15">
        Developed by <a href="https://alihan-torebekov.kg/" target="_blank" rel="noopener noreferrer" className="text-gold/38 hover:text-gold transition-colors border-b border-transparent hover:border-gold/30">Alihan Torebekov</a>
      </div>
    </footer>
  );
}
