import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

interface Props {
  explanation?: any;
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  const safeExplanation = typeof explanation === 'object' ? JSON.stringify(explanation) : explanation;

  return (
    <div className="surface-card p-4 flex flex-col gap-3 group transition-all duration-200 hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Terminal size={13} />
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Step Explanation</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
          <Sparkles size={9} className="text-indigo-400" />
          <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="min-h-[80px] flex flex-col justify-center">
        {safeExplanation ? (
          <div className="animate-fade-in">
            <p className="text-[14px] text-slate-200 leading-relaxed font-medium">{safeExplanation}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center opacity-40 py-6">
            <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center mb-2">
              <Terminal size={16} className="text-slate-600" />
            </div>
            <p className="text-xs text-slate-500 font-semibold">Awaiting simulation...</p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center gap-2 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Engine Ready</span>
      </div>
    </div>
  );
};
