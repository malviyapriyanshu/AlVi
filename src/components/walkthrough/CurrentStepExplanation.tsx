import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

interface Props {
  explanation?: any; // Changed from string to any for safety
}

export const CurrentStepExplanation: React.FC<Props> = ({ explanation }) => {
  // Safe string conversion to prevent React crash if an object is passed
  const safeExplanation = typeof explanation === 'object' ? JSON.stringify(explanation) : explanation;

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-5 flex flex-col gap-3 h-full group transition-all duration-300 hover:border-indigo-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Terminal size={14} />
          </div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Walkthrough Module</h3>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 shadow-inner">
           <Sparkles size={10} className="text-indigo-400" />
           <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Live Analysis</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-[120px]">
        {safeExplanation ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="text-[16px] text-slate-100 leading-relaxed font-bold">
                {safeExplanation}
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center opacity-40 py-8">
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center mb-3">
               <Terminal size={20} className="text-slate-600" />
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Awaiting Simulation Step...
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-700/30 flex items-center justify-between opacity-50">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Engine v2.1 Ready</span>
         </div>
         <span className="text-[9px] font-mono text-slate-500 uppercase">SYS_LOG: 001_TRC</span>
      </div>
    </div>
  );
};
