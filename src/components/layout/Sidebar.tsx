import React from 'react';
import { BookOpen, Zap, Code2, Lightbulb } from 'lucide-react';
import { AlgorithmOverviewCard } from '../learning/AlgorithmOverviewCard';
import { PseudocodeViewer } from '../learning/PseudocodeViewer';
import { RealWorldAnalogy } from '../learning/RealWorldAnalogy';

interface SidebarProps {
  algorithm: any;
  problem: any;
  currentStep?: any;
}

const ComplexityAnalysis: React.FC<{ complexity: any }> = ({ complexity }) => (
  <div className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/30 flex flex-col gap-4">
    <div className="flex items-center gap-2">
       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Complexity Analysis</h4>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-[9px] font-bold text-slate-600 uppercase mb-1">Time (Avg)</div>
        <div className="text-sm font-mono font-bold text-indigo-400">{complexity.time.average || complexity.time}</div>
      </div>
      <div>
        <div className="text-[9px] font-bold text-slate-600 uppercase mb-1">Space</div>
        <div className="text-sm font-mono font-bold text-emerald-400">{complexity.space}</div>
      </div>
    </div>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ algorithm, problem, currentStep }) => {
  if (!algorithm) return (
    <div className="flex flex-col items-center justify-center h-full opacity-20 p-12 text-center">
       <BookOpen size={48} className="mb-4" />
       <p className="text-sm font-bold uppercase tracking-widest">Select an Algorithm</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex items-center gap-3">
         <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-500 border border-indigo-500/20">
            <BookOpen size={18} />
         </div>
         <h2 className="text-lg font-black tracking-tight">Theory & Specs</h2>
      </div>

      <div className="flex flex-col gap-6">
        <AlgorithmOverviewCard info={algorithm.info} leetcodeLink={problem?.link} />
        
        <ComplexityAnalysis complexity={algorithm.info.complexity} />
        
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-2 px-1">
              <Code2 size={14} className="text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Implementation</span>
           </div>
           <PseudocodeViewer 
              code={algorithm.info.pseudocode} 
              highlightLine={currentStep?.line}
           />
        </div>

        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-2 px-1">
              <Lightbulb size={14} className="text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Intuition</span>
           </div>
           <RealWorldAnalogy analogy={algorithm.info.analogy} />
        </div>
      </div>
    </div>
  );
};
