import React from 'react';
import { AlgorithmInfo } from '../../types/algorithmTypes';
import { ComplexityBadge } from './ComplexityBadge';
import { Zap, ExternalLink } from 'lucide-react';

interface Props {
  info: AlgorithmInfo;
  leetcodeLink?: string;
}

export const AlgorithmOverviewCard: React.FC<Props> = ({ info, leetcodeLink }) => {
  return (
    <div className="flex flex-col gap-5 p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm group">
      {/* Header Info */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Zap size={20} strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
             <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Resource Type: Core</h4>
             {leetcodeLink && (
                 <a href={leetcodeLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-500 transition-colors">
                    <ExternalLink size={12} />
                 </a>
             )}
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight truncate">{info.name}</h2>
          <div className="mt-1.5 flex flex-wrap gap-2">
             <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                {info.category}
             </span>
             <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-md text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none">
                Optimized
             </span>
          </div>
        </div>
      </div>

      {/* Complexity Grid */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <ComplexityBadge label="Best"    value={info.complexity.time.best}      type="time" />
        <ComplexityBadge label="Average" value={info.complexity.time.average}   type="time" />
        <ComplexityBadge label="Worst"   value={info.complexity.time.worst}     type="time" />
        <ComplexityBadge label="Memory"  value={info.complexity.space}          type="space" />
      </div>
    </div>
  );
};
