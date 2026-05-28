import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Presentation, 
  ChevronRight, 
  Layers, 
  Zap, 
  TrendingUp, 
  Code2, 
  HardDrive,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { ProjectItem } from '../types';
import SpotlightCard from './SpotlightCard';

const categoryTheme: Record<string, {
  label: string;
  badge: string;
  accent: string;
  icon: React.ReactNode;
}> = {
  'full-stack': {
    label: 'Full-Stack',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accent: '#3b82f6',
    icon: <Layers className="w-4 h-4 text-blue-400" />
  },
  'ai-ml': {
    label: 'ML / AI',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    accent: '#8b5cf6',
    icon: <Zap className="w-4 h-4 text-violet-400" />
  },
  'data-analytics': {
    label: 'Data Analytics',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accent: '#f59e0b',
    icon: <TrendingUp className="w-4 h-4 text-amber-400" />
  },
  'backend': {
    label: 'Backend & APIs',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accent: '#10b981',
    icon: <Code2 className="w-4 h-4 text-emerald-400" />
  },
};

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'full-stack', label: 'Full-Stack' },
    { key: 'ai-ml', label: 'Machine Learning' },
    { key: 'data-analytics', label: 'Data Analytics' },
    { key: 'backend', label: 'Backend' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  // Ensure activeProjectId is valid under the new filter, fallback to first in list
  const currentActiveProject = filteredProjects.find(p => p.id === activeProjectId) || filteredProjects[0];

  const theme = currentActiveProject ? (categoryTheme[currentActiveProject.category] || {
    label: currentActiveProject.category,
    badge: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    accent: '#71717a',
    icon: <Compass className="w-4 h-4 text-zinc-400" />
  }) : null;

  return (
    <div id="projects-section-container" className="space-y-8">
      {/* Category Filter Tabs */}
      <div id="projects-filter-bar" className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              id={`filter-btn-${cat.key}`}
              onClick={() => {
                setFilter(cat.key);
                const list = cat.key === 'all' ? projects : projects.filter(p => p.category === cat.key);
                if (list.length > 0) setActiveProjectId(list[0].id);
              }}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-none border transition-all duration-300 focus:outline-none ${
                filter === cat.key
                  ? 'bg-white text-zinc-950 border-white font-bold'
                  : 'bg-zinc-950/40 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-zinc-500">
          {filteredProjects.length} Systems Registered
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-900 rounded-none">
          No projects found in this category.
        </div>
      ) : (
        /* Split layout: Selector List on Left, Active Detailed Card on Right */
        <div id="projects-split-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Projects Selector Menu (Stack List) */}
          <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredProjects.map((proj) => {
              const isActive = proj.id === (currentActiveProject?.id || '');
              const projTheme = categoryTheme[proj.category];
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`w-full text-left p-4 rounded-none border transition-all duration-300 flex items-center justify-between group ${
                    isActive 
                      ? 'bg-zinc-900/60 border-zinc-700 text-white shadow-[0_0_15px_rgba(255,255,255,0.02)]' 
                      : 'bg-zinc-950/20 border-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/20 hover:border-zinc-800'
                  }`}
                  style={{
                    borderLeftWidth: isActive ? '3px' : '1px',
                    borderLeftColor: isActive ? projTheme?.accent : undefined
                  }}
                >
                  <div className="space-y-1 pr-4">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span>{projTheme?.label}</span>
                    </div>
                    <span className="text-sm font-semibold tracking-tight block truncate">
                      {proj.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-zinc-600 group-hover:translate-x-0.5'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Side: Detailed Project View Card (The Single Rectangle Card) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {currentActiveProject && theme && (
                <motion.div
                  key={currentActiveProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard
                    id={`project-card-detail-${currentActiveProject.id}`}
                    className="rounded-none border border-zinc-800 bg-zinc-950/40 p-6 md:p-8 space-y-6"
                  >
                    {/* Top Row: Meta info and Action Links */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900">
                      <div className="flex items-center gap-2">
                        {theme.icon}
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-none border ${theme.badge}`}>
                          {theme.label}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3">
                        {currentActiveProject.githubUrl && (
                          <a
                            href={currentActiveProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-none transition-colors"
                            title="View Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {currentActiveProject.liveDemoUrl && (
                          <a
                            href={currentActiveProject.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-950 hover:bg-zinc-200 bg-white rounded-none transition-all flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {currentActiveProject.presentationUrl && (
                          <a
                            href={currentActiveProject.presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-none transition-colors"
                            title="Presentation Slides"
                          >
                            <Presentation className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title and main description */}
                    <div className="space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {currentActiveProject.title}
                      </h3>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                        {currentActiveProject.description}
                      </p>
                    </div>

                    {/* Objectives & Role */}
                    {currentActiveProject.goalAndRole && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Objective & Contribution</span>
                        <p className="text-sm text-zinc-300 leading-relaxed pl-4 border-l-2" style={{ borderLeftColor: theme.accent }}>
                          {currentActiveProject.goalAndRole}
                        </p>
                      </div>
                    )}

                    {/* Technical Resolution */}
                    {currentActiveProject.challengesOvercome && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Technical Resolutions & Challenges</span>
                        <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-900/10 border border-zinc-900 p-4 rounded-none">
                          {currentActiveProject.challengesOvercome}
                        </p>
                      </div>
                    )}

                    {/* Key Features & Impact Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Features */}
                      {currentActiveProject.keyFeatures && currentActiveProject.keyFeatures.length > 0 && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Key Modules</span>
                          <div className="space-y-2">
                            {currentActiveProject.keyFeatures.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Impact */}
                      {currentActiveProject.impact && (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Measurable Impact</span>
                          <div className="p-4 bg-emerald-950/10 border border-emerald-950/40 rounded-none flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-xs font-mono text-emerald-400 leading-relaxed">
                              {currentActiveProject.impact}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Tech Bar */}
                    <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {currentActiveProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
