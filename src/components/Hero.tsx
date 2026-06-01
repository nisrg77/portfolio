import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Briefcase, Award, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data';

export default function Hero() {
  return (
    <section id="hero-section" className="relative py-12 md:py-20 border-b border-zinc-800 bg-zinc-950/40 backdrop-blur-xs overflow-hidden">
      {/* Decorative gradient blur backdrop */}
      <div id="hero-orb" className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div id="hero-orb-2" className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div id="hero-container" className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div id="hero-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Avatar / Visual representation */}
          <div id="hero-avatar-area" className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div id="avatar-container" className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-700 p-[3px] shadow-2xl shadow-emerald-950/20">
              <div id="avatar-inner" className="w-full h-full bg-zinc-900 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                <span id="avatar-initials" className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">NR</span>
                <span id="avatar-title" className="text-base font-mono text-emerald-400 mt-2 uppercase tracking-widest">{personalInfo.title}</span>
              </div>
            </div>

            {/* Quick status badge */}
            <div id="status-badge" className="mt-5 flex items-center gap-2 bg-emerald-950/30 border border-emerald-900/50 rounded-full px-3.5 py-1 text-base text-emerald-400 font-mono">
              <span id="status-dot" className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities
            </div>
          </div>

          {/* Details / Text */}
          <div id="hero-text-area" className="lg:col-span-8 text-center lg:text-left">
            <h1 id="hero-name" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
              {personalInfo.name}
            </h1>
            <p id="hero-title-text" className="text-lg md:text-xl font-medium bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-5">
              {personalInfo.title}
            </p>
            <p id="hero-summary" className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
              {personalInfo.summary}
            </p>

            {/* Contact links */}
            <div id="hero-contacts" className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-base font-mono text-zinc-400">
              <div id="contact-location" className="flex items-center gap-1.5 min-w-[150px]">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <a id="contact-email" href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
              <a id="contact-phone" href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>

            {/* Action buttons / Social Links */}
            <div id="hero-actions" className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <a
                id="action-btn-email"
                href={`mailto:${personalInfo.email}`}
                className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-medium px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/20 text-sm flex items-center gap-2"
              >
                Hire Me
                <Mail className="w-4 h-4" />
              </a>

              <div id="hero-socials" className="flex items-center gap-3">
                <a
                  id="social-link-github"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-zinc-300 hover:text-emerald-400 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  id="social-link-linkedin"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-zinc-300 hover:text-emerald-400 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div id="hero-highlights" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t border-zinc-900">
          <div id="highlight-card-exp" className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-base font-mono tracking-wider uppercase text-zinc-500">EXPERIENCE</span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-white">Full-Stack Intern</p>
            <p className="text-base text-zinc-400">Jan 2026 – Apr 2026</p>
          </div>

          <div id="highlight-card-gpa" className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span className="text-base font-mono tracking-wider uppercase text-zinc-500">ACADEMICS</span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-white">7.6 CGPA</p>
            <p className="text-base text-zinc-400">GTU CSE (B.Tech)</p>
          </div>

          <div id="highlight-card-tech" className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-base font-mono tracking-wider uppercase text-zinc-500">AI FOCUS</span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-white">LangChain & BERT</p>
            <p className="text-base text-zinc-400">RAG & Transformer Models</p>
          </div>

          <div id="highlight-card-cert" className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-base font-mono tracking-wider uppercase text-zinc-500">CREDENTIALS</span>
            </div>
            <div className="flex flex-col gap-2">
              {personalInfo.certifications.map((cert, index) => (
                <div key={index} className={index > 0 ? "pt-1.5 border-t border-zinc-800/60" : ""}>
                  <p className="text-sm font-bold text-white">
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                  </p>
                  <p className="text-xs text-zinc-400">Certified by {cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
