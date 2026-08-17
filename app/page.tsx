'use client';

import { LangProvider } from './context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Store from './components/Store';
import Profile from './components/Profile';
import Certificates from './components/Certificates';
import Mission from './components/Mission';
import Social from './components/Social';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Store />
        <Profile />
        <Certificates />
        <Mission />
        <Social />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
