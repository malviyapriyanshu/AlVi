import React from 'react';
import type { LeetCodeProblem } from '../../types';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface Props { problem: LeetCodeProblem | undefined }

export const ProblemPanel: React.FC<Props> = ({ problem }) => {
  if (!problem) return null;
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">🧩 Problem Context</h3>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${problem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{problem.difficulty}</span>
        </div>
        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          Open on LeetCode <ExternalLink size={12} />
        </a>
      </div>
      <h4 className="text-white font-semibold mb-2">{problem.title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{problem.description}</p>
      <div className="space-y-2">
        <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Solution Walkthrough</h5>
        {problem.solutionSteps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
