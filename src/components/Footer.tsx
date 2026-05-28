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
      className="relative min-h-[500px] w-full bg-[#080809] border-t border-zinc-900 overflow-hidden flex flex-col justify-center py-24 px-6 md:px-16 z-20 pointer-events-auto"
    >
      {/* Constellation Live Canvas Background Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Grid Content Overlay sitting legibly over canvas - Balanced Two Column Layout */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 z-20">
        
        {/* Left Column (6 Columns): Minimal Typographic Brand panel */}
        <div id="footer-brand-panel" className="md:col-span-6 flex flex-col justify-between space-y-8 md:space-y-0 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase">
                Location & Origin
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-white leading-normal max-w-md">
              Let's craft the next <br />
              <span className="text-zinc-500 font-medium text-emerald-400">technological epoch.</span>
            </h3>
          </div>

          <div className="space-y-2 border-t border-zinc-900/60 pt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <p>NISARG RANA , 2026</p>
          </div>
        </div>

        {/* Right Column (6 Columns): Reach Out Form Panel */}
        <div id="footer-reachout-panel" className="md:col-span-6 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase">
              Correspondence / Reach Out
            </h4>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans max-w-md">
            Have an opportunity, a project proposal, or simply a question? Send an instant transmission. I will receive it directly.
          </p>

          <form onSubmit={handleSubmit} id="footer-contact-form" className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-1">
                <label htmlFor="footer-field-name" className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">
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
                  className="w-full text-xs font-sans text-white bg-zinc-950/40 border border-zinc-850 focus:border-emerald-500 focus:outline-none px-3.5 py-2.5 rounded-none transition-all placeholder:text-zinc-700"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label htmlFor="footer-field-email" className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">
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
                  className="w-full text-xs font-sans text-white bg-zinc-950/40 border border-zinc-850 focus:border-emerald-500 focus:outline-none px-3.5 py-2.5 rounded-none transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-1">
              <label htmlFor="footer-field-message" className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">
                Message Content
              </label>
              <textarea
                id="footer-field-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Outline your proposal, request, or details..."
                disabled={status.type === 'loading'}
                className="w-full text-xs font-sans text-white bg-zinc-950/40 border border-zinc-850 focus:border-emerald-500 focus:outline-none px-3.5 py-2.5 rounded-none transition-all placeholder:text-zinc-700 resize-none animate-none"
              />
            </div>

            {/* Submit and status row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
              <div className="flex-1">
                {status.type === 'loading' && (
                  <div role="status" className="flex items-center gap-2 text-zinc-400 text-xs font-mono font-light">
                    <div className="w-3.5 h-3.5 border border-zinc-400 border-t-transparent animate-spin rounded-full" />
                    <span>Processing message transmission...</span>
                  </div>
                )}
                {status.type === 'success' && (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-none animate-fade-in flex flex-col gap-2.5 text-xs font-sans font-light">
                    <div className="flex items-start gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
                      <span>{status.message}</span>
                    </div>
                    {status.previewUrl && (
                      <div className="pt-2 border-t border-emerald-500/10 flex items-center">
                        <a 
                          href={status.previewUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-[#080809] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors select-none"
                        >
                          <span>Show Email Inbox Demo ↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
                {status.type === 'error' && (
                  <div className="flex items-start gap-2 text-rose-400 text-xs font-sans font-light bg-rose-500/5 border border-rose-500/10 p-3 rounded-none animate-fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
                <a
                  id="footer-mailto-btn"
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                    formData.name ? `Portfolio Message from ${formData.name}` : 'Portfolio Correspondence'
                  )}&body=${encodeURIComponent(
                    `${formData.message ? `${formData.message}\n\n` : ''}Sender: ${formData.name || 'Anonymous'}\nEmail: ${formData.email || 'Not provided'}`
                  )}`}
                  className="px-6 py-3 bg-zinc-950 border border-zinc-850 hover:border-emerald-500 hover:text-emerald-400 text-zinc-400 text-[10px] font-mono tracking-widest uppercase transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mailto Courier ↗</span>
                </a>

                <button
                  id="footer-submit-btn"
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="px-8 py-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500 text-white text-[10px] font-mono tracking-widest uppercase transition-colors rounded-none flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 select-none shrink-0"
                >
                  <span>Transmit Form</span>
                  <Send className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>

    </footer>
  );
}
