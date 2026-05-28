import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUp, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
    previewUrl?: string;
  }>({ type: 'idle', message: '' });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 55;
    const connectionDistance = 115;
    const mouse = { x: null as number | null, y: null as number | null, radius: 140 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 1;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        if (this.x < 0) this.x = 0;
        if (this.x > w) this.x = w;
        if (this.y < 0) this.y = 0;
        if (this.y > h) this.y = h;
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cContext.fillStyle = 'rgba(255, 255, 255, 0.45)';
        cContext.fill();
      }
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      if (
        relativeX >= 0 &&
        relativeX <= rect.width &&
        relativeY >= 0 &&
        relativeY <= rect.height
      ) {
        mouse.x = relativeX;
        mouse.y = relativeY;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'All form fields are required.' });
      return;
    }

    try {
      setStatus({ type: 'loading', message: 'Forwarding message...' });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message was sent successfully.',
          previewUrl: result.previewUrl
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send your message. Please try again or email directly.'
        });
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatus({
        type: 'error',
        message: 'Could not connect to the server. Please check your connection or contact rnnisarg7@gmail.com directly.'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="portfolio-footer" 
      ref={containerRef}
      className="relative w-full bg-[#080809] border-t border-zinc-900 overflow-hidden flex flex-col md:flex-row min-h-[520px] z-20 pointer-events-auto"
    >
      {/* Constellation Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* LEFT HALF — Brand panel */}
      <div id="footer-brand-panel" className="relative z-20 flex flex-col justify-between w-full md:w-1/2 px-10 md:px-16 py-16 border-b md:border-b-0 md:border-r border-zinc-900">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span className="font-mono text-sm tracking-[0.3em] text-zinc-500 uppercase">
              Get in touch
            </span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white leading-snug">
            Let's craft the next <br />
            <span className="font-medium text-zinc-400">technological epoch.</span>
          </h3>

          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
            Open to full-time roles, freelance projects, and collaborations. Reach out and let's build something great together.
          </p>

          {/* Contact info */}
          <div className="space-y-3 pt-2">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
              <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 shrink-0" />
              <span className="text-sm font-mono">{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
              <Phone className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 shrink-0" />
              <span className="text-sm font-mono">{personalInfo.phone}</span>
            </a>
            <div className="flex items-center gap-3 text-zinc-400 group">
              <MapPin className="w-4 h-4 text-zinc-600 shrink-0" />
              <span className="text-sm font-mono">{personalInfo.location}</span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 pt-2">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900/60 text-sm font-mono text-zinc-700 uppercase tracking-widest">
          <p>Nisarg Rana © 2026</p>
        </div>
      </div>

      {/* RIGHT HALF — Contact form, fills entire right side */}
      <div id="footer-reachout-panel" className="relative z-20 flex flex-col w-full md:w-1/2 px-10 md:px-16 py-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
          <h4 className="font-mono text-sm tracking-[0.25em] text-white uppercase">
            Send a Message
          </h4>
        </div>

        <form onSubmit={handleSubmit} id="footer-contact-form" className="flex flex-col flex-1 gap-5">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="footer-field-name" className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
                Your Name
              </label>
              <input
                id="footer-field-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Liam Vance"
                disabled={status.type === 'loading'}
                className="w-full text-sm font-sans text-white bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 focus:outline-none px-4 py-3 rounded-lg transition-all placeholder:text-zinc-700"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="footer-field-email" className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
                Email Address
              </label>
              <input
                id="footer-field-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. liam@company.com"
                disabled={status.type === 'loading'}
                className="w-full text-sm font-sans text-white bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 focus:outline-none px-4 py-3 rounded-lg transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Message — grows to fill remaining space */}
          <div className="space-y-1.5 flex-1 flex flex-col">
            <label htmlFor="footer-field-message" className="text-xs font-mono uppercase text-zinc-500 tracking-widest block">
              Message
            </label>
            <textarea
              id="footer-field-message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Outline your proposal, opportunity, or question..."
              disabled={status.type === 'loading'}
              className="w-full flex-1 text-sm font-sans text-white bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 focus:outline-none px-4 py-3 rounded-lg transition-all placeholder:text-zinc-700 resize-none"
            />
          </div>

          {/* Status messages */}
          {status.type === 'loading' && (
            <div role="status" className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
              <div className="w-3.5 h-3.5 border border-zinc-400 border-t-transparent animate-spin rounded-full" />
              <span>Sending...</span>
            </div>
          )}
          {status.type === 'success' && (
            <div className="flex items-start gap-2 text-zinc-300 text-sm font-sans bg-zinc-800/50 border border-zinc-700 p-3 rounded-lg animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-zinc-400" />
              <span>{status.message}</span>
            </div>
          )}
          {status.type === 'error' && (
            <div className="flex items-start gap-2 text-rose-400 text-sm font-sans bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg animate-fade-in">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              id="footer-mailto-btn"
              href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                formData.name ? `Portfolio Message from ${formData.name}` : 'Portfolio Correspondence'
              )}&body=${encodeURIComponent(
                `${formData.message ? `${formData.message}\n\n` : ''}Sender: ${formData.name || 'Anonymous'}\nEmail: ${formData.email || 'Not provided'}`
              )}`}
              className="flex-1 px-5 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white text-sm font-mono tracking-wider uppercase transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Directly</span>
            </a>

            <button
              id="footer-submit-btn"
              type="submit"
              disabled={status.type === 'loading'}
              className="flex-1 px-5 py-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 text-white text-sm font-mono tracking-wider uppercase transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

    </footer>
  );
}
