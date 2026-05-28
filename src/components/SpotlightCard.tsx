import React, { useRef, useState, MouseEvent } from 'react';

interface SpotlightCardProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}

export default function SpotlightCard({ children, className = '', id, ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-zinc-900/15 border border-zinc-900/80 p-6 md:p-8 rounded-none transition-all duration-300 hover:border-zinc-700/60 ${className}`}
      {...props}
    >
      {/* Spotlight layer: soft white radial glow following the mouse pointer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(
              450px circle at ${coords.x}px ${coords.y}px, 
              rgba(255, 255, 255, 0.05) 0%, 
              rgba(255, 255, 255, 0.015) 40%, 
              transparent 80%
            ),
            radial-gradient(
              120px circle at ${coords.x}px ${coords.y}px, 
              rgba(255, 255, 255, 0.06) 0%, 
              transparent 60%
            )
          `,
        }}
      />

      {/* Decorative ambient glass spotlight reflect lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.005] to-transparent pointer-events-none z-0" />

      {/* Actual inner contents */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
