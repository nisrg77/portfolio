export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  goalAndRole: string; // Goal of the project and the engineer's role
  challengesOvercome: string; // Specific technical challenges solved/overcome
  extendedDetails: string;
  techStack: string[];
  category: 'full-stack' | 'ai-ml' | 'data-analytics' | 'backend';
  githubUrl?: string;
  liveDemoUrl?: string;
  presentationUrl?: string;
  repoSize?: string;
  lastUpdated?: string;
  status?: string;
  difficulty?: number; // 1-5 stars
  businessValue?: string;
  keyFeatures: string[];
  impact?: string;
  keyInsights?: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level 1-5
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
