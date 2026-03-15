import React from 'react';
import { History, CheckCircle2, Circle, ExternalLink, Activity, Info, Variable } from 'lucide-react';
import { CurrentStepExplanation } from './CurrentStepExplanation';
import type { LeetCodeProblem } from '../../types';

interface WalkthroughPanelProps {
  steps: any[];
  currentStepIndex: number;
  currentExplanation: any;
  problem?: LeetCodeProblem;
}

export const WalkthroughPanel: React.FC<WalkthroughPanelProps> = ({ steps, currentStepIndex, currentExplanation, problem }) => {
  const currentStep = steps[currentStepIndex];
  const stepNumber = currentStepIndex + 1;
  const totalSteps = steps.length;

  return (
    <div className="flex flex-col h-full gap-8 animate-fade-in">
      {/* ── Active Step Header ── */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Step {stepNumber}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 font-mono tracking-tighter">
            {stepNumber} / {totalSteps}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${(stepNumber / Math.max(totalSteps, 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Live Explanation Card ── */}
      <div className="shrink-0">
        <CurrentStepExplanation explanation={currentExplanation} />
      </div>

      {/* ── Variables / State Track ── */}
      {currentStep && (
        <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-slide-up">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Environment State</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(currentStep.variables || {}).map(([key, value]: [string, any]) => (
              <div key={key} className="flex flex-col bg-white dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">{key}</span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
            {(!currentStep.variables || Object.keys(currentStep.variables).length === 0) && (
              <div className="col-span-2 py-3 text-center opacity-40">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Scope Only</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Contextual Help ── */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
         <div className="flex items-center gap-2 shrink-0">
            <Info size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logic Branch</span>
         </div>
         <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
            {problem?.solutionSteps ? (
              <div className="flex flex-col gap-3">
                {problem.solutionSteps.map((s, i) => (
                  <div key={i} className={`flex gap-3 transition-opacity duration-300 ${i < currentStep?.logicIndex ? 'opacity-40' : 'opacity-100'}`}>
                    <div className="shrink-0 mt-0.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        i < currentStep?.logicIndex ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 dark:border-slate-700'
                      }`}>
                        {i < currentStep?.logicIndex ? <CheckCircle2 size={10} className="text-white" /> : <div className="w-1 h-1 rounded-full bg-slate-300" />}
                      </div>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            ) : (
                <p className="text-[11px] font-medium text-slate-400 italic leading-relaxed p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  Simulation log stream active. No static context available for this algorithm.
                </p>
            )}
         </div>
      </div>

      {/* ── External Link ── */}
      {problem?.link && (
        <a 
          href={problem.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white transition-all shadow-btn-indigo shrink-0"
        >
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-70">Practice</span>
            <span className="text-xs font-bold leading-none">{problem.title}</span>
          </div>
          <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
    </div>
  );
};
