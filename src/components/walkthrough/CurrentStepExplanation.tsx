import React from 'react';
import { Terminal, Sparkles, Activity } from 'lucide-react';

interface Props {
  explanation?: any;
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  const safeExplanation = typeof explanation === 'object' ? JSON.stringify(explanation) : explanation;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
            <Terminal size={14} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Logic Flow</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live Runtime</span>
        </div>
      </div>

      <div className="min-h-[80px] py-2">
        {safeExplanation ? (
          <div className="animate-fade-in">
            <p className="text-[13px] text-slate-900 dark:text-slate-100 leading-relaxed font-bold tracking-tight">
              {safeExplanation}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center opacity-30 py-6">
            <Activity size={20} className="mb-2 animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Data stream empty</p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-600 whitespace-nowrap">OS: AlVis Node-1</span>
        <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-indigo-500/30 animate-[slide_3s_infinite_linear]" 
                 style={{ animation: 'slideRight 2s infinite linear' }} />
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};
