import React from 'react';
import { History, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { CurrentStepExplanation } from './CurrentStepExplanation';
import type { LeetCodeProblem } from '../../types';

interface WalkthroughPanelProps {
  steps: any[];
  currentStepIndex: number;
  currentExplanation: any;
  problem?: LeetCodeProblem;
}

export const WalkthroughPanel: React.FC<WalkthroughPanelProps> = ({ steps, currentStepIndex, currentExplanation, problem }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <div className="shrink-0">
        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Simulation Logic</span>
        <h3 className="text-xl mt-1 font-extrabold text-slate-900 dark:text-white tracking-tight">Walkthrough</h3>
      </div>

      {/* Step Explanation */}
      <div className="shrink-0">
        <CurrentStepExplanation explanation={currentExplanation} />
      </div>

      {/* Problem Context */}
      {problem ? (
        <div className="flex-1 surface-card p-5 flex flex-col gap-5 overflow-hidden">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm">🧩</span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Problem Context</span>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
              problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
              'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
            }`}>{problem.difficulty}</span>
          </div>

          <div className="shrink-0">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{problem.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Solution Approach</h5>
            {problem.solutionSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="mt-1 shrink-0">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400">{idx + 1}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold transition-all border border-indigo-100 dark:border-indigo-500/20"
          >
            Open on LeetCode <ExternalLink size={14} />
          </a>
        </div>
      ) : (
        <div className="flex-1 surface-card p-6 flex flex-col items-center justify-center text-center opacity-40">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl mb-3">🧩</div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">No problem context</p>
        </div>
      )}
    </div>
  );
};
