import React from 'react';
import type { LogicStep } from '../../types';

interface Props { steps: LogicStep[]; intuition: string; whenToUse: string }

export const LogicBreakdown: React.FC<Props> = ({ steps, intuition, whenToUse }) => (
  <div className="flex flex-col gap-5">
    <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
      <h3 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-3">💡 The Intuition</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{intuition}</p>
    </div>
    <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Logic Breakdown</h3>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">{idx + 1}</div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">When to Use?</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{whenToUse}</p>
    </div>
  </div>
);
