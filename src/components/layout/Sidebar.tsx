import React, { useState } from 'react';
import { BookOpen, Code2, Lightbulb, ChevronDown, ChevronUp, Presentation, Zap } from 'lucide-react';
import { AlgorithmOverviewCard } from '../learning/AlgorithmOverviewCard';
import { PseudocodeViewer } from '../learning/PseudocodeViewer';
import { RealWorldAnalogy } from '../learning/RealWorldAnalogy';

interface SidebarProps {
  algorithm: any;
  problem: any;
  currentStep?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ algorithm, problem, currentStep }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    complexity: true,
    pseudocode: true,
    analogy: false
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!algorithm) return (
    <div className="flex flex-col items-center justify-center h-full opacity-30 p-8 text-center animate-fade-in">
      <BookOpen size={32} className="mb-3 text-slate-400" />
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Algorithm</p>
    </div>
  );

  const CollapsibleSection: React.FC<{ 
    id: string; 
    icon: React.ElementType; 
    title: string; 
    children: React.ReactNode;
    noPadding?: boolean;
  }> = ({ id, icon: Icon, title, children, noPadding }) => (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0 shrink-0">
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between py-4 group transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg transition-colors ${
            expandedSections[id] 
              ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
              : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
          }`}>
            <Icon size={14} />
          </div>
          <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${
            expandedSections[id] ? 'text-slate-900 dark:text-white' : 'text-slate-500'
          }`}>
            {title}
          </span>
        </div>
        <div className={`transition-transform duration-300 ${expandedSections[id] ? 'rotate-180' : 'rotate-0'} text-slate-400`}>
          <ChevronDown size={14} />
        </div>
      </button>
      
      {expandedSections[id] && (
        <div className={`pb-5 ${noPadding ? '' : 'animate-slide-up'}`}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col animate-fade-in">
      <CollapsibleSection id="overview" icon={Lightbulb} title="Overview">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
            {algorithm.info.description}
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Zap size={14} className="text-amber-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">High Emphasis Model</span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection id="complexity" icon={Zap} title="Complexity">
        <AlgorithmOverviewCard info={algorithm.info} leetcodeLink={problem?.link} />
      </CollapsibleSection>

      <CollapsibleSection id="pseudocode" icon={Code2} title="Pseudocode" noPadding>
        <PseudocodeViewer
          code={algorithm.info.pseudocode}
          highlightLine={currentStep?.line}
        />
      </CollapsibleSection>

      <CollapsibleSection id="analogy" icon={Presentation} title="Analogy">
        <RealWorldAnalogy analogy={algorithm.info.analogy} />
      </CollapsibleSection>
    </div>
  );
};
