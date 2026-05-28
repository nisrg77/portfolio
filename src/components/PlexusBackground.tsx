import React, { useEffect, useRef } from 'react';

export default function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60;
    const connectionDistance = 120;
    const mouse = { x: null as number | null, y: null as number | null, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slow subtle movement
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 3;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        // Keep inside bounds
        if (this.x < 0) this.x = 0;
        if (this.x > w) this.x = w;
        if (this.y < 0) this.y = 0;
        if (this.y > h) this.y = h;
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        cContext.fillStyle = 'rgba(161, 161, 170, 0.45)'; // zinc-400 slightly transparent
        cContext.fill();
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
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

      // Update and draw particles
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Faint transition lines
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(161, 161, 170, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`; // Subtle emerald connecting glow to mouse
            ctx.lineWidth = 0.6;
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
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Attach mouse listeners directly to the window or parent to make it interactive across the area
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
