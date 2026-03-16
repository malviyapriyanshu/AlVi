import React from 'react';
import type { LogicStep } from '../../types';
import { Target, Lightbulb, Compass } from 'lucide-react';

interface Props { steps: LogicStep[]; intuition: string; whenToUse: string }

export const LogicBreakdown: React.FC<Props> = ({ steps, intuition, whenToUse }) => (
  <div className="flex flex-col gap-5 animate-fade-in">
    {/* Intuition Section */}
    <div className="bg-emerald-50/30 dark:bg-emerald-500/5 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-500/20">
      <h3 className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
         <Lightbulb size={12} /> The Intuition
      </h3>
      <div className="text-slate-700 dark:text-slate-300 text-xs font-bold leading-relaxed pr-2 italic">
        "{intuition}"
      </div>
    </div>

    {/* Logic Breakdown Section */}
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
         <Compass size={12} /> Logic Sequence
      </h3>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 group/step">
            <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-[11px] font-black text-indigo-600 dark:text-indigo-400 group-hover/step:bg-indigo-600 group-hover/step:text-white transition-all">
                {idx + 1}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">{step.title}</h4>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-500 leading-relaxed pr-4">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* When to Use Section */}
    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-100 dark:border-slate-900/50 shadow-inner">
      <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
         <Target size={12} /> Optimization Strategy
      </h3>
      <div className="text-slate-600 dark:text-slate-400 text-xs font-bold leading-relaxed">{whenToUse}</div>
    </div>
  </div>
);
