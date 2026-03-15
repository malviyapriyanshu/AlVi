import React from 'react';
import { BookOpen, Code2, Lightbulb, ChevronDown, ChevronUp, Presentation } from 'lucide-react';
import { AlgorithmOverviewCard } from '../learning/AlgorithmOverviewCard';
import { PseudocodeViewer } from '../learning/PseudocodeViewer';
import { RealWorldAnalogy } from '../learning/RealWorldAnalogy';
import { useThemeStore } from '../../state/useThemeStore';

interface SidebarProps {
  algorithm: any;
  problem: any;
  currentStep?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ algorithm, problem, currentStep }) => {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    overview: true,
    pseudocode: true,
    intuition: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!algorithm) return (
    <div className="flex flex-col items-center justify-center h-full opacity-30 p-8 text-center">
      <BookOpen size={40} className="mb-3 text-slate-400 dark:text-slate-600" />
      <p className="text-sm font-semibold text-slate-500">Select an Algorithm</p>
    </div>
  );

  const SectionHeader: React.FC<{ id: string; icon: React.ReactNode; title: string }> = ({ id, icon, title }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between w-full group"
    >
      <div className="flex items-center gap-2 px-1">
        <span className="text-slate-400 group-hover:text-indigo-500 transition-colors uppercase">
          {icon}
        </span>
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className="md:hidden text-slate-400">
        {expandedSections[id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>
    </button>
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Sidebar Main Header - only on desktop */}
      <div className="hidden md:flex items-center gap-2.5 mb-2">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
          <BookOpen size={16} />
        </div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Theory & Specs</h2>
      </div>

      {/* Algorithm Card */}
      <div className="flex flex-col gap-3">
        <SectionHeader id="overview" icon={<Lightbulb size={13} />} title="Overview" />
        <div className={`${expandedSections.overview ? 'block' : 'hidden md:block'} animate-slide-up`}>
          <AlgorithmOverviewCard info={algorithm.info} leetcodeLink={problem?.link} />
        </div>
      </div>

      {/* Pseudocode */}
      <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-slate-800/50 pt-5 md:border-0 md:pt-0">
        <SectionHeader id="pseudocode" icon={<Code2 size={13} />} title="Pseudocode" />
        <div className={`${expandedSections.pseudocode ? 'block' : 'hidden md:block'} animate-slide-up`}>
          <PseudocodeViewer
            code={algorithm.info.pseudocode}
            highlightLine={currentStep?.line}
          />
        </div>
      </div>

      {/* Real World Analogy */}
      <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-slate-800/50 pt-5 md:border-0 md:pt-0">
        <SectionHeader id="intuition" icon={<Presentation size={13} />} title="Intuition" />
        <div className={`${expandedSections.intuition ? 'block' : 'hidden md:block'} animate-slide-up`}>
          <RealWorldAnalogy analogy={algorithm.info.analogy} />
        </div>
      </div>
    </div>
  );
};
