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
    <div className="flex flex-col h-full gap-5">
      {/* Header */}
      <div className="shrink-0">
        <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">Simulation Logic</span>
        <h3 className="text-xl mt-0.5 font-bold text-white">Walkthrough</h3>
      </div>

      {/* Step Explanation */}
      <div className="shrink-0">
        <CurrentStepExplanation explanation={currentExplanation} />
      </div>

      {/* Problem Context — replaces execution history */}
      {problem ? (
        <div className="flex-1 surface-card p-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm">🧩</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Problem Context</span>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
              problem.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
              'bg-red-500/15 text-red-400 border border-red-500/20'
            }`}>{problem.difficulty}</span>
          </div>

          <div className="shrink-0">
            <h4 className="text-sm font-bold text-white mb-1.5">{problem.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{problem.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Solution Approach</h5>
            {problem.solutionSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="mt-1 shrink-0">
                  <div className="w-4 h-4 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-indigo-400">{idx + 1}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl text-xs font-semibold transition-all border border-indigo-500/20"
          >
            Open on LeetCode <ExternalLink size={12} />
          </a>
        </div>
      ) : (
        <div className="flex-1 surface-card p-4 flex flex-col items-center justify-center text-center opacity-40">
          <span className="text-2xl mb-2">🧩</span>
          <p className="text-xs text-slate-500 font-semibold">No linked problem for this algorithm</p>
        </div>
      )}
    </div>
  );
};
