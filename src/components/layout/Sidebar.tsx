import React from 'react';
import { BookOpen, Code2, Lightbulb } from 'lucide-react';
import { AlgorithmOverviewCard } from '../learning/AlgorithmOverviewCard';
import { PseudocodeViewer } from '../learning/PseudocodeViewer';
import { RealWorldAnalogy } from '../learning/RealWorldAnalogy';

interface SidebarProps {
  algorithm: any;
  problem: any;
  currentStep?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ algorithm, problem, currentStep }) => {
  if (!algorithm) return (
    <div className="flex flex-col items-center justify-center h-full opacity-30 p-8 text-center">
      <BookOpen size={40} className="mb-3 text-slate-600" />
      <p className="text-sm font-semibold text-slate-500">Select an Algorithm</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
          <BookOpen size={16} />
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">Theory & Specs</h2>
      </div>

      {/* Algorithm Card */}
      <AlgorithmOverviewCard info={algorithm.info} leetcodeLink={problem?.link} />

      {/* Pseudocode */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <Code2 size={13} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pseudocode</span>
        </div>
        <PseudocodeViewer
          code={algorithm.info.pseudocode}
          highlightLine={currentStep?.line}
        />
      </div>

      {/* Real World Analogy */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1">
          <Lightbulb size={13} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intuition</span>
        </div>
        <RealWorldAnalogy analogy={algorithm.info.analogy} />
      </div>
    </div>
  );
};
