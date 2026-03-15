import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

interface Props {
  explanation?: any;
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  const safeExplanation = typeof explanation === 'object' ? JSON.stringify(explanation) : explanation;

  return (
    <div className="surface-card p-5 flex flex-col gap-4 group transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
            <Terminal size={14} />
          </div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
          <Sparkles size={10} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="min-h-[60px] flex flex-col justify-center">
        {safeExplanation ? (
          <div className="animate-fade-in">
            <p className="text-sm text-slate-900 dark:text-slate-200 leading-relaxed font-semibold transition-colors">
              {safeExplanation}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center opacity-40 py-4">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Awaiting execution...</p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-slate-800/50 flex items-center gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Animation Engine Synchronized</span>
      </div>
    </div>
  );
};
