import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CornerDownRight, 
  Layers,
  Presentation
} from 'lucide-react';
import { projects } from '../data';
import { ProjectItem } from '../types';
import SpotlightCard from './SpotlightCard';

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'full-stack', label: 'Full-Stack' },
    { key: 'ai-ml', label: 'Machine Learning' },
    { key: 'data-analytics', label: 'Data Analytics' },
    { key: 'backend', label: 'Backend & APIs' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ai-ml': return 'Machine Learning';
      case 'full-stack': return 'Full-Stack';
      case 'data-analytics': return 'Data Analytics';
      case 'backend': return 'Backend / APIs';
      default: return category;
    }
  };

  return (
    <div id="projects-section-wrapper" className="space-y-6">
      
      {/* HEADER AND FILTER CONTROLS */}
      <div id="projects-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-3">
        <div id="projects-title-container" className="flex items-center gap-2">
          <h2 id="projects-title" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium font-mono">
            Selected Portfolios
          </h2>
        </div>

        {/* Categories Selector in Slash-Separated Minimalist Style */}
        <div id="projects-filter-bar" className="flex flex-wrap items-center gap-y-1.5 gap-x-0.5">
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.key}>
              {idx > 0 && <span className="text-zinc-800 text-[10px] select-none font-mono px-1.5">/</span>}
              <button
                id={`filter-btn-${cat.key}`}
                onClick={() => { setFilter(cat.key); setExpandedId(null); }}
                className={`text-[10px] font-mono tracking-widest uppercase transition-colors rounded-none focus:outline-none ${
                  filter === cat.key
                    ? 'text-white font-normal underline underline-offset-4 decoration-zinc-500'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID CARD LAYOUT */}
      <div id="projects-grid" className="grid grid-cols-1 gap-6">
        {filteredProjects.map((proj) => {
          const isExpanded = expandedId === proj.id;
          return (
            <SpotlightCard
              id={`project-card-${proj.id}`}
              key={proj.id}
              className="group space-y-5"
            >
              
              {/* Header: Label, Title & Links */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-3 border-b border-zinc-800/40">
                <div className="space-y-1">
                  {/* Category & Stats Badge Strip */}
                  <div className="flex items-center gap-3 text-[9px] font-mono uppercase text-zinc-500 tracking-wider">
                    <span>{getCategoryLabel(proj.category)}</span>
                  </div>
                  {/* Project Title */}
                  <h4 id={`project-title-${proj.id}`} className="text-lg font-light tracking-tight text-white uppercase mt-0.5 font-sans">
                    {proj.title}
                  </h4>
                </div>
                
                {/* Action Links (Super minimal outline styling) */}
                <div className="flex items-center gap-3.5 self-start md:self-auto font-mono text-[10px]">
                  {proj.githubUrl && (
                    <a
                      id={`project-github-link-${proj.id}`}
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.liveDemoUrl && (
                    <a
                      id={`project-livedemo-link-${proj.id}`}
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Session</span>
                    </a>
                  )}
                  {proj.presentationUrl && (
                    <a
                      id={`project-presentation-link-${proj.id}`}
                      href={proj.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded-sm hover:border-emerald-400/40"
                    >
                      <Presentation className="w-3.5 h-3.5" />
                      <span>View Slides ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Core Description - Elegant Serif Type */}
              <p id={`project-desc-${proj.id}`} className="text-sm text-zinc-300 font-serif leading-relaxed italic font-light">
                "{proj.description}"
              </p>

              {/* Goal & Professional Role */}
              <div id={`project-goal-role-${proj.id}`} className="text-xs space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">
                  Objective & Contribution :
                </span>
                <p className="text-zinc-400 leading-relaxed font-light font-sans pl-2.5 border-l border-zinc-800">
                  {proj.goalAndRole}
                </p>
              </div>

              {/* Challenges Overcome */}
              <div id={`project-challenges-${proj.id}`} className="text-xs space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">
                  Technical Resolutions :
                </span>
                <p className="text-zinc-400 leading-relaxed font-light font-sans pl-2.5 border-l border-zinc-800">
                  {proj.challengesOvercome}
                </p>
              </div>

              {/* Plain inline text for tech stack (No chunky outline tags) */}
              <div id={`project-tags-div-${proj.id}`} className="text-[10px] font-mono flex flex-wrap items-center gap-x-2 gap-y-1 pt-1.5 text-zinc-500">
                <span className="uppercase tracking-widest mr-1">Trained stack:</span>
                {proj.techStack.map((tech, tIdx) => (
                  <span
                    id={`proj-tag-${proj.id}-${tech.replace(/\s+/g, '-').toLowerCase()}`}
                    key={tech}
                    className="text-zinc-300 font-sans"
                  >
                    {tech}{tIdx < proj.techStack.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>

              {/* Optional/Expanded contents */}
              {isExpanded && (
                <div id={`project-expanded-space-${proj.id}`} className="space-y-4 pt-4 border-t border-zinc-900/40 text-xs font-light text-zinc-400 animate-fade-in">
                  
                  {/* Key Insights */}
                  {proj.keyInsights && proj.keyInsights.length > 0 && (
                    <div id={`project-insights-div-${proj.id}`} className="bg-transparent space-y-1.5">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">Core Findings:</span>
                      <ul className="space-y-1 list-none pl-2.5 font-sans">
                        {proj.keyInsights.map((insight, insIdx) => (
                          <li key={insIdx} className="flex gap-2 text-zinc-400 text-xs font-light">
                            <span className="text-zinc-600 font-mono select-none">◇</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Architecture notes */}
                  <div id={`project-story-div-${proj.id}`} className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">System Methodology:</span>
                    <p className="leading-relaxed text-zinc-400 text-xs pl-2.5">{proj.extendedDetails}</p>
                  </div>

                  {/* Milestones / Core Features */}
                  <div id={`project-features-div-${proj.id}`} className="space-y-1.5">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest block">Key Milestones:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2.5">
                      {proj.keyFeatures.map((feat, fIdx) => (
                        <div id={`proj-feat-${proj.id}-${fIdx}`} key={fIdx} className="flex items-start gap-1.5 text-zinc-400 text-xs">
                          <CornerDownRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Measurable impact */}
                  {proj.impact && (
                    <div id={`project-impact-box-${proj.id}`} className="pt-2">
                      <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">Impact Metric:</span>
                      <p className="text-zinc-300 text-xs font-light font-mono pl-2.5">{proj.impact}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Expander controller */}
              <button
                id={`project-expand-btn-${proj.id}`}
                onClick={() => toggleExpand(proj.id)}
                className="py-1 text-[9px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 focus:outline-none"
              >
                <span>{isExpanded ? '[- Close technical details]' : '[+ View architectural details]'}</span>
              </button>

            </SpotlightCard>
          );
        })}
      </div>

    </div>
  );
}
