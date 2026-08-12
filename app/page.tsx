'use client';

import { LangProvider } from './context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Store from './components/Store';
import Profile from './components/Profile';
import Team from './components/Team';
import Activity from './components/Activity';
import Certificates from './components/Certificates';
import Mission from './components/Mission';
import Social from './components/Social';
import StoryCTA from './components/StoryCTA';
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
        <Team />
        <Activity />
        <Certificates />
        <Mission />
        <Social />
        <StoryCTA />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
