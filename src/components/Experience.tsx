import React from 'react';
import { Building2, Calendar, MapPin, Briefcase } from 'lucide-react';
import { experiences } from '../data';

export default function Experience() {
  return (
    <div id="experience-timeline-container" className="space-y-12">
      
      {/* Timeline Section Header */}
      <div id="experience-timeline-header" className="flex items-center gap-3">
        <h2 id="experience-timeline-title" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium font-mono">
          Career Journey & Accomplishments
        </h2>
        <div className="h-px bg-zinc-800/80 flex-1" />
      </div>

      {/* Alternate Spine Timeline Area */}
      <div className="relative w-full py-8 overflow-hidden">
        
        {/* CENTER SPINE: Vertical line down the absolute center on desktop, shifted left on mobile */}
        <div id="timeline-spine-line" className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-emerald-500 via-teal-600 to-zinc-800 rounded-full" />

        {/* Timeline Event Cards Stack */}
        <div className="space-y-12 relative w-full">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                id={`timeline-card-row-${exp.id}`}
                key={exp.id} 
                className={`relative flex flex-col items-stretch justify-between w-full group ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* 1. TIMELINE NODES / BADGES: Styled circular node exactly aligned on the spine */}
                <div 
                  id={`timeline-spine-badge-${exp.id}`}
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 z-30 w-9 h-9 rounded-full bg-[#09090b] border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-115 group-hover:border-teal-400 transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400 group-hover:text-teal-400 transition-colors" />
                </div>

                {/* 2. CARD COLUMN: Left or right aligned on desktop, always right-aligned next to spine on mobile */}
                <div 
                  id={`timeline-column-content-${exp.id}`}
                  className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0"
                >
                  
                  {/* CARD STYLING: Clean white box with rounded corners and a subtle drop shadow */}
                  <div 
                    id={`experience-card-box-${exp.id}`}
                    className="bg-white rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] transition-all duration-300 transform hover:-translate-y-1 text-left relative"
                  >
                    {/* Small Italicized Date Marker inside the card */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mb-2.5 justify-start">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="italic font-serif font-light">
                        {exp.startDate} &mdash; {exp.endDate}
                      </span>
                    </div>

                    {/* Clear Title */}
                    <h3 id={`timeline-role-title-${exp.id}`} className="text-base font-extrabold text-zinc-900 tracking-tight">
                      {exp.role}
                    </h3>

                    {/* Subtitle / Company Line */}
                    <div id={`timeline-org-row-${exp.id}`} className="flex flex-wrap items-center gap-2 text-xs text-teal-700 font-mono font-bold mt-1 uppercase tracking-wide">
                      <span className="bg-teal-50 px-2 py-0.5 rounded border border-teal-100/50">
                        {exp.company}
                      </span>
                      <span className="text-zinc-300 font-normal">|</span>
                      <span className="text-zinc-500 capitalize font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description Paragraph/Bullets */}
                    <ul id={`timeline-desc-bullets-${exp.id}`} className="mt-4 space-y-2 text-zinc-700 text-xs md:text-[13px] leading-relaxed">
                      {exp.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex gap-2.5 items-start">
                          <span className="text-emerald-500 font-bold select-none text-xs mt-0.5">&#10003;</span>
                          <span className="font-sans font-light text-justify">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Utilized Stack Lineup */}
                    <div id={`timeline-tech-stack-${exp.id}`} className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-zinc-50 border border-zinc-200 text-[10px] text-zinc-600 font-mono font-medium rounded-md hover:bg-emerald-50 hover:border-emerald-250 hover:text-emerald-700 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* 3. SYMMETRIC SPACER EMPTY COLUMN for desktop grid */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
