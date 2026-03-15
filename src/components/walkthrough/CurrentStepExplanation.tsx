import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

interface Props {
  explanation?: string;
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-5 flex flex-col gap-3 h-full group transition-all duration-300 hover:border-indigo-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Terminal size={14} />
          </div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Walkthrough Module</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
           <Sparkles size={10} className="text-indigo-400" />
           <span className="text-[9px] font-bold text-indigo-300 uppercase">Live Analysis</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {explanation ? (
          <p className="text-[15px] text-slate-100 leading-relaxed font-medium transition-all animate-in fade-in duration-300">
            {explanation}
          </p>
        ) : (
          <p className="text-sm text-slate-500 italic font-medium">
            Waiting for simulation to start...
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-slate-700/30 flex items-center justify-between opacity-50">
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-slate-500" />
            <div className="w-1 h-1 rounded-full bg-slate-500" />
            <div className="w-1 h-1 rounded-full bg-slate-500" />
         </div>
         <span className="text-[9px] font-mono uppercase">AlgoVis Engine v2.0</span>
      </div>
    </div>
  );
};
