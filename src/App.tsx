import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Globe, 
  Menu, 
  X,
  Command,
  Search,
  ExternalLink,
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
  const [cmdOpen, setCmdOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemTime, setSystemTime] = useState('');

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const commandItems = [
    { label: 'Go to Selected Deliverables', type: 'scroll', target: 'projects-section', subtitle: 'Explore live model pipelines & fullstack portfolios' },
    { label: 'Go to Career Timeline', type: 'scroll', target: 'experience-section', subtitle: 'Step through professional experience chronology' },
    { label: 'Go to Contact Recipient', type: 'scroll', target: 'portfolio-footer', subtitle: 'Send a message or reach out' },
    { label: 'Copy Email Address', type: 'action', action: handleCopyEmail, subtitle: `${personalInfo.email}` },
    { label: 'Launch GitHub Engine', type: 'external', url: personalInfo.github, subtitle: 'Inspect source repositories' },
    { label: 'Open LinkedIn Profile', type: 'external', url: personalInfo.linkedin, subtitle: 'Connect on business grid' }
  ];

  const filteredCommands = commandItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#09090b] text-zinc-300 font-sans flex flex-col selection:bg-zinc-800 selection:text-white relative">
      
      {/* Dynamic top viewport gradient deck */}
      <div className="h-[2px] bg-gradient-to-r from-emerald-500/10 via-zinc-500 to-zinc-900 w-full fixed top-0 z-[60]" />

      {/* Ambient glass spotlight glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Background ambient texture (soft minimal grid lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* FLOATING TOP BAR / DE-EMPHASIZED NAVIGATION */}
      <header id="portfolio-header" className="sticky top-[2px] z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900/80 px-6 py-4.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-base font-mono font-medium tracking-[0.2em] text-white uppercase hover:text-zinc-400 transition-colors flex items-center gap-2 group"
            >
              <span>{personalInfo.name}</span>
              <span className="text-zinc-700 font-normal select-none group-hover:text-zinc-500 transition-colors">// PORTFOLIO</span>
            </button>


          </div>

          {/* Minimalist lower-case slash-divided nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm uppercase tracking-wider font-mono">
            <button 
              onClick={() => scrollToSection('projects-section')} 
              className="text-zinc-500 hover:text-white px-2 py-1 transition-all hover:bg-zinc-950/40 relative group"
            >
              projects
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-zinc-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </button>
            <span className="text-zinc-800">/</span>
            <button 
              onClick={() => scrollToSection('experience-section')} 
              className="text-zinc-500 hover:text-white px-2 py-1 transition-all hover:bg-zinc-950/40 relative group"
            >
              timeline
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-zinc-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </button>
            <span className="text-zinc-800">/</span>
            <button 
              onClick={() => scrollToSection('portfolio-footer')} 
              className="text-zinc-400 hover:text-white px-2.5 py-1 bg-zinc-900/30 border border-zinc-900 hover:border-zinc-700 transition-all font-medium"
            >
              contact
            </button>
          </nav>

          {/* Dynamic real-time atomic clock */}
          <div className="hidden lg:flex items-center gap-2.5 font-mono text-sm tracking-wider text-zinc-500 border-l border-zinc-900 pl-4">
            <Globe className="w-3.5 h-3.5 text-zinc-600 animate-spin-slow" />
            <div className="space-y-0.5">
              <span className="block uppercase text-zinc-600">GMT+5.5 / ASIA_KOLKATA</span>
              <span className="block text-white font-medium tracking-widest tabular-nums text-sm">
                {systemTime || '12:00:00'}
              </span>
            </div>
          </div>

          {/* Mobile hamburger menu and quick action kit */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCmdOpen(true)}
              className="p-1 px-2 border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white transition-colors"
              title="Command Center"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-white hover:border-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION TRAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-zinc-900 mt-4 pt-4 pb-2 space-y-1 bg-[#09090b]"
            >
              <button 
                onClick={() => scrollToSection('projects-section')} 
                className="w-full text-left py-2 px-3 text-base font-mono text-zinc-400 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between"
              >
                <span>[01] // projects</span>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </button>
              <button 
                onClick={() => scrollToSection('experience-section')} 
                className="w-full text-left py-2 px-3 text-base font-mono text-zinc-400 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between"
              >
                <span>[02] // timeline</span>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </button>
              <button 
                onClick={() => scrollToSection('portfolio-footer')} 
                className="w-full text-left py-2 px-3 text-base font-mono text-zinc-300 bg-zinc-900/20 border border-zinc-900 hover:text-white hover:bg-zinc-900/60 flex items-center justify-between font-medium"
              >
                <span>[03] // contact_recipient</span>
                <ChevronRight className="w-3 h-3 text-emerald-505" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* COMMAND PALETTE DIALOG OVERLAY */}
      <AnimatePresence>
        {cmdOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
            {/* Backdrop blurring filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCmdOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Panel box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-[#0c0c0e] border border-zinc-900 p-1.5 focus:outline-none shadow-2xl z-10 relative"
            >
              {/* Internal header indicator */}
              <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-zinc-900">
                <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a path command or action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-zinc-200 placeholder-zinc-600 text-base focus:ring-0 focus:outline-none font-mono"
                  autoFocus
                />
                <span className="text-base font-mono select-none text-zinc-600 uppercase px-1.5 py-0.5 border border-zinc-900">
                  ESC_EXIT
                </span>
              </div>

              {/* Suggestions flow */}
              <div className="max-h-[320px] overflow-y-auto font-mono text-base p-1.5 space-y-0.5">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((item, cidx) => (
                    <button
                      key={cidx}
                      onClick={() => {
                        if (item.type === 'scroll') {
                          scrollToSection(item.target);
                        } else if (item.type === 'action') {
                          item.action();
                        } else if (item.type === 'external') {
                          window.open(item.url, '_blank', 'noreferrer,noopener');
                        }
                        setCmdOpen(false);
                      }}
                      className="w-full text-left p-2.5 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-900 rounded-none flex items-center justify-between transition-all group"
                    >
                      <div className="space-y-0.5">
                        <div className="text-zinc-300 font-medium group-hover:text-white flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.type === 'external' && <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />}
                        </div>
                        {item.subtitle && (
                          <div className="text-sm text-zinc-600 group-hover:text-zinc-400 font-light truncate max-w-[340px]">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      
                      <span className="text-sm text-zinc-700 font-mono uppercase bg-zinc-950 px-2 py-1 border border-zinc-900 select-none group-hover:text-zinc-400 group-hover:border-zinc-700">
                        {item.type === 'scroll' && 'GOTO'}
                        {item.type === 'action' && (copied && item.label === 'Copy Email Address' ? 'COPIED' : 'EXEC')}
                        {item.type === 'external' && 'EXPLORE'}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-zinc-600 text-sm">
                    No terminal path matching search query.
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="p-2 border-t border-zinc-900 flex items-center justify-between text-sm text-zinc-600 font-mono uppercase">
                <span>Navigate via touchpad or click selection</span>
                <span>SYSTEM_PERSIST_MODAL</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CINEMATIC HERO SECTION FLOW (Plexus constellation Hub + Bold White Accent Banner) */}
      <section id="hero-showcase" className="relative w-full bg-[#09090b] flex flex-col justify-between overflow-hidden border-b border-zinc-900/60 z-10">
        
        {/* TOP: THE DARK SPACE PLEXUS NET (Centered Avatar, Title & Social Links Grid) */}
        <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center w-full">
          {/* Constellation Plexus Interactive Grid Canvas */}
          <PlexusBackground />

          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-7 relative z-20">
            {/* Circle initials stamp / professional avatar */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative w-28 h-28 rounded-full border border-zinc-800 bg-zinc-950/90 flex items-center justify-center p-[4px] shadow-2xl hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              {/* Spinning dotted constellation outline orbit */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-zinc-700 group-hover:border-emerald-500/50 animate-spin-slow transition-all duration-500" />
              <div className="w-full h-full rounded-full bg-zinc-905 flex items-center justify-center text-center">
                <span className="text-3.5xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-serif italic">
                  NR
                </span>
              </div>
            </motion.div>

            {/* Profile Nameplate display */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl md:text-6xl font-light text-white tracking-tight leading-none"
              >
                {personalInfo.name}
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-sm md:text-base font-mono tracking-widest text-zinc-500 uppercase"
              >
                {personalInfo.title}
              </motion.p>
            </div>

            {/* Micro-Social icon tray */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-4 pt-1.5"
            >
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-200"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-200"
                aria-label="LinkedIn Grid"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="p-2 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-200"
                aria-label="Mail Dispatch"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} 
                className="p-2 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-200"
                aria-label="Telephony"
              >
                <Phone className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: THE HIGH-CONTRAST SOLID WHITE HIGH-FIDELITY STRIP */}
        <div className="w-full bg-white text-zinc-950 py-12 md:py-16 border-y border-zinc-200 relative z-20 shadow-xl transition-all">
          <div className="max-w-5xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Primary message and bio text block */}
            <div className="lg:col-span-8 space-y-3.5 text-left">
              <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight font-sans">
                Hey!
              </h2>
              <p className="text-zinc-800 font-normal text-base md:text-sm lg:text-base leading-relaxed tracking-wide font-sans">
                I'm <strong className="text-zinc-950 font-bold">{personalInfo.name}</strong> from Ahmedabad, India! 
                I love programming, building scalable backend APIs, optimizing machine learning engineering models, and designing elegant web experiences.
                Feel free to check out my past work or get in touch.
              </p>
            </div>

            {/* Fast control action console beside details */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3.5 w-full justify-start lg:justify-end">
              <button 
                onClick={() => scrollToSection('projects-section')}
                className="flex-1 max-w-[210px] px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-sm tracking-widest uppercase transition-all shadow-md text-center active:scale-98 select-none cursor-pointer"
              >
                Inspect Portfolio
              </button>
            </div>
            
          </div>
        </div>

      </section>

      {/* SEGMENTED PORTFOLIO CONTENT (SPACIOUS VERTICAL FLOW) */}
      <main className="max-w-5xl mx-auto w-full px-6 md:px-16 py-12 space-y-24 z-10">

        {/* SECTION 01: SELECTED DELIVERABLES & PORTFOLIOS (PROJECT CARDS) */}
        <section id="projects-section" className="scroll-mt-24">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-zinc-600 font-mono text-base">01 /</span>
            <h3 className="text-sm uppercase tracking-[0.3em] font-mono text-zinc-400 font-bold">
              Deliverables & Portfolio Pipelines
            </h3>
            <div className="h-px bg-zinc-900 flex-1" />
          </div>
          <Projects />
        </section>

        {/* SECTION 02: PROFESSIONAL CHRONOLOGY (ALTERNATING TIMELINE) */}
        <section id="experience-section" className="scroll-mt-24">
          <Experience />
        </section>

      </main>

      {/* SYSTEM STATUS BAR / FOOTER */}
      <Footer />

    </div>
  );
}
