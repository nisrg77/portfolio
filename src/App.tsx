import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from './data';
import Projects from './components/Projects';
import PlexusBackground from './components/PlexusBackground';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSystemTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#09090b] text-zinc-300 font-sans flex flex-col selection:bg-zinc-800 selection:text-white relative">

      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-zinc-900 w-full fixed top-0 z-[60]" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* NAVBAR */}
      <header
        id="portfolio-header"
        className={`sticky top-[2px] z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-zinc-900/40'
          } px-6 py-4`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-700 transition-all">
              <span className="text-zinc-300 font-bold text-sm font-mono">N</span>
            </div>
            <span className="text-white font-semibold text-base tracking-tight">{personalInfo.name}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Projects', id: 'projects-section' },
              { label: 'Experience', id: 'experience-section' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('portfolio-footer')}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Clock (desktop) */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-zinc-500">
            <Globe className="w-3.5 h-3.5 text-zinc-600" />
            <span className="tabular-nums text-zinc-400">{systemTime || '00:00:00'}</span>
            <span className="text-zinc-700">IST</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav tray */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-zinc-800 mt-3 pt-3 pb-2 space-y-1"
            >
              {[
                { label: 'Projects', id: 'projects-section' },
                { label: 'Experience', id: 'experience-section' },
                { label: 'Contact', id: 'portfolio-footer' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left py-2.5 px-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg flex items-center justify-between transition-all"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero-showcase" className="relative w-full bg-[#09090b] overflow-hidden border-b border-zinc-800/60 z-10">

        {/* Plexus fills the entire section */}
        <PlexusBackground />

        {/* Dark plexus background + hero content */}
        <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center w-full z-20">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-8 relative z-20">

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative w-28 h-28 rounded-full border-2 border-zinc-800 bg-zinc-950/90 flex items-center justify-center shadow-2xl hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className="absolute inset-1 rounded-full border border-dashed border-zinc-700 group-hover:border-emerald-500/40 animate-[spin_12s_linear_infinite] transition-all duration-500" />
              <span className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-serif italic">
                NR
              </span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-3">
              <motion.h1
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none"
              >
                {personalInfo.name}
              </motion.h1>
              <motion.p
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-base md:text-lg font-mono tracking-widest text-zinc-500 uppercase"
              >
                {personalInfo.title}
              </motion.p>
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-4 pt-2"
            >
              {[
                { href: personalInfo.github, icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: <Mail className="w-5 h-5" />, label: 'Email' },
                { href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`, icon: <Phone className="w-5 h-5" />, label: 'Phone' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_16px_rgba(16,185,129,0.15)] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection('projects-section')}
                className="px-7 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-base rounded-xl transition-all border border-zinc-700 hover:border-zinc-500"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('portfolio-footer')}
                className="px-7 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-base rounded-xl transition-all"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bio strip */}
        <div className="w-full bg-white text-zinc-950 py-14 md:py-20 border-t border-zinc-200 relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight">
                Hey, I'm Nisarg! 👋
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl">
                I'm a <strong className="text-zinc-900">Software & AI Engineer</strong> from Bharuch, India. I love building scalable backend APIs, optimizing machine learning pipelines, and creating elegant web experiences. Feel free to explore my work or reach out.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                {['Python', 'Django REST', 'React', 'TypeScript', 'Pandas', 'NumPy', 'Scikit-learn'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-sm font-medium rounded-lg border border-zinc-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => scrollToSection('projects-section')}
                className="px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-base rounded-xl transition-all shadow-md"
              >
                View Portfolio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-20 space-y-28 z-10">

        {/* Projects */}
        <section id="projects-section" className="scroll-mt-24">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-mono text-sm font-bold">01</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Projects</h2>
            </div>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>
          <Projects />
        </section>

        {/* Experience */}
        <section id="experience-section" className="scroll-mt-24">
          <Experience />
        </section>

        {/* Certifications */}
        <section id="certifications-section" className="scroll-mt-24">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-mono text-sm font-bold">03</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Certifications</h2>
            </div>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalInfo.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded-md">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{cert.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {cert.title}
                  </h3>
                </div>
                {cert.link && (
                  <div className="mt-4">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      Verify Credential →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
